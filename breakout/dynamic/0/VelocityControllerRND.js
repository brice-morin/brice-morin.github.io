'use strict';


/*
 * Definition for type : VelocityControllerRND
 */

function VelocityControllerRND(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

VelocityControllerRND.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SC');
	let _initial_VelocityController_SC = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let VelocityController_SC_Running = new StateJS.State('Running', this._statemachine).entry(() => {
		const timerID_const = this.VelocityController_timerID_var;
		setTimeout(() => this.bus.emit('clock?timer_start', 0xC5, 0x58, 50, timerID_const), 0);
	});
	_initial_VelocityController_SC.to(VelocityController_SC_Running);
	VelocityController_SC_Running.to(VelocityController_SC_Running).when((timer_timeout) => {
		return timer_timeout._port === 'clock' && timer_timeout._msg === 'timer_timeout' && (timer_timeout.id === this.VelocityController_timerID_var);
	}).effect((timer_timeout) => {
		this.TimerController_posX_var = this.TimerController_posX_var + this.TimerController_dx_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		this.TimerController_posY_var = this.TimerController_posY_var + this.TimerController_dy_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		if(this.TimerController_posX_var < this.TimerController_XMIN_var) {
		this.TimerController_posX_var = this.TimerController_XMIN_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		} else {
		if(this.TimerController_posX_var > this.TimerController_XMAX_var) {
		this.TimerController_posX_var = this.TimerController_XMAX_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		}
		
		}
		if(this.TimerController_posY_var < this.TimerController_YMIN_var) {
		this.TimerController_posY_var = this.TimerController_YMIN_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		} else {
		if(this.TimerController_posY_var > this.TimerController_YMAX_var) {
		this.TimerController_posY_var = this.TimerController_YMAX_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		}
		
		}
		if(224 < 50) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx', 0x57, posX_const, posY_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx_bis', posX_const, 0x9A, posY_const), 0);
		
		}
		if(65 < 193) {
		setTimeout(() => this.bus.emit('controls?positionvar16', 0x06, 0x4B), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar16_bis', 0x4B, 0x8D), 0);
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionvar16_bis) => {
		return positionvar16_bis._port === 'ctrl_in' && positionvar16_bis._msg === 'positionvar16_bis';
	}).effect((positionvar16_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_var16_var = positionvar16_bis.var16;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionyx_var) {
		this.TimerController_posX_var = this.VelocityController_SC_Running_ctrl_in_position_x_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		this.TimerController_posY_var = this.VelocityController_SC_Running_ctrl_in_position_y_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		if(this.TimerController_posX_var < this.TimerController_XMIN_var) {
		this.TimerController_posX_var = this.TimerController_XMIN_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		} else {
		if(this.TimerController_posX_var > this.TimerController_XMAX_var) {
		this.TimerController_posX_var = this.TimerController_XMAX_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		}
		
		}
		if(this.TimerController_posY_var < this.TimerController_YMIN_var) {
		this.TimerController_posY_var = this.TimerController_YMIN_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		} else {
		if(this.TimerController_posY_var > this.TimerController_YMAX_var) {
		this.TimerController_posY_var = this.TimerController_YMAX_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		}
		
		}
		if(213 < 78) {
		setTimeout(() => this.bus.emit('controls?positionvar16', 0x78, 0x28), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar16_bis', 0x28, 0xE2), 0);
		
		}
		if(190 < 225) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx', 0x58, posX_const, posY_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx_bis', posX_const, 0xA8, posY_const), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar15) => {
		return velocityvar15._port === 'ctrl_in' && velocityvar15._msg === 'velocityvar15';
	}).effect((velocityvar15) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar15_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var15_var = velocityvar15.var15;
		if(this.VelocityController_SC_received_ctrl_in_velocitydxdy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar15_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar15_bis) => {
		return velocityvar15_bis._port === 'ctrl_in' && velocityvar15_bis._msg === 'velocityvar15_bis';
	}).effect((velocityvar15_bis) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar15_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var15_var = velocityvar15_bis.var15;
		if(this.VelocityController_SC_received_ctrl_in_velocitydxdy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar15_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionyx) => {
		return positionyx._port === 'ctrl_in' && positionyx._msg === 'positionyx';
	}).effect((positionyx) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionyx.y;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionyx.x;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var) {
		this.TimerController_posX_var = this.VelocityController_SC_Running_ctrl_in_position_x_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		this.TimerController_posY_var = this.VelocityController_SC_Running_ctrl_in_position_y_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		if(this.TimerController_posX_var < this.TimerController_XMIN_var) {
		this.TimerController_posX_var = this.TimerController_XMIN_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		} else {
		if(this.TimerController_posX_var > this.TimerController_XMAX_var) {
		this.TimerController_posX_var = this.TimerController_XMAX_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		}
		
		}
		if(this.TimerController_posY_var < this.TimerController_YMIN_var) {
		this.TimerController_posY_var = this.TimerController_YMIN_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		} else {
		if(this.TimerController_posY_var > this.TimerController_YMAX_var) {
		this.TimerController_posY_var = this.TimerController_YMAX_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		}
		
		}
		if(94 < 161) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx', 0x83, posX_const, posY_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx_bis', posX_const, 0x5D, posY_const), 0);
		
		}
		if(142 < 237) {
		setTimeout(() => this.bus.emit('controls?positionvar16', 0x4E, 0x28), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar16_bis', 0x28, 0xA1), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionyx_bis) => {
		return positionyx_bis._port === 'ctrl_in' && positionyx_bis._msg === 'positionyx_bis';
	}).effect((positionyx_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionyx_bis.y;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionyx_bis.x;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var) {
		this.TimerController_posX_var = this.VelocityController_SC_Running_ctrl_in_position_x_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		this.TimerController_posY_var = this.VelocityController_SC_Running_ctrl_in_position_y_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		if(this.TimerController_posX_var < this.TimerController_XMIN_var) {
		this.TimerController_posX_var = this.TimerController_XMIN_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		} else {
		if(this.TimerController_posX_var > this.TimerController_XMAX_var) {
		this.TimerController_posX_var = this.TimerController_XMAX_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		}
		
		}
		if(this.TimerController_posY_var < this.TimerController_YMIN_var) {
		this.TimerController_posY_var = this.TimerController_YMIN_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		} else {
		if(this.TimerController_posY_var > this.TimerController_YMAX_var) {
		this.TimerController_posY_var = this.TimerController_YMAX_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		}
		
		}
		if(94 < 161) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx', 0x08, posX_const, posY_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx_bis', posX_const, 0xA4, posY_const), 0);
		
		}
		if(142 < 237) {
		setTimeout(() => this.bus.emit('controls?positionvar16', 0x1B, 0x28), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar16_bis', 0x28, 0x11), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydxdy) => {
		return velocitydxdy._port === 'ctrl_in' && velocitydxdy._msg === 'velocitydxdy';
	}).effect((velocitydxdy) => {
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydxdy.dx;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydxdy.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar15_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar15_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionvar16) => {
		return positionvar16._port === 'ctrl_in' && positionvar16._msg === 'positionvar16';
	}).effect((positionvar16) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_var16_var = positionvar16.var16;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionyx_var) {
		this.TimerController_posX_var = this.VelocityController_SC_Running_ctrl_in_position_x_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		this.TimerController_posY_var = this.VelocityController_SC_Running_ctrl_in_position_y_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		if(this.TimerController_posX_var < this.TimerController_XMIN_var) {
		this.TimerController_posX_var = this.TimerController_XMIN_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		} else {
		if(this.TimerController_posX_var > this.TimerController_XMAX_var) {
		this.TimerController_posX_var = this.TimerController_XMAX_var;
		this.bus.emit('posX=', this.TimerController_posX_var);
		
		}
		
		}
		if(this.TimerController_posY_var < this.TimerController_YMIN_var) {
		this.TimerController_posY_var = this.TimerController_YMIN_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		} else {
		if(this.TimerController_posY_var > this.TimerController_YMAX_var) {
		this.TimerController_posY_var = this.TimerController_YMAX_var;
		this.bus.emit('posY=', this.TimerController_posY_var);
		
		}
		
		}
		if(213 < 78) {
		setTimeout(() => this.bus.emit('controls?positionvar16', 0x3A, 0x28), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar16_bis', 0x28, 0x5B), 0);
		
		}
		if(190 < 225) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx', 0x3D, posX_const, posY_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx_bis', posX_const, 0x9A, posY_const), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydxdy_bis) => {
		return velocitydxdy_bis._port === 'ctrl_in' && velocitydxdy_bis._msg === 'velocitydxdy_bis';
	}).effect((velocitydxdy_bis) => {
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydxdy_bis.dx;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydxdy_bis.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar15_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar15_var = false;
		
		}
	});
}
VelocityControllerRND.prototype.rnd = function() {
	return Math.floor(Math.random() * Math.floor(246)) + 5;
}

