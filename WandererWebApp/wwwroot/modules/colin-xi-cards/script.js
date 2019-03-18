﻿ColinXiCards.component = function () {
    var that = this;
    this.decklist = ColinWielgaCards.decklist;
    this.getId = function () {
        return "colin-xi-cards";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.godsPublic = dependencies[0];
    };
    this.OnNewCharacter = function () {
        this.hand = [];
        this.selectedDeck = ColinWielgaCards.decklist[0];
        this.activeDeck = this.selectedDeck.defaultActive();
    };
    this.OnSave = function () {
        this.communicator.write("hand", this.hand);
    };
    this.OnLoad = function () {
        var version = this.communicator.lastVersion();
        this.OnNewCharacter();
        if (version === 1.0) {
            // now we have selected a deck
            // we need the active cards
            if (this.communicator.canRead("hand")) {
                var nextHand = this.communicator.read("hand");
                nextHand.forEach(function (id) {
                    if (that.selectedDeck.allCards.hasOwnProperty(id)) {
                        that.hand.push(id);
                    }
                });
            }
        }
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
        return "Xi Hand";
    };
    this.getRequires = function () {
        return ["colin-xi-alignment"];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1.0;
            }
        };
    };

    this.getCard = function (id) {
        return this.selectedDeck.allCards[id];
    };

    this.draw = function () {
        if (this.hand.length < this.activeDeck.length) {
            var num = -1;
            var fail = false;
            while (num === -1 || fail) {
                num = this.activeDeck[Math.floor(Math.random() * this.activeDeck.length)];
                fail = false;
                for (var i = 0; i < this.hand.length; i++) {
                    if (this.hand[i] === num) {
                        fail = true;
                        break;
                    }
                }
            }
            this.hand.push(num);
        }
    };
    this.discard = function (cardID) {
        for (var i = 0; i < this.hand.length; i++) {
            if (this.hand[i] === cardID) {
                this.hand.splice(i, 1);
            }
        }
    };
    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ColinXiCards.component);