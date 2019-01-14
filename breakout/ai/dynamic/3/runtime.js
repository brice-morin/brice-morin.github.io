'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_var335_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIApadyballxpadx_var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAvar335bally_var(false);
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_fgcolor = [];var inst_game_bgcolor = [];var inst_game_bricks = [];inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var338_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar338_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var339_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar339_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var338_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar338_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var339_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar339_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var331_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar331_var(false);inst_game.initBreakoutGame_SC_controller_position_var334_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_received_controller_positionvar334_var(false);inst_game.initBreakoutGame_SC_received_controller_positionxy_var(false);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var322_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorb_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorvar322rg_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_var323_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColor__var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorrvar323gb_var(false);inst_disp.initDisplay_SC_Running_display_clear_var321_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar321_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_var324_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectvar324heightwidthx_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRecty_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_var325_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectwidthyx_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectvar325height_var(false);inst_disp.initDisplay_SC_Running_display_update_var330_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar330_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var326_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegervyvar326scale_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegerxdigits_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_var327_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingML__var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLvar327xy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var329_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar329_var(false);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var328_var(0);inst_disp.initDisplay_SC_Wait_received_display_create__var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizeysizevar328_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var414) => inst_game.receivelostBall_Ongame(var414));
	inst_game.bus.on('game?lostBallvar338', (var415, var338) => inst_game.receivelostBallvar338Ongame(var415, var338));
	inst_game.bus.on('game?nextLevel_', (var412) => inst_game.receivenextLevel_Ongame(var412));
	inst_game.bus.on('game?nextLevelvar339', (var339, var413) => inst_game.receivenextLevelvar339Ongame(var339, var413));
	inst_game.bus.on('game?lostBall__bis', (var418) => inst_game.receivelostBall__bisOngame(var418));
	inst_game.bus.on('game?lostBallvar338_bis', (var338, var419) => inst_game.receivelostBallvar338_bisOngame(var338, var419));
	inst_game.bus.on('game?nextLevel__bis', (var416) => inst_game.receivenextLevel__bisOngame(var416));
	inst_game.bus.on('game?nextLevelvar339_bis', (var417, var339) => inst_game.receivenextLevelvar339_bisOngame(var417, var339));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (id, var320, var343) => inst_game.receivetimer_timeoutOnclock(id, var320, var343));
	inst_game.bus.on('clock?timer_start', (var318, id, time, var341) => inst_timer.receivetimer_startOntimer(var318, id, time, var341));
	inst_game.bus.on('clock?timer_cancel', (var342, var319, id) => inst_timer.receivetimer_cancelOntimer(var342, var319, id));
	inst_disp.bus.on('display?displayReady_', (var354) => inst_game.receivedisplayReady_Ondisplay(var354));
	inst_disp.bus.on('display?displayReadyvar331', (var331, var355) => inst_game.receivedisplayReadyvar331Ondisplay(var331, var355));
	inst_disp.bus.on('display?displayError_', (var356) => inst_game.receivedisplayError_Ondisplay(var356));
	inst_disp.bus.on('display?displayErrorvar332', (var357, var332) => inst_game.receivedisplayErrorvar332Ondisplay(var357, var332));
	inst_disp.bus.on('display?displayReady__bis', (var378) => inst_game.receivedisplayReady__bisOndisplay(var378));
	inst_disp.bus.on('display?displayReadyvar331_bis', (var331, var379) => inst_game.receivedisplayReadyvar331_bisOndisplay(var331, var379));
	inst_disp.bus.on('display?displayError__bis', (var380) => inst_game.receivedisplayError__bisOndisplay(var380));
	inst_disp.bus.on('display?displayErrorvar332_bis', (var332, var381) => inst_game.receivedisplayErrorvar332_bisOndisplay(var332, var381));
	inst_game.bus.on('display?create_', (var352) => inst_disp.receivecreate_Ondisplay(var352));
	inst_game.bus.on('display?createxsizeysizevar328', (var328, ysize, xsize, var353) => inst_disp.receivecreatexsizeysizevar328Ondisplay(var328, ysize, xsize, var353));
	inst_game.bus.on('display?update_', (var346) => inst_disp.receiveupdate_Ondisplay(var346));
	inst_game.bus.on('display?updatevar330', (var347, var330) => inst_disp.receiveupdatevar330Ondisplay(var347, var330));
	inst_game.bus.on('display?clear_', (var364) => inst_disp.receiveclear_Ondisplay(var364));
	inst_game.bus.on('display?clearvar321', (var321, var365) => inst_disp.receiveclearvar321Ondisplay(var321, var365));
	inst_game.bus.on('display?setColorb', (var344, b) => inst_disp.receivesetColorbOndisplay(var344, b));
	inst_game.bus.on('display?setColorvar322rg', (var345, r, var322, g) => inst_disp.receivesetColorvar322rgOndisplay(var345, r, var322, g));
	inst_game.bus.on('display?setBGColor_', (var362) => inst_disp.receivesetBGColor_Ondisplay(var362));
	inst_game.bus.on('display?setBGColorrvar323gb', (b, g, r, var363, var323) => inst_disp.receivesetBGColorrvar323gbOndisplay(b, g, r, var363, var323));
	inst_game.bus.on('display?drawRectvar324heightwidthx', (x, width, var366, var324, height) => inst_disp.receivedrawRectvar324heightwidthxOndisplay(x, width, var366, var324, height));
	inst_game.bus.on('display?drawRecty', (y, var367) => inst_disp.receivedrawRectyOndisplay(y, var367));
	inst_game.bus.on('display?fillRectwidthyx', (var358, width, x, y) => inst_disp.receivefillRectwidthyxOndisplay(var358, width, x, y));
	inst_game.bus.on('display?fillRectvar325height', (var325, height, var359) => inst_disp.receivefillRectvar325heightOndisplay(var325, height, var359));
	inst_game.bus.on('display?drawIntegervyvar326scale', (y, var326, scale, v, var360) => inst_disp.receivedrawIntegervyvar326scaleOndisplay(y, var326, scale, v, var360));
	inst_game.bus.on('display?drawIntegerxdigits', (var361, digits, x) => inst_disp.receivedrawIntegerxdigitsOndisplay(var361, digits, x));
	inst_game.bus.on('display?drawThingML_', (var350) => inst_disp.receivedrawThingML_Ondisplay(var350));
	inst_game.bus.on('display?drawThingMLvar327xy', (var327, x, y, var351) => inst_disp.receivedrawThingMLvar327xyOndisplay(var327, x, y, var351));
	inst_game.bus.on('display?create__bis', (var376) => inst_disp.receivecreate__bisOndisplay(var376));
	inst_game.bus.on('display?createxsizeysizevar328_bis', (var377, xsize, var328, ysize) => inst_disp.receivecreatexsizeysizevar328_bisOndisplay(var377, xsize, var328, ysize));
	inst_game.bus.on('display?update__bis', (var370) => inst_disp.receiveupdate__bisOndisplay(var370));
	inst_game.bus.on('display?updatevar330_bis', (var330, var371) => inst_disp.receiveupdatevar330_bisOndisplay(var330, var371));
	inst_game.bus.on('display?clear__bis', (var388) => inst_disp.receiveclear__bisOndisplay(var388));
	inst_game.bus.on('display?clearvar321_bis', (var321, var389) => inst_disp.receiveclearvar321_bisOndisplay(var321, var389));
	inst_game.bus.on('display?setColorb_bis', (b, var368) => inst_disp.receivesetColorb_bisOndisplay(b, var368));
	inst_game.bus.on('display?setColorvar322rg_bis', (var369, var322, g, r) => inst_disp.receivesetColorvar322rg_bisOndisplay(var369, var322, g, r));
	inst_game.bus.on('display?setBGColor__bis', (var386) => inst_disp.receivesetBGColor__bisOndisplay(var386));
	inst_game.bus.on('display?setBGColorrvar323gb_bis', (r, var387, g, b, var323) => inst_disp.receivesetBGColorrvar323gb_bisOndisplay(r, var387, g, b, var323));
	inst_game.bus.on('display?drawRectvar324heightwidthx_bis', (height, width, x, var390, var324) => inst_disp.receivedrawRectvar324heightwidthx_bisOndisplay(height, width, x, var390, var324));
	inst_game.bus.on('display?drawRecty_bis', (var391, y) => inst_disp.receivedrawRecty_bisOndisplay(var391, y));
	inst_game.bus.on('display?fillRectwidthyx_bis', (width, y, x, var382) => inst_disp.receivefillRectwidthyx_bisOndisplay(width, y, x, var382));
	inst_game.bus.on('display?fillRectvar325height_bis', (height, var383, var325) => inst_disp.receivefillRectvar325height_bisOndisplay(height, var383, var325));
	inst_game.bus.on('display?drawIntegervyvar326scale_bis', (scale, var326, v, var384, y) => inst_disp.receivedrawIntegervyvar326scale_bisOndisplay(scale, var326, v, var384, y));
	inst_game.bus.on('display?drawIntegerxdigits_bis', (var385, x, digits) => inst_disp.receivedrawIntegerxdigits_bisOndisplay(var385, x, digits));
	inst_game.bus.on('display?drawThingML__bis', (var374) => inst_disp.receivedrawThingML__bisOndisplay(var374));
	inst_game.bus.on('display?drawThingMLvar327xy_bis', (y, x, var327, var375) => inst_disp.receivedrawThingMLvar327xy_bisOndisplay(y, x, var327, var375));
	inst_ctrl.bus.on('controls?positionvar334', (var392, var334) => inst_game.receivepositionvar334Oncontroller(var392, var334));
	inst_ctrl.bus.on('controls?positionxy', (y, var393, x) => inst_game.receivepositionxyOncontroller(y, var393, x));
	inst_ctrl.bus.on('controls?positionvar334_bis', (var396, var334) => inst_game.receivepositionvar334_bisOncontroller(var396, var334));
	inst_ctrl.bus.on('controls?positionxy_bis', (x, var397, y) => inst_game.receivepositionxy_bisOncontroller(x, var397, y));
	inst_game.bus.on('ia?updateIApadyballxpadx', (var402, ballx, padx, pady) => inst_ctrl.receiveupdateIApadyballxpadxOngame(var402, ballx, padx, pady));
	inst_game.bus.on('ia?updateIAvar335bally', (var335, var403, bally) => inst_ctrl.receiveupdateIAvar335ballyOngame(var335, var403, bally));
	inst_game.bus.on('ia?updateIApadyballxpadx_bis', (pady, var408, padx, ballx) => inst_ctrl.receiveupdateIApadyballxpadx_bisOngame(pady, var408, padx, ballx));
	inst_game.bus.on('ia?updateIAvar335bally_bis', (var409, var335, bally) => inst_ctrl.receiveupdateIAvar335bally_bisOngame(var409, var335, bally));
	
	inst_timer._init();
	inst_disp._init();
	inst_game._init();
	inst_ctrl._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

