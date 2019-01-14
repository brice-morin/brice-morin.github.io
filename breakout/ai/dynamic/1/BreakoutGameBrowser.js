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
		if(179 < 65) {
		this.bus.emit('display?createxsizeysizevar116', this.BreakoutGame_XDISPSIZE_var, 0x58, this.BreakoutGame_YDISPSIZE_var, 0x3B);
		
		} else {
		this.bus.emit('display?createxsizeysizevar116_bis', this.BreakoutGame_YDISPSIZE_var, 0x58, this.BreakoutGame_XDISPSIZE_var, 0xC5);
		
		}
		if(21 < 77) {
		this.bus.emit('display?create_', 0xF8);
		
		} else {
		this.bus.emit('display?create__bis', 0x0F);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0xD5, 0xF1, 0), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(62 < 151) {
		this.bus.emit('display?update_', 0x10);
		
		} else {
		this.bus.emit('display?update__bis', 0x66);
		
		}
		if(104 < 233) {
		this.bus.emit('display?updatevar118', 0xD0, 0x35);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0xC6, 0x35);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0xA2, 0xB4, 0), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 500, 0x27, 0x66, 0), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(164 < 229) {
		this.bus.emit('display?update_', 0xE6);
		
		} else {
		this.bus.emit('display?update__bis', 0xAB);
		
		}
		if(89 < 188) {
		this.bus.emit('display?updatevar118', 0xDD, 0xCA);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x23, 0xCA);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 1000, 0x07, 0x3D, 0), 0);
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
		if(192 < 59) {
		this.bus.emit('display?updatevar118', 0x8C, 0x99);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x64, 0x99);
		
		}
		if(102 < 4) {
		this.bus.emit('display?update_', 0xF4);
		
		} else {
		this.bus.emit('display?update__bis', 0x4B);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(194 < 234) {
		this.bus.emit('display?update_', 0x6C);
		
		} else {
		this.bus.emit('display?update__bis', 0xCA);
		
		}
		if(212 < 16) {
		this.bus.emit('display?updatevar118', 0xC2, 0xC8);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x70, 0xC8);
		
		}
		setTimeout(() => this.bus.emit('clock?timer_start', 500, 0x1B, 0xB0, 0), 0);
	});
	let BreakoutGame_SC_GAMEREALLYOVER = new StateJS.State('GAMEREALLYOVER', this._statemachine).entry(() => {
		if(113 < 96) {
		this.bus.emit('display?setColorgr', 255, 0xD1, 255);
		
		} else {
		this.bus.emit('display?setColorgr_bis', 255, 0x5C, 255);
		
		}
		if(199 < 44) {
		this.bus.emit('display?setColorbvar110', 255, 0xDC, 0xA6);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', 255, 0x49, 0xA6);
		
		}
		if(150 < 45) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0x4A, 76, 8, 30, 0x8E, 142);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 8, 0xAD, 76, 0x8E, 30, 142);
		
		}
		if(148 < 94) {
		this.bus.emit('display?fillRect_', 0x57);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xA5);
		
		}
		if(156 < 35) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
		, 0x0C, 0x60);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x7B, 0x60);
		
		}
		if(208 < 202) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
		, 0xBF, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x2E, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(106 < 38) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0x04, 50, 9, 31, 0x03, 140);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 9, 0xA2, 50, 0x03, 31, 140);
		
		}
		if(239 < 214) {
		this.bus.emit('display?fillRect_', 0xF0);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xA8);
		
		}
		if(124 < 236) {
		this.bus.emit('display?setBGColorg', 0xDE, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setBGColorg_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x68);
		
		}
		if(64 < 42) {
		this.bus.emit('display?setBGColorrvar111b', 0xD6, this.BreakoutGame_fgcolor_var[0]
		, 0x19, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setBGColorrvar111b_bis', 0xC4, 0xD6, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(74 < 212) {
		this.bus.emit('display?setColorbvar110', 130, 0xEB, 0x4C);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', 130, 0x53, 0x4C);
		
		}
		if(2 < 50) {
		this.bus.emit('display?setColorgr', 209, 0x70, 158);
		
		} else {
		this.bus.emit('display?setColorgr_bis', 209, 0x98, 158);
		
		}
		if(53 < 178) {
		this.bus.emit('display?drawIntegerdigitsv', 5, this.BreakoutGame_score_var, 0x14);
		
		} else {
		this.bus.emit('display?drawIntegerdigitsv_bis', 5, 0x56, this.BreakoutGame_score_var);
		
		}
		if(246 < 145) {
		this.bus.emit('display?drawIntegervar114xscaley', 6, 23, 40, 0x6B, 0x64);
		
		} else {
		this.bus.emit('display?drawIntegervar114xscaley_bis', 0x5A, 23, 40, 0x6B, 6);
		
		}
		if(74 < 203) {
		this.bus.emit('display?drawThingMLvar115x', 0xAF, 26, 0xE4);
		
		} else {
		this.bus.emit('display?drawThingMLvar115x_bis', 0xAF, 0xCF, 26);
		
		}
		if(125 < 241) {
		this.bus.emit('display?drawThingMLy', 0xE5, 87);
		
		} else {
		this.bus.emit('display?drawThingMLy_bis', 87, 0xAE);
		
		}
		if(117 < 249) {
		this.bus.emit('display?updatevar118', 0x22, 0xFD);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x29, 0xFD);
		
		}
		if(203 < 125) {
		this.bus.emit('display?update_', 0x86);
		
		} else {
		this.bus.emit('display?update__bis', 0x1A);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	this._statemachine.to(null).when((positionyx_bis) => {
		return positionyx_bis._port === 'controller' && positionyx_bis._msg === 'positionyx_bis';
	}).effect((positionyx_bis) => {
		this.BreakoutGame_SC_received_controller_positionyx_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positionyx_bis.y;
		this.BreakoutGame_SC_controller_position_x_var = positionyx_bis.x;
		if(this.BreakoutGame_SC_received_controller_positionvar122_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		this.BreakoutGame_SC_received_controller_positionvar122_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar122) => {
		return positionvar122._port === 'controller' && positionvar122._msg === 'positionvar122';
	}).effect((positionvar122) => {
		this.BreakoutGame_SC_received_controller_positionvar122_var = true;
		this.BreakoutGame_SC_controller_position_var122_var = positionvar122.var122;
		if(this.BreakoutGame_SC_received_controller_positionyx_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar122_var = false;
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar122_bis) => {
		return positionvar122_bis._port === 'controller' && positionvar122_bis._msg === 'positionvar122_bis';
	}).effect((positionvar122_bis) => {
		this.BreakoutGame_SC_received_controller_positionvar122_var = true;
		this.BreakoutGame_SC_controller_position_var122_var = positionvar122_bis.var122;
		if(this.BreakoutGame_SC_received_controller_positionyx_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar122_var = false;
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionyx) => {
		return positionyx._port === 'controller' && positionyx._msg === 'positionyx';
	}).effect((positionyx) => {
		this.BreakoutGame_SC_received_controller_positionyx_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positionyx.y;
		this.BreakoutGame_SC_controller_position_x_var = positionyx.x;
		if(this.BreakoutGame_SC_received_controller_positionvar122_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		this.BreakoutGame_SC_received_controller_positionvar122_var = false;
		
		}
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar126_bis) => {
		return lostBallvar126_bis._port === 'pro_game' && lostBallvar126_bis._msg === 'lostBallvar126_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar126_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x5E, 0xBB), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar126_bis) => {
		return lostBallvar126_bis._port === 'pro_game' && lostBallvar126_bis._msg === 'lostBallvar126_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar126_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar127_bis) => {
		return nextLevelvar127_bis._port === 'pro_game' && nextLevelvar127_bis._msg === 'nextLevelvar127_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar127_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xE6, 0xE4), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar127_bis) => {
		return nextLevelvar127_bis._port === 'pro_game' && nextLevelvar127_bis._msg === 'nextLevelvar127_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar127_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xA9, 0xBB), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar126) => {
		return lostBallvar126._port === 'pro_game' && lostBallvar126._msg === 'lostBallvar126' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar126) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xB2, 0xBB), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar126) => {
		return lostBallvar126._port === 'pro_game' && lostBallvar126._msg === 'lostBallvar126' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar126) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar127) => {
		return nextLevelvar127._port === 'pro_game' && nextLevelvar127._msg === 'nextLevelvar127' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar127) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x7E, 0xE4), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar127) => {
		return nextLevelvar127._port === 'pro_game' && nextLevelvar127._msg === 'nextLevelvar127' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar127) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x31, 0xE4), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x71, 0xE4), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x1E, 0xBB), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var);
	}).effect((displayReady_) => {
		if(134 < 139) {
		this.bus.emit('display?clearvar109', 0xD7, 0x0E);
		
		} else {
		this.bus.emit('display?clearvar109_bis', 0x1C, 0x0E);
		
		}
		if(27 < 181) {
		this.bus.emit('display?clear_', 0xFF);
		
		} else {
		this.bus.emit('display?clear__bis', 0x29);
		
		}
		this.initColors();
		if(108 < 218) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
		, 0x85, 0x26);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
		, 0xD1, 0x26);
		
		}
		if(221 < 176) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
		, 0x1F, this.BreakoutGame_bgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x7E, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(161 < 182) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0x00, this.BreakoutGame_YDISPSIZE_var, 0, 0, 0xEE, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 0, 0xED, this.BreakoutGame_YDISPSIZE_var, 0xEE, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(172 < 89) {
		this.bus.emit('display?fillRect_', 0xF3);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x68);
		
		}
		if(29 < 239) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
		, 0xB4, 0xF3);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x84, 0xF3);
		
		}
		if(74 < 236) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
		, 0x08, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
		, 0xA0, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(32 < 54) {
		this.bus.emit('display?fillRect_', 0x62);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xDE);
		
		}
		if(199 < 213) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0xAD, 14, 0, 0, 0x82, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 0, 0x4E, 14, 0x82, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var);
	}).effect((displayReady__bis) => {
		if(134 < 139) {
		this.bus.emit('display?clearvar109', 0x57, 0x0E);
		
		} else {
		this.bus.emit('display?clearvar109_bis', 0xD6, 0x0E);
		
		}
		if(27 < 181) {
		this.bus.emit('display?clear_', 0xE0);
		
		} else {
		this.bus.emit('display?clear__bis', 0xC3);
		
		}
		this.initColors();
		if(108 < 218) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
		, 0xB5, 0x26);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
		, 0x7C, 0x26);
		
		}
		if(221 < 176) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
		, 0x89, this.BreakoutGame_bgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
		, 0xDC, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(161 < 182) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0x9D, this.BreakoutGame_YDISPSIZE_var, 0, 0, 0xEE, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 0, 0x09, this.BreakoutGame_YDISPSIZE_var, 0xEE, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(172 < 89) {
		this.bus.emit('display?fillRect_', 0xA6);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x53);
		
		}
		if(29 < 239) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
		, 0xFE, 0xF3);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x35, 0xF3);
		
		}
		if(74 < 236) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
		, 0x68, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x23, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(32 < 54) {
		this.bus.emit('display?fillRect_', 0x18);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x50);
		
		}
		if(199 < 213) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0x06, 14, 0, 0, 0x82, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 0, 0xCD, 14, 0x82, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var));
	}).effect((displayReady__bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar119) => {
		return displayReadyvar119._port === 'display' && displayReadyvar119._msg === 'displayReadyvar119' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar119) => {
		if(167 < 143) {
		this.bus.emit('display?clear_', 0xD8);
		
		} else {
		this.bus.emit('display?clear__bis', 0xC2);
		
		}
		if(114 < 196) {
		this.bus.emit('display?clearvar109', 0xC5, 0x0E);
		
		} else {
		this.bus.emit('display?clearvar109_bis', 0x92, 0x0E);
		
		}
		this.initColors();
		if(154 < 42) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
		, 0x9C, this.BreakoutGame_bgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x78, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(139 < 71) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
		, 0xFB, 0x26);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
		, 0x03, 0x26);
		
		}
		if(73 < 235) {
		this.bus.emit('display?fillRect_', 0xF1);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x48);
		
		}
		if(214 < 12) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0x52, this.BreakoutGame_YDISPSIZE_var, 0, 0, 0xEE, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 0, 0xB5, this.BreakoutGame_YDISPSIZE_var, 0xEE, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(202 < 88) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
		, 0x57, 0xF3);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
		, 0xFD, 0xF3);
		
		}
		if(24 < 59) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
		, 0x32, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x4E, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(234 < 181) {
		this.bus.emit('display?fillRect_', 0xE0);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x27);
		
		}
		if(242 < 239) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0x63, 14, 0, 0, 0x82, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 0, 0x62, 14, 0x82, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar119) => {
		return displayReadyvar119._port === 'display' && displayReadyvar119._msg === 'displayReadyvar119' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar119) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar119_bis) => {
		return displayReadyvar119_bis._port === 'display' && displayReadyvar119_bis._msg === 'displayReadyvar119_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar119_bis) => {
		if(167 < 143) {
		this.bus.emit('display?clear_', 0xE2);
		
		} else {
		this.bus.emit('display?clear__bis', 0xEF);
		
		}
		if(114 < 196) {
		this.bus.emit('display?clearvar109', 0xB9, 0x0E);
		
		} else {
		this.bus.emit('display?clearvar109_bis', 0x5C, 0x0E);
		
		}
		this.initColors();
		if(154 < 42) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
		, 0x09, this.BreakoutGame_bgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x46, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(139 < 71) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
		, 0x7D, 0x26);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
		, 0xE7, 0x26);
		
		}
		if(73 < 235) {
		this.bus.emit('display?fillRect_', 0xC4);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xAC);
		
		}
		if(214 < 12) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0xA3, this.BreakoutGame_YDISPSIZE_var, 0, 0, 0xEE, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 0, 0xA3, this.BreakoutGame_YDISPSIZE_var, 0xEE, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(202 < 88) {
		this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
		, 0x59, 0xF3);
		
		} else {
		this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x61, 0xF3);
		
		}
		if(24 < 59) {
		this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
		, 0xB5, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
		, 0xF7, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(234 < 181) {
		this.bus.emit('display?fillRect_', 0x51);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x16);
		
		}
		if(242 < 239) {
		this.bus.emit('display?fillRectvar113heightwidthyx', 0x96, 14, 0, 0, 0x82, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectvar113heightwidthyx_bis', 0, 0x70, 14, 0x82, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar119_bis) => {
		return displayReadyvar119_bis._port === 'display' && displayReadyvar119_bis._msg === 'displayReadyvar119_bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar119_bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar126_bis) => {
		return lostBallvar126_bis._port === 'game' && lostBallvar126_bis._msg === 'lostBallvar126_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar126_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xEE, 0xC9), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar126_bis) => {
		return lostBallvar126_bis._port === 'game' && lostBallvar126_bis._msg === 'lostBallvar126_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar126_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar127_bis) => {
		return nextLevelvar127_bis._port === 'game' && nextLevelvar127_bis._msg === 'nextLevelvar127_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar127_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xEC, 0xC1), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar127_bis) => {
		return nextLevelvar127_bis._port === 'game' && nextLevelvar127_bis._msg === 'nextLevelvar127_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar127_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x24, 0xC9), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar126) => {
		return lostBallvar126._port === 'game' && lostBallvar126._msg === 'lostBallvar126' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar126) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x89, 0xC9), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar126) => {
		return lostBallvar126._port === 'game' && lostBallvar126._msg === 'lostBallvar126' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar126) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar127) => {
		return nextLevelvar127._port === 'game' && nextLevelvar127._msg === 'nextLevelvar127' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar127) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xC5, 0xC1), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar127) => {
		return nextLevelvar127._port === 'game' && nextLevelvar127._msg === 'nextLevelvar127' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar127) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x2E, 0xC1), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x11, 0xC1), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xC8, 0xC9), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(98 < 9) {
		this.bus.emit('display?updatevar118', 0xDB, 0x64);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x28, 0x64);
		
		}
		if(33 < 78) {
		this.bus.emit('display?update_', 0x98);
		
		} else {
		this.bus.emit('display?update__bis', 0xF1);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0x9B, 0xAF, 0), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(216 < 129) {
		this.bus.emit('display?update_', 0x2B);
		
		} else {
		this.bus.emit('display?update__bis', 0x3C);
		
		}
		if(106 < 61) {
		this.bus.emit('display?updatevar118', 0x35, 0x50);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x61, 0x50);
		
		}
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
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var > 0);
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_GAMEOVER).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var === 0);
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
		if(102 < 119) {
		this.bus.emit('sound?tone_', 0xA6);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xB1);
		
		}
		if(53 < 155) {
		this.bus.emit('sound?tonefreqvar128time', this.BreakoutGame_tone_duration_var, 0x4E, 0x0D, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonefreqvar128time_bis', 0x4E, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var, 0x33);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(29 < 216) {
		this.bus.emit('sound?tonefreqvar128time', this.BreakoutGame_tone_duration_var, 0xF1, 0x7B, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonefreqvar128time_bis', 0xF1, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var, 0x8B);
		
		}
		if(232 < 0) {
		this.bus.emit('sound?tone_', 0xE4);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x20);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(72 < 2) {
		this.bus.emit('sound?tone_', 0x35);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x28);
		
		}
		if(60 < 235) {
		this.bus.emit('sound?tonefreqvar128time', this.BreakoutGame_tone_duration_var, 0xC9, 0x9B, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonefreqvar128time_bis', 0xC9, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var, 0x6E);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(241 < 236) {
		setTimeout(() => this.bus.emit('game?lostBallvar126', 0xB5, 0x7B), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar126_bis', 0xAF, 0x7B), 0);
		
		}
		if(24 < 58) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x38), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0x88), 0);
		
		}
		if(232 < 154) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0xBD), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0x2C), 0);
		
		}
		if(32 < 51) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar126', 0xA0, 0x40), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar126_bis', 0x20, 0x40), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(24 < 73) {
		this.bus.emit('sound?tonefreqvar128time', this.BreakoutGame_tone_duration_var, 0xEA, 0xA5, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonefreqvar128time_bis', 0xEA, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var, 0xBC);
		
		}
		if(53 < 224) {
		this.bus.emit('sound?tone_', 0x20);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x36);
		
		}
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
		if(201 < 37) {
		this.bus.emit('sound?tone_', 0x89);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xA0);
		
		}
		if(156 < 49) {
		this.bus.emit('sound?tonefreqvar128time', this.BreakoutGame_tone_duration_var, 0x5B, 0xC3, this.BreakoutGame_tone1_var);
		
		} else {
		this.bus.emit('sound?tonefreqvar128time_bis', 0x5B, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone1_var, 0x04);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(34 < 174) {
		setTimeout(() => this.bus.emit('game?nextLevelvar127', 0x13, 0xF0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar127_bis', 0xB3, 0xF0), 0);
		
		}
		if(218 < 68) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xA6), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0x4C), 0);
		
		}
		if(169 < 219) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xAF), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0x88), 0);
		
		}
		if(38 < 79) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar127', 0x40, 0xC1), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar127_bis', 0x2D, 0xC1), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(127 < 58) {
		const pady_const = this.BreakoutGame_pady_var;
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypady', pady_const, by_const, 0x34), 0);
		
		} else {
		const by_const = this.BreakoutGame_by_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypady_bis', by_const, 0xCD, pady_const), 0);
		
		}
		if(244 < 131) {
		const padx_const = this.BreakoutGame_padx_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballxpadxvar123', 0x1B, padx_const, bx_const, 0xA5), 0);
		
		} else {
		const bx_const = this.BreakoutGame_bx_var;
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballxpadxvar123_bis', bx_const, 0xA5, 0x3D, padx_const), 0);
		
		}
		if(75 < 32) {
		this.bus.emit('display?updatevar118', 0x68, 0xA9);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0xC9, 0xA9);
		
		}
		if(238 < 46) {
		this.bus.emit('display?update_', 0x31);
		
		} else {
		this.bus.emit('display?update__bis', 0x67);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0x4E, 0x6A, 0), 0);
	});
	BreakoutGame_SC_NEXTLEVEL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0);
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
	if(34 < 115) {
	this.bus.emit('display?setBGColorg', 0xA2, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorg_bis', this.BreakoutGame_bgcolor_var[1]
	, 0xCB);
	
	}
	if(242 < 230) {
	this.bus.emit('display?setBGColorrvar111b', 0x23, this.BreakoutGame_bgcolor_var[0]
	, 0x75, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorrvar111b_bis', 0xBB, 0x23, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(165 < 117) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
	, 0xD4, 0x82);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
	, 0xF5, 0x82);
	
	}
	if(69 < 177) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
	, 0xE9, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
	, 0xC7, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
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
	if(133 < 87) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
	, 0xD7, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x52, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(173 < 143) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
	, 0xF6, 0xDD);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x86, 0xDD);
	
	}
	if(3 < 88) {
	this.bus.emit('display?fillRect_', 0x41);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x08);
	
	}
	if(4 < 59) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0x74, bs_var, this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var, 0x4F, bs_var);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', this.BreakoutGame_prevBX_var, 0xD6, bs_var, 0x4F, this.BreakoutGame_prevBY_var, bs_var);
	
	}
	
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
	if(176 < 104) {
	this.bus.emit('display?setColorgr', 199, 0xDE, 183);
	
	} else {
	this.bus.emit('display?setColorgr_bis', 199, 0x29, 183);
	
	}
	if(190 < 197) {
	this.bus.emit('display?setColorbvar110', 111, 0x1B, 0x0B);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', 111, 0xEA, 0x0B);
	
	}
	if(187 < 185) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0xFE, bs_var, this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var, 0x25, bs_var);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', this.BreakoutGame_prevBX_var, 0x80, bs_var, 0x25, this.BreakoutGame_prevBY_var, bs_var);
	
	}
	if(172 < 68) {
	this.bus.emit('display?fillRect_', 0x6A);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xA3);
	
	}
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(160 < 102) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
	, 0x3F, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x50, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(235 < 127) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
	, 0x0F, 0x31);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
	, 0xBA, 0x31);
	
	}
	if(20 < 99) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0xFD, 4, this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var, 0x68, ps_var);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', this.BreakoutGame_prevPX_var, 0x84, 4, 0x68, this.BreakoutGame_prevPY_var, ps_var);
	
	}
	if(255 < 82) {
	this.bus.emit('display?fillRect_', 0x9D);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x10);
	
	}
	
	}
}

