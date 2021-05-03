// 弾幕クラス
// このクラスは必ず
// ・引数に攻撃者オブジェクト（と必要ならば攻撃対象オブジェクト）を持つコンストラクタ
// ・特定のプロパティを初期化するinitメソッド
// ・ミサイルオブジェクトの配列を返すcreateMissilesメソッド
// ・時間を進めるtimekeeperメソッド
// を定義しなければならない。



// 垂直に放たれるミサイル
let BasicDanmaku1 = function(attacker) {
	this.attacker = attacker;
	this.angle = 90;
	this.speed = 6;
	this.color = 'darkred';
	this.createIntervalSum = 0;
	this.maxCreateInterval = 20 * FRAME;
	this.canCreate = true;
};

BasicDanmaku1.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

BasicDanmaku1.prototype.createMissiles = function() {
	if (!this.canCreate) {
		return [];
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	return [new Missile(this.attacker, this.speed, this.angle, 10, this.color)];
};

BasicDanmaku1.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
};



// ホーミングミサイル
let BasicDanmaku2 = function(attacker, target) {
	this.attacker = attacker;
	this.target = target;
	this.angle = 90;
	this.speed = 8;
	this.color = 'darkolivegreen';
	this.createIntervalSum = 0;
	this.maxCreateInterval = 20 * FRAME;
	this.canCreate = true;
};

BasicDanmaku2.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

BasicDanmaku2.prototype.createMissiles = function() {
	if (!this.canCreate) {
		return [];
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	return [new HomingMissile(this.attacker, this.speed, this.target, 8, this.color)];
};

BasicDanmaku2.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
};



// 3Wayホーミングミサイル
let BasicDanmaku3 = function(attacker, target) {
	this.attacker = attacker;
	this.target = target;
	this.speed = 4;
	this.radius = 10;
	this.color = 'cornflowerblue';
	this.createIntervalSum = 0;
	this.maxCreateInterval = 50 * FRAME;
	this.canCreate = true;
};

BasicDanmaku3.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

BasicDanmaku3.prototype.createMissiles = function() {
	if (!this.canCreate) {
		return [];
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	let angle = Math.atan2(this.target.cy - this.attacker.cy, this.target.cx - this.attacker.cx) * 180 / Math.PI;
	let missiles = [
		new Missile(this.attacker, this.speed, angle - 15, this.radius, this.color),
		new Missile(this.attacker, this.speed, angle, this.radius, this.color),
		new Missile(this.attacker, this.speed, angle + 15, this.radius, this.color)
	];
	
	return missiles;
};

BasicDanmaku3.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
};



// test
// 弾幕クラス
let Danmaku1 = function(attacker) {
	this.attacker = attacker;
	this.angle = 90;
	this.createIntervalSum = 0;
	this.maxCreateInterval = 15 * FRAME;
	this.canCreate = true;
};

Danmaku1.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

Danmaku1.prototype.createMissiles = function() {
	if (!this.canCreate) {
		return [];
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	let missiles = [];
	missiles[0] = new Missile(this.attacker, 5, this.angle, 15, 'palevioletred');
	missiles[1] = new Missile(this.attacker, 5, this.angle - 144, 15, 'palevioletred');
	missiles[2] = new Missile(this.attacker, 5, this.angle - 72, 15, 'palevioletred');
	missiles[3] = new Missile(this.attacker, 5, this.angle + 72, 15, 'palevioletred');
	missiles[4] = new Missile(this.attacker, 5, this.angle + 144, 15, 'palevioletred');
	missiles[5] = new Missile(this.attacker, 1, getRandom(360), 10, 'green');
	missiles[6] = new Missile(this.attacker, 2, getRandom(360), 10, 'green');
	missiles[7] = new Missile(this.attacker, 3, getRandom(360), 10, 'green');
	missiles[8] = new Missile(this.attacker, 4, getRandom(360), 10, 'green');
	missiles[9] = new Missile(this.attacker, 4, getRandom(360), 10, 'green');
	this.angle += 20;
	
	return missiles;
};

Danmaku1.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
};



// test
// 弾幕クラス2
let Danmaku2 = function(attacker) {
	this.attacker = attacker;
	this.angle = 0;
	this.createIntervalSum = 0;
	this.maxCreateInterval = 35 * FRAME;
	this.canCreate = true;
	this.danmaku1 = new Danmaku1(attacker);
};

Danmaku2.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

