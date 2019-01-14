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
		setTimeout(() => this.bus.emit('controls?positionval82', 0x2E, 0xF9), 0);
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionxy', 0, 0xF5, ctrlx_const), 0);
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAbally) => {
		return updateIAbally._port === 'game' && updateIAbally._msg === 'updateIAbally' && (this.BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var);
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
		this.BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAbally) => {
		return updateIAbally._port === 'game' && updateIAbally._msg === 'updateIAbally' && (!(this.BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var));
	}).effect((updateIAbally) => {
		this.BasicIAController_SC_Following_received_game_updateIAbally_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAbally.bally;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIApadyval83padxballx) => {
		return updateIApadyval83padxballx._port === 'game' && updateIApadyval83padxballx._msg === 'updateIApadyval83padxballx' && (this.BasicIAController_SC_Following_received_game_updateIAbally_var);
	}).effect((updateIApadyval83padxballx) => {
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadyval83padxballx.pady;
		this.BasicIAController_SC_Following_game_updateIA_val83_var = updateIApadyval83padxballx.val83;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadyval83padxballx.padx;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadyval83padxballx.ballx;
		if(updateIApadyval83padxballx.ballx > updateIApadyval83padxballx.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIApadyval83padxballx.ballx < updateIApadyval83padxballx.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAbally_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIApadyval83padxballx) => {
		return updateIApadyval83padxballx._port === 'game' && updateIApadyval83padxballx._msg === 'updateIApadyval83padxballx' && (!(this.BasicIAController_SC_Following_received_game_updateIAbally_var));
	}).effect((updateIApadyval83padxballx) => {
		this.BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var = true;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadyval83padxballx.pady;
		this.BasicIAController_SC_Following_game_updateIA_val83_var = updateIApadyval83padxballx.val83;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadyval83padxballx.padx;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadyval83padxballx.ballx;
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

BasicIAController.prototype.receiveupdateIAballyOngame = function(bally, val122) {
	this._receive({_port:"game", _msg:"updateIAbally", bally:bally, val122:val122});
}

BasicIAController.prototype.receiveupdateIApadyval83padxballxOngame = function(val123, pady, val83, ballx, padx) {
	this._receive({_port:"game", _msg:"updateIApadyval83padxballx", val123:val123, pady:pady, val83:val83, ballx:ballx, padx:padx});
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

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_val83_var = function(BasicIAController_SC_Following_game_updateIA_val83_var) {
	this.BasicIAController_SC_Following_game_updateIA_val83_var = BasicIAController_SC_Following_game_updateIA_val83_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var = function(BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var) {
	this.BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var = BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var;
}

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\treceived_game_updateIAbally = ' + this.BasicIAController_SC_Following_received_game_updateIAbally_var;
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\tgame_updateIA_val83 = ' + this.BasicIAController_SC_Following_game_updateIA_val83_var;
	result += '\n\treceived_game_updateIApadyval83padxballx = ' + this.BasicIAController_SC_Following_received_game_updateIApadyval83padxballx_var;
	result += '';
	return result;
}

