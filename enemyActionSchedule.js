// 敵の行動パターン
//
// {vector: [x軸方向の移動距離, y軸方向の移動距離] [, canShot: 移動中のショットの可否][, loop: インデックス]}
// または
// {absolute: [移動したいx座標, 移動したいy座標] [, canShot: 移動中のショットの可否][, loop: インデックス]}
// または
// {delay: 待機時間, [canShot: 待機中のショットの可否]}
// なお、canShotを省略した場合はtrueと見なされる。
// loopを指定した場合、schedule配列の今のindexを指定したindexに戻す。
//
// 敵のスピードや浮動小数による誤差などの要因により、
// 移動距離が完全に一致することは、まずないことを留意すること。
// また次の移動距離の指定がない場合は、最後の状態のdx, dyが継続される。
let EnemyActionSchedule = function() {
	return {
		toDown: [
			{ vector: [0, 1] }
		],
		toRightNaname: [
			{ vector: [1, 1] }
		],
		angle60: [
			{ vector: [1, 1.7320508] }
		],
		toLeftNaname: [
			{ vector: [-1, 1] }
		],
		angle120: [
			{ vector: [-1, 1.7320508] }
		],
		toLeft: [
			{ vector: [1, 0] }
		],
		toRight: [
			{ vector: [-1, 0] }
		],
		
		toLeftKunekune: [
			{ vector: [15 * Math.PI, 50 * Math.sin(15 * Math.PI / 120)] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(30 * Math.PI / 120) - Math.sin(15 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(45 * Math.PI / 120) - Math.sin(30 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(60 * Math.PI / 120) - Math.sin(45 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(75 * Math.PI / 120) - Math.sin(60 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(90 * Math.PI / 120) - Math.sin(75 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(105 * Math.PI / 120) - Math.sin(90 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(120 * Math.PI / 120) - Math.sin(105 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(135 * Math.PI / 120) - Math.sin(120 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(150 * Math.PI / 120) - Math.sin(135 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(165 * Math.PI / 120) - Math.sin(150 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(180 * Math.PI / 120) - Math.sin(165 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(195 * Math.PI / 120) - Math.sin(180 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(210 * Math.PI / 120) - Math.sin(195 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(225 * Math.PI / 120) - Math.sin(210 * Math.PI / 120))] },
			{ vector: [15 * Math.PI, 50 * (Math.sin(240 * Math.PI / 120) -  Math.sin(225 * Math.PI / 120))], loop: 0 }
		],
		
		toRightKunekune: [
			{ vector: [-15 * Math.PI, 50 * Math.sin(15 * Math.PI / 120)] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(30 * Math.PI / 120) - Math.sin(15 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(45 * Math.PI / 120) - Math.sin(30 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(60 * Math.PI / 120) - Math.sin(45 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(75 * Math.PI / 120) - Math.sin(60 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(90 * Math.PI / 120) - Math.sin(75 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(105 * Math.PI / 120) - Math.sin(90 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(120 * Math.PI / 120) - Math.sin(105 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(135 * Math.PI / 120) - Math.sin(120 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(150 * Math.PI / 120) - Math.sin(135 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(165 * Math.PI / 120) - Math.sin(150 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(180 * Math.PI / 120) - Math.sin(165 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(195 * Math.PI / 120) - Math.sin(180 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(210 * Math.PI / 120) - Math.sin(195 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(225 * Math.PI / 120) - Math.sin(210 * Math.PI / 120))] },
			{ vector: [-15 * Math.PI, 50 * (Math.sin(240 * Math.PI / 120) -  Math.sin(225 * Math.PI / 120))], loop: 0 }
		],
		
		stop: [
			{ vector: [0, 100], canShot: false },
			{ delay: FRAME }
		]
	};
};



// Boss用のEnemyActionSchedule
// 仕様はEnemyActionScheduleとほぼ同じだが、必ず初めの要素は{ absolute: [任意のx座標, 任意のy座標], canShot: false }にすること。
let BossActionSchedule = function() {
	return {
		stop: [
			{ absolute: [400, 100], canShot: false },
			{ delay: 40 * FRAME, canShot: false },
			
			{ delay: FRAME }
		],
		
		circle: [
			{ absolute: [400, 100], canShot: false },
			{ delay: 40 * FRAME, canShot: false },
			
			{ absolute: [200 * Math.cos(24 * Math.PI / 16) + 400, 200 * Math.sin(24 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(23 * Math.PI / 16) + 400, 200 * Math.sin(23 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(22 * Math.PI / 16) + 400, 200 * Math.sin(22 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(21 * Math.PI / 16) + 400, 200 * Math.sin(21 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(20 * Math.PI / 16) + 400, 200 * Math.sin(20 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(19 * Math.PI / 16) + 400, 200 * Math.sin(19 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(18 * Math.PI / 16) + 400, 200 * Math.sin(18 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(17 * Math.PI / 16) + 400, 200 * Math.sin(17 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(16 * Math.PI / 16) + 400, 200 * Math.sin(16 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(15 * Math.PI / 16) + 400, 200 * Math.sin(15 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(14 * Math.PI / 16) + 400, 200 * Math.sin(14 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(13 * Math.PI / 16) + 400, 200 * Math.sin(13 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(12 * Math.PI / 16) + 400, 200 * Math.sin(12 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(11 * Math.PI / 16) + 400, 200 * Math.sin(11 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(10 * Math.PI / 16) + 400, 200 * Math.sin(10 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(9 * Math.PI / 16) + 400, 200 * Math.sin(9 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(8 * Math.PI / 16) + 400, 200 * Math.sin(8 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(7 * Math.PI / 16) + 400, 200 * Math.sin(7 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(6 * Math.PI / 16) + 400, 200 * Math.sin(6 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(5 * Math.PI / 16) + 400, 200 * Math.sin(5 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(4 * Math.PI / 16) + 400, 200 * Math.sin(4 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(3 * Math.PI / 16) + 400, 200 * Math.sin(3 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(2 * Math.PI / 16) + 400, 200 * Math.sin(2 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(1 * Math.PI / 16) + 400, 200 * Math.sin(1 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(32 * Math.PI / 16) + 400, 200 * Math.sin(32 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(31 * Math.PI / 16) + 400, 200 * Math.sin(31 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(30 * Math.PI / 16) + 400, 200 * Math.sin(30 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(29 * Math.PI / 16) + 400, 200 * Math.sin(29 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(28 * Math.PI / 16) + 400, 200 * Math.sin(28 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(27 * Math.PI / 16) + 400, 200 * Math.sin(27 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(26 * Math.PI / 16) + 400, 200 * Math.sin(26 * Math.PI / 16) + 300] },
			{ absolute: [200 * Math.cos(25 * Math.PI / 16) + 400, 200 * Math.sin(25 * Math.PI / 16) + 300], loop: 2 }
		],
		
		star: [
			{ absolute: [400, 100], canShot: false },
			{ delay: 40 * FRAME, canShot: false },
			
			{ delay: 90 * FRAME },
			{ absolute: [282.443, 461.803], canShot: false },
			{ delay: 90 * FRAME },
			{ absolute: [590.211, 238.1966], canShot: false },
			{ delay: 90 * FRAME },
			{ absolute: [209.789, 238.1966], canShot: false },
			{ delay: 90 * FRAME },
			{ absolute: [517.557, 461.803], canShot: false },
			{ delay: 90 * FRAME },
			{ absolute: [400, 100], canShot: false, loop: 2 },
		],
		
		mugenMark: [
			{ absolute: [400, 150], canShot: false },
			{ delay: 40 * FRAME, canShot: false },
			
			{ absolute: [-200 * 1 / 8 + 400, 100 * Math.sin(-90 * 1 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 2 / 8 + 400, 100 * Math.sin(-90 * 2 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 3 / 8 + 400, 100 * Math.sin(-90 * 3 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 4 / 8 + 400, 100 * Math.sin(-90 * 4 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 5 / 8 + 400, 100 * Math.sin(-90 * 5 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 6 / 8 + 400, 100 * Math.sin(-90 * 6 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 7 / 8 + 400, 100 * Math.sin(-90 * 7 / 8 * Math.PI / 180) + 150] },
			
			{ absolute: [100 * Math.cos(24 * Math.PI / 16) + 200, 100 * Math.sin(24 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(23 * Math.PI / 16) + 200, 100 * Math.sin(23 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(22 * Math.PI / 16) + 200, 100 * Math.sin(22 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(21 * Math.PI / 16) + 200, 100 * Math.sin(21 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(20 * Math.PI / 16) + 200, 100 * Math.sin(20 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(19 * Math.PI / 16) + 200, 100 * Math.sin(19 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(18 * Math.PI / 16) + 200, 100 * Math.sin(18 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(17 * Math.PI / 16) + 200, 100 * Math.sin(17 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(16 * Math.PI / 16) + 200, 100 * Math.sin(16 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(15 * Math.PI / 16) + 200, 100 * Math.sin(15 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(14 * Math.PI / 16) + 200, 100 * Math.sin(14 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(13 * Math.PI / 16) + 200, 100 * Math.sin(13 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(12 * Math.PI / 16) + 200, 100 * Math.sin(12 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(11 * Math.PI / 16) + 200, 100 * Math.sin(11 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(10 * Math.PI / 16) + 200, 100 * Math.sin(10 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(9 * Math.PI / 16) + 200, 100 * Math.sin(9 * Math.PI / 16) + 150] },
			
			{ absolute: [-200 * 7 / 8 + 400, -100 * Math.sin(-90 * 7 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 6 / 8 + 400, -100 * Math.sin(-90 * 6 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 5 / 8 + 400, -100 * Math.sin(-90 * 5 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 4 / 8 + 400, -100 * Math.sin(-90 * 4 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 3 / 8 + 400, -100 * Math.sin(-90 * 3 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 2 / 8 + 400, -100 * Math.sin(-90 * 2 / 8 * Math.PI / 180) + 150] },
			{ absolute: [-200 * 1 / 8 + 400, -100 * Math.sin(-90 * 1 / 8 * Math.PI / 180) + 150] },
			
			{ absolute: [400, 150] },
			
			{ absolute: [200 * 1 / 8 + 400, -100 * Math.sin(90 * 1 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 2 / 8 + 400, -100 * Math.sin(90 * 2 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 3 / 8 + 400, -100 * Math.sin(90 * 3 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 4 / 8 + 400, -100 * Math.sin(90 * 4 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 5 / 8 + 400, -100 * Math.sin(90 * 5 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 6 / 8 + 400, -100 * Math.sin(90 * 6 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 7 / 8 + 400, -100 * Math.sin(90 * 7 / 8 * Math.PI / 180) + 150] },
			
			{ absolute: [100 * Math.cos(25 * Math.PI / 16) + 600, 100 * Math.sin(25 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(26 * Math.PI / 16) + 600, 100 * Math.sin(26 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(27 * Math.PI / 16) + 600, 100 * Math.sin(27 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(28 * Math.PI / 16) + 600, 100 * Math.sin(28 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(29 * Math.PI / 16) + 600, 100 * Math.sin(29 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(30 * Math.PI / 16) + 600, 100 * Math.sin(30 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(31 * Math.PI / 16) + 600, 100 * Math.sin(31 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(32 * Math.PI / 16) + 600, 100 * Math.sin(32 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(1 * Math.PI / 16) + 600, 100 * Math.sin(1 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(2 * Math.PI / 16) + 600, 100 * Math.sin(2 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(3 * Math.PI / 16) + 600, 100 * Math.sin(3 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(4 * Math.PI / 16) + 600, 100 * Math.sin(4 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(5 * Math.PI / 16) + 600, 100 * Math.sin(5 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(6 * Math.PI / 16) + 600, 100 * Math.sin(6 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(7 * Math.PI / 16) + 600, 100 * Math.sin(7 * Math.PI / 16) + 150] },
			{ absolute: [100 * Math.cos(8 * Math.PI / 16) + 600, 100 * Math.sin(8 * Math.PI / 16) + 150] },
			
			{ absolute: [200 * 7 / 8 + 400, 100 * Math.sin(90 * 7 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 6 / 8 + 400, 100 * Math.sin(90 * 6 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 5 / 8 + 400, 100 * Math.sin(90 * 5 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 4 / 8 + 400, 100 * Math.sin(90 * 4 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 3 / 8 + 400, 100 * Math.sin(90 * 3 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 2 / 8 + 400, 100 * Math.sin(90 * 2 / 8 * Math.PI / 180) + 150] },
			{ absolute: [200 * 1 / 8 + 400, 100 * Math.sin(90 * 1 / 8 * Math.PI / 180) + 150] },
			
			{ absolute: [400, 150], loop: 2 },
		]
	};
};