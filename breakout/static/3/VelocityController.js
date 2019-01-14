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
		setTimeout(() => this.bus.emit('clock?timer_start', 0x5E, 0xE0, 50, timerID_const), 0);
	});
	_initial_VelocityController_SC.to(VelocityController_SC_Running);
	this._statemachine.to(null).when((velocitydy) => {
		return velocitydy._port === 'ctrl_in' && velocitydy._msg === 'velocitydy';
	}).effect((velocitydy) => {
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydy.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocitydxval213_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydxval213_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((position_) => {
		return position_._port === 'ctrl_in' && position_._msg === 'position_';
	}).effect((position_) => {
		this.VelocityController_SC_Running_received_ctrl_in_position__var = true;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionxyval214_var) {
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
		setTimeout(() => this.bus.emit('controls?position_', 0xB1), 0);
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxyval214', posY_const, 0xC9, 0x98, posX_const), 0);
		this.VelocityController_SC_Running_received_ctrl_in_position__var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionxyval214_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionxyval214) => {
		return positionxyval214._port === 'ctrl_in' && positionxyval214._msg === 'positionxyval214';
	}).effect((positionxyval214) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionxyval214_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionxyval214.x;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionxyval214.y;
		this.VelocityController_SC_Running_ctrl_in_position_val214_var = positionxyval214.val214;
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
		setTimeout(() => this.bus.emit('controls?position_', 0x58), 0);
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxyval214', posY_const, 0xC9, 0x15, posX_const), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positionxyval214_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_position__var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydxval213) => {
		return velocitydxval213._port === 'ctrl_in' && velocitydxval213._msg === 'velocitydxval213';
	}).effect((velocitydxval213) => {
		this.VelocityController_SC_received_ctrl_in_velocitydxval213_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydxval213.dx;
		this.VelocityController_SC_ctrl_in_velocity_val213_var = velocitydxval213.val213;
		if(this.VelocityController_SC_received_ctrl_in_velocitydy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydxval213_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = false;
		
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
		setTimeout(() => this.bus.emit('controls?position_', 0xCF), 0);
		const posY_const = this.TimerController_posY_var;
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxyval214', posY_const, 0x25, 0xE0, posX_const), 0);
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

VelocityController.prototype.receivetimer_timeoutOnclock = function(id, val223, val200) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id, val223:val223, val200:val200});
}

VelocityController.prototype.receivevelocitydyOnctrl_in = function(dy, val248) {
	this._receive({_port:"ctrl_in", _msg:"velocitydy", dy:dy, val248:val248});
}

VelocityController.prototype.receivevelocitydxval213Onctrl_in = function(val249, dx, val213) {
	this._receive({_port:"ctrl_in", _msg:"velocitydxval213", val249:val249, dx:dx, val213:val213});
}

VelocityController.prototype.receiveposition_Onctrl_in = function(val250) {
	this._receive({_port:"ctrl_in", _msg:"position_", val250:val250});
}

VelocityController.prototype.receivepositionxyval214Onctrl_in = function(y, val214, val251, x) {
	this._receive({_port:"ctrl_in", _msg:"positionxyval214", y:y, val214:val214, val251:val251, x:x});
}

VelocityController.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_position__var = function(VelocityController_SC_Running_received_ctrl_in_position__var) {
	this.VelocityController_SC_Running_received_ctrl_in_position__var = VelocityController_SC_Running_received_ctrl_in_position__var;
}

VelocityController.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityController.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positionxyval214_var = function(VelocityController_SC_Running_received_ctrl_in_positionxyval214_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionxyval214_var = VelocityController_SC_Running_received_ctrl_in_positionxyval214_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocitydy_var = function(VelocityController_SC_received_ctrl_in_velocitydy_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydy_var = VelocityController_SC_received_ctrl_in_velocitydy_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_val214_var = function(VelocityController_SC_Running_ctrl_in_position_val214_var) {
	this.VelocityController_SC_Running_ctrl_in_position_val214_var = VelocityController_SC_Running_ctrl_in_position_val214_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_val213_var = function(VelocityController_SC_ctrl_in_velocity_val213_var) {
	this.VelocityController_SC_ctrl_in_velocity_val213_var = VelocityController_SC_ctrl_in_velocity_val213_var;
}

VelocityController.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityController.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityController.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocitydxval213_var = function(VelocityController_SC_received_ctrl_in_velocitydxval213_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydxval213_var = VelocityController_SC_received_ctrl_in_velocitydxval213_var;
}

VelocityController.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityController.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityController.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\treceived_ctrl_in_position_ = ' + this.VelocityController_SC_Running_received_ctrl_in_position__var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\treceived_ctrl_in_positionxyval214 = ' + this.VelocityController_SC_Running_received_ctrl_in_positionxyval214_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\treceived_ctrl_in_velocitydy = ' + this.VelocityController_SC_received_ctrl_in_velocitydy_var;
	result += '\n\tctrl_in_position_val214 = ' + this.VelocityController_SC_Running_ctrl_in_position_val214_var;
	result += '\n\tctrl_in_velocity_val213 = ' + this.VelocityController_SC_ctrl_in_velocity_val213_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\treceived_ctrl_in_velocitydxval213 = ' + this.VelocityController_SC_received_ctrl_in_velocitydxval213_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '';
	return result;
}

