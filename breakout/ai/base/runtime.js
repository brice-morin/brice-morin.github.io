'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_fgcolor = [];var inst_game_bricks = [];var inst_game_bgcolor = [];inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall', () => inst_game.receivelostBallOngame());
	inst_game.bus.on('game?nextLevel', () => inst_game.receivenextLevelOngame());
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (id) => inst_game.receivetimer_timeoutOnclock(id));
	inst_game.bus.on('clock?timer_start', (id, time) => inst_timer.receivetimer_startOntimer(id, time));
	inst_game.bus.on('clock?timer_cancel', (id) => inst_timer.receivetimer_cancelOntimer(id));
	inst_ctrl.bus.on('controls?position', (x, y) => inst_game.receivepositionOncontroller(x, y));
	inst_game.bus.on('ia?updateIA', (ballx, bally, padx, pady) => inst_ctrl.receiveupdateIAOngame(ballx, bally, padx, pady));
	inst_disp.bus.on('display?displayReady', () => inst_game.receivedisplayReadyOndisplay());
	inst_disp.bus.on('display?displayError', () => inst_game.receivedisplayErrorOndisplay());
	inst_game.bus.on('display?create', (xsize, ysize) => inst_disp.receivecreateOndisplay(xsize, ysize));
	inst_game.bus.on('display?update', () => inst_disp.receiveupdateOndisplay());
	inst_game.bus.on('display?clear', () => inst_disp.receiveclearOndisplay());
	inst_game.bus.on('display?setColor', (r, g, b) => inst_disp.receivesetColorOndisplay(r, g, b));
	inst_game.bus.on('display?setBGColor', (r, g, b) => inst_disp.receivesetBGColorOndisplay(r, g, b));
	inst_game.bus.on('display?drawRect', (x, y, width, height) => inst_disp.receivedrawRectOndisplay(x, y, width, height));
	inst_game.bus.on('display?fillRect', (x, y, width, height) => inst_disp.receivefillRectOndisplay(x, y, width, height));
	inst_game.bus.on('display?drawInteger', (x, y, v, digits, scale) => inst_disp.receivedrawIntegerOndisplay(x, y, v, digits, scale));
	inst_game.bus.on('display?drawThingML', (x, y) => inst_disp.receivedrawThingMLOndisplay(x, y));
	
	inst_timer._init();
	inst_disp._init();
	inst_game._init();
	inst_ctrl._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

