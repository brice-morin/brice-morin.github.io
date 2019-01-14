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
		if(216 < 7) {
		this.bus.emit('display?createysizevar434xsize', this.BreakoutGame_YDISPSIZE_var, 0x1B, 0x57, this.BreakoutGame_XDISPSIZE_var);
		
		} else {
		this.bus.emit('display?createysizevar434xsize_bis', this.BreakoutGame_YDISPSIZE_var, 0x1B, 0xFD, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(76 < 156) {
		this.bus.emit('display?create_', 0xB7);
		
		} else {
		this.bus.emit('display?create__bis', 0x0A);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x6B, 0xF8, 33), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(128 < 179) {
		this.bus.emit('display?update_', 0xEA);
		
		} else {
		this.bus.emit('display?update__bis', 0x63);
		
		}
		if(204 < 122) {
		this.bus.emit('display?updatevar436', 0x60, 0xF8);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x4A, 0x60);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x2D, 0x23, period_const), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xEB, 0xE6, 500), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(39 < 31) {
		this.bus.emit('display?updatevar436', 0x91, 0xFA);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x82, 0x91);
		
		}
		if(154 < 176) {
		this.bus.emit('display?update_', 0xE0);
		
		} else {
		this.bus.emit('display?update__bis', 0x75);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x6C, 0x06, 1000), 0);
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
		if(23 < 146) {
		this.bus.emit('display?update_', 0xD8);
		
		} else {
		this.bus.emit('display?update__bis', 0x51);
		
		}
		if(20 < 240) {
		this.bus.emit('display?updatevar436', 0x44, 0xC3);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x00, 0x44);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(185 < 238) {
		this.bus.emit('display?setColorrgb', 255, 255, 255, 0x91);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', 255, 255, 255, 0xC6);
		
		}
		if(169 < 161) {
		this.bus.emit('display?setColorvar428', 0xB5, 0x24);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0x7D, 0xB5);
		
		}
		if(214 < 228) {
		this.bus.emit('display?fillRectwidthvar431height', 76, 0x0D, 142, 0x66);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0x0D, 76, 0x2E, 142);
		
		}
		if(112 < 148) {
		this.bus.emit('display?fillRectxy', 8, 30, 0x3B);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 8, 0xFA, 30);
		
		}
		if(241 < 48) {
		this.bus.emit('display?setColorvar428', 0x12, 0x58);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0xDB, 0x12);
		
		}
		if(121 < 191) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0x73);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x7C);
		
		}
		if(255 < 215) {
		this.bus.emit('display?fillRectxy', 9, 31, 0x04);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 9, 0xDA, 31);
		
		}
		if(43 < 143) {
		this.bus.emit('display?fillRectwidthvar431height', 50, 0x65, 140, 0xED);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0x65, 50, 0xAB, 140);
		
		}
		if(47 < 31) {
		this.bus.emit('display?setBGColorvar429bg', this.BreakoutGame_fgcolor_var[1]
		, 0xD5, this.BreakoutGame_fgcolor_var[2]
		, 0x51);
		
		} else {
		this.bus.emit('display?setBGColorvar429bg_bis', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xD5, 0x04);
		
		}
		if(42 < 92) {
		this.bus.emit('display?setBGColorr', 0x4E, this.BreakoutGame_fgcolor_var[0]
		);
		
		} else {
		this.bus.emit('display?setBGColorr_bis', 0xDF, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(104 < 170) {
		this.bus.emit('display?setColorvar428', 0xCE, 0x5F);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0xD9, 0xCE);
		
		}
		if(90 < 180) {
		this.bus.emit('display?setColorrgb', 130, 158, 209, 0xF7);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', 130, 209, 158, 0x4C);
		
		}
		if(175 < 139) {
		this.bus.emit('display?drawIntegervar432v', 0xF6, this.BreakoutGame_score_var, 0x6A);
		
		} else {
		this.bus.emit('display?drawIntegervar432v_bis', 0x0D, 0x6A, this.BreakoutGame_score_var);
		
		}
		if(103 < 214) {
		this.bus.emit('display?drawIntegerdigitsscalexy', 5, 23, 40, 0x22, 6);
		
		} else {
		this.bus.emit('display?drawIntegerdigitsscalexy_bis', 40, 5, 0x7E, 23, 6);
		
		}
		if(127 < 41) {
		this.bus.emit('display?drawThingMLxvar433', 26, 0x81, 0x38);
		
		} else {
		this.bus.emit('display?drawThingMLxvar433_bis', 0x75, 0x38, 26);
		
		}
		if(45 < 21) {
		this.bus.emit('display?drawThingMLy', 87, 0xD2);
		
		} else {
		this.bus.emit('display?drawThingMLy_bis', 87, 0xB6);
		
		}
		if(198 < 107) {
		this.bus.emit('display?updatevar436', 0x9F, 0xFC);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x44, 0x9F);
		
		}
		if(242 < 113) {
		this.bus.emit('display?update_', 0xCC);
		
		} else {
		this.bus.emit('display?update__bis', 0x52);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var);
	}).effect((displayReady__bis) => {
		if(69 < 237) {
		this.bus.emit('display?clearvar427', 0xBB, 0x2B);
		
		} else {
		this.bus.emit('display?clearvar427_bis', 0xBB, 0xF6);
		
		}
		if(196 < 137) {
		this.bus.emit('display?clear_', 0xE3);
		
		} else {
		this.bus.emit('display?clear__bis', 0x71);
		
		}
		this.initColors();
		if(186 < 223) {
		this.bus.emit('display?setColorvar428', 0x11, 0xFA);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0x68, 0x11);
		
		}
		if(194 < 162) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0x94);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x9C);
		
		}
		if(18 < 122) {
		this.bus.emit('display?fillRectxy', 0, 0, 0x20);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 0, 0xFE, 0);
		
		}
		if(206 < 59) {
		this.bus.emit('display?fillRectwidthvar431height', this.BreakoutGame_YDISPSIZE_var, 0xD7, this.BreakoutGame_XDISPSIZE_var, 0xF7);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0xD7, this.BreakoutGame_YDISPSIZE_var, 0x34, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(236 < 36) {
		this.bus.emit('display?setColorvar428', 0xAF, 0x2A);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0x9C, 0xAF);
		
		}
		if(187 < 119) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0x15);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xDD);
		
		}
		if(64 < 72) {
		this.bus.emit('display?fillRectwidthvar431height', 14, 0x09, this.BreakoutGame_XDISPSIZE_var, 0xEC);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0x09, 14, 0xCF, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(62 < 164) {
		this.bus.emit('display?fillRectxy', 0, 0, 0x1A);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 0, 0x05, 0);
		
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
		if(69 < 237) {
		this.bus.emit('display?clearvar427', 0xBB, 0x05);
		
		} else {
		this.bus.emit('display?clearvar427_bis', 0xBB, 0x71);
		
		}
		if(196 < 137) {
		this.bus.emit('display?clear_', 0xE9);
		
		} else {
		this.bus.emit('display?clear__bis', 0xD9);
		
		}
		this.initColors();
		if(186 < 223) {
		this.bus.emit('display?setColorvar428', 0x11, 0xE1);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0x0B, 0x11);
		
		}
		if(194 < 162) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0xBA);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0xEE);
		
		}
		if(18 < 122) {
		this.bus.emit('display?fillRectxy', 0, 0, 0x0E);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 0, 0x02, 0);
		
		}
		if(206 < 59) {
		this.bus.emit('display?fillRectwidthvar431height', this.BreakoutGame_YDISPSIZE_var, 0xD7, this.BreakoutGame_XDISPSIZE_var, 0x95);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0xD7, this.BreakoutGame_YDISPSIZE_var, 0xC8, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(236 < 36) {
		this.bus.emit('display?setColorvar428', 0xAF, 0x48);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0xC8, 0xAF);
		
		}
		if(187 < 119) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xF9);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x2A);
		
		}
		if(64 < 72) {
		this.bus.emit('display?fillRectwidthvar431height', 14, 0x09, this.BreakoutGame_XDISPSIZE_var, 0xBD);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0x09, 14, 0xC7, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(62 < 164) {
		this.bus.emit('display?fillRectxy', 0, 0, 0xAF);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 0, 0xFE, 0);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar437) => {
		return displayReadyvar437._port === 'display' && displayReadyvar437._msg === 'displayReadyvar437' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar437) => {
		if(56 < 7) {
		this.bus.emit('display?clear_', 0x4C);
		
		} else {
		this.bus.emit('display?clear__bis', 0xE1);
		
		}
		if(0 < 151) {
		this.bus.emit('display?clearvar427', 0xBB, 0x72);
		
		} else {
		this.bus.emit('display?clearvar427_bis', 0xBB, 0x24);
		
		}
		this.initColors();
		if(125 < 215) {
		this.bus.emit('display?setColorvar428', 0x11, 0x2F);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0xF3, 0x11);
		
		}
		if(116 < 35) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0x36);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0x30);
		
		}
		if(208 < 122) {
		this.bus.emit('display?fillRectxy', 0, 0, 0x33);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 0, 0x86, 0);
		
		}
		if(65 < 43) {
		this.bus.emit('display?fillRectwidthvar431height', this.BreakoutGame_YDISPSIZE_var, 0xD7, this.BreakoutGame_XDISPSIZE_var, 0xEA);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0xD7, this.BreakoutGame_YDISPSIZE_var, 0x9B, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(123 < 105) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xA5);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0x15);
		
		}
		if(250 < 211) {
		this.bus.emit('display?setColorvar428', 0xAF, 0xF0);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0x4D, 0xAF);
		
		}
		if(189 < 168) {
		this.bus.emit('display?fillRectwidthvar431height', 14, 0x09, this.BreakoutGame_XDISPSIZE_var, 0xEE);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0x09, 14, 0x5E, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(186 < 49) {
		this.bus.emit('display?fillRectxy', 0, 0, 0x75);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 0, 0xDE, 0);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar437_bis) => {
		return displayReadyvar437_bis._port === 'display' && displayReadyvar437_bis._msg === 'displayReadyvar437_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar437_bis) => {
		if(56 < 7) {
		this.bus.emit('display?clear_', 0x2C);
		
		} else {
		this.bus.emit('display?clear__bis', 0x18);
		
		}
		if(0 < 151) {
		this.bus.emit('display?clearvar427', 0xBB, 0xAA);
		
		} else {
		this.bus.emit('display?clearvar427_bis', 0xBB, 0x98);
		
		}
		this.initColors();
		if(125 < 215) {
		this.bus.emit('display?setColorvar428', 0x11, 0x1C);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0x5D, 0x11);
		
		}
		if(116 < 35) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[1]
		, 0x2B);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
		, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		, 0xCE);
		
		}
		if(208 < 122) {
		this.bus.emit('display?fillRectxy', 0, 0, 0x6E);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 0, 0xB5, 0);
		
		}
		if(65 < 43) {
		this.bus.emit('display?fillRectwidthvar431height', this.BreakoutGame_YDISPSIZE_var, 0xD7, this.BreakoutGame_XDISPSIZE_var, 0x7D);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0xD7, this.BreakoutGame_YDISPSIZE_var, 0xA4, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(123 < 105) {
		this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[1]
		, 0xDB);
		
		} else {
		this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xF8);
		
		}
		if(250 < 211) {
		this.bus.emit('display?setColorvar428', 0xAF, 0xA3);
		
		} else {
		this.bus.emit('display?setColorvar428_bis', 0x80, 0xAF);
		
		}
		if(189 < 168) {
		this.bus.emit('display?fillRectwidthvar431height', 14, 0x09, this.BreakoutGame_XDISPSIZE_var, 0xCD);
		
		} else {
		this.bus.emit('display?fillRectwidthvar431height_bis', 0x09, 14, 0x86, this.BreakoutGame_XDISPSIZE_var);
		
		}
		if(186 < 49) {
		this.bus.emit('display?fillRectxy', 0, 0, 0x5C);
		
		} else {
		this.bus.emit('display?fillRectxy_bis', 0, 0xA0, 0);
		
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
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar445) => {
		return lostBallvar445._port === 'pro_game' && lostBallvar445._msg === 'lostBallvar445' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar445) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xBE, 0x1A), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar445) => {
		return lostBallvar445._port === 'pro_game' && lostBallvar445._msg === 'lostBallvar445' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar445) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar445_bis) => {
		return lostBallvar445_bis._port === 'pro_game' && lostBallvar445_bis._msg === 'lostBallvar445_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar445_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x05, 0x1A), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar445_bis) => {
		return lostBallvar445_bis._port === 'pro_game' && lostBallvar445_bis._msg === 'lostBallvar445_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar445_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x15, 0x6C), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x3B, 0x6C), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xA7, 0x1A), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar446_bis) => {
		return nextLevelvar446_bis._port === 'pro_game' && nextLevelvar446_bis._msg === 'nextLevelvar446_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar446_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xFF, 0x6C), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar446_bis) => {
		return nextLevelvar446_bis._port === 'pro_game' && nextLevelvar446_bis._msg === 'nextLevelvar446_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar446_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar446) => {
		return nextLevelvar446._port === 'pro_game' && nextLevelvar446._msg === 'nextLevelvar446' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar446) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x9E, 0x6C), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar446) => {
		return nextLevelvar446._port === 'pro_game' && nextLevelvar446._msg === 'nextLevelvar446' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar446) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x7D, 0x1A), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar445) => {
		return lostBallvar445._port === 'game' && lostBallvar445._msg === 'lostBallvar445' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar445) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xA8, 0x24), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar445) => {
		return lostBallvar445._port === 'game' && lostBallvar445._msg === 'lostBallvar445' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar445) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar445_bis) => {
		return lostBallvar445_bis._port === 'game' && lostBallvar445_bis._msg === 'lostBallvar445_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar445_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x29, 0x24), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar445_bis) => {
		return lostBallvar445_bis._port === 'game' && lostBallvar445_bis._msg === 'lostBallvar445_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar445_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x9F, 0xE0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x2B, 0xE0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x62, 0x24), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar446_bis) => {
		return nextLevelvar446_bis._port === 'game' && nextLevelvar446_bis._msg === 'nextLevelvar446_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar446_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x37, 0xE0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar446_bis) => {
		return nextLevelvar446_bis._port === 'game' && nextLevelvar446_bis._msg === 'nextLevelvar446_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar446_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar446) => {
		return nextLevelvar446._port === 'game' && nextLevelvar446._msg === 'nextLevelvar446' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar446) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0x20, 0xE0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar446) => {
		return nextLevelvar446._port === 'game' && nextLevelvar446._msg === 'nextLevelvar446' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar446) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0, 0xC1, 0x24), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
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
		if(98 < 234) {
		this.bus.emit('sound?tonefreqtime', 0x19, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonefreqtime_bis', this.BreakoutGame_tone_duration_var, 0x25, this.BreakoutGame_tone2_var);
		
		}
		if(239 < 103) {
		this.bus.emit('sound?tonevar444', 0xBD, 0x3D);
		
		} else {
		this.bus.emit('sound?tonevar444_bis', 0xBD, 0xA7);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(17 < 40) {
		this.bus.emit('sound?tonefreqtime', 0x20, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonefreqtime_bis', this.BreakoutGame_tone_duration_var, 0x39, this.BreakoutGame_tone2_var);
		
		}
		if(65 < 98) {
		this.bus.emit('sound?tonevar444', 0x31, 0x3E);
		
		} else {
		this.bus.emit('sound?tonevar444_bis', 0x31, 0x2E);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(120 < 76) {
		this.bus.emit('sound?tonevar444', 0xAA, 0x0A);
		
		} else {
		this.bus.emit('sound?tonevar444_bis', 0xAA, 0x23);
		
		}
		if(248 < 233) {
		this.bus.emit('sound?tonefreqtime', 0xC5, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonefreqtime_bis', this.BreakoutGame_tone_duration_var, 0xF1, this.BreakoutGame_tone2_var);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(216 < 143) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x58), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0xE2), 0);
		
		}
		if(45 < 222) {
		setTimeout(() => this.bus.emit('game?lostBallvar445', 0x59, 0xF9), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar445_bis', 0x53, 0xF9), 0);
		
		}
		if(222 < 150) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x29), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0xFC), 0);
		
		}
		if(112 < 106) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar445', 0x4C, 0xD3), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar445_bis', 0xB5, 0xD3), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(254 < 218) {
		this.bus.emit('sound?tonevar444', 0x2E, 0xC3);
		
		} else {
		this.bus.emit('sound?tonevar444_bis', 0x2E, 0x8E);
		
		}
		if(50 < 214) {
		this.bus.emit('sound?tonefreqtime', 0xFA, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone2_var);
		
		} else {
		this.bus.emit('sound?tonefreqtime_bis', this.BreakoutGame_tone_duration_var, 0xAB, this.BreakoutGame_tone2_var);
		
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
		if(13 < 61) {
		this.bus.emit('sound?tonevar444', 0x22, 0x11);
		
		} else {
		this.bus.emit('sound?tonevar444_bis', 0x22, 0xE9);
		
		}
		if(200 < 10) {
		this.bus.emit('sound?tonefreqtime', 0x7B, this.BreakoutGame_tone_duration_var, this.BreakoutGame_tone1_var);
		
		} else {
		this.bus.emit('sound?tonefreqtime_bis', this.BreakoutGame_tone_duration_var, 0x6B, this.BreakoutGame_tone1_var);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(65 < 76) {
		setTimeout(() => this.bus.emit('game?nextLevelvar446', 0x2A, 0xCE), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar446_bis', 0x85, 0xCE), 0);
		
		}
		if(225 < 63) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0x33), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0x8A), 0);
		
		}
		if(214 < 37) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xB7), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0x72), 0);
		
		}
		if(110 < 21) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar446', 0xC0, 0x5A), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar446_bis', 0xE4, 0x5A), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(70 < 20) {
		const bx_const = this.BreakoutGame_bx_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApadyballx', bx_const, 0xB5, pady_const), 0);
		
		} else {
		const pady_const = this.BreakoutGame_pady_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadyballx_bis', 0x43, pady_const, bx_const), 0);
		
		}
		if(200 < 150) {
		const padx_const = this.BreakoutGame_padx_var;
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAvar441padxbally', padx_const, 0xC0, 0x61, by_const), 0);
		
		} else {
		const by_const = this.BreakoutGame_by_var;
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIAvar441padxbally_bis', 0x61, by_const, 0x7C, padx_const), 0);
		
		}
		if(30 < 209) {
		this.bus.emit('display?updatevar436', 0x9E, 0x3A);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x64, 0x9E);
		
		}
		if(147 < 214) {
		this.bus.emit('display?update_', 0x79);
		
		} else {
		this.bus.emit('display?update__bis', 0x9D);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xA5, 0xFC, period_const), 0);
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
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(227 < 172) {
		this.bus.emit('display?update_', 0x57);
		
		} else {
		this.bus.emit('display?update__bis', 0x7E);
		
		}
		if(157 < 248) {
		this.bus.emit('display?updatevar436', 0x9C, 0xD7);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0xA4, 0x9C);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xE0, 0xD8, 33), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(123 < 113) {
		this.bus.emit('display?updatevar436', 0xEA, 0xE7);
		
		} else {
		this.bus.emit('display?updatevar436_bis', 0x53, 0xEA);
		
		}
		if(34 < 148) {
		this.bus.emit('display?update_', 0x38);
		
		} else {
		this.bus.emit('display?update__bis', 0x83);
		
		}
	});
	this._statemachine.to(null).when((positionvar440_bis) => {
		return positionvar440_bis._port === 'controller' && positionvar440_bis._msg === 'positionvar440_bis';
	}).effect((positionvar440_bis) => {
		this.BreakoutGame_SC_received_controller_positionvar440_var = true;
		this.BreakoutGame_SC_controller_position_var440_var = positionvar440_bis.var440;
		if(this.BreakoutGame_SC_received_controller_positionxy_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar440_var = false;
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionxy) => {
		return positionxy._port === 'controller' && positionxy._msg === 'positionxy';
	}).effect((positionxy) => {
		this.BreakoutGame_SC_received_controller_positionxy_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionxy.x;
		this.BreakoutGame_SC_controller_position_y_var = positionxy.y;
		if(this.BreakoutGame_SC_received_controller_positionvar440_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		this.BreakoutGame_SC_received_controller_positionvar440_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionxy_bis) => {
		return positionxy_bis._port === 'controller' && positionxy_bis._msg === 'positionxy_bis';
	}).effect((positionxy_bis) => {
		this.BreakoutGame_SC_received_controller_positionxy_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionxy_bis.x;
		this.BreakoutGame_SC_controller_position_y_var = positionxy_bis.y;
		if(this.BreakoutGame_SC_received_controller_positionvar440_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		this.BreakoutGame_SC_received_controller_positionvar440_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar440) => {
		return positionvar440._port === 'controller' && positionvar440._msg === 'positionvar440';
	}).effect((positionvar440) => {
		this.BreakoutGame_SC_received_controller_positionvar440_var = true;
		this.BreakoutGame_SC_controller_position_var440_var = positionvar440.var440;
		if(this.BreakoutGame_SC_received_controller_positionxy_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar440_var = false;
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		
		}
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
	if(229 < 35) {
	this.bus.emit('display?setBGColorvar429bg', this.BreakoutGame_bgcolor_var[1]
	, 0x37, this.BreakoutGame_bgcolor_var[2]
	, 0x4A);
	
	} else {
	this.bus.emit('display?setBGColorvar429bg_bis', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x37, 0x76);
	
	}
	if(208 < 140) {
	this.bus.emit('display?setBGColorr', 0xA0, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorr_bis', 0x12, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(98 < 38) {
	this.bus.emit('display?setColorvar428', 0xC2, 0xEA);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x48, 0xC2);
	
	}
	if(150 < 224) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x02);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xD0);
	
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
	if(194 < 7) {
	this.bus.emit('display?setColorvar428', 0x97, 0xDF);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x43, 0x97);
	
	}
	if(103 < 115) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xC3);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x85);
	
	}
	if(45 < 6) {
	this.bus.emit('display?fillRectxy', this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var, 0x04);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', this.BreakoutGame_prevBX_var, 0x46, this.BreakoutGame_prevBY_var);
	
	}
	if(101 < 83) {
	this.bus.emit('display?fillRectwidthvar431height', bs_var, 0x7E, bs_var, 0x26);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x7E, bs_var, 0xB9, bs_var);
	
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
	if(205 < 107) {
	this.bus.emit('display?setColorvar428', 0x3F, 0xA6);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x28, 0x3F);
	
	}
	if(133 < 0) {
	this.bus.emit('display?setColorrgb', 111, 183, 199, 0x63);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', 111, 199, 183, 0x33);
	
	}
	if(88 < 151) {
	this.bus.emit('display?fillRectxy', this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var, 0x2F);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', this.BreakoutGame_prevBX_var, 0x32, this.BreakoutGame_prevBY_var);
	
	}
	if(122 < 192) {
	this.bus.emit('display?fillRectwidthvar431height', bs_var, 0x13, bs_var, 0xE5);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x13, bs_var, 0xD4, bs_var);
	
	}
}

