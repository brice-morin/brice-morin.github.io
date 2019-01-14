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
		setTimeout(() => this.bus.emit('display?displayReadyval277', 0xF0, 0xF6), 0);
		setTimeout(() => this.bus.emit('display?displayReady_', 0x92), 0);
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((setColorrb) => {
		return setColorrb._port === 'display' && setColorrb._msg === 'setColorrb';
	}).effect((setColorrb) => {
		this.Display_SC_Running_received_display_setColorrb_var = true;
		this.Display_SC_Running_display_setColor_r_var = setColorrb.r;
		this.Display_SC_Running_display_setColor_b_var = setColorrb.b;
		if(this.Display_SC_Running_received_display_setColorgval268_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorrb_var = false;
		this.Display_SC_Running_received_display_setColorgval268_var = false;
		
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
	Display_SC_Running.to(null).when((setBGColorgval269) => {
		return setBGColorgval269._port === 'display' && setBGColorgval269._msg === 'setBGColorgval269';
	}).effect((setBGColorgval269) => {
		this.Display_SC_Running_received_display_setBGColorgval269_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorgval269.g;
		this.Display_SC_Running_display_setBGColor_val269_var = setBGColorgval269.val269;
		if(this.Display_SC_Running_received_display_setBGColorrb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorgval269_var = false;
		this.Display_SC_Running_received_display_setBGColorrb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRect_) => {
		return drawRect_._port === 'display' && drawRect_._msg === 'drawRect_';
	}).effect((drawRect_) => {
		this.Display_SC_Running_received_display_drawRect__var = true;
		if(this.Display_SC_Running_received_display_drawRectwidthyxheightval270_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRect__var = false;
		this.Display_SC_Running_received_display_drawRectwidthyxheightval270_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerval272scaleydigits) => {
		return drawIntegerval272scaleydigits._port === 'display' && drawIntegerval272scaleydigits._msg === 'drawIntegerval272scaleydigits';
	}).effect((drawIntegerval272scaleydigits) => {
		this.Display_SC_Running_received_display_drawIntegerval272scaleydigits_var = true;
		this.Display_SC_Running_display_drawInteger_val272_var = drawIntegerval272scaleydigits.val272;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerval272scaleydigits.scale;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerval272scaleydigits.y;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerval272scaleydigits.digits;
		if(this.Display_SC_Running_received_display_drawIntegervx_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerval272scaleydigits_var = false;
		this.Display_SC_Running_received_display_drawIntegervx_var = false;
		
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
	Display_SC_Running.to(null).when((setBGColorrb) => {
		return setBGColorrb._port === 'display' && setBGColorrb._msg === 'setBGColorrb';
	}).effect((setBGColorrb) => {
		this.Display_SC_Running_received_display_setBGColorrb_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrb.r;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorrb.b;
		if(this.Display_SC_Running_received_display_setBGColorgval269_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrb_var = false;
		this.Display_SC_Running_received_display_setBGColorgval269_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createval274) => {
		return createval274._port === 'display' && createval274._msg === 'createval274' && (this.Display_SC_Wait_received_display_createysizexsize_var);
	}).effect((createval274) => {
		this.Display_SC_Wait_display_create_val274_var = createval274.val274;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createval274_var = false;
		this.Display_SC_Wait_received_display_createysizexsize_var = false;
	});
	Display_SC_Wait.to(null).when((createval274) => {
		return createval274._port === 'display' && createval274._msg === 'createval274' && (!(this.Display_SC_Wait_received_display_createysizexsize_var));
	}).effect((createval274) => {
		this.Display_SC_Wait_received_display_createval274_var = true;
		this.Display_SC_Wait_display_create_val274_var = createval274.val274;
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
	Display_SC_Running.to(null).when((fillRectyxwidth) => {
		return fillRectyxwidth._port === 'display' && fillRectyxwidth._msg === 'fillRectyxwidth';
	}).effect((fillRectyxwidth) => {
		this.Display_SC_Running_received_display_fillRectyxwidth_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyxwidth.y;
		this.Display_SC_Running_display_fillRect_x_var = fillRectyxwidth.x;
		this.Display_SC_Running_display_fillRect_width_var = fillRectyxwidth.width;
		if(this.Display_SC_Running_received_display_fillRectval271height_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyxwidth_var = false;
		this.Display_SC_Running_received_display_fillRectval271height_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysizexsize) => {
		return createysizexsize._port === 'display' && createysizexsize._msg === 'createysizexsize' && (this.Display_SC_Wait_received_display_createval274_var);
	}).effect((createysizexsize) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizexsize.ysize;
		this.Display_SC_Wait_display_create_xsize_var = createysizexsize.xsize;
		this.initDisplay(createysizexsize.xsize, createysizexsize.ysize);
		this.Display_SC_Wait_received_display_createysizexsize_var = false;
		this.Display_SC_Wait_received_display_createval274_var = false;
	});
	Display_SC_Wait.to(null).when((createysizexsize) => {
		return createysizexsize._port === 'display' && createysizexsize._msg === 'createysizexsize' && (!(this.Display_SC_Wait_received_display_createval274_var));
	}).effect((createysizexsize) => {
		this.Display_SC_Wait_received_display_createysizexsize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizexsize.ysize;
		this.Display_SC_Wait_display_create_xsize_var = createysizexsize.xsize;
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
	Display_SC_Running.to(null).when((fillRectval271height) => {
		return fillRectval271height._port === 'display' && fillRectval271height._msg === 'fillRectval271height';
	}).effect((fillRectval271height) => {
		this.Display_SC_Running_received_display_fillRectval271height_var = true;
		this.Display_SC_Running_display_fillRect_val271_var = fillRectval271height.val271;
		this.Display_SC_Running_display_fillRect_height_var = fillRectval271height.height;
		if(this.Display_SC_Running_received_display_fillRectyxwidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectval271height_var = false;
		this.Display_SC_Running_received_display_fillRectyxwidth_var = false;
		
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
	Display_SC_Running.to(null).when((drawThingMLval273x) => {
		return drawThingMLval273x._port === 'display' && drawThingMLval273x._msg === 'drawThingMLval273x';
	}).effect((drawThingMLval273x) => {
		this.Display_SC_Running_received_display_drawThingMLval273x_var = true;
		this.Display_SC_Running_display_drawThingML_val273_var = drawThingMLval273x.val273;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLval273x.x;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLval273x_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLy) => {
		return drawThingMLy._port === 'display' && drawThingMLy._msg === 'drawThingMLy';
	}).effect((drawThingMLy) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy.y;
		if(this.Display_SC_Running_received_display_drawThingMLval273x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLval273x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorgval268) => {
		return setColorgval268._port === 'display' && setColorgval268._msg === 'setColorgval268';
	}).effect((setColorgval268) => {
		this.Display_SC_Running_received_display_setColorgval268_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgval268.g;
		this.Display_SC_Running_display_setColor_val268_var = setColorgval268.val268;
		if(this.Display_SC_Running_received_display_setColorrb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgval268_var = false;
		this.Display_SC_Running_received_display_setColorrb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectwidthyxheightval270) => {
		return drawRectwidthyxheightval270._port === 'display' && drawRectwidthyxheightval270._msg === 'drawRectwidthyxheightval270';
	}).effect((drawRectwidthyxheightval270) => {
		this.Display_SC_Running_received_display_drawRectwidthyxheightval270_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthyxheightval270.width;
		this.Display_SC_Running_display_drawRect_y_var = drawRectwidthyxheightval270.y;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthyxheightval270.x;
		this.Display_SC_Running_display_drawRect_height_var = drawRectwidthyxheightval270.height;
		this.Display_SC_Running_display_drawRect_val270_var = drawRectwidthyxheightval270.val270;
		if(this.Display_SC_Running_received_display_drawRect__var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthyxheightval270_var = false;
		this.Display_SC_Running_received_display_drawRect__var = false;
		
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
	Display_SC_Running.to(null).when((drawIntegervx) => {
		return drawIntegervx._port === 'display' && drawIntegervx._msg === 'drawIntegervx';
	}).effect((drawIntegervx) => {
		this.Display_SC_Running_received_display_drawIntegervx_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervx.v;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegervx.x;
		if(this.Display_SC_Running_received_display_drawIntegerval272scaleydigits_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervx_var = false;
		this.Display_SC_Running_received_display_drawIntegerval272scaleydigits_var = false;
		
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
		
		
		setTimeout(() => this.bus.emit('vctrl?positiony', 0, 0xB8), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval280x', 0x46, 0x1F, posX), 0);
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval279dx', 0x94,  -8, 0xB7), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0, 0xBC), 0);
			
				} else if (e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0, 0xCD), 0);
			setTimeout(() => this.bus.emit('vctrl?velocityval279dx', 0x7D, 8, 0x64), 0);
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0, 0xB4), 0);
			setTimeout(() => this.bus.emit('vctrl?velocityval279dx', 0x02, 0, 0x16), 0);
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		setTimeout(() => this.bus.emit('vctrl?positionval280x', 0xBD, 0xD0, x), 0);
		setTimeout(() => this.bus.emit('vctrl?positiony', 0, 0x10), 0);
		
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

DisplayBrowser.prototype.receivecreateysizexsizeOndisplay = function(xsize, val294, ysize) {
	this._receive({_port:"display", _msg:"createysizexsize", xsize:xsize, val294:val294, ysize:ysize});
}

DisplayBrowser.prototype.receivecreateval274Ondisplay = function(val295, val274) {
	this._receive({_port:"display", _msg:"createval274", val295:val295, val274:val274});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(val296) {
	this._receive({_port:"display", _msg:"destroy_", val296:val296});
}

DisplayBrowser.prototype.receivedestroyval275Ondisplay = function(val297, val275) {
	this._receive({_port:"display", _msg:"destroyval275", val297:val297, val275:val275});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(val312) {
	this._receive({_port:"display", _msg:"update_", val312:val312});
}

DisplayBrowser.prototype.receiveupdateval276Ondisplay = function(val276, val313) {
	this._receive({_port:"display", _msg:"updateval276", val276:val276, val313:val313});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(val300) {
	this._receive({_port:"display", _msg:"clear_", val300:val300});
}

DisplayBrowser.prototype.receiveclearval267Ondisplay = function(val301, val267) {
	this._receive({_port:"display", _msg:"clearval267", val301:val301, val267:val267});
}

DisplayBrowser.prototype.receivesetColorrbOndisplay = function(r, val308, b) {
	this._receive({_port:"display", _msg:"setColorrb", r:r, val308:val308, b:b});
}

DisplayBrowser.prototype.receivesetColorgval268Ondisplay = function(g, val268, val309) {
	this._receive({_port:"display", _msg:"setColorgval268", g:g, val268:val268, val309:val309});
}

DisplayBrowser.prototype.receivesetBGColorrbOndisplay = function(val310, b, r) {
	this._receive({_port:"display", _msg:"setBGColorrb", val310:val310, b:b, r:r});
}

DisplayBrowser.prototype.receivesetBGColorgval269Ondisplay = function(val269, g, val311) {
	this._receive({_port:"display", _msg:"setBGColorgval269", val269:val269, g:g, val311:val311});
}

DisplayBrowser.prototype.receivedrawRect_Ondisplay = function(val302) {
	this._receive({_port:"display", _msg:"drawRect_", val302:val302});
}

DisplayBrowser.prototype.receivedrawRectwidthyxheightval270Ondisplay = function(height, x, width, val270, val303, y) {
	this._receive({_port:"display", _msg:"drawRectwidthyxheightval270", height:height, x:x, width:width, val270:val270, val303:val303, y:y});
}

DisplayBrowser.prototype.receivefillRectval271heightOndisplay = function(val292, val271, height) {
	this._receive({_port:"display", _msg:"fillRectval271height", val292:val292, val271:val271, height:height});
}

DisplayBrowser.prototype.receivefillRectyxwidthOndisplay = function(y, val293, x, width) {
	this._receive({_port:"display", _msg:"fillRectyxwidth", y:y, val293:val293, x:x, width:width});
}

DisplayBrowser.prototype.receivedrawIntegerval272scaleydigitsOndisplay = function(val272, scale, val306, digits, y) {
	this._receive({_port:"display", _msg:"drawIntegerval272scaleydigits", val272:val272, scale:scale, val306:val306, digits:digits, y:y});
}

DisplayBrowser.prototype.receivedrawIntegervxOndisplay = function(val307, v, x) {
	this._receive({_port:"display", _msg:"drawIntegervx", val307:val307, v:v, x:x});
}

DisplayBrowser.prototype.receivedrawThingMLval273xOndisplay = function(val290, val273, x) {
	this._receive({_port:"display", _msg:"drawThingMLval273x", val290:val290, val273:val273, x:x});
}

DisplayBrowser.prototype.receivedrawThingMLyOndisplay = function(y, val291) {
	this._receive({_port:"display", _msg:"drawThingMLy", y:y, val291:val291});
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectwidthyxheightval270_var = function(Display_SC_Running_received_display_drawRectwidthyxheightval270_var) {
	this.Display_SC_Running_received_display_drawRectwidthyxheightval270_var = Display_SC_Running_received_display_drawRectwidthyxheightval270_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_val272_var = function(Display_SC_Running_display_drawInteger_val272_var) {
	this.Display_SC_Running_display_drawInteger_val272_var = Display_SC_Running_display_drawInteger_val272_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerval272scaleydigits_var = function(Display_SC_Running_received_display_drawIntegerval272scaleydigits_var) {
	this.Display_SC_Running_received_display_drawIntegerval272scaleydigits_var = Display_SC_Running_received_display_drawIntegerval272scaleydigits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_val273_var = function(Display_SC_Running_display_drawThingML_val273_var) {
	this.Display_SC_Running_display_drawThingML_val273_var = Display_SC_Running_display_drawThingML_val273_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLy_var = function(Display_SC_Running_received_display_drawThingMLy_var) {
	this.Display_SC_Running_received_display_drawThingMLy_var = Display_SC_Running_received_display_drawThingMLy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_val274_var = function(Display_SC_Wait_display_create_val274_var) {
	this.Display_SC_Wait_display_create_val274_var = Display_SC_Wait_display_create_val274_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorgval268_var = function(Display_SC_Running_received_display_setColorgval268_var) {
	this.Display_SC_Running_received_display_setColorgval268_var = Display_SC_Running_received_display_setColorgval268_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_val271_var = function(Display_SC_Running_display_fillRect_val271_var) {
	this.Display_SC_Running_display_fillRect_val271_var = Display_SC_Running_display_fillRect_val271_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectyxwidth_var = function(Display_SC_Running_received_display_fillRectyxwidth_var) {
	this.Display_SC_Running_received_display_fillRectyxwidth_var = Display_SC_Running_received_display_fillRectyxwidth_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_val270_var = function(Display_SC_Running_display_drawRect_val270_var) {
	this.Display_SC_Running_display_drawRect_val270_var = Display_SC_Running_display_drawRect_val270_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyval275_var = function(Display_SC_Running_received_display_destroyval275_var) {
	this.Display_SC_Running_received_display_destroyval275_var = Display_SC_Running_received_display_destroyval275_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updateval276_var = function(Display_SC_Running_received_display_updateval276_var) {
	this.Display_SC_Running_received_display_updateval276_var = Display_SC_Running_received_display_updateval276_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createval274_var = function(Display_SC_Wait_received_display_createval274_var) {
	this.Display_SC_Wait_received_display_createval274_var = Display_SC_Wait_received_display_createval274_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRect__var = function(Display_SC_Running_received_display_drawRect__var) {
	this.Display_SC_Running_received_display_drawRect__var = Display_SC_Running_received_display_drawRect__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegervx_var = function(Display_SC_Running_received_display_drawIntegervx_var) {
	this.Display_SC_Running_received_display_drawIntegervx_var = Display_SC_Running_received_display_drawIntegervx_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_val276_var = function(Display_SC_Running_display_update_val276_var) {
	this.Display_SC_Running_display_update_val276_var = Display_SC_Running_display_update_val276_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorrb_var = function(Display_SC_Running_received_display_setBGColorrb_var) {
	this.Display_SC_Running_received_display_setBGColorrb_var = Display_SC_Running_received_display_setBGColorrb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLval273x_var = function(Display_SC_Running_received_display_drawThingMLval273x_var) {
	this.Display_SC_Running_received_display_drawThingMLval273x_var = Display_SC_Running_received_display_drawThingMLval273x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorrb_var = function(Display_SC_Running_received_display_setColorrb_var) {
	this.Display_SC_Running_received_display_setColorrb_var = Display_SC_Running_received_display_setColorrb_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_val269_var = function(Display_SC_Running_display_setBGColor_val269_var) {
	this.Display_SC_Running_display_setBGColor_val269_var = Display_SC_Running_display_setBGColor_val269_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_val267_var = function(Display_SC_Running_display_clear_val267_var) {
	this.Display_SC_Running_display_clear_val267_var = Display_SC_Running_display_clear_val267_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_val275_var = function(Display_SC_Running_display_destroy_val275_var) {
	this.Display_SC_Running_display_destroy_val275_var = Display_SC_Running_display_destroy_val275_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorgval269_var = function(Display_SC_Running_received_display_setBGColorgval269_var) {
	this.Display_SC_Running_received_display_setBGColorgval269_var = Display_SC_Running_received_display_setBGColorgval269_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearval267_var = function(Display_SC_Running_received_display_clearval267_var) {
	this.Display_SC_Running_received_display_clearval267_var = Display_SC_Running_received_display_clearval267_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_val268_var = function(Display_SC_Running_display_setColor_val268_var) {
	this.Display_SC_Running_display_setColor_val268_var = Display_SC_Running_display_setColor_val268_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createysizexsize_var = function(Display_SC_Wait_received_display_createysizexsize_var) {
	this.Display_SC_Wait_received_display_createysizexsize_var = Display_SC_Wait_received_display_createysizexsize_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectval271height_var = function(Display_SC_Running_received_display_fillRectval271height_var) {
	this.Display_SC_Running_received_display_fillRectval271height_var = Display_SC_Running_received_display_fillRectval271height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\treceived_display_drawRectwidthyxheightval270 = ' + this.Display_SC_Running_received_display_drawRectwidthyxheightval270_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_drawInteger_val272 = ' + this.Display_SC_Running_display_drawInteger_val272_var;
	result += '\n\treceived_display_drawIntegerval272scaleydigits = ' + this.Display_SC_Running_received_display_drawIntegerval272scaleydigits_var;
	result += '\n\tdisplay_drawThingML_val273 = ' + this.Display_SC_Running_display_drawThingML_val273_var;
	result += '\n\treceived_display_drawThingMLy = ' + this.Display_SC_Running_received_display_drawThingMLy_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_create_val274 = ' + this.Display_SC_Wait_display_create_val274_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\treceived_display_setColorgval268 = ' + this.Display_SC_Running_received_display_setColorgval268_var;
	result += '\n\tdisplay_fillRect_val271 = ' + this.Display_SC_Running_display_fillRect_val271_var;
	result += '\n\treceived_display_fillRectyxwidth = ' + this.Display_SC_Running_received_display_fillRectyxwidth_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tdisplay_drawRect_val270 = ' + this.Display_SC_Running_display_drawRect_val270_var;
	result += '\n\treceived_display_destroyval275 = ' + this.Display_SC_Running_received_display_destroyval275_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\treceived_display_updateval276 = ' + this.Display_SC_Running_received_display_updateval276_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\treceived_display_createval274 = ' + this.Display_SC_Wait_received_display_createval274_var;
	result += '\n\treceived_display_drawRect_ = ' + this.Display_SC_Running_received_display_drawRect__var;
	result += '\n\treceived_display_drawIntegervx = ' + this.Display_SC_Running_received_display_drawIntegervx_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tdisplay_update_val276 = ' + this.Display_SC_Running_display_update_val276_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\treceived_display_setBGColorrb = ' + this.Display_SC_Running_received_display_setBGColorrb_var;
	result += '\n\treceived_display_drawThingMLval273x = ' + this.Display_SC_Running_received_display_drawThingMLval273x_var;
	result += '\n\treceived_display_setColorrb = ' + this.Display_SC_Running_received_display_setColorrb_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_setBGColor_val269 = ' + this.Display_SC_Running_display_setBGColor_val269_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_clear_val267 = ' + this.Display_SC_Running_display_clear_val267_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tdisplay_destroy_val275 = ' + this.Display_SC_Running_display_destroy_val275_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\treceived_display_setBGColorgval269 = ' + this.Display_SC_Running_received_display_setBGColorgval269_var;
	result += '\n\treceived_display_clearval267 = ' + this.Display_SC_Running_received_display_clearval267_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tdisplay_setColor_val268 = ' + this.Display_SC_Running_display_setColor_val268_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\treceived_display_createysizexsize = ' + this.Display_SC_Wait_received_display_createysizexsize_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\treceived_display_fillRectval271height = ' + this.Display_SC_Running_received_display_fillRectval271height_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '';
	return result;
}

