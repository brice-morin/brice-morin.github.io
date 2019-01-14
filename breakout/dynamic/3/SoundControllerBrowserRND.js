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
	Sound_behavior_INIT.to(null).when((tonetime_bis) => {
		return tonetime_bis._port === 'sound' && tonetime_bis._msg === 'tonetime_bis';
	}).effect((tonetime_bis) => {
		this.Sound_behavior_INIT_received_sound_tonetime_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetime_bis.time;
		if(this.Sound_behavior_INIT_received_sound_tonefreqvar338_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetime_var = false;
		this.Sound_behavior_INIT_received_sound_tonefreqvar338_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonefreqvar338_bis) => {
		return tonefreqvar338_bis._port === 'sound' && tonefreqvar338_bis._msg === 'tonefreqvar338_bis';
	}).effect((tonefreqvar338_bis) => {
		this.Sound_behavior_INIT_received_sound_tonefreqvar338_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreqvar338_bis.freq;
		this.Sound_behavior_INIT_sound_tone_var338_var = tonefreqvar338_bis.var338;
		if(this.Sound_behavior_INIT_received_sound_tonetime_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreqvar338_var = false;
		this.Sound_behavior_INIT_received_sound_tonetime_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonetime) => {
		return tonetime._port === 'sound' && tonetime._msg === 'tonetime';
	}).effect((tonetime) => {
		this.Sound_behavior_INIT_received_sound_tonetime_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetime.time;
		if(this.Sound_behavior_INIT_received_sound_tonefreqvar338_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetime_var = false;
		this.Sound_behavior_INIT_received_sound_tonefreqvar338_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonefreqvar338) => {
		return tonefreqvar338._port === 'sound' && tonefreqvar338._msg === 'tonefreqvar338';
	}).effect((tonefreqvar338) => {
		this.Sound_behavior_INIT_received_sound_tonefreqvar338_var = true;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonefreqvar338.freq;
		this.Sound_behavior_INIT_sound_tone_var338_var = tonefreqvar338.var338;
		if(this.Sound_behavior_INIT_received_sound_tonetime_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonefreqvar338_var = false;
		this.Sound_behavior_INIT_received_sound_tonetime_var = false;
		
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

SoundControllerBrowserRND.prototype.receivetonefreqvar338Onsound = function(var412, freq, var338) {
	this._receive({_port:"sound", _msg:"tonefreqvar338", var412:var412, freq:freq, var338:var338});
}

SoundControllerBrowserRND.prototype.receivetonetimeOnsound = function(time, var413) {
	this._receive({_port:"sound", _msg:"tonetime", time:time, var413:var413});
}

SoundControllerBrowserRND.prototype.receivetonefreqvar338_bisOnsound = function(var414, var338, freq) {
	this._receive({_port:"sound", _msg:"tonefreqvar338_bis", var414:var414, var338:var338, freq:freq});
}

SoundControllerBrowserRND.prototype.receivetonetime_bisOnsound = function(time, var415) {
	this._receive({_port:"sound", _msg:"tonetime_bis", time:time, var415:var415});
}

SoundControllerBrowserRND.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_var338_var = function(Sound_behavior_INIT_sound_tone_var338_var) {
	this.Sound_behavior_INIT_sound_tone_var338_var = Sound_behavior_INIT_sound_tone_var338_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonefreqvar338_var = function(Sound_behavior_INIT_received_sound_tonefreqvar338_var) {
	this.Sound_behavior_INIT_received_sound_tonefreqvar338_var = Sound_behavior_INIT_received_sound_tonefreqvar338_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonetime_var = function(Sound_behavior_INIT_received_sound_tonetime_var) {
	this.Sound_behavior_INIT_received_sound_tonetime_var = Sound_behavior_INIT_received_sound_tonetime_var;
}

SoundControllerBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '\n\tsound_tone_var338 = ' + this.Sound_behavior_INIT_sound_tone_var338_var;
	result += '\n\treceived_sound_tonefreqvar338 = ' + this.Sound_behavior_INIT_received_sound_tonefreqvar338_var;
	result += '\n\treceived_sound_tonetime = ' + this.Sound_behavior_INIT_received_sound_tonetime_var;
	result += '';
	return result;
}

