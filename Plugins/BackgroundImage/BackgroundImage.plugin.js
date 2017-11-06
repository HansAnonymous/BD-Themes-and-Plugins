//META{"name":"BackgroundImage", "pname":"BackgroundImage"}*//

var config;
var classes = ".theme-dark .ui-standard-sidebar-view .content-region,	.theme-dark .ui-standard-sidebar-view .sidebar-region, .search-header, .theme-dark .chat, #voice-connection, #friends, #friends .btn, .friends-header, .friends-table,	.search-bar, .guild-channels, .account, .links, .messages-wrapper, .title-wrap, .chat-empty, .message-group-blocked, .private-channels, .guild-header header, .ider-red span, .theme-light .chat, .typing, .typing-animate, .friends-row:hover, .search-result:hover, .btn-friends.selected, .search-result.selected, .channel.selected.private, .channel.channel-text.selected, .guild-channels,  #voice-connection,  .account, .guilds, .account .btn, #voice-connection .btn, .channel-textarea-inner, .theme-light .channel-textarea-inner textarea, .member.member-status.member-status-online, .auth-inner .auth-logo, .auth-inner .auth-name, .auth-inner .auth-name:after, .header-1tSljs, .container-3NvGrL, .flexChild-1KGW5q, .name-3gtcmp, .container-RYiLUQ, .wrapper-2ldvyE, .private-channels .channel.selected a, .private-channels .channel:hover a, .private-channels, .ui-standard-sidebar-view,.container-iksrDt, .CodeMirror.cm-s-material.CodeMirror-simplescroll, .typing, .typing-animate, .guilds-wrapper, .channels-wrap, .chat .content, .channel-members .member.popout-open .theme-dark .links, .theme-dark .links .theme-light .account, .theme-light .links,.CodeMirror-scroll, #bd-customcss-attach-controls, .autocomplete-1TnWNR.autocomplete-1LLKUa, .CodeMirror-gutter.CodeMirror-linenumbers, #bd-customcss-detach-controls-button .btn.btn-primary, .selectorSelected-2M0IGv.selector-nbyEfM.selectable-3iSmAf, .innerEnabled-gLHeOL.inner-3if5cm.flex-3B1Tl4.innerAutocomplete-2qsvzH, .buttonBrandFilledDefault-2Rs6u5.buttonFilledDefault-AELjWf.buttonDefault-2OLW-v.button-2t3of8.buttonFilled-29g7b5.buttonBrandFilled-3Mv0Ra.mediumGrow-uovsMu, #bd-customcss-detach-controls-button .btn.btn-primary:hover, .autocompleteRowVertical-3_UxVA.autocompleteRow-31UJBI, .buttonBrandFilledDefault-2Rs6u5.buttonFilledDefault-AELjWf.buttonDefault-2OLW-v.button-2t3of8.buttonFilled-29g7b5.buttonBrandFilled-3Mv0Ra.mediumGrow-uovsMu:hover, .content-region#bd-settingspane-container .content-column.default, .bda-slist li, .private-channel-call, .private-channels .channel:hover, .private-channels .channel.selected, #rmenu, .mention, .create-guild-container, .create-guild-container .actions, .create-guild-container .actions .action.create, .create-guild-container .actions .action.join, .inner-1_1f7b, .modal-3HOjGZ.modal-2CasLk.sizeSmall-1sh0-r, .flex-lFgbSz.flex-3B1Tl4.horizontalReverse-2LanvO.horizontalReverse-k5PqxT.flex-3B1Tl4.directionRowReverse-2eZTxP.justifyStart-2yIZo0.alignStretch-1hwxMa.noWrap-v6g9vO.footer-1PYmcw, .headerNormal-1cioxU.header-3mZJcV, .body-3rkFrF, .footer-2J5zqP, .guild-inner, .scroller-fzNley.channel-members, .titlebar { background: rgba(0,0,0,";

class BackgroundImage {

	constructor() {}

