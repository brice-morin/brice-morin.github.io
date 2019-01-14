'use strict';

var RunThingMLConfiguration = function() {
	/*$REQUIRE_PLUGINS$*/
	
	const inst_sound = new SoundControllerBrowserRND('sound', null);
	inst_sound.initSound_behavior_INIT_sound_tone_time_var(0);inst_sound.initSound_behavior_INIT_sound_tone_var20_var(0);inst_sound.initSound_behavior_INIT_sound_tone_freq_var(0);inst_sound.initSound_behavior_INIT_received_sound_tonetimevar20_var(false);inst_sound.initSound_behavior_INIT_received_sound_tonefreq_var(false);inst_sound.initSoundControllerBrowser_synth_var(new Tone.Synth().toMaster());
	const inst_timer = new TimerJSRND('timer', null);
	inst_timer.initTimerJS_Timeouts_var({});
	const inst_disp = new DisplayBrowserRND('disp', null);
	inst_disp.initDisplay_bg_r_var(0);inst_disp.initDisplay_bg_g_var(0);inst_disp.initDisplay_bg_b_var(0);inst_disp.initDisplay_fg_r_var(0);inst_disp.initDisplay_fg_g_var(0);inst_disp.initDisplay_fg_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setColor_var4_var(0);inst_disp.initDisplay_SC_Running_display_setColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setColorbrvar4_var(false);inst_disp.initDisplay_SC_Running_received_display_setColorg_var(false);inst_disp.initDisplay_SC_Running_display_setBGColor_b_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_var5_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_r_var(0);inst_disp.initDisplay_SC_Running_display_setBGColor_g_var(0);inst_disp.initDisplay_SC_Running_received_display_setBGColorb_var(false);inst_disp.initDisplay_SC_Running_received_display_setBGColorvar5rg_var(false);inst_disp.initDisplay_SC_Running_display_clear_var3_var(0);inst_disp.initDisplay_SC_Running_received_display_clear__var(false);inst_disp.initDisplay_SC_Running_received_display_clearvar3_var(false);inst_disp.initDisplay_SC_Running_display_drawRect_height_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_y_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_var6_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_x_var(0);inst_disp.initDisplay_SC_Running_display_drawRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_drawRectheight_var(false);inst_disp.initDisplay_SC_Running_received_display_drawRectyvar6xwidth_var(false);inst_disp.initDisplay_SC_Running_display_fillRect_height_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_x_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_var7_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_y_var(0);inst_disp.initDisplay_SC_Running_display_fillRect_width_var(0);inst_disp.initDisplay_SC_Running_received_display_fillRectheightxvar7_var(false);inst_disp.initDisplay_SC_Running_received_display_fillRectywidth_var(false);inst_disp.initDisplay_SC_Running_display_update_var12_var(0);inst_disp.initDisplay_SC_Running_received_display_update__var(false);inst_disp.initDisplay_SC_Running_received_display_updatevar12_var(false);inst_disp.initDisplay_SC_Running_display_drawInteger_x_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_v_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_digits_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_scale_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_var8_var(0);inst_disp.initDisplay_SC_Running_display_drawInteger_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawIntegerx_var(false);inst_disp.initDisplay_SC_Running_received_display_drawIntegervdigitsscalevar8y_var(false);inst_disp.initDisplay_SC_Running_display_drawThingML_var9_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_x_var(0);inst_disp.initDisplay_SC_Running_display_drawThingML_y_var(0);inst_disp.initDisplay_SC_Running_received_display_drawThingMLvar9_var(false);inst_disp.initDisplay_SC_Running_received_display_drawThingMLxy_var(false);inst_disp.initDisplay_SC_Running_display_destroy_var11_var(0);inst_disp.initDisplay_SC_Running_received_display_destroy__var(false);inst_disp.initDisplay_SC_Running_received_display_destroyvar11_var(false);inst_disp.initDisplay_SC_Wait_display_create_xsize_var(0);inst_disp.initDisplay_SC_Wait_display_create_ysize_var(0);inst_disp.initDisplay_SC_Wait_display_create_var10_var(0);inst_disp.initDisplay_SC_Wait_received_display_create__var(false);inst_disp.initDisplay_SC_Wait_received_display_createxsizeysizevar10_var(false);inst_disp.initDisplayBrowser_SCALE_var(5);inst_disp.initDisplayBrowser_XFRAMESIZE_var(0);inst_disp.initDisplayBrowser_YFRAMESIZE_var(0);inst_disp.initDisplayBrowser_Buffer_var(null);inst_disp.initDisplayBrowser_BufferCanvas_var(null);inst_disp.initDisplayBrowser_Display_var(null);
	const inst_ctrl = new VelocityControllerRND('ctrl', null);
	inst_ctrl.initTimerController_XMAX_var(100);inst_ctrl.initTimerController_YMAX_var(100);inst_ctrl.initTimerController_XMIN_var( -100);inst_ctrl.initTimerController_YMIN_var( -100);inst_ctrl.initTimerController_posX_var(0);inst_ctrl.initTimerController_posY_var(0);inst_ctrl.initTimerController_dx_var(0);inst_ctrl.initTimerController_dy_var(0);inst_ctrl.initVelocityController_timerID_var(4);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_var15_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dx_var(0);inst_ctrl.initVelocityController_SC_ctrl_in_velocity_dy_var(0);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocityvar15_var(false);inst_ctrl.initVelocityController_SC_received_ctrl_in_velocitydxdy_var(false);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_var16_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_y_var(0);inst_ctrl.initVelocityController_SC_Running_ctrl_in_position_x_var(0);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionvar16_var(false);inst_ctrl.initVelocityController_SC_Running_received_ctrl_in_positionyx_var(false);
	const inst_game = new BreakoutGameBrowserRND('game', null);
	var inst_game_bgcolor = [];var inst_game_bricks = [];var inst_game_fgcolor = [];inst_game.initBreakoutGame_bgcolor_var(inst_game_bgcolor);
inst_game.initBreakoutGame_bricks_var(inst_game_bricks);
inst_game.initBreakoutGame_fgcolor_var(inst_game_fgcolor);
inst_game.initBreakoutGame_lastTimestamp_var(0);inst_game.initBreakoutGame_counter_var(0);inst_game.initBreakoutGame_XDISPSIZE_var(160);inst_game.initBreakoutGame_YDISPSIZE_var(128);inst_game.initBreakoutGame_SCALE_var(64);inst_game.initBreakoutGame_XMAX_var(160 * 64);inst_game.initBreakoutGame_YMAX_var(128 * 64);inst_game.initBreakoutGame_TOP_var(14 * 64);inst_game.initBreakoutGame_BOTTOM_var(128 * 64 + 8 * 64);inst_game.initBreakoutGame_LEFT_var(1 * 64);inst_game.initBreakoutGame_RIGHT_var(160 * 64 - 1 * 64);inst_game.initBreakoutGame_br_var(3 * 64);inst_game.initBreakoutGame_bx_var(Math.trunc(160 * 64 / 2));inst_game.initBreakoutGame_by_var(128 * 64);inst_game.initBreakoutGame_dx_var(Math.trunc(160 * 64 / 98));inst_game.initBreakoutGame_dy_var(Math.trunc( -160 * 64 / 65));inst_game.initBreakoutGame_padx_var(Math.trunc(128 * 64 / 2));inst_game.initBreakoutGame_pady_var(128 * 64 - 6 * 64);inst_game.initBreakoutGame_padlen_var(25 * 64);inst_game.initBreakoutGame_prevBX_var( -1);inst_game.initBreakoutGame_prevBY_var( -1);inst_game.initBreakoutGame_period_var(33);inst_game.initBreakoutGame_tone1_var(440);inst_game.initBreakoutGame_tone2_var(880);inst_game.initBreakoutGame_tone_duration_var(50);inst_game.initBreakoutGame_prevPX_var( -1);inst_game.initBreakoutGame_prevPY_var( -1);inst_game.initBreakoutGame_BRICK_ROWS_var(5);inst_game.initBreakoutGame_BRICK_HEIGHT_var(9);inst_game.initBreakoutGame_score_var(0);inst_game.initBreakoutGame_lives_var(3);inst_game.initBreakoutGame_level_var(1);inst_game.initBreakoutGame_SC_PLAY_game_lostBall_var21_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_lostBallvar21_var(false);inst_game.initBreakoutGame_SC_PLAY_game_nextLevel_var22_var(0);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_game_nextLevelvar22_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_lostBall_var21_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBall__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_lostBallvar21_var(false);inst_game.initBreakoutGame_SC_PLAY_pro_game_nextLevel_var22_var(0);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevel__var(false);inst_game.initBreakoutGame_SC_PLAY_received_pro_game_nextLevelvar22_var(false);inst_game.initBreakoutGame_SC_INIT_display_displayReady_var13_var(0);inst_game.initBreakoutGame_SC_INIT_received_display_displayReady__var(false);inst_game.initBreakoutGame_SC_INIT_received_display_displayReadyvar13_var(false);inst_game.initBreakoutGame_SC_LAUNCH_countdown_var(0);inst_game.initBreakoutGame_SC_controller_position_var16_var(0);inst_game.initBreakoutGame_SC_controller_position_y_var(0);inst_game.initBreakoutGame_SC_controller_position_x_var(0);inst_game.initBreakoutGame_SC_received_controller_positionvar16_var(false);inst_game.initBreakoutGame_SC_received_controller_positionyx_var(false);
	
	/*Connecting internal ports...*/
	inst_game.bus.on('game?lostBall_', (var100) => inst_game.receivelostBall_Ongame(var100));
	inst_game.bus.on('game?lostBallvar21', (var21, var101) => inst_game.receivelostBallvar21Ongame(var21, var101));
	inst_game.bus.on('game?nextLevel_', (var98) => inst_game.receivenextLevel_Ongame(var98));
	inst_game.bus.on('game?nextLevelvar22', (var22, var99) => inst_game.receivenextLevelvar22Ongame(var22, var99));
	inst_game.bus.on('game?lostBall__bis', (var104) => inst_game.receivelostBall__bisOngame(var104));
	inst_game.bus.on('game?lostBallvar21_bis', (var21, var105) => inst_game.receivelostBallvar21_bisOngame(var21, var105));
	inst_game.bus.on('game?nextLevel__bis', (var102) => inst_game.receivenextLevel__bisOngame(var102));
	inst_game.bus.on('game?nextLevelvar22_bis', (var103, var22) => inst_game.receivenextLevelvar22_bisOngame(var103, var22));
	/*Connecting ports...*/
	inst_game.bus.on('sound?tonetimevar20', (var94, time, var20) => inst_sound.receivetonetimevar20Onsound(var94, time, var20));
	inst_game.bus.on('sound?tonefreq', (freq, var95) => inst_sound.receivetonefreqOnsound(freq, var95));
	inst_game.bus.on('sound?tonetimevar20_bis', (time, var96, var20) => inst_sound.receivetonetimevar20_bisOnsound(time, var96, var20));
	inst_game.bus.on('sound?tonefreq_bis', (freq, var97) => inst_sound.receivetonefreq_bisOnsound(freq, var97));
	inst_ctrl.bus.on('controls?positionvar16', (var74, var16) => inst_game.receivepositionvar16Oncontroller(var74, var16));
	inst_ctrl.bus.on('controls?positionyx', (var75, x, y) => inst_game.receivepositionyxOncontroller(var75, x, y));
	inst_ctrl.bus.on('controls?positionvar16_bis', (var16, var78) => inst_game.receivepositionvar16_bisOncontroller(var16, var78));
	inst_ctrl.bus.on('controls?positionyx_bis', (x, var79, y) => inst_game.receivepositionyx_bisOncontroller(x, var79, y));
	inst_disp.bus.on('vctrl?velocityvar15', (var15, var76) => inst_ctrl.receivevelocityvar15Onctrl_in(var15, var76));
	inst_disp.bus.on('vctrl?velocitydxdy', (dy, dx, var77) => inst_ctrl.receivevelocitydxdyOnctrl_in(dy, dx, var77));
	inst_disp.bus.on('vctrl?positionvar16', (var74, var16) => inst_ctrl.receivepositionvar16Onctrl_in(var74, var16));
	inst_disp.bus.on('vctrl?positionyx', (var75, x, y) => inst_ctrl.receivepositionyxOnctrl_in(var75, x, y));
	inst_disp.bus.on('vctrl?velocityvar15_bis', (var80, var15) => inst_ctrl.receivevelocityvar15_bisOnctrl_in(var80, var15));
	inst_disp.bus.on('vctrl?velocitydxdy_bis', (var81, dy, dx) => inst_ctrl.receivevelocitydxdy_bisOnctrl_in(var81, dy, dx));
	inst_disp.bus.on('vctrl?positionvar16_bis', (var16, var78) => inst_ctrl.receivepositionvar16_bisOnctrl_in(var16, var78));
	inst_disp.bus.on('vctrl?positionyx_bis', (x, var79, y) => inst_ctrl.receivepositionyx_bisOnctrl_in(x, var79, y));
	inst_timer.bus.on('timer?timer_timeout', (var2, var24, id) => inst_ctrl.receivetimer_timeoutOnclock(var2, var24, id));
	inst_ctrl.bus.on('clock?timer_start', (var25, var0, time, id) => inst_timer.receivetimer_startOntimer(var25, var0, time, id));
	inst_ctrl.bus.on('clock?timer_cancel', (var1, id, var23) => inst_timer.receivetimer_cancelOntimer(var1, id, var23));
	inst_disp.bus.on('display?displayReady_', (var38) => inst_game.receivedisplayReady_Ondisplay(var38));
	inst_disp.bus.on('display?displayReadyvar13', (var39, var13) => inst_game.receivedisplayReadyvar13Ondisplay(var39, var13));
	inst_disp.bus.on('display?displayError_', (var26) => inst_game.receivedisplayError_Ondisplay(var26));
	inst_disp.bus.on('display?displayErrorvar14', (var14, var27) => inst_game.receivedisplayErrorvar14Ondisplay(var14, var27));
	inst_disp.bus.on('display?displayReady__bis', (var62) => inst_game.receivedisplayReady__bisOndisplay(var62));
	inst_disp.bus.on('display?displayReadyvar13_bis', (var63, var13) => inst_game.receivedisplayReadyvar13_bisOndisplay(var63, var13));
	inst_disp.bus.on('display?displayError__bis', (var50) => inst_game.receivedisplayError__bisOndisplay(var50));
	inst_disp.bus.on('display?displayErrorvar14_bis', (var14, var51) => inst_game.receivedisplayErrorvar14_bisOndisplay(var14, var51));
	inst_game.bus.on('display?create_', (var40) => inst_disp.receivecreate_Ondisplay(var40));
	inst_game.bus.on('display?createxsizeysizevar10', (ysize, var10, var41, xsize) => inst_disp.receivecreatexsizeysizevar10Ondisplay(ysize, var10, var41, xsize));
	inst_game.bus.on('display?update_', (var34) => inst_disp.receiveupdate_Ondisplay(var34));
	inst_game.bus.on('display?updatevar12', (var35, var12) => inst_disp.receiveupdatevar12Ondisplay(var35, var12));
	inst_game.bus.on('display?clear_', (var48) => inst_disp.receiveclear_Ondisplay(var48));
	inst_game.bus.on('display?clearvar3', (var49, var3) => inst_disp.receiveclearvar3Ondisplay(var49, var3));
	inst_game.bus.on('display?setColorbrvar4', (var42, var4, b, r) => inst_disp.receivesetColorbrvar4Ondisplay(var42, var4, b, r));
	inst_game.bus.on('display?setColorg', (var43, g) => inst_disp.receivesetColorgOndisplay(var43, g));
	inst_game.bus.on('display?setBGColorb', (b, var28) => inst_disp.receivesetBGColorbOndisplay(b, var28));
	inst_game.bus.on('display?setBGColorvar5rg', (var5, g, r, var29) => inst_disp.receivesetBGColorvar5rgOndisplay(var5, g, r, var29));
	inst_game.bus.on('display?drawRectheight', (height, var44) => inst_disp.receivedrawRectheightOndisplay(height, var44));
	inst_game.bus.on('display?drawRectyvar6xwidth', (width, x, y, var6, var45) => inst_disp.receivedrawRectyvar6xwidthOndisplay(width, x, y, var6, var45));
	inst_game.bus.on('display?fillRectheightxvar7', (height, var46, var7, x) => inst_disp.receivefillRectheightxvar7Ondisplay(height, var46, var7, x));
	inst_game.bus.on('display?fillRectywidth', (var47, y, width) => inst_disp.receivefillRectywidthOndisplay(var47, y, width));
	inst_game.bus.on('display?drawIntegerx', (var36, x) => inst_disp.receivedrawIntegerxOndisplay(var36, x));
	inst_game.bus.on('display?drawIntegervdigitsscalevar8y', (scale, var8, digits, v, y, var37) => inst_disp.receivedrawIntegervdigitsscalevar8yOndisplay(scale, var8, digits, v, y, var37));
	inst_game.bus.on('display?drawThingMLvar9', (var9, var32) => inst_disp.receivedrawThingMLvar9Ondisplay(var9, var32));
	inst_game.bus.on('display?drawThingMLxy', (y, x, var33) => inst_disp.receivedrawThingMLxyOndisplay(y, x, var33));
	inst_game.bus.on('display?create__bis', (var64) => inst_disp.receivecreate__bisOndisplay(var64));
	inst_game.bus.on('display?createxsizeysizevar10_bis', (var10, var65, ysize, xsize) => inst_disp.receivecreatexsizeysizevar10_bisOndisplay(var10, var65, ysize, xsize));
	inst_game.bus.on('display?update__bis', (var58) => inst_disp.receiveupdate__bisOndisplay(var58));
	inst_game.bus.on('display?updatevar12_bis', (var59, var12) => inst_disp.receiveupdatevar12_bisOndisplay(var59, var12));
	inst_game.bus.on('display?clear__bis', (var72) => inst_disp.receiveclear__bisOndisplay(var72));
	inst_game.bus.on('display?clearvar3_bis', (var3, var73) => inst_disp.receiveclearvar3_bisOndisplay(var3, var73));
	inst_game.bus.on('display?setColorbrvar4_bis', (r, var4, var66, b) => inst_disp.receivesetColorbrvar4_bisOndisplay(r, var4, var66, b));
	inst_game.bus.on('display?setColorg_bis', (var67, g) => inst_disp.receivesetColorg_bisOndisplay(var67, g));
	inst_game.bus.on('display?setBGColorb_bis', (var52, b) => inst_disp.receivesetBGColorb_bisOndisplay(var52, b));
	inst_game.bus.on('display?setBGColorvar5rg_bis', (var53, var5, g, r) => inst_disp.receivesetBGColorvar5rg_bisOndisplay(var53, var5, g, r));
	inst_game.bus.on('display?drawRectheight_bis', (var68, height) => inst_disp.receivedrawRectheight_bisOndisplay(var68, height));
	inst_game.bus.on('display?drawRectyvar6xwidth_bis', (x, width, var6, y, var69) => inst_disp.receivedrawRectyvar6xwidth_bisOndisplay(x, width, var6, y, var69));
	inst_game.bus.on('display?fillRectheightxvar7_bis', (var70, x, height, var7) => inst_disp.receivefillRectheightxvar7_bisOndisplay(var70, x, height, var7));
	inst_game.bus.on('display?fillRectywidth_bis', (y, width, var71) => inst_disp.receivefillRectywidth_bisOndisplay(y, width, var71));
	inst_game.bus.on('display?drawIntegerx_bis', (x, var60) => inst_disp.receivedrawIntegerx_bisOndisplay(x, var60));
	inst_game.bus.on('display?drawIntegervdigitsscalevar8y_bis', (digits, y, scale, var8, v, var61) => inst_disp.receivedrawIntegervdigitsscalevar8y_bisOndisplay(digits, y, scale, var8, v, var61));
	inst_game.bus.on('display?drawThingMLvar9_bis', (var9, var56) => inst_disp.receivedrawThingMLvar9_bisOndisplay(var9, var56));
	inst_game.bus.on('display?drawThingMLxy_bis', (var57, y, x) => inst_disp.receivedrawThingMLxy_bisOndisplay(var57, y, x));
	inst_timer.bus.on('timer?timer_timeout', (var2, var24, id) => inst_game.receivetimer_timeoutOnclock(var2, var24, id));
	inst_game.bus.on('clock?timer_start', (var25, var0, time, id) => inst_timer.receivetimer_startOntimer(var25, var0, time, id));
	inst_game.bus.on('clock?timer_cancel', (var1, id, var23) => inst_timer.receivetimer_cancelOntimer(var1, id, var23));
	
	inst_sound._init();
	inst_timer._init();
	inst_disp._init();
	inst_ctrl._init();
	inst_game._init();
	
	/*$PLUGINS_END$*/
}

window.addEventListener('DOMContentLoaded', function(){
	RunThingMLConfiguration();
});

