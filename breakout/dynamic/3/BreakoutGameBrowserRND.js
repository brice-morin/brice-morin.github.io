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
		if(94 < 168) {
		this.bus.emit('display?createxsize', this.BreakoutGame_XDISPSIZE_var, 0x74);
		
		} else {
		this.bus.emit('display?createxsize_bis', this.BreakoutGame_XDISPSIZE_var, 0xF1);
		
		}
		if(101 < 183) {
		this.bus.emit('display?createysizevar328', 0x2D, 0xFB, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?createysizevar328_bis', 0xFB, this.BreakoutGame_YDISPSIZE_var, 0x67);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xCF, 0x78, 0, 33), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(30 < 248) {
		this.bus.emit('display?update_', 0x9C);
		
		} else {
		this.bus.emit('display?update__bis', 0xB1);
		
		}
		if(91 < 142) {
		this.bus.emit('display?updatevar330', 0x7D, 0xCF);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0x39, 0x7D);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0x82, 0xFB, 0, period_const), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x5F, 0xA0, 0, 500), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(5 < 79) {
		this.bus.emit('display?updatevar330', 0x99, 0x8C);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0xD8, 0x99);
		
		}
		if(214 < 214) {
		this.bus.emit('display?update_', 0xE5);
		
		} else {
		this.bus.emit('display?update__bis', 0xED);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xBE, 0xF6, 0, 1000), 0);
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
		if(42 < 217) {
		this.bus.emit('display?updatevar330', 0x13, 0x8A);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0xB2, 0x13);
		
		}
		if(184 < 162) {
		this.bus.emit('display?update_', 0x95);
		
		} else {
		this.bus.emit('display?update__bis', 0xFA);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(61 < 201) {
		this.bus.emit('display?setColorvar322gr', 255, 255, 0xE2, 0xC5);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', 255, 255, 0x61, 0xE2);
		
		}
		if(146 < 237) {
		this.bus.emit('display?setColorb', 255, 0xA5);
		
		} else {
		this.bus.emit('display?setColorb_bis', 255, 0xD3);
		
		}
		if(178 < 83) {
		this.bus.emit('display?fillRectyheight', 0xE0, 30, 76);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', 76, 0xA4, 30);
		
		}
		if(10 < 167) {
		this.bus.emit('display?fillRectxwidthvar325', 0x51, 8, 0x11, 142);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 8, 142, 0x11, 0xE0);
		
		}
		if(222 < 53) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x37, 0x52);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x9D, 0x37);
		
		}
		if(3 < 32) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0xEF);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x80);
		
		}
		if(217 < 200) {
		this.bus.emit('display?fillRectyheight', 0x88, 31, 50);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', 50, 0x37, 31);
		
		}
		if(48 < 117) {
		this.bus.emit('display?fillRectxwidthvar325', 0x62, 9, 0xCE, 140);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 9, 140, 0xCE, 0xEA);
		
		}
		if(118 < 195) {
		this.bus.emit('display?setBGColorgr', this.BreakoutGame_fgcolor_var[0]
		, 0x9D, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setBGColorgr_bis', 0x96, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(140 < 239) {
		this.bus.emit('display?setBGColorvar323b', 0xA2, this.BreakoutGame_fgcolor_var[2]
		, 0xD5);
		
		} else {
		this.bus.emit('display?setBGColorvar323b_bis', 0xA2, 0x01, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(100 < 42) {
		this.bus.emit('display?setColorb', 130, 0x8D);
		
		} else {
		this.bus.emit('display?setColorb_bis', 130, 0x78);
		
		}
		if(219 < 107) {
		this.bus.emit('display?setColorvar322gr', 209, 158, 0x6A, 0xBE);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', 209, 158, 0xBC, 0x6A);
		
		}
		if(99 < 40) {
		this.bus.emit('display?drawIntegerxdigitsvar326scaley', 40, 5, 0x50, 23, 6, 0x23);
		
		} else {
		this.bus.emit('display?drawIntegerxdigitsvar326scaley_bis', 23, 40, 6, 5, 0x23, 0xD0);
		
		}
		if(99 < 112) {
		this.bus.emit('display?drawIntegerv', 0xD5, this.BreakoutGame_score_var);
		
		} else {
		this.bus.emit('display?drawIntegerv_bis', this.BreakoutGame_score_var, 0xEC);
		
		}
		if(236 < 180) {
		this.bus.emit('display?drawThingMLy', 0x6B, 87);
		
		} else {
		this.bus.emit('display?drawThingMLy_bis', 87, 0xF8);
		
		}
		if(68 < 138) {
		this.bus.emit('display?drawThingMLvar327x', 0x9D, 0xF9, 26);
		
		} else {
		this.bus.emit('display?drawThingMLvar327x_bis', 0xDB, 26, 0x9D);
		
		}
		if(249 < 247) {
		this.bus.emit('display?update_', 0xB0);
		
		} else {
		this.bus.emit('display?update__bis', 0x6B);
		
		}
		if(145 < 186) {
		this.bus.emit('display?updatevar330', 0xB7, 0x37);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0xAB, 0xB7);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	this._statemachine.to(null).when((positionvar334x_bis) => {
		return positionvar334x_bis._port === 'controller' && positionvar334x_bis._msg === 'positionvar334x_bis';
	}).effect((positionvar334x_bis) => {
		this.BreakoutGame_SC_received_controller_positionvar334x_var = true;
		this.BreakoutGame_SC_controller_position_var334_var = positionvar334x_bis.var334;
		this.BreakoutGame_SC_controller_position_x_var = positionvar334x_bis.x;
		if(this.BreakoutGame_SC_received_controller_positiony_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar334x_var = false;
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		
		}
	});
	this._statemachine.to(null).when((positiony) => {
		return positiony._port === 'controller' && positiony._msg === 'positiony';
	}).effect((positiony) => {
		this.BreakoutGame_SC_received_controller_positiony_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positiony.y;
		if(this.BreakoutGame_SC_received_controller_positionvar334x_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		this.BreakoutGame_SC_received_controller_positionvar334x_var = false;
		
		}
	});
	this._statemachine.to(null).when((positiony_bis) => {
		return positiony_bis._port === 'controller' && positiony_bis._msg === 'positiony_bis';
	}).effect((positiony_bis) => {
		this.BreakoutGame_SC_received_controller_positiony_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positiony_bis.y;
		if(this.BreakoutGame_SC_received_controller_positionvar334x_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		this.BreakoutGame_SC_received_controller_positionvar334x_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar334x) => {
		return positionvar334x._port === 'controller' && positionvar334x._msg === 'positionvar334x';
	}).effect((positionvar334x) => {
		this.BreakoutGame_SC_received_controller_positionvar334x_var = true;
		this.BreakoutGame_SC_controller_position_var334_var = positionvar334x.var334;
		this.BreakoutGame_SC_controller_position_x_var = positionvar334x.x;
		if(this.BreakoutGame_SC_received_controller_positiony_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar334x_var = false;
		this.BreakoutGame_SC_received_controller_positiony_var = false;
		
		}
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar339) => {
		return lostBallvar339._port === 'pro_game' && lostBallvar339._msg === 'lostBallvar339' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar339) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xDE, 0xA5), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar339) => {
		return lostBallvar339._port === 'pro_game' && lostBallvar339._msg === 'lostBallvar339' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar339) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar340_bis) => {
		return nextLevelvar340_bis._port === 'pro_game' && nextLevelvar340_bis._msg === 'nextLevelvar340_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar340_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x2F, 0xF2), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar340_bis) => {
		return nextLevelvar340_bis._port === 'pro_game' && nextLevelvar340_bis._msg === 'nextLevelvar340_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar340_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x2F, 0x49), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar339_bis) => {
		return lostBallvar339_bis._port === 'pro_game' && lostBallvar339_bis._msg === 'lostBallvar339_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar339_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xDE, 0xED), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar339_bis) => {
		return lostBallvar339_bis._port === 'pro_game' && lostBallvar339_bis._msg === 'lostBallvar339_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar339_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x2F, 0x4A), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar340) => {
		return nextLevelvar340._port === 'pro_game' && nextLevelvar340._msg === 'nextLevelvar340' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar340) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x2F, 0x97), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar340) => {
		return nextLevelvar340._port === 'pro_game' && nextLevelvar340._msg === 'nextLevelvar340' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar340) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xDE, 0xCA), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xDE, 0x53), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar339) => {
		return lostBallvar339._port === 'game' && lostBallvar339._msg === 'lostBallvar339' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar339) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xE4, 0xA3), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar339) => {
		return lostBallvar339._port === 'game' && lostBallvar339._msg === 'lostBallvar339' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar339) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar340_bis) => {
		return nextLevelvar340_bis._port === 'game' && nextLevelvar340_bis._msg === 'nextLevelvar340_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar340_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x7E, 0x9C), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar340_bis) => {
		return nextLevelvar340_bis._port === 'game' && nextLevelvar340_bis._msg === 'nextLevelvar340_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar340_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x7E, 0xF8), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar339_bis) => {
		return lostBallvar339_bis._port === 'game' && lostBallvar339_bis._msg === 'lostBallvar339_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar339_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xE4, 0x58), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar339_bis) => {
		return lostBallvar339_bis._port === 'game' && lostBallvar339_bis._msg === 'lostBallvar339_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar339_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x7E, 0x3F), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar340) => {
		return nextLevelvar340._port === 'game' && nextLevelvar340._msg === 'nextLevelvar340' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar340) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x7E, 0x93), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar340) => {
		return nextLevelvar340._port === 'game' && nextLevelvar340._msg === 'nextLevelvar340' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar340) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xE4, 0x72), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xE4, 0x9F), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar331_bis) => {
		return displayReadyvar331_bis._port === 'display' && displayReadyvar331_bis._msg === 'displayReadyvar331_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar331_bis) => {
		if(89 < 39) {
		this.bus.emit('display?clearvar321', 0x7B, 0x8F);
		
		} else {
		this.bus.emit('display?clearvar321_bis', 0xCB, 0x8F);
		
		}
		if(174 < 146) {
		this.bus.emit('display?clear_', 0xCE);
		
		} else {
		this.bus.emit('display?clear__bis', 0x1A);
		
		}
		this.initColors();
		if(201 < 46) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x77, 0x4D);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0xA8, 0x77);
		
		}
		if(176 < 152) {
		this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
		, 0x8F);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
		, 0x03);
		
		}
		if(11 < 248) {
		this.bus.emit('display?fillRectyheight', 0x11, 0, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', this.BreakoutGame_YDISPSIZE_var, 0xFC, 0);
		
		}
		if(158 < 108) {
		this.bus.emit('display?fillRectxwidthvar325', 0xC6, 0, 0xDD, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0xDD, 0x0F);
		
		}
		if(251 < 86) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x55, 0x3F);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xC0, 0x55);
		
		}
		if(111 < 103) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0xDE);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0xF9);
		
		}
		if(3 < 164) {
		this.bus.emit('display?fillRectyheight', 0x50, 0, 14);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', 14, 0x33, 0);
		
		}
		if(104 < 59) {
		this.bus.emit('display?fillRectxwidthvar325', 0x53, 0, 0x3B, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0x3B, 0x54);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar331_bis) => {
		return displayReadyvar331_bis._port === 'display' && displayReadyvar331_bis._msg === 'displayReadyvar331_bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar331_bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var);
	}).effect((displayReady__bis) => {
		if(15 < 189) {
		this.bus.emit('display?clear_', 0xCD);
		
		} else {
		this.bus.emit('display?clear__bis', 0xA0);
		
		}
		if(119 < 167) {
		this.bus.emit('display?clearvar321', 0x66, 0x8F);
		
		} else {
		this.bus.emit('display?clearvar321_bis', 0x5B, 0x8F);
		
		}
		this.initColors();
		if(121 < 44) {
		this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
		, 0x17);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
		, 0x58);
		
		}
		if(91 < 120) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x77, 0xDD);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x38, 0x77);
		
		}
		if(167 < 233) {
		this.bus.emit('display?fillRectxwidthvar325', 0x60, 0, 0xDD, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0xDD, 0xCD);
		
		}
		if(43 < 16) {
		this.bus.emit('display?fillRectyheight', 0xB7, 0, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', this.BreakoutGame_YDISPSIZE_var, 0x78, 0);
		
		}
		if(255 < 143) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x55, 0xEC);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x10, 0x55);
		
		}
		if(106 < 163) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0x6B);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0xEB);
		
		}
		if(151 < 50) {
		this.bus.emit('display?fillRectxwidthvar325', 0xD3, 0, 0x3B, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0x3B, 0xA0);
		
		}
		if(130 < 27) {
		this.bus.emit('display?fillRectyheight', 0x2E, 0, 14);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', 14, 0x88, 0);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var));
	}).effect((displayReady__bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar331) => {
		return displayReadyvar331._port === 'display' && displayReadyvar331._msg === 'displayReadyvar331' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar331) => {
		if(89 < 39) {
		this.bus.emit('display?clearvar321', 0xCC, 0x8F);
		
		} else {
		this.bus.emit('display?clearvar321_bis', 0xA1, 0x8F);
		
		}
		if(174 < 146) {
		this.bus.emit('display?clear_', 0xEF);
		
		} else {
		this.bus.emit('display?clear__bis', 0x2A);
		
		}
		this.initColors();
		if(201 < 46) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x77, 0x04);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x1F, 0x77);
		
		}
		if(176 < 152) {
		this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
		, 0x1B);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
		, 0x18);
		
		}
		if(11 < 248) {
		this.bus.emit('display?fillRectyheight', 0x86, 0, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', this.BreakoutGame_YDISPSIZE_var, 0x05, 0);
		
		}
		if(158 < 108) {
		this.bus.emit('display?fillRectxwidthvar325', 0xDE, 0, 0xDD, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0xDD, 0x61);
		
		}
		if(251 < 86) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x55, 0xA3);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x64, 0x55);
		
		}
		if(111 < 103) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0xC3);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x38);
		
		}
		if(3 < 164) {
		this.bus.emit('display?fillRectyheight', 0xD8, 0, 14);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', 14, 0xA7, 0);
		
		}
		if(104 < 59) {
		this.bus.emit('display?fillRectxwidthvar325', 0x17, 0, 0x3B, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0x3B, 0x1F);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar331) => {
		return displayReadyvar331._port === 'display' && displayReadyvar331._msg === 'displayReadyvar331' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar331) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var);
	}).effect((displayReady_) => {
		if(15 < 189) {
		this.bus.emit('display?clear_', 0xE5);
		
		} else {
		this.bus.emit('display?clear__bis', 0x57);
		
		}
		if(119 < 167) {
		this.bus.emit('display?clearvar321', 0xC7, 0x8F);
		
		} else {
		this.bus.emit('display?clearvar321_bis', 0xB8, 0x8F);
		
		}
		this.initColors();
		if(121 < 44) {
		this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
		, 0xFF);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
		, 0x30);
		
		}
		if(91 < 120) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x77, 0x21);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x9E, 0x77);
		
		}
		if(167 < 233) {
		this.bus.emit('display?fillRectxwidthvar325', 0x53, 0, 0xDD, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0xDD, 0x18);
		
		}
		if(43 < 16) {
		this.bus.emit('display?fillRectyheight', 0xAF, 0, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', this.BreakoutGame_YDISPSIZE_var, 0x0C, 0);
		
		}
		if(255 < 143) {
		this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x55, 0xD4);
		
		} else {
		this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x4F, 0x55);
		
		}
		if(106 < 163) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0x8E);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0xBE);
		
		}
		if(151 < 50) {
		this.bus.emit('display?fillRectxwidthvar325', 0x7D, 0, 0x3B, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectxwidthvar325_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0x3B, 0xAE);
		
		}
		if(130 < 27) {
		this.bus.emit('display?fillRectyheight', 0xA7, 0, 14);
		
		} else {
		this.bus.emit('display?fillRectyheight_bis', 14, 0x20, 0);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var));
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
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(239 < 180) {
		this.bus.emit('display?updatevar330', 0xD6, 0x0F);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0x7E, 0xD6);
		
		}
		if(131 < 17) {
		this.bus.emit('display?update_', 0xD5);
		
		} else {
		this.bus.emit('display?update__bis', 0x3E);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x06, 0x57, 0, 33), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(62 < 30) {
		this.bus.emit('display?update_', 0x28);
		
		} else {
		this.bus.emit('display?update__bis', 0x49);
		
		}
		if(183 < 166) {
		this.bus.emit('display?updatevar330', 0x68, 0x52);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0x03, 0x68);
		
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
		if(44 < 2) {
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0x25);
		
		} else {
		this.bus.emit('sound?tonetime_bis', this.BreakoutGame_tone_duration_var, 0xD7);
		
		}
		if(96 < 53) {
		this.bus.emit('sound?tonefreqvar338', 0x6F, this.BreakoutGame_tone2_var, 0xED);
		
		} else {
		this.bus.emit('sound?tonefreqvar338_bis', 0x92, 0xED, this.BreakoutGame_tone2_var);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(207 < 97) {
		this.bus.emit('sound?tonefreqvar338', 0x47, this.BreakoutGame_tone2_var, 0xB5);
		
		} else {
		this.bus.emit('sound?tonefreqvar338_bis', 0x9B, 0xB5, this.BreakoutGame_tone2_var);
		
		}
		if(133 < 210) {
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0x75);
		
		} else {
		this.bus.emit('sound?tonetime_bis', this.BreakoutGame_tone_duration_var, 0xDE);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(129 < 252) {
		this.bus.emit('sound?tonefreqvar338', 0x50, this.BreakoutGame_tone2_var, 0xA3);
		
		} else {
		this.bus.emit('sound?tonefreqvar338_bis', 0x3D, 0xA3, this.BreakoutGame_tone2_var);
		
		}
		if(203 < 136) {
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0x25);
		
		} else {
		this.bus.emit('sound?tonetime_bis', this.BreakoutGame_tone_duration_var, 0x35);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(208 < 178) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0xC1), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0xDC), 0);
		
		}
		if(125 < 10) {
		setTimeout(() => this.bus.emit('game?lostBallvar339', 0x99, 0x57), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar339_bis', 0x99, 0x57), 0);
		
		}
		if(208 < 42) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar339', 0xF5, 0x31), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar339_bis', 0x05, 0x31), 0);
		
		}
		if(148 < 56) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0xAD), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0xE3), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(155 < 30) {
		this.bus.emit('sound?tonefreqvar338', 0x34, this.BreakoutGame_tone2_var, 0xC0);
		
		} else {
		this.bus.emit('sound?tonefreqvar338_bis', 0x92, 0xC0, this.BreakoutGame_tone2_var);
		
		}
		if(20 < 41) {
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0xB3);
		
		} else {
		this.bus.emit('sound?tonetime_bis', this.BreakoutGame_tone_duration_var, 0xB9);
		
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
		if(131 < 115) {
		this.bus.emit('sound?tonetime', this.BreakoutGame_tone_duration_var, 0x15);
		
		} else {
		this.bus.emit('sound?tonetime_bis', this.BreakoutGame_tone_duration_var, 0x63);
		
		}
		if(136 < 153) {
		this.bus.emit('sound?tonefreqvar338', 0x50, this.BreakoutGame_tone1_var, 0x54);
		
		} else {
		this.bus.emit('sound?tonefreqvar338_bis', 0xE2, 0x54, this.BreakoutGame_tone1_var);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(179 < 126) {
		setTimeout(() => this.bus.emit('game?nextLevelvar340', 0x47, 0x7D), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar340_bis', 0x7D, 0x17), 0);
		
		}
		if(48 < 80) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0x1B), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0x1C), 0);
		
		}
		if(35 < 13) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0x68), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0x78), 0);
		
		}
		if(52 < 235) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar340', 0xC0, 0x68), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar340_bis', 0x68, 0x5A), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(249 < 148) {
		const padx_const = this.BreakoutGame_padx_var;
		const by_const = this.BreakoutGame_by_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadxballxvar335bally', padx_const, by_const, bx_const, 0x23, 0x8E), 0);
		
		} else {
		const padx_const = this.BreakoutGame_padx_var;
		const by_const = this.BreakoutGame_by_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadxballxvar335bally_bis', padx_const, by_const, 0x8E, bx_const, 0x02), 0);
		
		}
		if(41 < 215) {
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApady', 0x9B, pady_const), 0);
		
		} else {
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApady_bis', pady_const, 0xC5), 0);
		
		}
		if(245 < 204) {
		this.bus.emit('display?update_', 0xB7);
		
		} else {
		this.bus.emit('display?update__bis', 0xDC);
		
		}
		if(14 < 67) {
		this.bus.emit('display?updatevar330', 0x90, 0x60);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0x59, 0x90);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0x4A, 0x3E, 0, period_const), 0);
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
	if(183 < 219) {
	this.bus.emit('display?setBGColorvar323b', 0xE5, this.BreakoutGame_bgcolor_var[2]
	, 0x6C);
	
	} else {
	this.bus.emit('display?setBGColorvar323b_bis', 0xE5, 0x25, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(9 < 94) {
	this.bus.emit('display?setBGColorgr', this.BreakoutGame_bgcolor_var[0]
	, 0xCC, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorgr_bis', 0xD8, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(111 < 69) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x9C, 0xCC);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x7A, 0x9C);
	
	}
	if(3 < 96) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0xC1);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0xB7);
	
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
	if(50 < 232) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xCD, 0x01);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xD2, 0xCD);
	
	}
	if(71 < 190) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x45);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x64);
	
	}
	if(162 < 169) {
	this.bus.emit('display?fillRectxwidthvar325', 0x37, this.BreakoutGame_prevBX_var, 0xA8, bs_var);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', this.BreakoutGame_prevBX_var, bs_var, 0xA8, 0x6D);
	
	}
	if(170 < 254) {
	this.bus.emit('display?fillRectyheight', 0x83, this.BreakoutGame_prevBY_var, bs_var);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', bs_var, 0xD9, this.BreakoutGame_prevBY_var);
	
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
	if(142 < 11) {
	this.bus.emit('display?setColorvar322gr', 199, 183, 0x8C, 0x1D);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', 199, 183, 0xBF, 0x8C);
	
	}
	if(253 < 132) {
	this.bus.emit('display?setColorb', 111, 0xD2);
	
	} else {
	this.bus.emit('display?setColorb_bis', 111, 0x7A);
	
	}
	if(155 < 55) {
	this.bus.emit('display?fillRectxwidthvar325', 0x81, this.BreakoutGame_prevBX_var, 0x35, bs_var);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', this.BreakoutGame_prevBX_var, bs_var, 0x35, 0xDA);
	
	}
	if(26 < 249) {
	this.bus.emit('display?fillRectyheight', 0x3F, this.BreakoutGame_prevBY_var, bs_var);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', bs_var, 0x2A, this.BreakoutGame_prevBY_var);
	
	}
}

