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
		setTimeout(() => this.bus.emit('clock?timer_start', 50, timerID_const, 0x6A, 0xD3), 0);
	});
	_initial_VelocityController_SC.to(VelocityController_SC_Running);
	this._statemachine.to(null).when((velocitydydx_bis) => {
		return velocitydydx_bis._port === 'ctrl_in' && velocitydydx_bis._msg === 'velocitydydx_bis';
	}).effect((velocitydydx_bis) => {
		this.VelocityController_SC_received_ctrl_in_velocitydydx_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydydx_bis.dy;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydydx_bis.dx;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar121_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydydx_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar121_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((position__bis) => {
		return position__bis._port === 'ctrl_in' && position__bis._msg === 'position__bis';
	}).effect((position__bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_position__var = true;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var) {
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
		if(190 < 197) {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122', posY_const, 0x23, 0x10, posX_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122_bis', posY_const, 0x23, posX_const, 0xC0), 0);
		
		}
		if(187 < 185) {
		setTimeout(() => this.bus.emit('controls?position_', 0xF9), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?position__bis', 0xD9), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_position__var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydydx) => {
		return velocitydydx._port === 'ctrl_in' && velocitydydx._msg === 'velocitydydx';
	}).effect((velocitydydx) => {
		this.VelocityController_SC_received_ctrl_in_velocitydydx_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydydx.dy;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydydx.dx;
		if(this.VelocityController_SC_received_ctrl_in_velocityvar121_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydydx_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityvar121_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((position_) => {
		return position_._port === 'ctrl_in' && position_._msg === 'position_';
	}).effect((position_) => {
		this.VelocityController_SC_Running_received_ctrl_in_position__var = true;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var) {
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
		if(190 < 197) {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122', posY_const, 0x23, 0xA3, posX_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122_bis', posY_const, 0x23, posX_const, 0x3F), 0);
		
		}
		if(187 < 185) {
		setTimeout(() => this.bus.emit('controls?position_', 0x50), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?position__bis', 0x0F), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_position__var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionyxvar122) => {
		return positionyxvar122._port === 'ctrl_in' && positionyxvar122._msg === 'positionyxvar122';
	}).effect((positionyxvar122) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionyxvar122.y;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionyxvar122.x;
		this.VelocityController_SC_Running_ctrl_in_position_var122_var = positionyxvar122.var122;
		if(this.VelocityController_SC_Running_received_ctrl_in_position__var) {
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
		if(172 < 68) {
		setTimeout(() => this.bus.emit('controls?position_', 0xBA), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?position__bis', 0xFD), 0);
		
		}
		if(160 < 102) {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122', posY_const, 0x23, 0x84, posX_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122_bis', posY_const, 0x23, posX_const, 0x9D), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_position__var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar121) => {
		return velocityvar121._port === 'ctrl_in' && velocityvar121._msg === 'velocityvar121';
	}).effect((velocityvar121) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar121_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var121_var = velocityvar121.var121;
		if(this.VelocityController_SC_received_ctrl_in_velocitydydx_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar121_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydydx_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionyxvar122_bis) => {
		return positionyxvar122_bis._port === 'ctrl_in' && positionyxvar122_bis._msg === 'positionyxvar122_bis';
	}).effect((positionyxvar122_bis) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionyxvar122_bis.y;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionyxvar122_bis.x;
		this.VelocityController_SC_Running_ctrl_in_position_var122_var = positionyxvar122_bis.var122;
		if(this.VelocityController_SC_Running_received_ctrl_in_position__var) {
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
		if(172 < 68) {
		setTimeout(() => this.bus.emit('controls?position_', 0x52), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?position__bis', 0x71), 0);
		
		}
		if(160 < 102) {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122', posY_const, 0x23, 0xEE, posX_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122_bis', posY_const, 0x23, posX_const, 0x75), 0);
		
		}
		this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_position__var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityvar121_bis) => {
		return velocityvar121_bis._port === 'ctrl_in' && velocityvar121_bis._msg === 'velocityvar121_bis';
	}).effect((velocityvar121_bis) => {
		this.VelocityController_SC_received_ctrl_in_velocityvar121_var = true;
		this.VelocityController_SC_ctrl_in_velocity_var121_var = velocityvar121_bis.var121;
		if(this.VelocityController_SC_received_ctrl_in_velocitydydx_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityvar121_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydydx_var = false;
		
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
		if(235 < 127) {
		setTimeout(() => this.bus.emit('controls?position_', 0x89), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?position__bis', 0x1B), 0);
		
		}
		if(20 < 99) {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122', posY_const, 0xB1, 0x08, posX_const), 0);
		
		} else {
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyxvar122_bis', posY_const, 0xB1, posX_const, 0xA4), 0);
		
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

VelocityControllerRND.prototype.receivetimer_timeoutOnclock = function(var131, var108, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", var131:var131, var108:var108, id:id});
}

VelocityControllerRND.prototype.receivevelocityvar121Onctrl_in = function(var182, var121) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar121", var182:var182, var121:var121});
}

VelocityControllerRND.prototype.receivevelocitydydxOnctrl_in = function(dy, var183, dx) {
	this._receive({_port:"ctrl_in", _msg:"velocitydydx", dy:dy, var183:var183, dx:dx});
}

VelocityControllerRND.prototype.receiveposition_Onctrl_in = function(var180) {
	this._receive({_port:"ctrl_in", _msg:"position_", var180:var180});
}

VelocityControllerRND.prototype.receivepositionyxvar122Onctrl_in = function(y, var122, var181, x) {
	this._receive({_port:"ctrl_in", _msg:"positionyxvar122", y:y, var122:var122, var181:var181, x:x});
}

VelocityControllerRND.prototype.receivevelocityvar121_bisOnctrl_in = function(var186, var121) {
	this._receive({_port:"ctrl_in", _msg:"velocityvar121_bis", var186:var186, var121:var121});
}

VelocityControllerRND.prototype.receivevelocitydydx_bisOnctrl_in = function(dy, dx, var187) {
	this._receive({_port:"ctrl_in", _msg:"velocitydydx_bis", dy:dy, dx:dx, var187:var187});
}

VelocityControllerRND.prototype.receiveposition__bisOnctrl_in = function(var184) {
	this._receive({_port:"ctrl_in", _msg:"position__bis", var184:var184});
}

VelocityControllerRND.prototype.receivepositionyxvar122_bisOnctrl_in = function(y, var122, x, var185) {
	this._receive({_port:"ctrl_in", _msg:"positionyxvar122_bis", y:y, var122:var122, x:x, var185:var185});
}

VelocityControllerRND.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityControllerRND.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityControllerRND.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityControllerRND.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_var121_var = function(VelocityController_SC_ctrl_in_velocity_var121_var) {
	this.VelocityController_SC_ctrl_in_velocity_var121_var = VelocityController_SC_ctrl_in_velocity_var121_var;
}

VelocityControllerRND.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_var122_var = function(VelocityController_SC_Running_ctrl_in_position_var122_var) {
	this.VelocityController_SC_Running_ctrl_in_position_var122_var = VelocityController_SC_Running_ctrl_in_position_var122_var;
}

VelocityControllerRND.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocityvar121_var = function(VelocityController_SC_received_ctrl_in_velocityvar121_var) {
	this.VelocityController_SC_received_ctrl_in_velocityvar121_var = VelocityController_SC_received_ctrl_in_velocityvar121_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_positionyxvar122_var = function(VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var = VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_received_ctrl_in_velocitydydx_var = function(VelocityController_SC_received_ctrl_in_velocitydydx_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydydx_var = VelocityController_SC_received_ctrl_in_velocitydydx_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
}

VelocityControllerRND.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityControllerRND.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityControllerRND.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityControllerRND.prototype.initVelocityController_SC_Running_received_ctrl_in_position__var = function(VelocityController_SC_Running_received_ctrl_in_position__var) {
	this.VelocityController_SC_Running_received_ctrl_in_position__var = VelocityController_SC_Running_received_ctrl_in_position__var;
}

VelocityControllerRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\tctrl_in_velocity_var121 = ' + this.VelocityController_SC_ctrl_in_velocity_var121_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tctrl_in_position_var122 = ' + this.VelocityController_SC_Running_ctrl_in_position_var122_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\treceived_ctrl_in_velocityvar121 = ' + this.VelocityController_SC_received_ctrl_in_velocityvar121_var;
	result += '\n\treceived_ctrl_in_positionyxvar122 = ' + this.VelocityController_SC_Running_received_ctrl_in_positionyxvar122_var;
	result += '\n\treceived_ctrl_in_velocitydydx = ' + this.VelocityController_SC_received_ctrl_in_velocitydydx_var;
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\treceived_ctrl_in_position_ = ' + this.VelocityController_SC_Running_received_ctrl_in_position__var;
	result += '';
	return result;
}