Danmaku2.prototype.createMissiles = function() {
	let missiles = this.danmaku1.createMissiles();
	
	if (!this.canCreate) {
		return missiles;
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	missiles = missiles.concat([
		new Missile(this.attacker, 3, this.angle, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle + 30, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle + 60, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle + 90, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle + 120, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle + 150, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle + 180, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle - 30, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle - 60, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle - 90, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle - 120, 20, 'gray'),
		new Missile(this.attacker, 3, this.angle - 150, 20, 'gray')
	]);
	this.angle -= 15;
	
	return missiles;
};

Danmaku2.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
	this.danmaku1.timekeeper();
};



// 弾幕クラス3
let Danmaku3 = function(attacker) {
	this.attacker = attacker;
	this.createIntervalSum = 0;
	this.maxCreateInterval = 180 * FRAME;
	this.canCreate = true;
};

Danmaku3.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

Danmaku3.prototype.createMissiles = function() {
	if (!this.canCreate) {
		return [];
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	let missiles = [
		new Missile(this.attacker, 1, 0, 25, 'gray'),
		new Missile(this.attacker, 1, 30, 25, 'gray'),
		new Missile(this.attacker, 1, 60, 25, 'gray'),
		new Missile(this.attacker, 1, 90, 25, 'gray'),
		new Missile(this.attacker, 1, 120, 25, 'gray'),
		new Missile(this.attacker, 1, 150, 25, 'gray'),
		new Missile(this.attacker, 1, 180, 25, 'gray'),
		new Missile(this.attacker, 1, -30, 25, 'gray'),
		new Missile(this.attacker, 1, -60, 25, 'gray'),
		new Missile(this.attacker, 1, -90, 25, 'gray'),
		new Missile(this.attacker, 1, -120, 25, 'gray'),
		new Missile(this.attacker, 1, -150, 25, 'gray'),
		new MissileBase(this.attacker, 200, 600, 1, 0, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, 30, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, 60, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, 90, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, 120, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, 150, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, 180, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, -30, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, -60, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, -90, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, -120, 25, 'navy'),
		new MissileBase(this.attacker, 200, 600, 1, -150, 25, 'navy'),
		new MissileBase(this.attacker, 600, 600, 1, 0, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, 30, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, 60, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, 90, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, 120, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, 150, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, 180, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, -30, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, -60, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, -90, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, -120, 25, 'darkslategray'),
		new MissileBase(this.attacker, 600, 600, 1, -150, 25, 'darkslategray')
	];
	
	return missiles;
};

Danmaku3.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
};



// カーブ
let Danmaku4 = function(attacker, target) {
	this.attacker = attacker;
	this.target = target;
	this.angle = 0;
	this.createIntervalSum = 0;
	this.maxCreateInterval = 40 * FRAME;
	this.canCreate = true;
};

Danmaku4.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

Danmaku4.prototype.createMissiles = function() {
	if (!this.canCreate) {
		return [];
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	let missiles = [
		new CurveMissile(this.attacker, 4, this.angle + 0, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + 30, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + 60, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + 90, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + 120, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + 150, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + 180, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + -30, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + -60, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + -90, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + -120, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 4, this.angle + -150, 2, 20, 'pink'),
		new CurveMissile(this.attacker, 3, this.angle + 0, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + 30, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + 60, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + 90, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + 120, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + 150, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + 180, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + -30, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + -60, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + -90, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + -120, -2.5, 20, 'gray'),
		new CurveMissile(this.attacker, 3, this.angle + -150, -2.5, 20, 'gray'),
		new HomingMissile(this.attacker, 5, this.target, 10, 'blue')
	];
	
	this.angle += 2;
	
	return missiles;
};

Danmaku4.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
};



// test
// 加速減速
let Danmaku5 = function(attacker) {
	this.attacker = attacker;
	this.angle = 90;
	this.color = 'palevioletred';
	this.createIntervalSum = 0;
	this.maxCreateInterval = 40 * FRAME;
	this.canCreate = true;
};

Danmaku5.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

