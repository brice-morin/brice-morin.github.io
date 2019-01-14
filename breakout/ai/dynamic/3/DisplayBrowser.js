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
		if(108 < 68) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x7E), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0xA7), 0);
		
		}
		if(210 < 115) {
		setTimeout(() => this.bus.emit('display?displayReadyvar331', 0x5C, 0xCA), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar331_bis', 0x5C, 0x45), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((updatevar330) => {
		return updatevar330._port === 'display' && updatevar330._msg === 'updatevar330';
	}).effect((updatevar330) => {
		this.Display_SC_Running_received_display_updatevar330_var = true;
		this.Display_SC_Running_display_update_var330_var = updatevar330.var330;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar330_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervyvar326scale_bis) => {
		return drawIntegervyvar326scale_bis._port === 'display' && drawIntegervyvar326scale_bis._msg === 'drawIntegervyvar326scale_bis';
	}).effect((drawIntegervyvar326scale_bis) => {
		this.Display_SC_Running_received_display_drawIntegervyvar326scale_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervyvar326scale_bis.v;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervyvar326scale_bis.y;
		this.Display_SC_Running_display_drawInteger_var326_var = drawIntegervyvar326scale_bis.var326;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervyvar326scale_bis.scale;
		if(this.Display_SC_Running_received_display_drawIntegerxdigits_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervyvar326scale_var = false;
		this.Display_SC_Running_received_display_drawIntegerxdigits_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectvar324heightwidthx) => {
		return drawRectvar324heightwidthx._port === 'display' && drawRectvar324heightwidthx._msg === 'drawRectvar324heightwidthx';
	}).effect((drawRectvar324heightwidthx) => {
		this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var = true;
		this.Display_SC_Running_display_drawRect_var324_var = drawRectvar324heightwidthx.var324;
		this.Display_SC_Running_display_drawRect_height_var = drawRectvar324heightwidthx.height;
		this.Display_SC_Running_display_drawRect_width_var = drawRectvar324heightwidthx.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectvar324heightwidthx.x;
		if(this.Display_SC_Running_received_display_drawRecty_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var = false;
		this.Display_SC_Running_received_display_drawRecty_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLvar327xy) => {
		return drawThingMLvar327xy._port === 'display' && drawThingMLvar327xy._msg === 'drawThingMLvar327xy';
	}).effect((drawThingMLvar327xy) => {
		this.Display_SC_Running_received_display_drawThingMLvar327xy_var = true;
		this.Display_SC_Running_display_drawThingML_var327_var = drawThingMLvar327xy.var327;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLvar327xy.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLvar327xy.y;
		if(this.Display_SC_Running_received_display_drawThingML__var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar327xy_var = false;
		this.Display_SC_Running_received_display_drawThingML__var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyvar329_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar329_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyvar329_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((drawIntegerxdigits_bis) => {
		return drawIntegerxdigits_bis._port === 'display' && drawIntegerxdigits_bis._msg === 'drawIntegerxdigits_bis';
	}).effect((drawIntegerxdigits_bis) => {
		this.Display_SC_Running_received_display_drawIntegerxdigits_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerxdigits_bis.x;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerxdigits_bis.digits;
		if(this.Display_SC_Running_received_display_drawIntegervyvar326scale_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerxdigits_var = false;
		this.Display_SC_Running_received_display_drawIntegervyvar326scale_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingML_) => {
		return drawThingML_._port === 'display' && drawThingML_._msg === 'drawThingML_';
	}).effect((drawThingML_) => {
		this.Display_SC_Running_received_display_drawThingML__var = true;
		if(this.Display_SC_Running_received_display_drawThingMLvar327xy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingML__var = false;
		this.Display_SC_Running_received_display_drawThingMLvar327xy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColor__bis) => {
		return setBGColor__bis._port === 'display' && setBGColor__bis._msg === 'setBGColor__bis';
	}).effect((setBGColor__bis) => {
		this.Display_SC_Running_received_display_setBGColor__var = true;
		if(this.Display_SC_Running_received_display_setBGColorrvar323gb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColor__var = false;
		this.Display_SC_Running_received_display_setBGColorrvar323gb_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (this.Display_SC_Running_received_display_destroyvar329_var);
	}).effect((destroy__bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar329_var = false;
	});
	Display_SC_Running.to(null).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (!(this.Display_SC_Running_received_display_destroyvar329_var));
	}).effect((destroy__bis) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((clearvar321) => {
		return clearvar321._port === 'display' && clearvar321._msg === 'clearvar321';
	}).effect((clearvar321) => {
		this.Display_SC_Running_received_display_clearvar321_var = true;
		this.Display_SC_Running_display_clear_var321_var = clearvar321.var321;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar321_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorb) => {
		return setColorb._port === 'display' && setColorb._msg === 'setColorb';
	}).effect((setColorb) => {
		this.Display_SC_Running_received_display_setColorb_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorb.b;
		if(this.Display_SC_Running_received_display_setColorvar322rg_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorb_var = false;
		this.Display_SC_Running_received_display_setColorvar322rg_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysizevar328) => {
		return createxsizeysizevar328._port === 'display' && createxsizeysizevar328._msg === 'createxsizeysizevar328' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createxsizeysizevar328) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar328.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar328.ysize;
		this.Display_SC_Wait_display_create_var328_var = createxsizeysizevar328.var328;
		this.initDisplay(createxsizeysizevar328.xsize, createxsizeysizevar328.ysize);
		this.Display_SC_Wait_received_display_createxsizeysizevar328_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysizevar328) => {
		return createxsizeysizevar328._port === 'display' && createxsizeysizevar328._msg === 'createxsizeysizevar328' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createxsizeysizevar328) => {
		this.Display_SC_Wait_received_display_createxsizeysizevar328_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar328.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar328.ysize;
		this.Display_SC_Wait_display_create_var328_var = createxsizeysizevar328.var328;
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysizevar328_bis) => {
		return createxsizeysizevar328_bis._port === 'display' && createxsizeysizevar328_bis._msg === 'createxsizeysizevar328_bis' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createxsizeysizevar328_bis) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar328_bis.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar328_bis.ysize;
		this.Display_SC_Wait_display_create_var328_var = createxsizeysizevar328_bis.var328;
		this.initDisplay(createxsizeysizevar328_bis.xsize, createxsizeysizevar328_bis.ysize);
		this.Display_SC_Wait_received_display_createxsizeysizevar328_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysizevar328_bis) => {
		return createxsizeysizevar328_bis._port === 'display' && createxsizeysizevar328_bis._msg === 'createxsizeysizevar328_bis' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createxsizeysizevar328_bis) => {
		this.Display_SC_Wait_received_display_createxsizeysizevar328_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar328_bis.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar328_bis.ysize;
		this.Display_SC_Wait_display_create_var328_var = createxsizeysizevar328_bis.var328;
	});
	Display_SC_Running.to(null).when((drawThingMLvar327xy_bis) => {
		return drawThingMLvar327xy_bis._port === 'display' && drawThingMLvar327xy_bis._msg === 'drawThingMLvar327xy_bis';
	}).effect((drawThingMLvar327xy_bis) => {
		this.Display_SC_Running_received_display_drawThingMLvar327xy_var = true;
		this.Display_SC_Running_display_drawThingML_var327_var = drawThingMLvar327xy_bis.var327;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLvar327xy_bis.x;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLvar327xy_bis.y;
		if(this.Display_SC_Running_received_display_drawThingML__var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar327xy_var = false;
		this.Display_SC_Running_received_display_drawThingML__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar322rg) => {
		return setColorvar322rg._port === 'display' && setColorvar322rg._msg === 'setColorvar322rg';
	}).effect((setColorvar322rg) => {
		this.Display_SC_Running_received_display_setColorvar322rg_var = true;
		this.Display_SC_Running_display_setColor_var322_var = setColorvar322rg.var322;
		this.Display_SC_Running_display_setColor_r_var = setColorvar322rg.r;
		this.Display_SC_Running_display_setColor_g_var = setColorvar322rg.g;
		if(this.Display_SC_Running_received_display_setColorb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar322rg_var = false;
		this.Display_SC_Running_received_display_setColorb_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar329_bis) => {
		return destroyvar329_bis._port === 'display' && destroyvar329_bis._msg === 'destroyvar329_bis' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar329_bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar329_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar329_bis) => {
		return destroyvar329_bis._port === 'display' && destroyvar329_bis._msg === 'destroyvar329_bis' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar329_bis) => {
		this.Display_SC_Running_received_display_destroyvar329_var = true;
	});
	Display_SC_Running.to(null).when((setColorb_bis) => {
		return setColorb_bis._port === 'display' && setColorb_bis._msg === 'setColorb_bis';
	}).effect((setColorb_bis) => {
		this.Display_SC_Running_received_display_setColorb_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorb_bis.b;
		if(this.Display_SC_Running_received_display_setColorvar322rg_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorb_var = false;
		this.Display_SC_Running_received_display_setColorvar322rg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearvar321_bis) => {
		return clearvar321_bis._port === 'display' && clearvar321_bis._msg === 'clearvar321_bis';
	}).effect((clearvar321_bis) => {
		this.Display_SC_Running_received_display_clearvar321_var = true;
		this.Display_SC_Running_display_clear_var321_var = clearvar321_bis.var321;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar321_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar322rg_bis) => {
		return setColorvar322rg_bis._port === 'display' && setColorvar322rg_bis._msg === 'setColorvar322rg_bis';
	}).effect((setColorvar322rg_bis) => {
		this.Display_SC_Running_received_display_setColorvar322rg_var = true;
		this.Display_SC_Running_display_setColor_var322_var = setColorvar322rg_bis.var322;
		this.Display_SC_Running_display_setColor_r_var = setColorvar322rg_bis.r;
		this.Display_SC_Running_display_setColor_g_var = setColorvar322rg_bis.g;
		if(this.Display_SC_Running_received_display_setColorb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar322rg_var = false;
		this.Display_SC_Running_received_display_setColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectwidthyx_bis) => {
		return fillRectwidthyx_bis._port === 'display' && fillRectwidthyx_bis._msg === 'fillRectwidthyx_bis';
	}).effect((fillRectwidthyx_bis) => {
		this.Display_SC_Running_received_display_fillRectwidthyx_var = true;
		this.Display_SC_Running_display_fillRect_width_var = fillRectwidthyx_bis.width;
		this.Display_SC_Running_display_fillRect_y_var = fillRectwidthyx_bis.y;
		this.Display_SC_Running_display_fillRect_x_var = fillRectwidthyx_bis.x;
		if(this.Display_SC_Running_received_display_fillRectvar325height_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectwidthyx_var = false;
		this.Display_SC_Running_received_display_fillRectvar325height_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRecty_bis) => {
		return drawRecty_bis._port === 'display' && drawRecty_bis._msg === 'drawRecty_bis';
	}).effect((drawRecty_bis) => {
		this.Display_SC_Running_received_display_drawRecty_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRecty_bis.y;
		if(this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRecty_var = false;
		this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updatevar330_bis) => {
		return updatevar330_bis._port === 'display' && updatevar330_bis._msg === 'updatevar330_bis';
	}).effect((updatevar330_bis) => {
		this.Display_SC_Running_received_display_updatevar330_var = true;
		this.Display_SC_Running_display_update_var330_var = updatevar330_bis.var330;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar330_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerxdigits) => {
		return drawIntegerxdigits._port === 'display' && drawIntegerxdigits._msg === 'drawIntegerxdigits';
	}).effect((drawIntegerxdigits) => {
		this.Display_SC_Running_received_display_drawIntegerxdigits_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerxdigits.x;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerxdigits.digits;
		if(this.Display_SC_Running_received_display_drawIntegervyvar326scale_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerxdigits_var = false;
		this.Display_SC_Running_received_display_drawIntegervyvar326scale_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (this.Display_SC_Wait_received_display_createxsizeysizevar328_var);
	}).effect((create_) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createxsizeysizevar328_var = false;
	});
	Display_SC_Wait.to(null).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (!(this.Display_SC_Wait_received_display_createxsizeysizevar328_var));
	}).effect((create_) => {
		this.Display_SC_Wait_received_display_create__var = true;
	});
	Display_SC_Running.to(null).when((drawRectvar324heightwidthx_bis) => {
		return drawRectvar324heightwidthx_bis._port === 'display' && drawRectvar324heightwidthx_bis._msg === 'drawRectvar324heightwidthx_bis';
	}).effect((drawRectvar324heightwidthx_bis) => {
		this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var = true;
		this.Display_SC_Running_display_drawRect_var324_var = drawRectvar324heightwidthx_bis.var324;
		this.Display_SC_Running_display_drawRect_height_var = drawRectvar324heightwidthx_bis.height;
		this.Display_SC_Running_display_drawRect_width_var = drawRectvar324heightwidthx_bis.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectvar324heightwidthx_bis.x;
		if(this.Display_SC_Running_received_display_drawRecty_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var = false;
		this.Display_SC_Running_received_display_drawRecty_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColor_) => {
		return setBGColor_._port === 'display' && setBGColor_._msg === 'setBGColor_';
	}).effect((setBGColor_) => {
		this.Display_SC_Running_received_display_setBGColor__var = true;
		if(this.Display_SC_Running_received_display_setBGColorrvar323gb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColor__var = false;
		this.Display_SC_Running_received_display_setBGColorrvar323gb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectwidthyx) => {
		return fillRectwidthyx._port === 'display' && fillRectwidthyx._msg === 'fillRectwidthyx';
	}).effect((fillRectwidthyx) => {
		this.Display_SC_Running_received_display_fillRectwidthyx_var = true;
		this.Display_SC_Running_display_fillRect_width_var = fillRectwidthyx.width;
		this.Display_SC_Running_display_fillRect_y_var = fillRectwidthyx.y;
		this.Display_SC_Running_display_fillRect_x_var = fillRectwidthyx.x;
		if(this.Display_SC_Running_received_display_fillRectvar325height_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectwidthyx_var = false;
		this.Display_SC_Running_received_display_fillRectvar325height_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectvar325height_bis) => {
		return fillRectvar325height_bis._port === 'display' && fillRectvar325height_bis._msg === 'fillRectvar325height_bis';
	}).effect((fillRectvar325height_bis) => {
		this.Display_SC_Running_received_display_fillRectvar325height_var = true;
		this.Display_SC_Running_display_fillRect_var325_var = fillRectvar325height_bis.var325;
		this.Display_SC_Running_display_fillRect_height_var = fillRectvar325height_bis.height;
		if(this.Display_SC_Running_received_display_fillRectwidthyx_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectvar325height_var = false;
		this.Display_SC_Running_received_display_fillRectwidthyx_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar329) => {
		return destroyvar329._port === 'display' && destroyvar329._msg === 'destroyvar329' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar329) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar329_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar329) => {
		return destroyvar329._port === 'display' && destroyvar329._msg === 'destroyvar329' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar329) => {
		this.Display_SC_Running_received_display_destroyvar329_var = true;
	});
	Display_SC_Running.to(null).when((clear__bis) => {
		return clear__bis._port === 'display' && clear__bis._msg === 'clear__bis';
	}).effect((clear__bis) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar321_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar321_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar321_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar321_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar330_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar330_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectvar325height) => {
		return fillRectvar325height._port === 'display' && fillRectvar325height._msg === 'fillRectvar325height';
	}).effect((fillRectvar325height) => {
		this.Display_SC_Running_received_display_fillRectvar325height_var = true;
		this.Display_SC_Running_display_fillRect_var325_var = fillRectvar325height.var325;
		this.Display_SC_Running_display_fillRect_height_var = fillRectvar325height.height;
		if(this.Display_SC_Running_received_display_fillRectwidthyx_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectvar325height_var = false;
		this.Display_SC_Running_received_display_fillRectwidthyx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrvar323gb_bis) => {
		return setBGColorrvar323gb_bis._port === 'display' && setBGColorrvar323gb_bis._msg === 'setBGColorrvar323gb_bis';
	}).effect((setBGColorrvar323gb_bis) => {
		this.Display_SC_Running_received_display_setBGColorrvar323gb_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrvar323gb_bis.r;
		this.Display_SC_Running_display_setBGColor_var323_var = setBGColorrvar323gb_bis.var323;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorrvar323gb_bis.g;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorrvar323gb_bis.b;
		if(this.Display_SC_Running_received_display_setBGColor__var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrvar323gb_var = false;
		this.Display_SC_Running_received_display_setBGColor__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingML__bis) => {
		return drawThingML__bis._port === 'display' && drawThingML__bis._msg === 'drawThingML__bis';
	}).effect((drawThingML__bis) => {
		this.Display_SC_Running_received_display_drawThingML__var = true;
		if(this.Display_SC_Running_received_display_drawThingMLvar327xy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingML__var = false;
		this.Display_SC_Running_received_display_drawThingMLvar327xy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update__bis) => {
		return update__bis._port === 'display' && update__bis._msg === 'update__bis';
	}).effect((update__bis) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar330_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar330_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (this.Display_SC_Wait_received_display_createxsizeysizevar328_var);
	}).effect((create__bis) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createxsizeysizevar328_var = false;
	});
	Display_SC_Wait.to(null).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (!(this.Display_SC_Wait_received_display_createxsizeysizevar328_var));
	}).effect((create__bis) => {
		this.Display_SC_Wait_received_display_create__var = true;
	});
	Display_SC_Running.to(null).when((drawIntegervyvar326scale) => {
		return drawIntegervyvar326scale._port === 'display' && drawIntegervyvar326scale._msg === 'drawIntegervyvar326scale';
	}).effect((drawIntegervyvar326scale) => {
		this.Display_SC_Running_received_display_drawIntegervyvar326scale_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervyvar326scale.v;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervyvar326scale.y;
		this.Display_SC_Running_display_drawInteger_var326_var = drawIntegervyvar326scale.var326;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervyvar326scale.scale;
		if(this.Display_SC_Running_received_display_drawIntegerxdigits_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervyvar326scale_var = false;
		this.Display_SC_Running_received_display_drawIntegerxdigits_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrvar323gb) => {
		return setBGColorrvar323gb._port === 'display' && setBGColorrvar323gb._msg === 'setBGColorrvar323gb';
	}).effect((setBGColorrvar323gb) => {
		this.Display_SC_Running_received_display_setBGColorrvar323gb_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrvar323gb.r;
		this.Display_SC_Running_display_setBGColor_var323_var = setBGColorrvar323gb.var323;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorrvar323gb.g;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorrvar323gb.b;
		if(this.Display_SC_Running_received_display_setBGColor__var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrvar323gb_var = false;
		this.Display_SC_Running_received_display_setBGColor__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRecty) => {
		return drawRecty._port === 'display' && drawRecty._msg === 'drawRecty';
	}).effect((drawRecty) => {
		this.Display_SC_Running_received_display_drawRecty_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRecty.y;
		if(this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRecty_var = false;
		this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var = false;
		
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
		
		
		if(165 < 81) {
		setTimeout(() => this.bus.emit('vctrl?positionxy', 0, 0x7C, posX), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionxy_bis', posX, 0xD9, 0), 0);
		
		}
		if(142 < 249) {
		setTimeout(() => this.bus.emit('vctrl?positionvar334', 0x1B, 0x94), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar334_bis', 0x9E, 0x94), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(167 < 139) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dx',  -8, 0xCC, 0x69), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dx_bis',  -8, 0xE7, 0xCC), 0);
			
			}
			if(108 < 234) {
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0xDB, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydy_bis', 0, 0x9D), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(229 < 197) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dx', 8, 0xA4, 0x8E), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dx_bis', 8, 0xEF, 0xA4), 0);
			
			}
			if(13 < 16) {
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0xD0, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydy_bis', 0, 0x3C), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(174 < 23) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dx', 0, 0xC5, 0xBF), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dx_bis', 0, 0x1F, 0xC5), 0);
			
			}
			if(196 < 246) {
			setTimeout(() => this.bus.emit('vctrl?velocitydy', 0xB4, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydy_bis', 0, 0x2B), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(172 < 80) {
		setTimeout(() => this.bus.emit('vctrl?positionvar334', 0xE2, 0x79), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar334_bis', 0x3D, 0x79), 0);
		
		}
		if(69 < 74) {
		setTimeout(() => this.bus.emit('vctrl?positionxy', 0, 0x42, x), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionxy_bis', x, 0x0C, 0), 0);
		
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

DisplayBrowser.prototype.receivecreate_Ondisplay = function(var352) {
	this._receive({_port:"display", _msg:"create_", var352:var352});
}

DisplayBrowser.prototype.receivecreatexsizeysizevar328Ondisplay = function(var328, ysize, xsize, var353) {
	this._receive({_port:"display", _msg:"createxsizeysizevar328", var328:var328, ysize:ysize, xsize:xsize, var353:var353});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(var348) {
	this._receive({_port:"display", _msg:"destroy_", var348:var348});
}

DisplayBrowser.prototype.receivedestroyvar329Ondisplay = function(var349, var329) {
	this._receive({_port:"display", _msg:"destroyvar329", var349:var349, var329:var329});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(var346) {
	this._receive({_port:"display", _msg:"update_", var346:var346});
}

DisplayBrowser.prototype.receiveupdatevar330Ondisplay = function(var347, var330) {
	this._receive({_port:"display", _msg:"updatevar330", var347:var347, var330:var330});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(var364) {
	this._receive({_port:"display", _msg:"clear_", var364:var364});
}

DisplayBrowser.prototype.receiveclearvar321Ondisplay = function(var321, var365) {
	this._receive({_port:"display", _msg:"clearvar321", var321:var321, var365:var365});
}

DisplayBrowser.prototype.receivesetColorbOndisplay = function(var344, b) {
	this._receive({_port:"display", _msg:"setColorb", var344:var344, b:b});
}

DisplayBrowser.prototype.receivesetColorvar322rgOndisplay = function(var345, r, var322, g) {
	this._receive({_port:"display", _msg:"setColorvar322rg", var345:var345, r:r, var322:var322, g:g});
}

DisplayBrowser.prototype.receivesetBGColor_Ondisplay = function(var362) {
	this._receive({_port:"display", _msg:"setBGColor_", var362:var362});
}

DisplayBrowser.prototype.receivesetBGColorrvar323gbOndisplay = function(b, g, r, var363, var323) {
	this._receive({_port:"display", _msg:"setBGColorrvar323gb", b:b, g:g, r:r, var363:var363, var323:var323});
}

DisplayBrowser.prototype.receivedrawRectvar324heightwidthxOndisplay = function(x, width, var366, var324, height) {
	this._receive({_port:"display", _msg:"drawRectvar324heightwidthx", x:x, width:width, var366:var366, var324:var324, height:height});
}

DisplayBrowser.prototype.receivedrawRectyOndisplay = function(y, var367) {
	this._receive({_port:"display", _msg:"drawRecty", y:y, var367:var367});
}

DisplayBrowser.prototype.receivefillRectwidthyxOndisplay = function(var358, width, x, y) {
	this._receive({_port:"display", _msg:"fillRectwidthyx", var358:var358, width:width, x:x, y:y});
}

DisplayBrowser.prototype.receivefillRectvar325heightOndisplay = function(var325, height, var359) {
	this._receive({_port:"display", _msg:"fillRectvar325height", var325:var325, height:height, var359:var359});
}

DisplayBrowser.prototype.receivedrawIntegervyvar326scaleOndisplay = function(y, var326, scale, v, var360) {
	this._receive({_port:"display", _msg:"drawIntegervyvar326scale", y:y, var326:var326, scale:scale, v:v, var360:var360});
}

DisplayBrowser.prototype.receivedrawIntegerxdigitsOndisplay = function(var361, digits, x) {
	this._receive({_port:"display", _msg:"drawIntegerxdigits", var361:var361, digits:digits, x:x});
}

DisplayBrowser.prototype.receivedrawThingML_Ondisplay = function(var350) {
	this._receive({_port:"display", _msg:"drawThingML_", var350:var350});
}

DisplayBrowser.prototype.receivedrawThingMLvar327xyOndisplay = function(var327, x, y, var351) {
	this._receive({_port:"display", _msg:"drawThingMLvar327xy", var327:var327, x:x, y:y, var351:var351});
}

DisplayBrowser.prototype.receivecreate__bisOndisplay = function(var376) {
	this._receive({_port:"display", _msg:"create__bis", var376:var376});
}

DisplayBrowser.prototype.receivecreatexsizeysizevar328_bisOndisplay = function(var377, xsize, var328, ysize) {
	this._receive({_port:"display", _msg:"createxsizeysizevar328_bis", var377:var377, xsize:xsize, var328:var328, ysize:ysize});
}

DisplayBrowser.prototype.receivedestroy__bisOndisplay = function(var372) {
	this._receive({_port:"display", _msg:"destroy__bis", var372:var372});
}

DisplayBrowser.prototype.receivedestroyvar329_bisOndisplay = function(var329, var373) {
	this._receive({_port:"display", _msg:"destroyvar329_bis", var329:var329, var373:var373});
}

DisplayBrowser.prototype.receiveupdate__bisOndisplay = function(var370) {
	this._receive({_port:"display", _msg:"update__bis", var370:var370});
}

DisplayBrowser.prototype.receiveupdatevar330_bisOndisplay = function(var330, var371) {
	this._receive({_port:"display", _msg:"updatevar330_bis", var330:var330, var371:var371});
}

DisplayBrowser.prototype.receiveclear__bisOndisplay = function(var388) {
	this._receive({_port:"display", _msg:"clear__bis", var388:var388});
}

DisplayBrowser.prototype.receiveclearvar321_bisOndisplay = function(var321, var389) {
	this._receive({_port:"display", _msg:"clearvar321_bis", var321:var321, var389:var389});
}

DisplayBrowser.prototype.receivesetColorb_bisOndisplay = function(b, var368) {
	this._receive({_port:"display", _msg:"setColorb_bis", b:b, var368:var368});
}

DisplayBrowser.prototype.receivesetColorvar322rg_bisOndisplay = function(var369, var322, g, r) {
	this._receive({_port:"display", _msg:"setColorvar322rg_bis", var369:var369, var322:var322, g:g, r:r});
}

DisplayBrowser.prototype.receivesetBGColor__bisOndisplay = function(var386) {
	this._receive({_port:"display", _msg:"setBGColor__bis", var386:var386});
}

DisplayBrowser.prototype.receivesetBGColorrvar323gb_bisOndisplay = function(r, var387, g, b, var323) {
	this._receive({_port:"display", _msg:"setBGColorrvar323gb_bis", r:r, var387:var387, g:g, b:b, var323:var323});
}

DisplayBrowser.prototype.receivedrawRectvar324heightwidthx_bisOndisplay = function(height, width, x, var390, var324) {
	this._receive({_port:"display", _msg:"drawRectvar324heightwidthx_bis", height:height, width:width, x:x, var390:var390, var324:var324});
}

DisplayBrowser.prototype.receivedrawRecty_bisOndisplay = function(var391, y) {
	this._receive({_port:"display", _msg:"drawRecty_bis", var391:var391, y:y});
}

DisplayBrowser.prototype.receivefillRectwidthyx_bisOndisplay = function(width, y, x, var382) {
	this._receive({_port:"display", _msg:"fillRectwidthyx_bis", width:width, y:y, x:x, var382:var382});
}

DisplayBrowser.prototype.receivefillRectvar325height_bisOndisplay = function(height, var383, var325) {
	this._receive({_port:"display", _msg:"fillRectvar325height_bis", height:height, var383:var383, var325:var325});
}

DisplayBrowser.prototype.receivedrawIntegervyvar326scale_bisOndisplay = function(scale, var326, v, var384, y) {
	this._receive({_port:"display", _msg:"drawIntegervyvar326scale_bis", scale:scale, var326:var326, v:v, var384:var384, y:y});
}

DisplayBrowser.prototype.receivedrawIntegerxdigits_bisOndisplay = function(var385, x, digits) {
	this._receive({_port:"display", _msg:"drawIntegerxdigits_bis", var385:var385, x:x, digits:digits});
}

DisplayBrowser.prototype.receivedrawThingML__bisOndisplay = function(var374) {
	this._receive({_port:"display", _msg:"drawThingML__bis", var374:var374});
}

DisplayBrowser.prototype.receivedrawThingMLvar327xy_bisOndisplay = function(y, x, var327, var375) {
	this._receive({_port:"display", _msg:"drawThingMLvar327xy_bis", y:y, x:x, var327:var327, var375:var375});
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_var324_var = function(Display_SC_Running_display_drawRect_var324_var) {
	this.Display_SC_Running_display_drawRect_var324_var = Display_SC_Running_display_drawRect_var324_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsizeysizevar328_var = function(Display_SC_Wait_received_display_createxsizeysizevar328_var) {
	this.Display_SC_Wait_received_display_createxsizeysizevar328_var = Display_SC_Wait_received_display_createxsizeysizevar328_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_var326_var = function(Display_SC_Running_display_drawInteger_var326_var) {
	this.Display_SC_Running_display_drawInteger_var326_var = Display_SC_Running_display_drawInteger_var326_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_var329_var = function(Display_SC_Running_display_destroy_var329_var) {
	this.Display_SC_Running_display_destroy_var329_var = Display_SC_Running_display_destroy_var329_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRecty_var = function(Display_SC_Running_received_display_drawRecty_var) {
	this.Display_SC_Running_received_display_drawRecty_var = Display_SC_Running_received_display_drawRecty_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_var330_var = function(Display_SC_Running_display_update_var330_var) {
	this.Display_SC_Running_display_update_var330_var = Display_SC_Running_display_update_var330_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectwidthyx_var = function(Display_SC_Running_received_display_fillRectwidthyx_var) {
	this.Display_SC_Running_received_display_fillRectwidthyx_var = Display_SC_Running_received_display_fillRectwidthyx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLvar327xy_var = function(Display_SC_Running_received_display_drawThingMLvar327xy_var) {
	this.Display_SC_Running_received_display_drawThingMLvar327xy_var = Display_SC_Running_received_display_drawThingMLvar327xy_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColor__var = function(Display_SC_Running_received_display_setBGColor__var) {
	this.Display_SC_Running_received_display_setBGColor__var = Display_SC_Running_received_display_setBGColor__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorrvar323gb_var = function(Display_SC_Running_received_display_setBGColorrvar323gb_var) {
	this.Display_SC_Running_received_display_setBGColorrvar323gb_var = Display_SC_Running_received_display_setBGColorrvar323gb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_var322_var = function(Display_SC_Running_display_setColor_var322_var) {
	this.Display_SC_Running_display_setColor_var322_var = Display_SC_Running_display_setColor_var322_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_var325_var = function(Display_SC_Running_display_fillRect_var325_var) {
	this.Display_SC_Running_display_fillRect_var325_var = Display_SC_Running_display_fillRect_var325_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingML__var = function(Display_SC_Running_received_display_drawThingML__var) {
	this.Display_SC_Running_received_display_drawThingML__var = Display_SC_Running_received_display_drawThingML__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyvar329_var = function(Display_SC_Running_received_display_destroyvar329_var) {
	this.Display_SC_Running_received_display_destroyvar329_var = Display_SC_Running_received_display_destroyvar329_var;
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

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_var321_var = function(Display_SC_Running_display_clear_var321_var) {
	this.Display_SC_Running_display_clear_var321_var = Display_SC_Running_display_clear_var321_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegervyvar326scale_var = function(Display_SC_Running_received_display_drawIntegervyvar326scale_var) {
	this.Display_SC_Running_received_display_drawIntegervyvar326scale_var = Display_SC_Running_received_display_drawIntegervyvar326scale_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_var327_var = function(Display_SC_Running_display_drawThingML_var327_var) {
	this.Display_SC_Running_display_drawThingML_var327_var = Display_SC_Running_display_drawThingML_var327_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_var328_var = function(Display_SC_Wait_display_create_var328_var) {
	this.Display_SC_Wait_display_create_var328_var = Display_SC_Wait_display_create_var328_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearvar321_var = function(Display_SC_Running_received_display_clearvar321_var) {
	this.Display_SC_Running_received_display_clearvar321_var = Display_SC_Running_received_display_clearvar321_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectvar325height_var = function(Display_SC_Running_received_display_fillRectvar325height_var) {
	this.Display_SC_Running_received_display_fillRectvar325height_var = Display_SC_Running_received_display_fillRectvar325height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
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

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
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

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorvar322rg_var = function(Display_SC_Running_received_display_setColorvar322rg_var) {
	this.Display_SC_Running_received_display_setColorvar322rg_var = Display_SC_Running_received_display_setColorvar322rg_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectvar324heightwidthx_var = function(Display_SC_Running_received_display_drawRectvar324heightwidthx_var) {
	this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var = Display_SC_Running_received_display_drawRectvar324heightwidthx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_create__var = function(Display_SC_Wait_received_display_create__var) {
	this.Display_SC_Wait_received_display_create__var = Display_SC_Wait_received_display_create__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_var323_var = function(Display_SC_Running_display_setBGColor_var323_var) {
	this.Display_SC_Running_display_setBGColor_var323_var = Display_SC_Running_display_setBGColor_var323_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updatevar330_var = function(Display_SC_Running_received_display_updatevar330_var) {
	this.Display_SC_Running_received_display_updatevar330_var = Display_SC_Running_received_display_updatevar330_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorb_var = function(Display_SC_Running_received_display_setColorb_var) {
	this.Display_SC_Running_received_display_setColorb_var = Display_SC_Running_received_display_setColorb_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerxdigits_var = function(Display_SC_Running_received_display_drawIntegerxdigits_var) {
	this.Display_SC_Running_received_display_drawIntegerxdigits_var = Display_SC_Running_received_display_drawIntegerxdigits_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tdisplay_drawRect_var324 = ' + this.Display_SC_Running_display_drawRect_var324_var;
	result += '\n\treceived_display_createxsizeysizevar328 = ' + this.Display_SC_Wait_received_display_createxsizeysizevar328_var;
	result += '\n\tdisplay_drawInteger_var326 = ' + this.Display_SC_Running_display_drawInteger_var326_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_destroy_var329 = ' + this.Display_SC_Running_display_destroy_var329_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\treceived_display_drawRecty = ' + this.Display_SC_Running_received_display_drawRecty_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tdisplay_update_var330 = ' + this.Display_SC_Running_display_update_var330_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\treceived_display_fillRectwidthyx = ' + this.Display_SC_Running_received_display_fillRectwidthyx_var;
	result += '\n\treceived_display_drawThingMLvar327xy = ' + this.Display_SC_Running_received_display_drawThingMLvar327xy_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\treceived_display_setBGColor_ = ' + this.Display_SC_Running_received_display_setBGColor__var;
	result += '\n\treceived_display_setBGColorrvar323gb = ' + this.Display_SC_Running_received_display_setBGColorrvar323gb_var;
	result += '\n\tdisplay_setColor_var322 = ' + this.Display_SC_Running_display_setColor_var322_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_fillRect_var325 = ' + this.Display_SC_Running_display_fillRect_var325_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\treceived_display_drawThingML_ = ' + this.Display_SC_Running_received_display_drawThingML__var;
	result += '\n\treceived_display_destroyvar329 = ' + this.Display_SC_Running_received_display_destroyvar329_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tdisplay_clear_var321 = ' + this.Display_SC_Running_display_clear_var321_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_drawIntegervyvar326scale = ' + this.Display_SC_Running_received_display_drawIntegervyvar326scale_var;
	result += '\n\tdisplay_drawThingML_var327 = ' + this.Display_SC_Running_display_drawThingML_var327_var;
	result += '\n\tdisplay_create_var328 = ' + this.Display_SC_Wait_display_create_var328_var;
	result += '\n\treceived_display_clearvar321 = ' + this.Display_SC_Running_received_display_clearvar321_var;
	result += '\n\treceived_display_fillRectvar325height = ' + this.Display_SC_Running_received_display_fillRectvar325height_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\treceived_display_setColorvar322rg = ' + this.Display_SC_Running_received_display_setColorvar322rg_var;
	result += '\n\treceived_display_drawRectvar324heightwidthx = ' + this.Display_SC_Running_received_display_drawRectvar324heightwidthx_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\treceived_display_create_ = ' + this.Display_SC_Wait_received_display_create__var;
	result += '\n\tdisplay_setBGColor_var323 = ' + this.Display_SC_Running_display_setBGColor_var323_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\treceived_display_updatevar330 = ' + this.Display_SC_Running_received_display_updatevar330_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\treceived_display_setColorb = ' + this.Display_SC_Running_received_display_setColorb_var;
	result += '\n\treceived_display_drawIntegerxdigits = ' + this.Display_SC_Running_received_display_drawIntegerxdigits_var;
	result += '';
	return result;
}

