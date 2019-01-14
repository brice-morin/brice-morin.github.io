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
		this.bus.emit('display?createxsizeval142', this.BreakoutGame_XDISPSIZE_var, 0xEB, 0xFE);
		this.bus.emit('display?createysize', 0x7F, this.BreakoutGame_YDISPSIZE_var);
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 33, 0xE8, 0x84), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		this.bus.emit('display?update_', 0x42);
		this.bus.emit('display?updateval144', 0x13, 0xCC);
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, period_const, 0xB7, 0x9B), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 500, 0x3A, 0x14), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		this.bus.emit('display?update_', 0x7F);
		this.bus.emit('display?updateval144', 0x35, 0xE5);
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 1000, 0x4B, 0x52), 0);
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
		this.bus.emit('display?updateval144', 0x65, 0xAC);
		this.bus.emit('display?update_', 0xDC);
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		this.bus.emit('display?setColorr', 255, 0x5A);
		this.bus.emit('display?setColorbgval136', 0x9D, 255, 0x60, 255);
		this.bus.emit('display?fillRectval139heightxwidth', 76, 0xA6, 142, 0x97, 8);
		this.bus.emit('display?fillRecty', 0xF9, 30);
		this.bus.emit('display?setColorbgval136', 0xF0, this.BreakoutGame_fgcolor_var[2]
		, 0x75, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
		, 0x30);
		this.bus.emit('display?fillRecty', 0x42, 31);
		this.bus.emit('display?fillRectval139heightxwidth', 50, 0x29, 140, 0xDD, 9);
		this.bus.emit('display?setBGColorb', 0x6B, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setBGColorval137rg', 0x5A, this.BreakoutGame_fgcolor_var[1]
		, 0xB1, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?setColorr', 158, 0xE1);
		this.bus.emit('display?setColorbgval136', 0x3D, 130, 0x23, 209);
		this.bus.emit('display?drawInteger_', 0x84);
		this.bus.emit('display?drawIntegerval140xyscaledigitsv', 0x82, 0x1C, 5, this.BreakoutGame_score_var, 40, 6, 23);
		this.bus.emit('display?drawThingMLval141', 0xDD, 0x71);
		this.bus.emit('display?drawThingMLyx', 0x63, 87, 26);
		this.bus.emit('display?update_', 0x89);
		this.bus.emit('display?updateval144', 0x4F, 0xB6);
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval154) => {
		return nextLevelval154._port === 'pro_game' && nextLevelval154._msg === 'nextLevelval154' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelval154) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x91, 0, 0xEC), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval154) => {
		return nextLevelval154._port === 'pro_game' && nextLevelval154._msg === 'nextLevelval154' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelval154) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval153) => {
		return lostBallval153._port === 'pro_game' && lostBallval153._msg === 'lostBallval153' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallval153) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x59, 0, 0xA2), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval153) => {
		return lostBallval153._port === 'pro_game' && lostBallval153._msg === 'lostBallval153' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallval153) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x59, 0, 0xF7), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x91, 0, 0xF1), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyval145_var);
	}).effect((displayReady_) => {
		this.bus.emit('display?clear_', 0x14);
		this.bus.emit('display?clearval135', 0x63, 0xA2);
		this.initColors();
		this.bus.emit('display?setColorbgval136', 0xFF, this.BreakoutGame_bgcolor_var[2]
		, 0x29, this.BreakoutGame_bgcolor_var[1]
		);
		this.bus.emit('display?setColorr', this.BreakoutGame_bgcolor_var[0]
		, 0x52);
		this.bus.emit('display?fillRectval139heightxwidth', this.BreakoutGame_YDISPSIZE_var, 0x2F, this.BreakoutGame_XDISPSIZE_var, 0x01, 0);
		this.bus.emit('display?fillRecty', 0xFD, 0);
		this.bus.emit('display?setColorbgval136', 0xAB, this.BreakoutGame_fgcolor_var[2]
		, 0x5C, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
		, 0x58);
		this.bus.emit('display?fillRecty', 0x26, 0);
		this.bus.emit('display?fillRectval139heightxwidth', 14, 0x76, this.BreakoutGame_XDISPSIZE_var, 0x47, 0);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyval145_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyval145_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyval145) => {
		return displayReadyval145._port === 'display' && displayReadyval145._msg === 'displayReadyval145' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyval145) => {
		this.bus.emit('display?clearval135', 0xD4, 0xA2);
		this.bus.emit('display?clear_', 0x2A);
		this.initColors();
		this.bus.emit('display?setColorbgval136', 0x7D, this.BreakoutGame_bgcolor_var[2]
		, 0x29, this.BreakoutGame_bgcolor_var[1]
		);
		this.bus.emit('display?setColorr', this.BreakoutGame_bgcolor_var[0]
		, 0x9D);
		this.bus.emit('display?fillRectval139heightxwidth', this.BreakoutGame_YDISPSIZE_var, 0x2F, this.BreakoutGame_XDISPSIZE_var, 0x7F, 0);
		this.bus.emit('display?fillRecty', 0x2F, 0);
		this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
		, 0xB9);
		this.bus.emit('display?setColorbgval136', 0xC5, this.BreakoutGame_fgcolor_var[2]
		, 0x5C, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?fillRecty', 0x16, 0);
		this.bus.emit('display?fillRectval139heightxwidth', 14, 0x76, this.BreakoutGame_XDISPSIZE_var, 0xB9, 0);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyval145_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyval145) => {
		return displayReadyval145._port === 'display' && displayReadyval145._msg === 'displayReadyval145' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyval145) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyval145_var = true;
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
		this.bus.emit('sound?toneval152', 0x4A, 0x9F);
		this.bus.emit('sound?tonefreqtime', this.BreakoutGame_tone_duration_var, 0x45, this.BreakoutGame_tone2_var);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		this.bus.emit('sound?tonefreqtime', this.BreakoutGame_tone_duration_var, 0x9D, this.BreakoutGame_tone2_var);
		this.bus.emit('sound?toneval152', 0x1E, 0x46);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		this.bus.emit('sound?tonefreqtime', this.BreakoutGame_tone_duration_var, 0xEF, this.BreakoutGame_tone2_var);
		this.bus.emit('sound?toneval152', 0xFC, 0x95);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0xAD), 0);
		setTimeout(() => this.bus.emit('game?lostBallval153', 0xAB, 0x74), 0);
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x1E), 0);
		setTimeout(() => this.bus.emit('req_game?lostBallval153', 0x37, 0x12), 0);
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		this.bus.emit('sound?toneval152', 0x35, 0x38);
		this.bus.emit('sound?tonefreqtime', this.BreakoutGame_tone_duration_var, 0x66, this.BreakoutGame_tone2_var);
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
		this.bus.emit('sound?toneval152', 0x70, 0xEA);
		this.bus.emit('sound?tonefreqtime', this.BreakoutGame_tone_duration_var, 0xE3, this.BreakoutGame_tone1_var);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xE8), 0);
		setTimeout(() => this.bus.emit('game?nextLevelval154', 0x00, 0x7A), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xCD), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevelval154', 0x04, 0xAB), 0);
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		const by_const = this.BreakoutGame_by_var;
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIAval149ballypadx', 0x2F, by_const, padx_const, 0xE0), 0);
		const pady_const = this.BreakoutGame_pady_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballxpady', pady_const, 0x35, bx_const), 0);
		this.bus.emit('display?updateval144', 0xD5, 0xBD);
		this.bus.emit('display?update_', 0x2B);
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, period_const, 0x1A, 0xC1), 0);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		this.bus.emit('display?update_', 0xFD);
		this.bus.emit('display?updateval144', 0x8F, 0xA4);
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 33, 0x53, 0x4B), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		this.bus.emit('display?update_', 0x62);
		this.bus.emit('display?updateval144', 0x4C, 0x05);
	});
	this._statemachine.to(null).when((positionval148) => {
		return positionval148._port === 'controller' && positionval148._msg === 'positionval148';
	}).effect((positionval148) => {
		this.BreakoutGame_SC_received_controller_positionval148_var = true;
		this.BreakoutGame_SC_controller_position_val148_var = positionval148.val148;
		if(this.BreakoutGame_SC_received_controller_positionyx_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionval148_var = false;
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionyx) => {
		return positionyx._port === 'controller' && positionyx._msg === 'positionyx';
	}).effect((positionyx) => {
		this.BreakoutGame_SC_received_controller_positionyx_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positionyx.y;
		this.BreakoutGame_SC_controller_position_x_var = positionyx.x;
		if(this.BreakoutGame_SC_received_controller_positionval148_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		this.BreakoutGame_SC_received_controller_positionval148_var = false;
		
		}
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval154) => {
		return nextLevelval154._port === 'game' && nextLevelval154._msg === 'nextLevelval154' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelval154) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x5A, 0, 0x9A), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval154_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval154) => {
		return nextLevelval154._port === 'game' && nextLevelval154._msg === 'nextLevelval154' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelval154) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval154_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval153) => {
		return lostBallval153._port === 'game' && lostBallval153._msg === 'lostBallval153' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallval153) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x34, 0, 0x24), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallval153_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval153) => {
		return lostBallval153._port === 'game' && lostBallval153._msg === 'lostBallval153' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallval153) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallval153_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallval153_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x34, 0, 0xFE), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallval153_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallval153_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelval154_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x5A, 0, 0x3E), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval154_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelval154_var));
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
	this.bus.emit('display?setBGColorb', 0x19, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setBGColorval137rg', 0x67, this.BreakoutGame_bgcolor_var[1]
	, 0xB7, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setColorbgval136', 0x11, this.BreakoutGame_fgcolor_var[2]
	, 0x1B, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
	, 0xAC);
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
	this.bus.emit('display?setColorbgval136', 0x03, this.BreakoutGame_bgcolor_var[2]
	, 0x1C, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', this.BreakoutGame_bgcolor_var[0]
	, 0xA5);
	this.bus.emit('display?fillRecty', 0x33, this.BreakoutGame_prevBY_var);
	this.bus.emit('display?fillRectval139heightxwidth', bs_var, 0x7A, bs_var, 0x9D, this.BreakoutGame_prevBX_var);
	
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
	this.bus.emit('display?setColorbgval136', 0x9D, 111, 0xF4, 199);
	this.bus.emit('display?setColorr', 183, 0x25);
	this.bus.emit('display?fillRecty', 0xD0, this.BreakoutGame_prevBY_var);
	this.bus.emit('display?fillRectval139heightxwidth', bs_var, 0xFB, bs_var, 0x1C, this.BreakoutGame_prevBX_var);
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	this.bus.emit('display?setColorbgval136', 0xC2, this.BreakoutGame_bgcolor_var[2]
	, 0xF8, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', this.BreakoutGame_bgcolor_var[0]
	, 0xC9);
	this.bus.emit('display?fillRecty', 0x49, this.BreakoutGame_prevPY_var);
	this.bus.emit('display?fillRectval139heightxwidth', 4, 0x65, ps_var, 0x17, this.BreakoutGame_prevPX_var);
	
	}
}

