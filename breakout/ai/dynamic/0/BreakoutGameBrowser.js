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
		if(99 < 131) {
		this.bus.emit('display?create_', 0xD9);
		
		} else {
		this.bus.emit('display?create__bis', 0xEF);
		
		}
		if(174 < 89) {
		this.bus.emit('display?createxsizeysizevar10', this.BreakoutGame_YDISPSIZE_var, this.BreakoutGame_XDISPSIZE_var, 0x30, 0x18);
		
		} else {
		this.bus.emit('display?createxsizeysizevar10_bis', this.BreakoutGame_YDISPSIZE_var, 0x30, this.BreakoutGame_XDISPSIZE_var, 0xE4);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x00, 0, 0x7C, 33), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(139 < 178) {
		this.bus.emit('display?updatevar12', 0x5C, 0x2D);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x2D, 0xBF);
		
		}
		if(190 < 24) {
		this.bus.emit('display?update_', 0xA4);
		
		} else {
		this.bus.emit('display?update__bis', 0xAE);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0xB9, 0, 0xF9, period_const), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x0E, 0, 0x1C, 500), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(138 < 209) {
		this.bus.emit('display?update_', 0x43);
		
		} else {
		this.bus.emit('display?update__bis', 0xBE);
		
		}
		if(130 < 54) {
		this.bus.emit('display?updatevar12', 0xB9, 0xA7);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0xA7, 0xF4);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x22, 0, 0x3A, 1000), 0);
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
		if(178 < 213) {
		this.bus.emit('display?updatevar12', 0x13, 0x1E);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x1E, 0xF6);
		
		}
		if(168 < 65) {
		this.bus.emit('display?update_', 0xE1);
		
		} else {
		this.bus.emit('display?update__bis', 0x34);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(211 < 163) {
		this.bus.emit('display?update_', 0xC6);
		
		} else {
		this.bus.emit('display?update__bis', 0xDE);
		
		}
		if(76 < 183) {
		this.bus.emit('display?updatevar12', 0xC1, 0xFD);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0xFD, 0xDA);
		
		}
		setTimeout(() => this.bus.emit('clock?timer_start', 0xA6, 0, 0xA7, 500), 0);
	});
	let BreakoutGame_SC_GAMEREALLYOVER = new StateJS.State('GAMEREALLYOVER', this._statemachine).entry(() => {
		if(40 < 205) {
		this.bus.emit('display?setColorg', 0xDA, 255);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x29, 255);
		
		}
		if(92 < 118) {
		this.bus.emit('display?setColorbrvar4', 255, 0x96, 255, 0xED);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0xFB, 255, 255, 0x96);
		
		}
		if(119 < 30) {
		this.bus.emit('display?fillRectheightxvar7', 0xC4, 0xFB, 76, 8);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0xFB, 8, 76, 0x28);
		
		}
		if(231 < 130) {
		this.bus.emit('display?fillRectywidth', 142, 30, 0x2F);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0x13, 30, 142);
		
		}
		if(15 < 190) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
		, 0xF6, this.BreakoutGame_fgcolor_var[0]
		, 0x06);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0xAD, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xF6);
		
		}
		if(145 < 14) {
		this.bus.emit('display?setColorg', 0xE7, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x39, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(94 < 143) {
		this.bus.emit('display?fillRectheightxvar7', 0x9F, 0x34, 50, 9);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x34, 9, 50, 0xB6);
		
		}
		if(239 < 94) {
		this.bus.emit('display?fillRectywidth', 140, 31, 0xB8);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0x22, 31, 140);
		
		}
		if(144 < 225) {
		this.bus.emit('display?setBGColorvar5rg', 0x43, 0x40, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setBGColorvar5rg_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x43, 0x8D);
		
		}
		if(238 < 225) {
		this.bus.emit('display?setBGColorb', 0x78, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setBGColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x7A);
		
		}
		if(179 < 15) {
		this.bus.emit('display?setColorbrvar4', 130, 0x5F, 158, 0x47);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0xC5, 158, 130, 0x5F);
		
		}
		if(36 < 18) {
		this.bus.emit('display?setColorg', 0x9A, 209);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x50, 209);
		
		}
		if(206 < 58) {
		this.bus.emit('display?drawIntegerx', 0xEE, 23);
		
		} else {
		this.bus.emit('display?drawIntegerx_bis', 23, 0xF1);
		
		}
		if(169 < 56) {
		this.bus.emit('display?drawIntegervdigitsscalevar8y', 5, 40, 0x5C, 0xE0, 6, this.BreakoutGame_score_var);
		
		} else {
		this.bus.emit('display?drawIntegervdigitsscalevar8y_bis', 40, 0xDC, 6, this.BreakoutGame_score_var, 5, 0x5C);
		
		}
		if(73 < 165) {
		this.bus.emit('display?drawThingMLxy', 0x39, 26, 87);
		
		} else {
		this.bus.emit('display?drawThingMLxy_bis', 0xAE, 87, 26);
		
		}
		if(180 < 75) {
		this.bus.emit('display?drawThingMLvar9', 0x0E, 0x76);
		
		} else {
		this.bus.emit('display?drawThingMLvar9_bis', 0x76, 0xEF);
		
		}
		if(239 < 226) {
		this.bus.emit('display?updatevar12', 0xC5, 0xE0);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0xE0, 0xFD);
		
		}
		if(12 < 139) {
		this.bus.emit('display?update_', 0x8B);
		
		} else {
		this.bus.emit('display?update__bis', 0x07);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xD1, 0x09, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x9A, 0x09, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar20) => {
		return lostBallvar20._port === 'game' && lostBallvar20._msg === 'lostBallvar20' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar20) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xBB, 0x63, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar20) => {
		return lostBallvar20._port === 'game' && lostBallvar20._msg === 'lostBallvar20' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar20) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar21_bis) => {
		return nextLevelvar21_bis._port === 'game' && nextLevelvar21_bis._msg === 'nextLevelvar21_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar21_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x52, 0x09, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar21_bis) => {
		return nextLevelvar21_bis._port === 'game' && nextLevelvar21_bis._msg === 'nextLevelvar21_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar21_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xD1, 0x63, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xEA, 0x63, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar20_bis) => {
		return lostBallvar20_bis._port === 'game' && lostBallvar20_bis._msg === 'lostBallvar20_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar20_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1E, 0x63, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar20_bis) => {
		return lostBallvar20_bis._port === 'game' && lostBallvar20_bis._msg === 'lostBallvar20_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar20_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar21) => {
		return nextLevelvar21._port === 'game' && nextLevelvar21._msg === 'nextLevelvar21' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar21) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x5B, 0x09, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar21) => {
		return nextLevelvar21._port === 'game' && nextLevelvar21._msg === 'nextLevelvar21' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar21) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xC7, 0x97, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x77, 0x97, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar20) => {
		return lostBallvar20._port === 'pro_game' && lostBallvar20._msg === 'lostBallvar20' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar20) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xB8, 0x45, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar20) => {
		return lostBallvar20._port === 'pro_game' && lostBallvar20._msg === 'lostBallvar20' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar20) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar21_bis) => {
		return nextLevelvar21_bis._port === 'pro_game' && nextLevelvar21_bis._msg === 'nextLevelvar21_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar21_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x86, 0x97, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar21_bis) => {
		return nextLevelvar21_bis._port === 'pro_game' && nextLevelvar21_bis._msg === 'nextLevelvar21_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar21_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xCA, 0x45, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xCA, 0x45, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar20_bis) => {
		return lostBallvar20_bis._port === 'pro_game' && lostBallvar20_bis._msg === 'lostBallvar20_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar20_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xA8, 0x45, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar20_bis) => {
		return lostBallvar20_bis._port === 'pro_game' && lostBallvar20_bis._msg === 'lostBallvar20_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar20_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar21) => {
		return nextLevelvar21._port === 'pro_game' && nextLevelvar21._msg === 'nextLevelvar21' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar21) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xC2, 0x97, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar21) => {
		return nextLevelvar21._port === 'pro_game' && nextLevelvar21._msg === 'nextLevelvar21' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar21) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar13_bis) => {
		return displayReadyvar13_bis._port === 'display' && displayReadyvar13_bis._msg === 'displayReadyvar13_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar13_bis) => {
		if(27 < 7) {
		this.bus.emit('display?clear_', 0xD9);
		
		} else {
		this.bus.emit('display?clear__bis', 0xE4);
		
		}
		if(251 < 168) {
		this.bus.emit('display?clearvar3', 0x2F, 0x32);
		
		} else {
		this.bus.emit('display?clearvar3_bis', 0xBD, 0x2F);
		
		}
		this.initColors();
		if(153 < 80) {
		this.bus.emit('display?setColorg', 0x79, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x69, this.BreakoutGame_bgcolor_var[1]
		);
		
		}
		if(135 < 208) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
		, 0x00, this.BreakoutGame_bgcolor_var[0]
		, 0x92);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0xC2, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[2]
		, 0x00);
		
		}
		if(48 < 39) {
		this.bus.emit('display?fillRectywidth', this.BreakoutGame_XDISPSIZE_var, 0, 0x48);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0xE9, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(119 < 116) {
		this.bus.emit('display?fillRectheightxvar7', 0x0F, 0x02, this.BreakoutGame_YDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x02, 0, this.BreakoutGame_YDISPSIZE_var, 0x77);
		
		}
		if(51 < 81) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
		, 0xAE, this.BreakoutGame_fgcolor_var[0]
		, 0x17);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0xDF, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xAE);
		
		}
		if(228 < 140) {
		this.bus.emit('display?setColorg', 0x6D, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x1B, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(39 < 133) {
		this.bus.emit('display?fillRectheightxvar7', 0x35, 0x29, 14, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x29, 0, 14, 0x64);
		
		}
		if(191 < 80) {
		this.bus.emit('display?fillRectywidth', this.BreakoutGame_XDISPSIZE_var, 0, 0xD7);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0xC0, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar13_bis) => {
		return displayReadyvar13_bis._port === 'display' && displayReadyvar13_bis._msg === 'displayReadyvar13_bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar13_bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var);
	}).effect((displayReady_) => {
		if(124 < 13) {
		this.bus.emit('display?clearvar3', 0x2F, 0x90);
		
		} else {
		this.bus.emit('display?clearvar3_bis', 0xDB, 0x2F);
		
		}
		if(18 < 155) {
		this.bus.emit('display?clear_', 0xF2);
		
		} else {
		this.bus.emit('display?clear__bis', 0xEB);
		
		}
		this.initColors();
		if(248 < 174) {
		this.bus.emit('display?setColorg', 0x46, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x9F, this.BreakoutGame_bgcolor_var[1]
		);
		
		}
		if(169 < 149) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
		, 0x00, this.BreakoutGame_bgcolor_var[0]
		, 0x56);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0xFC, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[2]
		, 0x00);
		
		}
		if(226 < 94) {
		this.bus.emit('display?fillRectywidth', this.BreakoutGame_XDISPSIZE_var, 0, 0x7A);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0xF1, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(48 < 242) {
		this.bus.emit('display?fillRectheightxvar7', 0xDC, 0x02, this.BreakoutGame_YDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x02, 0, this.BreakoutGame_YDISPSIZE_var, 0xEF);
		
		}
		if(141 < 175) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
		, 0xAE, this.BreakoutGame_fgcolor_var[0]
		, 0x85);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0x9B, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xAE);
		
		}
		if(168 < 57) {
		this.bus.emit('display?setColorg', 0xB8, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x7C, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(80 < 113) {
		this.bus.emit('display?fillRectywidth', this.BreakoutGame_XDISPSIZE_var, 0, 0x0B);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0x54, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(0 < 181) {
		this.bus.emit('display?fillRectheightxvar7', 0x47, 0x29, 14, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x29, 0, 14, 0x67);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var);
	}).effect((displayReady__bis) => {
		if(124 < 13) {
		this.bus.emit('display?clearvar3', 0x2F, 0x84);
		
		} else {
		this.bus.emit('display?clearvar3_bis', 0x72, 0x2F);
		
		}
		if(18 < 155) {
		this.bus.emit('display?clear_', 0x25);
		
		} else {
		this.bus.emit('display?clear__bis', 0xA9);
		
		}
		this.initColors();
		if(248 < 174) {
		this.bus.emit('display?setColorg', 0x71, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x66, this.BreakoutGame_bgcolor_var[1]
		);
		
		}
		if(169 < 149) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
		, 0x00, this.BreakoutGame_bgcolor_var[0]
		, 0x04);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0xF9, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[2]
		, 0x00);
		
		}
		if(226 < 94) {
		this.bus.emit('display?fillRectywidth', this.BreakoutGame_XDISPSIZE_var, 0, 0xF5);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0xC9, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(48 < 242) {
		this.bus.emit('display?fillRectheightxvar7', 0x10, 0x02, this.BreakoutGame_YDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x02, 0, this.BreakoutGame_YDISPSIZE_var, 0x11);
		
		}
		if(141 < 175) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
		, 0xAE, this.BreakoutGame_fgcolor_var[0]
		, 0x1E);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0xA0, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xAE);
		
		}
		if(168 < 57) {
		this.bus.emit('display?setColorg', 0xE6, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0xE5, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(80 < 113) {
		this.bus.emit('display?fillRectywidth', this.BreakoutGame_XDISPSIZE_var, 0, 0x9D);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0x9F, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(0 < 181) {
		this.bus.emit('display?fillRectheightxvar7', 0x7D, 0x29, 14, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x29, 0, 14, 0xF7);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var));
	}).effect((displayReady__bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar13) => {
		return displayReadyvar13._port === 'display' && displayReadyvar13._msg === 'displayReadyvar13' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar13) => {
		if(27 < 7) {
		this.bus.emit('display?clear_', 0xC6);
		
		} else {
		this.bus.emit('display?clear__bis', 0x11);
		
		}
		if(251 < 168) {
		this.bus.emit('display?clearvar3', 0x2F, 0x31);
		
		} else {
		this.bus.emit('display?clearvar3_bis', 0x2C, 0x2F);
		
		}
		this.initColors();
		if(153 < 80) {
		this.bus.emit('display?setColorg', 0x97, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0xB7, this.BreakoutGame_bgcolor_var[1]
		);
		
		}
		if(135 < 208) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
		, 0x00, this.BreakoutGame_bgcolor_var[0]
		, 0x29);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0x7D, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[2]
		, 0x00);
		
		}
		if(48 < 39) {
		this.bus.emit('display?fillRectywidth', this.BreakoutGame_XDISPSIZE_var, 0, 0x9C);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0xA1, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(119 < 116) {
		this.bus.emit('display?fillRectheightxvar7', 0x7C, 0x02, this.BreakoutGame_YDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x02, 0, this.BreakoutGame_YDISPSIZE_var, 0x1E);
		
		}
		if(51 < 81) {
		this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
		, 0xAE, this.BreakoutGame_fgcolor_var[0]
		, 0xEA);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 0x20, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xAE);
		
		}
		if(228 < 140) {
		this.bus.emit('display?setColorg', 0x78, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x7F, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(39 < 133) {
		this.bus.emit('display?fillRectheightxvar7', 0xC4, 0x29, 14, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x29, 0, 14, 0x70);
		
		}
		if(191 < 80) {
		this.bus.emit('display?fillRectywidth', this.BreakoutGame_XDISPSIZE_var, 0, 0xD2);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0x47, 0, this.BreakoutGame_XDISPSIZE_var);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar13) => {
		return displayReadyvar13._port === 'display' && displayReadyvar13._msg === 'displayReadyvar13' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar13) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var = true;
	});
	this._statemachine.to(null).when((positionyx) => {
		return positionyx._port === 'controller' && positionyx._msg === 'positionyx';
	}).effect((positionyx) => {
		this.BreakoutGame_SC_received_controller_positionyx_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positionyx.y;
		this.BreakoutGame_SC_controller_position_x_var = positionyx.x;
		if(this.BreakoutGame_SC_received_controller_positionvar16_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		this.BreakoutGame_SC_received_controller_positionvar16_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar16) => {
		return positionvar16._port === 'controller' && positionvar16._msg === 'positionvar16';
	}).effect((positionvar16) => {
		this.BreakoutGame_SC_received_controller_positionvar16_var = true;
		this.BreakoutGame_SC_controller_position_var16_var = positionvar16.var16;
		if(this.BreakoutGame_SC_received_controller_positionyx_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar16_var = false;
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar16_bis) => {
		return positionvar16_bis._port === 'controller' && positionvar16_bis._msg === 'positionvar16_bis';
	}).effect((positionvar16_bis) => {
		this.BreakoutGame_SC_received_controller_positionvar16_var = true;
		this.BreakoutGame_SC_controller_position_var16_var = positionvar16_bis.var16;
		if(this.BreakoutGame_SC_received_controller_positionyx_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar16_var = false;
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionyx_bis) => {
		return positionyx_bis._port === 'controller' && positionyx_bis._msg === 'positionyx_bis';
	}).effect((positionyx_bis) => {
		this.BreakoutGame_SC_received_controller_positionyx_var = true;
		this.BreakoutGame_SC_controller_position_y_var = positionyx_bis.y;
		this.BreakoutGame_SC_controller_position_x_var = positionyx_bis.x;
		if(this.BreakoutGame_SC_received_controller_positionvar16_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionyx_var = false;
		this.BreakoutGame_SC_received_controller_positionvar16_var = false;
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(173 < 6) {
		this.bus.emit('display?update_', 0x2D);
		
		} else {
		this.bus.emit('display?update__bis', 0x0B);
		
		}
		if(116 < 21) {
		this.bus.emit('display?updatevar12', 0x21, 0x20);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x20, 0x67);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x8B, 0, 0x7C, 33), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(225 < 245) {
		this.bus.emit('display?updatevar12', 0xF6, 0x8A);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x8A, 0x2F);
		
		}
		if(93 < 33) {
		this.bus.emit('display?update_', 0x0B);
		
		} else {
		this.bus.emit('display?update__bis', 0xED);
		
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
		if(70 < 13) {
		this.bus.emit('sound?tone_', 0x4F);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x2E);
		
		}
		if(106 < 120) {
		this.bus.emit('sound?tonetimevar22freq', this.BreakoutGame_tone_duration_var, 0x21, this.BreakoutGame_tone2_var, 0x5B);
		
		} else {
		this.bus.emit('sound?tonetimevar22freq_bis', 0x55, this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var, 0x21);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(50 < 209) {
		this.bus.emit('sound?tone_', 0x56);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xD2);
		
		}
		if(250 < 248) {
		this.bus.emit('sound?tonetimevar22freq', this.BreakoutGame_tone_duration_var, 0x3E, this.BreakoutGame_tone2_var, 0x7F);
		
		} else {
		this.bus.emit('sound?tonetimevar22freq_bis', 0x32, this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var, 0x3E);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(94 < 89) {
		this.bus.emit('sound?tonetimevar22freq', this.BreakoutGame_tone_duration_var, 0x34, this.BreakoutGame_tone2_var, 0xB5);
		
		} else {
		this.bus.emit('sound?tonetimevar22freq_bis', 0x43, this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var, 0x34);
		
		}
		if(223 < 69) {
		this.bus.emit('sound?tone_', 0x44);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x10);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(13 < 2) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x92), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0x58), 0);
		
		}
		if(185 < 203) {
		setTimeout(() => this.bus.emit('game?lostBallvar20', 0x64, 0xCD), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar20_bis', 0x64, 0xC2), 0);
		
		}
		if(145 < 25) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0xF4), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0x34), 0);
		
		}
		if(10 < 209) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar20', 0xD8, 0x99), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar20_bis', 0xD8, 0x73), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(92 < 191) {
		this.bus.emit('sound?tone_', 0x45);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x6D);
		
		}
		if(24 < 97) {
		this.bus.emit('sound?tonetimevar22freq', this.BreakoutGame_tone_duration_var, 0x37, this.BreakoutGame_tone2_var, 0x8B);
		
		} else {
		this.bus.emit('sound?tonetimevar22freq_bis', 0x84, this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var, 0x37);
		
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
		if(57 < 27) {
		this.bus.emit('sound?tone_', 0x6C);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xB3);
		
		}
		if(118 < 196) {
		this.bus.emit('sound?tonetimevar22freq', this.BreakoutGame_tone_duration_var, 0x68, this.BreakoutGame_tone1_var, 0x29);
		
		} else {
		this.bus.emit('sound?tonetimevar22freq_bis', 0x06, this.BreakoutGame_tone1_var, this.BreakoutGame_tone_duration_var, 0x68);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(238 < 53) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0x49), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0xA3), 0);
		
		}
		if(60 < 241) {
		setTimeout(() => this.bus.emit('game?nextLevelvar21', 0x6E, 0x6D), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar21_bis', 0x6F, 0x6E), 0);
		
		}
		if(163 < 7) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0x8A), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0x63), 0);
		
		}
		if(121 < 191) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar21', 0xF3, 0xBA), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar21_bis', 0x01, 0xF3), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(232 < 162) {
		const by_const = this.BreakoutGame_by_var;
		const pady_const = this.BreakoutGame_pady_var;
		const padx_const = this.BreakoutGame_padx_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadyballxpadxvar17', by_const, 0x3B, pady_const, padx_const, bx_const, 0x21), 0);
		
		} else {
		const pady_const = this.BreakoutGame_pady_var;
		const padx_const = this.BreakoutGame_padx_var;
		const bx_const = this.BreakoutGame_bx_var;
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadyballxpadxvar17_bis', 0x3B, pady_const, 0xE8, padx_const, bx_const, by_const), 0);
		
		}
		if(128 < 240) {
		setTimeout(() => this.bus.emit('ia?updateIA_', 0x09), 0);
		
		} else {
		setTimeout(() => this.bus.emit('ia?updateIA__bis', 0x14), 0);
		
		}
		if(24 < 24) {
		this.bus.emit('display?update_', 0x68);
		
		} else {
		this.bus.emit('display?update__bis', 0xE4);
		
		}
		if(36 < 245) {
		this.bus.emit('display?updatevar12', 0x11, 0x85);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x85, 0x91);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0x13, 0, 0xE3, period_const), 0);
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
	if(190 < 225) {
	this.bus.emit('display?setBGColorb', 0x4A, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x62);
	
	}
	if(94 < 161) {
	this.bus.emit('display?setBGColorvar5rg', 0x28, 0x14, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorvar5rg_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x28, 0xA8);
	
	}
	if(142 < 237) {
	this.bus.emit('display?setColorg', 0xC5, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x3A, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(224 < 50) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
	, 0x4B, this.BreakoutGame_fgcolor_var[0]
	, 0x5B);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x3D, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x4B);
	
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
	if(65 < 193) {
	this.bus.emit('display?setColorg', 0x9A, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x83, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(61 < 40) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
	, 0x5E, this.BreakoutGame_bgcolor_var[0]
	, 0x5D);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x4E, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x5E);
	
	}
	if(108 < 10) {
	this.bus.emit('display?fillRectywidth', bs_var, this.BreakoutGame_prevBY_var, 0xA1);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x78, this.BreakoutGame_prevBY_var, bs_var);
	
	}
	if(144 < 96) {
	this.bus.emit('display?fillRectheightxvar7', 0xE2, 0x81, bs_var, this.BreakoutGame_prevBX_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x81, this.BreakoutGame_prevBX_var, bs_var, 0x58);
	
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
	if(12 < 201) {
	this.bus.emit('display?setColorg', 0xA8, 199);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x08, 199);
	
	}
	if(229 < 182) {
	this.bus.emit('display?setColorbrvar4', 111, 0xDD, 183, 0xA4);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x1B, 183, 111, 0xDD);
	
	}
	if(74 < 28) {
	this.bus.emit('display?fillRectheightxvar7', 0x11, 0x1D, bs_var, this.BreakoutGame_prevBX_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x1D, this.BreakoutGame_prevBX_var, bs_var, 0x57);
	
	}
	if(204 < 195) {
	this.bus.emit('display?fillRectywidth', bs_var, this.BreakoutGame_prevBY_var, 0x9A);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x06, this.BreakoutGame_prevBY_var, bs_var);
	
	}
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(134 < 7) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
	, 0x8A, this.BreakoutGame_bgcolor_var[0]
	, 0x8D);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x00, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x8A);
	
	}
	if(106 < 81) {
	this.bus.emit('display?setColorg', 0x87, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x43, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(220 < 170) {
	this.bus.emit('display?fillRectywidth', ps_var, this.BreakoutGame_prevPY_var, 0xE9);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x52, this.BreakoutGame_prevPY_var, ps_var);
	
	}
	if(240 < 109) {
	this.bus.emit('display?fillRectheightxvar7', 0xF1, 0xC5, 4, this.BreakoutGame_prevPX_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xC5, this.BreakoutGame_prevPX_var, 4, 0x7F);
	
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
	if(120 < 102) {
	this.bus.emit('display?setColorg', 0xEF, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x9A, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(16 < 190) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
	, 0x95, this.BreakoutGame_fgcolor_var[0]
	, 0x2C);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0xC8, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x95);
	
	}
	if(140 < 93) {
	this.bus.emit('display?fillRectheightxvar7', 0x2A, 0xA8, 4, this.BreakoutGame_prevPX_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xA8, this.BreakoutGame_prevPX_var, 4, 0x18);
	
	}
	if(19 < 195) {
	this.bus.emit('display?fillRectywidth', ps_var, this.BreakoutGame_prevPY_var, 0xEC);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0xF0, this.BreakoutGame_prevPY_var, ps_var);
	
	}
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(166 < 82) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
	, 0x0A, this.BreakoutGame_fgcolor_var[0]
	, 0xFE);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x18, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x0A);
	
	}
	if(219 < 131) {
	this.bus.emit('display?setColorg', 0xBC, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x68, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(201 < 122) {
	this.bus.emit('display?setColorg', 0xD1, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xD2, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(2 < 33) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
	, 0x28, this.BreakoutGame_fgcolor_var[0]
	, 0x94);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x7A, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x28);
	
	}
	if(10 < 8) {
	this.bus.emit('display?setBGColorvar5rg', 0xC2, 0x72, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorvar5rg_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xC2, 0x0B);
	
	}
	if(115 < 113) {
	this.bus.emit('display?setBGColorb', 0x69, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x5F);
	
	}
	if(68 < 177) {
	this.bus.emit('display?drawIntegervdigitsscalevar8y', 1, 90, 0x60, 0x77, 4, BreakoutGame_drawCountDown_c_var);
	
	} else {
	this.bus.emit('display?drawIntegervdigitsscalevar8y_bis', 90, 0x92, 4, BreakoutGame_drawCountDown_c_var, 1, 0x60);
	
	}
	if(242 < 184) {
	this.bus.emit('display?drawIntegerx', 0xAB, 80 - 6);
	
	} else {
	this.bus.emit('display?drawIntegerx_bis', 80 - 6, 0xD6);
	
	}
	
	} else {
	if(95 < 199) {
	this.bus.emit('display?setColorg', 0x4F, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xFA, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(7 < 73) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
	, 0x9F, this.BreakoutGame_bgcolor_var[0]
	, 0xE3);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x6F, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x9F);
	
	}
	if(197 < 200) {
	this.bus.emit('display?fillRectheightxvar7', 0xB8, 0x23, 20, 80 - 6);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x23, 80 - 6, 20, 0xC7);
	
	}
	if(142 < 247) {
	this.bus.emit('display?fillRectywidth', 12, 90, 0xB8);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x91, 90, 12);
	
	}
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	if(247 < 255) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
	, 0xE1, this.BreakoutGame_fgcolor_var[0]
	, 0x85);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0xFB, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, 0xE1);
	
	}
	if(199 < 61) {
	this.bus.emit('display?setColorg', 0xF7, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xED, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(81 < 113) {
	this.bus.emit('display?fillRectywidth', xcenter_var + 1, top_var - 1, 0xBF);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x32, top_var - 1, xcenter_var + 1);
	
	}
	if(191 < 33) {
	this.bus.emit('display?fillRectheightxvar7', 0xBD, 0xB1, 1, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xB1, left_var - 1, 1, 0x08);
	
	}
	if(168 < 60) {
	this.bus.emit('display?fillRectywidth', xcenter_var + 1, bottom_var, 0xD9);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x5F, bottom_var, xcenter_var + 1);
	
	}
	if(166 < 167) {
	this.bus.emit('display?fillRectheightxvar7', 0x88, 0x73, 1, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x73, left_var - 1, 1, 0x68);
	
	}
	if(43 < 146) {
	this.bus.emit('display?fillRectheightxvar7', 0x44, 0xCE, ycenter_var, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xCE, left_var - 1, ycenter_var, 0xBB);
	
	}
	if(230 < 142) {
	this.bus.emit('display?fillRectywidth', 1, top_var, 0xBF);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x0D, top_var, 1);
	
	}
	if(9 < 64) {
	this.bus.emit('display?fillRectywidth', 1, top_var, 0xB1);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x84, top_var, 1);
	
	}
	if(96 < 235) {
	this.bus.emit('display?fillRectheightxvar7', 0x10, 0x01, ycenter_var, right_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x01, right_var, ycenter_var, 0xF0);
	
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
	if(100 < 185) {
	this.bus.emit('display?setColorbrvar4', 89, 0x01, 155, 0x84);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0xB5, 155, 89, 0x01);
	
	}
	if(106 < 198) {
	this.bus.emit('display?setColorg', 0xCF, 103);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x81, 103);
	
	}
	if(11 < 62) {
	this.bus.emit('display?fillRectywidth', w_var, by_var, 0x87);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x11, by_var, w_var);
	
	}
	if(182 < 44) {
	this.bus.emit('display?fillRectheightxvar7', 0xB8, 0xDA, h_var, bx_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xDA, bx_var, h_var, 0xE6);
	
	}
	if(145 < 113) {
	this.bus.emit('display?setColorg', 0x87, 56);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xA4, 56);
	
	}
	if(116 < 212) {
	this.bus.emit('display?setColorbrvar4', 43, 0x85, 100, 0xA1);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0xC7, 100, 43, 0x85);
	
	}
	if(120 < 154) {
	this.bus.emit('display?drawRectheight', h_var, 0xB6);
	
	} else {
	this.bus.emit('display?drawRectheight_bis', 0x5C, h_var);
	
	}
	if(115 < 163) {
	this.bus.emit('display?drawRectyvar6xwidth', by_var, bx_var, 0x05, w_var, 0x5B);
	
	} else {
	this.bus.emit('display?drawRectyvar6xwidth_bis', w_var, 0x05, 0xC8, by_var, bx_var);
	
	}
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(124 < 77) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
	, 0xBE, this.BreakoutGame_bgcolor_var[0]
	, 0xEE);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x4E, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, 0xBE);
	
	}
	if(117 < 16) {
	this.bus.emit('display?setColorg', 0x43, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xA2, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(204 < 240) {
	this.bus.emit('display?fillRectywidth', (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), by_var, 0x64);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x8B, by_var, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
	
	}
	if(85 < 68) {
	this.bus.emit('display?fillRectheightxvar7', 0xF7, 0xB4, this.BreakoutGame_BRICK_HEIGHT_var - 2, bx_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xB4, bx_var, this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x4F);
	
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
	if(148 < 58) {
	this.bus.emit('display?setColorg', 0x51, 209);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xDA, 209);
	
	}
	if(133 < 77) {
	this.bus.emit('display?setColorbrvar4', 130, 0x24, 158, 0x7D);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x9B, 158, 130, 0x24);
	
	}
	if(104 < 95) {
	this.bus.emit('display?setBGColorvar5rg', 0x46, 0xF8, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorvar5rg_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x46, 0xED);
	
	}
	if(85 < 219) {
	this.bus.emit('display?setBGColorb', 0xAD, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0xD4);
	
	}
	if(35 < 206) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_bgcolor_var[2]
	, 0x7B, this.BreakoutGame_bgcolor_var[0]
	, 0xC4);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x41, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x7B);
	
	}
	if(13 < 99) {
	this.bus.emit('display?setColorg', 0x19, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xBD, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(25 < 67) {
	this.bus.emit('display?drawIntegerx', 0x6B, 6);
	
	} else {
	this.bus.emit('display?drawIntegerx_bis', 6, 0x86);
	
	}
	if(174 < 8) {
	this.bus.emit('display?drawIntegervdigitsscalevar8y', 2, 2, 0x13, 0xE0, 2, this.BreakoutGame_level_var);
	
	} else {
	this.bus.emit('display?drawIntegervdigitsscalevar8y_bis', 2, 0xEB, 2, this.BreakoutGame_level_var, 2, 0x13);
	
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
	if(106 < 171) {
	this.bus.emit('display?setColorbrvar4', 130, 0x8B, 158, 0xC6);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0xA6, 158, 130, 0x8B);
	
	}
	if(39 < 19) {
	this.bus.emit('display?setColorg', 0x80, 209);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x3B, 209);
	
	}
	if(125 < 155) {
	this.bus.emit('display?setBGColorb', 0x53, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x4B);
	
	}
	if(253 < 45) {
	this.bus.emit('display?setBGColorvar5rg', 0x9C, 0x01, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorvar5rg_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x9C, 0xD0);
	
	}
	if(250 < 7) {
	this.bus.emit('display?drawIntegervdigitsscalevar8y', 5, 2, 0x93, 0x3C, 2, this.BreakoutGame_score_var);
	
	} else {
	this.bus.emit('display?drawIntegervdigitsscalevar8y_bis', 2, 0x57, 2, this.BreakoutGame_score_var, 5, 0x93);
	
	}
	if(39 < 181) {
	this.bus.emit('display?drawIntegerx', 0x5C, 58);
	
	} else {
	this.bus.emit('display?drawIntegerx_bis', 58, 0x21);
	
	}
}

