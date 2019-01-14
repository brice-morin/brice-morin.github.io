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
		if(234 < 221) {
		this.bus.emit('display?createvar222', 0xE6, 0x18);
		
		} else {
		this.bus.emit('display?createvar222_bis', 0xD9, 0x18);
		
		}
		if(90 < 45) {
		this.bus.emit('display?createxsizeysize', this.BreakoutGame_XDISPSIZE_var, 0x76, this.BreakoutGame_YDISPSIZE_var);
		
		} else {
		this.bus.emit('display?createxsizeysize_bis', 0xC5, this.BreakoutGame_XDISPSIZE_var, this.BreakoutGame_YDISPSIZE_var);
		
		}
	});
	let BreakoutGame_SC_LAUNCH = new StateJS.State('LAUNCH', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xDD, 0x2B, 33), 0);
		this.BreakoutGame_SC_LAUNCH_countdown_var = 30 * 3;
		this.drawScore();
		this.drawLives();
		if(229 < 116) {
		this.bus.emit('display?updatevar224', 0x75, 0x4B);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0x4B, 0x6C);
		
		}
		if(47 < 33) {
		this.bus.emit('display?update_', 0x21);
		
		} else {
		this.bus.emit('display?update__bis', 0x77);
		
		}
	});
	let BreakoutGame_SC_PLAY = new StateJS.State('PLAY', this._statemachine).entry(() => {
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xDC, 0x06, period_const), 0);
	});
	let BreakoutGame_SC_LOSTBALL = new StateJS.State('LOSTBALL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xF3, 0x29, 500), 0);
		this.BreakoutGame_lives_var = this.BreakoutGame_lives_var - 1;
		this.bus.emit('lives=', this.BreakoutGame_lives_var);
		this.eraseBall();
		this.erasePad();
		this.drawLives();
		if(123 < 18) {
		this.bus.emit('display?update_', 0xD8);
		
		} else {
		this.bus.emit('display?update__bis', 0x0D);
		
		}
		if(188 < 111) {
		this.bus.emit('display?updatevar224', 0x11, 0xBE);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xBE, 0x25);
		
		}
		this.log(true);
	});
	let BreakoutGame_SC_NEXTLEVEL = new StateJS.State('NEXTLEVEL', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x0F, 0x6B, 1000), 0);
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
		if(201 < 21) {
		this.bus.emit('display?updatevar224', 0x30, 0xEC);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xEC, 0xDF);
		
		}
		if(201 < 77) {
		this.bus.emit('display?update_', 0x83);
		
		} else {
		this.bus.emit('display?update__bis', 0xD7);
		
		}
	});
	let BreakoutGame_SC_GAMEOVER = new StateJS.State('GAMEOVER', this._statemachine).entry(() => {
		this.eraseBall();
		this.erasePad();
		if(253 < 179) {
		this.bus.emit('display?updatevar224', 0x8F, 0x51);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0x51, 0xB6);
		
		}
		if(67 < 238) {
		this.bus.emit('display?update_', 0xAC);
		
		} else {
		this.bus.emit('display?update__bis', 0xDF);
		
		}
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0x74, 0xE1, 500), 0);
	});
	let BreakoutGame_SC_GAMEREALLYOVER = new StateJS.State('GAMEREALLYOVER', this._statemachine).entry(() => {
		if(132 < 234) {
		this.bus.emit('display?setColorbr', 0xEF, 255, 255);
		
		} else {
		this.bus.emit('display?setColorbr_bis', 255, 0x88, 255);
		
		}
		if(243 < 79) {
		this.bus.emit('display?setColorgvar216', 255, 0xBC, 0x3F);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', 255, 0x3F, 0x28);
		
		}
		if(213 < 28) {
		this.bus.emit('display?fillRectyheightvar219widthx', 30, 0xCD, 76, 0x2C, 142, 8);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x94, 0xCD, 142, 30, 8, 76);
		
		}
		if(253 < 216) {
		this.bus.emit('display?fillRect_', 0x34);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xCA);
		
		}
		if(0 < 8) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
		, 0x14, 0x3F);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
		, 0x3F, 0x5C);
		
		}
		if(8 < 156) {
		this.bus.emit('display?setColorbr', 0x8C, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
		, 0xD4, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(89 < 206) {
		this.bus.emit('display?fillRectyheightvar219widthx', 31, 0x84, 50, 0x06, 140, 9);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x70, 0x84, 140, 31, 9, 50);
		
		}
		if(123 < 112) {
		this.bus.emit('display?fillRect_', 0xA6);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x2B);
		
		}
		if(216 < 109) {
		this.bus.emit('display?setBGColorvar217g', this.BreakoutGame_fgcolor_var[1]
		, 0x39, 0xD3);
		
		} else {
		this.bus.emit('display?setBGColorvar217g_bis', 0x39, 0x48, this.BreakoutGame_fgcolor_var[1]
		);
		
		}
		if(163 < 140) {
		this.bus.emit('display?setBGColorrb', this.BreakoutGame_fgcolor_var[2]
		, this.BreakoutGame_fgcolor_var[0]
		, 0xA9);
		
		} else {
		this.bus.emit('display?setBGColorrb_bis', this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		, 0x8D);
		
		}
		if(193 < 64) {
		this.bus.emit('display?setColorgvar216', 209, 0xEF, 0xF1);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', 209, 0xF1, 0x41);
		
		}
		if(112 < 129) {
		this.bus.emit('display?setColorbr', 0x46, 158, 130);
		
		} else {
		this.bus.emit('display?setColorbr_bis', 158, 0x43, 130);
		
		}
		if(159 < 27) {
		this.bus.emit('display?drawIntegerscalevar220xv', 0x81, 0x5F, this.BreakoutGame_score_var, 6, 23);
		
		} else {
		this.bus.emit('display?drawIntegerscalevar220xv_bis', 6, this.BreakoutGame_score_var, 0x5F, 0xA9, 23);
		
		}
		if(23 < 115) {
		this.bus.emit('display?drawIntegerdigitsy', 5, 40, 0xC0);
		
		} else {
		this.bus.emit('display?drawIntegerdigitsy_bis', 0x33, 5, 40);
		
		}
		if(188 < 201) {
		this.bus.emit('display?drawThingMLxyvar221', 0xAF, 26, 0xD4, 87);
		
		} else {
		this.bus.emit('display?drawThingMLxyvar221_bis', 26, 0xAF, 87, 0xDB);
		
		}
		if(4 < 161) {
		this.bus.emit('display?drawThingML_', 0xCA);
		
		} else {
		this.bus.emit('display?drawThingML__bis', 0x63);
		
		}
		if(92 < 200) {
		this.bus.emit('display?update_', 0xD0);
		
		} else {
		this.bus.emit('display?update__bis', 0xA2);
		
		}
		if(161 < 147) {
		this.bus.emit('display?updatevar224', 0x42, 0xF7);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xF7, 0x42);
		
		}
		this.log(true);
		this.quit();
		setTimeout(()=>this._stop(),0);
	});
	_initial_BreakoutGame_SC.to(BreakoutGame_SC_INIT);
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x94, 0, 0x11), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'pro_game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1A, 0, 0x99), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'pro_game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar233) => {
		return nextLevelvar233._port === 'pro_game' && nextLevelvar233._msg === 'nextLevelvar233' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar233) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1A, 0, 0x09), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar233) => {
		return nextLevelvar233._port === 'pro_game' && nextLevelvar233._msg === 'nextLevelvar233' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar233) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1A, 0, 0x1B), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'pro_game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar233_bis) => {
		return nextLevelvar233_bis._port === 'pro_game' && nextLevelvar233_bis._msg === 'nextLevelvar233_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var);
	}).effect((nextLevelvar233_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x1A, 0, 0xFD), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar233_bis) => {
		return nextLevelvar233_bis._port === 'pro_game' && nextLevelvar233_bis._msg === 'nextLevelvar233_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var));
	}).effect((nextLevelvar233_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar232_bis) => {
		return lostBallvar232_bis._port === 'pro_game' && lostBallvar232_bis._msg === 'lostBallvar232_bis' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar232_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x94, 0, 0x27), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar232_bis) => {
		return lostBallvar232_bis._port === 'pro_game' && lostBallvar232_bis._msg === 'lostBallvar232_bis' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar232_bis) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x94, 0, 0xE4), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'pro_game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar232) => {
		return lostBallvar232._port === 'pro_game' && lostBallvar232._msg === 'lostBallvar232' && (this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var);
	}).effect((lostBallvar232) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x94, 0, 0xFA), 0);
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var = false;
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar232) => {
		return lostBallvar232._port === 'pro_game' && lostBallvar232._msg === 'lostBallvar232' && (!(this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var));
	}).effect((lostBallvar232) => {
		this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var = true;
	});
	BreakoutGame_SC_NEXTLEVEL.to(BreakoutGame_SC_LAUNCH).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0);
	});
	BreakoutGame_SC_LAUNCH.to(BreakoutGame_SC_PLAY).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var === 0);
	}).effect((timer_timeout) => {
		this.drawCountDown(0);
		this.resetBall();
		if(112 < 206) {
		this.bus.emit('display?updatevar224', 0x0F, 0x14);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0x14, 0x4B);
		
		}
		if(108 < 198) {
		this.bus.emit('display?update_', 0x00);
		
		} else {
		this.bus.emit('display?update__bis', 0xF3);
		
		}
	});
	BreakoutGame_SC_LAUNCH.to(null).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === 0 && this.BreakoutGame_SC_LAUNCH_countdown_var > 0);
	}).effect((timer_timeout) => {
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xDB, 0x3C, 33), 0);
		this.drawPad();
		if((this.BreakoutGame_SC_LAUNCH_countdown_var % 30) === 0) {
		this.drawCountDown(Math.trunc(this.BreakoutGame_SC_LAUNCH_countdown_var / 30));
		
		}
		this.BreakoutGame_SC_LAUNCH_countdown_var = this.BreakoutGame_SC_LAUNCH_countdown_var - 1;
		if(103 < 42) {
		this.bus.emit('display?updatevar224', 0xB1, 0xD8);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xD8, 0xDC);
		
		}
		if(123 < 47) {
		this.bus.emit('display?update_', 0x49);
		
		} else {
		this.bus.emit('display?update__bis', 0xE2);
		
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
		if(182 < 53) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0xC9);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', 0x3C, this.BreakoutGame_tone2_var);
		
		}
		if(215 < 215) {
		this.bus.emit('sound?tonetimevar234', 0x1F, 0xDD, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar234_bis', this.BreakoutGame_tone_duration_var, 0x1F, 0x07);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wl_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_bx_var > wr_var) {
		if(27 < 53) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x6E);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', 0x37, this.BreakoutGame_tone2_var);
		
		}
		if(82 < 209) {
		this.bus.emit('sound?tonetimevar234', 0xD1, 0xEB, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar234_bis', this.BreakoutGame_tone_duration_var, 0xD1, 0xD2);
		
		}
		this.BreakoutGame_dx_var =  -this.BreakoutGame_dx_var;
		this.bus.emit('dx=', this.BreakoutGame_dx_var);
		this.BreakoutGame_bx_var = 2 * wr_var - this.BreakoutGame_bx_var;
		this.bus.emit('bx=', this.BreakoutGame_bx_var);
		this.incrementScore( -1);
		
		}
		
		}
		if(this.BreakoutGame_by_var < wt_var) {
		if(121 < 189) {
		this.bus.emit('sound?tonetimevar234', 0x6D, 0xF3, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar234_bis', this.BreakoutGame_tone_duration_var, 0x6D, 0xB3);
		
		}
		if(42 < 149) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x10);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', 0xFC, this.BreakoutGame_tone2_var);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.BreakoutGame_by_var = 2 * wt_var - this.BreakoutGame_by_var;
		this.bus.emit('by=', this.BreakoutGame_by_var);
		this.incrementScore( -1);
		
		} else {
		if(this.BreakoutGame_by_var > wb_var) {
		if(129 < 44) {
		setTimeout(() => this.bus.emit('game?lostBall_', 0xD0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBall__bis', 0x88), 0);
		
		}
		if(98 < 192) {
		setTimeout(() => this.bus.emit('game?lostBallvar232', 0xB2, 0x96), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?lostBallvar232_bis', 0xB2, 0xE2), 0);
		
		}
		if(195 < 193) {
		setTimeout(() => this.bus.emit('req_game?lostBall_', 0x72), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBall__bis', 0xCA), 0);
		
		}
		if(103 < 219) {
		setTimeout(() => this.bus.emit('req_game?lostBallvar232', 0xED, 0xAF), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?lostBallvar232_bis', 0xED, 0xFB), 0);
		
		}
		
		}
		
		}
		if(this.BreakoutGame_dy_var > 0) {
		if(this.BreakoutGame_by_var > this.BreakoutGame_pady_var - this.BreakoutGame_br_var && this.BreakoutGame_by_var < this.BreakoutGame_pady_var + this.BreakoutGame_br_var) {
		if(this.BreakoutGame_bx_var > this.BreakoutGame_padx_var - Math.trunc(this.BreakoutGame_padlen_var / 2) && this.BreakoutGame_bx_var < this.BreakoutGame_padx_var + Math.trunc(this.BreakoutGame_padlen_var / 2)) {
		if(254 < 72) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone2_var, 0x60);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', 0x88, this.BreakoutGame_tone2_var);
		
		}
		if(91 < 178) {
		this.bus.emit('sound?tonetimevar234', 0xC0, 0xCA, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar234_bis', this.BreakoutGame_tone_duration_var, 0xC0, 0x9A);
		
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
		if(117 < 173) {
		this.bus.emit('sound?tonefreq', this.BreakoutGame_tone1_var, 0xD3);
		
		} else {
		this.bus.emit('sound?tonefreq_bis', 0x7F, this.BreakoutGame_tone1_var);
		
		}
		if(103 < 167) {
		this.bus.emit('sound?tonetimevar234', 0xA4, 0x6F, this.BreakoutGame_tone_duration_var);
		
		} else {
		this.bus.emit('sound?tonetimevar234_bis', this.BreakoutGame_tone_duration_var, 0xA4, 0xEA);
		
		}
		this.BreakoutGame_dy_var =  -this.BreakoutGame_dy_var;
		this.bus.emit('dy=', this.BreakoutGame_dy_var);
		this.incrementScore(10);
		if(this.bricksLeft() === 0) {
		if(74 < 28) {
		setTimeout(() => this.bus.emit('game?nextLevel_', 0xDF), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevel__bis', 0x15), 0);
		
		}
		if(137 < 174) {
		setTimeout(() => this.bus.emit('game?nextLevelvar233', 0x5F, 0xAC), 0);
		
		} else {
		setTimeout(() => this.bus.emit('game?nextLevelvar233_bis', 0xB8, 0x5F), 0);
		
		}
		if(91 < 144) {
		setTimeout(() => this.bus.emit('req_game?nextLevel_', 0xDC), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevel__bis', 0x04), 0);
		
		}
		if(158 < 75) {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar233', 0x4B, 0xCF), 0);
		
		} else {
		setTimeout(() => this.bus.emit('req_game?nextLevelvar233_bis', 0x37, 0x4B), 0);
		
		}
		
		}
		
		}
		this.drawBall();
		this.drawPad();
		if(128 < 232) {
		const padx_const = this.BreakoutGame_padx_var;
		const by_const = this.BreakoutGame_by_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadx', 0x4D, padx_const, by_const), 0);
		
		} else {
		const by_const = this.BreakoutGame_by_var;
		const padx_const = this.BreakoutGame_padx_var;
		setTimeout(() => this.bus.emit('ia?updateIAballypadx_bis', by_const, padx_const, 0xFB), 0);
		
		}
		if(59 < 92) {
		const bx_const = this.BreakoutGame_bx_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIAballxpadyvar229', bx_const, 0x87, 0xF1, pady_const), 0);
		
		} else {
		const bx_const = this.BreakoutGame_bx_var;
		const pady_const = this.BreakoutGame_pady_var;
		setTimeout(() => this.bus.emit('ia?updateIAballxpadyvar229_bis', 0xBD, bx_const, 0x87, pady_const), 0);
		
		}
		if(53 < 43) {
		this.bus.emit('display?updatevar224', 0x27, 0xF7);
		
		} else {
		this.bus.emit('display?updatevar224_bis', 0xF7, 0xBC);
		
		}
		if(63 < 235) {
		this.bus.emit('display?update_', 0xE3);
		
		} else {
		this.bus.emit('display?update__bis', 0x9D);
		
		}
		this.log(false);
		const period_const = this.BreakoutGame_period_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0, 0xAC, 0x4E, period_const), 0);
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady__bis) => {
		return displayReady__bis._port === 'display' && displayReady__bis._msg === 'displayReady__bis' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var);
	}).effect((displayReady__bis) => {
		if(7 < 143) {
		this.bus.emit('display?clearvar215', 0x96, 0x92);
		
		} else {
		this.bus.emit('display?clearvar215_bis', 0x92, 0xC9);
		
		}
		if(30 < 55) {
		this.bus.emit('display?clear_', 0xB8);
		
		} else {
		this.bus.emit('display?clear__bis', 0x0A);
		
		}
		this.initColors();
		if(129 < 177) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
		, 0xAB, 0x67);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x67, 0xEE);
		
		}
		if(37 < 109) {
		this.bus.emit('display?setColorbr', 0xC8, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
		, 0x3C, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(95 < 36) {
		this.bus.emit('display?fillRect_', 0xBD);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0xEE);
		
		}
		if(20 < 14) {
		this.bus.emit('display?fillRectyheightvar219widthx', 0, 0xD0, this.BreakoutGame_YDISPSIZE_var, 0x4F, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x96, 0xD0, this.BreakoutGame_XDISPSIZE_var, 0, 0, this.BreakoutGame_YDISPSIZE_var);
		
		}
		if(98 < 89) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
		, 0x18, 0xBA);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
		, 0xBA, 0xA0);
		
		}
		if(254 < 34) {
		this.bus.emit('display?setColorbr', 0x3B, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x4D, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(186 < 64) {
		this.bus.emit('display?fillRect_', 0x73);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x22);
		
		}
		if(185 < 117) {
		this.bus.emit('display?fillRectyheightvar219widthx', 0, 0xC5, 14, 0xF3, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xA2, 0xC5, this.BreakoutGame_XDISPSIZE_var, 0, 0, 14);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReadyvar225_bis) => {
		return displayReadyvar225_bis._port === 'display' && displayReadyvar225_bis._msg === 'displayReadyvar225_bis' && (this.BreakoutGame_SC_INIT_received_display_displayReady__var);
	}).effect((displayReadyvar225_bis) => {
		if(46 < 131) {
		this.bus.emit('display?clearvar215', 0x57, 0x92);
		
		} else {
		this.bus.emit('display?clearvar215_bis', 0x92, 0x49);
		
		}
		if(182 < 220) {
		this.bus.emit('display?clear_', 0x15);
		
		} else {
		this.bus.emit('display?clear__bis', 0xEE);
		
		}
		this.initColors();
		if(199 < 55) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
		, 0x0C, 0x67);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x67, 0xB6);
		
		}
		if(111 < 14) {
		this.bus.emit('display?setColorbr', 0xD9, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
		, 0xCD, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(236 < 172) {
		this.bus.emit('display?fillRectyheightvar219widthx', 0, 0xD0, this.BreakoutGame_YDISPSIZE_var, 0x0F, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x98, 0xD0, this.BreakoutGame_XDISPSIZE_var, 0, 0, this.BreakoutGame_YDISPSIZE_var);
		
		}
		if(210 < 140) {
		this.bus.emit('display?fillRect_', 0xE4);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x39);
		
		}
		if(173 < 214) {
		this.bus.emit('display?setColorbr', 0x15, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x7B, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(86 < 124) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
		, 0x87, 0xBA);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
		, 0xBA, 0x6B);
		
		}
		if(102 < 170) {
		this.bus.emit('display?fillRectyheightvar219widthx', 0, 0xC5, 14, 0xBA, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x8D, 0xC5, this.BreakoutGame_XDISPSIZE_var, 0, 0, 14);
		
		}
		if(187 < 112) {
		this.bus.emit('display?fillRect_', 0xA8);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x20);
		
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
	BreakoutGame_SC_INIT.to(BreakoutGame_SC_LAUNCH).when((displayReady_) => {
		return displayReady_._port === 'display' && displayReady_._msg === 'displayReady_' && (this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var);
	}).effect((displayReady_) => {
		if(7 < 143) {
		this.bus.emit('display?clearvar215', 0x77, 0x92);
		
		} else {
		this.bus.emit('display?clearvar215_bis', 0x92, 0xDD);
		
		}
		if(30 < 55) {
		this.bus.emit('display?clear_', 0xA0);
		
		} else {
		this.bus.emit('display?clear__bis', 0x86);
		
		}
		this.initColors();
		if(129 < 177) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
		, 0xC4, 0x67);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x67, 0x33);
		
		}
		if(37 < 109) {
		this.bus.emit('display?setColorbr', 0x30, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
		, 0x8C, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(95 < 36) {
		this.bus.emit('display?fillRect_', 0xAD);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x82);
		
		}
		if(20 < 14) {
		this.bus.emit('display?fillRectyheightvar219widthx', 0, 0xD0, this.BreakoutGame_YDISPSIZE_var, 0xF7, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x57, 0xD0, this.BreakoutGame_XDISPSIZE_var, 0, 0, this.BreakoutGame_YDISPSIZE_var);
		
		}
		if(98 < 89) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
		, 0xAE, 0xBA);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
		, 0xBA, 0xCA);
		
		}
		if(254 < 34) {
		this.bus.emit('display?setColorbr', 0x22, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x43, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(186 < 64) {
		this.bus.emit('display?fillRect_', 0xAE);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x48);
		
		}
		if(185 < 117) {
		this.bus.emit('display?fillRectyheightvar219widthx', 0, 0xC5, 14, 0xE0, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x66, 0xC5, this.BreakoutGame_XDISPSIZE_var, 0, 0, 14);
		
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
		if(46 < 131) {
		this.bus.emit('display?clearvar215', 0x40, 0x92);
		
		} else {
		this.bus.emit('display?clearvar215_bis', 0x92, 0x9E);
		
		}
		if(182 < 220) {
		this.bus.emit('display?clear_', 0x0D);
		
		} else {
		this.bus.emit('display?clear__bis', 0x3D);
		
		}
		this.initColors();
		if(199 < 55) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
		, 0x3F, 0x67);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
		, 0x67, 0x20);
		
		}
		if(111 < 14) {
		this.bus.emit('display?setColorbr', 0x48, this.BreakoutGame_bgcolor_var[0]
		, this.BreakoutGame_bgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
		, 0x45, this.BreakoutGame_bgcolor_var[2]
		);
		
		}
		if(236 < 172) {
		this.bus.emit('display?fillRectyheightvar219widthx', 0, 0xD0, this.BreakoutGame_YDISPSIZE_var, 0x43, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x94, 0xD0, this.BreakoutGame_XDISPSIZE_var, 0, 0, this.BreakoutGame_YDISPSIZE_var);
		
		}
		if(210 < 140) {
		this.bus.emit('display?fillRect_', 0xE2);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x9D);
		
		}
		if(173 < 214) {
		this.bus.emit('display?setColorbr', 0x95, this.BreakoutGame_fgcolor_var[0]
		, this.BreakoutGame_fgcolor_var[2]
		);
		
		} else {
		this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
		, 0x53, this.BreakoutGame_fgcolor_var[2]
		);
		
		}
		if(86 < 124) {
		this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
		, 0x00, 0xBA);
		
		} else {
		this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
		, 0xBA, 0xBD);
		
		}
		if(102 < 170) {
		this.bus.emit('display?fillRectyheightvar219widthx', 0, 0xC5, 14, 0x9C, this.BreakoutGame_XDISPSIZE_var, 0);
		
		} else {
		this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x2D, 0xC5, this.BreakoutGame_XDISPSIZE_var, 0, 0, 14);
		
		}
		if(187 < 112) {
		this.bus.emit('display?fillRect_', 0xDA);
		
		} else {
		this.bus.emit('display?fillRect__bis', 0x76);
		
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
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var);
	}).effect((lostBall__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x78, 0, 0xEE), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall__bis) => {
		return lostBall__bis._port === 'game' && lostBall__bis._msg === 'lostBall__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var));
	}).effect((lostBall__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var);
	}).effect((nextLevel_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x97, 0, 0x3D), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel_) => {
		return nextLevel_._port === 'game' && nextLevel_._msg === 'nextLevel_' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var));
	}).effect((nextLevel_) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar233) => {
		return nextLevelvar233._port === 'game' && nextLevelvar233._msg === 'nextLevelvar233' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar233) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x97, 0, 0x13), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar233) => {
		return nextLevelvar233._port === 'game' && nextLevelvar233._msg === 'nextLevelvar233' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar233) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var);
	}).effect((nextLevel__bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x97, 0, 0x22), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevel__bis) => {
		return nextLevel__bis._port === 'game' && nextLevel__bis._msg === 'nextLevel__bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var));
	}).effect((nextLevel__bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_NEXTLEVEL).when((nextLevelvar233_bis) => {
		return nextLevelvar233_bis._port === 'game' && nextLevelvar233_bis._msg === 'nextLevelvar233_bis' && (this.BreakoutGame_SC_PLAY_received_game_nextLevel__var);
	}).effect((nextLevelvar233_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x97, 0, 0xE8), 0);
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var = false;
		this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((nextLevelvar233_bis) => {
		return nextLevelvar233_bis._port === 'game' && nextLevelvar233_bis._msg === 'nextLevelvar233_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_nextLevel__var));
	}).effect((nextLevelvar233_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar232_bis) => {
		return lostBallvar232_bis._port === 'game' && lostBallvar232_bis._msg === 'lostBallvar232_bis' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar232_bis) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x78, 0, 0xBB), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar232_bis) => {
		return lostBallvar232_bis._port === 'game' && lostBallvar232_bis._msg === 'lostBallvar232_bis' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar232_bis) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var);
	}).effect((lostBall_) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x78, 0, 0xE0), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBall_) => {
		return lostBall_._port === 'game' && lostBall_._msg === 'lostBall_' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var));
	}).effect((lostBall_) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = true;
	});
	BreakoutGame_SC_PLAY.to(BreakoutGame_SC_LOSTBALL).when((lostBallvar232) => {
		return lostBallvar232._port === 'game' && lostBallvar232._msg === 'lostBallvar232' && (this.BreakoutGame_SC_PLAY_received_game_lostBall__var);
	}).effect((lostBallvar232) => {
		setTimeout(() => this.bus.emit('clock?timer_cancel', 0x78, 0, 0x89), 0);
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var = false;
		this.BreakoutGame_SC_PLAY_received_game_lostBall__var = false;
	});
	BreakoutGame_SC_PLAY.to(null).when((lostBallvar232) => {
		return lostBallvar232._port === 'game' && lostBallvar232._msg === 'lostBallvar232' && (!(this.BreakoutGame_SC_PLAY_received_game_lostBall__var));
	}).effect((lostBallvar232) => {
		this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var = true;
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
	if(171 < 149) {
	this.bus.emit('display?setBGColorrb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x7F);
	
	} else {
	this.bus.emit('display?setBGColorrb_bis', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, 0x14);
	
	}
	if(34 < 162) {
	this.bus.emit('display?setBGColorvar217g', this.BreakoutGame_bgcolor_var[1]
	, 0xA8, 0x11);
	
	} else {
	this.bus.emit('display?setBGColorvar217g_bis', 0xA8, 0xA4, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(97 < 23) {
	this.bus.emit('display?setColorbr', 0xC8, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
	, 0xE6, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(215 < 38) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
	, 0xD9, 0x9D);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x9D, 0xC8);
	
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
	if(188 < 52) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
	, 0x42, 0x54);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x54, 0x14);
	
	}
	if(238 < 108) {
	this.bus.emit('display?setColorbr', 0x56, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
	, 0x72, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(162 < 89) {
	this.bus.emit('display?fillRect_', 0x89);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x9F);
	
	}
	if(236 < 226) {
	this.bus.emit('display?fillRectyheightvar219widthx', this.BreakoutGame_prevBY_var, 0xE1, bs_var, 0x56, bs_var, this.BreakoutGame_prevBX_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xA9, 0xE1, bs_var, this.BreakoutGame_prevBY_var, this.BreakoutGame_prevBX_var, bs_var);
	
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
	if(189 < 77) {
	this.bus.emit('display?setColorbr', 0x72, 183, 111);
	
	} else {
	this.bus.emit('display?setColorbr_bis', 183, 0xB0, 111);
	
	}
	if(245 < 86) {
	this.bus.emit('display?setColorgvar216', 199, 0x44, 0xEF);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', 199, 0xEF, 0x18);
	
	}
	if(126 < 166) {
	this.bus.emit('display?fillRect_', 0x58);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x2C);
	
	}
	if(254 < 194) {
	this.bus.emit('display?fillRectyheightvar219widthx', this.BreakoutGame_prevBY_var, 0x3F, bs_var, 0x66, bs_var, this.BreakoutGame_prevBX_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xE9, 0x3F, bs_var, this.BreakoutGame_prevBY_var, this.BreakoutGame_prevBX_var, bs_var);
	
	}
}

BreakoutGameBrowser.prototype.erasePad = function() {
	let ps_var = Math.trunc(this.BreakoutGame_padlen_var / this.BreakoutGame_SCALE_var);
	if(this.BreakoutGame_prevPX_var > 0) {
	if(163 < 221) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
	, 0x09, 0x16);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x16, 0xAB);
	
	}
	if(3 < 109) {
	this.bus.emit('display?setColorbr', 0x66, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
	, 0x8A, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(224 < 69) {
	this.bus.emit('display?fillRect_', 0x06);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x7F);
	
	}
	if(9 < 16) {
	this.bus.emit('display?fillRectyheightvar219widthx', this.BreakoutGame_prevPY_var, 0x06, 4, 0x85, ps_var, this.BreakoutGame_prevPX_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xDA, 0x06, ps_var, this.BreakoutGame_prevPY_var, this.BreakoutGame_prevPX_var, 4);
	
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
	if(170 < 172) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
	, 0x4F, 0x92);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x92, 0xFB);
	
	}
	if(53 < 44) {
	this.bus.emit('display?setColorbr', 0x90, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
	, 0x79, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(174 < 127) {
	this.bus.emit('display?fillRectyheightvar219widthx', this.BreakoutGame_prevPY_var, 0xD2, 4, 0xBA, ps_var, this.BreakoutGame_prevPX_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xA5, 0xD2, ps_var, this.BreakoutGame_prevPY_var, this.BreakoutGame_prevPX_var, 4);
	
	}
	if(238 < 79) {
	this.bus.emit('display?fillRect_', 0x10);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xDE);
	
	}
}

