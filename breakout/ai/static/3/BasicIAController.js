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
		setTimeout(() => this.bus.emit('controls?positiony', 0xFA, 0), 0);
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionval214x', 0x02, ctrlx_const, 0xEB), 0);
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAbally) => {
		return updateIAbally._port === 'game' && updateIAbally._msg === 'updateIAbally' && (this.BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var);
	}).effect((updateIAbally) => {
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAbally.bally;
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
		this.BasicIAController_SC_Following_received_game_updateIAbally_var = false;
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAbally) => {
		return updateIAbally._port === 'game' && updateIAbally._msg === 'updateIAbally' && (!(this.BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var));
	}).effect((updateIAbally) => {
		this.BasicIAController_SC_Following_received_game_updateIAbally_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAbally.bally;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIApadypadxballxval215) => {
		return updateIApadypadxballxval215._port === 'game' && updateIApadypadxballxval215._msg === 'updateIApadypadxballxval215' && (this.BasicIAController_SC_Following_received_game_updateIAbally_var);
	}).effect((updateIApadypadxballxval215) => {
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadypadxballxval215.pady;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadypadxballxval215.padx;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadypadxballxval215.ballx;
		this.BasicIAController_SC_Following_game_updateIA_val215_var = updateIApadypadxballxval215.val215;
		if(updateIApadypadxballxval215.ballx > updateIApadypadxballxval215.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIApadypadxballxval215.ballx < updateIApadypadxballxval215.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAbally_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIApadypadxballxval215) => {
		return updateIApadypadxballxval215._port === 'game' && updateIApadypadxballxval215._msg === 'updateIApadypadxballxval215' && (!(this.BasicIAController_SC_Following_received_game_updateIAbally_var));
	}).effect((updateIApadypadxballxval215) => {
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var = true;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadypadxballxval215.pady;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadypadxballxval215.padx;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadypadxballxval215.ballx;
		this.BasicIAController_SC_Following_game_updateIA_val215_var = updateIApadypadxballxval215.val215;
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

BasicIAController.prototype.receiveupdateIApadypadxballxval215Ongame = function(val254, pady, padx, ballx, val215) {
	this._receive({_port:"game", _msg:"updateIApadypadxballxval215", val254:val254, pady:pady, padx:padx, ballx:ballx, val215:val215});
}

BasicIAController.prototype.receiveupdateIAballyOngame = function(val255, bally) {
	this._receive({_port:"game", _msg:"updateIAbally", val255:val255, bally:bally});
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_val215_var = function(BasicIAController_SC_Following_game_updateIA_val215_var) {
	this.BasicIAController_SC_Following_game_updateIA_val215_var = BasicIAController_SC_Following_game_updateIA_val215_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_bally_var = function(BasicIAController_SC_Following_game_updateIA_bally_var) {
	this.BasicIAController_SC_Following_game_updateIA_bally_var = BasicIAController_SC_Following_game_updateIA_bally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAbally_var = function(BasicIAController_SC_Following_received_game_updateIAbally_var) {
	this.BasicIAController_SC_Following_received_game_updateIAbally_var = BasicIAController_SC_Following_received_game_updateIAbally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_pady_var = function(BasicIAController_SC_Following_game_updateIA_pady_var) {
	this.BasicIAController_SC_Following_game_updateIA_pady_var = BasicIAController_SC_Following_game_updateIA_pady_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_padx_var = function(BasicIAController_SC_Following_game_updateIA_padx_var) {
	this.BasicIAController_SC_Following_game_updateIA_padx_var = BasicIAController_SC_Following_game_updateIA_padx_var;
}

BasicIAController.prototype.initBasicIAController_ctrlx_var = function(BasicIAController_ctrlx_var) {
	this.BasicIAController_ctrlx_var = BasicIAController_ctrlx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var = function(BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var) {
	this.BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var = BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var;
}

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\tgame_updateIA_val215 = ' + this.BasicIAController_SC_Following_game_updateIA_val215_var;
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\treceived_game_updateIAbally = ' + this.BasicIAController_SC_Following_received_game_updateIAbally_var;
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\treceived_game_updateIApadypadxballxval215 = ' + this.BasicIAController_SC_Following_received_game_updateIApadypadxballxval215_var;
	result += '';
	return result;
}

