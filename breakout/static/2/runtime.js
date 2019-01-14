'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_bricks = [];var inst_game_fgcolor = [];var inst_game_bgcolor = [];inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_controller_position_val148_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_received_controller_positionval148_var(false);inst_game.initBreakoutGame_SC_received_controller_positionyx_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val153_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval153_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val154_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval154_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val153_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval153_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val154_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval154_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val145_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval145_var(false);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_sound = new SoundControllerBrowser('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_val152_var(0);inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_received_sound_toneval152_var(false);inst_sound.initSound_behavior_INIT_received_sound_tonefreqtime_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_val142_var(0);inst_disp.initDisplay_SC_Wait_received_display_createysize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizeval142_var(false);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val136_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorbgval136_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorr_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_val137_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorval137rg_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorb_var(false);inst_disp.initDisplay_SC_Running_display_clear_val135_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval135_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_val138_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRecty_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectval138heightxwidth_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_val139_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectval139heightxwidth_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRecty_var(false);inst_disp.initDisplay_SC_Running_display_update_val144_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval144_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_val140_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_received_display_drawInteger__var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_val141_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLval141_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLyx_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val143_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval143_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_ctrl = new VelocityController('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_val147_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocity__var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocitydyval147dx_var(false);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_val148_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionval148_var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionyx_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val196) => inst_game.receivelostBall_Ongame(val196));
	inst_game.bus.on('game?lostBallval153', (val153, val197) => inst_game.receivelostBallval153Ongame(val153, val197));
	inst_game.bus.on('game?nextLevel_', (val194) => inst_game.receivenextLevel_Ongame(val194));
	inst_game.bus.on('game?nextLevelval154', (val154, val195) => inst_game.receivenextLevelval154Ongame(val154, val195));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (id, val134, val157) => inst_game.receivetimer_timeoutOnclock(id, val134, val157));
	inst_game.bus.on('clock?timer_start', (id, time, val156, val132) => inst_timer.receivetimer_startOntimer(id, time, val156, val132));
	inst_game.bus.on('clock?timer_cancel', (val133, id, val155) => inst_timer.receivetimer_cancelOntimer(val133, id, val155));
	inst_game.bus.on('sound?toneval152', (val152, val192) => inst_sound.receivetoneval152Onsound(val152, val192));
	inst_game.bus.on('sound?tonefreqtime', (time, val193, freq) => inst_sound.receivetonefreqtimeOnsound(time, val193, freq));
	inst_ctrl.bus.on('controls?positionval148', (val148, val182) => inst_game.receivepositionval148Oncontroller(val148, val182));
	inst_ctrl.bus.on('controls?positionyx', (y, x, val183) => inst_game.receivepositionyxOncontroller(y, x, val183));
	inst_disp.bus.on('vctrl?velocity_', (val184) => inst_ctrl.receivevelocity_Onctrl_in(val184));
	inst_disp.bus.on('vctrl?velocitydyval147dx', (dy, val147, val185, dx) => inst_ctrl.receivevelocitydyval147dxOnctrl_in(dy, val147, val185, dx));
	inst_disp.bus.on('vctrl?positionval148', (val148, val182) => inst_ctrl.receivepositionval148Onctrl_in(val148, val182));
	inst_disp.bus.on('vctrl?positionyx', (y, x, val183) => inst_ctrl.receivepositionyxOnctrl_in(y, x, val183));
	inst_timer.bus.on('timer?timer_timeout', (id, val134, val157) => inst_ctrl.receivetimer_timeoutOnclock(id, val134, val157));
	inst_ctrl.bus.on('clock?timer_start', (id, time, val156, val132) => inst_timer.receivetimer_startOntimer(id, time, val156, val132));
	inst_ctrl.bus.on('clock?timer_cancel', (val133, id, val155) => inst_timer.receivetimer_cancelOntimer(val133, id, val155));
	inst_disp.bus.on('display?displayReady_', (val166) => inst_game.receivedisplayReady_Ondisplay(val166));
	inst_disp.bus.on('display?displayReadyval145', (val145, val167) => inst_game.receivedisplayReadyval145Ondisplay(val145, val167));
	inst_disp.bus.on('display?displayError_', (val172) => inst_game.receivedisplayError_Ondisplay(val172));
	inst_disp.bus.on('display?displayErrorval146', (val146, val173) => inst_game.receivedisplayErrorval146Ondisplay(val146, val173));
	inst_game.bus.on('display?createysize', (val180, ysize) => inst_disp.receivecreateysizeOndisplay(val180, ysize));
	inst_game.bus.on('display?createxsizeval142', (xsize, val181, val142) => inst_disp.receivecreatexsizeval142Ondisplay(xsize, val181, val142));
	inst_game.bus.on('display?update_', (val160) => inst_disp.receiveupdate_Ondisplay(val160));
	inst_game.bus.on('display?updateval144', (val144, val161) => inst_disp.receiveupdateval144Ondisplay(val144, val161));
	inst_game.bus.on('display?clear_', (val164) => inst_disp.receiveclear_Ondisplay(val164));
	inst_game.bus.on('display?clearval135', (val165, val135) => inst_disp.receiveclearval135Ondisplay(val165, val135));
	inst_game.bus.on('display?setColorbgval136', (val176, b, val136, g) => inst_disp.receivesetColorbgval136Ondisplay(val176, b, val136, g));
	inst_game.bus.on('display?setColorr', (r, val177) => inst_disp.receivesetColorrOndisplay(r, val177));
	inst_game.bus.on('display?setBGColorval137rg', (val137, g, val168, r) => inst_disp.receivesetBGColorval137rgOndisplay(val137, g, val168, r));
	inst_game.bus.on('display?setBGColorb', (val169, b) => inst_disp.receivesetBGColorbOndisplay(val169, b));
	inst_game.bus.on('display?drawRecty', (y, val174) => inst_disp.receivedrawRectyOndisplay(y, val174));
	inst_game.bus.on('display?drawRectval138heightxwidth', (val138, height, val175, x, width) => inst_disp.receivedrawRectval138heightxwidthOndisplay(val138, height, val175, x, width));
	inst_game.bus.on('display?fillRectval139heightxwidth', (height, val139, width, val158, x) => inst_disp.receivefillRectval139heightxwidthOndisplay(height, val139, width, val158, x));
	inst_game.bus.on('display?fillRecty', (val159, y) => inst_disp.receivefillRectyOndisplay(val159, y));
	inst_game.bus.on('display?drawInteger_', (val178) => inst_disp.receivedrawInteger_Ondisplay(val178));
	inst_game.bus.on('display?drawIntegerval140xyscaledigitsv', (val140, val179, digits, v, y, scale, x) => inst_disp.receivedrawIntegerval140xyscaledigitsvOndisplay(val140, val179, digits, v, y, scale, x));
	inst_game.bus.on('display?drawThingMLval141', (val141, val162) => inst_disp.receivedrawThingMLval141Ondisplay(val141, val162));
	inst_game.bus.on('display?drawThingMLyx', (val163, y, x) => inst_disp.receivedrawThingMLyxOndisplay(val163, y, x));
	
	inst_timer._init();
	inst_sound._init();
	inst_disp._init();
	inst_ctrl._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