BreakoutGameBrowserRND.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(19 < 30) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x1C);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x31);
	
	}
	if(71 < 84) {
	this.bus.emit('display?setColorvar428', 0x98, 0x2F);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0xF2, 0x98);
	
	}
	if(152 < 24) {
	this.bus.emit('display?fillRectxy', this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var, 0xD0);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', this.BreakoutGame_prevPX_var, 0xC9, this.BreakoutGame_prevPY_var);
	
	}
	if(225 < 247) {
	this.bus.emit('display?fillRectwidthvar431height', 4, 0x91, ps_var, 0xAA);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x91, 4, 0xC7, ps_var);
	
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
	if(45 < 189) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x32);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x5A);
	
	}
	if(237 < 165) {
	this.bus.emit('display?setColorvar428', 0xFD, 0x56);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x7C, 0xFD);
	
	}
	if(36 < 55) {
	this.bus.emit('display?fillRectxy', this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var, 0x3A);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', this.BreakoutGame_prevPX_var, 0x9F, this.BreakoutGame_prevPY_var);
	
	}
	if(254 < 148) {
	this.bus.emit('display?fillRectwidthvar431height', 4, 0xC0, ps_var, 0xC7);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0xC0, 4, 0x75, ps_var);
	
	}
}

BreakoutGameBrowserRND.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(133 < 163) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x13);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x92);
	
	}
	if(209 < 136) {
	this.bus.emit('display?setColorvar428', 0x0F, 0x0E);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0xB2, 0x0F);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(102 < 8) {
	this.bus.emit('display?setColorvar428', 0x8E, 0x48);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x88, 0x8E);
	
	}
	if(38 < 29) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x6A);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x03);
	
	}
	if(160 < 186) {
	this.bus.emit('display?setBGColorvar429bg', this.BreakoutGame_bgcolor_var[1]
	, 0xD7, this.BreakoutGame_bgcolor_var[2]
	, 0xB7);
	
	} else {
	this.bus.emit('display?setBGColorvar429bg_bis', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, 0xD7, 0xA0);
	
	}
	if(37 < 132) {
	this.bus.emit('display?setBGColorr', 0x6C, this.BreakoutGame_bgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorr_bis', 0x6A, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(234 < 219) {
	this.bus.emit('display?drawIntegerdigitsscalexy', 1, 80 - 6, 90, 0x4E, 4);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsscalexy_bis', 90, 1, 0xF9, 80 - 6, 4);
	
	}
	if(206 < 251) {
	this.bus.emit('display?drawIntegervar432v', 0x31, BreakoutGame_drawCountDown_c_var, 0x8A);
	
	} else {
	this.bus.emit('display?drawIntegervar432v_bis', 0x78, 0x8A, BreakoutGame_drawCountDown_c_var);
	
	}
	
	} else {
	if(99 < 120) {
	this.bus.emit('display?setColorvar428', 0x0F, 0x8F);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0xB5, 0x0F);
	
	}
	if(181 < 215) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x4E);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x3E);
	
	}
	if(253 < 152) {
	this.bus.emit('display?fillRectxy', 80 - 6, 90, 0x3E);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', 80 - 6, 0x02, 90);
	
	}
	if(44 < 164) {
	this.bus.emit('display?fillRectwidthvar431height', 20, 0xAA, 12, 0xF8);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0xAA, 20, 0x03, 12);
	
	}
	
	}
}

