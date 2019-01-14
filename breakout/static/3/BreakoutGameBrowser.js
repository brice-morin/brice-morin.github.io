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
		this.bus.emit('display?createval208ysize', this.BreakoutGame_YDISPSIZE_var, 0xE2, 0x9C);
		this.bus.emit('display?createxsize', 0xEF, this.BreakoutGame_XDISPSIZE_var);
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x66, 0xEF, 33, 0), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		this.bus.emit('display?update_', 0xD0);
		this.bus.emit('display?updateval210', 0xC6, 0xD6);
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0xDB, 0x2A, period_const, 0), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x04, 0xF3, 500, 0), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		this.bus.emit('display?updateval210', 0x13, 0x65);
		this.bus.emit('display?update_', 0xB3);
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xA6, 0x78, 1000, 0), 0);
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
		this.bus.emit('display?update_', 0x4C);
		this.bus.emit('display?updateval210', 0xAF, 0x59);
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		this.bus.emit('display?setColorbval202', 0x88, 255, 0xCD);
		this.bus.emit('display?setColorgr', 255, 255, 0x40);
		this.bus.emit('display?fillRectx', 8, 0x2D);
		this.bus.emit('display?fillRectywidthval205height', 142, 30, 76, 0x34, 0xAA);
		this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xCD);
		this.bus.emit('display?setColorbval202', 0x1B, this.BreakoutGame_fgcolor_var[2]
		, 0x86);
		this.bus.emit('display?fillRectx', 9, 0x3D);
		this.bus.emit('display?fillRectywidthval205height', 140, 31, 50, 0x68, 0xFC);
		this.bus.emit('display?setBGColorbrg', 0xC9, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?setBGColorval203', 0x31, 0x20);
		this.bus.emit('display?setColorbval202', 0x67, 130, 0xD2);
		this.bus.emit('display?setColorgr', 158, 209, 0x6A);
		this.bus.emit('display?drawIntegeryscaledigits', 6, 40, 0x24, 5);
		this.bus.emit('display?drawIntegerval206xv', 0x8E, 23, this.BreakoutGame_score_var, 0x89);
		this.bus.emit('display?drawThingML_', 0x11);
		this.bus.emit('display?drawThingMLval207yx', 0x18, 0xC5, 26, 87);
		this.bus.emit('display?updateval210', 0xA9, 0x14);
		this.bus.emit('display?update_', 0xB2);
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	this._statemachine.to(null).when((position_) => {
		return position_._port === 'controller' && position_._msg === 'position_';
	}).effect((position_) => {
		this.BreakoutGame_SC_received_controller_position__var = true;
		if(this.BreakoutGame_SC_received_controller_positionxyval214_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_position__var = false;
		this.BreakoutGame_SC_received_controller_positionxyval214_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionxyval214) => {
		return positionxyval214._port === 'controller' && positionxyval214._msg === 'positionxyval214';
	}).effect((positionxyval214) => {
		this.BreakoutGame_SC_received_controller_positionxyval214_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionxyval214.x;
		this.BreakoutGame_SC_controller_position_y_var = positionxyval214.y;
		this.BreakoutGame_SC_controller_position_val214_var = positionxyval214.val214;
		if(this.BreakoutGame_SC_received_controller_position__var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionxyval214_var = false;
		this.BreakoutGame_SC_received_controller_position__var = false;
		
		}
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelval220_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xBC, 0xF9, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval220_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelval220_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval220) => {
		return nextLevelval220._port === 'game' && nextLevelval220._msg === 'nextLevelval220' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelval220) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x20, 0xF9, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval220_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval220) => {
		return nextLevelval220._port === 'game' && nextLevelval220._msg === 'nextLevelval220' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelval220) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval220_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallval219_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x20, 0x75, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallval219_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallval219_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval219) => {
		return lostBallval219._port === 'game' && lostBallval219._msg === 'lostBallval219' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallval219) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xA5, 0x75, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallval219_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval219) => {
		return lostBallval219._port === 'game' && lostBallval219._msg === 'lostBallval219' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallval219) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallval219_var = true;
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var > 0);
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_GAMEOVER).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var === 0);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		this.bus.emit('display?updateval210', 0x35, 0x40);
		this.bus.emit('display?update_', 0x61);
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xAF, 0x7C, 33, 0), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		this.bus.emit('display?update_', 0x2B);
		this.bus.emit('display?updateval210', 0x3C, 0xEC);
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
		this.bus.emit('sound?toneval218freq', 0x28, this.BreakoutGame_tone2_var, 0x4A);
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0x98);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		this.bus.emit('sound?toneval218freq', 0xF1, this.BreakoutGame_tone2_var, 0xD4);
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0xB4);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		this.bus.emit('sound?toneval218freq', 0xA6, this.BreakoutGame_tone2_var, 0x02);
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0xB1);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		setTimeout(() => this.bus.emit('game?lostBallval219', 0x32, 0x0D), 0);
		setTimeout(() => this.bus.emit('game?lostBall_', 0x33), 0);
		setTimeout(() => this.bus.emit('req_game?lostBallval219', 0x35, 0x7B), 0);
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x8B), 0);
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		this.bus.emit('sound?toneval218freq', 0xE4, this.BreakoutGame_tone2_var, 0xB2);
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0x20);
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
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0x35);
		this.bus.emit('sound?toneval218freq', 0x28, this.BreakoutGame_tone1_var, 0xF6);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0x9B), 0);
		setTimeout(() => this.bus.emit('game?nextLevelval220', 0x6E, 0x91), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xB5), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevelval220', 0xAF, 0x4A), 0);
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		const by_const = this.BreakoutGame_by_var;
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadx', 0x38, by_const, padx_const), 0);
		const bx_const = this.BreakoutGame_bx_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIAval215ballxpady', bx_const, pady_const, 0xCB, 0x88), 0);
		this.bus.emit('display?updateval210', 0xBD, 0x7D);
		this.bus.emit('display?update_', 0x2C);
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0xA0, 0xF1, period_const, 0), 0);
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyval211_var);
	}).effect((displayReady_) => {
		this.bus.emit('display?clear_', 0xB9);
		this.bus.emit('display?clearval201', 0x23, 0x5C);
		this.initColors();
		this.bus.emit('display?setColorbval202', 0x09, this.BreakoutGame_bgcolor_var[2]
		, 0xD0);
		this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0x46);
		this.bus.emit('display?fillRectywidthval205height', this.BreakoutGame_XDISPSIZE_var, 0, this.BreakoutGame_YDISPSIZE_var, 0x7D, 0xCA);
		this.bus.emit('display?fillRectx', 0, 0xE7);
		this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xC4);
		this.bus.emit('display?setColorbval202', 0xAC, this.BreakoutGame_fgcolor_var[2]
		, 0x6A);
		this.bus.emit('display?fillRectywidthval205height', this.BreakoutGame_XDISPSIZE_var, 0, 14, 0xA3, 0x26);
		this.bus.emit('display?fillRectx', 0, 0xA3);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyval211_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyval211_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyval211) => {
		return displayReadyval211._port === 'display' && displayReadyval211._msg === 'displayReadyval211' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyval211) => {
		this.bus.emit('display?clearval201', 0x23, 0x59);
		this.bus.emit('display?clear_', 0x61);
		this.initColors();
		this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0xB5);
		this.bus.emit('display?setColorbval202', 0xF7, this.BreakoutGame_bgcolor_var[2]
		, 0xD0);
		this.bus.emit('display?fillRectywidthval205height', this.BreakoutGame_XDISPSIZE_var, 0, this.BreakoutGame_YDISPSIZE_var, 0x51, 0xCA);
		this.bus.emit('display?fillRectx', 0, 0x16);
		this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0x96);
		this.bus.emit('display?setColorbval202', 0x70, this.BreakoutGame_fgcolor_var[2]
		, 0x6A);
		this.bus.emit('display?fillRectywidthval205height', this.BreakoutGame_XDISPSIZE_var, 0, 14, 0xF1, 0x26);
		this.bus.emit('display?fillRectx', 0, 0x10);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyval211_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyval211) => {
		return displayReadyval211._port === 'display' && displayReadyval211._msg === 'displayReadyval211' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyval211) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyval211_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xA0, 0x7D, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval220) => {
		return nextLevelval220._port === 'pro_game' && nextLevelval220._msg === 'nextLevelval220' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelval220) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xC3, 0x7D, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval220) => {
		return nextLevelval220._port === 'pro_game' && nextLevelval220._msg === 'nextLevelval220' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelval220) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x36, 0xCB, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval219) => {
		return lostBallval219._port === 'pro_game' && lostBallval219._msg === 'lostBallval219' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallval219) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x89, 0xCB, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval219) => {
		return lostBallval219._port === 'pro_game' && lostBallval219._msg === 'lostBallval219' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallval219) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var = true;
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
	this.bus.emit('display?setBGColorbrg', 0x6A, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setBGColorval203', 0x23, 0x9C);
	this.bus.emit('display?setColorbval202', 0x54, this.BreakoutGame_fgcolor_var[2]
	, 0x31);
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x43);
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
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x30);
	this.bus.emit('display?setColorbval202', 0x2C, this.BreakoutGame_bgcolor_var[2]
	, 0x22);
	this.bus.emit('display?fillRectywidthval205height', bs_var, this.BreakoutGame_prevBY_var, bs_var, 0x89, 0xAE);
	this.bus.emit('display?fillRectx', this.BreakoutGame_prevBX_var, 0x35);
	
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
	this.bus.emit('display?setColorbval202', 0xEE, 111, 0xDA);
	this.bus.emit('display?setColorgr', 183, 199, 0xF9);
	this.bus.emit('display?fillRectx', this.BreakoutGame_prevBX_var, 0xF3);
	this.bus.emit('display?fillRectywidthval205height', bs_var, this.BreakoutGame_prevBY_var, bs_var, 0xFD, 0x44);
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	this.bus.emit('display?setColorbval202', 0x3B, this.BreakoutGame_bgcolor_var[2]
	, 0xA9);
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xC5);
	this.bus.emit('display?fillRectywidthval205height', ps_var, this.BreakoutGame_prevPY_var, 4, 0xF8, 0xDB);
	this.bus.emit('display?fillRectx', this.BreakoutGame_prevPX_var, 0x0F);
	
	}
}

