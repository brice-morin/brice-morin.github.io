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
		this.bus.emit('display?create_', 0x6D);
		this.bus.emit('display?createxsizeval76ysize', this.BreakoutGame_XDISPSIZE_var, 0x6F, 0x2A, this.BreakoutGame_YDISPSIZE_var);
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0, 0xC2, 0x2A), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		this.bus.emit('display?update_', 0xEA);
		this.bus.emit('display?updateval78', 0x21, 0x1E);
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0, 0x86, 0x84), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 500, 0, 0x40, 0x95), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		this.bus.emit('display?updateval78', 0x87, 0x8D);
		this.bus.emit('display?update_', 0x78);
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 1000, 0, 0x7A, 0x85), 0);
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
		this.bus.emit('display?updateval78', 0xA2, 0x47);
		this.bus.emit('display?update_', 0xC5);
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		this.bus.emit('display?updateval78', 0x6F, 0x9A);
		this.bus.emit('display?update_', 0x50);
		setTimeout(() => this.bus.emit('clock?timer_start', 500, 0, 0xEE, 0x29), 0);
	});
	let BreakoutGame_SC_GAMEREALLYOVER = new StateJS.State('GAMEREALLYOVER', this._statemachine).entry(() => {
		this.bus.emit('display?setColorbg', 255, 0xF1, 255);
		this.bus.emit('display?setColorval70r', 255, 0xE0, 0x4F);
		this.bus.emit('display?fillRectyheightx', 0xDC, 8, 76, 30);
		this.bus.emit('display?fillRectval73width', 142, 0x39, 0x3F);
		this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
		, 0xAE, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
		, 0x0E, 0x44);
		this.bus.emit('display?fillRectyheightx', 0xEF, 9, 50, 31);
		this.bus.emit('display?fillRectval73width', 140, 0xC5, 0xDA);
		this.bus.emit('display?setBGColorval71g', this.BreakoutGame_fgcolor_var[1]
		, 0x4E, 0xFD);
		this.bus.emit('display?setBGColorrb', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x8B);
		this.bus.emit('display?setColorbg', 209, 0x07, 130);
		this.bus.emit('display?setColorval70r', 158, 0xE3, 0x0C);
		this.bus.emit('display?drawIntegeryv', 40, 0x97, this.BreakoutGame_score_var);
		this.bus.emit('display?drawIntegerdigitsval74scalex', 5, 23, 6, 0x58, 0x03);
		this.bus.emit('display?drawThingMLx', 26, 0xE5);
		this.bus.emit('display?drawThingMLval75y', 0xE3, 0x80, 87);
		this.bus.emit('display?update_', 0x92);
		this.bus.emit('display?updateval78', 0x29, 0x21);
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	this._statemachine.to(null).when((positionxy) => {
		return positionxy._port === 'controller' && positionxy._msg === 'positionxy';
	}).effect((positionxy) => {
		this.BreakoutGame_SC_received_controller_positionxy_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionxy.x;
		this.BreakoutGame_SC_controller_position_y_var = positionxy.y;
		if(this.BreakoutGame_SC_received_controller_positionval82_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		this.BreakoutGame_SC_received_controller_positionval82_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionval82) => {
		return positionval82._port === 'controller' && positionval82._msg === 'positionval82';
	}).effect((positionval82) => {
		this.BreakoutGame_SC_received_controller_positionval82_var = true;
		this.BreakoutGame_SC_controller_position_val82_var = positionval82.val82;
		if(this.BreakoutGame_SC_received_controller_positionxy_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionval82_var = false;
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		this.bus.emit('display?updateval78', 0xFD, 0xA8);
		this.bus.emit('display?update_', 0x77);
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0, 0x9A, 0x9B), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		this.bus.emit('display?updateval78', 0xAB, 0x52);
		this.bus.emit('display?update_', 0xCA);
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
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x0E);
		this.bus.emit('sound?toneval88time', 0x3E, this.BreakoutGame_tone_duration_var, 0x43);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0xBE);
		this.bus.emit('sound?toneval88time', 0x8D, this.BreakoutGame_tone_duration_var, 0xB9);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0xF4);
		this.bus.emit('sound?toneval88time', 0x5F, this.BreakoutGame_tone_duration_var, 0x22);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		setTimeout(() => this.bus.emit('game?lostBallval86', 0x13, 0xEA), 0);
		setTimeout(() => this.bus.emit('game?lostBall_', 0xF6), 0);
		setTimeout(() => this.bus.emit('req_game?lostBallval86', 0xE1, 0x84), 0);
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x34), 0);
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0xC6);
		this.bus.emit('sound?toneval88time', 0x61, this.BreakoutGame_tone_duration_var, 0xDE);
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
		this.bus.emit('sound?toneval88time', 0x33, this.BreakoutGame_tone_duration_var, 0xC1);
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone1_var, 0xDA);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		setTimeout(() => this.bus.emit('game?nextLevelval87', 0x2C, 0xA6), 0);
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xDA), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevelval87', 0x58, 0x29), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xED), 0);
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		const pady_const = this.BreakoutGame_pady_var;
		const bx_const = this.BreakoutGame_bx_var;
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadyval83padxballx', 0xFB, pady_const, 0x22, bx_const, padx_const), 0);
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAbally', by_const, 0xC4), 0);
		this.bus.emit('display?updateval78', 0x1D, 0x28);
		this.bus.emit('display?update_', 0x2F);
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0, 0x13, 0x7A), 0);
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
	BreakoutGame_SC_GAMEOVER.to(BreakoutGame_SC_NEXTLEVEL).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_level_var < 9);
	}).effect((timer_timeout) => {
		this.BreakoutGame_lives_var = 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
	});
	BreakoutGame_SC_GAMEOVER.to(BreakoutGame_SC_GAMEREALLYOVER).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_level_var === 9);
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallval86_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xCB, 0x06), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallval86_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallval86_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelval87_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xE0, 0xE7), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval87_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelval87_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval87) => {
		return nextLevelval87._port === 'game' && nextLevelval87._msg === 'nextLevelval87' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelval87) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xE0, 0x39), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval87_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval87) => {
		return nextLevelval87._port === 'game' && nextLevelval87._msg === 'nextLevelval87' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelval87) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval87_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval86) => {
		return lostBallval86._port === 'game' && lostBallval86._msg === 'lostBallval86' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallval86) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xCB, 0xAD), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallval86_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval86) => {
		return lostBallval86._port === 'game' && lostBallval86._msg === 'lostBallval86' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallval86) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallval86_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xCC, 0x9F), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x69, 0xB8), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval87) => {
		return nextLevelval87._port === 'pro_game' && nextLevelval87._msg === 'nextLevelval87' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelval87) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x69, 0x22), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval87) => {
		return nextLevelval87._port === 'pro_game' && nextLevelval87._msg === 'nextLevelval87' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelval87) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval86) => {
		return lostBallval86._port === 'pro_game' && lostBallval86._msg === 'lostBallval86' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallval86) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xCC, 0xB6), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval86) => {
		return lostBallval86._port === 'pro_game' && lostBallval86._msg === 'lostBallval86' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallval86) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyval79) => {
		return displayReadyval79._port === 'display' && displayReadyval79._msg === 'displayReadyval79' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyval79) => {
		this.bus.emit('display?clear_', 0x11);
		this.bus.emit('display?clearval69', 0x91, 0x21);
		this.initColors();
		this.bus.emit('display?setColorval70r', this.BreakoutGame_bgcolor_var[0]
		, 0x13, 0x54);
		this.bus.emit('display?setColorbg', this.BreakoutGame_bgcolor_var[1]
		, 0xD1, this.BreakoutGame_bgcolor_var[2]
		);
		this.bus.emit('display?fillRectval73width', this.BreakoutGame_XDISPSIZE_var, 0xBB, 0xE4);
		this.bus.emit('display?fillRectyheightx', 0xD1, 0, this.BreakoutGame_YDISPSIZE_var, 0);
		this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
		, 0x5B, 0x81);
		this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
		, 0xCA, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?fillRectval73width', this.BreakoutGame_XDISPSIZE_var, 0xB8, 0x6E);
		this.bus.emit('display?fillRectyheightx', 0xC7, 0, 14, 0);
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
		this.bus.emit('display?clear_', 0x8A);
		this.bus.emit('display?clearval69', 0x63, 0x21);
		this.initColors();
		this.bus.emit('display?setColorbg', this.BreakoutGame_bgcolor_var[1]
		, 0xBA, this.BreakoutGame_bgcolor_var[2]
		);
		this.bus.emit('display?setColorval70r', this.BreakoutGame_bgcolor_var[0]
		, 0x01, 0x54);
		this.bus.emit('display?fillRectyheightx', 0x21, 0, this.BreakoutGame_YDISPSIZE_var, 0);
		this.bus.emit('display?fillRectval73width', this.BreakoutGame_XDISPSIZE_var, 0xE8, 0xE4);
		this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
		, 0x09, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
		, 0x14, 0x81);
		this.bus.emit('display?fillRectyheightx', 0x68, 0, 14, 0);
		this.bus.emit('display?fillRectval73width', this.BreakoutGame_XDISPSIZE_var, 0xE4, 0x6E);
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
	this.bus.emit('display?setBGColorval71g', this.BreakoutGame_bgcolor_var[1]
	, 0xF2, 0xC9);
	this.bus.emit('display?setBGColorrb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x10);
	this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
	, 0x11, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
	, 0x1E, 0x58);
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
	this.bus.emit('display?setColorval70r', this.BreakoutGame_bgcolor_var[0]
	, 0xA0, 0xF2);
	this.bus.emit('display?setColorbg', this.BreakoutGame_bgcolor_var[1]
	, 0xE6, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectyheightx', 0xE5, this.BreakoutGame_prevBX_var, bs_var, this.BreakoutGame_prevBY_var);
	this.bus.emit('display?fillRectval73width', bs_var, 0x9D, 0x0A);
	
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
	this.bus.emit('display?setColorbg', 199, 0x9F, 111);
	this.bus.emit('display?setColorval70r', 183, 0x7D, 0x5F);
	this.bus.emit('display?fillRectval73width', bs_var, 0xF7, 0x3F);
	this.bus.emit('display?fillRectyheightx', 0xD9, this.BreakoutGame_prevBX_var, bs_var, this.BreakoutGame_prevBY_var);
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	this.bus.emit('display?setColorbg', this.BreakoutGame_bgcolor_var[1]
	, 0xE4, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_bgcolor_var[0]
	, 0x32, 0xD0);
	this.bus.emit('display?fillRectyheightx', 0xBD, this.BreakoutGame_prevPX_var, 4, this.BreakoutGame_prevPY_var);
	this.bus.emit('display?fillRectval73width', ps_var, 0x79, 0xCB);
	
	}
}

