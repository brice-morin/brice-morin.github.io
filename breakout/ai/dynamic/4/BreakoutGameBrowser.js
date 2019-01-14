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
		if(233 < 30) {
		this.bus.emit('display?createvar434xsize', this.BreakoutGame_XDISPSIZE_var, 0xF9, 0xAB);
		
		} else {
		this.bus.emit('display?createvar434xsize_bis', 0x31, 0xAB, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(163 < 162) {
		this.bus.emit('display?createysize', 0x78, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?createysize_bis', this.BreakoutGame_YDISPSIZE_var, 0x8F);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xB0, 0, 33, 0x6F), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(179 < 69) {
		this.bus.emit('display?updatevar436', 0x6C, 0x7B);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x7B, 0x80);
		
		}
		if(98 < 233) {
		this.bus.emit('display?update_', 0x53);
		
		} else {
		this.bus.emit('display?update__bis', 0x86);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0xA8, 0, period_const, 0x7F), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xA1, 0, 500, 0xCF), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(236 < 36) {
		this.bus.emit('display?update_', 0x1A);
		
		} else {
		this.bus.emit('display?update__bis', 0x05);
		
		}
		if(187 < 119) {
		this.bus.emit('display?updatevar436', 0x2C, 0xBF);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0xBF, 0x18);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xE4, 0, 1000, 0xAA), 0);
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
		if(64 < 72) {
		this.bus.emit('display?update_', 0x98);
		
		} else {
		this.bus.emit('display?update__bis', 0x1C);
		
		}
		if(62 < 164) {
		this.bus.emit('display?updatevar436', 0x5D, 0xE5);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0xE5, 0x2B);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(56 < 7) {
		this.bus.emit('display?update_', 0xCE);
		
		} else {
		this.bus.emit('display?update__bis', 0x6E);
		
		}
		if(0 < 151) {
		this.bus.emit('display?updatevar436', 0xB5, 0xEA);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0xEA, 0x7D);
		
		}
		setTimeout(() => this.bus.emit('clock?timer_start', 0xBF, 0, 500, 0xA4), 0);
	});
	let BreakoutGame_SC_GAMEREALLYOVER = new StateJS.State('GAMEREALLYOVER', this._statemachine).entry(() => {
		if(125 < 215) {
		this.bus.emit('display?setColorb', 255, 0xDB);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xF8, 255);
		
		}
		if(116 < 35) {
		this.bus.emit('display?setColorvar428gr', 255, 255, 0x16, 0xA3);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', 255, 255, 0x16, 0x80);
		
		}
		if(208 < 122) {
		this.bus.emit('display?fillRectyheightvar431', 0x6C, 30, 0xCD, 76);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', 76, 0x86, 0x6C, 30);
		
		}
		if(65 < 43) {
		this.bus.emit('display?fillRectxwidth', 0x5C, 142, 8);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0xA0, 142, 8);
		
		}
		if(123 < 105) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0xF8);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xEA, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(250 < 211) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0x20, 0x63);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x20, 0xF8);
		
		}
		if(189 < 168) {
		this.bus.emit('display?fillRectxwidth', 0x4A, 140, 9);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0xD8, 140, 9);
		
		}
		if(186 < 49) {
		this.bus.emit('display?fillRectyheightvar431', 0x59, 31, 0xE7, 50);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', 50, 0x53, 0x59, 31);
		
		}
		if(128 < 179) {
		this.bus.emit('display?setBGColorrg', this.BreakoutGame_fgcolor_var[0]
		, 0x38, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setBGColorrg_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x83);
		
		}
		if(204 < 122) {
		this.bus.emit('display?setBGColorvar429b', 0x37, 0x57, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setBGColorvar429b_bis', 0x37, this.BreakoutGame_fgcolor_var[2]
		, 0x7E);
		
		}
		if(123 < 113) {
		this.bus.emit('display?setColorvar428gr', 158, 209, 0xC2, 0xD7);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', 209, 158, 0xC2, 0xA4);
		
		}
		if(34 < 148) {
		this.bus.emit('display?setColorb', 130, 0x23);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x19, 130);
		
		}
		if(227 < 172) {
		this.bus.emit('display?drawIntegervy', this.BreakoutGame_score_var, 40, 0x25);
		
		} else {
		this.bus.emit('display?drawIntegervy_bis', 0x3D, 40, this.BreakoutGame_score_var);
		
		}
		if(157 < 248) {
		this.bus.emit('display?drawIntegerxscalevar432digits', 0xA7, 5, 6, 0x97, 23);
		
		} else {
		this.bus.emit('display?drawIntegerxscalevar432digits_bis', 23, 0x20, 5, 0x97, 6);
		
		}
		if(98 < 234) {
		this.bus.emit('display?drawThingMLxy', 0x39, 26, 87);
		
		} else {
		this.bus.emit('display?drawThingMLxy_bis', 26, 0x3E, 87);
		
		}
		if(239 < 103) {
		this.bus.emit('display?drawThingMLvar433', 0x2E, 0x7E);
		
		} else {
		this.bus.emit('display?drawThingMLvar433_bis', 0x0A, 0x7E);
		
		}
		if(17 < 40) {
		this.bus.emit('display?updatevar436', 0x23, 0x3F);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x3F, 0xC5);
		
		}
		if(65 < 98) {
		this.bus.emit('display?update_', 0xF1);
		
		} else {
		this.bus.emit('display?update__bis', 0x58);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar437) => {
		return displayReadyvar437._port === 'display' && displayReadyvar437._msg === 'displayReadyvar437' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar437) => {
		if(123 < 37) {
		this.bus.emit('display?clearvar427', 0xE3, 0xAE);
		
		} else {
		this.bus.emit('display?clearvar427_bis', 0x3D, 0xE3);
		
		}
		if(8 < 114) {
		this.bus.emit('display?clear_', 0x1C);
		
		} else {
		this.bus.emit('display?clear__bis', 0x4E);
		
		}
		this.initColors();
		if(131 < 209) {
		this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
		, 0xF2);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x55, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(152 < 151) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0x6F, 0xB4);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x6F, 0x5E);
		
		}
		if(27 < 249) {
		this.bus.emit('display?fillRectxwidth', 0x6A, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0xE6, this.BreakoutGame_XDISPSIZE_var, 0);
		
		}
		if(22 < 149) {
		this.bus.emit('display?fillRectyheightvar431', 0x21, 0, 0x5F, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', this.BreakoutGame_YDISPSIZE_var, 0x14, 0x21, 0);
		
		}
		if(200 < 127) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xF4, 0xBF);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xF4, 0xAC);
		
		}
		if(116 < 162) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0x0D);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x80, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(250 < 83) {
		this.bus.emit('display?fillRectxwidth', 0x30, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0x6D, this.BreakoutGame_XDISPSIZE_var, 0);
		
		}
		if(228 < 83) {
		this.bus.emit('display?fillRectyheightvar431', 0x5E, 0, 0x97, 14);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', 14, 0xB1, 0x5E, 0);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar437) => {
		return displayReadyvar437._port === 'display' && displayReadyvar437._msg === 'displayReadyvar437' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar437) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var);
	}).effect((displayReady__bis) => {
		if(12 < 117) {
		this.bus.emit('display?clearvar427', 0xE3, 0xAA);
		
		} else {
		this.bus.emit('display?clearvar427_bis', 0xB9, 0xE3);
		
		}
		if(40 < 119) {
		this.bus.emit('display?clear_', 0xB4);
		
		} else {
		this.bus.emit('display?clear__bis', 0x21);
		
		}
		this.initColors();
		if(114 < 66) {
		this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
		, 0x43);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xE7, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(7 < 69) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0x6F, 0x15);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x6F, 0xC8);
		
		}
		if(201 < 129) {
		this.bus.emit('display?fillRectyheightvar431', 0x21, 0, 0xC1, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', this.BreakoutGame_YDISPSIZE_var, 0xA0, 0x21, 0);
		
		}
		if(244 < 6) {
		this.bus.emit('display?fillRectxwidth', 0x6D, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0x39, this.BreakoutGame_XDISPSIZE_var, 0);
		
		}
		if(186 < 146) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xF4, 0x20);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xF4, 0x8C);
		
		}
		if(219 < 115) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0xCE);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x68, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(106 < 18) {
		this.bus.emit('display?fillRectyheightvar431', 0x5E, 0, 0x53, 14);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', 14, 0x3D, 0x5E, 0);
		
		}
		if(197 < 133) {
		this.bus.emit('display?fillRectxwidth', 0x50, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0x0A, this.BreakoutGame_XDISPSIZE_var, 0);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var));
	}).effect((displayReady__bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var);
	}).effect((displayReady_) => {
		if(12 < 117) {
		this.bus.emit('display?clearvar427', 0xE3, 0xB5);
		
		} else {
		this.bus.emit('display?clearvar427_bis', 0x4E, 0xE3);
		
		}
		if(40 < 119) {
		this.bus.emit('display?clear_', 0x3E);
		
		} else {
		this.bus.emit('display?clear__bis', 0x3E);
		
		}
		this.initColors();
		if(114 < 66) {
		this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
		, 0x02);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xF8, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(7 < 69) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0x6F, 0x03);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x6F, 0xA3);
		
		}
		if(201 < 129) {
		this.bus.emit('display?fillRectyheightvar431', 0x21, 0, 0x9C, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', this.BreakoutGame_YDISPSIZE_var, 0x5C, 0x21, 0);
		
		}
		if(244 < 6) {
		this.bus.emit('display?fillRectxwidth', 0xDC, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0xEB, this.BreakoutGame_XDISPSIZE_var, 0);
		
		}
		if(186 < 146) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xF4, 0xF6);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xF4, 0x7A);
		
		}
		if(219 < 115) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0x7A);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xBD, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(106 < 18) {
		this.bus.emit('display?fillRectyheightvar431', 0x5E, 0, 0xFA, 14);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', 14, 0x48, 0x5E, 0);
		
		}
		if(197 < 133) {
		this.bus.emit('display?fillRectxwidth', 0x61, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0xE2, this.BreakoutGame_XDISPSIZE_var, 0);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (!(this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var));
	}).effect((displayReady_) => {
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar437_bis) => {
		return displayReadyvar437_bis._port === 'display' && displayReadyvar437_bis._msg === 'displayReadyvar437_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar437_bis) => {
		if(123 < 37) {
		this.bus.emit('display?clearvar427', 0xE3, 0xD7);
		
		} else {
		this.bus.emit('display?clearvar427_bis', 0x64, 0xE3);
		
		}
		if(8 < 114) {
		this.bus.emit('display?clear_', 0xBE);
		
		} else {
		this.bus.emit('display?clear__bis', 0xFB);
		
		}
		this.initColors();
		if(131 < 209) {
		this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
		, 0x01);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0x8B, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(152 < 151) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0x6F, 0x72);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x6F, 0x06);
		
		}
		if(27 < 249) {
		this.bus.emit('display?fillRectxwidth', 0x4B, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0x8B, this.BreakoutGame_XDISPSIZE_var, 0);
		
		}
		if(22 < 149) {
		this.bus.emit('display?fillRectyheightvar431', 0x21, 0, 0xED, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', this.BreakoutGame_YDISPSIZE_var, 0x5E, 0x21, 0);
		
		}
		if(200 < 127) {
		this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xF4, 0xB6);
		
		} else {
		this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xF4, 0x1A);
		
		}
		if(116 < 162) {
		this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
		, 0x63);
		
		} else {
		this.bus.emit('display?setColorb_bis', 0xAA, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(250 < 83) {
		this.bus.emit('display?fillRectxwidth', 0x1D, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectxwidth_bis', 0x4A, this.BreakoutGame_XDISPSIZE_var, 0);
		
		}
		if(228 < 83) {
		this.bus.emit('display?fillRectyheightvar431', 0x5E, 0, 0x80, 14);
		
		} else {
		this.bus.emit('display?fillRectyheightvar431_bis', 14, 0x00, 0x5E, 0);
		
		}
		this.drawWalls();
		this.createBricks();
		this.drawLevel();
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var = false;
		this.BreakoutGame_SC_INIT_received_display_displayReady__var = false;
	});
	BreakoutGame_SC_INIT.to(null).when((displayReadyvar437_bis) => {
		return displayReadyvar437_bis._port === 'display' && displayReadyvar437_bis._msg === 'displayReadyvar437_bis' && (!(this.BreakoutGame_SC_INIT_received_display_displayReady__var));
	}).effect((displayReadyvar437_bis) => {
		this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar444_bis) => {
		return lostBallvar444_bis._port === 'game' && lostBallvar444_bis._msg === 'lostBallvar444_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar444_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xF7, 0x07), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar444_bis) => {
		return lostBallvar444_bis._port === 'game' && lostBallvar444_bis._msg === 'lostBallvar444_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar444_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x71, 0x97), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xF6, 0x07), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar445) => {
		return nextLevelvar445._port === 'game' && nextLevelvar445._msg === 'nextLevelvar445' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar445) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xFA, 0x97), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar445) => {
		return nextLevelvar445._port === 'game' && nextLevelvar445._msg === 'nextLevelvar445' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar445) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x34, 0x97), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar445_bis) => {
		return nextLevelvar445_bis._port === 'game' && nextLevelvar445_bis._msg === 'nextLevelvar445_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar445_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x2A, 0x97), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar445_bis) => {
		return nextLevelvar445_bis._port === 'game' && nextLevelvar445_bis._msg === 'nextLevelvar445_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar445_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xFE, 0x07), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar444) => {
		return lostBallvar444._port === 'game' && lostBallvar444._msg === 'lostBallvar444' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar444) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xE3, 0x07), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar444) => {
		return lostBallvar444._port === 'game' && lostBallvar444._msg === 'lostBallvar444' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar444) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var = true;
	});
	this._statemachine.to(null).when((positionvar440xy) => {
		return positionvar440xy._port === 'controller' && positionvar440xy._msg === 'positionvar440xy';
	}).effect((positionvar440xy) => {
		this.BreakoutGame_SC_received_controller_positionvar440xy_var = true;
		this.BreakoutGame_SC_controller_position_var440_var = positionvar440xy.var440;
		this.BreakoutGame_SC_controller_position_x_var = positionvar440xy.x;
		this.BreakoutGame_SC_controller_position_y_var = positionvar440xy.y;
		if(this.BreakoutGame_SC_received_controller_position__var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar440xy_var = false;
		this.BreakoutGame_SC_received_controller_position__var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar440xy_bis) => {
		return positionvar440xy_bis._port === 'controller' && positionvar440xy_bis._msg === 'positionvar440xy_bis';
	}).effect((positionvar440xy_bis) => {
		this.BreakoutGame_SC_received_controller_positionvar440xy_var = true;
		this.BreakoutGame_SC_controller_position_var440_var = positionvar440xy_bis.var440;
		this.BreakoutGame_SC_controller_position_x_var = positionvar440xy_bis.x;
		this.BreakoutGame_SC_controller_position_y_var = positionvar440xy_bis.y;
		if(this.BreakoutGame_SC_received_controller_position__var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar440xy_var = false;
		this.BreakoutGame_SC_received_controller_position__var = false;
		
		}
	});
	this._statemachine.to(null).when((position__bis) => {
		return position__bis._port === 'controller' && position__bis._msg === 'position__bis';
	}).effect((position__bis) => {
		this.BreakoutGame_SC_received_controller_position__var = true;
		if(this.BreakoutGame_SC_received_controller_positionvar440xy_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_position__var = false;
		this.BreakoutGame_SC_received_controller_positionvar440xy_var = false;
		
		}
	});
	this._statemachine.to(null).when((position_) => {
		return position_._port === 'controller' && position_._msg === 'position_';
	}).effect((position_) => {
		this.BreakoutGame_SC_received_controller_position__var = true;
		if(this.BreakoutGame_SC_received_controller_positionvar440xy_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_position__var = false;
		this.BreakoutGame_SC_received_controller_positionvar440xy_var = false;
		
		}
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar444_bis) => {
		return lostBallvar444_bis._port === 'pro_game' && lostBallvar444_bis._msg === 'lostBallvar444_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar444_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x15, 0x5D), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar444_bis) => {
		return lostBallvar444_bis._port === 'pro_game' && lostBallvar444_bis._msg === 'lostBallvar444_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar444_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x9C, 0x89), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x68, 0x5D), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar445) => {
		return nextLevelvar445._port === 'pro_game' && nextLevelvar445._msg === 'nextLevelvar445' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar445) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x20, 0x89), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar445) => {
		return nextLevelvar445._port === 'pro_game' && nextLevelvar445._msg === 'nextLevelvar445' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar445) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xDD, 0x89), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar445_bis) => {
		return nextLevelvar445_bis._port === 'pro_game' && nextLevelvar445_bis._msg === 'nextLevelvar445_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar445_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xEC, 0x89), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar445_bis) => {
		return nextLevelvar445_bis._port === 'pro_game' && nextLevelvar445_bis._msg === 'nextLevelvar445_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar445_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x9C, 0x5D), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar444) => {
		return lostBallvar444._port === 'pro_game' && lostBallvar444._msg === 'lostBallvar444' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar444) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x94, 0x5D), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar444) => {
		return lostBallvar444._port === 'pro_game' && lostBallvar444._msg === 'lostBallvar444' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar444) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var = true;
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
	BreakoutGame_SC_GAMEOVER.to(BreakoutGame_SC_NEXTLEVEL).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_level_var < 9);
	}).effect((timer_timeout) => {
		this.BreakoutGame_lives_var = 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
	});
	BreakoutGame_SC_GAMEOVER.to(BreakoutGame_SC_GAMEREALLYOVER).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_level_var === 9);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(214 < 37) {
		this.bus.emit('display?updatevar436', 0x04, 0xF5);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0xF5, 0x64);
		
		}
		if(16 < 118) {
		this.bus.emit('display?update_', 0x73);
		
		} else {
		this.bus.emit('display?update__bis', 0xE1);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x5C, 0, 33, 0x69), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(246 < 171) {
		this.bus.emit('display?update_', 0x34);
		
		} else {
		this.bus.emit('display?update__bis', 0x99);
		
		}
		if(254 < 180) {
		this.bus.emit('display?updatevar436', 0xEC, 0x53);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x53, 0x43);
		
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
		if(10 < 103) {
		this.bus.emit('sound?tonefreqtimevar446', 0xDB, this.BreakoutGame_tone2_var, 0x57, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonefreqtimevar446_bis', 0xFD, 0xDB, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		
		}
		if(49 < 1) {
		this.bus.emit('sound?tone_', 0xB7);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x0A);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(125 < 12) {
		this.bus.emit('sound?tonefreqtimevar446', 0x7F, this.BreakoutGame_tone2_var, 0x05, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonefreqtimevar446_bis', 0x71, 0x7F, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		
		}
		if(104 < 104) {
		this.bus.emit('sound?tone_', 0xE9);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xD9);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(180 < 149) {
		this.bus.emit('sound?tone_', 0xE1);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x0B);
		
		}
		if(161 < 59) {
		this.bus.emit('sound?tonefreqtimevar446', 0xA9, this.BreakoutGame_tone2_var, 0xBA, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonefreqtimevar446_bis', 0xEE, 0xA9, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(233 < 211) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x0E), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0x02), 0);
		
		}
		if(194 < 22) {
		setTimeout(() => this.bus.emit('game?lostBallvar444', 0x47, 0x95), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar444_bis', 0xC8, 0x47), 0);
		
		}
		if(163 < 88) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x48), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0xC8), 0);
		
		}
		if(200 < 70) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar444', 0x1B, 0xF9), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar444_bis', 0x2A, 0x1B), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(145 < 200) {
		this.bus.emit('sound?tonefreqtimevar446', 0x47, this.BreakoutGame_tone2_var, 0xBD, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonefreqtimevar446_bis', 0xC7, 0x47, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		
		}
		if(82 < 126) {
		this.bus.emit('sound?tone_', 0xAF);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xFE);
		
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
		if(22 < 124) {
		this.bus.emit('sound?tone_', 0x4C);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xE1);
		
		}
		if(0 < 136) {
		this.bus.emit('sound?tonefreqtimevar446', 0xB2, this.BreakoutGame_tone1_var, 0x72, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonefreqtimevar446_bis', 0x24, 0xB2, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone1_var);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(216 < 7) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0x2F), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0xF3), 0);
		
		}
		if(76 < 156) {
		setTimeout(() => this.bus.emit('game?nextLevelvar445', 0xB9, 0x36), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar445_bis', 0xB9, 0x30), 0);
		
		}
		if(69 < 237) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0x33), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0x86), 0);
		
		}
		if(196 < 137) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar445', 0x19, 0xEA), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar445_bis', 0x19, 0x9B), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(186 < 223) {
		const padx_const = this.BreakoutGame_padx_var;
		const pady_const = this.BreakoutGame_pady_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadypadxballx', padx_const, pady_const, 0xA5, bx_const), 0);
		
		} else {
		const pady_const = this.BreakoutGame_pady_var;
		const bx_const = this.BreakoutGame_bx_var;
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadypadxballx_bis', pady_const, 0x15, bx_const, padx_const), 0);
		
		}
		if(194 < 162) {
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAvar441bally', 0xF0, by_const, 0xB4), 0);
		
		} else {
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAvar441bally_bis', 0x4D, by_const, 0xB4), 0);
		
		}
		if(18 < 122) {
		this.bus.emit('display?update_', 0xEE);
		
		} else {
		this.bus.emit('display?update__bis', 0x5E);
		
		}
		if(206 < 59) {
		this.bus.emit('display?updatevar436', 0x75, 0x2E);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x2E, 0xDE);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0xB3, 0, period_const, 0x2B), 0);
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
	if(253 < 32) {
	this.bus.emit('display?setBGColorvar429b', 0x4A, 0x57, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorvar429b_bis', 0x4A, this.BreakoutGame_bgcolor_var[2]
	, 0x5B);
	
	}
	if(110 < 60) {
	this.bus.emit('display?setBGColorrg', this.BreakoutGame_bgcolor_var[0]
	, 0x1A, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorrg_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xFB);
	
	}
	if(203 < 224) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0xDA);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x31, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(149 < 3) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x4C, 0xFF);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x4C, 0x1A);
	
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
	if(222 < 193) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x21, 0x6A);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x21, 0x7A);
	
	}
	if(171 < 221) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0xE6);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xA9, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(190 < 59) {
	this.bus.emit('display?fillRectyheightvar431', 0x11, this.BreakoutGame_prevBY_var, 0xCD, bs_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', bs_var, 0x60, 0x11, this.BreakoutGame_prevBY_var);
	
	}
	if(43 < 90) {
	this.bus.emit('display?fillRectxwidth', 0x0F, bs_var, this.BreakoutGame_prevBX_var);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0xE6, bs_var, this.BreakoutGame_prevBX_var);
	
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
	if(28 < 228) {
	this.bus.emit('display?setColorvar428gr', 183, 199, 0x69, 0xE5);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', 199, 183, 0x69, 0xB7);
	
	}
	if(201 < 18) {
	this.bus.emit('display?setColorb', 111, 0x3C);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x8C, 111);
	
	}
	if(42 < 184) {
	this.bus.emit('display?fillRectyheightvar431', 0x37, this.BreakoutGame_prevBY_var, 0x26, bs_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', bs_var, 0xD1, 0x37, this.BreakoutGame_prevBY_var);
	
	}
	if(248 < 139) {
	this.bus.emit('display?fillRectxwidth', 0xB9, bs_var, this.BreakoutGame_prevBX_var);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0x18, bs_var, this.BreakoutGame_prevBX_var);
	
	}
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(57 < 240) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0xD5);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x85, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(244 < 139) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x6D, 0x40);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x6D, 0x7E);
	
	}
	if(3 < 229) {
	this.bus.emit('display?fillRectxwidth', 0x2A, ps_var, this.BreakoutGame_prevPX_var);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0xA0, ps_var, this.BreakoutGame_prevPX_var);
	
	}
	if(157 < 63) {
	this.bus.emit('display?fillRectyheightvar431', 0x00, this.BreakoutGame_prevPY_var, 0xF8, 4);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', 4, 0x93, 0x00, this.BreakoutGame_prevPY_var);
	
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
	if(42 < 71) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xEF, 0xBC);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xEF, 0xEE);
	
	}
	if(213 < 150) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x20);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x74, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(67 < 96) {
	this.bus.emit('display?fillRectxwidth', 0x0E, ps_var, this.BreakoutGame_prevPX_var);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0x5A, ps_var, this.BreakoutGame_prevPX_var);
	
	}
	if(135 < 239) {
	this.bus.emit('display?fillRectyheightvar431', 0x8D, this.BreakoutGame_prevPY_var, 0xEF, 4);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', 4, 0x70, 0x8D, this.BreakoutGame_prevPY_var);
	
	}
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(191 < 63) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xF3, 0x87);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xF3, 0xF4);
	
	}
	if(30 < 42) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x36);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xCB, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(81 < 112) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0xD9);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x08, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(230 < 2) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x2C, 0xA2);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x2C, 0x26);
	
	}
	if(167 < 51) {
	this.bus.emit('display?setBGColorrg', this.BreakoutGame_bgcolor_var[0]
	, 0x9A, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorrg_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x96);
	
	}
	if(30 < 111) {
	this.bus.emit('display?setBGColorvar429b', 0xAD, 0xAD, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorvar429b_bis', 0xAD, this.BreakoutGame_bgcolor_var[2]
	, 0x73);
	
	}
	if(6 < 111) {
	this.bus.emit('display?drawIntegerxscalevar432digits', 0x73, 1, 4, 0xF4, 80 - 6);
	
	} else {
	this.bus.emit('display?drawIntegerxscalevar432digits_bis', 80 - 6, 0x55, 1, 0xF4, 4);
	
	}
	if(249 < 144) {
	this.bus.emit('display?drawIntegervy', BreakoutGame_drawCountDown_c_var, 90, 0xB8);
	
	} else {
	this.bus.emit('display?drawIntegervy_bis', 0xFB, 90, BreakoutGame_drawCountDown_c_var);
	
	}
	
	} else {
	if(50 < 200) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xF0, 0x07);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xF0, 0x67);
	
	}
	if(115 < 234) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x70);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x11, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(69 < 179) {
	this.bus.emit('display?fillRectyheightvar431', 0x2A, 90, 0x75, 20);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', 20, 0xD0, 0x2A, 90);
	
	}
	if(205 < 170) {
	this.bus.emit('display?fillRectxwidth', 0x3C, 12, 80 - 6);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0xE7, 12, 80 - 6);
	
	}
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	if(61 < 165) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x8F);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x57, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(68 < 175) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xF0, 0xB7);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xF0, 0xF2);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(194 < 132) {
	this.bus.emit('display?fillRectxwidth', 0x76, xcenter_var + 1, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0x7E, xcenter_var + 1, left_var - 1);
	
	}
	if(199 < 31) {
	this.bus.emit('display?fillRectyheightvar431', 0x90, top_var - 1, 0xB7, 1);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', 1, 0x74, 0x90, top_var - 1);
	
	}
	if(249 < 170) {
	this.bus.emit('display?fillRectyheightvar431', 0x23, bottom_var, 0x2A, 1);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', 1, 0x3A, 0x23, bottom_var);
	
	}
	if(39 < 204) {
	this.bus.emit('display?fillRectxwidth', 0xED, xcenter_var + 1, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0x72, xcenter_var + 1, left_var - 1);
	
	}
	if(180 < 117) {
	this.bus.emit('display?fillRectyheightvar431', 0x94, top_var, 0x37, ycenter_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', ycenter_var, 0x57, 0x94, top_var);
	
	}
	if(177 < 165) {
	this.bus.emit('display?fillRectxwidth', 0xEA, 1, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0x8E, 1, left_var - 1);
	
	}
	if(124 < 203) {
	this.bus.emit('display?fillRectxwidth', 0x2C, 1, right_var);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0xD2, 1, right_var);
	
	}
	if(198 < 155) {
	this.bus.emit('display?fillRectyheightvar431', 0x12, top_var, 0x76, ycenter_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', ycenter_var, 0x3D, 0x12, top_var);
	
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
	if(229 < 35) {
	this.bus.emit('display?setColorb', 89, 0x06);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x03, 89);
	
	}
	if(208 < 140) {
	this.bus.emit('display?setColorvar428gr', 155, 103, 0x86, 0x24);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', 103, 155, 0x86, 0xC2);
	
	}
	if(98 < 38) {
	this.bus.emit('display?fillRectyheightvar431', 0xA6, by_var, 0x17, h_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', h_var, 0x97, 0xA6, by_var);
	
	}
	if(150 < 224) {
	this.bus.emit('display?fillRectxwidth', 0xAB, w_var, bx_var);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0xCD, w_var, bx_var);
	
	}
	if(194 < 7) {
	this.bus.emit('display?setColorvar428gr', 100, 56, 0xCC, 0x3F);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', 56, 100, 0xCC, 0x41);
	
	}
	if(103 < 115) {
	this.bus.emit('display?setColorb', 43, 0x78);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xCB, 43);
	
	}
	if(45 < 6) {
	this.bus.emit('display?drawRectheightxwidth', h_var, 0x41, w_var, bx_var);
	
	} else {
	this.bus.emit('display?drawRectheightxwidth_bis', h_var, w_var, bx_var, 0x65);
	
	}
	if(101 < 83) {
	this.bus.emit('display?drawRectyvar430', 0x98, 0x6D, by_var);
	
	} else {
	this.bus.emit('display?drawRectyvar430_bis', 0x98, 0x4A, by_var);
	
	}
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(205 < 107) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x6B, 0x76);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x6B, 0xA0);
	
	}
	if(133 < 0) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x12);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xEA, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(88 < 151) {
	this.bus.emit('display?fillRectxwidth', 0x48, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), bx_var);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0x02, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), bx_var);
	
	}
	if(122 < 192) {
	this.bus.emit('display?fillRectyheightvar431', 0x99, by_var, 0xD0, this.BreakoutGame_BRICK_HEIGHT_var - 2);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', this.BreakoutGame_BRICK_HEIGHT_var - 2, 0xDF, 0x99, by_var);
	
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
	if(19 < 30) {
	this.bus.emit('display?setColorb', 130, 0x43);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xC3, 130);
	
	}
	if(71 < 84) {
	this.bus.emit('display?setColorvar428gr', 158, 209, 0xD8, 0x85);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', 209, 158, 0xD8, 0x04);
	
	}
	if(152 < 24) {
	this.bus.emit('display?setBGColorvar429b', 0x69, 0x46, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorvar429b_bis', 0x69, this.BreakoutGame_fgcolor_var[2]
	, 0x26);
	
	}
	if(225 < 247) {
	this.bus.emit('display?setBGColorrg', this.BreakoutGame_fgcolor_var[0]
	, 0xB9, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorrg_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xA6);
	
	}
	if(45 < 189) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x02, 0x28);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x02, 0x63);
	
	}
	if(237 < 165) {
	this.bus.emit('display?setColorb', this.BreakoutGame_bgcolor_var[2]
	, 0x33);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x2F, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(36 < 55) {
	this.bus.emit('display?drawIntegervy', this.BreakoutGame_level_var, 2, 0x32);
	
	} else {
	this.bus.emit('display?drawIntegervy_bis', 0xE5, 2, this.BreakoutGame_level_var);
	
	}
	if(254 < 148) {
	this.bus.emit('display?drawIntegerxscalevar432digits', 0xD4, 2, 2, 0x17, 6);
	
	} else {
	this.bus.emit('display?drawIntegerxscalevar432digits_bis', 6, 0x1C, 2, 0x17, 2);
	
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
	if(133 < 163) {
	this.bus.emit('display?setColorvar428gr', 158, 209, 0x51, 0x31);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', 209, 158, 0x51, 0x2F);
	
	}
	if(209 < 136) {
	this.bus.emit('display?setColorb', 130, 0xF2);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xD0, 130);
	
	}
	if(102 < 8) {
	this.bus.emit('display?setBGColorrg', this.BreakoutGame_fgcolor_var[0]
	, 0xC9, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setBGColorrg_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xAA);
	
	}
	if(38 < 29) {
	this.bus.emit('display?setBGColorvar429b', 0x61, 0xC7, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setBGColorvar429b_bis', 0x61, this.BreakoutGame_fgcolor_var[2]
	, 0x32);
	
	}
	if(160 < 186) {
	this.bus.emit('display?drawIntegervy', this.BreakoutGame_score_var, 2, 0x5A);
	
	} else {
	this.bus.emit('display?drawIntegervy_bis', 0x56, 2, this.BreakoutGame_score_var);
	
	}
	if(37 < 132) {
	this.bus.emit('display?drawIntegerxscalevar432digits', 0x7C, 5, 2, 0xB5, 58);
	
	} else {
	this.bus.emit('display?drawIntegerxscalevar432digits_bis', 58, 0x3A, 5, 0xB5, 2);
	
	}
}

