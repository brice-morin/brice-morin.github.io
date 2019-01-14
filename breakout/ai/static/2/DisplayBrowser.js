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
		setTimeout(() => this.bus.emit('display?displayReadyval145', 0x81, 0x87), 0);
		setTimeout(() => this.bus.emit('display?displayReady_', 0x02), 0);
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((drawRecty) => {
		return drawRecty._port === 'display' && drawRecty._msg === 'drawRecty';
	}).effect((drawRecty) => {
		this.Display_SC_Running_received_display_drawRecty_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRecty.y;
		if(this.Display_SC_Running_received_display_drawRectwidthval138heightx_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRecty_var = false;
		this.Display_SC_Running_received_display_drawRectwidthval138heightx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLyval141x) => {
		return drawThingMLyval141x._port === 'display' && drawThingMLyval141x._msg === 'drawThingMLyval141x';
	}).effect((drawThingMLyval141x) => {
		this.Display_SC_Running_received_display_drawThingMLyval141x_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLyval141x.y;
		this.Display_SC_Running_display_drawThingML_val141_var = drawThingMLyval141x.val141;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLyval141x.x;
		if(this.Display_SC_Running_received_display_drawThingML__var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLyval141x_var = false;
		this.Display_SC_Running_received_display_drawThingML__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectxyval139) => {
		return fillRectxyval139._port === 'display' && fillRectxyval139._msg === 'fillRectxyval139';
	}).effect((fillRectxyval139) => {
		this.Display_SC_Running_received_display_fillRectxyval139_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxyval139.x;
		this.Display_SC_Running_display_fillRect_y_var = fillRectxyval139.y;
		this.Display_SC_Running_display_fillRect_val139_var = fillRectxyval139.val139;
		if(this.Display_SC_Running_received_display_fillRectheightwidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxyval139_var = false;
		this.Display_SC_Running_received_display_fillRectheightwidth_var = false;
		
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
	Display_SC_Running.to(null).when((drawThingML_) => {
		return drawThingML_._port === 'display' && drawThingML_._msg === 'drawThingML_';
	}).effect((drawThingML_) => {
		this.Display_SC_Running_received_display_drawThingML__var = true;
		if(this.Display_SC_Running_received_display_drawThingMLyval141x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingML__var = false;
		this.Display_SC_Running_received_display_drawThingMLyval141x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorgb) => {
		return setBGColorgb._port === 'display' && setBGColorgb._msg === 'setBGColorgb';
	}).effect((setBGColorgb) => {
		this.Display_SC_Running_received_display_setBGColorgb_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorgb.g;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorgb.b;
		if(this.Display_SC_Running_received_display_setBGColorrval137_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorgb_var = false;
		this.Display_SC_Running_received_display_setBGColorrval137_var = false;
		
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
	Display_SC_Running.to(null).when((drawIntegeryvval140) => {
		return drawIntegeryvval140._port === 'display' && drawIntegeryvval140._msg === 'drawIntegeryvval140';
	}).effect((drawIntegeryvval140) => {
		this.Display_SC_Running_received_display_drawIntegeryvval140_var = true;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegeryvval140.y;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegeryvval140.v;
		this.Display_SC_Running_display_drawInteger_val140_var = drawIntegeryvval140.val140;
		if(this.Display_SC_Running_received_display_drawIntegerdigitsxscale_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegeryvval140_var = false;
		this.Display_SC_Running_received_display_drawIntegerdigitsxscale_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorgbr) => {
		return setColorgbr._port === 'display' && setColorgbr._msg === 'setColorgbr';
	}).effect((setColorgbr) => {
		this.Display_SC_Running_received_display_setColorgbr_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgbr.g;
		this.Display_SC_Running_display_setColor_b_var = setColorgbr.b;
		this.Display_SC_Running_display_setColor_r_var = setColorgbr.r;
		if(this.Display_SC_Running_received_display_setColorval136_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgbr_var = false;
		this.Display_SC_Running_received_display_setColorval136_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrval137) => {
		return setBGColorrval137._port === 'display' && setBGColorrval137._msg === 'setBGColorrval137';
	}).effect((setBGColorrval137) => {
		this.Display_SC_Running_received_display_setBGColorrval137_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrval137.r;
		this.Display_SC_Running_display_setBGColor_val137_var = setBGColorrval137.val137;
		if(this.Display_SC_Running_received_display_setBGColorgb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrval137_var = false;
		this.Display_SC_Running_received_display_setBGColorgb_var = false;
		
		}
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
	Display_SC_Running.to(null).when((fillRectheightwidth) => {
		return fillRectheightwidth._port === 'display' && fillRectheightwidth._msg === 'fillRectheightwidth';
	}).effect((fillRectheightwidth) => {
		this.Display_SC_Running_received_display_fillRectheightwidth_var = true;
		this.Display_SC_Running_display_fillRect_height_var = fillRectheightwidth.height;
		this.Display_SC_Running_display_fillRect_width_var = fillRectheightwidth.width;
		if(this.Display_SC_Running_received_display_fillRectxyval139_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectheightwidth_var = false;
		this.Display_SC_Running_received_display_fillRectxyval139_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsize) => {
		return createxsize._port === 'display' && createxsize._msg === 'createxsize' && (this.Display_SC_Wait_received_display_createval142ysize_var);
	}).effect((createxsize) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsize.xsize;
		this.initDisplay(createxsize.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createxsize_var = false;
		this.Display_SC_Wait_received_display_createval142ysize_var = false;
	});
	Display_SC_Wait.to(null).when((createxsize) => {
		return createxsize._port === 'display' && createxsize._msg === 'createxsize' && (!(this.Display_SC_Wait_received_display_createval142ysize_var));
	}).effect((createxsize) => {
		this.Display_SC_Wait_received_display_createxsize_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsize.xsize;
	});
	Display_SC_Running.to(null).when((setColorval136) => {
		return setColorval136._port === 'display' && setColorval136._msg === 'setColorval136';
	}).effect((setColorval136) => {
		this.Display_SC_Running_received_display_setColorval136_var = true;
		this.Display_SC_Running_display_setColor_val136_var = setColorval136.val136;
		if(this.Display_SC_Running_received_display_setColorgbr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorval136_var = false;
		this.Display_SC_Running_received_display_setColorgbr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerdigitsxscale) => {
		return drawIntegerdigitsxscale._port === 'display' && drawIntegerdigitsxscale._msg === 'drawIntegerdigitsxscale';
	}).effect((drawIntegerdigitsxscale) => {
		this.Display_SC_Running_received_display_drawIntegerdigitsxscale_var = true;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerdigitsxscale.digits;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerdigitsxscale.x;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerdigitsxscale.scale;
		if(this.Display_SC_Running_received_display_drawIntegeryvval140_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerdigitsxscale_var = false;
		this.Display_SC_Running_received_display_drawIntegeryvval140_var = false;
		
		}
	});
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
	Display_SC_Wait.to(Display_SC_Running).when((createval142ysize) => {
		return createval142ysize._port === 'display' && createval142ysize._msg === 'createval142ysize' && (this.Display_SC_Wait_received_display_createxsize_var);
	}).effect((createval142ysize) => {
		this.Display_SC_Wait_display_create_val142_var = createval142ysize.val142;
		this.Display_SC_Wait_display_create_ysize_var = createval142ysize.ysize;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createval142ysize.ysize);
		this.Display_SC_Wait_received_display_createval142ysize_var = false;
		this.Display_SC_Wait_received_display_createxsize_var = false;
	});
	Display_SC_Wait.to(null).when((createval142ysize) => {
		return createval142ysize._port === 'display' && createval142ysize._msg === 'createval142ysize' && (!(this.Display_SC_Wait_received_display_createxsize_var));
	}).effect((createval142ysize) => {
		this.Display_SC_Wait_received_display_createval142ysize_var = true;
		this.Display_SC_Wait_display_create_val142_var = createval142ysize.val142;
		this.Display_SC_Wait_display_create_ysize_var = createval142ysize.ysize;
	});
	Display_SC_Running.to(null).when((drawRectwidthval138heightx) => {
		return drawRectwidthval138heightx._port === 'display' && drawRectwidthval138heightx._msg === 'drawRectwidthval138heightx';
	}).effect((drawRectwidthval138heightx) => {
		this.Display_SC_Running_received_display_drawRectwidthval138heightx_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthval138heightx.width;
		this.Display_SC_Running_display_drawRect_val138_var = drawRectwidthval138heightx.val138;
		this.Display_SC_Running_display_drawRect_height_var = drawRectwidthval138heightx.height;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthval138heightx.x;
		if(this.Display_SC_Running_received_display_drawRecty_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthval138heightx_var = false;
		this.Display_SC_Running_received_display_drawRecty_var = false;
		
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
		
		
		setTimeout(() => this.bus.emit('vctrl?positionx', 0xD3, posX), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval148y', 0, 0x2C, 0x4B), 0);
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy',  -8, 0, 0x52), 0);
			setTimeout(() => this.bus.emit('vctrl?velocityval147', 0xAA, 0xE6), 0);
			
				} else if (e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval147', 0x3E, 0x88), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 8, 0, 0x0C), 0);
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0, 0, 0x2D), 0);
			setTimeout(() => this.bus.emit('vctrl?velocityval147', 0xE5, 0x72), 0);
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		setTimeout(() => this.bus.emit('vctrl?positionx', 0x8A, x), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval148y', 0, 0xA6, 0x5F), 0);
		
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

DisplayBrowser.prototype.receivecreatexsizeOndisplay = function(val180, xsize) {
	this._receive({_port:"display", _msg:"createxsize", val180:val180, xsize:xsize});
}

DisplayBrowser.prototype.receivecreateval142ysizeOndisplay = function(val181, val142, ysize) {
	this._receive({_port:"display", _msg:"createval142ysize", val181:val181, val142:val142, ysize:ysize});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(val168) {
	this._receive({_port:"display", _msg:"destroy_", val168:val168});
}

DisplayBrowser.prototype.receivedestroyval143Ondisplay = function(val143, val169) {
	this._receive({_port:"display", _msg:"destroyval143", val143:val143, val169:val169});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(val178) {
	this._receive({_port:"display", _msg:"update_", val178:val178});
}

DisplayBrowser.prototype.receiveupdateval144Ondisplay = function(val144, val179) {
	this._receive({_port:"display", _msg:"updateval144", val144:val144, val179:val179});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(val170) {
	this._receive({_port:"display", _msg:"clear_", val170:val170});
}

DisplayBrowser.prototype.receiveclearval135Ondisplay = function(val171, val135) {
	this._receive({_port:"display", _msg:"clearval135", val171:val171, val135:val135});
}

DisplayBrowser.prototype.receivesetColorgbrOndisplay = function(r, b, val162, g) {
	this._receive({_port:"display", _msg:"setColorgbr", r:r, b:b, val162:val162, g:g});
}

DisplayBrowser.prototype.receivesetColorval136Ondisplay = function(val163, val136) {
	this._receive({_port:"display", _msg:"setColorval136", val163:val163, val136:val136});
}

DisplayBrowser.prototype.receivesetBGColorrval137Ondisplay = function(r, val137, val158) {
	this._receive({_port:"display", _msg:"setBGColorrval137", r:r, val137:val137, val158:val158});
}

DisplayBrowser.prototype.receivesetBGColorgbOndisplay = function(val159, g, b) {
	this._receive({_port:"display", _msg:"setBGColorgb", val159:val159, g:g, b:b});
}

DisplayBrowser.prototype.receivedrawRectwidthval138heightxOndisplay = function(val138, width, x, height, val174) {
	this._receive({_port:"display", _msg:"drawRectwidthval138heightx", val138:val138, width:width, x:x, height:height, val174:val174});
}

DisplayBrowser.prototype.receivedrawRectyOndisplay = function(y, val175) {
	this._receive({_port:"display", _msg:"drawRecty", y:y, val175:val175});
}

DisplayBrowser.prototype.receivefillRectxyval139Ondisplay = function(x, val139, y, val172) {
	this._receive({_port:"display", _msg:"fillRectxyval139", x:x, val139:val139, y:y, val172:val172});
}

DisplayBrowser.prototype.receivefillRectheightwidthOndisplay = function(val173, width, height) {
	this._receive({_port:"display", _msg:"fillRectheightwidth", val173:val173, width:width, height:height});
}

DisplayBrowser.prototype.receivedrawIntegerdigitsxscaleOndisplay = function(scale, digits, val160, x) {
	this._receive({_port:"display", _msg:"drawIntegerdigitsxscale", scale:scale, digits:digits, val160:val160, x:x});
}

DisplayBrowser.prototype.receivedrawIntegeryvval140Ondisplay = function(val161, v, y, val140) {
	this._receive({_port:"display", _msg:"drawIntegeryvval140", val161:val161, v:v, y:y, val140:val140});
}

DisplayBrowser.prototype.receivedrawThingML_Ondisplay = function(val164) {
	this._receive({_port:"display", _msg:"drawThingML_", val164:val164});
}

DisplayBrowser.prototype.receivedrawThingMLyval141xOndisplay = function(val141, x, val165, y) {
	this._receive({_port:"display", _msg:"drawThingMLyval141x", val141:val141, x:x, val165:val165, y:y});
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorgbr_var = function(Display_SC_Running_received_display_setColorgbr_var) {
	this.Display_SC_Running_received_display_setColorgbr_var = Display_SC_Running_received_display_setColorgbr_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_val137_var = function(Display_SC_Running_display_setBGColor_val137_var) {
	this.Display_SC_Running_display_setBGColor_val137_var = Display_SC_Running_display_setBGColor_val137_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_val144_var = function(Display_SC_Running_display_update_val144_var) {
	this.Display_SC_Running_display_update_val144_var = Display_SC_Running_display_update_val144_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearval135_var = function(Display_SC_Running_received_display_clearval135_var) {
	this.Display_SC_Running_received_display_clearval135_var = Display_SC_Running_received_display_clearval135_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updateval144_var = function(Display_SC_Running_received_display_updateval144_var) {
	this.Display_SC_Running_received_display_updateval144_var = Display_SC_Running_received_display_updateval144_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createval142ysize_var = function(Display_SC_Wait_received_display_createval142ysize_var) {
	this.Display_SC_Wait_received_display_createval142ysize_var = Display_SC_Wait_received_display_createval142ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerdigitsxscale_var = function(Display_SC_Running_received_display_drawIntegerdigitsxscale_var) {
	this.Display_SC_Running_received_display_drawIntegerdigitsxscale_var = Display_SC_Running_received_display_drawIntegerdigitsxscale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_val143_var = function(Display_SC_Running_display_destroy_val143_var) {
	this.Display_SC_Running_display_destroy_val143_var = Display_SC_Running_display_destroy_val143_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyval143_var = function(Display_SC_Running_received_display_destroyval143_var) {
	this.Display_SC_Running_received_display_destroyval143_var = Display_SC_Running_received_display_destroyval143_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_val138_var = function(Display_SC_Running_display_drawRect_val138_var) {
	this.Display_SC_Running_display_drawRect_val138_var = Display_SC_Running_display_drawRect_val138_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectwidthval138heightx_var = function(Display_SC_Running_received_display_drawRectwidthval138heightx_var) {
	this.Display_SC_Running_received_display_drawRectwidthval138heightx_var = Display_SC_Running_received_display_drawRectwidthval138heightx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegeryvval140_var = function(Display_SC_Running_received_display_drawIntegeryvval140_var) {
	this.Display_SC_Running_received_display_drawIntegeryvval140_var = Display_SC_Running_received_display_drawIntegeryvval140_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingML__var = function(Display_SC_Running_received_display_drawThingML__var) {
	this.Display_SC_Running_received_display_drawThingML__var = Display_SC_Running_received_display_drawThingML__var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_val139_var = function(Display_SC_Running_display_fillRect_val139_var) {
	this.Display_SC_Running_display_fillRect_val139_var = Display_SC_Running_display_fillRect_val139_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_val136_var = function(Display_SC_Running_display_setColor_val136_var) {
	this.Display_SC_Running_display_setColor_val136_var = Display_SC_Running_display_setColor_val136_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorrval137_var = function(Display_SC_Running_received_display_setBGColorrval137_var) {
	this.Display_SC_Running_received_display_setBGColorrval137_var = Display_SC_Running_received_display_setBGColorrval137_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRecty_var = function(Display_SC_Running_received_display_drawRecty_var) {
	this.Display_SC_Running_received_display_drawRecty_var = Display_SC_Running_received_display_drawRecty_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectxyval139_var = function(Display_SC_Running_received_display_fillRectxyval139_var) {
	this.Display_SC_Running_received_display_fillRectxyval139_var = Display_SC_Running_received_display_fillRectxyval139_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorval136_var = function(Display_SC_Running_received_display_setColorval136_var) {
	this.Display_SC_Running_received_display_setColorval136_var = Display_SC_Running_received_display_setColorval136_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsize_var = function(Display_SC_Wait_received_display_createxsize_var) {
	this.Display_SC_Wait_received_display_createxsize_var = Display_SC_Wait_received_display_createxsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectheightwidth_var = function(Display_SC_Running_received_display_fillRectheightwidth_var) {
	this.Display_SC_Running_received_display_fillRectheightwidth_var = Display_SC_Running_received_display_fillRectheightwidth_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLyval141x_var = function(Display_SC_Running_received_display_drawThingMLyval141x_var) {
	this.Display_SC_Running_received_display_drawThingMLyval141x_var = Display_SC_Running_received_display_drawThingMLyval141x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_val140_var = function(Display_SC_Running_display_drawInteger_val140_var) {
	this.Display_SC_Running_display_drawInteger_val140_var = Display_SC_Running_display_drawInteger_val140_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorgb_var = function(Display_SC_Running_received_display_setBGColorgb_var) {
	this.Display_SC_Running_received_display_setBGColorgb_var = Display_SC_Running_received_display_setBGColorgb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_val135_var = function(Display_SC_Running_display_clear_val135_var) {
	this.Display_SC_Running_display_clear_val135_var = Display_SC_Running_display_clear_val135_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_val142_var = function(Display_SC_Wait_display_create_val142_var) {
	this.Display_SC_Wait_display_create_val142_var = Display_SC_Wait_display_create_val142_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_val141_var = function(Display_SC_Running_display_drawThingML_val141_var) {
	this.Display_SC_Running_display_drawThingML_val141_var = Display_SC_Running_display_drawThingML_val141_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\treceived_display_setColorgbr = ' + this.Display_SC_Running_received_display_setColorgbr_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_setBGColor_val137 = ' + this.Display_SC_Running_display_setBGColor_val137_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_update_val144 = ' + this.Display_SC_Running_display_update_val144_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\treceived_display_clearval135 = ' + this.Display_SC_Running_received_display_clearval135_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\treceived_display_updateval144 = ' + this.Display_SC_Running_received_display_updateval144_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\treceived_display_createval142ysize = ' + this.Display_SC_Wait_received_display_createval142ysize_var;
	result += '\n\treceived_display_drawIntegerdigitsxscale = ' + this.Display_SC_Running_received_display_drawIntegerdigitsxscale_var;
	result += '\n\tdisplay_destroy_val143 = ' + this.Display_SC_Running_display_destroy_val143_var;
	result += '\n\treceived_display_destroyval143 = ' + this.Display_SC_Running_received_display_destroyval143_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tdisplay_drawRect_val138 = ' + this.Display_SC_Running_display_drawRect_val138_var;
	result += '\n\treceived_display_drawRectwidthval138heightx = ' + this.Display_SC_Running_received_display_drawRectwidthval138heightx_var;
	result += '\n\treceived_display_drawIntegeryvval140 = ' + this.Display_SC_Running_received_display_drawIntegeryvval140_var;
	result += '\n\treceived_display_drawThingML_ = ' + this.Display_SC_Running_received_display_drawThingML__var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tdisplay_fillRect_val139 = ' + this.Display_SC_Running_display_fillRect_val139_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tdisplay_setColor_val136 = ' + this.Display_SC_Running_display_setColor_val136_var;
	result += '\n\treceived_display_setBGColorrval137 = ' + this.Display_SC_Running_received_display_setBGColorrval137_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\treceived_display_drawRecty = ' + this.Display_SC_Running_received_display_drawRecty_var;
	result += '\n\treceived_display_fillRectxyval139 = ' + this.Display_SC_Running_received_display_fillRectxyval139_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\treceived_display_setColorval136 = ' + this.Display_SC_Running_received_display_setColorval136_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\treceived_display_createxsize = ' + this.Display_SC_Wait_received_display_createxsize_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\treceived_display_fillRectheightwidth = ' + this.Display_SC_Running_received_display_fillRectheightwidth_var;
	result += '\n\treceived_display_drawThingMLyval141x = ' + this.Display_SC_Running_received_display_drawThingMLyval141x_var;
	result += '\n\tdisplay_drawInteger_val140 = ' + this.Display_SC_Running_display_drawInteger_val140_var;
	result += '\n\treceived_display_setBGColorgb = ' + this.Display_SC_Running_received_display_setBGColorgb_var;
	result += '\n\tdisplay_clear_val135 = ' + this.Display_SC_Running_display_clear_val135_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_create_val142 = ' + this.Display_SC_Wait_display_create_val142_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tdisplay_drawThingML_val141 = ' + this.Display_SC_Running_display_drawThingML_val141_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '';
	return result;
}