BreakoutGameBrowser.prototype.drawLives = function() {
	if(238 < 71) {
	this.bus.emit('display?setColorbrvar4', this.BreakoutGame_fgcolor_var[2]
	, 0xF4, this.BreakoutGame_fgcolor_var[0]
	, 0x23);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x68, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, 0xF4);
	
	}
	if(117 < 29) {
	this.bus.emit('display?setColorg', 0x4E, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x45, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(219 < 176) {
	this.bus.emit('display?fillRectywidth', 24 + 6, 4, 0x9B);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0x16, 4, 24 + 6);
	
	}
	if(24 < 89) {
	this.bus.emit('display?fillRectheightxvar7', 0x3D, 0x34, 6, 124);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x34, 124, 6, 0x2D);
	
	}
	if(52 < 58) {
	this.bus.emit('display?setColorbrvar4', 111, 0x46, 183, 0x78);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 0x3A, 183, 111, 0x46);
	
	}
	if(101 < 42) {
	this.bus.emit('display?setColorg', 0x14, 199);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x40, 199);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(86 < 152) {
	this.bus.emit('display?fillRectywidth', 6, 4, 0x89);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 0xFE, 4, 6);
	
	}
	if(213 < 207) {
	this.bus.emit('display?fillRectheightxvar7', 0xCE, 0x9F, 6, 124 + (2 - i_var) * 12);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x9F, 124 + (2 - i_var) * 12, 6, 0x84);
	
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(var2, var24, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", var2:var2, var24:var24, id:id});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(var38) {
	this._receive({_port:"display", _msg:"displayReady_", var38:var38});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar13Ondisplay = function(var39, var13) {
	this._receive({_port:"display", _msg:"displayReadyvar13", var39:var39, var13:var13});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(var26) {
	this._receive({_port:"display", _msg:"displayError_", var26:var26});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar14Ondisplay = function(var14, var27) {
	this._receive({_port:"display", _msg:"displayErrorvar14", var14:var14, var27:var27});
}

BreakoutGameBrowser.prototype.receivedisplayReady__bisOndisplay = function(var62) {
	this._receive({_port:"display", _msg:"displayReady__bis", var62:var62});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar13_bisOndisplay = function(var63, var13) {
	this._receive({_port:"display", _msg:"displayReadyvar13_bis", var63:var63, var13:var13});
}

BreakoutGameBrowser.prototype.receivedisplayError__bisOndisplay = function(var50) {
	this._receive({_port:"display", _msg:"displayError__bis", var50:var50});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar14_bisOndisplay = function(var51, var14) {
	this._receive({_port:"display", _msg:"displayErrorvar14_bis", var51:var51, var14:var14});
}

BreakoutGameBrowser.prototype.receivepositionvar16Oncontroller = function(var16, var74) {
	this._receive({_port:"controller", _msg:"positionvar16", var16:var16, var74:var74});
}

BreakoutGameBrowser.prototype.receivepositionyxOncontroller = function(x, y, var75) {
	this._receive({_port:"controller", _msg:"positionyx", x:x, y:y, var75:var75});
}

BreakoutGameBrowser.prototype.receivepositionvar16_bisOncontroller = function(var78, var16) {
	this._receive({_port:"controller", _msg:"positionvar16_bis", var78:var78, var16:var16});
}

BreakoutGameBrowser.prototype.receivepositionyx_bisOncontroller = function(x, var79, y) {
	this._receive({_port:"controller", _msg:"positionyx_bis", x:x, var79:var79, y:y});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(var96) {
	this._receive({_port:"game", _msg:"lostBall_", var96:var96});
}

BreakoutGameBrowser.prototype.receivelostBallvar20Ongame = function(var20, var97) {
	this._receive({_port:"game", _msg:"lostBallvar20", var20:var20, var97:var97});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(var94) {
	this._receive({_port:"game", _msg:"nextLevel_", var94:var94});
}

BreakoutGameBrowser.prototype.receivenextLevelvar21Ongame = function(var21, var95) {
	this._receive({_port:"game", _msg:"nextLevelvar21", var21:var21, var95:var95});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOngame = function(var100) {
	this._receive({_port:"game", _msg:"lostBall__bis", var100:var100});
}

BreakoutGameBrowser.prototype.receivelostBallvar20_bisOngame = function(var20, var101) {
	this._receive({_port:"game", _msg:"lostBallvar20_bis", var20:var20, var101:var101});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOngame = function(var98) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var98:var98});
}

BreakoutGameBrowser.prototype.receivenextLevelvar21_bisOngame = function(var99, var21) {
	this._receive({_port:"game", _msg:"nextLevelvar21_bis", var99:var99, var21:var21});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(var96) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var96:var96});
}

BreakoutGameBrowser.prototype.receivelostBallvar20Onpro_game = function(var20, var97) {
	this._receive({_port:"pro_game", _msg:"lostBallvar20", var20:var20, var97:var97});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(var94) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var94:var94});
}

BreakoutGameBrowser.prototype.receivenextLevelvar21Onpro_game = function(var21, var95) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar21", var21:var21, var95:var95});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOnpro_game = function(var100) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var100:var100});
}

BreakoutGameBrowser.prototype.receivelostBallvar20_bisOnpro_game = function(var20, var101) {
	this._receive({_port:"pro_game", _msg:"lostBallvar20_bis", var20:var20, var101:var101});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOnpro_game = function(var98) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var98:var98});
}

