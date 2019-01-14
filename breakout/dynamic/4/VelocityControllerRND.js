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
		setTimeout(() => this.bus.emit('clock?timer_start', timerID_const, 0x6C, 0xEA, 50), 0);
	});
	_initial_VelocityController_SC.to(VelocityController_SC_Running);
	VelocityController_SC_Running.to(null).when((positionvar440_bis) => {
		return positionvar440_bis._port === 'ctrl_in' && positionvar440_bis._msg === 'positionvar440_bis';
	}).effect((positionvar440_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_var440_var = positionvar440_bis.var440;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionxy_var) {
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
		if(180 < 117) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionxy', posX_const, 0xCD, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxy_bis', 0x3F, posY_const, posX_const), 0);
		
		}
		if(177 < 165) {
		setTimeout(() => this.bus.emit('controls?positionvar440', 0x41, 0x20), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar440_bis', 0x20, 0x78), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionxy_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionxy) => {
		return positionxy._port === 'ctrl_in' && positionxy._msg === 'positionxy';
	}).effect((positionxy) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionxy_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionxy.x;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionxy.y;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var) {
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
		if(249 < 170) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionxy', posX_const, 0x8E, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxy_bis', 0x2C, posY_const, posX_const), 0);
		
		}
		if(39 < 204) {
		setTimeout(() => this.bus.emit('controls?positionvar440', 0xD2, 0x20), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar440_bis', 0x20, 0x76), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionxy_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionxy_bis) => {
		return positionxy_bis._port === 'ctrl_in' && positionxy_bis._msg === 'positionxy_bis';
	}).effect((positionxy_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionxy_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionxy_bis.x;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionxy_bis.y;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var) {
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
		if(249 < 170) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionxy', posX_const, 0xC2, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxy_bis', 0x17, posY_const, posX_const), 0);
		
		}
		if(39 < 204) {
		setTimeout(() => this.bus.emit('controls?positionvar440', 0x97, 0x20), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar440_bis', 0x20, 0xAB), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionxy_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionvar440) => {
		return positionvar440._port === 'ctrl_in' && positionvar440._msg === 'positionvar440';
	}).effect((positionvar440) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_var440_var = positionvar440.var440;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionxy_var) {
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
		if(180 < 117) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionxy', posX_const, 0x3D, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxy_bis', 0x06, posY_const, posX_const), 0);
		
		}
		if(177 < 165) {
		setTimeout(() => this.bus.emit('controls?positionvar440', 0x03, 0x20), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar440_bis', 0x20, 0x24), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionxy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocity_) => {
		return velocity_._port === 'ctrl_in' && velocity_._msg === 'velocity_';
	}).effect((velocity_) => {
		this.VelocityController_SC_received_ctrl_in_velocity__var = true;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocity__bis) => {
		return velocity__bis._port === 'ctrl_in' && velocity__bis._msg === 'velocity__bis';
	}).effect((velocity__bis) => {
		this.VelocityController_SC_received_ctrl_in_velocity__var = true;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar439dxdy) => {
		return velocityvar439dxdy._port === 'ctrl_in' && velocityvar439dxdy._msg === 'velocityvar439dxdy';
	}).effect((velocityvar439dxdy) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var439_var = velocityvar439dxdy.var439;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocityvar439dxdy.dx;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocityvar439dxdy.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocity__var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar439dxdy_bis) => {
		return velocityvar439dxdy_bis._port === 'ctrl_in' && velocityvar439dxdy_bis._msg === 'velocityvar439dxdy_bis';
	}).effect((velocityvar439dxdy_bis) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var439_var = velocityvar439dxdy_bis.var439;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocityvar439dxdy_bis.dx;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocityvar439dxdy_bis.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocity__var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		
		}
	});
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
		if(124 < 203) {
		setTimeout(() => this.bus.emit('controls?positionvar440', 0xCB, 0x59), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar440_bis', 0x59, 0x41), 0);
		
		}
		if(198 < 155) {
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionxy', posX_const, 0x65, posY_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxy_bis', 0x6D, posY_const, posX_const), 0);
		
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

