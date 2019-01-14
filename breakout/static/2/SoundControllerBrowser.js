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
	Sound_behavior_INIT.to(null).when((tonefreqtime) => {
		return tonefreqtime._port === 'sound' && tonefreqtime._msg === 'tonefreqtime';
	}).effect((tonefreqtime) => {
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreqtime.freq;
		this.Sound_behavior_INIT_sound_tone_time_var = tonefreqtime.time;
		if(this.Sound_behavior_INIT_received_sound_toneval152_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = false;
		this.Sound_behavior_INIT_received_sound_toneval152_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((toneval152) => {
		return toneval152._port === 'sound' && toneval152._msg === 'toneval152';
	}).effect((toneval152) => {
		this.Sound_behavior_INIT_received_sound_toneval152_var = true;
		this.Sound_behavior_INIT_sound_tone_val152_var = toneval152.val152;
		if(this.Sound_behavior_INIT_received_sound_tonefreqtime_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_toneval152_var = false;
		this.Sound_behavior_INIT_received_sound_tonefreqtime_var = false;
		
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

SoundControllerBrowser.prototype.receivetoneval152Onsound = function(val152, val192) {
	this._receive({_port:"sound", _msg:"toneval152", val152:val152, val192:val192});
}

SoundControllerBrowser.prototype.receivetonefreqtimeOnsound = function(time, val193, freq) {
	this._receive({_port:"sound", _msg:"tonefreqtime", time:time, val193:val193, freq:freq});
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_received_sound_toneval152_var = function(Sound_behavior_INIT_received_sound_toneval152_var) {
	this.Sound_behavior_INIT_received_sound_toneval152_var = Sound_behavior_INIT_received_sound_toneval152_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowser.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_received_sound_tonefreqtime_var = function(Sound_behavior_INIT_received_sound_tonefreqtime_var) {
	this.Sound_behavior_INIT_received_sound_tonefreqtime_var = Sound_behavior_INIT_received_sound_tonefreqtime_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_val152_var = function(Sound_behavior_INIT_sound_tone_val152_var) {
	this.Sound_behavior_INIT_sound_tone_val152_var = Sound_behavior_INIT_sound_tone_val152_var;
}

SoundControllerBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\treceived_sound_toneval152 = ' + this.Sound_behavior_INIT_received_sound_toneval152_var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '\n\treceived_sound_tonefreqtime = ' + this.Sound_behavior_INIT_received_sound_tonefreqtime_var;
	result += '\n\tsound_tone_val152 = ' + this.Sound_behavior_INIT_sound_tone_val152_var;
	result += '';
	return result;
}

