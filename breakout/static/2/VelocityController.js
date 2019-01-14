'use strict';


/*
 * Definition for type : VelocityController
 */

function VelocityController(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

VelocityController.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SC');
	let _initial_VelocityController_SC = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let VelocityController_SC_Running = new StateJS.State('Running', this._statemachine).entry(() => {
		const timerID_const = this.VelocityController_timerID_var;
		setTimeout(() => this.bus.emit('clock?timer_start', timerID_const, 50, 0xC7, 0xF5), 0);
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
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyx', posY_const, posX_const, 0x5B), 0);
		setTimeout(() => this.bus.emit('controls?positionval148', 0x80, 0x95), 0);
	});
	this._statemachine.to(null).when((velocity_) => {
		return velocity_._port === 'ctrl_in' && velocity_._msg === 'velocity_';
	}).effect((velocity_) => {
		this.VelocityController_SC_received_ctrl_in_velocity__var = true;
		if(this.VelocityController_SC_received_ctrl_in_velocitydyval147dx_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydyval147dx_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionval148) => {
		return positionval148._port === 'ctrl_in' && positionval148._msg === 'positionval148';
	}).effect((positionval148) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionval148_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_val148_var = positionval148.val148;
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
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyx', posY_const, posX_const, 0x61), 0);
		setTimeout(() => this.bus.emit('controls?positionval148', 0xF4, 0xEE), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positionval148_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionyx) => {
		return positionyx._port === 'ctrl_in' && positionyx._msg === 'positionyx';
	}).effect((positionyx) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionyx.y;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionyx.x;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionval148_var) {
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
		setTimeout(() => this.bus.emit('controls?positionval148', 0xF4, 0xF0), 0);
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionyx', posY_const, posX_const, 0xB0), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionval148_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydyval147dx) => {
		return velocitydyval147dx._port === 'ctrl_in' && velocitydyval147dx._msg === 'velocitydyval147dx';
	}).effect((velocitydyval147dx) => {
		this.VelocityController_SC_received_ctrl_in_velocitydyval147dx_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydyval147dx.dy;
		this.VelocityController_SC_ctrl_in_velocity_val147_var = velocitydyval147dx.val147;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydyval147dx.dx;
		if(this.VelocityController_SC_received_ctrl_in_velocity__var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydyval147dx_var = false;
		this.VelocityController_SC_received_ctrl_in_velocity__var = false;
		
		}
	});
}
VelocityController.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

VelocityController.prototype._delete = function() {
	this._statemachine = null;
	this._SC_instance = null;
	this.bus.removeAllListeners();
}

VelocityController.prototype._init = function() {
	this._SC_instance = new StateJS.Instance("SC_instance", this._statemachine);
	this.ready = true;
}

VelocityController.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SC_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

VelocityController.prototype.receivetimer_timeoutOnclock = function(id, val134, val157) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, val134:val134, val157:val157});
}

VelocityController.prototype.receivevelocity_Onctrl_in = function(val184) {
	this._receive({_port:"ctrl_in", _msg:"velocity_", val184:val184});
}

VelocityController.prototype.receivevelocitydyval147dxOnctrl_in = function(dy, val147, val185, dx) {
	this._receive({_port:"ctrl_in", _msg:"velocitydyval147dx", dy:dy, val147:val147, val185:val185, dx:dx});
}

VelocityController.prototype.receivepositionval148Onctrl_in = function(val148, val182) {
	this._receive({_port:"ctrl_in", _msg:"positionval148", val148:val148, val182:val182});
}

VelocityController.prototype.receivepositionyxOnctrl_in = function(y, x, val183) {
	this._receive({_port:"ctrl_in", _msg:"positionyx", y:y, x:x, val183:val183});
}

VelocityController.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityController.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_val147_var = function(VelocityController_SC_ctrl_in_velocity_val147_var) {
	this.VelocityController_SC_ctrl_in_velocity_val147_var = VelocityController_SC_ctrl_in_velocity_val147_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positionyx_var = function(VelocityController_SC_Running_received_ctrl_in_positionyx_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = VelocityController_SC_Running_received_ctrl_in_positionyx_var;
}

VelocityController.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_val148_var = function(VelocityController_SC_Running_ctrl_in_position_val148_var) {
	this.VelocityController_SC_Running_ctrl_in_position_val148_var = VelocityController_SC_Running_ctrl_in_position_val148_var;
}

VelocityController.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityController.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positionval148_var = function(VelocityController_SC_Running_received_ctrl_in_positionval148_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionval148_var = VelocityController_SC_Running_received_ctrl_in_positionval148_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocity__var = function(VelocityController_SC_received_ctrl_in_velocity__var) {
	this.VelocityController_SC_received_ctrl_in_velocity__var = VelocityController_SC_received_ctrl_in_velocity__var;
}

VelocityController.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityController.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocitydyval147dx_var = function(VelocityController_SC_received_ctrl_in_velocitydyval147dx_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydyval147dx_var = VelocityController_SC_received_ctrl_in_velocitydyval147dx_var;
}

VelocityController.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityController.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
}

VelocityController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\tctrl_in_velocity_val147 = ' + this.VelocityController_SC_ctrl_in_velocity_val147_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\treceived_ctrl_in_positionyx = ' + this.VelocityController_SC_Running_received_ctrl_in_positionyx_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\tctrl_in_position_val148 = ' + this.VelocityController_SC_Running_ctrl_in_position_val148_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\treceived_ctrl_in_positionval148 = ' + this.VelocityController_SC_Running_received_ctrl_in_positionval148_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\treceived_ctrl_in_velocity_ = ' + this.VelocityController_SC_received_ctrl_in_velocity__var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\treceived_ctrl_in_velocitydyval147dx = ' + this.VelocityController_SC_received_ctrl_in_velocitydyval147dx_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '';
	return result;
}

