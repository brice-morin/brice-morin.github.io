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
	Sound_behavior_INIT.to(null).when((tone_) => {
		return tone_._port === 'sound' && tone_._msg === 'tone_';
	}).effect((tone_) => {
		this.Sound_behavior_INIT_received_sound_tone__var = true;
		if(this.Sound_behavior_INIT_received_sound_tonefreqtimeval86_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tone__var = false;
		this.Sound_behavior_INIT_received_sound_tonefreqtimeval86_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonefreqtimeval86) => {
		return tonefreqtimeval86._port === 'sound' && tonefreqtimeval86._msg === 'tonefreqtimeval86';
	}).effect((tonefreqtimeval86) => {
		this.Sound_behavior_INIT_received_sound_tonefreqtimeval86_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreqtimeval86.freq;
		this.Sound_behavior_INIT_sound_tone_time_var = tonefreqtimeval86.time;
		this.Sound_behavior_INIT_sound_tone_val86_var = tonefreqtimeval86.val86;
		if(this.Sound_behavior_INIT_received_sound_tone__var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreqtimeval86_var = false;
		this.Sound_behavior_INIT_received_sound_tone__var = false;
		
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

SoundControllerBrowser.prototype.receivetone_Onsound = function(val126) {
	this._receive({_port:"sound", _msg:"tone_", val126:val126});
}

SoundControllerBrowser.prototype.receivetonefreqtimeval86Onsound = function(freq, time, val86, val127) {
	this._receive({_port:"sound", _msg:"tonefreqtimeval86", freq:freq, time:time, val86:val86, val127:val127});
}

SoundControllerBrowser.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_received_sound_tonefreqtimeval86_var = function(Sound_behavior_INIT_received_sound_tonefreqtimeval86_var) {
	this.Sound_behavior_INIT_received_sound_tonefreqtimeval86_var = Sound_behavior_INIT_received_sound_tonefreqtimeval86_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_received_sound_tone__var = function(Sound_behavior_INIT_received_sound_tone__var) {
	this.Sound_behavior_INIT_received_sound_tone__var = Sound_behavior_INIT_received_sound_tone__var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_val86_var = function(Sound_behavior_INIT_sound_tone_val86_var) {
	this.Sound_behavior_INIT_sound_tone_val86_var = Sound_behavior_INIT_sound_tone_val86_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '\n\treceived_sound_tonefreqtimeval86 = ' + this.Sound_behavior_INIT_received_sound_tonefreqtimeval86_var;
	result += '\n\treceived_sound_tone_ = ' + this.Sound_behavior_INIT_received_sound_tone__var;
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\tsound_tone_val86 = ' + this.Sound_behavior_INIT_sound_tone_val86_var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '';
	return result;
}