	start() {
		BdApi.injectCSS("BackgroundImage",`
			/*@import url(https://www.gitcdn.xyz/repo/HansAnonymous/BD-Themes-and-Plugins/master/Themes/Transparent/Transparent.css);*/
			.layers, .layer {
				background: transparent !important;
			}
			/*::-webkit-scrollbar, ::-webkit-scrollbar-track, ::-webkit-scroll-track-piece {
				display: none;
			}*/
			.app.flex-vertical.theme-dark, .layers.flex-vertical.flex-spacer, .layer, .container-2OU7Cz, .titleWrapper-3Vi_wz, .theme-dark .title-qAcLxz {
			    background: transparent;
			}
			.directionColumn-2h-LPR, .channelTextArea-1HTP3C, .flex-spacer.flex-vertical form {
			    background-color: rgba(0,0,0,0.2);
			}
			.background-image {
				background: cover !important;
				background-repeat: no-repeat !important;
				background-position: center center !important;
				position: fixed;
				left: 0;
				top: 0;
				width: 100% !important;
				height: 100% !important;
			}
			.app {
				background-image: none;
			    background: transparent !important;
			    z-index: 5 !important;
			}
			.markup, body {
			    backface-visibility: hidden;
			    -webkit-backface-visibility: hidden;
			}
			.clear_input {
				transform: translateX(-16px);
			}
			.titlebar {
			    background: transparent !important;
			}
		`);
		$(".app").before('<div class="background-image"></div>');
		$('#BI_URL').clearSearch();
		$('#BI_CSS').clearSearch();
		$('#BI_SHADE').clearSearch();
		this.loadConfigs();
		this.updateCSS();
		this.Log("Started");
	}

	stop() {
		this.saveConfigs();
		$(".background-image").remove();
		BdApi.clearCSS("BackgroundImage");
		BdApi.clearCSS("BackgroundImageCSS");
		this.Log("Stopped");
	}

	loadConfigs() {
        this.config = bdPluginStorage.get(this.getName(), "config");
        if(this.config == null || undefined) {
        	this.Log("No configs found");
        	this.config = { url: "none", css: "none" , shade: "0"};
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
		var shade = document.getElementById('BI_SHADE').value;

		this.config.url = url;
		this.config.css = css;
		this.config.shade = shade;

		bdPluginStorage.set(this.getName(), "config", JSON.stringify(config));
		this.stop();
		this.start();

		this.updateCSS();

		button.innerHTML = "Saved and applied!";

		setTimeout(()=>{button.innerHTML = "Save and apply";},1000);
    }

    resetConfigs() {
    	this.config = { url: "none", css: "none" , shade: "0" };
		bdPluginStorage.set(this.getName(), "config", JSON.stringify(config));
		this.Log("Configs Reset");
    }

    reset(button) {
    	this.config = { url: "none", css: "none" , shade: "0" };
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
		` + classes + this.config.shade + `) !important; }`
		);
    }

	getSettingsPanel() {
		var html = "<font color=\"white\"><h3>Configs</h3><br>";
		html += "Background Image Link<br>";
		html +=	"<input id='BI_URL' type='text' placeholder='Background Image Link' value='" + (this.config.url) + "' style='width:100% !important;'> <br><br>";
		html += "Background CSS Filters<br>";
		html += "<input id='BI_CSS' type='text' placeholder='Background Image CSS' value='" + (this.config.css) + "' style='width:100% !important;'> <br><br>";
		html += "Discord Transparency Shade<br>";
		html += "<input id='BI_SHADE' type='number' min='0' max='1' step='0.1' value='" + (this.config.shade) + "' style='width:100% !important;'> <br><br>";

		html +="<br><button onclick=BdApi.getPlugin('"+this.getName()+"').save(this)>Save and apply</button>";
		html +="<button onclick=BdApi.getPlugin('"+this.getName()+"').reset(this)>Reset config</button> <br><br>";

		html +="Example Link:<br>";
		html +="<textarea style='width:100% !important;' readonly>https://www.pixelstalk.net/wp-content/uploads/2016/08/On-glass-with-black-background-3d-gaming-hd-wallpapers-1920-x-1080.jpg</textarea><br>"
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
    load() { this.Log("Loaded"); this.loadConfigs(); $("body").prepend('<script type="text/javascript" charset="utf-8" src="https://raw.githubusercontent.com/HansAnonymous/BD-Themes-and-Plugins/master/Plugins/JQueryPlugins/jquery.clearsearch.js"></script>'); }
    getName() { return "BackgroundImage";}
    getDescription() { return "Add a class to allow background images for easy background customization."; }
    getVersion() { return "1.2.0"; }
    getAuthor() { return "HansAnonymous"; }
    Log(msg, reason, method = "log") {
		if(reason === undefined) {
			console[method]("%c[" + this.getName() + "]%c " + msg, "color: #008888; font-weight: bold;", "");
		} else {
			console[method]("%c[" + this.getName() + "]%c " + msg + " with reason: " + reason, "color: #008888; font-weight: bold;", "");
		}
	}
}
