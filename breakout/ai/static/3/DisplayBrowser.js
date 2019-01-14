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
		setTimeout(() => this.bus.emit('display?displayReadyval211', 0x2E, 0x48), 0);
		setTimeout(() => this.bus.emit('display?displayReady_', 0x73), 0);
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
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
	Display_SC_Running.to(null).when((fillRectwidthxheighty) => {
		return fillRectwidthxheighty._port === 'display' && fillRectwidthxheighty._msg === 'fillRectwidthxheighty';
	}).effect((fillRectwidthxheighty) => {
		this.Display_SC_Running_received_display_fillRectwidthxheighty_var = true;
		this.Display_SC_Running_display_fillRect_width_var = fillRectwidthxheighty.width;
		this.Display_SC_Running_display_fillRect_x_var = fillRectwidthxheighty.x;
		this.Display_SC_Running_display_fillRect_height_var = fillRectwidthxheighty.height;
		this.Display_SC_Running_display_fillRect_y_var = fillRectwidthxheighty.y;
		if(this.Display_SC_Running_received_display_fillRectval205_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectwidthxheighty_var = false;
		this.Display_SC_Running_received_display_fillRectval205_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectval205) => {
		return fillRectval205._port === 'display' && fillRectval205._msg === 'fillRectval205';
	}).effect((fillRectval205) => {
		this.Display_SC_Running_received_display_fillRectval205_var = true;
		this.Display_SC_Running_display_fillRect_val205_var = fillRectval205.val205;
		if(this.Display_SC_Running_received_display_fillRectwidthxheighty_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectval205_var = false;
		this.Display_SC_Running_received_display_fillRectwidthxheighty_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervxscaley) => {
		return drawIntegervxscaley._port === 'display' && drawIntegervxscaley._msg === 'drawIntegervxscaley';
	}).effect((drawIntegervxscaley) => {
		this.Display_SC_Running_received_display_drawIntegervxscaley_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervxscaley.v;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegervxscaley.x;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervxscaley.scale;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervxscaley.y;
		if(this.Display_SC_Running_received_display_drawIntegerval206digits_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervxscaley_var = false;
		this.Display_SC_Running_received_display_drawIntegerval206digits_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorbrgval202) => {
		return setColorbrgval202._port === 'display' && setColorbrgval202._msg === 'setColorbrgval202';
	}).effect((setColorbrgval202) => {
		this.Display_SC_Running_received_display_setColorbrgval202_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbrgval202.b;
		this.Display_SC_Running_display_setColor_r_var = setColorbrgval202.r;
		this.Display_SC_Running_display_setColor_g_var = setColorbrgval202.g;
		this.Display_SC_Running_display_setColor_val202_var = setColorbrgval202.val202;
		if(this.Display_SC_Running_received_display_setColor__var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbrgval202_var = false;
		this.Display_SC_Running_received_display_setColor__var = false;
		
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
	Display_SC_Running.to(null).when((drawRectyxval204) => {
		return drawRectyxval204._port === 'display' && drawRectyxval204._msg === 'drawRectyxval204';
	}).effect((drawRectyxval204) => {
		this.Display_SC_Running_received_display_drawRectyxval204_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyxval204.y;
		this.Display_SC_Running_display_drawRect_x_var = drawRectyxval204.x;
		this.Display_SC_Running_display_drawRect_val204_var = drawRectyxval204.val204;
		if(this.Display_SC_Running_received_display_drawRectheightwidth_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyxval204_var = false;
		this.Display_SC_Running_received_display_drawRectheightwidth_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysizexsize) => {
		return createysizexsize._port === 'display' && createysizexsize._msg === 'createysizexsize' && (this.Display_SC_Wait_received_display_createval208_var);
	}).effect((createysizexsize) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizexsize.ysize;
		this.Display_SC_Wait_display_create_xsize_var = createysizexsize.xsize;
		this.initDisplay(createysizexsize.xsize, createysizexsize.ysize);
		this.Display_SC_Wait_received_display_createysizexsize_var = false;
		this.Display_SC_Wait_received_display_createval208_var = false;
	});
	Display_SC_Wait.to(null).when((createysizexsize) => {
		return createysizexsize._port === 'display' && createysizexsize._msg === 'createysizexsize' && (!(this.Display_SC_Wait_received_display_createval208_var));
	}).effect((createysizexsize) => {
		this.Display_SC_Wait_received_display_createysizexsize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizexsize.ysize;
		this.Display_SC_Wait_display_create_xsize_var = createysizexsize.xsize;
	});
	Display_SC_Running.to(null).when((drawThingMLval207x) => {
		return drawThingMLval207x._port === 'display' && drawThingMLval207x._msg === 'drawThingMLval207x';
	}).effect((drawThingMLval207x) => {
		this.Display_SC_Running_received_display_drawThingMLval207x_var = true;
		this.Display_SC_Running_display_drawThingML_val207_var = drawThingMLval207x.val207;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLval207x.x;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLval207x_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorb) => {
		return setBGColorb._port === 'display' && setBGColorb._msg === 'setBGColorb';
	}).effect((setBGColorb) => {
		this.Display_SC_Running_received_display_setBGColorb_var = true;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorb.b;
		if(this.Display_SC_Running_received_display_setBGColorval203gr_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		this.Display_SC_Running_received_display_setBGColorval203gr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerval206digits) => {
		return drawIntegerval206digits._port === 'display' && drawIntegerval206digits._msg === 'drawIntegerval206digits';
	}).effect((drawIntegerval206digits) => {
		this.Display_SC_Running_received_display_drawIntegerval206digits_var = true;
		this.Display_SC_Running_display_drawInteger_val206_var = drawIntegerval206digits.val206;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerval206digits.digits;
		if(this.Display_SC_Running_received_display_drawIntegervxscaley_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerval206digits_var = false;
		this.Display_SC_Running_received_display_drawIntegervxscaley_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorval203gr) => {
		return setBGColorval203gr._port === 'display' && setBGColorval203gr._msg === 'setBGColorval203gr';
	}).effect((setBGColorval203gr) => {
		this.Display_SC_Running_received_display_setBGColorval203gr_var = true;
		this.Display_SC_Running_display_setBGColor_val203_var = setBGColorval203gr.val203;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorval203gr.g;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorval203gr.r;
		if(this.Display_SC_Running_received_display_setBGColorb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorval203gr_var = false;
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		
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
	Display_SC_Wait.to(Display_SC_Running).when((createval208) => {
		return createval208._port === 'display' && createval208._msg === 'createval208' && (this.Display_SC_Wait_received_display_createysizexsize_var);
	}).effect((createval208) => {
		this.Display_SC_Wait_display_create_val208_var = createval208.val208;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createval208_var = false;
		this.Display_SC_Wait_received_display_createysizexsize_var = false;
	});
	Display_SC_Wait.to(null).when((createval208) => {
		return createval208._port === 'display' && createval208._msg === 'createval208' && (!(this.Display_SC_Wait_received_display_createysizexsize_var));
	}).effect((createval208) => {
		this.Display_SC_Wait_received_display_createval208_var = true;
		this.Display_SC_Wait_display_create_val208_var = createval208.val208;
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
	Display_SC_Running.to(null).when((drawThingMLy) => {
		return drawThingMLy._port === 'display' && drawThingMLy._msg === 'drawThingMLy';
	}).effect((drawThingMLy) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy.y;
		if(this.Display_SC_Running_received_display_drawThingMLval207x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLval207x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectheightwidth) => {
		return drawRectheightwidth._port === 'display' && drawRectheightwidth._msg === 'drawRectheightwidth';
	}).effect((drawRectheightwidth) => {
		this.Display_SC_Running_received_display_drawRectheightwidth_var = true;
		this.Display_SC_Running_display_drawRect_height_var = drawRectheightwidth.height;
		this.Display_SC_Running_display_drawRect_width_var = drawRectheightwidth.width;
		if(this.Display_SC_Running_received_display_drawRectyxval204_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectheightwidth_var = false;
		this.Display_SC_Running_received_display_drawRectyxval204_var = false;
		
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
	Display_SC_Running.to(null).when((setColor_) => {
		return setColor_._port === 'display' && setColor_._msg === 'setColor_';
	}).effect((setColor_) => {
		this.Display_SC_Running_received_display_setColor__var = true;
		if(this.Display_SC_Running_received_display_setColorbrgval202_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColor__var = false;
		this.Display_SC_Running_received_display_setColorbrgval202_var = false;
		
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
		
		
		setTimeout(() => this.bus.emit('vctrl?positiony', 0x89, 0), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval214x', 0x77, posX, 0xE8), 0);
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			setTimeout(() => this.bus.emit('vctrl?velocityval213dy', 0xBA, 0x35, 0), 0);
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0x9F,  -8), 0);
			
				} else if (e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0x6E, 8), 0);
			setTimeout(() => this.bus.emit('vctrl?velocityval213dy', 0xF4, 0x9B, 0), 0);
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0x88, 0), 0);
			setTimeout(() => this.bus.emit('vctrl?velocityval213dy', 0xF6, 0x1D, 0), 0);
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		setTimeout(() => this.bus.emit('vctrl?positiony', 0x0F, 0), 0);
		setTimeout(() => this.bus.emit('vctrl?positionval214x', 0xD8, x, 0xEA), 0);
		
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

DisplayBrowser.prototype.receivecreateval208Ondisplay = function(val230, val208) {
	this._receive({_port:"display", _msg:"createval208", val230:val230, val208:val208});
}

DisplayBrowser.prototype.receivecreateysizexsizeOndisplay = function(ysize, val231, xsize) {
	this._receive({_port:"display", _msg:"createysizexsize", ysize:ysize, val231:val231, xsize:xsize});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(val240) {
	this._receive({_port:"display", _msg:"destroy_", val240:val240});
}

DisplayBrowser.prototype.receivedestroyval209Ondisplay = function(val241, val209) {
	this._receive({_port:"display", _msg:"destroyval209", val241:val241, val209:val209});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(val226) {
	this._receive({_port:"display", _msg:"update_", val226:val226});
}

DisplayBrowser.prototype.receiveupdateval210Ondisplay = function(val210, val227) {
	this._receive({_port:"display", _msg:"updateval210", val210:val210, val227:val227});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(val232) {
	this._receive({_port:"display", _msg:"clear_", val232:val232});
}

DisplayBrowser.prototype.receiveclearval201Ondisplay = function(val201, val233) {
	this._receive({_port:"display", _msg:"clearval201", val201:val201, val233:val233});
}

DisplayBrowser.prototype.receivesetColor_Ondisplay = function(val228) {
	this._receive({_port:"display", _msg:"setColor_", val228:val228});
}

DisplayBrowser.prototype.receivesetColorbrgval202Ondisplay = function(val229, b, g, r, val202) {
	this._receive({_port:"display", _msg:"setColorbrgval202", val229:val229, b:b, g:g, r:r, val202:val202});
}

DisplayBrowser.prototype.receivesetBGColorbOndisplay = function(b, val246) {
	this._receive({_port:"display", _msg:"setBGColorb", b:b, val246:val246});
}

DisplayBrowser.prototype.receivesetBGColorval203grOndisplay = function(val247, val203, r, g) {
	this._receive({_port:"display", _msg:"setBGColorval203gr", val247:val247, val203:val203, r:r, g:g});
}

DisplayBrowser.prototype.receivedrawRectheightwidthOndisplay = function(width, height, val234) {
	this._receive({_port:"display", _msg:"drawRectheightwidth", width:width, height:height, val234:val234});
}

DisplayBrowser.prototype.receivedrawRectyxval204Ondisplay = function(val204, x, y, val235) {
	this._receive({_port:"display", _msg:"drawRectyxval204", val204:val204, x:x, y:y, val235:val235});
}

DisplayBrowser.prototype.receivefillRectval205Ondisplay = function(val205, val242) {
	this._receive({_port:"display", _msg:"fillRectval205", val205:val205, val242:val242});
}

DisplayBrowser.prototype.receivefillRectwidthxheightyOndisplay = function(width, height, y, val243, x) {
	this._receive({_port:"display", _msg:"fillRectwidthxheighty", width:width, height:height, y:y, val243:val243, x:x});
}

DisplayBrowser.prototype.receivedrawIntegervxscaleyOndisplay = function(scale, val238, y, v, x) {
	this._receive({_port:"display", _msg:"drawIntegervxscaley", scale:scale, val238:val238, y:y, v:v, x:x});
}

DisplayBrowser.prototype.receivedrawIntegerval206digitsOndisplay = function(digits, val206, val239) {
	this._receive({_port:"display", _msg:"drawIntegerval206digits", digits:digits, val206:val206, val239:val239});
}

DisplayBrowser.prototype.receivedrawThingMLval207xOndisplay = function(x, val224, val207) {
	this._receive({_port:"display", _msg:"drawThingMLval207x", x:x, val224:val224, val207:val207});
}

DisplayBrowser.prototype.receivedrawThingMLyOndisplay = function(y, val225) {
	this._receive({_port:"display", _msg:"drawThingMLy", y:y, val225:val225});
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createval208_var = function(Display_SC_Wait_received_display_createval208_var) {
	this.Display_SC_Wait_received_display_createval208_var = Display_SC_Wait_received_display_createval208_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectval205_var = function(Display_SC_Running_received_display_fillRectval205_var) {
	this.Display_SC_Running_received_display_fillRectval205_var = Display_SC_Running_received_display_fillRectval205_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_val205_var = function(Display_SC_Running_display_fillRect_val205_var) {
	this.Display_SC_Running_display_fillRect_val205_var = Display_SC_Running_display_fillRect_val205_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
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

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegervxscaley_var = function(Display_SC_Running_received_display_drawIntegervxscaley_var) {
	this.Display_SC_Running_received_display_drawIntegervxscaley_var = Display_SC_Running_received_display_drawIntegervxscaley_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorval203gr_var = function(Display_SC_Running_received_display_setBGColorval203gr_var) {
	this.Display_SC_Running_received_display_setBGColorval203gr_var = Display_SC_Running_received_display_setBGColorval203gr_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_val210_var = function(Display_SC_Running_display_update_val210_var) {
	this.Display_SC_Running_display_update_val210_var = Display_SC_Running_display_update_val210_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorb_var = function(Display_SC_Running_received_display_setBGColorb_var) {
	this.Display_SC_Running_received_display_setBGColorb_var = Display_SC_Running_received_display_setBGColorb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_val204_var = function(Display_SC_Running_display_drawRect_val204_var) {
	this.Display_SC_Running_display_drawRect_val204_var = Display_SC_Running_display_drawRect_val204_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_val203_var = function(Display_SC_Running_display_setBGColor_val203_var) {
	this.Display_SC_Running_display_setBGColor_val203_var = Display_SC_Running_display_setBGColor_val203_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_val206_var = function(Display_SC_Running_display_drawInteger_val206_var) {
	this.Display_SC_Running_display_drawInteger_val206_var = Display_SC_Running_display_drawInteger_val206_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_val207_var = function(Display_SC_Running_display_drawThingML_val207_var) {
	this.Display_SC_Running_display_drawThingML_val207_var = Display_SC_Running_display_drawThingML_val207_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_val201_var = function(Display_SC_Running_display_clear_val201_var) {
	this.Display_SC_Running_display_clear_val201_var = Display_SC_Running_display_clear_val201_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_val208_var = function(Display_SC_Wait_display_create_val208_var) {
	this.Display_SC_Wait_display_create_val208_var = Display_SC_Wait_display_create_val208_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLy_var = function(Display_SC_Running_received_display_drawThingMLy_var) {
	this.Display_SC_Running_received_display_drawThingMLy_var = Display_SC_Running_received_display_drawThingMLy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectyxval204_var = function(Display_SC_Running_received_display_drawRectyxval204_var) {
	this.Display_SC_Running_received_display_drawRectyxval204_var = Display_SC_Running_received_display_drawRectyxval204_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectwidthxheighty_var = function(Display_SC_Running_received_display_fillRectwidthxheighty_var) {
	this.Display_SC_Running_received_display_fillRectwidthxheighty_var = Display_SC_Running_received_display_fillRectwidthxheighty_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLval207x_var = function(Display_SC_Running_received_display_drawThingMLval207x_var) {
	this.Display_SC_Running_received_display_drawThingMLval207x_var = Display_SC_Running_received_display_drawThingMLval207x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColor__var = function(Display_SC_Running_received_display_setColor__var) {
	this.Display_SC_Running_received_display_setColor__var = Display_SC_Running_received_display_setColor__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerval206digits_var = function(Display_SC_Running_received_display_drawIntegerval206digits_var) {
	this.Display_SC_Running_received_display_drawIntegerval206digits_var = Display_SC_Running_received_display_drawIntegerval206digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorbrgval202_var = function(Display_SC_Running_received_display_setColorbrgval202_var) {
	this.Display_SC_Running_received_display_setColorbrgval202_var = Display_SC_Running_received_display_setColorbrgval202_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyval209_var = function(Display_SC_Running_received_display_destroyval209_var) {
	this.Display_SC_Running_received_display_destroyval209_var = Display_SC_Running_received_display_destroyval209_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_val209_var = function(Display_SC_Running_display_destroy_val209_var) {
	this.Display_SC_Running_display_destroy_val209_var = Display_SC_Running_display_destroy_val209_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createysizexsize_var = function(Display_SC_Wait_received_display_createysizexsize_var) {
	this.Display_SC_Wait_received_display_createysizexsize_var = Display_SC_Wait_received_display_createysizexsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectheightwidth_var = function(Display_SC_Running_received_display_drawRectheightwidth_var) {
	this.Display_SC_Running_received_display_drawRectheightwidth_var = Display_SC_Running_received_display_drawRectheightwidth_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearval201_var = function(Display_SC_Running_received_display_clearval201_var) {
	this.Display_SC_Running_received_display_clearval201_var = Display_SC_Running_received_display_clearval201_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updateval210_var = function(Display_SC_Running_received_display_updateval210_var) {
	this.Display_SC_Running_received_display_updateval210_var = Display_SC_Running_received_display_updateval210_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_val202_var = function(Display_SC_Running_display_setColor_val202_var) {
	this.Display_SC_Running_display_setColor_val202_var = Display_SC_Running_display_setColor_val202_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\treceived_display_createval208 = ' + this.Display_SC_Wait_received_display_createval208_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\treceived_display_fillRectval205 = ' + this.Display_SC_Running_received_display_fillRectval205_var;
	result += '\n\tdisplay_fillRect_val205 = ' + this.Display_SC_Running_display_fillRect_val205_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\treceived_display_drawIntegervxscaley = ' + this.Display_SC_Running_received_display_drawIntegervxscaley_var;
	result += '\n\treceived_display_setBGColorval203gr = ' + this.Display_SC_Running_received_display_setBGColorval203gr_var;
	result += '\n\tdisplay_update_val210 = ' + this.Display_SC_Running_display_update_val210_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\treceived_display_setBGColorb = ' + this.Display_SC_Running_received_display_setBGColorb_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tdisplay_drawRect_val204 = ' + this.Display_SC_Running_display_drawRect_val204_var;
	result += '\n\tdisplay_setBGColor_val203 = ' + this.Display_SC_Running_display_setBGColor_val203_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_drawInteger_val206 = ' + this.Display_SC_Running_display_drawInteger_val206_var;
	result += '\n\tdisplay_drawThingML_val207 = ' + this.Display_SC_Running_display_drawThingML_val207_var;
	result += '\n\tdisplay_clear_val201 = ' + this.Display_SC_Running_display_clear_val201_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tdisplay_create_val208 = ' + this.Display_SC_Wait_display_create_val208_var;
	result += '\n\treceived_display_drawThingMLy = ' + this.Display_SC_Running_received_display_drawThingMLy_var;
	result += '\n\treceived_display_drawRectyxval204 = ' + this.Display_SC_Running_received_display_drawRectyxval204_var;
	result += '\n\treceived_display_fillRectwidthxheighty = ' + this.Display_SC_Running_received_display_fillRectwidthxheighty_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\treceived_display_drawThingMLval207x = ' + this.Display_SC_Running_received_display_drawThingMLval207x_var;
	result += '\n\treceived_display_setColor_ = ' + this.Display_SC_Running_received_display_setColor__var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\treceived_display_drawIntegerval206digits = ' + this.Display_SC_Running_received_display_drawIntegerval206digits_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\treceived_display_setColorbrgval202 = ' + this.Display_SC_Running_received_display_setColorbrgval202_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\treceived_display_destroyval209 = ' + this.Display_SC_Running_received_display_destroyval209_var;
	result += '\n\tdisplay_destroy_val209 = ' + this.Display_SC_Running_display_destroy_val209_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\treceived_display_createysizexsize = ' + this.Display_SC_Wait_received_display_createysizexsize_var;
	result += '\n\treceived_display_drawRectheightwidth = ' + this.Display_SC_Running_received_display_drawRectheightwidth_var;
	result += '\n\treceived_display_clearval201 = ' + this.Display_SC_Running_received_display_clearval201_var;
	result += '\n\treceived_display_updateval210 = ' + this.Display_SC_Running_received_display_updateval210_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_setColor_val202 = ' + this.Display_SC_Running_display_setColor_val202_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '';
	return result;
}

