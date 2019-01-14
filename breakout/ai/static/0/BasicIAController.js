'use strict';


/*
 * Definition for type : BasicIAController
 */

function BasicIAController(name, root) {
	this.name = name;
	this.root = (root === null)? this : root;
	this.ready = false;
	this.bus = (root === null)? new EventEmitter() : this.root.bus;
	
	this.build(name);
}

BasicIAController.prototype.build = function(session) {
	/*State machine (states and regions)*/
	/*Building root component*/
	this._statemachine = new StateJS.State('SC');
	let _initial_BasicIAController_SC = new StateJS.PseudoState('_initial', this._statemachine, StateJS.PseudoStateKind.Initial);
	let BasicIAController_SC_Following = new StateJS.State('Following', this._statemachine).entry(() => {
		setTimeout(() => this.bus.emit('controls?positionval16', 0x58, 0xC9), 0);
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionyx', 0, ctrlx_const, 0xE5), 0);
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballypadyballxpadxval17) => {
		return updateIAballypadyballxpadxval17._port === 'game' && updateIAballypadyballxpadxval17._msg === 'updateIAballypadyballxpadxval17' && (this.BasicIAController_SC_Following_received_game_updateIA__var);
	}).effect((updateIAballypadyballxpadxval17) => {
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadyballxpadxval17.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypadyballxpadxval17.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballypadyballxpadxval17.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadyballxpadxval17.padx;
		this.BasicIAController_SC_Following_game_updateIA_val17_var = updateIAballypadyballxpadxval17.val17;
		if(updateIAballypadyballxpadxval17.ballx > updateIAballypadyballxpadxval17.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIAballypadyballxpadxval17.ballx < updateIAballypadyballxpadxval17.padx - 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var - 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		}
		
		}
		if(this.BasicIAController_ctrlx_var <  -100) {
		this.BasicIAController_ctrlx_var =  -100;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(this.BasicIAController_ctrlx_var > 100) {
		this.BasicIAController_ctrlx_var = 100;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		}
		
		}
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var = false;
		this.BasicIAController_SC_Following_received_game_updateIA__var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballypadyballxpadxval17) => {
		return updateIAballypadyballxpadxval17._port === 'game' && updateIAballypadyballxpadxval17._msg === 'updateIAballypadyballxpadxval17' && (!(this.BasicIAController_SC_Following_received_game_updateIA__var));
	}).effect((updateIAballypadyballxpadxval17) => {
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadyballxpadxval17.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypadyballxpadxval17.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballypadyballxpadxval17.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadyballxpadxval17.padx;
		this.BasicIAController_SC_Following_game_updateIA_val17_var = updateIAballypadyballxpadxval17.val17;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIA_) => {
		return updateIA_._port === 'game' && updateIA_._msg === 'updateIA_' && (this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var);
	}).effect((updateIA_) => {
		if(this.BasicIAController_SC_Following_game_updateIA_ballx_var > this.BasicIAController_SC_Following_game_updateIA_padx_var + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(this.BasicIAController_SC_Following_game_updateIA_ballx_var < this.BasicIAController_SC_Following_game_updateIA_padx_var - 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var - 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		}
		
		}
		if(this.BasicIAController_ctrlx_var <  -100) {
		this.BasicIAController_ctrlx_var =  -100;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(this.BasicIAController_ctrlx_var > 100) {
		this.BasicIAController_ctrlx_var = 100;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		}
		
		}
		this.BasicIAController_SC_Following_received_game_updateIA__var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIA_) => {
		return updateIA_._port === 'game' && updateIA_._msg === 'updateIA_' && (!(this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var));
	}).effect((updateIA_) => {
		this.BasicIAController_SC_Following_received_game_updateIA__var = true;
	});
}
BasicIAController.prototype._stop = function() {
	this.root = null;
	this.ready = false;
}

BasicIAController.prototype._delete = function() {
	this._statemachine = null;
	this._SC_instance = null;
	this.bus.removeAllListeners();
}

BasicIAController.prototype._init = function() {
	this._SC_instance = new StateJS.Instance("SC_instance", this._statemachine);
	this.ready = true;
}

BasicIAController.prototype._receive = function(msg) {
	/*msg = {_port:myPort, _msg:myMessage, paramN=paramN, ...}*/
	if (this.ready) {
		this._SC_instance.evaluate(msg);
	} else {
		setTimeout(()=>this._receive(msg),0);
	}
}

BasicIAController.prototype.receiveupdateIA_Ongame = function(val56) {
	this._receive({_port:"game", _msg:"updateIA_", val56:val56});
}

BasicIAController.prototype.receiveupdateIAballypadyballxpadxval17Ongame = function(val17, padx, ballx, bally, pady, val57) {
	this._receive({_port:"game", _msg:"updateIAballypadyballxpadxval17", val17:val17, padx:padx, ballx:ballx, bally:bally, pady:pady, val57:val57});
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_pady_var = function(BasicIAController_SC_Following_game_updateIA_pady_var) {
	this.BasicIAController_SC_Following_game_updateIA_pady_var = BasicIAController_SC_Following_game_updateIA_pady_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_ctrlx_var = function(BasicIAController_ctrlx_var) {
	this.BasicIAController_ctrlx_var = BasicIAController_ctrlx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_padx_var = function(BasicIAController_SC_Following_game_updateIA_padx_var) {
	this.BasicIAController_SC_Following_game_updateIA_padx_var = BasicIAController_SC_Following_game_updateIA_padx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIA__var = function(BasicIAController_SC_Following_received_game_updateIA__var) {
	this.BasicIAController_SC_Following_received_game_updateIA__var = BasicIAController_SC_Following_received_game_updateIA__var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_bally_var = function(BasicIAController_SC_Following_game_updateIA_bally_var) {
	this.BasicIAController_SC_Following_game_updateIA_bally_var = BasicIAController_SC_Following_game_updateIA_bally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var = function(BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var) {
	this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var = BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_val17_var = function(BasicIAController_SC_Following_game_updateIA_val17_var) {
	this.BasicIAController_SC_Following_game_updateIA_val17_var = BasicIAController_SC_Following_game_updateIA_val17_var;
}

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '\n\treceived_game_updateIA_ = ' + this.BasicIAController_SC_Following_received_game_updateIA__var;
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\treceived_game_updateIAballypadyballxpadxval17 = ' + this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxval17_var;
	result += '\n\tgame_updateIA_val17 = ' + this.BasicIAController_SC_Following_game_updateIA_val17_var;
	result += '';
	return result;
}

