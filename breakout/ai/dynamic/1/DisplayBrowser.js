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
		if(169 < 7) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x14), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0x5B), 0);
		
		}
		if(87 < 171) {
		setTimeout(() => this.bus.emit('display?displayReadyvar119', 0x29, 0xE1), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar119_bis', 0x39, 0x29), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
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
	Display_SC_Running.to(null).when((fillRectvar113heightwidthyx_bis) => {
		return fillRectvar113heightwidthyx_bis._port === 'display' && fillRectvar113heightwidthyx_bis._msg === 'fillRectvar113heightwidthyx_bis';
	}).effect((fillRectvar113heightwidthyx_bis) => {
		this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var = true;
		this.Display_SC_Running_display_fillRect_var113_var = fillRectvar113heightwidthyx_bis.var113;
		this.Display_SC_Running_display_fillRect_height_var = fillRectvar113heightwidthyx_bis.height;
		this.Display_SC_Running_display_fillRect_width_var = fillRectvar113heightwidthyx_bis.width;
		this.Display_SC_Running_display_fillRect_y_var = fillRectvar113heightwidthyx_bis.y;
		this.Display_SC_Running_display_fillRect_x_var = fillRectvar113heightwidthyx_bis.x;
		if(this.Display_SC_Running_received_display_fillRect__var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var = false;
		this.Display_SC_Running_received_display_fillRect__var = false;
		
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
	Display_SC_Running.to(null).when((drawIntegerdigitsv) => {
		return drawIntegerdigitsv._port === 'display' && drawIntegerdigitsv._msg === 'drawIntegerdigitsv';
	}).effect((drawIntegerdigitsv) => {
		this.Display_SC_Running_received_display_drawIntegerdigitsv_var = true;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerdigitsv.digits;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerdigitsv.v;
		if(this.Display_SC_Running_received_display_drawIntegervar114xscaley_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerdigitsv_var = false;
		this.Display_SC_Running_received_display_drawIntegervar114xscaley_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorg_bis) => {
		return setBGColorg_bis._port === 'display' && setBGColorg_bis._msg === 'setBGColorg_bis';
	}).effect((setBGColorg_bis) => {
		this.Display_SC_Running_received_display_setBGColorg_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorg_bis.g;
		if(this.Display_SC_Running_received_display_setBGColorrvar111b_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorg_var = false;
		this.Display_SC_Running_received_display_setBGColorrvar111b_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervar114xscaley_bis) => {
		return drawIntegervar114xscaley_bis._port === 'display' && drawIntegervar114xscaley_bis._msg === 'drawIntegervar114xscaley_bis';
	}).effect((drawIntegervar114xscaley_bis) => {
		this.Display_SC_Running_received_display_drawIntegervar114xscaley_var = true;
		this.Display_SC_Running_display_drawInteger_var114_var = drawIntegervar114xscaley_bis.var114;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegervar114xscaley_bis.x;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervar114xscaley_bis.scale;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervar114xscaley_bis.y;
		if(this.Display_SC_Running_received_display_drawIntegerdigitsv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervar114xscaley_var = false;
		this.Display_SC_Running_received_display_drawIntegerdigitsv_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysizevar116) => {
		return createxsizeysizevar116._port === 'display' && createxsizeysizevar116._msg === 'createxsizeysizevar116' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createxsizeysizevar116) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar116.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar116.ysize;
		this.Display_SC_Wait_display_create_var116_var = createxsizeysizevar116.var116;
		this.initDisplay(createxsizeysizevar116.xsize, createxsizeysizevar116.ysize);
		this.Display_SC_Wait_received_display_createxsizeysizevar116_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysizevar116) => {
		return createxsizeysizevar116._port === 'display' && createxsizeysizevar116._msg === 'createxsizeysizevar116' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createxsizeysizevar116) => {
		this.Display_SC_Wait_received_display_createxsizeysizevar116_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar116.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar116.ysize;
		this.Display_SC_Wait_display_create_var116_var = createxsizeysizevar116.var116;
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
	Display_SC_Running.to(null).when((fillRectvar113heightwidthyx) => {
		return fillRectvar113heightwidthyx._port === 'display' && fillRectvar113heightwidthyx._msg === 'fillRectvar113heightwidthyx';
	}).effect((fillRectvar113heightwidthyx) => {
		this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var = true;
		this.Display_SC_Running_display_fillRect_var113_var = fillRectvar113heightwidthyx.var113;
		this.Display_SC_Running_display_fillRect_height_var = fillRectvar113heightwidthyx.height;
		this.Display_SC_Running_display_fillRect_width_var = fillRectvar113heightwidthyx.width;
		this.Display_SC_Running_display_fillRect_y_var = fillRectvar113heightwidthyx.y;
		this.Display_SC_Running_display_fillRect_x_var = fillRectvar113heightwidthyx.x;
		if(this.Display_SC_Running_received_display_fillRect__var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var = false;
		this.Display_SC_Running_received_display_fillRect__var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (this.Display_SC_Wait_received_display_createxsizeysizevar116_var);
	}).effect((create_) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createxsizeysizevar116_var = false;
	});
	Display_SC_Wait.to(null).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (!(this.Display_SC_Wait_received_display_createxsizeysizevar116_var));
	}).effect((create_) => {
		this.Display_SC_Wait_received_display_create__var = true;
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
	Display_SC_Running.to(null).when((fillRect_) => {
		return fillRect_._port === 'display' && fillRect_._msg === 'fillRect_';
	}).effect((fillRect_) => {
		this.Display_SC_Running_received_display_fillRect__var = true;
		if(this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRect__var = false;
		this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var = false;
		
		}
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
	Display_SC_Running.to(null).when((setColorbvar110_bis) => {
		return setColorbvar110_bis._port === 'display' && setColorbvar110_bis._msg === 'setColorbvar110_bis';
	}).effect((setColorbvar110_bis) => {
		this.Display_SC_Running_received_display_setColorbvar110_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbvar110_bis.b;
		this.Display_SC_Running_display_setColor_var110_var = setColorbvar110_bis.var110;
		if(this.Display_SC_Running_received_display_setColorgr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbvar110_var = false;
		this.Display_SC_Running_received_display_setColorgr_var = false;
		
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
	Display_SC_Running.to(null).when((setBGColorrvar111b) => {
		return setBGColorrvar111b._port === 'display' && setBGColorrvar111b._msg === 'setBGColorrvar111b';
	}).effect((setBGColorrvar111b) => {
		this.Display_SC_Running_received_display_setBGColorrvar111b_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrvar111b.r;
		this.Display_SC_Running_display_setBGColor_var111_var = setBGColorrvar111b.var111;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorrvar111b.b;
		if(this.Display_SC_Running_received_display_setBGColorg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrvar111b_var = false;
		this.Display_SC_Running_received_display_setBGColorg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyvar112height_bis) => {
		return drawRectyvar112height_bis._port === 'display' && drawRectyvar112height_bis._msg === 'drawRectyvar112height_bis';
	}).effect((drawRectyvar112height_bis) => {
		this.Display_SC_Running_received_display_drawRectyvar112height_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyvar112height_bis.y;
		this.Display_SC_Running_display_drawRect_var112_var = drawRectyvar112height_bis.var112;
		this.Display_SC_Running_display_drawRect_height_var = drawRectyvar112height_bis.height;
		if(this.Display_SC_Running_received_display_drawRectwidthx_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyvar112height_var = false;
		this.Display_SC_Running_received_display_drawRectwidthx_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (this.Display_SC_Wait_received_display_createxsizeysizevar116_var);
	}).effect((create__bis) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createxsizeysizevar116_var = false;
	});
	Display_SC_Wait.to(null).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (!(this.Display_SC_Wait_received_display_createxsizeysizevar116_var));
	}).effect((create__bis) => {
		this.Display_SC_Wait_received_display_create__var = true;
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
	Display_SC_Running.to(null).when((setColorbvar110) => {
		return setColorbvar110._port === 'display' && setColorbvar110._msg === 'setColorbvar110';
	}).effect((setColorbvar110) => {
		this.Display_SC_Running_received_display_setColorbvar110_var = true;
		this.Display_SC_Running_display_setColor_b_var = setColorbvar110.b;
		this.Display_SC_Running_display_setColor_var110_var = setColorbvar110.var110;
		if(this.Display_SC_Running_received_display_setColorgr_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorbvar110_var = false;
		this.Display_SC_Running_received_display_setColorgr_var = false;
		
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
	Display_SC_Running.to(null).when((fillRect__bis) => {
		return fillRect__bis._port === 'display' && fillRect__bis._msg === 'fillRect__bis';
	}).effect((fillRect__bis) => {
		this.Display_SC_Running_received_display_fillRect__var = true;
		if(this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRect__var = false;
		this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var = false;
		
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
	Display_SC_Running.to(null).when((drawIntegervar114xscaley) => {
		return drawIntegervar114xscaley._port === 'display' && drawIntegervar114xscaley._msg === 'drawIntegervar114xscaley';
	}).effect((drawIntegervar114xscaley) => {
		this.Display_SC_Running_received_display_drawIntegervar114xscaley_var = true;
		this.Display_SC_Running_display_drawInteger_var114_var = drawIntegervar114xscaley.var114;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegervar114xscaley.x;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervar114xscaley.scale;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervar114xscaley.y;
		if(this.Display_SC_Running_received_display_drawIntegerdigitsv_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervar114xscaley_var = false;
		this.Display_SC_Running_received_display_drawIntegerdigitsv_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectwidthx) => {
		return drawRectwidthx._port === 'display' && drawRectwidthx._msg === 'drawRectwidthx';
	}).effect((drawRectwidthx) => {
		this.Display_SC_Running_received_display_drawRectwidthx_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthx.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthx.x;
		if(this.Display_SC_Running_received_display_drawRectyvar112height_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthx_var = false;
		this.Display_SC_Running_received_display_drawRectyvar112height_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorrvar111b_bis) => {
		return setBGColorrvar111b_bis._port === 'display' && setBGColorrvar111b_bis._msg === 'setBGColorrvar111b_bis';
	}).effect((setBGColorrvar111b_bis) => {
		this.Display_SC_Running_received_display_setBGColorrvar111b_var = true;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorrvar111b_bis.r;
		this.Display_SC_Running_display_setBGColor_var111_var = setBGColorrvar111b_bis.var111;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorrvar111b_bis.b;
		if(this.Display_SC_Running_received_display_setBGColorg_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorrvar111b_var = false;
		this.Display_SC_Running_received_display_setBGColorg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectwidthx_bis) => {
		return drawRectwidthx_bis._port === 'display' && drawRectwidthx_bis._msg === 'drawRectwidthx_bis';
	}).effect((drawRectwidthx_bis) => {
		this.Display_SC_Running_received_display_drawRectwidthx_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthx_bis.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthx_bis.x;
		if(this.Display_SC_Running_received_display_drawRectyvar112height_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthx_var = false;
		this.Display_SC_Running_received_display_drawRectyvar112height_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createxsizeysizevar116_bis) => {
		return createxsizeysizevar116_bis._port === 'display' && createxsizeysizevar116_bis._msg === 'createxsizeysizevar116_bis' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createxsizeysizevar116_bis) => {
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar116_bis.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar116_bis.ysize;
		this.Display_SC_Wait_display_create_var116_var = createxsizeysizevar116_bis.var116;
		this.initDisplay(createxsizeysizevar116_bis.xsize, createxsizeysizevar116_bis.ysize);
		this.Display_SC_Wait_received_display_createxsizeysizevar116_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createxsizeysizevar116_bis) => {
		return createxsizeysizevar116_bis._port === 'display' && createxsizeysizevar116_bis._msg === 'createxsizeysizevar116_bis' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createxsizeysizevar116_bis) => {
		this.Display_SC_Wait_received_display_createxsizeysizevar116_var = true;
		this.Display_SC_Wait_display_create_xsize_var = createxsizeysizevar116_bis.xsize;
		this.Display_SC_Wait_display_create_ysize_var = createxsizeysizevar116_bis.ysize;
		this.Display_SC_Wait_display_create_var116_var = createxsizeysizevar116_bis.var116;
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
	Display_SC_Running.to(null).when((setColorgr) => {
		return setColorgr._port === 'display' && setColorgr._msg === 'setColorgr';
	}).effect((setColorgr) => {
		this.Display_SC_Running_received_display_setColorgr_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgr.g;
		this.Display_SC_Running_display_setColor_r_var = setColorgr.r;
		if(this.Display_SC_Running_received_display_setColorbvar110_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgr_var = false;
		this.Display_SC_Running_received_display_setColorbvar110_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorgr_bis) => {
		return setColorgr_bis._port === 'display' && setColorgr_bis._msg === 'setColorgr_bis';
	}).effect((setColorgr_bis) => {
		this.Display_SC_Running_received_display_setColorgr_var = true;
		this.Display_SC_Running_display_setColor_g_var = setColorgr_bis.g;
		this.Display_SC_Running_display_setColor_r_var = setColorgr_bis.r;
		if(this.Display_SC_Running_received_display_setColorbvar110_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorgr_var = false;
		this.Display_SC_Running_received_display_setColorbvar110_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorg) => {
		return setBGColorg._port === 'display' && setBGColorg._msg === 'setBGColorg';
	}).effect((setBGColorg) => {
		this.Display_SC_Running_received_display_setBGColorg_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorg.g;
		if(this.Display_SC_Running_received_display_setBGColorrvar111b_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorg_var = false;
		this.Display_SC_Running_received_display_setBGColorrvar111b_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectyvar112height) => {
		return drawRectyvar112height._port === 'display' && drawRectyvar112height._msg === 'drawRectyvar112height';
	}).effect((drawRectyvar112height) => {
		this.Display_SC_Running_received_display_drawRectyvar112height_var = true;
		this.Display_SC_Running_display_drawRect_y_var = drawRectyvar112height.y;
		this.Display_SC_Running_display_drawRect_var112_var = drawRectyvar112height.var112;
		this.Display_SC_Running_display_drawRect_height_var = drawRectyvar112height.height;
		if(this.Display_SC_Running_received_display_drawRectwidthx_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectyvar112height_var = false;
		this.Display_SC_Running_received_display_drawRectwidthx_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegerdigitsv_bis) => {
		return drawIntegerdigitsv_bis._port === 'display' && drawIntegerdigitsv_bis._msg === 'drawIntegerdigitsv_bis';
	}).effect((drawIntegerdigitsv_bis) => {
		this.Display_SC_Running_received_display_drawIntegerdigitsv_var = true;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegerdigitsv_bis.digits;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegerdigitsv_bis.v;
		if(this.Display_SC_Running_received_display_drawIntegervar114xscaley_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegerdigitsv_var = false;
		this.Display_SC_Running_received_display_drawIntegervar114xscaley_var = false;
		
		}
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
		
		
		if(44 < 142) {
		setTimeout(() => this.bus.emit('vctrl?positionyx', 0, posX, 0xEA), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionyx_bis', posX, 0xDB, 0), 0);
		
		}
		if(255 < 112) {
		setTimeout(() => this.bus.emit('vctrl?positionvar122', 0x14, 0x59), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar122_bis', 0x14, 0x05), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(87 < 86) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0x00,  -8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis',  -8, 0x78), 0);
			
			}
			if(222 < 40) {
			setTimeout(() => this.bus.emit('vctrl?velocitydyvar121', 0x35, 0, 0xCB), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydyvar121_bis', 0x8D, 0x35, 0), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(180 < 165) {
			setTimeout(() => this.bus.emit('vctrl?velocitydyvar121', 0x52, 0, 0x61), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydyvar121_bis', 0x1F, 0x52, 0), 0);
			
			}
			if(200 < 84) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0xBD, 8), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis', 8, 0xEA), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(145 < 106) {
			setTimeout(() => this.bus.emit('vctrl?velocitydyvar121', 0x65, 0, 0xFA), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydyvar121_bis', 0xDA, 0x65, 0), 0);
			
			}
			if(135 < 180) {
			setTimeout(() => this.bus.emit('vctrl?velocitydx', 0x02, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocitydx_bis', 0, 0x11), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(211 < 70) {
		setTimeout(() => this.bus.emit('vctrl?positionvar122', 0x60, 0xED), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar122_bis', 0x60, 0xB7), 0);
		
		}
		if(33 < 157) {
		setTimeout(() => this.bus.emit('vctrl?positionyx', 0, x, 0x63), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionyx_bis', x, 0x38, 0), 0);
		
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

DisplayBrowser.prototype.receivecreate_Ondisplay = function(var154) {
	this._receive({_port:"display", _msg:"create_", var154:var154});
}

DisplayBrowser.prototype.receivecreatexsizeysizevar116Ondisplay = function(xsize, var116, ysize, var155) {
	this._receive({_port:"display", _msg:"createxsizeysizevar116", xsize:xsize, var116:var116, ysize:ysize, var155:var155});
}

DisplayBrowser.prototype.receivedestroy_Ondisplay = function(var138) {
	this._receive({_port:"display", _msg:"destroy_", var138:var138});
}

DisplayBrowser.prototype.receivedestroyvar117Ondisplay = function(var117, var139) {
	this._receive({_port:"display", _msg:"destroyvar117", var117:var117, var139:var139});
}

DisplayBrowser.prototype.receiveupdate_Ondisplay = function(var134) {
	this._receive({_port:"display", _msg:"update_", var134:var134});
}

DisplayBrowser.prototype.receiveupdatevar118Ondisplay = function(var135, var118) {
	this._receive({_port:"display", _msg:"updatevar118", var135:var135, var118:var118});
}

DisplayBrowser.prototype.receiveclear_Ondisplay = function(var144) {
	this._receive({_port:"display", _msg:"clear_", var144:var144});
}

DisplayBrowser.prototype.receiveclearvar109Ondisplay = function(var145, var109) {
	this._receive({_port:"display", _msg:"clearvar109", var145:var145, var109:var109});
}

DisplayBrowser.prototype.receivesetColorgrOndisplay = function(g, var148, r) {
	this._receive({_port:"display", _msg:"setColorgr", g:g, var148:var148, r:r});
}

DisplayBrowser.prototype.receivesetColorbvar110Ondisplay = function(b, var149, var110) {
	this._receive({_port:"display", _msg:"setColorbvar110", b:b, var149:var149, var110:var110});
}

DisplayBrowser.prototype.receivesetBGColorrvar111bOndisplay = function(var111, r, var146, b) {
	this._receive({_port:"display", _msg:"setBGColorrvar111b", var111:var111, r:r, var146:var146, b:b});
}

DisplayBrowser.prototype.receivesetBGColorgOndisplay = function(var147, g) {
	this._receive({_port:"display", _msg:"setBGColorg", var147:var147, g:g});
}

DisplayBrowser.prototype.receivedrawRectyvar112heightOndisplay = function(y, height, var140, var112) {
	this._receive({_port:"display", _msg:"drawRectyvar112height", y:y, height:height, var140:var140, var112:var112});
}

DisplayBrowser.prototype.receivedrawRectwidthxOndisplay = function(width, x, var141) {
	this._receive({_port:"display", _msg:"drawRectwidthx", width:width, x:x, var141:var141});
}

DisplayBrowser.prototype.receivefillRect_Ondisplay = function(var152) {
	this._receive({_port:"display", _msg:"fillRect_", var152:var152});
}

DisplayBrowser.prototype.receivefillRectvar113heightwidthyxOndisplay = function(var153, height, x, y, var113, width) {
	this._receive({_port:"display", _msg:"fillRectvar113heightwidthyx", var153:var153, height:height, x:x, y:y, var113:var113, width:width});
}

DisplayBrowser.prototype.receivedrawIntegerdigitsvOndisplay = function(digits, v, var136) {
	this._receive({_port:"display", _msg:"drawIntegerdigitsv", digits:digits, v:v, var136:var136});
}

DisplayBrowser.prototype.receivedrawIntegervar114xscaleyOndisplay = function(scale, x, y, var114, var137) {
	this._receive({_port:"display", _msg:"drawIntegervar114xscaley", scale:scale, x:x, y:y, var114:var114, var137:var137});
}

DisplayBrowser.prototype.receivedrawThingMLvar115xOndisplay = function(var115, x, var150) {
	this._receive({_port:"display", _msg:"drawThingMLvar115x", var115:var115, x:x, var150:var150});
}

DisplayBrowser.prototype.receivedrawThingMLyOndisplay = function(var151, y) {
	this._receive({_port:"display", _msg:"drawThingMLy", var151:var151, y:y});
}

DisplayBrowser.prototype.receivecreate__bisOndisplay = function(var178) {
	this._receive({_port:"display", _msg:"create__bis", var178:var178});
}

DisplayBrowser.prototype.receivecreatexsizeysizevar116_bisOndisplay = function(ysize, var116, xsize, var179) {
	this._receive({_port:"display", _msg:"createxsizeysizevar116_bis", ysize:ysize, var116:var116, xsize:xsize, var179:var179});
}

DisplayBrowser.prototype.receivedestroy__bisOndisplay = function(var162) {
	this._receive({_port:"display", _msg:"destroy__bis", var162:var162});
}

DisplayBrowser.prototype.receivedestroyvar117_bisOndisplay = function(var117, var163) {
	this._receive({_port:"display", _msg:"destroyvar117_bis", var117:var117, var163:var163});
}

DisplayBrowser.prototype.receiveupdate__bisOndisplay = function(var158) {
	this._receive({_port:"display", _msg:"update__bis", var158:var158});
}

DisplayBrowser.prototype.receiveupdatevar118_bisOndisplay = function(var159, var118) {
	this._receive({_port:"display", _msg:"updatevar118_bis", var159:var159, var118:var118});
}

DisplayBrowser.prototype.receiveclear__bisOndisplay = function(var168) {
	this._receive({_port:"display", _msg:"clear__bis", var168:var168});
}

DisplayBrowser.prototype.receiveclearvar109_bisOndisplay = function(var169, var109) {
	this._receive({_port:"display", _msg:"clearvar109_bis", var169:var169, var109:var109});
}

DisplayBrowser.prototype.receivesetColorgr_bisOndisplay = function(g, var172, r) {
	this._receive({_port:"display", _msg:"setColorgr_bis", g:g, var172:var172, r:r});
}

DisplayBrowser.prototype.receivesetColorbvar110_bisOndisplay = function(b, var173, var110) {
	this._receive({_port:"display", _msg:"setColorbvar110_bis", b:b, var173:var173, var110:var110});
}

DisplayBrowser.prototype.receivesetBGColorrvar111b_bisOndisplay = function(var170, var111, b, r) {
	this._receive({_port:"display", _msg:"setBGColorrvar111b_bis", var170:var170, var111:var111, b:b, r:r});
}

DisplayBrowser.prototype.receivesetBGColorg_bisOndisplay = function(g, var171) {
	this._receive({_port:"display", _msg:"setBGColorg_bis", g:g, var171:var171});
}

DisplayBrowser.prototype.receivedrawRectyvar112height_bisOndisplay = function(y, height, var112, var164) {
	this._receive({_port:"display", _msg:"drawRectyvar112height_bis", y:y, height:height, var112:var112, var164:var164});
}

DisplayBrowser.prototype.receivedrawRectwidthx_bisOndisplay = function(var165, x, width) {
	this._receive({_port:"display", _msg:"drawRectwidthx_bis", var165:var165, x:x, width:width});
}

DisplayBrowser.prototype.receivefillRect__bisOndisplay = function(var176) {
	this._receive({_port:"display", _msg:"fillRect__bis", var176:var176});
}

DisplayBrowser.prototype.receivefillRectvar113heightwidthyx_bisOndisplay = function(x, var177, height, var113, y, width) {
	this._receive({_port:"display", _msg:"fillRectvar113heightwidthyx_bis", x:x, var177:var177, height:height, var113:var113, y:y, width:width});
}

DisplayBrowser.prototype.receivedrawIntegerdigitsv_bisOndisplay = function(digits, var160, v) {
	this._receive({_port:"display", _msg:"drawIntegerdigitsv_bis", digits:digits, var160:var160, v:v});
}

DisplayBrowser.prototype.receivedrawIntegervar114xscaley_bisOndisplay = function(var161, x, y, var114, scale) {
	this._receive({_port:"display", _msg:"drawIntegervar114xscaley_bis", var161:var161, x:x, y:y, var114:var114, scale:scale});
}

DisplayBrowser.prototype.receivedrawThingMLvar115x_bisOndisplay = function(var115, var174, x) {
	this._receive({_port:"display", _msg:"drawThingMLvar115x_bis", var115:var115, var174:var174, x:x});
}

DisplayBrowser.prototype.receivedrawThingMLy_bisOndisplay = function(y, var175) {
	this._receive({_port:"display", _msg:"drawThingMLy_bis", y:y, var175:var175});
}

DisplayBrowser.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowser.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_clear_var109_var = function(Display_SC_Running_display_clear_var109_var) {
	this.Display_SC_Running_display_clear_var109_var = Display_SC_Running_display_clear_var109_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_updatevar118_var = function(Display_SC_Running_received_display_updatevar118_var) {
	this.Display_SC_Running_received_display_updatevar118_var = Display_SC_Running_received_display_updatevar118_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLvar115x_var = function(Display_SC_Running_received_display_drawThingMLvar115x_var) {
	this.Display_SC_Running_received_display_drawThingMLvar115x_var = Display_SC_Running_received_display_drawThingMLvar115x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowser.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_r_var = function(Display_SC_Running_display_setColor_r_var) {
	this.Display_SC_Running_display_setColor_r_var = Display_SC_Running_display_setColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_var116_var = function(Display_SC_Wait_display_create_var116_var) {
	this.Display_SC_Wait_display_create_var116_var = Display_SC_Wait_display_create_var116_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_destroy_var117_var = function(Display_SC_Running_display_destroy_var117_var) {
	this.Display_SC_Running_display_destroy_var117_var = Display_SC_Running_display_destroy_var117_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_var112_var = function(Display_SC_Running_display_drawRect_var112_var) {
	this.Display_SC_Running_display_drawRect_var112_var = Display_SC_Running_display_drawRect_var112_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowser.prototype.initDisplayBrowser_XFRAMESIZE_var = function(DisplayBrowser_XFRAMESIZE_var) {
	this.DisplayBrowser_XFRAMESIZE_var = DisplayBrowser_XFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_update_var118_var = function(Display_SC_Running_display_update_var118_var) {
	this.Display_SC_Running_display_update_var118_var = Display_SC_Running_display_update_var118_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRect__var = function(Display_SC_Running_received_display_fillRect__var) {
	this.Display_SC_Running_received_display_fillRect__var = Display_SC_Running_received_display_fillRect__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_var111_var = function(Display_SC_Running_display_setBGColor_var111_var) {
	this.Display_SC_Running_display_setBGColor_var111_var = Display_SC_Running_display_setBGColor_var111_var;
}

DisplayBrowser.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorgr_var = function(Display_SC_Running_received_display_setColorgr_var) {
	this.Display_SC_Running_received_display_setColorgr_var = Display_SC_Running_received_display_setColorgr_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectyvar112height_var = function(Display_SC_Running_received_display_drawRectyvar112height_var) {
	this.Display_SC_Running_received_display_drawRectyvar112height_var = Display_SC_Running_received_display_drawRectyvar112height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_destroyvar117_var = function(Display_SC_Running_received_display_destroyvar117_var) {
	this.Display_SC_Running_received_display_destroyvar117_var = Display_SC_Running_received_display_destroyvar117_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegervar114xscaley_var = function(Display_SC_Running_received_display_drawIntegervar114xscaley_var) {
	this.Display_SC_Running_received_display_drawIntegervar114xscaley_var = Display_SC_Running_received_display_drawIntegervar114xscaley_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_var113_var = function(Display_SC_Running_display_fillRect_var113_var) {
	this.Display_SC_Running_display_fillRect_var113_var = Display_SC_Running_display_fillRect_var113_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawThingML_var115_var = function(Display_SC_Running_display_drawThingML_var115_var) {
	this.Display_SC_Running_display_drawThingML_var115_var = Display_SC_Running_display_drawThingML_var115_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawThingMLy_var = function(Display_SC_Running_received_display_drawThingMLy_var) {
	this.Display_SC_Running_received_display_drawThingMLy_var = Display_SC_Running_received_display_drawThingMLy_var;
}

DisplayBrowser.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_createxsizeysizevar116_var = function(Display_SC_Wait_received_display_createxsizeysizevar116_var) {
	this.Display_SC_Wait_received_display_createxsizeysizevar116_var = Display_SC_Wait_received_display_createxsizeysizevar116_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorg_var = function(Display_SC_Running_received_display_setBGColorg_var) {
	this.Display_SC_Running_received_display_setBGColorg_var = Display_SC_Running_received_display_setBGColorg_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowser.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowser.prototype.initDisplay_fg_r_var = function(Display_fg_r_var) {
	this.Display_fg_r_var = Display_fg_r_var;
}

DisplayBrowser.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_setColor_var110_var = function(Display_SC_Running_display_setColor_var110_var) {
	this.Display_SC_Running_display_setColor_var110_var = Display_SC_Running_display_setColor_var110_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawIntegerdigitsv_var = function(Display_SC_Running_received_display_drawIntegerdigitsv_var) {
	this.Display_SC_Running_received_display_drawIntegerdigitsv_var = Display_SC_Running_received_display_drawIntegerdigitsv_var;
}

DisplayBrowser.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowser.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_drawRectwidthx_var = function(Display_SC_Running_received_display_drawRectwidthx_var) {
	this.Display_SC_Running_received_display_drawRectwidthx_var = Display_SC_Running_received_display_drawRectwidthx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Wait_received_display_create__var = function(Display_SC_Wait_received_display_create__var) {
	this.Display_SC_Wait_received_display_create__var = Display_SC_Wait_received_display_create__var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setColorbvar110_var = function(Display_SC_Running_received_display_setColorbvar110_var) {
	this.Display_SC_Running_received_display_setColorbvar110_var = Display_SC_Running_received_display_setColorbvar110_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_clearvar109_var = function(Display_SC_Running_received_display_clearvar109_var) {
	this.Display_SC_Running_received_display_clearvar109_var = Display_SC_Running_received_display_clearvar109_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_setBGColorrvar111b_var = function(Display_SC_Running_received_display_setBGColorrvar111b_var) {
	this.Display_SC_Running_received_display_setBGColorrvar111b_var = Display_SC_Running_received_display_setBGColorrvar111b_var;
}

DisplayBrowser.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_var114_var = function(Display_SC_Running_display_drawInteger_var114_var) {
	this.Display_SC_Running_display_drawInteger_var114_var = Display_SC_Running_display_drawInteger_var114_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_received_display_fillRectvar113heightwidthyx_var = function(Display_SC_Running_received_display_fillRectvar113heightwidthyx_var) {
	this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var = Display_SC_Running_received_display_fillRectvar113heightwidthyx_var;
}

DisplayBrowser.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tdisplay_clear_var109 = ' + this.Display_SC_Running_display_clear_var109_var;
	result += '\n\treceived_display_updatevar118 = ' + this.Display_SC_Running_received_display_updatevar118_var;
	result += '\n\treceived_display_drawThingMLvar115x = ' + this.Display_SC_Running_received_display_drawThingMLvar115x_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_create_var116 = ' + this.Display_SC_Wait_display_create_var116_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tdisplay_destroy_var117 = ' + this.Display_SC_Running_display_destroy_var117_var;
	result += '\n\tdisplay_drawRect_var112 = ' + this.Display_SC_Running_display_drawRect_var112_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\tdisplay_update_var118 = ' + this.Display_SC_Running_display_update_var118_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\treceived_display_fillRect_ = ' + this.Display_SC_Running_received_display_fillRect__var;
	result += '\n\tdisplay_setBGColor_var111 = ' + this.Display_SC_Running_display_setBGColor_var111_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_setColorgr = ' + this.Display_SC_Running_received_display_setColorgr_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\treceived_display_drawRectyvar112height = ' + this.Display_SC_Running_received_display_drawRectyvar112height_var;
	result += '\n\treceived_display_destroyvar117 = ' + this.Display_SC_Running_received_display_destroyvar117_var;
	result += '\n\treceived_display_drawIntegervar114xscaley = ' + this.Display_SC_Running_received_display_drawIntegervar114xscaley_var;
	result += '\n\tdisplay_fillRect_var113 = ' + this.Display_SC_Running_display_fillRect_var113_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_drawThingML_var115 = ' + this.Display_SC_Running_display_drawThingML_var115_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\treceived_display_drawThingMLy = ' + this.Display_SC_Running_received_display_drawThingMLy_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\treceived_display_createxsizeysizevar116 = ' + this.Display_SC_Wait_received_display_createxsizeysizevar116_var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\treceived_display_setBGColorg = ' + this.Display_SC_Running_received_display_setBGColorg_var;
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\tdisplay_setColor_var110 = ' + this.Display_SC_Running_display_setColor_var110_var;
	result += '\n\treceived_display_drawIntegerdigitsv = ' + this.Display_SC_Running_received_display_drawIntegerdigitsv_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\treceived_display_drawRectwidthx = ' + this.Display_SC_Running_received_display_drawRectwidthx_var;
	result += '\n\treceived_display_create_ = ' + this.Display_SC_Wait_received_display_create__var;
	result += '\n\treceived_display_setColorbvar110 = ' + this.Display_SC_Running_received_display_setColorbvar110_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\treceived_display_clearvar109 = ' + this.Display_SC_Running_received_display_clearvar109_var;
	result += '\n\treceived_display_setBGColorrvar111b = ' + this.Display_SC_Running_received_display_setBGColorrvar111b_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_drawInteger_var114 = ' + this.Display_SC_Running_display_drawInteger_var114_var;
	result += '\n\treceived_display_fillRectvar113heightwidthyx = ' + this.Display_SC_Running_received_display_fillRectvar113heightwidthyx_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '';
	return result;
}

