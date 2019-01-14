'use strict';


/*
 * Definition for type : BreakoutGameBrowserRND
 */

function BreakoutGameBrowserRND(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

BreakoutGameBrowserRND.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SC');
	let _initial_BreakoutGame_SC = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let BreakoutGame_SC_INIT = new StateJS.State('INIT', this._statemachine).entry(() => {
		if(139 < 71) {
		this.bus.emit('display?createysize', this.BreakoutGame_YDISPSIZE_var, 0x62);
		
		} else {
		this.bus.emit('display?createysize_bis', this.BreakoutGame_YDISPSIZE_var, 0x57);
		
		}
		if(73 < 235) {
		this.bus.emit('display?createxsizevar116', 0xD6, 0xA9, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?createxsizevar116_bis', 0xA9, 0xE0, this.BreakoutGame_XDISPSIZE_var);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0, 0x13, 0x27), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(32 < 51) {
		this.bus.emit('display?update_', 0xB3);
		
		} else {
		this.bus.emit('display?update__bis', 0xA6);
		
		}
		if(24 < 73) {
		this.bus.emit('display?updatevar118', 0x4C, 0xCA);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0xCA, 0xAF);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0, 0x31, 0x1B), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 500, 0, 0xE4, 0x50), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(64 < 42) {
		this.bus.emit('display?updatevar118', 0xCF, 0x9F);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x9F, 0xE5);
		
		}
		if(74 < 212) {
		this.bus.emit('display?update_', 0xAE);
		
		} else {
		this.bus.emit('display?update__bis', 0x22);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 1000, 0, 0x29, 0x84), 0);
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
		if(2 < 50) {
		this.bus.emit('display?update_', 0x86);
		
		} else {
		this.bus.emit('display?update__bis', 0x1A);
		
		}
		if(53 < 178) {
		this.bus.emit('display?updatevar118', 0x67, 0x45);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x45, 0xEC);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(246 < 145) {
		this.bus.emit('display?setColorb', 0xC6, 255);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x4D, 255);
		
		}
		if(74 < 203) {
		this.bus.emit('display?setColorgvar110r', 0x8D, 255, 255, 0xF8);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', 255, 0x17, 0xF8, 255);
		
		}
		if(125 < 241) {
		this.bus.emit('display?fillRectxheightwidthy', 30, 8, 0xD8, 142, 76);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 30, 8, 0x36, 76, 142);
		
		}
		if(117 < 249) {
		this.bus.emit('display?fillRectvar113', 0xC2, 0x5B);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0x5B, 0xBD);
		
		}
		if(203 < 125) {
		this.bus.emit('display?setColorgvar110r', 0xEF, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0x9F);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x30, 0x9F, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(243 < 101) {
		this.bus.emit('display?setColorb', 0x9F, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xC1, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(120 < 89) {
		this.bus.emit('display?fillRectxheightwidthy', 31, 9, 0x7E, 140, 50);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 31, 9, 0x91, 50, 140);
		
		}
		if(205 < 170) {
		this.bus.emit('display?fillRectvar113', 0xAF, 0x3C);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0x3C, 0x84);
		
		}
		if(134 < 252) {
		this.bus.emit('display?setBGColorgrb', 0x76, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setBGColorgrb_bis', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, 0x3F);
		
		}
		if(32 < 210) {
		this.bus.emit('display?setBGColorvar111', 0x09, 0x20);
		
		} else {
		this.bus.emit('display?setBGColorvar111_bis', 0x58, 0x09);
		
		}
		if(142 < 24) {
		this.bus.emit('display?setColorb', 0x62, 130);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xBE, 130);
		
		}
		if(20 < 39) {
		this.bus.emit('display?setColorgvar110r', 0x56, 158, 209, 0xD7);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', 209, 0x2A, 0xD7, 158);
		
		}
		if(22 < 168) {
		this.bus.emit('display?drawInteger_', 0x27);
		
		} else {
		this.bus.emit('display?drawInteger__bis', 0x72);
		
		}
		if(22 < 214) {
		this.bus.emit('display?drawIntegerscalevar114vydigitsx', 0x03, 6, 23, 0x79, this.BreakoutGame_score_var, 5, 40);
		
		} else {
		this.bus.emit('display?drawIntegerscalevar114vydigitsx_bis', this.BreakoutGame_score_var, 23, 6, 40, 0x7B, 0x03, 5);
		
		}
		if(0 < 71) {
		this.bus.emit('display?drawThingMLvar115x', 0x35, 26, 0x89);
		
		} else {
		this.bus.emit('display?drawThingMLvar115x_bis', 0x73, 26, 0x89);
		
		}
		if(106 < 193) {
		this.bus.emit('display?drawThingMLy', 0x26, 87);
		
		} else {
		this.bus.emit('display?drawThingMLy_bis', 0xD9, 87);
		
		}
		if(141 < 229) {
		this.bus.emit('display?updatevar118', 0x32, 0xA4);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0xA4, 0xC9);
		
		}
		if(32 < 156) {
		this.bus.emit('display?update_', 0x1E);
		
		} else {
		this.bus.emit('display?update__bis', 0xEB);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	this._statemachine.to(null).when((position__bis) => {
		return position__bis._port === 'controller' && position__bis._msg === 'position__bis';
	}).effect((position__bis) => {
		this.BreakoutGame_SC_received_controller_position__var = true;
		if(this.BreakoutGame_SC_received_controller_positionyxvar122_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_position__var = false;
		this.BreakoutGame_SC_received_controller_positionyxvar122_var = false;
		
		}
	});
	this._statemachine.to(null).when((position_) => {
		return position_._port === 'controller' && position_._msg === 'position_';
	}).effect((position_) => {
		this.BreakoutGame_SC_received_controller_position__var = true;
		if(this.BreakoutGame_SC_received_controller_positionyxvar122_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_position__var = false;
		this.BreakoutGame_SC_received_controller_positionyxvar122_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionyxvar122) => {
		return positionyxvar122._port === 'controller' && positionyxvar122._msg === 'positionyxvar122';
	}).effect((positionyxvar122) => {
		this.BreakoutGame_SC_received_controller_positionyxvar122_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positionyxvar122.y;
		this.BreakoutGame_SC_controller_position_x_var = positionyxvar122.x;
		this.BreakoutGame_SC_controller_position_var122_var = positionyxvar122.var122;
		if(this.BreakoutGame_SC_received_controller_position__var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionyxvar122_var = false;
		this.BreakoutGame_SC_received_controller_position__var = false;
		
		}
	});
	this._statemachine.to(null).when((positionyxvar122_bis) => {
		return positionyxvar122_bis._port === 'controller' && positionyxvar122_bis._msg === 'positionyxvar122_bis';
	}).effect((positionyxvar122_bis) => {
		this.BreakoutGame_SC_received_controller_positionyxvar122_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positionyxvar122_bis.y;
		this.BreakoutGame_SC_controller_position_x_var = positionyxvar122_bis.x;
		this.BreakoutGame_SC_controller_position_var122_var = positionyxvar122_bis.var122;
		if(this.BreakoutGame_SC_received_controller_position__var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionyxvar122_var = false;
		this.BreakoutGame_SC_received_controller_position__var = false;
		
		}
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x4B, 0x19), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar128) => {
		return nextLevelvar128._port === 'pro_game' && nextLevelvar128._msg === 'nextLevelvar128' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar128) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x4B, 0xC4), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar128) => {
		return nextLevelvar128._port === 'pro_game' && nextLevelvar128._msg === 'nextLevelvar128' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar128) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar128_bis) => {
		return nextLevelvar128_bis._port === 'pro_game' && nextLevelvar128_bis._msg === 'nextLevelvar128_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar128_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x4B, 0x5A), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar128_bis) => {
		return nextLevelvar128_bis._port === 'pro_game' && nextLevelvar128_bis._msg === 'nextLevelvar128_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar128_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xB8, 0xDE), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xB8, 0x14), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar127_bis) => {
		return lostBallvar127_bis._port === 'pro_game' && lostBallvar127_bis._msg === 'lostBallvar127_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar127_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xB8, 0x56), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar127_bis) => {
		return lostBallvar127_bis._port === 'pro_game' && lostBallvar127_bis._msg === 'lostBallvar127_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar127_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar127) => {
		return lostBallvar127._port === 'pro_game' && lostBallvar127._msg === 'lostBallvar127' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar127) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xB8, 0x68), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar127) => {
		return lostBallvar127._port === 'pro_game' && lostBallvar127._msg === 'lostBallvar127' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar127) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x4B, 0x64), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x34, 0xF0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar128) => {
		return nextLevelvar128._port === 'game' && nextLevelvar128._msg === 'nextLevelvar128' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar128) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x34, 0xA8), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar128) => {
		return nextLevelvar128._port === 'game' && nextLevelvar128._msg === 'nextLevelvar128' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar128) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar128_bis) => {
		return nextLevelvar128_bis._port === 'game' && nextLevelvar128_bis._msg === 'nextLevelvar128_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar128_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x34, 0x98), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar128_bis) => {
		return nextLevelvar128_bis._port === 'game' && nextLevelvar128_bis._msg === 'nextLevelvar128_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar128_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xFB, 0x04), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xFB, 0xEB), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar127_bis) => {
		return lostBallvar127_bis._port === 'game' && lostBallvar127_bis._msg === 'lostBallvar127_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar127_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xFB, 0x53), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar127_bis) => {
		return lostBallvar127_bis._port === 'game' && lostBallvar127_bis._msg === 'lostBallvar127_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar127_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar127) => {
		return lostBallvar127._port === 'game' && lostBallvar127._msg === 'lostBallvar127' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar127) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xFB, 0xA2), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar127) => {
		return lostBallvar127._port === 'game' && lostBallvar127._msg === 'lostBallvar127' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar127) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x34, 0x70), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar119) => {
		return displayReadyvar119._port === 'display' && displayReadyvar119._msg === 'displayReadyvar119' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar119) => {
		if(33 < 78) {
		this.bus.emit('display?clearvar109', 0x4E, 0x5C);
		
		} else {
		this.bus.emit('display?clearvar109_bis', 0x4E, 0x09);
		
		}
		if(102 < 119) {
		this.bus.emit('display?clear_', 0x46);
		
		} else {
		this.bus.emit('display?clear__bis', 0x7D);
		
		}
		this.initColors();
		if(53 < 155) {
		this.bus.emit('display?setColorb', 0xE7, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xC4, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(29 < 216) {
		this.bus.emit('display?setColorgvar110r', 0xAC, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0xC9);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
		, 0xA3, 0xC9, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(232 < 0) {
		this.bus.emit('display?fillRectvar113', 0xA3, 0xC1);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0xC1, 0x59);
		
		}
		if(72 < 2) {
		this.bus.emit('display?fillRectxheightwidthy', 0, 0, 0x61, this.BreakoutGame_XDISPSIZE_var, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 0, 0, 0xB5, this.BreakoutGame_YDISPSIZE_var, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(60 < 235) {
		this.bus.emit('display?setColorb', 0xF7, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x51, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(241 < 236) {
		this.bus.emit('display?setColorgvar110r', 0x16, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xBB);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x96, 0xBB, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(24 < 58) {
		this.bus.emit('display?fillRectvar113', 0x70, 0xE4);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0xE4, 0xF1);
		
		}
		if(232 < 154) {
		this.bus.emit('display?fillRectxheightwidthy', 0, 0, 0x10, this.BreakoutGame_XDISPSIZE_var, 14);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 0, 0, 0x66, 14, this.BreakoutGame_XDISPSIZE_var);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var);
	}).effect((displayReady_) => {
		if(214 < 12) {
		this.bus.emit('display?clearvar109', 0x4E, 0xC3);
		
		} else {
		this.bus.emit('display?clearvar109_bis', 0x4E, 0xB5);
		
		}
		if(202 < 88) {
		this.bus.emit('display?clear_', 0x7C);
		
		} else {
		this.bus.emit('display?clear__bis', 0x89);
		
		}
		this.initColors();
		if(24 < 59) {
		this.bus.emit('display?setColorgvar110r', 0xDC, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0xC9);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x9D, 0xC9, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(234 < 181) {
		this.bus.emit('display?setColorb', 0x09, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xA6, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(242 < 239) {
		this.bus.emit('display?fillRectvar113', 0x53, 0xC1);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0xC1, 0xFE);
		
		}
		if(62 < 151) {
		this.bus.emit('display?fillRectxheightwidthy', 0, 0, 0x35, this.BreakoutGame_XDISPSIZE_var, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 0, 0, 0x68, this.BreakoutGame_YDISPSIZE_var, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(104 < 233) {
		this.bus.emit('display?setColorgvar110r', 0x23, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xBB);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x18, 0xBB, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(216 < 129) {
		this.bus.emit('display?setColorb', 0x50, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x06, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(106 < 61) {
		this.bus.emit('display?fillRectxheightwidthy', 0, 0, 0xCD, this.BreakoutGame_XDISPSIZE_var, 14);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 0, 0, 0xE2, 14, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(98 < 9) {
		this.bus.emit('display?fillRectvar113', 0xEF, 0xE4);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0xE4, 0xB9);
		
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
		if(214 < 12) {
		this.bus.emit('display?clearvar109', 0x4E, 0xD0);
		
		} else {
		this.bus.emit('display?clearvar109_bis', 0x4E, 0xC6);
		
		}
		if(202 < 88) {
		this.bus.emit('display?clear_', 0xAF);
		
		} else {
		this.bus.emit('display?clear__bis', 0x2B);
		
		}
		this.initColors();
		if(24 < 59) {
		this.bus.emit('display?setColorgvar110r', 0x3C, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0xC9);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x35, 0xC9, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(234 < 181) {
		this.bus.emit('display?setColorb', 0x61, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xDB, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(242 < 239) {
		this.bus.emit('display?fillRectvar113', 0x28, 0xC1);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0xC1, 0x98);
		
		}
		if(62 < 151) {
		this.bus.emit('display?fillRectxheightwidthy', 0, 0, 0xF1, this.BreakoutGame_XDISPSIZE_var, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 0, 0, 0xB4, this.BreakoutGame_YDISPSIZE_var, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(104 < 233) {
		this.bus.emit('display?setColorgvar110r', 0xA6, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xBB);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
		, 0xB1, 0xBB, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(216 < 129) {
		this.bus.emit('display?setColorb', 0x0D, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x33, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(106 < 61) {
		this.bus.emit('display?fillRectxheightwidthy', 0, 0, 0x7B, this.BreakoutGame_XDISPSIZE_var, 14);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 0, 0, 0x8B, 14, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(98 < 9) {
		this.bus.emit('display?fillRectvar113', 0xE4, 0xE4);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0xE4, 0x20);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar119_bis) => {
		return displayReadyvar119_bis._port === 'display' && displayReadyvar119_bis._msg === 'displayReadyvar119_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar119_bis) => {
		if(33 < 78) {
		this.bus.emit('display?clearvar109', 0x4E, 0x35);
		
		} else {
		this.bus.emit('display?clearvar109_bis', 0x4E, 0x28);
		
		}
		if(102 < 119) {
		this.bus.emit('display?clear_', 0x9B);
		
		} else {
		this.bus.emit('display?clear__bis', 0x6E);
		
		}
		this.initColors();
		if(53 < 155) {
		this.bus.emit('display?setColorb', 0xB5, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xAF, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(29 < 216) {
		this.bus.emit('display?setColorgvar110r', 0x38, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0xC9);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x88, 0xC9, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(232 < 0) {
		this.bus.emit('display?fillRectvar113', 0xBD, 0xC1);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0xC1, 0x2C);
		
		}
		if(72 < 2) {
		this.bus.emit('display?fillRectxheightwidthy', 0, 0, 0xA0, this.BreakoutGame_XDISPSIZE_var, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 0, 0, 0x20, this.BreakoutGame_YDISPSIZE_var, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(60 < 235) {
		this.bus.emit('display?setColorb', 0xA5, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xBC, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(241 < 236) {
		this.bus.emit('display?setColorgvar110r', 0x20, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xBB);
		
		} else {
		this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x36, 0xBB, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(24 < 58) {
		this.bus.emit('display?fillRectvar113', 0x89, 0xE4);
		
		} else {
		this.bus.emit('display?fillRectvar113_bis', 0xE4, 0xA0);
		
		}
		if(232 < 154) {
		this.bus.emit('display?fillRectxheightwidthy', 0, 0, 0xC3, this.BreakoutGame_XDISPSIZE_var, 14);
		
		} else {
		this.bus.emit('display?fillRectxheightwidthy_bis', 0, 0, 0x04, 14, this.BreakoutGame_XDISPSIZE_var);
		
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
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var > 0);
	});
	BreakoutGame_SC_LOSTBALL.to(BreakoutGame_SC_GAMEOVER).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_lives_var === 0);
	});
	BreakoutGame_SC_NEXTLEVEL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(156 < 49) {
		this.bus.emit('display?updatevar118', 0x1B, 0xC8);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0xC8, 0x3D);
		
		}
		if(34 < 174) {
		this.bus.emit('display?update_', 0x68);
		
		} else {
		this.bus.emit('display?update__bis', 0xC9);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0, 0x88, 0x07), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(53 < 224) {
		this.bus.emit('display?update_', 0x40);
		
		} else {
		this.bus.emit('display?update__bis', 0x2D);
		
		}
		if(201 < 37) {
		this.bus.emit('display?updatevar118', 0x34, 0x99);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x99, 0xCD);
		
		}
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
		if(218 < 68) {
		this.bus.emit('sound?tonetimefreqvar126', this.BreakoutGame_tone_duration_var, 0x67, 0xA6, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonetimefreqvar126_bis', this.BreakoutGame_tone_duration_var, 0xA6, this.BreakoutGame_tone2_var, 0x6A);
		
		}
		if(169 < 219) {
		this.bus.emit('sound?tone_', 0x24);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x89);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(38 < 79) {
		this.bus.emit('sound?tone_', 0x11);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xC5);
		
		}
		if(127 < 58) {
		this.bus.emit('sound?tonetimefreqvar126', this.BreakoutGame_tone_duration_var, 0xA9, 0x8E, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonetimefreqvar126_bis', this.BreakoutGame_tone_duration_var, 0x8E, this.BreakoutGame_tone2_var, 0xB2);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(244 < 131) {
		this.bus.emit('sound?tone_', 0x71);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x7E);
		
		}
		if(75 < 32) {
		this.bus.emit('sound?tonetimefreqvar126', this.BreakoutGame_tone_duration_var, 0xC8, 0x60, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonetimefreqvar126_bis', this.BreakoutGame_tone_duration_var, 0x60, this.BreakoutGame_tone2_var, 0xEE);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(238 < 46) {
		setTimeout(() => this.bus.emit('game?lostBallvar127', 0x2E, 0x03), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar127_bis', 0x03, 0xEC), 0);
		
		}
		if(164 < 229) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x1E), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0x5E), 0);
		
		}
		if(89 < 188) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar127', 0x31, 0xD6), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar127_bis', 0xD6, 0xE6), 0);
		
		}
		if(192 < 59) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x66), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0xE6), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(102 < 4) {
		this.bus.emit('sound?tonetimefreqvar126', this.BreakoutGame_tone_duration_var, 0xAB, 0x4C, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonetimefreqvar126_bis', this.BreakoutGame_tone_duration_var, 0x4C, this.BreakoutGame_tone2_var, 0xDD);
		
		}
		if(194 < 234) {
		this.bus.emit('sound?tone_', 0x23);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x3D);
		
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
		if(212 < 16) {
		this.bus.emit('sound?tone_', 0x8C);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x64);
		
		}
		if(113 < 96) {
		this.bus.emit('sound?tonetimefreqvar126', this.BreakoutGame_tone_duration_var, 0xF4, 0x6B, this.BreakoutGame_tone1_var);
		
		} else {
		this.bus.emit('sound?tonetimefreqvar126_bis', this.BreakoutGame_tone_duration_var, 0x6B, this.BreakoutGame_tone1_var, 0x4B);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(199 < 44) {
		setTimeout(() => this.bus.emit('game?nextLevelvar128', 0x6C, 0xAF), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar128_bis', 0xAF, 0xCA), 0);
		
		}
		if(150 < 45) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xC2), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0x70), 0);
		
		}
		if(148 < 94) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xB0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0xD1), 0);
		
		}
		if(156 < 35) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar128', 0x5C, 0xFD), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar128_bis', 0xFD, 0xDC), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(208 < 202) {
		const pady_const = this.BreakoutGame_pady_var;
		const by_const = this.BreakoutGame_by_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballxballyvar123pady', pady_const, by_const, bx_const, 0x08, 0x49), 0);
		
		} else {
		const bx_const = this.BreakoutGame_bx_var;
		const pady_const = this.BreakoutGame_pady_var;
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAballxballyvar123pady_bis', bx_const, 0x4A, pady_const, by_const, 0x08), 0);
		
		}
		if(106 < 38) {
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadx', 0xAD, padx_const), 0);
		
		} else {
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadx_bis', padx_const, 0x57), 0);
		
		}
		if(239 < 214) {
		this.bus.emit('display?update_', 0xA5);
		
		} else {
		this.bus.emit('display?update__bis', 0x0C);
		
		}
		if(124 < 236) {
		this.bus.emit('display?updatevar118', 0x7B, 0x6E);
		
		} else {
		this.bus.emit('display?updatevar118_bis', 0x6E, 0xBF);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0, 0x2E, 0x1E), 0);
	});
}
BreakoutGameBrowserRND.prototype.log = function(BreakoutGame_log_logMem_var) {
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

BreakoutGameBrowserRND.prototype.initColors = function() {
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
	if(255 < 82) {
	this.bus.emit('display?setBGColorgrb', 0xAB, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorgrb_bis', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x63);
	
	}
	if(1 < 253) {
	this.bus.emit('display?setBGColorvar111', 0xC5, 0x89);
	
	} else {
	this.bus.emit('display?setBGColorvar111_bis', 0x4E, 0xC5);
	
	}
	if(171 < 88) {
	this.bus.emit('display?setColorb', 0x48, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xCA, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(38 < 71) {
	this.bus.emit('display?setColorgvar110r', 0xCF, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x70);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x04, 0x70, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
}

BreakoutGameBrowserRND.prototype.resetBall = function() {
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

BreakoutGameBrowserRND.prototype.eraseBall = function() {
	let bs_var = Math.trunc((this.BreakoutGame_br_var * 2) / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevBX_var > 0) {
	if(212 < 42) {
	this.bus.emit('display?setColorgvar110r', 0xAA, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x73);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
	, 0xCD, 0x73, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(125 < 157) {
	this.bus.emit('display?setColorb', 0x49, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xA5, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(127 < 47) {
	this.bus.emit('display?fillRectvar113', 0x8E, 0x12);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0x12, 0xE5);
	
	}
	if(185 < 197) {
	this.bus.emit('display?fillRectxheightwidthy', this.BreakoutGame_prevBY_var, this.BreakoutGame_prevBX_var, 0x00, bs_var, bs_var);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', this.BreakoutGame_prevBY_var, this.BreakoutGame_prevBX_var, 0xC0, bs_var, bs_var);
	
	}
	
	}
	this.BreakoutGame_prevBX_var =  -1;
	this.bus.emit('prevBX=', this.BreakoutGame_prevBX_var);
	this.BreakoutGame_prevBY_var =  -1;
	this.bus.emit('prevBY=', this.BreakoutGame_prevBY_var);
}

BreakoutGameBrowserRND.prototype.drawBall = function() {
	let bs_var = Math.trunc((this.BreakoutGame_br_var * 2) / this.BreakoutGame_SCALE_var);
	this.eraseBall();
	this.BreakoutGame_prevBX_var = Math.trunc((this.BreakoutGame_bx_var - this.BreakoutGame_br_var) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevBX=', this.BreakoutGame_prevBX_var);
	this.BreakoutGame_prevBY_var = Math.trunc((this.BreakoutGame_by_var - this.BreakoutGame_br_var) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevBY=', this.BreakoutGame_prevBY_var);
	if(22 < 185) {
	this.bus.emit('display?setColorb', 0xD6, 111);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xB9, 111);
	
	}
	if(232 < 66) {
	this.bus.emit('display?setColorgvar110r', 0xA5, 183, 199, 0xA5);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', 199, 0xC5, 0xA5, 183);
	
	}
	if(204 < 83) {
	this.bus.emit('display?fillRectxheightwidthy', this.BreakoutGame_prevBY_var, this.BreakoutGame_prevBX_var, 0xAD, bs_var, bs_var);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', this.BreakoutGame_prevBY_var, this.BreakoutGame_prevBX_var, 0x27, bs_var, bs_var);
	
	}
	if(98 < 5) {
	this.bus.emit('display?fillRectvar113', 0xB6, 0x3D);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0x3D, 0xE1);
	
	}
}

BreakoutGameBrowserRND.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(253 < 164) {
	this.bus.emit('display?setColorb', 0x8C, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x2E, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(183 < 159) {
	this.bus.emit('display?setColorgvar110r', 0x03, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xDD);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
	, 0xB5, 0xDD, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(69 < 157) {
	this.bus.emit('display?fillRectvar113', 0x65, 0x90);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0x90, 0xDE);
	
	}
	if(70 < 239) {
	this.bus.emit('display?fillRectxheightwidthy', this.BreakoutGame_prevPY_var, this.BreakoutGame_prevPX_var, 0xFE, ps_var, 4);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', this.BreakoutGame_prevPY_var, this.BreakoutGame_prevPX_var, 0xA6, 4, ps_var);
	
	}
	
	}
}

BreakoutGameBrowserRND.prototype.drawPad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	this.erasePad();
	this.BreakoutGame_prevPX_var = Math.trunc((this.BreakoutGame_padx_var - (Math.trunc(this.BreakoutGame_padlen_var / 2))) / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPX=', this.BreakoutGame_prevPX_var);
	this.BreakoutGame_prevPY_var = Math.trunc(this.BreakoutGame_pady_var / this.BreakoutGame_SCALE_var);
	this.bus.emit('prevPY=', this.BreakoutGame_prevPY_var);
	if(149 < 173) {
	this.bus.emit('display?setColorb', 0x1C, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x0E, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(116 < 30) {
	this.bus.emit('display?setColorgvar110r', 0xF1, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xDD);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x28, 0xDD, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(18 < 56) {
	this.bus.emit('display?fillRectxheightwidthy', this.BreakoutGame_prevPY_var, this.BreakoutGame_prevPX_var, 0x18, ps_var, 4);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', this.BreakoutGame_prevPY_var, this.BreakoutGame_prevPX_var, 0xC5, 4, ps_var);
	
	}
	if(102 < 234) {
	this.bus.emit('display?fillRectvar113', 0x0E, 0xC3);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0xC3, 0xE4);
	
	}
}

BreakoutGameBrowserRND.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(227 < 232) {
	this.bus.emit('display?setColorgvar110r', 0x6F, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xF3);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x65, 0xF3, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(122 < 205) {
	this.bus.emit('display?setColorb', 0xB3, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x0A, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(171 < 47) {
	this.bus.emit('display?setColorb', 0x32, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x7D, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(53 < 189) {
	this.bus.emit('display?setColorgvar110r', 0xB7, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xB5);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
	, 0xB2, 0xB5, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(43 < 26) {
	this.bus.emit('display?setBGColorvar111', 0x3F, 0x80);
	
	} else {
	this.bus.emit('display?setBGColorvar111_bis', 0xF4, 0x3F);
	
	}
	if(254 < 36) {
	this.bus.emit('display?setBGColorgrb', 0xFA, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorgrb_bis', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xB7);
	
	}
	if(62 < 154) {
	this.bus.emit('display?drawIntegerscalevar114vydigitsx', 0x67, 4, 80 - 6, 0xB1, BreakoutGame_drawCountDown_c_var, 1, 90);
	
	} else {
	this.bus.emit('display?drawIntegerscalevar114vydigitsx_bis', BreakoutGame_drawCountDown_c_var, 80 - 6, 4, 90, 0xAB, 0x67, 1);
	
	}
	if(247 < 162) {
	this.bus.emit('display?drawInteger_', 0x18);
	
	} else {
	this.bus.emit('display?drawInteger__bis', 0xC2);
	
	}
	
	} else {
	if(241 < 236) {
	this.bus.emit('display?setColorgvar110r', 0x8B, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x45);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x59, 0x45, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(58 < 127) {
	this.bus.emit('display?setColorb', 0x75, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x47, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(229 < 75) {
	this.bus.emit('display?fillRectvar113', 0xBB, 0x7F);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0x7F, 0x89);
	
	}
	if(172 < 220) {
	this.bus.emit('display?fillRectxheightwidthy', 90, 80 - 6, 0xE8, 12, 20);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', 90, 80 - 6, 0xBA, 20, 12);
	
	}
	
	}
}

BreakoutGameBrowserRND.prototype.drawWalls = function() {
	if(90 < 157) {
	this.bus.emit('display?setColorb', 0x9F, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x6E, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(151 < 249) {
	this.bus.emit('display?setColorgvar110r', 0xF4, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x58);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x88, 0x58, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(240 < 48) {
	this.bus.emit('display?fillRectvar113', 0xF6, 0x0E);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0x0E, 0x0F);
	
	}
	if(66 < 221) {
	this.bus.emit('display?fillRectxheightwidthy', top_var - 1, left_var - 1, 0xEA, xcenter_var + 1, 1);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', top_var - 1, left_var - 1, 0xD0, 1, xcenter_var + 1);
	
	}
	if(107 < 177) {
	this.bus.emit('display?fillRectvar113', 0x48, 0x26);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0x26, 0x2E);
	
	}
	if(225 < 61) {
	this.bus.emit('display?fillRectxheightwidthy', bottom_var, left_var - 1, 0x73, xcenter_var + 1, 1);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', bottom_var, left_var - 1, 0xFA, 1, xcenter_var + 1);
	
	}
	if(132 < 28) {
	this.bus.emit('display?fillRectxheightwidthy', top_var, left_var - 1, 0xEB, 1, ycenter_var);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', top_var, left_var - 1, 0xAD, ycenter_var, 1);
	
	}
	if(113 < 99) {
	this.bus.emit('display?fillRectvar113', 0x28, 0xEE);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0xEE, 0x9D);
	
	}
	if(137 < 182) {
	this.bus.emit('display?fillRectvar113', 0x32, 0xF3);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0xF3, 0xC7);
	
	}
	if(220 < 221) {
	this.bus.emit('display?fillRectxheightwidthy', top_var, right_var, 0x50, 1, ycenter_var);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', top_var, right_var, 0xFE, ycenter_var, 1);
	
	}
}

BreakoutGameBrowserRND.prototype.bitIsSet = function(BreakoutGame_bitIsSet_variable_var, BreakoutGame_bitIsSet_bit_var) {
	return (((1 << BreakoutGame_bitIsSet_bit_var) & BreakoutGame_bitIsSet_variable_var) != 0);
}

BreakoutGameBrowserRND.prototype.createBricks = function() {
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

BreakoutGameBrowserRND.prototype.bricksLeft = function() {
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

BreakoutGameBrowserRND.prototype.drawBrick = function(BreakoutGame_drawBrick_x_var, BreakoutGame_drawBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_drawBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_drawBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	const w_var = (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2);
	const h_var = (this.BreakoutGame_BRICK_HEIGHT_var - 2);
	if(178 < 156) {
	this.bus.emit('display?setColorb', 0xA5, 89);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x15, 89);
	
	}
	if(225 < 204) {
	this.bus.emit('display?setColorgvar110r', 0xCA, 155, 103, 0x82);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', 103, 0x72, 0x82, 155);
	
	}
	if(66 < 136) {
	this.bus.emit('display?fillRectvar113', 0xDA, 0xD5);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0xD5, 0x17);
	
	}
	if(15 < 186) {
	this.bus.emit('display?fillRectxheightwidthy', by_var, bx_var, 0x5E, w_var, h_var);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', by_var, bx_var, 0xB1, h_var, w_var);
	
	}
	if(10 < 158) {
	this.bus.emit('display?setColorb', 0x98, 43);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x58, 43);
	
	}
	if(41 < 42) {
	this.bus.emit('display?setColorgvar110r', 0x15, 100, 56, 0x35);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', 56, 0xCF, 0x35, 100);
	
	}
	if(28 < 203) {
	this.bus.emit('display?drawRectyheightx', h_var, bx_var, 0xE0, by_var);
	
	} else {
	this.bus.emit('display?drawRectyheightx_bis', bx_var, h_var, 0x6A, by_var);
	
	}
	if(71 < 1) {
	this.bus.emit('display?drawRectwidthvar112', 0x23, w_var, 0x9B);
	
	} else {
	this.bus.emit('display?drawRectwidthvar112_bis', 0x54, 0x9B, w_var);
	
	}
}

BreakoutGameBrowserRND.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(60 < 9) {
	this.bus.emit('display?setColorgvar110r', 0x43, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x50);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x30, 0x50, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(213 < 161) {
	this.bus.emit('display?setColorb', 0x2C, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x89, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(158 < 7) {
	this.bus.emit('display?fillRectxheightwidthy', by_var, bx_var, 0x35, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), this.BreakoutGame_BRICK_HEIGHT_var - 2);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', by_var, bx_var, 0xEE, this.BreakoutGame_BRICK_HEIGHT_var - 2, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
	
	}
	if(17 < 82) {
	this.bus.emit('display?fillRectvar113', 0xF9, 0x64);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0x64, 0xF3);
	
	}
	this.BreakoutGame_bricks_var[BreakoutGame_removeBrick_y_var] = this.unsetBit(this.BreakoutGame_bricks_var[BreakoutGame_removeBrick_y_var]
	, BreakoutGame_removeBrick_x_var);
	this.bus.emit('bricks=', this.BreakoutGame_bricks_var);
}

BreakoutGameBrowserRND.prototype.collideBrick = function(BreakoutGame_collideBrick_xpos_var, BreakoutGame_collideBrick_ypos_var) {
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

BreakoutGameBrowserRND.prototype.drawLevel = function() {
	if(52 < 52) {
	this.bus.emit('display?setColorgvar110r', 0xFD, 158, 209, 0xA2);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', 209, 0x3B, 0xA2, 158);
	
	}
	if(233 < 244) {
	this.bus.emit('display?setColorb', 0xC5, 130);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xF8, 130);
	
	}
	if(62 < 209) {
	this.bus.emit('display?setBGColorvar111', 0x4E, 0x0F);
	
	} else {
	this.bus.emit('display?setBGColorvar111_bis', 0xD7, 0x4E);
	
	}
	if(94 < 187) {
	this.bus.emit('display?setBGColorgrb', 0x1C, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorgrb_bis', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xFF);
	
	}
	if(78 < 22) {
	this.bus.emit('display?setColorb', 0x29, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x85, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(17 < 38) {
	this.bus.emit('display?setColorgvar110r', 0xD1, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xF1);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x1F, 0xF1, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(80 < 170) {
	this.bus.emit('display?drawInteger_', 0x7E);
	
	} else {
	this.bus.emit('display?drawInteger__bis', 0x00);
	
	}
	if(179 < 65) {
	this.bus.emit('display?drawIntegerscalevar114vydigitsx', 0xC9, 2, 6, 0xED, this.BreakoutGame_level_var, 2, 2);
	
	} else {
	this.bus.emit('display?drawIntegerscalevar114vydigitsx_bis', this.BreakoutGame_level_var, 6, 2, 2, 0xF3, 0xC9, 2);
	
	}
}

BreakoutGameBrowserRND.prototype.incrementScore = function(BreakoutGame_incrementScore_diff_var) {
	this.BreakoutGame_score_var = this.BreakoutGame_score_var + BreakoutGame_incrementScore_diff_var;
	this.bus.emit('score=', this.BreakoutGame_score_var);
	if(this.BreakoutGame_score_var < 0) {
	this.BreakoutGame_score_var = 0;
	this.bus.emit('score=', this.BreakoutGame_score_var);
	
	}
	this.drawScore();
}

BreakoutGameBrowserRND.prototype.drawScore = function() {
	if(21 < 77) {
	this.bus.emit('display?setColorgvar110r', 0x68, 158, 209, 0x7B);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', 209, 0xB4, 0x7B, 158);
	
	}
	if(134 < 139) {
	this.bus.emit('display?setColorb', 0x84, 130);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x08, 130);
	
	}
	if(27 < 181) {
	this.bus.emit('display?setBGColorvar111', 0x40, 0xA0);
	
	} else {
	this.bus.emit('display?setBGColorvar111_bis', 0x62, 0x40);
	
	}
	if(108 < 218) {
	this.bus.emit('display?setBGColorgrb', 0xDE, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorgrb_bis', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xAD);
	
	}
	if(221 < 176) {
	this.bus.emit('display?drawIntegerscalevar114vydigitsx', 0xEA, 2, 58, 0x4E, this.BreakoutGame_score_var, 5, 2);
	
	} else {
	this.bus.emit('display?drawIntegerscalevar114vydigitsx_bis', this.BreakoutGame_score_var, 58, 2, 2, 0xD8, 0xEA, 5);
	
	}
	if(161 < 182) {
	this.bus.emit('display?drawInteger_', 0xC2);
	
	} else {
	this.bus.emit('display?drawInteger__bis', 0xC5);
	
	}
}

BreakoutGameBrowserRND.prototype.drawLives = function() {
	if(172 < 89) {
	this.bus.emit('display?setColorgvar110r', 0x92, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x5B);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x9C, 0x5B, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(29 < 239) {
	this.bus.emit('display?setColorb', 0x78, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xFB, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(74 < 236) {
	this.bus.emit('display?fillRectvar113', 0x03, 0xF0);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0xF0, 0xF1);
	
	}
	if(32 < 54) {
	this.bus.emit('display?fillRectxheightwidthy', 4, 124, 0x48, 24 + 6, 6);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', 4, 124, 0x52, 6, 24 + 6);
	
	}
	if(199 < 213) {
	this.bus.emit('display?setColorgvar110r', 0xB5, 183, 199, 0xC1);
	
	} else {
	this.bus.emit('display?setColorgvar110r_bis', 199, 0x57, 0xC1, 183);
	
	}
	if(167 < 143) {
	this.bus.emit('display?setColorb', 0xFD, 111);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x32, 111);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(114 < 196) {
	this.bus.emit('display?fillRectvar113', 0x4E, 0xA5);
	
	} else {
	this.bus.emit('display?fillRectvar113_bis', 0xA5, 0xE0);
	
	}
	if(154 < 42) {
	this.bus.emit('display?fillRectxheightwidthy', 4, 124 + (2 - i_var) * 12, 0x27, 6, 6);
	
	} else {
	this.bus.emit('display?fillRectxheightwidthy_bis', 4, 124 + (2 - i_var) * 12, 0x63, 6, 6);
	
	}
	i_var = i_var + 1;
	
	}
}

BreakoutGameBrowserRND.prototype.unsetBit = function(DefaultBreakoutGame_unsetBit_variable_var, DefaultBreakoutGame_unsetBit_bit_var) {
	return (DefaultBreakoutGame_unsetBit_variable_var & ~(1 << DefaultBreakoutGame_unsetBit_bit_var));
}

BreakoutGameBrowserRND.prototype.quit = function() {
	console.log(''+'done!');
}

BreakoutGameBrowserRND.prototype.timestamp = function() {
	return Date.now();
}

BreakoutGameBrowserRND.prototype.usedMemory = function() {
	return  -1;
}

BreakoutGameBrowserRND.prototype.rnd = function() {
	return Math.floor(Math.random() * Math.floor(246)) + 5;
}

BreakoutGameBrowserRND.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

BreakoutGameBrowserRND.prototype._delete = function() {
	this._statemachine = null;
	this._SC_instance = null;
	this.bus.removeAllListeners();
}

BreakoutGameBrowserRND.prototype._init = function() {
	this._SC_instance = new StateJS.Instance("SC_instance", this._statemachine);
	this.ready = true;
}

BreakoutGameBrowserRND.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SC_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

BreakoutGameBrowserRND.prototype.receivetimer_timeoutOnclock = function(var131, var108, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", var131:var131, var108:var108, id:id});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady_Ondisplay = function(var150) {
	this._receive({_port:"display", _msg:"displayReady_", var150:var150});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar119Ondisplay = function(var119, var151) {
	this._receive({_port:"display", _msg:"displayReadyvar119", var119:var119, var151:var151});
}

BreakoutGameBrowserRND.prototype.receivedisplayError_Ondisplay = function(var132) {
	this._receive({_port:"display", _msg:"displayError_", var132:var132});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar120Ondisplay = function(var133, var120) {
	this._receive({_port:"display", _msg:"displayErrorvar120", var133:var133, var120:var120});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady__bisOndisplay = function(var174) {
	this._receive({_port:"display", _msg:"displayReady__bis", var174:var174});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar119_bisOndisplay = function(var175, var119) {
	this._receive({_port:"display", _msg:"displayReadyvar119_bis", var175:var175, var119:var119});
}

BreakoutGameBrowserRND.prototype.receivedisplayError__bisOndisplay = function(var156) {
	this._receive({_port:"display", _msg:"displayError__bis", var156:var156});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar120_bisOndisplay = function(var157, var120) {
	this._receive({_port:"display", _msg:"displayErrorvar120_bis", var157:var157, var120:var120});
}

BreakoutGameBrowserRND.prototype.receiveposition_Oncontroller = function(var180) {
	this._receive({_port:"controller", _msg:"position_", var180:var180});
}

BreakoutGameBrowserRND.prototype.receivepositionyxvar122Oncontroller = function(y, var122, var181, x) {
	this._receive({_port:"controller", _msg:"positionyxvar122", y:y, var122:var122, var181:var181, x:x});
}

BreakoutGameBrowserRND.prototype.receiveposition__bisOncontroller = function(var184) {
	this._receive({_port:"controller", _msg:"position__bis", var184:var184});
}

BreakoutGameBrowserRND.prototype.receivepositionyxvar122_bisOncontroller = function(y, var122, x, var185) {
	this._receive({_port:"controller", _msg:"positionyxvar122_bis", y:y, var122:var122, x:x, var185:var185});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Ongame = function(var204) {
	this._receive({_port:"game", _msg:"lostBall_", var204:var204});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar127Ongame = function(var205, var127) {
	this._receive({_port:"game", _msg:"lostBallvar127", var205:var205, var127:var127});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Ongame = function(var206) {
	this._receive({_port:"game", _msg:"nextLevel_", var206:var206});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar128Ongame = function(var207, var128) {
	this._receive({_port:"game", _msg:"nextLevelvar128", var207:var207, var128:var128});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOngame = function(var208) {
	this._receive({_port:"game", _msg:"lostBall__bis", var208:var208});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar127_bisOngame = function(var127, var209) {
	this._receive({_port:"game", _msg:"lostBallvar127_bis", var127:var127, var209:var209});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOngame = function(var210) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var210:var210});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar128_bisOngame = function(var128, var211) {
	this._receive({_port:"game", _msg:"nextLevelvar128_bis", var128:var128, var211:var211});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Onpro_game = function(var204) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var204:var204});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar127Onpro_game = function(var205, var127) {
	this._receive({_port:"pro_game", _msg:"lostBallvar127", var205:var205, var127:var127});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Onpro_game = function(var206) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var206:var206});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar128Onpro_game = function(var207, var128) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar128", var207:var207, var128:var128});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOnpro_game = function(var208) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var208:var208});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar127_bisOnpro_game = function(var127, var209) {
	this._receive({_port:"pro_game", _msg:"lostBallvar127_bis", var127:var127, var209:var209});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOnpro_game = function(var210) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var210:var210});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar128_bisOnpro_game = function(var128, var211) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar128_bis", var128:var128, var211:var211});
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var127_var = function(BreakoutGame_SC_PLAY_game_lostBall_var127_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var127_var = BreakoutGame_SC_PLAY_game_lostBall_var127_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar128_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_var122_var = function(BreakoutGame_SC_controller_position_var122_var) {
	this.BreakoutGame_SC_controller_position_var122_var = BreakoutGame_SC_controller_position_var122_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var127_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var127_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var127_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var127_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positionyxvar122_var = function(BreakoutGame_SC_received_controller_positionyxvar122_var) {
	this.BreakoutGame_SC_received_controller_positionyxvar122_var = BreakoutGame_SC_received_controller_positionyxvar122_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar119_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar119_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var = BreakoutGame_SC_INIT_received_display_displayReadyvar119_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_position__var = function(BreakoutGame_SC_received_controller_position__var) {
	this.BreakoutGame_SC_received_controller_position__var = BreakoutGame_SC_received_controller_position__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar127_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar127_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var = BreakoutGame_SC_PLAY_received_game_lostBallvar127_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var128_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var128_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var128_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var128_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_display_displayReady_var119_var = function(BreakoutGame_SC_INIT_display_displayReady_var119_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var119_var = BreakoutGame_SC_INIT_display_displayReady_var119_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var128_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var128_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var128_var = BreakoutGame_SC_PLAY_game_nextLevel_var128_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tgame_lostBall_var127 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var127_var;
	result += '\n\treceived_game_nextLevelvar128 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar128_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\treceived_pro_game_lostBallvar127 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var;
	result += '\n\treceived_pro_game_nextLevelvar128 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tcontroller_position_var122 = ' + this.BreakoutGame_SC_controller_position_var122_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tpro_game_lostBall_var127 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var127_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\treceived_controller_positionyxvar122 = ' + this.BreakoutGame_SC_received_controller_positionyxvar122_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\treceived_display_displayReadyvar119 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar119_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\treceived_controller_position_ = ' + this.BreakoutGame_SC_received_controller_position__var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\treceived_game_lostBallvar127 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar127_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tpro_game_nextLevel_var128 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var128_var;
	result += '\n\tdisplay_displayReady_var119 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var119_var;
	result += '\n\tgame_nextLevel_var128 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var128_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '';
	return result;
}

