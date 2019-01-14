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
		if(103 < 42) {
		this.bus.emit('display?create_', 0xEE);
		
		} else {
		this.bus.emit('display?create__bis', 0x4F);
		
		}
		if(123 < 47) {
		this.bus.emit('display?createysizexsizevar222', this.BreakoutGame_YDISPSIZE_var, 0x96, this.BreakoutGame_XDISPSIZE_var, 0x5F);
		
		} else {
		this.bus.emit('display?createysizexsizevar222_bis', this.BreakoutGame_YDISPSIZE_var, 0x5F, 0x18, this.BreakoutGame_XDISPSIZE_var);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0, 0x9B, 0xF1), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(128 < 232) {
		this.bus.emit('display?updatevar224', 0xBD, 0x72);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0x72, 0x27);
		
		}
		if(59 < 92) {
		this.bus.emit('display?update_', 0xBC);
		
		} else {
		this.bus.emit('display?update__bis', 0xE3);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0, 0x07, 0x09), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 500, 0, 0xE5, 0x4C), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(81 < 22) {
		this.bus.emit('display?update_', 0x63);
		
		} else {
		this.bus.emit('display?update__bis', 0x42);
		
		}
		if(153 < 68) {
		this.bus.emit('display?updatevar224', 0x65, 0xDF);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xDF, 0x35);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 1000, 0, 0xE5, 0x33), 0);
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
		if(227 < 208) {
		this.bus.emit('display?updatevar224', 0xD8, 0xCE);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xCE, 0x33);
		
		}
		if(237 < 32) {
		this.bus.emit('display?update_', 0x7C);
		
		} else {
		this.bus.emit('display?update__bis', 0x32);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(135 < 2) {
		this.bus.emit('display?setColor_', 0x54);
		
		} else {
		this.bus.emit('display?setColor__bis', 0xA7);
		
		}
		if(99 < 250) {
		this.bus.emit('display?setColorvar216rbg', 255, 0x1B, 255, 255, 0x83);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0x1B, 255, 255, 255, 0x80);
		
		}
		if(167 < 249) {
		this.bus.emit('display?fillRectvar219yxheightwidth', 76, 8, 30, 0x2F, 142, 0x4B);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x2F, 142, 8, 30, 76, 0xE9);
		
		}
		if(104 < 146) {
		this.bus.emit('display?fillRect_', 0xEB);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x4F);
		
		}
		if(120 < 243) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
		, 0x98, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x7C);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0x98, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xB8);
		
		}
		if(189 < 202) {
		this.bus.emit('display?setColor_', 0x56);
		
		} else {
		this.bus.emit('display?setColor__bis', 0x27);
		
		}
		if(250 < 45) {
		this.bus.emit('display?fillRect_', 0x53);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xD3);
		
		}
		if(76 < 113) {
		this.bus.emit('display?fillRectvar219yxheightwidth', 50, 9, 31, 0xAF, 140, 0x93);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0xAF, 140, 9, 31, 50, 0xBB);
		
		}
		if(152 < 143) {
		this.bus.emit('display?setBGColorgvar217r', this.BreakoutGame_fgcolor_var[1]
		, 0xDF, 0x98, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setBGColorgvar217r_bis', 0xDF, 0x10, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(211 < 248) {
		this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
		, 0xF3);
		
		} else {
		this.bus.emit('display?setBGColorb_bis', 0xF4, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(153 < 48) {
		this.bus.emit('display?setColor_', 0x46);
		
		} else {
		this.bus.emit('display?setColor__bis', 0x0D);
		
		}
		if(84 < 117) {
		this.bus.emit('display?setColorvar216rbg', 130, 0xCC, 209, 158, 0x14);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xCC, 158, 209, 130, 0xCD);
		
		}
		if(156 < 99) {
		this.bus.emit('display?drawIntegervar220vscalexdigitsy', 5, this.BreakoutGame_score_var, 6, 40, 23, 0xB7, 0x80);
		
		} else {
		this.bus.emit('display?drawIntegervar220vscalexdigitsy_bis', this.BreakoutGame_score_var, 23, 5, 6, 40, 0x80, 0xE0);
		
		}
		if(191 < 229) {
		this.bus.emit('display?drawInteger_', 0x86);
		
		} else {
		this.bus.emit('display?drawInteger__bis', 0xF6);
		
		}
		if(91 < 54) {
		this.bus.emit('display?drawThingMLy', 87, 0x06);
		
		} else {
		this.bus.emit('display?drawThingMLy_bis', 87, 0xC0);
		
		}
		if(135 < 142) {
		this.bus.emit('display?drawThingMLvar221x', 0x40, 26, 0xFD);
		
		} else {
		this.bus.emit('display?drawThingMLvar221x_bis', 0x01, 26, 0xFD);
		
		}
		if(8 < 239) {
		this.bus.emit('display?updatevar224', 0xAF, 0xD4);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xD4, 0x63);
		
		}
		if(6 < 246) {
		this.bus.emit('display?update_', 0xC7);
		
		} else {
		this.bus.emit('display?update__bis', 0x4F);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar233) => {
		return lostBallvar233._port === 'pro_game' && lostBallvar233._msg === 'lostBallvar233' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar233) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xD7, 0, 0x33), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar233) => {
		return lostBallvar233._port === 'pro_game' && lostBallvar233._msg === 'lostBallvar233' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar233) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x59, 0, 0xD4), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x59, 0, 0x2B), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xD7, 0, 0xC0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar234) => {
		return nextLevelvar234._port === 'pro_game' && nextLevelvar234._msg === 'nextLevelvar234' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar234) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x59, 0, 0xDB), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar234) => {
		return nextLevelvar234._port === 'pro_game' && nextLevelvar234._msg === 'nextLevelvar234' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar234) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar234_bis) => {
		return nextLevelvar234_bis._port === 'pro_game' && nextLevelvar234_bis._msg === 'nextLevelvar234_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar234_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x59, 0, 0x7D), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar234_bis) => {
		return nextLevelvar234_bis._port === 'pro_game' && nextLevelvar234_bis._msg === 'nextLevelvar234_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar234_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xD7, 0, 0x42), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar233_bis) => {
		return lostBallvar233_bis._port === 'pro_game' && lostBallvar233_bis._msg === 'lostBallvar233_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar233_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xD7, 0, 0x42), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar233_bis) => {
		return lostBallvar233_bis._port === 'pro_game' && lostBallvar233_bis._msg === 'lostBallvar233_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar233_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var = true;
	});
	this._statemachine.to(null).when((positionx_bis) => {
		return positionx_bis._port === 'controller' && positionx_bis._msg === 'positionx_bis';
	}).effect((positionx_bis) => {
		this.BreakoutGame_SC_received_controller_positionx_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionx_bis.x;
		if(this.BreakoutGame_SC_received_controller_positionvar228y_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionx_var = false;
		this.BreakoutGame_SC_received_controller_positionvar228y_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionx) => {
		return positionx._port === 'controller' && positionx._msg === 'positionx';
	}).effect((positionx) => {
		this.BreakoutGame_SC_received_controller_positionx_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionx.x;
		if(this.BreakoutGame_SC_received_controller_positionvar228y_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionx_var = false;
		this.BreakoutGame_SC_received_controller_positionvar228y_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar228y) => {
		return positionvar228y._port === 'controller' && positionvar228y._msg === 'positionvar228y';
	}).effect((positionvar228y) => {
		this.BreakoutGame_SC_received_controller_positionvar228y_var = true;
		this.BreakoutGame_SC_controller_position_var228_var = positionvar228y.var228;
		this.BreakoutGame_SC_controller_position_y_var = positionvar228y.y;
		if(this.BreakoutGame_SC_received_controller_positionx_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar228y_var = false;
		this.BreakoutGame_SC_received_controller_positionx_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar228y_bis) => {
		return positionvar228y_bis._port === 'controller' && positionvar228y_bis._msg === 'positionvar228y_bis';
	}).effect((positionvar228y_bis) => {
		this.BreakoutGame_SC_received_controller_positionvar228y_var = true;
		this.BreakoutGame_SC_controller_position_var228_var = positionvar228y_bis.var228;
		this.BreakoutGame_SC_controller_position_y_var = positionvar228y_bis.y;
		if(this.BreakoutGame_SC_received_controller_positionx_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar228y_var = false;
		this.BreakoutGame_SC_received_controller_positionx_var = false;
		
		}
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar225_bis) => {
		return displayReadyvar225_bis._port === 'display' && displayReadyvar225_bis._msg === 'displayReadyvar225_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar225_bis) => {
		if(195 < 193) {
		this.bus.emit('display?clear_', 0xAF);
		
		} else {
		this.bus.emit('display?clear__bis', 0xFB);
		
		}
		if(103 < 219) {
		this.bus.emit('display?clearvar215', 0xAF, 0x60);
		
		} else {
		this.bus.emit('display?clearvar215_bis', 0xAF, 0x88);
		
		}
		this.initColors();
		if(254 < 72) {
		this.bus.emit('display?setColor_', 0xCA);
		
		} else {
		this.bus.emit('display?setColor__bis', 0x9A);
		
		}
		if(91 < 178) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
		, 0xF7, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0xD3);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xF7, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[2]
		, 0x7F);
		
		}
		if(117 < 173) {
		this.bus.emit('display?fillRectvar219yxheightwidth', this.BreakoutGame_YDISPSIZE_var, 0, 0, 0x59, this.BreakoutGame_XDISPSIZE_var, 0x6F);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x59, this.BreakoutGame_XDISPSIZE_var, 0, 0, this.BreakoutGame_YDISPSIZE_var, 0xEA);
		
		}
		if(103 < 167) {
		this.bus.emit('display?fillRect_', 0xDF);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x15);
		
		}
		if(74 < 28) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
		, 0xD2, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xAC);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xD2, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xB8);
		
		}
		if(137 < 174) {
		this.bus.emit('display?setColor_', 0xDC);
		
		} else {
		this.bus.emit('display?setColor__bis', 0x04);
		
		}
		if(91 < 144) {
		this.bus.emit('display?fillRectvar219yxheightwidth', 14, 0, 0, 0x42, this.BreakoutGame_XDISPSIZE_var, 0xCF);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x42, this.BreakoutGame_XDISPSIZE_var, 0, 0, 14, 0x37);
		
		}
		if(158 < 75) {
		this.bus.emit('display?fillRect_', 0x4D);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xFB);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar225_bis) => {
		return displayReadyvar225_bis._port === 'display' && displayReadyvar225_bis._msg === 'displayReadyvar225_bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar225_bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var);
	}).effect((displayReady__bis) => {
		if(112 < 206) {
		this.bus.emit('display?clearvar215', 0xAF, 0xF3);
		
		} else {
		this.bus.emit('display?clearvar215_bis', 0xAF, 0xDC);
		
		}
		if(108 < 198) {
		this.bus.emit('display?clear_', 0xC9);
		
		} else {
		this.bus.emit('display?clear__bis', 0x3C);
		
		}
		this.initColors();
		if(182 < 53) {
		this.bus.emit('display?setColor_', 0xDD);
		
		} else {
		this.bus.emit('display?setColor__bis', 0x07);
		
		}
		if(215 < 215) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
		, 0xF7, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x6E);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xF7, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[2]
		, 0x37);
		
		}
		if(27 < 53) {
		this.bus.emit('display?fillRect_', 0xEB);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xD2);
		
		}
		if(82 < 209) {
		this.bus.emit('display?fillRectvar219yxheightwidth', this.BreakoutGame_YDISPSIZE_var, 0, 0, 0x59, this.BreakoutGame_XDISPSIZE_var, 0xF3);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x59, this.BreakoutGame_XDISPSIZE_var, 0, 0, this.BreakoutGame_YDISPSIZE_var, 0xB3);
		
		}
		if(121 < 189) {
		this.bus.emit('display?setColor_', 0x10);
		
		} else {
		this.bus.emit('display?setColor__bis', 0xFC);
		
		}
		if(42 < 149) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
		, 0xD2, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xD0);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xD2, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		, 0x88);
		
		}
		if(129 < 44) {
		this.bus.emit('display?fillRectvar219yxheightwidth', 14, 0, 0, 0x42, this.BreakoutGame_XDISPSIZE_var, 0x96);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x42, this.BreakoutGame_XDISPSIZE_var, 0, 0, 14, 0xE2);
		
		}
		if(98 < 192) {
		this.bus.emit('display?fillRect_', 0x72);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xCA);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var));
	}).effect((displayReady__bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var);
	}).effect((displayReady_) => {
		if(112 < 206) {
		this.bus.emit('display?clearvar215', 0xAF, 0xA0);
		
		} else {
		this.bus.emit('display?clearvar215_bis', 0xAF, 0x3B);
		
		}
		if(108 < 198) {
		this.bus.emit('display?clear_', 0x4D);
		
		} else {
		this.bus.emit('display?clear__bis', 0x73);
		
		}
		this.initColors();
		if(182 < 53) {
		this.bus.emit('display?setColor_', 0x22);
		
		} else {
		this.bus.emit('display?setColor__bis', 0xF3);
		
		}
		if(215 < 215) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
		, 0xF7, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0xA2);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xF7, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[2]
		, 0x57);
		
		}
		if(27 < 53) {
		this.bus.emit('display?fillRect_', 0x49);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x15);
		
		}
		if(82 < 209) {
		this.bus.emit('display?fillRectvar219yxheightwidth', this.BreakoutGame_YDISPSIZE_var, 0, 0, 0x59, this.BreakoutGame_XDISPSIZE_var, 0xEE);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x59, this.BreakoutGame_XDISPSIZE_var, 0, 0, this.BreakoutGame_YDISPSIZE_var, 0x0C);
		
		}
		if(121 < 189) {
		this.bus.emit('display?setColor_', 0xB6);
		
		} else {
		this.bus.emit('display?setColor__bis', 0xD9);
		
		}
		if(42 < 149) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
		, 0xD2, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xCD);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xD2, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		, 0x0F);
		
		}
		if(129 < 44) {
		this.bus.emit('display?fillRectvar219yxheightwidth', 14, 0, 0, 0x42, this.BreakoutGame_XDISPSIZE_var, 0x98);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x42, this.BreakoutGame_XDISPSIZE_var, 0, 0, 14, 0xE4);
		
		}
		if(98 < 192) {
		this.bus.emit('display?fillRect_', 0x39);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x15);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar225) => {
		return displayReadyvar225._port === 'display' && displayReadyvar225._msg === 'displayReadyvar225' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar225) => {
		if(195 < 193) {
		this.bus.emit('display?clear_', 0x7B);
		
		} else {
		this.bus.emit('display?clear__bis', 0x87);
		
		}
		if(103 < 219) {
		this.bus.emit('display?clearvar215', 0xAF, 0x6B);
		
		} else {
		this.bus.emit('display?clearvar215_bis', 0xAF, 0xBA);
		
		}
		this.initColors();
		if(254 < 72) {
		this.bus.emit('display?setColor_', 0x8D);
		
		} else {
		this.bus.emit('display?setColor__bis', 0xA8);
		
		}
		if(91 < 178) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
		, 0xF7, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x20);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xF7, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[2]
		, 0xDD);
		
		}
		if(117 < 173) {
		this.bus.emit('display?fillRectvar219yxheightwidth', this.BreakoutGame_YDISPSIZE_var, 0, 0, 0x59, this.BreakoutGame_XDISPSIZE_var, 0x75);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x59, this.BreakoutGame_XDISPSIZE_var, 0, 0, this.BreakoutGame_YDISPSIZE_var, 0x6C);
		
		}
		if(103 < 167) {
		this.bus.emit('display?fillRect_', 0x21);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x77);
		
		}
		if(74 < 28) {
		this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
		, 0xD2, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xDB);
		
		} else {
		this.bus.emit('display?setColorvar216rbg_bis', 0xD2, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xB1);
		
		}
		if(137 < 174) {
		this.bus.emit('display?setColor_', 0xDC);
		
		} else {
		this.bus.emit('display?setColor__bis', 0x49);
		
		}
		if(91 < 144) {
		this.bus.emit('display?fillRectvar219yxheightwidth', 14, 0, 0, 0x42, this.BreakoutGame_XDISPSIZE_var, 0xE2);
		
		} else {
		this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x42, this.BreakoutGame_XDISPSIZE_var, 0, 0, 14, 0x0F);
		
		}
		if(158 < 75) {
		this.bus.emit('display?fillRect_', 0x4B);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x00);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar225) => {
		return displayReadyvar225._port === 'display' && displayReadyvar225._msg === 'displayReadyvar225' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar225) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar233) => {
		return lostBallvar233._port === 'game' && lostBallvar233._msg === 'lostBallvar233' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar233) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x2A, 0, 0x43), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar233) => {
		return lostBallvar233._port === 'game' && lostBallvar233._msg === 'lostBallvar233' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar233) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x20, 0, 0x81), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x20, 0, 0xD0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x2A, 0, 0x46), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar234) => {
		return nextLevelvar234._port === 'game' && nextLevelvar234._msg === 'nextLevelvar234' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar234) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x20, 0, 0xA9), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar234) => {
		return nextLevelvar234._port === 'game' && nextLevelvar234._msg === 'nextLevelvar234' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar234) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar234_bis) => {
		return nextLevelvar234_bis._port === 'game' && nextLevelvar234_bis._msg === 'nextLevelvar234_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar234_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x20, 0, 0xA2), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar234_bis) => {
		return nextLevelvar234_bis._port === 'game' && nextLevelvar234_bis._msg === 'nextLevelvar234_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar234_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x2A, 0, 0xCA), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar233_bis) => {
		return lostBallvar233_bis._port === 'game' && lostBallvar233_bis._msg === 'lostBallvar233_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar233_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x2A, 0, 0x63), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar233_bis) => {
		return lostBallvar233_bis._port === 'game' && lostBallvar233_bis._msg === 'lostBallvar233_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar233_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var = true;
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(123 < 18) {
		this.bus.emit('display?updatevar224', 0x13, 0xEA);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xEA, 0xE4);
		
		}
		if(188 < 111) {
		this.bus.emit('display?update_', 0xFA);
		
		} else {
		this.bus.emit('display?update__bis', 0x99);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 33, 0, 0x85, 0x9D), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(53 < 43) {
		this.bus.emit('display?updatevar224', 0xAC, 0x18);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0x18, 0xE0);
		
		}
		if(63 < 235) {
		this.bus.emit('display?update_', 0x89);
		
		} else {
		this.bus.emit('display?update__bis', 0x3D);
		
		}
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
		if(201 < 21) {
		this.bus.emit('sound?tonetimefreq', this.BreakoutGame_tone2_var, 0xEE, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimefreq_bis', this.BreakoutGame_tone2_var, 0xBB, this.BreakoutGame_tone_duration_var);
		
		}
		if(201 < 77) {
		this.bus.emit('sound?tonevar232', 0xDE, 0x22);
		
		} else {
		this.bus.emit('sound?tonevar232_bis', 0xDE, 0xE8);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(253 < 179) {
		this.bus.emit('sound?tonevar232', 0xB9, 0x11);
		
		} else {
		this.bus.emit('sound?tonevar232_bis', 0xB9, 0x27);
		
		}
		if(67 < 238) {
		this.bus.emit('sound?tonetimefreq', this.BreakoutGame_tone2_var, 0x1B, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimefreq_bis', this.BreakoutGame_tone2_var, 0xFD, this.BreakoutGame_tone_duration_var);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(132 < 234) {
		this.bus.emit('sound?tonetimefreq', this.BreakoutGame_tone2_var, 0xF3, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimefreq_bis', this.BreakoutGame_tone2_var, 0xD8, this.BreakoutGame_tone_duration_var);
		
		}
		if(243 < 79) {
		this.bus.emit('sound?tonevar232', 0x2D, 0x0D);
		
		} else {
		this.bus.emit('sound?tonevar232_bis', 0x2D, 0x11);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(213 < 28) {
		setTimeout(() => this.bus.emit('game?lostBallvar233', 0x25, 0xE8), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar233_bis', 0xE8, 0x0F), 0);
		
		}
		if(253 < 216) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x30), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0xDF), 0);
		
		}
		if(0 < 8) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar233', 0x83, 0x34), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar233_bis', 0x34, 0xD7), 0);
		
		}
		if(8 < 156) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x8F), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0xB6), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(89 < 206) {
		this.bus.emit('sound?tonevar232', 0xC9, 0xAC);
		
		} else {
		this.bus.emit('sound?tonevar232_bis', 0xC9, 0xDF);
		
		}
		if(123 < 112) {
		this.bus.emit('sound?tonetimefreq', this.BreakoutGame_tone2_var, 0x74, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimefreq_bis', this.BreakoutGame_tone2_var, 0xEF, this.BreakoutGame_tone_duration_var);
		
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
		if(216 < 109) {
		this.bus.emit('sound?tonevar232', 0xC2, 0x88);
		
		} else {
		this.bus.emit('sound?tonevar232_bis', 0xC2, 0xBC);
		
		}
		if(163 < 140) {
		this.bus.emit('sound?tonetimefreq', this.BreakoutGame_tone1_var, 0x28, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimefreq_bis', this.BreakoutGame_tone1_var, 0x2C, this.BreakoutGame_tone_duration_var);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(193 < 64) {
		setTimeout(() => this.bus.emit('game?nextLevelvar234', 0x94, 0x10), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar234_bis', 0x10, 0x34), 0);
		
		}
		if(112 < 129) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xCA), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0x14), 0);
		
		}
		if(159 < 27) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar234', 0x5C, 0xE5), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar234_bis', 0xE5, 0x8C), 0);
		
		}
		if(23 < 115) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xD4), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0x06), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(188 < 201) {
		const by_const = this.BreakoutGame_by_var;
		const padx_const = this.BreakoutGame_padx_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadxvar229ballx', 0x82, 0x70, by_const, padx_const, bx_const), 0);
		
		} else {
		const by_const = this.BreakoutGame_by_var;
		const padx_const = this.BreakoutGame_padx_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadxvar229ballx_bis', by_const, padx_const, bx_const, 0x82, 0xA6), 0);
		
		}
		if(4 < 161) {
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApady', 0x2B, pady_const), 0);
		
		} else {
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApady_bis', pady_const, 0xD3), 0);
		
		}
		if(92 < 200) {
		this.bus.emit('display?update_', 0x48);
		
		} else {
		this.bus.emit('display?update__bis', 0xA9);
		
		}
		if(161 < 147) {
		this.bus.emit('display?updatevar224', 0x8D, 0x62);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0x62, 0xEF);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', period_const, 0, 0xE7, 0x41), 0);
	});
	BreakoutGame_SC_NEXTLEVEL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0);
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
	if(156 < 252) {
	this.bus.emit('display?setBGColorgvar217r', this.BreakoutGame_bgcolor_var[1]
	, 0x67, 0xA1, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorgvar217r_bis', 0x67, 0xF9, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(39 < 175) {
	this.bus.emit('display?setBGColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x35);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', 0x5C, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(43 < 45) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
	, 0xD0, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x5F);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0xD0, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	, 0xDA);
	
	}
	if(204 < 139) {
	this.bus.emit('display?setColor_', 0xFC);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x6D);
	
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
	if(186 < 175) {
	this.bus.emit('display?setColor_', 0xC2);
	
	} else {
	this.bus.emit('display?setColor__bis', 0xAF);
	
	}
	if(82 < 221) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
	, 0xBA, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x27);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0xBA, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x48);
	
	}
	if(57 < 121) {
	this.bus.emit('display?fillRectvar219yxheightwidth', bs_var, this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var, 0xC5, bs_var, 0xAC);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0xC5, bs_var, this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var, bs_var, 0xE2);
	
	}
	if(123 < 212) {
	this.bus.emit('display?fillRect_', 0xCA);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x26);
	
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
	if(37 < 142) {
	this.bus.emit('display?setColorvar216rbg', 111, 0x2B, 199, 183, 0xF6);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x2B, 183, 199, 111, 0xDA);
	
	}
	if(131 < 217) {
	this.bus.emit('display?setColor_', 0x0B);
	
	} else {
	this.bus.emit('display?setColor__bis', 0xA8);
	
	}
	if(71 < 8) {
	this.bus.emit('display?fillRect_', 0x4E);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xEE);
	
	}
	if(224 < 90) {
	this.bus.emit('display?fillRectvar219yxheightwidth', bs_var, this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var, 0x4B, bs_var, 0x5A);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x4B, bs_var, this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var, bs_var, 0x89);
	
	}
}