VelocityControllerRND.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

VelocityControllerRND.prototype._delete = function() {
	this._statemachine = null;
	this._SC_instance = null;
	this.bus.removeAllListeners();
}

VelocityControllerRND.prototype._init = function() {
	this._SC_instance = new StateJS.Instance("SC_instance", this._statemachine);
	this.ready = true;
}

VelocityControllerRND.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SC_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

VelocityControllerRND.prototype.receivetimer_timeoutOnclock = function(var2, var24, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", var2:var2, var24:var24, id:id});
}

VelocityControllerRND.prototype.receivevelocityvar15Onctrl_in = function(var15, var76) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar15", var15:var15, var76:var76});
}

VelocityControllerRND.prototype.receivevelocitydxdyOnctrl_in = function(dy, dx, var77) {
	this._receive({_port:"ctrl_in", _msg:"velocitydxdy", dy:dy, dx:dx, var77:var77});
}

VelocityControllerRND.prototype.receivepositionvar16Onctrl_in = function(var74, var16) {
	this._receive({_port:"ctrl_in", _msg:"positionvar16", var74:var74, var16:var16});
}

VelocityControllerRND.prototype.receivepositionyxOnctrl_in = function(var75, x, y) {
	this._receive({_port:"ctrl_in", _msg:"positionyx", var75:var75, x:x, y:y});
}

