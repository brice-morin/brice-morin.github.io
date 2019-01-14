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
	Sound_behavior_INIT.to(null).when((tonetime) => {
		return tonetime._port === 'sound' && tonetime._msg === 'tonetime';
	}).effect((tonetime) => {
		this.Sound_behavior_INIT_received_sound_tonetime_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetime.time;
		if(this.Sound_behavior_INIT_received_sound_toneval218freq_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetime_var = false;
		this.Sound_behavior_INIT_received_sound_toneval218freq_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((toneval218freq) => {
		return toneval218freq._port === 'sound' && toneval218freq._msg === 'toneval218freq';
	}).effect((toneval218freq) => {
		this.Sound_behavior_INIT_received_sound_toneval218freq_var = true;
		this.Sound_behavior_INIT_sound_tone_val218_var = toneval218freq.val218;
		this.Sound_behavior_INIT_sound_tone_freq_var = toneval218freq.freq;
		if(this.Sound_behavior_INIT_received_sound_tonetime_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_toneval218freq_var = false;
		this.Sound_behavior_INIT_received_sound_tonetime_var = false;
		
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

SoundControllerBrowser.prototype.receivetoneval218freqOnsound = function(val258, freq, val218) {
	this._receive({_port:"sound", _msg:"toneval218freq", val258:val258, freq:freq, val218:val218});
}

SoundControllerBrowser.prototype.receivetonetimeOnsound = function(time, val259) {
	this._receive({_port:"sound", _msg:"tonetime", time:time, val259:val259});
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_val218_var = function(Sound_behavior_INIT_sound_tone_val218_var) {
	this.Sound_behavior_INIT_sound_tone_val218_var = Sound_behavior_INIT_sound_tone_val218_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_received_sound_tonetime_var = function(Sound_behavior_INIT_received_sound_tonetime_var) {
	this.Sound_behavior_INIT_received_sound_tonetime_var = Sound_behavior_INIT_received_sound_tonetime_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowser.prototype.initSound_behavior_INIT_received_sound_toneval218freq_var = function(Sound_behavior_INIT_received_sound_toneval218freq_var) {
	this.Sound_behavior_INIT_received_sound_toneval218freq_var = Sound_behavior_INIT_received_sound_toneval218freq_var;
}

SoundControllerBrowser.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowser.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\tsound_tone_val218 = ' + this.Sound_behavior_INIT_sound_tone_val218_var;
	result += '\n\treceived_sound_tonetime = ' + this.Sound_behavior_INIT_received_sound_tonetime_var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '\n\treceived_sound_toneval218freq = ' + this.Sound_behavior_INIT_received_sound_toneval218freq_var;
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '';
	return result;
}

