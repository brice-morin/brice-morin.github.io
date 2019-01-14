'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_game = new BreakoutGameBrowser('game', null);
	var inst_game_fgcolor = [];var inst_game_bgcolor = [];var inst_game_bricks = [];inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(1);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var13_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar13_var(false);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var20_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar20_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var21_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar21_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var20_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar20_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var21_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar21_var(false);inst_game.initBreakoutGame_SC_controller_position_var16_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_received_controller_positionvar16_var(false);inst_game.initBreakoutGame_SC_received_controller_positionyx_var(false);
	const inst_disp = new DisplayBrowser('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var10_var(0);inst_disp.initDisplay_SC_Wait_received_display_create__var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizeysizevar10_var(false);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var4_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorbrvar4_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorg_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_var5_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorb_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorvar5rg_var(false);inst_disp.initDisplay_SC_Running_display_clear_var3_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar3_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_var6_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectheight_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectyvar6xwidth_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_var7_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectheightxvar7_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectywidth_var(false);inst_disp.initDisplay_SC_Running_display_update_var12_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar12_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var8_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerx_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegervdigitsscalevar8y_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_var9_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLvar9_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLxy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var11_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar11_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_timer = new TimerJS('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_ctrl = new BasicIAController('ctrl', null);
	inst_ctrl.initBasicIAController_ctrlx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_bally_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_pady_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_ballx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_padx_var(0);inst_ctrl.initBasicIAController_SC_Following_game_updateIA_var17_var(0);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIA__var(false);inst_ctrl.initBasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var96) => inst_game.receivelostBall_Ongame(var96));
	inst_game.bus.on('game?lostBallvar20', (var20, var97) => inst_game.receivelostBallvar20Ongame(var20, var97));
	inst_game.bus.on('game?nextLevel_', (var94) => inst_game.receivenextLevel_Ongame(var94));
	inst_game.bus.on('game?nextLevelvar21', (var21, var95) => inst_game.receivenextLevelvar21Ongame(var21, var95));
	inst_game.bus.on('game?lostBall__bis', (var100) => inst_game.receivelostBall__bisOngame(var100));
	inst_game.bus.on('game?lostBallvar20_bis', (var20, var101) => inst_game.receivelostBallvar20_bisOngame(var20, var101));
	inst_game.bus.on('game?nextLevel__bis', (var98) => inst_game.receivenextLevel__bisOngame(var98));
	inst_game.bus.on('game?nextLevelvar21_bis', (var99, var21) => inst_game.receivenextLevelvar21_bisOngame(var99, var21));
	/*Connecting ports...*/
	inst_timer.bus.on('timer?timer_timeout', (var2, var24, id) => inst_game.receivetimer_timeoutOnclock(var2, var24, id));
	inst_game.bus.on('clock?timer_start', (var25, id, var0, time) => inst_timer.receivetimer_startOntimer(var25, id, var0, time));
	inst_game.bus.on('clock?timer_cancel', (var23, var1, id) => inst_timer.receivetimer_cancelOntimer(var23, var1, id));
	inst_disp.bus.on('display?displayReady_', (var38) => inst_game.receivedisplayReady_Ondisplay(var38));
	inst_disp.bus.on('display?displayReadyvar13', (var39, var13) => inst_game.receivedisplayReadyvar13Ondisplay(var39, var13));
	inst_disp.bus.on('display?displayError_', (var26) => inst_game.receivedisplayError_Ondisplay(var26));
	inst_disp.bus.on('display?displayErrorvar14', (var14, var27) => inst_game.receivedisplayErrorvar14Ondisplay(var14, var27));
	inst_disp.bus.on('display?displayReady__bis', (var62) => inst_game.receivedisplayReady__bisOndisplay(var62));
	inst_disp.bus.on('display?displayReadyvar13_bis', (var63, var13) => inst_game.receivedisplayReadyvar13_bisOndisplay(var63, var13));
	inst_disp.bus.on('display?displayError__bis', (var50) => inst_game.receivedisplayError__bisOndisplay(var50));
	inst_disp.bus.on('display?displayErrorvar14_bis', (var51, var14) => inst_game.receivedisplayErrorvar14_bisOndisplay(var51, var14));
	inst_game.bus.on('display?create_', (var40) => inst_disp.receivecreate_Ondisplay(var40));
	inst_game.bus.on('display?createxsizeysizevar10', (ysize, xsize, var10, var41) => inst_disp.receivecreatexsizeysizevar10Ondisplay(ysize, xsize, var10, var41));
	inst_game.bus.on('display?update_', (var34) => inst_disp.receiveupdate_Ondisplay(var34));
	inst_game.bus.on('display?updatevar12', (var35, var12) => inst_disp.receiveupdatevar12Ondisplay(var35, var12));
	inst_game.bus.on('display?clear_', (var48) => inst_disp.receiveclear_Ondisplay(var48));
	inst_game.bus.on('display?clearvar3', (var3, var49) => inst_disp.receiveclearvar3Ondisplay(var3, var49));
	inst_game.bus.on('display?setColorbrvar4', (b, var4, r, var42) => inst_disp.receivesetColorbrvar4Ondisplay(b, var4, r, var42));
	inst_game.bus.on('display?setColorg', (var43, g) => inst_disp.receivesetColorgOndisplay(var43, g));
	inst_game.bus.on('display?setBGColorb', (var28, b) => inst_disp.receivesetBGColorbOndisplay(var28, b));
	inst_game.bus.on('display?setBGColorvar5rg', (var5, var29, g, r) => inst_disp.receivesetBGColorvar5rgOndisplay(var5, var29, g, r));
	inst_game.bus.on('display?drawRectheight', (height, var44) => inst_disp.receivedrawRectheightOndisplay(height, var44));
	inst_game.bus.on('display?drawRectyvar6xwidth', (y, x, var6, width, var45) => inst_disp.receivedrawRectyvar6xwidthOndisplay(y, x, var6, width, var45));
	inst_game.bus.on('display?fillRectheightxvar7', (var46, var7, height, x) => inst_disp.receivefillRectheightxvar7Ondisplay(var46, var7, height, x));
	inst_game.bus.on('display?fillRectywidth', (width, y, var47) => inst_disp.receivefillRectywidthOndisplay(width, y, var47));
	inst_game.bus.on('display?drawIntegerx', (var36, x) => inst_disp.receivedrawIntegerxOndisplay(var36, x));
	inst_game.bus.on('display?drawIntegervdigitsscalevar8y', (digits, y, var8, var37, scale, v) => inst_disp.receivedrawIntegervdigitsscalevar8yOndisplay(digits, y, var8, var37, scale, v));
	inst_game.bus.on('display?drawThingMLvar9', (var32, var9) => inst_disp.receivedrawThingMLvar9Ondisplay(var32, var9));
	inst_game.bus.on('display?drawThingMLxy', (var33, x, y) => inst_disp.receivedrawThingMLxyOndisplay(var33, x, y));
	inst_game.bus.on('display?create__bis', (var64) => inst_disp.receivecreate__bisOndisplay(var64));
	inst_game.bus.on('display?createxsizeysizevar10_bis', (ysize, var10, xsize, var65) => inst_disp.receivecreatexsizeysizevar10_bisOndisplay(ysize, var10, xsize, var65));
	inst_game.bus.on('display?update__bis', (var58) => inst_disp.receiveupdate__bisOndisplay(var58));
	inst_game.bus.on('display?updatevar12_bis', (var12, var59) => inst_disp.receiveupdatevar12_bisOndisplay(var12, var59));
	inst_game.bus.on('display?clear__bis', (var72) => inst_disp.receiveclear__bisOndisplay(var72));
	inst_game.bus.on('display?clearvar3_bis', (var73, var3) => inst_disp.receiveclearvar3_bisOndisplay(var73, var3));
	inst_game.bus.on('display?setColorbrvar4_bis', (var66, r, b, var4) => inst_disp.receivesetColorbrvar4_bisOndisplay(var66, r, b, var4));
	inst_game.bus.on('display?setColorg_bis', (var67, g) => inst_disp.receivesetColorg_bisOndisplay(var67, g));
	inst_game.bus.on('display?setBGColorb_bis', (b, var52) => inst_disp.receivesetBGColorb_bisOndisplay(b, var52));
	inst_game.bus.on('display?setBGColorvar5rg_bis', (g, r, var5, var53) => inst_disp.receivesetBGColorvar5rg_bisOndisplay(g, r, var5, var53));
	inst_game.bus.on('display?drawRectheight_bis', (var68, height) => inst_disp.receivedrawRectheight_bisOndisplay(var68, height));
	inst_game.bus.on('display?drawRectyvar6xwidth_bis', (width, var6, var69, y, x) => inst_disp.receivedrawRectyvar6xwidth_bisOndisplay(width, var6, var69, y, x));
	inst_game.bus.on('display?fillRectheightxvar7_bis', (var7, x, height, var70) => inst_disp.receivefillRectheightxvar7_bisOndisplay(var7, x, height, var70));
	inst_game.bus.on('display?fillRectywidth_bis', (var71, y, width) => inst_disp.receivefillRectywidth_bisOndisplay(var71, y, width));
	inst_game.bus.on('display?drawIntegerx_bis', (x, var60) => inst_disp.receivedrawIntegerx_bisOndisplay(x, var60));
	inst_game.bus.on('display?drawIntegervdigitsscalevar8y_bis', (y, var61, scale, v, digits, var8) => inst_disp.receivedrawIntegervdigitsscalevar8y_bisOndisplay(y, var61, scale, v, digits, var8));
	inst_game.bus.on('display?drawThingMLvar9_bis', (var9, var56) => inst_disp.receivedrawThingMLvar9_bisOndisplay(var9, var56));
	inst_game.bus.on('display?drawThingMLxy_bis', (var57, y, x) => inst_disp.receivedrawThingMLxy_bisOndisplay(var57, y, x));
	inst_game.bus.on('ia?updateIA_', (var84) => inst_ctrl.receiveupdateIA_Ongame(var84));
	inst_game.bus.on('ia?updateIAballypadyballxpadxvar17', (bally, var17, pady, padx, ballx, var85) => inst_ctrl.receiveupdateIAballypadyballxpadxvar17Ongame(bally, var17, pady, padx, ballx, var85));
	inst_game.bus.on('ia?updateIA__bis', (var90) => inst_ctrl.receiveupdateIA__bisOngame(var90));
	inst_game.bus.on('ia?updateIAballypadyballxpadxvar17_bis', (var17, pady, var91, padx, ballx, bally) => inst_ctrl.receiveupdateIAballypadyballxpadxvar17_bisOngame(var17, pady, var91, padx, ballx, bally));
	inst_ctrl.bus.on('controls?positionvar16', (var16, var74) => inst_game.receivepositionvar16Oncontroller(var16, var74));
	inst_ctrl.bus.on('controls?positionyx', (x, y, var75) => inst_game.receivepositionyxOncontroller(x, y, var75));
	inst_ctrl.bus.on('controls?positionvar16_bis', (var78, var16) => inst_game.receivepositionvar16_bisOncontroller(var78, var16));
	inst_ctrl.bus.on('controls?positionyx_bis', (x, var79, y) => inst_game.receivepositionyx_bisOncontroller(x, var79, y));
	
	inst_timer._init();
	inst_disp._init();
	inst_ctrl._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

