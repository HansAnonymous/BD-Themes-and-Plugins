//META{"name":"BackgroundImage", "pname":"BackgroundImage"}*//

class BackgroundImage {
	start() {
		BdApi.injectCSS("BackgroundImage",`
			.background-image {
				position: absolute;
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
		`);
		$(".app").before('<div class="background-image"></div>');
		this.Log("Started");
	}

	stop() {
		$(".background-image").remove();
		
		this.Log("Stopped");
	}

	observer() {}
	onSwitch() {}
    onMessage() {}
    getSettingsPanel() {}
    load() { this.Log("Loaded") }
    unload() { this.Log("Unloaded") }
    getName() { return "BackgroundImage"; }
    getDescription() { return "Add a class to allow background images for easy background customization."; }
    getVersion() { return "0.0.1"; }
    getAuthor() { return "HansAnonymous"; }
    Log(msg, reason, method = "log") {
		if(reason === undefined) {
			console[method]("%c[" + this.getName() + "]%c " + msg, "color: #008888; font-weight: bold;", "");
		} else {
			console[method]("%c[" + this.getName() + "]%c " + msg + " with reason: " + reason, "color: #008888; font-weight: bold;", "");
		}
	}
}
