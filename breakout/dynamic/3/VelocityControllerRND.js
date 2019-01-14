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
		setTimeout(() => this.bus.emit('clock?timer_start', 0xFF, 0xA7, timerID_const, 50), 0);
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
		if(209 < 239) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x', 0x92, 0xE5, posX_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x_bis', 0xD8, 0x92, posX_const), 0);
		
		}
		if(194 < 211) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony', posY_const, 0xB2), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony_bis', 0xC4, posY_const), 0);
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionvar334x_bis) => {
		return positionvar334x_bis._port === 'ctrl_in' && positionvar334x_bis._msg === 'positionvar334x_bis';
	}).effect((positionvar334x_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_var334_var = positionvar334x_bis.var334;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionvar334x_bis.x;
		if(this.VelocityController_SC_Running_received_ctrl_in_positiony_var) {
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
		if(130 < 140) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony', posY_const, 0x12), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony_bis', 0x76, posY_const), 0);
		
		}
		if(175 < 254) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x', 0x7B, 0xAE, posX_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x_bis', 0x9E, 0x7B, posX_const), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar333dy_bis) => {
		return velocityvar333dy_bis._port === 'ctrl_in' && velocityvar333dy_bis._msg === 'velocityvar333dy_bis';
	}).effect((velocityvar333dy_bis) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var333_var = velocityvar333dy_bis.var333;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocityvar333dy_bis.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocitydx_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydx_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar333dy) => {
		return velocityvar333dy._port === 'ctrl_in' && velocityvar333dy._msg === 'velocityvar333dy';
	}).effect((velocityvar333dy) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var333_var = velocityvar333dy.var333;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocityvar333dy.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocitydx_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydx_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positiony) => {
		return positiony._port === 'ctrl_in' && positiony._msg === 'positiony';
	}).effect((positiony) => {
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positiony.y;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var) {
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
		if(214 < 177) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x', 0x7B, 0x4A, posX_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x_bis', 0x32, 0x7B, posX_const), 0);
		
		}
		if(54 < 57) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony', posY_const, 0x34), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony_bis', 0x4B, posY_const), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positiony_bis) => {
		return positiony_bis._port === 'ctrl_in' && positiony_bis._msg === 'positiony_bis';
	}).effect((positiony_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positiony_bis.y;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var) {
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
		if(214 < 177) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x', 0x7B, 0x82, posX_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x_bis', 0xE7, 0x7B, posX_const), 0);
		
		}
		if(54 < 57) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony', posY_const, 0x38), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony_bis', 0x23, posY_const), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionvar334x) => {
		return positionvar334x._port === 'ctrl_in' && positionvar334x._msg === 'positionvar334x';
	}).effect((positionvar334x) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_var334_var = positionvar334x.var334;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionvar334x.x;
		if(this.VelocityController_SC_Running_received_ctrl_in_positiony_var) {
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
		if(130 < 140) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony', posY_const, 0x7A), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony_bis', 0xC1, posY_const), 0);
		
		}
		if(175 < 254) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x', 0x7B, 0xE5, posX_const), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionvar334x_bis', 0x0D, 0x7B, posX_const), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydx_bis) => {
		return velocitydx_bis._port === 'ctrl_in' && velocitydx_bis._msg === 'velocitydx_bis';
	}).effect((velocitydx_bis) => {
		this.VelocityController_SC_received_ctrl_in_velocitydx_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydx_bis.dx;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydx_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydx) => {
		return velocitydx._port === 'ctrl_in' && velocitydx._msg === 'velocitydx';
	}).effect((velocitydx) => {
		this.VelocityController_SC_received_ctrl_in_velocitydx_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydx.dx;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydx_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var = false;
		
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

VelocityControllerRND.prototype.receivetimer_timeoutOnclock = function(var341, id, var320) {
	this._receive({_port:"clock", _msg:"timer_timeout", var341:var341, id:id, var320:var320});
}

VelocityControllerRND.prototype.receivevelocitydxOnctrl_in = function(var392, dx) {
	this._receive({_port:"ctrl_in", _msg:"velocitydx", var392:var392, dx:dx});
}

VelocityControllerRND.prototype.receivevelocityvar333dyOnctrl_in = function(var333, dy, var393) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar333dy", var333:var333, dy:dy, var393:var393});
}

VelocityControllerRND.prototype.receivepositionyOnctrl_in = function(y, var394) {
	this._receive({_port:"ctrl_in", _msg:"positiony", y:y, var394:var394});
}

VelocityControllerRND.prototype.receivepositionvar334xOnctrl_in = function(var334, var395, x) {
	this._receive({_port:"ctrl_in", _msg:"positionvar334x", var334:var334, var395:var395, x:x});
}

VelocityControllerRND.prototype.receivevelocitydx_bisOnctrl_in = function(var396, dx) {
	this._receive({_port:"ctrl_in", _msg:"velocitydx_bis", var396:var396, dx:dx});
}

VelocityControllerRND.prototype.receivevelocityvar333dy_bisOnctrl_in = function(var333, var397, dy) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar333dy_bis", var333:var333, var397:var397, dy:dy});
}