BreakoutGameBrowserRND.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(93 < 214) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x30, 0x12);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x2B, 0x30);
	
	}
	if(1 < 19) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0xC1);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x8A);
	
	}
	if(242 < 157) {
	this.bus.emit('display?fillRectyheight', 0x5C, this.BreakoutGame_prevPY_var, 4);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', 4, 0x8E, this.BreakoutGame_prevPY_var);
	
	}
	if(60 < 197) {
	this.bus.emit('display?fillRectxwidthvar325', 0x03, this.BreakoutGame_prevPX_var, 0x2B, ps_var);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', this.BreakoutGame_prevPX_var, ps_var, 0x2B, 0xDC);
	
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
	if(165 < 28) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x11, 0xEB);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xFF, 0x11);
	
	}
	if(31 < 143) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x8A);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0xFF);
	
	}
	if(91 < 145) {
	this.bus.emit('display?fillRectyheight', 0x83, this.BreakoutGame_prevPY_var, 4);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', 4, 0xD6, this.BreakoutGame_prevPY_var);
	
	}
	if(247 < 43) {
	this.bus.emit('display?fillRectxwidthvar325', 0x47, this.BreakoutGame_prevPX_var, 0xB1, ps_var);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', this.BreakoutGame_prevPX_var, ps_var, 0xB1, 0x30);
	
	}
}

