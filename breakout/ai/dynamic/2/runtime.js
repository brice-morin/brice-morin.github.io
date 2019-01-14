'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_var229_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAballypadx_var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var216_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorbr_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorgvar216_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_var217_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorvar217g_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorrb_var(false);inst_disp.initDisplay_SC_Running_display_clear_var215_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar215_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_var218_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectvar218widthheight_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectxy_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_var219_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRect__var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectyheightvar219widthx_var(false);inst_disp.initDisplay_SC_Running_display_update_var224_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar224_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var220_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerscalevar220xv_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegerdigitsy_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_var221_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingML__var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLxyvar221_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var223_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar223_var(false);inst_disp.initDisplay_SC_Wait_display_create_var222_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_received_display_createvar222_var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizeysize_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_fgcolor = [];var inst_game_bgcolor = [];var inst_game_bricks = [];inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var225_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar225_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_controller_position_var228_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_received_controller_positionx_var(false);inst_game.initBreakoutGame_SC_received_controller_positionvar228y_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var232_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar232_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var233_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar233_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var232_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar232_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var233_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar233_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var308) => inst_game.receivelostBall_Ongame(var308));
	inst_game.bus.on('game?lostBallvar232', (var232, var309) => inst_game.receivelostBallvar232Ongame(var232, var309));
	inst_game.bus.on('game?nextLevel_', (var306) => inst_game.receivenextLevel_Ongame(var306));
	inst_game.bus.on('game?nextLevelvar233', (var233, var307) => inst_game.receivenextLevelvar233Ongame(var233, var307));
	inst_game.bus.on('game?lostBall__bis', (var312) => inst_game.receivelostBall__bisOngame(var312));
	inst_game.bus.on('game?lostBallvar232_bis', (var232, var313) => inst_game.receivelostBallvar232_bisOngame(var232, var313));
	inst_game.bus.on('game?nextLevel__bis', (var310) => inst_game.receivenextLevel__bisOngame(var310));
	inst_game.bus.on('game?nextLevelvar233_bis', (var311, var233) => inst_game.receivenextLevelvar233_bisOngame(var311, var233));
	/*Connecting ports...*/
	inst_disp.bus.on('display?displayReady_', (var246) => inst_game.receivedisplayReady_Ondisplay(var246));
	inst_disp.bus.on('display?displayReadyvar225', (var247, var225) => inst_game.receivedisplayReadyvar225Ondisplay(var247, var225));
	inst_disp.bus.on('display?displayError_', (var252) => inst_game.receivedisplayError_Ondisplay(var252));
	inst_disp.bus.on('display?displayErrorvar226', (var253, var226) => inst_game.receivedisplayErrorvar226Ondisplay(var253, var226));
	inst_disp.bus.on('display?displayReady__bis', (var270) => inst_game.receivedisplayReady__bisOndisplay(var270));
	inst_disp.bus.on('display?displayReadyvar225_bis', (var271, var225) => inst_game.receivedisplayReadyvar225_bisOndisplay(var271, var225));
	inst_disp.bus.on('display?displayError__bis', (var276) => inst_game.receivedisplayError__bisOndisplay(var276));
	inst_disp.bus.on('display?displayErrorvar226_bis', (var277, var226) => inst_game.receivedisplayErrorvar226_bisOndisplay(var277, var226));
	inst_game.bus.on('display?createvar222', (var242, var222) => inst_disp.receivecreatevar222Ondisplay(var242, var222));
	inst_game.bus.on('display?createxsizeysize', (xsize, var243, ysize) => inst_disp.receivecreatexsizeysizeOndisplay(xsize, var243, ysize));
	inst_game.bus.on('display?update_', (var248) => inst_disp.receiveupdate_Ondisplay(var248));
	inst_game.bus.on('display?updatevar224', (var249, var224) => inst_disp.receiveupdatevar224Ondisplay(var249, var224));
	inst_game.bus.on('display?clear_', (var260) => inst_disp.receiveclear_Ondisplay(var260));
	inst_game.bus.on('display?clearvar215', (var261, var215) => inst_disp.receiveclearvar215Ondisplay(var261, var215));
	inst_game.bus.on('display?setColorbr', (var256, r, b) => inst_disp.receivesetColorbrOndisplay(var256, r, b));
	inst_game.bus.on('display?setColorgvar216', (g, var257, var216) => inst_disp.receivesetColorgvar216Ondisplay(g, var257, var216));
	inst_game.bus.on('display?setBGColorvar217g', (g, var217, var250) => inst_disp.receivesetBGColorvar217gOndisplay(g, var217, var250));
	inst_game.bus.on('display?setBGColorrb', (b, r, var251) => inst_disp.receivesetBGColorrbOndisplay(b, r, var251));
	inst_game.bus.on('display?drawRectvar218widthheight', (var238, width, var218, height) => inst_disp.receivedrawRectvar218widthheightOndisplay(var238, width, var218, height));
	inst_game.bus.on('display?drawRectxy', (y, var239, x) => inst_disp.receivedrawRectxyOndisplay(y, var239, x));
	inst_game.bus.on('display?fillRect_', (var254) => inst_disp.receivefillRect_Ondisplay(var254));
	inst_game.bus.on('display?fillRectyheightvar219widthx', (y, var219, height, var255, width, x) => inst_disp.receivefillRectyheightvar219widthxOndisplay(y, var219, height, var255, width, x));
	inst_game.bus.on('display?drawIntegerscalevar220xv', (var240, var220, v, scale, x) => inst_disp.receivedrawIntegerscalevar220xvOndisplay(var240, var220, v, scale, x));
	inst_game.bus.on('display?drawIntegerdigitsy', (digits, y, var241) => inst_disp.receivedrawIntegerdigitsyOndisplay(digits, y, var241));
	inst_game.bus.on('display?drawThingML_', (var244) => inst_disp.receivedrawThingML_Ondisplay(var244));
	inst_game.bus.on('display?drawThingMLxyvar221', (var221, x, var245, y) => inst_disp.receivedrawThingMLxyvar221Ondisplay(var221, x, var245, y));
	inst_game.bus.on('display?createvar222_bis', (var266, var222) => inst_disp.receivecreatevar222_bisOndisplay(var266, var222));
	inst_game.bus.on('display?createxsizeysize_bis', (var267, xsize, ysize) => inst_disp.receivecreatexsizeysize_bisOndisplay(var267, xsize, ysize));
	inst_game.bus.on('display?update__bis', (var272) => inst_disp.receiveupdate__bisOndisplay(var272));
	inst_game.bus.on('display?updatevar224_bis', (var224, var273) => inst_disp.receiveupdatevar224_bisOndisplay(var224, var273));
	inst_game.bus.on('display?clear__bis', (var284) => inst_disp.receiveclear__bisOndisplay(var284));
	inst_game.bus.on('display?clearvar215_bis', (var215, var285) => inst_disp.receiveclearvar215_bisOndisplay(var215, var285));
	inst_game.bus.on('display?setColorbr_bis', (r, var280, b) => inst_disp.receivesetColorbr_bisOndisplay(r, var280, b));
	inst_game.bus.on('display?setColorgvar216_bis', (g, var216, var281) => inst_disp.receivesetColorgvar216_bisOndisplay(g, var216, var281));
	inst_game.bus.on('display?setBGColorvar217g_bis', (var217, var274, g) => inst_disp.receivesetBGColorvar217g_bisOndisplay(var217, var274, g));
	inst_game.bus.on('display?setBGColorrb_bis', (r, b, var275) => inst_disp.receivesetBGColorrb_bisOndisplay(r, b, var275));
	inst_game.bus.on('display?drawRectvar218widthheight_bis', (width, var218, height, var262) => inst_disp.receivedrawRectvar218widthheight_bisOndisplay(width, var218, height, var262));
	inst_game.bus.on('display?drawRectxy_bis', (x, var263, y) => inst_disp.receivedrawRectxy_bisOndisplay(x, var263, y));
	inst_game.bus.on('display?fillRect__bis', (var278) => inst_disp.receivefillRect__bisOndisplay(var278));
	inst_game.bus.on('display?fillRectyheightvar219widthx_bis', (var279, var219, width, y, x, height) => inst_disp.receivefillRectyheightvar219widthx_bisOndisplay(var279, var219, width, y, x, height));
	inst_game.bus.on('display?drawIntegerscalevar220xv_bis', (scale, v, var220, var264, x) => inst_disp.receivedrawIntegerscalevar220xv_bisOndisplay(scale, v, var220, var264, x));
	inst_game.bus.on('display?drawIntegerdigitsy_bis', (var265, digits, y) => inst_disp.receivedrawIntegerdigitsy_bisOndisplay(var265, digits, y));
	inst_game.bus.on('display?drawThingML__bis', (var268) => inst_disp.receivedrawThingML__bisOndisplay(var268));
	inst_game.bus.on('display?drawThingMLxyvar221_bis', (x, var221, y, var269) => inst_disp.receivedrawThingMLxyvar221_bisOndisplay(x, var221, y, var269));
	inst_ctrl.bus.on('controls?positionx', (var286, x) => inst_game.receivepositionxOncontroller(var286, x));
	inst_ctrl.bus.on('controls?positionvar228y', (var287, y, var228) => inst_game.receivepositionvar228yOncontroller(var287, y, var228));
	inst_ctrl.bus.on('controls?positionx_bis', (x, var290) => inst_game.receivepositionx_bisOncontroller(x, var290));
	inst_ctrl.bus.on('controls?positionvar228y_bis', (var228, y, var291) => inst_game.receivepositionvar228y_bisOncontroller(var228, y, var291));
	inst_timer.bus.on('timer?timer_timeout', (id, var235, var214) => inst_game.receivetimer_timeoutOnclock(id, var235, var214));
	inst_game.bus.on('clock?timer_start', (id, var237, var212, time) => inst_timer.receivetimer_startOntimer(id, var237, var212, time));
	inst_game.bus.on('clock?timer_cancel', (var213, id, var236) => inst_timer.receivetimer_cancelOntimer(var213, id, var236));
	inst_game.bus.on('ia?updateIAballypadx', (var298, padx, bally) => inst_ctrl.receiveupdateIAballypadxOngame(var298, padx, bally));
	inst_game.bus.on('ia?updateIAballxpadyvar229', (ballx, var229, var299, pady) => inst_ctrl.receiveupdateIAballxpadyvar229Ongame(ballx, var229, var299, pady));
	inst_game.bus.on('ia?updateIAballypadx_bis', (bally, padx, var304) => inst_ctrl.receiveupdateIAballypadx_bisOngame(bally, padx, var304));
	inst_game.bus.on('ia?updateIAballxpadyvar229_bis', (var305, ballx, var229, pady) => inst_ctrl.receiveupdateIAballxpadyvar229_bisOngame(var305, ballx, var229, pady));
	
	inst_timer._init();
	inst_disp._init();
	inst_game._init();
	inst_ctrl._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

