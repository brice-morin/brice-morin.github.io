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
		this.bus.emit('display?createxsize', this.BreakoutGame_XDISPSIZE_var, 0xB7);
		this.bus.emit('display?createysizeval274', this.BreakoutGame_YDISPSIZE_var, 0x1A, 0x62);
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x23, 0, 33, 0xAA), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		this.bus.emit('display?updateval276', 0x5A, 0xE9);
		this.bus.emit('display?update_', 0x0F);
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0x3A, 0, period_const, 0x76), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x20, 0, 500, 0x04), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		this.bus.emit('display?update_', 0x68);
		this.bus.emit('display?updateval276', 0x23, 0x3D);
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x46, 0, 1000, 0xAA), 0);
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
		this.bus.emit('display?update_', 0xD1);
		this.bus.emit('display?updateval276', 0x18, 0x65);
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		this.bus.emit('display?updateval276', 0x5F, 0x57);
		this.bus.emit('display?update_', 0x55);
		setTimeout(() => this.bus.emit('clock?timer_start', 0xDF, 0, 500, 0xDC), 0);
	});
	let BreakoutGame_SC_GAMEREALLYOVER = new StateJS.State('GAMEREALLYOVER', this._statemachine).entry(() => {
		this.bus.emit('display?setColorbval268g', 255, 0xEF, 0xA1, 255);
		this.bus.emit('display?setColorr', 0x42, 255);
		this.bus.emit('display?fillRect_', 0x7F);
		this.bus.emit('display?fillRectyxwidthval271height', 8, 142, 76, 0x0D, 0xDC, 30);
		this.bus.emit('display?setColorr', 0xAB, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
		, 0x41, 0x95, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?fillRectyxwidthval271height', 9, 140, 50, 0xA6, 0x22, 31);
		this.bus.emit('display?fillRect_', 0xA2);
		this.bus.emit('display?setBGColorval269b', 0xB4, this.BreakoutGame_fgcolor_var[2]
		, 0x61);
		this.bus.emit('display?setBGColorrg', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0x17);
		this.bus.emit('display?setColorr', 0xD7, 158);
		this.bus.emit('display?setColorbval268g', 130, 0x91, 0x26, 209);
		this.bus.emit('display?drawIntegerval272digitsv', 0xB3, 0xBC, 5, this.BreakoutGame_score_var);
		this.bus.emit('display?drawIntegerscaleyx', 0x34, 23, 40, 6);
		this.bus.emit('display?drawThingMLval273', 0xFA, 0xEE);
		this.bus.emit('display?drawThingMLyx', 0x6C, 87, 26);
		this.bus.emit('display?updateval276', 0xA2, 0xAD);
		this.bus.emit('display?update_', 0x59);
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var);
	}).effect((displayReady_) => {
		this.bus.emit('display?clear_', 0xA9);
		this.bus.emit('display?clearval267', 0xE3, 0xFA);
		this.initColors();
		this.bus.emit('display?setColorbval268g', this.BreakoutGame_bgcolor_var[2]
		, 0xDD, 0x28, this.BreakoutGame_bgcolor_var[1]
		);
		this.bus.emit('display?setColorr', 0xDE, this.BreakoutGame_bgcolor_var[0]
		);
		this.bus.emit('display?fillRect_', 0xB3);
		this.bus.emit('display?fillRectyxwidthval271height', 0, this.BreakoutGame_XDISPSIZE_var, this.BreakoutGame_YDISPSIZE_var, 0xC1, 0xBE, 0);
		this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
		, 0x6D, 0x44, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?setColorr', 0x24, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?fillRect_', 0xC7);
		this.bus.emit('display?fillRectyxwidthval271height', 0, this.BreakoutGame_XDISPSIZE_var, 14, 0x1D, 0x6C, 0);
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
		this.bus.emit('display?clearval267', 0x5A, 0xFA);
		this.bus.emit('display?clear_', 0xDB);
		this.initColors();
		this.bus.emit('display?setColorr', 0x53, this.BreakoutGame_bgcolor_var[0]
		);
		this.bus.emit('display?setColorbval268g', this.BreakoutGame_bgcolor_var[2]
		, 0xDD, 0xA0, this.BreakoutGame_bgcolor_var[1]
		);
		this.bus.emit('display?fillRect_', 0x2B);
		this.bus.emit('display?fillRectyxwidthval271height', 0, this.BreakoutGame_XDISPSIZE_var, this.BreakoutGame_YDISPSIZE_var, 0xC1, 0x34, 0);
		this.bus.emit('display?setColorr', 0x6D, this.BreakoutGame_fgcolor_var[0]
		);
		this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
		, 0x6D, 0x87, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?fillRectyxwidthval271height', 0, this.BreakoutGame_XDISPSIZE_var, 14, 0x1D, 0x39, 0);
		this.bus.emit('display?fillRect_', 0x0A);
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
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval284) => {
		return lostBallval284._port === 'game' && lostBallval284._msg === 'lostBallval284' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallval284) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xD7, 0x5F, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallval284_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval284) => {
		return lostBallval284._port === 'game' && lostBallval284._msg === 'lostBallval284' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallval284) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallval284_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallval284_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x9E, 0x5F, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallval284_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallval284_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelval285_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x65, 0xA6, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval285_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelval285_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval285) => {
		return nextLevelval285._port === 'game' && nextLevelval285._msg === 'nextLevelval285' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelval285) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x9C, 0xA6, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval285_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval285) => {
		return nextLevelval285._port === 'game' && nextLevelval285._msg === 'nextLevelval285' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelval285) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval285_var = true;
	});
	this._statemachine.to(null).when((positionxval280) => {
		return positionxval280._port === 'controller' && positionxval280._msg === 'positionxval280';
	}).effect((positionxval280) => {
		this.BreakoutGame_SC_received_controller_positionxval280_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionxval280.x;
		this.BreakoutGame_SC_controller_position_val280_var = positionxval280.val280;
		if(this.BreakoutGame_SC_received_controller_positiony_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionxval280_var = false;
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		
		}
	});
	this._statemachine.to(null).when((positiony) => {
		return positiony._port === 'controller' && positiony._msg === 'positiony';
	}).effect((positiony) => {
		this.BreakoutGame_SC_received_controller_positiony_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positiony.y;
		if(this.BreakoutGame_SC_received_controller_positionxval280_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		this.BreakoutGame_SC_received_controller_positionxval280_var = false;
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		this.bus.emit('display?update_', 0xA9);
		this.bus.emit('display?updateval276', 0x58, 0x53);
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x0A, 0, 33, 0x60), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		this.bus.emit('display?updateval276', 0x80, 0x39);
		this.bus.emit('display?update_', 0xBB);
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
		this.bus.emit('sound?tonetime', 0xB8, this.BreakoutGame_tone_duration_var);
		this.bus.emit('sound?toneval286freq', 0xB6, this.BreakoutGame_tone2_var, 0xBB);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		this.bus.emit('sound?tonetime', 0xD0, this.BreakoutGame_tone_duration_var);
		this.bus.emit('sound?toneval286freq', 0x07, this.BreakoutGame_tone2_var, 0x37);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		this.bus.emit('sound?tonetime', 0xA8, this.BreakoutGame_tone_duration_var);
		this.bus.emit('sound?toneval286freq', 0x33, this.BreakoutGame_tone2_var, 0x65);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x6A), 0);
		setTimeout(() => this.bus.emit('game?lostBallval284', 0x8A, 0x9F), 0);
		setTimeout(() => this.bus.emit('req_game?lostBallval284', 0xCA, 0x75), 0);
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x1D), 0);
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		this.bus.emit('sound?toneval286freq', 0xE4, this.BreakoutGame_tone2_var, 0x40);
		this.bus.emit('sound?tonetime', 0xE1, this.BreakoutGame_tone_duration_var);
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
		this.bus.emit('sound?toneval286freq', 0x23, this.BreakoutGame_tone1_var, 0x62);
		this.bus.emit('sound?tonetime', 0xAF, this.BreakoutGame_tone_duration_var);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0x44), 0);
		setTimeout(() => this.bus.emit('game?nextLevelval285', 0xB7, 0xDF), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xD3), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevelval285', 0x4C, 0xC9), 0);
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		const padx_const = this.BreakoutGame_padx_var;
		const by_const = this.BreakoutGame_by_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApadyval281padxbally', padx_const, 0xE7, by_const, pady_const, 0xAF), 0);
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballx', 0x85, bx_const), 0);
		this.bus.emit('display?updateval276', 0xF9, 0xCE);
		this.bus.emit('display?update_', 0x2E);
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0xAB, 0, period_const, 0x1D), 0);
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval284) => {
		return lostBallval284._port === 'pro_game' && lostBallval284._msg === 'lostBallval284' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallval284) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x0A, 0xCF, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval284) => {
		return lostBallval284._port === 'pro_game' && lostBallval284._msg === 'lostBallval284' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallval284) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xCC, 0xCF, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x18, 0xEF, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval285) => {
		return nextLevelval285._port === 'pro_game' && nextLevelval285._msg === 'nextLevelval285' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelval285) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x2A, 0xEF, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval285) => {
		return nextLevelval285._port === 'pro_game' && nextLevelval285._msg === 'nextLevelval285' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelval285) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var = true;
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
	this.bus.emit('display?setBGColorrg', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xBF);
	this.bus.emit('display?setBGColorval269b', 0xD4, this.BreakoutGame_bgcolor_var[2]
	, 0xB9);
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
	, 0xFD, 0x2C, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x60, this.BreakoutGame_fgcolor_var[0]
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
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_bgcolor_var[2]
	, 0x1A, 0xB8, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x1F, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?fillRectyxwidthval271height', this.BreakoutGame_prevBX_var, bs_var, bs_var, 0x12, 0x94, this.BreakoutGame_prevBY_var);
	this.bus.emit('display?fillRect_', 0xBC);
	
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
	this.bus.emit('display?setColorr', 0xCD, 183);
	this.bus.emit('display?setColorbval268g', 111, 0x29, 0x7D, 199);
	this.bus.emit('display?fillRect_', 0xB4);
	this.bus.emit('display?fillRectyxwidthval271height', this.BreakoutGame_prevBX_var, bs_var, bs_var, 0x65, 0x02, this.BreakoutGame_prevBY_var);
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_bgcolor_var[2]
	, 0x20, 0xD0, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x10, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?fillRectyxwidthval271height', this.BreakoutGame_prevPX_var, ps_var, 4, 0x0C, 0x18, this.BreakoutGame_prevPY_var);
	this.bus.emit('display?fillRect_', 0xD5);
	
	}
}

