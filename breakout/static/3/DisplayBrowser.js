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
		setTimeout(() => this.bus.emit('display?displayReady_', 0xDA), 0);
		setTimeout(() => this.bus.emit('display?displayReadyval211', 0x17, 0x35), 0);
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((setBGColorbrg) => {
		return setBGColorbrg._port === 'display' && setBGColorbrg._msg === 'setBGColorbrg';
	}).effect((setBGColorbrg) => {
		this.Display_SC_Running_received_display_setBGColorbrg_var = true;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorbrg.b;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorbrg.r;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorbrg.g;
		if(this.Display_SC_Running_received_display_setBGColorval203_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorbrg_var = false;
		this.Display_SC_Running_received_display_setBGColorval203_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingML_) => {
		return drawThingML_._port === 'display' && drawThingML_._msg === 'drawThingML_';
	}).effect((drawThingML_) => {
		this.Display_SC_Running_received_display_drawThingML__var = true;
		if(this.Display_SC_Running_received_display_drawThingMLval207yx_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingML__var = false;
		this.Display_SC_Running_received_display_drawThingMLval207yx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearval201) => {
		return clearval201._port === 'display' && clearval201._msg === 'clearval201';
	}).effect((clearval201) => {
		this.Display_SC_Running_received_display_clearval201_var = true;
		this.Display_SC_Running_display_clear_val201_var = clearval201.val201;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearval201_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createval208ysize) => {
		return createval208ysize._port === 'display' && createval208ysize._msg === 'createval208ysize' && (this.Display_SC_Wait_received_display_createxsize_var);
	}).effect((createval208ysize) => {
		this.Display_SC_Wait_display_create_val208_var = createval208ysize.val208;
		this.Display_SC_Wait_display_create_ysize_var = createval208ysize.ysize;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createval208ysize.ysize);
		this.Display_SC_Wait_received_display_createval208ysize_var = false;
		this.Display_SC_Wait_received_display_createxsize_var = false;
	});
	Display_SC_Wait.to(null).when((createval208ysize) => {
		return createval208ysize._port === 'display' && createval208ysize._msg === 'createval208ysize' && (!(this.Display_SC_Wait_received_display_createxsize_var));
	}).effect((createval208ysize) => {
		this.Display_SC_Wait_received_display_createval208ysize_var = true;
		this.Display_SC_Wait_display_create_val208_var = createval208ysize.val208;
		this.Display_SC_Wait_display_create_ysize_var = createval208ysize.ysize;
	});
	Display_SC_Running.to(null).when((drawRectwidthval204y) => {
		return drawRectwidthval204y._port === 'display' && drawRectwidthval204y._msg === 'drawRectwidthval204y';
	}).effect((drawRectwidthval204y) => {
		this.Display_SC_Running_received_display_drawRectwidthval204y_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthval204y.width;
		this.Display_SC_Running_display_drawRect_val204_var = drawRectwidthval204y.val204;
		this.Display_SC_Running_display_drawRect_y_var = drawRectwidthval204y.y;
		if(this.Display_SC_Running_received_display_drawRectheightx_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthval204y_var = false;
		this.Display_SC_Running_received_display_drawRectheightx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updateval210) => {
		return updateval210._port === 'display' && updateval210._msg === 'updateval210';
	}).effect((updateval210) => {
		this.Display_SC_Running_received_display_updateval210_var = true;
		this.Display_SC_Running_display_update_val210_var = updateval210.val210;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updateval210_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerval206xv) => {
		return drawIntegerval206xv._port === 'display' && drawIntegerval206xv._msg === 'drawIntegerval206xv';
	}).effect((drawIntegerval206xv) => {
		this.Display_SC_Running_received_display_drawIntegerval206xv_var = true;
		this.Display_SC_Running_display_drawInteger_val206_var = drawIntegerval206xv.val206;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerval206xv.x;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerval206xv.v;
		if(this.Display_SC_Running_received_display_drawIntegeryscaledigits_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerval206xv_var = false;
		this.Display_SC_Running_received_display_drawIntegeryscaledigits_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectywidthval205height) => {
		return fillRectywidthval205height._port === 'display' && fillRectywidthval205height._msg === 'fillRectywidthval205height';
	}).effect((fillRectywidthval205height) => {
		this.Display_SC_Running_received_display_fillRectywidthval205height_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectywidthval205height.y;
		this.Display_SC_Running_display_fillRect_width_var = fillRectywidthval205height.width;
		this.Display_SC_Running_display_fillRect_val205_var = fillRectywidthval205height.val205;
		this.Display_SC_Running_display_fillRect_height_var = fillRectywidthval205height.height;
		if(this.Display_SC_Running_received_display_fillRectx_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectywidthval205height_var = false;
		this.Display_SC_Running_received_display_fillRectx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updateval210_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updateval210_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorgr) => {
		return setColorgr._port === 'display' && setColorgr._msg === 'setColorgr';
	}).effect((setColorgr) => {
		this.Display_SC_Running_received_display_setColorgr_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgr.g;
		this.Display_SC_Running_display_setColor_r_var = setColorgr.r;
		if(this.Display_SC_Running_received_display_setColorbval202_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgr_var = false;
		this.Display_SC_Running_received_display_setColorbval202_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearval201_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearval201_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsize) => {
		return createxsize._port === 'display' && createxsize._msg === 'createxsize' && (this.Display_SC_Wait_received_display_createval208ysize_var);
	}).effect((createxsize) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsize.xsize;
		this.initDisplay(createxsize.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createxsize_var = false;
		this.Display_SC_Wait_received_display_createval208ysize_var = false;
	});
	Display_SC_Wait.to(null).when((createxsize) => {
		return createxsize._port === 'display' && createxsize._msg === 'createxsize' && (!(this.Display_SC_Wait_received_display_createval208ysize_var));
	}).effect((createxsize) => {
		this.Display_SC_Wait_received_display_createxsize_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsize.xsize;
	});
	Display_SC_Running.to(null).when((setBGColorval203) => {
		return setBGColorval203._port === 'display' && setBGColorval203._msg === 'setBGColorval203';
	}).effect((setBGColorval203) => {
		this.Display_SC_Running_received_display_setBGColorval203_var = true;
		this.Display_SC_Running_display_setBGColor_val203_var = setBGColorval203.val203;
		if(this.Display_SC_Running_received_display_setBGColorbrg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorval203_var = false;
		this.Display_SC_Running_received_display_setBGColorbrg_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyval209_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyval209_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyval209_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((setColorbval202) => {
		return setColorbval202._port === 'display' && setColorbval202._msg === 'setColorbval202';
	}).effect((setColorbval202) => {
		this.Display_SC_Running_received_display_setColorbval202_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbval202.b;
		this.Display_SC_Running_display_setColor_val202_var = setColorbval202.val202;
		if(this.Display_SC_Running_received_display_setColorgr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbval202_var = false;
		this.Display_SC_Running_received_display_setColorgr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectx) => {
		return fillRectx._port === 'display' && fillRectx._msg === 'fillRectx';
	}).effect((fillRectx) => {
		this.Display_SC_Running_received_display_fillRectx_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectx.x;
		if(this.Display_SC_Running_received_display_fillRectywidthval205height_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectx_var = false;
		this.Display_SC_Running_received_display_fillRectywidthval205height_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLval207yx) => {
		return drawThingMLval207yx._port === 'display' && drawThingMLval207yx._msg === 'drawThingMLval207yx';
	}).effect((drawThingMLval207yx) => {
		this.Display_SC_Running_received_display_drawThingMLval207yx_var = true;
		this.Display_SC_Running_display_drawThingML_val207_var = drawThingMLval207yx.val207;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLval207yx.y;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLval207yx.x;
		if(this.Display_SC_Running_received_display_drawThingML__var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLval207yx_var = false;
		this.Display_SC_Running_received_display_drawThingML__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegeryscaledigits) => {
		return drawIntegeryscaledigits._port === 'display' && drawIntegeryscaledigits._msg === 'drawIntegeryscaledigits';
	}).effect((drawIntegeryscaledigits) => {
		this.Display_SC_Running_received_display_drawIntegeryscaledigits_var = true;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegeryscaledigits.y;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegeryscaledigits.scale;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegeryscaledigits.digits;
		if(this.Display_SC_Running_received_display_drawIntegerval206xv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegeryscaledigits_var = false;
		this.Display_SC_Running_received_display_drawIntegerval206xv_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyval209) => {
		return destroyval209._port === 'display' && destroyval209._msg === 'destroyval209' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyval209) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyval209_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyval209) => {
		return destroyval209._port === 'display' && destroyval209._msg === 'destroyval209' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyval209) => {
		this.Display_SC_Running_received_display_destroyval209_var = true;
	});
	Display_SC_Running.to(null).when((drawRectheightx) => {
		return drawRectheightx._port === 'display' && drawRectheightx._msg === 'drawRectheightx';
	}).effect((drawRectheightx) => {
		this.Display_SC_Running_received_display_drawRectheightx_var = true;
		this.Display_SC_Running_display_drawRect_height_var = drawRectheightx.height;
		this.Display_SC_Running_display_drawRect_x_var = drawRectheightx.x;
		if(this.Display_SC_Running_received_display_drawRectwidthval204y_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectheightx_var = false;
		this.Display_SC_Running_received_display_drawRectwidthval204y_var = false;
		
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
		
		
		setTimeout(() => this.bus.emit('vctrl?position_', 0xEB), 0);
		setTimeout(() => this.bus.emit('vctrl?positionxyval214', 0, 0x3A, 0xAD, posX), 0);
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0, 0x28), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxval213', 0x9D,  -8, 0xE8), 0);
			
				} else if (e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0, 0x32), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxval213', 0xC7, 8, 0x9A), 0);
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0, 0x50), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxval213', 0xFE, 0, 0x20), 0);
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		setTimeout(() => this.bus.emit('vctrl?positionxyval214', 0, 0x33, 0xA5, x), 0);
		setTimeout(() => this.bus.emit('vctrl?position_', 0x15), 0);
		
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

DisplayBrowser.prototype.receivecreatexsizeOndisplay = function(val224, xsize) {
	this._receive({_port:"display", _msg:"createxsize", val224:val224, xsize:xsize});
}

DisplayBrowser.prototype.receivecreateval208ysizeOndisplay = function(ysize, val225, val208) {
	this._receive({_port:"display", _msg:"createval208ysize", ysize:ysize, val225:val225, val208:val208});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(val238) {
	this._receive({_port:"display", _msg:"destroy_", val238:val238});
}

DisplayBrowser.prototype.receivedestroyval209Ondisplay = function(val209, val239) {
	this._receive({_port:"display", _msg:"destroyval209", val209:val209, val239:val239});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(val232) {
	this._receive({_port:"display", _msg:"update_", val232:val232});
}

DisplayBrowser.prototype.receiveupdateval210Ondisplay = function(val233, val210) {
	this._receive({_port:"display", _msg:"updateval210", val233:val233, val210:val210});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(val228) {
	this._receive({_port:"display", _msg:"clear_", val228:val228});
}

DisplayBrowser.prototype.receiveclearval201Ondisplay = function(val201, val229) {
	this._receive({_port:"display", _msg:"clearval201", val201:val201, val229:val229});
}

DisplayBrowser.prototype.receivesetColorgrOndisplay = function(r, g, val242) {
	this._receive({_port:"display", _msg:"setColorgr", r:r, g:g, val242:val242});
}

DisplayBrowser.prototype.receivesetColorbval202Ondisplay = function(val243, b, val202) {
	this._receive({_port:"display", _msg:"setColorbval202", val243:val243, b:b, val202:val202});
}

DisplayBrowser.prototype.receivesetBGColorbrgOndisplay = function(val240, b, g, r) {
	this._receive({_port:"display", _msg:"setBGColorbrg", val240:val240, b:b, g:g, r:r});
}

DisplayBrowser.prototype.receivesetBGColorval203Ondisplay = function(val241, val203) {
	this._receive({_port:"display", _msg:"setBGColorval203", val241:val241, val203:val203});
}

DisplayBrowser.prototype.receivedrawRectheightxOndisplay = function(x, height, val246) {
	this._receive({_port:"display", _msg:"drawRectheightx", x:x, height:height, val246:val246});
}

DisplayBrowser.prototype.receivedrawRectwidthval204yOndisplay = function(val204, y, width, val247) {
	this._receive({_port:"display", _msg:"drawRectwidthval204y", val204:val204, y:y, width:width, val247:val247});
}

DisplayBrowser.prototype.receivefillRectywidthval205heightOndisplay = function(width, y, height, val226, val205) {
	this._receive({_port:"display", _msg:"fillRectywidthval205height", width:width, y:y, height:height, val226:val226, val205:val205});
}

DisplayBrowser.prototype.receivefillRectxOndisplay = function(x, val227) {
	this._receive({_port:"display", _msg:"fillRectx", x:x, val227:val227});
}

DisplayBrowser.prototype.receivedrawIntegerval206xvOndisplay = function(val206, x, v, val236) {
	this._receive({_port:"display", _msg:"drawIntegerval206xv", val206:val206, x:x, v:v, val236:val236});
}

DisplayBrowser.prototype.receivedrawIntegeryscaledigitsOndisplay = function(scale, y, val237, digits) {
	this._receive({_port:"display", _msg:"drawIntegeryscaledigits", scale:scale, y:y, val237:val237, digits:digits});
}

DisplayBrowser.prototype.receivedrawThingML_Ondisplay = function(val230) {
	this._receive({_port:"display", _msg:"drawThingML_", val230:val230});
}

DisplayBrowser.prototype.receivedrawThingMLval207yxOndisplay = function(val207, val231, x, y) {
	this._receive({_port:"display", _msg:"drawThingMLval207yx", val207:val207, val231:val231, x:x, y:y});
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerval206xv_var = function(Display_SC_Running_received_display_drawIntegerval206xv_var) {
	this.Display_SC_Running_received_display_drawIntegerval206xv_var = Display_SC_Running_received_display_drawIntegerval206xv_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updateval210_var = function(Display_SC_Running_received_display_updateval210_var) {
	this.Display_SC_Running_received_display_updateval210_var = Display_SC_Running_received_display_updateval210_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_val209_var = function(Display_SC_Running_display_destroy_val209_var) {
	this.Display_SC_Running_display_destroy_val209_var = Display_SC_Running_display_destroy_val209_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectx_var = function(Display_SC_Running_received_display_fillRectx_var) {
	this.Display_SC_Running_received_display_fillRectx_var = Display_SC_Running_received_display_fillRectx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_val207_var = function(Display_SC_Running_display_drawThingML_val207_var) {
	this.Display_SC_Running_display_drawThingML_val207_var = Display_SC_Running_display_drawThingML_val207_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorval203_var = function(Display_SC_Running_received_display_setBGColorval203_var) {
	this.Display_SC_Running_received_display_setBGColorval203_var = Display_SC_Running_received_display_setBGColorval203_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearval201_var = function(Display_SC_Running_received_display_clearval201_var) {
	this.Display_SC_Running_received_display_clearval201_var = Display_SC_Running_received_display_clearval201_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_val204_var = function(Display_SC_Running_display_drawRect_val204_var) {
	this.Display_SC_Running_display_drawRect_val204_var = Display_SC_Running_display_drawRect_val204_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_val205_var = function(Display_SC_Running_display_fillRect_val205_var) {
	this.Display_SC_Running_display_fillRect_val205_var = Display_SC_Running_display_fillRect_val205_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingML__var = function(Display_SC_Running_received_display_drawThingML__var) {
	this.Display_SC_Running_received_display_drawThingML__var = Display_SC_Running_received_display_drawThingML__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectheightx_var = function(Display_SC_Running_received_display_drawRectheightx_var) {
	this.Display_SC_Running_received_display_drawRectheightx_var = Display_SC_Running_received_display_drawRectheightx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectywidthval205height_var = function(Display_SC_Running_received_display_fillRectywidthval205height_var) {
	this.Display_SC_Running_received_display_fillRectywidthval205height_var = Display_SC_Running_received_display_fillRectywidthval205height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_val210_var = function(Display_SC_Running_display_update_val210_var) {
	this.Display_SC_Running_display_update_val210_var = Display_SC_Running_display_update_val210_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_val206_var = function(Display_SC_Running_display_drawInteger_val206_var) {
	this.Display_SC_Running_display_drawInteger_val206_var = Display_SC_Running_display_drawInteger_val206_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_val201_var = function(Display_SC_Running_display_clear_val201_var) {
	this.Display_SC_Running_display_clear_val201_var = Display_SC_Running_display_clear_val201_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_val202_var = function(Display_SC_Running_display_setColor_val202_var) {
	this.Display_SC_Running_display_setColor_val202_var = Display_SC_Running_display_setColor_val202_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectwidthval204y_var = function(Display_SC_Running_received_display_drawRectwidthval204y_var) {
	this.Display_SC_Running_received_display_drawRectwidthval204y_var = Display_SC_Running_received_display_drawRectwidthval204y_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegeryscaledigits_var = function(Display_SC_Running_received_display_drawIntegeryscaledigits_var) {
	this.Display_SC_Running_received_display_drawIntegeryscaledigits_var = Display_SC_Running_received_display_drawIntegeryscaledigits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createval208ysize_var = function(Display_SC_Wait_received_display_createval208ysize_var) {
	this.Display_SC_Wait_received_display_createval208ysize_var = Display_SC_Wait_received_display_createval208ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_val208_var = function(Display_SC_Wait_display_create_val208_var) {
	this.Display_SC_Wait_display_create_val208_var = Display_SC_Wait_display_create_val208_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLval207yx_var = function(Display_SC_Running_received_display_drawThingMLval207yx_var) {
	this.Display_SC_Running_received_display_drawThingMLval207yx_var = Display_SC_Running_received_display_drawThingMLval207yx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorbval202_var = function(Display_SC_Running_received_display_setColorbval202_var) {
	this.Display_SC_Running_received_display_setColorbval202_var = Display_SC_Running_received_display_setColorbval202_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_val203_var = function(Display_SC_Running_display_setBGColor_val203_var) {
	this.Display_SC_Running_display_setBGColor_val203_var = Display_SC_Running_display_setBGColor_val203_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorgr_var = function(Display_SC_Running_received_display_setColorgr_var) {
	this.Display_SC_Running_received_display_setColorgr_var = Display_SC_Running_received_display_setColorgr_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorbrg_var = function(Display_SC_Running_received_display_setBGColorbrg_var) {
	this.Display_SC_Running_received_display_setBGColorbrg_var = Display_SC_Running_received_display_setBGColorbrg_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyval209_var = function(Display_SC_Running_received_display_destroyval209_var) {
	this.Display_SC_Running_received_display_destroyval209_var = Display_SC_Running_received_display_destroyval209_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsize_var = function(Display_SC_Wait_received_display_createxsize_var) {
	this.Display_SC_Wait_received_display_createxsize_var = Display_SC_Wait_received_display_createxsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\treceived_display_drawIntegerval206xv = ' + this.Display_SC_Running_received_display_drawIntegerval206xv_var;
	result += '\n\treceived_display_updateval210 = ' + this.Display_SC_Running_received_display_updateval210_var;
	result += '\n\tdisplay_destroy_val209 = ' + this.Display_SC_Running_display_destroy_val209_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\treceived_display_fillRectx = ' + this.Display_SC_Running_received_display_fillRectx_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tdisplay_drawThingML_val207 = ' + this.Display_SC_Running_display_drawThingML_val207_var;
	result += '\n\treceived_display_setBGColorval203 = ' + this.Display_SC_Running_received_display_setBGColorval203_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\treceived_display_clearval201 = ' + this.Display_SC_Running_received_display_clearval201_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tdisplay_drawRect_val204 = ' + this.Display_SC_Running_display_drawRect_val204_var;
	result += '\n\tdisplay_fillRect_val205 = ' + this.Display_SC_Running_display_fillRect_val205_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\treceived_display_drawThingML_ = ' + this.Display_SC_Running_received_display_drawThingML__var;
	result += '\n\treceived_display_drawRectheightx = ' + this.Display_SC_Running_received_display_drawRectheightx_var;
	result += '\n\treceived_display_fillRectywidthval205height = ' + this.Display_SC_Running_received_display_fillRectywidthval205height_var;
	result += '\n\tdisplay_update_val210 = ' + this.Display_SC_Running_display_update_val210_var;
	result += '\n\tdisplay_drawInteger_val206 = ' + this.Display_SC_Running_display_drawInteger_val206_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tdisplay_clear_val201 = ' + this.Display_SC_Running_display_clear_val201_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_setColor_val202 = ' + this.Display_SC_Running_display_setColor_val202_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\treceived_display_drawRectwidthval204y = ' + this.Display_SC_Running_received_display_drawRectwidthval204y_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_drawIntegeryscaledigits = ' + this.Display_SC_Running_received_display_drawIntegeryscaledigits_var;
	result += '\n\treceived_display_createval208ysize = ' + this.Display_SC_Wait_received_display_createval208ysize_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tdisplay_create_val208 = ' + this.Display_SC_Wait_display_create_val208_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\treceived_display_drawThingMLval207yx = ' + this.Display_SC_Running_received_display_drawThingMLval207yx_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\treceived_display_setColorbval202 = ' + this.Display_SC_Running_received_display_setColorbval202_var;
	result += '\n\tdisplay_setBGColor_val203 = ' + this.Display_SC_Running_display_setBGColor_val203_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\treceived_display_setColorgr = ' + this.Display_SC_Running_received_display_setColorgr_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\treceived_display_setBGColorbrg = ' + this.Display_SC_Running_received_display_setBGColorbrg_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\treceived_display_destroyval209 = ' + this.Display_SC_Running_received_display_destroyval209_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\treceived_display_createxsize = ' + this.Display_SC_Wait_received_display_createxsize_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '';
	return result;
}

