'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_bricks = [];var inst_game_fgcolor = [];var inst_game_bgcolor = [];inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_val82_var(0);inst_game.initBreakoutGame_SC_received_controller_positiony_var(false);inst_game.initBreakoutGame_SC_received_controller_positionxval82_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_val87_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallval87_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_val88_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelval88_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_val87_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallval87_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_val88_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelval88_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_INIT_display_displayReady_val79_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyval79_var(false);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_sound = new SoundControllerBrowser('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_sound_tone_val86_var(0);inst_sound.initSound_behavior_INIT_received_sound_tone__var(false);inst_sound.initSound_behavior_INIT_received_sound_tonefreqtimeval86_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_val70_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorrval70_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorgb_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_val71_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorbval71g_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorr_var(false);inst_disp.initDisplay_SC_Running_display_clear_val69_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearval69_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_val72_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectval72xywidth_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectheight_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_val73_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectyheight_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectval73xwidth_var(false);inst_disp.initDisplay_SC_Running_display_update_val78_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updateval78_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_val74_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_received_display_drawInteger__var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegerdigitsyxval74vscale_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_val75_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLy_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLval75x_var(false);inst_disp.initDisplay_SC_Running_display_destroy_val77_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyval77_var(false);inst_disp.initDisplay_SC_Wait_display_create_val76_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_received_display_createval76xsize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createysize_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_ctrl = new VelocityController('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_val81_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocitydy_var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocityval81dx_var(false);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_val82_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positiony_var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionxval82_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (val130) => inst_game.receivelostBall_Ongame(val130));
	inst_game.bus.on('game?lostBallval87', (val131, val87) => inst_game.receivelostBallval87Ongame(val131, val87));
	inst_game.bus.on('game?nextLevel_', (val128) => inst_game.receivenextLevel_Ongame(val128));
	inst_game.bus.on('game?nextLevelval88', (val88, val129) => inst_game.receivenextLevelval88Ongame(val88, val129));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (val89, id, val68) => inst_game.receivetimer_timeoutOnclock(val89, id, val68));
	inst_game.bus.on('clock?timer_start', (id, time, val90, val66) => inst_timer.receivetimer_startOntimer(id, time, val90, val66));
	inst_game.bus.on('clock?timer_cancel', (val91, val67, id) => inst_timer.receivetimer_cancelOntimer(val91, val67, id));
	inst_game.bus.on('sound?tone_', (val126) => inst_sound.receivetone_Onsound(val126));
	inst_game.bus.on('sound?tonefreqtimeval86', (freq, time, val86, val127) => inst_sound.receivetonefreqtimeval86Onsound(freq, time, val86, val127));
	inst_ctrl.bus.on('controls?positiony', (val118, y) => inst_game.receivepositionyOncontroller(val118, y));
	inst_ctrl.bus.on('controls?positionxval82', (val119, x, val82) => inst_game.receivepositionxval82Oncontroller(val119, x, val82));
	inst_disp.bus.on('vctrl?velocitydy', (val116, dy) => inst_ctrl.receivevelocitydyOnctrl_in(val116, dy));
	inst_disp.bus.on('vctrl?velocityval81dx', (dx, val81, val117) => inst_ctrl.receivevelocityval81dxOnctrl_in(dx, val81, val117));
	inst_disp.bus.on('vctrl?positiony', (val118, y) => inst_ctrl.receivepositionyOnctrl_in(val118, y));
	inst_disp.bus.on('vctrl?positionxval82', (val119, x, val82) => inst_ctrl.receivepositionxval82Onctrl_in(val119, x, val82));
	inst_timer.bus.on('timer?timer_timeout', (val89, id, val68) => inst_ctrl.receivetimer_timeoutOnclock(val89, id, val68));
	inst_ctrl.bus.on('clock?timer_start', (id, time, val90, val66) => inst_timer.receivetimer_startOntimer(id, time, val90, val66));
	inst_ctrl.bus.on('clock?timer_cancel', (val91, val67, id) => inst_timer.receivetimer_cancelOntimer(val91, val67, id));
	inst_disp.bus.on('display?displayReady_', (val112) => inst_game.receivedisplayReady_Ondisplay(val112));
	inst_disp.bus.on('display?displayReadyval79', (val113, val79) => inst_game.receivedisplayReadyval79Ondisplay(val113, val79));
	inst_disp.bus.on('display?displayError_', (val110) => inst_game.receivedisplayError_Ondisplay(val110));
	inst_disp.bus.on('display?displayErrorval80', (val80, val111) => inst_game.receivedisplayErrorval80Ondisplay(val80, val111));
	inst_game.bus.on('display?createval76xsize', (val114, xsize, val76) => inst_disp.receivecreateval76xsizeOndisplay(val114, xsize, val76));
	inst_game.bus.on('display?createysize', (ysize, val115) => inst_disp.receivecreateysizeOndisplay(ysize, val115));
	inst_game.bus.on('display?update_', (val108) => inst_disp.receiveupdate_Ondisplay(val108));
	inst_game.bus.on('display?updateval78', (val109, val78) => inst_disp.receiveupdateval78Ondisplay(val109, val78));
	inst_game.bus.on('display?clear_', (val96) => inst_disp.receiveclear_Ondisplay(val96));
	inst_game.bus.on('display?clearval69', (val69, val97) => inst_disp.receiveclearval69Ondisplay(val69, val97));
	inst_game.bus.on('display?setColorrval70', (val106, val70, r) => inst_disp.receivesetColorrval70Ondisplay(val106, val70, r));
	inst_game.bus.on('display?setColorgb', (val107, g, b) => inst_disp.receivesetColorgbOndisplay(val107, g, b));
	inst_game.bus.on('display?setBGColorbval71g', (g, val104, val71, b) => inst_disp.receivesetBGColorbval71gOndisplay(g, val104, val71, b));
	inst_game.bus.on('display?setBGColorr', (val105, r) => inst_disp.receivesetBGColorrOndisplay(val105, r));
	inst_game.bus.on('display?drawRectval72xywidth', (y, val72, x, val100, width) => inst_disp.receivedrawRectval72xywidthOndisplay(y, val72, x, val100, width));
	inst_game.bus.on('display?drawRectheight', (height, val101) => inst_disp.receivedrawRectheightOndisplay(height, val101));
	inst_game.bus.on('display?fillRectyheight', (height, val102, y) => inst_disp.receivefillRectyheightOndisplay(height, val102, y));
	inst_game.bus.on('display?fillRectval73xwidth', (x, width, val73, val103) => inst_disp.receivefillRectval73xwidthOndisplay(x, width, val73, val103));
	inst_game.bus.on('display?drawInteger_', (val92) => inst_disp.receivedrawInteger_Ondisplay(val92));
	inst_game.bus.on('display?drawIntegerdigitsyxval74vscale', (x, y, val93, v, digits, scale, val74) => inst_disp.receivedrawIntegerdigitsyxval74vscaleOndisplay(x, y, val93, v, digits, scale, val74));
	inst_game.bus.on('display?drawThingMLy', (y, val94) => inst_disp.receivedrawThingMLyOndisplay(y, val94));
	inst_game.bus.on('display?drawThingMLval75x', (x, val75, val95) => inst_disp.receivedrawThingMLval75xOndisplay(x, val75, val95));
	
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