BreakoutGameBrowser.prototype.drawCountDown = function(BreakoutGame_drawCountDown_c_var) {
	if(74 < 52) {
	this.bus.emit('display?setColorbr', 0x94, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
	, 0xC7, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(202 < 41) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
	, 0x6A, 0x8E);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x8E, 0x36);
	
	}
	if(BreakoutGame_drawCountDown_c_var > 0) {
	if(250 < 39) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
	, 0x8E, 0x32);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x32, 0x86);
	
	}
	if(192 < 248) {
	this.bus.emit('display?setColorbr', 0x76, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
	, 0x99, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(156 < 252) {
	this.bus.emit('display?setBGColorrb', this.BreakoutGame_bgcolor_var[2]
	, this.BreakoutGame_bgcolor_var[0]
	, 0x53);
	
	} else {
	this.bus.emit('display?setBGColorrb_bis', this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	, 0xFB);
	
	}
	if(39 < 175) {
	this.bus.emit('display?setBGColorvar217g', this.BreakoutGame_bgcolor_var[1]
	, 0x78, 0x3C);
	
	} else {
	this.bus.emit('display?setBGColorvar217g_bis', 0x78, 0xF6, this.BreakoutGame_bgcolor_var[1]
	);
	
	}
	if(43 < 45) {
	this.bus.emit('display?drawIntegerscalevar220xv', 0xBE, 0xC7, BreakoutGame_drawCountDown_c_var, 4, 80 - 6);
	
	} else {
	this.bus.emit('display?drawIntegerscalevar220xv_bis', 4, BreakoutGame_drawCountDown_c_var, 0xC7, 0xA1, 80 - 6);
	
	}
	if(204 < 139) {
	this.bus.emit('display?drawIntegerdigitsy', 1, 90, 0xF9);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsy_bis', 0x35, 1, 90);
	
	}
	
	} else {
	if(186 < 175) {
	this.bus.emit('display?setColorbr', 0x5C, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
	, 0x5F, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(82 < 221) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
	, 0xDA, 0xFB);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
	, 0xFB, 0xFC);
	
	}
	if(57 < 121) {
	this.bus.emit('display?fillRectyheightvar219widthx', 90, 0x7E, 20, 0x6D, 12, 80 - 6);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xC2, 0x7E, 12, 90, 80 - 6, 20);
	
	}
	if(123 < 212) {
	this.bus.emit('display?fillRect_', 0xAF);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x27);
	
	}
	
	}
}

