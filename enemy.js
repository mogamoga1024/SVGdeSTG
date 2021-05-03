const EPSILON = 5;



// 敵管理クラス
let EnemiesManager = function() {
	this.list = [];
};

EnemiesManager.prototype.move = function() {
	for (let i = this.list.length - 1; i >= 0 ; i--) {
		let enemy = this.list[i];
		enemy.move();
		if (enemy.cx + enemy.r < 0 || enemy.cy + enemy.r < 0 ||
		    enemy.cx - enemy.r > SCREEN_WIDTH || enemy.cy - enemy.r > SCREEN_HEIGHT) {
			this.list.splice(i, 1);
		}
	}
};

EnemiesManager.prototype.shot = function() {
	let missiles = [];
	this.list.forEach(
		function(enemy) {
			Array.prototype.push.apply(missiles, enemy.shot());
		}
	);
	return missiles;
};

EnemiesManager.prototype.push = function(enemies) {
	Array.prototype.push.apply(this.list, enemies)
};

EnemiesManager.prototype.timekeeper = function() {
	this.list.forEach(
		function(enemy) {
			enemy.timekeeper();
		}
	);
};



// 敵クラス
let Enemy = function(centerPoint, hp, speed, schedule, Danmaku, target) {
	this.type = 'enemy';
	this.target = target;
	this.hp = hp;
	this.cx = centerPoint[0];
	this.cy = centerPoint[1];
	this.r = 15;
	this.color = 'tomato';
	this.speed = speed;
	this.danmaku = new Danmaku(this, target);
	this.scdlCounter = 0;
	this.schedule = schedule;
	this.delay = 0;
	this.maxDelay = 0;
	this.vectorX = 0;
	this.vectorY = 0;
	this.maxVectorX = 0;
	this.maxVectorY = 0;
	this.dx = 0;
	this.dy = 0;
	this.selector = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
	
	if (schedule[0].delay != null) {
		this.maxDelay = schedule[0].delay;
	}
	else if (schedule[0].absolute != null) {
		this.maxVectorX = schedule[0].absolute[0] - this.cx;
		this.maxVectorY = schedule[0].absolute[1] - this.cy;
		let angle = Math.atan2(this.maxVectorY, this.maxVectorX) * 180 / Math.PI;
		this.dx = this.speed * Math.cos(angle * Math.PI / 180);
		this.dy = this.speed * Math.sin(angle * Math.PI / 180);
	}
	else {
		this.maxVectorX = schedule[0].vector[0];
		this.maxVectorY = schedule[0].vector[1];
		let angle = Math.atan2(this.maxVectorY, this.maxVectorX) * 180 / Math.PI;
		this.dx = this.speed * Math.cos(angle * Math.PI / 180);
		this.dy = this.speed * Math.sin(angle * Math.PI / 180);
	}
	
	this.selector.attr({cx: this.cx, cy: this.cy, r: this.r, fill: this.color});
	$('svg').append(this.selector);
};

