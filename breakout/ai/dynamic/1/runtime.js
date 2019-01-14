'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_bgcolor = [];var inst_game_fgcolor = [];var inst_game_bricks = [];inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var126_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar126_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var127_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar127_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var126_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar126_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var127_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar127_var(false);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var119_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar119_var(false);inst_game.initBreakoutGame_SC_controller_position_var122_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_received_controller_positionvar122_var(false);inst_game.initBreakoutGame_SC_received_controller_positionyx_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var116_var(0);inst_disp.initDisplay_SC_Wait_received_display_create__var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizeysizevar116_var(false);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var110_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorgr_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorbvar110_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_var111_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorrvar111b_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorg_var(false);inst_disp.initDisplay_SC_Running_display_clear_var109_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar109_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_var112_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectyvar112height_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectwidthx_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_var113_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRect__var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectvar113heightwidthyx_var(false);inst_disp.initDisplay_SC_Running_display_update_var118_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar118_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var114_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerdigitsv_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegervar114xscaley_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_var115_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLvar115x_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var117_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar117_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_var123_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAballypady_var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var200) => inst_game.receivelostBall_Ongame(var200));
	inst_game.bus.on('game?lostBallvar126', (var201, var126) => inst_game.receivelostBallvar126Ongame(var201, var126));
	inst_game.bus.on('game?nextLevel_', (var202) => inst_game.receivenextLevel_Ongame(var202));
	inst_game.bus.on('game?nextLevelvar127', (var203, var127) => inst_game.receivenextLevelvar127Ongame(var203, var127));
	inst_game.bus.on('game?lostBall__bis', (var204) => inst_game.receivelostBall__bisOngame(var204));
	inst_game.bus.on('game?lostBallvar126_bis', (var205, var126) => inst_game.receivelostBallvar126_bisOngame(var205, var126));
	inst_game.bus.on('game?nextLevel__bis', (var206) => inst_game.receivenextLevel__bisOngame(var206));
	inst_game.bus.on('game?nextLevelvar127_bis', (var207, var127) => inst_game.receivenextLevelvar127_bisOngame(var207, var127));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (var129, var108, id) => inst_game.receivetimer_timeoutOnclock(var129, var108, id));
	inst_game.bus.on('clock?timer_start', (time, var106, var130, id) => inst_timer.receivetimer_startOntimer(time, var106, var130, id));
	inst_game.bus.on('clock?timer_cancel', (id, var131, var107) => inst_timer.receivetimer_cancelOntimer(id, var131, var107));
	inst_disp.bus.on('display?displayReady_', (var142) => inst_game.receivedisplayReady_Ondisplay(var142));
	inst_disp.bus.on('display?displayReadyvar119', (var119, var143) => inst_game.receivedisplayReadyvar119Ondisplay(var119, var143));
	inst_disp.bus.on('display?displayError_', (var132) => inst_game.receivedisplayError_Ondisplay(var132));
	inst_disp.bus.on('display?displayErrorvar120', (var133, var120) => inst_game.receivedisplayErrorvar120Ondisplay(var133, var120));
	inst_disp.bus.on('display?displayReady__bis', (var166) => inst_game.receivedisplayReady__bisOndisplay(var166));
	inst_disp.bus.on('display?displayReadyvar119_bis', (var167, var119) => inst_game.receivedisplayReadyvar119_bisOndisplay(var167, var119));
	inst_disp.bus.on('display?displayError__bis', (var156) => inst_game.receivedisplayError__bisOndisplay(var156));
	inst_disp.bus.on('display?displayErrorvar120_bis', (var157, var120) => inst_game.receivedisplayErrorvar120_bisOndisplay(var157, var120));
	inst_game.bus.on('display?create_', (var154) => inst_disp.receivecreate_Ondisplay(var154));
	inst_game.bus.on('display?createxsizeysizevar116', (xsize, var116, ysize, var155) => inst_disp.receivecreatexsizeysizevar116Ondisplay(xsize, var116, ysize, var155));
	inst_game.bus.on('display?update_', (var134) => inst_disp.receiveupdate_Ondisplay(var134));
	inst_game.bus.on('display?updatevar118', (var135, var118) => inst_disp.receiveupdatevar118Ondisplay(var135, var118));
	inst_game.bus.on('display?clear_', (var144) => inst_disp.receiveclear_Ondisplay(var144));
	inst_game.bus.on('display?clearvar109', (var145, var109) => inst_disp.receiveclearvar109Ondisplay(var145, var109));
	inst_game.bus.on('display?setColorgr', (g, var148, r) => inst_disp.receivesetColorgrOndisplay(g, var148, r));
	inst_game.bus.on('display?setColorbvar110', (b, var149, var110) => inst_disp.receivesetColorbvar110Ondisplay(b, var149, var110));
	inst_game.bus.on('display?setBGColorrvar111b', (var111, r, var146, b) => inst_disp.receivesetBGColorrvar111bOndisplay(var111, r, var146, b));
	inst_game.bus.on('display?setBGColorg', (var147, g) => inst_disp.receivesetBGColorgOndisplay(var147, g));
	inst_game.bus.on('display?drawRectyvar112height', (y, height, var140, var112) => inst_disp.receivedrawRectyvar112heightOndisplay(y, height, var140, var112));
	inst_game.bus.on('display?drawRectwidthx', (width, x, var141) => inst_disp.receivedrawRectwidthxOndisplay(width, x, var141));
	inst_game.bus.on('display?fillRect_', (var152) => inst_disp.receivefillRect_Ondisplay(var152));
	inst_game.bus.on('display?fillRectvar113heightwidthyx', (var153, height, x, y, var113, width) => inst_disp.receivefillRectvar113heightwidthyxOndisplay(var153, height, x, y, var113, width));
	inst_game.bus.on('display?drawIntegerdigitsv', (digits, v, var136) => inst_disp.receivedrawIntegerdigitsvOndisplay(digits, v, var136));
	inst_game.bus.on('display?drawIntegervar114xscaley', (scale, x, y, var114, var137) => inst_disp.receivedrawIntegervar114xscaleyOndisplay(scale, x, y, var114, var137));
	inst_game.bus.on('display?drawThingMLvar115x', (var115, x, var150) => inst_disp.receivedrawThingMLvar115xOndisplay(var115, x, var150));
	inst_game.bus.on('display?drawThingMLy', (var151, y) => inst_disp.receivedrawThingMLyOndisplay(var151, y));
	inst_game.bus.on('display?create__bis', (var178) => inst_disp.receivecreate__bisOndisplay(var178));
	inst_game.bus.on('display?createxsizeysizevar116_bis', (ysize, var116, xsize, var179) => inst_disp.receivecreatexsizeysizevar116_bisOndisplay(ysize, var116, xsize, var179));
	inst_game.bus.on('display?update__bis', (var158) => inst_disp.receiveupdate__bisOndisplay(var158));
	inst_game.bus.on('display?updatevar118_bis', (var159, var118) => inst_disp.receiveupdatevar118_bisOndisplay(var159, var118));
	inst_game.bus.on('display?clear__bis', (var168) => inst_disp.receiveclear__bisOndisplay(var168));
	inst_game.bus.on('display?clearvar109_bis', (var169, var109) => inst_disp.receiveclearvar109_bisOndisplay(var169, var109));
	inst_game.bus.on('display?setColorgr_bis', (g, var172, r) => inst_disp.receivesetColorgr_bisOndisplay(g, var172, r));
	inst_game.bus.on('display?setColorbvar110_bis', (b, var173, var110) => inst_disp.receivesetColorbvar110_bisOndisplay(b, var173, var110));
	inst_game.bus.on('display?setBGColorrvar111b_bis', (var170, var111, b, r) => inst_disp.receivesetBGColorrvar111b_bisOndisplay(var170, var111, b, r));
	inst_game.bus.on('display?setBGColorg_bis', (g, var171) => inst_disp.receivesetBGColorg_bisOndisplay(g, var171));
	inst_game.bus.on('display?drawRectyvar112height_bis', (y, height, var112, var164) => inst_disp.receivedrawRectyvar112height_bisOndisplay(y, height, var112, var164));
	inst_game.bus.on('display?drawRectwidthx_bis', (var165, x, width) => inst_disp.receivedrawRectwidthx_bisOndisplay(var165, x, width));
	inst_game.bus.on('display?fillRect__bis', (var176) => inst_disp.receivefillRect__bisOndisplay(var176));
	inst_game.bus.on('display?fillRectvar113heightwidthyx_bis', (x, var177, height, var113, y, width) => inst_disp.receivefillRectvar113heightwidthyx_bisOndisplay(x, var177, height, var113, y, width));
	inst_game.bus.on('display?drawIntegerdigitsv_bis', (digits, var160, v) => inst_disp.receivedrawIntegerdigitsv_bisOndisplay(digits, var160, v));
	inst_game.bus.on('display?drawIntegervar114xscaley_bis', (var161, x, y, var114, scale) => inst_disp.receivedrawIntegervar114xscaley_bisOndisplay(var161, x, y, var114, scale));
	inst_game.bus.on('display?drawThingMLvar115x_bis', (var115, var174, x) => inst_disp.receivedrawThingMLvar115x_bisOndisplay(var115, var174, x));
	inst_game.bus.on('display?drawThingMLy_bis', (y, var175) => inst_disp.receivedrawThingMLy_bisOndisplay(y, var175));
	inst_game.bus.on('ia?updateIAballypady', (pady, bally, var192) => inst_ctrl.receiveupdateIAballypadyOngame(pady, bally, var192));
	inst_game.bus.on('ia?updateIAballxpadxvar123', (var193, padx, ballx, var123) => inst_ctrl.receiveupdateIAballxpadxvar123Ongame(var193, padx, ballx, var123));
	inst_game.bus.on('ia?updateIAballypady_bis', (bally, var198, pady) => inst_ctrl.receiveupdateIAballypady_bisOngame(bally, var198, pady));
	inst_game.bus.on('ia?updateIAballxpadxvar123_bis', (ballx, var123, var199, padx) => inst_ctrl.receiveupdateIAballxpadxvar123_bisOngame(ballx, var123, var199, padx));
	inst_ctrl.bus.on('controls?positionvar122', (var122, var182) => inst_game.receivepositionvar122Oncontroller(var122, var182));
	inst_ctrl.bus.on('controls?positionyx', (y, x, var183) => inst_game.receivepositionyxOncontroller(y, x, var183));
	inst_ctrl.bus.on('controls?positionvar122_bis', (var122, var186) => inst_game.receivepositionvar122_bisOncontroller(var122, var186));
	inst_ctrl.bus.on('controls?positionyx_bis', (x, var187, y) => inst_game.receivepositionyx_bisOncontroller(x, var187, y));
	
	inst_timer._init();
	inst_disp._init();
	inst_ctrl._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

