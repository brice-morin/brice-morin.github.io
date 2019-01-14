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
		setTimeout(() => this.bus.emit('display?displayReadyval145', 0x95, 0xDB), 0);
		setTimeout(() => this.bus.emit('display?displayReady_', 0xEF), 0);
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyval143_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyval143_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyval143_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((fillRectval139heightxwidth) => {
		return fillRectval139heightxwidth._port === 'display' && fillRectval139heightxwidth._msg === 'fillRectval139heightxwidth';
	}).effect((fillRectval139heightxwidth) => {
		this.Display_SC_Running_received_display_fillRectval139heightxwidth_var = true;
		this.Display_SC_Running_display_fillRect_val139_var = fillRectval139heightxwidth.val139;
		this.Display_SC_Running_display_fillRect_height_var = fillRectval139heightxwidth.height;
		this.Display_SC_Running_display_fillRect_x_var = fillRectval139heightxwidth.x;
		this.Display_SC_Running_display_fillRect_width_var = fillRectval139heightxwidth.width;
		if(this.Display_SC_Running_received_display_fillRecty_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectval139heightxwidth_var = false;
		this.Display_SC_Running_received_display_fillRecty_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorr) => {
		return setColorr._port === 'display' && setColorr._msg === 'setColorr';
	}).effect((setColorr) => {
		this.Display_SC_Running_received_display_setColorr_var = true;
		this.Display_SC_Running_display_setColor_r_var = setColorr.r;
		if(this.Display_SC_Running_received_display_setColorbgval136_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorr_var = false;
		this.Display_SC_Running_received_display_setColorbgval136_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updateval144_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updateval144_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearval135_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearval135_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorb) => {
		return setBGColorb._port === 'display' && setBGColorb._msg === 'setBGColorb';
	}).effect((setBGColorb) => {
		this.Display_SC_Running_received_display_setBGColorb_var = true;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorb.b;
		if(this.Display_SC_Running_received_display_setBGColorval137rg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		this.Display_SC_Running_received_display_setBGColorval137rg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawInteger_) => {
		return drawInteger_._port === 'display' && drawInteger_._msg === 'drawInteger_';
	}).effect((drawInteger_) => {
		this.Display_SC_Running_received_display_drawInteger__var = true;
		if(this.Display_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawInteger__var = false;
		this.Display_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectval138heightxwidth) => {
		return drawRectval138heightxwidth._port === 'display' && drawRectval138heightxwidth._msg === 'drawRectval138heightxwidth';
	}).effect((drawRectval138heightxwidth) => {
		this.Display_SC_Running_received_display_drawRectval138heightxwidth_var = true;
		this.Display_SC_Running_display_drawRect_val138_var = drawRectval138heightxwidth.val138;
		this.Display_SC_Running_display_drawRect_height_var = drawRectval138heightxwidth.height;
		this.Display_SC_Running_display_drawRect_x_var = drawRectval138heightxwidth.x;
		this.Display_SC_Running_display_drawRect_width_var = drawRectval138heightxwidth.width;
		if(this.Display_SC_Running_received_display_drawRecty_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectval138heightxwidth_var = false;
		this.Display_SC_Running_received_display_drawRecty_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorval137rg) => {
		return setBGColorval137rg._port === 'display' && setBGColorval137rg._msg === 'setBGColorval137rg';
	}).effect((setBGColorval137rg) => {
		this.Display_SC_Running_received_display_setBGColorval137rg_var = true;
		this.Display_SC_Running_display_setBGColor_val137_var = setBGColorval137rg.val137;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorval137rg.r;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorval137rg.g;
		if(this.Display_SC_Running_received_display_setBGColorb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorval137rg_var = false;
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearval135) => {
		return clearval135._port === 'display' && clearval135._msg === 'clearval135';
	}).effect((clearval135) => {
		this.Display_SC_Running_received_display_clearval135_var = true;
		this.Display_SC_Running_display_clear_val135_var = clearval135.val135;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearval135_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRecty) => {
		return fillRecty._port === 'display' && fillRecty._msg === 'fillRecty';
	}).effect((fillRecty) => {
		this.Display_SC_Running_received_display_fillRecty_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRecty.y;
		if(this.Display_SC_Running_received_display_fillRectval139heightxwidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRecty_var = false;
		this.Display_SC_Running_received_display_fillRectval139heightxwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerval140xyscaledigitsv) => {
		return drawIntegerval140xyscaledigitsv._port === 'display' && drawIntegerval140xyscaledigitsv._msg === 'drawIntegerval140xyscaledigitsv';
	}).effect((drawIntegerval140xyscaledigitsv) => {
		this.Display_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var = true;
		this.Display_SC_Running_display_drawInteger_val140_var = drawIntegerval140xyscaledigitsv.val140;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerval140xyscaledigitsv.x;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerval140xyscaledigitsv.y;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerval140xyscaledigitsv.scale;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerval140xyscaledigitsv.digits;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerval140xyscaledigitsv.v;
		if(this.Display_SC_Running_received_display_drawInteger__var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var = false;
		this.Display_SC_Running_received_display_drawInteger__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLyx) => {
		return drawThingMLyx._port === 'display' && drawThingMLyx._msg === 'drawThingMLyx';
	}).effect((drawThingMLyx) => {
		this.Display_SC_Running_received_display_drawThingMLyx_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLyx.y;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLyx.x;
		if(this.Display_SC_Running_received_display_drawThingMLval141_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLyx_var = false;
		this.Display_SC_Running_received_display_drawThingMLval141_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeval142) => {
		return createxsizeval142._port === 'display' && createxsizeval142._msg === 'createxsizeval142' && (this.Display_SC_Wait_received_display_createysize_var);
	}).effect((createxsizeval142) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeval142.xsize;
		this.Display_SC_Wait_display_create_val142_var = createxsizeval142.val142;
		this.initDisplay(createxsizeval142.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createxsizeval142_var = false;
		this.Display_SC_Wait_received_display_createysize_var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeval142) => {
		return createxsizeval142._port === 'display' && createxsizeval142._msg === 'createxsizeval142' && (!(this.Display_SC_Wait_received_display_createysize_var));
	}).effect((createxsizeval142) => {
		this.Display_SC_Wait_received_display_createxsizeval142_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeval142.xsize;
		this.Display_SC_Wait_display_create_val142_var = createxsizeval142.val142;
	});
	Display_SC_Running.to(null).when((drawRecty) => {
		return drawRecty._port === 'display' && drawRecty._msg === 'drawRecty';
	}).effect((drawRecty) => {
		this.Display_SC_Running_received_display_drawRecty_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRecty.y;
		if(this.Display_SC_Running_received_display_drawRectval138heightxwidth_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRecty_var = false;
		this.Display_SC_Running_received_display_drawRectval138heightxwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updateval144) => {
		return updateval144._port === 'display' && updateval144._msg === 'updateval144';
	}).effect((updateval144) => {
		this.Display_SC_Running_received_display_updateval144_var = true;
		this.Display_SC_Running_display_update_val144_var = updateval144.val144;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updateval144_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLval141) => {
		return drawThingMLval141._port === 'display' && drawThingMLval141._msg === 'drawThingMLval141';
	}).effect((drawThingMLval141) => {
		this.Display_SC_Running_received_display_drawThingMLval141_var = true;
		this.Display_SC_Running_display_drawThingML_val141_var = drawThingMLval141.val141;
		if(this.Display_SC_Running_received_display_drawThingMLyx_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLval141_var = false;
		this.Display_SC_Running_received_display_drawThingMLyx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorbgval136) => {
		return setColorbgval136._port === 'display' && setColorbgval136._msg === 'setColorbgval136';
	}).effect((setColorbgval136) => {
		this.Display_SC_Running_received_display_setColorbgval136_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbgval136.b;
		this.Display_SC_Running_display_setColor_g_var = setColorbgval136.g;
		this.Display_SC_Running_display_setColor_val136_var = setColorbgval136.val136;
		if(this.Display_SC_Running_received_display_setColorr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbgval136_var = false;
		this.Display_SC_Running_received_display_setColorr_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysize) => {
		return createysize._port === 'display' && createysize._msg === 'createysize' && (this.Display_SC_Wait_received_display_createxsizeval142_var);
	}).effect((createysize) => {
		this.Display_SC_Wait_display_create_ysize_var = createysize.ysize;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createysize.ysize);
		this.Display_SC_Wait_received_display_createysize_var = false;
		this.Display_SC_Wait_received_display_createxsizeval142_var = false;
	});
	Display_SC_Wait.to(null).when((createysize) => {
		return createysize._port === 'display' && createysize._msg === 'createysize' && (!(this.Display_SC_Wait_received_display_createxsizeval142_var));
	}).effect((createysize) => {
		this.Display_SC_Wait_received_display_createysize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysize.ysize;
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyval143) => {
		return destroyval143._port === 'display' && destroyval143._msg === 'destroyval143' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyval143) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyval143_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyval143) => {
		return destroyval143._port === 'display' && destroyval143._msg === 'destroyval143' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyval143) => {
		this.Display_SC_Running_received_display_destroyval143_var = true;
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
		
		
		setTimeout(() => this.bus.emit('vctrl?positionyx', 0, posX, 0x87), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval148', 0x20, 0x02), 0);
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x1F), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydyval147dx', 0, 0xBA, 0x74,  -8), 0);
			
				} else if (e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x0D), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydyval147dx', 0, 0x81, 0xD2, 8), 0);
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydyval147dx', 0, 0x7D, 0x23, 0), 0);
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x24), 0);
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		setTimeout(() => this.bus.emit('vctrl?positionyx', 0, x, 0x48), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval148', 0xAB, 0x3F), 0);
		
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

DisplayBrowser.prototype.receivecreateysizeOndisplay = function(val180, ysize) {
	this._receive({_port:"display", _msg:"createysize", val180:val180, ysize:ysize});
}

DisplayBrowser.prototype.receivecreatexsizeval142Ondisplay = function(xsize, val181, val142) {
	this._receive({_port:"display", _msg:"createxsizeval142", xsize:xsize, val181:val181, val142:val142});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(val170) {
	this._receive({_port:"display", _msg:"destroy_", val170:val170});
}

DisplayBrowser.prototype.receivedestroyval143Ondisplay = function(val171, val143) {
	this._receive({_port:"display", _msg:"destroyval143", val171:val171, val143:val143});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(val160) {
	this._receive({_port:"display", _msg:"update_", val160:val160});
}

DisplayBrowser.prototype.receiveupdateval144Ondisplay = function(val144, val161) {
	this._receive({_port:"display", _msg:"updateval144", val144:val144, val161:val161});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(val164) {
	this._receive({_port:"display", _msg:"clear_", val164:val164});
}

DisplayBrowser.prototype.receiveclearval135Ondisplay = function(val165, val135) {
	this._receive({_port:"display", _msg:"clearval135", val165:val165, val135:val135});
}

DisplayBrowser.prototype.receivesetColorbgval136Ondisplay = function(val176, b, val136, g) {
	this._receive({_port:"display", _msg:"setColorbgval136", val176:val176, b:b, val136:val136, g:g});
}

DisplayBrowser.prototype.receivesetColorrOndisplay = function(r, val177) {
	this._receive({_port:"display", _msg:"setColorr", r:r, val177:val177});
}

DisplayBrowser.prototype.receivesetBGColorval137rgOndisplay = function(val137, g, val168, r) {
	this._receive({_port:"display", _msg:"setBGColorval137rg", val137:val137, g:g, val168:val168, r:r});
}

DisplayBrowser.prototype.receivesetBGColorbOndisplay = function(val169, b) {
	this._receive({_port:"display", _msg:"setBGColorb", val169:val169, b:b});
}

DisplayBrowser.prototype.receivedrawRectyOndisplay = function(y, val174) {
	this._receive({_port:"display", _msg:"drawRecty", y:y, val174:val174});
}

DisplayBrowser.prototype.receivedrawRectval138heightxwidthOndisplay = function(val138, height, val175, x, width) {
	this._receive({_port:"display", _msg:"drawRectval138heightxwidth", val138:val138, height:height, val175:val175, x:x, width:width});
}

DisplayBrowser.prototype.receivefillRectval139heightxwidthOndisplay = function(height, val139, width, val158, x) {
	this._receive({_port:"display", _msg:"fillRectval139heightxwidth", height:height, val139:val139, width:width, val158:val158, x:x});
}

DisplayBrowser.prototype.receivefillRectyOndisplay = function(val159, y) {
	this._receive({_port:"display", _msg:"fillRecty", val159:val159, y:y});
}

DisplayBrowser.prototype.receivedrawInteger_Ondisplay = function(val178) {
	this._receive({_port:"display", _msg:"drawInteger_", val178:val178});
}

DisplayBrowser.prototype.receivedrawIntegerval140xyscaledigitsvOndisplay = function(val140, val179, digits, v, y, scale, x) {
	this._receive({_port:"display", _msg:"drawIntegerval140xyscaledigitsv", val140:val140, val179:val179, digits:digits, v:v, y:y, scale:scale, x:x});
}

DisplayBrowser.prototype.receivedrawThingMLval141Ondisplay = function(val141, val162) {
	this._receive({_port:"display", _msg:"drawThingMLval141", val141:val141, val162:val162});
}

DisplayBrowser.prototype.receivedrawThingMLyxOndisplay = function(val163, y, x) {
	this._receive({_port:"display", _msg:"drawThingMLyx", val163:val163, y:y, x:x});
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectval139heightxwidth_var = function(Display_SC_Running_received_display_fillRectval139heightxwidth_var) {
	this.Display_SC_Running_received_display_fillRectval139heightxwidth_var = Display_SC_Running_received_display_fillRectval139heightxwidth_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_val140_var = function(Display_SC_Running_display_drawInteger_val140_var) {
	this.Display_SC_Running_display_drawInteger_val140_var = Display_SC_Running_display_drawInteger_val140_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorval137rg_var = function(Display_SC_Running_received_display_setBGColorval137rg_var) {
	this.Display_SC_Running_received_display_setBGColorval137rg_var = Display_SC_Running_received_display_setBGColorval137rg_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearval135_var = function(Display_SC_Running_received_display_clearval135_var) {
	this.Display_SC_Running_received_display_clearval135_var = Display_SC_Running_received_display_clearval135_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRecty_var = function(Display_SC_Running_received_display_drawRecty_var) {
	this.Display_SC_Running_received_display_drawRecty_var = Display_SC_Running_received_display_drawRecty_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawInteger__var = function(Display_SC_Running_received_display_drawInteger__var) {
	this.Display_SC_Running_received_display_drawInteger__var = Display_SC_Running_received_display_drawInteger__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorb_var = function(Display_SC_Running_received_display_setBGColorb_var) {
	this.Display_SC_Running_received_display_setBGColorb_var = Display_SC_Running_received_display_setBGColorb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var = function(Display_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var) {
	this.Display_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var = Display_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_val143_var = function(Display_SC_Running_display_destroy_val143_var) {
	this.Display_SC_Running_display_destroy_val143_var = Display_SC_Running_display_destroy_val143_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_val138_var = function(Display_SC_Running_display_drawRect_val138_var) {
	this.Display_SC_Running_display_drawRect_val138_var = Display_SC_Running_display_drawRect_val138_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRecty_var = function(Display_SC_Running_received_display_fillRecty_var) {
	this.Display_SC_Running_received_display_fillRecty_var = Display_SC_Running_received_display_fillRecty_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_val142_var = function(Display_SC_Wait_display_create_val142_var) {
	this.Display_SC_Wait_display_create_val142_var = Display_SC_Wait_display_create_val142_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_val135_var = function(Display_SC_Running_display_clear_val135_var) {
	this.Display_SC_Running_display_clear_val135_var = Display_SC_Running_display_clear_val135_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updateval144_var = function(Display_SC_Running_received_display_updateval144_var) {
	this.Display_SC_Running_received_display_updateval144_var = Display_SC_Running_received_display_updateval144_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectval138heightxwidth_var = function(Display_SC_Running_received_display_drawRectval138heightxwidth_var) {
	this.Display_SC_Running_received_display_drawRectval138heightxwidth_var = Display_SC_Running_received_display_drawRectval138heightxwidth_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_val136_var = function(Display_SC_Running_display_setColor_val136_var) {
	this.Display_SC_Running_display_setColor_val136_var = Display_SC_Running_display_setColor_val136_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsizeval142_var = function(Display_SC_Wait_received_display_createxsizeval142_var) {
	this.Display_SC_Wait_received_display_createxsizeval142_var = Display_SC_Wait_received_display_createxsizeval142_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_val141_var = function(Display_SC_Running_display_drawThingML_val141_var) {
	this.Display_SC_Running_display_drawThingML_val141_var = Display_SC_Running_display_drawThingML_val141_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_val144_var = function(Display_SC_Running_display_update_val144_var) {
	this.Display_SC_Running_display_update_val144_var = Display_SC_Running_display_update_val144_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyval143_var = function(Display_SC_Running_received_display_destroyval143_var) {
	this.Display_SC_Running_received_display_destroyval143_var = Display_SC_Running_received_display_destroyval143_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createysize_var = function(Display_SC_Wait_received_display_createysize_var) {
	this.Display_SC_Wait_received_display_createysize_var = Display_SC_Wait_received_display_createysize_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLyx_var = function(Display_SC_Running_received_display_drawThingMLyx_var) {
	this.Display_SC_Running_received_display_drawThingMLyx_var = Display_SC_Running_received_display_drawThingMLyx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorr_var = function(Display_SC_Running_received_display_setColorr_var) {
	this.Display_SC_Running_received_display_setColorr_var = Display_SC_Running_received_display_setColorr_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorbgval136_var = function(Display_SC_Running_received_display_setColorbgval136_var) {
	this.Display_SC_Running_received_display_setColorbgval136_var = Display_SC_Running_received_display_setColorbgval136_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_val137_var = function(Display_SC_Running_display_setBGColor_val137_var) {
	this.Display_SC_Running_display_setBGColor_val137_var = Display_SC_Running_display_setBGColor_val137_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_val139_var = function(Display_SC_Running_display_fillRect_val139_var) {
	this.Display_SC_Running_display_fillRect_val139_var = Display_SC_Running_display_fillRect_val139_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLval141_var = function(Display_SC_Running_received_display_drawThingMLval141_var) {
	this.Display_SC_Running_received_display_drawThingMLval141_var = Display_SC_Running_received_display_drawThingMLval141_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\treceived_display_fillRectval139heightxwidth = ' + this.Display_SC_Running_received_display_fillRectval139heightxwidth_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tdisplay_drawInteger_val140 = ' + this.Display_SC_Running_display_drawInteger_val140_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_setBGColorval137rg = ' + this.Display_SC_Running_received_display_setBGColorval137rg_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\treceived_display_clearval135 = ' + this.Display_SC_Running_received_display_clearval135_var;
	result += '\n\treceived_display_drawRecty = ' + this.Display_SC_Running_received_display_drawRecty_var;
	result += '\n\treceived_display_drawInteger_ = ' + this.Display_SC_Running_received_display_drawInteger__var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\treceived_display_setBGColorb = ' + this.Display_SC_Running_received_display_setBGColorb_var;
	result += '\n\treceived_display_drawIntegerval140xyscaledigitsv = ' + this.Display_SC_Running_received_display_drawIntegerval140xyscaledigitsv_var;
	result += '\n\tdisplay_destroy_val143 = ' + this.Display_SC_Running_display_destroy_val143_var;
	result += '\n\tdisplay_drawRect_val138 = ' + this.Display_SC_Running_display_drawRect_val138_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\treceived_display_fillRecty = ' + this.Display_SC_Running_received_display_fillRecty_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_create_val142 = ' + this.Display_SC_Wait_display_create_val142_var;
	result += '\n\tdisplay_clear_val135 = ' + this.Display_SC_Running_display_clear_val135_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\treceived_display_updateval144 = ' + this.Display_SC_Running_received_display_updateval144_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\treceived_display_drawRectval138heightxwidth = ' + this.Display_SC_Running_received_display_drawRectval138heightxwidth_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_setColor_val136 = ' + this.Display_SC_Running_display_setColor_val136_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\treceived_display_createxsizeval142 = ' + this.Display_SC_Wait_received_display_createxsizeval142_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_drawThingML_val141 = ' + this.Display_SC_Running_display_drawThingML_val141_var;
	result += '\n\tdisplay_update_val144 = ' + this.Display_SC_Running_display_update_val144_var;
	result += '\n\treceived_display_destroyval143 = ' + this.Display_SC_Running_received_display_destroyval143_var;
	result += '\n\treceived_display_createysize = ' + this.Display_SC_Wait_received_display_createysize_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\treceived_display_drawThingMLyx = ' + this.Display_SC_Running_received_display_drawThingMLyx_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\treceived_display_setColorr = ' + this.Display_SC_Running_received_display_setColorr_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\treceived_display_setColorbgval136 = ' + this.Display_SC_Running_received_display_setColorbgval136_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_setBGColor_val137 = ' + this.Display_SC_Running_display_setBGColor_val137_var;
	result += '\n\tdisplay_fillRect_val139 = ' + this.Display_SC_Running_display_fillRect_val139_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\treceived_display_drawThingMLval141 = ' + this.Display_SC_Running_received_display_drawThingMLval141_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '';
	return result;
}

