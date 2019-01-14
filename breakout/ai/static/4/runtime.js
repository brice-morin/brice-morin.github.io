'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_val281_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAballx_var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_val274_var(0);inst_disp.initDisplay_SC_Wait_received_display_createxsize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createysizeval274_var(false);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val268_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorr_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorbval268g_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_val269_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorrg_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorval269b_var(false);inst_disp.initDisplay_SC_Running_display_clear_val267_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval267_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_val270_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRect__var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectwidthheightval270xy_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_val271_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRect__var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectyxwidthval271height_var(false);inst_disp.initDisplay_SC_Running_display_update_val276_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval276_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_val272_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerscaleyx_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegerval272digitsv_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_val273_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLval273_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLyx_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val275_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval275_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_fgcolor = [];var inst_game_bgcolor = [];var inst_game_bricks = [];inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_val280_var(0);inst_game.initBreakoutGame_SC_received_controller_positiony_var(false);inst_game.initBreakoutGame_SC_received_controller_positionxval280_var(false);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val277_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval277_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val284_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval284_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val285_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval285_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val284_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval284_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val285_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval285_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val326) => inst_game.receivelostBall_Ongame(val326));
	inst_game.bus.on('game?lostBallval284', (val284, val327) => inst_game.receivelostBallval284Ongame(val284, val327));
	inst_game.bus.on('game?nextLevel_', (val324) => inst_game.receivenextLevel_Ongame(val324));
	inst_game.bus.on('game?nextLevelval285', (val325, val285) => inst_game.receivenextLevelval285Ongame(val325, val285));
	/*Connecting ports...*/
	inst_ctrl.bus.on('controls?positiony', (val316, y) => inst_game.receivepositionyOncontroller(val316, y));
	inst_ctrl.bus.on('controls?positionxval280', (x, val317, val280) => inst_game.receivepositionxval280Oncontroller(x, val317, val280));
	inst_timer.bus.on('timer?timer_timeout', (id, val289, val266) => inst_game.receivetimer_timeoutOnclock(id, val289, val266));
	inst_game.bus.on('clock?timer_start', (val288, id, time, val264) => inst_timer.receivetimer_startOntimer(val288, id, time, val264));
	inst_game.bus.on('clock?timer_cancel', (val287, val265, id) => inst_timer.receivetimer_cancelOntimer(val287, val265, id));
	inst_disp.bus.on('display?displayReady_', (val302) => inst_game.receivedisplayReady_Ondisplay(val302));
	inst_disp.bus.on('display?displayReadyval277', (val277, val303) => inst_game.receivedisplayReadyval277Ondisplay(val277, val303));
	inst_disp.bus.on('display?displayError_', (val306) => inst_game.receivedisplayError_Ondisplay(val306));
	inst_disp.bus.on('display?displayErrorval278', (val307, val278) => inst_game.receivedisplayErrorval278Ondisplay(val307, val278));
	inst_game.bus.on('display?createxsize', (xsize, val300) => inst_disp.receivecreatexsizeOndisplay(xsize, val300));
	inst_game.bus.on('display?createysizeval274', (ysize, val274, val301) => inst_disp.receivecreateysizeval274Ondisplay(ysize, val274, val301));
	inst_game.bus.on('display?update_', (val310) => inst_disp.receiveupdate_Ondisplay(val310));
	inst_game.bus.on('display?updateval276', (val311, val276) => inst_disp.receiveupdateval276Ondisplay(val311, val276));
	inst_game.bus.on('display?clear_', (val290) => inst_disp.receiveclear_Ondisplay(val290));
	inst_game.bus.on('display?clearval267', (val291, val267) => inst_disp.receiveclearval267Ondisplay(val291, val267));
	inst_game.bus.on('display?setColorr', (val304, r) => inst_disp.receivesetColorrOndisplay(val304, r));
	inst_game.bus.on('display?setColorbval268g', (b, val268, val305, g) => inst_disp.receivesetColorbval268gOndisplay(b, val268, val305, g));
	inst_game.bus.on('display?setBGColorrg', (r, g, val296) => inst_disp.receivesetBGColorrgOndisplay(r, g, val296));
	inst_game.bus.on('display?setBGColorval269b', (val269, b, val297) => inst_disp.receivesetBGColorval269bOndisplay(val269, b, val297));
	inst_game.bus.on('display?drawRect_', (val294) => inst_disp.receivedrawRect_Ondisplay(val294));
	inst_game.bus.on('display?drawRectwidthheightval270xy', (val270, x, width, val295, y, height) => inst_disp.receivedrawRectwidthheightval270xyOndisplay(val270, x, width, val295, y, height));
	inst_game.bus.on('display?fillRect_', (val298) => inst_disp.receivefillRect_Ondisplay(val298));
	inst_game.bus.on('display?fillRectyxwidthval271height', (x, width, height, val271, val299, y) => inst_disp.receivefillRectyxwidthval271heightOndisplay(x, width, height, val271, val299, y));
	inst_game.bus.on('display?drawIntegerscaleyx', (val292, x, y, scale) => inst_disp.receivedrawIntegerscaleyxOndisplay(val292, x, y, scale));
	inst_game.bus.on('display?drawIntegerval272digitsv', (val272, val293, digits, v) => inst_disp.receivedrawIntegerval272digitsvOndisplay(val272, val293, digits, v));
	inst_game.bus.on('display?drawThingMLval273', (val273, val312) => inst_disp.receivedrawThingMLval273Ondisplay(val273, val312));
	inst_game.bus.on('display?drawThingMLyx', (val313, y, x) => inst_disp.receivedrawThingMLyxOndisplay(val313, y, x));
	inst_game.bus.on('ia?updateIAballx', (val320, ballx) => inst_ctrl.receiveupdateIAballxOngame(val320, ballx));
	inst_game.bus.on('ia?updateIApadyval281padxbally', (padx, val321, bally, pady, val281) => inst_ctrl.receiveupdateIApadyval281padxballyOngame(padx, val321, bally, pady, val281));
	
	inst_timer._init();
	inst_disp._init();
	inst_game._init();
	inst_ctrl._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