Enemy.prototype.move = function() {
	if (this.delay > this.maxDelay &&
	    this.scdlCounter !== this.schedule.length - 1 &&
	    Math.abs(this.vectorX - this.maxVectorX) <= EPSILON &&
	    Math.abs(this.vectorY - this.maxVectorY) <= EPSILON) {
		let i = ++this.scdlCounter;
		let action = this.schedule[i];
		if (action.canShot === false) {
			this.danmaku.init();
		}
		if (action.delay != null) {
			this.delay = 0;
			this.maxDelay = action.delay;
			this.dx = 0;
			this.dy = 0;
			this.vectorX = 0;
			this.vectorY = 0;
			this.maxVectorX = 0;
			this.maxVectorY = 0;
		}
		else if (action.absolute != null) {
			this.vectorX = 0;
			this.vectorY = 0;
			this.maxVectorX = action.absolute[0] - this.cx;
			this.maxVectorY = action.absolute[1] - this.cy;
			let angle = Math.atan2(this.maxVectorY, this.maxVectorX) * 180 / Math.PI;
			this.dx = this.speed * Math.cos(angle * Math.PI / 180);
			this.dy = this.speed * Math.sin(angle * Math.PI / 180);
		}
		else {
			this.vectorX = 0;
			this.vectorY = 0;
			this.maxVectorX = action.vector[0];
			this.maxVectorY = action.vector[1];
			let angle = Math.atan2(this.maxVectorY, this.maxVectorX) * 180 / Math.PI;
			this.dx = this.speed * Math.cos(angle * Math.PI / 180);
			this.dy = this.speed * Math.sin(angle * Math.PI / 180);
		}
		if (action.loop != null) {
			this.scdlCounter = action.loop - 1;
		}
	}
	this.cx += this.dx;
	this.cy += this.dy;
	this.vectorX += this.dx;
	this.vectorY += this.dy;
	this.selector.attr({cx: this.cx, cy: this.cy});
	if (this.cx + this.r < 0 || this.cy + this.r < 0 || this.cx - this.r > SCREEN_WIDTH || this.cy - this.r > SCREEN_HEIGHT) {
		this.selector.remove();
	}
};

Enemy.prototype.shot = function() {
	let scdlCounter = (this.scdlCounter === -1 ? this.schedule.length - 1 : this.scdlCounter);
	if (this.schedule[scdlCounter].canShot === false) {
		return [];
	}
	
	let missiles = this.danmaku.createMissiles();
	
	return missiles;
};

Enemy.prototype.receiveDamage = function() {
	this.hp--;
};

Enemy.prototype.timekeeper = function() {
	this.delay += FRAME;
	let scdlCounter = (this.scdlCounter === -1 ? this.schedule.length - 1 : this.scdlCounter);
	if (this.schedule[scdlCounter].canShot !== false) {
		this.danmaku.timekeeper();
	}
};



// ボス
let Boss1 = function(target) {
	this.maxHps = [100, 110, 160, 170, 180];
	//this.maxHps = [2, 2, 2, 2, 2];
	this.eas = [BAS.star, BAS.circle, BAS.stop, BAS.stop, BAS.stop];
	this.danmakus = [Danmaku8, Danmaku3, Danmaku2, Danmaku4, Danmaku7];
	//this.eas = [BAS.mugenMark];
	//this.danmakus = [BasicDanmaku1];
	this.speedForStartPosition = 6;
	this.tmpSpeed = 5;
	Enemy.call(this, [400, -15], this.maxHps[0], this.speedForStartPosition, this.eas[0], this.danmakus[0], target);
	this.type = 'boss';
	this.bph = parseInt($('#hp-bar').css('width')) / this.hp;
	this.styleCounter = 0;
	this.isMuteki = true;
	this.mutekiTime = -60 * SEC;
	this.maxMutekiTime = SEC;
	this.isActionFirst = true;
};

Boss1.prototype = Object.create(Enemy.prototype);

