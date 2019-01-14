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
		if(174 < 178) {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionvar440xy', ctrlx_const, 0x78, 0x91, 0), 0);
		
		} else {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionvar440xy_bis', 0x9B, 0x78, 0, ctrlx_const), 0);
		
		}
		if(108 < 202) {
		setTimeout(() => this.bus.emit('controls?position_', 0xCB), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?position__bis', 0x65), 0);
		
		}
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAvar441bally) => {
		return updateIAvar441bally._port === 'game' && updateIAvar441bally._msg === 'updateIAvar441bally' && (this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var);
	}).effect((updateIAvar441bally) => {
		this.BasicIAController_SC_Following_game_updateIA_var441_var = updateIAvar441bally.var441;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAvar441bally.bally;
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
		this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var = false;
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAvar441bally) => {
		return updateIAvar441bally._port === 'game' && updateIAvar441bally._msg === 'updateIAvar441bally' && (!(this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var));
	}).effect((updateIAvar441bally) => {
		this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var = true;
		this.BasicIAController_SC_Following_game_updateIA_var441_var = updateIAvar441bally.var441;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAvar441bally.bally;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIApadypadxballx_bis) => {
		return updateIApadypadxballx_bis._port === 'game' && updateIApadypadxballx_bis._msg === 'updateIApadypadxballx_bis' && (this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var);
	}).effect((updateIApadypadxballx_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadypadxballx_bis.pady;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadypadxballx_bis.padx;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadypadxballx_bis.ballx;
		if(updateIApadypadxballx_bis.ballx > updateIApadypadxballx_bis.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIApadypadxballx_bis.ballx < updateIApadypadxballx_bis.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIApadypadxballx_bis) => {
		return updateIApadypadxballx_bis._port === 'game' && updateIApadypadxballx_bis._msg === 'updateIApadypadxballx_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var));
	}).effect((updateIApadypadxballx_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var = true;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadypadxballx_bis.pady;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadypadxballx_bis.padx;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadypadxballx_bis.ballx;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAvar441bally_bis) => {
		return updateIAvar441bally_bis._port === 'game' && updateIAvar441bally_bis._msg === 'updateIAvar441bally_bis' && (this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var);
	}).effect((updateIAvar441bally_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_var441_var = updateIAvar441bally_bis.var441;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAvar441bally_bis.bally;
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
		this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var = false;
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAvar441bally_bis) => {
		return updateIAvar441bally_bis._port === 'game' && updateIAvar441bally_bis._msg === 'updateIAvar441bally_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var));
	}).effect((updateIAvar441bally_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var = true;
		this.BasicIAController_SC_Following_game_updateIA_var441_var = updateIAvar441bally_bis.var441;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAvar441bally_bis.bally;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIApadypadxballx) => {
		return updateIApadypadxballx._port === 'game' && updateIApadypadxballx._msg === 'updateIApadypadxballx' && (this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var);
	}).effect((updateIApadypadxballx) => {
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadypadxballx.pady;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadypadxballx.padx;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadypadxballx.ballx;
		if(updateIApadypadxballx.ballx > updateIApadypadxballx.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIApadypadxballx.ballx < updateIApadypadxballx.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIApadypadxballx) => {
		return updateIApadypadxballx._port === 'game' && updateIApadypadxballx._msg === 'updateIApadypadxballx' && (!(this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var));
	}).effect((updateIApadypadxballx) => {
		this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var = true;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIApadypadxballx.pady;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIApadypadxballx.padx;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIApadypadxballx.ballx;
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

BasicIAController.prototype.receiveupdateIApadypadxballxOngame = function(padx, pady, var510, ballx) {
	this._receive({_port:"game", _msg:"updateIApadypadxballx", padx:padx, pady:pady, var510:var510, ballx:ballx});
}

BasicIAController.prototype.receiveupdateIAvar441ballyOngame = function(var511, bally, var441) {
	this._receive({_port:"game", _msg:"updateIAvar441bally", var511:var511, bally:bally, var441:var441});
}

BasicIAController.prototype.receiveupdateIApadypadxballx_bisOngame = function(pady, var516, ballx, padx) {
	this._receive({_port:"game", _msg:"updateIApadypadxballx_bis", pady:pady, var516:var516, ballx:ballx, padx:padx});
}

BasicIAController.prototype.receiveupdateIAvar441bally_bisOngame = function(var517, bally, var441) {
	this._receive({_port:"game", _msg:"updateIAvar441bally_bis", var517:var517, bally:bally, var441:var441});
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIApadypadxballx_var = function(BasicIAController_SC_Following_received_game_updateIApadypadxballx_var) {
	this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var = BasicIAController_SC_Following_received_game_updateIApadypadxballx_var;
}

BasicIAController.prototype.initBasicIAController_ctrlx_var = function(BasicIAController_ctrlx_var) {
	this.BasicIAController_ctrlx_var = BasicIAController_ctrlx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_bally_var = function(BasicIAController_SC_Following_game_updateIA_bally_var) {
	this.BasicIAController_SC_Following_game_updateIA_bally_var = BasicIAController_SC_Following_game_updateIA_bally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_pady_var = function(BasicIAController_SC_Following_game_updateIA_pady_var) {
	this.BasicIAController_SC_Following_game_updateIA_pady_var = BasicIAController_SC_Following_game_updateIA_pady_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAvar441bally_var = function(BasicIAController_SC_Following_received_game_updateIAvar441bally_var) {
	this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var = BasicIAController_SC_Following_received_game_updateIAvar441bally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_padx_var = function(BasicIAController_SC_Following_game_updateIA_padx_var) {
	this.BasicIAController_SC_Following_game_updateIA_padx_var = BasicIAController_SC_Following_game_updateIA_padx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_var441_var = function(BasicIAController_SC_Following_game_updateIA_var441_var) {
	this.BasicIAController_SC_Following_game_updateIA_var441_var = BasicIAController_SC_Following_game_updateIA_var441_var;
}

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\treceived_game_updateIApadypadxballx = ' + this.BasicIAController_SC_Following_received_game_updateIApadypadxballx_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '\n\treceived_game_updateIAvar441bally = ' + this.BasicIAController_SC_Following_received_game_updateIAvar441bally_var;
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\tgame_updateIA_var441 = ' + this.BasicIAController_SC_Following_game_updateIA_var441_var;
	result += '';
	return result;
}

