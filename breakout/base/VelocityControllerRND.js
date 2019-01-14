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
		setTimeout(() => this.bus.emit('clock?timer_start', timerID_const, 50), 0);
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
		setTimeout(() => this.bus.emit('controls?position', posX_const, posY_const), 0);
	});
	VelocityController_SC_Running.to(null).when((position) => {
		return position._port === 'ctrl_in' && position._msg === 'position';
	}).effect((position) => {
		this.TimerController_posX_var = position.x;
		this.bus.emit('posX=', this.TimerController_posX_var);
		this.TimerController_posY_var = position.y;
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
		setTimeout(() => this.bus.emit('controls?position', posX_const, posY_const), 0);
	});
	this._statemachine.to(null).when((velocity) => {
		return velocity._port === 'ctrl_in' && velocity._msg === 'velocity';
	}).effect((velocity) => {
		this.TimerController_dx_var = velocity.dx;
		this.bus.emit('dx=', this.TimerController_dx_var);
		this.TimerController_dy_var = velocity.dy;
		this.bus.emit('dy=', this.TimerController_dy_var);
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

VelocityControllerRND.prototype.receivetimer_timeoutOnclock = function(id) {
	this._receive({_port:"clock", _msg:"timer_timeout", id:id});
}

VelocityControllerRND.prototype.receivevelocityOnctrl_in = function(dx, dy) {
	this._receive({_port:"ctrl_in", _msg:"velocity", dx:dx, dy:dy});
}

VelocityControllerRND.prototype.receivepositionOnctrl_in = function(x, y) {
	this._receive({_port:"ctrl_in", _msg:"position", x:x, y:y});
}

VelocityControllerRND.prototype.initTimerController_YMIN_var = function(TimerController_YMIN_var) {
	this.TimerController_YMIN_var = TimerController_YMIN_var;
}

VelocityControllerRND.prototype.initVelocityController_timerID_var = function(VelocityController_timerID_var) {
	this.VelocityController_timerID_var = VelocityController_timerID_var;
}

VelocityControllerRND.prototype.initTimerController_YMAX_var = function(TimerController_YMAX_var) {
	this.TimerController_YMAX_var = TimerController_YMAX_var;
}

VelocityControllerRND.prototype.initTimerController_posX_var = function(TimerController_posX_var) {
	this.TimerController_posX_var = TimerController_posX_var;
}

VelocityControllerRND.prototype.initTimerController_dx_var = function(TimerController_dx_var) {
	this.TimerController_dx_var = TimerController_dx_var;
}

VelocityControllerRND.prototype.initTimerController_dy_var = function(TimerController_dy_var) {
	this.TimerController_dy_var = TimerController_dy_var;
}

VelocityControllerRND.prototype.initTimerController_posY_var = function(TimerController_posY_var) {
	this.TimerController_posY_var = TimerController_posY_var;
}

VelocityControllerRND.prototype.initTimerController_XMAX_var = function(TimerController_XMAX_var) {
	this.TimerController_XMAX_var = TimerController_XMAX_var;
}

VelocityControllerRND.prototype.initTimerController_XMIN_var = function(TimerController_XMIN_var) {
	this.TimerController_XMIN_var = TimerController_XMIN_var;
}

VelocityControllerRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tYMIN = ' + this.TimerController_YMIN_var;
	result += '\n\ttimerID = ' + this.VelocityController_timerID_var;
	result += '\n\tYMAX = ' + this.TimerController_YMAX_var;
	result += '\n\tposX = ' + this.TimerController_posX_var;
	result += '\n\tdx = ' + this.TimerController_dx_var;
	result += '\n\tdy = ' + this.TimerController_dy_var;
	result += '\n\tposY = ' + this.TimerController_posY_var;
	result += '\n\tXMAX = ' + this.TimerController_XMAX_var;
	result += '\n\tXMIN = ' + this.TimerController_XMIN_var;
	result += '';
	return result;
}

