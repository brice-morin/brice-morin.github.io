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
		if(4 < 59) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x1B), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0xEA), 0);
		
		}
		if(176 < 104) {
		setTimeout(() => this.bus.emit('display?displayReadyvar119', 0x09, 0xFE), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar119_bis', 0x80, 0x09), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((setColorgvar110r) => {
		return setColorgvar110r._port === 'display' && setColorgvar110r._msg === 'setColorgvar110r';
	}).effect((setColorgvar110r) => {
		this.Display_SC_Running_received_display_setColorgvar110r_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgvar110r.g;
		this.Display_SC_Running_display_setColor_var110_var = setColorgvar110r.var110;
		this.Display_SC_Running_display_setColor_r_var = setColorgvar110r.r;
		if(this.Display_SC_Running_received_display_setColorb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgvar110r_var = false;
		this.Display_SC_Running_received_display_setColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorvar111_bis) => {
		return setBGColorvar111_bis._port === 'display' && setBGColorvar111_bis._msg === 'setBGColorvar111_bis';
	}).effect((setBGColorvar111_bis) => {
		this.Display_SC_Running_received_display_setBGColorvar111_var = true;
		this.Display_SC_Running_display_setBGColor_var111_var = setBGColorvar111_bis.var111;
		if(this.Display_SC_Running_received_display_setBGColorgrb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar111_var = false;
		this.Display_SC_Running_received_display_setBGColorgrb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawInteger_) => {
		return drawInteger_._port === 'display' && drawInteger_._msg === 'drawInteger_';
	}).effect((drawInteger_) => {
		this.Display_SC_Running_received_display_drawInteger__var = true;
		if(this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawInteger__var = false;
		this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorvar111) => {
		return setBGColorvar111._port === 'display' && setBGColorvar111._msg === 'setBGColorvar111';
	}).effect((setBGColorvar111) => {
		this.Display_SC_Running_received_display_setBGColorvar111_var = true;
		this.Display_SC_Running_display_setBGColor_var111_var = setBGColorvar111.var111;
		if(this.Display_SC_Running_received_display_setBGColorgrb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorvar111_var = false;
		this.Display_SC_Running_received_display_setBGColorgrb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyheightx) => {
		return drawRectyheightx._port === 'display' && drawRectyheightx._msg === 'drawRectyheightx';
	}).effect((drawRectyheightx) => {
		this.Display_SC_Running_received_display_drawRectyheightx_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyheightx.y;
		this.Display_SC_Running_display_drawRect_height_var = drawRectyheightx.height;
		this.Display_SC_Running_display_drawRect_x_var = drawRectyheightx.x;
		if(this.Display_SC_Running_received_display_drawRectwidthvar112_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyheightx_var = false;
		this.Display_SC_Running_received_display_drawRectwidthvar112_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectvar113) => {
		return fillRectvar113._port === 'display' && fillRectvar113._msg === 'fillRectvar113';
	}).effect((fillRectvar113) => {
		this.Display_SC_Running_received_display_fillRectvar113_var = true;
		this.Display_SC_Running_display_fillRect_var113_var = fillRectvar113.var113;
		if(this.Display_SC_Running_received_display_fillRectxheightwidthy_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectvar113_var = false;
		this.Display_SC_Running_received_display_fillRectxheightwidthy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectvar113_bis) => {
		return fillRectvar113_bis._port === 'display' && fillRectvar113_bis._msg === 'fillRectvar113_bis';
	}).effect((fillRectvar113_bis) => {
		this.Display_SC_Running_received_display_fillRectvar113_var = true;
		this.Display_SC_Running_display_fillRect_var113_var = fillRectvar113_bis.var113;
		if(this.Display_SC_Running_received_display_fillRectxheightwidthy_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectvar113_var = false;
		this.Display_SC_Running_received_display_fillRectxheightwidthy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clearvar109) => {
		return clearvar109._port === 'display' && clearvar109._msg === 'clearvar109';
	}).effect((clearvar109) => {
		this.Display_SC_Running_received_display_clearvar109_var = true;
		this.Display_SC_Running_display_clear_var109_var = clearvar109.var109;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar109_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectxheightwidthy) => {
		return fillRectxheightwidthy._port === 'display' && fillRectxheightwidthy._msg === 'fillRectxheightwidthy';
	}).effect((fillRectxheightwidthy) => {
		this.Display_SC_Running_received_display_fillRectxheightwidthy_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxheightwidthy.x;
		this.Display_SC_Running_display_fillRect_height_var = fillRectxheightwidthy.height;
		this.Display_SC_Running_display_fillRect_width_var = fillRectxheightwidthy.width;
		this.Display_SC_Running_display_fillRect_y_var = fillRectxheightwidthy.y;
		if(this.Display_SC_Running_received_display_fillRectvar113_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxheightwidthy_var = false;
		this.Display_SC_Running_received_display_fillRectvar113_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear__bis) => {
		return clear__bis._port === 'display' && clear__bis._msg === 'clear__bis';
	}).effect((clear__bis) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar109_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar109_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectwidthvar112_bis) => {
		return drawRectwidthvar112_bis._port === 'display' && drawRectwidthvar112_bis._msg === 'drawRectwidthvar112_bis';
	}).effect((drawRectwidthvar112_bis) => {
		this.Display_SC_Running_received_display_drawRectwidthvar112_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthvar112_bis.width;
		this.Display_SC_Running_display_drawRect_var112_var = drawRectwidthvar112_bis.var112;
		if(this.Display_SC_Running_received_display_drawRectyheightx_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthvar112_var = false;
		this.Display_SC_Running_received_display_drawRectyheightx_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar117) => {
		return destroyvar117._port === 'display' && destroyvar117._msg === 'destroyvar117' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar117) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar117_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar117) => {
		return destroyvar117._port === 'display' && destroyvar117._msg === 'destroyvar117' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar117) => {
		this.Display_SC_Running_received_display_destroyvar117_var = true;
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysize_bis) => {
		return createysize_bis._port === 'display' && createysize_bis._msg === 'createysize_bis' && (this.Display_SC_Wait_received_display_createxsizevar116_var);
	}).effect((createysize_bis) => {
		this.Display_SC_Wait_display_create_ysize_var = createysize_bis.ysize;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createysize_bis.ysize);
		this.Display_SC_Wait_received_display_createysize_var = false;
		this.Display_SC_Wait_received_display_createxsizevar116_var = false;
	});
	Display_SC_Wait.to(null).when((createysize_bis) => {
		return createysize_bis._port === 'display' && createysize_bis._msg === 'createysize_bis' && (!(this.Display_SC_Wait_received_display_createxsizevar116_var));
	}).effect((createysize_bis) => {
		this.Display_SC_Wait_received_display_createysize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysize_bis.ysize;
	});
	Display_SC_Running.to(null).when((drawIntegerscalevar114vydigitsx_bis) => {
		return drawIntegerscalevar114vydigitsx_bis._port === 'display' && drawIntegerscalevar114vydigitsx_bis._msg === 'drawIntegerscalevar114vydigitsx_bis';
	}).effect((drawIntegerscalevar114vydigitsx_bis) => {
		this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var = true;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerscalevar114vydigitsx_bis.scale;
		this.Display_SC_Running_display_drawInteger_var114_var = drawIntegerscalevar114vydigitsx_bis.var114;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerscalevar114vydigitsx_bis.v;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerscalevar114vydigitsx_bis.y;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerscalevar114vydigitsx_bis.digits;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerscalevar114vydigitsx_bis.x;
		if(this.Display_SC_Running_received_display_drawInteger__var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var = false;
		this.Display_SC_Running_received_display_drawInteger__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((clear_) => {
		return clear_._port === 'display' && clear_._msg === 'clear_';
	}).effect((clear_) => {
		this.Display_SC_Running_received_display_clear__var = true;
		if(this.Display_SC_Running_received_display_clearvar109_var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clear__var = false;
		this.Display_SC_Running_received_display_clearvar109_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerscalevar114vydigitsx) => {
		return drawIntegerscalevar114vydigitsx._port === 'display' && drawIntegerscalevar114vydigitsx._msg === 'drawIntegerscalevar114vydigitsx';
	}).effect((drawIntegerscalevar114vydigitsx) => {
		this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var = true;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegerscalevar114vydigitsx.scale;
		this.Display_SC_Running_display_drawInteger_var114_var = drawIntegerscalevar114vydigitsx.var114;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerscalevar114vydigitsx.v;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegerscalevar114vydigitsx.y;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerscalevar114vydigitsx.digits;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegerscalevar114vydigitsx.x;
		if(this.Display_SC_Running_received_display_drawInteger__var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var = false;
		this.Display_SC_Running_received_display_drawInteger__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updatevar118_bis) => {
		return updatevar118_bis._port === 'display' && updatevar118_bis._msg === 'updatevar118_bis';
	}).effect((updatevar118_bis) => {
		this.Display_SC_Running_received_display_updatevar118_var = true;
		this.Display_SC_Running_display_update_var118_var = updatevar118_bis.var118;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar118_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((update__bis) => {
		return update__bis._port === 'display' && update__bis._msg === 'update__bis';
	}).effect((update__bis) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar118_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar118_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLy) => {
		return drawThingMLy._port === 'display' && drawThingMLy._msg === 'drawThingMLy';
	}).effect((drawThingMLy) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar115x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar115x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorb) => {
		return setColorb._port === 'display' && setColorb._msg === 'setColorb';
	}).effect((setColorb) => {
		this.Display_SC_Running_received_display_setColorb_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorb.b;
		if(this.Display_SC_Running_received_display_setColorgvar110r_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorb_var = false;
		this.Display_SC_Running_received_display_setColorgvar110r_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLvar115x_bis) => {
		return drawThingMLvar115x_bis._port === 'display' && drawThingMLvar115x_bis._msg === 'drawThingMLvar115x_bis';
	}).effect((drawThingMLvar115x_bis) => {
		this.Display_SC_Running_received_display_drawThingMLvar115x_var = true;
		this.Display_SC_Running_display_drawThingML_var115_var = drawThingMLvar115x_bis.var115;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLvar115x_bis.x;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar115x_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (this.Display_SC_Running_received_display_destroyvar117_var);
	}).effect((destroy__bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar117_var = false;
	});
	Display_SC_Running.to(null).when((destroy__bis) => {
		return destroy__bis._port === 'display' && destroy__bis._msg === 'destroy__bis' && (!(this.Display_SC_Running_received_display_destroyvar117_var));
	}).effect((destroy__bis) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((clearvar109_bis) => {
		return clearvar109_bis._port === 'display' && clearvar109_bis._msg === 'clearvar109_bis';
	}).effect((clearvar109_bis) => {
		this.Display_SC_Running_received_display_clearvar109_var = true;
		this.Display_SC_Running_display_clear_var109_var = clearvar109_bis.var109;
		if(this.Display_SC_Running_received_display_clear__var) {
		this.clearScreen();
		this.Display_SC_Running_received_display_clearvar109_var = false;
		this.Display_SC_Running_received_display_clear__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawInteger__bis) => {
		return drawInteger__bis._port === 'display' && drawInteger__bis._msg === 'drawInteger__bis';
	}).effect((drawInteger__bis) => {
		this.Display_SC_Running_received_display_drawInteger__var = true;
		if(this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawInteger__var = false;
		this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLy_bis) => {
		return drawThingMLy_bis._port === 'display' && drawThingMLy_bis._msg === 'drawThingMLy_bis';
	}).effect((drawThingMLy_bis) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy_bis.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar115x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar115x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLvar115x) => {
		return drawThingMLvar115x._port === 'display' && drawThingMLvar115x._msg === 'drawThingMLvar115x';
	}).effect((drawThingMLvar115x) => {
		this.Display_SC_Running_received_display_drawThingMLvar115x_var = true;
		this.Display_SC_Running_display_drawThingML_var115_var = drawThingMLvar115x.var115;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLvar115x.x;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar115x_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysize) => {
		return createysize._port === 'display' && createysize._msg === 'createysize' && (this.Display_SC_Wait_received_display_createxsizevar116_var);
	}).effect((createysize) => {
		this.Display_SC_Wait_display_create_ysize_var = createysize.ysize;
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, createysize.ysize);
		this.Display_SC_Wait_received_display_createysize_var = false;
		this.Display_SC_Wait_received_display_createxsizevar116_var = false;
	});
	Display_SC_Wait.to(null).when((createysize) => {
		return createysize._port === 'display' && createysize._msg === 'createysize' && (!(this.Display_SC_Wait_received_display_createxsizevar116_var));
	}).effect((createysize) => {
		this.Display_SC_Wait_received_display_createysize_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysize.ysize;
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizevar116_bis) => {
		return createxsizevar116_bis._port === 'display' && createxsizevar116_bis._msg === 'createxsizevar116_bis' && (this.Display_SC_Wait_received_display_createysize_var);
	}).effect((createxsizevar116_bis) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizevar116_bis.xsize;
		this.Display_SC_Wait_display_create_var116_var = createxsizevar116_bis.var116;
		this.initDisplay(createxsizevar116_bis.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createxsizevar116_var = false;
		this.Display_SC_Wait_received_display_createysize_var = false;
	});
	Display_SC_Wait.to(null).when((createxsizevar116_bis) => {
		return createxsizevar116_bis._port === 'display' && createxsizevar116_bis._msg === 'createxsizevar116_bis' && (!(this.Display_SC_Wait_received_display_createysize_var));
	}).effect((createxsizevar116_bis) => {
		this.Display_SC_Wait_received_display_createxsizevar116_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizevar116_bis.xsize;
		this.Display_SC_Wait_display_create_var116_var = createxsizevar116_bis.var116;
	});
	Display_SC_Running.to(null).when((setColorb_bis) => {
		return setColorb_bis._port === 'display' && setColorb_bis._msg === 'setColorb_bis';
	}).effect((setColorb_bis) => {
		this.Display_SC_Running_received_display_setColorb_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorb_bis.b;
		if(this.Display_SC_Running_received_display_setColorgvar110r_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorb_var = false;
		this.Display_SC_Running_received_display_setColorgvar110r_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorgvar110r_bis) => {
		return setColorgvar110r_bis._port === 'display' && setColorgvar110r_bis._msg === 'setColorgvar110r_bis';
	}).effect((setColorgvar110r_bis) => {
		this.Display_SC_Running_received_display_setColorgvar110r_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgvar110r_bis.g;
		this.Display_SC_Running_display_setColor_var110_var = setColorgvar110r_bis.var110;
		this.Display_SC_Running_display_setColor_r_var = setColorgvar110r_bis.r;
		if(this.Display_SC_Running_received_display_setColorb_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgvar110r_var = false;
		this.Display_SC_Running_received_display_setColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyheightx_bis) => {
		return drawRectyheightx_bis._port === 'display' && drawRectyheightx_bis._msg === 'drawRectyheightx_bis';
	}).effect((drawRectyheightx_bis) => {
		this.Display_SC_Running_received_display_drawRectyheightx_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyheightx_bis.y;
		this.Display_SC_Running_display_drawRect_height_var = drawRectyheightx_bis.height;
		this.Display_SC_Running_display_drawRect_x_var = drawRectyheightx_bis.x;
		if(this.Display_SC_Running_received_display_drawRectwidthvar112_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyheightx_var = false;
		this.Display_SC_Running_received_display_drawRectwidthvar112_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectxheightwidthy_bis) => {
		return fillRectxheightwidthy_bis._port === 'display' && fillRectxheightwidthy_bis._msg === 'fillRectxheightwidthy_bis';
	}).effect((fillRectxheightwidthy_bis) => {
		this.Display_SC_Running_received_display_fillRectxheightwidthy_var = true;
		this.Display_SC_Running_display_fillRect_x_var = fillRectxheightwidthy_bis.x;
		this.Display_SC_Running_display_fillRect_height_var = fillRectxheightwidthy_bis.height;
		this.Display_SC_Running_display_fillRect_width_var = fillRectxheightwidthy_bis.width;
		this.Display_SC_Running_display_fillRect_y_var = fillRectxheightwidthy_bis.y;
		if(this.Display_SC_Running_received_display_fillRectvar113_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectxheightwidthy_var = false;
		this.Display_SC_Running_received_display_fillRectvar113_var = false;
		
		}
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroyvar117_bis) => {
		return destroyvar117_bis._port === 'display' && destroyvar117_bis._msg === 'destroyvar117_bis' && (this.Display_SC_Running_received_display_destroy__var);
	}).effect((destroyvar117_bis) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroyvar117_var = false;
		this.Display_SC_Running_received_display_destroy__var = false;
	});
	Display_SC_Running.to(null).when((destroyvar117_bis) => {
		return destroyvar117_bis._port === 'display' && destroyvar117_bis._msg === 'destroyvar117_bis' && (!(this.Display_SC_Running_received_display_destroy__var));
	}).effect((destroyvar117_bis) => {
		this.Display_SC_Running_received_display_destroyvar117_var = true;
	});
	Display_SC_Running.to(Display_SC_Destroyed).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (this.Display_SC_Running_received_display_destroyvar117_var);
	}).effect((destroy_) => {
		this.destroyDisplay();
		this.Display_SC_Running_received_display_destroy__var = false;
		this.Display_SC_Running_received_display_destroyvar117_var = false;
	});
	Display_SC_Running.to(null).when((destroy_) => {
		return destroy_._port === 'display' && destroy_._msg === 'destroy_' && (!(this.Display_SC_Running_received_display_destroyvar117_var));
	}).effect((destroy_) => {
		this.Display_SC_Running_received_display_destroy__var = true;
	});
	Display_SC_Running.to(null).when((update_) => {
		return update_._port === 'display' && update_._msg === 'update_';
	}).effect((update_) => {
		this.Display_SC_Running_received_display_update__var = true;
		if(this.Display_SC_Running_received_display_updatevar118_var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_update__var = false;
		this.Display_SC_Running_received_display_updatevar118_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectwidthvar112) => {
		return drawRectwidthvar112._port === 'display' && drawRectwidthvar112._msg === 'drawRectwidthvar112';
	}).effect((drawRectwidthvar112) => {
		this.Display_SC_Running_received_display_drawRectwidthvar112_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthvar112.width;
		this.Display_SC_Running_display_drawRect_var112_var = drawRectwidthvar112.var112;
		if(this.Display_SC_Running_received_display_drawRectyheightx_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthvar112_var = false;
		this.Display_SC_Running_received_display_drawRectyheightx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorgrb_bis) => {
		return setBGColorgrb_bis._port === 'display' && setBGColorgrb_bis._msg === 'setBGColorgrb_bis';
	}).effect((setBGColorgrb_bis) => {
		this.Display_SC_Running_received_display_setBGColorgrb_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorgrb_bis.g;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorgrb_bis.r;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorgrb_bis.b;
		if(this.Display_SC_Running_received_display_setBGColorvar111_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorgrb_var = false;
		this.Display_SC_Running_received_display_setBGColorvar111_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizevar116) => {
		return createxsizevar116._port === 'display' && createxsizevar116._msg === 'createxsizevar116' && (this.Display_SC_Wait_received_display_createysize_var);
	}).effect((createxsizevar116) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizevar116.xsize;
		this.Display_SC_Wait_display_create_var116_var = createxsizevar116.var116;
		this.initDisplay(createxsizevar116.xsize, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_createxsizevar116_var = false;
		this.Display_SC_Wait_received_display_createysize_var = false;
	});
	Display_SC_Wait.to(null).when((createxsizevar116) => {
		return createxsizevar116._port === 'display' && createxsizevar116._msg === 'createxsizevar116' && (!(this.Display_SC_Wait_received_display_createysize_var));
	}).effect((createxsizevar116) => {
		this.Display_SC_Wait_received_display_createxsizevar116_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizevar116.xsize;
		this.Display_SC_Wait_display_create_var116_var = createxsizevar116.var116;
	});
	Display_SC_Running.to(null).when((setBGColorgrb) => {
		return setBGColorgrb._port === 'display' && setBGColorgrb._msg === 'setBGColorgrb';
	}).effect((setBGColorgrb) => {
		this.Display_SC_Running_received_display_setBGColorgrb_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorgrb.g;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorgrb.r;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorgrb.b;
		if(this.Display_SC_Running_received_display_setBGColorvar111_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorgrb_var = false;
		this.Display_SC_Running_received_display_setBGColorvar111_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((updatevar118) => {
		return updatevar118._port === 'display' && updatevar118._msg === 'updatevar118';
	}).effect((updatevar118) => {
		this.Display_SC_Running_received_display_updatevar118_var = true;
		this.Display_SC_Running_display_update_var118_var = updatevar118.var118;
		if(this.Display_SC_Running_received_display_update__var) {
		this.updateDisplay();
		this.Display_SC_Running_received_display_updatevar118_var = false;
		this.Display_SC_Running_received_display_update__var = false;
		
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
		
		
		if(87 < 171) {
		setTimeout(() => this.bus.emit('vctrl?position_', 0xA5), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?position__bis', 0x6B), 0);
		
		}
		if(180 < 223) {
		setTimeout(() => this.bus.emit('vctrl?positionyxvar122', 0, 0x09, 0xF1, posX), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionyxvar122_bis', 0, 0x09, posX, 0xB2), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(102 < 192) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar121', 0xA2, 0xFE), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar121_bis', 0xCB, 0xFE), 0);
			
			}
			if(34 < 115) {
			setTimeout(() => this.bus.emit('vctrl?velocitydydx', 0, 0x75,  -8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydydx_bis', 0,  -8, 0xBB), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(242 < 230) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar121', 0xD4, 0xF6), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar121_bis', 0xF5, 0xF6), 0);
			
			}
			if(165 < 117) {
			setTimeout(() => this.bus.emit('vctrl?velocitydydx', 0, 0xE9, 8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydydx_bis', 0, 8, 0xC7), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(69 < 177) {
			setTimeout(() => this.bus.emit('vctrl?velocitydydx', 0, 0xD7, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydydx_bis', 0, 0, 0x52), 0);
			
			}
			if(133 < 87) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar121', 0xF6, 0x3D), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar121_bis', 0x86, 0x3D), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(173 < 143) {
		setTimeout(() => this.bus.emit('vctrl?position_', 0x41), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?position__bis', 0x08), 0);
		
		}
		if(3 < 88) {
		setTimeout(() => this.bus.emit('vctrl?positionyxvar122', 0, 0x1E, 0x74, x), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionyxvar122_bis', 0, 0x1E, x, 0xD6), 0);
		
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

DisplayBrowserRND.prototype.receivecreateysizeOndisplay = function(ysize, var152) {
	this._receive({_port:"display", _msg:"createysize", ysize:ysize, var152:var152});
}

DisplayBrowserRND.prototype.receivecreatexsizevar116Ondisplay = function(var153, var116, xsize) {
	this._receive({_port:"display", _msg:"createxsizevar116", var153:var153, var116:var116, xsize:xsize});
}

DisplayBrowserRND.prototype.receivedestroy_Ondisplay = function(var148) {
	this._receive({_port:"display", _msg:"destroy_", var148:var148});
}

DisplayBrowserRND.prototype.receivedestroyvar117Ondisplay = function(var149, var117) {
	this._receive({_port:"display", _msg:"destroyvar117", var149:var149, var117:var117});
}

DisplayBrowserRND.prototype.receiveupdate_Ondisplay = function(var144) {
	this._receive({_port:"display", _msg:"update_", var144:var144});
}

DisplayBrowserRND.prototype.receiveupdatevar118Ondisplay = function(var145, var118) {
	this._receive({_port:"display", _msg:"updatevar118", var145:var145, var118:var118});
}

DisplayBrowserRND.prototype.receiveclear_Ondisplay = function(var154) {
	this._receive({_port:"display", _msg:"clear_", var154:var154});
}

DisplayBrowserRND.prototype.receiveclearvar109Ondisplay = function(var109, var155) {
	this._receive({_port:"display", _msg:"clearvar109", var109:var109, var155:var155});
}

DisplayBrowserRND.prototype.receivesetColorgvar110rOndisplay = function(var142, r, g, var110) {
	this._receive({_port:"display", _msg:"setColorgvar110r", var142:var142, r:r, g:g, var110:var110});
}

DisplayBrowserRND.prototype.receivesetColorbOndisplay = function(var143, b) {
	this._receive({_port:"display", _msg:"setColorb", var143:var143, b:b});
}

DisplayBrowserRND.prototype.receivesetBGColorvar111Ondisplay = function(var111, var138) {
	this._receive({_port:"display", _msg:"setBGColorvar111", var111:var111, var138:var138});
}

DisplayBrowserRND.prototype.receivesetBGColorgrbOndisplay = function(var139, b, g, r) {
	this._receive({_port:"display", _msg:"setBGColorgrb", var139:var139, b:b, g:g, r:r});
}

DisplayBrowserRND.prototype.receivedrawRectwidthvar112Ondisplay = function(var136, width, var112) {
	this._receive({_port:"display", _msg:"drawRectwidthvar112", var136:var136, width:width, var112:var112});
}

DisplayBrowserRND.prototype.receivedrawRectyheightxOndisplay = function(height, x, var137, y) {
	this._receive({_port:"display", _msg:"drawRectyheightx", height:height, x:x, var137:var137, y:y});
}

DisplayBrowserRND.prototype.receivefillRectxheightwidthyOndisplay = function(y, x, var134, width, height) {
	this._receive({_port:"display", _msg:"fillRectxheightwidthy", y:y, x:x, var134:var134, width:width, height:height});
}

DisplayBrowserRND.prototype.receivefillRectvar113Ondisplay = function(var135, var113) {
	this._receive({_port:"display", _msg:"fillRectvar113", var135:var135, var113:var113});
}

DisplayBrowserRND.prototype.receivedrawInteger_Ondisplay = function(var146) {
	this._receive({_port:"display", _msg:"drawInteger_", var146:var146});
}

DisplayBrowserRND.prototype.receivedrawIntegerscalevar114vydigitsxOndisplay = function(var114, scale, x, var147, v, digits, y) {
	this._receive({_port:"display", _msg:"drawIntegerscalevar114vydigitsx", var114:var114, scale:scale, x:x, var147:var147, v:v, digits:digits, y:y});
}

DisplayBrowserRND.prototype.receivedrawThingMLvar115xOndisplay = function(var140, x, var115) {
	this._receive({_port:"display", _msg:"drawThingMLvar115x", var140:var140, x:x, var115:var115});
}

DisplayBrowserRND.prototype.receivedrawThingMLyOndisplay = function(var141, y) {
	this._receive({_port:"display", _msg:"drawThingMLy", var141:var141, y:y});
}

DisplayBrowserRND.prototype.receivecreateysize_bisOndisplay = function(ysize, var176) {
	this._receive({_port:"display", _msg:"createysize_bis", ysize:ysize, var176:var176});
}

DisplayBrowserRND.prototype.receivecreatexsizevar116_bisOndisplay = function(var116, var177, xsize) {
	this._receive({_port:"display", _msg:"createxsizevar116_bis", var116:var116, var177:var177, xsize:xsize});
}

DisplayBrowserRND.prototype.receivedestroy__bisOndisplay = function(var172) {
	this._receive({_port:"display", _msg:"destroy__bis", var172:var172});
}

DisplayBrowserRND.prototype.receivedestroyvar117_bisOndisplay = function(var173, var117) {
	this._receive({_port:"display", _msg:"destroyvar117_bis", var173:var173, var117:var117});
}

DisplayBrowserRND.prototype.receiveupdate__bisOndisplay = function(var168) {
	this._receive({_port:"display", _msg:"update__bis", var168:var168});
}

DisplayBrowserRND.prototype.receiveupdatevar118_bisOndisplay = function(var118, var169) {
	this._receive({_port:"display", _msg:"updatevar118_bis", var118:var118, var169:var169});
}

DisplayBrowserRND.prototype.receiveclear__bisOndisplay = function(var178) {
	this._receive({_port:"display", _msg:"clear__bis", var178:var178});
}

DisplayBrowserRND.prototype.receiveclearvar109_bisOndisplay = function(var109, var179) {
	this._receive({_port:"display", _msg:"clearvar109_bis", var109:var109, var179:var179});
}

DisplayBrowserRND.prototype.receivesetColorgvar110r_bisOndisplay = function(g, var166, var110, r) {
	this._receive({_port:"display", _msg:"setColorgvar110r_bis", g:g, var166:var166, var110:var110, r:r});
}

DisplayBrowserRND.prototype.receivesetColorb_bisOndisplay = function(var167, b) {
	this._receive({_port:"display", _msg:"setColorb_bis", var167:var167, b:b});
}

DisplayBrowserRND.prototype.receivesetBGColorvar111_bisOndisplay = function(var162, var111) {
	this._receive({_port:"display", _msg:"setBGColorvar111_bis", var162:var162, var111:var111});
}

DisplayBrowserRND.prototype.receivesetBGColorgrb_bisOndisplay = function(r, b, g, var163) {
	this._receive({_port:"display", _msg:"setBGColorgrb_bis", r:r, b:b, g:g, var163:var163});
}

DisplayBrowserRND.prototype.receivedrawRectwidthvar112_bisOndisplay = function(var160, var112, width) {
	this._receive({_port:"display", _msg:"drawRectwidthvar112_bis", var160:var160, var112:var112, width:width});
}

DisplayBrowserRND.prototype.receivedrawRectyheightx_bisOndisplay = function(x, height, var161, y) {
	this._receive({_port:"display", _msg:"drawRectyheightx_bis", x:x, height:height, var161:var161, y:y});
}

DisplayBrowserRND.prototype.receivefillRectxheightwidthy_bisOndisplay = function(y, x, var158, height, width) {
	this._receive({_port:"display", _msg:"fillRectxheightwidthy_bis", y:y, x:x, var158:var158, height:height, width:width});
}

DisplayBrowserRND.prototype.receivefillRectvar113_bisOndisplay = function(var113, var159) {
	this._receive({_port:"display", _msg:"fillRectvar113_bis", var113:var113, var159:var159});
}

DisplayBrowserRND.prototype.receivedrawInteger__bisOndisplay = function(var170) {
	this._receive({_port:"display", _msg:"drawInteger__bis", var170:var170});
}

DisplayBrowserRND.prototype.receivedrawIntegerscalevar114vydigitsx_bisOndisplay = function(v, x, scale, y, var171, var114, digits) {
	this._receive({_port:"display", _msg:"drawIntegerscalevar114vydigitsx_bis", v:v, x:x, scale:scale, y:y, var171:var171, var114:var114, digits:digits});
}

DisplayBrowserRND.prototype.receivedrawThingMLvar115x_bisOndisplay = function(var164, x, var115) {
	this._receive({_port:"display", _msg:"drawThingMLvar115x_bis", var164:var164, x:x, var115:var115});
}

DisplayBrowserRND.prototype.receivedrawThingMLy_bisOndisplay = function(var165, y) {
	this._receive({_port:"display", _msg:"drawThingMLy_bis", var165:var165, y:y});
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_var111_var = function(Display_SC_Running_display_setBGColor_var111_var) {
	this.Display_SC_Running_display_setBGColor_var111_var = Display_SC_Running_display_setBGColor_var111_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_createysize_var = function(Display_SC_Wait_received_display_createysize_var) {
	this.Display_SC_Wait_received_display_createysize_var = Display_SC_Wait_received_display_createysize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_var112_var = function(Display_SC_Running_display_drawRect_var112_var) {
	this.Display_SC_Running_display_drawRect_var112_var = Display_SC_Running_display_drawRect_var112_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_createxsizevar116_var = function(Display_SC_Wait_received_display_createxsizevar116_var) {
	this.Display_SC_Wait_received_display_createxsizevar116_var = Display_SC_Wait_received_display_createxsizevar116_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_var110_var = function(Display_SC_Running_display_setColor_var110_var) {
	this.Display_SC_Running_display_setColor_var110_var = Display_SC_Running_display_setColor_var110_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLvar115x_var = function(Display_SC_Running_received_display_drawThingMLvar115x_var) {
	this.Display_SC_Running_received_display_drawThingMLvar115x_var = Display_SC_Running_received_display_drawThingMLvar115x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLy_var = function(Display_SC_Running_received_display_drawThingMLy_var) {
	this.Display_SC_Running_received_display_drawThingMLy_var = Display_SC_Running_received_display_drawThingMLy_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_var115_var = function(Display_SC_Running_display_drawThingML_var115_var) {
	this.Display_SC_Running_display_drawThingML_var115_var = Display_SC_Running_display_drawThingML_var115_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clearvar109_var = function(Display_SC_Running_received_display_clearvar109_var) {
	this.Display_SC_Running_received_display_clearvar109_var = Display_SC_Running_received_display_clearvar109_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_var113_var = function(Display_SC_Running_display_fillRect_var113_var) {
	this.Display_SC_Running_display_fillRect_var113_var = Display_SC_Running_display_fillRect_var113_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_destroy_var117_var = function(Display_SC_Running_display_destroy_var117_var) {
	this.Display_SC_Running_display_destroy_var117_var = Display_SC_Running_display_destroy_var117_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_var116_var = function(Display_SC_Wait_display_create_var116_var) {
	this.Display_SC_Wait_display_create_var116_var = Display_SC_Wait_display_create_var116_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_updatevar118_var = function(Display_SC_Running_received_display_updatevar118_var) {
	this.Display_SC_Running_received_display_updatevar118_var = Display_SC_Running_received_display_updatevar118_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorb_var = function(Display_SC_Running_received_display_setColorb_var) {
	this.Display_SC_Running_received_display_setColorb_var = Display_SC_Running_received_display_setColorb_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroyvar117_var = function(Display_SC_Running_received_display_destroyvar117_var) {
	this.Display_SC_Running_received_display_destroyvar117_var = Display_SC_Running_received_display_destroyvar117_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRectyheightx_var = function(Display_SC_Running_received_display_drawRectyheightx_var) {
	this.Display_SC_Running_received_display_drawRectyheightx_var = Display_SC_Running_received_display_drawRectyheightx_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectxheightwidthy_var = function(Display_SC_Running_received_display_fillRectxheightwidthy_var) {
	this.Display_SC_Running_received_display_fillRectxheightwidthy_var = Display_SC_Running_received_display_fillRectxheightwidthy_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var = function(Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var) {
	this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var = Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorvar111_var = function(Display_SC_Running_received_display_setBGColorvar111_var) {
	this.Display_SC_Running_received_display_setBGColorvar111_var = Display_SC_Running_received_display_setBGColorvar111_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRectwidthvar112_var = function(Display_SC_Running_received_display_drawRectwidthvar112_var) {
	this.Display_SC_Running_received_display_drawRectwidthvar112_var = Display_SC_Running_received_display_drawRectwidthvar112_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_update_var118_var = function(Display_SC_Running_display_update_var118_var) {
	this.Display_SC_Running_display_update_var118_var = Display_SC_Running_display_update_var118_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawInteger__var = function(Display_SC_Running_received_display_drawInteger__var) {
	this.Display_SC_Running_received_display_drawInteger__var = Display_SC_Running_received_display_drawInteger__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorgvar110r_var = function(Display_SC_Running_received_display_setColorgvar110r_var) {
	this.Display_SC_Running_received_display_setColorgvar110r_var = Display_SC_Running_received_display_setColorgvar110r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorgrb_var = function(Display_SC_Running_received_display_setBGColorgrb_var) {
	this.Display_SC_Running_received_display_setBGColorgrb_var = Display_SC_Running_received_display_setBGColorgrb_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_var114_var = function(Display_SC_Running_display_drawInteger_var114_var) {
	this.Display_SC_Running_display_drawInteger_var114_var = Display_SC_Running_display_drawInteger_var114_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_clear_var109_var = function(Display_SC_Running_display_clear_var109_var) {
	this.Display_SC_Running_display_clear_var109_var = Display_SC_Running_display_clear_var109_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectvar113_var = function(Display_SC_Running_received_display_fillRectvar113_var) {
	this.Display_SC_Running_received_display_fillRectvar113_var = Display_SC_Running_received_display_fillRectvar113_var;
}

DisplayBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tdisplay_setBGColor_var111 = ' + this.Display_SC_Running_display_setBGColor_var111_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\treceived_display_createysize = ' + this.Display_SC_Wait_received_display_createysize_var;
	result += '\n\tdisplay_drawRect_var112 = ' + this.Display_SC_Running_display_drawRect_var112_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\treceived_display_createxsizevar116 = ' + this.Display_SC_Wait_received_display_createxsizevar116_var;
	result += '\n\tdisplay_setColor_var110 = ' + this.Display_SC_Running_display_setColor_var110_var;
	result += '\n\treceived_display_drawThingMLvar115x = ' + this.Display_SC_Running_received_display_drawThingMLvar115x_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\treceived_display_drawThingMLy = ' + this.Display_SC_Running_received_display_drawThingMLy_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tdisplay_drawThingML_var115 = ' + this.Display_SC_Running_display_drawThingML_var115_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\treceived_display_clearvar109 = ' + this.Display_SC_Running_received_display_clearvar109_var;
	result += '\n\tdisplay_fillRect_var113 = ' + this.Display_SC_Running_display_fillRect_var113_var;
	result += '\n\tdisplay_destroy_var117 = ' + this.Display_SC_Running_display_destroy_var117_var;
	result += '\n\tdisplay_create_var116 = ' + this.Display_SC_Wait_display_create_var116_var;
	result += '\n\treceived_display_updatevar118 = ' + this.Display_SC_Running_received_display_updatevar118_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\treceived_display_setColorb = ' + this.Display_SC_Running_received_display_setColorb_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\treceived_display_destroyvar117 = ' + this.Display_SC_Running_received_display_destroyvar117_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\treceived_display_drawRectyheightx = ' + this.Display_SC_Running_received_display_drawRectyheightx_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\treceived_display_fillRectxheightwidthy = ' + this.Display_SC_Running_received_display_fillRectxheightwidthy_var;
	result += '\n\treceived_display_drawIntegerscalevar114vydigitsx = ' + this.Display_SC_Running_received_display_drawIntegerscalevar114vydigitsx_var;
	result += '\n\treceived_display_setBGColorvar111 = ' + this.Display_SC_Running_received_display_setBGColorvar111_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\treceived_display_drawRectwidthvar112 = ' + this.Display_SC_Running_received_display_drawRectwidthvar112_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tdisplay_update_var118 = ' + this.Display_SC_Running_display_update_var118_var;
	result += '\n\treceived_display_drawInteger_ = ' + this.Display_SC_Running_received_display_drawInteger__var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\treceived_display_setColorgvar110r = ' + this.Display_SC_Running_received_display_setColorgvar110r_var;
	result += '\n\treceived_display_setBGColorgrb = ' + this.Display_SC_Running_received_display_setBGColorgrb_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tdisplay_drawInteger_var114 = ' + this.Display_SC_Running_display_drawInteger_var114_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_clear_var109 = ' + this.Display_SC_Running_display_clear_var109_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\treceived_display_fillRectvar113 = ' + this.Display_SC_Running_received_display_fillRectvar113_var;
	result += '';
	return result;
}

