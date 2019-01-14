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
		setTimeout(() => this.bus.emit('clock?timer_start', 0x58, 50, 0x4A, timerID_const), 0);
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
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx', posX_const, posY_const, 0x07), 0);
		setTimeout(() => this.bus.emit('controls?positionval16', 0x6A, 0x4B), 0);
	});
	VelocityController_SC_Running.to(null).when((positionval16) => {
		return positionval16._port === 'ctrl_in' && positionval16._msg === 'positionval16';
	}).effect((positionval16) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionval16_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_val16_var = positionval16.val16;
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
		setTimeout(() => this.bus.emit('controls?positionval16', 0x1C, 0x28), 0);
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx', posX_const, posY_const, 0xCC), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positionval16_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityval15) => {
		return velocityval15._port === 'ctrl_in' && velocityval15._msg === 'velocityval15';
	}).effect((velocityval15) => {
		this.VelocityController_SC_received_ctrl_in_velocityval15_var = true;
		this.VelocityController_SC_ctrl_in_velocity_val15_var = velocityval15.val15;
		if(this.VelocityController_SC_received_ctrl_in_velocitydxdy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityval15_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydxdy) => {
		return velocitydxdy._port === 'ctrl_in' && velocitydxdy._msg === 'velocitydxdy';
	}).effect((velocitydxdy) => {
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocitydxdy.dx;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydxdy.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocityval15_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityval15_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionyx) => {
		return positionyx._port === 'ctrl_in' && positionyx._msg === 'positionyx';
	}).effect((positionyx) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positionyx.y;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionyx.x;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionval16_var) {
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
		const posX_const = this.TimerController_posX_var;
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positionyx', posX_const, posY_const, 0xC3), 0);
		setTimeout(() => this.bus.emit('controls?positionval16', 0x86, 0x28), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionval16_var = false;
		
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

VelocityController.prototype.receivetimer_timeoutOnclock = function(val2, val24, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", val2:val2, val24:val24, id:id});
}

VelocityController.prototype.receivevelocityval15Onctrl_in = function(val52, val15) {
	this._receive({_port:"ctrl_in", _msg:"velocityval15", val52:val52, val15:val15});
}

VelocityController.prototype.receivevelocitydxdyOnctrl_in = function(dy, val53, dx) {
	this._receive({_port:"ctrl_in", _msg:"velocitydxdy", dy:dy, val53:val53, dx:dx});
}

VelocityController.prototype.receivepositionval16Onctrl_in = function(val50, val16) {
	this._receive({_port:"ctrl_in", _msg:"positionval16", val50:val50, val16:val16});
}

VelocityController.prototype.receivepositionyxOnctrl_in = function(x, y, val51) {
	this._receive({_port:"ctrl_in", _msg:"positionyx", x:x, y:y, val51:val51});
}

VelocityController.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positionval16_var = function(VelocityController_SC_Running_received_ctrl_in_positionval16_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionval16_var = VelocityController_SC_Running_received_ctrl_in_positionval16_var;
}

VelocityController.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityController.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positionyx_var = function(VelocityController_SC_Running_received_ctrl_in_positionyx_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionyx_var = VelocityController_SC_Running_received_ctrl_in_positionyx_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_val15_var = function(VelocityController_SC_ctrl_in_velocity_val15_var) {
	this.VelocityController_SC_ctrl_in_velocity_val15_var = VelocityController_SC_ctrl_in_velocity_val15_var;
}

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocityval15_var = function(VelocityController_SC_received_ctrl_in_velocityval15_var) {
	this.VelocityController_SC_received_ctrl_in_velocityval15_var = VelocityController_SC_received_ctrl_in_velocityval15_var;
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

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocitydxdy_var = function(VelocityController_SC_received_ctrl_in_velocitydxdy_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydxdy_var = VelocityController_SC_received_ctrl_in_velocitydxdy_var;
}

VelocityController.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityController.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_val16_var = function(VelocityController_SC_Running_ctrl_in_position_val16_var) {
	this.VelocityController_SC_Running_ctrl_in_position_val16_var = VelocityController_SC_Running_ctrl_in_position_val16_var;
}

VelocityController.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\treceived_ctrl_in_positionval16 = ' + this.VelocityController_SC_Running_received_ctrl_in_positionval16_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\treceived_ctrl_in_positionyx = ' + this.VelocityController_SC_Running_received_ctrl_in_positionyx_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tctrl_in_velocity_val15 = ' + this.VelocityController_SC_ctrl_in_velocity_val15_var;
	result += '\n\treceived_ctrl_in_velocityval15 = ' + this.VelocityController_SC_received_ctrl_in_velocityval15_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\treceived_ctrl_in_velocitydxdy = ' + this.VelocityController_SC_received_ctrl_in_velocitydxdy_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tctrl_in_position_val16 = ' + this.VelocityController_SC_Running_ctrl_in_position_val16_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '';
	return result;
}