VelocityControllerRND.prototype.receivetimer_timeoutOnclock = function(var447, var426, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", var447:var447, var426:var426, id:id});
}

VelocityControllerRND.prototype.receivevelocity_Onctrl_in = function(var498) {
	this._receive({_port:"ctrl_in", _msg:"velocity_", var498:var498});
}

VelocityControllerRND.prototype.receivevelocityvar439dxdyOnctrl_in = function(dy, var499, var439, dx) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar439dxdy", dy:dy, var499:var499, var439:var439, dx:dx});
}

VelocityControllerRND.prototype.receivepositionxyOnctrl_in = function(x, var500, y) {
	this._receive({_port:"ctrl_in", _msg:"positionxy", x:x, var500:var500, y:y});
}

VelocityControllerRND.prototype.receivepositionvar440Onctrl_in = function(var501, var440) {
	this._receive({_port:"ctrl_in", _msg:"positionvar440", var501:var501, var440:var440});
}

VelocityControllerRND.prototype.receivevelocity__bisOnctrl_in = function(var502) {
	this._receive({_port:"ctrl_in", _msg:"velocity__bis", var502:var502});
}

VelocityControllerRND.prototype.receivevelocityvar439dxdy_bisOnctrl_in = function(dy, dx, var439, var503) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar439dxdy_bis", dy:dy, dx:dx, var439:var439, var503:var503});
}

VelocityControllerRND.prototype.receivepositionxy_bisOnctrl_in = function(var504, y, x) {
	this._receive({_port:"ctrl_in", _msg:"positionxy_bis", var504:var504, y:y, x:x});
}

VelocityControllerRND.prototype.receivepositionvar440_bisOnctrl_in = function(var440, var505) {
	this._receive({_port:"ctrl_in", _msg:"positionvar440_bis", var440:var440, var505:var505});
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocity__var = function(VelocityController_SC_received_ctrl_in_velocity__var) {
	this.VelocityController_SC_received_ctrl_in_velocity__var = VelocityController_SC_received_ctrl_in_velocity__var;
}

VelocityControllerRND.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positionvar440_var = function(VelocityController_SC_Running_received_ctrl_in_positionvar440_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var = VelocityController_SC_Running_received_ctrl_in_positionvar440_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityControllerRND.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityControllerRND.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityControllerRND.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocityvar439dxdy_var = function(VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var) {
	this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var = VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_var439_var = function(VelocityController_SC_ctrl_in_velocity_var439_var) {
	this.VelocityController_SC_ctrl_in_velocity_var439_var = VelocityController_SC_ctrl_in_velocity_var439_var;
}

VelocityControllerRND.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityControllerRND.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_var440_var = function(VelocityController_SC_Running_ctrl_in_position_var440_var) {
	this.VelocityController_SC_Running_ctrl_in_position_var440_var = VelocityController_SC_Running_ctrl_in_position_var440_var;
}

VelocityControllerRND.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positionxy_var = function(VelocityController_SC_Running_received_ctrl_in_positionxy_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionxy_var = VelocityController_SC_Running_received_ctrl_in_positionxy_var;
}

VelocityControllerRND.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityControllerRND.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityControllerRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\treceived_ctrl_in_velocity_ = ' + this.VelocityController_SC_received_ctrl_in_velocity__var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\treceived_ctrl_in_positionvar440 = ' + this.VelocityController_SC_Running_received_ctrl_in_positionvar440_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\treceived_ctrl_in_velocityvar439dxdy = ' + this.VelocityController_SC_received_ctrl_in_velocityvar439dxdy_var;
	result += '\n\tctrl_in_velocity_var439 = ' + this.VelocityController_SC_ctrl_in_velocity_var439_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tctrl_in_position_var440 = ' + this.VelocityController_SC_Running_ctrl_in_position_var440_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\treceived_ctrl_in_positionxy = ' + this.VelocityController_SC_Running_received_ctrl_in_positionxy_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '';
	return result;
}

