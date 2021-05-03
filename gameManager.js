const TITLE = 0;
const MAIN_GAME = 1;
const GAME_OVER = 2;
const GAME_CLEAR = 3;

// ゲーム管理クラス
let GameManager = function() {
	let time;
	let ecsCounter;
	let phase = TITLE;
	let player;
	let enemies;
	let missiles;
	
	this.play = function() {
		switch (phase) {
			case TITLE:
				title();
				break;
			
			case MAIN_GAME:
				mainGame();
				break;
			
			case GAME_OVER:
				gameOver();
				break;
			
			case GAME_CLEAR:
				gameClear();
				break;
		}
	};
	
	let isTitleFirst = true;
	let isGameOverFirst = true;
	let isGameClearFirst = true;
	
	// タイトル画面
	let title = function() {
		if (isTitleFirst) {
			isTitleFirst = false;
			isGameOverFirst = true;
			isGameClearFirst = true;
			
			let startText = $(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
			startText.text('スタート');
			startText.attr({x: 328, y: 268, 'font-family': 'メイリオ', 'font-size': 36});
			startText.css('cursor', 'pointer')
			$('svg').append(startText);
			
			startText.hover(
				function() {
					startText.attr('fill', 'red');
				},
				function() {
					startText.attr('fill', 'black');
				}
			);
			
			startText.click(
				function() {
					phase = MAIN_GAME;
					time = 0;
					ecsCounter = 0;
					player = new Player();
					enemies = new EnemiesManager();
					missiles = new MissilesManager();
					
					$('#zanki').text(player.zanki);
					$(this).remove();
				}
			);
		}
	};
	
	// メイン処理
	let mainGame = function() {
		enemies.push(enemiesCreate());
		
		missiles.push(player.shot());
		missiles.push(enemies.shot());
		
		player.move();
		enemies.move();
		missiles.move();
		
		cleaning();
		
		player.timekeeper();
		enemies.timekeeper();
		timekeeper();
	};
	
	// ゲームオーバー画面
	let gameOver = function() {
		if (isGameOverFirst) {
			isGameOverFirst = false;
			
			let gameClearText = $(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
			gameClearText.text('ゲームオーバー');
			gameClearText.attr({x: 253, y: 268, 'font-family': 'メイリオ', 'font-size': 42});
			$('svg').append(gameClearText);
			
			let againText = $(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
			againText.text('もう一度遊ぶ');
			againText.attr({x: 292, y: 400, 'font-family': 'メイリオ', 'font-size': 36});
			againText.css('cursor', 'pointer')
			$('svg').append(againText);
			
			againText.hover(
				function() {
					againText.attr('fill', 'red');
				},
				function() {
					againText.attr('fill', 'black');
				}
			);
			
			againText.click(
				function() {
					phase = TITLE;
					isTitleFirst = true;
					$('svg').empty();
					$('#zanki').text('');
					$('#current-hp').css('width', 0);
				}
			);
		}
	};
	
	// クリア画面
	let gameClear = function() {
		if (isGameClearFirst) {
			isGameClearFirst = false;
			
			let gameClearText = $(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
			gameClearText.text('ゲームクリア！');
			gameClearText.attr({x: 253, y: 268, 'font-family': 'メイリオ', 'font-size': 42});
			$('svg').append(gameClearText);
			
			let againText = $(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
			againText.text('もう一度遊ぶ');
			againText.attr({x: 292, y: 400, 'font-family': 'メイリオ', 'font-size': 36});
			againText.css('cursor', 'pointer')
			$('svg').append(againText);
			
			againText.hover(
				function() {
					againText.attr('fill', 'red');
				},
				function() {
					againText.attr('fill', 'black');
				}
			);
			
			againText.click(
				function() {
					phase = TITLE;
					isTitleFirst = true;
					$('svg').empty();
					$('#zanki').text('');
				}
			);
		}
		
		missiles.push(player.shot());
		player.move();
		missiles.move();
		player.timekeeper();
	};
	
	let enemiesCreate = function() {
		let createdEnemies = [];
		if (ecsCounter < ECS.length) {
			if (ECS[ecsCounter].partition === true && enemies.list.length === 0 &&
			    missiles.list.filter(function(m){return m.targetType === 'player';}).length === 0) {
				ECS[ecsCounter].partition = 'processing';
				time = 0;
			}
			if (time === ECS[ecsCounter].time && ECS[ecsCounter].partition !== true) {
				time = 0;
				if (ECS[ecsCounter].partition === 'processing') {
					ECS[ecsCounter].partition = true;
				}
				let ecs = ECS[ecsCounter];
				if (ecs.boss != null) {
					createdEnemies.push(new ecs.boss(player));
				}
				else {
					ecs.enemies.forEach(
						function(enemy) {
							createdEnemies.push(new (Enemy.bind.apply(Enemy, [null].concat(enemy).concat(player)))());
						}
					);
				}
				ecsCounter++;
			}
		}
		return createdEnemies;
	};
	
	let isHit = function(obj1, obj2) {
		return Math.sqrt(Math.pow(obj1.cx - obj2.cx, 2) + Math.pow(obj1.cy - obj2.cy, 2)) < obj1.r + obj2.r;
	};
	
	// 被ダメージによる消滅処理など
	let cleaning = function() {
		for (let i = 0; i < enemies.list.length; i++) {
			if (isHit(player, enemies.list[i])) {
				player.receiveDamage();
				$('#zanki').text(player.zanki);
				if (player.zanki <= 0) {
					phase = GAME_OVER;
					return;
				}
				break;
			}
		}
		
		let isDeleteBossDanmaku = false;
		let didHitPlayer = false;
		for (let i = missiles.list.length - 1; i >= 0 ; i--) {
			let missileDeleteFlag = false;
			let missile = missiles.list[i];
			switch (missile.targetType) {
				case 'player':
					if (!didHitPlayer && isHit(missile, player)) {
						didHitPlayer = true;
						player.receiveDamage();
						$('#zanki').text(player.zanki);
						if (player.zanki <= 0) {
							phase = GAME_OVER;
							return;
						}
					}
					break;
				case 'enemy':
					for (let j = enemies.list.length - 1; j >= 0 ; j--) {
						let enemy = enemies.list[j];
						if (isHit(missile, enemy)) {
							enemy.receiveDamage();
							if (enemy.type === 'boss') {
								if (enemy.hp <= 0) {
									if (enemy.styleCounter !== enemy.danmakus.length - 1) {
										enemy.changeStyle();
									}
									else {
										enemy.selector.remove();
										enemies.list.splice(j, 1);
									}
									isDeleteBossDanmaku = true;
								}
							}
							else if (enemy.hp <= 0) {
								enemy.selector.remove();
								enemies.list.splice(j, 1);
							}
							missile.selector.remove();
							missiles.list.splice(i, 1);
							break;
						}
					}
					break;
			}
		};
		if (isDeleteBossDanmaku) {
			for (let i = missiles.list.length - 1; i >= 0 ; i--) {
				let missile = missiles.list[i];
				if (missile.targetType === 'player') {
					missile.selector.remove();
					missiles.list.splice(i, 1);
				}
			}
		}
		if (ecsCounter >= ECS.length && enemies.list.length === 0) {
			phase = GAME_CLEAR;
		}
	};
	
	let timekeeper = function() {
		time += FRAME;
	};
};