Boss1.prototype.move = function() {
	if (this.delay > this.maxDelay &&
	    this.scdlCounter !== this.schedule.length - 1 &&
	    Math.abs(this.vectorX - this.maxVectorX) <= EPSILON &&
	    Math.abs(this.vectorY - this.maxVectorY) <= EPSILON) {
		if (this.isActionFirst && this.scdlCounter === 0) {
			this.isActionFirst = false;
			this.speed = this.tmpSpeed;
			this.mutekiTime = 0;
			$('#current-hp').animate({width: $('#hp-bar').css('width')}, SEC, 'linear');
		}
		let i = ++this.scdlCounter;
		let action = this.schedule[i];
		if (action.canShot === false) {
			this.danmaku.init();
		}
		if (action.delay != null) {
			this.delay = 0;
			this.maxDelay = action.delay;
			this.dx = 0;
			this.dy = 0;
			this.vectorX = 0;
			this.vectorY = 0;
			this.maxVectorX = 0;
			this.maxVectorY = 0;
		}
		else if (action.absolute != null) {
			this.vectorX = 0;
			this.vectorY = 0;
			this.maxVectorX = action.absolute[0] - this.cx;
			this.maxVectorY = action.absolute[1] - this.cy;
			let angle = Math.atan2(this.maxVectorY, this.maxVectorX) * 180 / Math.PI;
			this.dx = this.speed * Math.cos(angle * Math.PI / 180);
			this.dy = this.speed * Math.sin(angle * Math.PI / 180);
		}
		else {
			this.vectorX = 0;
			this.vectorY = 0;
			this.maxVectorX = action.vector[0];
			this.maxVectorY = action.vector[1];
			let angle = Math.atan2(this.maxVectorY, this.maxVectorX) * 180 / Math.PI;
			this.dx = this.speed * Math.cos(angle * Math.PI / 180);
			this.dy = this.speed * Math.sin(angle * Math.PI / 180);
		}
		if (action.loop != null) {
			this.scdlCounter = action.loop - 1;
		}
	}
	this.cx += this.dx;
	this.cy += this.dy;
	this.vectorX += this.dx;
	this.vectorY += this.dy;
	this.selector.attr({cx: this.cx, cy: this.cy});
	if (this.cx + this.r < 0 || this.cy + this.r < 0 || this.cx - this.r > SCREEN_WIDTH || this.cy - this.r > SCREEN_HEIGHT) {
		this.selector.remove();
	}
};

Boss1.prototype.receiveDamage = function() {
	if (!this.isMuteki) {
		this.hp--;
		$('#current-hp').animate({width: this.hp * this.bph}, FRAME, 'linear');
	}
};

Boss1.prototype.changeStyle = function() {
	this.styleCounter++;
	this.isActionFirst = true;
	this.isMuteki = true;
	this.mutekiTime = -60 * SEC;
	this.hp = this.maxHps[this.styleCounter];
	this.tmpSpeed = this.speed;
	this.speed = this.speedForStartPosition;
	this.schedule = this.eas[this.styleCounter];
	this.scdlCounter = 0;
	this.delay = 0;
	this.maxDelay = 0;
	this.vectorX = 0;
	this.vectorY = 0;
	this.maxVectorX = 0;
	this.maxVectorY = 0;
	this.dx = 0;
	this.dy = 0;
	this.danmaku = new this.danmakus[this.styleCounter](this, this.target);
	this.bph = parseInt($('#hp-bar').css('width')) / this.hp;
	
	if (this.schedule[0].delay != null) {
		this.maxDelay = this.schedule[0].delay;
	}
	else if (this.schedule[0].absolute != null) {
		this.maxVectorX = this.schedule[0].absolute[0] - this.cx;
		this.maxVectorY = this.schedule[0].absolute[1] - this.cy;
		let angle = Math.atan2(this.maxVectorY, this.maxVectorX) * 180 / Math.PI;
		this.dx = this.speed * Math.cos(angle * Math.PI / 180);
		this.dy = this.speed * Math.sin(angle * Math.PI / 180);
	}
	else {
		this.maxVectorX = this.schedule[0].vector[0];
		this.maxVectorY = this.schedule[0].vector[1];
		let angle = Math.atan2(this.maxVectorY, this.maxVectorX) * 180 / Math.PI;
		this.dx = this.speed * Math.cos(angle * Math.PI / 180);
		this.dy = this.speed * Math.sin(angle * Math.PI / 180);
	}
};

Boss1.prototype.timekeeper = function() {
	this.delay += FRAME;
	if (this.isMuteki) {
		this.mutekiTime += FRAME;
		if (this.mutekiTime > this.maxMutekiTime) {
			this.isMuteki = false;
		}
	}
	let scdlCounter = (this.scdlCounter === -1 ? this.schedule.length - 1 : this.scdlCounter);
	if (this.schedule[scdlCounter].canShot !== false) {
		this.danmaku.timekeeper();
	}
};