Danmaku5.prototype.createMissiles = function() {
	if (!this.canCreate) {
		return [];
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	let missiles = [
		new KasokudoMissile(this.attacker, 2, this.angle - 15, -0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 10, 0, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 5, 0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle, 0.12, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 5, 0.18, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 10, 0.24, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 15, 0.30, 10, this.color),
		
		new KasokudoMissile(this.attacker, 2, this.angle + 72 - 15, -0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 72 - 10, 0, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 72 - 5, 0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 72, 0.12, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 72 + 5, 0.18, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 72 + 10, 0.24, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 72 + 15, 0.30, 10, this.color),
		
		new KasokudoMissile(this.attacker, 2, this.angle + 144 - 15, -0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 144 - 10, 0, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 144 - 5, 0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 144, 0.12, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 144 + 5, 0.18, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 144 + 10, 0.24, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle + 144 + 15, 0.30, 10, this.color),
		
		new KasokudoMissile(this.attacker, 2, this.angle - 72 - 15, -0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 72 - 10, 0, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 72 - 5, 0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 72, 0.12, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 72 + 5, 0.18, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 72 + 10, 0.24, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 72 + 15, 0.30, 10, this.color),
		
		new KasokudoMissile(this.attacker, 2, this.angle - 144 - 15, -0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 144 - 10, 0, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 144 - 5, 0.06, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 144, 0.12, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 144 + 5, 0.18, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 144 + 10, 0.24, 10, this.color),
		new KasokudoMissile(this.attacker, 2, this.angle - 144 + 15, 0.30, 10, this.color),
	];
	this.angle += 12;
	
	return missiles;
};

Danmaku5.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
};



// Danaku5の派生
let Danmaku6 = function(attacker) {
	Danmaku5.call(this, attacker);
	this.angle = 126;
	this.color = 'green';
	this.createIntervalSum = 20 * FRAME;
	this.canCreate = false;
};

Danmaku6.prototype = Object.create(Danmaku5.prototype);

Danmaku6.prototype.init = function() {
	this.createIntervalSum = 20 * FRAME;
	this.canCreate = false;
};



// D5 + D6
let Danmaku7 = function(attacker) {
	this.danmaku5 = new Danmaku5(attacker);
	this.danmaku6 = new Danmaku6(attacker);
};

Danmaku7.prototype = Object.create(Danmaku5.prototype);

Danmaku7.prototype.init = function() {
	this.danmaku5.init();
	this.danmaku6.init();
};

Danmaku7.prototype.createMissiles = function() {
	let missiles = this.danmaku5.createMissiles();
	missiles = missiles.concat(this.danmaku6.createMissiles());
	
	return missiles;
};

Danmaku7.prototype.timekeeper = function() {
	this.danmaku5.timekeeper();
	this.danmaku6.timekeeper();
};



let Danmaku8 = function(attacker, target) {
	this.attacker = attacker;
	this.target = target;
	this.createIntervalSum = 0;
	this.maxCreateInterval = 20 * FRAME;
	this.canCreate = true;
};

Danmaku8.prototype.init = function() {
	this.createIntervalSum = 0;
	this.canCreate = true;
};

Danmaku8.prototype.createMissiles = function() {
	if (!this.canCreate) {
		return [];
	}
	this.canCreate = false;
	this.createIntervalSum = 0;
	
	let missiles = [
		new Missile(this.attacker, 4, 0, 20, 'firebrick'),
		new Missile(this.attacker, 4, 18, 20, 'firebrick'),
		new Missile(this.attacker, 4, 36, 20, 'firebrick'),
		new Missile(this.attacker, 4, 54, 20, 'firebrick'),
		new Missile(this.attacker, 4, 72, 20, 'firebrick'),
		new Missile(this.attacker, 4, 90, 20, 'firebrick'),
		new Missile(this.attacker, 4, 108, 20, 'firebrick'),
		new Missile(this.attacker, 4, 126, 20, 'firebrick'),
		new Missile(this.attacker, 4, 144, 20, 'firebrick'),
		new Missile(this.attacker, 4, 162, 20, 'firebrick'),
		new Missile(this.attacker, 4, 180, 20, 'firebrick'),
		new Missile(this.attacker, 4, 198, 20, 'firebrick'),
		new Missile(this.attacker, 4, 216, 20, 'firebrick'),
		new Missile(this.attacker, 4, 234, 20, 'firebrick'),
		new Missile(this.attacker, 4, 252, 20, 'firebrick'),
		new Missile(this.attacker, 4, 270, 20, 'firebrick'),
		new Missile(this.attacker, 4, 288, 20, 'firebrick'),
		new Missile(this.attacker, 4, 306, 20, 'firebrick'),
		new Missile(this.attacker, 4, 324, 20, 'firebrick'),
		new Missile(this.attacker, 4, 342, 20, 'firebrick')
	];
	
	return missiles;
};

Danmaku8.prototype.timekeeper = function() {
	this.createIntervalSum += FRAME;
	if (this.createIntervalSum > this.maxCreateInterval) {
		this.canCreate = true;
	}
};