BreakoutGameBrowserRND.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(191 < 47) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x3A, 0xC1);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x7A, 0x3A);
	
	}
	if(73 < 225) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x9F);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x9E);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(202 < 7) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0xC6);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x07);
	
	}
	if(22 < 186) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x83, 0x7B);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xB8, 0x83);
	
	}
	if(86 < 132) {
	this.bus.emit('display?setBGColorvar323b', 0x60, this.BreakoutGame_bgcolor_var[2]
	, 0x67);
	
	} else {
	this.bus.emit('display?setBGColorvar323b_bis', 0x60, 0xAC, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(220 < 12) {
	this.bus.emit('display?setBGColorgr', this.BreakoutGame_bgcolor_var[0]
	, 0xDE, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorgr_bis', 0x8B, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(199 < 24) {
	this.bus.emit('display?drawIntegerxdigitsvar326scaley', 90, 1, 0x43, 80 - 6, 4, 0x6A);
	
	} else {
	this.bus.emit('display?drawIntegerxdigitsvar326scaley_bis', 80 - 6, 90, 4, 1, 0x6A, 0x7E);
	
	}
	if(8 < 35) {
	this.bus.emit('display?drawIntegerv', 0x2B, BreakoutGame_drawCountDown_c_var);
	
	} else {
	this.bus.emit('display?drawIntegerv_bis', BreakoutGame_drawCountDown_c_var, 0xDF);
	
	}
	
	} else {
	if(75 < 162) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x6A, 0xE5);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xBC, 0x6A);
	
	}
	if(199 < 209) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0xAB);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x0B);
	
	}
	if(121 < 23) {
	this.bus.emit('display?fillRectyheight', 0x5F, 90, 20);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', 20, 0x93, 90);
	
	}
	if(186 < 211) {
	this.bus.emit('display?fillRectxwidthvar325', 0xEC, 80 - 6, 0xDB, 12);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', 80 - 6, 12, 0xDB, 0xC4);
	
	}
	
	}
}