BreakoutGameBrowserRND.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(231 < 243) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
	, 0x3C, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xF6);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x3C, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x08);
	
	}
	if(108 < 50) {
	this.bus.emit('display?setColor_', 0x4F);
	
	} else {
	this.bus.emit('display?setColor__bis', 0xB8);
	
	}
	if(100 < 227) {
	this.bus.emit('display?fillRect_', 0xB5);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x0F);
	
	}
	if(78 < 195) {
	this.bus.emit('display?fillRectvar219yxheightwidth', 4, this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var, 0xD8, ps_var, 0x12);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0xD8, ps_var, this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var, 4, 0x8D);
	
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
	if(85 < 85) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
	, 0x14, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x50);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x14, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	, 0xEF);
	
	}
	if(104 < 123) {
	this.bus.emit('display?setColor_', 0x9D);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x66);
	
	}
	if(33 < 151) {
	this.bus.emit('display?fillRectvar219yxheightwidth', 4, this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var, 0x06, ps_var, 0xE1);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x06, ps_var, this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var, 4, 0x88);
	
	}
	if(14 < 163) {
	this.bus.emit('display?fillRect_', 0x33);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xCC);
	
	}
}

BreakoutGameBrowserRND.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(128 < 141) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
	, 0x1F, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xF8);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x1F, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	, 0xE0);
	
	}
	if(199 < 124) {
	this.bus.emit('display?setColor_', 0x36);
	
	} else {
	this.bus.emit('display?setColor__bis', 0xB5);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(183 < 208) {
	this.bus.emit('display?setColor_', 0x65);
	
	} else {
	this.bus.emit('display?setColor__bis', 0xE1);
	
	}
	if(247 < 226) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
	, 0xD1, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x08);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0xD1, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x1D);
	
	}
	if(54 < 57) {
	this.bus.emit('display?setBGColorgvar217r', this.BreakoutGame_bgcolor_var[1]
	, 0x6D, 0x88, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorgvar217r_bis', 0x6D, 0x5B, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(8 < 240) {
	this.bus.emit('display?setBGColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x94);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', 0x49, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(198 < 241) {
	this.bus.emit('display?drawIntegervar220vscalexdigitsy', 1, BreakoutGame_drawCountDown_c_var, 4, 90, 80 - 6, 0xD1, 0xB2);
	
	} else {
	this.bus.emit('display?drawIntegervar220vscalexdigitsy_bis', BreakoutGame_drawCountDown_c_var, 80 - 6, 1, 4, 90, 0xB2, 0x47);
	
	}
	if(90 < 117) {
	this.bus.emit('display?drawInteger_', 0x69);
	
	} else {
	this.bus.emit('display?drawInteger__bis', 0x97);
	
	}
	
	} else {
	if(30 < 182) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
	, 0xED, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x7F);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0xED, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x89);
	
	}
	if(232 < 38) {
	this.bus.emit('display?setColor_', 0x27);
	
	} else {
	this.bus.emit('display?setColor__bis', 0xED);
	
	}
	if(149 < 12) {
	this.bus.emit('display?fillRectvar219yxheightwidth', 20, 80 - 6, 90, 0xC0, 12, 0x37);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0xC0, 12, 80 - 6, 90, 20, 0xB2);
	
	}
	if(148 < 119) {
	this.bus.emit('display?fillRect_', 0xB3);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xC9);
	
	}
	
	}
}

