'use strict';


/*
 * Definition for type : BreakoutGameBrowser
 */

function BreakoutGameBrowser(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

BreakoutGameBrowser.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SC');
	let _initial_BreakoutGame_SC = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let BreakoutGame_SC_INIT = new StateJS.State('INIT', this._statemachine).entry(() => {
		this.bus.emit('display?createval76xsize', 0x11, this.BreakoutGame_XDISPSIZE_var, 0x21);
		this.bus.emit('display?createysize', this.BreakoutGame_YDISPSIZE_var, 0x91);
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 33, 0xB9, 0x8D), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		this.bus.emit('display?updateval78', 0xF4, 0x5F);
		this.bus.emit('display?update_', 0x22);
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, period_const, 0xDE, 0x33), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 500, 0x39, 0x3F), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		this.bus.emit('display?update_', 0xAE);
		this.bus.emit('display?updateval78', 0x0E, 0x44);
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 1000, 0xEF, 0xDA), 0);
		this.BreakoutGame_level_var = this.BreakoutGame_level_var + 1;
		this.bus.emit('level=', this.BreakoutGame_level_var);
		this.drawLevel();
		this.eraseBall();
		this.erasePad();
		if((this.BreakoutGame_level_var % 2) === 0 && this.BreakoutGame_padlen_var > 5 * this.BreakoutGame_SCALE_var) {
		this.BreakoutGame_padlen_var = this.BreakoutGame_padlen_var - (4 * this.BreakoutGame_SCALE_var);
		this.bus.emit('padlen=', this.BreakoutGame_padlen_var);
		
		}
		if((this.BreakoutGame_level_var % 2) === 1) {
		this.BreakoutGame_dy_var = Math.trunc((this.BreakoutGame_dy_var * 3) / 2);
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		
		}
		this.drawLives();
		this.createBricks();
		this.bus.emit('display?updateval78', 0xC5, 0x4E);
		this.bus.emit('display?update_', 0xFD);
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		this.bus.emit('display?setColorrval70', 0x8B, 0x0C, 255);
		this.bus.emit('display?setColorgb', 0x07, 255, 255);
		this.bus.emit('display?fillRectyheight', 76, 0xE3, 30);
		this.bus.emit('display?fillRectval73xwidth', 8, 142, 0x03, 0x97);
		this.bus.emit('display?setColorrval70', 0x58, 0xE3, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?setColorgb', 0xE5, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?fillRectyheight', 50, 0x80, 31);
		this.bus.emit('display?fillRectval73xwidth', 9, 140, 0x29, 0x92);
		this.bus.emit('display?setBGColorbval71g', this.BreakoutGame_fgcolor_var[1]
		, 0x21, 0x07, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setBGColorr', 0x81, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?setColorgb', 0x63, 209, 130);
		this.bus.emit('display?setColorrval70', 0x32, 0xB7, 158);
		this.bus.emit('display?drawInteger_', 0x02);
		this.bus.emit('display?drawIntegerdigitsyxval74vscale', 23, 40, 0x4E, this.BreakoutGame_score_var, 5, 6, 0x9C);
		this.bus.emit('display?drawThingMLval75x', 26, 0xD3, 0x1F);
		this.bus.emit('display?drawThingMLy', 87, 0x6A);
		this.bus.emit('display?update_', 0x4E);
		this.bus.emit('display?updateval78', 0xE7, 0x4A);
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval88) => {
		return nextLevelval88._port === 'pro_game' && nextLevelval88._msg === 'nextLevelval88' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelval88) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xDC, 0x4F, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval88) => {
		return nextLevelval88._port === 'pro_game' && nextLevelval88._msg === 'nextLevelval88' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelval88) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xEE, 0x29, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval87) => {
		return lostBallval87._port === 'pro_game' && lostBallval87._msg === 'lostBallval87' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallval87) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xF1, 0x29, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval87) => {
		return lostBallval87._port === 'pro_game' && lostBallval87._msg === 'lostBallval87' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallval87) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xE0, 0x4F, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyval79) => {
		return displayReadyval79._port === 'display' && displayReadyval79._msg === 'displayReadyval79' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyval79) => {
		this.bus.emit('display?clearval69', 0x9B, 0x1E);
		this.bus.emit('display?clear_', 0x9A);
		this.initColors();
		this.bus.emit('display?setColorgb', 0x52, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[2]
		);
		this.bus.emit('display?setColorrval70', 0xCA, 0xAB, this.BreakoutGame_bgcolor_var[0]
		);
		this.bus.emit('display?fillRectval73xwidth', 0, this.BreakoutGame_XDISPSIZE_var, 0xFD, 0xA8);
		this.bus.emit('display?fillRectyheight', this.BreakoutGame_YDISPSIZE_var, 0x77, 0);
		this.bus.emit('display?setColorgb', 0x86, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setColorrval70', 0x0E, 0x84, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?fillRectval73xwidth', 0, this.BreakoutGame_XDISPSIZE_var, 0x3E, 0x43);
		this.bus.emit('display?fillRectyheight', 14, 0xBE, 0);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyval79) => {
		return displayReadyval79._port === 'display' && displayReadyval79._msg === 'displayReadyval79' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyval79) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var);
	}).effect((displayReady_) => {
		this.bus.emit('display?clearval69', 0x9B, 0x13);
		this.bus.emit('display?clear_', 0xD1);
		this.initColors();
		this.bus.emit('display?setColorgb', 0xBB, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[2]
		);
		this.bus.emit('display?setColorrval70', 0xD1, 0xAB, this.BreakoutGame_bgcolor_var[0]
		);
		this.bus.emit('display?fillRectyheight', this.BreakoutGame_YDISPSIZE_var, 0x5B, 0);
		this.bus.emit('display?fillRectval73xwidth', 0, this.BreakoutGame_XDISPSIZE_var, 0xFD, 0xCA);
		this.bus.emit('display?setColorgb', 0xB8, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setColorrval70', 0xC7, 0x84, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?fillRectval73xwidth', 0, this.BreakoutGame_XDISPSIZE_var, 0x3E, 0xC2);
		this.bus.emit('display?fillRectyheight', 14, 0xEA, 0);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var > 0);
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_GAMEOVER).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var === 0);
	});
	BreakoutGame_SC_NEXTLEVEL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0);
	});
	BreakoutGame_SC_PLAY.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0);
	}).effect((timer_timeout) => {
		this.BreakoutGame_bx_var = this.BreakoutGame_bx_var + this.BreakoutGame_dx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.BreakoutGame_by_var = this.BreakoutGame_by_var + this.BreakoutGame_dy_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		let wl_var = this.BreakoutGame_LEFT_var + this.BreakoutGame_br_var;
		let wr_var = this.BreakoutGame_RIGHT_var - this.BreakoutGame_br_var;
		let wt_var = this.BreakoutGame_TOP_var + this.BreakoutGame_br_var;
		let wb_var = this.BreakoutGame_BOTTOM_var - this.BreakoutGame_br_var;
		if(this.BreakoutGame_bx_var < wl_var) {
		this.bus.emit('sound?tonefreqtimeval86', this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var, 0x2C, 0xC1);
		this.bus.emit('sound?tone_', 0xDA);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		this.bus.emit('sound?tonefreqtimeval86', this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var, 0x58, 0xA6);
		this.bus.emit('sound?tone_', 0xDA);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		this.bus.emit('sound?tonefreqtimeval86', this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var, 0x22, 0x29);
		this.bus.emit('sound?tone_', 0xED);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		setTimeout(() => this.bus.emit('game?lostBallval87', 0xFB, 0x1D), 0);
		setTimeout(() => this.bus.emit('game?lostBall_', 0xC4), 0);
		setTimeout(() => this.bus.emit('req_game?lostBallval87', 0x28, 0x7A), 0);
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x2F), 0);
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		this.bus.emit('sound?tonefreqtimeval86', this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var, 0xCB, 0x13);
		this.bus.emit('sound?tone_', 0x06);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * (this.BreakoutGame_pady_var - this.BreakoutGame_br_var) - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.BreakoutGame_dx_var = Math.trunc(this.BreakoutGame_dx_var / 4) + Math.trunc((this.BreakoutGame_bx_var - this.BreakoutGame_padx_var) / 4);
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		
		}
		
		}
		
		}
		let collision_var = this.collideBrick(this.BreakoutGame_bx_var - this.BreakoutGame_br_var, this.BreakoutGame_by_var - this.BreakoutGame_br_var) || this.collideBrick(this.BreakoutGame_bx_var + this.BreakoutGame_br_var, this.BreakoutGame_by_var - this.BreakoutGame_br_var) || this.collideBrick(this.BreakoutGame_bx_var + this.BreakoutGame_br_var, this.BreakoutGame_by_var + this.BreakoutGame_br_var) || this.collideBrick(this.BreakoutGame_bx_var - this.BreakoutGame_br_var, this.BreakoutGame_by_var + this.BreakoutGame_br_var);
		if(collision_var) {
		this.bus.emit('sound?tone_', 0xAD);
		this.bus.emit('sound?tonefreqtimeval86', this.BreakoutGame_tone1_var, this.BreakoutGame_tone_duration_var, 0xE0, 0xE7);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0x39), 0);
		setTimeout(() => this.bus.emit('game?nextLevelval88', 0xCC, 0x9F), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xB6), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevelval88', 0x69, 0xB8), 0);
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApadyval83', pady_const, 0x95, 0x22), 0);
		const bx_const = this.BreakoutGame_bx_var;
		const padx_const = this.BreakoutGame_padx_var;
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAballyballxpadx', bx_const, 0x40, padx_const, by_const), 0);
		this.bus.emit('display?update_', 0x8D);
		this.bus.emit('display?updateval78', 0x78, 0x87);
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, period_const, 0x7A, 0x85), 0);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		this.bus.emit('display?updateval78', 0x34, 0x61);
		this.bus.emit('display?update_', 0xC6);
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 33, 0x13, 0xEA), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		this.bus.emit('display?update_', 0xF6);
		this.bus.emit('display?updateval78', 0xE1, 0x84);
	});
	this._statemachine.to(null).when((positiony) => {
		return positiony._port === 'controller' && positiony._msg === 'positiony';
	}).effect((positiony) => {
		this.BreakoutGame_SC_received_controller_positiony_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positiony.y;
		if(this.BreakoutGame_SC_received_controller_positionxval82_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		this.BreakoutGame_SC_received_controller_positionxval82_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionxval82) => {
		return positionxval82._port === 'controller' && positionxval82._msg === 'positionxval82';
	}).effect((positionxval82) => {
		this.BreakoutGame_SC_received_controller_positionxval82_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionxval82.x;
		this.BreakoutGame_SC_controller_position_val82_var = positionxval82.val82;
		if(this.BreakoutGame_SC_received_controller_positiony_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionxval82_var = false;
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		
		}
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval88) => {
		return nextLevelval88._port === 'game' && nextLevelval88._msg === 'nextLevelval88' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelval88) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x50, 0x6F, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval88_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval88) => {
		return nextLevelval88._port === 'game' && nextLevelval88._msg === 'nextLevelval88' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelval88) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval88_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallval87_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x47, 0xA2, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallval87_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallval87_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval87) => {
		return lostBallval87._port === 'game' && lostBallval87._msg === 'lostBallval87' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallval87) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xC5, 0xA2, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallval87_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval87) => {
		return lostBallval87._port === 'game' && lostBallval87._msg === 'lostBallval87' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallval87) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallval87_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelval88_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x9A, 0x6F, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval88_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelval88_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
}
BreakoutGameBrowser.prototype.log = function(BreakoutGame_log_logMem_var) {
	let ts_var;
	if(this.BreakoutGame_lastTimestamp_var === 0) {
	ts_var = 0;
	this.BreakoutGame_lastTimestamp_var = this.timestamp();
	this.bus.emit('lastTimestamp=', this.BreakoutGame_lastTimestamp_var);
	
	} else {
	let t_var = this.timestamp();
	ts_var = t_var - this.BreakoutGame_lastTimestamp_var;
	this.BreakoutGame_lastTimestamp_var = t_var;
	this.bus.emit('lastTimestamp=', this.BreakoutGame_lastTimestamp_var);
	
	}
	console.log(''+'ts:'+ts_var+',lives:'+this.BreakoutGame_lives_var+',score:'+this.BreakoutGame_score_var+',level:'+this.BreakoutGame_level_var+',bx:'+this.BreakoutGame_bx_var+',by:'+this.BreakoutGame_by_var+',padx:'+this.BreakoutGame_padx_var);
	if(this.BreakoutGame_counter_var === 0 || BreakoutGame_log_logMem_var) {
	console.log(''+'#usedMem:'+this.usedMemory());
	
	}
	this.BreakoutGame_counter_var++;
	if(this.BreakoutGame_counter_var === 10) {
	this.BreakoutGame_counter_var = 0;
	this.bus.emit('counter=', this.BreakoutGame_counter_var);
	
	}
}

