'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_timer = new TimerJSRND('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_disp = new DisplayBrowserRND('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var110_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorgvar110r_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorb_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_var111_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorvar111_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorgrb_var(false);inst_disp.initDisplay_SC_Running_display_clear_var109_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar109_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_var112_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectwidthvar112_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectyheightx_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_var113_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectxheightwidthy_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectvar113_var(false);inst_disp.initDisplay_SC_Running_display_update_var118_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar118_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var114_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawInteger__var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_var115_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLvar115x_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var117_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar117_var(false);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var116_var(0);inst_disp.initDisplay_SC_Wait_received_display_createysize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizevar116_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_ctrl = new VelocityControllerRND('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_var122_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_position__var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionyxvar122_var(false);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_var121_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocityvar121_var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocitydydx_var(false);
	const inst_sound = new SoundControllerBrowserRND('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_sound_tone_var126_var(0);inst_sound.initSound_behavior_INIT_received_sound_tone__var(false);inst_sound.initSound_behavior_INIT_received_sound_tonetimefreqvar126_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	const inst_game = new BreakoutGameBrowserRND('game', null);
	var inst_game_bricks = [];var inst_game_fgcolor = [];var inst_game_bgcolor = [];inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var119_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar119_var(false);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_var122_var(0);inst_game.initBreakoutGame_SC_received_controller_position__var(false);inst_game.initBreakoutGame_SC_received_controller_positionyxvar122_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var127_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar127_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var128_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar128_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var127_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar127_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var128_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar128_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var204) => inst_game.receivelostBall_Ongame(var204));
	inst_game.bus.on('game?lostBallvar127', (var205, var127) => inst_game.receivelostBallvar127Ongame(var205, var127));
	inst_game.bus.on('game?nextLevel_', (var206) => inst_game.receivenextLevel_Ongame(var206));
	inst_game.bus.on('game?nextLevelvar128', (var207, var128) => inst_game.receivenextLevelvar128Ongame(var207, var128));
	inst_game.bus.on('game?lostBall__bis', (var208) => inst_game.receivelostBall__bisOngame(var208));
	inst_game.bus.on('game?lostBallvar127_bis', (var127, var209) => inst_game.receivelostBallvar127_bisOngame(var127, var209));
	inst_game.bus.on('game?nextLevel__bis', (var210) => inst_game.receivenextLevel__bisOngame(var210));
	inst_game.bus.on('game?nextLevelvar128_bis', (var128, var211) => inst_game.receivenextLevelvar128_bisOngame(var128, var211));
	/*Connecting ports...*/
	inst_game.bus.on('sound?tone_', (var200) => inst_sound.receivetone_Onsound(var200));
	inst_game.bus.on('sound?tonetimefreqvar126', (time, var201, var126, freq) => inst_sound.receivetonetimefreqvar126Onsound(time, var201, var126, freq));
	inst_game.bus.on('sound?tone__bis', (var202) => inst_sound.receivetone__bisOnsound(var202));
	inst_game.bus.on('sound?tonetimefreqvar126_bis', (time, var126, freq, var203) => inst_sound.receivetonetimefreqvar126_bisOnsound(time, var126, freq, var203));
	inst_timer.bus.on('timer?timer_timeout', (var131, var108, id) => inst_game.receivetimer_timeoutOnclock(var131, var108, id));
	inst_game.bus.on('clock?timer_start', (time, id, var129, var106) => inst_timer.receivetimer_startOntimer(time, id, var129, var106));
	inst_game.bus.on('clock?timer_cancel', (id, var107, var130) => inst_timer.receivetimer_cancelOntimer(id, var107, var130));
	inst_disp.bus.on('vctrl?velocityvar121', (var182, var121) => inst_ctrl.receivevelocityvar121Onctrl_in(var182, var121));
	inst_disp.bus.on('vctrl?velocitydydx', (dy, var183, dx) => inst_ctrl.receivevelocitydydxOnctrl_in(dy, var183, dx));
	inst_disp.bus.on('vctrl?position_', (var180) => inst_ctrl.receiveposition_Onctrl_in(var180));
	inst_disp.bus.on('vctrl?positionyxvar122', (y, var122, var181, x) => inst_ctrl.receivepositionyxvar122Onctrl_in(y, var122, var181, x));
	inst_disp.bus.on('vctrl?velocityvar121_bis', (var186, var121) => inst_ctrl.receivevelocityvar121_bisOnctrl_in(var186, var121));
	inst_disp.bus.on('vctrl?velocitydydx_bis', (dy, dx, var187) => inst_ctrl.receivevelocitydydx_bisOnctrl_in(dy, dx, var187));
	inst_disp.bus.on('vctrl?position__bis', (var184) => inst_ctrl.receiveposition__bisOnctrl_in(var184));
	inst_disp.bus.on('vctrl?positionyxvar122_bis', (y, var122, x, var185) => inst_ctrl.receivepositionyxvar122_bisOnctrl_in(y, var122, x, var185));
	inst_timer.bus.on('timer?timer_timeout', (var131, var108, id) => inst_ctrl.receivetimer_timeoutOnclock(var131, var108, id));
	inst_ctrl.bus.on('clock?timer_start', (time, id, var129, var106) => inst_timer.receivetimer_startOntimer(time, id, var129, var106));
	inst_ctrl.bus.on('clock?timer_cancel', (id, var107, var130) => inst_timer.receivetimer_cancelOntimer(id, var107, var130));
	inst_ctrl.bus.on('controls?position_', (var180) => inst_game.receiveposition_Oncontroller(var180));
	inst_ctrl.bus.on('controls?positionyxvar122', (y, var122, var181, x) => inst_game.receivepositionyxvar122Oncontroller(y, var122, var181, x));
	inst_ctrl.bus.on('controls?position__bis', (var184) => inst_game.receiveposition__bisOncontroller(var184));
	inst_ctrl.bus.on('controls?positionyxvar122_bis', (y, var122, x, var185) => inst_game.receivepositionyxvar122_bisOncontroller(y, var122, x, var185));
	inst_disp.bus.on('display?displayReady_', (var150) => inst_game.receivedisplayReady_Ondisplay(var150));
	inst_disp.bus.on('display?displayReadyvar119', (var119, var151) => inst_game.receivedisplayReadyvar119Ondisplay(var119, var151));
	inst_disp.bus.on('display?displayError_', (var132) => inst_game.receivedisplayError_Ondisplay(var132));
	inst_disp.bus.on('display?displayErrorvar120', (var133, var120) => inst_game.receivedisplayErrorvar120Ondisplay(var133, var120));
	inst_disp.bus.on('display?displayReady__bis', (var174) => inst_game.receivedisplayReady__bisOndisplay(var174));
	inst_disp.bus.on('display?displayReadyvar119_bis', (var175, var119) => inst_game.receivedisplayReadyvar119_bisOndisplay(var175, var119));
	inst_disp.bus.on('display?displayError__bis', (var156) => inst_game.receivedisplayError__bisOndisplay(var156));
	inst_disp.bus.on('display?displayErrorvar120_bis', (var157, var120) => inst_game.receivedisplayErrorvar120_bisOndisplay(var157, var120));
	inst_game.bus.on('display?createysize', (ysize, var152) => inst_disp.receivecreateysizeOndisplay(ysize, var152));
	inst_game.bus.on('display?createxsizevar116', (var153, var116, xsize) => inst_disp.receivecreatexsizevar116Ondisplay(var153, var116, xsize));
	inst_game.bus.on('display?update_', (var144) => inst_disp.receiveupdate_Ondisplay(var144));
	inst_game.bus.on('display?updatevar118', (var145, var118) => inst_disp.receiveupdatevar118Ondisplay(var145, var118));
	inst_game.bus.on('display?clear_', (var154) => inst_disp.receiveclear_Ondisplay(var154));
	inst_game.bus.on('display?clearvar109', (var109, var155) => inst_disp.receiveclearvar109Ondisplay(var109, var155));
	inst_game.bus.on('display?setColorgvar110r', (var142, r, g, var110) => inst_disp.receivesetColorgvar110rOndisplay(var142, r, g, var110));
	inst_game.bus.on('display?setColorb', (var143, b) => inst_disp.receivesetColorbOndisplay(var143, b));
	inst_game.bus.on('display?setBGColorvar111', (var111, var138) => inst_disp.receivesetBGColorvar111Ondisplay(var111, var138));
	inst_game.bus.on('display?setBGColorgrb', (var139, b, g, r) => inst_disp.receivesetBGColorgrbOndisplay(var139, b, g, r));
	inst_game.bus.on('display?drawRectwidthvar112', (var136, width, var112) => inst_disp.receivedrawRectwidthvar112Ondisplay(var136, width, var112));
	inst_game.bus.on('display?drawRectyheightx', (height, x, var137, y) => inst_disp.receivedrawRectyheightxOndisplay(height, x, var137, y));
	inst_game.bus.on('display?fillRectxheightwidthy', (y, x, var134, width, height) => inst_disp.receivefillRectxheightwidthyOndisplay(y, x, var134, width, height));
	inst_game.bus.on('display?fillRectvar113', (var135, var113) => inst_disp.receivefillRectvar113Ondisplay(var135, var113));
	inst_game.bus.on('display?drawInteger_', (var146) => inst_disp.receivedrawInteger_Ondisplay(var146));
	inst_game.bus.on('display?drawIntegerscalevar114vydigitsx', (var114, scale, x, var147, v, digits, y) => inst_disp.receivedrawIntegerscalevar114vydigitsxOndisplay(var114, scale, x, var147, v, digits, y));
	inst_game.bus.on('display?drawThingMLvar115x', (var140, x, var115) => inst_disp.receivedrawThingMLvar115xOndisplay(var140, x, var115));
	inst_game.bus.on('display?drawThingMLy', (var141, y) => inst_disp.receivedrawThingMLyOndisplay(var141, y));
	inst_game.bus.on('display?createysize_bis', (ysize, var176) => inst_disp.receivecreateysize_bisOndisplay(ysize, var176));
	inst_game.bus.on('display?createxsizevar116_bis', (var116, var177, xsize) => inst_disp.receivecreatexsizevar116_bisOndisplay(var116, var177, xsize));
	inst_game.bus.on('display?update__bis', (var168) => inst_disp.receiveupdate__bisOndisplay(var168));
	inst_game.bus.on('display?updatevar118_bis', (var118, var169) => inst_disp.receiveupdatevar118_bisOndisplay(var118, var169));
	inst_game.bus.on('display?clear__bis', (var178) => inst_disp.receiveclear__bisOndisplay(var178));
	inst_game.bus.on('display?clearvar109_bis', (var109, var179) => inst_disp.receiveclearvar109_bisOndisplay(var109, var179));
	inst_game.bus.on('display?setColorgvar110r_bis', (g, var166, var110, r) => inst_disp.receivesetColorgvar110r_bisOndisplay(g, var166, var110, r));
	inst_game.bus.on('display?setColorb_bis', (var167, b) => inst_disp.receivesetColorb_bisOndisplay(var167, b));
	inst_game.bus.on('display?setBGColorvar111_bis', (var162, var111) => inst_disp.receivesetBGColorvar111_bisOndisplay(var162, var111));
	inst_game.bus.on('display?setBGColorgrb_bis', (r, b, g, var163) => inst_disp.receivesetBGColorgrb_bisOndisplay(r, b, g, var163));
	inst_game.bus.on('display?drawRectwidthvar112_bis', (var160, var112, width) => inst_disp.receivedrawRectwidthvar112_bisOndisplay(var160, var112, width));
	inst_game.bus.on('display?drawRectyheightx_bis', (x, height, var161, y) => inst_disp.receivedrawRectyheightx_bisOndisplay(x, height, var161, y));
	inst_game.bus.on('display?fillRectxheightwidthy_bis', (y, x, var158, height, width) => inst_disp.receivefillRectxheightwidthy_bisOndisplay(y, x, var158, height, width));
	inst_game.bus.on('display?fillRectvar113_bis', (var113, var159) => inst_disp.receivefillRectvar113_bisOndisplay(var113, var159));
	inst_game.bus.on('display?drawInteger__bis', (var170) => inst_disp.receivedrawInteger__bisOndisplay(var170));
	inst_game.bus.on('display?drawIntegerscalevar114vydigitsx_bis', (v, x, scale, y, var171, var114, digits) => inst_disp.receivedrawIntegerscalevar114vydigitsx_bisOndisplay(v, x, scale, y, var171, var114, digits));
	inst_game.bus.on('display?drawThingMLvar115x_bis', (var164, x, var115) => inst_disp.receivedrawThingMLvar115x_bisOndisplay(var164, x, var115));
	inst_game.bus.on('display?drawThingMLy_bis', (var165, y) => inst_disp.receivedrawThingMLy_bisOndisplay(var165, y));
	
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

