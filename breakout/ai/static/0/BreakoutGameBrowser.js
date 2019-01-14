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
		this.bus.emit('display?create_', 0xD4);
		this.bus.emit('display?createxsizeysizeval10', this.BreakoutGame_XDISPSIZE_var, 0x30, 0x78, this.BreakoutGame_YDISPSIZE_var);
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xCE, 33, 0x7C), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		this.bus.emit('display?updateval12', 0x2D, 0x0D);
		this.bus.emit('display?update_', 0x63);
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xAB, period_const, 0xF9), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x0D, 500, 0x1C), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		this.bus.emit('display?update_', 0x12);
		this.bus.emit('display?updateval12', 0xA7, 0x9B);
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xF8, 1000, 0x3A), 0);
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
		this.bus.emit('display?updateval12', 0x1E, 0xAE);
		this.bus.emit('display?update_', 0xA9);
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		this.bus.emit('display?update_', 0x95);
		this.bus.emit('display?updateval12', 0xFD, 0xE2);
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x5E, 500, 0xA7), 0);
	});
	let BreakoutGame_SC_GAMEREALLYOVER = new StateJS.State('GAMEREALLYOVER', this._statemachine).entry(() => {
		this.bus.emit('display?setColorg', 0x30, 255);
		this.bus.emit('display?setColorbrval4', 255, 0x96, 0xF2, 255);
		this.bus.emit('display?fillRectheightxval7', 76, 0x8D, 0xFB, 8);
		this.bus.emit('display?fillRectywidth', 30, 0xAF, 142);
		this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
		, 0xF6, 0xA8, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setColorg', 0x39, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?fillRectheightxval7', 50, 0x50, 0x34, 9);
		this.bus.emit('display?fillRectywidth', 31, 0x71, 140);
		this.bus.emit('display?setBGColorval5rg', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x43, 0x00);
		this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
		, 0xB5);
		this.bus.emit('display?setColorbrval4', 158, 0x5F, 0x1B, 130);
		this.bus.emit('display?setColorg', 0x07, 209);
		this.bus.emit('display?drawIntegerx', 0xFB, 23);
		this.bus.emit('display?drawIntegervdigitsscaleval8y', 0xA8, this.BreakoutGame_score_var, 6, 0x5C, 5, 40);
		this.bus.emit('display?drawThingMLxy', 0x99, 26, 87);
		this.bus.emit('display?drawThingMLval9', 0x76, 0x50);
		this.bus.emit('display?updateval12', 0xE0, 0x87);
		this.bus.emit('display?update_', 0xD0);
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	this._statemachine.to(null).when((positionval16) => {
		return positionval16._port === 'controller' && positionval16._msg === 'positionval16';
	}).effect((positionval16) => {
		this.BreakoutGame_SC_received_controller_positionval16_var = true;
		this.BreakoutGame_SC_controller_position_val16_var = positionval16.val16;
		if(this.BreakoutGame_SC_received_controller_positionyx_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionval16_var = false;
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionyx) => {
		return positionyx._port === 'controller' && positionyx._msg === 'positionyx';
	}).effect((positionyx) => {
		this.BreakoutGame_SC_received_controller_positionyx_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positionyx.y;
		this.BreakoutGame_SC_controller_position_x_var = positionyx.x;
		if(this.BreakoutGame_SC_received_controller_positionval16_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		this.BreakoutGame_SC_received_controller_positionval16_var = false;
		
		}
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval20) => {
		return lostBallval20._port === 'pro_game' && lostBallval20._msg === 'lostBallval20' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallval20) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xAE, 0x45), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval20) => {
		return lostBallval20._port === 'pro_game' && lostBallval20._msg === 'lostBallval20' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallval20) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval21) => {
		return nextLevelval21._port === 'pro_game' && nextLevelval21._msg === 'nextLevelval21' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelval21) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x7C, 0x97), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval21) => {
		return nextLevelval21._port === 'pro_game' && nextLevelval21._msg === 'nextLevelval21' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelval21) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x59, 0x97), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x83, 0x45), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var > 0);
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_GAMEOVER).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var === 0);
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
		this.bus.emit('sound?tone_', 0x27);
		this.bus.emit('sound?tonetimeval22freq', 0x13, 0x21, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		this.bus.emit('sound?tone_', 0x7D);
		this.bus.emit('sound?tonetimeval22freq', 0x9B, 0x3E, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		this.bus.emit('sound?tonetimeval22freq', 0xFD, 0x34, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		this.bus.emit('sound?tone_', 0x2D);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0xFA), 0);
		setTimeout(() => this.bus.emit('game?lostBallval20', 0x64, 0x07), 0);
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x27), 0);
		setTimeout(() => this.bus.emit('req_game?lostBallval20', 0xD8, 0xB5), 0);
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		this.bus.emit('sound?tone_', 0xEE);
		this.bus.emit('sound?tonetimeval22freq', 0x47, 0x37, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
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
		this.bus.emit('sound?tone_', 0x75);
		this.bus.emit('sound?tonetimeval22freq', 0x1D, 0x68, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone1_var);
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xDB), 0);
		setTimeout(() => this.bus.emit('game?nextLevelval21', 0xB0, 0x6E), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0x18), 0);
		setTimeout(() => this.bus.emit('req_game?nextLevelval21', 0x59, 0xF3), 0);
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		const padx_const = this.BreakoutGame_padx_var;
		const bx_const = this.BreakoutGame_bx_var;
		const by_const = this.BreakoutGame_by_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadyballxpadxval17', 0x3B, padx_const, bx_const, by_const, pady_const, 0x34), 0);
		setTimeout(() => this.bus.emit('ia?updateIA_', 0x3A), 0);
		this.bus.emit('display?update_', 0x65);
		this.bus.emit('display?updateval12', 0x85, 0x2A);
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x56, period_const, 0xE3), 0);
	});
	BreakoutGame_SC_NEXTLEVEL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		this.bus.emit('display?update_', 0x08);
		this.bus.emit('display?updateval12', 0x20, 0x6A);
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x19, 33, 0x7C), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		this.bus.emit('display?updateval12', 0x8A, 0x43);
		this.bus.emit('display?update_', 0xAE);
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyval13) => {
		return displayReadyval13._port === 'display' && displayReadyval13._msg === 'displayReadyval13' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyval13) => {
		this.bus.emit('display?clear_', 0x44);
		this.bus.emit('display?clearval3', 0x2F, 0x94);
		this.initColors();
		this.bus.emit('display?setColorg', 0x3A, this.BreakoutGame_bgcolor_var[1]
		);
		this.bus.emit('display?setColorbrval4', this.BreakoutGame_bgcolor_var[0]
		, 0x00, 0x85, this.BreakoutGame_bgcolor_var[2]
		);
		this.bus.emit('display?fillRectywidth', 0, 0x4D, this.BreakoutGame_XDISPSIZE_var);
		this.bus.emit('display?fillRectheightxval7', this.BreakoutGame_YDISPSIZE_var, 0x68, 0x02, 0);
		this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
		, 0xAE, 0x5F, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setColorg', 0x55, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?fillRectheightxval7', 14, 0xDB, 0x29, 0);
		this.bus.emit('display?fillRectywidth', 0, 0x23, this.BreakoutGame_XDISPSIZE_var);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyval13_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyval13) => {
		return displayReadyval13._port === 'display' && displayReadyval13._msg === 'displayReadyval13' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyval13) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyval13_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyval13_var);
	}).effect((displayReady_) => {
		this.bus.emit('display?clearval3', 0x2F, 0x9A);
		this.bus.emit('display?clear_', 0x73);
		this.initColors();
		this.bus.emit('display?setColorg', 0xA3, this.BreakoutGame_bgcolor_var[1]
		);
		this.bus.emit('display?setColorbrval4', this.BreakoutGame_bgcolor_var[0]
		, 0x00, 0x7C, this.BreakoutGame_bgcolor_var[2]
		);
		this.bus.emit('display?fillRectywidth', 0, 0x4D, this.BreakoutGame_XDISPSIZE_var);
		this.bus.emit('display?fillRectheightxval7', this.BreakoutGame_YDISPSIZE_var, 0x75, 0x02, 0);
		this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
		, 0xAE, 0x10, this.BreakoutGame_fgcolor_var[2]
		);
		this.bus.emit('display?setColorg', 0xCC, this.BreakoutGame_fgcolor_var[1]
		);
		this.bus.emit('display?fillRectywidth', 0, 0xF0, this.BreakoutGame_XDISPSIZE_var);
		this.bus.emit('display?fillRectheightxval7', 14, 0x55, 0x29, 0);
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyval13_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyval13_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallval20) => {
		return lostBallval20._port === 'game' && lostBallval20._msg === 'lostBallval20' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallval20) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xD5, 0x63), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallval20_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallval20) => {
		return lostBallval20._port === 'game' && lostBallval20._msg === 'lostBallval20' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallval20) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallval20_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelval21) => {
		return nextLevelval21._port === 'game' && nextLevelval21._msg === 'nextLevelval21' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelval21) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x63, 0x09), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval21_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelval21) => {
		return nextLevelval21._port === 'game' && nextLevelval21._msg === 'nextLevelval21' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelval21) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelval21_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xCF, 0x09), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelval21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelval21_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallval20_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x98, 0x63), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallval20_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallval20_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
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
	this.bus.emit('display?setBGColorb', this.BreakoutGame_bgcolor_var[2]
	, 0xB6);
	this.bus.emit('display?setBGColorval5rg', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x28, 0x4A);
	this.bus.emit('display?setColorg', 0x1C, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
	, 0x4B, 0xCC, this.BreakoutGame_fgcolor_var[2]
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
	this.bus.emit('display?setColorg', 0xC3, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_bgcolor_var[0]
	, 0x5E, 0x86, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectywidth', this.BreakoutGame_prevBY_var, 0x07, bs_var);
	this.bus.emit('display?fillRectheightxval7', bs_var, 0x6A, 0x81, this.BreakoutGame_prevBX_var);
	
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
	this.bus.emit('display?setColorg', 0x51, 199);
	this.bus.emit('display?setColorbrval4', 183, 0xDD, 0xDC, 111);
	this.bus.emit('display?fillRectheightxval7', bs_var, 0xAA, 0x1D, this.BreakoutGame_prevBX_var);
	this.bus.emit('display?fillRectywidth', this.BreakoutGame_prevBY_var, 0xF0, bs_var);
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_bgcolor_var[0]
	, 0x8A, 0x6D, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setColorg', 0x78, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?fillRectywidth', this.BreakoutGame_prevPY_var, 0x66, ps_var);
	this.bus.emit('display?fillRectheightxval7', 4, 0x10, 0xC5, this.BreakoutGame_prevPX_var);
	
	}
}

