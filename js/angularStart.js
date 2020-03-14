// //--------------------------------------------------\\
// ||-----> ARACHNEST <--------------------------------||
// ||-----> By Chris Farral <--------------------------||
// ||--------------------------------------------------||
// ||-----> Stats definitions <------------------------||
// \\--------------------------------------------------//

var ARACHNEST = angular.module("Arachnest", ["ui.bootstrap"]);

ARACHNEST.factory("statFactory", [
	function () {
		return {
			"clicks": 0,
			"clickMultiplier": 1,
			"intervalMultiplier": 1,
			"itemTotal": {
				"Web": 0,
				"Spider": 0
			},
			"resources": {
				"food": 0,
				"spiderlings": 0
			},
			"increaseRate": {
				"fpc": {
					"init": 1,
					"add": 0,
					"bonus": 1,
					"total": 1
				},
				"fps": {
					"init": 0,
					"add": 0,
					"bonus": 1,
					"total": 0
				},
				"sps": {
					"init": 0,
					"add": 0,
					"bonus": 1,
					"total": 0
				}
			}
		};
	}
]);