BreakoutGameBrowserRND.prototype.drawWalls = function() {
	if(209 < 140) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
	, 0xA4, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xE6);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0xA4, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x68);
	
	}
	if(230 < 26) {
	this.bus.emit('display?setColor_', 0x14);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x97);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(99 < 231) {
	this.bus.emit('display?fillRectvar219yxheightwidth', 1, left_var - 1, top_var - 1, 0x5F, xcenter_var + 1, 0xFD);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x5F, xcenter_var + 1, left_var - 1, top_var - 1, 1, 0x62);
	
	}
	if(64 < 80) {
	this.bus.emit('display?fillRect_', 0xA2);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x77);
	
	}
	if(53 < 39) {
	this.bus.emit('display?fillRect_', 0x63);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xFB);
	
	}
	if(238 < 211) {
	this.bus.emit('display?fillRectvar219yxheightwidth', 1, left_var - 1, bottom_var, 0x4B, xcenter_var + 1, 0x72);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x4B, xcenter_var + 1, left_var - 1, bottom_var, 1, 0x1D);
	
	}
	if(202 < 188) {
	this.bus.emit('display?fillRect_', 0x72);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x28);
	
	}
	if(237 < 143) {
	this.bus.emit('display?fillRectvar219yxheightwidth', ycenter_var, left_var - 1, top_var, 0x87, 1, 0x26);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x87, 1, left_var - 1, top_var, ycenter_var, 0xD9);
	
	}
	if(32 < 84) {
	this.bus.emit('display?fillRect_', 0x6E);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x36);
	
	}
	if(179 < 233) {
	this.bus.emit('display?fillRectvar219yxheightwidth', ycenter_var, right_var, top_var, 0xF7, 1, 0xC1);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0xF7, 1, right_var, top_var, ycenter_var, 0x5D);
	
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
	if(158 < 243) {
	this.bus.emit('display?setColorvar216rbg', 89, 0x4E, 103, 155, 0x9E);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x4E, 155, 103, 89, 0x53);
	
	}
	if(13 < 140) {
	this.bus.emit('display?setColor_', 0xA4);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x8D);
	
	}
	if(63 < 92) {
	this.bus.emit('display?fillRectvar219yxheightwidth', h_var, bx_var, by_var, 0x78, w_var, 0x87);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x78, w_var, bx_var, by_var, h_var, 0x08);
	
	}
	if(94 < 33) {
	this.bus.emit('display?fillRect_', 0xC1);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x38);
	
	}
	if(120 < 87) {
	this.bus.emit('display?setColor_', 0xAE);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x43);
	
	}
	if(179 < 202) {
	this.bus.emit('display?setColorvar216rbg', 43, 0x97, 56, 100, 0xD3);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x97, 100, 56, 43, 0xE7);
	
	}
	if(166 < 111) {
	this.bus.emit('display?drawRect_', 0x84);
	
	} else {
	this.bus.emit('display?drawRect__bis', 0xDA);
	
	}
	if(30 < 226) {
	this.bus.emit('display?drawRectwidthxvar218yheight', w_var, by_var, h_var, bx_var, 0x53, 0x94);
	
	} else {
	this.bus.emit('display?drawRectwidthxvar218yheight_bis', w_var, bx_var, h_var, 0xE6, by_var, 0x94);
	
	}
}