BreakoutGameBrowserRND.prototype.drawWalls = function() {
	if(242 < 92) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0xA9);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x59);
	
	}
	if(4 < 66) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x67, 0xCA);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xDF, 0x67);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(151 < 25) {
	this.bus.emit('display?fillRectxwidthvar325', 0x36, left_var - 1, 0x1D, xcenter_var + 1);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', left_var - 1, xcenter_var + 1, 0x1D, 0x4D);
	
	}
	if(155 < 202) {
	this.bus.emit('display?fillRectyheight', 0x40, top_var - 1, 1);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', 1, 0xB2, top_var - 1);
	
	}
	if(16 < 166) {
	this.bus.emit('display?fillRectxwidthvar325', 0xEE, left_var - 1, 0xBC, xcenter_var + 1);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', left_var - 1, xcenter_var + 1, 0xBC, 0x4C);
	
	}
	if(41 < 222) {
	this.bus.emit('display?fillRectyheight', 0xF5, bottom_var, 1);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', 1, 0x07, bottom_var);
	
	}
	if(251 < 100) {
	this.bus.emit('display?fillRectyheight', 0xBF, top_var, ycenter_var);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', ycenter_var, 0xE4, top_var);
	
	}
	if(0 < 73) {
	this.bus.emit('display?fillRectxwidthvar325', 0xB1, left_var - 1, 0xC7, 1);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', left_var - 1, 1, 0xC7, 0xE9);
	
	}
	if(103 < 231) {
	this.bus.emit('display?fillRectxwidthvar325', 0x0C, right_var, 0x3B, 1);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', right_var, 1, 0x3B, 0x3B);
	
	}
	if(251 < 111) {
	this.bus.emit('display?fillRectyheight', 0xBA, top_var, ycenter_var);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', ycenter_var, 0x8D, top_var);
	
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
	if(12 < 108) {
	this.bus.emit('display?setColorb', 89, 0xD5);
	
	} else {
	this.bus.emit('display?setColorb_bis', 89, 0x0E);
	
	}
	if(94 < 206) {
	this.bus.emit('display?setColorvar322gr', 103, 155, 0xD8, 0x89);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', 103, 155, 0x8F, 0xD8);
	
	}
	if(110 < 167) {
	this.bus.emit('display?fillRectyheight', 0xE0, by_var, h_var);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', h_var, 0xCC, by_var);
	
	}
	if(131 < 0) {
	this.bus.emit('display?fillRectxwidthvar325', 0x27, bx_var, 0x9B, w_var);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', bx_var, w_var, 0x9B, 0x1F);
	
	}
	if(159 < 237) {
	this.bus.emit('display?setColorvar322gr', 56, 100, 0x7C, 0xAE);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', 56, 100, 0xE3, 0x7C);
	
	}
	if(19 < 122) {
	this.bus.emit('display?setColorb', 43, 0xE5);
	
	} else {
	this.bus.emit('display?setColorb_bis', 43, 0x26);
	
	}
	if(5 < 124) {
	this.bus.emit('display?drawRectvar324xwidthheight', w_var, 0xA4, 0x5C, h_var, bx_var);
	
	} else {
	this.bus.emit('display?drawRectvar324xwidthheight_bis', w_var, 0xA4, bx_var, h_var, 0xDC);
	
	}
	if(139 < 231) {
	this.bus.emit('display?drawRecty', by_var, 0xDA);
	
	} else {
	this.bus.emit('display?drawRecty_bis', by_var, 0x13);
	
	}
}

