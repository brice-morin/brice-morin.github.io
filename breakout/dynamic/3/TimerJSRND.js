'use strict';


/*
 * Definition for type : TimerJSRND
 */

function TimerJSRND(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

TimerJSRND.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SoftTimer');
	let _initial_TimerJS_SoftTimer = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let TimerJS_SoftTimer_default = new StateJS.State('default', this._statemachine);
	_initial_TimerJS_SoftTimer.to(TimerJS_SoftTimer_default);
	TimerJS_SoftTimer_default.to(null).when((timer_cancel) => {
		return timer_cancel._port === 'timer' && timer_cancel._msg === 'timer_cancel';
	}).effect((timer_cancel) => {
		this.cancel(timer_cancel.id);
	});
	TimerJS_SoftTimer_default.to(null).when((timer_start) => {
		return timer_start._port === 'timer' && timer_start._msg === 'timer_start' && (timer_start.time > 0);
	}).effect((timer_start) => {
		this.startTimer(timer_start.id, timer_start.time);
	});
	TimerJS_SoftTimer_default.to(null).when((timer_start) => {
		return timer_start._port === 'timer' && timer_start._msg === 'timer_start' && (timer_start.time === 0);
	}).effect((timer_start) => {
		setTimeout(() => this.bus.emit('timer?timer_timeout', 0x7F, timer_start.id, 0xD8), 0);
	});
}
TimerJSRND.prototype.startTimer = function(TimerJS_startTimer_id_var, TimerJS_startTimer_delay_var) {
	
		if (this.TimerJS_Timeouts_var[TimerJS_startTimer_id_var] != undefined) {
	
	this.cancel(TimerJS_startTimer_id_var);
	
		}
	
		this.TimerJS_Timeouts_var[TimerJS_startTimer_id_var] = setTimeout(() => {
	
	const id_const = TimerJS_startTimer_id_var;
	setTimeout(() => this.bus.emit('timer?timer_timeout', 0x53, id_const, 0x78), 0);
	
		this.TimerJS_Timeouts_var[TimerJS_startTimer_id_var] = undefined;
	}, TimerJS_startTimer_delay_var);
	
}

TimerJSRND.prototype.cancel = function(TimerJS_cancel_id_var) {
	
		if (this.TimerJS_Timeouts_var[TimerJS_cancel_id_var] != undefined) {
			clearTimeout(this.TimerJS_Timeouts_var[TimerJS_cancel_id_var]);
			this.TimerJS_Timeouts_var[TimerJS_cancel_id_var] = undefined;
		}
	
}

TimerJSRND.prototype.rnd = function() {
	return Math.floor(Math.random() * Math.floor(246)) + 5;
}

TimerJSRND.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

TimerJSRND.prototype._delete = function() {
	this._statemachine = null;
	this._SoftTimer_instance = null;
	this.bus.removeAllListeners();
}

TimerJSRND.prototype._init = function() {
	this._SoftTimer_instance = new StateJS.Instance("SoftTimer_instance", this._statemachine);
	this.ready = true;
}

TimerJSRND.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SoftTimer_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

TimerJSRND.prototype.receivetimer_startOntimer = function(var342, var318, id, time) {
	this._receive({_port:"timer", _msg:"timer_start", var342:var342, var318:var318, id:id, time:time});
}

TimerJSRND.prototype.receivetimer_cancelOntimer = function(id, var319, var343) {
	this._receive({_port:"timer", _msg:"timer_cancel", id:id, var319:var319, var343:var343});
}

TimerJSRND.prototype.initTimerJS_Timeouts_var = function(TimerJS_Timeouts_var) {
	this.TimerJS_Timeouts_var = TimerJS_Timeouts_var;
}

TimerJSRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tTimeouts = ' + this.TimerJS_Timeouts_var;
	result += '';
	return result;
}