BreakoutGameBrowser.prototype.drawLives = function() {
	if(234 < 219) {
	this.bus.emit('display?setColorvar428gr', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x37, 0x9F);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x37, 0xC7);
	
	}
	if(206 < 251) {
	this.bus.emit('display?setColorb', this.BreakoutGame_fgcolor_var[2]
	, 0x75);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0x13, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(99 < 120) {
	this.bus.emit('display?fillRectyheightvar431', 0xFD, 4, 0x92, 6);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', 6, 0x0E, 0xFD, 4);
	
	}
	if(181 < 215) {
	this.bus.emit('display?fillRectxwidth', 0xB2, 24 + 6, 124);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0x48, 24 + 6, 124);
	
	}
	if(253 < 152) {
	this.bus.emit('display?setColorvar428gr', 183, 199, 0x85, 0x88);
	
	} else {
	this.bus.emit('display?setColorvar428gr_bis', 199, 183, 0x85, 0x6A);
	
	}
	if(44 < 164) {
	this.bus.emit('display?setColorb', 111, 0x03);
	
	} else {
	this.bus.emit('display?setColorb_bis', 0xB7, 111);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(116 < 33) {
	this.bus.emit('display?fillRectxwidth', 0xA0, 6, 124 + (2 - i_var) * 12);
	
	} else {
	this.bus.emit('display?fillRectxwidth_bis', 0x6C, 6, 124 + (2 - i_var) * 12);
	
	}
	if(37 < 198) {
	this.bus.emit('display?fillRectyheightvar431', 0x5D, 4, 0x6A, 6);
	
	} else {
	this.bus.emit('display?fillRectyheightvar431_bis', 6, 0x4E, 0x5D, 4);
	
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(var447, id, var426) {
	this._receive({_port:"clock", _msg:"timer_timeout", var447:var447, id:id, var426:var426});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(var458) {
	this._receive({_port:"display", _msg:"displayReady_", var458:var458});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar437Ondisplay = function(var437, var459) {
	this._receive({_port:"display", _msg:"displayReadyvar437", var437:var437, var459:var459});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(var472) {
	this._receive({_port:"display", _msg:"displayError_", var472:var472});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar438Ondisplay = function(var473, var438) {
	this._receive({_port:"display", _msg:"displayErrorvar438", var473:var473, var438:var438});
}

BreakoutGameBrowser.prototype.receivedisplayReady__bisOndisplay = function(var482) {
	this._receive({_port:"display", _msg:"displayReady__bis", var482:var482});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar437_bisOndisplay = function(var437, var483) {
	this._receive({_port:"display", _msg:"displayReadyvar437_bis", var437:var437, var483:var483});
}

BreakoutGameBrowser.prototype.receivedisplayError__bisOndisplay = function(var496) {
	this._receive({_port:"display", _msg:"displayError__bis", var496:var496});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar438_bisOndisplay = function(var438, var497) {
	this._receive({_port:"display", _msg:"displayErrorvar438_bis", var438:var438, var497:var497});
}

BreakoutGameBrowser.prototype.receiveposition_Oncontroller = function(var500) {
	this._receive({_port:"controller", _msg:"position_", var500:var500});
}

BreakoutGameBrowser.prototype.receivepositionvar440xyOncontroller = function(x, var440, var501, y) {
	this._receive({_port:"controller", _msg:"positionvar440xy", x:x, var440:var440, var501:var501, y:y});
}

BreakoutGameBrowser.prototype.receiveposition__bisOncontroller = function(var504) {
	this._receive({_port:"controller", _msg:"position__bis", var504:var504});
}

BreakoutGameBrowser.prototype.receivepositionvar440xy_bisOncontroller = function(var505, var440, y, x) {
	this._receive({_port:"controller", _msg:"positionvar440xy_bis", var505:var505, var440:var440, y:y, x:x});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(var520) {
	this._receive({_port:"game", _msg:"lostBall_", var520:var520});
}

BreakoutGameBrowser.prototype.receivelostBallvar444Ongame = function(var444, var521) {
	this._receive({_port:"game", _msg:"lostBallvar444", var444:var444, var521:var521});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(var518) {
	this._receive({_port:"game", _msg:"nextLevel_", var518:var518});
}

BreakoutGameBrowser.prototype.receivenextLevelvar445Ongame = function(var445, var519) {
	this._receive({_port:"game", _msg:"nextLevelvar445", var445:var445, var519:var519});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOngame = function(var524) {
	this._receive({_port:"game", _msg:"lostBall__bis", var524:var524});
}

BreakoutGameBrowser.prototype.receivelostBallvar444_bisOngame = function(var525, var444) {
	this._receive({_port:"game", _msg:"lostBallvar444_bis", var525:var525, var444:var444});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOngame = function(var522) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var522:var522});
}

BreakoutGameBrowser.prototype.receivenextLevelvar445_bisOngame = function(var445, var523) {
	this._receive({_port:"game", _msg:"nextLevelvar445_bis", var445:var445, var523:var523});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(var520) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var520:var520});
}

BreakoutGameBrowser.prototype.receivelostBallvar444Onpro_game = function(var444, var521) {
	this._receive({_port:"pro_game", _msg:"lostBallvar444", var444:var444, var521:var521});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(var518) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var518:var518});
}

BreakoutGameBrowser.prototype.receivenextLevelvar445Onpro_game = function(var445, var519) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar445", var445:var445, var519:var519});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOnpro_game = function(var524) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var524:var524});
}

BreakoutGameBrowser.prototype.receivelostBallvar444_bisOnpro_game = function(var525, var444) {
	this._receive({_port:"pro_game", _msg:"lostBallvar444_bis", var525:var525, var444:var444});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOnpro_game = function(var522) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var522:var522});
}

BreakoutGameBrowser.prototype.receivenextLevelvar445_bisOnpro_game = function(var445, var523) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar445_bis", var445:var445, var523:var523});
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_position__var = function(BreakoutGame_SC_received_controller_position__var) {
	this.BreakoutGame_SC_received_controller_position__var = BreakoutGame_SC_received_controller_position__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar437_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar437_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var = BreakoutGame_SC_INIT_received_display_displayReadyvar437_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var445_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var445_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var445_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var445_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_var437_var = function(BreakoutGame_SC_INIT_display_displayReady_var437_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var437_var = BreakoutGame_SC_INIT_display_displayReady_var437_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_var440_var = function(BreakoutGame_SC_controller_position_var440_var) {
	this.BreakoutGame_SC_controller_position_var440_var = BreakoutGame_SC_controller_position_var440_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar444_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar444_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var = BreakoutGame_SC_PLAY_received_game_lostBallvar444_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var444_var = function(BreakoutGame_SC_PLAY_game_lostBall_var444_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var444_var = BreakoutGame_SC_PLAY_game_lostBall_var444_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var444_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var444_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var444_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var444_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar445_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var445_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var445_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var445_var = BreakoutGame_SC_PLAY_game_nextLevel_var445_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionvar440xy_var = function(BreakoutGame_SC_received_controller_positionvar440xy_var) {
	this.BreakoutGame_SC_received_controller_positionvar440xy_var = BreakoutGame_SC_received_controller_positionvar440xy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\treceived_controller_position_ = ' + this.BreakoutGame_SC_received_controller_position__var;
	result += '\n\treceived_display_displayReadyvar437 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var;
	result += '\n\tpro_game_nextLevel_var445 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var445_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tdisplay_displayReady_var437 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var437_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\treceived_pro_game_lostBallvar444 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\treceived_pro_game_nextLevelvar445 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tcontroller_position_var440 = ' + this.BreakoutGame_SC_controller_position_var440_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\treceived_game_lostBallvar444 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar444_var;
	result += '\n\tgame_lostBall_var444 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var444_var;
	result += '\n\tpro_game_lostBall_var444 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var444_var;
	result += '\n\treceived_game_nextLevelvar445 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar445_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tgame_nextLevel_var445 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var445_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\treceived_controller_positionvar440xy = ' + this.BreakoutGame_SC_received_controller_positionvar440xy_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '';
	return result;
}

