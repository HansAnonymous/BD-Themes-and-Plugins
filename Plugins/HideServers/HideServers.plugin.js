//META{"name":"HideServers"}*//

var HideServers = function() {}

HideServers.prototype.pluginName = "Hide Servers Plugin";

HideServers.prototype.getName = function() {
	return this.pluginName;
};

HideServers.prototype.getDescription = function() {
	return 'Hide Servers Plugin</br></br>Select a number of servers to hide. This will hide from the bottom of the list. (To prevent new servers from being hidden)';
};

HideServers.prototype.getVersion = function() {
	return '1';
};

HideServers.prototype.getAuthor = function() {
	return '<a href="http://hansanonymous.weebly.com">HansAnonymous#8784</a>';
};

HideServers.prototype.load = function()	{ 
	this.Log("Loaded");
	this.hide();
};

HideServers.prototype.update = function() {
	this.Log("Updated");
	
	if(bdPluginStorage.get(this.pluginName, "servers") !== 0) {
		var num = parseInt($('#hsServers').val()); 
		bdPluginStorage.set(this.pluginName, "servers", num); 
	} else {
		bdPluginStorage.set(this.pluginName, "servers", 0);
	}

	this.hide();
};

HideServers.prototype.hide = function() {
	var serv = bdPluginStorage.get(this.pluginName, 'servers');
	var str = '';
	for(var i = serv + 1; i > 1; i--) {
		str += ':not(.dms) .guild:nth-last-child(' + i + ')';
		if(i != 2) {
			str += ',';
		}
	}
	str += '{ display : none; }';
	str += ':not(.dms) .guild:nth-child(1), :not(.dms) .guild:nth-child(2) { display: inherit; }';
	BdApi.injectCSS('HideServers', str);
}
HideServers.prototype.start = function() { this.Log("Started"); };
HideServers.prototype.stop = function()	{ this.Log("Stopped");};
HideServers.prototype.unload = function(){ this.Log("Unloaded");};
HideServers.prototype.onMessage = function() {};
HideServers.prototype.onSwitch = function()  {};
HideServers.prototype.observer = function(e) {};

HideServers.prototype.getSettingsPanel = function () {
	return `<label> Number of servers to hide from the bottom </label><br><br>
			<b>Enter number of servers to hide: </b>
			<input type="number" id="hsServers" value="${bdPluginStorage.get(this.pluginName, 'servers')}" /><br><br>
			<button id = 'save' onClick='HideServers.prototype.update()'>Save settings</button><br>
			<br><br><label> Note: Be careful with really high numbers like 50000... <br><br>...not that you would have that many servers`;
};

//Thanks for this from HoLLy#2750
HideServers.prototype.Log = function(msg, method = "log") {
	console[method]("%c[" + this.pluginName + "]%c " + msg, "color: #008888; font-weight: bold;", "");
};