BreakoutGameBrowser.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	this.bus.emit('display?setColorg', 0xBE, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
	, 0x95, 0x8C, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?fillRectheightxval7', 4, 0x5D, 0xA8, this.BreakoutGame_prevPX_var);
	this.bus.emit('display?fillRectywidth', this.BreakoutGame_prevPY_var, 0x13, ps_var);
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
	, 0x0A, 0xC3, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorg', 0xA6, this.BreakoutGame_fgcolor_var[1]
	);
	if(BreakoutGame_drawCountDown_c_var > 0) {
	this.bus.emit('display?setColorg', 0x52, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
	, 0x28, 0xDB, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setBGColorval5rg', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xC2, 0x83);
	this.bus.emit('display?setBGColorb', this.BreakoutGame_bgcolor_var[2]
	, 0xC9);
	this.bus.emit('display?drawIntegervdigitsscaleval8y', 0x7A, BreakoutGame_drawCountDown_c_var, 4, 0x60, 1, 90);
	this.bus.emit('display?drawIntegerx', 0x02, 80 - 6);
	
	} else {
	this.bus.emit('display?setColorg', 0x21, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_bgcolor_var[0]
	, 0x9F, 0x0A, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?fillRectheightxval7', 20, 0x08, 0x23, 80 - 6);
	this.bus.emit('display?fillRectywidth', 90, 0x73, 12);
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
	, 0xE1, 0x71, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorg', 0x44, this.BreakoutGame_fgcolor_var[1]
	);
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	this.bus.emit('display?fillRectywidth', top_var - 1, 0xB1, xcenter_var + 1);
	this.bus.emit('display?fillRectheightxval7', 1, 0xF2, 0xB1, left_var - 1);
	this.bus.emit('display?fillRectywidth', bottom_var, 0xB8, xcenter_var + 1);
	this.bus.emit('display?fillRectheightxval7', 1, 0x5F, 0x73, left_var - 1);
	this.bus.emit('display?fillRectheightxval7', ycenter_var, 0xC7, 0xCE, left_var - 1);
	this.bus.emit('display?fillRectywidth', top_var, 0x07, 1);
	this.bus.emit('display?fillRectywidth', top_var, 0x49, 1);
	this.bus.emit('display?fillRectheightxval7', ycenter_var, 0xC5, 0x01, right_var);
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
	this.bus.emit('display?setColorbrval4', 155, 0x01, 0xC8, 89);
	this.bus.emit('display?setColorg', 0x8E, 103);
	this.bus.emit('display?fillRectywidth', by_var, 0xF7, w_var);
	this.bus.emit('display?fillRectheightxval7', h_var, 0xF7, 0xDA, bx_var);
	this.bus.emit('display?setColorg', 0xFF, 56);
	this.bus.emit('display?setColorbrval4', 100, 0x85, 0xC7, 43);
	this.bus.emit('display?drawRectheight', h_var, 0x3D);
	this.bus.emit('display?drawRectyval6xwidth', bx_var, by_var, 0x05, w_var, 0x51);
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_bgcolor_var[0]
	, 0xBE, 0x71, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setColorg', 0xBF, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?fillRectywidth', by_var, 0x21, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
	this.bus.emit('display?fillRectheightxval7', this.BreakoutGame_BRICK_HEIGHT_var - 2, 0xA8, 0xB4, bx_var);
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
	this.bus.emit('display?setColorg', 0x3C, 209);
	this.bus.emit('display?setColorbrval4', 158, 0x24, 0xA6, 130);
	this.bus.emit('display?setBGColorval5rg', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x46, 0xA7);
	this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x2B);
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_bgcolor_var[0]
	, 0x7B, 0x92, this.BreakoutGame_bgcolor_var[2]
	);
	this.bus.emit('display?setColorg', 0xE6, this.BreakoutGame_bgcolor_var[1]
	);
	this.bus.emit('display?drawIntegerx', 0x8E, 6);
	this.bus.emit('display?drawIntegervdigitsscaleval8y', 0x09, this.BreakoutGame_level_var, 2, 0x13, 2, 2);
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
	this.bus.emit('display?setColorbrval4', 158, 0x8B, 0x40, 130);
	this.bus.emit('display?setColorg', 0x60, 209);
	this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
	, 0xEB);
	this.bus.emit('display?setBGColorval5rg', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x9C, 0x64);
	this.bus.emit('display?drawIntegervdigitsscaleval8y', 0xB9, this.BreakoutGame_score_var, 2, 0x93, 5, 2);
	this.bus.emit('display?drawIntegerx', 0x6A, 58);
}

