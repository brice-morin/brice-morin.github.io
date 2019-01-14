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
		if(219 < 133) {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionxy', 0, 0x7F, ctrlx_const), 0);
		
		} else {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionxy_bis', ctrlx_const, 0x89, 0), 0);
		
		}
		if(169 < 6) {
		setTimeout(() => this.bus.emit('controls?positionvar334', 0xF5, 0xCC), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar334_bis', 0xB0, 0xCC), 0);
		
		}
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAvar335bally) => {
		return updateIAvar335bally._port === 'game' && updateIAvar335bally._msg === 'updateIAvar335bally' && (this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var);
	}).effect((updateIAvar335bally) => {
		this.BasicIAController_SC_Following_game_updateIA_var335_var = updateIAvar335bally.var335;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAvar335bally.bally;
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
		this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var = false;
		this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAvar335bally) => {
		return updateIAvar335bally._port === 'game' && updateIAvar335bally._msg === 'updateIAvar335bally' && (!(this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var));
	}).effect((updateIAvar335bally) => {
		this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var = true;
		this.BasicIAController_SC_Following_game_updateIA_var335_var = updateIAvar335bally.var335;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAvar335bally.bally;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAvar335bally_bis) => {
		return updateIAvar335bally_bis._port === 'game' && updateIAvar335bally_bis._msg === 'updateIAvar335bally_bis' && (this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var);
	}).effect((updateIAvar335bally_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_var335_var = updateIAvar335bally_bis.var335;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAvar335bally_bis.bally;
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
		this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var = false;
		this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAvar335bally_bis) => {
		return updateIAvar335bally_bis._port === 'game' && updateIAvar335bally_bis._msg === 'updateIAvar335bally_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var));
	}).effect((updateIAvar335bally_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var = true;
		this.BasicIAController_SC_Following_game_updateIA_var335_var = updateIAvar335bally_bis.var335;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAvar335bally_bis.bally;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIApadyballxpadx) => {
		return updateIApadyballxpadx._port === 'game' && updateIApadyballxpadx._msg === 'updateIApadyballxpadx' && (this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var);
	}).effect((updateIApadyballxpadx) => {
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadyballxpadx.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadyballxpadx.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadyballxpadx.padx;
		if(updateIApadyballxpadx.ballx > updateIApadyballxpadx.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIApadyballxpadx.ballx < updateIApadyballxpadx.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIApadyballxpadx) => {
		return updateIApadyballxpadx._port === 'game' && updateIApadyballxpadx._msg === 'updateIApadyballxpadx' && (!(this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var));
	}).effect((updateIApadyballxpadx) => {
		this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var = true;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadyballxpadx.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadyballxpadx.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadyballxpadx.padx;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIApadyballxpadx_bis) => {
		return updateIApadyballxpadx_bis._port === 'game' && updateIApadyballxpadx_bis._msg === 'updateIApadyballxpadx_bis' && (this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var);
	}).effect((updateIApadyballxpadx_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadyballxpadx_bis.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadyballxpadx_bis.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadyballxpadx_bis.padx;
		if(updateIApadyballxpadx_bis.ballx > updateIApadyballxpadx_bis.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIApadyballxpadx_bis.ballx < updateIApadyballxpadx_bis.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIApadyballxpadx_bis) => {
		return updateIApadyballxpadx_bis._port === 'game' && updateIApadyballxpadx_bis._msg === 'updateIApadyballxpadx_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var));
	}).effect((updateIApadyballxpadx_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var = true;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadyballxpadx_bis.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadyballxpadx_bis.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadyballxpadx_bis.padx;
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

BasicIAController.prototype.receiveupdateIApadyballxpadxOngame = function(var402, ballx, padx, pady) {
	this._receive({_port:"game", _msg:"updateIApadyballxpadx", var402:var402, ballx:ballx, padx:padx, pady:pady});
}

BasicIAController.prototype.receiveupdateIAvar335ballyOngame = function(var335, var403, bally) {
	this._receive({_port:"game", _msg:"updateIAvar335bally", var335:var335, var403:var403, bally:bally});
}

BasicIAController.prototype.receiveupdateIApadyballxpadx_bisOngame = function(pady, var408, padx, ballx) {
	this._receive({_port:"game", _msg:"updateIApadyballxpadx_bis", pady:pady, var408:var408, padx:padx, ballx:ballx});
}

BasicIAController.prototype.receiveupdateIAvar335bally_bisOngame = function(var409, var335, bally) {
	this._receive({_port:"game", _msg:"updateIAvar335bally_bis", var409:var409, var335:var335, bally:bally});
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_padx_var = function(BasicIAController_SC_Following_game_updateIA_padx_var) {
	this.BasicIAController_SC_Following_game_updateIA_padx_var = BasicIAController_SC_Following_game_updateIA_padx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIApadyballxpadx_var = function(BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var) {
	this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var = BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_var335_var = function(BasicIAController_SC_Following_game_updateIA_var335_var) {
	this.BasicIAController_SC_Following_game_updateIA_var335_var = BasicIAController_SC_Following_game_updateIA_var335_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAvar335bally_var = function(BasicIAController_SC_Following_received_game_updateIAvar335bally_var) {
	this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var = BasicIAController_SC_Following_received_game_updateIAvar335bally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_bally_var = function(BasicIAController_SC_Following_game_updateIA_bally_var) {
	this.BasicIAController_SC_Following_game_updateIA_bally_var = BasicIAController_SC_Following_game_updateIA_bally_var;
}

BasicIAController.prototype.initBasicIAController_ctrlx_var = function(BasicIAController_ctrlx_var) {
	this.BasicIAController_ctrlx_var = BasicIAController_ctrlx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_pady_var = function(BasicIAController_SC_Following_game_updateIA_pady_var) {
	this.BasicIAController_SC_Following_game_updateIA_pady_var = BasicIAController_SC_Following_game_updateIA_pady_var;
}

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '\n\treceived_game_updateIApadyballxpadx = ' + this.BasicIAController_SC_Following_received_game_updateIApadyballxpadx_var;
	result += '\n\tgame_updateIA_var335 = ' + this.BasicIAController_SC_Following_game_updateIA_var335_var;
	result += '\n\treceived_game_updateIAvar335bally = ' + this.BasicIAController_SC_Following_received_game_updateIAvar335bally_var;
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '';
	return result;
}

