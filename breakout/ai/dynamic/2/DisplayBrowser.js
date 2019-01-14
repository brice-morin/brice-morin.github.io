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
		if(24 < 95) {
		setTimeout(() => this.bus.emit('display?displayReadyvar225', 0xD4, 0x0B), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar225_bis', 0x91, 0x0B), 0);
		
		}
		if(85 < 223) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x32), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0x4A), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((drawIntegerdigitsy_bis) => {
		return drawIntegerdigitsy_bis._port === 'display' && drawIntegerdigitsy_bis._msg === 'drawIntegerdigitsy_bis';
	}).effect((drawIntegerdigitsy_bis) => {
		this.Display_SC_Running_received_display_drawIntegerdigitsy_var = true;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerdigitsy_bis.digits;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerdigitsy_bis.y;
		if(this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerdigitsy_var = false;
		this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorvar217g_bis) => {
		return setBGColorvar217g_bis._port === 'display' && setBGColorvar217g_bis._msg === 'setBGColorvar217g_bis';
	}).effect((setBGColorvar217g_bis) => {
		this.Display_SC_Running_received_display_setBGColorvar217g_var = true;
		this.Display_SC_Running_display_setBGColor_var217_var = setBGColorvar217g_bis.var217;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorvar217g_bis.g;
		if(this.Display_SC_Running_received_display_setBGColorrb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar217g_var = false;
		this.Display_SC_Running_received_display_setBGColorrb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectyheightvar219widthx_bis) => {
		return fillRectyheightvar219widthx_bis._port === 'display' && fillRectyheightvar219widthx_bis._msg === 'fillRectyheightvar219widthx_bis';
	}).effect((fillRectyheightvar219widthx_bis) => {
		this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyheightvar219widthx_bis.y;
		this.Display_SC_Running_display_fillRect_height_var = fillRectyheightvar219widthx_bis.height;
		this.Display_SC_Running_display_fillRect_var219_var = fillRectyheightvar219widthx_bis.var219;
		this.Display_SC_Running_display_fillRect_width_var = fillRectyheightvar219widthx_bis.width;
		this.Display_SC_Running_display_fillRect_x_var = fillRectyheightvar219widthx_bis.x;
		if(this.Display_SC_Running_received_display_fillRect__var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var = false;
		this.Display_SC_Running_received_display_fillRect__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear__bis) => {
		return clear__bis._port === 'display' && clear__bis._msg === 'clear__bis';
	}).effect((clear__bis) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar215_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar215_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar224_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar224_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingML_) => {
		return drawThingML_._port === 'display' && drawThingML_._msg === 'drawThingML_';
	}).effect((drawThingML_) => {
		this.Display_SC_Running_received_display_drawThingML__var = true;
		if(this.Display_SC_Running_received_display_drawThingMLxyvar221_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingML__var = false;
		this.Display_SC_Running_received_display_drawThingMLxyvar221_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLxyvar221_bis) => {
		return drawThingMLxyvar221_bis._port === 'display' && drawThingMLxyvar221_bis._msg === 'drawThingMLxyvar221_bis';
	}).effect((drawThingMLxyvar221_bis) => {
		this.Display_SC_Running_received_display_drawThingMLxyvar221_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxyvar221_bis.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLxyvar221_bis.y;
		this.Display_SC_Running_display_drawThingML_var221_var = drawThingMLxyvar221_bis.var221;
		if(this.Display_SC_Running_received_display_drawThingML__var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxyvar221_var = false;
		this.Display_SC_Running_received_display_drawThingML__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRect_) => {
		return fillRect_._port === 'display' && fillRect_._msg === 'fillRect_';
	}).effect((fillRect_) => {
		this.Display_SC_Running_received_display_fillRect__var = true;
		if(this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRect__var = false;
		this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorbr_bis) => {
		return setColorbr_bis._port === 'display' && setColorbr_bis._msg === 'setColorbr_bis';
	}).effect((setColorbr_bis) => {
		this.Display_SC_Running_received_display_setColorbr_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbr_bis.b;
		this.Display_SC_Running_display_setColor_r_var = setColorbr_bis.r;
		if(this.Display_SC_Running_received_display_setColorgvar216_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbr_var = false;
		this.Display_SC_Running_received_display_setColorgvar216_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectyheightvar219widthx) => {
		return fillRectyheightvar219widthx._port === 'display' && fillRectyheightvar219widthx._msg === 'fillRectyheightvar219widthx';
	}).effect((fillRectyheightvar219widthx) => {
		this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyheightvar219widthx.y;
		this.Display_SC_Running_display_fillRect_height_var = fillRectyheightvar219widthx.height;
		this.Display_SC_Running_display_fillRect_var219_var = fillRectyheightvar219widthx.var219;
		this.Display_SC_Running_display_fillRect_width_var = fillRectyheightvar219widthx.width;
		this.Display_SC_Running_display_fillRect_x_var = fillRectyheightvar219widthx.x;
		if(this.Display_SC_Running_received_display_fillRect__var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var = false;
		this.Display_SC_Running_received_display_fillRect__var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createvar222_bis) => {
		return createvar222_bis._port === 'display' && createvar222_bis._msg === 'createvar222_bis' && (this.Display_SC_Wait_received_display_createxsizeysize_var);
	}).effect((createvar222_bis) => {
		this.Display_SC_Wait_display_create_var222_var = createvar222_bis.var222;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createvar222_var = false;
		this.Display_SC_Wait_received_display_createxsizeysize_var = false;
	});
	Display_SC_Wait.to(null).when((createvar222_bis) => {
		return createvar222_bis._port === 'display' && createvar222_bis._msg === 'createvar222_bis' && (!(this.Display_SC_Wait_received_display_createxsizeysize_var));
	}).effect((createvar222_bis) => {
		this.Display_SC_Wait_received_display_createvar222_var = true;
		this.Display_SC_Wait_display_create_var222_var = createvar222_bis.var222;
	});
	Display_SC_Running.to(null).when((update__bis) => {
		return update__bis._port === 'display' && update__bis._msg === 'update__bis';
	}).effect((update__bis) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar224_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar224_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectvar218widthheight) => {
		return drawRectvar218widthheight._port === 'display' && drawRectvar218widthheight._msg === 'drawRectvar218widthheight';
	}).effect((drawRectvar218widthheight) => {
		this.Display_SC_Running_received_display_drawRectvar218widthheight_var = true;
		this.Display_SC_Running_display_drawRect_var218_var = drawRectvar218widthheight.var218;
		this.Display_SC_Running_display_drawRect_width_var = drawRectvar218widthheight.width;
		this.Display_SC_Running_display_drawRect_height_var = drawRectvar218widthheight.height;
		if(this.Display_SC_Running_received_display_drawRectxy_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectvar218widthheight_var = false;
		this.Display_SC_Running_received_display_drawRectxy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearvar215_bis) => {
		return clearvar215_bis._port === 'display' && clearvar215_bis._msg === 'clearvar215_bis';
	}).effect((clearvar215_bis) => {
		this.Display_SC_Running_received_display_clearvar215_var = true;
		this.Display_SC_Running_display_clear_var215_var = clearvar215_bis.var215;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar215_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLxyvar221) => {
		return drawThingMLxyvar221._port === 'display' && drawThingMLxyvar221._msg === 'drawThingMLxyvar221';
	}).effect((drawThingMLxyvar221) => {
		this.Display_SC_Running_received_display_drawThingMLxyvar221_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxyvar221.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLxyvar221.y;
		this.Display_SC_Running_display_drawThingML_var221_var = drawThingMLxyvar221.var221;
		if(this.Display_SC_Running_received_display_drawThingML__var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxyvar221_var = false;
		this.Display_SC_Running_received_display_drawThingML__var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar223) => {
		return destroyvar223._port === 'display' && destroyvar223._msg === 'destroyvar223' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar223) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar223_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar223) => {
		return destroyvar223._port === 'display' && destroyvar223._msg === 'destroyvar223' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar223) => {
		this.Display_SC_Running_received_display_destroyvar223_var = true;
	});
	Display_SC_Running.to(null).when((drawIntegerdigitsy) => {
		return drawIntegerdigitsy._port === 'display' && drawIntegerdigitsy._msg === 'drawIntegerdigitsy';
	}).effect((drawIntegerdigitsy) => {
		this.Display_SC_Running_received_display_drawIntegerdigitsy_var = true;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerdigitsy.digits;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerdigitsy.y;
		if(this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerdigitsy_var = false;
		this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrb_bis) => {
		return setBGColorrb_bis._port === 'display' && setBGColorrb_bis._msg === 'setBGColorrb_bis';
	}).effect((setBGColorrb_bis) => {
		this.Display_SC_Running_received_display_setBGColorrb_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrb_bis.r;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorrb_bis.b;
		if(this.Display_SC_Running_received_display_setBGColorvar217g_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrb_var = false;
		this.Display_SC_Running_received_display_setBGColorvar217g_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createvar222) => {
		return createvar222._port === 'display' && createvar222._msg === 'createvar222' && (this.Display_SC_Wait_received_display_createxsizeysize_var);
	}).effect((createvar222) => {
		this.Display_SC_Wait_display_create_var222_var = createvar222.var222;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createvar222_var = false;
		this.Display_SC_Wait_received_display_createxsizeysize_var = false;
	});
	Display_SC_Wait.to(null).when((createvar222) => {
		return createvar222._port === 'display' && createvar222._msg === 'createvar222' && (!(this.Display_SC_Wait_received_display_createxsizeysize_var));
	}).effect((createvar222) => {
		this.Display_SC_Wait_received_display_createvar222_var = true;
		this.Display_SC_Wait_display_create_var222_var = createvar222.var222;
	});
	Display_SC_Running.to(null).when((updatevar224) => {
		return updatevar224._port === 'display' && updatevar224._msg === 'updatevar224';
	}).effect((updatevar224) => {
		this.Display_SC_Running_received_display_updatevar224_var = true;
		this.Display_SC_Running_display_update_var224_var = updatevar224.var224;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar224_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorgvar216_bis) => {
		return setColorgvar216_bis._port === 'display' && setColorgvar216_bis._msg === 'setColorgvar216_bis';
	}).effect((setColorgvar216_bis) => {
		this.Display_SC_Running_received_display_setColorgvar216_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgvar216_bis.g;
		this.Display_SC_Running_display_setColor_var216_var = setColorgvar216_bis.var216;
		if(this.Display_SC_Running_received_display_setColorbr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgvar216_var = false;
		this.Display_SC_Running_received_display_setColorbr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingML__bis) => {
		return drawThingML__bis._port === 'display' && drawThingML__bis._msg === 'drawThingML__bis';
	}).effect((drawThingML__bis) => {
		this.Display_SC_Running_received_display_drawThingML__var = true;
		if(this.Display_SC_Running_received_display_drawThingMLxyvar221_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingML__var = false;
		this.Display_SC_Running_received_display_drawThingMLxyvar221_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar215_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar215_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerscalevar220xv) => {
		return drawIntegerscalevar220xv._port === 'display' && drawIntegerscalevar220xv._msg === 'drawIntegerscalevar220xv';
	}).effect((drawIntegerscalevar220xv) => {
		this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var = true;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerscalevar220xv.scale;
		this.Display_SC_Running_display_drawInteger_var220_var = drawIntegerscalevar220xv.var220;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerscalevar220xv.x;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerscalevar220xv.v;
		if(this.Display_SC_Running_received_display_drawIntegerdigitsy_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var = false;
		this.Display_SC_Running_received_display_drawIntegerdigitsy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrb) => {
		return setBGColorrb._port === 'display' && setBGColorrb._msg === 'setBGColorrb';
	}).effect((setBGColorrb) => {
		this.Display_SC_Running_received_display_setBGColorrb_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrb.r;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorrb.b;
		if(this.Display_SC_Running_received_display_setBGColorvar217g_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrb_var = false;
		this.Display_SC_Running_received_display_setBGColorvar217g_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearvar215) => {
		return clearvar215._port === 'display' && clearvar215._msg === 'clearvar215';
	}).effect((clearvar215) => {
		this.Display_SC_Running_received_display_clearvar215_var = true;
		this.Display_SC_Running_display_clear_var215_var = clearvar215.var215;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar215_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar223_bis) => {
		return destroyvar223_bis._port === 'display' && destroyvar223_bis._msg === 'destroyvar223_bis' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar223_bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar223_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar223_bis) => {
		return destroyvar223_bis._port === 'display' && destroyvar223_bis._msg === 'destroyvar223_bis' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar223_bis) => {
		this.Display_SC_Running_received_display_destroyvar223_var = true;
	});
	Display_SC_Running.to(null).when((drawRectxy_bis) => {
		return drawRectxy_bis._port === 'display' && drawRectxy_bis._msg === 'drawRectxy_bis';
	}).effect((drawRectxy_bis) => {
		this.Display_SC_Running_received_display_drawRectxy_var = true;
		this.Display_SC_Running_display_drawRect_x_var = drawRectxy_bis.x;
		this.Display_SC_Running_display_drawRect_y_var = drawRectxy_bis.y;
		if(this.Display_SC_Running_received_display_drawRectvar218widthheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectxy_var = false;
		this.Display_SC_Running_received_display_drawRectvar218widthheight_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysize) => {
		return createxsizeysize._port === 'display' && createxsizeysize._msg === 'createxsizeysize' && (this.Display_SC_Wait_received_display_createvar222_var);
	}).effect((createxsizeysize) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysize.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysize.ysize;
		this.initDisplay(createxsizeysize.xsize, createxsizeysize.ysize);
		this.Display_SC_Wait_received_display_createxsizeysize_var = false;
		this.Display_SC_Wait_received_display_createvar222_var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysize) => {
		return createxsizeysize._port === 'display' && createxsizeysize._msg === 'createxsizeysize' && (!(this.Display_SC_Wait_received_display_createvar222_var));
	}).effect((createxsizeysize) => {
		this.Display_SC_Wait_received_display_createxsizeysize_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysize.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysize.ysize;
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysize_bis) => {
		return createxsizeysize_bis._port === 'display' && createxsizeysize_bis._msg === 'createxsizeysize_bis' && (this.Display_SC_Wait_received_display_createvar222_var);
	}).effect((createxsizeysize_bis) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysize_bis.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysize_bis.ysize;
		this.initDisplay(createxsizeysize_bis.xsize, createxsizeysize_bis.ysize);
		this.Display_SC_Wait_received_display_createxsizeysize_var = false;
		this.Display_SC_Wait_received_display_createvar222_var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysize_bis) => {
		return createxsizeysize_bis._port === 'display' && createxsizeysize_bis._msg === 'createxsizeysize_bis' && (!(this.Display_SC_Wait_received_display_createvar222_var));
	}).effect((createxsizeysize_bis) => {
		this.Display_SC_Wait_received_display_createxsizeysize_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysize_bis.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysize_bis.ysize;
	});
	Display_SC_Running.to(null).when((drawRectvar218widthheight_bis) => {
		return drawRectvar218widthheight_bis._port === 'display' && drawRectvar218widthheight_bis._msg === 'drawRectvar218widthheight_bis';
	}).effect((drawRectvar218widthheight_bis) => {
		this.Display_SC_Running_received_display_drawRectvar218widthheight_var = true;
		this.Display_SC_Running_display_drawRect_var218_var = drawRectvar218widthheight_bis.var218;
		this.Display_SC_Running_display_drawRect_width_var = drawRectvar218widthheight_bis.width;
		this.Display_SC_Running_display_drawRect_height_var = drawRectvar218widthheight_bis.height;
		if(this.Display_SC_Running_received_display_drawRectxy_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectvar218widthheight_var = false;
		this.Display_SC_Running_received_display_drawRectxy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorbr) => {
		return setColorbr._port === 'display' && setColorbr._msg === 'setColorbr';
	}).effect((setColorbr) => {
		this.Display_SC_Running_received_display_setColorbr_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbr.b;
		this.Display_SC_Running_display_setColor_r_var = setColorbr.r;
		if(this.Display_SC_Running_received_display_setColorgvar216_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbr_var = false;
		this.Display_SC_Running_received_display_setColorgvar216_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectxy) => {
		return drawRectxy._port === 'display' && drawRectxy._msg === 'drawRectxy';
	}).effect((drawRectxy) => {
		this.Display_SC_Running_received_display_drawRectxy_var = true;
		this.Display_SC_Running_display_drawRect_x_var = drawRectxy.x;
		this.Display_SC_Running_display_drawRect_y_var = drawRectxy.y;
		if(this.Display_SC_Running_received_display_drawRectvar218widthheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectxy_var = false;
		this.Display_SC_Running_received_display_drawRectvar218widthheight_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorvar217g) => {
		return setBGColorvar217g._port === 'display' && setBGColorvar217g._msg === 'setBGColorvar217g';
	}).effect((setBGColorvar217g) => {
		this.Display_SC_Running_received_display_setBGColorvar217g_var = true;
		this.Display_SC_Running_display_setBGColor_var217_var = setBGColorvar217g.var217;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorvar217g.g;
		if(this.Display_SC_Running_received_display_setBGColorrb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar217g_var = false;
		this.Display_SC_Running_received_display_setBGColorrb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerscalevar220xv_bis) => {
		return drawIntegerscalevar220xv_bis._port === 'display' && drawIntegerscalevar220xv_bis._msg === 'drawIntegerscalevar220xv_bis';
	}).effect((drawIntegerscalevar220xv_bis) => {
		this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var = true;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerscalevar220xv_bis.scale;
		this.Display_SC_Running_display_drawInteger_var220_var = drawIntegerscalevar220xv_bis.var220;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerscalevar220xv_bis.x;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerscalevar220xv_bis.v;
		if(this.Display_SC_Running_received_display_drawIntegerdigitsy_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var = false;
		this.Display_SC_Running_received_display_drawIntegerdigitsy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRect__bis) => {
		return fillRect__bis._port === 'display' && fillRect__bis._msg === 'fillRect__bis';
	}).effect((fillRect__bis) => {
		this.Display_SC_Running_received_display_fillRect__var = true;
		if(this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRect__var = false;
		this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (this.Display_SC_Running_received_display_destroyvar223_var);
	}).effect((destroy__bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar223_var = false;
	});
	Display_SC_Running.to(null).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (!(this.Display_SC_Running_received_display_destroyvar223_var));
	}).effect((destroy__bis) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((setColorgvar216) => {
		return setColorgvar216._port === 'display' && setColorgvar216._msg === 'setColorgvar216';
	}).effect((setColorgvar216) => {
		this.Display_SC_Running_received_display_setColorgvar216_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgvar216.g;
		this.Display_SC_Running_display_setColor_var216_var = setColorgvar216.var216;
		if(this.Display_SC_Running_received_display_setColorbr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgvar216_var = false;
		this.Display_SC_Running_received_display_setColorbr_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyvar223_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar223_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyvar223_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((updatevar224_bis) => {
		return updatevar224_bis._port === 'display' && updatevar224_bis._msg === 'updatevar224_bis';
	}).effect((updatevar224_bis) => {
		this.Display_SC_Running_received_display_updatevar224_var = true;
		this.Display_SC_Running_display_update_var224_var = updatevar224_bis.var224;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar224_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
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
		
		
		if(211 < 76) {
		setTimeout(() => this.bus.emit('vctrl?positionx', 0x1B, posX), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionx_bis', posX, 0x50), 0);
		
		}
		if(231 < 133) {
		setTimeout(() => this.bus.emit('vctrl?positionvar228y', 0xBA, 0, 0x9F), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar228y_bis', 0x9F, 0, 0xA0), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(249 < 46) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx',  -8, 0xEB), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis',  -8, 0x82), 0);
			
			}
			if(171 < 158) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dy', 0x48, 0, 0xC9), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dy_bis', 0x48, 0, 0x2F), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(215 < 101) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dy', 0x41, 0, 0x96), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dy_bis', 0x41, 0, 0xFB), 0);
			
			}
			if(156 < 204) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 8, 0x35), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis', 8, 0x47), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(10 < 24) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0, 0x5D), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis', 0, 0x8D), 0);
			
			}
			if(42 < 32) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dy', 0x35, 0, 0x7E), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dy_bis', 0x35, 0, 0x9D), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(104 < 35) {
		setTimeout(() => this.bus.emit('vctrl?positionx', 0x86, x), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionx_bis', x, 0xFB), 0);
		
		}
		if(70 < 209) {
		setTimeout(() => this.bus.emit('vctrl?positionvar228y', 0xCD, 0, 0xD3), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar228y_bis', 0xD3, 0, 0x3C), 0);
		
		}
		
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

DisplayBrowser.prototype.receivecreatevar222Ondisplay = function(var242, var222) {
	this._receive({_port:"display", _msg:"createvar222", var242:var242, var222:var222});
}

DisplayBrowser.prototype.receivecreatexsizeysizeOndisplay = function(xsize, var243, ysize) {
	this._receive({_port:"display", _msg:"createxsizeysize", xsize:xsize, var243:var243, ysize:ysize});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(var258) {
	this._receive({_port:"display", _msg:"destroy_", var258:var258});
}

DisplayBrowser.prototype.receivedestroyvar223Ondisplay = function(var223, var259) {
	this._receive({_port:"display", _msg:"destroyvar223", var223:var223, var259:var259});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(var248) {
	this._receive({_port:"display", _msg:"update_", var248:var248});
}

DisplayBrowser.prototype.receiveupdatevar224Ondisplay = function(var249, var224) {
	this._receive({_port:"display", _msg:"updatevar224", var249:var249, var224:var224});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(var260) {
	this._receive({_port:"display", _msg:"clear_", var260:var260});
}

DisplayBrowser.prototype.receiveclearvar215Ondisplay = function(var261, var215) {
	this._receive({_port:"display", _msg:"clearvar215", var261:var261, var215:var215});
}

DisplayBrowser.prototype.receivesetColorbrOndisplay = function(var256, r, b) {
	this._receive({_port:"display", _msg:"setColorbr", var256:var256, r:r, b:b});
}

DisplayBrowser.prototype.receivesetColorgvar216Ondisplay = function(g, var257, var216) {
	this._receive({_port:"display", _msg:"setColorgvar216", g:g, var257:var257, var216:var216});
}

DisplayBrowser.prototype.receivesetBGColorvar217gOndisplay = function(g, var217, var250) {
	this._receive({_port:"display", _msg:"setBGColorvar217g", g:g, var217:var217, var250:var250});
}

DisplayBrowser.prototype.receivesetBGColorrbOndisplay = function(b, r, var251) {
	this._receive({_port:"display", _msg:"setBGColorrb", b:b, r:r, var251:var251});
}

DisplayBrowser.prototype.receivedrawRectvar218widthheightOndisplay = function(var238, width, var218, height) {
	this._receive({_port:"display", _msg:"drawRectvar218widthheight", var238:var238, width:width, var218:var218, height:height});
}

DisplayBrowser.prototype.receivedrawRectxyOndisplay = function(y, var239, x) {
	this._receive({_port:"display", _msg:"drawRectxy", y:y, var239:var239, x:x});
}

DisplayBrowser.prototype.receivefillRect_Ondisplay = function(var254) {
	this._receive({_port:"display", _msg:"fillRect_", var254:var254});
}

DisplayBrowser.prototype.receivefillRectyheightvar219widthxOndisplay = function(y, var219, height, var255, width, x) {
	this._receive({_port:"display", _msg:"fillRectyheightvar219widthx", y:y, var219:var219, height:height, var255:var255, width:width, x:x});
}

DisplayBrowser.prototype.receivedrawIntegerscalevar220xvOndisplay = function(var240, var220, v, scale, x) {
	this._receive({_port:"display", _msg:"drawIntegerscalevar220xv", var240:var240, var220:var220, v:v, scale:scale, x:x});
}

DisplayBrowser.prototype.receivedrawIntegerdigitsyOndisplay = function(digits, y, var241) {
	this._receive({_port:"display", _msg:"drawIntegerdigitsy", digits:digits, y:y, var241:var241});
}

DisplayBrowser.prototype.receivedrawThingML_Ondisplay = function(var244) {
	this._receive({_port:"display", _msg:"drawThingML_", var244:var244});
}

DisplayBrowser.prototype.receivedrawThingMLxyvar221Ondisplay = function(var221, x, var245, y) {
	this._receive({_port:"display", _msg:"drawThingMLxyvar221", var221:var221, x:x, var245:var245, y:y});
}

DisplayBrowser.prototype.receivecreatevar222_bisOndisplay = function(var266, var222) {
	this._receive({_port:"display", _msg:"createvar222_bis", var266:var266, var222:var222});
}

DisplayBrowser.prototype.receivecreatexsizeysize_bisOndisplay = function(var267, xsize, ysize) {
	this._receive({_port:"display", _msg:"createxsizeysize_bis", var267:var267, xsize:xsize, ysize:ysize});
}

DisplayBrowser.prototype.receivedestroy__bisOndisplay = function(var282) {
	this._receive({_port:"display", _msg:"destroy__bis", var282:var282});
}

DisplayBrowser.prototype.receivedestroyvar223_bisOndisplay = function(var223, var283) {
	this._receive({_port:"display", _msg:"destroyvar223_bis", var223:var223, var283:var283});
}

DisplayBrowser.prototype.receiveupdate__bisOndisplay = function(var272) {
	this._receive({_port:"display", _msg:"update__bis", var272:var272});
}

DisplayBrowser.prototype.receiveupdatevar224_bisOndisplay = function(var224, var273) {
	this._receive({_port:"display", _msg:"updatevar224_bis", var224:var224, var273:var273});
}

DisplayBrowser.prototype.receiveclear__bisOndisplay = function(var284) {
	this._receive({_port:"display", _msg:"clear__bis", var284:var284});
}

DisplayBrowser.prototype.receiveclearvar215_bisOndisplay = function(var215, var285) {
	this._receive({_port:"display", _msg:"clearvar215_bis", var215:var215, var285:var285});
}

DisplayBrowser.prototype.receivesetColorbr_bisOndisplay = function(r, var280, b) {
	this._receive({_port:"display", _msg:"setColorbr_bis", r:r, var280:var280, b:b});
}

DisplayBrowser.prototype.receivesetColorgvar216_bisOndisplay = function(g, var216, var281) {
	this._receive({_port:"display", _msg:"setColorgvar216_bis", g:g, var216:var216, var281:var281});
}

DisplayBrowser.prototype.receivesetBGColorvar217g_bisOndisplay = function(var217, var274, g) {
	this._receive({_port:"display", _msg:"setBGColorvar217g_bis", var217:var217, var274:var274, g:g});
}

DisplayBrowser.prototype.receivesetBGColorrb_bisOndisplay = function(r, b, var275) {
	this._receive({_port:"display", _msg:"setBGColorrb_bis", r:r, b:b, var275:var275});
}

DisplayBrowser.prototype.receivedrawRectvar218widthheight_bisOndisplay = function(width, var218, height, var262) {
	this._receive({_port:"display", _msg:"drawRectvar218widthheight_bis", width:width, var218:var218, height:height, var262:var262});
}

DisplayBrowser.prototype.receivedrawRectxy_bisOndisplay = function(x, var263, y) {
	this._receive({_port:"display", _msg:"drawRectxy_bis", x:x, var263:var263, y:y});
}

DisplayBrowser.prototype.receivefillRect__bisOndisplay = function(var278) {
	this._receive({_port:"display", _msg:"fillRect__bis", var278:var278});
}

DisplayBrowser.prototype.receivefillRectyheightvar219widthx_bisOndisplay = function(var279, var219, width, y, x, height) {
	this._receive({_port:"display", _msg:"fillRectyheightvar219widthx_bis", var279:var279, var219:var219, width:width, y:y, x:x, height:height});
}

DisplayBrowser.prototype.receivedrawIntegerscalevar220xv_bisOndisplay = function(scale, v, var220, var264, x) {
	this._receive({_port:"display", _msg:"drawIntegerscalevar220xv_bis", scale:scale, v:v, var220:var220, var264:var264, x:x});
}

DisplayBrowser.prototype.receivedrawIntegerdigitsy_bisOndisplay = function(var265, digits, y) {
	this._receive({_port:"display", _msg:"drawIntegerdigitsy_bis", var265:var265, digits:digits, y:y});
}

DisplayBrowser.prototype.receivedrawThingML__bisOndisplay = function(var268) {
	this._receive({_port:"display", _msg:"drawThingML__bis", var268:var268});
}

DisplayBrowser.prototype.receivedrawThingMLxyvar221_bisOndisplay = function(x, var221, y, var269) {
	this._receive({_port:"display", _msg:"drawThingMLxyvar221_bis", x:x, var221:var221, y:y, var269:var269});
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorbr_var = function(Display_SC_Running_received_display_setColorbr_var) {
	this.Display_SC_Running_received_display_setColorbr_var = Display_SC_Running_received_display_setColorbr_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_var217_var = function(Display_SC_Running_display_setBGColor_var217_var) {
	this.Display_SC_Running_display_setBGColor_var217_var = Display_SC_Running_display_setBGColor_var217_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsizeysize_var = function(Display_SC_Wait_received_display_createxsizeysize_var) {
	this.Display_SC_Wait_received_display_createxsizeysize_var = Display_SC_Wait_received_display_createxsizeysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_var215_var = function(Display_SC_Running_display_clear_var215_var) {
	this.Display_SC_Running_display_clear_var215_var = Display_SC_Running_display_clear_var215_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerdigitsy_var = function(Display_SC_Running_received_display_drawIntegerdigitsy_var) {
	this.Display_SC_Running_received_display_drawIntegerdigitsy_var = Display_SC_Running_received_display_drawIntegerdigitsy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_var222_var = function(Display_SC_Wait_display_create_var222_var) {
	this.Display_SC_Wait_display_create_var222_var = Display_SC_Wait_display_create_var222_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorvar217g_var = function(Display_SC_Running_received_display_setBGColorvar217g_var) {
	this.Display_SC_Running_received_display_setBGColorvar217g_var = Display_SC_Running_received_display_setBGColorvar217g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectvar218widthheight_var = function(Display_SC_Running_received_display_drawRectvar218widthheight_var) {
	this.Display_SC_Running_received_display_drawRectvar218widthheight_var = Display_SC_Running_received_display_drawRectvar218widthheight_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_var221_var = function(Display_SC_Running_display_drawThingML_var221_var) {
	this.Display_SC_Running_display_drawThingML_var221_var = Display_SC_Running_display_drawThingML_var221_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectxy_var = function(Display_SC_Running_received_display_drawRectxy_var) {
	this.Display_SC_Running_received_display_drawRectxy_var = Display_SC_Running_received_display_drawRectxy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyvar223_var = function(Display_SC_Running_received_display_destroyvar223_var) {
	this.Display_SC_Running_received_display_destroyvar223_var = Display_SC_Running_received_display_destroyvar223_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearvar215_var = function(Display_SC_Running_received_display_clearvar215_var) {
	this.Display_SC_Running_received_display_clearvar215_var = Display_SC_Running_received_display_clearvar215_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_var220_var = function(Display_SC_Running_display_drawInteger_var220_var) {
	this.Display_SC_Running_display_drawInteger_var220_var = Display_SC_Running_display_drawInteger_var220_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_var223_var = function(Display_SC_Running_display_destroy_var223_var) {
	this.Display_SC_Running_display_destroy_var223_var = Display_SC_Running_display_destroy_var223_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRect__var = function(Display_SC_Running_received_display_fillRect__var) {
	this.Display_SC_Running_received_display_fillRect__var = Display_SC_Running_received_display_fillRect__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerscalevar220xv_var = function(Display_SC_Running_received_display_drawIntegerscalevar220xv_var) {
	this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var = Display_SC_Running_received_display_drawIntegerscalevar220xv_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorgvar216_var = function(Display_SC_Running_received_display_setColorgvar216_var) {
	this.Display_SC_Running_received_display_setColorgvar216_var = Display_SC_Running_received_display_setColorgvar216_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_var224_var = function(Display_SC_Running_display_update_var224_var) {
	this.Display_SC_Running_display_update_var224_var = Display_SC_Running_display_update_var224_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updatevar224_var = function(Display_SC_Running_received_display_updatevar224_var) {
	this.Display_SC_Running_received_display_updatevar224_var = Display_SC_Running_received_display_updatevar224_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_var219_var = function(Display_SC_Running_display_fillRect_var219_var) {
	this.Display_SC_Running_display_fillRect_var219_var = Display_SC_Running_display_fillRect_var219_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_var218_var = function(Display_SC_Running_display_drawRect_var218_var) {
	this.Display_SC_Running_display_drawRect_var218_var = Display_SC_Running_display_drawRect_var218_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingML__var = function(Display_SC_Running_received_display_drawThingML__var) {
	this.Display_SC_Running_received_display_drawThingML__var = Display_SC_Running_received_display_drawThingML__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorrb_var = function(Display_SC_Running_received_display_setBGColorrb_var) {
	this.Display_SC_Running_received_display_setBGColorrb_var = Display_SC_Running_received_display_setBGColorrb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createvar222_var = function(Display_SC_Wait_received_display_createvar222_var) {
	this.Display_SC_Wait_received_display_createvar222_var = Display_SC_Wait_received_display_createvar222_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectyheightvar219widthx_var = function(Display_SC_Running_received_display_fillRectyheightvar219widthx_var) {
	this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var = Display_SC_Running_received_display_fillRectyheightvar219widthx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLxyvar221_var = function(Display_SC_Running_received_display_drawThingMLxyvar221_var) {
	this.Display_SC_Running_received_display_drawThingMLxyvar221_var = Display_SC_Running_received_display_drawThingMLxyvar221_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_var216_var = function(Display_SC_Running_display_setColor_var216_var) {
	this.Display_SC_Running_display_setColor_var216_var = Display_SC_Running_display_setColor_var216_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\treceived_display_setColorbr = ' + this.Display_SC_Running_received_display_setColorbr_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tdisplay_setBGColor_var217 = ' + this.Display_SC_Running_display_setBGColor_var217_var;
	result += '\n\treceived_display_createxsizeysize = ' + this.Display_SC_Wait_received_display_createxsizeysize_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tdisplay_clear_var215 = ' + this.Display_SC_Running_display_clear_var215_var;
	result += '\n\treceived_display_drawIntegerdigitsy = ' + this.Display_SC_Running_received_display_drawIntegerdigitsy_var;
	result += '\n\tdisplay_create_var222 = ' + this.Display_SC_Wait_display_create_var222_var;
	result += '\n\treceived_display_setBGColorvar217g = ' + this.Display_SC_Running_received_display_setBGColorvar217g_var;
	result += '\n\treceived_display_drawRectvar218widthheight = ' + this.Display_SC_Running_received_display_drawRectvar218widthheight_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_drawThingML_var221 = ' + this.Display_SC_Running_display_drawThingML_var221_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\treceived_display_drawRectxy = ' + this.Display_SC_Running_received_display_drawRectxy_var;
	result += '\n\treceived_display_destroyvar223 = ' + this.Display_SC_Running_received_display_destroyvar223_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\treceived_display_clearvar215 = ' + this.Display_SC_Running_received_display_clearvar215_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tdisplay_drawInteger_var220 = ' + this.Display_SC_Running_display_drawInteger_var220_var;
	result += '\n\tdisplay_destroy_var223 = ' + this.Display_SC_Running_display_destroy_var223_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\treceived_display_fillRect_ = ' + this.Display_SC_Running_received_display_fillRect__var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\treceived_display_drawIntegerscalevar220xv = ' + this.Display_SC_Running_received_display_drawIntegerscalevar220xv_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\treceived_display_setColorgvar216 = ' + this.Display_SC_Running_received_display_setColorgvar216_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\tdisplay_update_var224 = ' + this.Display_SC_Running_display_update_var224_var;
	result += '\n\treceived_display_updatevar224 = ' + this.Display_SC_Running_received_display_updatevar224_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_fillRect_var219 = ' + this.Display_SC_Running_display_fillRect_var219_var;
	result += '\n\tdisplay_drawRect_var218 = ' + this.Display_SC_Running_display_drawRect_var218_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\treceived_display_drawThingML_ = ' + this.Display_SC_Running_received_display_drawThingML__var;
	result += '\n\treceived_display_setBGColorrb = ' + this.Display_SC_Running_received_display_setBGColorrb_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\treceived_display_createvar222 = ' + this.Display_SC_Wait_received_display_createvar222_var;
	result += '\n\treceived_display_fillRectyheightvar219widthx = ' + this.Display_SC_Running_received_display_fillRectyheightvar219widthx_var;
	result += '\n\treceived_display_drawThingMLxyvar221 = ' + this.Display_SC_Running_received_display_drawThingMLxyvar221_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tdisplay_setColor_var216 = ' + this.Display_SC_Running_display_setColor_var216_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '';
	return result;
}