BreakoutGameBrowser.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xD7);
	this.bus.emit('display?setColorbval202', 0x1C, this.BreakoutGame_fgcolor_var[2]
	, 0x26);
	this.bus.emit('display?fillRectx', this.BreakoutGame_prevPX_var, 0xFF);
	this.bus.emit('display?fillRectywidthval205height', ps_var, this.BreakoutGame_prevPY_var, 4, 0x29, 0x4F);
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	this.bus.emit('display?setColorbval202', 0x85, this.BreakoutGame_fgcolor_var[2]
	, 0x7F);
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xD1);
	if(BreakoutGame_drawCountDown_c_var > 0) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x1F);
	this.bus.emit('display?setColorbval202', 0x7E, this.BreakoutGame_fgcolor_var[2]
	, 0x3A);
	this.bus.emit('display?setBGColorbrg', 0x00, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setBGColorval203', 0xED, 0xF4);
	this.bus.emit('display?drawIntegerval206xv', 0x83, 80 - 6, BreakoutGame_drawCountDown_c_var, 0xF3);
	this.bus.emit('display?drawIntegeryscaledigits', 4, 90, 0x68, 1);
	
	} else {
	this.bus.emit('display?setColorbval202', 0xB4, this.BreakoutGame_bgcolor_var[2]
	, 0x4B);
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x84);
	this.bus.emit('display?fillRectywidthval205height', 12, 90, 20, 0x08, 0x20);
	this.bus.emit('display?fillRectx', 80 - 6, 0xA0);
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	this.bus.emit('display?setColorbval202', 0x62, this.BreakoutGame_fgcolor_var[2]
	, 0xEE);
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xDE);
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	this.bus.emit('display?fillRectx', left_var - 1, 0xAD);
	this.bus.emit('display?fillRectywidthval205height', xcenter_var + 1, top_var - 1, 1, 0x4E, 0x2E);
	this.bus.emit('display?fillRectx', left_var - 1, 0xD8);
	this.bus.emit('display?fillRectywidthval205height', xcenter_var + 1, bottom_var, 1, 0xC2, 0xA4);
	this.bus.emit('display?fillRectywidthval205height', 1, top_var, ycenter_var, 0xC5, 0xE5);
	this.bus.emit('display?fillRectx', left_var - 1, 0x92);
	this.bus.emit('display?fillRectywidthval205height', 1, top_var, ycenter_var, 0x9C, 0x59);
	this.bus.emit('display?fillRectx', right_var, 0x78);
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
	this.bus.emit('display?setColorgr', 155, 103, 0xFB);
	this.bus.emit('display?setColorbval202', 0x03, 89, 0xBC);
	this.bus.emit('display?fillRectywidthval205height', w_var, by_var, h_var, 0xF1, 0xC0);
	this.bus.emit('display?fillRectx', bx_var, 0x48);
	this.bus.emit('display?setColorbval202', 0x52, 43, 0x3B);
	this.bus.emit('display?setColorgr', 100, 56, 0xB5);
	this.bus.emit('display?drawRectheightx', bx_var, h_var, 0x57);
	this.bus.emit('display?drawRectwidthval204y', 0x66, by_var, w_var, 0xFD);
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x32);
	this.bus.emit('display?setColorbval202', 0x4E, this.BreakoutGame_bgcolor_var[2]
	, 0x04);
	this.bus.emit('display?fillRectywidthval205height', (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), by_var, this.BreakoutGame_BRICK_HEIGHT_var - 2, 0xE0, 0xC2);
	this.bus.emit('display?fillRectx', bx_var, 0x27);
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
	this.bus.emit('display?setColorbval202', 0x63, 130, 0xEA);
	this.bus.emit('display?setColorgr', 158, 209, 0x62);
	this.bus.emit('display?setBGColorval203', 0x57, 0xD4);
	this.bus.emit('display?setBGColorbrg', 0xD6, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xE0);
	this.bus.emit('display?setColorbval202', 0xC3, this.BreakoutGame_bgcolor_var[2]
	, 0x10);
	this.bus.emit('display?drawIntegeryscaledigits', 2, 2, 0xB5, 2);
	this.bus.emit('display?drawIntegerval206xv', 0x71, 6, this.BreakoutGame_level_var, 0x7C);
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
	this.bus.emit('display?setColorgr', 158, 209, 0x89);
	this.bus.emit('display?setColorbval202', 0xDC, 130, 0x60);
	this.bus.emit('display?setBGColorval203', 0x9D, 0xC7);
	this.bus.emit('display?setBGColorbrg', 0x09, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?drawIntegeryscaledigits', 2, 2, 0xA6, 5);
	this.bus.emit('display?drawIntegerval206xv', 0x2C, 58, this.BreakoutGame_score_var, 0x53);
}

