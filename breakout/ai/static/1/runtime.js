'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_bgcolor = [];var inst_game_bricks = [];var inst_game_fgcolor = [];inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_val82_var(0);inst_game.initBreakoutGame_SC_received_controller_positionxy_var(false);inst_game.initBreakoutGame_SC_received_controller_positionval82_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val86_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval86_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val87_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval87_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val86_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval86_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val87_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval87_var(false);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val79_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval79_var(false);
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_val83_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAbally_var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_val76_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_received_display_create__var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizeval76ysize_var(false);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val70_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorbg_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorval70r_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_val71_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorval71g_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorrb_var(false);inst_disp.initDisplay_SC_Running_display_clear_val69_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval69_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_val72_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRect__var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectywidthxheightval72_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_val73_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectyheightx_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectval73width_var(false);inst_disp.initDisplay_SC_Running_display_update_val78_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval78_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_val74_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerdigitsval74scalex_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegeryv_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_val75_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLx_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLval75y_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val77_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval77_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val126) => inst_game.receivelostBall_Ongame(val126));
	inst_game.bus.on('game?lostBallval86', (val127, val86) => inst_game.receivelostBallval86Ongame(val127, val86));
	inst_game.bus.on('game?nextLevel_', (val128) => inst_game.receivenextLevel_Ongame(val128));
	inst_game.bus.on('game?nextLevelval87', (val87, val129) => inst_game.receivenextLevelval87Ongame(val87, val129));
	/*Connecting ports...*/
	inst_ctrl.bus.on('controls?positionxy', (y, val118, x) => inst_game.receivepositionxyOncontroller(y, val118, x));
	inst_ctrl.bus.on('controls?positionval82', (val82, val119) => inst_game.receivepositionval82Oncontroller(val82, val119));
	inst_game.bus.on('ia?updateIAbally', (bally, val122) => inst_ctrl.receiveupdateIAballyOngame(bally, val122));
	inst_game.bus.on('ia?updateIApadyval83padxballx', (val123, pady, val83, ballx, padx) => inst_ctrl.receiveupdateIApadyval83padxballxOngame(val123, pady, val83, ballx, padx));
	inst_timer.bus.on('timer?timer_timeout', (id, val91, val68) => inst_game.receivetimer_timeoutOnclock(id, val91, val68));
	inst_game.bus.on('clock?timer_start', (time, id, val89, val66) => inst_timer.receivetimer_startOntimer(time, id, val89, val66));
	inst_game.bus.on('clock?timer_cancel', (id, val67, val90) => inst_timer.receivetimer_cancelOntimer(id, val67, val90));
	inst_disp.bus.on('display?displayReady_', (val104) => inst_game.receivedisplayReady_Ondisplay(val104));
	inst_disp.bus.on('display?displayReadyval79', (val79, val105) => inst_game.receivedisplayReadyval79Ondisplay(val79, val105));
	inst_disp.bus.on('display?displayError_', (val96) => inst_game.receivedisplayError_Ondisplay(val96));
	inst_disp.bus.on('display?displayErrorval80', (val80, val97) => inst_game.receivedisplayErrorval80Ondisplay(val80, val97));
	inst_game.bus.on('display?create_', (val102) => inst_disp.receivecreate_Ondisplay(val102));
	inst_game.bus.on('display?createxsizeval76ysize', (xsize, val103, val76, ysize) => inst_disp.receivecreatexsizeval76ysizeOndisplay(xsize, val103, val76, ysize));
	inst_game.bus.on('display?update_', (val114) => inst_disp.receiveupdate_Ondisplay(val114));
	inst_game.bus.on('display?updateval78', (val78, val115) => inst_disp.receiveupdateval78Ondisplay(val78, val115));
	inst_game.bus.on('display?clear_', (val106) => inst_disp.receiveclear_Ondisplay(val106));
	inst_game.bus.on('display?clearval69', (val107, val69) => inst_disp.receiveclearval69Ondisplay(val107, val69));
	inst_game.bus.on('display?setColorbg', (g, val112, b) => inst_disp.receivesetColorbgOndisplay(g, val112, b));
	inst_game.bus.on('display?setColorval70r', (r, val113, val70) => inst_disp.receivesetColorval70rOndisplay(r, val113, val70));
	inst_game.bus.on('display?setBGColorval71g', (g, val71, val100) => inst_disp.receivesetBGColorval71gOndisplay(g, val71, val100));
	inst_game.bus.on('display?setBGColorrb', (b, r, val101) => inst_disp.receivesetBGColorrbOndisplay(b, r, val101));
	inst_game.bus.on('display?drawRect_', (val94) => inst_disp.receivedrawRect_Ondisplay(val94));
	inst_game.bus.on('display?drawRectywidthxheightval72', (width, val72, y, val95, x, height) => inst_disp.receivedrawRectywidthxheightval72Ondisplay(width, val72, y, val95, x, height));
	inst_game.bus.on('display?fillRectyheightx', (val108, x, height, y) => inst_disp.receivefillRectyheightxOndisplay(val108, x, height, y));
	inst_game.bus.on('display?fillRectval73width', (width, val109, val73) => inst_disp.receivefillRectval73widthOndisplay(width, val109, val73));
	inst_game.bus.on('display?drawIntegerdigitsval74scalex', (digits, x, scale, val92, val74) => inst_disp.receivedrawIntegerdigitsval74scalexOndisplay(digits, x, scale, val92, val74));
	inst_game.bus.on('display?drawIntegeryv', (y, val93, v) => inst_disp.receivedrawIntegeryvOndisplay(y, val93, v));
	inst_game.bus.on('display?drawThingMLx', (x, val98) => inst_disp.receivedrawThingMLxOndisplay(x, val98));
	inst_game.bus.on('display?drawThingMLval75y', (val75, val99, y) => inst_disp.receivedrawThingMLval75yOndisplay(val75, val99, y));
	
	inst_ctrl._init();
	inst_timer._init();
	inst_disp._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

