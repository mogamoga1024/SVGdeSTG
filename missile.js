// 描画画面外の余白
const MARGIN = Number(30);



// ミサイル管理クラス
let MissilesManager = function() {
	this.list = [];
};

MissilesManager.prototype.move = function() {
	for (let i = this.list.length - 1; i >= 0 ; i--) {
		let missile = this.list[i];
		missile.move();
		if (missile.cx + missile.r < -MARGIN || missile.cy + missile.r < -MARGIN ||
		    missile.cx - missile.r > SCREEN_WIDTH + MARGIN || missile.cy - missile.r > SCREEN_HEIGHT + MARGIN) {
			this.list.splice(i, 1);
		}
	}
};

MissilesManager.prototype.push = function(missiles) {
	Array.prototype.push.apply(this.list, missiles);
};



// ミサイル基底クラス
// 任意の場所からミサイルを発射できる。
let MissileBase = function(attacker, cx, cy, speed, angle, radius, color) {
	this.cx = cx;
	this.cy = cy;
	this.r = radius;
	this.speed = speed;
	this.angle = angle;
	this.dx = speed * Math.cos(angle * Math.PI / 180);
	this.dy = speed * Math.sin(angle * Math.PI / 180);
	this.selector = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
	
	switch (attacker.type) {
		case 'player':
			this.targetType = 'enemy';
			break;
		case 'enemy':
			this.targetType = 'player';
			break;
		case 'boss':
			this.targetType = 'player';
			break;
	}
	
	this.selector.attr({cx: cx, cy: cy, r: this.r, fill: color});
	$('svg').prepend(this.selector);
};

MissileBase.prototype.move = function() {
	this.cx += this.dx;
	this.cy += this.dy;
	this.selector.attr({cx: this.cx, cy: this.cy});
	if (this.cx + this.r < -MARGIN || this.cy + this.r < -MARGIN ||
	    this.cx - this.r > SCREEN_WIDTH + MARGIN || this.cy - this.r > SCREEN_HEIGHT + MARGIN) {
		this.selector.remove();
	}
};



// 直線ミサイルクラス
// 自機からミサイルを発射する。
let Missile = function(attacker, speed, angle, radius, color) {
	MissileBase.call(this, attacker, attacker.cx, attacker.cy, speed, angle, radius, color);
};

Missile.prototype = Object.create(MissileBase.prototype);



// ホーミングミサイルクラス
// 自機からミサイルを発射する。
let HomingMissile = function(attacker, speed, target, radius, color) {
	let angle = Math.atan2(target.cy - attacker.cy, target.cx - attacker.cx) * 180 / Math.PI;
	MissileBase.call(this, attacker, attacker.cx, attacker.cy, speed, angle, radius, color);
};

HomingMissile.prototype = Object.create(MissileBase.prototype);



// カーブするミサイル
// 自機からミサイルを発射する。
// 10移動するとベクトルが変わる
let CurveMissile = function(attacker, speed, angle, da, radius, color) {
	MissileBase.call(this, attacker, attacker.cx, attacker.cy, speed, angle, radius, color);
	this.da = da;
	this.vectorX = 0;
	this.vectorY = 0;
	this.maxVectorX = 10 * Math.cos(angle * Math.PI / 180);
	this.maxVectorY = 10 * Math.sin(angle * Math.PI / 180);
};

CurveMissile.prototype = Object.create(MissileBase.prototype);

CurveMissile.prototype.move = function() {
	if (Math.abs(this.vectorX) >= Math.abs(this.maxVectorX) &&
	    Math.abs(this.vectorY) >= Math.abs(this.maxVectorY)) {
		this.vectorX = 0;
		this.vectorY = 0;
		if (this.da > 0) {
			this.da -= 0.01;
			if (this.da < 0) this.da = 0;
		}
		else if(this.da < 0) {
			this.da += 0.01;
			if (this.da > 0) this.da = 0;
		}
		let tmpMVX = this.maxVectorX;
		this.maxVectorX = this.maxVectorX * Math.cos(this.da * Math.PI / 180) - this.maxVectorY * Math.sin(this.da * Math.PI / 180);
		this.maxVectorY = tmpMVX * Math.sin(this.da * Math.PI / 180) + this.maxVectorY * Math.cos(this.da * Math.PI / 180);
		this.angle += this.da;
		this.dx = this.speed * Math.cos(this.angle * Math.PI / 180);
		this.dy = this.speed * Math.sin(this.angle * Math.PI / 180);
	}
	
	this.cx += this.dx;
	this.cy += this.dy;
	this.vectorX += this.dx;
	this.vectorY += this.dy;
	this.selector.attr({cx: this.cx, cy: this.cy});
	if (this.cx + this.r < -MARGIN || this.cy + this.r < -MARGIN ||
	    this.cx - this.r > SCREEN_WIDTH + MARGIN || this.cy - this.r > SCREEN_HEIGHT + MARGIN) {
		this.selector.remove();
	}
};



// 加速度付きミサイル
// 自機からミサイルを発射する。
// 100移動すると速度が変わる
let KasokudoMissile = function(attacker, speed, angle, ds, radius, color) {
	MissileBase.call(this, attacker, attacker.cx, attacker.cy, speed, angle, radius, color);
	this.ds = ds;
	this.vectorX = 0;
	this.vectorY = 0;
	this.maxVectorX = 100 * Math.cos(angle * Math.PI / 180);
	this.maxVectorY = 100 * Math.sin(angle * Math.PI / 180);
};

KasokudoMissile.prototype = Object.create(MissileBase.prototype);

KasokudoMissile.prototype.move = function() {
	if (Math.abs(this.vectorX) >= Math.abs(this.maxVectorX) &&
	    Math.abs(this.vectorY) >= Math.abs(this.maxVectorY)) {
		this.vectorX = 0;
		this.vectorY = 0;
		this.speed += this.ds;
		if (this.speed <= 0) this.speed = 1;
		this.dx = this.speed * Math.cos(this.angle * Math.PI / 180);
		this.dy = this.speed * Math.sin(this.angle * Math.PI / 180);
	}
	
	this.cx += this.dx;
	this.cy += this.dy;
	this.vectorX += this.dx;
	this.vectorY += this.dy;
	this.selector.attr({cx: this.cx, cy: this.cy});
	if (this.cx + this.r < -MARGIN || this.cy + this.r < -MARGIN ||
	    this.cx - this.r > SCREEN_WIDTH + MARGIN || this.cy - this.r > SCREEN_HEIGHT + MARGIN) {
		this.selector.remove();
	}
};