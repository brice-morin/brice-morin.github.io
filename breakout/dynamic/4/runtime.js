'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_ctrl = new VelocityControllerRND('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_var440_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionxy_var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionvar440_var(false);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_var439_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocity__var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocityvar439dxdy_var(false);
	const inst_game = new BreakoutGameBrowserRND('game', null);
	var inst_game_bgcolor = [];var inst_game_fgcolor = [];var inst_game_bricks = [];inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_var440_var(0);inst_game.initBreakoutGame_SC_received_controller_positionxy_var(false);inst_game.initBreakoutGame_SC_received_controller_positionvar440_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var445_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar445_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var446_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar446_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var445_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar445_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var446_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar446_var(false);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var437_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar437_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);
	const inst_sound = new SoundControllerBrowserRND('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_sound_tone_var444_var(0);inst_sound.initSound_behavior_INIT_received_sound_tonefreqtime_var(false);inst_sound.initSound_behavior_INIT_received_sound_tonevar444_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	const inst_timer = new TimerJSRND('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_disp = new DisplayBrowserRND('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var434_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_received_display_create__var(false);inst_disp.initDisplay_SC_Wait_received_display_createysizevar434xsize_var(false);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var428_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorrgb_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorvar428_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_var429_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorr_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorvar429bg_var(false);inst_disp.initDisplay_SC_Running_display_clear_var427_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar427_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_var430_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectwidthxvar430_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectyheight_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_var431_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectwidthvar431height_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectxy_var(false);inst_disp.initDisplay_SC_Running_display_update_var436_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar436_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var432_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerdigitsscalexy_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegervar432v_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_var433_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLxvar433_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var435_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar435_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var522) => inst_game.receivelostBall_Ongame(var522));
	inst_game.bus.on('game?lostBallvar445', (var523, var445) => inst_game.receivelostBallvar445Ongame(var523, var445));
	inst_game.bus.on('game?nextLevel_', (var524) => inst_game.receivenextLevel_Ongame(var524));
	inst_game.bus.on('game?nextLevelvar446', (var525, var446) => inst_game.receivenextLevelvar446Ongame(var525, var446));
	inst_game.bus.on('game?lostBall__bis', (var526) => inst_game.receivelostBall__bisOngame(var526));
	inst_game.bus.on('game?lostBallvar445_bis', (var527, var445) => inst_game.receivelostBallvar445_bisOngame(var527, var445));
	inst_game.bus.on('game?nextLevel__bis', (var528) => inst_game.receivenextLevel__bisOngame(var528));
	inst_game.bus.on('game?nextLevelvar446_bis', (var529, var446) => inst_game.receivenextLevelvar446_bisOngame(var529, var446));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (var447, var426, id) => inst_game.receivetimer_timeoutOnclock(var447, var426, id));
	inst_game.bus.on('clock?timer_start', (id, var424, var448, time) => inst_timer.receivetimer_startOntimer(id, var424, var448, time));
	inst_game.bus.on('clock?timer_cancel', (id, var449, var425) => inst_timer.receivetimer_cancelOntimer(id, var449, var425));
	inst_game.bus.on('sound?tonefreqtime', (var518, time, freq) => inst_sound.receivetonefreqtimeOnsound(var518, time, freq));
	inst_game.bus.on('sound?tonevar444', (var444, var519) => inst_sound.receivetonevar444Onsound(var444, var519));
	inst_game.bus.on('sound?tonefreqtime_bis', (time, var520, freq) => inst_sound.receivetonefreqtime_bisOnsound(time, var520, freq));
	inst_game.bus.on('sound?tonevar444_bis', (var444, var521) => inst_sound.receivetonevar444_bisOnsound(var444, var521));
	inst_disp.bus.on('display?displayReady_', (var464) => inst_game.receivedisplayReady_Ondisplay(var464));
	inst_disp.bus.on('display?displayReadyvar437', (var465, var437) => inst_game.receivedisplayReadyvar437Ondisplay(var465, var437));
	inst_disp.bus.on('display?displayError_', (var472) => inst_game.receivedisplayError_Ondisplay(var472));
	inst_disp.bus.on('display?displayErrorvar438', (var438, var473) => inst_game.receivedisplayErrorvar438Ondisplay(var438, var473));
	inst_disp.bus.on('display?displayReady__bis', (var488) => inst_game.receivedisplayReady__bisOndisplay(var488));
	inst_disp.bus.on('display?displayReadyvar437_bis', (var489, var437) => inst_game.receivedisplayReadyvar437_bisOndisplay(var489, var437));
	inst_disp.bus.on('display?displayError__bis', (var496) => inst_game.receivedisplayError__bisOndisplay(var496));
	inst_disp.bus.on('display?displayErrorvar438_bis', (var438, var497) => inst_game.receivedisplayErrorvar438_bisOndisplay(var438, var497));
	inst_game.bus.on('display?create_', (var452) => inst_disp.receivecreate_Ondisplay(var452));
	inst_game.bus.on('display?createysizevar434xsize', (ysize, var434, var453, xsize) => inst_disp.receivecreateysizevar434xsizeOndisplay(ysize, var434, var453, xsize));
	inst_game.bus.on('display?update_', (var462) => inst_disp.receiveupdate_Ondisplay(var462));
	inst_game.bus.on('display?updatevar436', (var436, var463) => inst_disp.receiveupdatevar436Ondisplay(var436, var463));
	inst_game.bus.on('display?clear_', (var456) => inst_disp.receiveclear_Ondisplay(var456));
	inst_game.bus.on('display?clearvar427', (var427, var457) => inst_disp.receiveclearvar427Ondisplay(var427, var457));
	inst_game.bus.on('display?setColorrgb', (b, r, g, var466) => inst_disp.receivesetColorrgbOndisplay(b, r, g, var466));
	inst_game.bus.on('display?setColorvar428', (var428, var467) => inst_disp.receivesetColorvar428Ondisplay(var428, var467));
	inst_game.bus.on('display?setBGColorr', (var460, r) => inst_disp.receivesetBGColorrOndisplay(var460, r));
	inst_game.bus.on('display?setBGColorvar429bg', (g, var429, b, var461) => inst_disp.receivesetBGColorvar429bgOndisplay(g, var429, b, var461));
	inst_game.bus.on('display?drawRectwidthxvar430', (var430, x, width, var470) => inst_disp.receivedrawRectwidthxvar430Ondisplay(var430, x, width, var470));
	inst_game.bus.on('display?drawRectyheight', (y, var471, height) => inst_disp.receivedrawRectyheightOndisplay(y, var471, height));
	inst_game.bus.on('display?fillRectwidthvar431height', (height, var431, width, var458) => inst_disp.receivefillRectwidthvar431heightOndisplay(height, var431, width, var458));
	inst_game.bus.on('display?fillRectxy', (x, y, var459) => inst_disp.receivefillRectxyOndisplay(x, y, var459));
	inst_game.bus.on('display?drawIntegerdigitsscalexy', (digits, x, y, var468, scale) => inst_disp.receivedrawIntegerdigitsscalexyOndisplay(digits, x, y, var468, scale));
	inst_game.bus.on('display?drawIntegervar432v', (var469, v, var432) => inst_disp.receivedrawIntegervar432vOndisplay(var469, v, var432));
	inst_game.bus.on('display?drawThingMLxvar433', (x, var454, var433) => inst_disp.receivedrawThingMLxvar433Ondisplay(x, var454, var433));
	inst_game.bus.on('display?drawThingMLy', (y, var455) => inst_disp.receivedrawThingMLyOndisplay(y, var455));
	inst_game.bus.on('display?create__bis', (var476) => inst_disp.receivecreate__bisOndisplay(var476));
	inst_game.bus.on('display?createysizevar434xsize_bis', (ysize, var434, var477, xsize) => inst_disp.receivecreateysizevar434xsize_bisOndisplay(ysize, var434, var477, xsize));
	inst_game.bus.on('display?update__bis', (var486) => inst_disp.receiveupdate__bisOndisplay(var486));
	inst_game.bus.on('display?updatevar436_bis', (var487, var436) => inst_disp.receiveupdatevar436_bisOndisplay(var487, var436));
	inst_game.bus.on('display?clear__bis', (var480) => inst_disp.receiveclear__bisOndisplay(var480));
	inst_game.bus.on('display?clearvar427_bis', (var427, var481) => inst_disp.receiveclearvar427_bisOndisplay(var427, var481));
	inst_game.bus.on('display?setColorrgb_bis', (b, g, r, var490) => inst_disp.receivesetColorrgb_bisOndisplay(b, g, r, var490));
	inst_game.bus.on('display?setColorvar428_bis', (var491, var428) => inst_disp.receivesetColorvar428_bisOndisplay(var491, var428));
	inst_game.bus.on('display?setBGColorr_bis', (var484, r) => inst_disp.receivesetBGColorr_bisOndisplay(var484, r));
	inst_game.bus.on('display?setBGColorvar429bg_bis', (b, g, var429, var485) => inst_disp.receivesetBGColorvar429bg_bisOndisplay(b, g, var429, var485));
	inst_game.bus.on('display?drawRectwidthxvar430_bis', (x, var430, var494, width) => inst_disp.receivedrawRectwidthxvar430_bisOndisplay(x, var430, var494, width));
	inst_game.bus.on('display?drawRectyheight_bis', (y, height, var495) => inst_disp.receivedrawRectyheight_bisOndisplay(y, height, var495));
	inst_game.bus.on('display?fillRectwidthvar431height_bis', (var431, height, var482, width) => inst_disp.receivefillRectwidthvar431height_bisOndisplay(var431, height, var482, width));
	inst_game.bus.on('display?fillRectxy_bis', (x, var483, y) => inst_disp.receivefillRectxy_bisOndisplay(x, var483, y));
	inst_game.bus.on('display?drawIntegerdigitsscalexy_bis', (y, digits, var492, x, scale) => inst_disp.receivedrawIntegerdigitsscalexy_bisOndisplay(y, digits, var492, x, scale));
	inst_game.bus.on('display?drawIntegervar432v_bis', (var493, var432, v) => inst_disp.receivedrawIntegervar432v_bisOndisplay(var493, var432, v));
	inst_game.bus.on('display?drawThingMLxvar433_bis', (var478, var433, x) => inst_disp.receivedrawThingMLxvar433_bisOndisplay(var478, var433, x));
	inst_game.bus.on('display?drawThingMLy_bis', (y, var479) => inst_disp.receivedrawThingMLy_bisOndisplay(y, var479));
	inst_ctrl.bus.on('controls?positionxy', (x, var500, y) => inst_game.receivepositionxyOncontroller(x, var500, y));
	inst_ctrl.bus.on('controls?positionvar440', (var501, var440) => inst_game.receivepositionvar440Oncontroller(var501, var440));
	inst_ctrl.bus.on('controls?positionxy_bis', (var504, y, x) => inst_game.receivepositionxy_bisOncontroller(var504, y, x));
	inst_ctrl.bus.on('controls?positionvar440_bis', (var440, var505) => inst_game.receivepositionvar440_bisOncontroller(var440, var505));
	inst_timer.bus.on('timer?timer_timeout', (var447, var426, id) => inst_ctrl.receivetimer_timeoutOnclock(var447, var426, id));
	inst_ctrl.bus.on('clock?timer_start', (id, var424, var448, time) => inst_timer.receivetimer_startOntimer(id, var424, var448, time));
	inst_ctrl.bus.on('clock?timer_cancel', (id, var449, var425) => inst_timer.receivetimer_cancelOntimer(id, var449, var425));
	inst_disp.bus.on('vctrl?velocity_', (var498) => inst_ctrl.receivevelocity_Onctrl_in(var498));
	inst_disp.bus.on('vctrl?velocityvar439dxdy', (dy, var499, var439, dx) => inst_ctrl.receivevelocityvar439dxdyOnctrl_in(dy, var499, var439, dx));
	inst_disp.bus.on('vctrl?positionxy', (x, var500, y) => inst_ctrl.receivepositionxyOnctrl_in(x, var500, y));
	inst_disp.bus.on('vctrl?positionvar440', (var501, var440) => inst_ctrl.receivepositionvar440Onctrl_in(var501, var440));
	inst_disp.bus.on('vctrl?velocity__bis', (var502) => inst_ctrl.receivevelocity__bisOnctrl_in(var502));
	inst_disp.bus.on('vctrl?velocityvar439dxdy_bis', (dy, dx, var439, var503) => inst_ctrl.receivevelocityvar439dxdy_bisOnctrl_in(dy, dx, var439, var503));
	inst_disp.bus.on('vctrl?positionxy_bis', (var504, y, x) => inst_ctrl.receivepositionxy_bisOnctrl_in(var504, y, x));
	inst_disp.bus.on('vctrl?positionvar440_bis', (var440, var505) => inst_ctrl.receivepositionvar440_bisOnctrl_in(var440, var505));
	
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

