// //--------------------------------------------------\\
// ||-----> ARACHNEST <--------------------------------||
// ||-----> By Chris Farral <--------------------------||
// ||--------------------------------------------------||
// ||-----> Main Game functionality <------------------||
// \\--------------------------------------------------//


// Factory for functions which don't rely on other factories
// Functions which can be used "universally"
ARACHNEST.factory("functionFactory", [
	function () {
		return {
			// Iterates through all of the items in an array/object (as obj)
			"iterateObject": function (externalFunction, collection, obj, passedFunction) {
				angular.forEach(collection, function (objectValue, objectName) {
					// An external function is then called, the object's name & value are passed to the external function
					obj.objValue = objectValue;
					obj.objName = objectName;
					externalFunction(obj, passedFunction);
				});
			},

			// Iterates through all of the items in an array/object (as obj) and calls an external function containing the array
			"iterateObjectArray": function (obj, externalFunction) {
				obj.arrayLength = obj.objValue.items.length;
				while (obj.arrayLength--) {
					externalFunction(obj);
				}
			},

			// Get item by ID
			"itemByID": function (upgID, upgrades) {
				return upgrades.find(upg => upg.id === upgID);
			}
		}
	}
]);


// Factory for putting the game together
// This is where we bring everything together to make it work
ARACHNEST.factory("gameFactory", ["functionFactory", "statFactory", "collectionFactory", "$interval",
	function (functionFactory, statFactory, collectionFactory, $interval) {
		var game = {};

		// Set the default cost of an upgrade
		game.initializeCost = function (upgrade) {
			upgrade.cost = upgrade.initCost;
			upgrade.owned = 0;
		};

		// Set the default values for an upgrade
		game.initializeItem = function (upgrade) {
			game.initializeCost(upgrade);
			upgrade.power = 1
		};

		game.startInterval = function (externalFunction) {
			$interval(externalFunction, 1000);
		};

		// Iterate through all of the upgrades in a collection and execute a function on each iteration.
		game.iterateUpgrades = function (collectionName, obj, externalFunction) {
			collection = collectionFactory[collectionName];
			obj.collectName = collectionName;
			functionFactory.iterateObject(functionFactory.iterateObjectArray, collection, obj, externalFunction);
		};

		// Brood Nest upgrade
		game.nestUpgrade = function (upgrade) {
			upgrade.add.sps.target().owned += upgrade.add.sps.value * upgrade.owned;
		}

		// Calculate the base rate at which a resource is gathered.
		game.getAddRate = function (obj) {
			var upgrade = obj.objValue.items[obj.arrayLength],
				upgradeOwned = upgrade.owned,
				rateType = obj.rateType;
			upgradeAdd = upgrade.add
			if (upgradeOwned > 0) {
				if (upgradeAdd.hasOwnProperty(rateType)) {
					obj.rateAdd += (upgradeAdd[rateType].value * upgradeOwned) * upgrade.power;
					// Check if the upgrade is a nest upgrade
					if (rateType == "sps") {
						// Check if the nest upgrade isn't already being applied
						if (upgradeAdd.intStarted != true) {
							// If the nest upgrade isn't being applied already, apply it
							game.startInterval(function () {
								game.nestUpgrade(upgrade);
							});
							upgradeAdd.intStarted = true;
						}
					}
				}
			}
		};

		// Update a resource rate.
		game.recalculateRate = function (rateType) {
			var obj = {},
				rateInit = statFactory.increaseRate[rateType].init,
				rateBonus = statFactory.increaseRate[rateType].bonus;
			obj.rateType = rateType;
			obj.rateAdd = 0;
			game.iterateUpgrades("broodUpg", obj, game.getAddRate);
			statFactory.increaseRate[rateType].total = Math.floor((rateInit + obj.rateAdd) * rateBonus);
		};

		// Calculate a stat toal.
		game.getTotal = function (obj) {
			var upgrade = obj.objValue.items[obj.arrayLength];
			obj.statValue += upgrade.owned;
		};

		// Update a stat total.
		game.recalcStatTotal = function (statType) {
			var obj = {};
			obj.statValue = 0;
			obj.objValue = functionFactory.itemByID(statType, collectionFactory.broodUpg);
			functionFactory.iterateObjectArray(obj, game.getTotal);
			statFactory.itemTotal[statType] = obj.statValue;
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

		// Get a stat total (such as total spiders).
		game.getRecalcStat = function (rateType) {
			game.recalcStatTotal(rateType);
			return statFactory.itemTotal[rateType];
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

// Controller for the game
// Set the stage, this is what gets passed to the main page
ARACHNEST.controller("gameControl", ["$scope", "collectionFactory", "gameFactory", "saveLoad",
	function ($scope, collectionFactory, gameFactory, saveLoad) {

		// Make the collections accessable from the stage by passing them to $scope
		$scope.broodUpg = collectionFactory.broodUpg;
		$scope.evolutionUpg = collectionFactory.evolutionUpg;
		$scope.achievement = collectionFactory.achievement;

		saveLoad.loadGame();
		$scope.saveGame = saveLoad.saveGame;
		$scope.resetGame = saveLoad.resetGame;

		$scope.initializeCost = gameFactory.initializeCost;
		$scope.initializeItem = gameFactory.initializeItem;

		// Return the calculated total rate at which a resource is gathered.
		$scope.recalcRate = gameFactory.getRecalculateRate;
		$scope.getRecalcStat = gameFactory.getRecalcStat;

		// Add resource manually (clicking).
		$scope.addClick = gameFactory.clickAddResource;

		// Return a current stat.
		$scope.getResource = gameFactory.getMyResource;

		// Buy upgrade.
		$scope.buyEvolutionUpg = gameFactory.buyEvolutionUpg;
		$scope.buyBroodUpg = gameFactory.buyBroodUpg;
		$scope.buyUpgrade = gameFactory.buyUpgrade;

		// Add resources & save game every second.
		gameFactory.startInterval(function () {
			gameFactory.intervalAddResource('food', 'fps');
			$scope.saveGame();
		});
	}
]);