BreakoutGameBrowser.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
	, 0x69, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
	, 0x92, 0x45);
	this.bus.emit('display?fillRectyheightx', 0xC2, this.BreakoutGame_prevPX_var, 4, this.BreakoutGame_prevPY_var);
	this.bus.emit('display?fillRectval73width', ps_var, 0x48, 0xB5);
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
	, 0xE9, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
	, 0x0F, 0x7B);
	if(BreakoutGame_drawCountDown_c_var > 0) {
	this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
	, 0x77, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
	, 0x17, 0x77);
	this.bus.emit('display?setBGColorrb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xDF);
	this.bus.emit('display?setBGColorval71g', this.BreakoutGame_bgcolor_var[1]
	, 0xB7, 0x6D);
	this.bus.emit('display?drawIntegerdigitsval74scalex', 1, 80 - 6, 4, 0x1B, 0xCD);
	this.bus.emit('display?drawIntegeryv', 90, 0x35, BreakoutGame_drawCountDown_c_var);
	
	} else {
	this.bus.emit('display?setColorbg', this.BreakoutGame_bgcolor_var[1]
	, 0x64, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_bgcolor_var[0]
	, 0xD7, 0xE7);
	this.bus.emit('display?fillRectyheightx', 0xC0, 80 - 6, 20, 90);
	this.bus.emit('display?fillRectval73width', 12, 0x00, 0x15);
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
	, 0x5C, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
	, 0xBF, 0x6C);
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	this.bus.emit('display?fillRectyheightx', 0xA4, left_var - 1, 1, top_var - 1);
	this.bus.emit('display?fillRectval73width', xcenter_var + 1, 0xAE, 0x7A);
	this.bus.emit('display?fillRectyheightx', 0x8B, left_var - 1, 1, bottom_var);
	this.bus.emit('display?fillRectval73width', xcenter_var + 1, 0xF6, 0xFE);
	this.bus.emit('display?fillRectyheightx', 0x2F, left_var - 1, ycenter_var, top_var);
	this.bus.emit('display?fillRectval73width', 1, 0x0B, 0xF6);
	this.bus.emit('display?fillRectval73width', 1, 0xED, 0xE7);
	this.bus.emit('display?fillRectyheightx', 0x2D, right_var, ycenter_var, top_var);
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
	this.bus.emit('display?setColorval70r', 155, 0x0B, 0x3C);
	this.bus.emit('display?setColorbg', 103, 0x21, 89);
	this.bus.emit('display?fillRectyheightx', 0x67, bx_var, h_var, by_var);
	this.bus.emit('display?fillRectval73width', w_var, 0xB9, 0xE7);
	this.bus.emit('display?setColorbg', 56, 0x4F, 43);
	this.bus.emit('display?setColorval70r', 100, 0x2E, 0x74);
	this.bus.emit('display?drawRectywidthxheightval72', w_var, 0xBE, by_var, 0x5B, bx_var, h_var);
	this.bus.emit('display?drawRect_', 0x55);
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_bgcolor_var[0]
	, 0x56, 0x7B);
	this.bus.emit('display?setColorbg', this.BreakoutGame_bgcolor_var[1]
	, 0xD2, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectyheightx', 0x7F, bx_var, this.BreakoutGame_BRICK_HEIGHT_var - 2, by_var);
	this.bus.emit('display?fillRectval73width', (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), 0x32, 0x8C);
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
	this.bus.emit('display?setColorval70r', 158, 0xB5, 0x10);
	this.bus.emit('display?setColorbg', 209, 0x43, 130);
	this.bus.emit('display?setBGColorval71g', this.BreakoutGame_fgcolor_var[1]
	, 0x74, 0x44);
	this.bus.emit('display?setBGColorrb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x10);
	this.bus.emit('display?setColorbg', this.BreakoutGame_bgcolor_var[1]
	, 0x92, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_bgcolor_var[0]
	, 0x58, 0x1B);
	this.bus.emit('display?drawIntegeryv', 2, 0xCD, this.BreakoutGame_level_var);
	this.bus.emit('display?drawIntegerdigitsval74scalex', 2, 6, 2, 0xC2, 0xB9);
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
	this.bus.emit('display?setColorval70r', 158, 0xF4, 0xE4);
	this.bus.emit('display?setColorbg', 209, 0x34, 130);
	this.bus.emit('display?setBGColorval71g', this.BreakoutGame_fgcolor_var[1]
	, 0xBA, 0x99);
	this.bus.emit('display?setBGColorrb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x73);
	this.bus.emit('display?drawIntegeryv', 2, 0x45, this.BreakoutGame_score_var);
	this.bus.emit('display?drawIntegerdigitsval74scalex', 5, 58, 2, 0x6D, 0xDD);
}

BreakoutGameBrowser.prototype.drawLives = function() {
	this.bus.emit('display?setColorbg', this.BreakoutGame_fgcolor_var[1]
	, 0x8B, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorval70r', this.BreakoutGame_fgcolor_var[0]
	, 0x84, 0x7F);
	this.bus.emit('display?fillRectyheightx', 0x6C, 124, 6, 4);
	this.bus.emit('display?fillRectval73width', 24 + 6, 0xB3, 0xCC);
	this.bus.emit('display?setColorbg', 199, 0x29, 111);
	this.bus.emit('display?setColorval70r', 183, 0x06, 0xA0);
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	this.bus.emit('display?fillRectyheightx', 0x49, 124 + (2 - i_var) * 12, 6, 4);
	this.bus.emit('display?fillRectval73width', 6, 0xA3, 0x59);
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(id, val91, val68) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, val91:val91, val68:val68});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(val104) {
	this._receive({_port:"display", _msg:"displayReady_", val104:val104});
}

BreakoutGameBrowser.prototype.receivedisplayReadyval79Ondisplay = function(val79, val105) {
	this._receive({_port:"display", _msg:"displayReadyval79", val79:val79, val105:val105});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(val96) {
	this._receive({_port:"display", _msg:"displayError_", val96:val96});
}

BreakoutGameBrowser.prototype.receivedisplayErrorval80Ondisplay = function(val80, val97) {
	this._receive({_port:"display", _msg:"displayErrorval80", val80:val80, val97:val97});
}

BreakoutGameBrowser.prototype.receivepositionxyOncontroller = function(y, val118, x) {
	this._receive({_port:"controller", _msg:"positionxy", y:y, val118:val118, x:x});
}

BreakoutGameBrowser.prototype.receivepositionval82Oncontroller = function(val82, val119) {
	this._receive({_port:"controller", _msg:"positionval82", val82:val82, val119:val119});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(val126) {
	this._receive({_port:"game", _msg:"lostBall_", val126:val126});
}

BreakoutGameBrowser.prototype.receivelostBallval86Ongame = function(val127, val86) {
	this._receive({_port:"game", _msg:"lostBallval86", val127:val127, val86:val86});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(val128) {
	this._receive({_port:"game", _msg:"nextLevel_", val128:val128});
}

BreakoutGameBrowser.prototype.receivenextLevelval87Ongame = function(val87, val129) {
	this._receive({_port:"game", _msg:"nextLevelval87", val87:val87, val129:val129});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(val126) {
	this._receive({_port:"pro_game", _msg:"lostBall_", val126:val126});
}

BreakoutGameBrowser.prototype.receivelostBallval86Onpro_game = function(val127, val86) {
	this._receive({_port:"pro_game", _msg:"lostBallval86", val127:val127, val86:val86});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(val128) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", val128:val128});
}

BreakoutGameBrowser.prototype.receivenextLevelval87Onpro_game = function(val87, val129) {
	this._receive({_port:"pro_game", _msg:"nextLevelval87", val87:val87, val129:val129});
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_val86_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_val86_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_val86_var = BreakoutGame_SC_PLAY_pro_game_lostBall_val86_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val87_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_val87_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val87_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_val87_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_val87_var = function(BreakoutGame_SC_PLAY_game_nextLevel_val87_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_val87_var = BreakoutGame_SC_PLAY_game_nextLevel_val87_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_val82_var = function(BreakoutGame_SC_controller_position_val82_var) {
	this.BreakoutGame_SC_controller_position_val82_var = BreakoutGame_SC_controller_position_val82_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_val79_var = function(BreakoutGame_SC_INIT_display_displayReady_val79_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_val79_var = BreakoutGame_SC_INIT_display_displayReady_val79_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionval82_var = function(BreakoutGame_SC_received_controller_positionval82_var) {
	this.BreakoutGame_SC_received_controller_positionval82_var = BreakoutGame_SC_received_controller_positionval82_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelval87_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelval87_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelval87_var = BreakoutGame_SC_PLAY_received_game_nextLevelval87_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionxy_var = function(BreakoutGame_SC_received_controller_positionxy_var) {
	this.BreakoutGame_SC_received_controller_positionxy_var = BreakoutGame_SC_received_controller_positionxy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyval79_var = function(BreakoutGame_SC_INIT_received_display_displayReadyval79_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var = BreakoutGame_SC_INIT_received_display_displayReadyval79_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_val86_var = function(BreakoutGame_SC_PLAY_game_lostBall_val86_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_val86_var = BreakoutGame_SC_PLAY_game_lostBall_val86_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallval86_var = function(BreakoutGame_SC_PLAY_received_game_lostBallval86_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallval86_var = BreakoutGame_SC_PLAY_received_game_lostBallval86_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tpro_game_lostBall_val86 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_val86_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\tpro_game_nextLevel_val87 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val87_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tgame_nextLevel_val87 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_val87_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tcontroller_position_val82 = ' + this.BreakoutGame_SC_controller_position_val82_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tdisplay_displayReady_val79 = ' + this.BreakoutGame_SC_INIT_display_displayReady_val79_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\treceived_controller_positionval82 = ' + this.BreakoutGame_SC_received_controller_positionval82_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\treceived_game_nextLevelval87 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelval87_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\treceived_controller_positionxy = ' + this.BreakoutGame_SC_received_controller_positionxy_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\treceived_display_displayReadyval79 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyval79_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tgame_lostBall_val86 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_val86_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\treceived_pro_game_nextLevelval87 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\treceived_pro_game_lostBallval86 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\treceived_game_lostBallval86 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallval86_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '';
	return result;
}