BreakoutGameBrowserRND.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(51 < 60) {
	this.bus.emit('display?setColor_', 0xD9);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x76);
	
	}
	if(159 < 58) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
	, 0x1A, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xC5);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x1A, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x77);
	
	}
	if(234 < 221) {
	this.bus.emit('display?fillRectvar219yxheightwidth', this.BreakoutGame_BRICK_HEIGHT_var - 2, bx_var, by_var, 0x29, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), 0xDD);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x29, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), bx_var, by_var, this.BreakoutGame_BRICK_HEIGHT_var - 2, 0xA0);
	
	}
	if(90 < 45) {
	this.bus.emit('display?fillRect_', 0x86);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xC4);
	
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
	if(7 < 143) {
	this.bus.emit('display?setColor_', 0x33);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x30);
	
	}
	if(30 < 55) {
	this.bus.emit('display?setColorvar216rbg', 130, 0xBE, 209, 158, 0x8C);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0xBE, 158, 209, 130, 0xAD);
	
	}
	if(129 < 177) {
	this.bus.emit('display?setBGColorgvar217r', this.BreakoutGame_fgcolor_var[1]
	, 0x6B, 0x82, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorgvar217r_bis', 0x6B, 0xF7, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(37 < 109) {
	this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x57);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', 0xAE, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(95 < 36) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_bgcolor_var[2]
	, 0xEC, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xCA);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0xEC, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x22);
	
	}
	if(20 < 14) {
	this.bus.emit('display?setColor_', 0x43);
	
	} else {
	this.bus.emit('display?setColor__bis', 0xAE);
	
	}
	if(98 < 89) {
	this.bus.emit('display?drawInteger_', 0x48);
	
	} else {
	this.bus.emit('display?drawInteger__bis', 0xE0);
	
	}
	if(254 < 34) {
	this.bus.emit('display?drawIntegervar220vscalexdigitsy', 2, this.BreakoutGame_level_var, 2, 2, 6, 0x66, 0x51);
	
	} else {
	this.bus.emit('display?drawIntegervar220vscalexdigitsy_bis', this.BreakoutGame_level_var, 6, 2, 2, 2, 0x51, 0x40);
	
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
	if(186 < 64) {
	this.bus.emit('display?setColorvar216rbg', 130, 0xE1, 209, 158, 0x9E);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0xE1, 158, 209, 130, 0x0D);
	
	}
	if(185 < 117) {
	this.bus.emit('display?setColor_', 0x3D);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x3F);
	
	}
	if(46 < 131) {
	this.bus.emit('display?setBGColorgvar217r', this.BreakoutGame_fgcolor_var[1]
	, 0x3F, 0x20, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorgvar217r_bis', 0x3F, 0x48, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(182 < 220) {
	this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x45);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', 0x43, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(199 < 55) {
	this.bus.emit('display?drawIntegervar220vscalexdigitsy', 5, this.BreakoutGame_score_var, 2, 2, 58, 0x94, 0xCD);
	
	} else {
	this.bus.emit('display?drawIntegervar220vscalexdigitsy_bis', this.BreakoutGame_score_var, 58, 5, 2, 2, 0xCD, 0xE2);
	
	}
	if(111 < 14) {
	this.bus.emit('display?drawInteger_', 0x9D);
	
	} else {
	this.bus.emit('display?drawInteger__bis', 0x95);
	
	}
}

