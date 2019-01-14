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
	Sound_behavior_INIT.to(null).when((tone__bis) => {
		return tone__bis._port === 'sound' && tone__bis._msg === 'tone__bis';
	}).effect((tone__bis) => {
		this.Sound_behavior_INIT_received_sound_tone__var = true;
		if(this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tone__var = false;
		this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonetimefreqvar126) => {
		return tonetimefreqvar126._port === 'sound' && tonetimefreqvar126._msg === 'tonetimefreqvar126';
	}).effect((tonetimefreqvar126) => {
		this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetimefreqvar126.time;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonetimefreqvar126.freq;
		this.Sound_behavior_INIT_sound_tone_var126_var = tonetimefreqvar126.var126;
		if(this.Sound_behavior_INIT_received_sound_tone__var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var = false;
		this.Sound_behavior_INIT_received_sound_tone__var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tonetimefreqvar126_bis) => {
		return tonetimefreqvar126_bis._port === 'sound' && tonetimefreqvar126_bis._msg === 'tonetimefreqvar126_bis';
	}).effect((tonetimefreqvar126_bis) => {
		this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var = true;
		this.Sound_behavior_INIT_sound_tone_time_var = tonetimefreqvar126_bis.time;
		this.Sound_behavior_INIT_sound_tone_freq_var = tonetimefreqvar126_bis.freq;
		this.Sound_behavior_INIT_sound_tone_var126_var = tonetimefreqvar126_bis.var126;
		if(this.Sound_behavior_INIT_received_sound_tone__var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var = false;
		this.Sound_behavior_INIT_received_sound_tone__var = false;
		
		}
	});
	Sound_behavior_INIT.to(null).when((tone_) => {
		return tone_._port === 'sound' && tone_._msg === 'tone_';
	}).effect((tone_) => {
		this.Sound_behavior_INIT_received_sound_tone__var = true;
		if(this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var) {
		this.tone(this.Sound_behavior_INIT_sound_tone_freq_var, this.Sound_behavior_INIT_sound_tone_time_var);
		this.Sound_behavior_INIT_received_sound_tone__var = false;
		this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var = false;
		
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

SoundControllerBrowserRND.prototype.receivetone_Onsound = function(var200) {
	this._receive({_port:"sound", _msg:"tone_", var200:var200});
}

SoundControllerBrowserRND.prototype.receivetonetimefreqvar126Onsound = function(time, var201, var126, freq) {
	this._receive({_port:"sound", _msg:"tonetimefreqvar126", time:time, var201:var201, var126:var126, freq:freq});
}

SoundControllerBrowserRND.prototype.receivetone__bisOnsound = function(var202) {
	this._receive({_port:"sound", _msg:"tone__bis", var202:var202});
}

SoundControllerBrowserRND.prototype.receivetonetimefreqvar126_bisOnsound = function(time, var126, freq, var203) {
	this._receive({_port:"sound", _msg:"tonetimefreqvar126_bis", time:time, var126:var126, freq:freq, var203:var203});
}

SoundControllerBrowserRND.prototype.initSoundControllerBrowser_synth_var = function(SoundControllerBrowser_synth_var) {
	this.SoundControllerBrowser_synth_var = SoundControllerBrowser_synth_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tonetimefreqvar126_var = function(Sound_behavior_INIT_received_sound_tonetimefreqvar126_var) {
	this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var = Sound_behavior_INIT_received_sound_tonetimefreqvar126_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_received_sound_tone__var = function(Sound_behavior_INIT_received_sound_tone__var) {
	this.Sound_behavior_INIT_received_sound_tone__var = Sound_behavior_INIT_received_sound_tone__var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_freq_var = function(Sound_behavior_INIT_sound_tone_freq_var) {
	this.Sound_behavior_INIT_sound_tone_freq_var = Sound_behavior_INIT_sound_tone_freq_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_time_var = function(Sound_behavior_INIT_sound_tone_time_var) {
	this.Sound_behavior_INIT_sound_tone_time_var = Sound_behavior_INIT_sound_tone_time_var;
}

SoundControllerBrowserRND.prototype.initSound_behavior_INIT_sound_tone_var126_var = function(Sound_behavior_INIT_sound_tone_var126_var) {
	this.Sound_behavior_INIT_sound_tone_var126_var = Sound_behavior_INIT_sound_tone_var126_var;
}

SoundControllerBrowserRND.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tsynth = ' + this.SoundControllerBrowser_synth_var;
	result += '\n\treceived_sound_tonetimefreqvar126 = ' + this.Sound_behavior_INIT_received_sound_tonetimefreqvar126_var;
	result += '\n\treceived_sound_tone_ = ' + this.Sound_behavior_INIT_received_sound_tone__var;
	result += '\n\tsound_tone_freq = ' + this.Sound_behavior_INIT_sound_tone_freq_var;
	result += '\n\tsound_tone_time = ' + this.Sound_behavior_INIT_sound_tone_time_var;
	result += '\n\tsound_tone_var126 = ' + this.Sound_behavior_INIT_sound_tone_var126_var;
	result += '';
	return result;
}

