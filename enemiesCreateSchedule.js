// 敵生成スケジュール
// time: 前の敵が生成されてから、敵が生成される時間（FRAMEの倍数でなくてはならない）。
// partition: tureの場合、ゲームに区切りをつける（敵が画面上からいなくなったら作動する）。
// boss: 生成したいボスのクラスを指定する。
// enemies: [ [[cx, cy], hp, speed, actionSchedule, Danmaku], [...], ...]
// なおbossとenemiesは両立出来ないため、片方だけ指定すること。

let EnemiesCreateSchedule = function() {
	// 15は雑魚敵の半径
	const UPPER_SIDE = -15;
	const RIGHT_SIDE = SCREEN_WIDTH + 15;
	const LOWER_SIDE = SCREEN_HEIGHT + 15;
	const LEFT_SIDE = -15;
	
	return [
		/*{
			time: SEC,
			enemies: [[[400, UPPER_SIDE], 10, 3, BAS.circle, BasicDanmaku2]]
		},*/
		
		{
			time: SEC,
			enemies: [[[LEFT_SIDE, 200], 10, 3, EAS.toLeftKunekune, BasicDanmaku1]]
		},
		{
			time: 30 * FRAME,
			enemies: [[[LEFT_SIDE, 200], 10, 3, EAS.toLeftKunekune, BasicDanmaku1]]
		},
		{
			time: 30 * FRAME,
			enemies: [[[LEFT_SIDE, 200], 10, 3, EAS.toLeftKunekune, BasicDanmaku1]]
		},
		{
			time: 30 * FRAME,
			enemies: [[[LEFT_SIDE, 200], 10, 3, EAS.toLeftKunekune, BasicDanmaku1]]
		},
		{
			time: 30 * FRAME,
			enemies: [[[LEFT_SIDE, 200], 10, 3, EAS.toLeftKunekune, BasicDanmaku1]]
		},
		
		{
			time: 30 * FRAME,
			enemies: [[[RIGHT_SIDE, 300], 10, 3, EAS.toRightKunekune, BasicDanmaku1]]
		},
		{
			time: 30 * FRAME,
			enemies: [[[RIGHT_SIDE, 300], 10, 3, EAS.toRightKunekune, BasicDanmaku1]]
		},
		{
			time: 30 * FRAME,
			enemies: [[[RIGHT_SIDE, 300], 10, 3, EAS.toRightKunekune, BasicDanmaku1]]
		},
		{
			time: 30 * FRAME,
			enemies: [[[RIGHT_SIDE, 300], 10, 3, EAS.toRightKunekune, BasicDanmaku1]]
		},
		{
			time: 30 * FRAME,
			enemies: [[[RIGHT_SIDE, 300], 10, 3, EAS.toRightKunekune, BasicDanmaku1]]
		},
		
		{
			time: SEC,
			enemies: [[[200, UPPER_SIDE], 5, 2, EAS.angle60, BasicDanmaku2]]
		},
		{
			time: SEC,
			enemies: [[[200, UPPER_SIDE], 5, 2, EAS.angle60, BasicDanmaku2]]
		},
		{
			time: SEC,
			enemies: [[[200, UPPER_SIDE], 5, 2, EAS.angle60, BasicDanmaku2]]
		},
		{
			time: SEC,
			enemies: [[[200, UPPER_SIDE], 5, 2, EAS.angle60, BasicDanmaku2]]
		},
		{
			time: SEC,
			enemies: [[[200, UPPER_SIDE], 5, 2, EAS.angle60, BasicDanmaku2]]
		},
		
		{
			time: 2 * SEC,
			enemies: [[[600, UPPER_SIDE], 5, 2, EAS.angle120, BasicDanmaku2]]
		},
		{
			time: SEC,
			enemies: [[[600, UPPER_SIDE], 5, 2, EAS.angle120, BasicDanmaku2]]
		},
		{
			time: SEC,
			enemies: [[[600, UPPER_SIDE], 5, 2, EAS.angle120, BasicDanmaku2]]
		},
		{
			time: SEC,
			enemies: [[[600, UPPER_SIDE], 5, 2, EAS.angle120, BasicDanmaku2]]
		},
		{
			time: SEC,
			enemies: [[[600, UPPER_SIDE], 5, 2, EAS.angle120, BasicDanmaku2]]
		},
		
		
		
		
		{
			partition: true,
			time: SEC,
			enemies: [[[200, UPPER_SIDE], 35, 4, EAS.stop, BasicDanmaku3],
			         [[400, UPPER_SIDE], 35, 4, EAS.stop, BasicDanmaku3],
			         [[600, UPPER_SIDE], 35, 4, EAS.stop, BasicDanmaku3]]
		},
		
		{
			partition: true,
			time: 2 * SEC,
			boss: Boss1
		}
	];
};