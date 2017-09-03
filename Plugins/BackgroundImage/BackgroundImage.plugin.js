//META{"name":"BackgroundImage", "pname":"BackgroundImage"}*//

var config;

class BackgroundImage {

	constructor() {}

	start() {
		BdApi.injectCSS("BackgroundImage",`
			.background-image {
				background: cover no-repeat center center fixed;
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
			.app {
				background-image: none;
			    background: transparent !important;
			    z-index: 5 !important;
			}
			.titlebar {
			    background: transparent !important;
			}
		`);
		$(".app").before('<div class="background-image"></div>');
		this.loadConfigs();
		this.Log("Started");
	}

	stop() {
		this.saveConfigs();
		$(".background-image").remove();
		BdApi.clearCSS("BackgroundImage");
		this.Log("Stopped");
	}

	loadConfigs() {
        this.config = bdPluginStorage.get(this.getName(), "config");
        if(this.config == null || undefined) {
        	this.Log("No configs found");
        	this.config = { url: "none", css: "none" };
        }
        this.Log("Loaded Configs: " + JSON.stringify(this.config));
    }

    saveConfigs() {
        bdPluginStorage.set(this.getName(), "config", this.config);
        this.Log("Configs Saved");
    }

    save(button) {
		var url = document.getElementById('BI_URL').value;
		var css = document.getElementById('BI_CSS').value;

		this.config.url = url;
		this.config.css = css;

		bdPluginStorage.set(this.getName(), "config", JSON.stringify(config));
		this.stop();
		this.start();

		this.updateCSS();

		button.innerHTML = "Saved and applied!";

		setTimeout(()=>{button.innerHTML = "Save and apply";},1000);
    }

    resetConfigs() {
    	this.config = { url: "none", css: "none" };
		bdPluginStorage.set(this.getName(), "config", JSON.stringify(config));
		this.Log("Configs Reset");
    }

    reset(button) {
    	this.config = { url: "none", css: "none" };
		bdPluginStorage.set(this.getName(), "config", JSON.stringify(config));
		this.stop();
		this.start();
		button.innerHTML = "Configs Reset!";
		setTimeout(function(){button.innerHTML = "Reset config";},1000);
    }

    updateCSS() {
    	BdApi.clearCSS("BackgroundImageCSS");
    	BdApi.injectCSS("BackgroundImageCSS",`
			.background-image {
				background: url(` + this.config.url + `);
				`+ this.config.css + `
			}
		`);
    }

	getSettingsPanel() {
		var html = "<font color=\"white\"><h3>Configs</h3><br>";
		html += "Background Image Link<br>";
		html +=	"<input id='BI_URL' type='text' value='" + (this.config.url) + "' style='width:100% !important;'> <br><br>";
		html += "<input id='BI_CSS' type='text' value='" + (this.config.css) + "' style='width:100% !important;'> <br><br>";

		html +="<br><button onclick=BdApi.getPlugin('"+this.getName()+"').save(this)>Save and apply</button>";
		html +="<button onclick=BdApi.getPlugin('"+this.getName()+"').reset(this)>Reset config</button> <br><br>";

		html +="Example Link:<br>";
		html +="<textarea style='width:100% !important;' readonly>https://i.imgur.com/tHvs7Xt.jpg</textarea><br>"
		html +="Example CSS: Blur<br>";
		html +="<textarea style='width:100% !important;' readonly>-webkit-filter: blur(2px); filter: blur(2px);</textarea><br><br>";

		html += "How to use:";
		html += "<br>1) Paste in the link you want as your background.";
		html += "<br>2) Add custom css to edit the background image.";
		html += "<br>3) Click \"Save and apply\".</font>";

		return html;
	}

	observer() {}
	onSwitch() {}
    onMessage() {}
    load() { this.Log("Loaded") }
    unload() { this.Log("Unloaded") }
    getName() { return "BackgroundImage"; }
    getDescription() { return "Add a class to allow background images for easy background customization."; }
    getVersion() { return "1.0.0"; }
    getAuthor() { return "HansAnonymous"; }
    Log(msg, reason, method = "log") {
		if(reason === undefined) {
			console[method]("%c[" + this.getName() + "]%c " + msg, "color: #008888; font-weight: bold;", "");
		} else {
			console[method]("%c[" + this.getName() + "]%c " + msg + " with reason: " + reason, "color: #008888; font-weight: bold;", "");
		}
	}
}
