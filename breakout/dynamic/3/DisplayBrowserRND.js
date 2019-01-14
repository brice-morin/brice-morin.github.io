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
		if(0 < 92) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x33), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0x3E), 0);
		
		}
		if(88 < 14) {
		setTimeout(() => this.bus.emit('display?displayReadyvar331', 0xFE, 0xD5), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar331_bis', 0x83, 0xD5), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
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
	Display_SC_Running.to(null).when((setColorb_bis) => {
		return setColorb_bis._port === 'display' && setColorb_bis._msg === 'setColorb_bis';
	}).effect((setColorb_bis) => {
		this.Display_SC_Running_received_display_setColorb_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorb_bis.b;
		if(this.Display_SC_Running_received_display_setColorvar322gr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorb_var = false;
		this.Display_SC_Running_received_display_setColorvar322gr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLvar327x_bis) => {
		return drawThingMLvar327x_bis._port === 'display' && drawThingMLvar327x_bis._msg === 'drawThingMLvar327x_bis';
	}).effect((drawThingMLvar327x_bis) => {
		this.Display_SC_Running_received_display_drawThingMLvar327x_var = true;
		this.Display_SC_Running_display_drawThingML_var327_var = drawThingMLvar327x_bis.var327;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLvar327x_bis.x;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar327x_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectyheight) => {
		return fillRectyheight._port === 'display' && fillRectyheight._msg === 'fillRectyheight';
	}).effect((fillRectyheight) => {
		this.Display_SC_Running_received_display_fillRectyheight_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyheight.y;
		this.Display_SC_Running_display_fillRect_height_var = fillRectyheight.height;
		if(this.Display_SC_Running_received_display_fillRectxwidthvar325_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyheight_var = false;
		this.Display_SC_Running_received_display_fillRectxwidthvar325_var = false;
		
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
	Display_SC_Running.to(null).when((drawRecty_bis) => {
		return drawRecty_bis._port === 'display' && drawRecty_bis._msg === 'drawRecty_bis';
	}).effect((drawRecty_bis) => {
		this.Display_SC_Running_received_display_drawRecty_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRecty_bis.y;
		if(this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRecty_var = false;
		this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerxdigitsvar326scaley) => {
		return drawIntegerxdigitsvar326scaley._port === 'display' && drawIntegerxdigitsvar326scaley._msg === 'drawIntegerxdigitsvar326scaley';
	}).effect((drawIntegerxdigitsvar326scaley) => {
		this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerxdigitsvar326scaley.x;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerxdigitsvar326scaley.digits;
		this.Display_SC_Running_display_drawInteger_var326_var = drawIntegerxdigitsvar326scaley.var326;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerxdigitsvar326scaley.scale;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerxdigitsvar326scaley.y;
		if(this.Display_SC_Running_received_display_drawIntegerv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var = false;
		this.Display_SC_Running_received_display_drawIntegerv_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectxwidthvar325) => {
		return fillRectxwidthvar325._port === 'display' && fillRectxwidthvar325._msg === 'fillRectxwidthvar325';
	}).effect((fillRectxwidthvar325) => {
		this.Display_SC_Running_received_display_fillRectxwidthvar325_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxwidthvar325.x;
		this.Display_SC_Running_display_fillRect_width_var = fillRectxwidthvar325.width;
		this.Display_SC_Running_display_fillRect_var325_var = fillRectxwidthvar325.var325;
		if(this.Display_SC_Running_received_display_fillRectyheight_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxwidthvar325_var = false;
		this.Display_SC_Running_received_display_fillRectyheight_var = false;
		
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
	Display_SC_Running.to(null).when((setBGColorvar323b_bis) => {
		return setBGColorvar323b_bis._port === 'display' && setBGColorvar323b_bis._msg === 'setBGColorvar323b_bis';
	}).effect((setBGColorvar323b_bis) => {
		this.Display_SC_Running_received_display_setBGColorvar323b_var = true;
		this.Display_SC_Running_display_setBGColor_var323_var = setBGColorvar323b_bis.var323;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorvar323b_bis.b;
		if(this.Display_SC_Running_received_display_setBGColorgr_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar323b_var = false;
		this.Display_SC_Running_received_display_setBGColorgr_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectxwidthvar325_bis) => {
		return fillRectxwidthvar325_bis._port === 'display' && fillRectxwidthvar325_bis._msg === 'fillRectxwidthvar325_bis';
	}).effect((fillRectxwidthvar325_bis) => {
		this.Display_SC_Running_received_display_fillRectxwidthvar325_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxwidthvar325_bis.x;
		this.Display_SC_Running_display_fillRect_width_var = fillRectxwidthvar325_bis.width;
		this.Display_SC_Running_display_fillRect_var325_var = fillRectxwidthvar325_bis.var325;
		if(this.Display_SC_Running_received_display_fillRectyheight_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxwidthvar325_var = false;
		this.Display_SC_Running_received_display_fillRectyheight_var = false;
		
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
	Display_SC_Running.to(null).when((setColorvar322gr_bis) => {
		return setColorvar322gr_bis._port === 'display' && setColorvar322gr_bis._msg === 'setColorvar322gr_bis';
	}).effect((setColorvar322gr_bis) => {
		this.Display_SC_Running_received_display_setColorvar322gr_var = true;
		this.Display_SC_Running_display_setColor_var322_var = setColorvar322gr_bis.var322;
		this.Display_SC_Running_display_setColor_g_var = setColorvar322gr_bis.g;
		this.Display_SC_Running_display_setColor_r_var = setColorvar322gr_bis.r;
		if(this.Display_SC_Running_received_display_setColorb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar322gr_var = false;
		this.Display_SC_Running_received_display_setColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectvar324xwidthheight) => {
		return drawRectvar324xwidthheight._port === 'display' && drawRectvar324xwidthheight._msg === 'drawRectvar324xwidthheight';
	}).effect((drawRectvar324xwidthheight) => {
		this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var = true;
		this.Display_SC_Running_display_drawRect_var324_var = drawRectvar324xwidthheight.var324;
		this.Display_SC_Running_display_drawRect_x_var = drawRectvar324xwidthheight.x;
		this.Display_SC_Running_display_drawRect_width_var = drawRectvar324xwidthheight.width;
		this.Display_SC_Running_display_drawRect_height_var = drawRectvar324xwidthheight.height;
		if(this.Display_SC_Running_received_display_drawRecty_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var = false;
		this.Display_SC_Running_received_display_drawRecty_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorgr) => {
		return setBGColorgr._port === 'display' && setBGColorgr._msg === 'setBGColorgr';
	}).effect((setBGColorgr) => {
		this.Display_SC_Running_received_display_setBGColorgr_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorgr.g;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorgr.r;
		if(this.Display_SC_Running_received_display_setBGColorvar323b_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorgr_var = false;
		this.Display_SC_Running_received_display_setBGColorvar323b_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectyheight_bis) => {
		return fillRectyheight_bis._port === 'display' && fillRectyheight_bis._msg === 'fillRectyheight_bis';
	}).effect((fillRectyheight_bis) => {
		this.Display_SC_Running_received_display_fillRectyheight_var = true;
		this.Display_SC_Running_display_fillRect_y_var = fillRectyheight_bis.y;
		this.Display_SC_Running_display_fillRect_height_var = fillRectyheight_bis.height;
		if(this.Display_SC_Running_received_display_fillRectxwidthvar325_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectyheight_var = false;
		this.Display_SC_Running_received_display_fillRectxwidthvar325_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerxdigitsvar326scaley_bis) => {
		return drawIntegerxdigitsvar326scaley_bis._port === 'display' && drawIntegerxdigitsvar326scaley_bis._msg === 'drawIntegerxdigitsvar326scaley_bis';
	}).effect((drawIntegerxdigitsvar326scaley_bis) => {
		this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var = true;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerxdigitsvar326scaley_bis.x;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerxdigitsvar326scaley_bis.digits;
		this.Display_SC_Running_display_drawInteger_var326_var = drawIntegerxdigitsvar326scaley_bis.var326;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerxdigitsvar326scaley_bis.scale;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerxdigitsvar326scaley_bis.y;
		if(this.Display_SC_Running_received_display_drawIntegerv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var = false;
		this.Display_SC_Running_received_display_drawIntegerv_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLy_bis) => {
		return drawThingMLy_bis._port === 'display' && drawThingMLy_bis._msg === 'drawThingMLy_bis';
	}).effect((drawThingMLy_bis) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy_bis.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar327x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar327x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar322gr) => {
		return setColorvar322gr._port === 'display' && setColorvar322gr._msg === 'setColorvar322gr';
	}).effect((setColorvar322gr) => {
		this.Display_SC_Running_received_display_setColorvar322gr_var = true;
		this.Display_SC_Running_display_setColor_var322_var = setColorvar322gr.var322;
		this.Display_SC_Running_display_setColor_g_var = setColorvar322gr.g;
		this.Display_SC_Running_display_setColor_r_var = setColorvar322gr.r;
		if(this.Display_SC_Running_received_display_setColorb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar322gr_var = false;
		this.Display_SC_Running_received_display_setColorb_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysizevar328) => {
		return createysizevar328._port === 'display' && createysizevar328._msg === 'createysizevar328' && (this.Display_SC_Wait_received_display_createxsize_var);
	}).effect((createysizevar328) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizevar328.ysize;
		this.Display_SC_Wait_display_create_var328_var = createysizevar328.var328;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createysizevar328.ysize);
		this.Display_SC_Wait_received_display_createysizevar328_var = false;
		this.Display_SC_Wait_received_display_createxsize_var = false;
	});
	Display_SC_Wait.to(null).when((createysizevar328) => {
		return createysizevar328._port === 'display' && createysizevar328._msg === 'createysizevar328' && (!(this.Display_SC_Wait_received_display_createxsize_var));
	}).effect((createysizevar328) => {
		this.Display_SC_Wait_received_display_createysizevar328_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizevar328.ysize;
		this.Display_SC_Wait_display_create_var328_var = createysizevar328.var328;
	});
	Display_SC_Running.to(null).when((setBGColorvar323b) => {
		return setBGColorvar323b._port === 'display' && setBGColorvar323b._msg === 'setBGColorvar323b';
	}).effect((setBGColorvar323b) => {
		this.Display_SC_Running_received_display_setBGColorvar323b_var = true;
		this.Display_SC_Running_display_setBGColor_var323_var = setBGColorvar323b.var323;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorvar323b.b;
		if(this.Display_SC_Running_received_display_setBGColorgr_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar323b_var = false;
		this.Display_SC_Running_received_display_setBGColorgr_var = false;
		
		}
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
	Display_SC_Wait.to(Display_SC_Running).when((createysizevar328_bis) => {
		return createysizevar328_bis._port === 'display' && createysizevar328_bis._msg === 'createysizevar328_bis' && (this.Display_SC_Wait_received_display_createxsize_var);
	}).effect((createysizevar328_bis) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizevar328_bis.ysize;
		this.Display_SC_Wait_display_create_var328_var = createysizevar328_bis.var328;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createysizevar328_bis.ysize);
		this.Display_SC_Wait_received_display_createysizevar328_var = false;
		this.Display_SC_Wait_received_display_createxsize_var = false;
	});
	Display_SC_Wait.to(null).when((createysizevar328_bis) => {
		return createysizevar328_bis._port === 'display' && createysizevar328_bis._msg === 'createysizevar328_bis' && (!(this.Display_SC_Wait_received_display_createxsize_var));
	}).effect((createysizevar328_bis) => {
		this.Display_SC_Wait_received_display_createysizevar328_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizevar328_bis.ysize;
		this.Display_SC_Wait_display_create_var328_var = createysizevar328_bis.var328;
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
	Display_SC_Running.to(null).when((drawThingMLvar327x) => {
		return drawThingMLvar327x._port === 'display' && drawThingMLvar327x._msg === 'drawThingMLvar327x';
	}).effect((drawThingMLvar327x) => {
		this.Display_SC_Running_received_display_drawThingMLvar327x_var = true;
		this.Display_SC_Running_display_drawThingML_var327_var = drawThingMLvar327x.var327;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLvar327x.x;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar327x_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectvar324xwidthheight_bis) => {
		return drawRectvar324xwidthheight_bis._port === 'display' && drawRectvar324xwidthheight_bis._msg === 'drawRectvar324xwidthheight_bis';
	}).effect((drawRectvar324xwidthheight_bis) => {
		this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var = true;
		this.Display_SC_Running_display_drawRect_var324_var = drawRectvar324xwidthheight_bis.var324;
		this.Display_SC_Running_display_drawRect_x_var = drawRectvar324xwidthheight_bis.x;
		this.Display_SC_Running_display_drawRect_width_var = drawRectvar324xwidthheight_bis.width;
		this.Display_SC_Running_display_drawRect_height_var = drawRectvar324xwidthheight_bis.height;
		if(this.Display_SC_Running_received_display_drawRecty_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var = false;
		this.Display_SC_Running_received_display_drawRecty_var = false;
		
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
	Display_SC_Running.to(null).when((drawThingMLy) => {
		return drawThingMLy._port === 'display' && drawThingMLy._msg === 'drawThingMLy';
	}).effect((drawThingMLy) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar327x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar327x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorb) => {
		return setColorb._port === 'display' && setColorb._msg === 'setColorb';
	}).effect((setColorb) => {
		this.Display_SC_Running_received_display_setColorb_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorb.b;
		if(this.Display_SC_Running_received_display_setColorvar322gr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorb_var = false;
		this.Display_SC_Running_received_display_setColorvar322gr_var = false;
		
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
	Display_SC_Running.to(null).when((drawRecty) => {
		return drawRecty._port === 'display' && drawRecty._msg === 'drawRecty';
	}).effect((drawRecty) => {
		this.Display_SC_Running_received_display_drawRecty_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRecty.y;
		if(this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRecty_var = false;
		this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorgr_bis) => {
		return setBGColorgr_bis._port === 'display' && setBGColorgr_bis._msg === 'setBGColorgr_bis';
	}).effect((setBGColorgr_bis) => {
		this.Display_SC_Running_received_display_setBGColorgr_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorgr_bis.g;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorgr_bis.r;
		if(this.Display_SC_Running_received_display_setBGColorvar323b_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorgr_var = false;
		this.Display_SC_Running_received_display_setBGColorvar323b_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsize_bis) => {
		return createxsize_bis._port === 'display' && createxsize_bis._msg === 'createxsize_bis' && (this.Display_SC_Wait_received_display_createysizevar328_var);
	}).effect((createxsize_bis) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsize_bis.xsize;
		this.initDisplay(createxsize_bis.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createxsize_var = false;
		this.Display_SC_Wait_received_display_createysizevar328_var = false;
	});
	Display_SC_Wait.to(null).when((createxsize_bis) => {
		return createxsize_bis._port === 'display' && createxsize_bis._msg === 'createxsize_bis' && (!(this.Display_SC_Wait_received_display_createysizevar328_var));
	}).effect((createxsize_bis) => {
		this.Display_SC_Wait_received_display_createxsize_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsize_bis.xsize;
	});
	Display_SC_Running.to(null).when((drawIntegerv_bis) => {
		return drawIntegerv_bis._port === 'display' && drawIntegerv_bis._msg === 'drawIntegerv_bis';
	}).effect((drawIntegerv_bis) => {
		this.Display_SC_Running_received_display_drawIntegerv_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerv_bis.v;
		if(this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerv_var = false;
		this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerv) => {
		return drawIntegerv._port === 'display' && drawIntegerv._msg === 'drawIntegerv';
	}).effect((drawIntegerv) => {
		this.Display_SC_Running_received_display_drawIntegerv_var = true;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerv.v;
		if(this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerv_var = false;
		this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsize) => {
		return createxsize._port === 'display' && createxsize._msg === 'createxsize' && (this.Display_SC_Wait_received_display_createysizevar328_var);
	}).effect((createxsize) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsize.xsize;
		this.initDisplay(createxsize.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createxsize_var = false;
		this.Display_SC_Wait_received_display_createysizevar328_var = false;
	});
	Display_SC_Wait.to(null).when((createxsize) => {
		return createxsize._port === 'display' && createxsize._msg === 'createxsize' && (!(this.Display_SC_Wait_received_display_createysizevar328_var));
	}).effect((createxsize) => {
		this.Display_SC_Wait_received_display_createxsize_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsize.xsize;
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
		
		
		if(26 < 132) {
		setTimeout(() => this.bus.emit('vctrl?positionvar334x', 0x25, 0x77, posX), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar334x_bis', 0x65, 0x25, posX), 0);
		
		}
		if(17 < 88) {
		setTimeout(() => this.bus.emit('vctrl?positiony', 0, 0x24), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positiony_bis', 0xAB, 0), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(206 < 140) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0xEA,  -8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis', 0x7E,  -8), 0);
			
			}
			if(159 < 86) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dy', 0x2F, 0, 0x79), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dy_bis', 0x2F, 0x34, 0), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(3 < 30) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dy', 0x8B, 0, 0x1B), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dy_bis', 0x8B, 0x40, 0), 0);
			
			}
			if(67 < 84) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0xCB, 8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis', 0x99, 8), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(185 < 253) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0xD9, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis', 0xD5, 0), 0);
			
			}
			if(245 < 180) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dy', 0xD4, 0, 0x36), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar333dy_bis', 0xD4, 0x53, 0), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(38 < 165) {
		setTimeout(() => this.bus.emit('vctrl?positionvar334x', 0xC6, 0x20, x), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar334x_bis', 0xAF, 0xC6, x), 0);
		
		}
		if(187 < 90) {
		setTimeout(() => this.bus.emit('vctrl?positiony', 0, 0x72), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positiony_bis', 0xC1, 0), 0);
		
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

DisplayBrowserRND.prototype.receivecreatexsizeOndisplay = function(xsize, var362) {
	this._receive({_port:"display", _msg:"createxsize", xsize:xsize, var362:var362});
}

DisplayBrowserRND.prototype.receivecreateysizevar328Ondisplay = function(var363, var328, ysize) {
	this._receive({_port:"display", _msg:"createysizevar328", var363:var363, var328:var328, ysize:ysize});
}

DisplayBrowserRND.prototype.receivedestroy_Ondisplay = function(var352) {
	this._receive({_port:"display", _msg:"destroy_", var352:var352});
}

DisplayBrowserRND.prototype.receivedestroyvar329Ondisplay = function(var353, var329) {
	this._receive({_port:"display", _msg:"destroyvar329", var353:var353, var329:var329});
}

DisplayBrowserRND.prototype.receiveupdate_Ondisplay = function(var360) {
	this._receive({_port:"display", _msg:"update_", var360:var360});
}

DisplayBrowserRND.prototype.receiveupdatevar330Ondisplay = function(var330, var361) {
	this._receive({_port:"display", _msg:"updatevar330", var330:var330, var361:var361});
}

DisplayBrowserRND.prototype.receiveclear_Ondisplay = function(var346) {
	this._receive({_port:"display", _msg:"clear_", var346:var346});
}

DisplayBrowserRND.prototype.receiveclearvar321Ondisplay = function(var347, var321) {
	this._receive({_port:"display", _msg:"clearvar321", var347:var347, var321:var321});
}

DisplayBrowserRND.prototype.receivesetColorbOndisplay = function(b, var344) {
	this._receive({_port:"display", _msg:"setColorb", b:b, var344:var344});
}

DisplayBrowserRND.prototype.receivesetColorvar322grOndisplay = function(g, r, var322, var345) {
	this._receive({_port:"display", _msg:"setColorvar322gr", g:g, r:r, var322:var322, var345:var345});
}

DisplayBrowserRND.prototype.receivesetBGColorgrOndisplay = function(r, var356, g) {
	this._receive({_port:"display", _msg:"setBGColorgr", r:r, var356:var356, g:g});
}

DisplayBrowserRND.prototype.receivesetBGColorvar323bOndisplay = function(var323, b, var357) {
	this._receive({_port:"display", _msg:"setBGColorvar323b", var323:var323, b:b, var357:var357});
}

DisplayBrowserRND.prototype.receivedrawRectyOndisplay = function(y, var364) {
	this._receive({_port:"display", _msg:"drawRecty", y:y, var364:var364});
}

DisplayBrowserRND.prototype.receivedrawRectvar324xwidthheightOndisplay = function(width, var324, var365, height, x) {
	this._receive({_port:"display", _msg:"drawRectvar324xwidthheight", width:width, var324:var324, var365:var365, height:height, x:x});
}

DisplayBrowserRND.prototype.receivefillRectyheightOndisplay = function(var350, y, height) {
	this._receive({_port:"display", _msg:"fillRectyheight", var350:var350, y:y, height:height});
}

DisplayBrowserRND.prototype.receivefillRectxwidthvar325Ondisplay = function(var351, x, var325, width) {
	this._receive({_port:"display", _msg:"fillRectxwidthvar325", var351:var351, x:x, var325:var325, width:width});
}

DisplayBrowserRND.prototype.receivedrawIntegervOndisplay = function(var348, v) {
	this._receive({_port:"display", _msg:"drawIntegerv", var348:var348, v:v});
}

DisplayBrowserRND.prototype.receivedrawIntegerxdigitsvar326scaleyOndisplay = function(y, digits, var349, x, scale, var326) {
	this._receive({_port:"display", _msg:"drawIntegerxdigitsvar326scaley", y:y, digits:digits, var349:var349, x:x, scale:scale, var326:var326});
}

DisplayBrowserRND.prototype.receivedrawThingMLvar327xOndisplay = function(var327, var354, x) {
	this._receive({_port:"display", _msg:"drawThingMLvar327x", var327:var327, var354:var354, x:x});
}

DisplayBrowserRND.prototype.receivedrawThingMLyOndisplay = function(var355, y) {
	this._receive({_port:"display", _msg:"drawThingMLy", var355:var355, y:y});
}

DisplayBrowserRND.prototype.receivecreatexsize_bisOndisplay = function(xsize, var386) {
	this._receive({_port:"display", _msg:"createxsize_bis", xsize:xsize, var386:var386});
}

DisplayBrowserRND.prototype.receivecreateysizevar328_bisOndisplay = function(var328, ysize, var387) {
	this._receive({_port:"display", _msg:"createysizevar328_bis", var328:var328, ysize:ysize, var387:var387});
}

DisplayBrowserRND.prototype.receivedestroy__bisOndisplay = function(var376) {
	this._receive({_port:"display", _msg:"destroy__bis", var376:var376});
}

DisplayBrowserRND.prototype.receivedestroyvar329_bisOndisplay = function(var329, var377) {
	this._receive({_port:"display", _msg:"destroyvar329_bis", var329:var329, var377:var377});
}

DisplayBrowserRND.prototype.receiveupdate__bisOndisplay = function(var384) {
	this._receive({_port:"display", _msg:"update__bis", var384:var384});
}

DisplayBrowserRND.prototype.receiveupdatevar330_bisOndisplay = function(var385, var330) {
	this._receive({_port:"display", _msg:"updatevar330_bis", var385:var385, var330:var330});
}

DisplayBrowserRND.prototype.receiveclear__bisOndisplay = function(var370) {
	this._receive({_port:"display", _msg:"clear__bis", var370:var370});
}

DisplayBrowserRND.prototype.receiveclearvar321_bisOndisplay = function(var371, var321) {
	this._receive({_port:"display", _msg:"clearvar321_bis", var371:var371, var321:var321});
}

DisplayBrowserRND.prototype.receivesetColorb_bisOndisplay = function(b, var368) {
	this._receive({_port:"display", _msg:"setColorb_bis", b:b, var368:var368});
}

DisplayBrowserRND.prototype.receivesetColorvar322gr_bisOndisplay = function(g, r, var369, var322) {
	this._receive({_port:"display", _msg:"setColorvar322gr_bis", g:g, r:r, var369:var369, var322:var322});
}

DisplayBrowserRND.prototype.receivesetBGColorgr_bisOndisplay = function(var380, g, r) {
	this._receive({_port:"display", _msg:"setBGColorgr_bis", var380:var380, g:g, r:r});
}

DisplayBrowserRND.prototype.receivesetBGColorvar323b_bisOndisplay = function(var323, var381, b) {
	this._receive({_port:"display", _msg:"setBGColorvar323b_bis", var323:var323, var381:var381, b:b});
}

DisplayBrowserRND.prototype.receivedrawRecty_bisOndisplay = function(y, var388) {
	this._receive({_port:"display", _msg:"drawRecty_bis", y:y, var388:var388});
}

DisplayBrowserRND.prototype.receivedrawRectvar324xwidthheight_bisOndisplay = function(width, var324, x, height, var389) {
	this._receive({_port:"display", _msg:"drawRectvar324xwidthheight_bis", width:width, var324:var324, x:x, height:height, var389:var389});
}

DisplayBrowserRND.prototype.receivefillRectyheight_bisOndisplay = function(height, var374, y) {
	this._receive({_port:"display", _msg:"fillRectyheight_bis", height:height, var374:var374, y:y});
}

DisplayBrowserRND.prototype.receivefillRectxwidthvar325_bisOndisplay = function(x, width, var325, var375) {
	this._receive({_port:"display", _msg:"fillRectxwidthvar325_bis", x:x, width:width, var325:var325, var375:var375});
}

DisplayBrowserRND.prototype.receivedrawIntegerv_bisOndisplay = function(v, var372) {
	this._receive({_port:"display", _msg:"drawIntegerv_bis", v:v, var372:var372});
}

DisplayBrowserRND.prototype.receivedrawIntegerxdigitsvar326scaley_bisOndisplay = function(x, y, scale, digits, var326, var373) {
	this._receive({_port:"display", _msg:"drawIntegerxdigitsvar326scaley_bis", x:x, y:y, scale:scale, digits:digits, var326:var326, var373:var373});
}

DisplayBrowserRND.prototype.receivedrawThingMLvar327x_bisOndisplay = function(var378, x, var327) {
	this._receive({_port:"display", _msg:"drawThingMLvar327x_bis", var378:var378, x:x, var327:var327});
}

DisplayBrowserRND.prototype.receivedrawThingMLy_bisOndisplay = function(y, var379) {
	this._receive({_port:"display", _msg:"drawThingMLy_bis", y:y, var379:var379});
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_var326_var = function(Display_SC_Running_display_drawInteger_var326_var) {
	this.Display_SC_Running_display_drawInteger_var326_var = Display_SC_Running_display_drawInteger_var326_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectyheight_var = function(Display_SC_Running_received_display_fillRectyheight_var) {
	this.Display_SC_Running_received_display_fillRectyheight_var = Display_SC_Running_received_display_fillRectyheight_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_var323_var = function(Display_SC_Running_display_setBGColor_var323_var) {
	this.Display_SC_Running_display_setBGColor_var323_var = Display_SC_Running_display_setBGColor_var323_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_var322_var = function(Display_SC_Running_display_setColor_var322_var) {
	this.Display_SC_Running_display_setColor_var322_var = Display_SC_Running_display_setColor_var322_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorgr_var = function(Display_SC_Running_received_display_setBGColorgr_var) {
	this.Display_SC_Running_received_display_setBGColorgr_var = Display_SC_Running_received_display_setBGColorgr_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorb_var = function(Display_SC_Running_received_display_setColorb_var) {
	this.Display_SC_Running_received_display_setColorb_var = Display_SC_Running_received_display_setColorb_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorvar322gr_var = function(Display_SC_Running_received_display_setColorvar322gr_var) {
	this.Display_SC_Running_received_display_setColorvar322gr_var = Display_SC_Running_received_display_setColorvar322gr_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_createxsize_var = function(Display_SC_Wait_received_display_createxsize_var) {
	this.Display_SC_Wait_received_display_createxsize_var = Display_SC_Wait_received_display_createxsize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectxwidthvar325_var = function(Display_SC_Running_received_display_fillRectxwidthvar325_var) {
	this.Display_SC_Running_received_display_fillRectxwidthvar325_var = Display_SC_Running_received_display_fillRectxwidthvar325_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLvar327x_var = function(Display_SC_Running_received_display_drawThingMLvar327x_var) {
	this.Display_SC_Running_received_display_drawThingMLvar327x_var = Display_SC_Running_received_display_drawThingMLvar327x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clearvar321_var = function(Display_SC_Running_received_display_clearvar321_var) {
	this.Display_SC_Running_received_display_clearvar321_var = Display_SC_Running_received_display_clearvar321_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_createysizevar328_var = function(Display_SC_Wait_received_display_createysizevar328_var) {
	this.Display_SC_Wait_received_display_createysizevar328_var = Display_SC_Wait_received_display_createysizevar328_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowserRND.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_update_var330_var = function(Display_SC_Running_display_update_var330_var) {
	this.Display_SC_Running_display_update_var330_var = Display_SC_Running_display_update_var330_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawIntegerv_var = function(Display_SC_Running_received_display_drawIntegerv_var) {
	this.Display_SC_Running_received_display_drawIntegerv_var = Display_SC_Running_received_display_drawIntegerv_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRectvar324xwidthheight_var = function(Display_SC_Running_received_display_drawRectvar324xwidthheight_var) {
	this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var = Display_SC_Running_received_display_drawRectvar324xwidthheight_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroyvar329_var = function(Display_SC_Running_received_display_destroyvar329_var) {
	this.Display_SC_Running_received_display_destroyvar329_var = Display_SC_Running_received_display_destroyvar329_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_updatevar330_var = function(Display_SC_Running_received_display_updatevar330_var) {
	this.Display_SC_Running_received_display_updatevar330_var = Display_SC_Running_received_display_updatevar330_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_var327_var = function(Display_SC_Running_display_drawThingML_var327_var) {
	this.Display_SC_Running_display_drawThingML_var327_var = Display_SC_Running_display_drawThingML_var327_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRecty_var = function(Display_SC_Running_received_display_drawRecty_var) {
	this.Display_SC_Running_received_display_drawRecty_var = Display_SC_Running_received_display_drawRecty_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_var325_var = function(Display_SC_Running_display_fillRect_var325_var) {
	this.Display_SC_Running_display_fillRect_var325_var = Display_SC_Running_display_fillRect_var325_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_var324_var = function(Display_SC_Running_display_drawRect_var324_var) {
	this.Display_SC_Running_display_drawRect_var324_var = Display_SC_Running_display_drawRect_var324_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_var328_var = function(Display_SC_Wait_display_create_var328_var) {
	this.Display_SC_Wait_display_create_var328_var = Display_SC_Wait_display_create_var328_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLy_var = function(Display_SC_Running_received_display_drawThingMLy_var) {
	this.Display_SC_Running_received_display_drawThingMLy_var = Display_SC_Running_received_display_drawThingMLy_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorvar323b_var = function(Display_SC_Running_received_display_setBGColorvar323b_var) {
	this.Display_SC_Running_received_display_setBGColorvar323b_var = Display_SC_Running_received_display_setBGColorvar323b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_destroy_var329_var = function(Display_SC_Running_display_destroy_var329_var) {
	this.Display_SC_Running_display_destroy_var329_var = Display_SC_Running_display_destroy_var329_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_clear_var321_var = function(Display_SC_Running_display_clear_var321_var) {
	this.Display_SC_Running_display_clear_var321_var = Display_SC_Running_display_clear_var321_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var = function(Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var) {
	this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var = Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var;
}

DisplayBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_drawInteger_var326 = ' + this.Display_SC_Running_display_drawInteger_var326_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\treceived_display_fillRectyheight = ' + this.Display_SC_Running_received_display_fillRectyheight_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tdisplay_setBGColor_var323 = ' + this.Display_SC_Running_display_setBGColor_var323_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_setColor_var322 = ' + this.Display_SC_Running_display_setColor_var322_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\treceived_display_setBGColorgr = ' + this.Display_SC_Running_received_display_setBGColorgr_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\treceived_display_setColorb = ' + this.Display_SC_Running_received_display_setColorb_var;
	result += '\n\treceived_display_setColorvar322gr = ' + this.Display_SC_Running_received_display_setColorvar322gr_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\treceived_display_createxsize = ' + this.Display_SC_Wait_received_display_createxsize_var;
	result += '\n\treceived_display_fillRectxwidthvar325 = ' + this.Display_SC_Running_received_display_fillRectxwidthvar325_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_drawThingMLvar327x = ' + this.Display_SC_Running_received_display_drawThingMLvar327x_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\treceived_display_clearvar321 = ' + this.Display_SC_Running_received_display_clearvar321_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\treceived_display_createysizevar328 = ' + this.Display_SC_Wait_received_display_createysizevar328_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_update_var330 = ' + this.Display_SC_Running_display_update_var330_var;
	result += '\n\treceived_display_drawIntegerv = ' + this.Display_SC_Running_received_display_drawIntegerv_var;
	result += '\n\treceived_display_drawRectvar324xwidthheight = ' + this.Display_SC_Running_received_display_drawRectvar324xwidthheight_var;
	result += '\n\treceived_display_destroyvar329 = ' + this.Display_SC_Running_received_display_destroyvar329_var;
	result += '\n\treceived_display_updatevar330 = ' + this.Display_SC_Running_received_display_updatevar330_var;
	result += '\n\tdisplay_drawThingML_var327 = ' + this.Display_SC_Running_display_drawThingML_var327_var;
	result += '\n\treceived_display_drawRecty = ' + this.Display_SC_Running_received_display_drawRecty_var;
	result += '\n\tdisplay_fillRect_var325 = ' + this.Display_SC_Running_display_fillRect_var325_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tdisplay_drawRect_var324 = ' + this.Display_SC_Running_display_drawRect_var324_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tdisplay_create_var328 = ' + this.Display_SC_Wait_display_create_var328_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\treceived_display_drawThingMLy = ' + this.Display_SC_Running_received_display_drawThingMLy_var;
	result += '\n\treceived_display_setBGColorvar323b = ' + this.Display_SC_Running_received_display_setBGColorvar323b_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tdisplay_destroy_var329 = ' + this.Display_SC_Running_display_destroy_var329_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_clear_var321 = ' + this.Display_SC_Running_display_clear_var321_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\treceived_display_drawIntegerxdigitsvar326scaley = ' + this.Display_SC_Running_received_display_drawIntegerxdigitsvar326scaley_var;
	result += '';
	return result;
}