BreakoutGameBrowser.prototype.drawWalls = function() {
	if(37 < 142) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
	, 0x48, 0x5E);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x5E, 0xAC);
	
	}
	if(131 < 217) {
	this.bus.emit('display?setColorbr', 0xE2, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
	, 0xCA, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	const left_var = (Math.trunc(this.BreakoutGame_LEFT_var / this.BreakoutGame_SCALE_var));
	const right_var = (Math.trunc(this.BreakoutGame_RIGHT_var / this.BreakoutGame_SCALE_var));
	const top_var = (Math.trunc(this.BreakoutGame_TOP_var / this.BreakoutGame_SCALE_var));
	const bottom_var = (Math.trunc(this.BreakoutGame_BOTTOM_var / this.BreakoutGame_SCALE_var));
	const xcenter_var = (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / this.BreakoutGame_SCALE_var));
	const ycenter_var = (Math.trunc((this.BreakoutGame_BOTTOM_var - this.BreakoutGame_TOP_var) / this.BreakoutGame_SCALE_var));
	if(71 < 8) {
	this.bus.emit('display?fillRectyheightvar219widthx', top_var - 1, 0x7F, 1, 0x26, xcenter_var + 1, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xF6, 0x7F, xcenter_var + 1, top_var - 1, left_var - 1, 1);
	
	}
	if(224 < 90) {
	this.bus.emit('display?fillRect_', 0xDA);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x0B);
	
	}
	if(231 < 243) {
	this.bus.emit('display?fillRect_', 0xA8);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x4E);
	
	}
	if(108 < 50) {
	this.bus.emit('display?fillRectyheightvar219widthx', bottom_var, 0xD4, 1, 0xEE, xcenter_var + 1, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x5A, 0xD4, xcenter_var + 1, bottom_var, left_var - 1, 1);
	
	}
	if(100 < 227) {
	this.bus.emit('display?fillRect_', 0x89);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xF6);
	
	}
	if(78 < 195) {
	this.bus.emit('display?fillRectyheightvar219widthx', top_var, 0x1A, ycenter_var, 0x08, 1, left_var - 1);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x4F, 0x1A, 1, top_var, left_var - 1, ycenter_var);
	
	}
	if(85 < 85) {
	this.bus.emit('display?fillRect_', 0xB8);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xB5);
	
	}
	if(104 < 123) {
	this.bus.emit('display?fillRectyheightvar219widthx', top_var, 0x07, ycenter_var, 0x0F, 1, right_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x12, 0x07, 1, top_var, right_var, ycenter_var);
	
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
	if(33 < 151) {
	this.bus.emit('display?setColorbr', 0x8D, 155, 89);
	
	} else {
	this.bus.emit('display?setColorbr_bis', 155, 0x50, 89);
	
	}
	if(14 < 163) {
	this.bus.emit('display?setColorgvar216', 103, 0xEF, 0x65);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', 103, 0x65, 0x9D);
	
	}
	if(128 < 141) {
	this.bus.emit('display?fillRectyheightvar219widthx', by_var, 0x25, h_var, 0x66, w_var, bx_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xE1, 0x25, w_var, by_var, bx_var, h_var);
	
	}
	if(199 < 124) {
	this.bus.emit('display?fillRect_', 0x88);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x33);
	
	}
	if(183 < 208) {
	this.bus.emit('display?setColorbr', 0xCC, 100, 43);
	
	} else {
	this.bus.emit('display?setColorbr_bis', 100, 0xF8, 43);
	
	}
	if(247 < 226) {
	this.bus.emit('display?setColorgvar216', 56, 0xE0, 0x13);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', 56, 0x13, 0x36);
	
	}
	if(54 < 57) {
	this.bus.emit('display?drawRectvar218widthheight', 0xB5, w_var, 0x1F, h_var);
	
	} else {
	this.bus.emit('display?drawRectvar218widthheight_bis', w_var, 0x1F, h_var, 0x65);
	
	}
	if(8 < 240) {
	this.bus.emit('display?drawRectxy', by_var, 0xE1, bx_var);
	
	} else {
	this.bus.emit('display?drawRectxy_bis', bx_var, 0x08, by_var);
	
	}
}

