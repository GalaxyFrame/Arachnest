// Factory for localStorage functionality
// Credit to Alessio Delmonti https://gist.github.com/Alexintosh/8e8dd716860c8fdcd08a
ARACHNEST.factory('$localstorage', ['$window',
    function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue || false;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key, defaultValue) {
                if ($window.localStorage[key] != undefined) {
                    return JSON.parse($window.localStorage[key]);
                } else {
                    return false;
                }
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            clear: function () {
                $window.localStorage.clear();
            }
        }
    }
]);

ARACHNEST.factory("saveLoad", ["$localstorage", "gameFactory", "collectionFactory", "statFactory",
	function ($localstorage, gameFactory, collectionFactory, statFactory) {
		var me = {};
			// --- LOAD GAME -- \\-----------------------
			me.loadUpgrades = function (obj) {
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
		me.resetItem = function (obj) {
				var upgradeItem = obj.objValue.items[obj.arrayLength];
				gameFactory.initializeItem(upgradeItem);

			}

		// Load game progress if it exists, otherwise load default values
		me.loadGame = function () {
				var obj = {};
				// Load upgrades by collection
				loadCollection = function (collectionName) {
					if ($localstorage.getObject(collectionName)) {
						gameFactory.iterateUpgrades(collectionName, obj, me.loadUpgrades);
					} else {
						gameFactory.iterateUpgrades(collectionName, obj, me.resetItem);
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
		// END LOAD \\-------------------------

		// Function for saving game progress
		me.saveGame = function () {
				$localstorage.setObject('broodUpg', collectionFactory.broodUpg);
				$localstorage.setObject('evolutionUpg', collectionFactory.evolutionUpg);
				$localstorage.setObject('stats', statFactory);
			}


		// Function for resetting game progress
		me.resetGame = function () {
				$localstorage.remove('broodUpg');
				$localstorage.remove('evolutionUpg');
				$localstorage.remove('stats');
				$localstorage.clear();
				me.loadGame();
				alert("Game reset!");
		}
		return me;
	}
]);