BreakoutGameBrowserRND.prototype.drawWalls = function() {
	if(116 < 33) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0xA3);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x9C);
	
	}
	if(37 < 198) {
	this.bus.emit('display?setColorvar428', 0x0F, 0x5C);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0xDC, 0x0F);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(233 < 30) {
	this.bus.emit('display?fillRectwidthvar431height', 1, 0x08, xcenter_var + 1, 0xEB);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x08, 1, 0xF6, xcenter_var + 1);
	
	}
	if(163 < 162) {
	this.bus.emit('display?fillRectxy', left_var - 1, top_var - 1, 0x7A);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', left_var - 1, 0x7A, top_var - 1);
	
	}
	if(12 < 117) {
	this.bus.emit('display?fillRectwidthvar431height', 1, 0x9A, xcenter_var + 1, 0xBD);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x9A, 1, 0xFA, xcenter_var + 1);
	
	}
	if(40 < 119) {
	this.bus.emit('display?fillRectxy', left_var - 1, bottom_var, 0x48);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', left_var - 1, 0x61, bottom_var);
	
	}
	if(114 < 66) {
	this.bus.emit('display?fillRectwidthvar431height', ycenter_var, 0x65, 1, 0xE2);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x65, ycenter_var, 0xAE, 1);
	
	}
	if(7 < 69) {
	this.bus.emit('display?fillRectxy', left_var - 1, top_var, 0x3D);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', left_var - 1, 0x1C, top_var);
	
	}
	if(201 < 129) {
	this.bus.emit('display?fillRectxy', right_var, top_var, 0x4E);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', right_var, 0xF2, top_var);
	
	}
	if(244 < 6) {
	this.bus.emit('display?fillRectwidthvar431height', ycenter_var, 0x5E, 1, 0x55);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x5E, ycenter_var, 0xB4, 1);
	
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
	if(186 < 146) {
	this.bus.emit('display?setColorvar428', 0x3D, 0x5E);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x6A, 0x3D);
	
	}
	if(219 < 115) {
	this.bus.emit('display?setColorrgb', 89, 155, 103, 0xE6);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', 89, 103, 155, 0x5F);
	
	}
	if(106 < 18) {
	this.bus.emit('display?fillRectwidthvar431height', h_var, 0x82, w_var, 0x14);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x82, h_var, 0xBF, w_var);
	
	}
	if(197 < 133) {
	this.bus.emit('display?fillRectxy', bx_var, by_var, 0xAC);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', bx_var, 0x0D, by_var);
	
	}
	if(123 < 37) {
	this.bus.emit('display?setColorrgb', 43, 100, 56, 0x80);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', 43, 56, 100, 0x30);
	
	}
	if(8 < 114) {
	this.bus.emit('display?setColorvar428', 0xE6, 0x6D);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x97, 0xE6);
	
	}
	if(131 < 209) {
	this.bus.emit('display?drawRectwidthxvar430', 0xD3, bx_var, w_var, 0xB1);
	
	} else {
	this.bus.emit('display?drawRectwidthxvar430_bis', bx_var, 0xD3, 0xAA, w_var);
	
	}
	if(152 < 151) {
	this.bus.emit('display?drawRectyheight', by_var, 0xB9, h_var);
	
	} else {
	this.bus.emit('display?drawRectyheight_bis', by_var, h_var, 0xB4);
	
	}
}