BreakoutGameBrowser.prototype.removeBrick = function(BreakoutGame_removeBrick_x_var, BreakoutGame_removeBrick_y_var) {
	const bx_var = (Math.trunc((this.BreakoutGame_LEFT_var + (Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) * BreakoutGame_removeBrick_x_var) / this.BreakoutGame_SCALE_var) + 1);
	const by_var = (Math.trunc((this.BreakoutGame_TOP_var + 20 * this.BreakoutGame_SCALE_var + this.BreakoutGame_BRICK_HEIGHT_var * BreakoutGame_removeBrick_y_var * this.BreakoutGame_SCALE_var) / this.BreakoutGame_SCALE_var) + 1);
	if(198 < 241) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
	, 0x1D, 0x21);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
	, 0x21, 0x88);
	
	}
	if(90 < 117) {
	this.bus.emit('display?setColorbr', 0x5B, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
	, 0x94, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(30 < 182) {
	this.bus.emit('display?fillRect_', 0x49);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0xD1);
	
	}
	if(232 < 38) {
	this.bus.emit('display?fillRectyheightvar219widthx', by_var, 0x13, this.BreakoutGame_BRICK_HEIGHT_var - 2, 0x47, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), bx_var);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x69, 0x13, (Math.trunc((Math.trunc((this.BreakoutGame_RIGHT_var - this.BreakoutGame_LEFT_var) / 8)) / this.BreakoutGame_SCALE_var) - 2), by_var, bx_var, this.BreakoutGame_BRICK_HEIGHT_var - 2);
	
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
	if(149 < 12) {
	this.bus.emit('display?setColorbr', 0x97, 158, 130);
	
	} else {
	this.bus.emit('display?setColorbr_bis', 158, 0x7F, 130);
	
	}
	if(148 < 119) {
	this.bus.emit('display?setColorgvar216', 209, 0x89, 0x53);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', 209, 0x53, 0x27);
	
	}
	if(209 < 140) {
	this.bus.emit('display?setBGColorrb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, 0xED);
	
	} else {
	this.bus.emit('display?setBGColorrb_bis', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x37);
	
	}
	if(230 < 26) {
	this.bus.emit('display?setBGColorvar217g', this.BreakoutGame_fgcolor_var[1]
	, 0x2C, 0xB2);
	
	} else {
	this.bus.emit('display?setBGColorvar217g_bis', 0x2C, 0xB3, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(99 < 231) {
	this.bus.emit('display?setColorbr', 0xC9, this.BreakoutGame_bgcolor_var[0]
	, this.BreakoutGame_bgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_bgcolor_var[0]
	, 0xE6, this.BreakoutGame_bgcolor_var[2]
	);
	
	}
	if(64 < 80) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_bgcolor_var[1]
	, 0x68, 0xEC);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_bgcolor_var[1]
	, 0xEC, 0x14);
	
	}
	if(53 < 39) {
	this.bus.emit('display?drawIntegerdigitsy', 2, 2, 0x97);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsy_bis', 0xFD, 2, 2);
	
	}
	if(238 < 211) {
	this.bus.emit('display?drawIntegerscalevar220xv', 0x62, 0xA1, this.BreakoutGame_level_var, 2, 6);
	
	} else {
	this.bus.emit('display?drawIntegerscalevar220xv_bis', 2, this.BreakoutGame_level_var, 0xA1, 0xA2, 6);
	
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
	if(202 < 188) {
	this.bus.emit('display?setColorbr', 0x77, 158, 130);
	
	} else {
	this.bus.emit('display?setColorbr_bis', 158, 0x63, 130);
	
	}
	if(237 < 143) {
	this.bus.emit('display?setColorgvar216', 209, 0xFB, 0x4A);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', 209, 0x4A, 0x72);
	
	}
	if(32 < 84) {
	this.bus.emit('display?setBGColorvar217g', this.BreakoutGame_fgcolor_var[1]
	, 0x4F, 0x1D);
	
	} else {
	this.bus.emit('display?setBGColorvar217g_bis', 0x4F, 0x72, this.BreakoutGame_fgcolor_var[1]
	);
	
	}
	if(179 < 233) {
	this.bus.emit('display?setBGColorrb', this.BreakoutGame_fgcolor_var[2]
	, this.BreakoutGame_fgcolor_var[0]
	, 0x28);
	
	} else {
	this.bus.emit('display?setBGColorrb_bis', this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	, 0x26);
	
	}
	if(158 < 243) {
	this.bus.emit('display?drawIntegerscalevar220xv', 0xD9, 0x79, this.BreakoutGame_score_var, 2, 58);
	
	} else {
	this.bus.emit('display?drawIntegerscalevar220xv_bis', 2, this.BreakoutGame_score_var, 0x79, 0x6E, 58);
	
	}
	if(13 < 140) {
	this.bus.emit('display?drawIntegerdigitsy', 5, 2, 0x36);
	
	} else {
	this.bus.emit('display?drawIntegerdigitsy_bis', 0xC1, 5, 2);
	
	}
}

