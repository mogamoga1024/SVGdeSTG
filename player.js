// プレイヤークラス
let Player = function() {
	this.type = 'player'
	this.zanki = 10;
	this.cx = 400;
	this.cy = 500;
	this.r = 1;
	this.fakeR = 15;
	this.color = 'red';
	this.fakeColor = 'skyblue';
	this.mutekiColor = 'gold';
	this.dx = 5;
	this.dy = 5;
	this.children = [new PlayerChild(this, 0, 'right'), new PlayerChild(this, 180, 'left')];
	this.selector = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
	this.fakeSelector = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
	this.shotIntervalSum = 0;
	this.maxShotInterval = 6 * FRAME;
	this.canShot = true;
	this.isMuteki = false;
	this.mutekiTime;
	this.maxMutekiTime = 4 * SEC;
	this.isReviving = false;
	
	this.selector.attr({cx: this.cx, cy: this.cy, r: this.r, fill: this.color});
	this.fakeSelector.attr({cx: this.cx, cy: this.cy, r: this.fakeR, fill: this.fakeColor});
	$('svg').append(this.fakeSelector);
	$('svg').append(this.selector);
};

Player.prototype.move = function() {
	this.children.forEach(
		function(child) {
			child.move();
		}
	);
	
	if (this.isReviving) {
		if (this.isMuteki && this.mutekiTime === FRAME) {
			this.fakeSelector.attr('fill', this.mutekiColor);
			this.children[0].selector.attr('fill', this.mutekiColor);
			this.children[1].selector.attr('fill', this.mutekiColor);
		}
		this.cy -= this.dy;
		if (this.cy <= 500) {
			this.isReviving = false;
		}
	}
	else {
		if (isPressing.left) this.cx += -this.dx;
		if (isPressing.up) this.cy += -this.dy;
		if (isPressing.right) this.cx += this.dx;
		if (isPressing.down) this.cy += this.dy;
		
		if (this.cx - this.r < 0) this.cx = this.r;
		else if (this.cx + this.r > SCREEN_WIDTH) this.cx = SCREEN_WIDTH - this.r;
		if (this.cy - this.r < 0) this.cy = this.r;
		else if (this.cy + this.r > SCREEN_HEIGHT) this.cy = SCREEN_HEIGHT - this.r;
	}
	
	this.selector.attr({cx: this.cx, cy: this.cy});
	this.fakeSelector.attr({cx: this.cx, cy: this.cy});
};

Player.prototype.shot = function() {
	if (!this.canShot || !isPressing.scape || this.isReviving) {
		return [];
	}
	
	this.canShot = false;
	this.shotIntervalSum = 0;
	let missiles = [];
	
	this.children.forEach(
		function(child) {
			missiles = missiles.concat(child.shot());
		}
	);
	
	missiles = missiles.concat([
		new Missile(this, 10, -105, 7, 'lime'),
		new Missile(this, 10, -90, 7, 'lime'),
		new Missile(this, 10, -75, 7, 'lime')
	]);
	
	return missiles;
};

Player.prototype.receiveDamage = function() {
	if (!this.isMuteki) {
		this.zanki--;
		this.isReviving = true;
		this.isMuteki = true;
		this.mutekiTime = 0;
		this.cx = 400;
		this.cy = SCREEN_HEIGHT + this.fakeR * 2 * 10;
		this.children[0].angle = 0;
		this.children[1].angle = 180;
	}
};

Player.prototype.timekeeper = function() {
	this.shotIntervalSum += FRAME;
	if (this.shotIntervalSum > this.maxShotInterval) {
		this.canShot = true;
		this.shotIntervalSum = 0;
	}
	
	if (this.isMuteki) {
		this.mutekiTime += FRAME;
		if (this.mutekiTime > this.maxMutekiTime) {
			this.isMuteki = false;
			this.fakeSelector.attr('fill', this.fakeColor);
			this.children[0].selector.attr('fill', this.fakeColor);
			this.children[1].selector.attr('fill', this.fakeColor);
		}
	}
	
	this.children.forEach(
		function(child) {
			child.timekeeper();
		}
	);
};



// 子機
let PlayerChild = function(parent, rotationAngle, rotationDirection) {
	this.type = 'player';
	this.parent = parent;
	this.rotationR = 50;
	this.angle = rotationAngle;
	this.cx = this.rotationR * Math.cos(rotationAngle * Math.PI / 180) + parent.cx;
	this.cy = this.rotationR * Math.sin(rotationAngle * Math.PI / 180) + parent.cy;
	this.r = 10;
	this.selector = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
	
	switch (rotationDirection) {
		case 'right':
			this.da = 5;
			break;
		case 'left':
			this.da = -5;
			break;
	}
	
	this.selector.attr({cx: this.cx, cy: this.cy, r: this.r, fill: parent.fakeColor});
	$('svg').append(this.selector);
};

PlayerChild.prototype.move = function() {
	this.cx = this.rotationR * Math.cos(this.angle * Math.PI / 180) + this.parent.cx;
	this.cy = this.rotationR * Math.sin(this.angle * Math.PI / 180) + this.parent.cy;
	
	this.selector.attr({cx: this.cx, cy: this.cy});
};

PlayerChild.prototype.shot = function() {
	return [new Missile(this, 10, -90, 7, 'lime')];
};

PlayerChild.prototype.timekeeper = function() {
	this.angle += this.da;
};