BreakoutGameBrowser.prototype.initColors = function() {
	this.BreakoutGame_bgcolor_var[0] = 53;
	this.bus.emit('bgcolor=', this.BreakoutGame_bgcolor_var);
	this.BreakoutGame_bgcolor_var[1] = 40;
	this.bus.emit('bgcolor=', this.BreakoutGame_bgcolor_var);
	this.BreakoutGame_bgcolor_var[2] = 120;
	this.bus.emit('bgcolor=', this.BreakoutGame_bgcolor_var);
	this.BreakoutGame_fgcolor_var[0] = 107;
	this.bus.emit('fgcolor=', this.BreakoutGame_fgcolor_var);
	this.BreakoutGame_fgcolor_var[1] = 94;
	this.bus.emit('fgcolor=', this.BreakoutGame_fgcolor_var);
	this.BreakoutGame_fgcolor_var[2] = 174;
	this.bus.emit('fgcolor=', this.BreakoutGame_fgcolor_var);
	this.bus.emit('display?setBGColorbval71g', this.BreakoutGame_bgcolor_var[1]
	, 0xE4, 0xCB, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setBGColorr', 0x32, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setColorrval70', 0xBD, 0x45, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0x79, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	);
}

BreakoutGameBrowser.prototype.resetBall = function() {
	this.BreakoutGame_bx_var = this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_br_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('bx=', this.BreakoutGame_bx_var);
	this.BreakoutGame_by_var = this.BreakoutGame_pady_var - Math.trunc(this.BreakoutGame_br_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('by=', this.BreakoutGame_by_var);
	this.BreakoutGame_dx_var = (this.BreakoutGame_padx_var + this.BreakoutGame_prevBX_var + this.BreakoutGame_prevBY_var) % 300 - 150;
	this.bus.emit('dx=', this.BreakoutGame_dx_var);
	if(this.BreakoutGame_dy_var > 0) {
	this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
	this.bus.emit('dy=', this.BreakoutGame_dy_var);
	
	}
	this.BreakoutGame_prevBX_var =  -1;
	this.bus.emit('prevBX=', this.BreakoutGame_prevBX_var);
	this.BreakoutGame_prevBY_var =  -1;
	this.bus.emit('prevBY=', this.BreakoutGame_prevBY_var);
}

BreakoutGameBrowser.prototype.eraseBall = function() {
	let bs_var = Math.trunc((this.BreakoutGame_br_var * 2) / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevBX_var > 0) {
	this.bus.emit('display?setColorrval70', 0x69, 0xB5, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0x92, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectyheight', bs_var, 0xC2, this.BreakoutGame_prevBY_var);
	this.bus.emit('display?fillRectval73xwidth', this.BreakoutGame_prevBX_var, bs_var, 0x7B, 0x48);
	
	}
	this.BreakoutGame_prevBX_var =  -1;
	this.bus.emit('prevBX=', this.BreakoutGame_prevBX_var);
	this.BreakoutGame_prevBY_var =  -1;
	this.bus.emit('prevBY=', this.BreakoutGame_prevBY_var);
}

BreakoutGameBrowser.prototype.drawBall = function() {
	let bs_var = Math.trunc((this.BreakoutGame_br_var * 2) / this.BreakoutGame_SCALE_var);
	this.eraseBall();
	this.BreakoutGame_prevBX_var = Math.trunc((this.BreakoutGame_bx_var - this.BreakoutGame_br_var) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevBX=', this.BreakoutGame_prevBX_var);
	this.BreakoutGame_prevBY_var = Math.trunc((this.BreakoutGame_by_var - this.BreakoutGame_br_var) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevBY=', this.BreakoutGame_prevBY_var);
	this.bus.emit('display?setColorgb', 0xE9, 199, 111);
	this.bus.emit('display?setColorrval70', 0x0F, 0x77, 183);
	this.bus.emit('display?fillRectyheight', bs_var, 0x77, this.BreakoutGame_prevBY_var);
	this.bus.emit('display?fillRectval73xwidth', this.BreakoutGame_prevBX_var, bs_var, 0xB7, 0x17);
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	this.bus.emit('display?setColorrval70', 0xDF, 0xCD, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0x6D, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectyheight', 4, 0x1B, this.BreakoutGame_prevPY_var);
	this.bus.emit('display?fillRectval73xwidth', this.BreakoutGame_prevPX_var, ps_var, 0xE7, 0x35);
	
	}
}

BreakoutGameBrowser.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	this.bus.emit('display?setColorrval70', 0x64, 0x15, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0xD7, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?fillRectyheight', 4, 0xC0, this.BreakoutGame_prevPY_var);
	this.bus.emit('display?fillRectval73xwidth', this.BreakoutGame_prevPX_var, ps_var, 0x6C, 0x00);
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	this.bus.emit('display?setColorrval70', 0x5C, 0x7A, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0xBF, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	);
	if(BreakoutGame_drawCountDown_c_var > 0) {
	this.bus.emit('display?setColorrval70', 0xA4, 0xFE, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0xAE, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setBGColorr', 0x8B, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setBGColorbval71g', this.BreakoutGame_bgcolor_var[1]
	, 0xF6, 0xF6, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?drawIntegerdigitsyxval74vscale', 80 - 6, 90, 0x2F, BreakoutGame_drawCountDown_c_var, 1, 4, 0xE7);
	this.bus.emit('display?drawInteger_', 0x0B);
	
	} else {
	this.bus.emit('display?setColorrval70', 0xED, 0x3C, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0x2D, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectyheight', 20, 0x0B, 90);
	this.bus.emit('display?fillRectval73xwidth', 80 - 6, 12, 0xE7, 0x21);
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	this.bus.emit('display?setColorgb', 0x67, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorrval70', 0xB9, 0x74, this.BreakoutGame_fgcolor_var[0]
	);
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	this.bus.emit('display?fillRectval73xwidth', left_var - 1, xcenter_var + 1, 0xBE, 0x4F);
	this.bus.emit('display?fillRectyheight', 1, 0x2E, top_var - 1);
	this.bus.emit('display?fillRectyheight', 1, 0x5B, bottom_var);
	this.bus.emit('display?fillRectval73xwidth', left_var - 1, xcenter_var + 1, 0x7B, 0x55);
	this.bus.emit('display?fillRectval73xwidth', left_var - 1, 1, 0x8C, 0x56);
	this.bus.emit('display?fillRectyheight', ycenter_var, 0xD2, top_var);
	this.bus.emit('display?fillRectyheight', ycenter_var, 0x7F, top_var);
	this.bus.emit('display?fillRectval73xwidth', right_var, 1, 0x10, 0x32);
}

BreakoutGameBrowser.prototype.bitIsSet = function(BreakoutGame_bitIsSet_variable_var, BreakoutGame_bitIsSet_bit_var) {
	return (((1 << BreakoutGame_bitIsSet_bit_var) & BreakoutGame_bitIsSet_variable_var) != 0);
}

BreakoutGameBrowser.prototype.createBricks = function() {
	let y_var = 0;
	while(y_var < this.BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_bricks_var[y_var] = 0xFF;
	this.bus.emit('bricks=', this.BreakoutGame_bricks_var);
	let x_var = 0;
	while(x_var < 8) {
	if(this.bitIsSet(this.BreakoutGame_bricks_var[y_var]
	, x_var)) {
	this.drawBrick(x_var, y_var);
	
	}
	x_var = x_var + 1;
	
	}
	y_var = y_var + 1;
	
	}
}

BreakoutGameBrowser.prototype.bricksLeft = function() {
	let result_var = 0;
	let y_var = 0;
	while(y_var < this.BreakoutGame_BRICK_ROWS_var) {
	let x_var = 0;
	while(x_var < 8) {
	if(this.bitIsSet(this.BreakoutGame_bricks_var[y_var]
	, x_var)) {
	result_var = result_var + 1;
	
	}
	x_var = x_var + 1;
	
	}
	y_var = y_var + 1;
	
	}
	return result_var;
}

BreakoutGameBrowser.prototype.drawBrick = function(BreakoutGame_drawBrick_x_var, BreakoutGame_drawBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_drawBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_drawBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	const w_var = (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2);
	const h_var = (this.BreakoutGame_BRICK_HEIGHT_var - 2);
	this.bus.emit('display?setColorrval70', 0xB5, 0x74, 155);
	this.bus.emit('display?setColorgb', 0x43, 103, 89);
	this.bus.emit('display?fillRectval73xwidth', bx_var, w_var, 0x1B, 0x44);
	this.bus.emit('display?fillRectyheight', h_var, 0x10, by_var);
	this.bus.emit('display?setColorgb', 0x92, 56, 43);
	this.bus.emit('display?setColorrval70', 0x58, 0xB9, 100);
	this.bus.emit('display?drawRectval72xywidth', by_var, 0xE4, bx_var, 0xCD, w_var);
	this.bus.emit('display?drawRectheight', h_var, 0xC2);
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	this.bus.emit('display?setColorgb', 0xF4, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setColorrval70', 0x34, 0xBA, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?fillRectyheight', this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x99, by_var);
	this.bus.emit('display?fillRectval73xwidth', bx_var, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), 0xDD, 0x73);
	this.BreakoutGame_bricks_var[BreakoutGame_removeBrick_y_var] = this.unsetBit(this.BreakoutGame_bricks_var[BreakoutGame_removeBrick_y_var]
	, BreakoutGame_removeBrick_x_var);
	this.bus.emit('bricks=', this.BreakoutGame_bricks_var);
}

BreakoutGameBrowser.prototype.collideBrick = function(BreakoutGame_collideBrick_xpos_var, BreakoutGame_collideBrick_ypos_var) {
	let bry_var = Math.trunc((BreakoutGame_collideBrick_ypos_var - this.BreakoutGame_TOP_var - 20 * this.BreakoutGame_SCALE_var) / (this.BreakoutGame_BRICK_HEIGHT_var * this.BreakoutGame_SCALE_var));
	let result_var = false;
	if(bry_var >= 0 && bry_var < this.BreakoutGame_BRICK_ROWS_var) {
	let brx_var = Math.trunc((BreakoutGame_collideBrick_xpos_var - this.BreakoutGame_LEFT_var) / (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)));
	if(this.bitIsSet(this.BreakoutGame_bricks_var[bry_var]
	, brx_var)) {
	this.removeBrick(brx_var, bry_var);
	result_var = true;
	
	}
	
	}
	return result_var;
}

BreakoutGameBrowser.prototype.drawLevel = function() {
	this.bus.emit('display?setColorrval70', 0x45, 0x7F, 158);
	this.bus.emit('display?setColorgb', 0x6D, 209, 130);
	this.bus.emit('display?setBGColorbval71g', this.BreakoutGame_fgcolor_var[1]
	, 0x8B, 0xCC, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setBGColorr', 0x84, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorrval70', 0x6C, 0xA0, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0xB3, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?drawInteger_', 0x29);
	this.bus.emit('display?drawIntegerdigitsyxval74vscale', 6, 2, 0x06, this.BreakoutGame_level_var, 2, 2, 0x59);
}

BreakoutGameBrowser.prototype.incrementScore = function(BreakoutGame_incrementScore_diff_var) {
	this.BreakoutGame_score_var = this.BreakoutGame_score_var + BreakoutGame_incrementScore_diff_var;
	this.bus.emit('score=', this.BreakoutGame_score_var);
	if(this.BreakoutGame_score_var < 0) {
	this.BreakoutGame_score_var = 0;
	this.bus.emit('score=', this.BreakoutGame_score_var);
	
	}
	this.drawScore();
}

BreakoutGameBrowser.prototype.drawScore = function() {
	this.bus.emit('display?setColorrval70', 0x49, 0x2A, 158);
	this.bus.emit('display?setColorgb', 0xA3, 209, 130);
	this.bus.emit('display?setBGColorr', 0x6D, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setBGColorbval71g', this.BreakoutGame_fgcolor_var[1]
	, 0x6F, 0x21, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?drawIntegerdigitsyxval74vscale', 58, 2, 0x8A, this.BreakoutGame_score_var, 5, 2, 0x54);
	this.bus.emit('display?drawInteger_', 0x63);
}

BreakoutGameBrowser.prototype.drawLives = function() {
	this.bus.emit('display?setColorrval70', 0xBA, 0xE4, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorgb', 0x01, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?fillRectval73xwidth', 124, 24 + 6, 0x81, 0x21);
	this.bus.emit('display?fillRectyheight', 6, 0xE8, 4);
	this.bus.emit('display?setColorrval70', 0x09, 0x6E, 183);
	this.bus.emit('display?setColorgb', 0x14, 199, 111);
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	this.bus.emit('display?fillRectyheight', 6, 0x68, 4);
	this.bus.emit('display?fillRectval73xwidth', 124 + (2 - i_var) * 12, 6, 0x2A, 0xE4);
	i_var = i_var + 1;
	
	}
}

BreakoutGameBrowser.prototype.unsetBit = function(DefaultBreakoutGame_unsetBit_variable_var, DefaultBreakoutGame_unsetBit_bit_var) {
	return (DefaultBreakoutGame_unsetBit_variable_var & ~(1 << DefaultBreakoutGame_unsetBit_bit_var));
}

BreakoutGameBrowser.prototype.quit = function() {
	console.log(''+'done!');
}

BreakoutGameBrowser.prototype.timestamp = function() {
	return Date.now();
}

BreakoutGameBrowser.prototype.usedMemory = function() {
	return  -1;
}

BreakoutGameBrowser.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

BreakoutGameBrowser.prototype._delete = function() {
	this._statemachine = null;
	this._SC_instance = null;
	this.bus.removeAllListeners();
}

BreakoutGameBrowser.prototype._init = function() {
	this._SC_instance = new StateJS.Instance("SC_instance", this._statemachine);
	this.ready = true;
}

BreakoutGameBrowser.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SC_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(val89, id, val68) {
	this._receive({_port:"clock", _msg:"timer_timeout", val89:val89, id:id, val68:val68});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(val112) {
	this._receive({_port:"display", _msg:"displayReady_", val112:val112});
}

BreakoutGameBrowser.prototype.receivedisplayReadyval79Ondisplay = function(val113, val79) {
	this._receive({_port:"display", _msg:"displayReadyval79", val113:val113, val79:val79});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(val110) {
	this._receive({_port:"display", _msg:"displayError_", val110:val110});
}

BreakoutGameBrowser.prototype.receivedisplayErrorval80Ondisplay = function(val80, val111) {
	this._receive({_port:"display", _msg:"displayErrorval80", val80:val80, val111:val111});
}

BreakoutGameBrowser.prototype.receivepositionyOncontroller = function(val118, y) {
	this._receive({_port:"controller", _msg:"positiony", val118:val118, y:y});
}

BreakoutGameBrowser.prototype.receivepositionxval82Oncontroller = function(val119, x, val82) {
	this._receive({_port:"controller", _msg:"positionxval82", val119:val119, x:x, val82:val82});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(val130) {
	this._receive({_port:"game", _msg:"lostBall_", val130:val130});
}

BreakoutGameBrowser.prototype.receivelostBallval87Ongame = function(val131, val87) {
	this._receive({_port:"game", _msg:"lostBallval87", val131:val131, val87:val87});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(val128) {
	this._receive({_port:"game", _msg:"nextLevel_", val128:val128});
}

BreakoutGameBrowser.prototype.receivenextLevelval88Ongame = function(val88, val129) {
	this._receive({_port:"game", _msg:"nextLevelval88", val88:val88, val129:val129});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(val130) {
	this._receive({_port:"pro_game", _msg:"lostBall_", val130:val130});
}

BreakoutGameBrowser.prototype.receivelostBallval87Onpro_game = function(val131, val87) {
	this._receive({_port:"pro_game", _msg:"lostBallval87", val131:val131, val87:val87});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(val128) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", val128:val128});
}

BreakoutGameBrowser.prototype.receivenextLevelval88Onpro_game = function(val88, val129) {
	this._receive({_port:"pro_game", _msg:"nextLevelval88", val88:val88, val129:val129});
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positiony_var = function(BreakoutGame_SC_received_controller_positiony_var) {
	this.BreakoutGame_SC_received_controller_positiony_var = BreakoutGame_SC_received_controller_positiony_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_val88_var = function(BreakoutGame_SC_PLAY_game_nextLevel_val88_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_val88_var = BreakoutGame_SC_PLAY_game_nextLevel_val88_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_val82_var = function(BreakoutGame_SC_controller_position_val82_var) {
	this.BreakoutGame_SC_controller_position_val82_var = BreakoutGame_SC_controller_position_val82_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallval87_var = function(BreakoutGame_SC_PLAY_received_game_lostBallval87_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallval87_var = BreakoutGame_SC_PLAY_received_game_lostBallval87_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelval88_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelval88_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelval88_var = BreakoutGame_SC_PLAY_received_game_nextLevelval88_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_val87_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_val87_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_val87_var = BreakoutGame_SC_PLAY_pro_game_lostBall_val87_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_val79_var = function(BreakoutGame_SC_INIT_display_displayReady_val79_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_val79_var = BreakoutGame_SC_INIT_display_displayReady_val79_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_val87_var = function(BreakoutGame_SC_PLAY_game_lostBall_val87_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_val87_var = BreakoutGame_SC_PLAY_game_lostBall_val87_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyval79_var = function(BreakoutGame_SC_INIT_received_display_displayReadyval79_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var = BreakoutGame_SC_INIT_received_display_displayReadyval79_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionxval82_var = function(BreakoutGame_SC_received_controller_positionxval82_var) {
	this.BreakoutGame_SC_received_controller_positionxval82_var = BreakoutGame_SC_received_controller_positionxval82_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val88_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_val88_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val88_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_val88_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\treceived_controller_positiony = ' + this.BreakoutGame_SC_received_controller_positiony_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\treceived_pro_game_nextLevelval88 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tgame_nextLevel_val88 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_val88_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\treceived_pro_game_lostBallval87 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var;
	result += '\n\tcontroller_position_val82 = ' + this.BreakoutGame_SC_controller_position_val82_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\treceived_game_lostBallval87 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallval87_var;
	result += '\n\treceived_game_nextLevelval88 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelval88_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tpro_game_lostBall_val87 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_val87_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tdisplay_displayReady_val79 = ' + this.BreakoutGame_SC_INIT_display_displayReady_val79_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tgame_lostBall_val87 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_val87_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\treceived_display_displayReadyval79 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var;
	result += '\n\treceived_controller_positionxval82 = ' + this.BreakoutGame_SC_received_controller_positionxval82_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tpro_game_nextLevel_val88 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val88_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '';
	return result;
}

