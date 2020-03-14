// //--------------------------------------------------\\
// ||-----> ARACHNEST <--------------------------------||
// ||-----> By Chris Farral <--------------------------||
// ||--------------------------------------------------||
// ||-----> Style control center <---------------------||
// \\--------------------------------------------------//

(function ($) {
	$(".tooltipBot").tooltipster({
		theme: "tooltipster-spider",
		position: "bottom",
		offsetY: 4,
		delay: 0,
		speed: 0
	});
	$("#broodDescription, #evolutionDescription, #achievementDescription").tooltipster({
		theme: "tooltipster-spider",
		position: "top",
		autoClose: false,
		onlyOne: true,
		speed: 0
	});
	$("#saveButton").tooltipster("content", "Save your progress");
	$("#resetButton").tooltipster("content", "Delete your save data and start over");
}(jQuery));

ARACHNEST.controller("styleController", ["$scope", "styleFactory",
	function ($scope, styleFactory) {

		// Show tooltip for the selected element.
		$scope.showTooltip = function (element) {
			$(element).tooltipster("show");
		};

		// Hide tooltip for the selected element.
		$scope.hideTooltip = function (element) {
			$(element).tooltipster("hide");
		};

		// Change the content of the tooltip for the selected element.
		$scope.contentTooltip = function (element, tooltipText) {
			$(element).tooltipster("content", tooltipText);
		};

		// Show the tooltip with updated content, for an upgrade.
		$scope.upgTooltip = function (element, upgrade) {
			var tooltipText = styleFactory.getAddRateText(upgrade);
			$scope.contentTooltip(element, tooltipText);
			$scope.showTooltip(element);
		};
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