VelocityControllerRND.prototype.receivevelocityvar15_bisOnctrl_in = function(var80, var15) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar15_bis", var80:var80, var15:var15});
}

VelocityControllerRND.prototype.receivevelocitydxdy_bisOnctrl_in = function(var81, dy, dx) {
	this._receive({_port:"ctrl_in", _msg:"velocitydxdy_bis", var81:var81, dy:dy, dx:dx});
}

VelocityControllerRND.prototype.receivepositionvar16_bisOnctrl_in = function(var16, var78) {
	this._receive({_port:"ctrl_in", _msg:"positionvar16_bis", var16:var16, var78:var78});
}

VelocityControllerRND.prototype.receivepositionyx_bisOnctrl_in = function(x, var79, y) {
	this._receive({_port:"ctrl_in", _msg:"positionyx_bis", x:x, var79:var79, y:y});
}

VelocityControllerRND.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityControllerRND.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityControllerRND.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityControllerRND.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positionyx_var = function(VelocityController_SC_Running_received_ctrl_in_positionyx_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = VelocityController_SC_Running_received_ctrl_in_positionyx_var;
}

VelocityControllerRND.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positionvar16_var = function(VelocityController_SC_Running_received_ctrl_in_positionvar16_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var = VelocityController_SC_Running_received_ctrl_in_positionvar16_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocitydxdy_var = function(VelocityController_SC_received_ctrl_in_velocitydxdy_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = VelocityController_SC_received_ctrl_in_velocitydxdy_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_var15_var = function(VelocityController_SC_ctrl_in_velocity_var15_var) {
	this.VelocityController_SC_ctrl_in_velocity_var15_var = VelocityController_SC_ctrl_in_velocity_var15_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocityvar15_var = function(VelocityController_SC_received_ctrl_in_velocityvar15_var) {
	this.VelocityController_SC_received_ctrl_in_velocityvar15_var = VelocityController_SC_received_ctrl_in_velocityvar15_var;
}

VelocityControllerRND.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_var16_var = function(VelocityController_SC_Running_ctrl_in_position_var16_var) {
	this.VelocityController_SC_Running_ctrl_in_position_var16_var = VelocityController_SC_Running_ctrl_in_position_var16_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityControllerRND.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityControllerRND.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityControllerRND.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityControllerRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\treceived_ctrl_in_positionyx = ' + this.VelocityController_SC_Running_received_ctrl_in_positionyx_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\treceived_ctrl_in_positionvar16 = ' + this.VelocityController_SC_Running_received_ctrl_in_positionvar16_var;
	result += '\n\treceived_ctrl_in_velocitydxdy = ' + this.VelocityController_SC_received_ctrl_in_velocitydxdy_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\tctrl_in_velocity_var15 = ' + this.VelocityController_SC_ctrl_in_velocity_var15_var;
	result += '\n\treceived_ctrl_in_velocityvar15 = ' + this.VelocityController_SC_received_ctrl_in_velocityvar15_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tctrl_in_position_var16 = ' + this.VelocityController_SC_Running_ctrl_in_position_var16_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '';
	return result;
}

