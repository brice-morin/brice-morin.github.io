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
		if(170 < 172) {
		setTimeout(() => this.bus.emit('display?displayReady_', 0x06), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReady__bis', 0x7F), 0);
		
		}
		if(53 < 44) {
		setTimeout(() => this.bus.emit('display?displayReadyvar225', 0x66, 0x85), 0);
		
		} else {
		setTimeout(() => this.bus.emit('display?displayReadyvar225_bis', 0x66, 0xDA), 0);
		
		}
	});
	let Display_SC_Destroyed = new StateJS.State('Destroyed', this._statemachine).entry(() => {
		setTimeout(()=>this._stop(),0);
	});
	_initial_Display_SC.to(Display_SC_Wait);
	Display_SC_Running.to(null).when((setBGColorb_bis) => {
		return setBGColorb_bis._port === 'display' && setBGColorb_bis._msg === 'setBGColorb_bis';
	}).effect((setBGColorb_bis) => {
		this.Display_SC_Running_received_display_setBGColorb_var = true;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorb_bis.b;
		if(this.Display_SC_Running_received_display_setBGColorgvar217r_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		this.Display_SC_Running_received_display_setBGColorgvar217r_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (this.Display_SC_Wait_received_display_createysizexsizevar222_var);
	}).effect((create_) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createysizexsizevar222_var = false;
	});
	Display_SC_Wait.to(null).when((create_) => {
		return create_._port === 'display' && create_._msg === 'create_' && (!(this.Display_SC_Wait_received_display_createysizexsizevar222_var));
	}).effect((create_) => {
		this.Display_SC_Wait_received_display_create__var = true;
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
	Display_SC_Wait.to(Display_SC_Running).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (this.Display_SC_Wait_received_display_createysizexsizevar222_var);
	}).effect((create__bis) => {
		this.initDisplay(this.Display_SC_Wait_display_create_xsize_var, this.Display_SC_Wait_display_create_ysize_var);
		this.Display_SC_Wait_received_display_create__var = false;
		this.Display_SC_Wait_received_display_createysizexsizevar222_var = false;
	});
	Display_SC_Wait.to(null).when((create__bis) => {
		return create__bis._port === 'display' && create__bis._msg === 'create__bis' && (!(this.Display_SC_Wait_received_display_createysizexsizevar222_var));
	}).effect((create__bis) => {
		this.Display_SC_Wait_received_display_create__var = true;
	});
	Display_SC_Running.to(null).when((setBGColorb) => {
		return setBGColorb._port === 'display' && setBGColorb._msg === 'setBGColorb';
	}).effect((setBGColorb) => {
		this.Display_SC_Running_received_display_setBGColorb_var = true;
		this.Display_SC_Running_display_setBGColor_b_var = setBGColorb.b;
		if(this.Display_SC_Running_received_display_setBGColorgvar217r_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		this.Display_SC_Running_received_display_setBGColorgvar217r_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRectwidthxvar218yheight) => {
		return drawRectwidthxvar218yheight._port === 'display' && drawRectwidthxvar218yheight._msg === 'drawRectwidthxvar218yheight';
	}).effect((drawRectwidthxvar218yheight) => {
		this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthxvar218yheight.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthxvar218yheight.x;
		this.Display_SC_Running_display_drawRect_var218_var = drawRectwidthxvar218yheight.var218;
		this.Display_SC_Running_display_drawRect_y_var = drawRectwidthxvar218yheight.y;
		this.Display_SC_Running_display_drawRect_height_var = drawRectwidthxvar218yheight.height;
		if(this.Display_SC_Running_received_display_drawRect__var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var = false;
		this.Display_SC_Running_received_display_drawRect__var = false;
		
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
	Display_SC_Running.to(null).when((setColor__bis) => {
		return setColor__bis._port === 'display' && setColor__bis._msg === 'setColor__bis';
	}).effect((setColor__bis) => {
		this.Display_SC_Running_received_display_setColor__var = true;
		if(this.Display_SC_Running_received_display_setColorvar216rbg_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColor__var = false;
		this.Display_SC_Running_received_display_setColorvar216rbg_var = false;
		
		}
	});
	Display_SC_Wait.to(Display_SC_Running).when((createysizexsizevar222_bis) => {
		return createysizexsizevar222_bis._port === 'display' && createysizexsizevar222_bis._msg === 'createysizexsizevar222_bis' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createysizexsizevar222_bis) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizexsizevar222_bis.ysize;
		this.Display_SC_Wait_display_create_xsize_var = createysizexsizevar222_bis.xsize;
		this.Display_SC_Wait_display_create_var222_var = createysizexsizevar222_bis.var222;
		this.initDisplay(createysizexsizevar222_bis.xsize, createysizexsizevar222_bis.ysize);
		this.Display_SC_Wait_received_display_createysizexsizevar222_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createysizexsizevar222_bis) => {
		return createysizexsizevar222_bis._port === 'display' && createysizexsizevar222_bis._msg === 'createysizexsizevar222_bis' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createysizexsizevar222_bis) => {
		this.Display_SC_Wait_received_display_createysizexsizevar222_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizexsizevar222_bis.ysize;
		this.Display_SC_Wait_display_create_xsize_var = createysizexsizevar222_bis.xsize;
		this.Display_SC_Wait_display_create_var222_var = createysizexsizevar222_bis.var222;
	});
	Display_SC_Running.to(null).when((fillRectvar219yxheightwidth) => {
		return fillRectvar219yxheightwidth._port === 'display' && fillRectvar219yxheightwidth._msg === 'fillRectvar219yxheightwidth';
	}).effect((fillRectvar219yxheightwidth) => {
		this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var = true;
		this.Display_SC_Running_display_fillRect_var219_var = fillRectvar219yxheightwidth.var219;
		this.Display_SC_Running_display_fillRect_y_var = fillRectvar219yxheightwidth.y;
		this.Display_SC_Running_display_fillRect_x_var = fillRectvar219yxheightwidth.x;
		this.Display_SC_Running_display_fillRect_height_var = fillRectvar219yxheightwidth.height;
		this.Display_SC_Running_display_fillRect_width_var = fillRectvar219yxheightwidth.width;
		if(this.Display_SC_Running_received_display_fillRect__var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var = false;
		this.Display_SC_Running_received_display_fillRect__var = false;
		
		}
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
	Display_SC_Running.to(null).when((fillRect_) => {
		return fillRect_._port === 'display' && fillRect_._msg === 'fillRect_';
	}).effect((fillRect_) => {
		this.Display_SC_Running_received_display_fillRect__var = true;
		if(this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRect__var = false;
		this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar216rbg) => {
		return setColorvar216rbg._port === 'display' && setColorvar216rbg._msg === 'setColorvar216rbg';
	}).effect((setColorvar216rbg) => {
		this.Display_SC_Running_received_display_setColorvar216rbg_var = true;
		this.Display_SC_Running_display_setColor_var216_var = setColorvar216rbg.var216;
		this.Display_SC_Running_display_setColor_r_var = setColorvar216rbg.r;
		this.Display_SC_Running_display_setColor_b_var = setColorvar216rbg.b;
		this.Display_SC_Running_display_setColor_g_var = setColorvar216rbg.g;
		if(this.Display_SC_Running_received_display_setColor__var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar216rbg_var = false;
		this.Display_SC_Running_received_display_setColor__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLy) => {
		return drawThingMLy._port === 'display' && drawThingMLy._msg === 'drawThingMLy';
	}).effect((drawThingMLy) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar221x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar221x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorgvar217r) => {
		return setBGColorgvar217r._port === 'display' && setBGColorgvar217r._msg === 'setBGColorgvar217r';
	}).effect((setBGColorgvar217r) => {
		this.Display_SC_Running_received_display_setBGColorgvar217r_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorgvar217r.g;
		this.Display_SC_Running_display_setBGColor_var217_var = setBGColorgvar217r.var217;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorgvar217r.r;
		if(this.Display_SC_Running_received_display_setBGColorb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorgvar217r_var = false;
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		
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
	Display_SC_Running.to(null).when((drawThingMLy_bis) => {
		return drawThingMLy_bis._port === 'display' && drawThingMLy_bis._msg === 'drawThingMLy_bis';
	}).effect((drawThingMLy_bis) => {
		this.Display_SC_Running_received_display_drawThingMLy_var = true;
		this.Display_SC_Running_display_drawThingML_y_var = drawThingMLy_bis.y;
		if(this.Display_SC_Running_received_display_drawThingMLvar221x_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		this.Display_SC_Running_received_display_drawThingMLvar221x_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColorvar216rbg_bis) => {
		return setColorvar216rbg_bis._port === 'display' && setColorvar216rbg_bis._msg === 'setColorvar216rbg_bis';
	}).effect((setColorvar216rbg_bis) => {
		this.Display_SC_Running_received_display_setColorvar216rbg_var = true;
		this.Display_SC_Running_display_setColor_var216_var = setColorvar216rbg_bis.var216;
		this.Display_SC_Running_display_setColor_r_var = setColorvar216rbg_bis.r;
		this.Display_SC_Running_display_setColor_b_var = setColorvar216rbg_bis.b;
		this.Display_SC_Running_display_setColor_g_var = setColorvar216rbg_bis.g;
		if(this.Display_SC_Running_received_display_setColor__var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColorvar216rbg_var = false;
		this.Display_SC_Running_received_display_setColor__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervar220vscalexdigitsy) => {
		return drawIntegervar220vscalexdigitsy._port === 'display' && drawIntegervar220vscalexdigitsy._msg === 'drawIntegervar220vscalexdigitsy';
	}).effect((drawIntegervar220vscalexdigitsy) => {
		this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var = true;
		this.Display_SC_Running_display_drawInteger_var220_var = drawIntegervar220vscalexdigitsy.var220;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervar220vscalexdigitsy.v;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervar220vscalexdigitsy.scale;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegervar220vscalexdigitsy.x;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegervar220vscalexdigitsy.digits;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervar220vscalexdigitsy.y;
		if(this.Display_SC_Running_received_display_drawInteger__var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var = false;
		this.Display_SC_Running_received_display_drawInteger__var = false;
		
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
	Display_SC_Running.to(null).when((drawThingMLvar221x) => {
		return drawThingMLvar221x._port === 'display' && drawThingMLvar221x._msg === 'drawThingMLvar221x';
	}).effect((drawThingMLvar221x) => {
		this.Display_SC_Running_received_display_drawThingMLvar221x_var = true;
		this.Display_SC_Running_display_drawThingML_var221_var = drawThingMLvar221x.var221;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLvar221x.x;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar221x_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRect__bis) => {
		return fillRect__bis._port === 'display' && fillRect__bis._msg === 'fillRect__bis';
	}).effect((fillRect__bis) => {
		this.Display_SC_Running_received_display_fillRect__var = true;
		if(this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRect__var = false;
		this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((fillRectvar219yxheightwidth_bis) => {
		return fillRectvar219yxheightwidth_bis._port === 'display' && fillRectvar219yxheightwidth_bis._msg === 'fillRectvar219yxheightwidth_bis';
	}).effect((fillRectvar219yxheightwidth_bis) => {
		this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var = true;
		this.Display_SC_Running_display_fillRect_var219_var = fillRectvar219yxheightwidth_bis.var219;
		this.Display_SC_Running_display_fillRect_y_var = fillRectvar219yxheightwidth_bis.y;
		this.Display_SC_Running_display_fillRect_x_var = fillRectvar219yxheightwidth_bis.x;
		this.Display_SC_Running_display_fillRect_height_var = fillRectvar219yxheightwidth_bis.height;
		this.Display_SC_Running_display_fillRect_width_var = fillRectvar219yxheightwidth_bis.width;
		if(this.Display_SC_Running_received_display_fillRect__var) {
		this.fillRect(this.Display_SC_Running_display_fillRect_x_var, this.Display_SC_Running_display_fillRect_y_var, this.Display_SC_Running_display_fillRect_width_var, this.Display_SC_Running_display_fillRect_height_var);
		this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var = false;
		this.Display_SC_Running_received_display_fillRect__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawThingMLvar221x_bis) => {
		return drawThingMLvar221x_bis._port === 'display' && drawThingMLvar221x_bis._msg === 'drawThingMLvar221x_bis';
	}).effect((drawThingMLvar221x_bis) => {
		this.Display_SC_Running_received_display_drawThingMLvar221x_var = true;
		this.Display_SC_Running_display_drawThingML_var221_var = drawThingMLvar221x_bis.var221;
		this.Display_SC_Running_display_drawThingML_x_var = drawThingMLvar221x_bis.x;
		if(this.Display_SC_Running_received_display_drawThingMLy_var) {
		this.drawThingML(this.Display_SC_Running_display_drawThingML_x_var, this.Display_SC_Running_display_drawThingML_y_var);
		this.Display_SC_Running_received_display_drawThingMLvar221x_var = false;
		this.Display_SC_Running_received_display_drawThingMLy_var = false;
		
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
	Display_SC_Wait.to(Display_SC_Running).when((createysizexsizevar222) => {
		return createysizexsizevar222._port === 'display' && createysizexsizevar222._msg === 'createysizexsizevar222' && (this.Display_SC_Wait_received_display_create__var);
	}).effect((createysizexsizevar222) => {
		this.Display_SC_Wait_display_create_ysize_var = createysizexsizevar222.ysize;
		this.Display_SC_Wait_display_create_xsize_var = createysizexsizevar222.xsize;
		this.Display_SC_Wait_display_create_var222_var = createysizexsizevar222.var222;
		this.initDisplay(createysizexsizevar222.xsize, createysizexsizevar222.ysize);
		this.Display_SC_Wait_received_display_createysizexsizevar222_var = false;
		this.Display_SC_Wait_received_display_create__var = false;
	});
	Display_SC_Wait.to(null).when((createysizexsizevar222) => {
		return createysizexsizevar222._port === 'display' && createysizexsizevar222._msg === 'createysizexsizevar222' && (!(this.Display_SC_Wait_received_display_create__var));
	}).effect((createysizexsizevar222) => {
		this.Display_SC_Wait_received_display_createysizexsizevar222_var = true;
		this.Display_SC_Wait_display_create_ysize_var = createysizexsizevar222.ysize;
		this.Display_SC_Wait_display_create_xsize_var = createysizexsizevar222.xsize;
		this.Display_SC_Wait_display_create_var222_var = createysizexsizevar222.var222;
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
	Display_SC_Running.to(null).when((drawRectwidthxvar218yheight_bis) => {
		return drawRectwidthxvar218yheight_bis._port === 'display' && drawRectwidthxvar218yheight_bis._msg === 'drawRectwidthxvar218yheight_bis';
	}).effect((drawRectwidthxvar218yheight_bis) => {
		this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var = true;
		this.Display_SC_Running_display_drawRect_width_var = drawRectwidthxvar218yheight_bis.width;
		this.Display_SC_Running_display_drawRect_x_var = drawRectwidthxvar218yheight_bis.x;
		this.Display_SC_Running_display_drawRect_var218_var = drawRectwidthxvar218yheight_bis.var218;
		this.Display_SC_Running_display_drawRect_y_var = drawRectwidthxvar218yheight_bis.y;
		this.Display_SC_Running_display_drawRect_height_var = drawRectwidthxvar218yheight_bis.height;
		if(this.Display_SC_Running_received_display_drawRect__var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var = false;
		this.Display_SC_Running_received_display_drawRect__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setColor_) => {
		return setColor_._port === 'display' && setColor_._msg === 'setColor_';
	}).effect((setColor_) => {
		this.Display_SC_Running_received_display_setColor__var = true;
		if(this.Display_SC_Running_received_display_setColorvar216rbg_var) {
		this.Display_fg_r_var = this.Display_SC_Running_display_setColor_r_var;
		this.bus.emit('fg_r=', this.Display_fg_r_var);
		this.Display_fg_g_var = this.Display_SC_Running_display_setColor_g_var;
		this.bus.emit('fg_g=', this.Display_fg_g_var);
		this.Display_fg_b_var = this.Display_SC_Running_display_setColor_b_var;
		this.bus.emit('fg_b=', this.Display_fg_b_var);
		this.setColor(this.Display_SC_Running_display_setColor_r_var, this.Display_SC_Running_display_setColor_g_var, this.Display_SC_Running_display_setColor_b_var);
		this.Display_SC_Running_received_display_setColor__var = false;
		this.Display_SC_Running_received_display_setColorvar216rbg_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRect_) => {
		return drawRect_._port === 'display' && drawRect_._msg === 'drawRect_';
	}).effect((drawRect_) => {
		this.Display_SC_Running_received_display_drawRect__var = true;
		if(this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRect__var = false;
		this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawInteger_) => {
		return drawInteger_._port === 'display' && drawInteger_._msg === 'drawInteger_';
	}).effect((drawInteger_) => {
		this.Display_SC_Running_received_display_drawInteger__var = true;
		if(this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawInteger__var = false;
		this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((setBGColorgvar217r_bis) => {
		return setBGColorgvar217r_bis._port === 'display' && setBGColorgvar217r_bis._msg === 'setBGColorgvar217r_bis';
	}).effect((setBGColorgvar217r_bis) => {
		this.Display_SC_Running_received_display_setBGColorgvar217r_var = true;
		this.Display_SC_Running_display_setBGColor_g_var = setBGColorgvar217r_bis.g;
		this.Display_SC_Running_display_setBGColor_var217_var = setBGColorgvar217r_bis.var217;
		this.Display_SC_Running_display_setBGColor_r_var = setBGColorgvar217r_bis.r;
		if(this.Display_SC_Running_received_display_setBGColorb_var) {
		this.Display_bg_r_var = this.Display_SC_Running_display_setBGColor_r_var;
		this.bus.emit('bg_r=', this.Display_bg_r_var);
		this.Display_bg_g_var = this.Display_SC_Running_display_setBGColor_g_var;
		this.bus.emit('bg_g=', this.Display_bg_g_var);
		this.Display_bg_b_var = this.Display_SC_Running_display_setBGColor_b_var;
		this.bus.emit('bg_b=', this.Display_bg_b_var);
		this.Display_SC_Running_received_display_setBGColorgvar217r_var = false;
		this.Display_SC_Running_received_display_setBGColorb_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawRect__bis) => {
		return drawRect__bis._port === 'display' && drawRect__bis._msg === 'drawRect__bis';
	}).effect((drawRect__bis) => {
		this.Display_SC_Running_received_display_drawRect__var = true;
		if(this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var) {
		this.drawRect(this.Display_SC_Running_display_drawRect_x_var, this.Display_SC_Running_display_drawRect_y_var, this.Display_SC_Running_display_drawRect_width_var, this.Display_SC_Running_display_drawRect_height_var);
		this.Display_SC_Running_received_display_drawRect__var = false;
		this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawIntegervar220vscalexdigitsy_bis) => {
		return drawIntegervar220vscalexdigitsy_bis._port === 'display' && drawIntegervar220vscalexdigitsy_bis._msg === 'drawIntegervar220vscalexdigitsy_bis';
	}).effect((drawIntegervar220vscalexdigitsy_bis) => {
		this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var = true;
		this.Display_SC_Running_display_drawInteger_var220_var = drawIntegervar220vscalexdigitsy_bis.var220;
		this.Display_SC_Running_display_drawInteger_v_var = drawIntegervar220vscalexdigitsy_bis.v;
		this.Display_SC_Running_display_drawInteger_scale_var = drawIntegervar220vscalexdigitsy_bis.scale;
		this.Display_SC_Running_display_drawInteger_x_var = drawIntegervar220vscalexdigitsy_bis.x;
		this.Display_SC_Running_display_drawInteger_digits_var = drawIntegervar220vscalexdigitsy_bis.digits;
		this.Display_SC_Running_display_drawInteger_y_var = drawIntegervar220vscalexdigitsy_bis.y;
		if(this.Display_SC_Running_received_display_drawInteger__var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var = false;
		this.Display_SC_Running_received_display_drawInteger__var = false;
		
		}
	});
	Display_SC_Running.to(null).when((drawInteger__bis) => {
		return drawInteger__bis._port === 'display' && drawInteger__bis._msg === 'drawInteger__bis';
	}).effect((drawInteger__bis) => {
		this.Display_SC_Running_received_display_drawInteger__var = true;
		if(this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var) {
		this.drawInteger(this.Display_SC_Running_display_drawInteger_x_var, this.Display_SC_Running_display_drawInteger_y_var, this.Display_SC_Running_display_drawInteger_v_var, this.Display_SC_Running_display_drawInteger_digits_var, this.Display_SC_Running_display_drawInteger_scale_var);
		this.Display_SC_Running_received_display_drawInteger__var = false;
		this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var = false;
		
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
		
		
		if(162 < 89) {
		setTimeout(() => this.bus.emit('vctrl?positionx', posX, 0xD9), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionx_bis', posX, 0xC8), 0);
		
		}
		if(236 < 226) {
		setTimeout(() => this.bus.emit('vctrl?positionvar228y', 0xEC, 0x42, 0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar228y_bis', 0xEC, 0, 0x14), 0);
		
		}
		
			});
		
		this.clearScreen();
		
			document.addEventListener("keydown", (e) => {
				if (e.key == "ArrowLeft") {
			
			if(189 < 77) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x56), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0x72), 0);
			
			}
			if(245 < 86) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dxdy',  -8, 0x89, 0xA1, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dxdy_bis', 0x9F, 0, 0xA1,  -8), 0);
			
			}
			
				} else if (e.key == "ArrowRight") {
			
			if(126 < 166) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x56), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0xA9), 0);
			
			}
			if(254 < 194) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dxdy', 8, 0x72, 0x4A, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dxdy_bis', 0xB0, 0, 0x4A, 8), 0);
			
			}
			
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
			
			if(163 < 221) {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dxdy', 0, 0x44, 0x4F, 0), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocityvar227dxdy_bis', 0x18, 0, 0x4F, 0), 0);
			
			}
			if(3 < 109) {
			setTimeout(() => this.bus.emit('vctrl?velocity_', 0x58), 0);
			
			} else {
			setTimeout(() => this.bus.emit('vctrl?velocity__bis', 0x2C), 0);
			
			}
			
				}
			});
		
		
			window.setPadPosition = (x) => { //[-100, 100]
		
		if(224 < 69) {
		setTimeout(() => this.bus.emit('vctrl?positionx', x, 0x66), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionx_bis', x, 0xE9), 0);
		
		}
		if(9 < 16) {
		setTimeout(() => this.bus.emit('vctrl?positionvar228y', 0x79, 0x09, 0), 0);
		
		} else {
		setTimeout(() => this.bus.emit('vctrl?positionvar228y_bis', 0x79, 0, 0xAB), 0);
		
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

DisplayBrowserRND.prototype.receivecreate_Ondisplay = function(var258) {
	this._receive({_port:"display", _msg:"create_", var258:var258});
}

DisplayBrowserRND.prototype.receivecreateysizexsizevar222Ondisplay = function(ysize, var259, xsize, var222) {
	this._receive({_port:"display", _msg:"createysizexsizevar222", ysize:ysize, var259:var259, xsize:xsize, var222:var222});
}

DisplayBrowserRND.prototype.receivedestroy_Ondisplay = function(var256) {
	this._receive({_port:"display", _msg:"destroy_", var256:var256});
}

DisplayBrowserRND.prototype.receivedestroyvar223Ondisplay = function(var257, var223) {
	this._receive({_port:"display", _msg:"destroyvar223", var257:var257, var223:var223});
}

DisplayBrowserRND.prototype.receiveupdate_Ondisplay = function(var248) {
	this._receive({_port:"display", _msg:"update_", var248:var248});
}

DisplayBrowserRND.prototype.receiveupdatevar224Ondisplay = function(var249, var224) {
	this._receive({_port:"display", _msg:"updatevar224", var249:var249, var224:var224});
}

DisplayBrowserRND.prototype.receiveclear_Ondisplay = function(var242) {
	this._receive({_port:"display", _msg:"clear_", var242:var242});
}

DisplayBrowserRND.prototype.receiveclearvar215Ondisplay = function(var215, var243) {
	this._receive({_port:"display", _msg:"clearvar215", var215:var215, var243:var243});
}

DisplayBrowserRND.prototype.receivesetColor_Ondisplay = function(var240) {
	this._receive({_port:"display", _msg:"setColor_", var240:var240});
}

DisplayBrowserRND.prototype.receivesetColorvar216rbgOndisplay = function(b, var216, g, r, var241) {
	this._receive({_port:"display", _msg:"setColorvar216rbg", b:b, var216:var216, g:g, r:r, var241:var241});
}

DisplayBrowserRND.prototype.receivesetBGColorbOndisplay = function(b, var260) {
	this._receive({_port:"display", _msg:"setBGColorb", b:b, var260:var260});
}

DisplayBrowserRND.prototype.receivesetBGColorgvar217rOndisplay = function(g, var217, var261, r) {
	this._receive({_port:"display", _msg:"setBGColorgvar217r", g:g, var217:var217, var261:var261, r:r});
}

DisplayBrowserRND.prototype.receivedrawRect_Ondisplay = function(var238) {
	this._receive({_port:"display", _msg:"drawRect_", var238:var238});
}

DisplayBrowserRND.prototype.receivedrawRectwidthxvar218yheightOndisplay = function(width, y, height, x, var239, var218) {
	this._receive({_port:"display", _msg:"drawRectwidthxvar218yheight", width:width, y:y, height:height, x:x, var239:var239, var218:var218});
}

DisplayBrowserRND.prototype.receivefillRect_Ondisplay = function(var252) {
	this._receive({_port:"display", _msg:"fillRect_", var252:var252});
}

DisplayBrowserRND.prototype.receivefillRectvar219yxheightwidthOndisplay = function(height, x, y, var219, width, var253) {
	this._receive({_port:"display", _msg:"fillRectvar219yxheightwidth", height:height, x:x, y:y, var219:var219, width:width, var253:var253});
}

DisplayBrowserRND.prototype.receivedrawInteger_Ondisplay = function(var250) {
	this._receive({_port:"display", _msg:"drawInteger_", var250:var250});
}

DisplayBrowserRND.prototype.receivedrawIntegervar220vscalexdigitsyOndisplay = function(digits, v, scale, y, x, var251, var220) {
	this._receive({_port:"display", _msg:"drawIntegervar220vscalexdigitsy", digits:digits, v:v, scale:scale, y:y, x:x, var251:var251, var220:var220});
}

DisplayBrowserRND.prototype.receivedrawThingMLyOndisplay = function(y, var244) {
	this._receive({_port:"display", _msg:"drawThingMLy", y:y, var244:var244});
}

DisplayBrowserRND.prototype.receivedrawThingMLvar221xOndisplay = function(var245, x, var221) {
	this._receive({_port:"display", _msg:"drawThingMLvar221x", var245:var245, x:x, var221:var221});
}

DisplayBrowserRND.prototype.receivecreate__bisOndisplay = function(var282) {
	this._receive({_port:"display", _msg:"create__bis", var282:var282});
}

DisplayBrowserRND.prototype.receivecreateysizexsizevar222_bisOndisplay = function(ysize, var222, var283, xsize) {
	this._receive({_port:"display", _msg:"createysizexsizevar222_bis", ysize:ysize, var222:var222, var283:var283, xsize:xsize});
}

DisplayBrowserRND.prototype.receivedestroy__bisOndisplay = function(var280) {
	this._receive({_port:"display", _msg:"destroy__bis", var280:var280});
}

DisplayBrowserRND.prototype.receivedestroyvar223_bisOndisplay = function(var223, var281) {
	this._receive({_port:"display", _msg:"destroyvar223_bis", var223:var223, var281:var281});
}

DisplayBrowserRND.prototype.receiveupdate__bisOndisplay = function(var272) {
	this._receive({_port:"display", _msg:"update__bis", var272:var272});
}

DisplayBrowserRND.prototype.receiveupdatevar224_bisOndisplay = function(var224, var273) {
	this._receive({_port:"display", _msg:"updatevar224_bis", var224:var224, var273:var273});
}

DisplayBrowserRND.prototype.receiveclear__bisOndisplay = function(var266) {
	this._receive({_port:"display", _msg:"clear__bis", var266:var266});
}

DisplayBrowserRND.prototype.receiveclearvar215_bisOndisplay = function(var215, var267) {
	this._receive({_port:"display", _msg:"clearvar215_bis", var215:var215, var267:var267});
}

DisplayBrowserRND.prototype.receivesetColor__bisOndisplay = function(var264) {
	this._receive({_port:"display", _msg:"setColor__bis", var264:var264});
}

DisplayBrowserRND.prototype.receivesetColorvar216rbg_bisOndisplay = function(var216, r, g, b, var265) {
	this._receive({_port:"display", _msg:"setColorvar216rbg_bis", var216:var216, r:r, g:g, b:b, var265:var265});
}

DisplayBrowserRND.prototype.receivesetBGColorb_bisOndisplay = function(var284, b) {
	this._receive({_port:"display", _msg:"setBGColorb_bis", var284:var284, b:b});
}

DisplayBrowserRND.prototype.receivesetBGColorgvar217r_bisOndisplay = function(var217, var285, g, r) {
	this._receive({_port:"display", _msg:"setBGColorgvar217r_bis", var217:var217, var285:var285, g:g, r:r});
}

DisplayBrowserRND.prototype.receivedrawRect__bisOndisplay = function(var262) {
	this._receive({_port:"display", _msg:"drawRect__bis", var262:var262});
}

DisplayBrowserRND.prototype.receivedrawRectwidthxvar218yheight_bisOndisplay = function(width, x, height, var263, y, var218) {
	this._receive({_port:"display", _msg:"drawRectwidthxvar218yheight_bis", width:width, x:x, height:height, var263:var263, y:y, var218:var218});
}

DisplayBrowserRND.prototype.receivefillRect__bisOndisplay = function(var276) {
	this._receive({_port:"display", _msg:"fillRect__bis", var276:var276});
}

DisplayBrowserRND.prototype.receivefillRectvar219yxheightwidth_bisOndisplay = function(var219, width, x, y, height, var277) {
	this._receive({_port:"display", _msg:"fillRectvar219yxheightwidth_bis", var219:var219, width:width, x:x, y:y, height:height, var277:var277});
}

DisplayBrowserRND.prototype.receivedrawInteger__bisOndisplay = function(var274) {
	this._receive({_port:"display", _msg:"drawInteger__bis", var274:var274});
}

DisplayBrowserRND.prototype.receivedrawIntegervar220vscalexdigitsy_bisOndisplay = function(v, x, digits, scale, y, var220, var275) {
	this._receive({_port:"display", _msg:"drawIntegervar220vscalexdigitsy_bis", v:v, x:x, digits:digits, scale:scale, y:y, var220:var220, var275:var275});
}

DisplayBrowserRND.prototype.receivedrawThingMLy_bisOndisplay = function(y, var268) {
	this._receive({_port:"display", _msg:"drawThingMLy_bis", y:y, var268:var268});
}

DisplayBrowserRND.prototype.receivedrawThingMLvar221x_bisOndisplay = function(var269, x, var221) {
	this._receive({_port:"display", _msg:"drawThingMLvar221x_bis", var269:var269, x:x, var221:var221});
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_y_var = function(Display_SC_Running_display_fillRect_y_var) {
	this.Display_SC_Running_display_fillRect_y_var = Display_SC_Running_display_fillRect_y_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_YFRAMESIZE_var = function(DisplayBrowser_YFRAMESIZE_var) {
	this.DisplayBrowser_YFRAMESIZE_var = DisplayBrowser_YFRAMESIZE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_var221_var = function(Display_SC_Running_display_drawThingML_var221_var) {
	this.Display_SC_Running_display_drawThingML_var221_var = Display_SC_Running_display_drawThingML_var221_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_xsize_var = function(Display_SC_Wait_display_create_xsize_var) {
	this.Display_SC_Wait_display_create_xsize_var = Display_SC_Wait_display_create_xsize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_v_var = function(Display_SC_Running_display_drawInteger_v_var) {
	this.Display_SC_Running_display_drawInteger_v_var = Display_SC_Running_display_drawInteger_v_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_g_var = function(Display_SC_Running_display_setColor_g_var) {
	this.Display_SC_Running_display_setColor_g_var = Display_SC_Running_display_setColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorgvar217r_var = function(Display_SC_Running_received_display_setBGColorgvar217r_var) {
	this.Display_SC_Running_received_display_setBGColorgvar217r_var = Display_SC_Running_received_display_setBGColorgvar217r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setBGColorb_var = function(Display_SC_Running_received_display_setBGColorb_var) {
	this.Display_SC_Running_received_display_setBGColorb_var = Display_SC_Running_received_display_setBGColorb_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clearvar215_var = function(Display_SC_Running_received_display_clearvar215_var) {
	this.Display_SC_Running_received_display_clearvar215_var = Display_SC_Running_received_display_clearvar215_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_clear__var = function(Display_SC_Running_received_display_clear__var) {
	this.Display_SC_Running_received_display_clear__var = Display_SC_Running_received_display_clear__var;
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

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_x_var = function(Display_SC_Running_display_drawRect_x_var) {
	this.Display_SC_Running_display_drawRect_x_var = Display_SC_Running_display_drawRect_x_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Display_var = function(DisplayBrowser_Display_var) {
	this.DisplayBrowser_Display_var = DisplayBrowser_Display_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_Buffer_var = function(DisplayBrowser_Buffer_var) {
	this.DisplayBrowser_Buffer_var = DisplayBrowser_Buffer_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColor__var = function(Display_SC_Running_received_display_setColor__var) {
	this.Display_SC_Running_received_display_setColor__var = Display_SC_Running_received_display_setColor__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_r_var = function(Display_SC_Running_display_setBGColor_r_var) {
	this.Display_SC_Running_display_setBGColor_r_var = Display_SC_Running_display_setBGColor_r_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_b_var = function(Display_bg_b_var) {
	this.Display_bg_b_var = Display_bg_b_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_SCALE_var = function(DisplayBrowser_SCALE_var) {
	this.DisplayBrowser_SCALE_var = DisplayBrowser_SCALE_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_var222_var = function(Display_SC_Wait_display_create_var222_var) {
	this.Display_SC_Wait_display_create_var222_var = Display_SC_Wait_display_create_var222_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRectwidthxvar218yheight_var = function(Display_SC_Running_received_display_drawRectwidthxvar218yheight_var) {
	this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var = Display_SC_Running_received_display_drawRectwidthxvar218yheight_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_height_var = function(Display_SC_Running_display_fillRect_height_var) {
	this.Display_SC_Running_display_fillRect_height_var = Display_SC_Running_display_fillRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_createysizexsizevar222_var = function(Display_SC_Wait_received_display_createysizexsizevar222_var) {
	this.Display_SC_Wait_received_display_createysizexsizevar222_var = Display_SC_Wait_received_display_createysizexsizevar222_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_scale_var = function(Display_SC_Running_display_drawInteger_scale_var) {
	this.Display_SC_Running_display_drawInteger_scale_var = Display_SC_Running_display_drawInteger_scale_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_width_var = function(Display_SC_Running_display_drawRect_width_var) {
	this.Display_SC_Running_display_drawRect_width_var = Display_SC_Running_display_drawRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_display_create_ysize_var = function(Display_SC_Wait_display_create_ysize_var) {
	this.Display_SC_Wait_display_create_ysize_var = Display_SC_Wait_display_create_ysize_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_g_var = function(Display_SC_Running_display_setBGColor_g_var) {
	this.Display_SC_Running_display_setBGColor_g_var = Display_SC_Running_display_setBGColor_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_updatevar224_var = function(Display_SC_Running_received_display_updatevar224_var) {
	this.Display_SC_Running_received_display_updatevar224_var = Display_SC_Running_received_display_updatevar224_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLy_var = function(Display_SC_Running_received_display_drawThingMLy_var) {
	this.Display_SC_Running_received_display_drawThingMLy_var = Display_SC_Running_received_display_drawThingMLy_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_height_var = function(Display_SC_Running_display_drawRect_height_var) {
	this.Display_SC_Running_display_drawRect_height_var = Display_SC_Running_display_drawRect_height_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawRect__var = function(Display_SC_Running_received_display_drawRect__var) {
	this.Display_SC_Running_received_display_drawRect__var = Display_SC_Running_received_display_drawRect__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_var217_var = function(Display_SC_Running_display_setBGColor_var217_var) {
	this.Display_SC_Running_display_setBGColor_var217_var = Display_SC_Running_display_setBGColor_var217_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_y_var = function(Display_SC_Running_display_drawThingML_y_var) {
	this.Display_SC_Running_display_drawThingML_y_var = Display_SC_Running_display_drawThingML_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_clear_var215_var = function(Display_SC_Running_display_clear_var215_var) {
	this.Display_SC_Running_display_clear_var215_var = Display_SC_Running_display_clear_var215_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawThingML_x_var = function(Display_SC_Running_display_drawThingML_x_var) {
	this.Display_SC_Running_display_drawThingML_x_var = Display_SC_Running_display_drawThingML_x_var;
}

DisplayBrowserRND.prototype.initDisplayBrowser_BufferCanvas_var = function(DisplayBrowser_BufferCanvas_var) {
	this.DisplayBrowser_BufferCanvas_var = DisplayBrowser_BufferCanvas_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_digits_var = function(Display_SC_Running_display_drawInteger_digits_var) {
	this.Display_SC_Running_display_drawInteger_digits_var = Display_SC_Running_display_drawInteger_digits_var;
}

DisplayBrowserRND.prototype.initDisplay_bg_r_var = function(Display_bg_r_var) {
	this.Display_bg_r_var = Display_bg_r_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_setColorvar216rbg_var = function(Display_SC_Running_received_display_setColorvar216rbg_var) {
	this.Display_SC_Running_received_display_setColorvar216rbg_var = Display_SC_Running_received_display_setColorvar216rbg_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_update__var = function(Display_SC_Running_received_display_update__var) {
	this.Display_SC_Running_received_display_update__var = Display_SC_Running_received_display_update__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawInteger__var = function(Display_SC_Running_received_display_drawInteger__var) {
	this.Display_SC_Running_received_display_drawInteger__var = Display_SC_Running_received_display_drawInteger__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_x_var = function(Display_SC_Running_display_drawInteger_x_var) {
	this.Display_SC_Running_display_drawInteger_x_var = Display_SC_Running_display_drawInteger_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawThingMLvar221x_var = function(Display_SC_Running_received_display_drawThingMLvar221x_var) {
	this.Display_SC_Running_received_display_drawThingMLvar221x_var = Display_SC_Running_received_display_drawThingMLvar221x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRect__var = function(Display_SC_Running_received_display_fillRect__var) {
	this.Display_SC_Running_received_display_fillRect__var = Display_SC_Running_received_display_fillRect__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_y_var = function(Display_SC_Running_display_drawInteger_y_var) {
	this.Display_SC_Running_display_drawInteger_y_var = Display_SC_Running_display_drawInteger_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setBGColor_b_var = function(Display_SC_Running_display_setBGColor_b_var) {
	this.Display_SC_Running_display_setBGColor_b_var = Display_SC_Running_display_setBGColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroy__var = function(Display_SC_Running_received_display_destroy__var) {
	this.Display_SC_Running_received_display_destroy__var = Display_SC_Running_received_display_destroy__var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_width_var = function(Display_SC_Running_display_fillRect_width_var) {
	this.Display_SC_Running_display_fillRect_width_var = Display_SC_Running_display_fillRect_width_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawInteger_var220_var = function(Display_SC_Running_display_drawInteger_var220_var) {
	this.Display_SC_Running_display_drawInteger_var220_var = Display_SC_Running_display_drawInteger_var220_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_b_var = function(Display_fg_b_var) {
	this.Display_fg_b_var = Display_fg_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_b_var = function(Display_SC_Running_display_setColor_b_var) {
	this.Display_SC_Running_display_setColor_b_var = Display_SC_Running_display_setColor_b_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_var219_var = function(Display_SC_Running_display_fillRect_var219_var) {
	this.Display_SC_Running_display_fillRect_var219_var = Display_SC_Running_display_fillRect_var219_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_fillRectvar219yxheightwidth_var = function(Display_SC_Running_received_display_fillRectvar219yxheightwidth_var) {
	this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var = Display_SC_Running_received_display_fillRectvar219yxheightwidth_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Wait_received_display_create__var = function(Display_SC_Wait_received_display_create__var) {
	this.Display_SC_Wait_received_display_create__var = Display_SC_Wait_received_display_create__var;
}

DisplayBrowserRND.prototype.initDisplay_bg_g_var = function(Display_bg_g_var) {
	this.Display_bg_g_var = Display_bg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_var218_var = function(Display_SC_Running_display_drawRect_var218_var) {
	this.Display_SC_Running_display_drawRect_var218_var = Display_SC_Running_display_drawRect_var218_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var = function(Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var) {
	this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var = Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_received_display_destroyvar223_var = function(Display_SC_Running_received_display_destroyvar223_var) {
	this.Display_SC_Running_received_display_destroyvar223_var = Display_SC_Running_received_display_destroyvar223_var;
}

DisplayBrowserRND.prototype.initDisplay_fg_g_var = function(Display_fg_g_var) {
	this.Display_fg_g_var = Display_fg_g_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_fillRect_x_var = function(Display_SC_Running_display_fillRect_x_var) {
	this.Display_SC_Running_display_fillRect_x_var = Display_SC_Running_display_fillRect_x_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_update_var224_var = function(Display_SC_Running_display_update_var224_var) {
	this.Display_SC_Running_display_update_var224_var = Display_SC_Running_display_update_var224_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_drawRect_y_var = function(Display_SC_Running_display_drawRect_y_var) {
	this.Display_SC_Running_display_drawRect_y_var = Display_SC_Running_display_drawRect_y_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_setColor_var216_var = function(Display_SC_Running_display_setColor_var216_var) {
	this.Display_SC_Running_display_setColor_var216_var = Display_SC_Running_display_setColor_var216_var;
}

DisplayBrowserRND.prototype.initDisplay_SC_Running_display_destroy_var223_var = function(Display_SC_Running_display_destroy_var223_var) {
	this.Display_SC_Running_display_destroy_var223_var = Display_SC_Running_display_destroy_var223_var;
}

DisplayBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tdisplay_fillRect_y = ' + this.Display_SC_Running_display_fillRect_y_var;
	result += '\n\tYFRAMESIZE = ' + this.DisplayBrowser_YFRAMESIZE_var;
	result += '\n\tdisplay_drawThingML_var221 = ' + this.Display_SC_Running_display_drawThingML_var221_var;
	result += '\n\tdisplay_create_xsize = ' + this.Display_SC_Wait_display_create_xsize_var;
	result += '\n\tdisplay_drawInteger_v = ' + this.Display_SC_Running_display_drawInteger_v_var;
	result += '\n\tdisplay_setColor_g = ' + this.Display_SC_Running_display_setColor_g_var;
	result += '\n\treceived_display_setBGColorgvar217r = ' + this.Display_SC_Running_received_display_setBGColorgvar217r_var;
	result += '\n\treceived_display_setBGColorb = ' + this.Display_SC_Running_received_display_setBGColorb_var;
	result += '\n\treceived_display_clearvar215 = ' + this.Display_SC_Running_received_display_clearvar215_var;
	result += '\n\treceived_display_clear_ = ' + this.Display_SC_Running_received_display_clear__var;
	result += '\n\tdisplay_setColor_r = ' + this.Display_SC_Running_display_setColor_r_var;
	result += '\n\tfg_r = ' + this.Display_fg_r_var;
	result += '\n\tXFRAMESIZE = ' + this.DisplayBrowser_XFRAMESIZE_var;
	result += '\n\tdisplay_drawRect_x = ' + this.Display_SC_Running_display_drawRect_x_var;
	result += '\n\tDisplay = ' + this.DisplayBrowser_Display_var;
	result += '\n\tBuffer = ' + this.DisplayBrowser_Buffer_var;
	result += '\n\treceived_display_setColor_ = ' + this.Display_SC_Running_received_display_setColor__var;
	result += '\n\tdisplay_setBGColor_r = ' + this.Display_SC_Running_display_setBGColor_r_var;
	result += '\n\tbg_b = ' + this.Display_bg_b_var;
	result += '\n\tSCALE = ' + this.DisplayBrowser_SCALE_var;
	result += '\n\tdisplay_create_var222 = ' + this.Display_SC_Wait_display_create_var222_var;
	result += '\n\treceived_display_drawRectwidthxvar218yheight = ' + this.Display_SC_Running_received_display_drawRectwidthxvar218yheight_var;
	result += '\n\tdisplay_fillRect_height = ' + this.Display_SC_Running_display_fillRect_height_var;
	result += '\n\treceived_display_createysizexsizevar222 = ' + this.Display_SC_Wait_received_display_createysizexsizevar222_var;
	result += '\n\tdisplay_drawInteger_scale = ' + this.Display_SC_Running_display_drawInteger_scale_var;
	result += '\n\tdisplay_drawRect_width = ' + this.Display_SC_Running_display_drawRect_width_var;
	result += '\n\tdisplay_create_ysize = ' + this.Display_SC_Wait_display_create_ysize_var;
	result += '\n\tdisplay_setBGColor_g = ' + this.Display_SC_Running_display_setBGColor_g_var;
	result += '\n\treceived_display_updatevar224 = ' + this.Display_SC_Running_received_display_updatevar224_var;
	result += '\n\treceived_display_drawThingMLy = ' + this.Display_SC_Running_received_display_drawThingMLy_var;
	result += '\n\tdisplay_drawRect_height = ' + this.Display_SC_Running_display_drawRect_height_var;
	result += '\n\treceived_display_drawRect_ = ' + this.Display_SC_Running_received_display_drawRect__var;
	result += '\n\tdisplay_setBGColor_var217 = ' + this.Display_SC_Running_display_setBGColor_var217_var;
	result += '\n\tdisplay_drawThingML_y = ' + this.Display_SC_Running_display_drawThingML_y_var;
	result += '\n\tdisplay_clear_var215 = ' + this.Display_SC_Running_display_clear_var215_var;
	result += '\n\tdisplay_drawThingML_x = ' + this.Display_SC_Running_display_drawThingML_x_var;
	result += '\n\tBufferCanvas = ' + this.DisplayBrowser_BufferCanvas_var;
	result += '\n\tdisplay_drawInteger_digits = ' + this.Display_SC_Running_display_drawInteger_digits_var;
	result += '\n\tbg_r = ' + this.Display_bg_r_var;
	result += '\n\treceived_display_setColorvar216rbg = ' + this.Display_SC_Running_received_display_setColorvar216rbg_var;
	result += '\n\treceived_display_update_ = ' + this.Display_SC_Running_received_display_update__var;
	result += '\n\treceived_display_drawInteger_ = ' + this.Display_SC_Running_received_display_drawInteger__var;
	result += '\n\tdisplay_drawInteger_x = ' + this.Display_SC_Running_display_drawInteger_x_var;
	result += '\n\treceived_display_drawThingMLvar221x = ' + this.Display_SC_Running_received_display_drawThingMLvar221x_var;
	result += '\n\treceived_display_fillRect_ = ' + this.Display_SC_Running_received_display_fillRect__var;
	result += '\n\tdisplay_drawInteger_y = ' + this.Display_SC_Running_display_drawInteger_y_var;
	result += '\n\tdisplay_setBGColor_b = ' + this.Display_SC_Running_display_setBGColor_b_var;
	result += '\n\treceived_display_destroy_ = ' + this.Display_SC_Running_received_display_destroy__var;
	result += '\n\tdisplay_fillRect_width = ' + this.Display_SC_Running_display_fillRect_width_var;
	result += '\n\tdisplay_drawInteger_var220 = ' + this.Display_SC_Running_display_drawInteger_var220_var;
	result += '\n\tfg_b = ' + this.Display_fg_b_var;
	result += '\n\tdisplay_setColor_b = ' + this.Display_SC_Running_display_setColor_b_var;
	result += '\n\tdisplay_fillRect_var219 = ' + this.Display_SC_Running_display_fillRect_var219_var;
	result += '\n\treceived_display_fillRectvar219yxheightwidth = ' + this.Display_SC_Running_received_display_fillRectvar219yxheightwidth_var;
	result += '\n\treceived_display_create_ = ' + this.Display_SC_Wait_received_display_create__var;
	result += '\n\tbg_g = ' + this.Display_bg_g_var;
	result += '\n\tdisplay_drawRect_var218 = ' + this.Display_SC_Running_display_drawRect_var218_var;
	result += '\n\treceived_display_drawIntegervar220vscalexdigitsy = ' + this.Display_SC_Running_received_display_drawIntegervar220vscalexdigitsy_var;
	result += '\n\treceived_display_destroyvar223 = ' + this.Display_SC_Running_received_display_destroyvar223_var;
	result += '\n\tfg_g = ' + this.Display_fg_g_var;
	result += '\n\tdisplay_fillRect_x = ' + this.Display_SC_Running_display_fillRect_x_var;
	result += '\n\tdisplay_update_var224 = ' + this.Display_SC_Running_display_update_var224_var;
	result += '\n\tdisplay_drawRect_y = ' + this.Display_SC_Running_display_drawRect_y_var;
	result += '\n\tdisplay_setColor_var216 = ' + this.Display_SC_Running_display_setColor_var216_var;
	result += '\n\tdisplay_destroy_var223 = ' + this.Display_SC_Running_display_destroy_var223_var;
	result += '';
	return result;
}