BreakoutGameBrowser.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
	, 0x46, 0xF0, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x92, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?fillRect_', 0xB4);
	this.bus.emit('display?fillRectyxwidthval271height', this.BreakoutGame_prevPX_var, ps_var, 4, 0xB7, 0x7A, this.BreakoutGame_prevPY_var);
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	this.bus.emit('display?setColorr', 0x73, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
	, 0x64, 0xB3, this.BreakoutGame_fgcolor_var[1]
	);
	if(BreakoutGame_drawCountDown_c_var > 0) {
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
	, 0x16, 0x9C, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x4F, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?setBGColorrg', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xAD);
	this.bus.emit('display?setBGColorval269b', 0xBD, this.BreakoutGame_bgcolor_var[2]
	, 0xAD);
	this.bus.emit('display?drawIntegerscaleyx', 0x56, 80 - 6, 90, 4);
	this.bus.emit('display?drawIntegerval272digitsv', 0x66, 0xF2, 1, BreakoutGame_drawCountDown_c_var);
	
	} else {
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_bgcolor_var[2]
	, 0xCF, 0x55, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x6F, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?fillRectyxwidthval271height', 80 - 6, 12, 20, 0xF6, 0x4B, 90);
	this.bus.emit('display?fillRect_', 0xAA);
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
	, 0x44, 0x3C, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x60, this.BreakoutGame_fgcolor_var[0]
	);
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	this.bus.emit('display?fillRect_', 0x72);
	this.bus.emit('display?fillRectyxwidthval271height', left_var - 1, xcenter_var + 1, 1, 0x5C, 0x73, top_var - 1);
	this.bus.emit('display?fillRect_', 0xC0);
	this.bus.emit('display?fillRectyxwidthval271height', left_var - 1, xcenter_var + 1, 1, 0xE9, 0xD1, bottom_var);
	this.bus.emit('display?fillRect_', 0x27);
	this.bus.emit('display?fillRectyxwidthval271height', left_var - 1, 1, ycenter_var, 0x06, 0xA5, top_var);
	this.bus.emit('display?fillRectyxwidthval271height', right_var, 1, ycenter_var, 0xB7, 0xFE, top_var);
	this.bus.emit('display?fillRect_', 0x4A);
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
	this.bus.emit('display?setColorbval268g', 89, 0xCE, 0x61, 103);
	this.bus.emit('display?setColorr', 0x14, 155);
	this.bus.emit('display?fillRect_', 0xA6);
	this.bus.emit('display?fillRectyxwidthval271height', bx_var, w_var, h_var, 0x92, 0x7B, by_var);
	this.bus.emit('display?setColorr', 0xF5, 100);
	this.bus.emit('display?setColorbval268g', 43, 0x21, 0xEC, 56);
	this.bus.emit('display?drawRectwidthheightval270xy', 0xE6, bx_var, w_var, 0xB8, by_var, h_var);
	this.bus.emit('display?drawRect_', 0x39);
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_bgcolor_var[2]
	, 0x25, 0x9F, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x03, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?fillRectyxwidthval271height', bx_var, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x5A, 0x7B, by_var);
	this.bus.emit('display?fillRect_', 0xA3);
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
	this.bus.emit('display?setColorr', 0x09, 158);
	this.bus.emit('display?setColorbval268g', 130, 0x6E, 0x36, 209);
	this.bus.emit('display?setBGColorval269b', 0x54, this.BreakoutGame_fgcolor_var[2]
	, 0xC9);
	this.bus.emit('display?setBGColorrg', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x88);
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_bgcolor_var[2]
	, 0x72, 0x05, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0x21, this.BreakoutGame_bgcolor_var[0]
	);
	this.bus.emit('display?drawIntegerval272digitsv', 0x1C, 0x49, 2, this.BreakoutGame_level_var);
	this.bus.emit('display?drawIntegerscaleyx', 0xBC, 6, 2, 2);
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
	this.bus.emit('display?setColorbval268g', 130, 0x36, 0x98, 209);
	this.bus.emit('display?setColorr', 0xB7, 158);
	this.bus.emit('display?setBGColorval269b', 0x4D, this.BreakoutGame_fgcolor_var[2]
	, 0x8F);
	this.bus.emit('display?setBGColorrg', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x76);
	this.bus.emit('display?drawIntegerval272digitsv', 0x1E, 0xD7, 5, this.BreakoutGame_score_var);
	this.bus.emit('display?drawIntegerscaleyx', 0xCF, 58, 2, 2);
}

