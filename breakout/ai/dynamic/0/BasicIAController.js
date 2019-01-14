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
		if(139 < 198) {
		setTimeout(() => this.bus.emit('controls?positionvar16', 0x58, 0x07), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar16_bis', 0xB7, 0x58), 0);
		
		}
		if(213 < 78) {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionyx', ctrlx_const, 0, 0x9C), 0);
		
		} else {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionyx_bis', ctrlx_const, 0xD3, 0), 0);
		
		}
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballypadyballxpadxvar17) => {
		return updateIAballypadyballxpadxvar17._port === 'game' && updateIAballypadyballxpadxvar17._msg === 'updateIAballypadyballxpadxvar17' && (this.BasicIAController_SC_Following_received_game_updateIA__var);
	}).effect((updateIAballypadyballxpadxvar17) => {
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadyballxpadxvar17.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypadyballxpadxvar17.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballypadyballxpadxvar17.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadyballxpadxvar17.padx;
		this.BasicIAController_SC_Following_game_updateIA_var17_var = updateIAballypadyballxpadxvar17.var17;
		if(updateIAballypadyballxpadxvar17.ballx > updateIAballypadyballxpadxvar17.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIAballypadyballxpadxvar17.ballx < updateIAballypadyballxpadxvar17.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var = false;
		this.BasicIAController_SC_Following_received_game_updateIA__var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballypadyballxpadxvar17) => {
		return updateIAballypadyballxpadxvar17._port === 'game' && updateIAballypadyballxpadxvar17._msg === 'updateIAballypadyballxpadxvar17' && (!(this.BasicIAController_SC_Following_received_game_updateIA__var));
	}).effect((updateIAballypadyballxpadxvar17) => {
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadyballxpadxvar17.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypadyballxpadxvar17.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballypadyballxpadxvar17.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadyballxpadxvar17.padx;
		this.BasicIAController_SC_Following_game_updateIA_var17_var = updateIAballypadyballxpadxvar17.var17;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIA__bis) => {
		return updateIA__bis._port === 'game' && updateIA__bis._msg === 'updateIA__bis' && (this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var);
	}).effect((updateIA__bis) => {
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
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIA__bis) => {
		return updateIA__bis._port === 'game' && updateIA__bis._msg === 'updateIA__bis' && (!(this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var));
	}).effect((updateIA__bis) => {
		this.BasicIAController_SC_Following_received_game_updateIA__var = true;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIA_) => {
		return updateIA_._port === 'game' && updateIA_._msg === 'updateIA_' && (this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var);
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
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIA_) => {
		return updateIA_._port === 'game' && updateIA_._msg === 'updateIA_' && (!(this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var));
	}).effect((updateIA_) => {
		this.BasicIAController_SC_Following_received_game_updateIA__var = true;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballypadyballxpadxvar17_bis) => {
		return updateIAballypadyballxpadxvar17_bis._port === 'game' && updateIAballypadyballxpadxvar17_bis._msg === 'updateIAballypadyballxpadxvar17_bis' && (this.BasicIAController_SC_Following_received_game_updateIA__var);
	}).effect((updateIAballypadyballxpadxvar17_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadyballxpadxvar17_bis.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypadyballxpadxvar17_bis.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballypadyballxpadxvar17_bis.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadyballxpadxvar17_bis.padx;
		this.BasicIAController_SC_Following_game_updateIA_var17_var = updateIAballypadyballxpadxvar17_bis.var17;
		if(updateIAballypadyballxpadxvar17_bis.ballx > updateIAballypadyballxpadxvar17_bis.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIAballypadyballxpadxvar17_bis.ballx < updateIAballypadyballxpadxvar17_bis.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var = false;
		this.BasicIAController_SC_Following_received_game_updateIA__var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballypadyballxpadxvar17_bis) => {
		return updateIAballypadyballxpadxvar17_bis._port === 'game' && updateIAballypadyballxpadxvar17_bis._msg === 'updateIAballypadyballxpadxvar17_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIA__var));
	}).effect((updateIAballypadyballxpadxvar17_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadyballxpadxvar17_bis.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypadyballxpadxvar17_bis.pady;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballypadyballxpadxvar17_bis.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadyballxpadxvar17_bis.padx;
		this.BasicIAController_SC_Following_game_updateIA_var17_var = updateIAballypadyballxpadxvar17_bis.var17;
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

BasicIAController.prototype.receiveupdateIA_Ongame = function(var84) {
	this._receive({_port:"game", _msg:"updateIA_", var84:var84});
}

BasicIAController.prototype.receiveupdateIAballypadyballxpadxvar17Ongame = function(bally, var17, pady, padx, ballx, var85) {
	this._receive({_port:"game", _msg:"updateIAballypadyballxpadxvar17", bally:bally, var17:var17, pady:pady, padx:padx, ballx:ballx, var85:var85});
}

BasicIAController.prototype.receiveupdateIA__bisOngame = function(var90) {
	this._receive({_port:"game", _msg:"updateIA__bis", var90:var90});
}

BasicIAController.prototype.receiveupdateIAballypadyballxpadxvar17_bisOngame = function(var17, pady, var91, padx, ballx, bally) {
	this._receive({_port:"game", _msg:"updateIAballypadyballxpadxvar17_bis", var17:var17, pady:pady, var91:var91, padx:padx, ballx:ballx, bally:bally});
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_pady_var = function(BasicIAController_SC_Following_game_updateIA_pady_var) {
	this.BasicIAController_SC_Following_game_updateIA_pady_var = BasicIAController_SC_Following_game_updateIA_pady_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_bally_var = function(BasicIAController_SC_Following_game_updateIA_bally_var) {
	this.BasicIAController_SC_Following_game_updateIA_bally_var = BasicIAController_SC_Following_game_updateIA_bally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_padx_var = function(BasicIAController_SC_Following_game_updateIA_padx_var) {
	this.BasicIAController_SC_Following_game_updateIA_padx_var = BasicIAController_SC_Following_game_updateIA_padx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var = function(BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var) {
	this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var = BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var;
}

BasicIAController.prototype.initBasicIAController_ctrlx_var = function(BasicIAController_ctrlx_var) {
	this.BasicIAController_ctrlx_var = BasicIAController_ctrlx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_var17_var = function(BasicIAController_SC_Following_game_updateIA_var17_var) {
	this.BasicIAController_SC_Following_game_updateIA_var17_var = BasicIAController_SC_Following_game_updateIA_var17_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIA__var = function(BasicIAController_SC_Following_received_game_updateIA__var) {
	this.BasicIAController_SC_Following_received_game_updateIA__var = BasicIAController_SC_Following_received_game_updateIA__var;
}

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '\n\treceived_game_updateIAballypadyballxpadxvar17 = ' + this.BasicIAController_SC_Following_received_game_updateIAballypadyballxpadxvar17_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\tgame_updateIA_var17 = ' + this.BasicIAController_SC_Following_game_updateIA_var17_var;
	result += '\n\treceived_game_updateIA_ = ' + this.BasicIAController_SC_Following_received_game_updateIA__var;
	result += '';
	return result;
}

