﻿var ScottLeviRules = {};

ScottLeviRules.component = function () {

    this.getId = function () {
        return "scott-levi-rules";
    };

    
    this.getSystem = function () {
        return "Fools"
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };

    this.OnNewCharacter = function () { };

    this.OnSave = function () { };

    this.OnLoad = function () { };

    this.OnUpdate = function () {
    };

    this.getRequires = function () {
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };

    this.canClose = function () {
        return true;
    };

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };

    this.getTitle = function () {
        return "Fools RPG Rules";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ScottLeviRules.component);