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
	Sound_behavior_INIT.to(null).when((tonevar444_bis) => {
		return tonevar444_bis._port === 'sound' && tonevar444_bis._msg === 'tonevar444_bis';
	}).effect((tonevar444_bis) => {
		this.Sound_behavior_INIT_received_sound_tonevar444_var = true;
		this.Sound_behavior_INIT_sound_tone_var444_var = tonevar444_bis.var444;
		if(this.Sound_behavior_INIT_received_sound_tonefreqtime_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonevar444_var = false;
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonevar444) => {
		return tonevar444._port === 'sound' && tonevar444._msg === 'tonevar444';
	}).effect((tonevar444) => {
		this.Sound_behavior_INIT_received_sound_tonevar444_var = true;
		this.Sound_behavior_INIT_sound_tone_var444_var = tonevar444.var444;
		if(this.Sound_behavior_INIT_received_sound_tonefreqtime_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonevar444_var = false;
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonefreqtime) => {
		return tonefreqtime._port === 'sound' && tonefreqtime._msg === 'tonefreqtime';
	}).effect((tonefreqtime) => {
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreqtime.freq;
		this.Sound_behavior_INIT_sound_tone_time_var = tonefreqtime.time;
		if(this.Sound_behavior_INIT_received_sound_tonevar444_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = false;
		this.Sound_behavior_INIT_received_sound_tonevar444_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonefreqtime_bis) => {
		return tonefreqtime_bis._port === 'sound' && tonefreqtime_bis._msg === 'tonefreqtime_bis';
	}).effect((tonefreqtime_bis) => {
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreqtime_bis.freq;
		this.Sound_behavior_INIT_sound_tone_time_var = tonefreqtime_bis.time;
		if(this.Sound_behavior_INIT_received_sound_tonevar444_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = false;
		this.Sound_behavior_INIT_received_sound_tonevar444_var = false;
		
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

SoundControllerBrowserRND.prototype.receivetonefreqtimeOnsound = function(var518, time, freq) {
	this._receive({_port:"sound", _msg:"tonefreqtime", var518:var518, time:time, freq:freq});
}

SoundControllerBrowserRND.prototype.receivetonevar444Onsound = function(var444, var519) {
	this._receive({_port:"sound", _msg:"tonevar444", var444:var444, var519:var519});
}

SoundControllerBrowserRND.prototype.receivetonefreqtime_bisOnsound = function(time, var520, freq) {
	this._receive({_port:"sound", _msg:"tonefreqtime_bis", time:time, var520:var520, freq:freq});
}

SoundControllerBrowserRND.prototype.receivetonevar444_bisOnsound = function(var444, var521) {
	this._receive({_port:"sound", _msg:"tonevar444_bis", var444:var444, var521:var521});
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonevar444_var = function(Sound_behavior_INIT_received_sound_tonevar444_var) {
	this.Sound_behavior_INIT_received_sound_tonevar444_var = Sound_behavior_INIT_received_sound_tonevar444_var;
}

SoundControllerBrowserRND.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_var444_var = function(Sound_behavior_INIT_sound_tone_var444_var) {
	this.Sound_behavior_INIT_sound_tone_var444_var = Sound_behavior_INIT_sound_tone_var444_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonefreqtime_var = function(Sound_behavior_INIT_received_sound_tonefreqtime_var) {
	this.Sound_behavior_INIT_received_sound_tonefreqtime_var = Sound_behavior_INIT_received_sound_tonefreqtime_var;
}

SoundControllerBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\treceived_sound_tonevar444 = ' + this.Sound_behavior_INIT_received_sound_tonevar444_var;
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\tsound_tone_var444 = ' + this.Sound_behavior_INIT_sound_tone_var444_var;
	result += '\n\treceived_sound_tonefreqtime = ' + this.Sound_behavior_INIT_received_sound_tonefreqtime_var;
	result += '';
	return result;
}