BreakoutGameBrowser.prototype.receivenextLevelvar21_bisOnpro_game = function(var99, var21) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar21_bis", var99:var99, var21:var21});
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar20_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar20_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var = BreakoutGame_SC_PLAY_received_game_lostBallvar20_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_var13_var = function(BreakoutGame_SC_INIT_display_displayReady_var13_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var13_var = BreakoutGame_SC_INIT_display_displayReady_var13_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var20_var = function(BreakoutGame_SC_PLAY_game_lostBall_var20_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var20_var = BreakoutGame_SC_PLAY_game_lostBall_var20_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_var16_var = function(BreakoutGame_SC_controller_position_var16_var) {
	this.BreakoutGame_SC_controller_position_var16_var = BreakoutGame_SC_controller_position_var16_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar21_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var21_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var21_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var21_var = BreakoutGame_SC_PLAY_game_nextLevel_var21_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var21_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var21_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var21_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var21_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionvar16_var = function(BreakoutGame_SC_received_controller_positionvar16_var) {
	this.BreakoutGame_SC_received_controller_positionvar16_var = BreakoutGame_SC_received_controller_positionvar16_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var20_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var20_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var20_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var20_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar13_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar13_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var = BreakoutGame_SC_INIT_received_display_displayReadyvar13_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionyx_var = function(BreakoutGame_SC_received_controller_positionyx_var) {
	this.BreakoutGame_SC_received_controller_positionyx_var = BreakoutGame_SC_received_controller_positionyx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\treceived_game_lostBallvar20 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar20_var;
	result += '\n\tdisplay_displayReady_var13 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var13_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\treceived_pro_game_nextLevelvar21 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\tgame_lostBall_var20 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var20_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tcontroller_position_var16 = ' + this.BreakoutGame_SC_controller_position_var16_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\treceived_game_nextLevelvar21 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar21_var;
	result += '\n\tgame_nextLevel_var21 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var21_var;
	result += '\n\tpro_game_nextLevel_var21 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var21_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\treceived_pro_game_lostBallvar20 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var;
	result += '\n\treceived_controller_positionvar16 = ' + this.BreakoutGame_SC_received_controller_positionvar16_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\tpro_game_lostBall_var20 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var20_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\treceived_display_displayReadyvar13 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\treceived_controller_positionyx = ' + this.BreakoutGame_SC_received_controller_positionyx_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '';
	return result;
}