BreakoutGameBrowser.prototype.drawLives = function() {
	this.bus.emit('display?setColorbval268g', this.BreakoutGame_fgcolor_var[2]
	, 0x66, 0x1D, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorr', 0xFB, this.BreakoutGame_fgcolor_var[0]
	);
	this.bus.emit('display?fillRectyxwidthval271height', 124, 24 + 6, 6, 0xB0, 0xD0, 4);
	this.bus.emit('display?fillRect_', 0x3D);
	this.bus.emit('display?setColorbval268g', 111, 0x36, 0xD2, 199);
	this.bus.emit('display?setColorr', 0x16, 183);
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	this.bus.emit('display?fillRectyxwidthval271height', 124 + (2 - i_var) * 12, 6, 6, 0xC7, 0x8F, 4);
	this.bus.emit('display?fillRect_', 0xAF);
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(id, val289, val266) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, val289:val289, val266:val266});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(val302) {
	this._receive({_port:"display", _msg:"displayReady_", val302:val302});
}

BreakoutGameBrowser.prototype.receivedisplayReadyval277Ondisplay = function(val277, val303) {
	this._receive({_port:"display", _msg:"displayReadyval277", val277:val277, val303:val303});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(val306) {
	this._receive({_port:"display", _msg:"displayError_", val306:val306});
}

BreakoutGameBrowser.prototype.receivedisplayErrorval278Ondisplay = function(val307, val278) {
	this._receive({_port:"display", _msg:"displayErrorval278", val307:val307, val278:val278});
}

BreakoutGameBrowser.prototype.receivepositionyOncontroller = function(val316, y) {
	this._receive({_port:"controller", _msg:"positiony", val316:val316, y:y});
}

BreakoutGameBrowser.prototype.receivepositionxval280Oncontroller = function(x, val317, val280) {
	this._receive({_port:"controller", _msg:"positionxval280", x:x, val317:val317, val280:val280});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(val326) {
	this._receive({_port:"game", _msg:"lostBall_", val326:val326});
}

BreakoutGameBrowser.prototype.receivelostBallval284Ongame = function(val284, val327) {
	this._receive({_port:"game", _msg:"lostBallval284", val284:val284, val327:val327});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(val324) {
	this._receive({_port:"game", _msg:"nextLevel_", val324:val324});
}

BreakoutGameBrowser.prototype.receivenextLevelval285Ongame = function(val325, val285) {
	this._receive({_port:"game", _msg:"nextLevelval285", val325:val325, val285:val285});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(val326) {
	this._receive({_port:"pro_game", _msg:"lostBall_", val326:val326});
}

BreakoutGameBrowser.prototype.receivelostBallval284Onpro_game = function(val284, val327) {
	this._receive({_port:"pro_game", _msg:"lostBallval284", val284:val284, val327:val327});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(val324) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", val324:val324});
}

BreakoutGameBrowser.prototype.receivenextLevelval285Onpro_game = function(val325, val285) {
	this._receive({_port:"pro_game", _msg:"nextLevelval285", val325:val325, val285:val285});
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_val285_var = function(BreakoutGame_SC_PLAY_game_nextLevel_val285_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_val285_var = BreakoutGame_SC_PLAY_game_nextLevel_val285_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_val284_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_val284_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_val284_var = BreakoutGame_SC_PLAY_pro_game_lostBall_val284_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_val284_var = function(BreakoutGame_SC_PLAY_game_lostBall_val284_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_val284_var = BreakoutGame_SC_PLAY_game_lostBall_val284_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_val280_var = function(BreakoutGame_SC_controller_position_val280_var) {
	this.BreakoutGame_SC_controller_position_val280_var = BreakoutGame_SC_controller_position_val280_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_val277_var = function(BreakoutGame_SC_INIT_display_displayReady_val277_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_val277_var = BreakoutGame_SC_INIT_display_displayReady_val277_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionxval280_var = function(BreakoutGame_SC_received_controller_positionxval280_var) {
	this.BreakoutGame_SC_received_controller_positionxval280_var = BreakoutGame_SC_received_controller_positionxval280_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positiony_var = function(BreakoutGame_SC_received_controller_positiony_var) {
	this.BreakoutGame_SC_received_controller_positiony_var = BreakoutGame_SC_received_controller_positiony_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallval284_var = function(BreakoutGame_SC_PLAY_received_game_lostBallval284_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallval284_var = BreakoutGame_SC_PLAY_received_game_lostBallval284_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val285_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_val285_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val285_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_val285_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyval277_var = function(BreakoutGame_SC_INIT_received_display_displayReadyval277_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var = BreakoutGame_SC_INIT_received_display_displayReadyval277_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelval285_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelval285_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelval285_var = BreakoutGame_SC_PLAY_received_game_nextLevelval285_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tgame_nextLevel_val285 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_val285_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tpro_game_lostBall_val284 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_val284_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tgame_lostBall_val284 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_val284_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tcontroller_position_val280 = ' + this.BreakoutGame_SC_controller_position_val280_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tdisplay_displayReady_val277 = ' + this.BreakoutGame_SC_INIT_display_displayReady_val277_var;
	result += '\n\treceived_pro_game_nextLevelval285 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\treceived_controller_positionxval280 = ' + this.BreakoutGame_SC_received_controller_positionxval280_var;
	result += '\n\treceived_controller_positiony = ' + this.BreakoutGame_SC_received_controller_positiony_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\treceived_game_lostBallval284 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallval284_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tpro_game_nextLevel_val285 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val285_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\treceived_display_displayReadyval277 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyval277_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\treceived_pro_game_lostBallval284 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\treceived_game_nextLevelval285 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelval285_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '';
	return result;
}

