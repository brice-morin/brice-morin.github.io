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
		setTimeout(() => this.bus.emit('controls?positiony', 0xFD, 0), 0);
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionxval280', ctrlx_const, 0xD4, 0xEC), 0);
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballx) => {
		return updateIAballx._port === 'game' && updateIAballx._msg === 'updateIAballx' && (this.BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var);
	}).effect((updateIAballx) => {
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballx.ballx;
		if(updateIAballx.ballx > this.BasicIAController_SC_Following_game_updateIA_padx_var + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIAballx.ballx < this.BasicIAController_SC_Following_game_updateIA_padx_var - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballx_var = false;
		this.BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballx) => {
		return updateIAballx._port === 'game' && updateIAballx._msg === 'updateIAballx' && (!(this.BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var));
	}).effect((updateIAballx) => {
		this.BasicIAController_SC_Following_received_game_updateIAballx_var = true;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballx.ballx;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIApadyval281padxbally) => {
		return updateIApadyval281padxbally._port === 'game' && updateIApadyval281padxbally._msg === 'updateIApadyval281padxbally' && (this.BasicIAController_SC_Following_received_game_updateIAballx_var);
	}).effect((updateIApadyval281padxbally) => {
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadyval281padxbally.pady;
		this.BasicIAController_SC_Following_game_updateIA_val281_var = updateIApadyval281padxbally.val281;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadyval281padxbally.padx;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIApadyval281padxbally.bally;
		if(this.BasicIAController_SC_Following_game_updateIA_ballx_var > updateIApadyval281padxbally.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(this.BasicIAController_SC_Following_game_updateIA_ballx_var < updateIApadyval281padxbally.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballx_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIApadyval281padxbally) => {
		return updateIApadyval281padxbally._port === 'game' && updateIApadyval281padxbally._msg === 'updateIApadyval281padxbally' && (!(this.BasicIAController_SC_Following_received_game_updateIAballx_var));
	}).effect((updateIApadyval281padxbally) => {
		this.BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var = true;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadyval281padxbally.pady;
		this.BasicIAController_SC_Following_game_updateIA_val281_var = updateIApadyval281padxbally.val281;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadyval281padxbally.padx;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIApadyval281padxbally.bally;
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

BasicIAController.prototype.receiveupdateIAballxOngame = function(val320, ballx) {
	this._receive({_port:"game", _msg:"updateIAballx", val320:val320, ballx:ballx});
}

BasicIAController.prototype.receiveupdateIApadyval281padxballyOngame = function(padx, val321, bally, pady, val281) {
	this._receive({_port:"game", _msg:"updateIApadyval281padxbally", padx:padx, val321:val321, bally:bally, pady:pady, val281:val281});
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAballx_var = function(BasicIAController_SC_Following_received_game_updateIAballx_var) {
	this.BasicIAController_SC_Following_received_game_updateIAballx_var = BasicIAController_SC_Following_received_game_updateIAballx_var;
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

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_bally_var = function(BasicIAController_SC_Following_game_updateIA_bally_var) {
	this.BasicIAController_SC_Following_game_updateIA_bally_var = BasicIAController_SC_Following_game_updateIA_bally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_val281_var = function(BasicIAController_SC_Following_game_updateIA_val281_var) {
	this.BasicIAController_SC_Following_game_updateIA_val281_var = BasicIAController_SC_Following_game_updateIA_val281_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var = function(BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var) {
	this.BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var = BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var;
}

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\treceived_game_updateIAballx = ' + this.BasicIAController_SC_Following_received_game_updateIAballx_var;
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\tgame_updateIA_val281 = ' + this.BasicIAController_SC_Following_game_updateIA_val281_var;
	result += '\n\treceived_game_updateIApadyval281padxbally = ' + this.BasicIAController_SC_Following_received_game_updateIApadyval281padxbally_var;
	result += '';
	return result;
}

