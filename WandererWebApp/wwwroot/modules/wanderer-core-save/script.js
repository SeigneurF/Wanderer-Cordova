﻿var component = function () {
    var that = this;
    this.groupName = "";
    this.OnJoindCallbacks = [];

    this.getId = function () {
        return "wanderer-core-save";
    };

    this.getSystem = function () {
        return "Core"
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.logger = logger;
        this.page = page;
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.OnNewCharacter();

    };
    this.OnNewCharacter = function () {
        that.page.name = "untitled";
    };
    this.OnSave = function () {
        this.communicator.write("name", that.page.name);
        this.communicator.write("group-name", that.groupName);
    };
    this.OnLoad = function () {
        if (this.communicator.canRead("name")) {
            that.page.name = this.communicator.read("name");
        } else {
            that.page.name = "untitled";
        }
        if (this.communicator.canRead("group-name")) {
            that.groupName = this.communicator.read("group-name");
        }
        if (this.groupName !== undefined && this.groupName !== null && this.groupName !== "") {
            this.Join();
        }
    };
    this.getRequires = function () {
        return [];
    };
    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            },
            injectComponents: function (comps) {
                that.components = comps;
            },
            onJoin: function (callback) {
                that.OnJoindCallbacks.push(callback);
            }
        };
    };
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };
    this.canClose = function () {
        return true;
    };
    this.getTitle = function () {
        return "Save";
    };

    this.Join = function () {
        g.services.SignalRService.Join(that.groupName, that.key);
        for (var callback of that.OnJoindCallbacks) {
            callback(that.groupName);
        }
        that.logger.info("Join Successful!");
        that.lastJoined = that.groupName;
    };

    this.joinedButtonText = function () {
        if (that.lastJoined === that.groupName) { 
            return "Joined"; 
        } else { 
            return "Join";
        } 
    };
    
    
    this.copyId = async function () {
        var ID = this.page.accessKey;
        await navigator.clipboard.writeText(ID);
        g.services.timeoutService.$timeout(function () {
            that.logger.info("Copy Successful!");
        });
    };
    this.save = function () {
        // var newJson = that.page.getJSON();

        // var reallySave = function () {
        //     g.services.characterService.SaveCharacter(
        //         that.page.accessKey, 
        //         that.page.name,
        //         angular.toJson(newJson), 
        //         function (data) {
        //             g.services.timeoutService.$timeout(
        //                 function () {
        //                     that.logger.info("Save Successful!");
        //                 }
        //             );
        //             var changed = g.services.accountService.currentAccount.addChatacterAccesser(g.models.newCharacterAccesser(that.page.accessKey, that.page.name));
        //             if (changed) {
        //                 g.services.accountService.saveAccount(function () { }, function () {
        //                     throw { message: "Save Failed" };
        //                 });
        //             }
        //         },
        //         function (error) {
        //             g.services.timeoutService.$timeout(function () {
        //                 that.logger.error("Save Failed " + error);
        //             });
        //         }); 
        //     console.log("auto save test")
        // };

        
        // // current json
        // // that.page.getJSON()

        // // true when X is the same as last loaded 
        // // false when X is different than last loaded
        // //that.page.compareWithLastLoaded(X)

        // // flase when current json is the same as last loaded 
        // // true when current json is different than last loaded
        // var changes = !that.page.compareWithLastLoaded(that.page.getJSON());        
        // if (changes) {
        //     g.services.characterService.GetCharacter(
        //         that.page.accessKey, 
        //         function (json) {
        //             var ok = that.page.compareWithLastLoadedAndUpdate(json["json"]);
        //             if (ok) {
        //                 reallySave();
        //                 that.page.updateLastLoaded(newJson);
        //             } else {
        //                 g.services.timeoutService.$timeout(function () {
        //                     that.logger.warn("Save Failed, Merge Conflicts!");
        //                 });
        //             }
        //         },
        //         function (error) {
        //             reallySave();
        //         },
        //         function (error) {
        //             g.services.timeoutService.$timeout(function () {
        //                 that.logger.error("Error: " + error);
        //             });
        //         });

        // } else { 
        //     console.log("you didn't change anything");
        // }

        // g.services.characterService.GetCharacter(
        //     that.page.accessKey, 
        //     function (json) {
        //         var ok = that.page.compareWithLastLoaded(json["json"]);
        //         if (ok) {
        //             reallySave();
        //             that.page.updateLastLoaded(newJson);
        //         } else {
        //             g.services.timeoutService.$timeout(function () {
        //                 that.logger.warn("Save Failed, Merge Conflicts!");
        //             });
        //         }
        //     },
        //     function (error) {
        //         reallySave();
        //     },
        //     function (error) {
        //         g.services.timeoutService.$timeout(function () {
        //             that.logger.error("Error: " + error);
        //         });
        //     });
    };
};

g.services.componetService.registerCharacter(component);