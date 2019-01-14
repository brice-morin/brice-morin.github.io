'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_timer = new TimerJSRND('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_disp = new DisplayBrowserRND('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var322_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorb_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorvar322gr_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_var323_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorgr_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorvar323b_var(false);inst_disp.initDisplay_SC_Running_display_clear_var321_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar321_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_var324_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRecty_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectvar324xwidthheight_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_var325_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectyheight_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectxwidthvar325_var(false);inst_disp.initDisplay_SC_Running_display_update_var330_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar330_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var326_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerv_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_var327_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLvar327x_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var329_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar329_var(false);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var328_var(0);inst_disp.initDisplay_SC_Wait_received_display_createxsize_var(false);inst_disp.initDisplay_SC_Wait_received_display_createysizevar328_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_ctrl = new VelocityControllerRND('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_var333_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocitydx_var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocityvar333dy_var(false);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_var334_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positiony_var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionvar334x_var(false);
	const inst_sound = new SoundControllerBrowserRND('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_sound_tone_var338_var(0);inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_received_sound_tonefreqvar338_var(false);inst_sound.initSound_behavior_INIT_received_sound_tonetime_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	const inst_game = new BreakoutGameBrowserRND('game', null);
	var inst_game_bricks = [];var inst_game_fgcolor = [];var inst_game_bgcolor = [];inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var331_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar331_var(false);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_var334_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_received_controller_positiony_var(false);inst_game.initBreakoutGame_SC_received_controller_positionvar334x_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var339_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar339_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var340_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar340_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var339_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar339_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var340_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar340_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var418) => inst_game.receivelostBall_Ongame(var418));
	inst_game.bus.on('game?lostBallvar339', (var419, var339) => inst_game.receivelostBallvar339Ongame(var419, var339));
	inst_game.bus.on('game?nextLevel_', (var416) => inst_game.receivenextLevel_Ongame(var416));
	inst_game.bus.on('game?nextLevelvar340', (var417, var340) => inst_game.receivenextLevelvar340Ongame(var417, var340));
	inst_game.bus.on('game?lostBall__bis', (var422) => inst_game.receivelostBall__bisOngame(var422));
	inst_game.bus.on('game?lostBallvar339_bis', (var423, var339) => inst_game.receivelostBallvar339_bisOngame(var423, var339));
	inst_game.bus.on('game?nextLevel__bis', (var420) => inst_game.receivenextLevel__bisOngame(var420));
	inst_game.bus.on('game?nextLevelvar340_bis', (var340, var421) => inst_game.receivenextLevelvar340_bisOngame(var340, var421));
	/*Connecting ports...*/
	inst_game.bus.on('sound?tonefreqvar338', (var412, freq, var338) => inst_sound.receivetonefreqvar338Onsound(var412, freq, var338));
	inst_game.bus.on('sound?tonetime', (time, var413) => inst_sound.receivetonetimeOnsound(time, var413));
	inst_game.bus.on('sound?tonefreqvar338_bis', (var414, var338, freq) => inst_sound.receivetonefreqvar338_bisOnsound(var414, var338, freq));
	inst_game.bus.on('sound?tonetime_bis', (time, var415) => inst_sound.receivetonetime_bisOnsound(time, var415));
	inst_timer.bus.on('timer?timer_timeout', (var341, id, var320) => inst_game.receivetimer_timeoutOnclock(var341, id, var320));
	inst_game.bus.on('clock?timer_start', (var342, var318, id, time) => inst_timer.receivetimer_startOntimer(var342, var318, id, time));
	inst_game.bus.on('clock?timer_cancel', (id, var319, var343) => inst_timer.receivetimer_cancelOntimer(id, var319, var343));
	inst_disp.bus.on('vctrl?velocitydx', (var392, dx) => inst_ctrl.receivevelocitydxOnctrl_in(var392, dx));
	inst_disp.bus.on('vctrl?velocityvar333dy', (var333, dy, var393) => inst_ctrl.receivevelocityvar333dyOnctrl_in(var333, dy, var393));
	inst_disp.bus.on('vctrl?positiony', (y, var394) => inst_ctrl.receivepositionyOnctrl_in(y, var394));
	inst_disp.bus.on('vctrl?positionvar334x', (var334, var395, x) => inst_ctrl.receivepositionvar334xOnctrl_in(var334, var395, x));
	inst_disp.bus.on('vctrl?velocitydx_bis', (var396, dx) => inst_ctrl.receivevelocitydx_bisOnctrl_in(var396, dx));
	inst_disp.bus.on('vctrl?velocityvar333dy_bis', (var333, var397, dy) => inst_ctrl.receivevelocityvar333dy_bisOnctrl_in(var333, var397, dy));
	inst_disp.bus.on('vctrl?positiony_bis', (var398, y) => inst_ctrl.receivepositiony_bisOnctrl_in(var398, y));
	inst_disp.bus.on('vctrl?positionvar334x_bis', (var399, var334, x) => inst_ctrl.receivepositionvar334x_bisOnctrl_in(var399, var334, x));
	inst_timer.bus.on('timer?timer_timeout', (var341, id, var320) => inst_ctrl.receivetimer_timeoutOnclock(var341, id, var320));
	inst_ctrl.bus.on('clock?timer_start', (var342, var318, id, time) => inst_timer.receivetimer_startOntimer(var342, var318, id, time));
	inst_ctrl.bus.on('clock?timer_cancel', (id, var319, var343) => inst_timer.receivetimer_cancelOntimer(id, var319, var343));
	inst_ctrl.bus.on('controls?positiony', (y, var394) => inst_game.receivepositionyOncontroller(y, var394));
	inst_ctrl.bus.on('controls?positionvar334x', (var334, var395, x) => inst_game.receivepositionvar334xOncontroller(var334, var395, x));
	inst_ctrl.bus.on('controls?positiony_bis', (var398, y) => inst_game.receivepositiony_bisOncontroller(var398, y));
	inst_ctrl.bus.on('controls?positionvar334x_bis', (var399, var334, x) => inst_game.receivepositionvar334x_bisOncontroller(var399, var334, x));
	inst_disp.bus.on('display?displayReady_', (var366) => inst_game.receivedisplayReady_Ondisplay(var366));
	inst_disp.bus.on('display?displayReadyvar331', (var367, var331) => inst_game.receivedisplayReadyvar331Ondisplay(var367, var331));
	inst_disp.bus.on('display?displayError_', (var358) => inst_game.receivedisplayError_Ondisplay(var358));
	inst_disp.bus.on('display?displayErrorvar332', (var359, var332) => inst_game.receivedisplayErrorvar332Ondisplay(var359, var332));
	inst_disp.bus.on('display?displayReady__bis', (var390) => inst_game.receivedisplayReady__bisOndisplay(var390));
	inst_disp.bus.on('display?displayReadyvar331_bis', (var391, var331) => inst_game.receivedisplayReadyvar331_bisOndisplay(var391, var331));
	inst_disp.bus.on('display?displayError__bis', (var382) => inst_game.receivedisplayError__bisOndisplay(var382));
	inst_disp.bus.on('display?displayErrorvar332_bis', (var383, var332) => inst_game.receivedisplayErrorvar332_bisOndisplay(var383, var332));
	inst_game.bus.on('display?createxsize', (xsize, var362) => inst_disp.receivecreatexsizeOndisplay(xsize, var362));
	inst_game.bus.on('display?createysizevar328', (var363, var328, ysize) => inst_disp.receivecreateysizevar328Ondisplay(var363, var328, ysize));
	inst_game.bus.on('display?update_', (var360) => inst_disp.receiveupdate_Ondisplay(var360));
	inst_game.bus.on('display?updatevar330', (var330, var361) => inst_disp.receiveupdatevar330Ondisplay(var330, var361));
	inst_game.bus.on('display?clear_', (var346) => inst_disp.receiveclear_Ondisplay(var346));
	inst_game.bus.on('display?clearvar321', (var347, var321) => inst_disp.receiveclearvar321Ondisplay(var347, var321));
	inst_game.bus.on('display?setColorb', (b, var344) => inst_disp.receivesetColorbOndisplay(b, var344));
	inst_game.bus.on('display?setColorvar322gr', (g, r, var322, var345) => inst_disp.receivesetColorvar322grOndisplay(g, r, var322, var345));
	inst_game.bus.on('display?setBGColorgr', (r, var356, g) => inst_disp.receivesetBGColorgrOndisplay(r, var356, g));
	inst_game.bus.on('display?setBGColorvar323b', (var323, b, var357) => inst_disp.receivesetBGColorvar323bOndisplay(var323, b, var357));
	inst_game.bus.on('display?drawRecty', (y, var364) => inst_disp.receivedrawRectyOndisplay(y, var364));
	inst_game.bus.on('display?drawRectvar324xwidthheight', (width, var324, var365, height, x) => inst_disp.receivedrawRectvar324xwidthheightOndisplay(width, var324, var365, height, x));
	inst_game.bus.on('display?fillRectyheight', (var350, y, height) => inst_disp.receivefillRectyheightOndisplay(var350, y, height));
	inst_game.bus.on('display?fillRectxwidthvar325', (var351, x, var325, width) => inst_disp.receivefillRectxwidthvar325Ondisplay(var351, x, var325, width));
	inst_game.bus.on('display?drawIntegerv', (var348, v) => inst_disp.receivedrawIntegervOndisplay(var348, v));
	inst_game.bus.on('display?drawIntegerxdigitsvar326scaley', (y, digits, var349, x, scale, var326) => inst_disp.receivedrawIntegerxdigitsvar326scaleyOndisplay(y, digits, var349, x, scale, var326));
	inst_game.bus.on('display?drawThingMLvar327x', (var327, var354, x) => inst_disp.receivedrawThingMLvar327xOndisplay(var327, var354, x));
	inst_game.bus.on('display?drawThingMLy', (var355, y) => inst_disp.receivedrawThingMLyOndisplay(var355, y));
	inst_game.bus.on('display?createxsize_bis', (xsize, var386) => inst_disp.receivecreatexsize_bisOndisplay(xsize, var386));
	inst_game.bus.on('display?createysizevar328_bis', (var328, ysize, var387) => inst_disp.receivecreateysizevar328_bisOndisplay(var328, ysize, var387));
	inst_game.bus.on('display?update__bis', (var384) => inst_disp.receiveupdate__bisOndisplay(var384));
	inst_game.bus.on('display?updatevar330_bis', (var385, var330) => inst_disp.receiveupdatevar330_bisOndisplay(var385, var330));
	inst_game.bus.on('display?clear__bis', (var370) => inst_disp.receiveclear__bisOndisplay(var370));
	inst_game.bus.on('display?clearvar321_bis', (var371, var321) => inst_disp.receiveclearvar321_bisOndisplay(var371, var321));
	inst_game.bus.on('display?setColorb_bis', (b, var368) => inst_disp.receivesetColorb_bisOndisplay(b, var368));
	inst_game.bus.on('display?setColorvar322gr_bis', (g, r, var369, var322) => inst_disp.receivesetColorvar322gr_bisOndisplay(g, r, var369, var322));
	inst_game.bus.on('display?setBGColorgr_bis', (var380, g, r) => inst_disp.receivesetBGColorgr_bisOndisplay(var380, g, r));
	inst_game.bus.on('display?setBGColorvar323b_bis', (var323, var381, b) => inst_disp.receivesetBGColorvar323b_bisOndisplay(var323, var381, b));
	inst_game.bus.on('display?drawRecty_bis', (y, var388) => inst_disp.receivedrawRecty_bisOndisplay(y, var388));
	inst_game.bus.on('display?drawRectvar324xwidthheight_bis', (width, var324, x, height, var389) => inst_disp.receivedrawRectvar324xwidthheight_bisOndisplay(width, var324, x, height, var389));
	inst_game.bus.on('display?fillRectyheight_bis', (height, var374, y) => inst_disp.receivefillRectyheight_bisOndisplay(height, var374, y));
	inst_game.bus.on('display?fillRectxwidthvar325_bis', (x, width, var325, var375) => inst_disp.receivefillRectxwidthvar325_bisOndisplay(x, width, var325, var375));
	inst_game.bus.on('display?drawIntegerv_bis', (v, var372) => inst_disp.receivedrawIntegerv_bisOndisplay(v, var372));
	inst_game.bus.on('display?drawIntegerxdigitsvar326scaley_bis', (x, y, scale, digits, var326, var373) => inst_disp.receivedrawIntegerxdigitsvar326scaley_bisOndisplay(x, y, scale, digits, var326, var373));
	inst_game.bus.on('display?drawThingMLvar327x_bis', (var378, x, var327) => inst_disp.receivedrawThingMLvar327x_bisOndisplay(var378, x, var327));
	inst_game.bus.on('display?drawThingMLy_bis', (y, var379) => inst_disp.receivedrawThingMLy_bisOndisplay(y, var379));
	
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

