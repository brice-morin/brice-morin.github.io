'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_bricks = [];var inst_game_fgcolor = [];var inst_game_bgcolor = [];inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val13_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval13_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val20_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval20_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val21_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval21_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val20_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval20_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val21_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval21_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_controller_position_val16_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_received_controller_positionval16_var(false);inst_game.initBreakoutGame_SC_received_controller_positionyx_var(false);
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_val17_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIA__var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val4_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorbrval4_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorg_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_val5_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorb_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorval5rg_var(false);inst_disp.initDisplay_SC_Running_display_clear_val3_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval3_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_val6_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectheight_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectyval6xwidth_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_val7_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectheightxval7_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectywidth_var(false);inst_disp.initDisplay_SC_Running_display_update_val12_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval12_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_val8_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerx_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegervdigitsscaleval8y_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_val9_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLval9_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLxy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val11_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval11_var(false);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_val10_var(0);inst_disp.initDisplay_SC_Wait_received_display_create__var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizeysizeval10_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val62) => inst_game.receivelostBall_Ongame(val62));
	inst_game.bus.on('game?lostBallval20', (val20, val63) => inst_game.receivelostBallval20Ongame(val20, val63));
	inst_game.bus.on('game?nextLevel_', (val60) => inst_game.receivenextLevel_Ongame(val60));
	inst_game.bus.on('game?nextLevelval21', (val61, val21) => inst_game.receivenextLevelval21Ongame(val61, val21));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (val24, val2, id) => inst_game.receivetimer_timeoutOnclock(val24, val2, id));
	inst_game.bus.on('clock?timer_start', (id, val25, time, val0) => inst_timer.receivetimer_startOntimer(id, val25, time, val0));
	inst_game.bus.on('clock?timer_cancel', (id, val23, val1) => inst_timer.receivetimer_cancelOntimer(id, val23, val1));
	inst_ctrl.bus.on('controls?positionval16', (val16, val50) => inst_game.receivepositionval16Oncontroller(val16, val50));
	inst_ctrl.bus.on('controls?positionyx', (y, x, val51) => inst_game.receivepositionyxOncontroller(y, x, val51));
	inst_game.bus.on('ia?updateIA_', (val56) => inst_ctrl.receiveupdateIA_Ongame(val56));
	inst_game.bus.on('ia?updateIAballypadyballxpadxval17', (val17, padx, ballx, bally, pady, val57) => inst_ctrl.receiveupdateIAballypadyballxpadxval17Ongame(val17, padx, ballx, bally, pady, val57));
	inst_disp.bus.on('display?displayReady_', (val38) => inst_game.receivedisplayReady_Ondisplay(val38));
	inst_disp.bus.on('display?displayReadyval13', (val39, val13) => inst_game.receivedisplayReadyval13Ondisplay(val39, val13));
	inst_disp.bus.on('display?displayError_', (val26) => inst_game.receivedisplayError_Ondisplay(val26));
	inst_disp.bus.on('display?displayErrorval14', (val14, val27) => inst_game.receivedisplayErrorval14Ondisplay(val14, val27));
	inst_game.bus.on('display?create_', (val40) => inst_disp.receivecreate_Ondisplay(val40));
	inst_game.bus.on('display?createxsizeysizeval10', (xsize, val10, val41, ysize) => inst_disp.receivecreatexsizeysizeval10Ondisplay(xsize, val10, val41, ysize));
	inst_game.bus.on('display?update_', (val34) => inst_disp.receiveupdate_Ondisplay(val34));
	inst_game.bus.on('display?updateval12', (val12, val35) => inst_disp.receiveupdateval12Ondisplay(val12, val35));
	inst_game.bus.on('display?clear_', (val48) => inst_disp.receiveclear_Ondisplay(val48));
	inst_game.bus.on('display?clearval3', (val3, val49) => inst_disp.receiveclearval3Ondisplay(val3, val49));
	inst_game.bus.on('display?setColorbrval4', (r, val4, val42, b) => inst_disp.receivesetColorbrval4Ondisplay(r, val4, val42, b));
	inst_game.bus.on('display?setColorg', (val43, g) => inst_disp.receivesetColorgOndisplay(val43, g));
	inst_game.bus.on('display?setBGColorb', (b, val28) => inst_disp.receivesetBGColorbOndisplay(b, val28));
	inst_game.bus.on('display?setBGColorval5rg', (g, r, val5, val29) => inst_disp.receivesetBGColorval5rgOndisplay(g, r, val5, val29));
	inst_game.bus.on('display?drawRectheight', (height, val44) => inst_disp.receivedrawRectheightOndisplay(height, val44));
	inst_game.bus.on('display?drawRectyval6xwidth', (x, y, val6, width, val45) => inst_disp.receivedrawRectyval6xwidthOndisplay(x, y, val6, width, val45));
	inst_game.bus.on('display?fillRectheightxval7', (height, val46, val7, x) => inst_disp.receivefillRectheightxval7Ondisplay(height, val46, val7, x));
	inst_game.bus.on('display?fillRectywidth', (y, val47, width) => inst_disp.receivefillRectywidthOndisplay(y, val47, width));
	inst_game.bus.on('display?drawIntegerx', (val36, x) => inst_disp.receivedrawIntegerxOndisplay(val36, x));
	inst_game.bus.on('display?drawIntegervdigitsscaleval8y', (val37, v, scale, val8, digits, y) => inst_disp.receivedrawIntegervdigitsscaleval8yOndisplay(val37, v, scale, val8, digits, y));
	inst_game.bus.on('display?drawThingMLval9', (val9, val32) => inst_disp.receivedrawThingMLval9Ondisplay(val9, val32));
	inst_game.bus.on('display?drawThingMLxy', (val33, x, y) => inst_disp.receivedrawThingMLxyOndisplay(val33, x, y));
	
	inst_timer._init();
	inst_ctrl._init();
	inst_disp._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

