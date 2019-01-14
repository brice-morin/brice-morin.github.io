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
		if(169 < 149) {
		this.bus.emit('display?create_', 0x11);
		
		} else {
		this.bus.emit('display?create__bis', 0x31);
		
		}
		if(226 < 94) {
		this.bus.emit('display?createxsizeysizevar10', this.BreakoutGame_YDISPSIZE_var, 0x00, 0x2C, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?createxsizeysizevar10_bis', 0x00, 0x97, this.BreakoutGame_YDISPSIZE_var, this.BreakoutGame_XDISPSIZE_var);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x44, 0x7C, 33, 0), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(116 < 21) {
		this.bus.emit('display?update_', 0x10);
		
		} else {
		this.bus.emit('display?update__bis', 0x92);
		
		}
		if(70 < 13) {
		this.bus.emit('display?updatevar12', 0x58, 0x8A);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0xCD, 0x8A);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0x6C, 0x3E, period_const, 0), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xE7, 0x3A, 500, 0), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(76 < 183) {
		this.bus.emit('display?updatevar12', 0x39, 0x1E);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x9F, 0x1E);
		
		}
		if(40 < 205) {
		this.bus.emit('display?update_', 0xB6);
		
		} else {
		this.bus.emit('display?update__bis', 0xB8);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x22, 0xFD, 1000, 0), 0);
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
		if(92 < 118) {
		this.bus.emit('display?update_', 0x40);
		
		} else {
		this.bus.emit('display?update__bis', 0x8D);
		
		}
		if(119 < 30) {
		this.bus.emit('display?updatevar12', 0x78, 0xA7);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x7A, 0xA7);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(231 < 130) {
		this.bus.emit('display?setColorbrvar4', 0x47, 0x96, 255, 255);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 255, 0x96, 0xC5, 255);
		
		}
		if(15 < 190) {
		this.bus.emit('display?setColorg', 0x9A, 255);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x50, 255);
		
		}
		if(145 < 14) {
		this.bus.emit('display?fillRectheightxvar7', 76, 0xEE, 0xFB, 8);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0xF1, 8, 76, 0xFB);
		
		}
		if(94 < 143) {
		this.bus.emit('display?fillRectywidth', 0xE0, 30, 142);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 30, 142, 0xDC);
		
		}
		if(239 < 94) {
		this.bus.emit('display?setColorg', 0x39, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0xAE, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(144 < 225) {
		this.bus.emit('display?setColorbrvar4', 0x0E, 0xF6, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
		, 0xF6, 0xEF, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(238 < 225) {
		this.bus.emit('display?fillRectheightxvar7', 50, 0xC5, 0x34, 9);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0xFD, 9, 50, 0x34);
		
		}
		if(179 < 15) {
		this.bus.emit('display?fillRectywidth', 0x8B, 31, 140);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 31, 140, 0x07);
		
		}
		if(36 < 18) {
		this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
		, 0xE3);
		
		} else {
		this.bus.emit('display?setBGColorb_bis', 0x97, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(206 < 58) {
		this.bus.emit('display?setBGColorvar5rg', 0x43, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x58);
		
		} else {
		this.bus.emit('display?setBGColorvar5rg_bis', 0xE5, 0x43, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(169 < 56) {
		this.bus.emit('display?setColorg', 0x80, 209);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x92, 209);
		
		}
		if(73 < 165) {
		this.bus.emit('display?setColorbrvar4', 0x21, 0x5F, 130, 158);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', 158, 0x5F, 0x81, 130);
		
		}
		if(180 < 75) {
		this.bus.emit('display?drawIntegervdigitsscalevar8y', 6, 0x5C, 5, this.BreakoutGame_score_var, 40, 0x63);
		
		} else {
		this.bus.emit('display?drawIntegervdigitsscalevar8y_bis', 5, 40, 6, 0x5C, this.BreakoutGame_score_var, 0x32);
		
		}
		if(239 < 226) {
		this.bus.emit('display?drawIntegerx', 0x02, 23);
		
		} else {
		this.bus.emit('display?drawIntegerx_bis', 23, 0x4E);
		
		}
		if(12 < 139) {
		this.bus.emit('display?drawThingMLvar9', 0x76, 0x1F);
		
		} else {
		this.bus.emit('display?drawThingMLvar9_bis', 0x76, 0x6A);
		
		}
		if(27 < 179) {
		this.bus.emit('display?drawThingMLxy', 87, 26, 0x4E);
		
		} else {
		this.bus.emit('display?drawThingMLxy_bis', 0xE7, 87, 26);
		
		}
		if(252 < 46) {
		this.bus.emit('display?updatevar12', 0xFD, 0xE0);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x44, 0xE0);
		
		}
		if(242 < 88) {
		this.bus.emit('display?update_', 0x70);
		
		} else {
		this.bus.emit('display?update__bis', 0x56);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar21) => {
		return lostBallvar21._port === 'pro_game' && lostBallvar21._msg === 'lostBallvar21' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar21) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1C, 0, 0xA6), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar21) => {
		return lostBallvar21._port === 'pro_game' && lostBallvar21._msg === 'lostBallvar21' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar21) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1C, 0, 0xDA), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar22) => {
		return nextLevelvar22._port === 'pro_game' && nextLevelvar22._msg === 'nextLevelvar22' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar22) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xA7, 0, 0x29), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar22) => {
		return nextLevelvar22._port === 'pro_game' && nextLevelvar22._msg === 'nextLevelvar22' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar22) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar22_bis) => {
		return nextLevelvar22_bis._port === 'pro_game' && nextLevelvar22_bis._msg === 'nextLevelvar22_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar22_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xA7, 0, 0xAD), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar22_bis) => {
		return nextLevelvar22_bis._port === 'pro_game' && nextLevelvar22_bis._msg === 'nextLevelvar22_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar22_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xA7, 0, 0xDA), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar21_bis) => {
		return lostBallvar21_bis._port === 'pro_game' && lostBallvar21_bis._msg === 'lostBallvar21_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar21_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1C, 0, 0x13), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar21_bis) => {
		return lostBallvar21_bis._port === 'pro_game' && lostBallvar21_bis._msg === 'lostBallvar21_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar21_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1C, 0, 0x2F), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xA7, 0, 0x06), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar13) => {
		return displayReadyvar13._port === 'display' && displayReadyvar13._msg === 'displayReadyvar13' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar13) => {
		if(119 < 116) {
		this.bus.emit('display?clear_', 0x66);
		
		} else {
		this.bus.emit('display?clear__bis', 0x04);
		
		}
		if(51 < 81) {
		this.bus.emit('display?clearvar3', 0xF9, 0x02);
		
		} else {
		this.bus.emit('display?clearvar3_bis', 0x02, 0xF5);
		
		}
		this.initColors();
		if(228 < 140) {
		this.bus.emit('display?setColorbrvar4', 0xC9, 0xAE, this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
		, 0xAE, 0x10, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(39 < 133) {
		this.bus.emit('display?setColorg', 0x11, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x1E, this.BreakoutGame_bgcolor_var[1]
		);
		
		}
		if(191 < 80) {
		this.bus.emit('display?fillRectywidth', 0xA0, 0, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0xE6);
		
		}
		if(139 < 178) {
		this.bus.emit('display?fillRectheightxvar7', this.BreakoutGame_YDISPSIZE_var, 0xE5, 0x29, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x9D, 0, this.BreakoutGame_YDISPSIZE_var, 0x29);
		
		}
		if(190 < 24) {
		this.bus.emit('display?setColorg', 0x9F, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x7D, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(225 < 245) {
		this.bus.emit('display?setColorbrvar4', 0xF7, 0x7C, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x7C, 0xD9, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(93 < 33) {
		this.bus.emit('display?fillRectheightxvar7', 14, 0xE4, 0x2D, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x32, 0, 14, 0x2D);
		
		}
		if(173 < 6) {
		this.bus.emit('display?fillRectywidth', 0xBD, 0, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0x79);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var);
	}).effect((displayReady_) => {
		if(48 < 242) {
		this.bus.emit('display?clear_', 0xB7);
		
		} else {
		this.bus.emit('display?clear__bis', 0x29);
		
		}
		if(141 < 175) {
		this.bus.emit('display?clearvar3', 0x7D, 0x02);
		
		} else {
		this.bus.emit('display?clearvar3_bis', 0x02, 0x9C);
		
		}
		this.initColors();
		if(168 < 57) {
		this.bus.emit('display?setColorg', 0xA1, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x7C, this.BreakoutGame_bgcolor_var[1]
		);
		
		}
		if(80 < 113) {
		this.bus.emit('display?setColorbrvar4', 0x1E, 0xAE, this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
		, 0xAE, 0xEA, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(0 < 181) {
		this.bus.emit('display?fillRectheightxvar7', this.BreakoutGame_YDISPSIZE_var, 0x20, 0x29, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x78, 0, this.BreakoutGame_YDISPSIZE_var, 0x29);
		
		}
		if(27 < 7) {
		this.bus.emit('display?fillRectywidth', 0x7F, 0, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0xC4);
		
		}
		if(251 < 168) {
		this.bus.emit('display?setColorg', 0x70, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0xD2, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(153 < 80) {
		this.bus.emit('display?setColorbrvar4', 0x47, 0x7C, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x7C, 0x84, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(135 < 208) {
		this.bus.emit('display?fillRectywidth', 0x72, 0, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0x25);
		
		}
		if(48 < 39) {
		this.bus.emit('display?fillRectheightxvar7', 14, 0xA9, 0x2D, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x71, 0, 14, 0x2D);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar13_bis) => {
		return displayReadyvar13_bis._port === 'display' && displayReadyvar13_bis._msg === 'displayReadyvar13_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar13_bis) => {
		if(119 < 116) {
		this.bus.emit('display?clear_', 0x8B);
		
		} else {
		this.bus.emit('display?clear__bis', 0xF6);
		
		}
		if(51 < 81) {
		this.bus.emit('display?clearvar3', 0x2F, 0x02);
		
		} else {
		this.bus.emit('display?clearvar3_bis', 0x02, 0x0B);
		
		}
		this.initColors();
		if(228 < 140) {
		this.bus.emit('display?setColorbrvar4', 0xED, 0xAE, this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
		, 0xAE, 0x2D, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(39 < 133) {
		this.bus.emit('display?setColorg', 0x0B, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x21, this.BreakoutGame_bgcolor_var[1]
		);
		
		}
		if(191 < 80) {
		this.bus.emit('display?fillRectywidth', 0x67, 0, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0xB9);
		
		}
		if(139 < 178) {
		this.bus.emit('display?fillRectheightxvar7', this.BreakoutGame_YDISPSIZE_var, 0x4F, 0x29, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x2E, 0, this.BreakoutGame_YDISPSIZE_var, 0x29);
		
		}
		if(190 < 24) {
		this.bus.emit('display?setColorg', 0x5B, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x55, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(225 < 245) {
		this.bus.emit('display?setColorbrvar4', 0x56, 0x7C, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x7C, 0xD2, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(93 < 33) {
		this.bus.emit('display?fillRectheightxvar7', 14, 0x7F, 0x2D, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x32, 0, 14, 0x2D);
		
		}
		if(173 < 6) {
		this.bus.emit('display?fillRectywidth', 0xB5, 0, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0x43);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var);
	}).effect((displayReady__bis) => {
		if(48 < 242) {
		this.bus.emit('display?clear_', 0x69);
		
		} else {
		this.bus.emit('display?clear__bis', 0x92);
		
		}
		if(141 < 175) {
		this.bus.emit('display?clearvar3', 0xC2, 0x02);
		
		} else {
		this.bus.emit('display?clearvar3_bis', 0x02, 0x48);
		
		}
		this.initColors();
		if(168 < 57) {
		this.bus.emit('display?setColorg', 0xE9, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0x0F, this.BreakoutGame_bgcolor_var[1]
		);
		
		}
		if(80 < 113) {
		this.bus.emit('display?setColorbrvar4', 0x77, 0xAE, this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
		, 0xAE, 0x17, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(0 < 181) {
		this.bus.emit('display?fillRectheightxvar7', this.BreakoutGame_YDISPSIZE_var, 0xDF, 0x29, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0x6D, 0, this.BreakoutGame_YDISPSIZE_var, 0x29);
		
		}
		if(27 < 7) {
		this.bus.emit('display?fillRectywidth', 0x1B, 0, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0x35);
		
		}
		if(251 < 168) {
		this.bus.emit('display?setColorg', 0x64, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorg_bis', 0xD7, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(153 < 80) {
		this.bus.emit('display?setColorbrvar4', 0xC0, 0x7C, this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x7C, 0x00, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(135 < 208) {
		this.bus.emit('display?fillRectywidth', 0x5C, 0, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectywidth_bis', 0, this.BreakoutGame_XDISPSIZE_var, 0xBF);
		
		}
		if(48 < 39) {
		this.bus.emit('display?fillRectheightxvar7', 14, 0xA4, 0x2D, 0);
		
		} else {
		this.bus.emit('display?fillRectheightxvar7_bis', 0xAE, 0, 14, 0x2D);
		
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
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar21) => {
		return lostBallvar21._port === 'game' && lostBallvar21._msg === 'lostBallvar21' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar21) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x45, 0, 0xC6), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar21) => {
		return lostBallvar21._port === 'game' && lostBallvar21._msg === 'lostBallvar21' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar21) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x45, 0, 0x34), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar22) => {
		return nextLevelvar22._port === 'game' && nextLevelvar22._msg === 'nextLevelvar22' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar22) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x97, 0, 0xC1), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar22) => {
		return nextLevelvar22._port === 'game' && nextLevelvar22._msg === 'nextLevelvar22' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar22) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar22_bis) => {
		return nextLevelvar22_bis._port === 'game' && nextLevelvar22_bis._msg === 'nextLevelvar22_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar22_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x97, 0, 0x28), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar22_bis) => {
		return nextLevelvar22_bis._port === 'game' && nextLevelvar22_bis._msg === 'nextLevelvar22_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar22_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x97, 0, 0xDE), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar21_bis) => {
		return lostBallvar21_bis._port === 'game' && lostBallvar21_bis._msg === 'lostBallvar21_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar21_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x45, 0, 0xFB), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar21_bis) => {
		return lostBallvar21_bis._port === 'game' && lostBallvar21_bis._msg === 'lostBallvar21_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar21_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x45, 0, 0xED), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x97, 0, 0xC4), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
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
		if(223 < 69) {
		this.bus.emit('sound?tonetimevar20', 0xB3, this.BreakoutGame_tone_duration_var, 0x34);
		
		} else {
		this.bus.emit('sound?tonetimevar20_bis', this.BreakoutGame_tone_duration_var, 0x29, 0x34);
		
		}
		if(13 < 2) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x06);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', this.BreakoutGame_tone2_var, 0x49);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(185 < 203) {
		this.bus.emit('sound?tonetimevar20', 0xA3, this.BreakoutGame_tone_duration_var, 0x64);
		
		} else {
		this.bus.emit('sound?tonetimevar20_bis', this.BreakoutGame_tone_duration_var, 0x6D, 0x64);
		
		}
		if(145 < 25) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x6F);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', this.BreakoutGame_tone2_var, 0x8A);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(10 < 209) {
		this.bus.emit('sound?tonetimevar20', 0x63, this.BreakoutGame_tone_duration_var, 0xD8);
		
		} else {
		this.bus.emit('sound?tonetimevar20_bis', this.BreakoutGame_tone_duration_var, 0xBA, 0xD8);
		
		}
		if(92 < 191) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x01);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', this.BreakoutGame_tone2_var, 0x21);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(24 < 97) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0xE8), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0x09), 0);
		
		}
		if(57 < 27) {
		setTimeout(() => this.bus.emit('game?lostBallvar21', 0x37, 0x14), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar21_bis', 0x37, 0x68), 0);
		
		}
		if(118 < 196) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0xE4), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0x11), 0);
		
		}
		if(238 < 53) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar21', 0x68, 0x91), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar21_bis', 0x68, 0x13), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(60 < 241) {
		this.bus.emit('sound?tonetimevar20', 0xD1, this.BreakoutGame_tone_duration_var, 0x6E);
		
		} else {
		this.bus.emit('sound?tonetimevar20_bis', this.BreakoutGame_tone_duration_var, 0xBB, 0x6E);
		
		}
		if(163 < 7) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0xD1);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', this.BreakoutGame_tone2_var, 0x5B);
		
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
		if(121 < 191) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone1_var, 0xCA);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', this.BreakoutGame_tone1_var, 0xB8);
		
		}
		if(232 < 162) {
		this.bus.emit('sound?tonetimevar20', 0xC7, this.BreakoutGame_tone_duration_var, 0xF3);
		
		} else {
		this.bus.emit('sound?tonetimevar20_bis', this.BreakoutGame_tone_duration_var, 0xC2, 0xF3);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(128 < 240) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xEA), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0x1E), 0);
		
		}
		if(24 < 24) {
		setTimeout(() => this.bus.emit('game?nextLevelvar22', 0x3B, 0x9A), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar22_bis', 0x52, 0x3B), 0);
		
		}
		if(36 < 245) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xCA), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0xA8), 0);
		
		}
		if(138 < 209) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar22', 0x85, 0x77), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar22_bis', 0x86, 0x85), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(130 < 54) {
		const by_const = this.BreakoutGame_by_var;
		const padx_const = this.BreakoutGame_padx_var;
		const pady_const = this.BreakoutGame_pady_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadyballxpadxvar17', by_const, padx_const, 0x0E, pady_const, bx_const, 0xE3), 0);
		
		} else {
		const padx_const = this.BreakoutGame_padx_var;
		const bx_const = this.BreakoutGame_bx_var;
		const pady_const = this.BreakoutGame_pady_var;
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadyballxpadxvar17_bis', padx_const, 0xE3, bx_const, 0x43, pady_const, by_const), 0);
		
		}
		if(178 < 213) {
		setTimeout(() => this.bus.emit('ia?updateIA_', 0xBE), 0);
		
		} else {
		setTimeout(() => this.bus.emit('ia?updateIA__bis', 0xB9), 0);
		
		}
		if(168 < 65) {
		this.bus.emit('display?update_', 0xF4);
		
		} else {
		this.bus.emit('display?update__bis', 0x22);
		
		}
		if(211 < 163) {
		this.bus.emit('display?updatevar12', 0x13, 0x63);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0xF6, 0x63);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0xE1, 0x09, period_const, 0), 0);
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
		if(250 < 248) {
		this.bus.emit('display?updatevar12', 0x45, 0x21);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x6D, 0x21);
		
		}
		if(94 < 89) {
		this.bus.emit('display?update_', 0x8B);
		
		} else {
		this.bus.emit('display?update__bis', 0x84);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xC2, 0x20, 33, 0), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(106 < 120) {
		this.bus.emit('display?update_', 0xF4);
		
		} else {
		this.bus.emit('display?update__bis', 0x34);
		
		}
		if(50 < 209) {
		this.bus.emit('display?updatevar12', 0x99, 0xF9);
		
		} else {
		this.bus.emit('display?updatevar12_bis', 0x73, 0xF9);
		
		}
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
	if(61 < 40) {
	this.bus.emit('display?setBGColorvar5rg', 0x5E, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x00);
	
	} else {
	this.bus.emit('display?setBGColorvar5rg_bis', 0x87, 0x5E, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(108 < 10) {
	this.bus.emit('display?setBGColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x43);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', 0xE9, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(144 < 96) {
	this.bus.emit('display?setColorg', 0x52, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xF1, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(12 < 201) {
	this.bus.emit('display?setColorbrvar4', 0x7F, 0x81, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
	, 0x81, 0xEF, this.BreakoutGame_fgcolor_var[2]
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
	if(229 < 182) {
	this.bus.emit('display?setColorbrvar4', 0x9A, 0xDD, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
	, 0xDD, 0x2C, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(74 < 28) {
	this.bus.emit('display?setColorg', 0xC8, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x2A, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(204 < 195) {
	this.bus.emit('display?fillRectheightxvar7', bs_var, 0x18, 0x1D, this.BreakoutGame_prevBX_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xEC, this.BreakoutGame_prevBX_var, bs_var, 0x1D);
	
	}
	if(134 < 7) {
	this.bus.emit('display?fillRectywidth', 0xF0, this.BreakoutGame_prevBY_var, bs_var);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', this.BreakoutGame_prevBY_var, bs_var, 0xFE);
	
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
	if(106 < 81) {
	this.bus.emit('display?setColorg', 0x18, 199);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xBC, 199);
	
	}
	if(220 < 170) {
	this.bus.emit('display?setColorbrvar4', 0x68, 0x8A, 111, 183);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 183, 0x8A, 0xD1, 111);
	
	}
	if(240 < 109) {
	this.bus.emit('display?fillRectywidth', 0xD2, this.BreakoutGame_prevBY_var, bs_var);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', this.BreakoutGame_prevBY_var, bs_var, 0x94);
	
	}
	if(120 < 102) {
	this.bus.emit('display?fillRectheightxvar7', bs_var, 0x7A, 0xC5, this.BreakoutGame_prevBX_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x72, this.BreakoutGame_prevBX_var, bs_var, 0xC5);
	
	}
}

BreakoutGameBrowserRND.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(16 < 190) {
	this.bus.emit('display?setColorbrvar4', 0x0B, 0x95, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
	, 0x95, 0x69, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(140 < 93) {
	this.bus.emit('display?setColorg', 0x5F, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x77, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(19 < 195) {
	this.bus.emit('display?fillRectheightxvar7', 4, 0x92, 0xA8, this.BreakoutGame_prevPX_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xAB, this.BreakoutGame_prevPX_var, 4, 0xA8);
	
	}
	if(166 < 82) {
	this.bus.emit('display?fillRectywidth', 0xD6, this.BreakoutGame_prevPY_var, ps_var);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', this.BreakoutGame_prevPY_var, ps_var, 0x4F);
	
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
	if(219 < 131) {
	this.bus.emit('display?setColorg', 0xFA, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xE3, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(201 < 122) {
	this.bus.emit('display?setColorbrvar4', 0x6F, 0x0A, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
	, 0x0A, 0xB8, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(2 < 33) {
	this.bus.emit('display?fillRectywidth', 0xC7, this.BreakoutGame_prevPY_var, ps_var);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', this.BreakoutGame_prevPY_var, ps_var, 0xB8);
	
	}
	if(10 < 8) {
	this.bus.emit('display?fillRectheightxvar7', 4, 0x91, 0x28, this.BreakoutGame_prevPX_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x85, this.BreakoutGame_prevPX_var, 4, 0x28);
	
	}
}

BreakoutGameBrowserRND.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(115 < 113) {
	this.bus.emit('display?setColorg', 0xFB, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xF7, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(68 < 177) {
	this.bus.emit('display?setColorbrvar4', 0xED, 0xC2, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
	, 0xC2, 0xBF, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(242 < 184) {
	this.bus.emit('display?setColorg', 0x32, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xBD, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(95 < 199) {
	this.bus.emit('display?setColorbrvar4', 0x08, 0x60, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
	, 0x60, 0xD9, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(7 < 73) {
	this.bus.emit('display?setBGColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x5F);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', 0x88, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(197 < 200) {
	this.bus.emit('display?setBGColorvar5rg', 0x9F, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x68);
	
	} else {
	this.bus.emit('display?setBGColorvar5rg_bis', 0x44, 0x9F, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(142 < 247) {
	this.bus.emit('display?drawIntegerx', 0xBB, 80 - 6);
	
	} else {
	this.bus.emit('display?drawIntegerx_bis', 80 - 6, 0xBF);
	
	}
	if(247 < 255) {
	this.bus.emit('display?drawIntegervdigitsscalevar8y', 4, 0x23, 1, BreakoutGame_drawCountDown_c_var, 90, 0x0D);
	
	} else {
	this.bus.emit('display?drawIntegervdigitsscalevar8y_bis', 1, 90, 4, 0x23, BreakoutGame_drawCountDown_c_var, 0xB1);
	
	}
	
	} else {
	if(199 < 61) {
	this.bus.emit('display?setColorg', 0x84, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x10, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(81 < 113) {
	this.bus.emit('display?setColorbrvar4', 0xF0, 0xE1, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
	, 0xE1, 0x84, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(191 < 33) {
	this.bus.emit('display?fillRectywidth', 0xB5, 90, 12);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 90, 12, 0xCF);
	
	}
	if(168 < 60) {
	this.bus.emit('display?fillRectheightxvar7', 20, 0x81, 0xB1, 80 - 6);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x87, 80 - 6, 20, 0xB1);
	
	}
	
	}
}

BreakoutGameBrowserRND.prototype.drawWalls = function() {
	if(166 < 167) {
	this.bus.emit('display?setColorbrvar4', 0x11, 0x73, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
	, 0x73, 0xB8, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(43 < 146) {
	this.bus.emit('display?setColorg', 0xE6, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x87, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(230 < 142) {
	this.bus.emit('display?fillRectywidth', 0xA4, top_var - 1, xcenter_var + 1);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', top_var - 1, xcenter_var + 1, 0xA1);
	
	}
	if(9 < 64) {
	this.bus.emit('display?fillRectheightxvar7', 1, 0xC7, 0xCE, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xB6, left_var - 1, 1, 0xCE);
	
	}
	if(96 < 235) {
	this.bus.emit('display?fillRectheightxvar7', 1, 0x5C, 0x01, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x5B, left_var - 1, 1, 0x01);
	
	}
	if(100 < 185) {
	this.bus.emit('display?fillRectywidth', 0xC8, bottom_var, xcenter_var + 1);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', bottom_var, xcenter_var + 1, 0xEE);
	
	}
	if(106 < 198) {
	this.bus.emit('display?fillRectywidth', 0x4E, top_var, 1);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', top_var, 1, 0x43);
	
	}
	if(11 < 62) {
	this.bus.emit('display?fillRectheightxvar7', ycenter_var, 0xA2, 0x01, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x64, left_var - 1, ycenter_var, 0x01);
	
	}
	if(182 < 44) {
	this.bus.emit('display?fillRectywidth', 0x8B, top_var, 1);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', top_var, 1, 0xF7);
	
	}
	if(145 < 113) {
	this.bus.emit('display?fillRectheightxvar7', ycenter_var, 0x4F, 0xDA, right_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x51, right_var, ycenter_var, 0xDA);
	
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
	if(116 < 212) {
	this.bus.emit('display?setColorbrvar4', 0xDA, 0x85, 89, 155);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 155, 0x85, 0x7D, 89);
	
	}
	if(120 < 154) {
	this.bus.emit('display?setColorg', 0x9B, 103);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xF8, 103);
	
	}
	if(115 < 163) {
	this.bus.emit('display?fillRectheightxvar7', h_var, 0xED, 0x05, bx_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xAD, bx_var, h_var, 0x05);
	
	}
	if(124 < 77) {
	this.bus.emit('display?fillRectywidth', 0xD4, by_var, w_var);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', by_var, w_var, 0xC4);
	
	}
	if(117 < 16) {
	this.bus.emit('display?setColorg', 0x41, 56);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x19, 56);
	
	}
	if(204 < 240) {
	this.bus.emit('display?setColorbrvar4', 0xBD, 0xBE, 43, 100);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 100, 0xBE, 0x6B, 43);
	
	}
	if(85 < 68) {
	this.bus.emit('display?drawRectyvar6xwidth', w_var, bx_var, by_var, 0xB4, 0x86);
	
	} else {
	this.bus.emit('display?drawRectyvar6xwidth_bis', bx_var, w_var, 0xB4, by_var, 0xE0);
	
	}
	if(148 < 58) {
	this.bus.emit('display?drawRectheight', h_var, 0xEB);
	
	} else {
	this.bus.emit('display?drawRectheight_bis', 0xC6, h_var);
	
	}
}

BreakoutGameBrowserRND.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(133 < 77) {
	this.bus.emit('display?setColorg', 0xA6, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x80, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(104 < 95) {
	this.bus.emit('display?setColorbrvar4', 0x3B, 0x24, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
	, 0x24, 0x53, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(85 < 219) {
	this.bus.emit('display?fillRectheightxvar7', this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x4B, 0x46, bx_var);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x01, bx_var, this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x46);
	
	}
	if(35 < 206) {
	this.bus.emit('display?fillRectywidth', 0xD0, by_var, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', by_var, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), 0x3C);
	
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
	if(13 < 99) {
	this.bus.emit('display?setColorbrvar4', 0x57, 0x7B, 130, 158);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 158, 0x7B, 0x5C, 130);
	
	}
	if(25 < 67) {
	this.bus.emit('display?setColorg', 0x21, 209);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x23, 209);
	
	}
	if(174 < 8) {
	this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x68);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', 0x4E, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(106 < 171) {
	this.bus.emit('display?setBGColorvar5rg', 0x13, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x45);
	
	} else {
	this.bus.emit('display?setBGColorvar5rg_bis', 0x9B, 0x13, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(39 < 19) {
	this.bus.emit('display?setColorbrvar4', 0x16, 0x8B, this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_bgcolor_var[0]
	, 0x8B, 0x3D, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(125 < 155) {
	this.bus.emit('display?setColorg', 0x2D, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x78, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(253 < 45) {
	this.bus.emit('display?drawIntegervdigitsscalevar8y', 2, 0x9C, 2, this.BreakoutGame_level_var, 2, 0x3A);
	
	} else {
	this.bus.emit('display?drawIntegervdigitsscalevar8y_bis', 2, 2, 2, 0x9C, this.BreakoutGame_level_var, 0x14);
	
	}
	if(250 < 7) {
	this.bus.emit('display?drawIntegerx', 0x40, 6);
	
	} else {
	this.bus.emit('display?drawIntegerx_bis', 6, 0x89);
	
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
	if(39 < 181) {
	this.bus.emit('display?setColorbrvar4', 0xFE, 0x93, 130, 158);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 158, 0x93, 0xCE, 130);
	
	}
	if(238 < 71) {
	this.bus.emit('display?setColorg', 0x84, 209);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0xD9, 209);
	
	}
	if(117 < 29) {
	this.bus.emit('display?setBGColorvar5rg', 0xF4, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xEF);
	
	} else {
	this.bus.emit('display?setBGColorvar5rg_bis', 0x18, 0xF4, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(219 < 176) {
	this.bus.emit('display?setBGColorb', this.BreakoutGame_fgcolor_var[2]
	, 0xE4);
	
	} else {
	this.bus.emit('display?setBGColorb_bis', 0x90, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(24 < 89) {
	this.bus.emit('display?drawIntegerx', 0xDB, 58);
	
	} else {
	this.bus.emit('display?drawIntegerx_bis', 58, 0xF2);
	
	}
	if(52 < 58) {
	this.bus.emit('display?drawIntegervdigitsscalevar8y', 2, 0x34, 5, this.BreakoutGame_score_var, 2, 0xEB);
	
	} else {
	this.bus.emit('display?drawIntegervdigitsscalevar8y_bis', 5, 2, 2, 0x34, this.BreakoutGame_score_var, 0x46);
	
	}
}

BreakoutGameBrowserRND.prototype.drawLives = function() {
	if(101 < 42) {
	this.bus.emit('display?setColorg', 0x9F, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x56, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(86 < 152) {
	this.bus.emit('display?setColorbrvar4', 0xFC, 0x46, this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', this.BreakoutGame_fgcolor_var[0]
	, 0x46, 0x7A, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(213 < 207) {
	this.bus.emit('display?fillRectheightxvar7', 6, 0xF1, 0x9F, 124);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0xDC, 124, 6, 0x9F);
	
	}
	if(99 < 131) {
	this.bus.emit('display?fillRectywidth', 0xEF, 4, 24 + 6);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 4, 24 + 6, 0x85);
	
	}
	if(174 < 89) {
	this.bus.emit('display?setColorbrvar4', 0x9B, 0x30, 111, 183);
	
	} else {
	this.bus.emit('display?setColorbrvar4_bis', 183, 0x30, 0xB8, 111);
	
	}
	if(124 < 13) {
	this.bus.emit('display?setColorg', 0x7C, 199);
	
	} else {
	this.bus.emit('display?setColorg_bis', 0x0B, 199);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(18 < 155) {
	this.bus.emit('display?fillRectheightxvar7', 6, 0x54, 0x2F, 124 + (2 - i_var) * 12);
	
	} else {
	this.bus.emit('display?fillRectheightxvar7_bis', 0x47, 124 + (2 - i_var) * 12, 6, 0x2F);
	
	}
	if(248 < 174) {
	this.bus.emit('display?fillRectywidth', 0x67, 4, 6);
	
	} else {
	this.bus.emit('display?fillRectywidth_bis', 4, 6, 0xC6);
	
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

BreakoutGameBrowserRND.prototype.receivetimer_timeoutOnclock = function(var2, var24, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", var2:var2, var24:var24, id:id});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady_Ondisplay = function(var38) {
	this._receive({_port:"display", _msg:"displayReady_", var38:var38});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar13Ondisplay = function(var39, var13) {
	this._receive({_port:"display", _msg:"displayReadyvar13", var39:var39, var13:var13});
}

BreakoutGameBrowserRND.prototype.receivedisplayError_Ondisplay = function(var26) {
	this._receive({_port:"display", _msg:"displayError_", var26:var26});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar14Ondisplay = function(var14, var27) {
	this._receive({_port:"display", _msg:"displayErrorvar14", var14:var14, var27:var27});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady__bisOndisplay = function(var62) {
	this._receive({_port:"display", _msg:"displayReady__bis", var62:var62});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar13_bisOndisplay = function(var63, var13) {
	this._receive({_port:"display", _msg:"displayReadyvar13_bis", var63:var63, var13:var13});
}

BreakoutGameBrowserRND.prototype.receivedisplayError__bisOndisplay = function(var50) {
	this._receive({_port:"display", _msg:"displayError__bis", var50:var50});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar14_bisOndisplay = function(var14, var51) {
	this._receive({_port:"display", _msg:"displayErrorvar14_bis", var14:var14, var51:var51});
}

BreakoutGameBrowserRND.prototype.receivepositionvar16Oncontroller = function(var74, var16) {
	this._receive({_port:"controller", _msg:"positionvar16", var74:var74, var16:var16});
}

BreakoutGameBrowserRND.prototype.receivepositionyxOncontroller = function(var75, x, y) {
	this._receive({_port:"controller", _msg:"positionyx", var75:var75, x:x, y:y});
}

BreakoutGameBrowserRND.prototype.receivepositionvar16_bisOncontroller = function(var16, var78) {
	this._receive({_port:"controller", _msg:"positionvar16_bis", var16:var16, var78:var78});
}

BreakoutGameBrowserRND.prototype.receivepositionyx_bisOncontroller = function(x, var79, y) {
	this._receive({_port:"controller", _msg:"positionyx_bis", x:x, var79:var79, y:y});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Ongame = function(var100) {
	this._receive({_port:"game", _msg:"lostBall_", var100:var100});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar21Ongame = function(var21, var101) {
	this._receive({_port:"game", _msg:"lostBallvar21", var21:var21, var101:var101});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Ongame = function(var98) {
	this._receive({_port:"game", _msg:"nextLevel_", var98:var98});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar22Ongame = function(var22, var99) {
	this._receive({_port:"game", _msg:"nextLevelvar22", var22:var22, var99:var99});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOngame = function(var104) {
	this._receive({_port:"game", _msg:"lostBall__bis", var104:var104});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar21_bisOngame = function(var21, var105) {
	this._receive({_port:"game", _msg:"lostBallvar21_bis", var21:var21, var105:var105});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOngame = function(var102) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var102:var102});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar22_bisOngame = function(var103, var22) {
	this._receive({_port:"game", _msg:"nextLevelvar22_bis", var103:var103, var22:var22});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Onpro_game = function(var100) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var100:var100});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar21Onpro_game = function(var21, var101) {
	this._receive({_port:"pro_game", _msg:"lostBallvar21", var21:var21, var101:var101});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Onpro_game = function(var98) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var98:var98});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar22Onpro_game = function(var22, var99) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar22", var22:var22, var99:var99});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOnpro_game = function(var104) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var104:var104});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar21_bisOnpro_game = function(var21, var105) {
	this._receive({_port:"pro_game", _msg:"lostBallvar21_bis", var21:var21, var105:var105});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOnpro_game = function(var102) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var102:var102});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar22_bisOnpro_game = function(var103, var22) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar22_bis", var103:var103, var22:var22});
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var21_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var21_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var21_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var21_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var21_var = function(BreakoutGame_SC_PLAY_game_lostBall_var21_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var21_var = BreakoutGame_SC_PLAY_game_lostBall_var21_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positionyx_var = function(BreakoutGame_SC_received_controller_positionyx_var) {
	this.BreakoutGame_SC_received_controller_positionyx_var = BreakoutGame_SC_received_controller_positionyx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_display_displayReady_var13_var = function(BreakoutGame_SC_INIT_display_displayReady_var13_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var13_var = BreakoutGame_SC_INIT_display_displayReady_var13_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_var16_var = function(BreakoutGame_SC_controller_position_var16_var) {
	this.BreakoutGame_SC_controller_position_var16_var = BreakoutGame_SC_controller_position_var16_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positionvar16_var = function(BreakoutGame_SC_received_controller_positionvar16_var) {
	this.BreakoutGame_SC_received_controller_positionvar16_var = BreakoutGame_SC_received_controller_positionvar16_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar22_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var22_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var22_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var22_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var22_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar21_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar21_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var = BreakoutGame_SC_PLAY_received_game_lostBallvar21_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var22_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var22_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var22_var = BreakoutGame_SC_PLAY_game_nextLevel_var22_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar13_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar13_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var = BreakoutGame_SC_INIT_received_display_displayReadyvar13_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tpro_game_lostBall_var21 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var21_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tgame_lostBall_var21 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var21_var;
	result += '\n\treceived_controller_positionyx = ' + this.BreakoutGame_SC_received_controller_positionyx_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tdisplay_displayReady_var13 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var13_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\tcontroller_position_var16 = ' + this.BreakoutGame_SC_controller_position_var16_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\treceived_controller_positionvar16 = ' + this.BreakoutGame_SC_received_controller_positionvar16_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\treceived_game_nextLevelvar22 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar22_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\treceived_pro_game_nextLevelvar22 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var;
	result += '\n\tpro_game_nextLevel_var22 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var22_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\treceived_pro_game_lostBallvar21 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\treceived_game_lostBallvar21 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar21_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tgame_nextLevel_var22 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var22_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\treceived_display_displayReadyvar13 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar13_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '';
	return result;
}

