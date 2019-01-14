'use strict';


/*
 * Definition for type : DisplayBrowser
 */

function DisplayBrowser(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

DisplayBrowser.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SC');
	let _initial_Display_SC = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let Display_SC_Wait = new StateJS.State('Wait', this._statemachine);
	let Display_SC_Running = new StateJS.State('Running', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x60), 0);
		setTimeout(() => this.bus.emit('display?displayReadyval13', 0x0C, 0xE9), 0);
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysizeval10) => {
		return createxsizeysizeval10._port === 'display' && createxsizeysizeval10._msg === 'createxsizeysizeval10' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createxsizeysizeval10) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizeval10.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizeval10.ysize;
		this.Display_SC_Wait_display_create_val10_var = createxsizeysizeval10.val10;
		this.initDisplay(createxsizeysizeval10.xsize, createxsizeysizeval10.ysize);
		this.Display_SC_Wait_received_display_createxsizeysizeval10_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysizeval10) => {
		return createxsizeysizeval10._port === 'display' && createxsizeysizeval10._msg === 'createxsizeysizeval10' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createxsizeysizeval10) => {
		this.Display_SC_Wait_received_display_createxsizeysizeval10_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizeval10.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizeval10.ysize;
		this.Display_SC_Wait_display_create_val10_var = createxsizeysizeval10.val10;
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearval3_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearval3_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectheightxval7) => {
		return fillRectheightxval7._port === 'display' && fillRectheightxval7._msg === 'fillRectheightxval7';
	}).effect((fillRectheightxval7) => {
		this.Display_SC_Running_received_display_fillRectheightxval7_var = true;
		this.Display_SC_Running_display_fillRect_height_var = fillRectheightxval7.height;
		this.Display_SC_Running_display_fillRect_x_var = fillRectheightxval7.x;
		this.Display_SC_Running_display_fillRect_val7_var = fillRectheightxval7.val7;
		if(this.Display_SC_Running_received_display_fillRectywidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectheightxval7_var = false;
		this.Display_SC_Running_received_display_fillRectywidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectheight) => {
		return drawRectheight._port === 'display' && drawRectheight._msg === 'drawRectheight';
	}).effect((drawRectheight) => {
		this.Display_SC_Running_received_display_drawRectheight_var = true;
		this.Display_SC_Running_display_drawRect_height_var = drawRectheight.height;
		if(this.Display_SC_Running_received_display_drawRectyval6xwidth_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectheight_var = false;
		this.Display_SC_Running_received_display_drawRectyval6xwidth_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (this.Display_SC_Wait_received_display_createxsizeysizeval10_var);
	}).effect((create_) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createxsizeysizeval10_var = false;
	});
	Display_SC_Wait.to(null).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (!(this.Display_SC_Wait_received_display_createxsizeysizeval10_var));
	}).effect((create_) => {
		this.Display_SC_Wait_received_display_create__var = true;
	});
	Display_SC_Running.to(null).when((drawThingMLval9) => {
		return drawThingMLval9._port === 'display' && drawThingMLval9._msg === 'drawThingMLval9';
	}).effect((drawThingMLval9) => {
		this.Display_SC_Running_received_display_drawThingMLval9_var = true;
		this.Display_SC_Running_display_drawThingML_val9_var = drawThingMLval9.val9;
		if(this.Display_SC_Running_received_display_drawThingMLxy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLval9_var = false;
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyval11) => {
		return destroyval11._port === 'display' && destroyval11._msg === 'destroyval11' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyval11) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyval11_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyval11) => {
		return destroyval11._port === 'display' && destroyval11._msg === 'destroyval11' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyval11) => {
		this.Display_SC_Running_received_display_destroyval11_var = true;
	});
	Display_SC_Running.to(null).when((drawThingMLxy) => {
		return drawThingMLxy._port === 'display' && drawThingMLxy._msg === 'drawThingMLxy';
	}).effect((drawThingMLxy) => {
		this.Display_SC_Running_received_display_drawThingMLxy_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxy.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLxy.y;
		if(this.Display_SC_Running_received_display_drawThingMLval9_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		this.Display_SC_Running_received_display_drawThingMLval9_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updateval12) => {
		return updateval12._port === 'display' && updateval12._msg === 'updateval12';
	}).effect((updateval12) => {
		this.Display_SC_Running_received_display_updateval12_var = true;
		this.Display_SC_Running_display_update_val12_var = updateval12.val12;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updateval12_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorbrval4) => {
		return setColorbrval4._port === 'display' && setColorbrval4._msg === 'setColorbrval4';
	}).effect((setColorbrval4) => {
		this.Display_SC_Running_received_display_setColorbrval4_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbrval4.b;
		this.Display_SC_Running_display_setColor_r_var = setColorbrval4.r;
		this.Display_SC_Running_display_setColor_val4_var = setColorbrval4.val4;
		if(this.Display_SC_Running_received_display_setColorg_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbrval4_var = false;
		this.Display_SC_Running_received_display_setColorg_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyval11_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyval11_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyval11_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((setBGColorval5rg) => {
		return setBGColorval5rg._port === 'display' && setBGColorval5rg._msg === 'setBGColorval5rg';
	}).effect((setBGColorval5rg) => {
		this.Display_SC_Running_received_display_setBGColorval5rg_var = true;
		this.Display_SC_Running_display_setBGColor_val5_var = setBGColorval5rg.val5;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorval5rg.r;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorval5rg.g;
		if(this.Display_SC_Running_received_display_setBGColorb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorval5rg_var = false;
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectywidth) => {
		return fillRectywidth._port === 'display' && fillRectywidth._msg === 'fillRectywidth';
	}).effect((fillRectywidth) => {
		this.Display_SC_Running_received_display_fillRectywidth_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectywidth.y;
		this.Display_SC_Running_display_fillRect_width_var = fillRectywidth.width;
		if(this.Display_SC_Running_received_display_fillRectheightxval7_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectywidth_var = false;
		this.Display_SC_Running_received_display_fillRectheightxval7_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updateval12_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updateval12_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorb) => {
		return setBGColorb._port === 'display' && setBGColorb._msg === 'setBGColorb';
	}).effect((setBGColorb) => {
		this.Display_SC_Running_received_display_setBGColorb_var = true;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorb.b;
		if(this.Display_SC_Running_received_display_setBGColorval5rg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		this.Display_SC_Running_received_display_setBGColorval5rg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorg) => {
		return setColorg._port === 'display' && setColorg._msg === 'setColorg';
	}).effect((setColorg) => {
		this.Display_SC_Running_received_display_setColorg_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorg.g;
		if(this.Display_SC_Running_received_display_setColorbrval4_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorg_var = false;
		this.Display_SC_Running_received_display_setColorbrval4_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerx) => {
		return drawIntegerx._port === 'display' && drawIntegerx._msg === 'drawIntegerx';
	}).effect((drawIntegerx) => {
		this.Display_SC_Running_received_display_drawIntegerx_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerx.x;
		if(this.Display_SC_Running_received_display_drawIntegervdigitsscaleval8y_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerx_var = false;
		this.Display_SC_Running_received_display_drawIntegervdigitsscaleval8y_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearval3) => {
		return clearval3._port === 'display' && clearval3._msg === 'clearval3';
	}).effect((clearval3) => {
		this.Display_SC_Running_received_display_clearval3_var = true;
		this.Display_SC_Running_display_clear_val3_var = clearval3.val3;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearval3_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervdigitsscaleval8y) => {
		return drawIntegervdigitsscaleval8y._port === 'display' && drawIntegervdigitsscaleval8y._msg === 'drawIntegervdigitsscaleval8y';
	}).effect((drawIntegervdigitsscaleval8y) => {
		this.Display_SC_Running_received_display_drawIntegervdigitsscaleval8y_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervdigitsscaleval8y.v;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegervdigitsscaleval8y.digits;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervdigitsscaleval8y.scale;
		this.Display_SC_Running_display_drawInteger_val8_var = drawIntegervdigitsscaleval8y.val8;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervdigitsscaleval8y.y;
		if(this.Display_SC_Running_received_display_drawIntegerx_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervdigitsscaleval8y_var = false;
		this.Display_SC_Running_received_display_drawIntegerx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyval6xwidth) => {
		return drawRectyval6xwidth._port === 'display' && drawRectyval6xwidth._msg === 'drawRectyval6xwidth';
	}).effect((drawRectyval6xwidth) => {
		this.Display_SC_Running_received_display_drawRectyval6xwidth_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyval6xwidth.y;
		this.Display_SC_Running_display_drawRect_val6_var = drawRectyval6xwidth.val6;
		this.Display_SC_Running_display_drawRect_x_var = drawRectyval6xwidth.x;
		this.Display_SC_Running_display_drawRect_width_var = drawRectyval6xwidth.width;
		if(this.Display_SC_Running_received_display_drawRectheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyval6xwidth_var = false;
		this.Display_SC_Running_received_display_drawRectheight_var = false;
		
		}
	});
}
DisplayBrowser.prototype.drawDigit = function(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_d_var, Display_drawDigit_size_var) {
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

DisplayBrowser.prototype.drawThingML = function(Display_drawThingML_px_var, Display_drawThingML_py_var) {
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

DisplayBrowser.prototype.drawInteger = function(Display_drawInteger_x_var, Display_drawInteger_y_var, Display_drawInteger_v_var, Display_drawInteger_digits_var, Display_drawInteger_scale_var) {
	this.clearInteger(Display_drawInteger_x_var, Display_drawInteger_y_var, Display_drawInteger_digits_var, Display_drawInteger_scale_var);
	let val_var = Display_drawInteger_v_var;
	let d_var = Display_drawInteger_digits_var;
	while(d_var > 0) {
	this.drawDigit(Display_drawInteger_x_var + (d_var - 1) * 4 * Display_drawInteger_scale_var, Display_drawInteger_y_var, val_var % 10, Display_drawInteger_scale_var);
	val_var = Math.trunc(val_var / 10);
	d_var = d_var - 1;
	
	}
}

DisplayBrowser.prototype.clearInteger = function(Display_clearInteger_x_var, Display_clearInteger_y_var, Display_clearInteger_digits_var, Display_clearInteger_scale_var) {
	this.setColor(this.Display_bg_r_var, this.Display_bg_g_var, this.Display_bg_b_var);
	this.fillRect(Display_clearInteger_x_var, Display_clearInteger_y_var, (Display_clearInteger_digits_var * 4 - 1) * Display_clearInteger_scale_var, 5 * Display_clearInteger_scale_var);
	this.setColor(this.Display_fg_r_var, this.Display_fg_g_var, this.Display_fg_b_var);
}

DisplayBrowser.prototype.initDisplay = function(DisplayBrowser_initDisplay_xsize_var, DisplayBrowser_initDisplay_ysize_var) {
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
		
		
		setTimeout(() => this.bus.emit('vctrl?positionval16', 0xF0, 0xA1), 0);
		setTimeout(() => this.bus.emit('vctrl?positionyx', 0, posX, 0x8E), 0);
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval15', 0xED, 0x8D), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0xE0, 0,  -8), 0);
			
				} else if (e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval15', 0x32, 0xF2), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0x41, 0, 8), 0);
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval15', 0xC1, 0xE9), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0x3D, 0, 0), 0);
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		setTimeout(() => this.bus.emit('vctrl?positionyx', 0, x, 0x28), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval16', 0xEF, 0x6C), 0);
		
			};
		
}

DisplayBrowser.prototype.destroyDisplay = function() {
	
}

DisplayBrowser.prototype.updateDisplay = function() {
	this.DisplayBrowser_Display_var.drawImage(this.DisplayBrowser_BufferCanvas_var, 0, 0, this.DisplayBrowser_XFRAMESIZE_var * this.DisplayBrowser_SCALE_var, this.DisplayBrowser_YFRAMESIZE_var * this.DisplayBrowser_SCALE_var);
}

DisplayBrowser.prototype.clearScreen = function() {
	this.setColor(0, 0, 0);
	this.fillRect(0, 0, this.DisplayBrowser_XFRAMESIZE_var, this.DisplayBrowser_YFRAMESIZE_var);
	this.updateDisplay();
}

DisplayBrowser.prototype.setColor = function(DisplayBrowser_setColor_r_var, DisplayBrowser_setColor_g_var, DisplayBrowser_setColor_b_var) {
	
		this.DisplayBrowser_Buffer_var.strokeStyle = "rgb("+DisplayBrowser_setColor_r_var+", "+DisplayBrowser_setColor_g_var+", "+DisplayBrowser_setColor_b_var+")";
		this.DisplayBrowser_Buffer_var.fillStyle = "rgb("+DisplayBrowser_setColor_r_var+", "+DisplayBrowser_setColor_g_var+", "+DisplayBrowser_setColor_b_var+")";
	
}

DisplayBrowser.prototype.drawRect = function(DisplayBrowser_drawRect_x_var, DisplayBrowser_drawRect_y_var, DisplayBrowser_drawRect_width_var, DisplayBrowser_drawRect_height_var) {
	
		var xr = Math.floor(DisplayBrowser_drawRect_x_var);
		var yr = Math.floor(DisplayBrowser_drawRect_y_var);
		var wr = Math.floor(DisplayBrowser_drawRect_width_var);
		var hr = Math.floor(DisplayBrowser_drawRect_height_var);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, wr, 1);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr+hr-1, wr, 1);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, 1, hr);
		this.DisplayBrowser_Buffer_var.fillRect(xr+wr-1, yr, 1, hr);
	
}

DisplayBrowser.prototype.fillRect = function(DisplayBrowser_fillRect_x_var, DisplayBrowser_fillRect_y_var, DisplayBrowser_fillRect_width_var, DisplayBrowser_fillRect_height_var) {
	
		var xr = Math.floor(DisplayBrowser_fillRect_x_var);
		var yr = Math.floor(DisplayBrowser_fillRect_y_var);
		var wr = Math.floor(DisplayBrowser_fillRect_width_var);
		var hr = Math.floor(DisplayBrowser_fillRect_height_var);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, wr, hr);
	
}

DisplayBrowser.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

DisplayBrowser.prototype._delete = function() {
	this._statemachine = null;
	this._SC_instance = null;
	this.bus.removeAllListeners();
}

DisplayBrowser.prototype._init = function() {
	this._SC_instance = new StateJS.Instance("SC_instance", this._statemachine);
	this.ready = true;
}

DisplayBrowser.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SC_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

DisplayBrowser.prototype.receivecreate_Ondisplay = function(val40) {
	this._receive({_port:"display", _msg:"create_", val40:val40});
}

DisplayBrowser.prototype.receivecreatexsizeysizeval10Ondisplay = function(xsize, val10, val41, ysize) {
	this._receive({_port:"display", _msg:"createxsizeysizeval10", xsize:xsize, val10:val10, val41:val41, ysize:ysize});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(val30) {
	this._receive({_port:"display", _msg:"destroy_", val30:val30});
}

DisplayBrowser.prototype.receivedestroyval11Ondisplay = function(val11, val31) {
	this._receive({_port:"display", _msg:"destroyval11", val11:val11, val31:val31});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(val34) {
	this._receive({_port:"display", _msg:"update_", val34:val34});
}

DisplayBrowser.prototype.receiveupdateval12Ondisplay = function(val12, val35) {
	this._receive({_port:"display", _msg:"updateval12", val12:val12, val35:val35});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(val48) {
	this._receive({_port:"display", _msg:"clear_", val48:val48});
}

DisplayBrowser.prototype.receiveclearval3Ondisplay = function(val3, val49) {
	this._receive({_port:"display", _msg:"clearval3", val3:val3, val49:val49});
}

DisplayBrowser.prototype.receivesetColorbrval4Ondisplay = function(r, val4, val42, b) {
	this._receive({_port:"display", _msg:"setColorbrval4", r:r, val4:val4, val42:val42, b:b});
}

DisplayBrowser.prototype.receivesetColorgOndisplay = function(val43, g) {
	this._receive({_port:"display", _msg:"setColorg", val43:val43, g:g});
}

DisplayBrowser.prototype.receivesetBGColorbOndisplay = function(b, val28) {
	this._receive({_port:"display", _msg:"setBGColorb", b:b, val28:val28});
}

DisplayBrowser.prototype.receivesetBGColorval5rgOndisplay = function(g, r, val5, val29) {
	this._receive({_port:"display", _msg:"setBGColorval5rg", g:g, r:r, val5:val5, val29:val29});
}

DisplayBrowser.prototype.receivedrawRectheightOndisplay = function(height, val44) {
	this._receive({_port:"display", _msg:"drawRectheight", height:height, val44:val44});
}

DisplayBrowser.prototype.receivedrawRectyval6xwidthOndisplay = function(x, y, val6, width, val45) {
	this._receive({_port:"display", _msg:"drawRectyval6xwidth", x:x, y:y, val6:val6, width:width, val45:val45});
}

DisplayBrowser.prototype.receivefillRectheightxval7Ondisplay = function(height, val46, val7, x) {
	this._receive({_port:"display", _msg:"fillRectheightxval7", height:height, val46:val46, val7:val7, x:x});
}

DisplayBrowser.prototype.receivefillRectywidthOndisplay = function(y, val47, width) {
	this._receive({_port:"display", _msg:"fillRectywidth", y:y, val47:val47, width:width});
}

DisplayBrowser.prototype.receivedrawIntegerxOndisplay = function(val36, x) {
	this._receive({_port:"display", _msg:"drawIntegerx", val36:val36, x:x});
}

DisplayBrowser.prototype.receivedrawIntegervdigitsscaleval8yOndisplay = function(val37, v, scale, val8, digits, y) {
	this._receive({_port:"display", _msg:"drawIntegervdigitsscaleval8y", val37:val37, v:v, scale:scale, val8:val8, digits:digits, y:y});
}

DisplayBrowser.prototype.receivedrawThingMLval9Ondisplay = function(val9, val32) {
	this._receive({_port:"display", _msg:"drawThingMLval9", val9:val9, val32:val32});
}

DisplayBrowser.prototype.receivedrawThingMLxyOndisplay = function(val33, x, y) {
	this._receive({_port:"display", _msg:"drawThingMLxy", val33:val33, x:x, y:y});
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_create__var = function(Display_SC_Wait_received_display_create__var) {
	this.Display_SC_Wait_received_display_create__var = Display_SC_Wait_received_display_create__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updateval12_var = function(Display_SC_Running_received_display_updateval12_var) {
	this.Display_SC_Running_received_display_updateval12_var = Display_SC_Running_received_display_updateval12_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectheight_var = function(Display_SC_Running_received_display_drawRectheight_var) {
	this.Display_SC_Running_received_display_drawRectheight_var = Display_SC_Running_received_display_drawRectheight_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorval5rg_var = function(Display_SC_Running_received_display_setBGColorval5rg_var) {
	this.Display_SC_Running_received_display_setBGColorval5rg_var = Display_SC_Running_received_display_setBGColorval5rg_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerx_var = function(Display_SC_Running_received_display_drawIntegerx_var) {
	this.Display_SC_Running_received_display_drawIntegerx_var = Display_SC_Running_received_display_drawIntegerx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLxy_var = function(Display_SC_Running_received_display_drawThingMLxy_var) {
	this.Display_SC_Running_received_display_drawThingMLxy_var = Display_SC_Running_received_display_drawThingMLxy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_val9_var = function(Display_SC_Running_display_drawThingML_val9_var) {
	this.Display_SC_Running_display_drawThingML_val9_var = Display_SC_Running_display_drawThingML_val9_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyval11_var = function(Display_SC_Running_received_display_destroyval11_var) {
	this.Display_SC_Running_received_display_destroyval11_var = Display_SC_Running_received_display_destroyval11_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_val8_var = function(Display_SC_Running_display_drawInteger_val8_var) {
	this.Display_SC_Running_display_drawInteger_val8_var = Display_SC_Running_display_drawInteger_val8_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_val5_var = function(Display_SC_Running_display_setBGColor_val5_var) {
	this.Display_SC_Running_display_setBGColor_val5_var = Display_SC_Running_display_setBGColor_val5_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_val11_var = function(Display_SC_Running_display_destroy_val11_var) {
	this.Display_SC_Running_display_destroy_val11_var = Display_SC_Running_display_destroy_val11_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorg_var = function(Display_SC_Running_received_display_setColorg_var) {
	this.Display_SC_Running_received_display_setColorg_var = Display_SC_Running_received_display_setColorg_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorb_var = function(Display_SC_Running_received_display_setBGColorb_var) {
	this.Display_SC_Running_received_display_setBGColorb_var = Display_SC_Running_received_display_setBGColorb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_val3_var = function(Display_SC_Running_display_clear_val3_var) {
	this.Display_SC_Running_display_clear_val3_var = Display_SC_Running_display_clear_val3_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectyval6xwidth_var = function(Display_SC_Running_received_display_drawRectyval6xwidth_var) {
	this.Display_SC_Running_received_display_drawRectyval6xwidth_var = Display_SC_Running_received_display_drawRectyval6xwidth_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectywidth_var = function(Display_SC_Running_received_display_fillRectywidth_var) {
	this.Display_SC_Running_received_display_fillRectywidth_var = Display_SC_Running_received_display_fillRectywidth_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_val12_var = function(Display_SC_Running_display_update_val12_var) {
	this.Display_SC_Running_display_update_val12_var = Display_SC_Running_display_update_val12_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectheightxval7_var = function(Display_SC_Running_received_display_fillRectheightxval7_var) {
	this.Display_SC_Running_received_display_fillRectheightxval7_var = Display_SC_Running_received_display_fillRectheightxval7_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_val6_var = function(Display_SC_Running_display_drawRect_val6_var) {
	this.Display_SC_Running_display_drawRect_val6_var = Display_SC_Running_display_drawRect_val6_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsizeysizeval10_var = function(Display_SC_Wait_received_display_createxsizeysizeval10_var) {
	this.Display_SC_Wait_received_display_createxsizeysizeval10_var = Display_SC_Wait_received_display_createxsizeysizeval10_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegervdigitsscaleval8y_var = function(Display_SC_Running_received_display_drawIntegervdigitsscaleval8y_var) {
	this.Display_SC_Running_received_display_drawIntegervdigitsscaleval8y_var = Display_SC_Running_received_display_drawIntegervdigitsscaleval8y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearval3_var = function(Display_SC_Running_received_display_clearval3_var) {
	this.Display_SC_Running_received_display_clearval3_var = Display_SC_Running_received_display_clearval3_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_val10_var = function(Display_SC_Wait_display_create_val10_var) {
	this.Display_SC_Wait_display_create_val10_var = Display_SC_Wait_display_create_val10_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorbrval4_var = function(Display_SC_Running_received_display_setColorbrval4_var) {
	this.Display_SC_Running_received_display_setColorbrval4_var = Display_SC_Running_received_display_setColorbrval4_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_val4_var = function(Display_SC_Running_display_setColor_val4_var) {
	this.Display_SC_Running_display_setColor_val4_var = Display_SC_Running_display_setColor_val4_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLval9_var = function(Display_SC_Running_received_display_drawThingMLval9_var) {
	this.Display_SC_Running_received_display_drawThingMLval9_var = Display_SC_Running_received_display_drawThingMLval9_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_val7_var = function(Display_SC_Running_display_fillRect_val7_var) {
	this.Display_SC_Running_display_fillRect_val7_var = Display_SC_Running_display_fillRect_val7_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\treceived_display_create_ = ' + this.Display_SC_Wait_received_display_create__var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\treceived_display_updateval12 = ' + this.Display_SC_Running_received_display_updateval12_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\treceived_display_drawRectheight = ' + this.Display_SC_Running_received_display_drawRectheight_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\treceived_display_setBGColorval5rg = ' + this.Display_SC_Running_received_display_setBGColorval5rg_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\treceived_display_drawIntegerx = ' + this.Display_SC_Running_received_display_drawIntegerx_var;
	result += '\n\treceived_display_drawThingMLxy = ' + this.Display_SC_Running_received_display_drawThingMLxy_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tdisplay_drawThingML_val9 = ' + this.Display_SC_Running_display_drawThingML_val9_var;
	result += '\n\treceived_display_destroyval11 = ' + this.Display_SC_Running_received_display_destroyval11_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_drawInteger_val8 = ' + this.Display_SC_Running_display_drawInteger_val8_var;
	result += '\n\tdisplay_setBGColor_val5 = ' + this.Display_SC_Running_display_setBGColor_val5_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tdisplay_destroy_val11 = ' + this.Display_SC_Running_display_destroy_val11_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\treceived_display_setColorg = ' + this.Display_SC_Running_received_display_setColorg_var;
	result += '\n\treceived_display_setBGColorb = ' + this.Display_SC_Running_received_display_setBGColorb_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tdisplay_clear_val3 = ' + this.Display_SC_Running_display_clear_val3_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_drawRectyval6xwidth = ' + this.Display_SC_Running_received_display_drawRectyval6xwidth_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\treceived_display_fillRectywidth = ' + this.Display_SC_Running_received_display_fillRectywidth_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_update_val12 = ' + this.Display_SC_Running_display_update_val12_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\treceived_display_fillRectheightxval7 = ' + this.Display_SC_Running_received_display_fillRectheightxval7_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_drawRect_val6 = ' + this.Display_SC_Running_display_drawRect_val6_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\treceived_display_createxsizeysizeval10 = ' + this.Display_SC_Wait_received_display_createxsizeysizeval10_var;
	result += '\n\treceived_display_drawIntegervdigitsscaleval8y = ' + this.Display_SC_Running_received_display_drawIntegervdigitsscaleval8y_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\treceived_display_clearval3 = ' + this.Display_SC_Running_received_display_clearval3_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_create_val10 = ' + this.Display_SC_Wait_display_create_val10_var;
	result += '\n\treceived_display_setColorbrval4 = ' + this.Display_SC_Running_received_display_setColorbrval4_var;
	result += '\n\tdisplay_setColor_val4 = ' + this.Display_SC_Running_display_setColor_val4_var;
	result += '\n\treceived_display_drawThingMLval9 = ' + this.Display_SC_Running_received_display_drawThingMLval9_var;
	result += '\n\tdisplay_fillRect_val7 = ' + this.Display_SC_Running_display_fillRect_val7_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '';
	return result;
}

