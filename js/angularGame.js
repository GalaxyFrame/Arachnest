ARACHNEST.factory("functionFactory", [
	function () {
		var me = {};

		//Iterates through all of the items in an array/object (as obj) and calls a provided function containing the array.
		me.iterateObjectArray = function (obj, externalFunction) {
			obj.arrayLength = obj.objValue.items.length;
			while (obj.arrayLength--) {
				externalFunction(obj);
			}
		};
		
		//Iterates through all fo the items in an array/object (as obj) and calls a provided function containing the array as well as a function.
		me.iterateObject = function (externalFunction, collection, obj, passedFunction) {
			angular.forEach(collection, function (objectValue, objectName) {
				obj.objValue = objectValue;
				obj.objName = objectName;
				externalFunction(obj, passedFunction);
			});
		};
		return me;
	}
]);

ARACHNEST.factory("gameFactory", ["functionFactory", "collectionFactory", "statFactory",
	function (functionFactory, collectionFactory, statFactory) {
		var game = {};

		game.initializeCost = function (upgrade) {
			upgrade.cost = upgrade.initCost;
			upgrade.owned = 0;
		};
		game.initializeItem = function (upgrade) {
			game.initializeCost(upgrade);
			upgrade.power = 1;
		};

		// Calculate the base rate at which a resource is gathered.
		game.getAddRate = function (obj) {
			var upgrade = obj.objValue.items[obj.arrayLength],
				upgradeOwned = upgrade.owned,
				upgradeAdd = upgrade.add,
				rateType = obj.rateType;
			if (upgradeOwned > 0) {
				if (upgradeAdd.hasOwnProperty(rateType)) {
					obj.rateAdd += (upgradeAdd[rateType] * upgradeOwned) * upgrade.power;
				}
			}
		};

		// Iterate through all of the items in a collection and execute a function on each iteration.
		game.iterateUpgrades = function (collection, obj, externalFunction) {
			functionFactory.iterateObject(functionFactory.iterateObjectArray, collection, obj, externalFunction);
		};

		// Update a resource rate.
		game.recalculateRate = function (rateType) {
			var obj = {},
				rateInit = statFactory.increaseRate[rateType].init,
				rateBonus = statFactory.increaseRate[rateType].bonus;
			obj.rateType = rateType;
			obj.rateAdd = 0;
			game.iterateUpgrades(collectionFactory.broodUpg, obj, game.getAddRate);
			statFactory.increaseRate[rateType].total = Math.floor((rateInit + obj.rateAdd) * rateBonus);
		};

		// Calculate the amount of resources to add when the user clicks a resource button.
		game.clickAddResource = function (resource, rateType) {
			statFactory.resources[resource] += statFactory.increaseRate[rateType].total * statFactory.clickMultiplier;
		};

		// Calculate the amount of resources to add every second.
		game.intervalAddResource = function (resource, rateType) {
			statFactory.resources[resource] += statFactory.increaseRate[rateType].total * statFactory.intervalMultiplier;
		};

		// Get the value of a stat.
		game.getMyResource = function (resource) {
			return statFactory.resources[resource];
		};

		// Get a resource rate.
		game.getRecalculateRate = function (rateType) {
			game.recalculateRate(rateType);
			return statFactory.increaseRate[rateType].total;
		};

		// Buy a Brood upgrade.
		game.buyBroodUpg = function (upgrade) {
			var costCalc = Math.pow(2, Math.pow(upgrade.owned + 10, 0.5) - Math.pow(10, 0.5));
			upgrade.cost = Math.ceil(upgrade.initCost * costCalc);
		};

		// Buy an upgrade.
		game.buyUpgrade = function (upgrade, myResource, externalFunction) {
			if (statFactory.resources[myResource] >= upgrade.cost) {
				statFactory.resources[myResource] -= upgrade.cost;
				upgrade.owned += 1;

				externalFunction(upgrade);
			}
		};
		return game;
	}
]);

ARACHNEST.factory("styleFactory", ["functionFactory",
	function (functionFactory) {
		var me = {};
		me.addText = function (obj) {
			obj.updText += obj.objName.toUpperCase() + ": +" + obj.objValue + " ";
		};
		me.updateText = function (externalFunction, collection, passedFunction) {
			var obj = {};
			obj.updText = "";
			externalFunction(passedFunction, collection, obj);
			return obj.updText;
		};
		me.getAddRateText = function (collection) {
			var addRates = me.updateText(functionFactory.iterateObject, collection.add, me.addText);
			return collection.description + "\n" + addRates;
		};
		return me;
	}
]);

//Set the stage, this is what gets passed to the main page
ARACHNEST.controller("gameControl", ["$scope", "$interval", "collectionFactory", "gameFactory",
	function ($scope, $interval, collectionFactory, gameFactory) {

		$scope.broodUpg = collectionFactory.broodUpg;
		$scope.evolutionUpg = collectionFactory.evolutionUpg;

		$scope.initializeCost = gameFactory.initializeCost;
		$scope.initializeItem = gameFactory.initializeItem;
		
		// Return the calculated total rate at which a resource is gathered.
		$scope.recalcRate = gameFactory.getRecalculateRate;

		// Add resource manually (clicking).
		$scope.addClick = gameFactory.clickAddResource;

		// Return a current stat.
		$scope.getResource = gameFactory.getMyResource;

		// Buy upgrade.
		$scope.buyEvolutionUpg = gameFactory.buyEvolutionUpg;
		$scope.buyBroodUpg = gameFactory.buyBroodUpg;
		$scope.buyUpgrade = gameFactory.buyUpgrade;

		// Add resource every second (interval).
		addInterval = function () {
			gameFactory.intervalAddResource('food', 'fps');
		}
		$interval(addInterval, 1000);

	}
]);