BreakoutGameBrowser.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	if(1 < 253) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
	, 0xC0, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
	, 0xF9, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(171 < 88) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
	, 0xD9, 0xEB);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x52, 0xEB);
	
	}
	if(38 < 71) {
	this.bus.emit('display?fillRect_', 0x71);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xEE);
	
	}
	if(212 < 42) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0x75, 4, this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var, 0x4D, ps_var);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', this.BreakoutGame_prevPX_var, 0x89, 4, 0x4D, this.BreakoutGame_prevPY_var, ps_var);
	
	}
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(125 < 157) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
	, 0x1B, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x08, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(127 < 47) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
	, 0xA4, 0xE9);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
	, 0xAB, 0xE9);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(185 < 197) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
	, 0x63, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x89, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(22 < 185) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
	, 0x4E, 0x09);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x48, 0x09);
	
	}
	if(232 < 66) {
	this.bus.emit('display?setBGColorrvar111b', 0xFE, this.BreakoutGame_bgcolor_var[0]
	, 0xCA, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorrvar111b_bis', 0xCF, 0xFE, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(204 < 83) {
	this.bus.emit('display?setBGColorg', 0x04, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorg_bis', this.BreakoutGame_bgcolor_var[1]
	, 0xAA);
	
	}
	if(98 < 5) {
	this.bus.emit('display?drawIntegerdigitsv', 1, BreakoutGame_drawCountDown_c_var, 0xCD);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsv_bis', 1, 0x49, BreakoutGame_drawCountDown_c_var);
	
	}
	if(253 < 164) {
	this.bus.emit('display?drawIntegervar114xscaley', 4, 80 - 6, 90, 0xF6, 0xA5);
	
	} else {
	this.bus.emit('display?drawIntegervar114xscaley_bis', 0x8E, 80 - 6, 90, 0xF6, 4);
	
	}
	
	} else {
	if(183 < 159) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
	, 0xE5, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x00, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(69 < 157) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
	, 0xC0, 0x3D);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
	, 0xD6, 0x3D);
	
	}
	if(70 < 239) {
	this.bus.emit('display?fillRect_', 0xB9);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xA5);
	
	}
	if(149 < 173) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0xC5, 20, 80 - 6, 90, 0x1E, 12);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', 80 - 6, 0xAD, 20, 0x1E, 90, 12);
	
	}
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	if(116 < 30) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
	, 0x27, 0xD8);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
	, 0xB6, 0xD8);
	
	}
	if(18 < 56) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
	, 0xE1, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x8C, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(102 < 234) {
	this.bus.emit('display?fillRect_', 0x2E);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x03);
	
	}
	if(227 < 232) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0xB5, 1, left_var - 1, top_var - 1, 0x7E, xcenter_var + 1);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', left_var - 1, 0x65, 1, 0x7E, top_var - 1, xcenter_var + 1);
	
	}
	if(122 < 205) {
	this.bus.emit('display?fillRect_', 0xDE);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xFE);
	
	}
	if(171 < 47) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0xA6, 1, left_var - 1, bottom_var, 0x09, xcenter_var + 1);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', left_var - 1, 0x1C, 1, 0x09, bottom_var, xcenter_var + 1);
	
	}
	if(53 < 189) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0x0E, ycenter_var, left_var - 1, top_var, 0xD3, 1);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', left_var - 1, 0xF1, ycenter_var, 0xD3, top_var, 1);
	
	}
	if(43 < 26) {
	this.bus.emit('display?fillRect_', 0x28);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x18);
	
	}
	if(254 < 36) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0xC5, ycenter_var, right_var, top_var, 0x23, 1);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', right_var, 0x0E, ycenter_var, 0x23, top_var, 1);
	
	}
	if(62 < 154) {
	this.bus.emit('display?fillRect_', 0xE4);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x6F);
	
	}
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
	if(247 < 162) {
	this.bus.emit('display?setColorgr', 103, 0x65, 155);
	
	} else {
	this.bus.emit('display?setColorgr_bis', 103, 0xB3, 155);
	
	}
	if(241 < 236) {
	this.bus.emit('display?setColorbvar110', 89, 0x0A, 0xB1);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', 89, 0x32, 0xB1);
	
	}
	if(58 < 127) {
	this.bus.emit('display?fillRect_', 0x7D);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xB7);
	
	}
	if(229 < 75) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0xB2, h_var, bx_var, by_var, 0xC5, w_var);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', bx_var, 0x80, h_var, 0xC5, by_var, w_var);
	
	}
	if(172 < 220) {
	this.bus.emit('display?setColorbvar110', 43, 0xF4, 0x70);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', 43, 0xFA, 0x70);
	
	}
	if(90 < 157) {
	this.bus.emit('display?setColorgr', 56, 0xB7, 100);
	
	} else {
	this.bus.emit('display?setColorgr_bis', 56, 0xB1, 100);
	
	}
	if(151 < 249) {
	this.bus.emit('display?drawRectwidthx', w_var, bx_var, 0xAB);
	
	} else {
	this.bus.emit('display?drawRectwidthx_bis', 0x18, bx_var, w_var);
	
	}
	if(240 < 48) {
	this.bus.emit('display?drawRectyvar112height', by_var, h_var, 0xC2, 0x73);
	
	} else {
	this.bus.emit('display?drawRectyvar112height_bis', by_var, h_var, 0x73, 0x8B);
	
	}
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(66 < 221) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
	, 0x59, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x75, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(107 < 177) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
	, 0x47, 0x12);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
	, 0xBB, 0x12);
	
	}
	if(225 < 61) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0x89, this.BreakoutGame_BRICK_HEIGHT_var - 2, bx_var, by_var, 0xA5, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', bx_var, 0xE8, this.BreakoutGame_BRICK_HEIGHT_var - 2, 0xA5, by_var, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
	
	}
	if(132 < 28) {
	this.bus.emit('display?fillRect_', 0xBA);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x9F);
	
	}
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
	if(113 < 99) {
	this.bus.emit('display?setColorbvar110', 130, 0x6E, 0x3D);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', 130, 0xF4, 0x3D);
	
	}
	if(137 < 182) {
	this.bus.emit('display?setColorgr', 209, 0x88, 158);
	
	} else {
	this.bus.emit('display?setColorgr_bis', 209, 0xF6, 158);
	
	}
	if(220 < 221) {
	this.bus.emit('display?setBGColorrvar111b', 0xDD, this.BreakoutGame_fgcolor_var[0]
	, 0x0F, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorrvar111b_bis', 0xEA, 0xDD, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(178 < 156) {
	this.bus.emit('display?setBGColorg', 0xD0, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorg_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x48);
	
	}
	if(225 < 204) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_bgcolor_var[2]
	, 0x2E, 0x90);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x73, 0x90);
	
	}
	if(66 < 136) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_bgcolor_var[1]
	, 0xFA, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_bgcolor_var[1]
	, 0xEB, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(15 < 186) {
	this.bus.emit('display?drawIntegervar114xscaley', 2, 6, 2, 0xDD, 0xAD);
	
	} else {
	this.bus.emit('display?drawIntegervar114xscaley_bis', 0x28, 6, 2, 0xDD, 2);
	
	}
	if(10 < 158) {
	this.bus.emit('display?drawIntegerdigitsv', 2, this.BreakoutGame_level_var, 0x9D);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsv_bis', 2, 0x32, this.BreakoutGame_level_var);
	
	}
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
	if(41 < 42) {
	this.bus.emit('display?setColorbvar110', 130, 0xC7, 0xC3);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', 130, 0x50, 0xC3);
	
	}
	if(28 < 203) {
	this.bus.emit('display?setColorgr', 209, 0xFE, 158);
	
	} else {
	this.bus.emit('display?setColorgr_bis', 209, 0xA5, 158);
	
	}
	if(71 < 1) {
	this.bus.emit('display?setBGColorrvar111b', 0xF3, this.BreakoutGame_fgcolor_var[0]
	, 0x15, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorrvar111b_bis', 0xCA, 0xF3, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(60 < 9) {
	this.bus.emit('display?setBGColorg', 0x72, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorg_bis', this.BreakoutGame_fgcolor_var[1]
	, 0xDA);
	
	}
	if(213 < 161) {
	this.bus.emit('display?drawIntegerdigitsv', 5, this.BreakoutGame_score_var, 0x17);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsv_bis', 5, 0x5E, this.BreakoutGame_score_var);
	
	}
	if(158 < 7) {
	this.bus.emit('display?drawIntegervar114xscaley', 2, 58, 2, 0xB5, 0xB1);
	
	} else {
	this.bus.emit('display?drawIntegervar114xscaley_bis', 0x98, 58, 2, 0xB5, 2);
	
	}
}

