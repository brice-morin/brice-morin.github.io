'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var434_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_received_display_createysize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createvar434xsize_var(false);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var428_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorb_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorvar428gr_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_var429_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorrg_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorvar429b_var(false);inst_disp.initDisplay_SC_Running_display_clear_var427_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar427_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_var430_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectheightxwidth_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectyvar430_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_var431_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectxwidth_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectyheightvar431_var(false);inst_disp.initDisplay_SC_Running_display_update_var436_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar436_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var432_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerxscalevar432digits_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegervy_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_var433_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLvar433_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLxy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var435_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar435_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_var441_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIApadypadxballx_var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAvar441bally_var(false);
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_bgcolor = [];var inst_game_fgcolor = [];var inst_game_bricks = [];inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_controller_position_var440_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_received_controller_position__var(false);inst_game.initBreakoutGame_SC_received_controller_positionvar440xy_var(false);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var437_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar437_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var444_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar444_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var445_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar445_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var444_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar444_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var445_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar445_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var520) => inst_game.receivelostBall_Ongame(var520));
	inst_game.bus.on('game?lostBallvar444', (var444, var521) => inst_game.receivelostBallvar444Ongame(var444, var521));
	inst_game.bus.on('game?nextLevel_', (var518) => inst_game.receivenextLevel_Ongame(var518));
	inst_game.bus.on('game?nextLevelvar445', (var445, var519) => inst_game.receivenextLevelvar445Ongame(var445, var519));
	inst_game.bus.on('game?lostBall__bis', (var524) => inst_game.receivelostBall__bisOngame(var524));
	inst_game.bus.on('game?lostBallvar444_bis', (var525, var444) => inst_game.receivelostBallvar444_bisOngame(var525, var444));
	inst_game.bus.on('game?nextLevel__bis', (var522) => inst_game.receivenextLevel__bisOngame(var522));
	inst_game.bus.on('game?nextLevelvar445_bis', (var445, var523) => inst_game.receivenextLevelvar445_bisOngame(var445, var523));
	/*Connecting ports...*/
	inst_ctrl.bus.on('controls?position_', (var500) => inst_game.receiveposition_Oncontroller(var500));
	inst_ctrl.bus.on('controls?positionvar440xy', (x, var440, var501, y) => inst_game.receivepositionvar440xyOncontroller(x, var440, var501, y));
	inst_ctrl.bus.on('controls?position__bis', (var504) => inst_game.receiveposition__bisOncontroller(var504));
	inst_ctrl.bus.on('controls?positionvar440xy_bis', (var505, var440, y, x) => inst_game.receivepositionvar440xy_bisOncontroller(var505, var440, y, x));
	inst_game.bus.on('ia?updateIApadypadxballx', (padx, pady, var510, ballx) => inst_ctrl.receiveupdateIApadypadxballxOngame(padx, pady, var510, ballx));
	inst_game.bus.on('ia?updateIAvar441bally', (var511, bally, var441) => inst_ctrl.receiveupdateIAvar441ballyOngame(var511, bally, var441));
	inst_game.bus.on('ia?updateIApadypadxballx_bis', (pady, var516, ballx, padx) => inst_ctrl.receiveupdateIApadypadxballx_bisOngame(pady, var516, ballx, padx));
	inst_game.bus.on('ia?updateIAvar441bally_bis', (var517, bally, var441) => inst_ctrl.receiveupdateIAvar441bally_bisOngame(var517, bally, var441));
	inst_disp.bus.on('display?displayReady_', (var458) => inst_game.receivedisplayReady_Ondisplay(var458));
	inst_disp.bus.on('display?displayReadyvar437', (var437, var459) => inst_game.receivedisplayReadyvar437Ondisplay(var437, var459));
	inst_disp.bus.on('display?displayError_', (var472) => inst_game.receivedisplayError_Ondisplay(var472));
	inst_disp.bus.on('display?displayErrorvar438', (var473, var438) => inst_game.receivedisplayErrorvar438Ondisplay(var473, var438));
	inst_disp.bus.on('display?displayReady__bis', (var482) => inst_game.receivedisplayReady__bisOndisplay(var482));
	inst_disp.bus.on('display?displayReadyvar437_bis', (var437, var483) => inst_game.receivedisplayReadyvar437_bisOndisplay(var437, var483));
	inst_disp.bus.on('display?displayError__bis', (var496) => inst_game.receivedisplayError__bisOndisplay(var496));
	inst_disp.bus.on('display?displayErrorvar438_bis', (var438, var497) => inst_game.receivedisplayErrorvar438_bisOndisplay(var438, var497));
	inst_game.bus.on('display?createysize', (var460, ysize) => inst_disp.receivecreateysizeOndisplay(var460, ysize));
	inst_game.bus.on('display?createvar434xsize', (xsize, var461, var434) => inst_disp.receivecreatevar434xsizeOndisplay(xsize, var461, var434));
	inst_game.bus.on('display?update_', (var456) => inst_disp.receiveupdate_Ondisplay(var456));
	inst_game.bus.on('display?updatevar436', (var457, var436) => inst_disp.receiveupdatevar436Ondisplay(var457, var436));
	inst_game.bus.on('display?clear_', (var454) => inst_disp.receiveclear_Ondisplay(var454));
	inst_game.bus.on('display?clearvar427', (var427, var455) => inst_disp.receiveclearvar427Ondisplay(var427, var455));
	inst_game.bus.on('display?setColorb', (b, var462) => inst_disp.receivesetColorbOndisplay(b, var462));
	inst_game.bus.on('display?setColorvar428gr', (r, g, var428, var463) => inst_disp.receivesetColorvar428grOndisplay(r, g, var428, var463));
	inst_game.bus.on('display?setBGColorrg', (r, var466, g) => inst_disp.receivesetBGColorrgOndisplay(r, var466, g));
	inst_game.bus.on('display?setBGColorvar429b', (var429, var467, b) => inst_disp.receivesetBGColorvar429bOndisplay(var429, var467, b));
	inst_game.bus.on('display?drawRectheightxwidth', (height, var452, width, x) => inst_disp.receivedrawRectheightxwidthOndisplay(height, var452, width, x));
	inst_game.bus.on('display?drawRectyvar430', (var430, var453, y) => inst_disp.receivedrawRectyvar430Ondisplay(var430, var453, y));
	inst_game.bus.on('display?fillRectxwidth', (var464, width, x) => inst_disp.receivefillRectxwidthOndisplay(var464, width, x));
	inst_game.bus.on('display?fillRectyheightvar431', (var431, y, var465, height) => inst_disp.receivefillRectyheightvar431Ondisplay(var431, y, var465, height));
	inst_game.bus.on('display?drawIntegerxscalevar432digits', (var468, digits, scale, var432, x) => inst_disp.receivedrawIntegerxscalevar432digitsOndisplay(var468, digits, scale, var432, x));
	inst_game.bus.on('display?drawIntegervy', (v, y, var469) => inst_disp.receivedrawIntegervyOndisplay(v, y, var469));
	inst_game.bus.on('display?drawThingMLvar433', (var450, var433) => inst_disp.receivedrawThingMLvar433Ondisplay(var450, var433));
	inst_game.bus.on('display?drawThingMLxy', (var451, x, y) => inst_disp.receivedrawThingMLxyOndisplay(var451, x, y));
	inst_game.bus.on('display?createysize_bis', (ysize, var484) => inst_disp.receivecreateysize_bisOndisplay(ysize, var484));
	inst_game.bus.on('display?createvar434xsize_bis', (var485, var434, xsize) => inst_disp.receivecreatevar434xsize_bisOndisplay(var485, var434, xsize));
	inst_game.bus.on('display?update__bis', (var480) => inst_disp.receiveupdate__bisOndisplay(var480));
	inst_game.bus.on('display?updatevar436_bis', (var436, var481) => inst_disp.receiveupdatevar436_bisOndisplay(var436, var481));
	inst_game.bus.on('display?clear__bis', (var478) => inst_disp.receiveclear__bisOndisplay(var478));
	inst_game.bus.on('display?clearvar427_bis', (var479, var427) => inst_disp.receiveclearvar427_bisOndisplay(var479, var427));
	inst_game.bus.on('display?setColorb_bis', (var486, b) => inst_disp.receivesetColorb_bisOndisplay(var486, b));
	inst_game.bus.on('display?setColorvar428gr_bis', (g, r, var428, var487) => inst_disp.receivesetColorvar428gr_bisOndisplay(g, r, var428, var487));
	inst_game.bus.on('display?setBGColorrg_bis', (g, r, var490) => inst_disp.receivesetBGColorrg_bisOndisplay(g, r, var490));
	inst_game.bus.on('display?setBGColorvar429b_bis', (var429, b, var491) => inst_disp.receivesetBGColorvar429b_bisOndisplay(var429, b, var491));
	inst_game.bus.on('display?drawRectheightxwidth_bis', (height, width, x, var476) => inst_disp.receivedrawRectheightxwidth_bisOndisplay(height, width, x, var476));
	inst_game.bus.on('display?drawRectyvar430_bis', (var430, var477, y) => inst_disp.receivedrawRectyvar430_bisOndisplay(var430, var477, y));
	inst_game.bus.on('display?fillRectxwidth_bis', (var488, width, x) => inst_disp.receivefillRectxwidth_bisOndisplay(var488, width, x));
	inst_game.bus.on('display?fillRectyheightvar431_bis', (height, var489, var431, y) => inst_disp.receivefillRectyheightvar431_bisOndisplay(height, var489, var431, y));
	inst_game.bus.on('display?drawIntegerxscalevar432digits_bis', (x, var492, digits, var432, scale) => inst_disp.receivedrawIntegerxscalevar432digits_bisOndisplay(x, var492, digits, var432, scale));
	inst_game.bus.on('display?drawIntegervy_bis', (var493, y, v) => inst_disp.receivedrawIntegervy_bisOndisplay(var493, y, v));
	inst_game.bus.on('display?drawThingMLvar433_bis', (var474, var433) => inst_disp.receivedrawThingMLvar433_bisOndisplay(var474, var433));
	inst_game.bus.on('display?drawThingMLxy_bis', (x, var475, y) => inst_disp.receivedrawThingMLxy_bisOndisplay(x, var475, y));
	inst_timer.bus.on('timer?timer_timeout', (var447, id, var426) => inst_game.receivetimer_timeoutOnclock(var447, id, var426));
	inst_game.bus.on('clock?timer_start', (var424, id, time, var449) => inst_timer.receivetimer_startOntimer(var424, id, time, var449));
	inst_game.bus.on('clock?timer_cancel', (id, var448, var425) => inst_timer.receivetimer_cancelOntimer(id, var448, var425));
	
	inst_disp._init();
	inst_timer._init();
	inst_game._init();
	inst_ctrl._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