BreakoutGameBrowserRND.prototype.drawLives = function() {
	if(236 < 172) {
	this.bus.emit('display?setColor_', 0x53);
	
	} else {
	this.bus.emit('display?setColor__bis', 0x00);
	
	}
	if(210 < 140) {
	this.bus.emit('display?setColorvar216rbg', this.BreakoutGame_fgcolor_var[2]
	, 0x3F, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xBD);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x3F, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x9C);
	
	}
	if(173 < 214) {
	this.bus.emit('display?fillRectvar219yxheightwidth', 6, 124, 4, 0x84, 24 + 6, 0x2D);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0x84, 24 + 6, 124, 4, 6, 0xDA);
	
	}
	if(86 < 124) {
	this.bus.emit('display?fillRect_', 0x76);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x96);
	
	}
	if(102 < 170) {
	this.bus.emit('display?setColor_', 0xC9);
	
	} else {
	this.bus.emit('display?setColor__bis', 0xB8);
	
	}
	if(187 < 112) {
	this.bus.emit('display?setColorvar216rbg', 111, 0x39, 199, 183, 0x0A);
	
	} else {
	this.bus.emit('display?setColorvar216rbg_bis', 0x39, 183, 199, 111, 0xAB);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(229 < 116) {
	this.bus.emit('display?fillRectvar219yxheightwidth', 6, 124 + (2 - i_var) * 12, 4, 0xF1, 6, 0xEE);
	
	} else {
	this.bus.emit('display?fillRectvar219yxheightwidth_bis', 0xF1, 6, 124 + (2 - i_var) * 12, 4, 6, 0xC8);
	
	}
	if(47 < 33) {
	this.bus.emit('display?fillRect_', 0x3C);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xBD);
	
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

BreakoutGameBrowserRND.prototype.receivetimer_timeoutOnclock = function(id, var235, var214) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, var235:var235, var214:var214});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady_Ondisplay = function(var246) {
	this._receive({_port:"display", _msg:"displayReady_", var246:var246});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar225Ondisplay = function(var225, var247) {
	this._receive({_port:"display", _msg:"displayReadyvar225", var225:var225, var247:var247});
}

BreakoutGameBrowserRND.prototype.receivedisplayError_Ondisplay = function(var254) {
	this._receive({_port:"display", _msg:"displayError_", var254:var254});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar226Ondisplay = function(var255, var226) {
	this._receive({_port:"display", _msg:"displayErrorvar226", var255:var255, var226:var226});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady__bisOndisplay = function(var270) {
	this._receive({_port:"display", _msg:"displayReady__bis", var270:var270});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar225_bisOndisplay = function(var225, var271) {
	this._receive({_port:"display", _msg:"displayReadyvar225_bis", var225:var225, var271:var271});
}

BreakoutGameBrowserRND.prototype.receivedisplayError__bisOndisplay = function(var278) {
	this._receive({_port:"display", _msg:"displayError__bis", var278:var278});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar226_bisOndisplay = function(var279, var226) {
	this._receive({_port:"display", _msg:"displayErrorvar226_bis", var279:var279, var226:var226});
}

BreakoutGameBrowserRND.prototype.receivepositionxOncontroller = function(x, var286) {
	this._receive({_port:"controller", _msg:"positionx", x:x, var286:var286});
}

BreakoutGameBrowserRND.prototype.receivepositionvar228yOncontroller = function(var228, var287, y) {
	this._receive({_port:"controller", _msg:"positionvar228y", var228:var228, var287:var287, y:y});
}

BreakoutGameBrowserRND.prototype.receivepositionx_bisOncontroller = function(x, var290) {
	this._receive({_port:"controller", _msg:"positionx_bis", x:x, var290:var290});
}

BreakoutGameBrowserRND.prototype.receivepositionvar228y_bisOncontroller = function(var228, y, var291) {
	this._receive({_port:"controller", _msg:"positionvar228y_bis", var228:var228, y:y, var291:var291});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Ongame = function(var310) {
	this._receive({_port:"game", _msg:"lostBall_", var310:var310});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar233Ongame = function(var311, var233) {
	this._receive({_port:"game", _msg:"lostBallvar233", var311:var311, var233:var233});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Ongame = function(var312) {
	this._receive({_port:"game", _msg:"nextLevel_", var312:var312});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar234Ongame = function(var313, var234) {
	this._receive({_port:"game", _msg:"nextLevelvar234", var313:var313, var234:var234});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOngame = function(var314) {
	this._receive({_port:"game", _msg:"lostBall__bis", var314:var314});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar233_bisOngame = function(var233, var315) {
	this._receive({_port:"game", _msg:"lostBallvar233_bis", var233:var233, var315:var315});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOngame = function(var316) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var316:var316});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar234_bisOngame = function(var234, var317) {
	this._receive({_port:"game", _msg:"nextLevelvar234_bis", var234:var234, var317:var317});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Onpro_game = function(var310) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var310:var310});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar233Onpro_game = function(var311, var233) {
	this._receive({_port:"pro_game", _msg:"lostBallvar233", var311:var311, var233:var233});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Onpro_game = function(var312) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var312:var312});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar234Onpro_game = function(var313, var234) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar234", var313:var313, var234:var234});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOnpro_game = function(var314) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var314:var314});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar233_bisOnpro_game = function(var233, var315) {
	this._receive({_port:"pro_game", _msg:"lostBallvar233_bis", var233:var233, var315:var315});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOnpro_game = function(var316) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var316:var316});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar234_bisOnpro_game = function(var234, var317) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar234_bis", var234:var234, var317:var317});
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_var228_var = function(BreakoutGame_SC_controller_position_var228_var) {
	this.BreakoutGame_SC_controller_position_var228_var = BreakoutGame_SC_controller_position_var228_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar234_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var233_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var233_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var233_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var233_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positionvar228y_var = function(BreakoutGame_SC_received_controller_positionvar228y_var) {
	this.BreakoutGame_SC_received_controller_positionvar228y_var = BreakoutGame_SC_received_controller_positionvar228y_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_display_displayReady_var225_var = function(BreakoutGame_SC_INIT_display_displayReady_var225_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var225_var = BreakoutGame_SC_INIT_display_displayReady_var225_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positionx_var = function(BreakoutGame_SC_received_controller_positionx_var) {
	this.BreakoutGame_SC_received_controller_positionx_var = BreakoutGame_SC_received_controller_positionx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var234_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var234_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var234_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var234_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var234_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var234_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var234_var = BreakoutGame_SC_PLAY_game_nextLevel_var234_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar233_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar233_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var = BreakoutGame_SC_PLAY_received_game_lostBallvar233_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar225_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar225_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var = BreakoutGame_SC_INIT_received_display_displayReadyvar225_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var233_var = function(BreakoutGame_SC_PLAY_game_lostBall_var233_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var233_var = BreakoutGame_SC_PLAY_game_lostBall_var233_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tcontroller_position_var228 = ' + this.BreakoutGame_SC_controller_position_var228_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\treceived_game_nextLevelvar234 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar234_var;
	result += '\n\tpro_game_lostBall_var233 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var233_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\treceived_controller_positionvar228y = ' + this.BreakoutGame_SC_received_controller_positionvar228y_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\treceived_pro_game_nextLevelvar234 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tdisplay_displayReady_var225 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var225_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\treceived_controller_positionx = ' + this.BreakoutGame_SC_received_controller_positionx_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tpro_game_nextLevel_var234 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var234_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\treceived_pro_game_lostBallvar233 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tgame_nextLevel_var234 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var234_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\treceived_game_lostBallvar233 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar233_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\treceived_display_displayReadyvar225 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tgame_lostBall_var233 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var233_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '';
	return result;
}

