//META{"name":"DiscordEmbeds","displayName":"DiscordEmbeds","website":"https://github.com/HansAnonymous/BD-Themes-and-Plugins/tree/master/Plugins/DiscordEmbeds","source":"https://github.com/HansAnonymous/BD-Themes-and-Plugins/tree/master/Plugins/DiscordEmbeds/DiscordEmbeds.plugin.js"}*//

// Originally Created July 30th, 2017.
// Created October 16th, 2018.
// Updated February 4th, 2019.

/*
MIT License

Copyright (c) 2018 HansAnonymous

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you tried to run me directly. This is not desired behavior! It will work now, but likely will not work with other plugins. Even worse, with other untrusted plugins it may lead computer virus infection!", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.\nJust reload Discord with Ctrl+R.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("DiscordEmbeds installed!\nJust reload Discord with Ctrl+R.", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else @*/

var DiscordEmbeds = (() => {
	const config = {"info":{
        "name":"DiscordEmbeds",
        "authors":[{
            "name":"HansAnonymous",
            "discord_id":"168216897450541056",
            "github_username":"HansAnonymous",
            "twitter_username":"Hans_Husurianto"}],
        "version":"0.0.1",
        "description":"Enables sending embedded messages. Requires ZeresPluginLibrary. NOTE: This does not steal your user token. Please be aware not all servers permit sending embeds. Support Server: http://bit.ly/HansSupport",
        "github":"https://github.com/HansAnonymous/BD-Themes-and-Plugins/tree/master/Plugins/DiscordEmbeds",
        "github_raw":"https://raw.githubusercontent.com/HansAnonymous/BD-Themes-and-Plugins/master/Plugins/DiscordEmbeds/DiscordEmbeds.plugin.js"},
        "changelog":[{
            "title":"Hello World",
            "type":"fixed",
            "items":[
                "Initial release!"]}],
                "main":"index.js"};

	return !global.ZeresPluginLibrary ? class {
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {window.BdApi.alert("Library Missing",`The library plugin needed for ${config.info.name} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js">Click here to download the library!</a>`);}
        start() { console.log("Started DEO")}
        stop() {}
    } : (([Plugin, Api]) => {
    	const plugin = (Plugin, Api) => {
    const {Filters, WebpackModules, PluginUtilities, DiscordModules, ReactTools, ReactUtilities, Utilities} = Api;
    return class DiscordEmbeds extends Plugin {
        constructor() {
            super();
            this.initialized = false;
            this.commandKey = "/e";
        }
    		
        async onStart() {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.initialize();
    	}

    	onStop() {
            this.initialized = false;
            $("*").off("." + this.getName());
            BdApi.clearCSS(this.getName());
    	}

        initialize() {
            this.MessageParser = WebpackModules.findByUniqueProperties(["createBotMessage"]);
            this.MessageQueue = WebpackModules.findByUniqueProperties(["enqueue"]);
            this.MessageController = WebpackModules.findByUniqueProperties(["sendClydeError"]);
            this.EventDispatcher = WebpackModules.findByUniqueProperties(["dispatch"]);
            this.MainDiscord = WebpackModules.findByUniqueProperties(["ActionTypes"]);
            this.ConfirmModal = WebpackModules.find(Filters.byPrototypeFields(['handleCancel', 'handleSubmit', 'handleMinorConfirm']));
            this.ModalsStack = WebpackModules.findByUniqueProperties(['push', 'update', 'pop', 'popWithKey']);
            this.React = WebpackModules.findByUniqueProperties(['createElement']);
            this.ReactDOM = WebpackModules.findByUniqueProperties(['render', 'findDOMNode']);
            this.Embed = WebpackModules.find(Filters.byPrototypeFields(['renderProvider']));
            this.initialized = true;    
            var textarea = document.querySelector(".textArea-2Spzkt");
            this.addListener($(textarea));
        }

        observer(e) {
            if (!e.addedNodes.length || !(e.addedNodes[0] instanceof Element) || !this.initialized) return;

            var elem = e.addedNodes[0];
            
            if (elem.querySelector(".textArea-2Spzkt") && this.initialized) {
                var textarea = elem.querySelector(".textArea-2Spzkt");
                this.addListener($(textarea));
            }
        }

        parseEmbed(text) {
            if (!text.startsWith(this.commandKey)) return;

            text = text.slice(this.commandKey.length);
            text = text.replace(/\\\|/g, "!@")
            let items = text.split("|");
            items.map(function(x, i, ar){
                ar[i] = x.trim();
            });

            let embed = {
                    author: {
                        name: "",
                        icon_url: "",
                        url: ""
                    },
                    title: "",
                    url: "",
                    description: "",
                    image: {
                        url: ""
                    },
                    thumbnail: {
                        url: ""
                    },
                    timestamp: false,
                    footer: {
                        text: "",
                        icon_url: ""
                    },
                    fields: [],
                    type: "rich"
                };

            items.forEach((item) => {
                item = item.replace(/!@/g, "|");
                let category = item.substring(0, item.indexOf(":")).trim().toLowerCase();
                let value = item.slice(item.indexOf(":") + 1).trim();
                if (!value) return;
                if (category == "body" || category == "content") category = "description";
                if (category == "color") value = parseInt(value.slice(value.indexOf("#") + 1), 16);
                if (!category || category == "msg" || category == "message") {
                    this.msgContent = value;
                } else if (category == "thumbnail" || category == "image") {
                    embed[category].url = value;
                }
                else if (category == "author") {
                    embed[category].name = value;
                } else if (category == "footer") {
                    embed[category].text = value;
                }
                else if (category == "timestamp") {
                    (value.toLowerCase() == "yes" || value.toLowerCase() == "true") ? embed[category] = true : embed[category] = false;
                }
                else {
                    embed[category] = value;
                }
            });
            
            if (embed.footerIcon && !embed.footer.icon_url) embed.footer.icon_url = embed.footerIcon;
            if (embed.url && !embed.author.url) embed.author.url = embed.url;
            if (embed.icon && !embed.author.icon_url) embed.author.icon_url = embed.icon;
            return embed;
        }

        sendListener(e) {
            if (e.shiftKey || e.which != 13) return;

            var textarea = $(e.currentTarget);
            var text = textarea.val();
            if (!text.startsWith(this.commandKey)) return;

            e.preventDefault();
            e.stopPropagation();

            ReactTools.getOwnerInstance($('form')[0]).setState({textValue: ''});

            if (text.toLowerCase() == this.commandKey) return;
            let embed = this.parseEmbed(text);
            if (embed.timestamp) embed.timestamp = (new Date()).toISOString();
            else embed.timestamp = "";
            this.sendEmbed(embed);
        }

        addListener(textarea) {
            textarea.on("keypress." + this.getName(), (e) => {this.sendListener(e);});
        }

        sendEmbed(embed, msgContent) {
            if (!embed || !Object.keys(embed).length) return;

            let channelID = ReactTools.getOwnerInstance($("form")[0]).props.channel.id;

            let msg = this.MessageParser.createMessage(channelID, "");

            this.MessageQueue.enqueue({
                type: "send",
                message: {
                    channelId: channelID,
                    content: this.msgContent,
                    tts: false,
                    nonce: msg.id,
                    embed: embed
                }
            }, r => {
            r.ok ? (this.MessageController.receiveMessage(channelID, r.body)) : (r.status >= 400 && r.status < 500 && r.body && this.MessageController.sendClydeError(channelID, r.body.code),
                this.EventDispatcher.dispatch({
                    type: this.MainDiscord.ActionTypes.MESSAGE_SEND_FAILED,
                    messageId: msg.id,
                    channelId: channelID
                }), this.showConfirmModal("Embed Error", "Something went wrong forming your embed, check your input for errors."));
            });
            this.msgContent = "";
        }//end sendEmbed

        
    };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
