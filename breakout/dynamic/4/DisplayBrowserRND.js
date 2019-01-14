'use strict';


/*
 * Definition for type : DisplayBrowserRND
 */

function DisplayBrowserRND(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

DisplayBrowserRND.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SC');
	let _initial_Display_SC = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let Display_SC_Wait = new StateJS.State('Wait', this._statemachine);
	let Display_SC_Running = new StateJS.State('Running', this._statemachine).entry(() => {
		if(194 < 132) {
		setTimeout(() => this.bus.emit('display?displayReadyvar437', 0xED, 0x16), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar437_bis', 0x72, 0x16), 0);
		
		}
		if(199 < 31) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x37), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0x57), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((drawRectwidthxvar430) => {
		return drawRectwidthxvar430._port === 'display' && drawRectwidthxvar430._msg === 'drawRectwidthxvar430';
	}).effect((drawRectwidthxvar430) => {
		this.Display_SC_Running_received_display_drawRectwidthxvar430_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthxvar430.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthxvar430.x;
		this.Display_SC_Running_display_drawRect_var430_var = drawRectwidthxvar430.var430;
		if(this.Display_SC_Running_received_display_drawRectyheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthxvar430_var = false;
		this.Display_SC_Running_received_display_drawRectyheight_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorvar429bg) => {
		return setBGColorvar429bg._port === 'display' && setBGColorvar429bg._msg === 'setBGColorvar429bg';
	}).effect((setBGColorvar429bg) => {
		this.Display_SC_Running_received_display_setBGColorvar429bg_var = true;
		this.Display_SC_Running_display_setBGColor_var429_var = setBGColorvar429bg.var429;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorvar429bg.b;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorvar429bg.g;
		if(this.Display_SC_Running_received_display_setBGColorr_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar429bg_var = false;
		this.Display_SC_Running_received_display_setBGColorr_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (this.Display_SC_Wait_received_display_createysizevar434xsize_var);
	}).effect((create__bis) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createysizevar434xsize_var = false;
	});
	Display_SC_Wait.to(null).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (!(this.Display_SC_Wait_received_display_createysizevar434xsize_var));
	}).effect((create__bis) => {
		this.Display_SC_Wait_received_display_create__var = true;
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
	Display_SC_Running.to(null).when((drawRectwidthxvar430_bis) => {
		return drawRectwidthxvar430_bis._port === 'display' && drawRectwidthxvar430_bis._msg === 'drawRectwidthxvar430_bis';
	}).effect((drawRectwidthxvar430_bis) => {
		this.Display_SC_Running_received_display_drawRectwidthxvar430_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthxvar430_bis.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthxvar430_bis.x;
		this.Display_SC_Running_display_drawRect_var430_var = drawRectwidthxvar430_bis.var430;
		if(this.Display_SC_Running_received_display_drawRectyheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthxvar430_var = false;
		this.Display_SC_Running_received_display_drawRectyheight_var = false;
		
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
	Display_SC_Running.to(null).when((setColorrgb_bis) => {
		return setColorrgb_bis._port === 'display' && setColorrgb_bis._msg === 'setColorrgb_bis';
	}).effect((setColorrgb_bis) => {
		this.Display_SC_Running_received_display_setColorrgb_var = true;
		this.Display_SC_Running_display_setColor_r_var = setColorrgb_bis.r;
		this.Display_SC_Running_display_setColor_g_var = setColorrgb_bis.g;
		this.Display_SC_Running_display_setColor_b_var = setColorrgb_bis.b;
		if(this.Display_SC_Running_received_display_setColorvar428_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorrgb_var = false;
		this.Display_SC_Running_received_display_setColorvar428_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyheight_bis) => {
		return drawRectyheight_bis._port === 'display' && drawRectyheight_bis._msg === 'drawRectyheight_bis';
	}).effect((drawRectyheight_bis) => {
		this.Display_SC_Running_received_display_drawRectyheight_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyheight_bis.y;
		this.Display_SC_Running_display_drawRect_height_var = drawRectyheight_bis.height;
		if(this.Display_SC_Running_received_display_drawRectwidthxvar430_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyheight_var = false;
		this.Display_SC_Running_received_display_drawRectwidthxvar430_var = false;
		
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
	Display_SC_Wait.to(Display_SC_Running).when((createysizevar434xsize_bis) => {
		return createysizevar434xsize_bis._port === 'display' && createysizevar434xsize_bis._msg === 'createysizevar434xsize_bis' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createysizevar434xsize_bis) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizevar434xsize_bis.ysize;
		this.Display_SC_Wait_display_create_var434_var = createysizevar434xsize_bis.var434;
		this.Display_SC_Wait_display_create_xsize_var = createysizevar434xsize_bis.xsize;
		this.initDisplay(createysizevar434xsize_bis.xsize, createysizevar434xsize_bis.ysize);
		this.Display_SC_Wait_received_display_createysizevar434xsize_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createysizevar434xsize_bis) => {
		return createysizevar434xsize_bis._port === 'display' && createysizevar434xsize_bis._msg === 'createysizevar434xsize_bis' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createysizevar434xsize_bis) => {
		this.Display_SC_Wait_received_display_createysizevar434xsize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizevar434xsize_bis.ysize;
		this.Display_SC_Wait_display_create_var434_var = createysizevar434xsize_bis.var434;
		this.Display_SC_Wait_display_create_xsize_var = createysizevar434xsize_bis.xsize;
	});
	Display_SC_Wait.to(Display_SC_Running).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (this.Display_SC_Wait_received_display_createysizevar434xsize_var);
	}).effect((create_) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createysizevar434xsize_var = false;
	});
	Display_SC_Wait.to(null).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (!(this.Display_SC_Wait_received_display_createysizevar434xsize_var));
	}).effect((create_) => {
		this.Display_SC_Wait_received_display_create__var = true;
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
	Display_SC_Running.to(null).when((setBGColorvar429bg_bis) => {
		return setBGColorvar429bg_bis._port === 'display' && setBGColorvar429bg_bis._msg === 'setBGColorvar429bg_bis';
	}).effect((setBGColorvar429bg_bis) => {
		this.Display_SC_Running_received_display_setBGColorvar429bg_var = true;
		this.Display_SC_Running_display_setBGColor_var429_var = setBGColorvar429bg_bis.var429;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorvar429bg_bis.b;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorvar429bg_bis.g;
		if(this.Display_SC_Running_received_display_setBGColorr_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar429bg_var = false;
		this.Display_SC_Running_received_display_setBGColorr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerdigitsscalexy_bis) => {
		return drawIntegerdigitsscalexy_bis._port === 'display' && drawIntegerdigitsscalexy_bis._msg === 'drawIntegerdigitsscalexy_bis';
	}).effect((drawIntegerdigitsscalexy_bis) => {
		this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var = true;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerdigitsscalexy_bis.digits;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerdigitsscalexy_bis.scale;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerdigitsscalexy_bis.x;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerdigitsscalexy_bis.y;
		if(this.Display_SC_Running_received_display_drawIntegervar432v_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var = false;
		this.Display_SC_Running_received_display_drawIntegervar432v_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorr) => {
		return setBGColorr._port === 'display' && setBGColorr._msg === 'setBGColorr';
	}).effect((setBGColorr) => {
		this.Display_SC_Running_received_display_setBGColorr_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorr.r;
		if(this.Display_SC_Running_received_display_setBGColorvar429bg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorr_var = false;
		this.Display_SC_Running_received_display_setBGColorvar429bg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar428) => {
		return setColorvar428._port === 'display' && setColorvar428._msg === 'setColorvar428';
	}).effect((setColorvar428) => {
		this.Display_SC_Running_received_display_setColorvar428_var = true;
		this.Display_SC_Running_display_setColor_var428_var = setColorvar428.var428;
		if(this.Display_SC_Running_received_display_setColorrgb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar428_var = false;
		this.Display_SC_Running_received_display_setColorrgb_var = false;
		
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
	Display_SC_Running.to(null).when((drawThingMLy_bis) => {
		return drawThingMLy_bis._port === 'display' && drawThingMLy_bis._msg === 'drawThingMLy_bis';
	}).effect((drawThingMLy_bis) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy_bis.y;
		if(this.Display_SC_Running_received_display_drawThingMLxvar433_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLxvar433_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervar432v) => {
		return drawIntegervar432v._port === 'display' && drawIntegervar432v._msg === 'drawIntegervar432v';
	}).effect((drawIntegervar432v) => {
		this.Display_SC_Running_received_display_drawIntegervar432v_var = true;
		this.Display_SC_Running_display_drawInteger_var432_var = drawIntegervar432v.var432;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervar432v.v;
		if(this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervar432v_var = false;
		this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLy) => {
		return drawThingMLy._port === 'display' && drawThingMLy._msg === 'drawThingMLy';
	}).effect((drawThingMLy) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy.y;
		if(this.Display_SC_Running_received_display_drawThingMLxvar433_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLxvar433_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLxvar433_bis) => {
		return drawThingMLxvar433_bis._port === 'display' && drawThingMLxvar433_bis._msg === 'drawThingMLxvar433_bis';
	}).effect((drawThingMLxvar433_bis) => {
		this.Display_SC_Running_received_display_drawThingMLxvar433_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxvar433_bis.x;
		this.Display_SC_Running_display_drawThingML_var433_var = drawThingMLxvar433_bis.var433;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxvar433_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectwidthvar431height) => {
		return fillRectwidthvar431height._port === 'display' && fillRectwidthvar431height._msg === 'fillRectwidthvar431height';
	}).effect((fillRectwidthvar431height) => {
		this.Display_SC_Running_received_display_fillRectwidthvar431height_var = true;
		this.Display_SC_Running_display_fillRect_width_var = fillRectwidthvar431height.width;
		this.Display_SC_Running_display_fillRect_var431_var = fillRectwidthvar431height.var431;
		this.Display_SC_Running_display_fillRect_height_var = fillRectwidthvar431height.height;
		if(this.Display_SC_Running_received_display_fillRectxy_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectwidthvar431height_var = false;
		this.Display_SC_Running_received_display_fillRectxy_var = false;
		
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
	Display_SC_Running.to(null).when((drawIntegervar432v_bis) => {
		return drawIntegervar432v_bis._port === 'display' && drawIntegervar432v_bis._msg === 'drawIntegervar432v_bis';
	}).effect((drawIntegervar432v_bis) => {
		this.Display_SC_Running_received_display_drawIntegervar432v_var = true;
		this.Display_SC_Running_display_drawInteger_var432_var = drawIntegervar432v_bis.var432;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervar432v_bis.v;
		if(this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervar432v_var = false;
		this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var = false;
		
		}
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
	Display_SC_Running.to(null).when((drawRectyheight) => {
		return drawRectyheight._port === 'display' && drawRectyheight._msg === 'drawRectyheight';
	}).effect((drawRectyheight) => {
		this.Display_SC_Running_received_display_drawRectyheight_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyheight.y;
		this.Display_SC_Running_display_drawRect_height_var = drawRectyheight.height;
		if(this.Display_SC_Running_received_display_drawRectwidthxvar430_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyheight_var = false;
		this.Display_SC_Running_received_display_drawRectwidthxvar430_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorr_bis) => {
		return setBGColorr_bis._port === 'display' && setBGColorr_bis._msg === 'setBGColorr_bis';
	}).effect((setBGColorr_bis) => {
		this.Display_SC_Running_received_display_setBGColorr_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorr_bis.r;
		if(this.Display_SC_Running_received_display_setBGColorvar429bg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorr_var = false;
		this.Display_SC_Running_received_display_setBGColorvar429bg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectxy) => {
		return fillRectxy._port === 'display' && fillRectxy._msg === 'fillRectxy';
	}).effect((fillRectxy) => {
		this.Display_SC_Running_received_display_fillRectxy_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxy.x;
		this.Display_SC_Running_display_fillRect_y_var = fillRectxy.y;
		if(this.Display_SC_Running_received_display_fillRectwidthvar431height_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxy_var = false;
		this.Display_SC_Running_received_display_fillRectwidthvar431height_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectxy_bis) => {
		return fillRectxy_bis._port === 'display' && fillRectxy_bis._msg === 'fillRectxy_bis';
	}).effect((fillRectxy_bis) => {
		this.Display_SC_Running_received_display_fillRectxy_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxy_bis.x;
		this.Display_SC_Running_display_fillRect_y_var = fillRectxy_bis.y;
		if(this.Display_SC_Running_received_display_fillRectwidthvar431height_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxy_var = false;
		this.Display_SC_Running_received_display_fillRectwidthvar431height_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLxvar433) => {
		return drawThingMLxvar433._port === 'display' && drawThingMLxvar433._msg === 'drawThingMLxvar433';
	}).effect((drawThingMLxvar433) => {
		this.Display_SC_Running_received_display_drawThingMLxvar433_var = true;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLxvar433.x;
		this.Display_SC_Running_display_drawThingML_var433_var = drawThingMLxvar433.var433;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLxvar433_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerdigitsscalexy) => {
		return drawIntegerdigitsscalexy._port === 'display' && drawIntegerdigitsscalexy._msg === 'drawIntegerdigitsscalexy';
	}).effect((drawIntegerdigitsscalexy) => {
		this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var = true;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerdigitsscalexy.digits;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerdigitsscalexy.scale;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerdigitsscalexy.x;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerdigitsscalexy.y;
		if(this.Display_SC_Running_received_display_drawIntegervar432v_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var = false;
		this.Display_SC_Running_received_display_drawIntegervar432v_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar428_bis) => {
		return setColorvar428_bis._port === 'display' && setColorvar428_bis._msg === 'setColorvar428_bis';
	}).effect((setColorvar428_bis) => {
		this.Display_SC_Running_received_display_setColorvar428_var = true;
		this.Display_SC_Running_display_setColor_var428_var = setColorvar428_bis.var428;
		if(this.Display_SC_Running_received_display_setColorrgb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar428_var = false;
		this.Display_SC_Running_received_display_setColorrgb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectwidthvar431height_bis) => {
		return fillRectwidthvar431height_bis._port === 'display' && fillRectwidthvar431height_bis._msg === 'fillRectwidthvar431height_bis';
	}).effect((fillRectwidthvar431height_bis) => {
		this.Display_SC_Running_received_display_fillRectwidthvar431height_var = true;
		this.Display_SC_Running_display_fillRect_width_var = fillRectwidthvar431height_bis.width;
		this.Display_SC_Running_display_fillRect_var431_var = fillRectwidthvar431height_bis.var431;
		this.Display_SC_Running_display_fillRect_height_var = fillRectwidthvar431height_bis.height;
		if(this.Display_SC_Running_received_display_fillRectxy_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectwidthvar431height_var = false;
		this.Display_SC_Running_received_display_fillRectxy_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysizevar434xsize) => {
		return createysizevar434xsize._port === 'display' && createysizevar434xsize._msg === 'createysizevar434xsize' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createysizevar434xsize) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizevar434xsize.ysize;
		this.Display_SC_Wait_display_create_var434_var = createysizevar434xsize.var434;
		this.Display_SC_Wait_display_create_xsize_var = createysizevar434xsize.xsize;
		this.initDisplay(createysizevar434xsize.xsize, createysizevar434xsize.ysize);
		this.Display_SC_Wait_received_display_createysizevar434xsize_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createysizevar434xsize) => {
		return createysizevar434xsize._port === 'display' && createysizevar434xsize._msg === 'createysizevar434xsize' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createysizevar434xsize) => {
		this.Display_SC_Wait_received_display_createysizevar434xsize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizevar434xsize.ysize;
		this.Display_SC_Wait_display_create_var434_var = createysizevar434xsize.var434;
		this.Display_SC_Wait_display_create_xsize_var = createysizevar434xsize.xsize;
	});
	Display_SC_Running.to(null).when((setColorrgb) => {
		return setColorrgb._port === 'display' && setColorrgb._msg === 'setColorrgb';
	}).effect((setColorrgb) => {
		this.Display_SC_Running_received_display_setColorrgb_var = true;
		this.Display_SC_Running_display_setColor_r_var = setColorrgb.r;
		this.Display_SC_Running_display_setColor_g_var = setColorrgb.g;
		this.Display_SC_Running_display_setColor_b_var = setColorrgb.b;
		if(this.Display_SC_Running_received_display_setColorvar428_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorrgb_var = false;
		this.Display_SC_Running_received_display_setColorvar428_var = false;
		
		}
	});
}
DisplayBrowserRND.prototype.drawDigit = function(Display_drawDigit_x_var, Display_drawDigit_y_var, Display_drawDigit_d_var, Display_drawDigit_size_var) {
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

DisplayBrowserRND.prototype.drawThingML = function(Display_drawThingML_px_var, Display_drawThingML_py_var) {
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

DisplayBrowserRND.prototype.drawInteger = function(Display_drawInteger_x_var, Display_drawInteger_y_var, Display_drawInteger_v_var, Display_drawInteger_digits_var, Display_drawInteger_scale_var) {
	this.clearInteger(Display_drawInteger_x_var, Display_drawInteger_y_var, Display_drawInteger_digits_var, Display_drawInteger_scale_var);
	let val_var = Display_drawInteger_v_var;
	let d_var = Display_drawInteger_digits_var;
	while(d_var > 0) {
	this.drawDigit(Display_drawInteger_x_var + (d_var - 1) * 4 * Display_drawInteger_scale_var, Display_drawInteger_y_var, val_var % 10, Display_drawInteger_scale_var);
	val_var = Math.trunc(val_var / 10);
	d_var = d_var - 1;
	
	}
}

DisplayBrowserRND.prototype.clearInteger = function(Display_clearInteger_x_var, Display_clearInteger_y_var, Display_clearInteger_digits_var, Display_clearInteger_scale_var) {
	this.setColor(this.Display_bg_r_var, this.Display_bg_g_var, this.Display_bg_b_var);
	this.fillRect(Display_clearInteger_x_var, Display_clearInteger_y_var, (Display_clearInteger_digits_var * 4 - 1) * Display_clearInteger_scale_var, 5 * Display_clearInteger_scale_var);
	this.setColor(this.Display_fg_r_var, this.Display_fg_g_var, this.Display_fg_b_var);
}

DisplayBrowserRND.prototype.initDisplay = function(DisplayBrowser_initDisplay_xsize_var, DisplayBrowser_initDisplay_ysize_var) {
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
		
		
		if(167 < 51) {
		setTimeout(() => this.bus.emit('vctrl?positionxy', posX, 0x73, 0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionxy_bis', 0x55, 0, posX), 0);
		
		}
		if(30 < 111) {
		setTimeout(() => this.bus.emit('vctrl?positionvar440', 0xB8, 0x89), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar440_bis', 0x89, 0xFB), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(6 < 111) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x07), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0x67), 0);
			
			}
			if(249 < 144) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy', 0, 0x70, 0xA1,  -8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy_bis', 0,  -8, 0xA1, 0x11), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(50 < 200) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x75), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0xD0), 0);
			
			}
			if(115 < 234) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy', 0, 0x3C, 0xBF, 8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy_bis', 0, 8, 0xBF, 0xE7), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(69 < 179) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x8F), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0x57), 0);
			
			}
			if(205 < 170) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy', 0, 0xB7, 0xE4, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar439dxdy_bis', 0, 0, 0xE4, 0xF2), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(61 < 165) {
		setTimeout(() => this.bus.emit('vctrl?positionxy', x, 0x76, 0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionxy_bis', 0x7E, 0, x), 0);
		
		}
		if(68 < 175) {
		setTimeout(() => this.bus.emit('vctrl?positionvar440', 0xB7, 0xE5), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar440_bis', 0xE5, 0x74), 0);
		
		}
		
			};
		
}

DisplayBrowserRND.prototype.destroyDisplay = function() {
	
}

DisplayBrowserRND.prototype.updateDisplay = function() {
	this.DisplayBrowser_Display_var.drawImage(this.DisplayBrowser_BufferCanvas_var, 0, 0, this.DisplayBrowser_XFRAMESIZE_var * this.DisplayBrowser_SCALE_var, this.DisplayBrowser_YFRAMESIZE_var * this.DisplayBrowser_SCALE_var);
}

DisplayBrowserRND.prototype.clearScreen = function() {
	this.setColor(0, 0, 0);
	this.fillRect(0, 0, this.DisplayBrowser_XFRAMESIZE_var, this.DisplayBrowser_YFRAMESIZE_var);
	this.updateDisplay();
}

DisplayBrowserRND.prototype.setColor = function(DisplayBrowser_setColor_r_var, DisplayBrowser_setColor_g_var, DisplayBrowser_setColor_b_var) {
	
		this.DisplayBrowser_Buffer_var.strokeStyle = "rgb("+DisplayBrowser_setColor_r_var+", "+DisplayBrowser_setColor_g_var+", "+DisplayBrowser_setColor_b_var+")";
		this.DisplayBrowser_Buffer_var.fillStyle = "rgb("+DisplayBrowser_setColor_r_var+", "+DisplayBrowser_setColor_g_var+", "+DisplayBrowser_setColor_b_var+")";
	
}

DisplayBrowserRND.prototype.drawRect = function(DisplayBrowser_drawRect_x_var, DisplayBrowser_drawRect_y_var, DisplayBrowser_drawRect_width_var, DisplayBrowser_drawRect_height_var) {
	
		var xr = Math.floor(DisplayBrowser_drawRect_x_var);
		var yr = Math.floor(DisplayBrowser_drawRect_y_var);
		var wr = Math.floor(DisplayBrowser_drawRect_width_var);
		var hr = Math.floor(DisplayBrowser_drawRect_height_var);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, wr, 1);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr+hr-1, wr, 1);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, 1, hr);
		this.DisplayBrowser_Buffer_var.fillRect(xr+wr-1, yr, 1, hr);
	
}

DisplayBrowserRND.prototype.fillRect = function(DisplayBrowser_fillRect_x_var, DisplayBrowser_fillRect_y_var, DisplayBrowser_fillRect_width_var, DisplayBrowser_fillRect_height_var) {
	
		var xr = Math.floor(DisplayBrowser_fillRect_x_var);
		var yr = Math.floor(DisplayBrowser_fillRect_y_var);
		var wr = Math.floor(DisplayBrowser_fillRect_width_var);
		var hr = Math.floor(DisplayBrowser_fillRect_height_var);
		this.DisplayBrowser_Buffer_var.fillRect(xr, yr, wr, hr);
	
}

DisplayBrowserRND.prototype.rnd = function() {
	return Math.floor(Math.random() * Math.floor(246)) + 5;
}

DisplayBrowserRND.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

DisplayBrowserRND.prototype._delete = function() {
	this._statemachine = null;
	this._SC_instance = null;
	this.bus.removeAllListeners();
}

DisplayBrowserRND.prototype._init = function() {
	this._SC_instance = new StateJS.Instance("SC_instance", this._statemachine);
	this.ready = true;
}

DisplayBrowserRND.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SC_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

DisplayBrowserRND.prototype.receivecreate_Ondisplay = function(var452) {
	this._receive({_port:"display", _msg:"create_", var452:var452});
}

DisplayBrowserRND.prototype.receivecreateysizevar434xsizeOndisplay = function(ysize, var434, var453, xsize) {
	this._receive({_port:"display", _msg:"createysizevar434xsize", ysize:ysize, var434:var434, var453:var453, xsize:xsize});
}

DisplayBrowserRND.prototype.receivedestroy_Ondisplay = function(var450) {
	this._receive({_port:"display", _msg:"destroy_", var450:var450});
}

DisplayBrowserRND.prototype.receivedestroyvar435Ondisplay = function(var451, var435) {
	this._receive({_port:"display", _msg:"destroyvar435", var451:var451, var435:var435});
}

DisplayBrowserRND.prototype.receiveupdate_Ondisplay = function(var462) {
	this._receive({_port:"display", _msg:"update_", var462:var462});
}

DisplayBrowserRND.prototype.receiveupdatevar436Ondisplay = function(var436, var463) {
	this._receive({_port:"display", _msg:"updatevar436", var436:var436, var463:var463});
}

DisplayBrowserRND.prototype.receiveclear_Ondisplay = function(var456) {
	this._receive({_port:"display", _msg:"clear_", var456:var456});
}

DisplayBrowserRND.prototype.receiveclearvar427Ondisplay = function(var427, var457) {
	this._receive({_port:"display", _msg:"clearvar427", var427:var427, var457:var457});
}

DisplayBrowserRND.prototype.receivesetColorrgbOndisplay = function(b, r, g, var466) {
	this._receive({_port:"display", _msg:"setColorrgb", b:b, r:r, g:g, var466:var466});
}

DisplayBrowserRND.prototype.receivesetColorvar428Ondisplay = function(var428, var467) {
	this._receive({_port:"display", _msg:"setColorvar428", var428:var428, var467:var467});
}

DisplayBrowserRND.prototype.receivesetBGColorrOndisplay = function(var460, r) {
	this._receive({_port:"display", _msg:"setBGColorr", var460:var460, r:r});
}

DisplayBrowserRND.prototype.receivesetBGColorvar429bgOndisplay = function(g, var429, b, var461) {
	this._receive({_port:"display", _msg:"setBGColorvar429bg", g:g, var429:var429, b:b, var461:var461});
}

DisplayBrowserRND.prototype.receivedrawRectwidthxvar430Ondisplay = function(var430, x, width, var470) {
	this._receive({_port:"display", _msg:"drawRectwidthxvar430", var430:var430, x:x, width:width, var470:var470});
}

DisplayBrowserRND.prototype.receivedrawRectyheightOndisplay = function(y, var471, height) {
	this._receive({_port:"display", _msg:"drawRectyheight", y:y, var471:var471, height:height});
}

DisplayBrowserRND.prototype.receivefillRectwidthvar431heightOndisplay = function(height, var431, width, var458) {
	this._receive({_port:"display", _msg:"fillRectwidthvar431height", height:height, var431:var431, width:width, var458:var458});
}

DisplayBrowserRND.prototype.receivefillRectxyOndisplay = function(x, y, var459) {
	this._receive({_port:"display", _msg:"fillRectxy", x:x, y:y, var459:var459});
}

DisplayBrowserRND.prototype.receivedrawIntegerdigitsscalexyOndisplay = function(digits, x, y, var468, scale) {
	this._receive({_port:"display", _msg:"drawIntegerdigitsscalexy", digits:digits, x:x, y:y, var468:var468, scale:scale});
}

DisplayBrowserRND.prototype.receivedrawIntegervar432vOndisplay = function(var469, v, var432) {
	this._receive({_port:"display", _msg:"drawIntegervar432v", var469:var469, v:v, var432:var432});
}

DisplayBrowserRND.prototype.receivedrawThingMLxvar433Ondisplay = function(x, var454, var433) {
	this._receive({_port:"display", _msg:"drawThingMLxvar433", x:x, var454:var454, var433:var433});
}

DisplayBrowserRND.prototype.receivedrawThingMLyOndisplay = function(y, var455) {
	this._receive({_port:"display", _msg:"drawThingMLy", y:y, var455:var455});
}

DisplayBrowserRND.prototype.receivecreate__bisOndisplay = function(var476) {
	this._receive({_port:"display", _msg:"create__bis", var476:var476});
}

DisplayBrowserRND.prototype.receivecreateysizevar434xsize_bisOndisplay = function(ysize, var434, var477, xsize) {
	this._receive({_port:"display", _msg:"createysizevar434xsize_bis", ysize:ysize, var434:var434, var477:var477, xsize:xsize});
}

DisplayBrowserRND.prototype.receivedestroy__bisOndisplay = function(var474) {
	this._receive({_port:"display", _msg:"destroy__bis", var474:var474});
}

DisplayBrowserRND.prototype.receivedestroyvar435_bisOndisplay = function(var435, var475) {
	this._receive({_port:"display", _msg:"destroyvar435_bis", var435:var435, var475:var475});
}

DisplayBrowserRND.prototype.receiveupdate__bisOndisplay = function(var486) {
	this._receive({_port:"display", _msg:"update__bis", var486:var486});
}

DisplayBrowserRND.prototype.receiveupdatevar436_bisOndisplay = function(var487, var436) {
	this._receive({_port:"display", _msg:"updatevar436_bis", var487:var487, var436:var436});
}

DisplayBrowserRND.prototype.receiveclear__bisOndisplay = function(var480) {
	this._receive({_port:"display", _msg:"clear__bis", var480:var480});
}

DisplayBrowserRND.prototype.receiveclearvar427_bisOndisplay = function(var427, var481) {
	this._receive({_port:"display", _msg:"clearvar427_bis", var427:var427, var481:var481});
}

DisplayBrowserRND.prototype.receivesetColorrgb_bisOndisplay = function(b, g, r, var490) {
	this._receive({_port:"display", _msg:"setColorrgb_bis", b:b, g:g, r:r, var490:var490});
}

DisplayBrowserRND.prototype.receivesetColorvar428_bisOndisplay = function(var491, var428) {
	this._receive({_port:"display", _msg:"setColorvar428_bis", var491:var491, var428:var428});
}

DisplayBrowserRND.prototype.receivesetBGColorr_bisOndisplay = function(var484, r) {
	this._receive({_port:"display", _msg:"setBGColorr_bis", var484:var484, r:r});
}

DisplayBrowserRND.prototype.receivesetBGColorvar429bg_bisOndisplay = function(b, g, var429, var485) {
	this._receive({_port:"display", _msg:"setBGColorvar429bg_bis", b:b, g:g, var429:var429, var485:var485});
}

DisplayBrowserRND.prototype.receivedrawRectwidthxvar430_bisOndisplay = function(x, var430, var494, width) {
	this._receive({_port:"display", _msg:"drawRectwidthxvar430_bis", x:x, var430:var430, var494:var494, width:width});
}

DisplayBrowserRND.prototype.receivedrawRectyheight_bisOndisplay = function(y, height, var495) {
	this._receive({_port:"display", _msg:"drawRectyheight_bis", y:y, height:height, var495:var495});
}

DisplayBrowserRND.prototype.receivefillRectwidthvar431height_bisOndisplay = function(var431, height, var482, width) {
	this._receive({_port:"display", _msg:"fillRectwidthvar431height_bis", var431:var431, height:height, var482:var482, width:width});
}

DisplayBrowserRND.prototype.receivefillRectxy_bisOndisplay = function(x, var483, y) {
	this._receive({_port:"display", _msg:"fillRectxy_bis", x:x, var483:var483, y:y});
}

DisplayBrowserRND.prototype.receivedrawIntegerdigitsscalexy_bisOndisplay = function(y, digits, var492, x, scale) {
	this._receive({_port:"display", _msg:"drawIntegerdigitsscalexy_bis", y:y, digits:digits, var492:var492, x:x, scale:scale});
}

DisplayBrowserRND.prototype.receivedrawIntegervar432v_bisOndisplay = function(var493, var432, v) {
	this._receive({_port:"display", _msg:"drawIntegervar432v_bis", var493:var493, var432:var432, v:v});
}

DisplayBrowserRND.prototype.receivedrawThingMLxvar433_bisOndisplay = function(var478, var433, x) {
	this._receive({_port:"display", _msg:"drawThingMLxvar433_bis", var478:var478, var433:var433, x:x});
}

DisplayBrowserRND.prototype.receivedrawThingMLy_bisOndisplay = function(y, var479) {
	this._receive({_port:"display", _msg:"drawThingMLy_bis", y:y, var479:var479});
}

DisplayBrowserRND.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clearvar427_var = function(Display_SC_Running_received_display_clearvar427_var) {
	this.Display_SC_Running_received_display_clearvar427_var = Display_SC_Running_received_display_clearvar427_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_var428_var = function(Display_SC_Running_display_setColor_var428_var) {
	this.Display_SC_Running_display_setColor_var428_var = Display_SC_Running_display_setColor_var428_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_var434_var = function(Display_SC_Wait_display_create_var434_var) {
	this.Display_SC_Wait_display_create_var434_var = Display_SC_Wait_display_create_var434_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_var433_var = function(Display_SC_Running_display_drawThingML_var433_var) {
	this.Display_SC_Running_display_drawThingML_var433_var = Display_SC_Running_display_drawThingML_var433_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_create__var = function(Display_SC_Wait_received_display_create__var) {
	this.Display_SC_Wait_received_display_create__var = Display_SC_Wait_received_display_create__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawIntegerdigitsscalexy_var = function(Display_SC_Running_received_display_drawIntegerdigitsscalexy_var) {
	this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var = Display_SC_Running_received_display_drawIntegerdigitsscalexy_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_clear_var427_var = function(Display_SC_Running_display_clear_var427_var) {
	this.Display_SC_Running_display_clear_var427_var = Display_SC_Running_display_clear_var427_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLxvar433_var = function(Display_SC_Running_received_display_drawThingMLxvar433_var) {
	this.Display_SC_Running_received_display_drawThingMLxvar433_var = Display_SC_Running_received_display_drawThingMLxvar433_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_update_var436_var = function(Display_SC_Running_display_update_var436_var) {
	this.Display_SC_Running_display_update_var436_var = Display_SC_Running_display_update_var436_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorrgb_var = function(Display_SC_Running_received_display_setColorrgb_var) {
	this.Display_SC_Running_received_display_setColorrgb_var = Display_SC_Running_received_display_setColorrgb_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRectyheight_var = function(Display_SC_Running_received_display_drawRectyheight_var) {
	this.Display_SC_Running_received_display_drawRectyheight_var = Display_SC_Running_received_display_drawRectyheight_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_createysizevar434xsize_var = function(Display_SC_Wait_received_display_createysizevar434xsize_var) {
	this.Display_SC_Wait_received_display_createysizevar434xsize_var = Display_SC_Wait_received_display_createysizevar434xsize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_var431_var = function(Display_SC_Running_display_fillRect_var431_var) {
	this.Display_SC_Running_display_fillRect_var431_var = Display_SC_Running_display_fillRect_var431_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_destroy_var435_var = function(Display_SC_Running_display_destroy_var435_var) {
	this.Display_SC_Running_display_destroy_var435_var = Display_SC_Running_display_destroy_var435_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_var430_var = function(Display_SC_Running_display_drawRect_var430_var) {
	this.Display_SC_Running_display_drawRect_var430_var = Display_SC_Running_display_drawRect_var430_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorvar429bg_var = function(Display_SC_Running_received_display_setBGColorvar429bg_var) {
	this.Display_SC_Running_received_display_setBGColorvar429bg_var = Display_SC_Running_received_display_setBGColorvar429bg_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroyvar435_var = function(Display_SC_Running_received_display_destroyvar435_var) {
	this.Display_SC_Running_received_display_destroyvar435_var = Display_SC_Running_received_display_destroyvar435_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawIntegervar432v_var = function(Display_SC_Running_received_display_drawIntegervar432v_var) {
	this.Display_SC_Running_received_display_drawIntegervar432v_var = Display_SC_Running_received_display_drawIntegervar432v_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectwidthvar431height_var = function(Display_SC_Running_received_display_fillRectwidthvar431height_var) {
	this.Display_SC_Running_received_display_fillRectwidthvar431height_var = Display_SC_Running_received_display_fillRectwidthvar431height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_var432_var = function(Display_SC_Running_display_drawInteger_var432_var) {
	this.Display_SC_Running_display_drawInteger_var432_var = Display_SC_Running_display_drawInteger_var432_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_var429_var = function(Display_SC_Running_display_setBGColor_var429_var) {
	this.Display_SC_Running_display_setBGColor_var429_var = Display_SC_Running_display_setBGColor_var429_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowserRND.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorvar428_var = function(Display_SC_Running_received_display_setColorvar428_var) {
	this.Display_SC_Running_received_display_setColorvar428_var = Display_SC_Running_received_display_setColorvar428_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_updatevar436_var = function(Display_SC_Running_received_display_updatevar436_var) {
	this.Display_SC_Running_received_display_updatevar436_var = Display_SC_Running_received_display_updatevar436_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRectwidthxvar430_var = function(Display_SC_Running_received_display_drawRectwidthxvar430_var) {
	this.Display_SC_Running_received_display_drawRectwidthxvar430_var = Display_SC_Running_received_display_drawRectwidthxvar430_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectxy_var = function(Display_SC_Running_received_display_fillRectxy_var) {
	this.Display_SC_Running_received_display_fillRectxy_var = Display_SC_Running_received_display_fillRectxy_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLy_var = function(Display_SC_Running_received_display_drawThingMLy_var) {
	this.Display_SC_Running_received_display_drawThingMLy_var = Display_SC_Running_received_display_drawThingMLy_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorr_var = function(Display_SC_Running_received_display_setBGColorr_var) {
	this.Display_SC_Running_received_display_setBGColorr_var = Display_SC_Running_received_display_setBGColorr_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\treceived_display_clearvar427 = ' + this.Display_SC_Running_received_display_clearvar427_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tdisplay_setColor_var428 = ' + this.Display_SC_Running_display_setColor_var428_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_create_var434 = ' + this.Display_SC_Wait_display_create_var434_var;
	result += '\n\tdisplay_drawThingML_var433 = ' + this.Display_SC_Running_display_drawThingML_var433_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\treceived_display_create_ = ' + this.Display_SC_Wait_received_display_create__var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\treceived_display_drawIntegerdigitsscalexy = ' + this.Display_SC_Running_received_display_drawIntegerdigitsscalexy_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tdisplay_clear_var427 = ' + this.Display_SC_Running_display_clear_var427_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\treceived_display_drawThingMLxvar433 = ' + this.Display_SC_Running_received_display_drawThingMLxvar433_var;
	result += '\n\tdisplay_update_var436 = ' + this.Display_SC_Running_display_update_var436_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\treceived_display_setColorrgb = ' + this.Display_SC_Running_received_display_setColorrgb_var;
	result += '\n\treceived_display_drawRectyheight = ' + this.Display_SC_Running_received_display_drawRectyheight_var;
	result += '\n\treceived_display_createysizevar434xsize = ' + this.Display_SC_Wait_received_display_createysizevar434xsize_var;
	result += '\n\tdisplay_fillRect_var431 = ' + this.Display_SC_Running_display_fillRect_var431_var;
	result += '\n\tdisplay_destroy_var435 = ' + this.Display_SC_Running_display_destroy_var435_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_drawRect_var430 = ' + this.Display_SC_Running_display_drawRect_var430_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\treceived_display_setBGColorvar429bg = ' + this.Display_SC_Running_received_display_setBGColorvar429bg_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\treceived_display_destroyvar435 = ' + this.Display_SC_Running_received_display_destroyvar435_var;
	result += '\n\treceived_display_drawIntegervar432v = ' + this.Display_SC_Running_received_display_drawIntegervar432v_var;
	result += '\n\treceived_display_fillRectwidthvar431height = ' + this.Display_SC_Running_received_display_fillRectwidthvar431height_var;
	result += '\n\tdisplay_drawInteger_var432 = ' + this.Display_SC_Running_display_drawInteger_var432_var;
	result += '\n\tdisplay_setBGColor_var429 = ' + this.Display_SC_Running_display_setBGColor_var429_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\treceived_display_setColorvar428 = ' + this.Display_SC_Running_received_display_setColorvar428_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\treceived_display_updatevar436 = ' + this.Display_SC_Running_received_display_updatevar436_var;
	result += '\n\treceived_display_drawRectwidthxvar430 = ' + this.Display_SC_Running_received_display_drawRectwidthxvar430_var;
	result += '\n\treceived_display_fillRectxy = ' + this.Display_SC_Running_received_display_fillRectxy_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\treceived_display_drawThingMLy = ' + this.Display_SC_Running_received_display_drawThingMLy_var;
	result += '\n\treceived_display_setBGColorr = ' + this.Display_SC_Running_received_display_setBGColorr_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '';
	return result;
}

