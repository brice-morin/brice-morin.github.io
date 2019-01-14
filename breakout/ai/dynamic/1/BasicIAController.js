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
		if(180 < 223) {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionyx', 0, ctrlx_const, 0xA5), 0);
		
		} else {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionyx_bis', ctrlx_const, 0x6B, 0), 0);
		
		}
		if(102 < 192) {
		setTimeout(() => this.bus.emit('controls?positionvar122', 0x5A, 0xF1), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar122_bis', 0x5A, 0xB2), 0);
		
		}
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballypady) => {
		return updateIAballypady._port === 'game' && updateIAballypady._msg === 'updateIAballypady' && (this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var);
	}).effect((updateIAballypady) => {
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypady.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypady.pady;
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
		this.BasicIAController_SC_Following_received_game_updateIAballypady_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballypady) => {
		return updateIAballypady._port === 'game' && updateIAballypady._msg === 'updateIAballypady' && (!(this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var));
	}).effect((updateIAballypady) => {
		this.BasicIAController_SC_Following_received_game_updateIAballypady_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypady.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypady.pady;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballypady_bis) => {
		return updateIAballypady_bis._port === 'game' && updateIAballypady_bis._msg === 'updateIAballypady_bis' && (this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var);
	}).effect((updateIAballypady_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypady_bis.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypady_bis.pady;
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
		this.BasicIAController_SC_Following_received_game_updateIAballypady_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballypady_bis) => {
		return updateIAballypady_bis._port === 'game' && updateIAballypady_bis._msg === 'updateIAballypady_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var));
	}).effect((updateIAballypady_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIAballypady_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypady_bis.bally;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballypady_bis.pady;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballxpadxvar123_bis) => {
		return updateIAballxpadxvar123_bis._port === 'game' && updateIAballxpadxvar123_bis._msg === 'updateIAballxpadxvar123_bis' && (this.BasicIAController_SC_Following_received_game_updateIAballypady_var);
	}).effect((updateIAballxpadxvar123_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballxpadxvar123_bis.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballxpadxvar123_bis.padx;
		this.BasicIAController_SC_Following_game_updateIA_var123_var = updateIAballxpadxvar123_bis.var123;
		if(updateIAballxpadxvar123_bis.ballx > updateIAballxpadxvar123_bis.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIAballxpadxvar123_bis.ballx < updateIAballxpadxvar123_bis.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballypady_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballxpadxvar123_bis) => {
		return updateIAballxpadxvar123_bis._port === 'game' && updateIAballxpadxvar123_bis._msg === 'updateIAballxpadxvar123_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIAballypady_var));
	}).effect((updateIAballxpadxvar123_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var = true;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballxpadxvar123_bis.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballxpadxvar123_bis.padx;
		this.BasicIAController_SC_Following_game_updateIA_var123_var = updateIAballxpadxvar123_bis.var123;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballxpadxvar123) => {
		return updateIAballxpadxvar123._port === 'game' && updateIAballxpadxvar123._msg === 'updateIAballxpadxvar123' && (this.BasicIAController_SC_Following_received_game_updateIAballypady_var);
	}).effect((updateIAballxpadxvar123) => {
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballxpadxvar123.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballxpadxvar123.padx;
		this.BasicIAController_SC_Following_game_updateIA_var123_var = updateIAballxpadxvar123.var123;
		if(updateIAballxpadxvar123.ballx > updateIAballxpadxvar123.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIAballxpadxvar123.ballx < updateIAballxpadxvar123.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballypady_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballxpadxvar123) => {
		return updateIAballxpadxvar123._port === 'game' && updateIAballxpadxvar123._msg === 'updateIAballxpadxvar123' && (!(this.BasicIAController_SC_Following_received_game_updateIAballypady_var));
	}).effect((updateIAballxpadxvar123) => {
		this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var = true;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballxpadxvar123.ballx;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballxpadxvar123.padx;
		this.BasicIAController_SC_Following_game_updateIA_var123_var = updateIAballxpadxvar123.var123;
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

BasicIAController.prototype.receiveupdateIAballypadyOngame = function(pady, bally, var192) {
	this._receive({_port:"game", _msg:"updateIAballypady", pady:pady, bally:bally, var192:var192});
}

BasicIAController.prototype.receiveupdateIAballxpadxvar123Ongame = function(var193, padx, ballx, var123) {
	this._receive({_port:"game", _msg:"updateIAballxpadxvar123", var193:var193, padx:padx, ballx:ballx, var123:var123});
}

BasicIAController.prototype.receiveupdateIAballypady_bisOngame = function(bally, var198, pady) {
	this._receive({_port:"game", _msg:"updateIAballypady_bis", bally:bally, var198:var198, pady:pady});
}

BasicIAController.prototype.receiveupdateIAballxpadxvar123_bisOngame = function(ballx, var123, var199, padx) {
	this._receive({_port:"game", _msg:"updateIAballxpadxvar123_bis", ballx:ballx, var123:var123, var199:var199, padx:padx});
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAballypady_var = function(BasicIAController_SC_Following_received_game_updateIAballypady_var) {
	this.BasicIAController_SC_Following_received_game_updateIAballypady_var = BasicIAController_SC_Following_received_game_updateIAballypady_var;
}

BasicIAController.prototype.initBasicIAController_ctrlx_var = function(BasicIAController_ctrlx_var) {
	this.BasicIAController_ctrlx_var = BasicIAController_ctrlx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_var123_var = function(BasicIAController_SC_Following_game_updateIA_var123_var) {
	this.BasicIAController_SC_Following_game_updateIA_var123_var = BasicIAController_SC_Following_game_updateIA_var123_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_bally_var = function(BasicIAController_SC_Following_game_updateIA_bally_var) {
	this.BasicIAController_SC_Following_game_updateIA_bally_var = BasicIAController_SC_Following_game_updateIA_bally_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var = function(BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var) {
	this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var = BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_pady_var = function(BasicIAController_SC_Following_game_updateIA_pady_var) {
	this.BasicIAController_SC_Following_game_updateIA_pady_var = BasicIAController_SC_Following_game_updateIA_pady_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_padx_var = function(BasicIAController_SC_Following_game_updateIA_padx_var) {
	this.BasicIAController_SC_Following_game_updateIA_padx_var = BasicIAController_SC_Following_game_updateIA_padx_var;
}

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\treceived_game_updateIAballypady = ' + this.BasicIAController_SC_Following_received_game_updateIAballypady_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\tgame_updateIA_var123 = ' + this.BasicIAController_SC_Following_game_updateIA_var123_var;
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\treceived_game_updateIAballxpadxvar123 = ' + this.BasicIAController_SC_Following_received_game_updateIAballxpadxvar123_var;
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '';
	return result;
}

