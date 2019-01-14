'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_ctrl = new VelocityController('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_val213_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocitydy_var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocitydxval213_var(false);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_val214_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_position__var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionxyval214_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val202_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorgr_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorbval202_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_val203_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorbrg_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorval203_var(false);inst_disp.initDisplay_SC_Running_display_clear_val201_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval201_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_val204_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectheightx_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectwidthval204y_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_val205_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectywidthval205height_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectx_var(false);inst_disp.initDisplay_SC_Running_display_update_val210_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval210_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_val206_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerval206xv_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegeryscaledigits_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_val207_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingML__var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLval207yx_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val209_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval209_var(false);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_val208_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_received_display_createxsize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createval208ysize_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_bricks = [];var inst_game_fgcolor = [];var inst_game_bgcolor = [];inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val211_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval211_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val219_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval219_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val220_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval220_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val219_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval219_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val220_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval220_var(false);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_val214_var(0);inst_game.initBreakoutGame_SC_received_controller_position__var(false);inst_game.initBreakoutGame_SC_received_controller_positionxyval214_var(false);
	const inst_sound = new SoundControllerBrowser('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_val218_var(0);inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_received_sound_toneval218freq_var(false);inst_sound.initSound_behavior_INIT_received_sound_tonetime_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val262) => inst_game.receivelostBall_Ongame(val262));
	inst_game.bus.on('game?lostBallval219', (val219, val263) => inst_game.receivelostBallval219Ongame(val219, val263));
	inst_game.bus.on('game?nextLevel_', (val260) => inst_game.receivenextLevel_Ongame(val260));
	inst_game.bus.on('game?nextLevelval220', (val261, val220) => inst_game.receivenextLevelval220Ongame(val261, val220));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (id, val223, val200) => inst_ctrl.receivetimer_timeoutOnclock(id, val223, val200));
	inst_ctrl.bus.on('clock?timer_start', (val222, val198, time, id) => inst_timer.receivetimer_startOntimer(val222, val198, time, id));
	inst_ctrl.bus.on('clock?timer_cancel', (val221, val199, id) => inst_timer.receivetimer_cancelOntimer(val221, val199, id));
	inst_timer.bus.on('timer?timer_timeout', (id, val223, val200) => inst_game.receivetimer_timeoutOnclock(id, val223, val200));
	inst_game.bus.on('clock?timer_start', (val222, val198, time, id) => inst_timer.receivetimer_startOntimer(val222, val198, time, id));
	inst_game.bus.on('clock?timer_cancel', (val221, val199, id) => inst_timer.receivetimer_cancelOntimer(val221, val199, id));
	inst_disp.bus.on('vctrl?velocitydy', (dy, val248) => inst_ctrl.receivevelocitydyOnctrl_in(dy, val248));
	inst_disp.bus.on('vctrl?velocitydxval213', (val249, dx, val213) => inst_ctrl.receivevelocitydxval213Onctrl_in(val249, dx, val213));
	inst_disp.bus.on('vctrl?position_', (val250) => inst_ctrl.receiveposition_Onctrl_in(val250));
	inst_disp.bus.on('vctrl?positionxyval214', (y, val214, val251, x) => inst_ctrl.receivepositionxyval214Onctrl_in(y, val214, val251, x));
	inst_disp.bus.on('display?displayReady_', (val234) => inst_game.receivedisplayReady_Ondisplay(val234));
	inst_disp.bus.on('display?displayReadyval211', (val235, val211) => inst_game.receivedisplayReadyval211Ondisplay(val235, val211));
	inst_disp.bus.on('display?displayError_', (val244) => inst_game.receivedisplayError_Ondisplay(val244));
	inst_disp.bus.on('display?displayErrorval212', (val245, val212) => inst_game.receivedisplayErrorval212Ondisplay(val245, val212));
	inst_game.bus.on('display?createxsize', (val224, xsize) => inst_disp.receivecreatexsizeOndisplay(val224, xsize));
	inst_game.bus.on('display?createval208ysize', (ysize, val225, val208) => inst_disp.receivecreateval208ysizeOndisplay(ysize, val225, val208));
	inst_game.bus.on('display?update_', (val232) => inst_disp.receiveupdate_Ondisplay(val232));
	inst_game.bus.on('display?updateval210', (val233, val210) => inst_disp.receiveupdateval210Ondisplay(val233, val210));
	inst_game.bus.on('display?clear_', (val228) => inst_disp.receiveclear_Ondisplay(val228));
	inst_game.bus.on('display?clearval201', (val201, val229) => inst_disp.receiveclearval201Ondisplay(val201, val229));
	inst_game.bus.on('display?setColorgr', (r, g, val242) => inst_disp.receivesetColorgrOndisplay(r, g, val242));
	inst_game.bus.on('display?setColorbval202', (val243, b, val202) => inst_disp.receivesetColorbval202Ondisplay(val243, b, val202));
	inst_game.bus.on('display?setBGColorbrg', (val240, b, g, r) => inst_disp.receivesetBGColorbrgOndisplay(val240, b, g, r));
	inst_game.bus.on('display?setBGColorval203', (val241, val203) => inst_disp.receivesetBGColorval203Ondisplay(val241, val203));
	inst_game.bus.on('display?drawRectheightx', (x, height, val246) => inst_disp.receivedrawRectheightxOndisplay(x, height, val246));
	inst_game.bus.on('display?drawRectwidthval204y', (val204, y, width, val247) => inst_disp.receivedrawRectwidthval204yOndisplay(val204, y, width, val247));
	inst_game.bus.on('display?fillRectywidthval205height', (width, y, height, val226, val205) => inst_disp.receivefillRectywidthval205heightOndisplay(width, y, height, val226, val205));
	inst_game.bus.on('display?fillRectx', (x, val227) => inst_disp.receivefillRectxOndisplay(x, val227));
	inst_game.bus.on('display?drawIntegerval206xv', (val206, x, v, val236) => inst_disp.receivedrawIntegerval206xvOndisplay(val206, x, v, val236));
	inst_game.bus.on('display?drawIntegeryscaledigits', (scale, y, val237, digits) => inst_disp.receivedrawIntegeryscaledigitsOndisplay(scale, y, val237, digits));
	inst_game.bus.on('display?drawThingML_', (val230) => inst_disp.receivedrawThingML_Ondisplay(val230));
	inst_game.bus.on('display?drawThingMLval207yx', (val207, val231, x, y) => inst_disp.receivedrawThingMLval207yxOndisplay(val207, val231, x, y));
	inst_game.bus.on('sound?toneval218freq', (val258, freq, val218) => inst_sound.receivetoneval218freqOnsound(val258, freq, val218));
	inst_game.bus.on('sound?tonetime', (time, val259) => inst_sound.receivetonetimeOnsound(time, val259));
	inst_ctrl.bus.on('controls?position_', (val250) => inst_game.receiveposition_Oncontroller(val250));
	inst_ctrl.bus.on('controls?positionxyval214', (y, val214, val251, x) => inst_game.receivepositionxyval214Oncontroller(y, val214, val251, x));
	
	inst_timer._init();
	inst_disp._init();
	inst_ctrl._init();
	inst_sound._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

