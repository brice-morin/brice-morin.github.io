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
		if(19 < 122) {
		this.bus.emit('display?createxsizeysizevar328', 0x4E, this.BreakoutGame_YDISPSIZE_var, this.BreakoutGame_XDISPSIZE_var, 0x4C);
		
		} else {
		this.bus.emit('display?createxsizeysizevar328_bis', 0xF5, this.BreakoutGame_XDISPSIZE_var, 0x4E, this.BreakoutGame_YDISPSIZE_var);
		
		}
		if(5 < 124) {
		this.bus.emit('display?create_', 0x07);
		
		} else {
		this.bus.emit('display?create__bis', 0xBF);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x78, 0, 33, 0x57), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(73 < 168) {
		this.bus.emit('display?updatevar330', 0xC7, 0xD8);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0xD8, 0xB8);
		
		}
		if(12 < 117) {
		this.bus.emit('display?update_', 0xFF);
		
		} else {
		this.bus.emit('display?update__bis', 0x30);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0x92, 0, period_const, 0xBE), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0x67, 0, 500, 0x33), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(104 < 59) {
		this.bus.emit('display?updatevar330', 0x53, 0x1D);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0x1D, 0x54);
		
		}
		if(30 < 248) {
		this.bus.emit('display?update_', 0xCF);
		
		} else {
		this.bus.emit('display?update__bis', 0x9C);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xBC, 0, 1000, 0xB1), 0);
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
		if(91 < 142) {
		this.bus.emit('display?updatevar330', 0xCF, 0xC7);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0xC7, 0x39);
		
		}
		if(62 < 30) {
		this.bus.emit('display?update_', 0x06);
		
		} else {
		this.bus.emit('display?update__bis', 0x28);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(183 < 166) {
		this.bus.emit('display?update_', 0x49);
		
		} else {
		this.bus.emit('display?update__bis', 0x52);
		
		}
		if(239 < 180) {
		this.bus.emit('display?updatevar330', 0x03, 0x3B);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0x3B, 0x0F);
		
		}
		setTimeout(() => this.bus.emit('clock?timer_start', 0xD8, 0, 500, 0x7E), 0);
	});
	let BreakoutGame_SC_GAMEREALLYOVER = new StateJS.State('GAMEREALLYOVER', this._statemachine).entry(() => {
		if(131 < 17) {
		this.bus.emit('display?setColorvar322rg', 0xD5, 255, 0x9B, 255);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0x3E, 0x9B, 255, 255);
		
		}
		if(44 < 2) {
		this.bus.emit('display?setColorb', 0x82, 255);
		
		} else {
		this.bus.emit('display?setColorb_bis', 255, 0x25);
		
		}
		if(96 < 53) {
		this.bus.emit('display?fillRectwidthyx', 0xD7, 142, 8, 30);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', 142, 30, 8, 0x6F);
		
		}
		if(207 < 97) {
		this.bus.emit('display?fillRectvar325height', 0x7C, 76, 0x92);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', 76, 0x47, 0x7C);
		
		}
		if(133 < 210) {
		this.bus.emit('display?setColorb', 0x9B, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x75);
		
		}
		if(129 < 252) {
		this.bus.emit('display?setColorvar322rg', 0xDE, this.BreakoutGame_fgcolor_var[0]
		, 0xA4, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0x50, 0xA4, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(203 < 136) {
		this.bus.emit('display?fillRectvar325height', 0xC6, 50, 0x3D);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', 50, 0x25, 0xC6);
		
		}
		if(208 < 178) {
		this.bus.emit('display?fillRectwidthyx', 0x35, 140, 9, 31);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', 140, 31, 9, 0xC1);
		
		}
		if(125 < 10) {
		this.bus.emit('display?setBGColorrvar323gb', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xDC, 0xA1);
		
		} else {
		this.bus.emit('display?setBGColorrvar323gb_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x99, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[2]
		, 0xA1);
		
		}
		if(208 < 42) {
		this.bus.emit('display?setBGColor_', 0x99);
		
		} else {
		this.bus.emit('display?setBGColor__bis', 0xF5);
		
		}
		if(148 < 56) {
		this.bus.emit('display?setColorb', 0x05, 130);
		
		} else {
		this.bus.emit('display?setColorb_bis', 130, 0xAD);
		
		}
		if(155 < 30) {
		this.bus.emit('display?setColorvar322rg', 0xE3, 158, 0x35, 209);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0x34, 0x35, 209, 158);
		
		}
		if(20 < 41) {
		this.bus.emit('display?drawIntegervyvar326scale', 40, 0x37, 6, this.BreakoutGame_score_var, 0x92);
		
		} else {
		this.bus.emit('display?drawIntegervyvar326scale_bis', 6, 0x37, this.BreakoutGame_score_var, 0xB3, 40);
		
		}
		if(131 < 115) {
		this.bus.emit('display?drawIntegerxdigits', 0xB9, 5, 23);
		
		} else {
		this.bus.emit('display?drawIntegerxdigits_bis', 0x15, 23, 5);
		
		}
		if(136 < 153) {
		this.bus.emit('display?drawThingML_', 0x63);
		
		} else {
		this.bus.emit('display?drawThingML__bis', 0x50);
		
		}
		if(179 < 126) {
		this.bus.emit('display?drawThingMLvar327xy', 0x48, 26, 87, 0xE2);
		
		} else {
		this.bus.emit('display?drawThingMLvar327xy_bis', 87, 26, 0x48, 0x47);
		
		}
		if(48 < 80) {
		this.bus.emit('display?updatevar330', 0x17, 0xA4);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0xA4, 0x1B);
		
		}
		if(35 < 13) {
		this.bus.emit('display?update_', 0x1C);
		
		} else {
		this.bus.emit('display?update__bis', 0x68);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar339) => {
		return nextLevelvar339._port === 'game' && nextLevelvar339._msg === 'nextLevelvar339' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar339) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x4D, 0x6A, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar339) => {
		return nextLevelvar339._port === 'game' && nextLevelvar339._msg === 'nextLevelvar339' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar339) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar338_bis) => {
		return lostBallvar338_bis._port === 'game' && lostBallvar338_bis._msg === 'lostBallvar338_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar338_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xC6, 0x60, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar338_bis) => {
		return lostBallvar338_bis._port === 'game' && lostBallvar338_bis._msg === 'lostBallvar338_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar338_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1A, 0x6A, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xCB, 0x60, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar338) => {
		return lostBallvar338._port === 'game' && lostBallvar338._msg === 'lostBallvar338' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar338) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xCE, 0x60, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar338) => {
		return lostBallvar338._port === 'game' && lostBallvar338._msg === 'lostBallvar338' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar338) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xFC, 0x60, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x0F, 0x6A, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar339_bis) => {
		return nextLevelvar339_bis._port === 'game' && nextLevelvar339_bis._msg === 'nextLevelvar339_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar339_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x3F, 0x6A, 0), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar339_bis) => {
		return nextLevelvar339_bis._port === 'game' && nextLevelvar339_bis._msg === 'nextLevelvar339_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar339_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar339) => {
		return nextLevelvar339._port === 'pro_game' && nextLevelvar339._msg === 'nextLevelvar339' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar339) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x11, 0xDB, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar339) => {
		return nextLevelvar339._port === 'pro_game' && nextLevelvar339._msg === 'nextLevelvar339' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar339) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar338_bis) => {
		return lostBallvar338_bis._port === 'pro_game' && lostBallvar338_bis._msg === 'lostBallvar338_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar338_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xDE, 0x6A, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar338_bis) => {
		return lostBallvar338_bis._port === 'pro_game' && lostBallvar338_bis._msg === 'lostBallvar338_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar338_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x03, 0xDB, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xA8, 0x6A, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar338) => {
		return lostBallvar338._port === 'pro_game' && lostBallvar338._msg === 'lostBallvar338' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar338) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x8F, 0x6A, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar338) => {
		return lostBallvar338._port === 'pro_game' && lostBallvar338._msg === 'lostBallvar338' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar338) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xC0, 0x6A, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0xF9, 0xDB, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar339_bis) => {
		return nextLevelvar339_bis._port === 'pro_game' && nextLevelvar339_bis._msg === 'nextLevelvar339_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar339_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x50, 0xDB, 0), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar339_bis) => {
		return nextLevelvar339_bis._port === 'pro_game' && nextLevelvar339_bis._msg === 'nextLevelvar339_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar339_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var = true;
	});
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar331) => {
		return displayReadyvar331._port === 'display' && displayReadyvar331._msg === 'displayReadyvar331' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar331) => {
		if(106 < 245) {
		this.bus.emit('display?clear_', 0xDC);
		
		} else {
		this.bus.emit('display?clear__bis', 0xDA);
		
		}
		if(229 < 120) {
		this.bus.emit('display?clearvar321', 0x25, 0x13);
		
		} else {
		this.bus.emit('display?clearvar321_bis', 0x25, 0x05);
		
		}
		this.initColors();
		if(155 < 179) {
		this.bus.emit('display?setColorvar322rg', 0x8C, this.BreakoutGame_bgcolor_var[0]
		, 0x2F, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0x78, 0x2F, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(90 < 105) {
		this.bus.emit('display?setColorb', 0x26, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
		, 0xC6);
		
		}
		if(14 < 76) {
		this.bus.emit('display?fillRectvar325height', 0x8B, this.BreakoutGame_YDISPSIZE_var, 0x60);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', this.BreakoutGame_YDISPSIZE_var, 0x37, 0x8B);
		
		}
		if(20 < 198) {
		this.bus.emit('display?fillRectwidthyx', 0x88, this.BreakoutGame_XDISPSIZE_var, 0, 0);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', this.BreakoutGame_XDISPSIZE_var, 0, 0, 0x75);
		
		}
		if(206 < 56) {
		this.bus.emit('display?setColorvar322rg', 0x6F, this.BreakoutGame_fgcolor_var[0]
		, 0xD4, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0xE8, 0xD4, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(144 < 255) {
		this.bus.emit('display?setColorb', 0xDE, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0xBF);
		
		}
		if(110 < 244) {
		this.bus.emit('display?fillRectvar325height', 0xC6, 14, 0x85);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', 14, 0xF1, 0xC6);
		
		}
		if(144 < 102) {
		this.bus.emit('display?fillRectwidthyx', 0x5B, this.BreakoutGame_XDISPSIZE_var, 0, 0);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', this.BreakoutGame_XDISPSIZE_var, 0, 0, 0xFD);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var);
	}).effect((displayReady__bis) => {
		if(139 < 231) {
		this.bus.emit('display?clear_', 0x76);
		
		} else {
		this.bus.emit('display?clear__bis', 0x95);
		
		}
		if(44 < 97) {
		this.bus.emit('display?clearvar321', 0x25, 0x18);
		
		} else {
		this.bus.emit('display?clearvar321_bis', 0x25, 0x76);
		
		}
		this.initColors();
		if(54 < 212) {
		this.bus.emit('display?setColorvar322rg', 0x08, this.BreakoutGame_bgcolor_var[0]
		, 0x2F, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0x9F, 0x2F, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(137 < 191) {
		this.bus.emit('display?setColorb', 0xE3, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
		, 0xB6);
		
		}
		if(87 < 6) {
		this.bus.emit('display?fillRectwidthyx', 0x0B, this.BreakoutGame_XDISPSIZE_var, 0, 0);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', this.BreakoutGame_XDISPSIZE_var, 0, 0, 0x7F);
		
		}
		if(112 < 120) {
		this.bus.emit('display?fillRectvar325height', 0x8B, this.BreakoutGame_YDISPSIZE_var, 0x8E);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', this.BreakoutGame_YDISPSIZE_var, 0xE5, 0x8B);
		
		}
		if(95 < 182) {
		this.bus.emit('display?setColorb', 0x63, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x9D);
		
		}
		if(211 < 40) {
		this.bus.emit('display?setColorvar322rg', 0x35, this.BreakoutGame_fgcolor_var[0]
		, 0xD4, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0x0F, 0xD4, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(52 < 44) {
		this.bus.emit('display?fillRectvar325height', 0xC6, 14, 0x07);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', 14, 0x44, 0xC6);
		
		}
		if(158 < 155) {
		this.bus.emit('display?fillRectwidthyx', 0xB1, this.BreakoutGame_XDISPSIZE_var, 0, 0);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', this.BreakoutGame_XDISPSIZE_var, 0, 0, 0xE6);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar331_bis) => {
		return displayReadyvar331_bis._port === 'display' && displayReadyvar331_bis._msg === 'displayReadyvar331_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar331_bis) => {
		if(106 < 245) {
		this.bus.emit('display?clear_', 0x59);
		
		} else {
		this.bus.emit('display?clear__bis', 0xA0);
		
		}
		if(229 < 120) {
		this.bus.emit('display?clearvar321', 0x25, 0x40);
		
		} else {
		this.bus.emit('display?clearvar321_bis', 0x25, 0xC9);
		
		}
		this.initColors();
		if(155 < 179) {
		this.bus.emit('display?setColorvar322rg', 0x33, this.BreakoutGame_bgcolor_var[0]
		, 0x2F, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0x50, 0x2F, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(90 < 105) {
		this.bus.emit('display?setColorb', 0xCE, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
		, 0x5E);
		
		}
		if(14 < 76) {
		this.bus.emit('display?fillRectvar325height', 0x8B, this.BreakoutGame_YDISPSIZE_var, 0xA5);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', this.BreakoutGame_YDISPSIZE_var, 0xFC, 0x8B);
		
		}
		if(20 < 198) {
		this.bus.emit('display?fillRectwidthyx', 0xDB, this.BreakoutGame_XDISPSIZE_var, 0, 0);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', this.BreakoutGame_XDISPSIZE_var, 0, 0, 0xF0);
		
		}
		if(206 < 56) {
		this.bus.emit('display?setColorvar322rg', 0x4B, this.BreakoutGame_fgcolor_var[0]
		, 0xD4, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0xFD, 0xD4, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(144 < 255) {
		this.bus.emit('display?setColorb', 0x38, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x74);
		
		}
		if(110 < 244) {
		this.bus.emit('display?fillRectvar325height', 0xC6, 14, 0xF1);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', 14, 0x2D, 0xC6);
		
		}
		if(144 < 102) {
		this.bus.emit('display?fillRectwidthyx', 0x67, this.BreakoutGame_XDISPSIZE_var, 0, 0);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', this.BreakoutGame_XDISPSIZE_var, 0, 0, 0xE5);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var);
	}).effect((displayReady_) => {
		if(139 < 231) {
		this.bus.emit('display?clear_', 0xE4);
		
		} else {
		this.bus.emit('display?clear__bis', 0xB1);
		
		}
		if(44 < 97) {
		this.bus.emit('display?clearvar321', 0x25, 0xE9);
		
		} else {
		this.bus.emit('display?clearvar321_bis', 0x25, 0x0C);
		
		}
		this.initColors();
		if(54 < 212) {
		this.bus.emit('display?setColorvar322rg', 0x3B, this.BreakoutGame_bgcolor_var[0]
		, 0x2F, this.BreakoutGame_bgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0xBA, 0x2F, this.BreakoutGame_bgcolor_var[1]
		, this.BreakoutGame_bgcolor_var[0]
		);
		
		}
		if(137 < 191) {
		this.bus.emit('display?setColorb', 0x8D, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
		, 0xD5);
		
		}
		if(87 < 6) {
		this.bus.emit('display?fillRectwidthyx', 0x0E, this.BreakoutGame_XDISPSIZE_var, 0, 0);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', this.BreakoutGame_XDISPSIZE_var, 0, 0, 0x89);
		
		}
		if(112 < 120) {
		this.bus.emit('display?fillRectvar325height', 0x8B, this.BreakoutGame_YDISPSIZE_var, 0x8F);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', this.BreakoutGame_YDISPSIZE_var, 0xE0, 0x8B);
		
		}
		if(95 < 182) {
		this.bus.emit('display?setColorb', 0xCC, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
		, 0x27);
		
		}
		if(211 < 40) {
		this.bus.emit('display?setColorvar322rg', 0x1F, this.BreakoutGame_fgcolor_var[0]
		, 0xD4, this.BreakoutGame_fgcolor_var[1]
		);
		
		} else {
		this.bus.emit('display?setColorvar322rg_bis', 0xAE, 0xD4, this.BreakoutGame_fgcolor_var[1]
		, this.BreakoutGame_fgcolor_var[0]
		);
		
		}
		if(52 < 44) {
		this.bus.emit('display?fillRectvar325height', 0xC6, 14, 0xE3);
		
		} else {
		this.bus.emit('display?fillRectvar325height_bis', 14, 0xE5, 0xC6);
		
		}
		if(158 < 155) {
		this.bus.emit('display?fillRectwidthyx', 0x26, this.BreakoutGame_XDISPSIZE_var, 0, 0);
		
		} else {
		this.bus.emit('display?fillRectwidthyx_bis', this.BreakoutGame_XDISPSIZE_var, 0, 0, 0x5C);
		
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
	this._statemachine.to(null).when((positionxy) => {
		return positionxy._port === 'controller' && positionxy._msg === 'positionxy';
	}).effect((positionxy) => {
		this.BreakoutGame_SC_received_controller_positionxy_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionxy.x;
		this.BreakoutGame_SC_controller_position_y_var = positionxy.y;
		if(this.BreakoutGame_SC_received_controller_positionvar334_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		this.BreakoutGame_SC_received_controller_positionvar334_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionxy_bis) => {
		return positionxy_bis._port === 'controller' && positionxy_bis._msg === 'positionxy_bis';
	}).effect((positionxy_bis) => {
		this.BreakoutGame_SC_received_controller_positionxy_var = true;
		this.BreakoutGame_SC_controller_position_x_var = positionxy_bis.x;
		this.BreakoutGame_SC_controller_position_y_var = positionxy_bis.y;
		if(this.BreakoutGame_SC_received_controller_positionvar334_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		this.BreakoutGame_SC_received_controller_positionvar334_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar334_bis) => {
		return positionvar334_bis._port === 'controller' && positionvar334_bis._msg === 'positionvar334_bis';
	}).effect((positionvar334_bis) => {
		this.BreakoutGame_SC_received_controller_positionvar334_var = true;
		this.BreakoutGame_SC_controller_position_var334_var = positionvar334_bis.var334;
		if(this.BreakoutGame_SC_received_controller_positionxy_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar334_var = false;
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		
		}
	});
	this._statemachine.to(null).when((positionvar334) => {
		return positionvar334._port === 'controller' && positionvar334._msg === 'positionvar334';
	}).effect((positionvar334) => {
		this.BreakoutGame_SC_received_controller_positionvar334_var = true;
		this.BreakoutGame_SC_controller_position_var334_var = positionvar334.var334;
		if(this.BreakoutGame_SC_received_controller_positionxy_var) {
		let center_var = (this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var - this.BreakoutGame_padlen_var);
		center_var = this.BreakoutGame_SC_controller_position_x_var * center_var;
		center_var = Math.trunc(center_var / 200);
		this.BreakoutGame_padx_var = (this.BreakoutGame_LEFT_var + center_var + Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 2));
		this.bus.emit('padx=', this.BreakoutGame_padx_var);
		this.BreakoutGame_SC_received_controller_positionvar334_var = false;
		this.BreakoutGame_SC_received_controller_positionxy_var = false;
		
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
		if(215 < 187) {
		this.bus.emit('sound?tonetimevar340freq', 0x7D, 0xE5, this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar340freq_bis', this.BreakoutGame_tone2_var, 0xE5, this.BreakoutGame_tone_duration_var, 0xAE);
		
		}
		if(94 < 168) {
		this.bus.emit('sound?tone_', 0xA7);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x20);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(101 < 183) {
		this.bus.emit('sound?tone_', 0xCC);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xA1);
		
		}
		if(15 < 189) {
		this.bus.emit('sound?tonetimevar340freq', 0xEF, 0x9C, this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar340freq_bis', this.BreakoutGame_tone2_var, 0x9C, this.BreakoutGame_tone_duration_var, 0x2A);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(119 < 167) {
		this.bus.emit('sound?tonetimevar340freq', 0x04, 0xCD, this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar340freq_bis', this.BreakoutGame_tone2_var, 0xCD, this.BreakoutGame_tone_duration_var, 0x1F);
		
		}
		if(121 < 44) {
		this.bus.emit('sound?tone_', 0x1B);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x18);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(91 < 120) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0x86), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0x05), 0);
		
		}
		if(167 < 233) {
		setTimeout(() => this.bus.emit('game?lostBallvar338', 0xDE, 0xA8), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar338_bis', 0xA8, 0x61), 0);
		
		}
		if(43 < 16) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar338', 0xA3, 0x8C), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar338_bis', 0x8C, 0x64), 0);
		
		}
		if(255 < 143) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0xC3), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0x38), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(106 < 163) {
		this.bus.emit('sound?tone_', 0xD8);
		
		} else {
		this.bus.emit('sound?tone__bis', 0xA7);
		
		}
		if(151 < 50) {
		this.bus.emit('sound?tonetimevar340freq', 0x17, 0x35, this.BreakoutGame_tone2_var, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar340freq_bis', this.BreakoutGame_tone2_var, 0x35, this.BreakoutGame_tone_duration_var, 0x1F);
		
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
		if(130 < 27) {
		this.bus.emit('sound?tonetimevar340freq', 0xCD, 0x30, this.BreakoutGame_tone1_var, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar340freq_bis', this.BreakoutGame_tone1_var, 0x30, this.BreakoutGame_tone_duration_var, 0xA0);
		
		}
		if(89 < 39) {
		this.bus.emit('sound?tone_', 0x66);
		
		} else {
		this.bus.emit('sound?tone__bis', 0x5B);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(174 < 146) {
		setTimeout(() => this.bus.emit('game?nextLevelvar339', 0x2B, 0x17), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar339_bis', 0x58, 0x2B), 0);
		
		}
		if(201 < 46) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xDD), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0x38), 0);
		
		}
		if(176 < 152) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar339', 0x11, 0x60), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar339_bis', 0xCD, 0x11), 0);
		
		}
		if(11 < 248) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xB7), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0x78), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(158 < 108) {
		const bx_const = this.BreakoutGame_bx_var;
		const padx_const = this.BreakoutGame_padx_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIApadyballxpadx', 0xEC, bx_const, padx_const, pady_const), 0);
		
		} else {
		const pady_const = this.BreakoutGame_pady_var;
		const padx_const = this.BreakoutGame_padx_var;
		const bx_const = this.BreakoutGame_bx_var;
		setTimeout(() => this.bus.emit('ia?updateIApadyballxpadx_bis', pady_const, 0x10, padx_const, bx_const), 0);
		
		}
		if(251 < 86) {
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAvar335bally', 0xB1, 0x6B, by_const), 0);
		
		} else {
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAvar335bally_bis', 0xEB, 0xB1, by_const), 0);
		
		}
		if(111 < 103) {
		this.bus.emit('display?update_', 0xD3);
		
		} else {
		this.bus.emit('display?update__bis', 0xA0);
		
		}
		if(3 < 164) {
		this.bus.emit('display?updatevar330', 0x2E, 0x3A);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0x3A, 0x88);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0x83, 0, period_const, 0x7B), 0);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(197 < 166) {
		this.bus.emit('display?updatevar330', 0x0C, 0x7B);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0x7B, 0xD4);
		
		}
		if(123 < 73) {
		this.bus.emit('display?update_', 0x4F);
		
		} else {
		this.bus.emit('display?update__bis', 0x8E);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0xD5, 0, 33, 0x21), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(5 < 70) {
		this.bus.emit('display?updatevar330', 0x9E, 0xA7);
		
		} else {
		this.bus.emit('display?updatevar330_bis', 0xA7, 0x53);
		
		}
		if(241 < 100) {
		this.bus.emit('display?update_', 0x18);
		
		} else {
		this.bus.emit('display?update__bis', 0xAF);
		
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
	if(101 < 255) {
	this.bus.emit('display?setBGColorrvar323gb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x82, 0xDD);
	
	} else {
	this.bus.emit('display?setBGColorrvar323gb_bis', this.BreakoutGame_bgcolor_var[0]
	, 0x6C, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	, 0xDD);
	
	}
	if(169 < 162) {
	this.bus.emit('display?setBGColor_', 0x28);
	
	} else {
	this.bus.emit('display?setBGColor__bis', 0x83);
	
	}
	if(84 < 207) {
	this.bus.emit('display?setColorb', 0xCF, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x23);
	
	}
	if(2 < 93) {
	this.bus.emit('display?setColorvar322rg', 0x79, this.BreakoutGame_fgcolor_var[0]
	, 0x08, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x3A, 0x08, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
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
	if(213 < 176) {
	this.bus.emit('display?setColorb', 0x37, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0xE5);
	
	}
	if(172 < 43) {
	this.bus.emit('display?setColorvar322rg', 0x4C, this.BreakoutGame_bgcolor_var[0]
	, 0x69, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0xCF, 0x69, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(113 < 54) {
	this.bus.emit('display?fillRectvar325height', 0x95, bs_var, 0x93);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', bs_var, 0xF4, 0x95);
	
	}
	if(144 < 72) {
	this.bus.emit('display?fillRectwidthyx', 0x34, bs_var, this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', bs_var, this.BreakoutGame_prevBY_var, this.BreakoutGame_prevBX_var, 0x37);
	
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
	if(166 < 182) {
	this.bus.emit('display?setColorb', 0x92, 111);
	
	} else {
	this.bus.emit('display?setColorb_bis', 111, 0x8D);
	
	}
	if(231 < 62) {
	this.bus.emit('display?setColorvar322rg', 0x02, 183, 0xDA, 199);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0xE1, 0xDA, 199, 183);
	
	}
	if(28 < 136) {
	this.bus.emit('display?fillRectvar325height', 0x3F, bs_var, 0xCD);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', bs_var, 0xB6, 0x3F);
	
	}
	if(26 < 132) {
	this.bus.emit('display?fillRectwidthyx', 0x80, bs_var, this.BreakoutGame_prevBX_var, this.BreakoutGame_prevBY_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', bs_var, this.BreakoutGame_prevBY_var, this.BreakoutGame_prevBX_var, 0xD4);
	
	}
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(17 < 88) {
	this.bus.emit('display?setColorb', 0x44, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x47);
	
	}
	if(206 < 140) {
	this.bus.emit('display?setColorvar322rg', 0xFF, this.BreakoutGame_bgcolor_var[0]
	, 0x13, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x99, 0x13, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(159 < 86) {
	this.bus.emit('display?fillRectwidthyx', 0x09, ps_var, this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', ps_var, this.BreakoutGame_prevPY_var, this.BreakoutGame_prevPX_var, 0x3D);
	
	}
	if(3 < 30) {
	this.bus.emit('display?fillRectvar325height', 0xD9, 4, 0xBE);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', 4, 0xBD, 0xD9);
	
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
	if(67 < 84) {
	this.bus.emit('display?setColorb', 0x77, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x65);
	
	}
	if(185 < 253) {
	this.bus.emit('display?setColorvar322rg', 0x24, this.BreakoutGame_fgcolor_var[0]
	, 0x98, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0xAB, 0x98, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(245 < 180) {
	this.bus.emit('display?fillRectwidthyx', 0xEA, ps_var, this.BreakoutGame_prevPX_var, this.BreakoutGame_prevPY_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', ps_var, this.BreakoutGame_prevPY_var, this.BreakoutGame_prevPX_var, 0x7E);
	
	}
	if(38 < 165) {
	this.bus.emit('display?fillRectvar325height', 0x1D, 4, 0x79);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', 4, 0x34, 0x1D);
	
	}
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(187 < 90) {
	this.bus.emit('display?setColorb', 0x1B, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x40);
	
	}
	if(0 < 92) {
	this.bus.emit('display?setColorvar322rg', 0xCB, this.BreakoutGame_fgcolor_var[0]
	, 0xE6, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x99, 0xE6, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(88 < 14) {
	this.bus.emit('display?setColorvar322rg', 0xD9, this.BreakoutGame_fgcolor_var[0]
	, 0xB7, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0xD5, 0xB7, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(214 < 177) {
	this.bus.emit('display?setColorb', 0x36, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x53);
	
	}
	if(54 < 57) {
	this.bus.emit('display?setBGColor_', 0x20);
	
	} else {
	this.bus.emit('display?setBGColor__bis', 0xAF);
	
	}
	if(130 < 140) {
	this.bus.emit('display?setBGColorrvar323gb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x72, 0x9D);
	
	} else {
	this.bus.emit('display?setBGColorrvar323gb_bis', this.BreakoutGame_bgcolor_var[0]
	, 0xC1, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x9D);
	
	}
	if(175 < 254) {
	this.bus.emit('display?drawIntegervyvar326scale', 90, 0xA6, 4, BreakoutGame_drawCountDown_c_var, 0x53);
	
	} else {
	this.bus.emit('display?drawIntegervyvar326scale_bis', 4, 0xA6, BreakoutGame_drawCountDown_c_var, 0x7F, 90);
	
	}
	if(209 < 239) {
	this.bus.emit('display?drawIntegerxdigits', 0x33, 1, 80 - 6);
	
	} else {
	this.bus.emit('display?drawIntegerxdigits_bis', 0x3E, 80 - 6, 1);
	
	}
	
	} else {
	if(194 < 211) {
	this.bus.emit('display?setColorb', 0xFE, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x83);
	
	}
	if(183 < 219) {
	this.bus.emit('display?setColorvar322rg', 0xFF, this.BreakoutGame_bgcolor_var[0]
	, 0x75, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x4A, 0x75, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(9 < 94) {
	this.bus.emit('display?fillRectvar325height', 0xB3, 20, 0x32);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', 20, 0x34, 0xB3);
	
	}
	if(111 < 69) {
	this.bus.emit('display?fillRectwidthyx', 0x4B, 12, 80 - 6, 90);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', 12, 90, 80 - 6, 0x7A);
	
	}
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	if(3 < 96) {
	this.bus.emit('display?setColorvar322rg', 0xC1, this.BreakoutGame_fgcolor_var[0]
	, 0x64, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0xE5, 0x64, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(50 < 232) {
	this.bus.emit('display?setColorb', 0x0D, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0x82);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(71 < 190) {
	this.bus.emit('display?fillRectvar325height', 0x58, 1, 0xE7);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', 1, 0x38, 0x58);
	
	}
	if(162 < 169) {
	this.bus.emit('display?fillRectwidthyx', 0x23, xcenter_var + 1, left_var - 1, top_var - 1);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', xcenter_var + 1, top_var - 1, left_var - 1, 0x12);
	
	}
	if(170 < 254) {
	this.bus.emit('display?fillRectvar325height', 0xDD, 1, 0x76);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', 1, 0xAE, 0xDD);
	
	}
	if(142 < 11) {
	this.bus.emit('display?fillRectwidthyx', 0x9E, xcenter_var + 1, left_var - 1, bottom_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', xcenter_var + 1, bottom_var, left_var - 1, 0xE5);
	
	}
	if(253 < 132) {
	this.bus.emit('display?fillRectwidthyx', 0xD8, 1, left_var - 1, top_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', 1, top_var, left_var - 1, 0xB2);
	
	}
	if(155 < 55) {
	this.bus.emit('display?fillRectvar325height', 0x8B, ycenter_var, 0xC4);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', ycenter_var, 0x6C, 0x8B);
	
	}
	if(26 < 249) {
	this.bus.emit('display?fillRectvar325height', 0x6E, ycenter_var, 0x25);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', ycenter_var, 0xCC, 0x6E);
	
	}
	if(93 < 214) {
	this.bus.emit('display?fillRectwidthyx', 0xD8, 1, right_var, top_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', 1, top_var, right_var, 0xCC);
	
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
	if(1 < 19) {
	this.bus.emit('display?setColorvar322rg', 0x7A, 155, 0xF4, 103);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0xC1, 0xF4, 103, 155);
	
	}
	if(242 < 157) {
	this.bus.emit('display?setColorb', 0xB7, 89);
	
	} else {
	this.bus.emit('display?setColorb_bis', 89, 0x01);
	
	}
	if(60 < 197) {
	this.bus.emit('display?fillRectvar325height', 0x2E, h_var, 0xD2);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', h_var, 0x45, 0x2E);
	
	}
	if(165 < 28) {
	this.bus.emit('display?fillRectwidthyx', 0x64, w_var, bx_var, by_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', w_var, by_var, bx_var, 0x37);
	
	}
	if(31 < 143) {
	this.bus.emit('display?setColorvar322rg', 0x6D, 100, 0xB2, 56);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x83, 0xB2, 56, 100);
	
	}
	if(91 < 145) {
	this.bus.emit('display?setColorb', 0xD9, 43);
	
	} else {
	this.bus.emit('display?setColorb_bis', 43, 0x1D);
	
	}
	if(247 < 43) {
	this.bus.emit('display?drawRecty', by_var, 0xBF);
	
	} else {
	this.bus.emit('display?drawRecty_bis', 0xD2, by_var);
	
	}
	if(191 < 47) {
	this.bus.emit('display?drawRectvar324heightwidthx', bx_var, w_var, 0x7A, 0x7A, h_var);
	
	} else {
	this.bus.emit('display?drawRectvar324heightwidthx_bis', h_var, w_var, bx_var, 0x81, 0x7A);
	
	}
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(73 < 225) {
	this.bus.emit('display?setColorb', 0xDA, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x3F);
	
	}
	if(202 < 7) {
	this.bus.emit('display?setColorvar322rg', 0x2A, this.BreakoutGame_bgcolor_var[0]
	, 0x7B, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x12, 0x7B, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(22 < 186) {
	this.bus.emit('display?fillRectvar325height', 0x58, this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x2B);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', this.BreakoutGame_BRICK_HEIGHT_var - 2, 0xC1, 0x58);
	
	}
	if(86 < 132) {
	this.bus.emit('display?fillRectwidthyx', 0x8A, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), bx_var, by_var);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), by_var, bx_var, 0x5C);
	
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
	if(220 < 12) {
	this.bus.emit('display?setColorb', 0x8E, 130);
	
	} else {
	this.bus.emit('display?setColorb_bis', 130, 0x03);
	
	}
	if(199 < 24) {
	this.bus.emit('display?setColorvar322rg', 0xDC, 158, 0x0F, 209);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0xEB, 0x0F, 209, 158);
	
	}
	if(8 < 35) {
	this.bus.emit('display?setBGColor_', 0xFF);
	
	} else {
	this.bus.emit('display?setBGColor__bis', 0x8A);
	
	}
	if(75 < 162) {
	this.bus.emit('display?setBGColorrvar323gb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xFF, 0x25);
	
	} else {
	this.bus.emit('display?setBGColorrvar323gb_bis', this.BreakoutGame_fgcolor_var[0]
	, 0x83, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x25);
	
	}
	if(199 < 209) {
	this.bus.emit('display?setColorb', 0xD6, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_bgcolor_var[2]
	, 0x47);
	
	}
	if(121 < 23) {
	this.bus.emit('display?setColorvar322rg', 0x30, this.BreakoutGame_bgcolor_var[0]
	, 0xE4, this.BreakoutGame_bgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0xC1, 0xE4, this.BreakoutGame_bgcolor_var[1]
	, this.BreakoutGame_bgcolor_var[0]
	);
	
	}
	if(186 < 211) {
	this.bus.emit('display?drawIntegervyvar326scale', 2, 0x53, 2, this.BreakoutGame_level_var, 0x7A);
	
	} else {
	this.bus.emit('display?drawIntegervyvar326scale_bis', 2, 0x53, this.BreakoutGame_level_var, 0x9F, 2);
	
	}
	if(242 < 92) {
	this.bus.emit('display?drawIntegerxdigits', 0x9E, 2, 6);
	
	} else {
	this.bus.emit('display?drawIntegerxdigits_bis', 0xC6, 6, 2);
	
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
	if(4 < 66) {
	this.bus.emit('display?setColorvar322rg', 0x07, 158, 0x1C, 209);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x7B, 0x1C, 209, 158);
	
	}
	if(151 < 25) {
	this.bus.emit('display?setColorb', 0xB8, 130);
	
	} else {
	this.bus.emit('display?setColorb_bis', 130, 0x67);
	
	}
	if(155 < 202) {
	this.bus.emit('display?setBGColorrvar323gb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xAC, 0xAE);
	
	} else {
	this.bus.emit('display?setBGColorrvar323gb_bis', this.BreakoutGame_fgcolor_var[0]
	, 0xDE, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[2]
	, 0xAE);
	
	}
	if(16 < 166) {
	this.bus.emit('display?setBGColor_', 0x8B);
	
	} else {
	this.bus.emit('display?setBGColor__bis', 0x43);
	
	}
	if(41 < 222) {
	this.bus.emit('display?drawIntegerxdigits', 0x7E, 5, 58);
	
	} else {
	this.bus.emit('display?drawIntegerxdigits_bis', 0x2B, 58, 5);
	
	}
	if(251 < 100) {
	this.bus.emit('display?drawIntegervyvar326scale', 2, 0x39, 2, this.BreakoutGame_score_var, 0xDF);
	
	} else {
	this.bus.emit('display?drawIntegervyvar326scale_bis', 2, 0x39, this.BreakoutGame_score_var, 0xE5, 2);
	
	}
}

BreakoutGameBrowser.prototype.drawLives = function() {
	if(0 < 73) {
	this.bus.emit('display?setColorb', 0xBC, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorb_bis', this.BreakoutGame_fgcolor_var[2]
	, 0xAB);
	
	}
	if(103 < 231) {
	this.bus.emit('display?setColorvar322rg', 0x0B, this.BreakoutGame_fgcolor_var[0]
	, 0xB3, this.BreakoutGame_fgcolor_var[1]
	);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x5F, 0xB3, this.BreakoutGame_fgcolor_var[1]
	, this.BreakoutGame_fgcolor_var[0]
	);
	
	}
	if(251 < 111) {
	this.bus.emit('display?fillRectvar325height', 0xC4, 6, 0x93);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', 6, 0xEC, 0xC4);
	
	}
	if(12 < 108) {
	this.bus.emit('display?fillRectwidthyx', 0xC4, 24 + 6, 124, 4);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', 24 + 6, 4, 124, 0xA9);
	
	}
	if(94 < 206) {
	this.bus.emit('display?setColorb', 0x59, 111);
	
	} else {
	this.bus.emit('display?setColorb_bis', 111, 0xCA);
	
	}
	if(110 < 167) {
	this.bus.emit('display?setColorvar322rg', 0xDF, 183, 0xD6, 199);
	
	} else {
	this.bus.emit('display?setColorvar322rg_bis', 0x36, 0xD6, 199, 183);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(131 < 0) {
	this.bus.emit('display?fillRectvar325height', 0x8B, 6, 0x4D);
	
	} else {
	this.bus.emit('display?fillRectvar325height_bis', 6, 0x40, 0x8B);
	
	}
	if(159 < 237) {
	this.bus.emit('display?fillRectwidthyx', 0xB2, 6, 124 + (2 - i_var) * 12, 4);
	
	} else {
	this.bus.emit('display?fillRectwidthyx_bis', 6, 4, 124 + (2 - i_var) * 12, 0xEE);
	
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(id, var320, var343) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, var320:var320, var343:var343});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(var354) {
	this._receive({_port:"display", _msg:"displayReady_", var354:var354});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar331Ondisplay = function(var331, var355) {
	this._receive({_port:"display", _msg:"displayReadyvar331", var331:var331, var355:var355});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(var356) {
	this._receive({_port:"display", _msg:"displayError_", var356:var356});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar332Ondisplay = function(var357, var332) {
	this._receive({_port:"display", _msg:"displayErrorvar332", var357:var357, var332:var332});
}

BreakoutGameBrowser.prototype.receivedisplayReady__bisOndisplay = function(var378) {
	this._receive({_port:"display", _msg:"displayReady__bis", var378:var378});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar331_bisOndisplay = function(var331, var379) {
	this._receive({_port:"display", _msg:"displayReadyvar331_bis", var331:var331, var379:var379});
}

BreakoutGameBrowser.prototype.receivedisplayError__bisOndisplay = function(var380) {
	this._receive({_port:"display", _msg:"displayError__bis", var380:var380});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar332_bisOndisplay = function(var332, var381) {
	this._receive({_port:"display", _msg:"displayErrorvar332_bis", var332:var332, var381:var381});
}

BreakoutGameBrowser.prototype.receivepositionvar334Oncontroller = function(var392, var334) {
	this._receive({_port:"controller", _msg:"positionvar334", var392:var392, var334:var334});
}

BreakoutGameBrowser.prototype.receivepositionxyOncontroller = function(y, var393, x) {
	this._receive({_port:"controller", _msg:"positionxy", y:y, var393:var393, x:x});
}

BreakoutGameBrowser.prototype.receivepositionvar334_bisOncontroller = function(var396, var334) {
	this._receive({_port:"controller", _msg:"positionvar334_bis", var396:var396, var334:var334});
}

BreakoutGameBrowser.prototype.receivepositionxy_bisOncontroller = function(x, var397, y) {
	this._receive({_port:"controller", _msg:"positionxy_bis", x:x, var397:var397, y:y});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(var414) {
	this._receive({_port:"game", _msg:"lostBall_", var414:var414});
}

BreakoutGameBrowser.prototype.receivelostBallvar338Ongame = function(var415, var338) {
	this._receive({_port:"game", _msg:"lostBallvar338", var415:var415, var338:var338});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(var412) {
	this._receive({_port:"game", _msg:"nextLevel_", var412:var412});
}

BreakoutGameBrowser.prototype.receivenextLevelvar339Ongame = function(var339, var413) {
	this._receive({_port:"game", _msg:"nextLevelvar339", var339:var339, var413:var413});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOngame = function(var418) {
	this._receive({_port:"game", _msg:"lostBall__bis", var418:var418});
}

BreakoutGameBrowser.prototype.receivelostBallvar338_bisOngame = function(var338, var419) {
	this._receive({_port:"game", _msg:"lostBallvar338_bis", var338:var338, var419:var419});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOngame = function(var416) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var416:var416});
}

BreakoutGameBrowser.prototype.receivenextLevelvar339_bisOngame = function(var417, var339) {
	this._receive({_port:"game", _msg:"nextLevelvar339_bis", var417:var417, var339:var339});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(var414) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var414:var414});
}

BreakoutGameBrowser.prototype.receivelostBallvar338Onpro_game = function(var415, var338) {
	this._receive({_port:"pro_game", _msg:"lostBallvar338", var415:var415, var338:var338});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(var412) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var412:var412});
}

BreakoutGameBrowser.prototype.receivenextLevelvar339Onpro_game = function(var339, var413) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar339", var339:var339, var413:var413});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOnpro_game = function(var418) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var418:var418});
}

BreakoutGameBrowser.prototype.receivelostBallvar338_bisOnpro_game = function(var338, var419) {
	this._receive({_port:"pro_game", _msg:"lostBallvar338_bis", var338:var338, var419:var419});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOnpro_game = function(var416) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var416:var416});
}

BreakoutGameBrowser.prototype.receivenextLevelvar339_bisOnpro_game = function(var417, var339) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar339_bis", var417:var417, var339:var339});
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionxy_var = function(BreakoutGame_SC_received_controller_positionxy_var) {
	this.BreakoutGame_SC_received_controller_positionxy_var = BreakoutGame_SC_received_controller_positionxy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var339_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var339_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var339_var = BreakoutGame_SC_PLAY_game_nextLevel_var339_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar339_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var338_var = function(BreakoutGame_SC_PLAY_game_lostBall_var338_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var338_var = BreakoutGame_SC_PLAY_game_lostBall_var338_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_var334_var = function(BreakoutGame_SC_controller_position_var334_var) {
	this.BreakoutGame_SC_controller_position_var334_var = BreakoutGame_SC_controller_position_var334_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var338_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var338_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var338_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var338_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var339_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var339_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var339_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var339_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionvar334_var = function(BreakoutGame_SC_received_controller_positionvar334_var) {
	this.BreakoutGame_SC_received_controller_positionvar334_var = BreakoutGame_SC_received_controller_positionvar334_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_var331_var = function(BreakoutGame_SC_INIT_display_displayReady_var331_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var331_var = BreakoutGame_SC_INIT_display_displayReady_var331_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar331_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar331_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var = BreakoutGame_SC_INIT_received_display_displayReadyvar331_var;
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

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar338_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar338_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var = BreakoutGame_SC_PLAY_received_game_lostBallvar338_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
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
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\treceived_controller_positionxy = ' + this.BreakoutGame_SC_received_controller_positionxy_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tgame_nextLevel_var339 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var339_var;
	result += '\n\treceived_game_nextLevelvar339 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar339_var;
	result += '\n\tgame_lostBall_var338 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var338_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\tcontroller_position_var334 = ' + this.BreakoutGame_SC_controller_position_var334_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tpro_game_lostBall_var338 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var338_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tpro_game_nextLevel_var339 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var339_var;
	result += '\n\treceived_controller_positionvar334 = ' + this.BreakoutGame_SC_received_controller_positionvar334_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\treceived_pro_game_lostBallvar338 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tdisplay_displayReady_var331 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var331_var;
	result += '\n\treceived_display_displayReadyvar331 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar331_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\treceived_game_lostBallvar338 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar338_var;
	result += '\n\treceived_pro_game_nextLevelvar339 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '';
	return result;
}

