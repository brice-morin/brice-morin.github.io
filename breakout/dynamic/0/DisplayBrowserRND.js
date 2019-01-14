'use strict';


/*
 * Definition for type : DisplayBrowserRND
 */

function DisplayBrowserRND(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

DisplayBrowserRND.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SC');
	let _initial_Display_SC = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let Display_SC_Wait = new StateJS.State('Wait', this._statemachine);
	let Display_SC_Running = new StateJS.State('Running', this._statemachine).entry(() => {
		if(2 < 28) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x4A), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0x62), 0);
		
		}
		if(139 < 198) {
		setTimeout(() => this.bus.emit('display?displayReadyvar13', 0x14, 0xE9), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar13_bis', 0xA8, 0xE9), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar3_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar3_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorg) => {
		return setColorg._port === 'display' && setColorg._msg === 'setColorg';
	}).effect((setColorg) => {
		this.Display_SC_Running_received_display_setColorg_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorg.g;
		if(this.Display_SC_Running_received_display_setColorbrvar4_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorg_var = false;
		this.Display_SC_Running_received_display_setColorbrvar4_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear__bis) => {
		return clear__bis._port === 'display' && clear__bis._msg === 'clear__bis';
	}).effect((clear__bis) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar3_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar3_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysizevar10) => {
		return createxsizeysizevar10._port === 'display' && createxsizeysizevar10._msg === 'createxsizeysizevar10' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createxsizeysizevar10) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar10.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar10.ysize;
		this.Display_SC_Wait_display_create_var10_var = createxsizeysizevar10.var10;
		this.initDisplay(createxsizeysizevar10.xsize, createxsizeysizevar10.ysize);
		this.Display_SC_Wait_received_display_createxsizeysizevar10_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysizevar10) => {
		return createxsizeysizevar10._port === 'display' && createxsizeysizevar10._msg === 'createxsizeysizevar10' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createxsizeysizevar10) => {
		this.Display_SC_Wait_received_display_createxsizeysizevar10_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar10.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar10.ysize;
		this.Display_SC_Wait_display_create_var10_var = createxsizeysizevar10.var10;
	});
	Display_SC_Running.to(null).when((setBGColorb_bis) => {
		return setBGColorb_bis._port === 'display' && setBGColorb_bis._msg === 'setBGColorb_bis';
	}).effect((setBGColorb_bis) => {
		this.Display_SC_Running_received_display_setBGColorb_var = true;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorb_bis.b;
		if(this.Display_SC_Running_received_display_setBGColorvar5rg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		this.Display_SC_Running_received_display_setBGColorvar5rg_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyvar11_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar11_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyvar11_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((drawRectheight) => {
		return drawRectheight._port === 'display' && drawRectheight._msg === 'drawRectheight';
	}).effect((drawRectheight) => {
		this.Display_SC_Running_received_display_drawRectheight_var = true;
		this.Display_SC_Running_display_drawRect_height_var = drawRectheight.height;
		if(this.Display_SC_Running_received_display_drawRectyvar6xwidth_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectheight_var = false;
		this.Display_SC_Running_received_display_drawRectyvar6xwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorbrvar4_bis) => {
		return setColorbrvar4_bis._port === 'display' && setColorbrvar4_bis._msg === 'setColorbrvar4_bis';
	}).effect((setColorbrvar4_bis) => {
		this.Display_SC_Running_received_display_setColorbrvar4_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbrvar4_bis.b;
		this.Display_SC_Running_display_setColor_r_var = setColorbrvar4_bis.r;
		this.Display_SC_Running_display_setColor_var4_var = setColorbrvar4_bis.var4;
		if(this.Display_SC_Running_received_display_setColorg_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbrvar4_var = false;
		this.Display_SC_Running_received_display_setColorg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorvar5rg_bis) => {
		return setBGColorvar5rg_bis._port === 'display' && setBGColorvar5rg_bis._msg === 'setBGColorvar5rg_bis';
	}).effect((setBGColorvar5rg_bis) => {
		this.Display_SC_Running_received_display_setBGColorvar5rg_var = true;
		this.Display_SC_Running_display_setBGColor_var5_var = setBGColorvar5rg_bis.var5;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorvar5rg_bis.r;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorvar5rg_bis.g;
		if(this.Display_SC_Running_received_display_setBGColorb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar5rg_var = false;
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearvar3) => {
		return clearvar3._port === 'display' && clearvar3._msg === 'clearvar3';
	}).effect((clearvar3) => {
		this.Display_SC_Running_received_display_clearvar3_var = true;
		this.Display_SC_Running_display_clear_var3_var = clearvar3.var3;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar3_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearvar3_bis) => {
		return clearvar3_bis._port === 'display' && clearvar3_bis._msg === 'clearvar3_bis';
	}).effect((clearvar3_bis) => {
		this.Display_SC_Running_received_display_clearvar3_var = true;
		this.Display_SC_Running_display_clear_var3_var = clearvar3_bis.var3;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar3_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (this.Display_SC_Wait_received_display_createxsizeysizevar10_var);
	}).effect((create_) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createxsizeysizevar10_var = false;
	});
	Display_SC_Wait.to(null).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (!(this.Display_SC_Wait_received_display_createxsizeysizevar10_var));
	}).effect((create_) => {
		this.Display_SC_Wait_received_display_create__var = true;
	});
	Display_SC_Running.to(null).when((drawThingMLxy) => {
		return drawThingMLxy._port === 'display' && drawThingMLxy._msg === 'drawThingMLxy';
	}).effect((drawThingMLxy) => {
		this.Display_SC_Running_received_display_drawThingMLxy_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxy.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLxy.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar9_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar9_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar11) => {
		return destroyvar11._port === 'display' && destroyvar11._msg === 'destroyvar11' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar11) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar11_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar11) => {
		return destroyvar11._port === 'display' && destroyvar11._msg === 'destroyvar11' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar11) => {
		this.Display_SC_Running_received_display_destroyvar11_var = true;
	});
	Display_SC_Running.to(null).when((drawThingMLvar9) => {
		return drawThingMLvar9._port === 'display' && drawThingMLvar9._msg === 'drawThingMLvar9';
	}).effect((drawThingMLvar9) => {
		this.Display_SC_Running_received_display_drawThingMLvar9_var = true;
		this.Display_SC_Running_display_drawThingML_var9_var = drawThingMLvar9.var9;
		if(this.Display_SC_Running_received_display_drawThingMLxy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar9_var = false;
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLxy_bis) => {
		return drawThingMLxy_bis._port === 'display' && drawThingMLxy_bis._msg === 'drawThingMLxy_bis';
	}).effect((drawThingMLxy_bis) => {
		this.Display_SC_Running_received_display_drawThingMLxy_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxy_bis.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLxy_bis.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar9_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar9_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorvar5rg) => {
		return setBGColorvar5rg._port === 'display' && setBGColorvar5rg._msg === 'setBGColorvar5rg';
	}).effect((setBGColorvar5rg) => {
		this.Display_SC_Running_received_display_setBGColorvar5rg_var = true;
		this.Display_SC_Running_display_setBGColor_var5_var = setBGColorvar5rg.var5;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorvar5rg.r;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorvar5rg.g;
		if(this.Display_SC_Running_received_display_setBGColorb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar5rg_var = false;
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorb) => {
		return setBGColorb._port === 'display' && setBGColorb._msg === 'setBGColorb';
	}).effect((setBGColorb) => {
		this.Display_SC_Running_received_display_setBGColorb_var = true;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorb.b;
		if(this.Display_SC_Running_received_display_setBGColorvar5rg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		this.Display_SC_Running_received_display_setBGColorvar5rg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervdigitsscalevar8y_bis) => {
		return drawIntegervdigitsscalevar8y_bis._port === 'display' && drawIntegervdigitsscalevar8y_bis._msg === 'drawIntegervdigitsscalevar8y_bis';
	}).effect((drawIntegervdigitsscalevar8y_bis) => {
		this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervdigitsscalevar8y_bis.v;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegervdigitsscalevar8y_bis.digits;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervdigitsscalevar8y_bis.scale;
		this.Display_SC_Running_display_drawInteger_var8_var = drawIntegervdigitsscalevar8y_bis.var8;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervdigitsscalevar8y_bis.y;
		if(this.Display_SC_Running_received_display_drawIntegerx_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var = false;
		this.Display_SC_Running_received_display_drawIntegerx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyvar6xwidth_bis) => {
		return drawRectyvar6xwidth_bis._port === 'display' && drawRectyvar6xwidth_bis._msg === 'drawRectyvar6xwidth_bis';
	}).effect((drawRectyvar6xwidth_bis) => {
		this.Display_SC_Running_received_display_drawRectyvar6xwidth_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyvar6xwidth_bis.y;
		this.Display_SC_Running_display_drawRect_var6_var = drawRectyvar6xwidth_bis.var6;
		this.Display_SC_Running_display_drawRect_x_var = drawRectyvar6xwidth_bis.x;
		this.Display_SC_Running_display_drawRect_width_var = drawRectyvar6xwidth_bis.width;
		if(this.Display_SC_Running_received_display_drawRectheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyvar6xwidth_var = false;
		this.Display_SC_Running_received_display_drawRectheight_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectheight_bis) => {
		return drawRectheight_bis._port === 'display' && drawRectheight_bis._msg === 'drawRectheight_bis';
	}).effect((drawRectheight_bis) => {
		this.Display_SC_Running_received_display_drawRectheight_var = true;
		this.Display_SC_Running_display_drawRect_height_var = drawRectheight_bis.height;
		if(this.Display_SC_Running_received_display_drawRectyvar6xwidth_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectheight_var = false;
		this.Display_SC_Running_received_display_drawRectyvar6xwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectheightxvar7_bis) => {
		return fillRectheightxvar7_bis._port === 'display' && fillRectheightxvar7_bis._msg === 'fillRectheightxvar7_bis';
	}).effect((fillRectheightxvar7_bis) => {
		this.Display_SC_Running_received_display_fillRectheightxvar7_var = true;
		this.Display_SC_Running_display_fillRect_height_var = fillRectheightxvar7_bis.height;
		this.Display_SC_Running_display_fillRect_x_var = fillRectheightxvar7_bis.x;
		this.Display_SC_Running_display_fillRect_var7_var = fillRectheightxvar7_bis.var7;
		if(this.Display_SC_Running_received_display_fillRectywidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectheightxvar7_var = false;
		this.Display_SC_Running_received_display_fillRectywidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectywidth_bis) => {
		return fillRectywidth_bis._port === 'display' && fillRectywidth_bis._msg === 'fillRectywidth_bis';
	}).effect((fillRectywidth_bis) => {
		this.Display_SC_Running_received_display_fillRectywidth_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectywidth_bis.y;
		this.Display_SC_Running_display_fillRect_width_var = fillRectywidth_bis.width;
		if(this.Display_SC_Running_received_display_fillRectheightxvar7_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectywidth_var = false;
		this.Display_SC_Running_received_display_fillRectheightxvar7_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (this.Display_SC_Wait_received_display_createxsizeysizevar10_var);
	}).effect((create__bis) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createxsizeysizevar10_var = false;
	});
	Display_SC_Wait.to(null).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (!(this.Display_SC_Wait_received_display_createxsizeysizevar10_var));
	}).effect((create__bis) => {
		this.Display_SC_Wait_received_display_create__var = true;
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (this.Display_SC_Running_received_display_destroyvar11_var);
	}).effect((destroy__bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar11_var = false;
	});
	Display_SC_Running.to(null).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (!(this.Display_SC_Running_received_display_destroyvar11_var));
	}).effect((destroy__bis) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((updatevar12) => {
		return updatevar12._port === 'display' && updatevar12._msg === 'updatevar12';
	}).effect((updatevar12) => {
		this.Display_SC_Running_received_display_updatevar12_var = true;
		this.Display_SC_Running_display_update_var12_var = updatevar12.var12;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar12_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysizevar10_bis) => {
		return createxsizeysizevar10_bis._port === 'display' && createxsizeysizevar10_bis._msg === 'createxsizeysizevar10_bis' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createxsizeysizevar10_bis) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar10_bis.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar10_bis.ysize;
		this.Display_SC_Wait_display_create_var10_var = createxsizeysizevar10_bis.var10;
		this.initDisplay(createxsizeysizevar10_bis.xsize, createxsizeysizevar10_bis.ysize);
		this.Display_SC_Wait_received_display_createxsizeysizevar10_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysizevar10_bis) => {
		return createxsizeysizevar10_bis._port === 'display' && createxsizeysizevar10_bis._msg === 'createxsizeysizevar10_bis' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createxsizeysizevar10_bis) => {
		this.Display_SC_Wait_received_display_createxsizeysizevar10_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar10_bis.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar10_bis.ysize;
		this.Display_SC_Wait_display_create_var10_var = createxsizeysizevar10_bis.var10;
	});
	Display_SC_Running.to(null).when((fillRectywidth) => {
		return fillRectywidth._port === 'display' && fillRectywidth._msg === 'fillRectywidth';
	}).effect((fillRectywidth) => {
		this.Display_SC_Running_received_display_fillRectywidth_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectywidth.y;
		this.Display_SC_Running_display_fillRect_width_var = fillRectywidth.width;
		if(this.Display_SC_Running_received_display_fillRectheightxvar7_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectywidth_var = false;
		this.Display_SC_Running_received_display_fillRectheightxvar7_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update__bis) => {
		return update__bis._port === 'display' && update__bis._msg === 'update__bis';
	}).effect((update__bis) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar12_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar12_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar12_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar12_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar11_bis) => {
		return destroyvar11_bis._port === 'display' && destroyvar11_bis._msg === 'destroyvar11_bis' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar11_bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar11_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar11_bis) => {
		return destroyvar11_bis._port === 'display' && destroyvar11_bis._msg === 'destroyvar11_bis' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar11_bis) => {
		this.Display_SC_Running_received_display_destroyvar11_var = true;
	});
	Display_SC_Running.to(null).when((drawIntegerx) => {
		return drawIntegerx._port === 'display' && drawIntegerx._msg === 'drawIntegerx';
	}).effect((drawIntegerx) => {
		this.Display_SC_Running_received_display_drawIntegerx_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerx.x;
		if(this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerx_var = false;
		this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLvar9_bis) => {
		return drawThingMLvar9_bis._port === 'display' && drawThingMLvar9_bis._msg === 'drawThingMLvar9_bis';
	}).effect((drawThingMLvar9_bis) => {
		this.Display_SC_Running_received_display_drawThingMLvar9_var = true;
		this.Display_SC_Running_display_drawThingML_var9_var = drawThingMLvar9_bis.var9;
		if(this.Display_SC_Running_received_display_drawThingMLxy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar9_var = false;
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorbrvar4) => {
		return setColorbrvar4._port === 'display' && setColorbrvar4._msg === 'setColorbrvar4';
	}).effect((setColorbrvar4) => {
		this.Display_SC_Running_received_display_setColorbrvar4_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbrvar4.b;
		this.Display_SC_Running_display_setColor_r_var = setColorbrvar4.r;
		this.Display_SC_Running_display_setColor_var4_var = setColorbrvar4.var4;
		if(this.Display_SC_Running_received_display_setColorg_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbrvar4_var = false;
		this.Display_SC_Running_received_display_setColorg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updatevar12_bis) => {
		return updatevar12_bis._port === 'display' && updatevar12_bis._msg === 'updatevar12_bis';
	}).effect((updatevar12_bis) => {
		this.Display_SC_Running_received_display_updatevar12_var = true;
		this.Display_SC_Running_display_update_var12_var = updatevar12_bis.var12;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar12_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerx_bis) => {
		return drawIntegerx_bis._port === 'display' && drawIntegerx_bis._msg === 'drawIntegerx_bis';
	}).effect((drawIntegerx_bis) => {
		this.Display_SC_Running_received_display_drawIntegerx_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerx_bis.x;
		if(this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerx_var = false;
		this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervdigitsscalevar8y) => {
		return drawIntegervdigitsscalevar8y._port === 'display' && drawIntegervdigitsscalevar8y._msg === 'drawIntegervdigitsscalevar8y';
	}).effect((drawIntegervdigitsscalevar8y) => {
		this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervdigitsscalevar8y.v;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegervdigitsscalevar8y.digits;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervdigitsscalevar8y.scale;
		this.Display_SC_Running_display_drawInteger_var8_var = drawIntegervdigitsscalevar8y.var8;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervdigitsscalevar8y.y;
		if(this.Display_SC_Running_received_display_drawIntegerx_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var = false;
		this.Display_SC_Running_received_display_drawIntegerx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyvar6xwidth) => {
		return drawRectyvar6xwidth._port === 'display' && drawRectyvar6xwidth._msg === 'drawRectyvar6xwidth';
	}).effect((drawRectyvar6xwidth) => {
		this.Display_SC_Running_received_display_drawRectyvar6xwidth_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyvar6xwidth.y;
		this.Display_SC_Running_display_drawRect_var6_var = drawRectyvar6xwidth.var6;
		this.Display_SC_Running_display_drawRect_x_var = drawRectyvar6xwidth.x;
		this.Display_SC_Running_display_drawRect_width_var = drawRectyvar6xwidth.width;
		if(this.Display_SC_Running_received_display_drawRectheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyvar6xwidth_var = false;
		this.Display_SC_Running_received_display_drawRectheight_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectheightxvar7) => {
		return fillRectheightxvar7._port === 'display' && fillRectheightxvar7._msg === 'fillRectheightxvar7';
	}).effect((fillRectheightxvar7) => {
		this.Display_SC_Running_received_display_fillRectheightxvar7_var = true;
		this.Display_SC_Running_display_fillRect_height_var = fillRectheightxvar7.height;
		this.Display_SC_Running_display_fillRect_x_var = fillRectheightxvar7.x;
		this.Display_SC_Running_display_fillRect_var7_var = fillRectheightxvar7.var7;
		if(this.Display_SC_Running_received_display_fillRectywidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectheightxvar7_var = false;
		this.Display_SC_Running_received_display_fillRectywidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorg_bis) => {
		return setColorg_bis._port === 'display' && setColorg_bis._msg === 'setColorg_bis';
	}).effect((setColorg_bis) => {
		this.Display_SC_Running_received_display_setColorg_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorg_bis.g;
		if(this.Display_SC_Running_received_display_setColorbrvar4_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorg_var = false;
		this.Display_SC_Running_received_display_setColorbrvar4_var = false;
		
		}
	});
}
DisplayBrowserRND.prototype.drawDigit = function(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_d_var, Display_drawDigit_size_var) {
	if(Display_drawDigit_d_var < 1) {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 4 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	
	} else {
	if(Display_drawDigit_d_var < 2) {
	this.fillRect(Display_drawDigit_x_var + Display_drawDigit_size_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	
	} else {
	if(Display_drawDigit_d_var < 3) {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var * 3, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 3 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, Display_drawDigit_size_var, 3 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 4 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	
	} else {
	if(Display_drawDigit_d_var < 4) {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var * 3, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 4 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + Display_drawDigit_size_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, 2 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	
	} else {
	if(Display_drawDigit_d_var < 5) {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 3 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	
	} else {
	if(Display_drawDigit_d_var < 6) {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var * 3, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 3 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, Display_drawDigit_size_var, 3 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 4 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	
	} else {
	if(Display_drawDigit_d_var < 7) {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var * 3, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, Display_drawDigit_size_var, 3 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 4 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	
	} else {
	if(Display_drawDigit_d_var < 8) {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	
	} else {
	if(Display_drawDigit_d_var < 9) {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 4 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	
	} else {
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 3 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var + 2 * Display_drawDigit_size_var, Display_drawDigit_y_var, Display_drawDigit_size_var, 5 * Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 4 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	this.fillRect(Display_drawDigit_x_var, Display_drawDigit_y_var + 2 * Display_drawDigit_size_var, 3 * Display_drawDigit_size_var, Display_drawDigit_size_var);
	
	}
	
	}
	
	}
	
	}
	
	}
	
	}
	
	}
	
	}
	
	}
}

DisplayBrowserRND.prototype.drawThingML = function(Display_drawThingML_px_var, Display_drawThingML_py_var) {
	this.setColor(255, 255, 255);
	this.fillRect(Display_drawThingML_px_var, Display_drawThingML_py_var, 108, 13);
	let x_var = Display_drawThingML_px_var + 1;
	let y_var = Display_drawThingML_py_var + 1;
	this.setColor(80, 80, 80);
	this.fillRect(x_var + 0, y_var + 0, 12, 2);
	this.fillRect(x_var + 5, y_var + 0, 2, 11);
	this.fillRect(x_var + 18, y_var + 0, 2, 11);
	this.fillRect(x_var + 27, y_var + 0, 2, 11);
	this.fillRect(x_var + 18, y_var + 5, 11, 2);
	this.fillRect(x_var + 36, y_var + 0, 2, 11);
	this.fillRect(x_var + 44, y_var + 0, 2, 11);
	this.fillRect(x_var + 46, y_var + 1, 1, 3);
	this.fillRect(x_var + 47, y_var + 2, 1, 3);
	this.fillRect(x_var + 48, y_var + 3, 1, 3);
	this.fillRect(x_var + 49, y_var + 4, 1, 3);
	this.fillRect(x_var + 50, y_var + 5, 1, 3);
	this.fillRect(x_var + 51, y_var + 6, 1, 3);
	this.fillRect(x_var + 52, y_var + 7, 1, 3);
	this.fillRect(x_var + 53, y_var + 0, 2, 11);
	this.fillRect(x_var + 62, y_var + 0, 2, 11);
	this.fillRect(x_var + 62, y_var + 0, 12, 2);
	this.fillRect(x_var + 62, y_var + 9, 12, 2);
	this.fillRect(x_var + 62, y_var + 9, 12, 2);
	this.fillRect(x_var + 69, y_var + 5, 5, 2);
	this.fillRect(x_var + 72, y_var + 7, 2, 2);
	this.setColor(232, 141, 10);
	this.fillRect(x_var + 80, y_var + 0, 11, 2);
	this.fillRect(x_var + 80, y_var + 0, 2, 11);
	this.fillRect(x_var + 85, y_var + 0, 2, 11);
	this.fillRect(x_var + 89, y_var + 0, 2, 11);
	this.fillRect(x_var + 95, y_var + 0, 2, 11);
	this.fillRect(x_var + 95, y_var + 9, 11, 2);
}

DisplayBrowserRND.prototype.drawInteger = function(Display_drawInteger_x_var, Display_drawInteger_y_var, Display_drawInteger_v_var, Display_drawInteger_digits_var, Display_drawInteger_scale_var) {
	this.clearInteger(Display_drawInteger_x_var, Display_drawInteger_y_var, Display_drawInteger_digits_var, Display_drawInteger_scale_var);
	let val_var = Display_drawInteger_v_var;
	let d_var = Display_drawInteger_digits_var;
	while(d_var > 0) {
	this.drawDigit(Display_drawInteger_x_var + (d_var - 1) * 4 * Display_drawInteger_scale_var, Display_drawInteger_y_var, val_var % 10, Display_drawInteger_scale_var);
	val_var = Math.trunc(val_var / 10);
	d_var = d_var - 1;
	
	}
}

DisplayBrowserRND.prototype.clearInteger = function(Display_clearInteger_x_var, Display_clearInteger_y_var, Display_clearInteger_digits_var, Display_clearInteger_scale_var) {
	this.setColor(this.Display_bg_r_var, this.Display_bg_g_var, this.Display_bg_b_var);
	this.fillRect(Display_clearInteger_x_var, Display_clearInteger_y_var, (Display_clearInteger_digits_var * 4 - 1) * Display_clearInteger_scale_var, 5 * Display_clearInteger_scale_var);
	this.setColor(this.Display_fg_r_var, this.Display_fg_g_var, this.Display_fg_b_var);
}

DisplayBrowserRND.prototype.initDisplay = function(DisplayBrowser_initDisplay_xsize_var, DisplayBrowser_initDisplay_ysize_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_initDisplay_xsize_var;
	this.bus.emit('XFRAMESIZE=', this.DisplayBrowser_XFRAMESIZE_var);
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_initDisplay_ysize_var;
	this.bus.emit('YFRAMESIZE=', this.DisplayBrowser_YFRAMESIZE_var);
	
		document.body.style.backgroundColor = "gray";
	
		/* Create buffer canvas */
		var buffer = document.createElement("canvas");
		buffer.setAttribute("width", this.DisplayBrowser_XFRAMESIZE_var);
		buffer.setAttribute("height", this.DisplayBrowser_YFRAMESIZE_var);
		buffer.style.imageRendering = "pixelated";
		this.DisplayBrowser_BufferCanvas_var = buffer;
	
		var bufferCtx = buffer.getContext("2d");
		bufferCtx.imageSmoothingEnabled = false;
		bufferCtx.mozImageSmoothingEnabled = false;
		bufferCtx.webkitImageSmoothingEnabled = false;
		bufferCtx.msImageSmoothingEnabled = false;
		this.DisplayBrowser_Buffer_var = bufferCtx;
	
		/* Create the display canvas */
		var display = document.createElement("canvas");
		display.setAttribute("width", this.DisplayBrowser_XFRAMESIZE_var * this.DisplayBrowser_SCALE_var);
		display.setAttribute("height", this.DisplayBrowser_YFRAMESIZE_var * this.DisplayBrowser_SCALE_var);
	
		var displayCtx = display.getContext("2d");
		displayCtx.imageSmoothingEnabled = false;
		displayCtx.mozImageSmoothingEnabled = false;
		displayCtx.webkitImageSmoothingEnabled = false;
		displayCtx.msImageSmoothingEnabled = false;
	
		this.DisplayBrowser_Display_var = displayCtx;
	
		// Put it in the middle of the window
		display.style.position = "absolute";
		display.style.left = "50%";
		display.style.top = "50%";
		display.style.marginLeft = Math.trunc( -this.DisplayBrowser_XFRAMESIZE_var / 2) * this.DisplayBrowser_SCALE_var+"px";
		display.style.marginTop = Math.trunc( -this.DisplayBrowser_YFRAMESIZE_var / 2) * this.DisplayBrowser_SCALE_var+"px";
		display.style.cursor = "none";
		document.body.appendChild(display);
	
		// Add mouse over events
		display.addEventListener("mousemove", (e) => {
			var mouseX = e.offsetX/(this.DisplayBrowser_XFRAMESIZE_var * this.DisplayBrowser_SCALE_var); // [0,1]
		
			// TODO: Some hardcoded numbers
			var dispX = mouseX*10240; //XMAX
			var posX = (dispX-5120)*200/8406;
			posX = Math.max(-100, Math.min(100, posX));
		
		
		if(213 < 115) {
		setTimeout(() => this.bus.emit('vctrl?positionvar16', 0xE0, 0xF0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar16_bis', 0xF0, 0xCC), 0);
		
		}
		if(67 < 94) {
		setTimeout(() => this.bus.emit('vctrl?positionyx', 0x69, posX, 0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionyx_bis', posX, 0x95, 0), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(147 < 118) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar15', 0x8D, 0x87), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar15_bis', 0x85, 0x8D), 0);
			
			}
			if(33 < 45) {
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0,  -8, 0xA2), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy_bis', 0x6F, 0,  -8), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(10 < 173) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar15', 0xF2, 0x29), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar15_bis', 0x4F, 0xF2), 0);
			
			}
			if(211 < 183) {
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0, 8, 0x3F), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy_bis', 0x44, 0, 8), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(147 < 190) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar15', 0xE9, 0xDA), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar15_bis', 0x4E, 0xE9), 0);
			
			}
			if(234 < 237) {
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0, 0, 0x0C), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy_bis', 0x03, 0, 0), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(185 < 151) {
		setTimeout(() => this.bus.emit('vctrl?positionyx', 0xE3, x, 0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionyx_bis', x, 0x29, 0), 0);
		
		}
		if(164 < 164) {
		setTimeout(() => this.bus.emit('vctrl?positionvar16', 0x07, 0xEF), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar16_bis', 0xEF, 0xB7), 0);
		
		}
		
			};
		
}

DisplayBrowserRND.prototype.destroyDisplay = function() {
	
}

DisplayBrowserRND.prototype.updateDisplay = function() {
	this.DisplayBrowser_Display_var.drawImage(this.DisplayBrowser_BufferCanvas_var, 0, 0, this.DisplayBrowser_XFRAMESIZE_var * this.DisplayBrowser_SCALE_var, this.DisplayBrowser_YFRAMESIZE_var * this.DisplayBrowser_SCALE_var);
}

DisplayBrowserRND.prototype.clearScreen = function() {
	this.setColor(0, 0, 0);
	this.fillRect(0, 0, this.DisplayBrowser_XFRAMESIZE_var, this.DisplayBrowser_YFRAMESIZE_var);
	this.updateDisplay();
}

DisplayBrowserRND.prototype.setColor = function(DisplayBrowser_setColor_r_var, DisplayBrowser_setColor_g_var, DisplayBrowser_setColor_b_var) {
	
		this.DisplayBrowser_Buffer_var.strokeStyle = "rgb("+DisplayBrowser_setColor_r_var+", "+DisplayBrowser_setColor_g_var+", "+DisplayBrowser_setColor_b_var+")";
		this.DisplayBrowser_Buffer_var.fillStyle = "rgb("+DisplayBrowser_setColor_r_var+", "+DisplayBrowser_setColor_g_var+", "+DisplayBrowser_setColor_b_var+")";
	
}

DisplayBrowserRND.prototype.drawRect = function(DisplayBrowser_drawRect_x_var, DisplayBrowser_drawRect_y_var, DisplayBrowser_drawRect_width_var, DisplayBrowser_drawRect_height_var) {
	
		var xr = Math.floor(DisplayBrowser_drawRect_x_var);
		var yr = Math.floor(DisplayBrowser_drawRect_y_var);
		var wr = Math.floor(DisplayBrowser_drawRect_width_var);
		var hr = Math.floor(DisplayBrowser_drawRect_height_var);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, wr, 1);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr+hr-1, wr, 1);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, 1, hr);
		this.DisplayBrowser_Buffer_var.fillRect(xr+wr-1, yr, 1, hr);
	
}

DisplayBrowserRND.prototype.fillRect = function(DisplayBrowser_fillRect_x_var, DisplayBrowser_fillRect_y_var, DisplayBrowser_fillRect_width_var, DisplayBrowser_fillRect_height_var) {
	
		var xr = Math.floor(DisplayBrowser_fillRect_x_var);
		var yr = Math.floor(DisplayBrowser_fillRect_y_var);
		var wr = Math.floor(DisplayBrowser_fillRect_width_var);
		var hr = Math.floor(DisplayBrowser_fillRect_height_var);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, wr, hr);
	
}

DisplayBrowserRND.prototype.rnd = function() {
	return Math.floor(Math.random() * Math.floor(246)) + 5;
}

DisplayBrowserRND.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

DisplayBrowserRND.prototype._delete = function() {
	this._statemachine = null;
	this._SC_instance = null;
	this.bus.removeAllListeners();
}

DisplayBrowserRND.prototype._init = function() {
	this._SC_instance = new StateJS.Instance("SC_instance", this._statemachine);
	this.ready = true;
}

DisplayBrowserRND.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SC_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

DisplayBrowserRND.prototype.receivecreate_Ondisplay = function(var40) {
	this._receive({_port:"display", _msg:"create_", var40:var40});
}

DisplayBrowserRND.prototype.receivecreatexsizeysizevar10Ondisplay = function(ysize, var10, var41, xsize) {
	this._receive({_port:"display", _msg:"createxsizeysizevar10", ysize:ysize, var10:var10, var41:var41, xsize:xsize});
}

DisplayBrowserRND.prototype.receivedestroy_Ondisplay = function(var30) {
	this._receive({_port:"display", _msg:"destroy_", var30:var30});
}

DisplayBrowserRND.prototype.receivedestroyvar11Ondisplay = function(var11, var31) {
	this._receive({_port:"display", _msg:"destroyvar11", var11:var11, var31:var31});
}

DisplayBrowserRND.prototype.receiveupdate_Ondisplay = function(var34) {
	this._receive({_port:"display", _msg:"update_", var34:var34});
}

DisplayBrowserRND.prototype.receiveupdatevar12Ondisplay = function(var35, var12) {
	this._receive({_port:"display", _msg:"updatevar12", var35:var35, var12:var12});
}

DisplayBrowserRND.prototype.receiveclear_Ondisplay = function(var48) {
	this._receive({_port:"display", _msg:"clear_", var48:var48});
}

DisplayBrowserRND.prototype.receiveclearvar3Ondisplay = function(var49, var3) {
	this._receive({_port:"display", _msg:"clearvar3", var49:var49, var3:var3});
}

DisplayBrowserRND.prototype.receivesetColorbrvar4Ondisplay = function(var42, var4, b, r) {
	this._receive({_port:"display", _msg:"setColorbrvar4", var42:var42, var4:var4, b:b, r:r});
}

DisplayBrowserRND.prototype.receivesetColorgOndisplay = function(var43, g) {
	this._receive({_port:"display", _msg:"setColorg", var43:var43, g:g});
}

DisplayBrowserRND.prototype.receivesetBGColorbOndisplay = function(b, var28) {
	this._receive({_port:"display", _msg:"setBGColorb", b:b, var28:var28});
}

DisplayBrowserRND.prototype.receivesetBGColorvar5rgOndisplay = function(var5, g, r, var29) {
	this._receive({_port:"display", _msg:"setBGColorvar5rg", var5:var5, g:g, r:r, var29:var29});
}

DisplayBrowserRND.prototype.receivedrawRectheightOndisplay = function(height, var44) {
	this._receive({_port:"display", _msg:"drawRectheight", height:height, var44:var44});
}

DisplayBrowserRND.prototype.receivedrawRectyvar6xwidthOndisplay = function(width, x, y, var6, var45) {
	this._receive({_port:"display", _msg:"drawRectyvar6xwidth", width:width, x:x, y:y, var6:var6, var45:var45});
}

DisplayBrowserRND.prototype.receivefillRectheightxvar7Ondisplay = function(height, var46, var7, x) {
	this._receive({_port:"display", _msg:"fillRectheightxvar7", height:height, var46:var46, var7:var7, x:x});
}

DisplayBrowserRND.prototype.receivefillRectywidthOndisplay = function(var47, y, width) {
	this._receive({_port:"display", _msg:"fillRectywidth", var47:var47, y:y, width:width});
}

DisplayBrowserRND.prototype.receivedrawIntegerxOndisplay = function(var36, x) {
	this._receive({_port:"display", _msg:"drawIntegerx", var36:var36, x:x});
}

DisplayBrowserRND.prototype.receivedrawIntegervdigitsscalevar8yOndisplay = function(scale, var8, digits, v, y, var37) {
	this._receive({_port:"display", _msg:"drawIntegervdigitsscalevar8y", scale:scale, var8:var8, digits:digits, v:v, y:y, var37:var37});
}

DisplayBrowserRND.prototype.receivedrawThingMLvar9Ondisplay = function(var9, var32) {
	this._receive({_port:"display", _msg:"drawThingMLvar9", var9:var9, var32:var32});
}

DisplayBrowserRND.prototype.receivedrawThingMLxyOndisplay = function(y, x, var33) {
	this._receive({_port:"display", _msg:"drawThingMLxy", y:y, x:x, var33:var33});
}

DisplayBrowserRND.prototype.receivecreate__bisOndisplay = function(var64) {
	this._receive({_port:"display", _msg:"create__bis", var64:var64});
}

DisplayBrowserRND.prototype.receivecreatexsizeysizevar10_bisOndisplay = function(var10, var65, ysize, xsize) {
	this._receive({_port:"display", _msg:"createxsizeysizevar10_bis", var10:var10, var65:var65, ysize:ysize, xsize:xsize});
}

DisplayBrowserRND.prototype.receivedestroy__bisOndisplay = function(var54) {
	this._receive({_port:"display", _msg:"destroy__bis", var54:var54});
}

DisplayBrowserRND.prototype.receivedestroyvar11_bisOndisplay = function(var55, var11) {
	this._receive({_port:"display", _msg:"destroyvar11_bis", var55:var55, var11:var11});
}

DisplayBrowserRND.prototype.receiveupdate__bisOndisplay = function(var58) {
	this._receive({_port:"display", _msg:"update__bis", var58:var58});
}

DisplayBrowserRND.prototype.receiveupdatevar12_bisOndisplay = function(var59, var12) {
	this._receive({_port:"display", _msg:"updatevar12_bis", var59:var59, var12:var12});
}

DisplayBrowserRND.prototype.receiveclear__bisOndisplay = function(var72) {
	this._receive({_port:"display", _msg:"clear__bis", var72:var72});
}

DisplayBrowserRND.prototype.receiveclearvar3_bisOndisplay = function(var3, var73) {
	this._receive({_port:"display", _msg:"clearvar3_bis", var3:var3, var73:var73});
}

DisplayBrowserRND.prototype.receivesetColorbrvar4_bisOndisplay = function(r, var4, var66, b) {
	this._receive({_port:"display", _msg:"setColorbrvar4_bis", r:r, var4:var4, var66:var66, b:b});
}

DisplayBrowserRND.prototype.receivesetColorg_bisOndisplay = function(var67, g) {
	this._receive({_port:"display", _msg:"setColorg_bis", var67:var67, g:g});
}

DisplayBrowserRND.prototype.receivesetBGColorb_bisOndisplay = function(var52, b) {
	this._receive({_port:"display", _msg:"setBGColorb_bis", var52:var52, b:b});
}

DisplayBrowserRND.prototype.receivesetBGColorvar5rg_bisOndisplay = function(var53, var5, g, r) {
	this._receive({_port:"display", _msg:"setBGColorvar5rg_bis", var53:var53, var5:var5, g:g, r:r});
}

DisplayBrowserRND.prototype.receivedrawRectheight_bisOndisplay = function(var68, height) {
	this._receive({_port:"display", _msg:"drawRectheight_bis", var68:var68, height:height});
}

DisplayBrowserRND.prototype.receivedrawRectyvar6xwidth_bisOndisplay = function(x, width, var6, y, var69) {
	this._receive({_port:"display", _msg:"drawRectyvar6xwidth_bis", x:x, width:width, var6:var6, y:y, var69:var69});
}

DisplayBrowserRND.prototype.receivefillRectheightxvar7_bisOndisplay = function(var70, x, height, var7) {
	this._receive({_port:"display", _msg:"fillRectheightxvar7_bis", var70:var70, x:x, height:height, var7:var7});
}

DisplayBrowserRND.prototype.receivefillRectywidth_bisOndisplay = function(y, width, var71) {
	this._receive({_port:"display", _msg:"fillRectywidth_bis", y:y, width:width, var71:var71});
}

DisplayBrowserRND.prototype.receivedrawIntegerx_bisOndisplay = function(x, var60) {
	this._receive({_port:"display", _msg:"drawIntegerx_bis", x:x, var60:var60});
}

DisplayBrowserRND.prototype.receivedrawIntegervdigitsscalevar8y_bisOndisplay = function(digits, y, scale, var8, v, var61) {
	this._receive({_port:"display", _msg:"drawIntegervdigitsscalevar8y_bis", digits:digits, y:y, scale:scale, var8:var8, v:v, var61:var61});
}

DisplayBrowserRND.prototype.receivedrawThingMLvar9_bisOndisplay = function(var9, var56) {
	this._receive({_port:"display", _msg:"drawThingMLvar9_bis", var9:var9, var56:var56});
}

DisplayBrowserRND.prototype.receivedrawThingMLxy_bisOndisplay = function(var57, y, x) {
	this._receive({_port:"display", _msg:"drawThingMLxy_bis", var57:var57, y:y, x:x});
}

DisplayBrowserRND.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRectheight_var = function(Display_SC_Running_received_display_drawRectheight_var) {
	this.Display_SC_Running_received_display_drawRectheight_var = Display_SC_Running_received_display_drawRectheight_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_clear_var3_var = function(Display_SC_Running_display_clear_var3_var) {
	this.Display_SC_Running_display_clear_var3_var = Display_SC_Running_display_clear_var3_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_createxsizeysizevar10_var = function(Display_SC_Wait_received_display_createxsizeysizevar10_var) {
	this.Display_SC_Wait_received_display_createxsizeysizevar10_var = Display_SC_Wait_received_display_createxsizeysizevar10_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_var4_var = function(Display_SC_Running_display_setColor_var4_var) {
	this.Display_SC_Running_display_setColor_var4_var = Display_SC_Running_display_setColor_var4_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroyvar11_var = function(Display_SC_Running_received_display_destroyvar11_var) {
	this.Display_SC_Running_received_display_destroyvar11_var = Display_SC_Running_received_display_destroyvar11_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawIntegervdigitsscalevar8y_var = function(Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var) {
	this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var = Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_var9_var = function(Display_SC_Running_display_drawThingML_var9_var) {
	this.Display_SC_Running_display_drawThingML_var9_var = Display_SC_Running_display_drawThingML_var9_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_var10_var = function(Display_SC_Wait_display_create_var10_var) {
	this.Display_SC_Wait_display_create_var10_var = Display_SC_Wait_display_create_var10_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_var8_var = function(Display_SC_Running_display_drawInteger_var8_var) {
	this.Display_SC_Running_display_drawInteger_var8_var = Display_SC_Running_display_drawInteger_var8_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectywidth_var = function(Display_SC_Running_received_display_fillRectywidth_var) {
	this.Display_SC_Running_received_display_fillRectywidth_var = Display_SC_Running_received_display_fillRectywidth_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorb_var = function(Display_SC_Running_received_display_setBGColorb_var) {
	this.Display_SC_Running_received_display_setBGColorb_var = Display_SC_Running_received_display_setBGColorb_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectheightxvar7_var = function(Display_SC_Running_received_display_fillRectheightxvar7_var) {
	this.Display_SC_Running_received_display_fillRectheightxvar7_var = Display_SC_Running_received_display_fillRectheightxvar7_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_updatevar12_var = function(Display_SC_Running_received_display_updatevar12_var) {
	this.Display_SC_Running_received_display_updatevar12_var = Display_SC_Running_received_display_updatevar12_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_create__var = function(Display_SC_Wait_received_display_create__var) {
	this.Display_SC_Wait_received_display_create__var = Display_SC_Wait_received_display_create__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRectyvar6xwidth_var = function(Display_SC_Running_received_display_drawRectyvar6xwidth_var) {
	this.Display_SC_Running_received_display_drawRectyvar6xwidth_var = Display_SC_Running_received_display_drawRectyvar6xwidth_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLvar9_var = function(Display_SC_Running_received_display_drawThingMLvar9_var) {
	this.Display_SC_Running_received_display_drawThingMLvar9_var = Display_SC_Running_received_display_drawThingMLvar9_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawIntegerx_var = function(Display_SC_Running_received_display_drawIntegerx_var) {
	this.Display_SC_Running_received_display_drawIntegerx_var = Display_SC_Running_received_display_drawIntegerx_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_var6_var = function(Display_SC_Running_display_drawRect_var6_var) {
	this.Display_SC_Running_display_drawRect_var6_var = Display_SC_Running_display_drawRect_var6_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clearvar3_var = function(Display_SC_Running_received_display_clearvar3_var) {
	this.Display_SC_Running_received_display_clearvar3_var = Display_SC_Running_received_display_clearvar3_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_destroy_var11_var = function(Display_SC_Running_display_destroy_var11_var) {
	this.Display_SC_Running_display_destroy_var11_var = Display_SC_Running_display_destroy_var11_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorvar5rg_var = function(Display_SC_Running_received_display_setBGColorvar5rg_var) {
	this.Display_SC_Running_received_display_setBGColorvar5rg_var = Display_SC_Running_received_display_setBGColorvar5rg_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_var5_var = function(Display_SC_Running_display_setBGColor_var5_var) {
	this.Display_SC_Running_display_setBGColor_var5_var = Display_SC_Running_display_setBGColor_var5_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_update_var12_var = function(Display_SC_Running_display_update_var12_var) {
	this.Display_SC_Running_display_update_var12_var = Display_SC_Running_display_update_var12_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowserRND.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorg_var = function(Display_SC_Running_received_display_setColorg_var) {
	this.Display_SC_Running_received_display_setColorg_var = Display_SC_Running_received_display_setColorg_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorbrvar4_var = function(Display_SC_Running_received_display_setColorbrvar4_var) {
	this.Display_SC_Running_received_display_setColorbrvar4_var = Display_SC_Running_received_display_setColorbrvar4_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_var7_var = function(Display_SC_Running_display_fillRect_var7_var) {
	this.Display_SC_Running_display_fillRect_var7_var = Display_SC_Running_display_fillRect_var7_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLxy_var = function(Display_SC_Running_received_display_drawThingMLxy_var) {
	this.Display_SC_Running_received_display_drawThingMLxy_var = Display_SC_Running_received_display_drawThingMLxy_var;
}

DisplayBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\treceived_display_drawRectheight = ' + this.Display_SC_Running_received_display_drawRectheight_var;
	result += '\n\tdisplay_clear_var3 = ' + this.Display_SC_Running_display_clear_var3_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\treceived_display_createxsizeysizevar10 = ' + this.Display_SC_Wait_received_display_createxsizeysizevar10_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tdisplay_setColor_var4 = ' + this.Display_SC_Running_display_setColor_var4_var;
	result += '\n\treceived_display_destroyvar11 = ' + this.Display_SC_Running_received_display_destroyvar11_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\treceived_display_drawIntegervdigitsscalevar8y = ' + this.Display_SC_Running_received_display_drawIntegervdigitsscalevar8y_var;
	result += '\n\tdisplay_drawThingML_var9 = ' + this.Display_SC_Running_display_drawThingML_var9_var;
	result += '\n\tdisplay_create_var10 = ' + this.Display_SC_Wait_display_create_var10_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tdisplay_drawInteger_var8 = ' + this.Display_SC_Running_display_drawInteger_var8_var;
	result += '\n\treceived_display_fillRectywidth = ' + this.Display_SC_Running_received_display_fillRectywidth_var;
	result += '\n\treceived_display_setBGColorb = ' + this.Display_SC_Running_received_display_setBGColorb_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\treceived_display_fillRectheightxvar7 = ' + this.Display_SC_Running_received_display_fillRectheightxvar7_var;
	result += '\n\treceived_display_updatevar12 = ' + this.Display_SC_Running_received_display_updatevar12_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\treceived_display_create_ = ' + this.Display_SC_Wait_received_display_create__var;
	result += '\n\treceived_display_drawRectyvar6xwidth = ' + this.Display_SC_Running_received_display_drawRectyvar6xwidth_var;
	result += '\n\treceived_display_drawThingMLvar9 = ' + this.Display_SC_Running_received_display_drawThingMLvar9_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\treceived_display_drawIntegerx = ' + this.Display_SC_Running_received_display_drawIntegerx_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_drawRect_var6 = ' + this.Display_SC_Running_display_drawRect_var6_var;
	result += '\n\treceived_display_clearvar3 = ' + this.Display_SC_Running_received_display_clearvar3_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tdisplay_destroy_var11 = ' + this.Display_SC_Running_display_destroy_var11_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\treceived_display_setBGColorvar5rg = ' + this.Display_SC_Running_received_display_setBGColorvar5rg_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_setBGColor_var5 = ' + this.Display_SC_Running_display_setBGColor_var5_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tdisplay_update_var12 = ' + this.Display_SC_Running_display_update_var12_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\treceived_display_setColorg = ' + this.Display_SC_Running_received_display_setColorg_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\treceived_display_setColorbrvar4 = ' + this.Display_SC_Running_received_display_setColorbrvar4_var;
	result += '\n\tdisplay_fillRect_var7 = ' + this.Display_SC_Running_display_fillRect_var7_var;
	result += '\n\treceived_display_drawThingMLxy = ' + this.Display_SC_Running_received_display_drawThingMLxy_var;
	result += '';
	return result;
}

