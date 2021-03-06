﻿ColinWielgaCards.imageList = [
    "Adelaide",
    "AirSuperiority",
    "ArcDTriumph",
    "BackyardAirShelter",
    "BeachLanding",
    "BikingOverRuins",
    "Bougainville",
    "Broadside",
    "Bunker",
    "CapturedHardware",
    "ConcertParty",
    "Convoy",
    "CookRations",
    "DownedPlane",
    "DisplacedPersonsCamp",
    "EgyptianWomen",
    "Electricity",
    "ExhibitionBuildingMelbourne",
    "Explosion",
    "FarouksCarriage",
    "FightingStreetByStreet",
    "Fountain",
    "FrankSFriendsTatura",
    "HaircutPunishment",
    "Harvesting",
    "Howitzer",
    "KarnakLuxor",
    "Lifeboats",
    "Maps",
    "Marching",
    "Medic",
    "Memorialize",
    "ModelMaking",
    "MohammedAliMosque",
    "Mortars",
    "MurchisonDistrictVictoria",
    "NearMissPerth",
    "NellDIsabelPWearingGasMasks",
    "Normandy1944",
    "OldHouseCairo",
    "Parachuters",
    "PersianGardens",
    "POWFuneral",
    "PrisonerOfWarCamp",
    "Puckapunyal",
    "QuislingExecution",
    "RedCross",
    "Sailing",
    "Saipan",
    "Segregated",
    "SixteenInchGuns",
    "StrategyMeeting",
    "StreetSceneGaza",
    "SupplyQueueSalzgitter",
    "Surrender",
    "TankWelding",
    "TugBoat",
    "USSSouthDakota",
    "WaterBuffalo"
];

ColinWielgaCards.QualOutcomeCard = function (guid, name, type, text, oddsOfSuccess, oddsOfUncertainty) {
    this.guid = guid;
    this.name = name;
    this.type = type;
    this.text = text;
    this.oddsOfSuccess = oddsOfSuccess;
    this.oddsOfUncertainty = oddsOfUncertainty;
    this.deck = null;
    this.GetImage = function () {
        return ColinWielgaCards.imageList[Math.floor(Math.random() * ColinWielgaCards.imageList.length)];
    };
    this.image = this.GetImage();
    this.getImage = function () {
        return "images/ww2Photos/" + this.image + ".jpg";
    };
    this.getHtml = function () {
        return "modules/colin-wielga-cards/QualOutcomeCard.html";
    };
    this.getOddsOfSuccess = function () {
        return this.oddsOfSuccess;
    };
    this.getOddsOfUncertainty = function () {
        return this.oddsOfUncertainty;    
    };
    this.discardMessage = name + " - " + oddsOfSuccess + " - " + oddsOfUncertainty;
};

var uncertaintyX = Math.round(Math.random(100)*100);
var successY = Math.round(Math.random(100)*100);