BreakoutGameBrowser.prototype.drawLives = function() {
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xFE);
	this.bus.emit('display?setColorbval202', 0x35, this.BreakoutGame_fgcolor_var[2]
	, 0x96);
	this.bus.emit('display?fillRectywidthval205height', 24 + 6, 4, 6, 0x68, 0x2D);
	this.bus.emit('display?fillRectx', 124, 0x23);
	this.bus.emit('display?setColorbval202', 0x18, 111, 0x94);
	this.bus.emit('display?setColorgr', 183, 199, 0x50);
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	this.bus.emit('display?fillRectywidthval205height', 6, 4, 6, 0x06, 0x5E);
	this.bus.emit('display?fillRectx', 124 + (2 - i_var) * 12, 0xCD);
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(id, val223, val200) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, val223:val223, val200:val200});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(val234) {
	this._receive({_port:"display", _msg:"displayReady_", val234:val234});
}

BreakoutGameBrowser.prototype.receivedisplayReadyval211Ondisplay = function(val235, val211) {
	this._receive({_port:"display", _msg:"displayReadyval211", val235:val235, val211:val211});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(val244) {
	this._receive({_port:"display", _msg:"displayError_", val244:val244});
}

BreakoutGameBrowser.prototype.receivedisplayErrorval212Ondisplay = function(val245, val212) {
	this._receive({_port:"display", _msg:"displayErrorval212", val245:val245, val212:val212});
}

BreakoutGameBrowser.prototype.receiveposition_Oncontroller = function(val250) {
	this._receive({_port:"controller", _msg:"position_", val250:val250});
}

BreakoutGameBrowser.prototype.receivepositionxyval214Oncontroller = function(y, val214, val251, x) {
	this._receive({_port:"controller", _msg:"positionxyval214", y:y, val214:val214, val251:val251, x:x});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(val262) {
	this._receive({_port:"game", _msg:"lostBall_", val262:val262});
}

BreakoutGameBrowser.prototype.receivelostBallval219Ongame = function(val219, val263) {
	this._receive({_port:"game", _msg:"lostBallval219", val219:val219, val263:val263});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(val260) {
	this._receive({_port:"game", _msg:"nextLevel_", val260:val260});
}

BreakoutGameBrowser.prototype.receivenextLevelval220Ongame = function(val261, val220) {
	this._receive({_port:"game", _msg:"nextLevelval220", val261:val261, val220:val220});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(val262) {
	this._receive({_port:"pro_game", _msg:"lostBall_", val262:val262});
}

BreakoutGameBrowser.prototype.receivelostBallval219Onpro_game = function(val219, val263) {
	this._receive({_port:"pro_game", _msg:"lostBallval219", val219:val219, val263:val263});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(val260) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", val260:val260});
}

BreakoutGameBrowser.prototype.receivenextLevelval220Onpro_game = function(val261, val220) {
	this._receive({_port:"pro_game", _msg:"nextLevelval220", val261:val261, val220:val220});
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyval211_var = function(BreakoutGame_SC_INIT_received_display_displayReadyval211_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyval211_var = BreakoutGame_SC_INIT_received_display_displayReadyval211_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val220_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_val220_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val220_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_val220_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_position__var = function(BreakoutGame_SC_received_controller_position__var) {
	this.BreakoutGame_SC_received_controller_position__var = BreakoutGame_SC_received_controller_position__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_val219_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_val219_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_val219_var = BreakoutGame_SC_PLAY_pro_game_lostBall_val219_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelval220_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelval220_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelval220_var = BreakoutGame_SC_PLAY_received_game_nextLevelval220_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_val219_var = function(BreakoutGame_SC_PLAY_game_lostBall_val219_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_val219_var = BreakoutGame_SC_PLAY_game_lostBall_val219_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_val220_var = function(BreakoutGame_SC_PLAY_game_nextLevel_val220_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_val220_var = BreakoutGame_SC_PLAY_game_nextLevel_val220_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallval219_var = function(BreakoutGame_SC_PLAY_received_game_lostBallval219_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallval219_var = BreakoutGame_SC_PLAY_received_game_lostBallval219_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_val214_var = function(BreakoutGame_SC_controller_position_val214_var) {
	this.BreakoutGame_SC_controller_position_val214_var = BreakoutGame_SC_controller_position_val214_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_val211_var = function(BreakoutGame_SC_INIT_display_displayReady_val211_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_val211_var = BreakoutGame_SC_INIT_display_displayReady_val211_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionxyval214_var = function(BreakoutGame_SC_received_controller_positionxyval214_var) {
	this.BreakoutGame_SC_received_controller_positionxyval214_var = BreakoutGame_SC_received_controller_positionxyval214_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\treceived_display_displayReadyval211 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyval211_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tpro_game_nextLevel_val220 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val220_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\treceived_controller_position_ = ' + this.BreakoutGame_SC_received_controller_position__var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tpro_game_lostBall_val219 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_val219_var;
	result += '\n\treceived_game_nextLevelval220 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelval220_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tgame_lostBall_val219 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_val219_var;
	result += '\n\tgame_nextLevel_val220 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_val220_var;
	result += '\n\treceived_game_lostBallval219 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallval219_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tcontroller_position_val214 = ' + this.BreakoutGame_SC_controller_position_val214_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\treceived_pro_game_nextLevelval220 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\treceived_pro_game_lostBallval219 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var;
	result += '\n\tdisplay_displayReady_val211 = ' + this.BreakoutGame_SC_INIT_display_displayReady_val211_var;
	result += '\n\treceived_controller_positionxyval214 = ' + this.BreakoutGame_SC_received_controller_positionxyval214_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '';
	return result;
}

