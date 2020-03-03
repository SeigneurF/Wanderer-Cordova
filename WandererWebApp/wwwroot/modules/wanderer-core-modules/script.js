﻿var component = function () {
    var that = this;
    this.getId = function () {
        return "wanderer-core-modules";
    };


    

    // on the js side we need:
    // -getCategories function returns a list of categories
    // -each category has to have a name
    // -each category has a modules
    
             
    
    this.getSystem = function () {
        return "Core";
    };

    this.systems = [];

    this.getCategories = function() {

        for (let moduleObject of that.page.getComponents()) {

            let systemName;
            if (moduleObject.getSystem !== undefined){
                systemName = moduleObject.getSystem(); 
            }
            if (moduleObject.getSystem === undefined){
                systemName = "unspecified";
            }  

            var foundMatch = false;
            for (let systemObject of this.systems){
                if (systemObject.name === systemName) {
                    if (systemObject.modules.indexOf(moduleObject) === -1) {
                        systemObject.modules.push(moduleObject);
                    }
                    foundMatch = true;
                }
            }

            if (!foundMatch){
                this.systems.push({
                    name: systemName, 
                    modules: [moduleObject],
                    show: true,
                });
            }
        }

        return this.systems;
    };

    this.showCategory = function (system) {
        if (system.show === true) {
            system.show = false;
        }
        else if (system.show === false) {
            system.show = true;
        }
        
    };

    this.addButton = function (system) {
        if (system.show === true){
            return " - ";
        }
        else if (system.show === false){
            return " + ";
        }       
    }   

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.page = page;
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.OnNewCharacter();
    };
    this.OnNewCharacter = function () {
    };
    this.OnSave = function () {
        this.communicator.write("activeComponents",
            that.page.getActiveComponentsIds());
    };
    this.OnLoad = function () {
        var toActivate = [];
        that.page.clear();
        if (this.communicator.canRead("activeComponents")) {
            this.communicator.read("activeComponents").forEach(function (item) {
                toActivate.push(item);
            });
        }

        for (var i = 0, len = toActivate.length; i < len; i++) {
            that.page.activate(toActivate[i]);
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
            }
        };
    };
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };
    this.getTitle = function () {
        return "Modules";
    };
    this.canClose = function () {
        return false;
    };
    this.toggle = function (mod) {
        that.page.toggle(mod);
    };

    this.text = function (mod) {
        var i = that.page.getActiveComponents().indexOf(mod.getId());
        if (i === -1) {
            return "show";
        } else {
            return "hide";
        }
    };

    this.show = function (mod) {
        return that.page.getActiveComponentsIds().indexOf(mod.getId()) === -1;
    };
};

g.services.componetService.registerCharacter(component);
g.services.componetService.registerStart(component);