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
		setTimeout(() => this.bus.emit('display?displayReadyval277', 0xA8, 0xCC), 0);
		setTimeout(() => this.bus.emit('display?displayReady_', 0x80), 0);
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((setBGColorrg) => {
		return setBGColorrg._port === 'display' && setBGColorrg._msg === 'setBGColorrg';
	}).effect((setBGColorrg) => {
		this.Display_SC_Running_received_display_setBGColorrg_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrg.r;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorrg.g;
		if(this.Display_SC_Running_received_display_setBGColorval269b_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrg_var = false;
		this.Display_SC_Running_received_display_setBGColorval269b_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyval275) => {
		return destroyval275._port === 'display' && destroyval275._msg === 'destroyval275' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyval275) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyval275_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyval275) => {
		return destroyval275._port === 'display' && destroyval275._msg === 'destroyval275' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyval275) => {
		this.Display_SC_Running_received_display_destroyval275_var = true;
	});
	Display_SC_Running.to(null).when((drawRectwidthheightval270xy) => {
		return drawRectwidthheightval270xy._port === 'display' && drawRectwidthheightval270xy._msg === 'drawRectwidthheightval270xy';
	}).effect((drawRectwidthheightval270xy) => {
		this.Display_SC_Running_received_display_drawRectwidthheightval270xy_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthheightval270xy.width;
		this.Display_SC_Running_display_drawRect_height_var = drawRectwidthheightval270xy.height;
		this.Display_SC_Running_display_drawRect_val270_var = drawRectwidthheightval270xy.val270;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthheightval270xy.x;
		this.Display_SC_Running_display_drawRect_y_var = drawRectwidthheightval270xy.y;
		if(this.Display_SC_Running_received_display_drawRect__var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthheightval270xy_var = false;
		this.Display_SC_Running_received_display_drawRect__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorbval268g) => {
		return setColorbval268g._port === 'display' && setColorbval268g._msg === 'setColorbval268g';
	}).effect((setColorbval268g) => {
		this.Display_SC_Running_received_display_setColorbval268g_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbval268g.b;
		this.Display_SC_Running_display_setColor_val268_var = setColorbval268g.val268;
		this.Display_SC_Running_display_setColor_g_var = setColorbval268g.g;
		if(this.Display_SC_Running_received_display_setColorr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbval268g_var = false;
		this.Display_SC_Running_received_display_setColorr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerscaleyx) => {
		return drawIntegerscaleyx._port === 'display' && drawIntegerscaleyx._msg === 'drawIntegerscaleyx';
	}).effect((drawIntegerscaleyx) => {
		this.Display_SC_Running_received_display_drawIntegerscaleyx_var = true;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerscaleyx.scale;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerscaleyx.y;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerscaleyx.x;
		if(this.Display_SC_Running_received_display_drawIntegerval272digitsv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerscaleyx_var = false;
		this.Display_SC_Running_received_display_drawIntegerval272digitsv_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectyxwidthval271height) => {
		return fillRectyxwidthval271height._port === 'display' && fillRectyxwidthval271height._msg === 'fillRectyxwidthval271height';
	}).effect((fillRectyxwidthval271height) => {
		this.Display_SC_Running_received_display_fillRectyxwidthval271height_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyxwidthval271height.y;
		this.Display_SC_Running_display_fillRect_x_var = fillRectyxwidthval271height.x;
		this.Display_SC_Running_display_fillRect_width_var = fillRectyxwidthval271height.width;
		this.Display_SC_Running_display_fillRect_val271_var = fillRectyxwidthval271height.val271;
		this.Display_SC_Running_display_fillRect_height_var = fillRectyxwidthval271height.height;
		if(this.Display_SC_Running_received_display_fillRect__var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyxwidthval271height_var = false;
		this.Display_SC_Running_received_display_fillRect__var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyval275_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyval275_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyval275_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updateval276_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updateval276_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorval269b) => {
		return setBGColorval269b._port === 'display' && setBGColorval269b._msg === 'setBGColorval269b';
	}).effect((setBGColorval269b) => {
		this.Display_SC_Running_received_display_setBGColorval269b_var = true;
		this.Display_SC_Running_display_setBGColor_val269_var = setBGColorval269b.val269;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorval269b.b;
		if(this.Display_SC_Running_received_display_setBGColorrg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorval269b_var = false;
		this.Display_SC_Running_received_display_setBGColorrg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerval272digitsv) => {
		return drawIntegerval272digitsv._port === 'display' && drawIntegerval272digitsv._msg === 'drawIntegerval272digitsv';
	}).effect((drawIntegerval272digitsv) => {
		this.Display_SC_Running_received_display_drawIntegerval272digitsv_var = true;
		this.Display_SC_Running_display_drawInteger_val272_var = drawIntegerval272digitsv.val272;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerval272digitsv.digits;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerval272digitsv.v;
		if(this.Display_SC_Running_received_display_drawIntegerscaleyx_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerval272digitsv_var = false;
		this.Display_SC_Running_received_display_drawIntegerscaleyx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearval267) => {
		return clearval267._port === 'display' && clearval267._msg === 'clearval267';
	}).effect((clearval267) => {
		this.Display_SC_Running_received_display_clearval267_var = true;
		this.Display_SC_Running_display_clear_val267_var = clearval267.val267;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearval267_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRect_) => {
		return drawRect_._port === 'display' && drawRect_._msg === 'drawRect_';
	}).effect((drawRect_) => {
		this.Display_SC_Running_received_display_drawRect__var = true;
		if(this.Display_SC_Running_received_display_drawRectwidthheightval270xy_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRect__var = false;
		this.Display_SC_Running_received_display_drawRectwidthheightval270xy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLyx) => {
		return drawThingMLyx._port === 'display' && drawThingMLyx._msg === 'drawThingMLyx';
	}).effect((drawThingMLyx) => {
		this.Display_SC_Running_received_display_drawThingMLyx_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLyx.y;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLyx.x;
		if(this.Display_SC_Running_received_display_drawThingMLval273_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLyx_var = false;
		this.Display_SC_Running_received_display_drawThingMLval273_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updateval276) => {
		return updateval276._port === 'display' && updateval276._msg === 'updateval276';
	}).effect((updateval276) => {
		this.Display_SC_Running_received_display_updateval276_var = true;
		this.Display_SC_Running_display_update_val276_var = updateval276.val276;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updateval276_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsize) => {
		return createxsize._port === 'display' && createxsize._msg === 'createxsize' && (this.Display_SC_Wait_received_display_createysizeval274_var);
	}).effect((createxsize) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsize.xsize;
		this.initDisplay(createxsize.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createxsize_var = false;
		this.Display_SC_Wait_received_display_createysizeval274_var = false;
	});
	Display_SC_Wait.to(null).when((createxsize) => {
		return createxsize._port === 'display' && createxsize._msg === 'createxsize' && (!(this.Display_SC_Wait_received_display_createysizeval274_var));
	}).effect((createxsize) => {
		this.Display_SC_Wait_received_display_createxsize_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsize.xsize;
	});
	Display_SC_Running.to(null).when((drawThingMLval273) => {
		return drawThingMLval273._port === 'display' && drawThingMLval273._msg === 'drawThingMLval273';
	}).effect((drawThingMLval273) => {
		this.Display_SC_Running_received_display_drawThingMLval273_var = true;
		this.Display_SC_Running_display_drawThingML_val273_var = drawThingMLval273.val273;
		if(this.Display_SC_Running_received_display_drawThingMLyx_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLval273_var = false;
		this.Display_SC_Running_received_display_drawThingMLyx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearval267_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearval267_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRect_) => {
		return fillRect_._port === 'display' && fillRect_._msg === 'fillRect_';
	}).effect((fillRect_) => {
		this.Display_SC_Running_received_display_fillRect__var = true;
		if(this.Display_SC_Running_received_display_fillRectyxwidthval271height_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRect__var = false;
		this.Display_SC_Running_received_display_fillRectyxwidthval271height_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorr) => {
		return setColorr._port === 'display' && setColorr._msg === 'setColorr';
	}).effect((setColorr) => {
		this.Display_SC_Running_received_display_setColorr_var = true;
		this.Display_SC_Running_display_setColor_r_var = setColorr.r;
		if(this.Display_SC_Running_received_display_setColorbval268g_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorr_var = false;
		this.Display_SC_Running_received_display_setColorbval268g_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysizeval274) => {
		return createysizeval274._port === 'display' && createysizeval274._msg === 'createysizeval274' && (this.Display_SC_Wait_received_display_createxsize_var);
	}).effect((createysizeval274) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizeval274.ysize;
		this.Display_SC_Wait_display_create_val274_var = createysizeval274.val274;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createysizeval274.ysize);
		this.Display_SC_Wait_received_display_createysizeval274_var = false;
		this.Display_SC_Wait_received_display_createxsize_var = false;
	});
	Display_SC_Wait.to(null).when((createysizeval274) => {
		return createysizeval274._port === 'display' && createysizeval274._msg === 'createysizeval274' && (!(this.Display_SC_Wait_received_display_createxsize_var));
	}).effect((createysizeval274) => {
		this.Display_SC_Wait_received_display_createysizeval274_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizeval274.ysize;
		this.Display_SC_Wait_display_create_val274_var = createysizeval274.val274;
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
		
		
		setTimeout(() => this.bus.emit('vctrl?positiony', 0x20, 0), 0);
		setTimeout(() => this.bus.emit('vctrl?positionxval280', posX, 0xD7, 0xD9), 0);
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydydx', 0,  -8, 0x59), 0);
			setTimeout(() => this.bus.emit('vctrl?velocityval279', 0x32, 0xE5), 0);
			
				} else if (e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval279', 0xC9, 0xDF), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydydx', 0, 8, 0xE5), 0);
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval279', 0x1E, 0xCE), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydydx', 0, 0, 0x1B), 0);
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		setTimeout(() => this.bus.emit('vctrl?positiony', 0x2F, 0), 0);
		setTimeout(() => this.bus.emit('vctrl?positionxval280', x, 0x98, 0xEB), 0);
		
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

DisplayBrowser.prototype.receivecreatexsizeOndisplay = function(xsize, val300) {
	this._receive({_port:"display", _msg:"createxsize", xsize:xsize, val300:val300});
}

DisplayBrowser.prototype.receivecreateysizeval274Ondisplay = function(ysize, val274, val301) {
	this._receive({_port:"display", _msg:"createysizeval274", ysize:ysize, val274:val274, val301:val301});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(val308) {
	this._receive({_port:"display", _msg:"destroy_", val308:val308});
}

DisplayBrowser.prototype.receivedestroyval275Ondisplay = function(val309, val275) {
	this._receive({_port:"display", _msg:"destroyval275", val309:val309, val275:val275});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(val310) {
	this._receive({_port:"display", _msg:"update_", val310:val310});
}

DisplayBrowser.prototype.receiveupdateval276Ondisplay = function(val311, val276) {
	this._receive({_port:"display", _msg:"updateval276", val311:val311, val276:val276});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(val290) {
	this._receive({_port:"display", _msg:"clear_", val290:val290});
}

DisplayBrowser.prototype.receiveclearval267Ondisplay = function(val291, val267) {
	this._receive({_port:"display", _msg:"clearval267", val291:val291, val267:val267});
}

DisplayBrowser.prototype.receivesetColorrOndisplay = function(val304, r) {
	this._receive({_port:"display", _msg:"setColorr", val304:val304, r:r});
}

DisplayBrowser.prototype.receivesetColorbval268gOndisplay = function(b, val268, val305, g) {
	this._receive({_port:"display", _msg:"setColorbval268g", b:b, val268:val268, val305:val305, g:g});
}

DisplayBrowser.prototype.receivesetBGColorrgOndisplay = function(r, g, val296) {
	this._receive({_port:"display", _msg:"setBGColorrg", r:r, g:g, val296:val296});
}

DisplayBrowser.prototype.receivesetBGColorval269bOndisplay = function(val269, b, val297) {
	this._receive({_port:"display", _msg:"setBGColorval269b", val269:val269, b:b, val297:val297});
}

DisplayBrowser.prototype.receivedrawRect_Ondisplay = function(val294) {
	this._receive({_port:"display", _msg:"drawRect_", val294:val294});
}

DisplayBrowser.prototype.receivedrawRectwidthheightval270xyOndisplay = function(val270, x, width, val295, y, height) {
	this._receive({_port:"display", _msg:"drawRectwidthheightval270xy", val270:val270, x:x, width:width, val295:val295, y:y, height:height});
}

DisplayBrowser.prototype.receivefillRect_Ondisplay = function(val298) {
	this._receive({_port:"display", _msg:"fillRect_", val298:val298});
}

DisplayBrowser.prototype.receivefillRectyxwidthval271heightOndisplay = function(x, width, height, val271, val299, y) {
	this._receive({_port:"display", _msg:"fillRectyxwidthval271height", x:x, width:width, height:height, val271:val271, val299:val299, y:y});
}

DisplayBrowser.prototype.receivedrawIntegerscaleyxOndisplay = function(val292, x, y, scale) {
	this._receive({_port:"display", _msg:"drawIntegerscaleyx", val292:val292, x:x, y:y, scale:scale});
}

DisplayBrowser.prototype.receivedrawIntegerval272digitsvOndisplay = function(val272, val293, digits, v) {
	this._receive({_port:"display", _msg:"drawIntegerval272digitsv", val272:val272, val293:val293, digits:digits, v:v});
}

DisplayBrowser.prototype.receivedrawThingMLval273Ondisplay = function(val273, val312) {
	this._receive({_port:"display", _msg:"drawThingMLval273", val273:val273, val312:val312});
}

DisplayBrowser.prototype.receivedrawThingMLyxOndisplay = function(val313, y, x) {
	this._receive({_port:"display", _msg:"drawThingMLyx", val313:val313, y:y, x:x});
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_val274_var = function(Display_SC_Wait_display_create_val274_var) {
	this.Display_SC_Wait_display_create_val274_var = Display_SC_Wait_display_create_val274_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorval269b_var = function(Display_SC_Running_received_display_setBGColorval269b_var) {
	this.Display_SC_Running_received_display_setBGColorval269b_var = Display_SC_Running_received_display_setBGColorval269b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectwidthheightval270xy_var = function(Display_SC_Running_received_display_drawRectwidthheightval270xy_var) {
	this.Display_SC_Running_received_display_drawRectwidthheightval270xy_var = Display_SC_Running_received_display_drawRectwidthheightval270xy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_val267_var = function(Display_SC_Running_display_clear_val267_var) {
	this.Display_SC_Running_display_clear_val267_var = Display_SC_Running_display_clear_val267_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLval273_var = function(Display_SC_Running_received_display_drawThingMLval273_var) {
	this.Display_SC_Running_received_display_drawThingMLval273_var = Display_SC_Running_received_display_drawThingMLval273_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectyxwidthval271height_var = function(Display_SC_Running_received_display_fillRectyxwidthval271height_var) {
	this.Display_SC_Running_received_display_fillRectyxwidthval271height_var = Display_SC_Running_received_display_fillRectyxwidthval271height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_val275_var = function(Display_SC_Running_display_destroy_val275_var) {
	this.Display_SC_Running_display_destroy_val275_var = Display_SC_Running_display_destroy_val275_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updateval276_var = function(Display_SC_Running_received_display_updateval276_var) {
	this.Display_SC_Running_received_display_updateval276_var = Display_SC_Running_received_display_updateval276_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyval275_var = function(Display_SC_Running_received_display_destroyval275_var) {
	this.Display_SC_Running_received_display_destroyval275_var = Display_SC_Running_received_display_destroyval275_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createysizeval274_var = function(Display_SC_Wait_received_display_createysizeval274_var) {
	this.Display_SC_Wait_received_display_createysizeval274_var = Display_SC_Wait_received_display_createysizeval274_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLyx_var = function(Display_SC_Running_received_display_drawThingMLyx_var) {
	this.Display_SC_Running_received_display_drawThingMLyx_var = Display_SC_Running_received_display_drawThingMLyx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerscaleyx_var = function(Display_SC_Running_received_display_drawIntegerscaleyx_var) {
	this.Display_SC_Running_received_display_drawIntegerscaleyx_var = Display_SC_Running_received_display_drawIntegerscaleyx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorbval268g_var = function(Display_SC_Running_received_display_setColorbval268g_var) {
	this.Display_SC_Running_received_display_setColorbval268g_var = Display_SC_Running_received_display_setColorbval268g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRect__var = function(Display_SC_Running_received_display_fillRect__var) {
	this.Display_SC_Running_received_display_fillRect__var = Display_SC_Running_received_display_fillRect__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_val273_var = function(Display_SC_Running_display_drawThingML_val273_var) {
	this.Display_SC_Running_display_drawThingML_val273_var = Display_SC_Running_display_drawThingML_val273_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_val272_var = function(Display_SC_Running_display_drawInteger_val272_var) {
	this.Display_SC_Running_display_drawInteger_val272_var = Display_SC_Running_display_drawInteger_val272_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerval272digitsv_var = function(Display_SC_Running_received_display_drawIntegerval272digitsv_var) {
	this.Display_SC_Running_received_display_drawIntegerval272digitsv_var = Display_SC_Running_received_display_drawIntegerval272digitsv_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_val270_var = function(Display_SC_Running_display_drawRect_val270_var) {
	this.Display_SC_Running_display_drawRect_val270_var = Display_SC_Running_display_drawRect_val270_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRect__var = function(Display_SC_Running_received_display_drawRect__var) {
	this.Display_SC_Running_received_display_drawRect__var = Display_SC_Running_received_display_drawRect__var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsize_var = function(Display_SC_Wait_received_display_createxsize_var) {
	this.Display_SC_Wait_received_display_createxsize_var = Display_SC_Wait_received_display_createxsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_val276_var = function(Display_SC_Running_display_update_val276_var) {
	this.Display_SC_Running_display_update_val276_var = Display_SC_Running_display_update_val276_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearval267_var = function(Display_SC_Running_received_display_clearval267_var) {
	this.Display_SC_Running_received_display_clearval267_var = Display_SC_Running_received_display_clearval267_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_val269_var = function(Display_SC_Running_display_setBGColor_val269_var) {
	this.Display_SC_Running_display_setBGColor_val269_var = Display_SC_Running_display_setBGColor_val269_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_val271_var = function(Display_SC_Running_display_fillRect_val271_var) {
	this.Display_SC_Running_display_fillRect_val271_var = Display_SC_Running_display_fillRect_val271_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorrg_var = function(Display_SC_Running_received_display_setBGColorrg_var) {
	this.Display_SC_Running_received_display_setBGColorrg_var = Display_SC_Running_received_display_setBGColorrg_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorr_var = function(Display_SC_Running_received_display_setColorr_var) {
	this.Display_SC_Running_received_display_setColorr_var = Display_SC_Running_received_display_setColorr_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_val268_var = function(Display_SC_Running_display_setColor_val268_var) {
	this.Display_SC_Running_display_setColor_val268_var = Display_SC_Running_display_setColor_val268_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tdisplay_create_val274 = ' + this.Display_SC_Wait_display_create_val274_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\treceived_display_setBGColorval269b = ' + this.Display_SC_Running_received_display_setBGColorval269b_var;
	result += '\n\treceived_display_drawRectwidthheightval270xy = ' + this.Display_SC_Running_received_display_drawRectwidthheightval270xy_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_clear_val267 = ' + this.Display_SC_Running_display_clear_val267_var;
	result += '\n\treceived_display_drawThingMLval273 = ' + this.Display_SC_Running_received_display_drawThingMLval273_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\treceived_display_fillRectyxwidthval271height = ' + this.Display_SC_Running_received_display_fillRectyxwidthval271height_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tdisplay_destroy_val275 = ' + this.Display_SC_Running_display_destroy_val275_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\treceived_display_updateval276 = ' + this.Display_SC_Running_received_display_updateval276_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\treceived_display_destroyval275 = ' + this.Display_SC_Running_received_display_destroyval275_var;
	result += '\n\treceived_display_createysizeval274 = ' + this.Display_SC_Wait_received_display_createysizeval274_var;
	result += '\n\treceived_display_drawThingMLyx = ' + this.Display_SC_Running_received_display_drawThingMLyx_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\treceived_display_drawIntegerscaleyx = ' + this.Display_SC_Running_received_display_drawIntegerscaleyx_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\treceived_display_setColorbval268g = ' + this.Display_SC_Running_received_display_setColorbval268g_var;
	result += '\n\treceived_display_fillRect_ = ' + this.Display_SC_Running_received_display_fillRect__var;
	result += '\n\tdisplay_drawThingML_val273 = ' + this.Display_SC_Running_display_drawThingML_val273_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tdisplay_drawInteger_val272 = ' + this.Display_SC_Running_display_drawInteger_val272_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\treceived_display_drawIntegerval272digitsv = ' + this.Display_SC_Running_received_display_drawIntegerval272digitsv_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tdisplay_drawRect_val270 = ' + this.Display_SC_Running_display_drawRect_val270_var;
	result += '\n\treceived_display_drawRect_ = ' + this.Display_SC_Running_received_display_drawRect__var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\treceived_display_createxsize = ' + this.Display_SC_Wait_received_display_createxsize_var;
	result += '\n\tdisplay_update_val276 = ' + this.Display_SC_Running_display_update_val276_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\treceived_display_clearval267 = ' + this.Display_SC_Running_received_display_clearval267_var;
	result += '\n\tdisplay_setBGColor_val269 = ' + this.Display_SC_Running_display_setBGColor_val269_var;
	result += '\n\tdisplay_fillRect_val271 = ' + this.Display_SC_Running_display_fillRect_val271_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\treceived_display_setBGColorrg = ' + this.Display_SC_Running_received_display_setBGColorrg_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\treceived_display_setColorr = ' + this.Display_SC_Running_received_display_setColorr_var;
	result += '\n\tdisplay_setColor_val268 = ' + this.Display_SC_Running_display_setColor_val268_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '';
	return result;
}