var cardList = [
    new ColinWielgaCards.QualOutcomeCard("{FB637FA0-CC04-4DC3-BAE3-2FFB3B09C959}", "TRUE NUETRAL", "NUETRAL", "Randomly generated certainty, what could go wrong? ", uncertaintyX + "%", successY + "%"), //allow multiple to be held, other nuetral cards need less weight 
    new ColinWielgaCards.QualOutcomeCard("{F31F0B29-BDB0-4C7B-9D4E-2A23A9E440EF}", "UNKNOWN ORIGIN", "NUETRAL", "Fact: if successful, invent a cool and reasonable fact about the world. ", "0%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{9BF02CAA-0883-4D95-ABDF-DCED043EFB08}", "ANIMAL FRIEND", "NUETRAL", "A small animal has decided to follow you around. ", "10%", "40%"),
    new ColinWielgaCards.QualOutcomeCard("{A0493DC7-F90A-4E0B-9D40-32BAB80E33A8}", "RANDOM ENCOUNTER", "NUETRAL", "Discard this card to start a random encounter. Decrease the Cloud of Uncertainty by one step. ", "20%", "40%"),
    new ColinWielgaCards.QualOutcomeCard("{935019DC-C181-4BB1-B49B-A3E0848A1F1C}", "FLASHBACK", "NUETRAL", "Discard this card to have flashback with one or more other player chacters. Then CM will decide if the Cloud of Uncertainty should be increased or decreased. ", "25%", "35%"),

    new ColinWielgaCards.QualOutcomeCard("{5F960058-B513-4D9A-A0ED-A0A43C8CBCBD}", "ATLANTYS", "ALIEN ARTIFACT", "Alignment Adjustment: +10% success if differing from your character's typical moral compass. ", "",""),
    new ColinWielgaCards.QualOutcomeCard("{05E19267-BAC8-4972-9E24-A4ECC5876779}", "ATLANTIC", "ALIEN ARTIFACT", "You have strange dreams. +20% success when dealing with appartiions. ", "40%","25%"),
    new ColinWielgaCards.QualOutcomeCard("{60A78845-8762-4FDE-A4C0-4F15ACAB0CFF}", "ATLANTES", "ALIEN ARTIFACT", "A phone starts ringing by you. ", "%","%"),
    new ColinWielgaCards.QualOutcomeCard("{7046335B-224C-4EA5-A862-F853661E27B0}", "ATLANTUS ", "ALIEN ARTIFACT", "Discard this card to stack multiple 'Hold' cards that are different types. ", "20%","60%"),
    new ColinWielgaCards.QualOutcomeCard("{5AD1139D-FA32-4A2A-B678-C3466081E7B5}", "ATLANTS", "ALIEN ARTIFACT", "Discard this card if you or another party member has died, that character returns as a ghost. ", "20%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{4DD4A14E-9454-4536-97C2-578FE294E57A}", "COLD WEREBEAR", "ALIEN ARTIFACT", "Your actions are slower, but your attacks have a slowing effect. ", "6%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{AD4E32EA-5B49-4C72-A06B-BCCFC5EAFF7F}", "ATLANTIAN", "ALIEN ARTIFACT", "Atlantian made phaser pistol. ", "5%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{4EEC15F2-21BB-4821-86FD-5AD9B2C2131D}", "ATLANTACE", "ALIEN ARTIFACT", "Hold: whenever you fail, increase the Cloud of Uncertainty. Describe why you can't get rid of this alien object and how it counters a specific human technology. ", "20%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{4EA9C4D1-87B9-4B60-8487-4EBE2620938B}", "HAUNTED", "ALIEN ARTIFACT", "Come up with back story about this object. Any time you try and fail to use alien technology; or if alien technology is successfully employed against you, increase the Cloud of Uncertainty.", "20%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{AE170BB5-ABC5-4435-A415-DB6D3732404D}", "FUNGAL", "ALIEN ARTIFACT", "Whenever anyone in your party fails, increase the Cloud of Uncertainty. If the Cloud is over 60%, you acquire a mind control helmet. ", "5%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{3D083342-9F22-47B9-8148-E1AC7D053D98}", "NOCTURNAL INSECTOID", "ALIEN ARTIFACT", "+10% success in darkness. Take an additional hit, for every hit you take. ", "5%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{2AF06522-6235-4968-A8F3-AFAAA7AF78DC}", "ATLANTOS", "ALIEN ARTIFACT", "Hold: explain how to appease this item; if it is pleased +10% success, if it is unhappy -10% success. Expound on an entity that is hunting you for this object that won't leave your posession. ", "20%","20%"),
    new ColinWielgaCards.QualOutcomeCard("{500B6195-5AC0-4822-8B16-5BCB8AB940C8}", "INSECTOID", "ALIEN ARTIFACT", "You no longer breathe oxygen, but you can spit acid. ", "6%","44%"),
    new ColinWielgaCards.QualOutcomeCard("{F5C171E3-69B3-4BAC-9BDC-04C7C8E8EFEC}", "AVIAN FLYER", "ALIEN ARTIFACT", "Discard: clip the wings of any flying entity. ", "7%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{6AE0F473-0200-442E-A64A-9A846D87A56F}", "ATLANTIS", "ALIEN ARTIFACT", "+10% chance of success when utilizing water. ", "8%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{0A20CEF3-1EC2-4C28-9030-F58E9B3869E2}", "ATLANTA", "ALIEN ARTIFACT", "The blood boiler. ", "20%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{7C4EEB81-EECE-475E-971D-8E42F60461DF}", "WEREBEAR", "ALIEN ARTIFACT", "Take one extra action if you have the highest initiative, take a hit for each time you have triggered this.", "4%","60%"),
    new ColinWielgaCards.QualOutcomeCard("{B602D13C-FEC9-471D-A6BC-9BD520CAB607}", "ATLANTAS", "ALIEN ARTIFACT", "Before the CM anounces the difficulty; guess the chance of uncertainty (without the Cloud), if successful, draw an additional card then discard one. If unsuccessful increase the Cloud. ", "20%", "50%"),
    new ColinWielgaCards.QualOutcomeCard("{846352C6-C233-4508-B7C6-73B20B36B9C8}", "AVIAN FIGHTER", "ALIEN ARTIFACT", "Hunting talisman, you may choose when to go for combat. ", "5%","45%"),   

    new ColinWielgaCards.QualOutcomeCard("{018F6F3C-B8E2-4C26-9468-DE1EA9968EB8}", "MECHANICAL VIPER APPENDAGE", "SPY GADGET", "Every time you fail using this gadget, roll 1d10, if you roll a number lower than the number of failures you've had, you are horribly maimed. ", "6%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{F76BC99A-FEFF-40E1-81AB-09CC25D979E0}", "ATLATL", "SPY GADGET", "+10% success when throwing something.", "7%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{75D52CDB-E3CE-4BD2-882D-2B2C9ACBD6FC}", "ATLAS", "SPY GADGET", "+10% success when referring to a reliable map or information.", "8%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{7A554276-8F9F-422F-AAC2-E3CA2B575788}", "CATALYST", "SPY GADGET", "Describe how your actions set off a reasonable chain of events. ", "8%","36%"),
    new ColinWielgaCards.QualOutcomeCard("{A8585373-497A-476C-B909-57FEBED9BB3D}", "BELT BUCKLE GUN", "SPY GADGET", "Made in Germany. ", "",""),   
    new ColinWielgaCards.QualOutcomeCard("{AC8E6BC9-8C7E-4C23-9CF5-0A053F9CA029}", "MINI FLAMETHROWER", "SPY GADGET", "Made in the USA. ", "",""),   
    new ColinWielgaCards.QualOutcomeCard("{581CFD80-1B9E-4B86-B3D7-88F8EB1854EB}", "PROPAGANDIST", "SPY GADGET", "10% chance when convincing someone. ", "20%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{92AC6554-AE63-4779-AAC6-73582A32070C}", "ENTROPY", "SPY GADGET", "All your skill checks have +5% chance of success; but everytime you get an uncertain outcome, increase the Cloud of Uncertainty. ", "6%","60%"),
    new ColinWielgaCards.QualOutcomeCard("{5DF25620-5369-41DE-AD94-DA84CCCD7F34}", "EXPLOSIVES", "SPY GADGET", "-10% uncertainty when using explosives. ", "6%","60%"),
    new ColinWielgaCards.QualOutcomeCard("{DBDC3767-C275-4838-A472-077D7C162D93}", "NEUTRALIZER", "SPY GADGET", "You may not use any alien technology. If you succeed, add 10% chance of success to your next skill check. ", "40%","20%"),
    new ColinWielgaCards.QualOutcomeCard("{CE0C01BD-D9EB-47A3-BDEF-C424D0C5DE94}", "ANTEDILUVIAN", "SPY GADGET", "Hold: ignore the Cloud of Uncertainty when making skill checks completely submerged in water. ", "20%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{15D3D15F-6025-4488-AB1B-85C0E6EF1684}", "EPHEMERAL", "SPY GADGET", "Hold: when discarding a card you may use the percentages on this card instead of from the discarded card. ", "30%","35%"),
    new ColinWielgaCards.QualOutcomeCard("{12AC575C-FC97-4472-A80C-88A8E02C1B99}", "ACES", "SPY GADGET", "Failure with this card only counts as simple failure, but increase the Cloud of Uncertainty.", "6%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{4E5372BC-F2F1-4EDC-9345-8B451F5017BD}", "ANTHROMORPH", "SPY GADGET", "Describe the features of totem you are now carrying. ", "5%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{EE8F0CAB-5873-4530-BC54-014000CE64ED}", "PIPE GUN", "SPY GADGET", "Made in the UK. ", "10%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{2E441CF5-6FF1-4A4F-A9E4-AC14E3FF59A7}", "FAKE PACK OF CIGARETTES", "SPY GADGET", "Secretive recording device. ", "",""),
    new ColinWielgaCards.QualOutcomeCard("{00AB75F2-94CF-4253-8A96-D5BA1498D80E}", "IAIJUTSU", "SPY GADGET", "Deal double damage if you attack from your sheathed sword. ", "5%","55%"),
    new ColinWielgaCards.QualOutcomeCard("{872A37B4-549D-49D9-BC06-D2D63A9276A0}", "LASER WATCH", "SPY GADGET", "Discard this card, you or another player may discard any one card. ", "20%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{046C06DE-2CF1-4017-A647-B2E23E500D1E}", "BALLOON BOMB", "SPY GADGET", "Made in Japan. ", "9%","45%"),
    
    ];

ColinWielgaCards.QualOutcomeDeck = new ColinWielgaCards.Deck("{81FB0469-1679-46E4-A47A-D40A31B44784}", "Qualitative Outcome Deck", cardList);

ColinWielgaCards.decklist.push(ColinWielgaCards.QualOutcomeDeck);
