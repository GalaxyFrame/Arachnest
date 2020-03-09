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
		var me = {};

		// Iterates through all of the items in an array/object (as obj)
		me.iterateObject = function (externalFunction, collection, obj, passedFunction) {
			angular.forEach(collection, function (objectValue, objectName) {
				// An external function is then called, the object's name & value are passed to the external function
				obj.objValue = objectValue;
				obj.objName = objectName;
				externalFunction(obj, passedFunction);
			});
		};

		// Iterates through all of the items in an array/object (as obj) and calls an external function containing the array
		me.iterateObjectArray = function (obj, externalFunction) {
			obj.arrayLength = obj.objValue.items.length;
			while (obj.arrayLength--) {
				externalFunction(obj);
			}
		};
		return me;
	}
]);


// Factory for putting the game together
// This is where we bring everything together to make it work
ARACHNEST.factory("gameFactory", ["functionFactory", "statFactory", "collectionFactory",
	function (functionFactory, statFactory, collectionFactory) {
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

		// Calculate the base rate at which a resource is gathered.
		game.getAddRate = function (obj) {
			var upgrade = obj.objValue.items[obj.arrayLength],
				upgradeOwned = upgrade.owned,
				rateType = obj.rateType;
				upgradeAdd = upgrade.add
			if (upgradeOwned > 0) {
				if (upgradeAdd.hasOwnProperty(rateType)) {
					obj.rateAdd += (upgradeAdd[rateType].value * upgradeOwned) * upgrade.power;
				}
			}
		};


		// Iterate through all of the upgrades in a collection and execute a function on each iteration.
		game.iterateUpgrades = function (collectionName, obj, externalFunction) {
			collection = collectionFactory[collectionName];
			obj.collectName = collectionName;
			functionFactory.iterateObject(functionFactory.iterateObjectArray, collection, obj, externalFunction);
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

// Factory for styling the game
// This is where we define how information is displayed to the user
ARACHNEST.factory("styleFactory", ["functionFactory",
	function (functionFactory) {
		var me = {};
		me.addText = function (obj) {
			obj.updText += obj.objName.toUpperCase() + ": +" + obj.objValue.value + " ";
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

// Controller for the game
// Set the stage, this is what gets passed to the main page
ARACHNEST.controller("gameControl", ["$scope", "$interval", "collectionFactory", "gameFactory", "statFactory", "$localstorage",
	function ($scope, $interval, collectionFactory, gameFactory, statFactory, $localstorage) {

		// --- LOAD GAME -- \\-----------------------
		loadUpgrades = function (obj) {
			var upgradeItem = obj.objValue.items[obj.arrayLength];
			var upgItemFromStorage = $localstorage.getObject(obj.collectName)[obj.objName].items[obj.arrayLength];

			// We only want to transfer the data we need, the game can calculate everything else based on these values
			upgradeItem.owned = upgItemFromStorage.owned;
			upgradeItem.cost = upgItemFromStorage.cost;
			if (obj.collectName == "broodUpg") {
				upgradeItem.power = upgItemFromStorage.power;
			} else if (obj.collectName == "evolutionUpg") {
				// If Evolution Upgrade is owned, apply its bonus
				if (upgradeItem.owned >= 1) {
					upgradeItem.evolve();
				}
			}
		}

		// Function for loading default values
		resetItem = function (obj) {
			var upgradeItem = obj.objValue.items[obj.arrayLength];
			gameFactory.initializeItem(upgradeItem);

		}

		// Load game progress if it exists, otherwise load default values
		loadGame = function () {
			var obj = {};
			// Load upgrades by collection
			loadCollection = function (collectionName) {
				if ($localstorage.getObject(collectionName)) {
					gameFactory.iterateUpgrades(collectionName, obj, loadUpgrades);
				} else {
					gameFactory.iterateUpgrades(collectionName, obj, resetItem);
					$localstorage.setObject(collectionName, collectionFactory[collectionName]);
				}
			}
			loadCollection('broodUpg');
			loadCollection('evolutionUpg');
			// Load stats
			if ($localstorage.getObject('stats')) {
				statFactory.clicks = $localstorage.getObject('stats').clicks;
				statFactory.resources.food = $localstorage.getObject('stats').resources.food;
			} else {
				statFactory.clicks = 0;
				statFactory.resources.food = 0;
				$localstorage.setObject('stats', statFactory);
			}
		}
		loadGame();
		// END LOAD \\-------------------------

		// Make the collections accessable from the stage by passing them to $scope
		$scope.broodUpg = collectionFactory.broodUpg;
		$scope.evolutionUpg = collectionFactory.evolutionUpg;

		// Function for saving game progress
		saveGame = function () {
			$localstorage.setObject('broodUpg', collectionFactory.broodUpg);
			$localstorage.setObject('evolutionUpg', collectionFactory.evolutionUpg);
			$localstorage.setObject('stats', statFactory);
		}
		$scope.saveGame = saveGame;

		// Function for resetting game progress
		resetGame = function () {
			$localstorage.remove('broodUpg');
			$localstorage.remove('evolutionUpg');
			$localstorage.remove('stats');
			$localstorage.clear();
			loadGame();
			alert("Game reset!");
		}
		$scope.resetGame = resetGame;

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
			saveGame();
		}
		$interval(addInterval, 1000);
	}
]);
