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
	Sound_behavior_INIT.to(null).when((tonefreq) => {
		return tonefreq._port === 'sound' && tonefreq._msg === 'tonefreq';
	}).effect((tonefreq) => {
		this.Sound_behavior_INIT_received_sound_tonefreq_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreq.freq;
		if(this.Sound_behavior_INIT_received_sound_tonetimevar20_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreq_var = false;
		this.Sound_behavior_INIT_received_sound_tonetimevar20_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonefreq_bis) => {
		return tonefreq_bis._port === 'sound' && tonefreq_bis._msg === 'tonefreq_bis';
	}).effect((tonefreq_bis) => {
		this.Sound_behavior_INIT_received_sound_tonefreq_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreq_bis.freq;
		if(this.Sound_behavior_INIT_received_sound_tonetimevar20_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreq_var = false;
		this.Sound_behavior_INIT_received_sound_tonetimevar20_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonetimevar20) => {
		return tonetimevar20._port === 'sound' && tonetimevar20._msg === 'tonetimevar20';
	}).effect((tonetimevar20) => {
		this.Sound_behavior_INIT_received_sound_tonetimevar20_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetimevar20.time;
		this.Sound_behavior_INIT_sound_tone_var20_var = tonetimevar20.var20;
		if(this.Sound_behavior_INIT_received_sound_tonefreq_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetimevar20_var = false;
		this.Sound_behavior_INIT_received_sound_tonefreq_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonetimevar20_bis) => {
		return tonetimevar20_bis._port === 'sound' && tonetimevar20_bis._msg === 'tonetimevar20_bis';
	}).effect((tonetimevar20_bis) => {
		this.Sound_behavior_INIT_received_sound_tonetimevar20_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetimevar20_bis.time;
		this.Sound_behavior_INIT_sound_tone_var20_var = tonetimevar20_bis.var20;
		if(this.Sound_behavior_INIT_received_sound_tonefreq_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetimevar20_var = false;
		this.Sound_behavior_INIT_received_sound_tonefreq_var = false;
		
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

SoundControllerBrowserRND.prototype.receivetonetimevar20Onsound = function(var94, time, var20) {
	this._receive({_port:"sound", _msg:"tonetimevar20", var94:var94, time:time, var20:var20});
}

SoundControllerBrowserRND.prototype.receivetonefreqOnsound = function(freq, var95) {
	this._receive({_port:"sound", _msg:"tonefreq", freq:freq, var95:var95});
}

SoundControllerBrowserRND.prototype.receivetonetimevar20_bisOnsound = function(time, var96, var20) {
	this._receive({_port:"sound", _msg:"tonetimevar20_bis", time:time, var96:var96, var20:var20});
}

SoundControllerBrowserRND.prototype.receivetonefreq_bisOnsound = function(freq, var97) {
	this._receive({_port:"sound", _msg:"tonefreq_bis", freq:freq, var97:var97});
}

SoundControllerBrowserRND.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonetimevar20_var = function(Sound_behavior_INIT_received_sound_tonetimevar20_var) {
	this.Sound_behavior_INIT_received_sound_tonetimevar20_var = Sound_behavior_INIT_received_sound_tonetimevar20_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_var20_var = function(Sound_behavior_INIT_sound_tone_var20_var) {
	this.Sound_behavior_INIT_sound_tone_var20_var = Sound_behavior_INIT_sound_tone_var20_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonefreq_var = function(Sound_behavior_INIT_received_sound_tonefreq_var) {
	this.Sound_behavior_INIT_received_sound_tonefreq_var = Sound_behavior_INIT_received_sound_tonefreq_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '\n\treceived_sound_tonetimevar20 = ' + this.Sound_behavior_INIT_received_sound_tonetimevar20_var;
	result += '\n\tsound_tone_var20 = ' + this.Sound_behavior_INIT_sound_tone_var20_var;
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\treceived_sound_tonefreq = ' + this.Sound_behavior_INIT_received_sound_tonefreq_var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '';
	return result;
}

