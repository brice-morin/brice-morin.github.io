'use strict';


/*
 * Definition for type : SoundControllerBrowser
 */

function SoundControllerBrowser(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

SoundControllerBrowser.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('behavior');
	let _initial_Sound_behavior = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let Sound_behavior_INIT = new StateJS.State('INIT', this._statemachine);
	_initial_Sound_behavior.to(Sound_behavior_INIT);
	Sound_behavior_INIT.to(null).when((tonetimeval20) => {
		return tonetimeval20._port === 'sound' && tonetimeval20._msg === 'tonetimeval20';
	}).effect((tonetimeval20) => {
		this.Sound_behavior_INIT_received_sound_tonetimeval20_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetimeval20.time;
		this.Sound_behavior_INIT_sound_tone_val20_var = tonetimeval20.val20;
		if(this.Sound_behavior_INIT_received_sound_tonefreq_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetimeval20_var = false;
		this.Sound_behavior_INIT_received_sound_tonefreq_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonefreq) => {
		return tonefreq._port === 'sound' && tonefreq._msg === 'tonefreq';
	}).effect((tonefreq) => {
		this.Sound_behavior_INIT_received_sound_tonefreq_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreq.freq;
		if(this.Sound_behavior_INIT_received_sound_tonetimeval20_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreq_var = false;
		this.Sound_behavior_INIT_received_sound_tonetimeval20_var = false;
		
		}
	});
}
SoundControllerBrowser.prototype.tone = function(SoundControllerBrowser_tone_f_var, SoundControllerBrowser_tone_t_var) {
	this.SoundControllerBrowser_synth_var.triggerAttackRelease(SoundControllerBrowser_tone_f_var, SoundControllerBrowser_tone_t_var/1000)
}

SoundControllerBrowser.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

SoundControllerBrowser.prototype._delete = function() {
	this._statemachine = null;
	this._behavior_instance = null;
	this.bus.removeAllListeners();
}

SoundControllerBrowser.prototype._init = function() {
	this._behavior_instance = new StateJS.Instance("behavior_instance", this._statemachine);
	this.ready = true;
}

SoundControllerBrowser.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._behavior_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

SoundControllerBrowser.prototype.receivetonetimeval20Onsound = function(val60, val20, time) {
	this._receive({_port:"sound", _msg:"tonetimeval20", val60:val60, val20:val20, time:time});
}

SoundControllerBrowser.prototype.receivetonefreqOnsound = function(val61, freq) {
	this._receive({_port:"sound", _msg:"tonefreq", val61:val61, freq:freq});
}

SoundControllerBrowser.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_received_sound_tonetimeval20_var = function(Sound_behavior_INIT_received_sound_tonetimeval20_var) {
	this.Sound_behavior_INIT_received_sound_tonetimeval20_var = Sound_behavior_INIT_received_sound_tonetimeval20_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_received_sound_tonefreq_var = function(Sound_behavior_INIT_received_sound_tonefreq_var) {
	this.Sound_behavior_INIT_received_sound_tonefreq_var = Sound_behavior_INIT_received_sound_tonefreq_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_val20_var = function(Sound_behavior_INIT_sound_tone_val20_var) {
	this.Sound_behavior_INIT_sound_tone_val20_var = Sound_behavior_INIT_sound_tone_val20_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '\n\treceived_sound_tonetimeval20 = ' + this.Sound_behavior_INIT_received_sound_tonetimeval20_var;
	result += '\n\treceived_sound_tonefreq = ' + this.Sound_behavior_INIT_received_sound_tonefreq_var;
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\tsound_tone_val20 = ' + this.Sound_behavior_INIT_sound_tone_val20_var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '';
	return result;
}