BreakoutGameBrowser.prototype.drawLives = function() {
	if(17 < 82) {
	this.bus.emit('display?setColorbvar110', this.BreakoutGame_fgcolor_var[2]
	, 0x58, 0x3F);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x15, 0x3F);
	
	}
	if(52 < 52) {
	this.bus.emit('display?setColorgr', this.BreakoutGame_fgcolor_var[1]
	, 0xCF, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorgr_bis', this.BreakoutGame_fgcolor_var[1]
	, 0xE0, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(233 < 244) {
	this.bus.emit('display?fillRect_', 0x6A);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x23);
	
	}
	if(62 < 209) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0x54, 6, 124, 4, 0x67, 24 + 6);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', 124, 0x43, 6, 0x67, 4, 24 + 6);
	
	}
	if(94 < 187) {
	this.bus.emit('display?setColorbvar110', 111, 0x30, 0x45);
	
	} else {
	this.bus.emit('display?setColorbvar110_bis', 111, 0x2C, 0x45);
	
	}
	if(78 < 22) {
	this.bus.emit('display?setColorgr', 199, 0x89, 183);
	
	} else {
	this.bus.emit('display?setColorgr_bis', 199, 0x35, 183);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(17 < 38) {
	this.bus.emit('display?fillRect_', 0xEE);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xF9);
	
	}
	if(80 < 170) {
	this.bus.emit('display?fillRectvar113heightwidthyx', 0xF3, 6, 124 + (2 - i_var) * 12, 4, 0x7F, 6);
	
	} else {
	this.bus.emit('display?fillRectvar113heightwidthyx_bis', 124 + (2 - i_var) * 12, 0xFD, 6, 0x7F, 4, 6);
	
	}
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(var129, var108, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", var129:var129, var108:var108, id:id});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(var142) {
	this._receive({_port:"display", _msg:"displayReady_", var142:var142});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar119Ondisplay = function(var119, var143) {
	this._receive({_port:"display", _msg:"displayReadyvar119", var119:var119, var143:var143});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(var132) {
	this._receive({_port:"display", _msg:"displayError_", var132:var132});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar120Ondisplay = function(var133, var120) {
	this._receive({_port:"display", _msg:"displayErrorvar120", var133:var133, var120:var120});
}

BreakoutGameBrowser.prototype.receivedisplayReady__bisOndisplay = function(var166) {
	this._receive({_port:"display", _msg:"displayReady__bis", var166:var166});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar119_bisOndisplay = function(var167, var119) {
	this._receive({_port:"display", _msg:"displayReadyvar119_bis", var167:var167, var119:var119});
}

BreakoutGameBrowser.prototype.receivedisplayError__bisOndisplay = function(var156) {
	this._receive({_port:"display", _msg:"displayError__bis", var156:var156});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar120_bisOndisplay = function(var157, var120) {
	this._receive({_port:"display", _msg:"displayErrorvar120_bis", var157:var157, var120:var120});
}

BreakoutGameBrowser.prototype.receivepositionvar122Oncontroller = function(var122, var182) {
	this._receive({_port:"controller", _msg:"positionvar122", var122:var122, var182:var182});
}

BreakoutGameBrowser.prototype.receivepositionyxOncontroller = function(y, x, var183) {
	this._receive({_port:"controller", _msg:"positionyx", y:y, x:x, var183:var183});
}

BreakoutGameBrowser.prototype.receivepositionvar122_bisOncontroller = function(var122, var186) {
	this._receive({_port:"controller", _msg:"positionvar122_bis", var122:var122, var186:var186});
}

BreakoutGameBrowser.prototype.receivepositionyx_bisOncontroller = function(x, var187, y) {
	this._receive({_port:"controller", _msg:"positionyx_bis", x:x, var187:var187, y:y});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(var200) {
	this._receive({_port:"game", _msg:"lostBall_", var200:var200});
}

BreakoutGameBrowser.prototype.receivelostBallvar126Ongame = function(var201, var126) {
	this._receive({_port:"game", _msg:"lostBallvar126", var201:var201, var126:var126});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(var202) {
	this._receive({_port:"game", _msg:"nextLevel_", var202:var202});
}

BreakoutGameBrowser.prototype.receivenextLevelvar127Ongame = function(var203, var127) {
	this._receive({_port:"game", _msg:"nextLevelvar127", var203:var203, var127:var127});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOngame = function(var204) {
	this._receive({_port:"game", _msg:"lostBall__bis", var204:var204});
}

BreakoutGameBrowser.prototype.receivelostBallvar126_bisOngame = function(var205, var126) {
	this._receive({_port:"game", _msg:"lostBallvar126_bis", var205:var205, var126:var126});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOngame = function(var206) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var206:var206});
}

BreakoutGameBrowser.prototype.receivenextLevelvar127_bisOngame = function(var207, var127) {
	this._receive({_port:"game", _msg:"nextLevelvar127_bis", var207:var207, var127:var127});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(var200) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var200:var200});
}

BreakoutGameBrowser.prototype.receivelostBallvar126Onpro_game = function(var201, var126) {
	this._receive({_port:"pro_game", _msg:"lostBallvar126", var201:var201, var126:var126});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(var202) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var202:var202});
}

BreakoutGameBrowser.prototype.receivenextLevelvar127Onpro_game = function(var203, var127) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar127", var203:var203, var127:var127});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOnpro_game = function(var204) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var204:var204});
}

BreakoutGameBrowser.prototype.receivelostBallvar126_bisOnpro_game = function(var205, var126) {
	this._receive({_port:"pro_game", _msg:"lostBallvar126_bis", var205:var205, var126:var126});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOnpro_game = function(var206) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var206:var206});
}

