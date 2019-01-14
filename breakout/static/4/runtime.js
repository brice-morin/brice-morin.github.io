'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_val274_var(0);inst_disp.initDisplay_SC_Wait_received_display_createysizexsize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createval274_var(false);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val268_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorrb_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorgval268_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_val269_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorrb_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorgval269_var(false);inst_disp.initDisplay_SC_Running_display_clear_val267_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval267_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_val270_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRect__var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectwidthyxheightval270_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_val271_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectval271height_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectyxwidth_var(false);inst_disp.initDisplay_SC_Running_display_update_val276_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval276_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_val272_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerval272scaleydigits_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegervx_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_val273_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLval273x_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val275_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval275_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_sound = new SoundControllerBrowser('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_sound_tone_val284_var(0);inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_received_sound_tonetimeval284_var(false);inst_sound.initSound_behavior_INIT_received_sound_tonefreq_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_bgcolor = [];var inst_game_bricks = [];var inst_game_fgcolor = [];inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val285_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval285_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val286_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval286_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val285_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval285_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val286_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval286_var(false);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_val280_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_received_controller_positiony_var(false);inst_game.initBreakoutGame_SC_received_controller_positionval280x_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val277_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval277_var(false);
	const inst_ctrl = new VelocityController('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_val279_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocitydy_var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocityval279dx_var(false);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_val280_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positiony_var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionval280x_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val328) => inst_game.receivelostBall_Ongame(val328));
	inst_game.bus.on('game?lostBallval285', (val329, val285) => inst_game.receivelostBallval285Ongame(val329, val285));
	inst_game.bus.on('game?nextLevel_', (val326) => inst_game.receivenextLevel_Ongame(val326));
	inst_game.bus.on('game?nextLevelval286', (val327, val286) => inst_game.receivenextLevelval286Ongame(val327, val286));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (val266, val287, id) => inst_game.receivetimer_timeoutOnclock(val266, val287, id));
	inst_game.bus.on('clock?timer_start', (time, val288, id, val264) => inst_timer.receivetimer_startOntimer(time, val288, id, val264));
	inst_game.bus.on('clock?timer_cancel', (val289, val265, id) => inst_timer.receivetimer_cancelOntimer(val289, val265, id));
	inst_timer.bus.on('timer?timer_timeout', (val266, val287, id) => inst_ctrl.receivetimer_timeoutOnclock(val266, val287, id));
	inst_ctrl.bus.on('clock?timer_start', (time, val288, id, val264) => inst_timer.receivetimer_startOntimer(time, val288, id, val264));
	inst_ctrl.bus.on('clock?timer_cancel', (val289, val265, id) => inst_timer.receivetimer_cancelOntimer(val289, val265, id));
	inst_ctrl.bus.on('controls?positiony', (y, val316) => inst_game.receivepositionyOncontroller(y, val316));
	inst_ctrl.bus.on('controls?positionval280x', (val280, val317, x) => inst_game.receivepositionval280xOncontroller(val280, val317, x));
	inst_disp.bus.on('display?displayReady_', (val298) => inst_game.receivedisplayReady_Ondisplay(val298));
	inst_disp.bus.on('display?displayReadyval277', (val299, val277) => inst_game.receivedisplayReadyval277Ondisplay(val299, val277));
	inst_disp.bus.on('display?displayError_', (val304) => inst_game.receivedisplayError_Ondisplay(val304));
	inst_disp.bus.on('display?displayErrorval278', (val278, val305) => inst_game.receivedisplayErrorval278Ondisplay(val278, val305));
	inst_game.bus.on('display?createysizexsize', (xsize, val294, ysize) => inst_disp.receivecreateysizexsizeOndisplay(xsize, val294, ysize));
	inst_game.bus.on('display?createval274', (val295, val274) => inst_disp.receivecreateval274Ondisplay(val295, val274));
	inst_game.bus.on('display?update_', (val312) => inst_disp.receiveupdate_Ondisplay(val312));
	inst_game.bus.on('display?updateval276', (val276, val313) => inst_disp.receiveupdateval276Ondisplay(val276, val313));
	inst_game.bus.on('display?clear_', (val300) => inst_disp.receiveclear_Ondisplay(val300));
	inst_game.bus.on('display?clearval267', (val301, val267) => inst_disp.receiveclearval267Ondisplay(val301, val267));
	inst_game.bus.on('display?setColorrb', (r, val308, b) => inst_disp.receivesetColorrbOndisplay(r, val308, b));
	inst_game.bus.on('display?setColorgval268', (g, val268, val309) => inst_disp.receivesetColorgval268Ondisplay(g, val268, val309));
	inst_game.bus.on('display?setBGColorrb', (val310, b, r) => inst_disp.receivesetBGColorrbOndisplay(val310, b, r));
	inst_game.bus.on('display?setBGColorgval269', (val269, g, val311) => inst_disp.receivesetBGColorgval269Ondisplay(val269, g, val311));
	inst_game.bus.on('display?drawRect_', (val302) => inst_disp.receivedrawRect_Ondisplay(val302));
	inst_game.bus.on('display?drawRectwidthyxheightval270', (height, x, width, val270, val303, y) => inst_disp.receivedrawRectwidthyxheightval270Ondisplay(height, x, width, val270, val303, y));
	inst_game.bus.on('display?fillRectval271height', (val292, val271, height) => inst_disp.receivefillRectval271heightOndisplay(val292, val271, height));
	inst_game.bus.on('display?fillRectyxwidth', (y, val293, x, width) => inst_disp.receivefillRectyxwidthOndisplay(y, val293, x, width));
	inst_game.bus.on('display?drawIntegerval272scaleydigits', (val272, scale, val306, digits, y) => inst_disp.receivedrawIntegerval272scaleydigitsOndisplay(val272, scale, val306, digits, y));
	inst_game.bus.on('display?drawIntegervx', (val307, v, x) => inst_disp.receivedrawIntegervxOndisplay(val307, v, x));
	inst_game.bus.on('display?drawThingMLval273x', (val290, val273, x) => inst_disp.receivedrawThingMLval273xOndisplay(val290, val273, x));
	inst_game.bus.on('display?drawThingMLy', (y, val291) => inst_disp.receivedrawThingMLyOndisplay(y, val291));
	inst_game.bus.on('sound?tonetimeval284', (val284, val324, time) => inst_sound.receivetonetimeval284Onsound(val284, val324, time));
	inst_game.bus.on('sound?tonefreq', (freq, val325) => inst_sound.receivetonefreqOnsound(freq, val325));
	inst_disp.bus.on('vctrl?velocitydy', (dy, val314) => inst_ctrl.receivevelocitydyOnctrl_in(dy, val314));
	inst_disp.bus.on('vctrl?velocityval279dx', (val315, dx, val279) => inst_ctrl.receivevelocityval279dxOnctrl_in(val315, dx, val279));
	inst_disp.bus.on('vctrl?positiony', (y, val316) => inst_ctrl.receivepositionyOnctrl_in(y, val316));
	inst_disp.bus.on('vctrl?positionval280x', (val280, val317, x) => inst_ctrl.receivepositionval280xOnctrl_in(val280, val317, x));
	
	inst_timer._init();
	inst_disp._init();
	inst_sound._init();
	inst_ctrl._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

