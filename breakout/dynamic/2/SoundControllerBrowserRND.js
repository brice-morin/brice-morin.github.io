'use strict';


/*
 * Definition for type : SoundControllerBrowserRND
 */

function SoundControllerBrowserRND(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

SoundControllerBrowserRND.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('behavior');
	let _initial_Sound_behavior = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let Sound_behavior_INIT = new StateJS.State('INIT', this._statemachine);
	_initial_Sound_behavior.to(Sound_behavior_INIT);
	Sound_behavior_INIT.to(null).when((tonevar232) => {
		return tonevar232._port === 'sound' && tonevar232._msg === 'tonevar232';
	}).effect((tonevar232) => {
		this.Sound_behavior_INIT_received_sound_tonevar232_var = true;
		this.Sound_behavior_INIT_sound_tone_var232_var = tonevar232.var232;
		if(this.Sound_behavior_INIT_received_sound_tonetimefreq_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonevar232_var = false;
		this.Sound_behavior_INIT_received_sound_tonetimefreq_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonetimefreq_bis) => {
		return tonetimefreq_bis._port === 'sound' && tonetimefreq_bis._msg === 'tonetimefreq_bis';
	}).effect((tonetimefreq_bis) => {
		this.Sound_behavior_INIT_received_sound_tonetimefreq_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetimefreq_bis.time;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonetimefreq_bis.freq;
		if(this.Sound_behavior_INIT_received_sound_tonevar232_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetimefreq_var = false;
		this.Sound_behavior_INIT_received_sound_tonevar232_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonetimefreq) => {
		return tonetimefreq._port === 'sound' && tonetimefreq._msg === 'tonetimefreq';
	}).effect((tonetimefreq) => {
		this.Sound_behavior_INIT_received_sound_tonetimefreq_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetimefreq.time;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonetimefreq.freq;
		if(this.Sound_behavior_INIT_received_sound_tonevar232_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetimefreq_var = false;
		this.Sound_behavior_INIT_received_sound_tonevar232_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonevar232_bis) => {
		return tonevar232_bis._port === 'sound' && tonevar232_bis._msg === 'tonevar232_bis';
	}).effect((tonevar232_bis) => {
		this.Sound_behavior_INIT_received_sound_tonevar232_var = true;
		this.Sound_behavior_INIT_sound_tone_var232_var = tonevar232_bis.var232;
		if(this.Sound_behavior_INIT_received_sound_tonetimefreq_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonevar232_var = false;
		this.Sound_behavior_INIT_received_sound_tonetimefreq_var = false;
		
		}
	});
}
SoundControllerBrowserRND.prototype.tone = function(SoundControllerBrowser_tone_f_var, SoundControllerBrowser_tone_t_var) {
	this.SoundControllerBrowser_synth_var.triggerAttackRelease(SoundControllerBrowser_tone_f_var, SoundControllerBrowser_tone_t_var/1000)
}

SoundControllerBrowserRND.prototype.rnd = function() {
	return Math.floor(Math.random() * Math.floor(246)) + 5;
}

SoundControllerBrowserRND.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

SoundControllerBrowserRND.prototype._delete = function() {
	this._statemachine = null;
	this._behavior_instance = null;
	this.bus.removeAllListeners();
}

SoundControllerBrowserRND.prototype._init = function() {
	this._behavior_instance = new StateJS.Instance("behavior_instance", this._statemachine);
	this.ready = true;
}

SoundControllerBrowserRND.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._behavior_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

SoundControllerBrowserRND.prototype.receivetonevar232Onsound = function(var232, var306) {
	this._receive({_port:"sound", _msg:"tonevar232", var232:var232, var306:var306});
}

SoundControllerBrowserRND.prototype.receivetonetimefreqOnsound = function(freq, var307, time) {
	this._receive({_port:"sound", _msg:"tonetimefreq", freq:freq, var307:var307, time:time});
}

SoundControllerBrowserRND.prototype.receivetonevar232_bisOnsound = function(var232, var308) {
	this._receive({_port:"sound", _msg:"tonevar232_bis", var232:var232, var308:var308});
}

SoundControllerBrowserRND.prototype.receivetonetimefreq_bisOnsound = function(freq, var309, time) {
	this._receive({_port:"sound", _msg:"tonetimefreq_bis", freq:freq, var309:var309, time:time});
}

SoundControllerBrowserRND.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_var232_var = function(Sound_behavior_INIT_sound_tone_var232_var) {
	this.Sound_behavior_INIT_sound_tone_var232_var = Sound_behavior_INIT_sound_tone_var232_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonevar232_var = function(Sound_behavior_INIT_received_sound_tonevar232_var) {
	this.Sound_behavior_INIT_received_sound_tonevar232_var = Sound_behavior_INIT_received_sound_tonevar232_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonetimefreq_var = function(Sound_behavior_INIT_received_sound_tonetimefreq_var) {
	this.Sound_behavior_INIT_received_sound_tonetimefreq_var = Sound_behavior_INIT_received_sound_tonetimefreq_var;
}

SoundControllerBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '\n\tsound_tone_var232 = ' + this.Sound_behavior_INIT_sound_tone_var232_var;
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\treceived_sound_tonevar232 = ' + this.Sound_behavior_INIT_received_sound_tonevar232_var;
	result += '\n\treceived_sound_tonetimefreq = ' + this.Sound_behavior_INIT_received_sound_tonetimefreq_var;
	result += '';
	return result;
}