BreakoutGameBrowserRND.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(27 < 249) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x21);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x43);
	
	}
	if(22 < 149) {
	this.bus.emit('display?setColorvar428', 0x2E, 0xE7);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x15, 0x2E);
	
	}
	if(200 < 127) {
	this.bus.emit('display?fillRectwidthvar431height', this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x57, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), 0xC8);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x57, this.BreakoutGame_BRICK_HEIGHT_var - 2, 0xC1, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2));
	
	}
	if(116 < 162) {
	this.bus.emit('display?fillRectxy', bx_var, by_var, 0xA0);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', bx_var, 0x6D, by_var);
	
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
	if(250 < 83) {
	this.bus.emit('display?setColorrgb', 130, 158, 209, 0x39);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', 130, 209, 158, 0x20);
	
	}
	if(228 < 83) {
	this.bus.emit('display?setColorvar428', 0x80, 0x8C);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0xCE, 0x80);
	
	}
	if(179 < 69) {
	this.bus.emit('display?setBGColorr', 0x68, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorr_bis', 0x53, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(98 < 233) {
	this.bus.emit('display?setBGColorvar429bg', this.BreakoutGame_fgcolor_var[1]
	, 0x91, this.BreakoutGame_fgcolor_var[2]
	, 0x3D);
	
	} else {
	this.bus.emit('display?setBGColorvar429bg_bis', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x91, 0x50);
	
	}
	if(246 < 171) {
	this.bus.emit('display?setColorvar428', 0x6F, 0x0A);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0xD7, 0x6F);
	
	}
	if(254 < 180) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[1]
	, 0x64);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0xBE);
	
	}
	if(214 < 37) {
	this.bus.emit('display?drawIntegerdigitsscalexy', 2, 6, 2, 0xFB, 2);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsscalexy_bis', 2, 2, 0x01, 6, 2);
	
	}
	if(16 < 118) {
	this.bus.emit('display?drawIntegervar432v', 0x8B, this.BreakoutGame_level_var, 0x70);
	
	} else {
	this.bus.emit('display?drawIntegervar432v_bis', 0x72, 0x70, this.BreakoutGame_level_var);
	
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
	if(10 < 103) {
	this.bus.emit('display?setColorrgb', 130, 158, 209, 0x06);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', 130, 209, 158, 0x4B);
	
	}
	if(49 < 1) {
	this.bus.emit('display?setColorvar428', 0x1D, 0x8B);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0xED, 0x1D);
	
	}
	if(125 < 12) {
	this.bus.emit('display?setBGColorvar429bg', this.BreakoutGame_fgcolor_var[1]
	, 0x99, this.BreakoutGame_fgcolor_var[2]
	, 0x5E);
	
	} else {
	this.bus.emit('display?setBGColorvar429bg_bis', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x99, 0xB6);
	
	}
	if(104 < 104) {
	this.bus.emit('display?setBGColorr', 0x1A, this.BreakoutGame_fgcolor_var[0]
	);
	
	} else {
	this.bus.emit('display?setBGColorr_bis', 0x63, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(180 < 149) {
	this.bus.emit('display?drawIntegervar432v', 0xAA, this.BreakoutGame_score_var, 0x0D);
	
	} else {
	this.bus.emit('display?drawIntegervar432v_bis', 0x1D, 0x0D, this.BreakoutGame_score_var);
	
	}
	if(161 < 59) {
	this.bus.emit('display?drawIntegerdigitsscalexy', 5, 58, 2, 0x4A, 2);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsscalexy_bis', 2, 5, 0x80, 58, 2);
	
	}
}

BreakoutGameBrowserRND.prototype.drawLives = function() {
	if(233 < 211) {
	this.bus.emit('display?setColorvar428', 0x12, 0x00);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x6F, 0x12);
	
	}
	if(194 < 22) {
	this.bus.emit('display?setColorrgb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[1]
	, 0x6C);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x80);
	
	}
	if(163 < 88) {
	this.bus.emit('display?fillRectwidthvar431height', 6, 0xAE, 24 + 6, 0x53);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0xAE, 6, 0x86, 24 + 6);
	
	}
	if(200 < 70) {
	this.bus.emit('display?fillRectxy', 124, 4, 0x69);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', 124, 0x34, 4);
	
	}
	if(145 < 200) {
	this.bus.emit('display?setColorrgb', 111, 183, 199, 0x99);
	
	} else {
	this.bus.emit('display?setColorrgb_bis', 111, 199, 183, 0xEC);
	
	}
	if(82 < 126) {
	this.bus.emit('display?setColorvar428', 0xC1, 0x43);
	
	} else {
	this.bus.emit('display?setColorvar428_bis', 0x04, 0xC1);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(22 < 124) {
	this.bus.emit('display?fillRectwidthvar431height', 6, 0x74, 6, 0x64);
	
	} else {
	this.bus.emit('display?fillRectwidthvar431height_bis', 0x74, 6, 0x73, 6);
	
	}
	if(0 < 136) {
	this.bus.emit('display?fillRectxy', 124 + (2 - i_var) * 12, 4, 0xE1);
	
	} else {
	this.bus.emit('display?fillRectxy_bis', 124 + (2 - i_var) * 12, 0x7F, 4);
	
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

BreakoutGameBrowserRND.prototype.receivetimer_timeoutOnclock = function(var447, var426, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", var447:var447, var426:var426, id:id});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady_Ondisplay = function(var464) {
	this._receive({_port:"display", _msg:"displayReady_", var464:var464});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar437Ondisplay = function(var465, var437) {
	this._receive({_port:"display", _msg:"displayReadyvar437", var465:var465, var437:var437});
}

BreakoutGameBrowserRND.prototype.receivedisplayError_Ondisplay = function(var472) {
	this._receive({_port:"display", _msg:"displayError_", var472:var472});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar438Ondisplay = function(var438, var473) {
	this._receive({_port:"display", _msg:"displayErrorvar438", var438:var438, var473:var473});
}

BreakoutGameBrowserRND.prototype.receivedisplayReady__bisOndisplay = function(var488) {
	this._receive({_port:"display", _msg:"displayReady__bis", var488:var488});
}

BreakoutGameBrowserRND.prototype.receivedisplayReadyvar437_bisOndisplay = function(var489, var437) {
	this._receive({_port:"display", _msg:"displayReadyvar437_bis", var489:var489, var437:var437});
}

BreakoutGameBrowserRND.prototype.receivedisplayError__bisOndisplay = function(var496) {
	this._receive({_port:"display", _msg:"displayError__bis", var496:var496});
}

BreakoutGameBrowserRND.prototype.receivedisplayErrorvar438_bisOndisplay = function(var438, var497) {
	this._receive({_port:"display", _msg:"displayErrorvar438_bis", var438:var438, var497:var497});
}

BreakoutGameBrowserRND.prototype.receivepositionxyOncontroller = function(x, var500, y) {
	this._receive({_port:"controller", _msg:"positionxy", x:x, var500:var500, y:y});
}

BreakoutGameBrowserRND.prototype.receivepositionvar440Oncontroller = function(var501, var440) {
	this._receive({_port:"controller", _msg:"positionvar440", var501:var501, var440:var440});
}

BreakoutGameBrowserRND.prototype.receivepositionxy_bisOncontroller = function(var504, y, x) {
	this._receive({_port:"controller", _msg:"positionxy_bis", var504:var504, y:y, x:x});
}

BreakoutGameBrowserRND.prototype.receivepositionvar440_bisOncontroller = function(var440, var505) {
	this._receive({_port:"controller", _msg:"positionvar440_bis", var440:var440, var505:var505});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Ongame = function(var522) {
	this._receive({_port:"game", _msg:"lostBall_", var522:var522});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar445Ongame = function(var523, var445) {
	this._receive({_port:"game", _msg:"lostBallvar445", var523:var523, var445:var445});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Ongame = function(var524) {
	this._receive({_port:"game", _msg:"nextLevel_", var524:var524});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar446Ongame = function(var525, var446) {
	this._receive({_port:"game", _msg:"nextLevelvar446", var525:var525, var446:var446});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOngame = function(var526) {
	this._receive({_port:"game", _msg:"lostBall__bis", var526:var526});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar445_bisOngame = function(var527, var445) {
	this._receive({_port:"game", _msg:"lostBallvar445_bis", var527:var527, var445:var445});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOngame = function(var528) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var528:var528});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar446_bisOngame = function(var529, var446) {
	this._receive({_port:"game", _msg:"nextLevelvar446_bis", var529:var529, var446:var446});
}

BreakoutGameBrowserRND.prototype.receivelostBall_Onpro_game = function(var522) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var522:var522});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar445Onpro_game = function(var523, var445) {
	this._receive({_port:"pro_game", _msg:"lostBallvar445", var523:var523, var445:var445});
}

BreakoutGameBrowserRND.prototype.receivenextLevel_Onpro_game = function(var524) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var524:var524});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar446Onpro_game = function(var525, var446) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar446", var525:var525, var446:var446});
}

BreakoutGameBrowserRND.prototype.receivelostBall__bisOnpro_game = function(var526) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var526:var526});
}

BreakoutGameBrowserRND.prototype.receivelostBallvar445_bisOnpro_game = function(var527, var445) {
	this._receive({_port:"pro_game", _msg:"lostBallvar445_bis", var527:var527, var445:var445});
}

BreakoutGameBrowserRND.prototype.receivenextLevel__bisOnpro_game = function(var528) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var528:var528});
}