BreakoutGameBrowser.prototype.drawLives = function() {
	this.bus.emit('display?setColorbrval4', this.BreakoutGame_fgcolor_var[0]
	, 0xF4, 0xC6, this.BreakoutGame_fgcolor_var[2]
	);
	this.bus.emit('display?setColorg', 0x0B, this.BreakoutGame_fgcolor_var[1]
	);
	this.bus.emit('display?fillRectywidth', 4, 0x3E, 24 + 6);
	this.bus.emit('display?fillRectheightxval7', 6, 0xB6, 0x34, 124);
	this.bus.emit('display?setColorbrval4', 183, 0x46, 0x2C, 111);
	this.bus.emit('display?setColorg', 0x91, 199);
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	this.bus.emit('display?fillRectywidth', 4, 0x71, 6);
	this.bus.emit('display?fillRectheightxval7', 6, 0x74, 0x9F, 124 + (2 - i_var) * 12);
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(val24, val2, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", val24:val24, val2:val2, id:id});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(val38) {
	this._receive({_port:"display", _msg:"displayReady_", val38:val38});
}

BreakoutGameBrowser.prototype.receivedisplayReadyval13Ondisplay = function(val39, val13) {
	this._receive({_port:"display", _msg:"displayReadyval13", val39:val39, val13:val13});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(val26) {
	this._receive({_port:"display", _msg:"displayError_", val26:val26});
}

BreakoutGameBrowser.prototype.receivedisplayErrorval14Ondisplay = function(val14, val27) {
	this._receive({_port:"display", _msg:"displayErrorval14", val14:val14, val27:val27});
}

BreakoutGameBrowser.prototype.receivepositionval16Oncontroller = function(val16, val50) {
	this._receive({_port:"controller", _msg:"positionval16", val16:val16, val50:val50});
}

BreakoutGameBrowser.prototype.receivepositionyxOncontroller = function(y, x, val51) {
	this._receive({_port:"controller", _msg:"positionyx", y:y, x:x, val51:val51});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(val62) {
	this._receive({_port:"game", _msg:"lostBall_", val62:val62});
}

BreakoutGameBrowser.prototype.receivelostBallval20Ongame = function(val20, val63) {
	this._receive({_port:"game", _msg:"lostBallval20", val20:val20, val63:val63});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(val60) {
	this._receive({_port:"game", _msg:"nextLevel_", val60:val60});
}

BreakoutGameBrowser.prototype.receivenextLevelval21Ongame = function(val61, val21) {
	this._receive({_port:"game", _msg:"nextLevelval21", val61:val61, val21:val21});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(val62) {
	this._receive({_port:"pro_game", _msg:"lostBall_", val62:val62});
}

BreakoutGameBrowser.prototype.receivelostBallval20Onpro_game = function(val20, val63) {
	this._receive({_port:"pro_game", _msg:"lostBallval20", val20:val20, val63:val63});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(val60) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", val60:val60});
}

BreakoutGameBrowser.prototype.receivenextLevelval21Onpro_game = function(val61, val21) {
	this._receive({_port:"pro_game", _msg:"nextLevelval21", val61:val61, val21:val21});
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_val16_var = function(BreakoutGame_SC_controller_position_val16_var) {
	this.BreakoutGame_SC_controller_position_val16_var = BreakoutGame_SC_controller_position_val16_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_val13_var = function(BreakoutGame_SC_INIT_display_displayReady_val13_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_val13_var = BreakoutGame_SC_INIT_display_displayReady_val13_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyval13_var = function(BreakoutGame_SC_INIT_received_display_displayReadyval13_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyval13_var = BreakoutGame_SC_INIT_received_display_displayReadyval13_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionval16_var = function(BreakoutGame_SC_received_controller_positionval16_var) {
	this.BreakoutGame_SC_received_controller_positionval16_var = BreakoutGame_SC_received_controller_positionval16_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_val20_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_val20_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_val20_var = BreakoutGame_SC_PLAY_pro_game_lostBall_val20_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionyx_var = function(BreakoutGame_SC_received_controller_positionyx_var) {
	this.BreakoutGame_SC_received_controller_positionyx_var = BreakoutGame_SC_received_controller_positionyx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val21_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_val21_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val21_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_val21_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_val20_var = function(BreakoutGame_SC_PLAY_game_lostBall_val20_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_val20_var = BreakoutGame_SC_PLAY_game_lostBall_val20_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelval21_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelval21_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelval21_var = BreakoutGame_SC_PLAY_received_game_nextLevelval21_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_val21_var = function(BreakoutGame_SC_PLAY_game_nextLevel_val21_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_val21_var = BreakoutGame_SC_PLAY_game_nextLevel_val21_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallval20_var = function(BreakoutGame_SC_PLAY_received_game_lostBallval20_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallval20_var = BreakoutGame_SC_PLAY_received_game_lostBallval20_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tcontroller_position_val16 = ' + this.BreakoutGame_SC_controller_position_val16_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tdisplay_displayReady_val13 = ' + this.BreakoutGame_SC_INIT_display_displayReady_val13_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\treceived_display_displayReadyval13 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyval13_var;
	result += '\n\treceived_controller_positionval16 = ' + this.BreakoutGame_SC_received_controller_positionval16_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tpro_game_lostBall_val20 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_val20_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\treceived_controller_positionyx = ' + this.BreakoutGame_SC_received_controller_positionyx_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\treceived_pro_game_nextLevelval21 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\treceived_pro_game_lostBallval20 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tpro_game_nextLevel_val21 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_val21_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tgame_lostBall_val20 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_val20_var;
	result += '\n\treceived_game_nextLevelval21 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelval21_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tgame_nextLevel_val21 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_val21_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\treceived_game_lostBallval20 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallval20_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '';
	return result;
}

