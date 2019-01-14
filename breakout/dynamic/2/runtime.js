'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_disp = new DisplayBrowserRND('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var222_var(0);inst_disp.initDisplay_SC_Wait_received_display_create__var(false);inst_disp.initDisplay_SC_Wait_received_display_createysizexsizevar222_var(false);inst_disp.initDisplay_SC_Running_display_setColor_var216_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setColor__var(false);inst_disp.initDisplay_SC_Running_received_display_setColorvar216rbg_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_var217_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorb_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorgvar217r_var(false);inst_disp.initDisplay_SC_Running_display_clear_var215_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar215_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_var218_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRect__var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectwidthxvar218yheight_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_var219_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRect__var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectvar219yxheightwidth_var(false);inst_disp.initDisplay_SC_Running_display_update_var224_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar224_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_var220_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawInteger__var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_var221_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLy_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLvar221x_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var223_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar223_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_sound = new SoundControllerBrowserRND('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_var232_var(0);inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_received_sound_tonevar232_var(false);inst_sound.initSound_behavior_INIT_received_sound_tonetimefreq_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	const inst_game = new BreakoutGameBrowserRND('game', null);
	var inst_game_bricks = [];var inst_game_bgcolor = [];var inst_game_fgcolor = [];inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var225_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar225_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var233_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar233_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var234_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar234_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var233_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar233_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var234_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar234_var(false);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_var228_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_received_controller_positionx_var(false);inst_game.initBreakoutGame_SC_received_controller_positionvar228y_var(false);
	const inst_ctrl = new VelocityControllerRND('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_var228_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionx_var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionvar228y_var(false);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_var227_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocity__var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocityvar227dxdy_var(false);
	const inst_timer = new TimerJSRND('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var310) => inst_game.receivelostBall_Ongame(var310));
	inst_game.bus.on('game?lostBallvar233', (var311, var233) => inst_game.receivelostBallvar233Ongame(var311, var233));
	inst_game.bus.on('game?nextLevel_', (var312) => inst_game.receivenextLevel_Ongame(var312));
	inst_game.bus.on('game?nextLevelvar234', (var313, var234) => inst_game.receivenextLevelvar234Ongame(var313, var234));
	inst_game.bus.on('game?lostBall__bis', (var314) => inst_game.receivelostBall__bisOngame(var314));
	inst_game.bus.on('game?lostBallvar233_bis', (var233, var315) => inst_game.receivelostBallvar233_bisOngame(var233, var315));
	inst_game.bus.on('game?nextLevel__bis', (var316) => inst_game.receivenextLevel__bisOngame(var316));
	inst_game.bus.on('game?nextLevelvar234_bis', (var234, var317) => inst_game.receivenextLevelvar234_bisOngame(var234, var317));
	/*Connecting ports...*/
	inst_disp.bus.on('vctrl?velocity_', (var288) => inst_ctrl.receivevelocity_Onctrl_in(var288));
	inst_disp.bus.on('vctrl?velocityvar227dxdy', (dx, var289, var227, dy) => inst_ctrl.receivevelocityvar227dxdyOnctrl_in(dx, var289, var227, dy));
	inst_disp.bus.on('vctrl?positionx', (x, var286) => inst_ctrl.receivepositionxOnctrl_in(x, var286));
	inst_disp.bus.on('vctrl?positionvar228y', (var228, var287, y) => inst_ctrl.receivepositionvar228yOnctrl_in(var228, var287, y));
	inst_disp.bus.on('vctrl?velocity__bis', (var292) => inst_ctrl.receivevelocity__bisOnctrl_in(var292));
	inst_disp.bus.on('vctrl?velocityvar227dxdy_bis', (var293, dy, var227, dx) => inst_ctrl.receivevelocityvar227dxdy_bisOnctrl_in(var293, dy, var227, dx));
	inst_disp.bus.on('vctrl?positionx_bis', (x, var290) => inst_ctrl.receivepositionx_bisOnctrl_in(x, var290));
	inst_disp.bus.on('vctrl?positionvar228y_bis', (var228, y, var291) => inst_ctrl.receivepositionvar228y_bisOnctrl_in(var228, y, var291));
	inst_timer.bus.on('timer?timer_timeout', (id, var235, var214) => inst_ctrl.receivetimer_timeoutOnclock(id, var235, var214));
	inst_ctrl.bus.on('clock?timer_start', (time, id, var212, var237) => inst_timer.receivetimer_startOntimer(time, id, var212, var237));
	inst_ctrl.bus.on('clock?timer_cancel', (var213, id, var236) => inst_timer.receivetimer_cancelOntimer(var213, id, var236));
	inst_game.bus.on('sound?tonevar232', (var232, var306) => inst_sound.receivetonevar232Onsound(var232, var306));
	inst_game.bus.on('sound?tonetimefreq', (freq, var307, time) => inst_sound.receivetonetimefreqOnsound(freq, var307, time));
	inst_game.bus.on('sound?tonevar232_bis', (var232, var308) => inst_sound.receivetonevar232_bisOnsound(var232, var308));
	inst_game.bus.on('sound?tonetimefreq_bis', (freq, var309, time) => inst_sound.receivetonetimefreq_bisOnsound(freq, var309, time));
	inst_disp.bus.on('display?displayReady_', (var246) => inst_game.receivedisplayReady_Ondisplay(var246));
	inst_disp.bus.on('display?displayReadyvar225', (var225, var247) => inst_game.receivedisplayReadyvar225Ondisplay(var225, var247));
	inst_disp.bus.on('display?displayError_', (var254) => inst_game.receivedisplayError_Ondisplay(var254));
	inst_disp.bus.on('display?displayErrorvar226', (var255, var226) => inst_game.receivedisplayErrorvar226Ondisplay(var255, var226));
	inst_disp.bus.on('display?displayReady__bis', (var270) => inst_game.receivedisplayReady__bisOndisplay(var270));
	inst_disp.bus.on('display?displayReadyvar225_bis', (var225, var271) => inst_game.receivedisplayReadyvar225_bisOndisplay(var225, var271));
	inst_disp.bus.on('display?displayError__bis', (var278) => inst_game.receivedisplayError__bisOndisplay(var278));
	inst_disp.bus.on('display?displayErrorvar226_bis', (var279, var226) => inst_game.receivedisplayErrorvar226_bisOndisplay(var279, var226));
	inst_game.bus.on('display?create_', (var258) => inst_disp.receivecreate_Ondisplay(var258));
	inst_game.bus.on('display?createysizexsizevar222', (ysize, var259, xsize, var222) => inst_disp.receivecreateysizexsizevar222Ondisplay(ysize, var259, xsize, var222));
	inst_game.bus.on('display?update_', (var248) => inst_disp.receiveupdate_Ondisplay(var248));
	inst_game.bus.on('display?updatevar224', (var249, var224) => inst_disp.receiveupdatevar224Ondisplay(var249, var224));
	inst_game.bus.on('display?clear_', (var242) => inst_disp.receiveclear_Ondisplay(var242));
	inst_game.bus.on('display?clearvar215', (var215, var243) => inst_disp.receiveclearvar215Ondisplay(var215, var243));
	inst_game.bus.on('display?setColor_', (var240) => inst_disp.receivesetColor_Ondisplay(var240));
	inst_game.bus.on('display?setColorvar216rbg', (b, var216, g, r, var241) => inst_disp.receivesetColorvar216rbgOndisplay(b, var216, g, r, var241));
	inst_game.bus.on('display?setBGColorb', (b, var260) => inst_disp.receivesetBGColorbOndisplay(b, var260));
	inst_game.bus.on('display?setBGColorgvar217r', (g, var217, var261, r) => inst_disp.receivesetBGColorgvar217rOndisplay(g, var217, var261, r));
	inst_game.bus.on('display?drawRect_', (var238) => inst_disp.receivedrawRect_Ondisplay(var238));
	inst_game.bus.on('display?drawRectwidthxvar218yheight', (width, y, height, x, var239, var218) => inst_disp.receivedrawRectwidthxvar218yheightOndisplay(width, y, height, x, var239, var218));
	inst_game.bus.on('display?fillRect_', (var252) => inst_disp.receivefillRect_Ondisplay(var252));
	inst_game.bus.on('display?fillRectvar219yxheightwidth', (height, x, y, var219, width, var253) => inst_disp.receivefillRectvar219yxheightwidthOndisplay(height, x, y, var219, width, var253));
	inst_game.bus.on('display?drawInteger_', (var250) => inst_disp.receivedrawInteger_Ondisplay(var250));
	inst_game.bus.on('display?drawIntegervar220vscalexdigitsy', (digits, v, scale, y, x, var251, var220) => inst_disp.receivedrawIntegervar220vscalexdigitsyOndisplay(digits, v, scale, y, x, var251, var220));
	inst_game.bus.on('display?drawThingMLy', (y, var244) => inst_disp.receivedrawThingMLyOndisplay(y, var244));
	inst_game.bus.on('display?drawThingMLvar221x', (var245, x, var221) => inst_disp.receivedrawThingMLvar221xOndisplay(var245, x, var221));
	inst_game.bus.on('display?create__bis', (var282) => inst_disp.receivecreate__bisOndisplay(var282));
	inst_game.bus.on('display?createysizexsizevar222_bis', (ysize, var222, var283, xsize) => inst_disp.receivecreateysizexsizevar222_bisOndisplay(ysize, var222, var283, xsize));
	inst_game.bus.on('display?update__bis', (var272) => inst_disp.receiveupdate__bisOndisplay(var272));
	inst_game.bus.on('display?updatevar224_bis', (var224, var273) => inst_disp.receiveupdatevar224_bisOndisplay(var224, var273));
	inst_game.bus.on('display?clear__bis', (var266) => inst_disp.receiveclear__bisOndisplay(var266));
	inst_game.bus.on('display?clearvar215_bis', (var215, var267) => inst_disp.receiveclearvar215_bisOndisplay(var215, var267));
	inst_game.bus.on('display?setColor__bis', (var264) => inst_disp.receivesetColor__bisOndisplay(var264));
	inst_game.bus.on('display?setColorvar216rbg_bis', (var216, r, g, b, var265) => inst_disp.receivesetColorvar216rbg_bisOndisplay(var216, r, g, b, var265));
	inst_game.bus.on('display?setBGColorb_bis', (var284, b) => inst_disp.receivesetBGColorb_bisOndisplay(var284, b));
	inst_game.bus.on('display?setBGColorgvar217r_bis', (var217, var285, g, r) => inst_disp.receivesetBGColorgvar217r_bisOndisplay(var217, var285, g, r));
	inst_game.bus.on('display?drawRect__bis', (var262) => inst_disp.receivedrawRect__bisOndisplay(var262));
	inst_game.bus.on('display?drawRectwidthxvar218yheight_bis', (width, x, height, var263, y, var218) => inst_disp.receivedrawRectwidthxvar218yheight_bisOndisplay(width, x, height, var263, y, var218));
	inst_game.bus.on('display?fillRect__bis', (var276) => inst_disp.receivefillRect__bisOndisplay(var276));
	inst_game.bus.on('display?fillRectvar219yxheightwidth_bis', (var219, width, x, y, height, var277) => inst_disp.receivefillRectvar219yxheightwidth_bisOndisplay(var219, width, x, y, height, var277));
	inst_game.bus.on('display?drawInteger__bis', (var274) => inst_disp.receivedrawInteger__bisOndisplay(var274));
	inst_game.bus.on('display?drawIntegervar220vscalexdigitsy_bis', (v, x, digits, scale, y, var220, var275) => inst_disp.receivedrawIntegervar220vscalexdigitsy_bisOndisplay(v, x, digits, scale, y, var220, var275));
	inst_game.bus.on('display?drawThingMLy_bis', (y, var268) => inst_disp.receivedrawThingMLy_bisOndisplay(y, var268));
	inst_game.bus.on('display?drawThingMLvar221x_bis', (var269, x, var221) => inst_disp.receivedrawThingMLvar221x_bisOndisplay(var269, x, var221));
	inst_ctrl.bus.on('controls?positionx', (x, var286) => inst_game.receivepositionxOncontroller(x, var286));
	inst_ctrl.bus.on('controls?positionvar228y', (var228, var287, y) => inst_game.receivepositionvar228yOncontroller(var228, var287, y));
	inst_ctrl.bus.on('controls?positionx_bis', (x, var290) => inst_game.receivepositionx_bisOncontroller(x, var290));
	inst_ctrl.bus.on('controls?positionvar228y_bis', (var228, y, var291) => inst_game.receivepositionvar228y_bisOncontroller(var228, y, var291));
	inst_timer.bus.on('timer?timer_timeout', (id, var235, var214) => inst_game.receivetimer_timeoutOnclock(id, var235, var214));
	inst_game.bus.on('clock?timer_start', (time, id, var212, var237) => inst_timer.receivetimer_startOntimer(time, id, var212, var237));
	inst_game.bus.on('clock?timer_cancel', (var213, id, var236) => inst_timer.receivetimer_cancelOntimer(var213, id, var236));
	
	inst_disp._init();
	inst_sound._init();
	inst_timer._init();
	inst_ctrl._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

