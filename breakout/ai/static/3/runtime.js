'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_fgcolor = [];var inst_game_bricks = [];var inst_game_bgcolor = [];inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_controller_position_val214_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_received_controller_positionval214x_var(false);inst_game.initBreakoutGame_SC_received_controller_positiony_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val218_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval218_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val219_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval219_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val218_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval218_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val219_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval219_var(false);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val211_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval211_var(false);
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_val215_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAbally_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val202_var(0);inst_disp.initDisplay_SC_Running_received_display_setColor__var(false);inst_disp.initDisplay_SC_Running_received_display_setColorbrgval202_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_val203_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorb_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorval203gr_var(false);inst_disp.initDisplay_SC_Running_display_clear_val201_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval201_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_val204_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectheightwidth_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectyxval204_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_val205_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectval205_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectwidthxheighty_var(false);inst_disp.initDisplay_SC_Running_display_update_val210_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval210_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_val206_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegervxscaley_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegerval206digits_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_val207_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLval207x_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val209_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval209_var(false);inst_disp.initDisplay_SC_Wait_display_create_val208_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_received_display_createval208_var(false);inst_disp.initDisplay_SC_Wait_received_display_createysizexsize_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val258) => inst_game.receivelostBall_Ongame(val258));
	inst_game.bus.on('game?lostBallval218', (val218, val259) => inst_game.receivelostBallval218Ongame(val218, val259));
	inst_game.bus.on('game?nextLevel_', (val260) => inst_game.receivenextLevel_Ongame(val260));
	inst_game.bus.on('game?nextLevelval219', (val261, val219) => inst_game.receivenextLevelval219Ongame(val261, val219));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (id, val200, val221) => inst_game.receivetimer_timeoutOnclock(id, val200, val221));
	inst_game.bus.on('clock?timer_start', (val223, id, val198, time) => inst_timer.receivetimer_startOntimer(val223, id, val198, time));
	inst_game.bus.on('clock?timer_cancel', (id, val222, val199) => inst_timer.receivetimer_cancelOntimer(id, val222, val199));
	inst_ctrl.bus.on('controls?positionval214x', (val214, x, val248) => inst_game.receivepositionval214xOncontroller(val214, x, val248));
	inst_ctrl.bus.on('controls?positiony', (val249, y) => inst_game.receivepositionyOncontroller(val249, y));
	inst_game.bus.on('ia?updateIApadypadxballxval215', (val254, pady, padx, ballx, val215) => inst_ctrl.receiveupdateIApadypadxballxval215Ongame(val254, pady, padx, ballx, val215));
	inst_game.bus.on('ia?updateIAbally', (val255, bally) => inst_ctrl.receiveupdateIAballyOngame(val255, bally));
	inst_disp.bus.on('display?displayReady_', (val244) => inst_game.receivedisplayReady_Ondisplay(val244));
	inst_disp.bus.on('display?displayReadyval211', (val245, val211) => inst_game.receivedisplayReadyval211Ondisplay(val245, val211));
	inst_disp.bus.on('display?displayError_', (val236) => inst_game.receivedisplayError_Ondisplay(val236));
	inst_disp.bus.on('display?displayErrorval212', (val212, val237) => inst_game.receivedisplayErrorval212Ondisplay(val212, val237));
	inst_game.bus.on('display?createval208', (val230, val208) => inst_disp.receivecreateval208Ondisplay(val230, val208));
	inst_game.bus.on('display?createysizexsize', (ysize, val231, xsize) => inst_disp.receivecreateysizexsizeOndisplay(ysize, val231, xsize));
	inst_game.bus.on('display?update_', (val226) => inst_disp.receiveupdate_Ondisplay(val226));
	inst_game.bus.on('display?updateval210', (val210, val227) => inst_disp.receiveupdateval210Ondisplay(val210, val227));
	inst_game.bus.on('display?clear_', (val232) => inst_disp.receiveclear_Ondisplay(val232));
	inst_game.bus.on('display?clearval201', (val201, val233) => inst_disp.receiveclearval201Ondisplay(val201, val233));
	inst_game.bus.on('display?setColor_', (val228) => inst_disp.receivesetColor_Ondisplay(val228));
	inst_game.bus.on('display?setColorbrgval202', (val229, b, g, r, val202) => inst_disp.receivesetColorbrgval202Ondisplay(val229, b, g, r, val202));
	inst_game.bus.on('display?setBGColorb', (b, val246) => inst_disp.receivesetBGColorbOndisplay(b, val246));
	inst_game.bus.on('display?setBGColorval203gr', (val247, val203, r, g) => inst_disp.receivesetBGColorval203grOndisplay(val247, val203, r, g));
	inst_game.bus.on('display?drawRectheightwidth', (width, height, val234) => inst_disp.receivedrawRectheightwidthOndisplay(width, height, val234));
	inst_game.bus.on('display?drawRectyxval204', (val204, x, y, val235) => inst_disp.receivedrawRectyxval204Ondisplay(val204, x, y, val235));
	inst_game.bus.on('display?fillRectval205', (val205, val242) => inst_disp.receivefillRectval205Ondisplay(val205, val242));
	inst_game.bus.on('display?fillRectwidthxheighty', (width, height, y, val243, x) => inst_disp.receivefillRectwidthxheightyOndisplay(width, height, y, val243, x));
	inst_game.bus.on('display?drawIntegervxscaley', (scale, val238, y, v, x) => inst_disp.receivedrawIntegervxscaleyOndisplay(scale, val238, y, v, x));
	inst_game.bus.on('display?drawIntegerval206digits', (digits, val206, val239) => inst_disp.receivedrawIntegerval206digitsOndisplay(digits, val206, val239));
	inst_game.bus.on('display?drawThingMLval207x', (x, val224, val207) => inst_disp.receivedrawThingMLval207xOndisplay(x, val224, val207));
	inst_game.bus.on('display?drawThingMLy', (y, val225) => inst_disp.receivedrawThingMLyOndisplay(y, val225));
	
	inst_timer._init();
	inst_ctrl._init();
	inst_disp._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