BreakoutGameBrowser.prototype.drawLives = function() {
	if(63 < 92) {
	this.bus.emit('display?setColorgvar216', this.BreakoutGame_fgcolor_var[1]
	, 0x5D, 0x12);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', this.BreakoutGame_fgcolor_var[1]
	, 0x12, 0x9E);
	
	}
	if(94 < 33) {
	this.bus.emit('display?setColorbr', 0x53, this.BreakoutGame_fgcolor_var[0]
	, this.BreakoutGame_fgcolor_var[2]
	);
	
	} else {
	this.bus.emit('display?setColorbr_bis', this.BreakoutGame_fgcolor_var[0]
	, 0xA4, this.BreakoutGame_fgcolor_var[2]
	);
	
	}
	if(120 < 87) {
	this.bus.emit('display?fillRect_', 0x8D);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x87);
	
	}
	if(179 < 202) {
	this.bus.emit('display?fillRectyheightvar219widthx', 4, 0xBE, 6, 0x08, 24 + 6, 124);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0xC1, 0xBE, 24 + 6, 4, 124, 6);
	
	}
	if(166 < 111) {
	this.bus.emit('display?setColorbr', 0x38, 183, 111);
	
	} else {
	this.bus.emit('display?setColorbr_bis', 183, 0xAE, 111);
	
	}
	if(30 < 226) {
	this.bus.emit('display?setColorgvar216', 199, 0x43, 0x66);
	
	} else {
	this.bus.emit('display?setColorgvar216_bis', 199, 0x66, 0xD3);
	
	}
	let i_var = 0;
	while(i_var < this.BreakoutGame_lives_var) {
	if(51 < 60) {
	this.bus.emit('display?fillRectyheightvar219widthx', 4, 0xDC, 6, 0xE7, 6, 124 + (2 - i_var) * 12);
	
	} else {
	this.bus.emit('display?fillRectyheightvar219widthx_bis', 0x84, 0xDC, 6, 4, 124 + (2 - i_var) * 12, 6);
	
	}
	if(159 < 58) {
	this.bus.emit('display?fillRect_', 0xDA);
	
	} else {
	this.bus.emit('display?fillRect__bis', 0x53);
	
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

BreakoutGameBrowser.prototype.receivetimer_timeoutOnclock = function(id, var235, var214) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, var235:var235, var214:var214});
}