BreakoutGameBrowserRND.prototype.receivenextLevelvar446_bisOnpro_game = function(var529, var446) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar446_bis", var529:var529, var446:var446});
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positionvar440_var = function(BreakoutGame_SC_received_controller_positionvar440_var) {
	this.BreakoutGame_SC_received_controller_positionvar440_var = BreakoutGame_SC_received_controller_positionvar440_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_display_displayReady_var437_var = function(BreakoutGame_SC_INIT_display_displayReady_var437_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var437_var = BreakoutGame_SC_INIT_display_displayReady_var437_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_var440_var = function(BreakoutGame_SC_controller_position_var440_var) {
	this.BreakoutGame_SC_controller_position_var440_var = BreakoutGame_SC_controller_position_var440_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar445_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar445_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var = BreakoutGame_SC_PLAY_received_game_lostBallvar445_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var445_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var445_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var445_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var445_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar437_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar437_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var = BreakoutGame_SC_INIT_received_display_displayReadyvar437_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_received_controller_positionxy_var = function(BreakoutGame_SC_received_controller_positionxy_var) {
	this.BreakoutGame_SC_received_controller_positionxy_var = BreakoutGame_SC_received_controller_positionxy_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var446_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var446_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var446_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var446_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var445_var = function(BreakoutGame_SC_PLAY_game_lostBall_var445_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var445_var = BreakoutGame_SC_PLAY_game_lostBall_var445_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var446_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var446_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var446_var = BreakoutGame_SC_PLAY_game_nextLevel_var446_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar446_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowserRND.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\treceived_controller_positionvar440 = ' + this.BreakoutGame_SC_received_controller_positionvar440_var;
	result += '\n\tdisplay_displayReady_var437 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var437_var;
	result += '\n\treceived_pro_game_lostBallvar445 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tcontroller_position_var440 = ' + this.BreakoutGame_SC_controller_position_var440_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\treceived_game_lostBallvar445 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar445_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tpro_game_lostBall_var445 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var445_var;
	result += '\n\treceived_display_displayReadyvar437 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar437_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\treceived_controller_positionxy = ' + this.BreakoutGame_SC_received_controller_positionxy_var;
	result += '\n\tpro_game_nextLevel_var446 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var446_var;
	result += '\n\tgame_lostBall_var445 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var445_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\treceived_pro_game_nextLevelvar446 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tgame_nextLevel_var446 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var446_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\treceived_game_nextLevelvar446 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar446_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '';
	return result;
}

