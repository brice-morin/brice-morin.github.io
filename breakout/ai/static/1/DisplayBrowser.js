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
		setTimeout(() => this.bus.emit('display?displayReadyval79', 0xFC, 0x66), 0);
		setTimeout(() => this.bus.emit('display?displayReady_', 0x04), 0);
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((drawThingMLval75y) => {
		return drawThingMLval75y._port === 'display' && drawThingMLval75y._msg === 'drawThingMLval75y';
	}).effect((drawThingMLval75y) => {
		this.Display_SC_Running_received_display_drawThingMLval75y_var = true;
		this.Display_SC_Running_display_drawThingML_val75_var = drawThingMLval75y.val75;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLval75y.y;
		if(this.Display_SC_Running_received_display_drawThingMLx_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLval75y_var = false;
		this.Display_SC_Running_received_display_drawThingMLx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearval69_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearval69_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRect_) => {
		return drawRect_._port === 'display' && drawRect_._msg === 'drawRect_';
	}).effect((drawRect_) => {
		this.Display_SC_Running_received_display_drawRect__var = true;
		if(this.Display_SC_Running_received_display_drawRectywidthxheightval72_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRect__var = false;
		this.Display_SC_Running_received_display_drawRectywidthxheightval72_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLx) => {
		return drawThingMLx._port === 'display' && drawThingMLx._msg === 'drawThingMLx';
	}).effect((drawThingMLx) => {
		this.Display_SC_Running_received_display_drawThingMLx_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLx.x;
		if(this.Display_SC_Running_received_display_drawThingMLval75y_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLx_var = false;
		this.Display_SC_Running_received_display_drawThingMLval75y_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectval73width) => {
		return fillRectval73width._port === 'display' && fillRectval73width._msg === 'fillRectval73width';
	}).effect((fillRectval73width) => {
		this.Display_SC_Running_received_display_fillRectval73width_var = true;
		this.Display_SC_Running_display_fillRect_val73_var = fillRectval73width.val73;
		this.Display_SC_Running_display_fillRect_width_var = fillRectval73width.width;
		if(this.Display_SC_Running_received_display_fillRectyheightx_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectval73width_var = false;
		this.Display_SC_Running_received_display_fillRectyheightx_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeval76ysize) => {
		return createxsizeval76ysize._port === 'display' && createxsizeval76ysize._msg === 'createxsizeval76ysize' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createxsizeval76ysize) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeval76ysize.xsize;
		this.Display_SC_Wait_display_create_val76_var = createxsizeval76ysize.val76;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeval76ysize.ysize;
		this.initDisplay(createxsizeval76ysize.xsize, createxsizeval76ysize.ysize);
		this.Display_SC_Wait_received_display_createxsizeval76ysize_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeval76ysize) => {
		return createxsizeval76ysize._port === 'display' && createxsizeval76ysize._msg === 'createxsizeval76ysize' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createxsizeval76ysize) => {
		this.Display_SC_Wait_received_display_createxsizeval76ysize_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeval76ysize.xsize;
		this.Display_SC_Wait_display_create_val76_var = createxsizeval76ysize.val76;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeval76ysize.ysize;
	});
	Display_SC_Running.to(null).when((updateval78) => {
		return updateval78._port === 'display' && updateval78._msg === 'updateval78';
	}).effect((updateval78) => {
		this.Display_SC_Running_received_display_updateval78_var = true;
		this.Display_SC_Running_display_update_val78_var = updateval78.val78;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updateval78_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerdigitsval74scalex) => {
		return drawIntegerdigitsval74scalex._port === 'display' && drawIntegerdigitsval74scalex._msg === 'drawIntegerdigitsval74scalex';
	}).effect((drawIntegerdigitsval74scalex) => {
		this.Display_SC_Running_received_display_drawIntegerdigitsval74scalex_var = true;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerdigitsval74scalex.digits;
		this.Display_SC_Running_display_drawInteger_val74_var = drawIntegerdigitsval74scalex.val74;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerdigitsval74scalex.scale;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerdigitsval74scalex.x;
		if(this.Display_SC_Running_received_display_drawIntegeryv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerdigitsval74scalex_var = false;
		this.Display_SC_Running_received_display_drawIntegeryv_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectywidthxheightval72) => {
		return drawRectywidthxheightval72._port === 'display' && drawRectywidthxheightval72._msg === 'drawRectywidthxheightval72';
	}).effect((drawRectywidthxheightval72) => {
		this.Display_SC_Running_received_display_drawRectywidthxheightval72_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectywidthxheightval72.y;
		this.Display_SC_Running_display_drawRect_width_var = drawRectywidthxheightval72.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectywidthxheightval72.x;
		this.Display_SC_Running_display_drawRect_height_var = drawRectywidthxheightval72.height;
		this.Display_SC_Running_display_drawRect_val72_var = drawRectywidthxheightval72.val72;
		if(this.Display_SC_Running_received_display_drawRect__var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectywidthxheightval72_var = false;
		this.Display_SC_Running_received_display_drawRect__var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyval77_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyval77_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyval77_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((setColorbg) => {
		return setColorbg._port === 'display' && setColorbg._msg === 'setColorbg';
	}).effect((setColorbg) => {
		this.Display_SC_Running_received_display_setColorbg_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbg.b;
		this.Display_SC_Running_display_setColor_g_var = setColorbg.g;
		if(this.Display_SC_Running_received_display_setColorval70r_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbg_var = false;
		this.Display_SC_Running_received_display_setColorval70r_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorval70r) => {
		return setColorval70r._port === 'display' && setColorval70r._msg === 'setColorval70r';
	}).effect((setColorval70r) => {
		this.Display_SC_Running_received_display_setColorval70r_var = true;
		this.Display_SC_Running_display_setColor_val70_var = setColorval70r.val70;
		this.Display_SC_Running_display_setColor_r_var = setColorval70r.r;
		if(this.Display_SC_Running_received_display_setColorbg_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorval70r_var = false;
		this.Display_SC_Running_received_display_setColorbg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorval71g) => {
		return setBGColorval71g._port === 'display' && setBGColorval71g._msg === 'setBGColorval71g';
	}).effect((setBGColorval71g) => {
		this.Display_SC_Running_received_display_setBGColorval71g_var = true;
		this.Display_SC_Running_display_setBGColor_val71_var = setBGColorval71g.val71;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorval71g.g;
		if(this.Display_SC_Running_received_display_setBGColorrb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorval71g_var = false;
		this.Display_SC_Running_received_display_setBGColorrb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectyheightx) => {
		return fillRectyheightx._port === 'display' && fillRectyheightx._msg === 'fillRectyheightx';
	}).effect((fillRectyheightx) => {
		this.Display_SC_Running_received_display_fillRectyheightx_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyheightx.y;
		this.Display_SC_Running_display_fillRect_height_var = fillRectyheightx.height;
		this.Display_SC_Running_display_fillRect_x_var = fillRectyheightx.x;
		if(this.Display_SC_Running_received_display_fillRectval73width_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyheightx_var = false;
		this.Display_SC_Running_received_display_fillRectval73width_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrb) => {
		return setBGColorrb._port === 'display' && setBGColorrb._msg === 'setBGColorrb';
	}).effect((setBGColorrb) => {
		this.Display_SC_Running_received_display_setBGColorrb_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrb.r;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorrb.b;
		if(this.Display_SC_Running_received_display_setBGColorval71g_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrb_var = false;
		this.Display_SC_Running_received_display_setBGColorval71g_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearval69) => {
		return clearval69._port === 'display' && clearval69._msg === 'clearval69';
	}).effect((clearval69) => {
		this.Display_SC_Running_received_display_clearval69_var = true;
		this.Display_SC_Running_display_clear_val69_var = clearval69.val69;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearval69_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegeryv) => {
		return drawIntegeryv._port === 'display' && drawIntegeryv._msg === 'drawIntegeryv';
	}).effect((drawIntegeryv) => {
		this.Display_SC_Running_received_display_drawIntegeryv_var = true;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegeryv.y;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegeryv.v;
		if(this.Display_SC_Running_received_display_drawIntegerdigitsval74scalex_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegeryv_var = false;
		this.Display_SC_Running_received_display_drawIntegerdigitsval74scalex_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (this.Display_SC_Wait_received_display_createxsizeval76ysize_var);
	}).effect((create_) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createxsizeval76ysize_var = false;
	});
	Display_SC_Wait.to(null).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (!(this.Display_SC_Wait_received_display_createxsizeval76ysize_var));
	}).effect((create_) => {
		this.Display_SC_Wait_received_display_create__var = true;
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyval77) => {
		return destroyval77._port === 'display' && destroyval77._msg === 'destroyval77' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyval77) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyval77_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyval77) => {
		return destroyval77._port === 'display' && destroyval77._msg === 'destroyval77' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyval77) => {
		this.Display_SC_Running_received_display_destroyval77_var = true;
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updateval78_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updateval78_var = false;
		
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
		
		
		setTimeout(() => this.bus.emit('vctrl?positionxy', 0, 0x20, posX), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval82', 0x4B, 0x78), 0);
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval81', 0xEF, 0x7F), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0xC4,  -8, 0), 0);
			
				} else if (e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0x70, 8, 0), 0);
			setTimeout(() => this.bus.emit('vctrl?velocityval81', 0xE2, 0xD2), 0);
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval81', 0x0C, 0x47), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydxdy', 0x84, 0, 0), 0);
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		setTimeout(() => this.bus.emit('vctrl?positionxy', 0, 0x72, x), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval82', 0x8B, 0x25), 0);
		
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

DisplayBrowser.prototype.receivecreate_Ondisplay = function(val102) {
	this._receive({_port:"display", _msg:"create_", val102:val102});
}

DisplayBrowser.prototype.receivecreatexsizeval76ysizeOndisplay = function(xsize, val103, val76, ysize) {
	this._receive({_port:"display", _msg:"createxsizeval76ysize", xsize:xsize, val103:val103, val76:val76, ysize:ysize});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(val110) {
	this._receive({_port:"display", _msg:"destroy_", val110:val110});
}

DisplayBrowser.prototype.receivedestroyval77Ondisplay = function(val77, val111) {
	this._receive({_port:"display", _msg:"destroyval77", val77:val77, val111:val111});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(val114) {
	this._receive({_port:"display", _msg:"update_", val114:val114});
}

DisplayBrowser.prototype.receiveupdateval78Ondisplay = function(val78, val115) {
	this._receive({_port:"display", _msg:"updateval78", val78:val78, val115:val115});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(val106) {
	this._receive({_port:"display", _msg:"clear_", val106:val106});
}

DisplayBrowser.prototype.receiveclearval69Ondisplay = function(val107, val69) {
	this._receive({_port:"display", _msg:"clearval69", val107:val107, val69:val69});
}

DisplayBrowser.prototype.receivesetColorbgOndisplay = function(g, val112, b) {
	this._receive({_port:"display", _msg:"setColorbg", g:g, val112:val112, b:b});
}

DisplayBrowser.prototype.receivesetColorval70rOndisplay = function(r, val113, val70) {
	this._receive({_port:"display", _msg:"setColorval70r", r:r, val113:val113, val70:val70});
}

DisplayBrowser.prototype.receivesetBGColorval71gOndisplay = function(g, val71, val100) {
	this._receive({_port:"display", _msg:"setBGColorval71g", g:g, val71:val71, val100:val100});
}

DisplayBrowser.prototype.receivesetBGColorrbOndisplay = function(b, r, val101) {
	this._receive({_port:"display", _msg:"setBGColorrb", b:b, r:r, val101:val101});
}

DisplayBrowser.prototype.receivedrawRect_Ondisplay = function(val94) {
	this._receive({_port:"display", _msg:"drawRect_", val94:val94});
}

DisplayBrowser.prototype.receivedrawRectywidthxheightval72Ondisplay = function(width, val72, y, val95, x, height) {
	this._receive({_port:"display", _msg:"drawRectywidthxheightval72", width:width, val72:val72, y:y, val95:val95, x:x, height:height});
}

DisplayBrowser.prototype.receivefillRectyheightxOndisplay = function(val108, x, height, y) {
	this._receive({_port:"display", _msg:"fillRectyheightx", val108:val108, x:x, height:height, y:y});
}

DisplayBrowser.prototype.receivefillRectval73widthOndisplay = function(width, val109, val73) {
	this._receive({_port:"display", _msg:"fillRectval73width", width:width, val109:val109, val73:val73});
}

DisplayBrowser.prototype.receivedrawIntegerdigitsval74scalexOndisplay = function(digits, x, scale, val92, val74) {
	this._receive({_port:"display", _msg:"drawIntegerdigitsval74scalex", digits:digits, x:x, scale:scale, val92:val92, val74:val74});
}

DisplayBrowser.prototype.receivedrawIntegeryvOndisplay = function(y, val93, v) {
	this._receive({_port:"display", _msg:"drawIntegeryv", y:y, val93:val93, v:v});
}

DisplayBrowser.prototype.receivedrawThingMLxOndisplay = function(x, val98) {
	this._receive({_port:"display", _msg:"drawThingMLx", x:x, val98:val98});
}

DisplayBrowser.prototype.receivedrawThingMLval75yOndisplay = function(val75, val99, y) {
	this._receive({_port:"display", _msg:"drawThingMLval75y", val75:val75, val99:val99, y:y});
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsizeval76ysize_var = function(Display_SC_Wait_received_display_createxsizeval76ysize_var) {
	this.Display_SC_Wait_received_display_createxsizeval76ysize_var = Display_SC_Wait_received_display_createxsizeval76ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorbg_var = function(Display_SC_Running_received_display_setColorbg_var) {
	this.Display_SC_Running_received_display_setColorbg_var = Display_SC_Running_received_display_setColorbg_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_val71_var = function(Display_SC_Running_display_setBGColor_val71_var) {
	this.Display_SC_Running_display_setBGColor_val71_var = Display_SC_Running_display_setBGColor_val71_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLval75y_var = function(Display_SC_Running_received_display_drawThingMLval75y_var) {
	this.Display_SC_Running_received_display_drawThingMLval75y_var = Display_SC_Running_received_display_drawThingMLval75y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorrb_var = function(Display_SC_Running_received_display_setBGColorrb_var) {
	this.Display_SC_Running_received_display_setBGColorrb_var = Display_SC_Running_received_display_setBGColorrb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerdigitsval74scalex_var = function(Display_SC_Running_received_display_drawIntegerdigitsval74scalex_var) {
	this.Display_SC_Running_received_display_drawIntegerdigitsval74scalex_var = Display_SC_Running_received_display_drawIntegerdigitsval74scalex_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectyheightx_var = function(Display_SC_Running_received_display_fillRectyheightx_var) {
	this.Display_SC_Running_received_display_fillRectyheightx_var = Display_SC_Running_received_display_fillRectyheightx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_val75_var = function(Display_SC_Running_display_drawThingML_val75_var) {
	this.Display_SC_Running_display_drawThingML_val75_var = Display_SC_Running_display_drawThingML_val75_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_val77_var = function(Display_SC_Running_display_destroy_val77_var) {
	this.Display_SC_Running_display_destroy_val77_var = Display_SC_Running_display_destroy_val77_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyval77_var = function(Display_SC_Running_received_display_destroyval77_var) {
	this.Display_SC_Running_received_display_destroyval77_var = Display_SC_Running_received_display_destroyval77_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegeryv_var = function(Display_SC_Running_received_display_drawIntegeryv_var) {
	this.Display_SC_Running_received_display_drawIntegeryv_var = Display_SC_Running_received_display_drawIntegeryv_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLx_var = function(Display_SC_Running_received_display_drawThingMLx_var) {
	this.Display_SC_Running_received_display_drawThingMLx_var = Display_SC_Running_received_display_drawThingMLx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearval69_var = function(Display_SC_Running_received_display_clearval69_var) {
	this.Display_SC_Running_received_display_clearval69_var = Display_SC_Running_received_display_clearval69_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_val73_var = function(Display_SC_Running_display_fillRect_val73_var) {
	this.Display_SC_Running_display_fillRect_val73_var = Display_SC_Running_display_fillRect_val73_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_val78_var = function(Display_SC_Running_display_update_val78_var) {
	this.Display_SC_Running_display_update_val78_var = Display_SC_Running_display_update_val78_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_val76_var = function(Display_SC_Wait_display_create_val76_var) {
	this.Display_SC_Wait_display_create_val76_var = Display_SC_Wait_display_create_val76_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_val74_var = function(Display_SC_Running_display_drawInteger_val74_var) {
	this.Display_SC_Running_display_drawInteger_val74_var = Display_SC_Running_display_drawInteger_val74_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorval71g_var = function(Display_SC_Running_received_display_setBGColorval71g_var) {
	this.Display_SC_Running_received_display_setBGColorval71g_var = Display_SC_Running_received_display_setBGColorval71g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_val72_var = function(Display_SC_Running_display_drawRect_val72_var) {
	this.Display_SC_Running_display_drawRect_val72_var = Display_SC_Running_display_drawRect_val72_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectval73width_var = function(Display_SC_Running_received_display_fillRectval73width_var) {
	this.Display_SC_Running_received_display_fillRectval73width_var = Display_SC_Running_received_display_fillRectval73width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_val69_var = function(Display_SC_Running_display_clear_val69_var) {
	this.Display_SC_Running_display_clear_val69_var = Display_SC_Running_display_clear_val69_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_val70_var = function(Display_SC_Running_display_setColor_val70_var) {
	this.Display_SC_Running_display_setColor_val70_var = Display_SC_Running_display_setColor_val70_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorval70r_var = function(Display_SC_Running_received_display_setColorval70r_var) {
	this.Display_SC_Running_received_display_setColorval70r_var = Display_SC_Running_received_display_setColorval70r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRect__var = function(Display_SC_Running_received_display_drawRect__var) {
	this.Display_SC_Running_received_display_drawRect__var = Display_SC_Running_received_display_drawRect__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectywidthxheightval72_var = function(Display_SC_Running_received_display_drawRectywidthxheightval72_var) {
	this.Display_SC_Running_received_display_drawRectywidthxheightval72_var = Display_SC_Running_received_display_drawRectywidthxheightval72_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_create__var = function(Display_SC_Wait_received_display_create__var) {
	this.Display_SC_Wait_received_display_create__var = Display_SC_Wait_received_display_create__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updateval78_var = function(Display_SC_Running_received_display_updateval78_var) {
	this.Display_SC_Running_received_display_updateval78_var = Display_SC_Running_received_display_updateval78_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\treceived_display_createxsizeval76ysize = ' + this.Display_SC_Wait_received_display_createxsizeval76ysize_var;
	result += '\n\treceived_display_setColorbg = ' + this.Display_SC_Running_received_display_setColorbg_var;
	result += '\n\tdisplay_setBGColor_val71 = ' + this.Display_SC_Running_display_setBGColor_val71_var;
	result += '\n\treceived_display_drawThingMLval75y = ' + this.Display_SC_Running_received_display_drawThingMLval75y_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\treceived_display_setBGColorrb = ' + this.Display_SC_Running_received_display_setBGColorrb_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\treceived_display_drawIntegerdigitsval74scalex = ' + this.Display_SC_Running_received_display_drawIntegerdigitsval74scalex_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\treceived_display_fillRectyheightx = ' + this.Display_SC_Running_received_display_fillRectyheightx_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tdisplay_drawThingML_val75 = ' + this.Display_SC_Running_display_drawThingML_val75_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_destroy_val77 = ' + this.Display_SC_Running_display_destroy_val77_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\treceived_display_destroyval77 = ' + this.Display_SC_Running_received_display_destroyval77_var;
	result += '\n\treceived_display_drawIntegeryv = ' + this.Display_SC_Running_received_display_drawIntegeryv_var;
	result += '\n\treceived_display_drawThingMLx = ' + this.Display_SC_Running_received_display_drawThingMLx_var;
	result += '\n\treceived_display_clearval69 = ' + this.Display_SC_Running_received_display_clearval69_var;
	result += '\n\tdisplay_fillRect_val73 = ' + this.Display_SC_Running_display_fillRect_val73_var;
	result += '\n\tdisplay_update_val78 = ' + this.Display_SC_Running_display_update_val78_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tdisplay_create_val76 = ' + this.Display_SC_Wait_display_create_val76_var;
	result += '\n\tdisplay_drawInteger_val74 = ' + this.Display_SC_Running_display_drawInteger_val74_var;
	result += '\n\treceived_display_setBGColorval71g = ' + this.Display_SC_Running_received_display_setBGColorval71g_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tdisplay_drawRect_val72 = ' + this.Display_SC_Running_display_drawRect_val72_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\treceived_display_fillRectval73width = ' + this.Display_SC_Running_received_display_fillRectval73width_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_clear_val69 = ' + this.Display_SC_Running_display_clear_val69_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_setColor_val70 = ' + this.Display_SC_Running_display_setColor_val70_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_setColorval70r = ' + this.Display_SC_Running_received_display_setColorval70r_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\treceived_display_drawRect_ = ' + this.Display_SC_Running_received_display_drawRect__var;
	result += '\n\treceived_display_drawRectywidthxheightval72 = ' + this.Display_SC_Running_received_display_drawRectywidthxheightval72_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\treceived_display_create_ = ' + this.Display_SC_Wait_received_display_create__var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\treceived_display_updateval78 = ' + this.Display_SC_Running_received_display_updateval78_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '';
	return result;
}

