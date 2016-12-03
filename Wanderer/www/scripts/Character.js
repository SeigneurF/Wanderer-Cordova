﻿g.Character = function ($timeout) {
    var that = this;

    var comboKey = function (id, key) {
        return id + "_" + key;
    };
    var versionComboKey = function (id, key) {
        return "Version_" + id + "_" + key;
    }
    var comFactory = function (getSaveJson, id, version) {
        return {
            read: function (key) {
                return getSaveJson()[key];
            },
            canRead: function (key) {
                return getSaveJson() !== undefined && getSaveJson()[key] !== undefined;
            },
            write: function (key, value) {
                if (getSaveJson() === undefined) {
                    getSaveJson() = {};
                }
                getSaveJson()[key] = value;
            },
            lastVersion: function () {
                if (getSaveJson() === undefined) {
                    return -1;
                }
                if (getSaveJson()[g.constants.META] === undefined) {
                    return -1;
                }
                if (getSaveJson()[g.constants.META][g.constants.VERSION] === undefined) {
                    return -1;
                }
                return getSaveJson()[g.constants.META][g.constants.VERSION];
            },
            readNotCharacter: function (key) {
                return window.localStorage.getItem(comboKey(id, key));
            },
            readNotCharacterVersion: function (key) {
                return window.localStorage.getItem(versionComboKey(id, key));
            },
            canReadNotCharacter: function (key) {
                return window.localStorage.getItem(comboKey(id, key)) !== undefined;
            }, writeNotCharacter: function (key, value) {
                window.localStorage.setItem(comboKey(id, key), value);
                window.localStorage.setItem(versionComboKey(id, key), version);
            }
        };
    }
    var dataManagerFactory = function (json) {
        var res= {
            useLocal:true,
            local: json,
            remote: null,
        };
        res.current = function () {
            return res.useLocal ? res.local : res.remote;
        };
        return res;

    }
    var logFactory = function () {
        // why are these flags?
        var TypeEnum = {
            VERBOSE: 1,
            DEBUG: 2,
            INFO: 3,
            WARN: 4,
            ERROR: 5,
            WTF: 6,
        }
        // logging constants

        var logTimeout = 1000 * 60;
        var logLevel = TypeEnum.VERBOSE;

        return {
            logs: [],
            displayLogs: function () {
                var now = new Date().getTime();
                var res = [];
                this.logs.forEach(function (log) {
                    if (log.type > logLevel && now - logTimeout < log.timeStamp && !log.closed) {
                        res.push(log);
                    }
                });
                return res;
            },
            log: function (message, type) {
                this.logs.push({
                    message: message,
                    type: type,
                    closed: false,
                    timeStamp: new Date().getTime()
                });
            },
            debug: function (message) {
                this.log(message, TypeEnum.DEBUG);
            },
            info: function (messagae) {
                this.log(message, TypeEnum.INFO);
            },
            warn: function (message) {
                this.log(message, TypeEnum.WARN);
            },
            error: function (message) {
                this.log(message, TypeEnum.ERROR);
            },
            wtf: function (message) {
                this.log(message, TypeEnum.WTF);
            }
        }
    }
    this.displayName = function () {
        var name = that.getName();
        if (name === null || name === undefined || name === "") {
            return "untilted";
        } else {
            return name;
        }
    };

    this.updateLastLoaded = function (json) {
        that.lastLoaded = json;
    }

    this.compareWithLastLoaded = function (json) {
        
        for (var property in that.modMap) {
            if (that.modMap.hasOwnProperty(property)) {
                that.modMap[property].injected.dataManager.useLocal = true;
                that.modMap[property].injected.dataManager.remote = null;
            }
        }
        var theSame = true;
        if (that.lastLoaded != null) {
            for (var property in json) {
                if (json.hasOwnProperty(property)) {
                    if (JSON.stringify(json[property]) == JSON.stringify(that.lastLoaded[property])) {
                    } else {
                        theSame = false;
                        that.modMap[property].injected.dataManager.useLocal = false;
                        that.modMap[property].injected.dataManager.remote = json[property];
                        that.modMap[property].OnLoad();
                    }
                }
            }
        }

        that.lastLoaded = json;

        // it might be a good idea to active the comps with conflicts 

        return theSame;
    }

    this.swap = function (module) {
        module.OnSave();
        module.injected.dataManager.useLocal = !module.injected.dataManager.useLocal;
        module.OnLoad()
      }

    // todo merge conflicts is not a good way story in injected along with some stat (which one to show)

    this.getBonus = function () {
        var res = 0;
        that.modList.forEach(function (comp) {
            var pub = comp.getPublic();
            if (pub.bonusProvided != undefined) {
                res += pub.bonusProvided();
            }
        })
        return res;
    }

    this.mintModules = function (componentFactoriesList, modMap) {
        var modList = [];

        componentFactoriesList.forEach(function (item) {
            var tem = new item();
            tem.injected = {};
            tem.injected.multiply = item;
            modMap[tem.getId()] = tem;
            modList.push(tem);
        });

        var modulesPublic = modMap["wanderer-core-modules"].getPublic();
        var logger = modMap["wanderer-core-logger"].getPublic();
        var save = modMap["colin-wielga-dynamo-save"].getPublic();


            modulesPublic.injectComponents(modList);


        modList.forEach(function (item) {
                // we inject a ton of stuff
                item.injected={
                    timeout: $timeout,
                    load:function (json) {
                        that.lastLoaded = json;
                        modList.forEach(function (item) {
                            item.injected.dataManager = dataManagerFactory(json[item.getId()]);
                            if (item.OnLoad !== undefined) {
                                try {
                                    item.OnLoad();
                                } catch (e) {
                                    if (logger != undefined && logger.writeToLog != undefined) {
                                        logger.writeToLog(e);
                                    }
                                }
                            }
                        });
                    },
                    dataManager: dataManagerFactory({}),
                    logger:logFactory(),
                    getJSON:function () {
                        var res = {};
                        modList.forEach(function (item) {
                            if (item.OnSave !== undefined) {
                                try {
                                    item.OnSave();
                                    var map = item.injected.dataManager.current();
                                    if (map == undefined) {
                                        map = {};
                                    }
                                    if (map[g.constants.META] == undefined) {
                                        map[g.constants.META] = {};
                                    }
                                    map[g.constants.META][g.constants.VERSION] = item.getPublic().getVersion();
                                    res[item.getId()] = map;
                                } catch (e) {
                                    if (logger != undefined && logger.writeToLog != undefined) {
                                        logger.writeToLog(e);
                                    }
                                }
                            }
                        });
                        return res;
                    },
                    getBonus:that.getBonus,
                    compareWithLastLoaded:that.compareWithLastLoaded,
                    updateLastLoaded:that.updateLastLoaded
                }

                if (item.OnStart !== undefined) {

                    var communicator = comFactory(function () { return item.injected.dataManager.current(); }, item.getId(), item.getPublic().getVersion());

                    var dependencies = [];
                    if (item.getRequires !== undefined) {
                        var lookingFors = item.getRequires();
                        for (var i = 0; i < lookingFors.length; i++) {
                            var pimary = modulesPublic.getComponent(lookingFors[i], isMerge)
                            if (pimary != null) {
                                dependencies.push(modulesPublic.getComponent(lookingFors[i], isMerge));
                            } else {
                                // is this an error case?
                            }
                        }
                    }


                    // we start.
                    item.OnStart(communicator, dependencies);
                }
        });

        return {
            modMap: modMap,
            modList: modList,
            modules: modulesPublic.getActiveComponents,
            remove: function (module) {
                modulesPublic.toggle(module);
            },
            getName: save.getName
        };
    }

    var mods = this.mintModules(g.ComponetRegistry.componentFactories, {});

    this.modList = mods.modList;
    this.modMap = mods.modMap;
    this.modules = mods.modules;
    this.Remove = mods.remove;
    this.getName = mods.getName;
}