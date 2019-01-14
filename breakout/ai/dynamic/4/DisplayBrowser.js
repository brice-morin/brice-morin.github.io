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
		if(144 < 183) {
		setTimeout(() => this.bus.emit('display?displayReadyvar437', 0x56, 0x7C), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar437_bis', 0x56, 0x27), 0);
		
		}
		if(236 < 220) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x69), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0x06), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((setBGColorvar429b_bis) => {
		return setBGColorvar429b_bis._port === 'display' && setBGColorvar429b_bis._msg === 'setBGColorvar429b_bis';
	}).effect((setBGColorvar429b_bis) => {
		this.Display_SC_Running_received_display_setBGColorvar429b_var = true;
		this.Display_SC_Running_display_setBGColor_var429_var = setBGColorvar429b_bis.var429;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorvar429b_bis.b;
		if(this.Display_SC_Running_received_display_setBGColorrg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar429b_var = false;
		this.Display_SC_Running_received_display_setBGColorrg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updatevar436_bis) => {
		return updatevar436_bis._port === 'display' && updatevar436_bis._msg === 'updatevar436_bis';
	}).effect((updatevar436_bis) => {
		this.Display_SC_Running_received_display_updatevar436_var = true;
		this.Display_SC_Running_display_update_var436_var = updatevar436_bis.var436;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar436_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrg_bis) => {
		return setBGColorrg_bis._port === 'display' && setBGColorrg_bis._msg === 'setBGColorrg_bis';
	}).effect((setBGColorrg_bis) => {
		this.Display_SC_Running_received_display_setBGColorrg_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrg_bis.r;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorrg_bis.g;
		if(this.Display_SC_Running_received_display_setBGColorvar429b_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrg_var = false;
		this.Display_SC_Running_received_display_setBGColorvar429b_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectyheightvar431) => {
		return fillRectyheightvar431._port === 'display' && fillRectyheightvar431._msg === 'fillRectyheightvar431';
	}).effect((fillRectyheightvar431) => {
		this.Display_SC_Running_received_display_fillRectyheightvar431_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyheightvar431.y;
		this.Display_SC_Running_display_fillRect_height_var = fillRectyheightvar431.height;
		this.Display_SC_Running_display_fillRect_var431_var = fillRectyheightvar431.var431;
		if(this.Display_SC_Running_received_display_fillRectxwidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyheightvar431_var = false;
		this.Display_SC_Running_received_display_fillRectxwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear__bis) => {
		return clear__bis._port === 'display' && clear__bis._msg === 'clear__bis';
	}).effect((clear__bis) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar427_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar427_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectheightxwidth) => {
		return drawRectheightxwidth._port === 'display' && drawRectheightxwidth._msg === 'drawRectheightxwidth';
	}).effect((drawRectheightxwidth) => {
		this.Display_SC_Running_received_display_drawRectheightxwidth_var = true;
		this.Display_SC_Running_display_drawRect_height_var = drawRectheightxwidth.height;
		this.Display_SC_Running_display_drawRect_x_var = drawRectheightxwidth.x;
		this.Display_SC_Running_display_drawRect_width_var = drawRectheightxwidth.width;
		if(this.Display_SC_Running_received_display_drawRectyvar430_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectheightxwidth_var = false;
		this.Display_SC_Running_received_display_drawRectyvar430_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar428gr_bis) => {
		return setColorvar428gr_bis._port === 'display' && setColorvar428gr_bis._msg === 'setColorvar428gr_bis';
	}).effect((setColorvar428gr_bis) => {
		this.Display_SC_Running_received_display_setColorvar428gr_var = true;
		this.Display_SC_Running_display_setColor_var428_var = setColorvar428gr_bis.var428;
		this.Display_SC_Running_display_setColor_g_var = setColorvar428gr_bis.g;
		this.Display_SC_Running_display_setColor_r_var = setColorvar428gr_bis.r;
		if(this.Display_SC_Running_received_display_setColorb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar428gr_var = false;
		this.Display_SC_Running_received_display_setColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar436_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar436_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updatevar436) => {
		return updatevar436._port === 'display' && updatevar436._msg === 'updatevar436';
	}).effect((updatevar436) => {
		this.Display_SC_Running_received_display_updatevar436_var = true;
		this.Display_SC_Running_display_update_var436_var = updatevar436.var436;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar436_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLvar433_bis) => {
		return drawThingMLvar433_bis._port === 'display' && drawThingMLvar433_bis._msg === 'drawThingMLvar433_bis';
	}).effect((drawThingMLvar433_bis) => {
		this.Display_SC_Running_received_display_drawThingMLvar433_var = true;
		this.Display_SC_Running_display_drawThingML_var433_var = drawThingMLvar433_bis.var433;
		if(this.Display_SC_Running_received_display_drawThingMLxy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar433_var = false;
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (this.Display_SC_Running_received_display_destroyvar435_var);
	}).effect((destroy__bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar435_var = false;
	});
	Display_SC_Running.to(null).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (!(this.Display_SC_Running_received_display_destroyvar435_var));
	}).effect((destroy__bis) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((drawIntegervy_bis) => {
		return drawIntegervy_bis._port === 'display' && drawIntegervy_bis._msg === 'drawIntegervy_bis';
	}).effect((drawIntegervy_bis) => {
		this.Display_SC_Running_received_display_drawIntegervy_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervy_bis.v;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervy_bis.y;
		if(this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervy_var = false;
		this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectxwidth) => {
		return fillRectxwidth._port === 'display' && fillRectxwidth._msg === 'fillRectxwidth';
	}).effect((fillRectxwidth) => {
		this.Display_SC_Running_received_display_fillRectxwidth_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxwidth.x;
		this.Display_SC_Running_display_fillRect_width_var = fillRectxwidth.width;
		if(this.Display_SC_Running_received_display_fillRectyheightvar431_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxwidth_var = false;
		this.Display_SC_Running_received_display_fillRectyheightvar431_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLxy_bis) => {
		return drawThingMLxy_bis._port === 'display' && drawThingMLxy_bis._msg === 'drawThingMLxy_bis';
	}).effect((drawThingMLxy_bis) => {
		this.Display_SC_Running_received_display_drawThingMLxy_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxy_bis.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLxy_bis.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar433_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar433_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorvar429b) => {
		return setBGColorvar429b._port === 'display' && setBGColorvar429b._msg === 'setBGColorvar429b';
	}).effect((setBGColorvar429b) => {
		this.Display_SC_Running_received_display_setBGColorvar429b_var = true;
		this.Display_SC_Running_display_setBGColor_var429_var = setBGColorvar429b.var429;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorvar429b.b;
		if(this.Display_SC_Running_received_display_setBGColorrg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar429b_var = false;
		this.Display_SC_Running_received_display_setBGColorrg_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar435) => {
		return destroyvar435._port === 'display' && destroyvar435._msg === 'destroyvar435' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar435) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar435_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar435) => {
		return destroyvar435._port === 'display' && destroyvar435._msg === 'destroyvar435' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar435) => {
		this.Display_SC_Running_received_display_destroyvar435_var = true;
	});
	Display_SC_Running.to(null).when((clearvar427) => {
		return clearvar427._port === 'display' && clearvar427._msg === 'clearvar427';
	}).effect((clearvar427) => {
		this.Display_SC_Running_received_display_clearvar427_var = true;
		this.Display_SC_Running_display_clear_var427_var = clearvar427.var427;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar427_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyvar435_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar435_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyvar435_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((drawIntegervy) => {
		return drawIntegervy._port === 'display' && drawIntegervy._msg === 'drawIntegervy';
	}).effect((drawIntegervy) => {
		this.Display_SC_Running_received_display_drawIntegervy_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervy.v;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervy.y;
		if(this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervy_var = false;
		this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update__bis) => {
		return update__bis._port === 'display' && update__bis._msg === 'update__bis';
	}).effect((update__bis) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar436_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar436_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyvar430_bis) => {
		return drawRectyvar430_bis._port === 'display' && drawRectyvar430_bis._msg === 'drawRectyvar430_bis';
	}).effect((drawRectyvar430_bis) => {
		this.Display_SC_Running_received_display_drawRectyvar430_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyvar430_bis.y;
		this.Display_SC_Running_display_drawRect_var430_var = drawRectyvar430_bis.var430;
		if(this.Display_SC_Running_received_display_drawRectheightxwidth_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyvar430_var = false;
		this.Display_SC_Running_received_display_drawRectheightxwidth_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createvar434xsize) => {
		return createvar434xsize._port === 'display' && createvar434xsize._msg === 'createvar434xsize' && (this.Display_SC_Wait_received_display_createysize_var);
	}).effect((createvar434xsize) => {
		this.Display_SC_Wait_display_create_var434_var = createvar434xsize.var434;
		this.Display_SC_Wait_display_create_xsize_var = createvar434xsize.xsize;
		this.initDisplay(createvar434xsize.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createvar434xsize_var = false;
		this.Display_SC_Wait_received_display_createysize_var = false;
	});
	Display_SC_Wait.to(null).when((createvar434xsize) => {
		return createvar434xsize._port === 'display' && createvar434xsize._msg === 'createvar434xsize' && (!(this.Display_SC_Wait_received_display_createysize_var));
	}).effect((createvar434xsize) => {
		this.Display_SC_Wait_received_display_createvar434xsize_var = true;
		this.Display_SC_Wait_display_create_var434_var = createvar434xsize.var434;
		this.Display_SC_Wait_display_create_xsize_var = createvar434xsize.xsize;
	});
	Display_SC_Running.to(null).when((setColorb_bis) => {
		return setColorb_bis._port === 'display' && setColorb_bis._msg === 'setColorb_bis';
	}).effect((setColorb_bis) => {
		this.Display_SC_Running_received_display_setColorb_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorb_bis.b;
		if(this.Display_SC_Running_received_display_setColorvar428gr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorb_var = false;
		this.Display_SC_Running_received_display_setColorvar428gr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerxscalevar432digits_bis) => {
		return drawIntegerxscalevar432digits_bis._port === 'display' && drawIntegerxscalevar432digits_bis._msg === 'drawIntegerxscalevar432digits_bis';
	}).effect((drawIntegerxscalevar432digits_bis) => {
		this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerxscalevar432digits_bis.x;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerxscalevar432digits_bis.scale;
		this.Display_SC_Running_display_drawInteger_var432_var = drawIntegerxscalevar432digits_bis.var432;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerxscalevar432digits_bis.digits;
		if(this.Display_SC_Running_received_display_drawIntegervy_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var = false;
		this.Display_SC_Running_received_display_drawIntegervy_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysize_bis) => {
		return createysize_bis._port === 'display' && createysize_bis._msg === 'createysize_bis' && (this.Display_SC_Wait_received_display_createvar434xsize_var);
	}).effect((createysize_bis) => {
		this.Display_SC_Wait_display_create_ysize_var = createysize_bis.ysize;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createysize_bis.ysize);
		this.Display_SC_Wait_received_display_createysize_var = false;
		this.Display_SC_Wait_received_display_createvar434xsize_var = false;
	});
	Display_SC_Wait.to(null).when((createysize_bis) => {
		return createysize_bis._port === 'display' && createysize_bis._msg === 'createysize_bis' && (!(this.Display_SC_Wait_received_display_createvar434xsize_var));
	}).effect((createysize_bis) => {
		this.Display_SC_Wait_received_display_createysize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysize_bis.ysize;
	});
	Display_SC_Running.to(null).when((setColorb) => {
		return setColorb._port === 'display' && setColorb._msg === 'setColorb';
	}).effect((setColorb) => {
		this.Display_SC_Running_received_display_setColorb_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorb.b;
		if(this.Display_SC_Running_received_display_setColorvar428gr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorb_var = false;
		this.Display_SC_Running_received_display_setColorvar428gr_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createvar434xsize_bis) => {
		return createvar434xsize_bis._port === 'display' && createvar434xsize_bis._msg === 'createvar434xsize_bis' && (this.Display_SC_Wait_received_display_createysize_var);
	}).effect((createvar434xsize_bis) => {
		this.Display_SC_Wait_display_create_var434_var = createvar434xsize_bis.var434;
		this.Display_SC_Wait_display_create_xsize_var = createvar434xsize_bis.xsize;
		this.initDisplay(createvar434xsize_bis.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createvar434xsize_var = false;
		this.Display_SC_Wait_received_display_createysize_var = false;
	});
	Display_SC_Wait.to(null).when((createvar434xsize_bis) => {
		return createvar434xsize_bis._port === 'display' && createvar434xsize_bis._msg === 'createvar434xsize_bis' && (!(this.Display_SC_Wait_received_display_createysize_var));
	}).effect((createvar434xsize_bis) => {
		this.Display_SC_Wait_received_display_createvar434xsize_var = true;
		this.Display_SC_Wait_display_create_var434_var = createvar434xsize_bis.var434;
		this.Display_SC_Wait_display_create_xsize_var = createvar434xsize_bis.xsize;
	});
	Display_SC_Running.to(null).when((clearvar427_bis) => {
		return clearvar427_bis._port === 'display' && clearvar427_bis._msg === 'clearvar427_bis';
	}).effect((clearvar427_bis) => {
		this.Display_SC_Running_received_display_clearvar427_var = true;
		this.Display_SC_Running_display_clear_var427_var = clearvar427_bis.var427;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar427_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLxy) => {
		return drawThingMLxy._port === 'display' && drawThingMLxy._msg === 'drawThingMLxy';
	}).effect((drawThingMLxy) => {
		this.Display_SC_Running_received_display_drawThingMLxy_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxy.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLxy.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar433_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar433_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar435_bis) => {
		return destroyvar435_bis._port === 'display' && destroyvar435_bis._msg === 'destroyvar435_bis' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar435_bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar435_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar435_bis) => {
		return destroyvar435_bis._port === 'display' && destroyvar435_bis._msg === 'destroyvar435_bis' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar435_bis) => {
		this.Display_SC_Running_received_display_destroyvar435_var = true;
	});
	Display_SC_Running.to(null).when((fillRectxwidth_bis) => {
		return fillRectxwidth_bis._port === 'display' && fillRectxwidth_bis._msg === 'fillRectxwidth_bis';
	}).effect((fillRectxwidth_bis) => {
		this.Display_SC_Running_received_display_fillRectxwidth_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxwidth_bis.x;
		this.Display_SC_Running_display_fillRect_width_var = fillRectxwidth_bis.width;
		if(this.Display_SC_Running_received_display_fillRectyheightvar431_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxwidth_var = false;
		this.Display_SC_Running_received_display_fillRectyheightvar431_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysize) => {
		return createysize._port === 'display' && createysize._msg === 'createysize' && (this.Display_SC_Wait_received_display_createvar434xsize_var);
	}).effect((createysize) => {
		this.Display_SC_Wait_display_create_ysize_var = createysize.ysize;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createysize.ysize);
		this.Display_SC_Wait_received_display_createysize_var = false;
		this.Display_SC_Wait_received_display_createvar434xsize_var = false;
	});
	Display_SC_Wait.to(null).when((createysize) => {
		return createysize._port === 'display' && createysize._msg === 'createysize' && (!(this.Display_SC_Wait_received_display_createvar434xsize_var));
	}).effect((createysize) => {
		this.Display_SC_Wait_received_display_createysize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysize.ysize;
	});
	Display_SC_Running.to(null).when((drawIntegerxscalevar432digits) => {
		return drawIntegerxscalevar432digits._port === 'display' && drawIntegerxscalevar432digits._msg === 'drawIntegerxscalevar432digits';
	}).effect((drawIntegerxscalevar432digits) => {
		this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerxscalevar432digits.x;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerxscalevar432digits.scale;
		this.Display_SC_Running_display_drawInteger_var432_var = drawIntegerxscalevar432digits.var432;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerxscalevar432digits.digits;
		if(this.Display_SC_Running_received_display_drawIntegervy_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var = false;
		this.Display_SC_Running_received_display_drawIntegervy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyvar430) => {
		return drawRectyvar430._port === 'display' && drawRectyvar430._msg === 'drawRectyvar430';
	}).effect((drawRectyvar430) => {
		this.Display_SC_Running_received_display_drawRectyvar430_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyvar430.y;
		this.Display_SC_Running_display_drawRect_var430_var = drawRectyvar430.var430;
		if(this.Display_SC_Running_received_display_drawRectheightxwidth_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyvar430_var = false;
		this.Display_SC_Running_received_display_drawRectheightxwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectheightxwidth_bis) => {
		return drawRectheightxwidth_bis._port === 'display' && drawRectheightxwidth_bis._msg === 'drawRectheightxwidth_bis';
	}).effect((drawRectheightxwidth_bis) => {
		this.Display_SC_Running_received_display_drawRectheightxwidth_var = true;
		this.Display_SC_Running_display_drawRect_height_var = drawRectheightxwidth_bis.height;
		this.Display_SC_Running_display_drawRect_x_var = drawRectheightxwidth_bis.x;
		this.Display_SC_Running_display_drawRect_width_var = drawRectheightxwidth_bis.width;
		if(this.Display_SC_Running_received_display_drawRectyvar430_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectheightxwidth_var = false;
		this.Display_SC_Running_received_display_drawRectyvar430_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectyheightvar431_bis) => {
		return fillRectyheightvar431_bis._port === 'display' && fillRectyheightvar431_bis._msg === 'fillRectyheightvar431_bis';
	}).effect((fillRectyheightvar431_bis) => {
		this.Display_SC_Running_received_display_fillRectyheightvar431_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyheightvar431_bis.y;
		this.Display_SC_Running_display_fillRect_height_var = fillRectyheightvar431_bis.height;
		this.Display_SC_Running_display_fillRect_var431_var = fillRectyheightvar431_bis.var431;
		if(this.Display_SC_Running_received_display_fillRectxwidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyheightvar431_var = false;
		this.Display_SC_Running_received_display_fillRectxwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLvar433) => {
		return drawThingMLvar433._port === 'display' && drawThingMLvar433._msg === 'drawThingMLvar433';
	}).effect((drawThingMLvar433) => {
		this.Display_SC_Running_received_display_drawThingMLvar433_var = true;
		this.Display_SC_Running_display_drawThingML_var433_var = drawThingMLvar433.var433;
		if(this.Display_SC_Running_received_display_drawThingMLxy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar433_var = false;
		this.Display_SC_Running_received_display_drawThingMLxy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrg) => {
		return setBGColorrg._port === 'display' && setBGColorrg._msg === 'setBGColorrg';
	}).effect((setBGColorrg) => {
		this.Display_SC_Running_received_display_setBGColorrg_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrg.r;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorrg.g;
		if(this.Display_SC_Running_received_display_setBGColorvar429b_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrg_var = false;
		this.Display_SC_Running_received_display_setBGColorvar429b_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar427_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar427_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar428gr) => {
		return setColorvar428gr._port === 'display' && setColorvar428gr._msg === 'setColorvar428gr';
	}).effect((setColorvar428gr) => {
		this.Display_SC_Running_received_display_setColorvar428gr_var = true;
		this.Display_SC_Running_display_setColor_var428_var = setColorvar428gr.var428;
		this.Display_SC_Running_display_setColor_g_var = setColorvar428gr.g;
		this.Display_SC_Running_display_setColor_r_var = setColorvar428gr.r;
		if(this.Display_SC_Running_received_display_setColorb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar428gr_var = false;
		this.Display_SC_Running_received_display_setColorb_var = false;
		
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
		
		
		if(86 < 74) {
		setTimeout(() => this.bus.emit('vctrl?positionvar440xy', posX, 0x91, 0x8F, 0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar440xy_bis', 0x2F, 0x91, 0, posX), 0);
		
		}
		if(90 < 202) {
		setTimeout(() => this.bus.emit('vctrl?position_', 0x1F), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?position__bis', 0x2A), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(21 < 213) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy', 0, 0x5C, 0xE6,  -8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy_bis', 0xE6, 0,  -8, 0x68), 0);
			
			}
			if(60 < 227) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0xAA), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0x5A), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(18 < 65) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy', 0, 0xB4, 0x0A, 8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy_bis', 0x0A, 0, 8, 0xAF), 0);
			
			}
			if(227 < 87) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x8B), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0x67), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(53 < 216) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0xD6), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0x7F), 0);
			
			}
			if(143 < 160) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy', 0, 0x29, 0x9A, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy_bis', 0x9A, 0, 0, 0x2D), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(193 < 93) {
		setTimeout(() => this.bus.emit('vctrl?positionvar440xy', x, 0x58, 0x15, 0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar440xy_bis', 0xC6, 0x58, 0, x), 0);
		
		}
		if(41 < 167) {
		setTimeout(() => this.bus.emit('vctrl?position_', 0x6B), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?position__bis', 0xF2), 0);
		
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

DisplayBrowser.prototype.receivecreateysizeOndisplay = function(var460, ysize) {
	this._receive({_port:"display", _msg:"createysize", var460:var460, ysize:ysize});
}

DisplayBrowser.prototype.receivecreatevar434xsizeOndisplay = function(xsize, var461, var434) {
	this._receive({_port:"display", _msg:"createvar434xsize", xsize:xsize, var461:var461, var434:var434});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(var470) {
	this._receive({_port:"display", _msg:"destroy_", var470:var470});
}

DisplayBrowser.prototype.receivedestroyvar435Ondisplay = function(var471, var435) {
	this._receive({_port:"display", _msg:"destroyvar435", var471:var471, var435:var435});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(var456) {
	this._receive({_port:"display", _msg:"update_", var456:var456});
}

DisplayBrowser.prototype.receiveupdatevar436Ondisplay = function(var457, var436) {
	this._receive({_port:"display", _msg:"updatevar436", var457:var457, var436:var436});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(var454) {
	this._receive({_port:"display", _msg:"clear_", var454:var454});
}

DisplayBrowser.prototype.receiveclearvar427Ondisplay = function(var427, var455) {
	this._receive({_port:"display", _msg:"clearvar427", var427:var427, var455:var455});
}

DisplayBrowser.prototype.receivesetColorbOndisplay = function(b, var462) {
	this._receive({_port:"display", _msg:"setColorb", b:b, var462:var462});
}

DisplayBrowser.prototype.receivesetColorvar428grOndisplay = function(r, g, var428, var463) {
	this._receive({_port:"display", _msg:"setColorvar428gr", r:r, g:g, var428:var428, var463:var463});
}

DisplayBrowser.prototype.receivesetBGColorrgOndisplay = function(r, var466, g) {
	this._receive({_port:"display", _msg:"setBGColorrg", r:r, var466:var466, g:g});
}

DisplayBrowser.prototype.receivesetBGColorvar429bOndisplay = function(var429, var467, b) {
	this._receive({_port:"display", _msg:"setBGColorvar429b", var429:var429, var467:var467, b:b});
}

DisplayBrowser.prototype.receivedrawRectheightxwidthOndisplay = function(height, var452, width, x) {
	this._receive({_port:"display", _msg:"drawRectheightxwidth", height:height, var452:var452, width:width, x:x});
}

DisplayBrowser.prototype.receivedrawRectyvar430Ondisplay = function(var430, var453, y) {
	this._receive({_port:"display", _msg:"drawRectyvar430", var430:var430, var453:var453, y:y});
}

DisplayBrowser.prototype.receivefillRectxwidthOndisplay = function(var464, width, x) {
	this._receive({_port:"display", _msg:"fillRectxwidth", var464:var464, width:width, x:x});
}

DisplayBrowser.prototype.receivefillRectyheightvar431Ondisplay = function(var431, y, var465, height) {
	this._receive({_port:"display", _msg:"fillRectyheightvar431", var431:var431, y:y, var465:var465, height:height});
}

DisplayBrowser.prototype.receivedrawIntegerxscalevar432digitsOndisplay = function(var468, digits, scale, var432, x) {
	this._receive({_port:"display", _msg:"drawIntegerxscalevar432digits", var468:var468, digits:digits, scale:scale, var432:var432, x:x});
}

DisplayBrowser.prototype.receivedrawIntegervyOndisplay = function(v, y, var469) {
	this._receive({_port:"display", _msg:"drawIntegervy", v:v, y:y, var469:var469});
}

DisplayBrowser.prototype.receivedrawThingMLvar433Ondisplay = function(var450, var433) {
	this._receive({_port:"display", _msg:"drawThingMLvar433", var450:var450, var433:var433});
}

DisplayBrowser.prototype.receivedrawThingMLxyOndisplay = function(var451, x, y) {
	this._receive({_port:"display", _msg:"drawThingMLxy", var451:var451, x:x, y:y});
}

DisplayBrowser.prototype.receivecreateysize_bisOndisplay = function(ysize, var484) {
	this._receive({_port:"display", _msg:"createysize_bis", ysize:ysize, var484:var484});
}

DisplayBrowser.prototype.receivecreatevar434xsize_bisOndisplay = function(var485, var434, xsize) {
	this._receive({_port:"display", _msg:"createvar434xsize_bis", var485:var485, var434:var434, xsize:xsize});
}

DisplayBrowser.prototype.receivedestroy__bisOndisplay = function(var494) {
	this._receive({_port:"display", _msg:"destroy__bis", var494:var494});
}

DisplayBrowser.prototype.receivedestroyvar435_bisOndisplay = function(var435, var495) {
	this._receive({_port:"display", _msg:"destroyvar435_bis", var435:var435, var495:var495});
}

DisplayBrowser.prototype.receiveupdate__bisOndisplay = function(var480) {
	this._receive({_port:"display", _msg:"update__bis", var480:var480});
}

DisplayBrowser.prototype.receiveupdatevar436_bisOndisplay = function(var436, var481) {
	this._receive({_port:"display", _msg:"updatevar436_bis", var436:var436, var481:var481});
}

DisplayBrowser.prototype.receiveclear__bisOndisplay = function(var478) {
	this._receive({_port:"display", _msg:"clear__bis", var478:var478});
}

DisplayBrowser.prototype.receiveclearvar427_bisOndisplay = function(var479, var427) {
	this._receive({_port:"display", _msg:"clearvar427_bis", var479:var479, var427:var427});
}

DisplayBrowser.prototype.receivesetColorb_bisOndisplay = function(var486, b) {
	this._receive({_port:"display", _msg:"setColorb_bis", var486:var486, b:b});
}

DisplayBrowser.prototype.receivesetColorvar428gr_bisOndisplay = function(g, r, var428, var487) {
	this._receive({_port:"display", _msg:"setColorvar428gr_bis", g:g, r:r, var428:var428, var487:var487});
}

DisplayBrowser.prototype.receivesetBGColorrg_bisOndisplay = function(g, r, var490) {
	this._receive({_port:"display", _msg:"setBGColorrg_bis", g:g, r:r, var490:var490});
}

DisplayBrowser.prototype.receivesetBGColorvar429b_bisOndisplay = function(var429, b, var491) {
	this._receive({_port:"display", _msg:"setBGColorvar429b_bis", var429:var429, b:b, var491:var491});
}

DisplayBrowser.prototype.receivedrawRectheightxwidth_bisOndisplay = function(height, width, x, var476) {
	this._receive({_port:"display", _msg:"drawRectheightxwidth_bis", height:height, width:width, x:x, var476:var476});
}

DisplayBrowser.prototype.receivedrawRectyvar430_bisOndisplay = function(var430, var477, y) {
	this._receive({_port:"display", _msg:"drawRectyvar430_bis", var430:var430, var477:var477, y:y});
}

DisplayBrowser.prototype.receivefillRectxwidth_bisOndisplay = function(var488, width, x) {
	this._receive({_port:"display", _msg:"fillRectxwidth_bis", var488:var488, width:width, x:x});
}

DisplayBrowser.prototype.receivefillRectyheightvar431_bisOndisplay = function(height, var489, var431, y) {
	this._receive({_port:"display", _msg:"fillRectyheightvar431_bis", height:height, var489:var489, var431:var431, y:y});
}

DisplayBrowser.prototype.receivedrawIntegerxscalevar432digits_bisOndisplay = function(x, var492, digits, var432, scale) {
	this._receive({_port:"display", _msg:"drawIntegerxscalevar432digits_bis", x:x, var492:var492, digits:digits, var432:var432, scale:scale});
}

DisplayBrowser.prototype.receivedrawIntegervy_bisOndisplay = function(var493, y, v) {
	this._receive({_port:"display", _msg:"drawIntegervy_bis", var493:var493, y:y, v:v});
}

DisplayBrowser.prototype.receivedrawThingMLvar433_bisOndisplay = function(var474, var433) {
	this._receive({_port:"display", _msg:"drawThingMLvar433_bis", var474:var474, var433:var433});
}

DisplayBrowser.prototype.receivedrawThingMLxy_bisOndisplay = function(x, var475, y) {
	this._receive({_port:"display", _msg:"drawThingMLxy_bis", x:x, var475:var475, y:y});
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyvar435_var = function(Display_SC_Running_received_display_destroyvar435_var) {
	this.Display_SC_Running_received_display_destroyvar435_var = Display_SC_Running_received_display_destroyvar435_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectheightxwidth_var = function(Display_SC_Running_received_display_drawRectheightxwidth_var) {
	this.Display_SC_Running_received_display_drawRectheightxwidth_var = Display_SC_Running_received_display_drawRectheightxwidth_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectxwidth_var = function(Display_SC_Running_received_display_fillRectxwidth_var) {
	this.Display_SC_Running_received_display_fillRectxwidth_var = Display_SC_Running_received_display_fillRectxwidth_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectyheightvar431_var = function(Display_SC_Running_received_display_fillRectyheightvar431_var) {
	this.Display_SC_Running_received_display_fillRectyheightvar431_var = Display_SC_Running_received_display_fillRectyheightvar431_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_var435_var = function(Display_SC_Running_display_destroy_var435_var) {
	this.Display_SC_Running_display_destroy_var435_var = Display_SC_Running_display_destroy_var435_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updatevar436_var = function(Display_SC_Running_received_display_updatevar436_var) {
	this.Display_SC_Running_received_display_updatevar436_var = Display_SC_Running_received_display_updatevar436_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorvar429b_var = function(Display_SC_Running_received_display_setBGColorvar429b_var) {
	this.Display_SC_Running_received_display_setBGColorvar429b_var = Display_SC_Running_received_display_setBGColorvar429b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_var427_var = function(Display_SC_Running_display_clear_var427_var) {
	this.Display_SC_Running_display_clear_var427_var = Display_SC_Running_display_clear_var427_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_var428_var = function(Display_SC_Running_display_setColor_var428_var) {
	this.Display_SC_Running_display_setColor_var428_var = Display_SC_Running_display_setColor_var428_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLvar433_var = function(Display_SC_Running_received_display_drawThingMLvar433_var) {
	this.Display_SC_Running_received_display_drawThingMLvar433_var = Display_SC_Running_received_display_drawThingMLvar433_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_var431_var = function(Display_SC_Running_display_fillRect_var431_var) {
	this.Display_SC_Running_display_fillRect_var431_var = Display_SC_Running_display_fillRect_var431_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLxy_var = function(Display_SC_Running_received_display_drawThingMLxy_var) {
	this.Display_SC_Running_received_display_drawThingMLxy_var = Display_SC_Running_received_display_drawThingMLxy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_var434_var = function(Display_SC_Wait_display_create_var434_var) {
	this.Display_SC_Wait_display_create_var434_var = Display_SC_Wait_display_create_var434_var;
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

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_var430_var = function(Display_SC_Running_display_drawRect_var430_var) {
	this.Display_SC_Running_display_drawRect_var430_var = Display_SC_Running_display_drawRect_var430_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createvar434xsize_var = function(Display_SC_Wait_received_display_createvar434xsize_var) {
	this.Display_SC_Wait_received_display_createvar434xsize_var = Display_SC_Wait_received_display_createvar434xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorrg_var = function(Display_SC_Running_received_display_setBGColorrg_var) {
	this.Display_SC_Running_received_display_setBGColorrg_var = Display_SC_Running_received_display_setBGColorrg_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegervy_var = function(Display_SC_Running_received_display_drawIntegervy_var) {
	this.Display_SC_Running_received_display_drawIntegervy_var = Display_SC_Running_received_display_drawIntegervy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_var436_var = function(Display_SC_Running_display_update_var436_var) {
	this.Display_SC_Running_display_update_var436_var = Display_SC_Running_display_update_var436_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorvar428gr_var = function(Display_SC_Running_received_display_setColorvar428gr_var) {
	this.Display_SC_Running_received_display_setColorvar428gr_var = Display_SC_Running_received_display_setColorvar428gr_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
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

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_var432_var = function(Display_SC_Running_display_drawInteger_var432_var) {
	this.Display_SC_Running_display_drawInteger_var432_var = Display_SC_Running_display_drawInteger_var432_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createysize_var = function(Display_SC_Wait_received_display_createysize_var) {
	this.Display_SC_Wait_received_display_createysize_var = Display_SC_Wait_received_display_createysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectyvar430_var = function(Display_SC_Running_received_display_drawRectyvar430_var) {
	this.Display_SC_Running_received_display_drawRectyvar430_var = Display_SC_Running_received_display_drawRectyvar430_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_var429_var = function(Display_SC_Running_display_setBGColor_var429_var) {
	this.Display_SC_Running_display_setBGColor_var429_var = Display_SC_Running_display_setBGColor_var429_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearvar427_var = function(Display_SC_Running_received_display_clearvar427_var) {
	this.Display_SC_Running_received_display_clearvar427_var = Display_SC_Running_received_display_clearvar427_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerxscalevar432digits_var = function(Display_SC_Running_received_display_drawIntegerxscalevar432digits_var) {
	this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var = Display_SC_Running_received_display_drawIntegerxscalevar432digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorb_var = function(Display_SC_Running_received_display_setColorb_var) {
	this.Display_SC_Running_received_display_setColorb_var = Display_SC_Running_received_display_setColorb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_var433_var = function(Display_SC_Running_display_drawThingML_var433_var) {
	this.Display_SC_Running_display_drawThingML_var433_var = Display_SC_Running_display_drawThingML_var433_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\treceived_display_destroyvar435 = ' + this.Display_SC_Running_received_display_destroyvar435_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\treceived_display_drawRectheightxwidth = ' + this.Display_SC_Running_received_display_drawRectheightxwidth_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\treceived_display_fillRectxwidth = ' + this.Display_SC_Running_received_display_fillRectxwidth_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\treceived_display_fillRectyheightvar431 = ' + this.Display_SC_Running_received_display_fillRectyheightvar431_var;
	result += '\n\tdisplay_destroy_var435 = ' + this.Display_SC_Running_display_destroy_var435_var;
	result += '\n\treceived_display_updatevar436 = ' + this.Display_SC_Running_received_display_updatevar436_var;
	result += '\n\treceived_display_setBGColorvar429b = ' + this.Display_SC_Running_received_display_setBGColorvar429b_var;
	result += '\n\tdisplay_clear_var427 = ' + this.Display_SC_Running_display_clear_var427_var;
	result += '\n\tdisplay_setColor_var428 = ' + this.Display_SC_Running_display_setColor_var428_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\treceived_display_drawThingMLvar433 = ' + this.Display_SC_Running_received_display_drawThingMLvar433_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_fillRect_var431 = ' + this.Display_SC_Running_display_fillRect_var431_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\treceived_display_drawThingMLxy = ' + this.Display_SC_Running_received_display_drawThingMLxy_var;
	result += '\n\tdisplay_create_var434 = ' + this.Display_SC_Wait_display_create_var434_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tdisplay_drawRect_var430 = ' + this.Display_SC_Running_display_drawRect_var430_var;
	result += '\n\treceived_display_createvar434xsize = ' + this.Display_SC_Wait_received_display_createvar434xsize_var;
	result += '\n\treceived_display_setBGColorrg = ' + this.Display_SC_Running_received_display_setBGColorrg_var;
	result += '\n\treceived_display_drawIntegervy = ' + this.Display_SC_Running_received_display_drawIntegervy_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tdisplay_update_var436 = ' + this.Display_SC_Running_display_update_var436_var;
	result += '\n\treceived_display_setColorvar428gr = ' + this.Display_SC_Running_received_display_setColorvar428gr_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_drawInteger_var432 = ' + this.Display_SC_Running_display_drawInteger_var432_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\treceived_display_createysize = ' + this.Display_SC_Wait_received_display_createysize_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_drawRectyvar430 = ' + this.Display_SC_Running_received_display_drawRectyvar430_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_setBGColor_var429 = ' + this.Display_SC_Running_display_setBGColor_var429_var;
	result += '\n\treceived_display_clearvar427 = ' + this.Display_SC_Running_received_display_clearvar427_var;
	result += '\n\treceived_display_drawIntegerxscalevar432digits = ' + this.Display_SC_Running_received_display_drawIntegerxscalevar432digits_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\treceived_display_setColorb = ' + this.Display_SC_Running_received_display_setColorb_var;
	result += '\n\tdisplay_drawThingML_var433 = ' + this.Display_SC_Running_display_drawThingML_var433_var;
	result += '';
	return result;
}