BreakoutGameBrowser.prototype.receivenextLevelvar127_bisOnpro_game = function(var207, var127) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar127_bis", var207:var207, var127:var127});
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionyx_var = function(BreakoutGame_SC_received_controller_positionyx_var) {
	this.BreakoutGame_SC_received_controller_positionyx_var = BreakoutGame_SC_received_controller_positionyx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar126_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar126_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var = BreakoutGame_SC_PLAY_received_game_lostBallvar126_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionvar122_var = function(BreakoutGame_SC_received_controller_positionvar122_var) {
	this.BreakoutGame_SC_received_controller_positionvar122_var = BreakoutGame_SC_received_controller_positionvar122_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var126_var = function(BreakoutGame_SC_PLAY_game_lostBall_var126_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var126_var = BreakoutGame_SC_PLAY_game_lostBall_var126_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_var122_var = function(BreakoutGame_SC_controller_position_var122_var) {
	this.BreakoutGame_SC_controller_position_var122_var = BreakoutGame_SC_controller_position_var122_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_var119_var = function(BreakoutGame_SC_INIT_display_displayReady_var119_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var119_var = BreakoutGame_SC_INIT_display_displayReady_var119_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar127_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var127_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var127_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var127_var = BreakoutGame_SC_PLAY_game_nextLevel_var127_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var127_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var127_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var127_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var127_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var126_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var126_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var126_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var126_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar119_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar119_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var = BreakoutGame_SC_INIT_received_display_displayReadyvar119_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\treceived_controller_positionyx = ' + this.BreakoutGame_SC_received_controller_positionyx_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\treceived_game_lostBallvar126 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar126_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\treceived_controller_positionvar122 = ' + this.BreakoutGame_SC_received_controller_positionvar122_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\treceived_pro_game_nextLevelvar127 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var;
	result += '\n\tgame_lostBall_var126 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var126_var;
	result += '\n\tcontroller_position_var122 = ' + this.BreakoutGame_SC_controller_position_var122_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tdisplay_displayReady_var119 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var119_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\treceived_game_nextLevelvar127 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar127_var;
	result += '\n\tgame_nextLevel_var127 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var127_var;
	result += '\n\tpro_game_nextLevel_var127 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var127_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\treceived_pro_game_lostBallvar126 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tpro_game_lostBall_var126 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var126_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\treceived_display_displayReadyvar119 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '';
	return result;
}