VelocityControllerRND.prototype.receivepositiony_bisOnctrl_in = function(var398, y) {
	this._receive({_port:"ctrl_in", _msg:"positiony_bis", var398:var398, y:y});
}

VelocityControllerRND.prototype.receivepositionvar334x_bisOnctrl_in = function(var399, var334, x) {
	this._receive({_port:"ctrl_in", _msg:"positionvar334x_bis", var399:var399, var334:var334, x:x});
}

VelocityControllerRND.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityControllerRND.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityControllerRND.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityControllerRND.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_var334_var = function(VelocityController_SC_Running_ctrl_in_position_var334_var) {
	this.VelocityController_SC_Running_ctrl_in_position_var334_var = VelocityController_SC_Running_ctrl_in_position_var334_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positionvar334x_var = function(VelocityController_SC_Running_received_ctrl_in_positionvar334x_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var = VelocityController_SC_Running_received_ctrl_in_positionvar334x_var;
}

VelocityControllerRND.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positiony_var = function(VelocityController_SC_Running_received_ctrl_in_positiony_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positiony_var = VelocityController_SC_Running_received_ctrl_in_positiony_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocityvar333dy_var = function(VelocityController_SC_received_ctrl_in_velocityvar333dy_var) {
	this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var = VelocityController_SC_received_ctrl_in_velocityvar333dy_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocitydx_var = function(VelocityController_SC_received_ctrl_in_velocitydx_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydx_var = VelocityController_SC_received_ctrl_in_velocitydx_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_var333_var = function(VelocityController_SC_ctrl_in_velocity_var333_var) {
	this.VelocityController_SC_ctrl_in_velocity_var333_var = VelocityController_SC_ctrl_in_velocity_var333_var;
}

VelocityControllerRND.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
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

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityControllerRND.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityControllerRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tctrl_in_position_var334 = ' + this.VelocityController_SC_Running_ctrl_in_position_var334_var;
	result += '\n\treceived_ctrl_in_positionvar334x = ' + this.VelocityController_SC_Running_received_ctrl_in_positionvar334x_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\treceived_ctrl_in_positiony = ' + this.VelocityController_SC_Running_received_ctrl_in_positiony_var;
	result += '\n\treceived_ctrl_in_velocityvar333dy = ' + this.VelocityController_SC_received_ctrl_in_velocityvar333dy_var;
	result += '\n\treceived_ctrl_in_velocitydx = ' + this.VelocityController_SC_received_ctrl_in_velocitydx_var;
	result += '\n\tctrl_in_velocity_var333 = ' + this.VelocityController_SC_ctrl_in_velocity_var333_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '';
	return result;
}

