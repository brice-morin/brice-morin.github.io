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
		this.bus.emit('display?createval274', 0x0A, 0xDF);
		this.bus.emit('display?createysizexsize', this.BreakoutGame_XDISPSIZE_var, 0x80, this.BreakoutGame_YDISPSIZE_var);
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0xD3, 0, 0xA6), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		this.bus.emit('display?updateval276', 0xCF, 0x4C);
		this.bus.emit('display?update_', 0xE7);
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0xD7, 0, 0xAA), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 500, 0xA2, 0, 0x92), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		this.bus.emit('display?update_', 0x59);
		this.bus.emit('display?updateval276', 0x8D, 0xEC);
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 1000, 0xE2, 0, 0x2B), 0);
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
		this.bus.emit('display?update_', 0xBD);
		this.bus.emit('display?updateval276', 0x45, 0x4D);
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		this.bus.emit('display?setColorgval268', 255, 0x07, 0xF5);
		this.bus.emit('display?setColorrb', 255, 0x56, 255);
		this.bus.emit('display?fillRectval271height', 0x7E, 0x99, 76);
		this.bus.emit('display?fillRectyxwidth', 30, 0xA6, 8, 142);
		this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
		, 0x80, 0xFE);
		this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
		, 0xC2, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?fillRectval271height', 0xA3, 0x8B, 50);
		this.bus.emit('display?fillRectyxwidth', 31, 0xDD, 9, 140);
		this.bus.emit('display?setBGColorgval269', 0xAF, this.BreakoutGame_fgcolor_var[1]
		, 0x03);
		this.bus.emit('display?setBGColorrb', 0x6D, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?setColorrb', 158, 0xE0, 130);
		this.bus.emit('display?setColorgval268', 209, 0x9D, 0x45);
		this.bus.emit('display?drawIntegervx', 0x09, this.BreakoutGame_score_var, 23);
		this.bus.emit('display?drawIntegerval272scaleydigits', 0x25, 6, 0x10, 5, 40);
		this.bus.emit('display?drawThingMLval273x', 0xAA, 0x11, 26);
		this.bus.emit('display?drawThingMLy', 87, 0xAC);
		this.bus.emit('display?updateval276', 0x07, 0x35);
		this.bus.emit('display?update_', 0x2C);
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	this._statemachine.to(null).when((positionval280x) => {
		return positionval280x._port === 'controller' && positionval280x._msg === 'positionval280x';
	}).effect((positionval280x) => {
		this.BreakoutGame_SC_received_controller_positionval280x_var = true;
		this.BreakoutGame_SC_controller_position_val280_var = positionval280x.val280;
		this.BreakoutGame_SC_controller_position_x_var = positionval280x.x;
		if(this.BreakoutGame_SC_received_controller_positiony_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionval280x_var = false;
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		
		}
	});
	this._statemachine.to(null).when((positiony) => {
		return positiony._port === 'controller' && positiony._msg === 'positiony';
	}).effect((positiony) => {
		this.BreakoutGame_SC_received_controller_positiony_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positiony.y;
		if(this.BreakoutGame_SC_received_controller_positionval280x_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		this.BreakoutGame_SC_received_controller_positionval280x_var = false;
		
		}
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var);
	}).effect((displayReady_) => {
		this.bus.emit('display?clear_', 0xBB);
		this.bus.emit('display?clearval267', 0xA9, 0xC9);
		this.initColors();
		this.bus.emit('display?setColorrb', this.BreakoutGame_bgcolor_var[0]
		, 0x58, this.BreakoutGame_bgcolor_var[2]
		);
		this.bus.emit('display?setColorgval268', this.BreakoutGame_bgcolor_var[1]
		, 0xAF, 0x3A);
		this.bus.emit('display?fillRectyxwidth', 0, 0xB8, 0, this.BreakoutGame_XDISPSIZE_var);
		this.bus.emit('display?fillRectval271height', 0xBB, 0xCE, this.BreakoutGame_YDISPSIZE_var);
		this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
		, 0x1D, 0xD0);
		this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
		, 0x37, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?fillRectval271height', 0xA8, 0x5F, 14);
		this.bus.emit('display?fillRectyxwidth', 0, 0x65, 0, this.BreakoutGame_XDISPSIZE_var);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyval277) => {
		return displayReadyval277._port === 'display' && displayReadyval277._msg === 'displayReadyval277' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyval277) => {
		this.bus.emit('display?clear_', 0x6A);
		this.bus.emit('display?clearval267', 0x9F, 0xC9);
		this.initColors();
		this.bus.emit('display?setColorgval268', this.BreakoutGame_bgcolor_var[1]
		, 0xAF, 0x75);
		this.bus.emit('display?setColorrb', this.BreakoutGame_bgcolor_var[0]
		, 0x1D, this.BreakoutGame_bgcolor_var[2]
		);
		this.bus.emit('display?fillRectyxwidth', 0, 0x40, 0, this.BreakoutGame_XDISPSIZE_var);
		this.bus.emit('display?fillRectval271height', 0xE1, 0xCE, this.BreakoutGame_YDISPSIZE_var);
		this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
		, 0x62, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
		, 0x1D, 0xAF);
		this.bus.emit('display?fillRectval271height', 0x44, 0x5F, 14);
		this.bus.emit('display?fillRectyxwidth', 0, 0xB7, 0, this.BreakoutGame_XDISPSIZE_var);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyval277) => {
		return displayReadyval277._port === 'display' && displayReadyval277._msg === 'displayReadyval277' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyval277) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var = true;
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
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x65);
		this.bus.emit('sound?tonetimeval284', 0x65, 0x9C, this.BreakoutGame_tone_duration_var);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		this.bus.emit('sound?tonetimeval284', 0x57, 0xCC, this.BreakoutGame_tone_duration_var);
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x0A);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x18);
		this.bus.emit('sound?tonetimeval284', 0xDC, 0x2A, this.BreakoutGame_tone_duration_var);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x20), 0);
		setTimeout(() => this.bus.emit('game?lostBallval285', 0x68, 0xEF), 0);
		setTimeout(() => this.bus.emit('req_game?lostBallval285', 0x23, 0x0D), 0);
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x46), 0);
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		this.bus.emit('sound?tonetimeval284', 0x41, 0xD1, this.BreakoutGame_tone_duration_var);
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x18);
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
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone1_var, 0x5F);
		this.bus.emit('sound?tonetimeval284', 0xA6, 0x55, this.BreakoutGame_tone_duration_var);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xDF), 0);
		setTimeout(() => this.bus.emit('game?nextLevelval286', 0xA1, 0xB4), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevelval286', 0x42, 0x91), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0x7F), 0);
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		const bx_const = this.BreakoutGame_bx_var;
		const by_const = this.BreakoutGame_by_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApadyval281ballxbally', bx_const, by_const, pady_const, 0xDC, 0xB3), 0);
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadx', padx_const, 0xAB), 0);
		this.bus.emit('display?updateval276', 0xFA, 0x95);
		this.bus.emit('display?update_', 0x22);
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0xA2, 0, 0xAD), 0);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		this.bus.emit('display?update_', 0xAB);
		this.bus.emit('display?updateval276', 0x3D, 0x9E);
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0x85, 0, 0xEF), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		this.bus.emit('display?updateval276', 0x04, 0xF9);
		this.bus.emit('display?update_', 0x2E);
	});
	BreakoutGame_SC_NEXTLEVEL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0);
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var > 0);
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_GAMEOVER).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var === 0);
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xBC, 0xBD, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval286) => {
		return nextLevelval286._port === 'pro_game' && nextLevelval286._msg === 'nextLevelval286' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelval286) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x6C, 0x5B, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval286) => {
		return nextLevelval286._port === 'pro_game' && nextLevelval286._msg === 'nextLevelval286' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelval286) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xEE, 0x5B, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval285) => {
		return lostBallval285._port === 'pro_game' && lostBallval285._msg === 'lostBallval285' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallval285) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x34, 0xBD, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval285) => {
		return lostBallval285._port === 'pro_game' && lostBallval285._msg === 'lostBallval285' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallval285) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallval285_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x61, 0x16, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallval285_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallval285_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval286) => {
		return nextLevelval286._port === 'game' && nextLevelval286._msg === 'nextLevelval286' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelval286) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x26, 0x40, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval286_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval286) => {
		return nextLevelval286._port === 'game' && nextLevelval286._msg === 'nextLevelval286' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelval286) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval286_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelval286_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xD7, 0x40, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval286_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelval286_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval285) => {
		return lostBallval285._port === 'game' && lostBallval285._msg === 'lostBallval285' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallval285) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x17, 0x16, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallval285_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval285) => {
		return lostBallval285._port === 'game' && lostBallval285._msg === 'lostBallval285' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallval285) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallval285_var = true;
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
	this.bus.emit('display?setBGColorgval269', 0x06, this.BreakoutGame_bgcolor_var[1]
	, 0xAD);
	this.bus.emit('display?setBGColorrb', 0x56, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
	, 0xB7, 0xF2);
	this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
	, 0x55, this.BreakoutGame_fgcolor_var[2]
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
	this.bus.emit('display?setColorrb', this.BreakoutGame_bgcolor_var[0]
	, 0x6F, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setColorgval268', this.BreakoutGame_bgcolor_var[1]
	, 0xCE, 0x4B);
	this.bus.emit('display?fillRectval271height', 0xAA, 0x92, bs_var);
	this.bus.emit('display?fillRectyxwidth', this.BreakoutGame_prevBY_var, 0x3C, this.BreakoutGame_prevBX_var, bs_var);
	
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
	this.bus.emit('display?setColorgval268', 199, 0x21, 0x60);
	this.bus.emit('display?setColorrb', 183, 0x72, 111);
	this.bus.emit('display?fillRectyxwidth', this.BreakoutGame_prevBY_var, 0x73, this.BreakoutGame_prevBX_var, bs_var);
	this.bus.emit('display?fillRectval271height', 0xC0, 0xE6, bs_var);
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	this.bus.emit('display?setColorgval268', this.BreakoutGame_bgcolor_var[1]
	, 0x25, 0xD1);
	this.bus.emit('display?setColorrb', this.BreakoutGame_bgcolor_var[0]
	, 0x27, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectval271height', 0xA5, 0x5A, 4);
	this.bus.emit('display?fillRectyxwidth', this.BreakoutGame_prevPY_var, 0xFE, this.BreakoutGame_prevPX_var, ps_var);
	
	}
}