BreakoutGameBrowser.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
	, 0x12);
	this.bus.emit('display?setColorbgval136', 0x1B, this.BreakoutGame_fgcolor_var[2]
	, 0x79, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?fillRectval139heightxwidth', 4, 0x36, ps_var, 0x79, this.BreakoutGame_prevPX_var);
	this.bus.emit('display?fillRecty', 0xCA, this.BreakoutGame_prevPY_var);
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
	, 0x87);
	this.bus.emit('display?setColorbgval136', 0x68, this.BreakoutGame_fgcolor_var[2]
	, 0x49, this.BreakoutGame_fgcolor_var[1]
	);
	if(BreakoutGame_drawCountDown_c_var > 0) {
	this.bus.emit('display?setColorbgval136', 0x2C, this.BreakoutGame_fgcolor_var[2]
	, 0x8F, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
	, 0x8E);
	this.bus.emit('display?setBGColorval137rg', 0x55, this.BreakoutGame_bgcolor_var[1]
	, 0xFF, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setBGColorb', 0x70, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?drawIntegerval140xyscaledigitsv', 0x9D, 0x57, 1, BreakoutGame_drawCountDown_c_var, 90, 4, 80 - 6);
	this.bus.emit('display?drawInteger_', 0x56);
	
	} else {
	this.bus.emit('display?setColorbgval136', 0xDE, this.BreakoutGame_bgcolor_var[2]
	, 0xB9, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', this.BreakoutGame_bgcolor_var[0]
	, 0x28);
	this.bus.emit('display?fillRecty', 0xB4, 90);
	this.bus.emit('display?fillRectval139heightxwidth', 20, 0xBC, 12, 0xA5, 80 - 6);
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
	, 0xC8);
	this.bus.emit('display?setColorbgval136', 0x54, this.BreakoutGame_fgcolor_var[2]
	, 0xDE, this.BreakoutGame_fgcolor_var[1]
	);
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	this.bus.emit('display?fillRecty', 0x91, top_var - 1);
	this.bus.emit('display?fillRectval139heightxwidth', 1, 0x1E, xcenter_var + 1, 0x6A, left_var - 1);
	this.bus.emit('display?fillRectval139heightxwidth', 1, 0x82, xcenter_var + 1, 0x87, left_var - 1);
	this.bus.emit('display?fillRecty', 0xB4, bottom_var);
	this.bus.emit('display?fillRectval139heightxwidth', ycenter_var, 0xD5, 1, 0xD3, left_var - 1);
	this.bus.emit('display?fillRecty', 0x46, top_var);
	this.bus.emit('display?fillRectval139heightxwidth', ycenter_var, 0x50, 1, 0x21, right_var);
	this.bus.emit('display?fillRecty', 0x9D, top_var);
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
	this.bus.emit('display?setColorr', 155, 0xA9);
	this.bus.emit('display?setColorbgval136', 0x07, 89, 0x0F, 103);
	this.bus.emit('display?fillRecty', 0x57, by_var);
	this.bus.emit('display?fillRectval139heightxwidth', h_var, 0x03, w_var, 0xAB, bx_var);
	this.bus.emit('display?setColorbgval136', 0xB4, 43, 0xE9, 56);
	this.bus.emit('display?setColorr', 100, 0xDF);
	this.bus.emit('display?drawRectval138heightxwidth', 0xC0, h_var, 0x66, bx_var, w_var);
	this.bus.emit('display?drawRecty', by_var, 0xC0);
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	this.bus.emit('display?setColorbgval136', 0x22, this.BreakoutGame_bgcolor_var[2]
	, 0x67, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', this.BreakoutGame_bgcolor_var[0]
	, 0x73);
	this.bus.emit('display?fillRecty', 0xF2, by_var);
	this.bus.emit('display?fillRectval139heightxwidth', this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x80, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), 0xE6, bx_var);
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
	this.bus.emit('display?setColorr', 158, 0xA5);
	this.bus.emit('display?setColorbgval136', 0x75, 130, 0x16, 209);
	this.bus.emit('display?setBGColorb', 0x45, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setBGColorval137rg', 0x0D, this.BreakoutGame_fgcolor_var[1]
	, 0xB1, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorbgval136', 0x85, this.BreakoutGame_bgcolor_var[2]
	, 0xAA, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', this.BreakoutGame_bgcolor_var[0]
	, 0x57);
	this.bus.emit('display?drawIntegerval140xyscaledigitsv', 0xC7, 0xAD, 2, this.BreakoutGame_level_var, 2, 2, 6);
	this.bus.emit('display?drawInteger_', 0x8F);
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
	this.bus.emit('display?setColorbgval136', 0x03, 130, 0xD8, 209);
	this.bus.emit('display?setColorr', 158, 0x58);
	this.bus.emit('display?setBGColorval137rg', 0xC1, this.BreakoutGame_fgcolor_var[1]
	, 0x04, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setBGColorb', 0x3B, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?drawIntegerval140xyscaledigitsv', 0xDD, 0xB0, 5, this.BreakoutGame_score_var, 2, 2, 58);
	this.bus.emit('display?drawInteger_', 0x68);
}