BreakoutGameBrowser.prototype.receivedisplayReady_Ondisplay = function(var246) {
	this._receive({_port:"display", _msg:"displayReady_", var246:var246});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar225Ondisplay = function(var247, var225) {
	this._receive({_port:"display", _msg:"displayReadyvar225", var247:var247, var225:var225});
}

BreakoutGameBrowser.prototype.receivedisplayError_Ondisplay = function(var252) {
	this._receive({_port:"display", _msg:"displayError_", var252:var252});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar226Ondisplay = function(var253, var226) {
	this._receive({_port:"display", _msg:"displayErrorvar226", var253:var253, var226:var226});
}

BreakoutGameBrowser.prototype.receivedisplayReady__bisOndisplay = function(var270) {
	this._receive({_port:"display", _msg:"displayReady__bis", var270:var270});
}

BreakoutGameBrowser.prototype.receivedisplayReadyvar225_bisOndisplay = function(var271, var225) {
	this._receive({_port:"display", _msg:"displayReadyvar225_bis", var271:var271, var225:var225});
}

BreakoutGameBrowser.prototype.receivedisplayError__bisOndisplay = function(var276) {
	this._receive({_port:"display", _msg:"displayError__bis", var276:var276});
}

BreakoutGameBrowser.prototype.receivedisplayErrorvar226_bisOndisplay = function(var277, var226) {
	this._receive({_port:"display", _msg:"displayErrorvar226_bis", var277:var277, var226:var226});
}

BreakoutGameBrowser.prototype.receivepositionxOncontroller = function(var286, x) {
	this._receive({_port:"controller", _msg:"positionx", var286:var286, x:x});
}

BreakoutGameBrowser.prototype.receivepositionvar228yOncontroller = function(var287, y, var228) {
	this._receive({_port:"controller", _msg:"positionvar228y", var287:var287, y:y, var228:var228});
}

BreakoutGameBrowser.prototype.receivepositionx_bisOncontroller = function(x, var290) {
	this._receive({_port:"controller", _msg:"positionx_bis", x:x, var290:var290});
}

BreakoutGameBrowser.prototype.receivepositionvar228y_bisOncontroller = function(var228, y, var291) {
	this._receive({_port:"controller", _msg:"positionvar228y_bis", var228:var228, y:y, var291:var291});
}

BreakoutGameBrowser.prototype.receivelostBall_Ongame = function(var308) {
	this._receive({_port:"game", _msg:"lostBall_", var308:var308});
}

BreakoutGameBrowser.prototype.receivelostBallvar232Ongame = function(var232, var309) {
	this._receive({_port:"game", _msg:"lostBallvar232", var232:var232, var309:var309});
}

BreakoutGameBrowser.prototype.receivenextLevel_Ongame = function(var306) {
	this._receive({_port:"game", _msg:"nextLevel_", var306:var306});
}

BreakoutGameBrowser.prototype.receivenextLevelvar233Ongame = function(var233, var307) {
	this._receive({_port:"game", _msg:"nextLevelvar233", var233:var233, var307:var307});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOngame = function(var312) {
	this._receive({_port:"game", _msg:"lostBall__bis", var312:var312});
}

BreakoutGameBrowser.prototype.receivelostBallvar232_bisOngame = function(var232, var313) {
	this._receive({_port:"game", _msg:"lostBallvar232_bis", var232:var232, var313:var313});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOngame = function(var310) {
	this._receive({_port:"game", _msg:"nextLevel__bis", var310:var310});
}

BreakoutGameBrowser.prototype.receivenextLevelvar233_bisOngame = function(var311, var233) {
	this._receive({_port:"game", _msg:"nextLevelvar233_bis", var311:var311, var233:var233});
}

BreakoutGameBrowser.prototype.receivelostBall_Onpro_game = function(var308) {
	this._receive({_port:"pro_game", _msg:"lostBall_", var308:var308});
}

BreakoutGameBrowser.prototype.receivelostBallvar232Onpro_game = function(var232, var309) {
	this._receive({_port:"pro_game", _msg:"lostBallvar232", var232:var232, var309:var309});
}

BreakoutGameBrowser.prototype.receivenextLevel_Onpro_game = function(var306) {
	this._receive({_port:"pro_game", _msg:"nextLevel_", var306:var306});
}

BreakoutGameBrowser.prototype.receivenextLevelvar233Onpro_game = function(var233, var307) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar233", var233:var233, var307:var307});
}

BreakoutGameBrowser.prototype.receivelostBall__bisOnpro_game = function(var312) {
	this._receive({_port:"pro_game", _msg:"lostBall__bis", var312:var312});
}

BreakoutGameBrowser.prototype.receivelostBallvar232_bisOnpro_game = function(var232, var313) {
	this._receive({_port:"pro_game", _msg:"lostBallvar232_bis", var232:var232, var313:var313});
}

BreakoutGameBrowser.prototype.receivenextLevel__bisOnpro_game = function(var310) {
	this._receive({_port:"pro_game", _msg:"nextLevel__bis", var310:var310});
}

BreakoutGameBrowser.prototype.receivenextLevelvar233_bisOnpro_game = function(var311, var233) {
	this._receive({_port:"pro_game", _msg:"nextLevelvar233_bis", var311:var311, var233:var233});
}

BreakoutGameBrowser.prototype.initBreakoutGame_fgcolor_var = function(BreakoutGame_fgcolor_var) {
	this.BreakoutGame_fgcolor_var = BreakoutGame_fgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone2_var = function(BreakoutGame_tone2_var) {
	this.BreakoutGame_tone2_var = BreakoutGame_tone2_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReady__var = function(BreakoutGame_SC_INIT_received_display_displayReady__var) {
	this.BreakoutGame_SC_INIT_received_display_displayReady__var = BreakoutGame_SC_INIT_received_display_displayReady__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YDISPSIZE_var = function(BreakoutGame_YDISPSIZE_var) {
	this.BreakoutGame_YDISPSIZE_var = BreakoutGame_YDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bx_var = function(BreakoutGame_bx_var) {
	this.BreakoutGame_bx_var = BreakoutGame_bx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dy_var = function(BreakoutGame_dy_var) {
	this.BreakoutGame_dy_var = BreakoutGame_dy_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var = BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBall__var = BreakoutGame_SC_PLAY_received_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_var228_var = function(BreakoutGame_SC_controller_position_var228_var) {
	this.BreakoutGame_SC_controller_position_var228_var = BreakoutGame_SC_controller_position_var228_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_nextLevel_var233_var = function(BreakoutGame_SC_PLAY_game_nextLevel_var233_var) {
	this.BreakoutGame_SC_PLAY_game_nextLevel_var233_var = BreakoutGame_SC_PLAY_game_nextLevel_var233_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_dx_var = function(BreakoutGame_dx_var) {
	this.BreakoutGame_dx_var = BreakoutGame_dx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var = BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XMAX_var = function(BreakoutGame_XMAX_var) {
	this.BreakoutGame_XMAX_var = BreakoutGame_XMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padx_var = function(BreakoutGame_padx_var) {
	this.BreakoutGame_padx_var = BreakoutGame_padx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBX_var = function(BreakoutGame_prevBX_var) {
	this.BreakoutGame_prevBX_var = BreakoutGame_prevBX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_YMAX_var = function(BreakoutGame_YMAX_var) {
	this.BreakoutGame_YMAX_var = BreakoutGame_YMAX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_padlen_var = function(BreakoutGame_padlen_var) {
	this.BreakoutGame_padlen_var = BreakoutGame_padlen_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_by_var = function(BreakoutGame_by_var) {
	this.BreakoutGame_by_var = BreakoutGame_by_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_ROWS_var = function(BreakoutGame_BRICK_ROWS_var) {
	this.BreakoutGame_BRICK_ROWS_var = BreakoutGame_BRICK_ROWS_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_br_var = function(BreakoutGame_br_var) {
	this.BreakoutGame_br_var = BreakoutGame_br_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevBY_var = function(BreakoutGame_prevBY_var) {
	this.BreakoutGame_prevBY_var = BreakoutGame_prevBY_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_y_var = function(BreakoutGame_SC_controller_position_y_var) {
	this.BreakoutGame_SC_controller_position_y_var = BreakoutGame_SC_controller_position_y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_period_var = function(BreakoutGame_period_var) {
	this.BreakoutGame_period_var = BreakoutGame_period_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevel__var = function(BreakoutGame_SC_PLAY_received_game_nextLevel__var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevel__var = BreakoutGame_SC_PLAY_received_game_nextLevel__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_lostBallvar232_var = function(BreakoutGame_SC_PLAY_received_game_lostBallvar232_var) {
	this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var = BreakoutGame_SC_PLAY_received_game_lostBallvar232_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var = BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var = function(BreakoutGame_SC_PLAY_received_pro_game_lostBall__var) {
	this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var = BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_controller_position_x_var = function(BreakoutGame_SC_controller_position_x_var) {
	this.BreakoutGame_SC_controller_position_x_var = BreakoutGame_SC_controller_position_x_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_received_game_nextLevelvar233_var = function(BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var) {
	this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var = BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone1_var = function(BreakoutGame_tone1_var) {
	this.BreakoutGame_tone1_var = BreakoutGame_tone1_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_score_var = function(BreakoutGame_score_var) {
	this.BreakoutGame_score_var = BreakoutGame_score_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_LAUNCH_countdown_var = function(BreakoutGame_SC_LAUNCH_countdown_var) {
	this.BreakoutGame_SC_LAUNCH_countdown_var = BreakoutGame_SC_LAUNCH_countdown_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_LEFT_var = function(BreakoutGame_LEFT_var) {
	this.BreakoutGame_LEFT_var = BreakoutGame_LEFT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPX_var = function(BreakoutGame_prevPX_var) {
	this.BreakoutGame_prevPX_var = BreakoutGame_prevPX_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lives_var = function(BreakoutGame_lives_var) {
	this.BreakoutGame_lives_var = BreakoutGame_lives_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_lostBall_var232_var = function(BreakoutGame_SC_PLAY_pro_game_lostBall_var232_var) {
	this.BreakoutGame_SC_PLAY_pro_game_lostBall_var232_var = BreakoutGame_SC_PLAY_pro_game_lostBall_var232_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_TOP_var = function(BreakoutGame_TOP_var) {
	this.BreakoutGame_TOP_var = BreakoutGame_TOP_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_RIGHT_var = function(BreakoutGame_RIGHT_var) {
	this.BreakoutGame_RIGHT_var = BreakoutGame_RIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_received_display_displayReadyvar225_var = function(BreakoutGame_SC_INIT_received_display_displayReadyvar225_var) {
	this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var = BreakoutGame_SC_INIT_received_display_displayReadyvar225_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BOTTOM_var = function(BreakoutGame_BOTTOM_var) {
	this.BreakoutGame_BOTTOM_var = BreakoutGame_BOTTOM_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bgcolor_var = function(BreakoutGame_bgcolor_var) {
	this.BreakoutGame_bgcolor_var = BreakoutGame_bgcolor_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_tone_duration_var = function(BreakoutGame_tone_duration_var) {
	this.BreakoutGame_tone_duration_var = BreakoutGame_tone_duration_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_BRICK_HEIGHT_var = function(BreakoutGame_BRICK_HEIGHT_var) {
	this.BreakoutGame_BRICK_HEIGHT_var = BreakoutGame_BRICK_HEIGHT_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_bricks_var = function(BreakoutGame_bricks_var) {
	this.BreakoutGame_bricks_var = BreakoutGame_bricks_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_XDISPSIZE_var = function(BreakoutGame_XDISPSIZE_var) {
	this.BreakoutGame_XDISPSIZE_var = BreakoutGame_XDISPSIZE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_game_lostBall_var232_var = function(BreakoutGame_SC_PLAY_game_lostBall_var232_var) {
	this.BreakoutGame_SC_PLAY_game_lostBall_var232_var = BreakoutGame_SC_PLAY_game_lostBall_var232_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_level_var = function(BreakoutGame_level_var) {
	this.BreakoutGame_level_var = BreakoutGame_level_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var233_var = function(BreakoutGame_SC_PLAY_pro_game_nextLevel_var233_var) {
	this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var233_var = BreakoutGame_SC_PLAY_pro_game_nextLevel_var233_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_lastTimestamp_var = function(BreakoutGame_lastTimestamp_var) {
	this.BreakoutGame_lastTimestamp_var = BreakoutGame_lastTimestamp_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionvar228y_var = function(BreakoutGame_SC_received_controller_positionvar228y_var) {
	this.BreakoutGame_SC_received_controller_positionvar228y_var = BreakoutGame_SC_received_controller_positionvar228y_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_pady_var = function(BreakoutGame_pady_var) {
	this.BreakoutGame_pady_var = BreakoutGame_pady_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SCALE_var = function(BreakoutGame_SCALE_var) {
	this.BreakoutGame_SCALE_var = BreakoutGame_SCALE_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_received_controller_positionx_var = function(BreakoutGame_SC_received_controller_positionx_var) {
	this.BreakoutGame_SC_received_controller_positionx_var = BreakoutGame_SC_received_controller_positionx_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_counter_var = function(BreakoutGame_counter_var) {
	this.BreakoutGame_counter_var = BreakoutGame_counter_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_SC_INIT_display_displayReady_var225_var = function(BreakoutGame_SC_INIT_display_displayReady_var225_var) {
	this.BreakoutGame_SC_INIT_display_displayReady_var225_var = BreakoutGame_SC_INIT_display_displayReady_var225_var;
}

BreakoutGameBrowser.prototype.initBreakoutGame_prevPY_var = function(BreakoutGame_prevPY_var) {
	this.BreakoutGame_prevPY_var = BreakoutGame_prevPY_var;
}

BreakoutGameBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tfgcolor = ' + this.BreakoutGame_fgcolor_var;
	result += '\n\ttone2 = ' + this.BreakoutGame_tone2_var;
	result += '\n\treceived_display_displayReady_ = ' + this.BreakoutGame_SC_INIT_received_display_displayReady__var;
	result += '\n\tYDISPSIZE = ' + this.BreakoutGame_YDISPSIZE_var;
	result += '\n\tbx = ' + this.BreakoutGame_bx_var;
	result += '\n\tdy = ' + this.BreakoutGame_dy_var;
	result += '\n\treceived_pro_game_nextLevelvar233 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var;
	result += '\n\treceived_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_game_lostBall__var;
	result += '\n\tcontroller_position_var228 = ' + this.BreakoutGame_SC_controller_position_var228_var;
	result += '\n\tgame_nextLevel_var233 = ' + this.BreakoutGame_SC_PLAY_game_nextLevel_var233_var;
	result += '\n\tdx = ' + this.BreakoutGame_dx_var;
	result += '\n\treceived_pro_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_nextLevel__var;
	result += '\n\tXMAX = ' + this.BreakoutGame_XMAX_var;
	result += '\n\tpadx = ' + this.BreakoutGame_padx_var;
	result += '\n\tprevBX = ' + this.BreakoutGame_prevBX_var;
	result += '\n\tYMAX = ' + this.BreakoutGame_YMAX_var;
	result += '\n\tpadlen = ' + this.BreakoutGame_padlen_var;
	result += '\n\tby = ' + this.BreakoutGame_by_var;
	result += '\n\tBRICK_ROWS = ' + this.BreakoutGame_BRICK_ROWS_var;
	result += '\n\tbr = ' + this.BreakoutGame_br_var;
	result += '\n\tprevBY = ' + this.BreakoutGame_prevBY_var;
	result += '\n\tcontroller_position_y = ' + this.BreakoutGame_SC_controller_position_y_var;
	result += '\n\tperiod = ' + this.BreakoutGame_period_var;
	result += '\n\treceived_game_nextLevel_ = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevel__var;
	result += '\n\treceived_game_lostBallvar232 = ' + this.BreakoutGame_SC_PLAY_received_game_lostBallvar232_var;
	result += '\n\treceived_pro_game_lostBallvar232 = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var;
	result += '\n\treceived_pro_game_lostBall_ = ' + this.BreakoutGame_SC_PLAY_received_pro_game_lostBall__var;
	result += '\n\tcontroller_position_x = ' + this.BreakoutGame_SC_controller_position_x_var;
	result += '\n\treceived_game_nextLevelvar233 = ' + this.BreakoutGame_SC_PLAY_received_game_nextLevelvar233_var;
	result += '\n\ttone1 = ' + this.BreakoutGame_tone1_var;
	result += '\n\tscore = ' + this.BreakoutGame_score_var;
	result += '\n\tcountdown = ' + this.BreakoutGame_SC_LAUNCH_countdown_var;
	result += '\n\tLEFT = ' + this.BreakoutGame_LEFT_var;
	result += '\n\tprevPX = ' + this.BreakoutGame_prevPX_var;
	result += '\n\tlives = ' + this.BreakoutGame_lives_var;
	result += '\n\tpro_game_lostBall_var232 = ' + this.BreakoutGame_SC_PLAY_pro_game_lostBall_var232_var;
	result += '\n\tTOP = ' + this.BreakoutGame_TOP_var;
	result += '\n\tRIGHT = ' + this.BreakoutGame_RIGHT_var;
	result += '\n\treceived_display_displayReadyvar225 = ' + this.BreakoutGame_SC_INIT_received_display_displayReadyvar225_var;
	result += '\n\tBOTTOM = ' + this.BreakoutGame_BOTTOM_var;
	result += '\n\tbgcolor = ' + this.BreakoutGame_bgcolor_var;
	result += '\n\ttone_duration = ' + this.BreakoutGame_tone_duration_var;
	result += '\n\tBRICK_HEIGHT = ' + this.BreakoutGame_BRICK_HEIGHT_var;
	result += '\n\tbricks = ' + this.BreakoutGame_bricks_var;
	result += '\n\tXDISPSIZE = ' + this.BreakoutGame_XDISPSIZE_var;
	result += '\n\tgame_lostBall_var232 = ' + this.BreakoutGame_SC_PLAY_game_lostBall_var232_var;
	result += '\n\tlevel = ' + this.BreakoutGame_level_var;
	result += '\n\tpro_game_nextLevel_var233 = ' + this.BreakoutGame_SC_PLAY_pro_game_nextLevel_var233_var;
	result += '\n\tlastTimestamp = ' + this.BreakoutGame_lastTimestamp_var;
	result += '\n\treceived_controller_positionvar228y = ' + this.BreakoutGame_SC_received_controller_positionvar228y_var;
	result += '\n\tpady = ' + this.BreakoutGame_pady_var;
	result += '\n\tSCALE = ' + this.BreakoutGame_SCALE_var;
	result += '\n\treceived_controller_positionx = ' + this.BreakoutGame_SC_received_controller_positionx_var;
	result += '\n\tcounter = ' + this.BreakoutGame_counter_var;
	result += '\n\tdisplay_displayReady_var225 = ' + this.BreakoutGame_SC_INIT_display_displayReady_var225_var;
	result += '\n\tprevPY = ' + this.BreakoutGame_prevPY_var;
	result += '';
	return result;
}