BreakoutGameBrowser.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
	, 0x6E, 0x4A);
	this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
	, 0x61, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?fillRectyxwidth', this.BreakoutGame_prevPY_var, 0x14, this.BreakoutGame_prevPX_var, ps_var);
	this.bus.emit('display?fillRectval271height', 0xA6, 0x54, 4);
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
	, 0x72, 0x7B);
	this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
	, 0xF5, this.BreakoutGame_fgcolor_var[2]
	);
	if(BreakoutGame_drawCountDown_c_var > 0) {
	this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
	, 0x1C, 0xEC);
	this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
	, 0xB8, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setBGColorgval269', 0x36, this.BreakoutGame_bgcolor_var[1]
	, 0x39);
	this.bus.emit('display?setBGColorrb', 0x9F, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?drawIntegervx', 0x03, BreakoutGame_drawCountDown_c_var, 80 - 6);
	this.bus.emit('display?drawIntegerval272scaleydigits', 0x4D, 4, 0x7B, 1, 90);
	
	} else {
	this.bus.emit('display?setColorgval268', this.BreakoutGame_bgcolor_var[1]
	, 0x1E, 0xA3);
	this.bus.emit('display?setColorrb', this.BreakoutGame_bgcolor_var[0]
	, 0x09, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectyxwidth', 90, 0x36, 80 - 6, 12);
	this.bus.emit('display?fillRectval271height', 0xC9, 0x66, 20);
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
	, 0xB0, 0x88);
	this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
	, 0x05, this.BreakoutGame_fgcolor_var[2]
	);
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	this.bus.emit('display?fillRectyxwidth', top_var - 1, 0x21, left_var - 1, xcenter_var + 1);
	this.bus.emit('display?fillRectval271height', 0x49, 0x36, 1);
	this.bus.emit('display?fillRectval271height', 0xBC, 0xC7, 1);
	this.bus.emit('display?fillRectyxwidth', bottom_var, 0x98, left_var - 1, xcenter_var + 1);
	this.bus.emit('display?fillRectval271height', 0xB7, 0x1A, ycenter_var);
	this.bus.emit('display?fillRectyxwidth', top_var, 0x8F, left_var - 1, 1);
	this.bus.emit('display?fillRectyxwidth', top_var, 0x76, right_var, 1);
	this.bus.emit('display?fillRectval271height', 0xD7, 0xFA, ycenter_var);
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
	this.bus.emit('display?setColorgval268', 103, 0xDD, 0xCF);
	this.bus.emit('display?setColorrb', 155, 0x1D, 89);
	this.bus.emit('display?fillRectyxwidth', by_var, 0xFB, bx_var, w_var);
	this.bus.emit('display?fillRectval271height', 0xD0, 0xC1, h_var);
	this.bus.emit('display?setColorgval268', 56, 0x6D, 0x3D);
	this.bus.emit('display?setColorrb', 100, 0xD2, 43);
	this.bus.emit('display?drawRect_', 0x16);
	this.bus.emit('display?drawRectwidthyxheightval270', h_var, bx_var, w_var, 0x1D, 0x8F, by_var);
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	this.bus.emit('display?setColorgval268', this.BreakoutGame_bgcolor_var[1]
	, 0xAA, 0xAF);
	this.bus.emit('display?setColorrb', this.BreakoutGame_bgcolor_var[0]
	, 0xB7, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectval271height', 0x62, 0xE9, this.BreakoutGame_BRICK_HEIGHT_var - 2);
	this.bus.emit('display?fillRectyxwidth', by_var, 0xA9, bx_var, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
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
	this.bus.emit('display?setColorgval268', 209, 0x60, 0xE3);
	this.bus.emit('display?setColorrb', 158, 0x28, 130);
	this.bus.emit('display?setBGColorrb', 0xDE, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setBGColorgval269', 0x39, this.BreakoutGame_fgcolor_var[1]
	, 0xB3);
	this.bus.emit('display?setColorgval268', this.BreakoutGame_bgcolor_var[1]
	, 0x53, 0xBE);
	this.bus.emit('display?setColorrb', this.BreakoutGame_bgcolor_var[0]
	, 0x44, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?drawIntegerval272scaleydigits', 0x76, 2, 0x24, 2, 2);
	this.bus.emit('display?drawIntegervx', 0xC7, this.BreakoutGame_level_var, 6);
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
	this.bus.emit('display?setColorrb', 158, 0x6C, 130);
	this.bus.emit('display?setColorgval268', 209, 0xB6, 0x5A);
	this.bus.emit('display?setBGColorrb', 0xDB, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setBGColorgval269', 0x07, this.BreakoutGame_fgcolor_var[1]
	, 0x53);
	this.bus.emit('display?drawIntegervx', 0xA0, this.BreakoutGame_score_var, 58);
	this.bus.emit('display?drawIntegerval272scaleydigits', 0x33, 2, 0x2B, 5, 2);
}

BreakoutGameBrowser.prototype.drawLives = function() {
	this.bus.emit('display?setColorgval268', this.BreakoutGame_fgcolor_var[1]
	, 0x8A, 0x34);
	this.bus.emit('display?setColorrb', this.BreakoutGame_fgcolor_var[0]
	, 0x6D, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?fillRectyxwidth', 4, 0x87, 124, 24 + 6);
	this.bus.emit('display?fillRectval271height', 0x39, 0xCA, 6);
	this.bus.emit('display?setColorrb', 183, 0x0A, 111);
	this.bus.emit('display?setColorgval268', 199, 0xE4, 0x23);
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	this.bus.emit('display?fillRectyxwidth', 4, 0x5A, 124 + (2 - i_var) * 12, 6);
	this.bus.emit('display?fillRectval271height', 0x0F, 0x23, 6);
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(val266, val287, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", val266:val266, val287:val287, id:id});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(val298) {
	this._receive({_port:"display", _msg:"displayReady_", val298:val298});
}

BreakoutGameBrowser.prototype.receivedisplayReadyval277Ondisplay = function(val299, val277) {
	this._receive({_port:"display", _msg:"displayReadyval277", val299:val299, val277:val277});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(val304) {
	this._receive({_port:"display", _msg:"displayError_", val304:val304});
}

BreakoutGameBrowser.prototype.receivedisplayErrorval278Ondisplay = function(val278, val305) {
	this._receive({_port:"display", _msg:"displayErrorval278", val278:val278, val305:val305});
}

BreakoutGameBrowser.prototype.receivepositionyOncontroller = function(y, val316) {
	this._receive({_port:"controller", _msg:"positiony", y:y, val316:val316});
}

BreakoutGameBrowser.prototype.receivepositionval280xOncontroller = function(val280, val317, x) {
	this._receive({_port:"controller", _msg:"positionval280x", val280:val280, val317:val317, x:x});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(val328) {
	this._receive({_port:"game", _msg:"lostBall_", val328:val328});
}

BreakoutGameBrowser.prototype.receivelostBallval285Ongame = function(val329, val285) {
	this._receive({_port:"game", _msg:"lostBallval285", val329:val329, val285:val285});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(val326) {
	this._receive({_port:"game", _msg:"nextLevel_", val326:val326});
}

BreakoutGameBrowser.prototype.receivenextLevelval286Ongame = function(val327, val286) {
	this._receive({_port:"game", _msg:"nextLevelval286", val327:val327, val286:val286});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(val328) {
	this._receive({_port:"pro_game", _msg:"lostBall_", val328:val328});
}

BreakoutGameBrowser.prototype.receivelostBallval285Onpro_game = function(val329, val285) {
	this._receive({_port:"pro_game", _msg:"lostBallval285", val329:val329, val285:val285});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(val326) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", val326:val326});
}

BreakoutGameBrowser.prototype.receivenextLevelval286Onpro_game = function(val327, val286) {
	this._receive({_port:"pro_game", _msg:"nextLevelval286", val327:val327, val286:val286});
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_val277_var = function(BreakoutGame_SC_INIT_display_displayReady_val277_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_val277_var = BreakoutGame_SC_INIT_display_displayReady_val277_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallval285_var = function(BreakoutGame_SC_PLAY_received_game_lostBallval285_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallval285_var = BreakoutGame_SC_PLAY_received_game_lostBallval285_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_val285_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_val285_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_val285_var = BreakoutGame_SC_PLAY_pro_game_lostBall_val285_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_val280_var = function(BreakoutGame_SC_controller_position_val280_var) {
	this.BreakoutGame_SC_controller_position_val280_var = BreakoutGame_SC_controller_position_val280_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_val286_var = function(BreakoutGame_SC_PLAY_game_nextLevel_val286_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_val286_var = BreakoutGame_SC_PLAY_game_nextLevel_val286_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelval286_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelval286_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelval286_var = BreakoutGame_SC_PLAY_received_game_nextLevelval286_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positiony_var = function(BreakoutGame_SC_received_controller_positiony_var) {
	this.BreakoutGame_SC_received_controller_positiony_var = BreakoutGame_SC_received_controller_positiony_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val286_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_val286_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val286_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_val286_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_val285_var = function(BreakoutGame_SC_PLAY_game_lostBall_val285_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_val285_var = BreakoutGame_SC_PLAY_game_lostBall_val285_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyval277_var = function(BreakoutGame_SC_INIT_received_display_displayReadyval277_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var = BreakoutGame_SC_INIT_received_display_displayReadyval277_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionval280x_var = function(BreakoutGame_SC_received_controller_positionval280x_var) {
	this.BreakoutGame_SC_received_controller_positionval280x_var = BreakoutGame_SC_received_controller_positionval280x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tdisplay_displayReady_val277 = ' + this.BreakoutGame_SC_INIT_display_displayReady_val277_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\treceived_game_lostBallval285 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallval285_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tpro_game_lostBall_val285 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_val285_var;
	result += '\n\tcontroller_position_val280 = ' + this.BreakoutGame_SC_controller_position_val280_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tgame_nextLevel_val286 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_val286_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\treceived_game_nextLevelval286 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelval286_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\treceived_controller_positiony = ' + this.BreakoutGame_SC_received_controller_positiony_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tpro_game_nextLevel_val286 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val286_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tgame_lostBall_val285 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_val285_var;
	result += '\n\treceived_display_displayReadyval277 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var;
	result += '\n\treceived_pro_game_nextLevelval286 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var;
	result += '\n\treceived_controller_positionval280x = ' + this.BreakoutGame_SC_received_controller_positionval280x_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\treceived_pro_game_lostBallval285 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '';
	return result;
}

