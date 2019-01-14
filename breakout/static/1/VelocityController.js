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
		setTimeout(() => this.bus.emit('clock?timer_start', timerID_const, 50, 0xE6, 0x5F), 0);
	});
	_initial_VelocityController_SC.to(VelocityController_SC_Running);
	VelocityController_SC_Running.to(null).when((positiony) => {
		return positiony._port === 'ctrl_in' && positiony._msg === 'positiony';
	}).effect((positiony) => {
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positiony.y;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionxval82_var) {
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
		setTimeout(() => this.bus.emit('controls?positionxval82', 0xE5, posX_const, 0x3F), 0);
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony', 0x9D, posY_const), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionxval82_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionxval82) => {
		return positionxval82._port === 'ctrl_in' && positionxval82._msg === 'positionxval82';
	}).effect((positionxval82) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionxval82_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionxval82.x;
		this.VelocityController_SC_Running_ctrl_in_position_val82_var = positionxval82.val82;
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
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony', 0x9F, posY_const), 0);
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxval82', 0x7D, posX_const, 0x3F), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positionxval82_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocityval81dx) => {
		return velocityval81dx._port === 'ctrl_in' && velocityval81dx._msg === 'velocityval81dx';
	}).effect((velocityval81dx) => {
		this.VelocityController_SC_received_ctrl_in_velocityval81dx_var = true;
		this.VelocityController_SC_ctrl_in_velocity_val81_var = velocityval81dx.val81;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocityval81dx.dx;
		if(this.VelocityController_SC_received_ctrl_in_velocitydy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityval81dx_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydy) => {
		return velocitydy._port === 'ctrl_in' && velocitydy._msg === 'velocitydy';
	}).effect((velocitydy) => {
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydy.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocityval81dx_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityval81dx_var = false;
		
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
		const posY_const = this.TimerController_posY_var;
		setTimeout(() => this.bus.emit('controls?positiony', 0xF7, posY_const), 0);
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionxval82', 0xD9, posX_const, 0xD0), 0);
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

VelocityController.prototype.receivetimer_timeoutOnclock = function(val89, id, val68) {
	this._receive({_port:"clock", _msg:"timer_timeout", val89:val89, id:id, val68:val68});
}

VelocityController.prototype.receivevelocitydyOnctrl_in = function(val116, dy) {
	this._receive({_port:"ctrl_in", _msg:"velocitydy", val116:val116, dy:dy});
}

VelocityController.prototype.receivevelocityval81dxOnctrl_in = function(dx, val81, val117) {
	this._receive({_port:"ctrl_in", _msg:"velocityval81dx", dx:dx, val81:val81, val117:val117});
}

VelocityController.prototype.receivepositionyOnctrl_in = function(val118, y) {
	this._receive({_port:"ctrl_in", _msg:"positiony", val118:val118, y:y});
}

VelocityController.prototype.receivepositionxval82Onctrl_in = function(val119, x, val82) {
	this._receive({_port:"ctrl_in", _msg:"positionxval82", val119:val119, x:x, val82:val82});
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_val81_var = function(VelocityController_SC_ctrl_in_velocity_val81_var) {
	this.VelocityController_SC_ctrl_in_velocity_val81_var = VelocityController_SC_ctrl_in_velocity_val81_var;
}

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocitydy_var = function(VelocityController_SC_received_ctrl_in_velocitydy_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydy_var = VelocityController_SC_received_ctrl_in_velocitydy_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positionxval82_var = function(VelocityController_SC_Running_received_ctrl_in_positionxval82_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionxval82_var = VelocityController_SC_Running_received_ctrl_in_positionxval82_var;
}

VelocityController.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_val82_var = function(VelocityController_SC_Running_ctrl_in_position_val82_var) {
	this.VelocityController_SC_Running_ctrl_in_position_val82_var = VelocityController_SC_Running_ctrl_in_position_val82_var;
}

VelocityController.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocityval81dx_var = function(VelocityController_SC_received_ctrl_in_velocityval81dx_var) {
	this.VelocityController_SC_received_ctrl_in_velocityval81dx_var = VelocityController_SC_received_ctrl_in_velocityval81dx_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_y_var = function(VelocityController_SC_Running_ctrl_in_position_y_var) {
	this.VelocityController_SC_Running_ctrl_in_position_y_var = VelocityController_SC_Running_ctrl_in_position_y_var;
}

VelocityController.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dx_var = function(VelocityController_SC_ctrl_in_velocity_dx_var) {
	this.VelocityController_SC_ctrl_in_velocity_dx_var = VelocityController_SC_ctrl_in_velocity_dx_var;
}

VelocityController.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityController.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityController.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityController.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityController.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positiony_var = function(VelocityController_SC_Running_received_ctrl_in_positiony_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positiony_var = VelocityController_SC_Running_received_ctrl_in_positiony_var;
}

VelocityController.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tctrl_in_velocity_val81 = ' + this.VelocityController_SC_ctrl_in_velocity_val81_var;
	result += '\n\treceived_ctrl_in_velocitydy = ' + this.VelocityController_SC_received_ctrl_in_velocitydy_var;
	result += '\n\treceived_ctrl_in_positionxval82 = ' + this.VelocityController_SC_Running_received_ctrl_in_positionxval82_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tctrl_in_position_val82 = ' + this.VelocityController_SC_Running_ctrl_in_position_val82_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\treceived_ctrl_in_velocityval81dx = ' + this.VelocityController_SC_received_ctrl_in_velocityval81dx_var;
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\treceived_ctrl_in_positiony = ' + this.VelocityController_SC_Running_received_ctrl_in_positiony_var;
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '';
	return result;
}