BreakoutGameBrowser.prototype.drawLives = function() {
	this.bus.emit('display?setColorbgval136', 0xBE, this.BreakoutGame_fgcolor_var[2]
	, 0x89, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorr', this.BreakoutGame_fgcolor_var[0]
	, 0xC5);
	this.bus.emit('display?fillRectval139heightxwidth', 6, 0xB2, 24 + 6, 0xBB, 124);
	this.bus.emit('display?fillRecty', 0xB9, 4);
	this.bus.emit('display?setColorbgval136', 0xAC, 111, 0xC0, 199);
	this.bus.emit('display?setColorr', 183, 0x44);
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	this.bus.emit('display?fillRectval139heightxwidth', 6, 0xDE, 6, 0xA0, 124 + (2 - i_var) * 12);
	this.bus.emit('display?fillRecty', 0x66, 4);
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(id, val134, val157) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, val134:val134, val157:val157});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(val166) {
	this._receive({_port:"display", _msg:"displayReady_", val166:val166});
}

BreakoutGameBrowser.prototype.receivedisplayReadyval145Ondisplay = function(val145, val167) {
	this._receive({_port:"display", _msg:"displayReadyval145", val145:val145, val167:val167});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(val172) {
	this._receive({_port:"display", _msg:"displayError_", val172:val172});
}

BreakoutGameBrowser.prototype.receivedisplayErrorval146Ondisplay = function(val146, val173) {
	this._receive({_port:"display", _msg:"displayErrorval146", val146:val146, val173:val173});
}

BreakoutGameBrowser.prototype.receivepositionval148Oncontroller = function(val148, val182) {
	this._receive({_port:"controller", _msg:"positionval148", val148:val148, val182:val182});
}

BreakoutGameBrowser.prototype.receivepositionyxOncontroller = function(y, x, val183) {
	this._receive({_port:"controller", _msg:"positionyx", y:y, x:x, val183:val183});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(val196) {
	this._receive({_port:"game", _msg:"lostBall_", val196:val196});
}

BreakoutGameBrowser.prototype.receivelostBallval153Ongame = function(val153, val197) {
	this._receive({_port:"game", _msg:"lostBallval153", val153:val153, val197:val197});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(val194) {
	this._receive({_port:"game", _msg:"nextLevel_", val194:val194});
}

BreakoutGameBrowser.prototype.receivenextLevelval154Ongame = function(val154, val195) {
	this._receive({_port:"game", _msg:"nextLevelval154", val154:val154, val195:val195});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(val196) {
	this._receive({_port:"pro_game", _msg:"lostBall_", val196:val196});
}

BreakoutGameBrowser.prototype.receivelostBallval153Onpro_game = function(val153, val197) {
	this._receive({_port:"pro_game", _msg:"lostBallval153", val153:val153, val197:val197});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(val194) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", val194:val194});
}

BreakoutGameBrowser.prototype.receivenextLevelval154Onpro_game = function(val154, val195) {
	this._receive({_port:"pro_game", _msg:"nextLevelval154", val154:val154, val195:val195});
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionval148_var = function(BreakoutGame_SC_received_controller_positionval148_var) {
	this.BreakoutGame_SC_received_controller_positionval148_var = BreakoutGame_SC_received_controller_positionval148_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_val154_var = function(BreakoutGame_SC_PLAY_game_nextLevel_val154_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_val154_var = BreakoutGame_SC_PLAY_game_nextLevel_val154_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallval153_var = function(BreakoutGame_SC_PLAY_received_game_lostBallval153_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallval153_var = BreakoutGame_SC_PLAY_received_game_lostBallval153_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelval154_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelval154_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelval154_var = BreakoutGame_SC_PLAY_received_game_nextLevelval154_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_val153_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_val153_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_val153_var = BreakoutGame_SC_PLAY_pro_game_lostBall_val153_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_val145_var = function(BreakoutGame_SC_INIT_display_displayReady_val145_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_val145_var = BreakoutGame_SC_INIT_display_displayReady_val145_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_val148_var = function(BreakoutGame_SC_controller_position_val148_var) {
	this.BreakoutGame_SC_controller_position_val148_var = BreakoutGame_SC_controller_position_val148_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_val153_var = function(BreakoutGame_SC_PLAY_game_lostBall_val153_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_val153_var = BreakoutGame_SC_PLAY_game_lostBall_val153_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyval145_var = function(BreakoutGame_SC_INIT_received_display_displayReadyval145_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyval145_var = BreakoutGame_SC_INIT_received_display_displayReadyval145_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionyx_var = function(BreakoutGame_SC_received_controller_positionyx_var) {
	this.BreakoutGame_SC_received_controller_positionyx_var = BreakoutGame_SC_received_controller_positionyx_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val154_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_val154_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val154_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_val154_var;
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
	result += '\n\treceived_controller_positionval148 = ' + this.BreakoutGame_SC_received_controller_positionval148_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\treceived_pro_game_nextLevelval154 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tgame_nextLevel_val154 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_val154_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\treceived_pro_game_lostBallval153 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\treceived_game_lostBallval153 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallval153_var;
	result += '\n\treceived_game_nextLevelval154 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelval154_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tpro_game_lostBall_val153 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_val153_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tdisplay_displayReady_val145 = ' + this.BreakoutGame_SC_INIT_display_displayReady_val145_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tcontroller_position_val148 = ' + this.BreakoutGame_SC_controller_position_val148_var;
	result += '\n\tgame_lostBall_val153 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_val153_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
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
	result += '\n\treceived_display_displayReadyval145 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyval145_var;
	result += '\n\treceived_controller_positionyx = ' + this.BreakoutGame_SC_received_controller_positionyx_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tpro_game_nextLevel_val154 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val154_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '';
	return result;
}

