'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_fgcolor = [];var inst_game_bgcolor = [];var inst_game_bricks = [];inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_val148_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_received_controller_positionx_var(false);inst_game.initBreakoutGame_SC_received_controller_positionval148y_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val152_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval152_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val153_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval153_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val152_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval152_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val153_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval153_var(false);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val145_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval145_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_val142_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_received_display_createxsize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createval142ysize_var(false);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val136_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorgbr_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorval136_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_val137_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorrval137_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorgb_var(false);inst_disp.initDisplay_SC_Running_display_clear_val135_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval135_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_val138_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectwidthval138heightx_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRecty_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_val139_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectxyval139_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectheightwidth_var(false);inst_disp.initDisplay_SC_Running_display_update_val144_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval144_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_val140_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerdigitsxscale_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegeryvval140_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_val141_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingML__var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLyval141x_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val143_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval143_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_val149_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIA__var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAballxballypadyval149padx_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val194) => inst_game.receivelostBall_Ongame(val194));
	inst_game.bus.on('game?lostBallval152', (val152, val195) => inst_game.receivelostBallval152Ongame(val152, val195));
	inst_game.bus.on('game?nextLevel_', (val192) => inst_game.receivenextLevel_Ongame(val192));
	inst_game.bus.on('game?nextLevelval153', (val153, val193) => inst_game.receivenextLevelval153Ongame(val153, val193));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (id, val134, val155) => inst_game.receivetimer_timeoutOnclock(id, val134, val155));
	inst_game.bus.on('clock?timer_start', (val132, id, val157, time) => inst_timer.receivetimer_startOntimer(val132, id, val157, time));
	inst_game.bus.on('clock?timer_cancel', (id, val133, val156) => inst_timer.receivetimer_cancelOntimer(id, val133, val156));
	inst_game.bus.on('ia?updateIA_', (val190) => inst_ctrl.receiveupdateIA_Ongame(val190));
	inst_game.bus.on('ia?updateIAballxballypadyval149padx', (val191, bally, ballx, pady, padx, val149) => inst_ctrl.receiveupdateIAballxballypadyval149padxOngame(val191, bally, ballx, pady, padx, val149));
	inst_ctrl.bus.on('controls?positionx', (val184, x) => inst_game.receivepositionxOncontroller(val184, x));
	inst_ctrl.bus.on('controls?positionval148y', (y, val148, val185) => inst_game.receivepositionval148yOncontroller(y, val148, val185));
	inst_disp.bus.on('display?displayReady_', (val176) => inst_game.receivedisplayReady_Ondisplay(val176));
	inst_disp.bus.on('display?displayReadyval145', (val145, val177) => inst_game.receivedisplayReadyval145Ondisplay(val145, val177));
	inst_disp.bus.on('display?displayError_', (val166) => inst_game.receivedisplayError_Ondisplay(val166));
	inst_disp.bus.on('display?displayErrorval146', (val167, val146) => inst_game.receivedisplayErrorval146Ondisplay(val167, val146));
	inst_game.bus.on('display?createxsize', (val180, xsize) => inst_disp.receivecreatexsizeOndisplay(val180, xsize));
	inst_game.bus.on('display?createval142ysize', (val181, val142, ysize) => inst_disp.receivecreateval142ysizeOndisplay(val181, val142, ysize));
	inst_game.bus.on('display?update_', (val178) => inst_disp.receiveupdate_Ondisplay(val178));
	inst_game.bus.on('display?updateval144', (val144, val179) => inst_disp.receiveupdateval144Ondisplay(val144, val179));
	inst_game.bus.on('display?clear_', (val170) => inst_disp.receiveclear_Ondisplay(val170));
	inst_game.bus.on('display?clearval135', (val171, val135) => inst_disp.receiveclearval135Ondisplay(val171, val135));
	inst_game.bus.on('display?setColorgbr', (r, b, val162, g) => inst_disp.receivesetColorgbrOndisplay(r, b, val162, g));
	inst_game.bus.on('display?setColorval136', (val163, val136) => inst_disp.receivesetColorval136Ondisplay(val163, val136));
	inst_game.bus.on('display?setBGColorrval137', (r, val137, val158) => inst_disp.receivesetBGColorrval137Ondisplay(r, val137, val158));
	inst_game.bus.on('display?setBGColorgb', (val159, g, b) => inst_disp.receivesetBGColorgbOndisplay(val159, g, b));
	inst_game.bus.on('display?drawRectwidthval138heightx', (val138, width, x, height, val174) => inst_disp.receivedrawRectwidthval138heightxOndisplay(val138, width, x, height, val174));
	inst_game.bus.on('display?drawRecty', (y, val175) => inst_disp.receivedrawRectyOndisplay(y, val175));
	inst_game.bus.on('display?fillRectxyval139', (x, val139, y, val172) => inst_disp.receivefillRectxyval139Ondisplay(x, val139, y, val172));
	inst_game.bus.on('display?fillRectheightwidth', (val173, width, height) => inst_disp.receivefillRectheightwidthOndisplay(val173, width, height));
	inst_game.bus.on('display?drawIntegerdigitsxscale', (scale, digits, val160, x) => inst_disp.receivedrawIntegerdigitsxscaleOndisplay(scale, digits, val160, x));
	inst_game.bus.on('display?drawIntegeryvval140', (val161, v, y, val140) => inst_disp.receivedrawIntegeryvval140Ondisplay(val161, v, y, val140));
	inst_game.bus.on('display?drawThingML_', (val164) => inst_disp.receivedrawThingML_Ondisplay(val164));
	inst_game.bus.on('display?drawThingMLyval141x', (val141, x, val165, y) => inst_disp.receivedrawThingMLyval141xOndisplay(val141, x, val165, y));
	
	inst_timer._init();
	inst_ctrl._init();
	inst_disp._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