BreakoutGameBrowserRND.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(44 < 97) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x05);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x8C);
	
	}
	if(54 < 212) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xC6, 0x78);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x26, 0xC6);
	
	}
	if(137 < 191) {
	this.bus.emit('display?fillRectyheight', 0xC6, by_var, this.BreakoutGame_BRICK_HEIGHT_var - 2);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x60, by_var);
	
	}
	if(87 < 6) {
	this.bus.emit('display?fillRectxwidthvar325', 0x37, bx_var, 0xA1, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', bx_var, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), 0xA1, 0x88);
	
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
	if(112 < 120) {
	this.bus.emit('display?setColorb', 130, 0x75);
	
	} else {
	this.bus.emit('display?setColorb_bis', 130, 0x6F);
	
	}
	if(95 < 182) {
	this.bus.emit('display?setColorvar322gr', 209, 158, 0x35, 0xE8);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', 209, 158, 0xDE, 0x35);
	
	}
	if(211 < 40) {
	this.bus.emit('display?setBGColorvar323b', 0x37, this.BreakoutGame_fgcolor_var[2]
	, 0xBF);
	
	} else {
	this.bus.emit('display?setBGColorvar323b_bis', 0x37, 0x85, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(52 < 44) {
	this.bus.emit('display?setBGColorgr', this.BreakoutGame_fgcolor_var[0]
	, 0xF1, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorgr_bis', 0x5B, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(158 < 155) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0xFD);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x76);
	
	}
	if(106 < 245) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x48, 0x95);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x18, 0x48);
	
	}
	if(229 < 120) {
	this.bus.emit('display?drawIntegerxdigitsvar326scaley', 2, 2, 0x76, 6, 2, 0xA4);
	
	} else {
	this.bus.emit('display?drawIntegerxdigitsvar326scaley_bis', 6, 2, 2, 2, 0xA4, 0x08);
	
	}
	if(155 < 179) {
	this.bus.emit('display?drawIntegerv', 0x9F, this.BreakoutGame_level_var);
	
	} else {
	this.bus.emit('display?drawIntegerv_bis', this.BreakoutGame_level_var, 0xE3);
	
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
	if(90 < 105) {
	this.bus.emit('display?setColorb', 130, 0xB6);
	
	} else {
	this.bus.emit('display?setColorb_bis', 130, 0x0B);
	
	}
	if(14 < 76) {
	this.bus.emit('display?setColorvar322gr', 209, 158, 0x31, 0x7F);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', 209, 158, 0x8E, 0x31);
	
	}
	if(20 < 198) {
	this.bus.emit('display?setBGColorgr', this.BreakoutGame_fgcolor_var[0]
	, 0xE5, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorgr_bis', 0x63, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(206 < 56) {
	this.bus.emit('display?setBGColorvar323b', 0xB5, this.BreakoutGame_fgcolor_var[2]
	, 0x9D);
	
	} else {
	this.bus.emit('display?setBGColorvar323b_bis', 0xB5, 0x35, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(144 < 255) {
	this.bus.emit('display?drawIntegerv', 0x0F, this.BreakoutGame_score_var);
	
	} else {
	this.bus.emit('display?drawIntegerv_bis', this.BreakoutGame_score_var, 0x07);
	
	}
	if(110 < 244) {
	this.bus.emit('display?drawIntegerxdigitsvar326scaley', 2, 5, 0x44, 58, 2, 0x94);
	
	} else {
	this.bus.emit('display?drawIntegerxdigitsvar326scaley_bis', 58, 2, 2, 5, 0x94, 0xB1);
	
	}
}

BreakoutGameBrowserRND.prototype.drawLives = function() {
	if(144 < 102) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0xE6);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x59);
	
	}
	if(73 < 168) {
	this.bus.emit('display?setColorvar322gr', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xE2, 0xA0);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x40, 0xE2);
	
	}
	if(12 < 117) {
	this.bus.emit('display?fillRectxwidthvar325', 0xC9, 124, 0xF9, 24 + 6);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', 124, 24 + 6, 0xF9, 0x33);
	
	}
	if(5 < 70) {
	this.bus.emit('display?fillRectyheight', 0x50, 4, 6);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', 6, 0xCE, 4);
	
	}
	if(241 < 100) {
	this.bus.emit('display?setColorb', 111, 0x5E);
	
	} else {
	this.bus.emit('display?setColorb_bis', 111, 0xA5);
	
	}
	if(197 < 166) {
	this.bus.emit('display?setColorvar322gr', 199, 183, 0x6F, 0xFC);
	
	} else {
	this.bus.emit('display?setColorvar322gr_bis', 199, 183, 0xDB, 0x6F);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(123 < 73) {
	this.bus.emit('display?fillRectyheight', 0xF0, 4, 6);
	
	} else {
	this.bus.emit('display?fillRectyheight_bis', 6, 0x4B, 4);
	
	}
	if(215 < 187) {
	this.bus.emit('display?fillRectxwidthvar325', 0xFD, 124 + (2 - i_var) * 12, 0x8D, 6);
	
	} else {
	this.bus.emit('display?fillRectxwidthvar325_bis', 124 + (2 - i_var) * 12, 6, 0x8D, 0x38);
	
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

BreakoutGameBrowserRND.prototype.receivetimer_timeoutOnclock = function(var341, id, var320) {
	this._receive({_port:"clock", _msg:"timer_timeout", var341:var341, id:id, var320:var320});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady_Ondisplay = function(var366) {
	this._receive({_port:"display", _msg:"displayReady_", var366:var366});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar331Ondisplay = function(var367, var331) {
	this._receive({_port:"display", _msg:"displayReadyvar331", var367:var367, var331:var331});
}

BreakoutGameBrowserRND.prototype.receivedisplayError_Ondisplay = function(var358) {
	this._receive({_port:"display", _msg:"displayError_", var358:var358});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar332Ondisplay = function(var359, var332) {
	this._receive({_port:"display", _msg:"displayErrorvar332", var359:var359, var332:var332});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady__bisOndisplay = function(var390) {
	this._receive({_port:"display", _msg:"displayReady__bis", var390:var390});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar331_bisOndisplay = function(var391, var331) {
	this._receive({_port:"display", _msg:"displayReadyvar331_bis", var391:var391, var331:var331});
}

BreakoutGameBrowserRND.prototype.receivedisplayError__bisOndisplay = function(var382) {
	this._receive({_port:"display", _msg:"displayError__bis", var382:var382});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar332_bisOndisplay = function(var383, var332) {
	this._receive({_port:"display", _msg:"displayErrorvar332_bis", var383:var383, var332:var332});
}

BreakoutGameBrowserRND.prototype.receivepositionyOncontroller = function(y, var394) {
	this._receive({_port:"controller", _msg:"positiony", y:y, var394:var394});
}

BreakoutGameBrowserRND.prototype.receivepositionvar334xOncontroller = function(var334, var395, x) {
	this._receive({_port:"controller", _msg:"positionvar334x", var334:var334, var395:var395, x:x});
}

BreakoutGameBrowserRND.prototype.receivepositiony_bisOncontroller = function(var398, y) {
	this._receive({_port:"controller", _msg:"positiony_bis", var398:var398, y:y});
}

BreakoutGameBrowserRND.prototype.receivepositionvar334x_bisOncontroller = function(var399, var334, x) {
	this._receive({_port:"controller", _msg:"positionvar334x_bis", var399:var399, var334:var334, x:x});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Ongame = function(var418) {
	this._receive({_port:"game", _msg:"lostBall_", var418:var418});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar339Ongame = function(var419, var339) {
	this._receive({_port:"game", _msg:"lostBallvar339", var419:var419, var339:var339});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Ongame = function(var416) {
	this._receive({_port:"game", _msg:"nextLevel_", var416:var416});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar340Ongame = function(var417, var340) {
	this._receive({_port:"game", _msg:"nextLevelvar340", var417:var417, var340:var340});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOngame = function(var422) {
	this._receive({_port:"game", _msg:"lostBall__bis", var422:var422});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar339_bisOngame = function(var423, var339) {
	this._receive({_port:"game", _msg:"lostBallvar339_bis", var423:var423, var339:var339});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOngame = function(var420) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var420:var420});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar340_bisOngame = function(var340, var421) {
	this._receive({_port:"game", _msg:"nextLevelvar340_bis", var340:var340, var421:var421});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Onpro_game = function(var418) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var418:var418});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar339Onpro_game = function(var419, var339) {
	this._receive({_port:"pro_game", _msg:"lostBallvar339", var419:var419, var339:var339});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Onpro_game = function(var416) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var416:var416});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar340Onpro_game = function(var417, var340) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar340", var417:var417, var340:var340});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOnpro_game = function(var422) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var422:var422});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar339_bisOnpro_game = function(var423, var339) {
	this._receive({_port:"pro_game", _msg:"lostBallvar339_bis", var423:var423, var339:var339});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOnpro_game = function(var420) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var420:var420});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar340_bisOnpro_game = function(var340, var421) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar340_bis", var340:var340, var421:var421});
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

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positionvar334x_var = function(BreakoutGame_SC_received_controller_positionvar334x_var) {
	this.BreakoutGame_SC_received_controller_positionvar334x_var = BreakoutGame_SC_received_controller_positionvar334x_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var339_var = function(BreakoutGame_SC_PLAY_game_lostBall_var339_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var339_var = BreakoutGame_SC_PLAY_game_lostBall_var339_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar340_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var;
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

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_var334_var = function(BreakoutGame_SC_controller_position_var334_var) {
	this.BreakoutGame_SC_controller_position_var334_var = BreakoutGame_SC_controller_position_var334_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var;
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

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
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

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var339_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var339_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var339_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var339_var;
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

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar331_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar331_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var = BreakoutGame_SC_INIT_received_display_displayReadyvar331_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positiony_var = function(BreakoutGame_SC_received_controller_positiony_var) {
	this.BreakoutGame_SC_received_controller_positiony_var = BreakoutGame_SC_received_controller_positiony_var;
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

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar339_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar339_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var = BreakoutGame_SC_PLAY_received_game_lostBallvar339_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var340_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var340_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var340_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var340_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_display_displayReady_var331_var = function(BreakoutGame_SC_INIT_display_displayReady_var331_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var331_var = BreakoutGame_SC_INIT_display_displayReady_var331_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var340_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var340_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var340_var = BreakoutGame_SC_PLAY_game_nextLevel_var340_var;
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
	result += '\n\treceived_controller_positionvar334x = ' + this.BreakoutGame_SC_received_controller_positionvar334x_var;
	result += '\n\tgame_lostBall_var339 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var339_var;
	result += '\n\treceived_game_nextLevelvar340 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar340_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tcontroller_position_var334 = ' + this.BreakoutGame_SC_controller_position_var334_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\treceived_pro_game_lostBallvar339 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var;
	result += '\n\treceived_pro_game_nextLevelvar340 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tpro_game_lostBall_var339 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var339_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\treceived_display_displayReadyvar331 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\treceived_controller_positiony = ' + this.BreakoutGame_SC_received_controller_positiony_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\treceived_game_lostBallvar339 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar339_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tpro_game_nextLevel_var340 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var340_var;
	result += '\n\tdisplay_displayReady_var331 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var331_var;
	result += '\n\tgame_nextLevel_var340 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var340_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '';
	return result;
}

