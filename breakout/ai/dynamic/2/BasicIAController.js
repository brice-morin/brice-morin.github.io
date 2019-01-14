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
		if(161 < 66) {
		setTimeout(() => this.bus.emit('controls?positionvar228y', 0xF6, 0, 0x2B), 0);
		
		} else {
		setTimeout(() => this.bus.emit('controls?positionvar228y_bis', 0x2B, 0, 0xF4), 0);
		
		}
		if(127 < 220) {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionx', 0xFD, ctrlx_const), 0);
		
		} else {
		const ctrlx_const = this.BasicIAController_ctrlx_var;
		setTimeout(() => this.bus.emit('controls?positionx_bis', ctrlx_const, 0x8D), 0);
		
		}
	});
	_initial_BasicIAController_SC.to(BasicIAController_SC_Following);
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballxpadyvar229_bis) => {
		return updateIAballxpadyvar229_bis._port === 'game' && updateIAballxpadyvar229_bis._msg === 'updateIAballxpadyvar229_bis' && (this.BasicIAController_SC_Following_received_game_updateIAballypadx_var);
	}).effect((updateIAballxpadyvar229_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballxpadyvar229_bis.ballx;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballxpadyvar229_bis.pady;
		this.BasicIAController_SC_Following_game_updateIA_var229_var = updateIAballxpadyvar229_bis.var229;
		if(updateIAballxpadyvar229_bis.ballx > this.BasicIAController_SC_Following_game_updateIA_padx_var + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIAballxpadyvar229_bis.ballx < this.BasicIAController_SC_Following_game_updateIA_padx_var - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballypadx_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballxpadyvar229_bis) => {
		return updateIAballxpadyvar229_bis._port === 'game' && updateIAballxpadyvar229_bis._msg === 'updateIAballxpadyvar229_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIAballypadx_var));
	}).effect((updateIAballxpadyvar229_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var = true;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballxpadyvar229_bis.ballx;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballxpadyvar229_bis.pady;
		this.BasicIAController_SC_Following_game_updateIA_var229_var = updateIAballxpadyvar229_bis.var229;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballxpadyvar229) => {
		return updateIAballxpadyvar229._port === 'game' && updateIAballxpadyvar229._msg === 'updateIAballxpadyvar229' && (this.BasicIAController_SC_Following_received_game_updateIAballypadx_var);
	}).effect((updateIAballxpadyvar229) => {
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballxpadyvar229.ballx;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballxpadyvar229.pady;
		this.BasicIAController_SC_Following_game_updateIA_var229_var = updateIAballxpadyvar229.var229;
		if(updateIAballxpadyvar229.ballx > this.BasicIAController_SC_Following_game_updateIA_padx_var + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(updateIAballxpadyvar229.ballx < this.BasicIAController_SC_Following_game_updateIA_padx_var - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballypadx_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballxpadyvar229) => {
		return updateIAballxpadyvar229._port === 'game' && updateIAballxpadyvar229._msg === 'updateIAballxpadyvar229' && (!(this.BasicIAController_SC_Following_received_game_updateIAballypadx_var));
	}).effect((updateIAballxpadyvar229) => {
		this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var = true;
		this.BasicIAController_SC_Following_game_updateIA_ballx_var = updateIAballxpadyvar229.ballx;
		this.BasicIAController_SC_Following_game_updateIA_pady_var = updateIAballxpadyvar229.pady;
		this.BasicIAController_SC_Following_game_updateIA_var229_var = updateIAballxpadyvar229.var229;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballypadx) => {
		return updateIAballypadx._port === 'game' && updateIAballypadx._msg === 'updateIAballypadx' && (this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var);
	}).effect((updateIAballypadx) => {
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadx.bally;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadx.padx;
		if(this.BasicIAController_SC_Following_game_updateIA_ballx_var > updateIAballypadx.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(this.BasicIAController_SC_Following_game_updateIA_ballx_var < updateIAballypadx.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballypadx_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballypadx) => {
		return updateIAballypadx._port === 'game' && updateIAballypadx._msg === 'updateIAballypadx' && (!(this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var));
	}).effect((updateIAballypadx) => {
		this.BasicIAController_SC_Following_received_game_updateIAballypadx_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadx.bally;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadx.padx;
	});
	BasicIAController_SC_Following.to(BasicIAController_SC_Following).when((updateIAballypadx_bis) => {
		return updateIAballypadx_bis._port === 'game' && updateIAballypadx_bis._msg === 'updateIAballypadx_bis' && (this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var);
	}).effect((updateIAballypadx_bis) => {
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadx_bis.bally;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadx_bis.padx;
		if(this.BasicIAController_SC_Following_game_updateIA_ballx_var > updateIAballypadx_bis.padx + 400) {
		this.BasicIAController_ctrlx_var = this.BasicIAController_ctrlx_var + 4;
		this.bus.emit('ctrlx=', this.BasicIAController_ctrlx_var);
		
		} else {
		if(this.BasicIAController_SC_Following_game_updateIA_ballx_var < updateIAballypadx_bis.padx - 400) {
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
		this.BasicIAController_SC_Following_received_game_updateIAballypadx_var = false;
		this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var = false;
	});
	BasicIAController_SC_Following.to(null).when((updateIAballypadx_bis) => {
		return updateIAballypadx_bis._port === 'game' && updateIAballypadx_bis._msg === 'updateIAballypadx_bis' && (!(this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var));
	}).effect((updateIAballypadx_bis) => {
		this.BasicIAController_SC_Following_received_game_updateIAballypadx_var = true;
		this.BasicIAController_SC_Following_game_updateIA_bally_var = updateIAballypadx_bis.bally;
		this.BasicIAController_SC_Following_game_updateIA_padx_var = updateIAballypadx_bis.padx;
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

BasicIAController.prototype.receiveupdateIAballypadxOngame = function(var298, padx, bally) {
	this._receive({_port:"game", _msg:"updateIAballypadx", var298:var298, padx:padx, bally:bally});
}

BasicIAController.prototype.receiveupdateIAballxpadyvar229Ongame = function(ballx, var229, var299, pady) {
	this._receive({_port:"game", _msg:"updateIAballxpadyvar229", ballx:ballx, var229:var229, var299:var299, pady:pady});
}

BasicIAController.prototype.receiveupdateIAballypadx_bisOngame = function(bally, padx, var304) {
	this._receive({_port:"game", _msg:"updateIAballypadx_bis", bally:bally, padx:padx, var304:var304});
}

BasicIAController.prototype.receiveupdateIAballxpadyvar229_bisOngame = function(var305, ballx, var229, pady) {
	this._receive({_port:"game", _msg:"updateIAballxpadyvar229_bis", var305:var305, ballx:ballx, var229:var229, pady:pady});
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_var229_var = function(BasicIAController_SC_Following_game_updateIA_var229_var) {
	this.BasicIAController_SC_Following_game_updateIA_var229_var = BasicIAController_SC_Following_game_updateIA_var229_var;
}

BasicIAController.prototype.initBasicIAController_ctrlx_var = function(BasicIAController_ctrlx_var) {
	this.BasicIAController_ctrlx_var = BasicIAController_ctrlx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAballypadx_var = function(BasicIAController_SC_Following_received_game_updateIAballypadx_var) {
	this.BasicIAController_SC_Following_received_game_updateIAballypadx_var = BasicIAController_SC_Following_received_game_updateIAballypadx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_game_updateIA_ballx_var = function(BasicIAController_SC_Following_game_updateIA_ballx_var) {
	this.BasicIAController_SC_Following_game_updateIA_ballx_var = BasicIAController_SC_Following_game_updateIA_ballx_var;
}

BasicIAController.prototype.initBasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var = function(BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var) {
	this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var = BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var;
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

BasicIAController.prototype.toString = function() {
	let result = 'instance ' + this.name + ':' + this.constructor.name + '\n';
	result += '\n\tgame_updateIA_var229 = ' + this.BasicIAController_SC_Following_game_updateIA_var229_var;
	result += '\n\tctrlx = ' + this.BasicIAController_ctrlx_var;
	result += '\n\treceived_game_updateIAballypadx = ' + this.BasicIAController_SC_Following_received_game_updateIAballypadx_var;
	result += '\n\tgame_updateIA_ballx = ' + this.BasicIAController_SC_Following_game_updateIA_ballx_var;
	result += '\n\treceived_game_updateIAballxpadyvar229 = ' + this.BasicIAController_SC_Following_received_game_updateIAballxpadyvar229_var;
	result += '\n\tgame_updateIA_pady = ' + this.BasicIAController_SC_Following_game_updateIA_pady_var;
	result += '\n\tgame_updateIA_bally = ' + this.BasicIAController_SC_Following_game_updateIA_bally_var;
	result += '\n\tgame_updateIA_padx = ' + this.BasicIAController_SC_Following_game_updateIA_padx_var;
	result += '';
	return result;
}

