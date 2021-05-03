// SVG de STG



// グローバル定数

	// キーコード
	const LEFT = 37;
	const UP = 38;
	const RIGHT = 39;
	const DOWN = 40;
	const SPACE = 32;
	
	const SCREEN_WIDTH = Number($('svg').attr('width'));
	const SCREEN_HEIGHT = Number($('svg').attr('height'));
	
	// 60分の1秒
	const FRAME = Number(16);
	// SECONDS
	const SEC = FRAME * 60;
	
	const EAS = EnemyActionSchedule();
	const BAS = BossActionSchedule();
	const ECS = EnemiesCreateSchedule();

// END グローバル定数



// キー入力処理
	
	// グローバル変数 player.jsで使う
	let isPressing = {
		left: false,
		up: false,
		right: false,
		down: false,
		space: false
	};
	
	$(window).keydown(
		function(e) {
			if (e.keyCode === LEFT) isPressing.left = true;
			else if (e.keyCode === UP) isPressing.up = true;
			else if (e.keyCode === RIGHT) isPressing.right = true
			else if (e.keyCode === DOWN) isPressing.down = true
			else if (e.keyCode === SPACE) isPressing.scape = true;
		}
	);
	
	$(window).keyup(
		function(e) {
			if (e.keyCode === LEFT) isPressing.left = false;
			else if (e.keyCode === UP) isPressing.up = false;
			else if (e.keyCode === RIGHT) isPressing.right = false
			else if (e.keyCode === DOWN) isPressing.down = false
			else if (e.keyCode === SPACE) isPressing.scape = false;
		}
	);

// END キー入力処理



const game = new GameManager();

setInterval(game.play, FRAME);

