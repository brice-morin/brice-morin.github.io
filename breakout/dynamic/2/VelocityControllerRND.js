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
		setTimeout(() => this.bus.emit('clock?timer_start', 50, timerID_const, 0xDC, 0x4F), 0);
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
		if(250 < 39) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx', posX_const, 0xFB), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx_bis', posX_const, 0x3C), 0);
		
		}
		if(192 < 248) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y', 0x92, 0xF6, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y_bis', 0x92, posY_const, 0xBE), 0);
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionx_bis) => {
		return positionx_bis._port === 'ctrl_in' && positionx_bis._msg === 'positionx_bis';
	}).effect((positionx_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionx_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionx_bis.x;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var) {
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
		if(174 < 127) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx', posX_const, 0xC7), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx_bis', posX_const, 0x6A), 0);
		
		}
		if(238 < 79) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y', 0x18, 0x36, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y_bis', 0x18, posY_const, 0x8E), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionx_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocity_) => {
		return velocity_._port === 'ctrl_in' && velocity_._msg === 'velocity_';
	}).effect((velocity_) => {
		this.VelocityController_SC_received_ctrl_in_velocity__var = true;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionx) => {
		return positionx._port === 'ctrl_in' && positionx._msg === 'positionx';
	}).effect((positionx) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionx_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionx.x;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var) {
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
		if(174 < 127) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx', posX_const, 0xFB), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx_bis', posX_const, 0x90), 0);
		
		}
		if(238 < 79) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y', 0x18, 0x79, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y_bis', 0x18, posY_const, 0xBA), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionx_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionvar228y) => {
		return positionvar228y._port === 'ctrl_in' && positionvar228y._msg === 'positionvar228y';
	}).effect((positionvar228y) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_var228_var = positionvar228y.var228;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionvar228y.y;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionx_var) {
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
		if(74 < 52) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx', posX_const, 0xA5), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx_bis', posX_const, 0x10), 0);
		
		}
		if(202 < 41) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y', 0x18, 0xDE, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y_bis', 0x18, posY_const, 0x94), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionx_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar227dxdy_bis) => {
		return velocityvar227dxdy_bis._port === 'ctrl_in' && velocityvar227dxdy_bis._msg === 'velocityvar227dxdy_bis';
	}).effect((velocityvar227dxdy_bis) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var227_var = velocityvar227dxdy_bis.var227;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocityvar227dxdy_bis.dx;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocityvar227dxdy_bis.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocity__var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionvar228y_bis) => {
		return positionvar228y_bis._port === 'ctrl_in' && positionvar228y_bis._msg === 'positionvar228y_bis';
	}).effect((positionvar228y_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_var228_var = positionvar228y_bis.var228;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionvar228y_bis.y;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionx_var) {
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
		if(74 < 52) {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx', posX_const, 0x86), 0);
		
		} else {
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionx_bis', posX_const, 0x76), 0);
		
		}
		if(202 < 41) {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y', 0x18, 0x99, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionvar228y_bis', 0x18, posY_const, 0x53), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionx_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocity__bis) => {
		return velocity__bis._port === 'ctrl_in' && velocity__bis._msg === 'velocity__bis';
	}).effect((velocity__bis) => {
		this.VelocityController_SC_received_ctrl_in_velocity__var = true;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar227dxdy) => {
		return velocityvar227dxdy._port === 'ctrl_in' && velocityvar227dxdy._msg === 'velocityvar227dxdy';
	}).effect((velocityvar227dxdy) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var227_var = velocityvar227dxdy.var227;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocityvar227dxdy.dx;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocityvar227dxdy.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocity__var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		
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

VelocityControllerRND.prototype.receivetimer_timeoutOnclock = function(id, var235, var214) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, var235:var235, var214:var214});
}

VelocityControllerRND.prototype.receivevelocity_Onctrl_in = function(var288) {
	this._receive({_port:"ctrl_in", _msg:"velocity_", var288:var288});
}

VelocityControllerRND.prototype.receivevelocityvar227dxdyOnctrl_in = function(dx, var289, var227, dy) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar227dxdy", dx:dx, var289:var289, var227:var227, dy:dy});
}

VelocityControllerRND.prototype.receivepositionxOnctrl_in = function(x, var286) {
	this._receive({_port:"ctrl_in", _msg:"positionx", x:x, var286:var286});
}

VelocityControllerRND.prototype.receivepositionvar228yOnctrl_in = function(var228, var287, y) {
	this._receive({_port:"ctrl_in", _msg:"positionvar228y", var228:var228, var287:var287, y:y});
}

VelocityControllerRND.prototype.receivevelocity__bisOnctrl_in = function(var292) {
	this._receive({_port:"ctrl_in", _msg:"velocity__bis", var292:var292});
}

VelocityControllerRND.prototype.receivevelocityvar227dxdy_bisOnctrl_in = function(var293, dy, var227, dx) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar227dxdy_bis", var293:var293, dy:dy, var227:var227, dx:dx});
}

VelocityControllerRND.prototype.receivepositionx_bisOnctrl_in = function(x, var290) {
	this._receive({_port:"ctrl_in", _msg:"positionx_bis", x:x, var290:var290});
}

VelocityControllerRND.prototype.receivepositionvar228y_bisOnctrl_in = function(var228, y, var291) {
	this._receive({_port:"ctrl_in", _msg:"positionvar228y_bis", var228:var228, y:y, var291:var291});
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
}

VelocityControllerRND.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_var227_var = function(VelocityController_SC_ctrl_in_velocity_var227_var) {
	this.VelocityController_SC_ctrl_in_velocity_var227_var = VelocityController_SC_ctrl_in_velocity_var227_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocity__var = function(VelocityController_SC_received_ctrl_in_velocity__var) {
	this.VelocityController_SC_received_ctrl_in_velocity__var = VelocityController_SC_received_ctrl_in_velocity__var;
}

VelocityControllerRND.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityControllerRND.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positionx_var = function(VelocityController_SC_Running_received_ctrl_in_positionx_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionx_var = VelocityController_SC_Running_received_ctrl_in_positionx_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positionvar228y_var = function(VelocityController_SC_Running_received_ctrl_in_positionvar228y_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var = VelocityController_SC_Running_received_ctrl_in_positionvar228y_var;
}

VelocityControllerRND.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityControllerRND.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityControllerRND.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityControllerRND.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocityvar227dxdy_var = function(VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var) {
	this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var = VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var;
}

VelocityControllerRND.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_var228_var = function(VelocityController_SC_Running_ctrl_in_position_var228_var) {
	this.VelocityController_SC_Running_ctrl_in_position_var228_var = VelocityController_SC_Running_ctrl_in_position_var228_var;
}

VelocityControllerRND.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityControllerRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tctrl_in_velocity_var227 = ' + this.VelocityController_SC_ctrl_in_velocity_var227_var;
	result += '\n\treceived_ctrl_in_velocity_ = ' + this.VelocityController_SC_received_ctrl_in_velocity__var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\treceived_ctrl_in_positionx = ' + this.VelocityController_SC_Running_received_ctrl_in_positionx_var;
	result += '\n\treceived_ctrl_in_positionvar228y = ' + this.VelocityController_SC_Running_received_ctrl_in_positionvar228y_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\treceived_ctrl_in_velocityvar227dxdy = ' + this.VelocityController_SC_received_ctrl_in_velocityvar227dxdy_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tctrl_in_position_var228 = ' + this.VelocityController_SC_Running_ctrl_in_position_var228_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '';
	return result;
}

