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
		setTimeout(() => this.bus.emit('clock?timer_start', 50, 0xB4, timerID_const, 0x44), 0);
	});
	_initial_VelocityController_SC.to(VelocityController_SC_Running);
	this._statemachine.to(null).when((velocityval279dx) => {
		return velocityval279dx._port === 'ctrl_in' && velocityval279dx._msg === 'velocityval279dx';
	}).effect((velocityval279dx) => {
		this.VelocityController_SC_received_ctrl_in_velocityval279dx_var = true;
		this.VelocityController_SC_ctrl_in_velocity_val279_var = velocityval279dx.val279;
		this.VelocityController_SC_ctrl_in_velocity_dx_var = velocityval279dx.dx;
		if(this.VelocityController_SC_received_ctrl_in_velocitydy_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocityval279dx_var = false;
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = false;
		
		}
	});
	this._statemachine.to(null).when((velocitydy) => {
		return velocitydy._port === 'ctrl_in' && velocitydy._msg === 'velocitydy';
	}).effect((velocitydy) => {
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = true;
		this.VelocityController_SC_ctrl_in_velocity_dy_var = velocitydy.dy;
		if(this.VelocityController_SC_received_ctrl_in_velocityval279dx_var) {
		this.TimerController_dx_var = this.VelocityController_SC_ctrl_in_velocity_dx_var;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = this.VelocityController_SC_ctrl_in_velocity_dy_var;
		this.bus.emit('dy=', this.TimerController_dy_var);
		this.VelocityController_SC_received_ctrl_in_velocitydy_var = false;
		this.VelocityController_SC_received_ctrl_in_velocityval279dx_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positionval280x) => {
		return positionval280x._port === 'ctrl_in' && positionval280x._msg === 'positionval280x';
	}).effect((positionval280x) => {
		this.VelocityController_SC_Running_received_ctrl_in_positionval280x_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_val280_var = positionval280x.val280;
		this.VelocityController_SC_Running_ctrl_in_position_x_var = positionval280x.x;
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
		setTimeout(() => this.bus.emit('controls?positiony', posY_const, 0xB3), 0);
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionval280x', 0x5C, 0x9C, posX_const), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positionval280x_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = false;
		
		}
	});
	VelocityController_SC_Running.to(null).when((positiony) => {
		return positiony._port === 'ctrl_in' && positiony._msg === 'positiony';
	}).effect((positiony) => {
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = true;
		this.VelocityController_SC_Running_ctrl_in_position_y_var = positiony.y;
		if(this.VelocityController_SC_Running_received_ctrl_in_positionval280x_var) {
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
		setTimeout(() => this.bus.emit('controls?positiony', posY_const, 0x7A), 0);
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionval280x', 0x5C, 0x73, posX_const), 0);
		this.VelocityController_SC_Running_received_ctrl_in_positiony_var = false;
		this.VelocityController_SC_Running_received_ctrl_in_positionval280x_var = false;
		
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
		setTimeout(() => this.bus.emit('controls?positiony', posY_const, 0x4F), 0);
		const posX_const = this.TimerController_posX_var;
		setTimeout(() => this.bus.emit('controls?positionval280x', 0xE9, 0xAD, posX_const), 0);
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

VelocityController.prototype.receivetimer_timeoutOnclock = function(val266, val287, id) {
	this._receive({_port:"clock", _msg:"timer_timeout", val266:val266, val287:val287, id:id});
}

VelocityController.prototype.receivevelocitydyOnctrl_in = function(dy, val314) {
	this._receive({_port:"ctrl_in", _msg:"velocitydy", dy:dy, val314:val314});
}

VelocityController.prototype.receivevelocityval279dxOnctrl_in = function(val315, dx, val279) {
	this._receive({_port:"ctrl_in", _msg:"velocityval279dx", val315:val315, dx:dx, val279:val279});
}

VelocityController.prototype.receivepositionyOnctrl_in = function(y, val316) {
	this._receive({_port:"ctrl_in", _msg:"positiony", y:y, val316:val316});
}

VelocityController.prototype.receivepositionval280xOnctrl_in = function(val280, val317, x) {
	this._receive({_port:"ctrl_in", _msg:"positionval280x", val280:val280, val317:val317, x:x});
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_val279_var = function(VelocityController_SC_ctrl_in_velocity_val279_var) {
	this.VelocityController_SC_ctrl_in_velocity_val279_var = VelocityController_SC_ctrl_in_velocity_val279_var;
}

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocitydy_var = function(VelocityController_SC_received_ctrl_in_velocitydy_var) {
	this.VelocityController_SC_received_ctrl_in_velocitydy_var = VelocityController_SC_received_ctrl_in_velocitydy_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positionval280x_var = function(VelocityController_SC_Running_received_ctrl_in_positionval280x_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positionval280x_var = VelocityController_SC_Running_received_ctrl_in_positionval280x_var;
}

VelocityController.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityController.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_val280_var = function(VelocityController_SC_Running_ctrl_in_position_val280_var) {
	this.VelocityController_SC_Running_ctrl_in_position_val280_var = VelocityController_SC_Running_ctrl_in_position_val280_var;
}

VelocityController.prototype.initVelocityController_SC_Running_ctrl_in_position_x_var = function(VelocityController_SC_Running_ctrl_in_position_x_var) {
	this.VelocityController_SC_Running_ctrl_in_position_x_var = VelocityController_SC_Running_ctrl_in_position_x_var;
}

VelocityController.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
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

VelocityController.prototype.initVelocityController_SC_received_ctrl_in_velocityval279dx_var = function(VelocityController_SC_received_ctrl_in_velocityval279dx_var) {
	this.VelocityController_SC_received_ctrl_in_velocityval279dx_var = VelocityController_SC_received_ctrl_in_velocityval279dx_var;
}

VelocityController.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityController.prototype.initVelocityController_SC_ctrl_in_velocity_dy_var = function(VelocityController_SC_ctrl_in_velocity_dy_var) {
	this.VelocityController_SC_ctrl_in_velocity_dy_var = VelocityController_SC_ctrl_in_velocity_dy_var;
}

VelocityController.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityController.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityController.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityController.prototype.initVelocityController_SC_Running_received_ctrl_in_positiony_var = function(VelocityController_SC_Running_received_ctrl_in_positiony_var) {
	this.VelocityController_SC_Running_received_ctrl_in_positiony_var = VelocityController_SC_Running_received_ctrl_in_positiony_var;
}

VelocityController.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tctrl_in_velocity_val279 = ' + this.VelocityController_SC_ctrl_in_velocity_val279_var;
	result += '\n\treceived_ctrl_in_velocitydy = ' + this.VelocityController_SC_received_ctrl_in_velocitydy_var;
	result += '\n\treceived_ctrl_in_positionval280x = ' + this.VelocityController_SC_Running_received_ctrl_in_positionval280x_var;
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\tctrl_in_position_val280 = ' + this.VelocityController_SC_Running_ctrl_in_position_val280_var;
	result += '\n\tctrl_in_position_x = ' + this.VelocityController_SC_Running_ctrl_in_position_x_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '\n\tctrl_in_position_y = ' + this.VelocityController_SC_Running_ctrl_in_position_y_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\tctrl_in_velocity_dx = ' + this.VelocityController_SC_ctrl_in_velocity_dx_var;
	result += '\n\treceived_ctrl_in_velocityval279dx = ' + this.VelocityController_SC_received_ctrl_in_velocityval279dx_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tctrl_in_velocity_dy = ' + this.VelocityController_SC_ctrl_in_velocity_dy_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\treceived_ctrl_in_positiony = ' + this.VelocityController_SC_Running_received_ctrl_in_positiony_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '';
	return result;
}

