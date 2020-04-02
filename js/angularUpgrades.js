// //--------------------------------------------------\\
// ||-----> ARACHNEST <--------------------------------||
// ||-----> By Chris Farral <--------------------------||
// ||--------------------------------------------------||
// ||-----> Upgrade definitions <----------------------||
// \\--------------------------------------------------//

ARACHNEST.factory("collectionFactory", ["functionFactory", "statFactory",
	function (functionFactory, statFactory) {
		var collection = {};
		var byID = functionFactory.itemByID;
		collection.broodUpg = [ // Brood Upgrades
			{ // 0
				"id": "Spider",
				"items": [
					{// broodUpg[0].items[0]
						"id": "brood_grassSpider",
						"title": "Grass spider",
						"description": "These small spiders wander around in search of food.",
						"costType": "food",
						"initCost": 10,
						"add": {
							"fpc": { "initValue": 1 }
						},
						"requirement": function () {
							return true;
						}
					},
					{// 0.1
						"id": "brood_cobwebSpider",
						"title": "Cobweb spider",
						"description": "These small spiders have poor eyesight, but they make up for it by using webs.",
						"costType": "food",
						"initCost": 25,
						"add": {
							"fpc": { "initValue": 1 }
						},
						"requirement": function () {
							return true;
						}
					},
					{// 0.2
						"id": "brood_crabSpider",
						"title": "Crab spider",
						"description": "These small spiders ambush their prey by blending into their surroundings.",
						"costType": "food",
						"initCost": 50,
						"add": {
							"fpc": { "initValue": 5 }
						},
						"requirement": function () {
							return byID("evo_spiderCamo", collection.evolutionUpg[0].items).owned >= 1;
						}
					},
					{
						"id": "brood_jumpingSpider",
						"title": "Jumping Spider",
						"description": "These very mobile spiders intelligently stalk and pounce on their prey.",
						"costType": "food",
						"initCost": 100,
						"add": {
							"fpc": { "initValue": 50 }
						},
						"requirement": function () {
							return true;
						}
					},
					{
						"id": "brood_wolfSpider",
						"title": "Wolf spider",
						"description": "These spiders have great eyesight and can even hunt at night.",
						"costType": "food",
						"initCost": 300,
						"add": {
							"fpc": { "initValue": 10 }
						},
						"requirement": function () {
							return true;
						}
					},
					{
						"id": "brood_fishingSpider",
						"title": "Fishing Spider",
						"description": "Similar to wolf spiders, however, these spiders are commonly found near" +
							" bodies of water. They not only hunt near the water, but they can hunt ON the water.",
						"costType": "food",
						"initCost": 500,
						"add": {
							"fpc": { "initValue": 20 }
						},
						"requirement": function () {
							return true;
						}
					},
					{
						"id": "brood_meshWebWeaver",
						"title": "Mesh Web Weaver",
						"description": "Outdoor spiders with webs that are slightly more organized than cobweb spiders/weavers.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"fps": { "initValue": 10 }
						},
						"requirement": function () {
							return false;
						}
					},
					{
						"id": "brood_netCastingSpider",
						"title": "Net Casting Spider",
						"description": "Outdoor spiders with webs that are slightly more organized than cobweb spiders/weavers.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"fps": { "initValue": 10 }
						},
						"requirement": function () {
							return false;
						}
					},
					{
						"id": "brood_assassinSpider",
						"title": "Assassin Spider",
						"description": "Outdoor spiders with webs that are slightly more organized than cobweb spiders/weavers.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"fps": { "initValue": 10 }
						},
						"requirement": function () {
							return false;
						}
					},
					{
						"id": "brood_orbWeaver",
						"title": "Orb Weaver",
						"description": "Outdoor spiders with webs that are slightly more organized than cobweb spiders/weavers.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"fps": { "initValue": 10 }
						},
						"requirement": function () {
							return false;
						}
					},
					{
						"id": "brood_sacSpider",
						"title": "Sac Spider",
						"description": "Outdoor spiders with webs that are slightly more organized than cobweb spiders/weavers.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"fps": { "initValue": 10 }
						},
						"requirement": function () {
							return false;
						}
					},
					{
						"id": "brood_conewebSpider",
						"title": "Coneweb Spider",
						"description": "Outdoor spiders with webs that are slightly more organized than cobweb spiders/weavers.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"fps": { "initValue": 10 }
						},
						"requirement": function () {
							return false;
						}
					},
					{
						"id": "brood_divingBellSpider",
						"title": "Diving Bell Spider",
						"description": "Outdoor spiders with webs that are slightly more organized than cobweb spiders/weavers.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"fps": { "initValue": 10 }
						},
						"requirement": function () {
							return false;
						}
					},
					{
						"id": "brood_divingBellSpider",
						"title": "Diving Bell Spider",
						"description": "Outdoor spiders with webs that are slightly more organized than cobweb spiders/weavers.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"fps": { "initValue": 10 }
						},
						"requirement": function () {
							return false;
						}
					}

				]
			},
			{ // 1
				"id": "Web",
				"items": [
					{// 1.0
						"id": "brood_cobweb",
						"title": "Cobweb",
						"description": "Not very strong or organized but food manages to get tangled in it still.",
						"costType": "food",
						"initCost": 100,
						"add": {
							"fps": { "initValue": 1 }
						},
						"requirement": function () {
							return collection.broodUpg[0].items[1].owned >= 1;
						}
					},
					{// 1.1
						"id": "brood_weakWeb",
						"title": "Weak cobweb",
						"description": "It's weak, but at least it's not broken.",
						"costType": "food",
						"initCost": 200,
						"add": {
							"fps": { "initValue": 2 }
						},
						"requirement": function () {
							return false;
						}
					}
				]
			},
			{ // 2
				"id": "Nest",
				"items": [
					{// 2.0
						"id": "brood_",
						"title": "Normal silk",
						"description": "Security and nutrients. Silk is important.",
						"costType": "food",
						"initCost": 1000,
						"add": {
							"sps": {
								"initValue": 1,
								"target": function () {
									return collection.broodUpg[0].items[1];
								}
							}
						},
						"requirement": function () {
							return collection.broodUpg[1].items[0].owned >= 1;
						}
					},
					{// 2.1
						"id": "brood_enhancedSilk",
						"title": "Enhanced silk",
						"description": "This silk is enhanced with special proteins.",
						"costType": "food",
						"initCost": 10000000,
						"add": {
							"sps": { "initValue": 5 }
						},
						"requirement": function () {
							return false;
						}
					},
					{// 2.2
						"id": "brood_richSilk",
						"title": "Rich silk",
						"description": "This silk is rich with strength and elasticity. It's also healthy to eat!",
						"costType": "food",
						"initCost": 50000000,
						"add": {
							"sps": { "initValue": 20 }
						},
						"requirement": function () {
							return false;
						}
					},
					{// 2.3
						"id": "brood_skinThread",
						"title": "Skin thread",
						"description": "This powerful thread wraps around the outside of your nest, " +
							"providing it with protection",
						"costType": "food",
						"initCost": 100000000,
						"add": {
							"sps": { "initValue": 1000 }
						},
						"requirement": function () {
							return false;
						}
					},
					{// 2.4
						"id": "brood_vascularThread",
						"title": "Vascular thread",
						"description": "This thread is hollow and " +
							"allows a stream of food to flow directly to each spiderling",
						"costType": "food",
						"initCost": 200000000,
						"add": {
							"sps": { "initValue": 1000 }
						},
						"requirement": function () {
							return false;
						}
					},
					{// 2.5
						"id": "brood_muscularThread",
						"title": "Muscular thread",
						"description": "This thread can be contracted, rather than stretched. " +
							"This allows your nest to move!",
						"costType": "food",
						"initCost": 500000000,
						"add": {
							"sps": { "initValue": 1000 }
						},
						"requirement": function () {
							return false;
						}
					},
					{// 2.6
						"id": "brood_boneThread",
						"title": "Bone thread",
						"description": "This thread is compact and sturdy. " +
							"Not only does it provide further security, but it can be moved with the muscular threads!",
						"costType": "food",
						"initCost": 650000000,
						"add": {
							"sps": { "initValue": 1000 }
						},
						"requirement": function () {
							return false;
						}
					},
					{// 2.7
						"id": "brood_nerveThread",
						"title": "Nerve thread",
						"description": "This thread is thin and sensitive. " +
							"It allows your spiderlings to effectively communicate with one another",
						"costType": "food",
						"initCost": 800000000,
						"add": {
							"sps": { "initValue": 1000 }
						},
						"requirement": function () {
							return false;
						}
					},
					{// 2.8
						"id": "brood_sentience",
						"title": "Sentience",
						"description": "Your spiderlings can communicate and " +
							"react so well that the nest itself is essentially alive",
						"costType": "food",
						"initCost": 1000000000,
						"add": {
							"sps": { "initValue": 1000 }
						},
						"requirement": function () {
							return false;
						}
					}
				]
			}
		];

		collection.evolutionUpg = [ //Evolution
			{// 0
				"items": [
					{// evolutionUpg[0].items[0]
						"id": "evo_spiderCamo",
						"title": "Spider camo",
						"description": "Evolve camouflage, allowing your spiders to more easily capture prey.\n" +
							"Increase grass spider FPC by 1 + Unlocks Crab Spiders",
						"costType": "food",
						"initCost": 100,
						"evolve": function () {
							collection.broodUpg[0].items[0].add.fpc.value += 1;
						},
						"requirement": function () {
							//At least one grass spider owned and this upgrade not already purchased
							return (collection.broodUpg[0].items[0].owned >= 1)
								&& (collection.evolutionUpg[0].items[0].owned < 1);
						}
					},
					{// evolutionUpg[0].items[1]
						"id": "evo_betterSenses",
						"title": "Better senses",
						"description": "Evolve better senses on all of your spiders.\n" +
							"Increases spider FPC by 1%",
						"costType": "food",
						"initCost": 10000,
						"requirement": function () {
							return false;
						}
					},
					{// evolutionUpg[0].items[2]
						"id": "evo_spinnerets",
						"title": "Spinnerets",
						"description": "Learn how to use those spinnerets!\n" +
							"Increases Exp.S FPC by 1 + Unlocks Broken Webs",
						"costType": "food",
						"initCost": 200,
						"requirement": function () {
							return false;
						}
					},
					{// evolutionUpg[0].items[3]
						"id": "evo_webPlacement",
						"title": "Web placement",
						"description": "Get better at picking locations for webs.\n" +
							"Increases web FPS by 1%",
						"costType": "food",
						"initCost": 10000,
						"requirement": function () {
							return false;
						}
					},
					{// evolutionUpg[0].items[4]
						"id": "evo_stickyWebs",
						"title": "Sticky webs",
						"description": "Start producing sticky fluids on all of your webs.\n" +
							"Increases web FPS by 1%",
						"costType": "food",
						"initCost": 30000,
						"requirement": function () {
							return false;
						}
					},
					{// evolutionUpg[0].items[5]
						"id": "evo_softerSilk",
						"title": "Softer silk",
						"description": "Soft silk inside the nest keeps spiderlings happy!\n" +
							"Increases nest SPS by 1%",
						"costType": "food",
						"initCost": 30000,
						"requirement": function () {
							return false;
						}
					},
					{// evolutionUpg[0].items[6]
						"id": "evo_nightVision",
						"title": "Night vision",
						"description": "Hunting at night is great, but it gets better with sight!\n" +
							"Increase Exp.S FPC by 2 + Unlocks Wolf Spiders",
						"requirement": function () {
							return false;
						}
					},
					{// evolutionUpg[0].items[7]
						"id": "evo_hydrophobicHairs",
						"title": "Hydrophobic hairs",
						"description": "These hairs allow spiders to walk on water and even survive beneath the surface.\n" +
							"Increase Exp.S FPC by 3 + Unlocks Fishing Spiders",
						"requirement": function () {
							return false;
						}
					}
				]
			}
		];

		collection.achievement = [ //Achievement
			{// 0
				"items": [
					{
						"id": "achieve_motherSpider",
						"title": "Mother of spiders",
						"description": "Spawned your first spider",
						"requirement": function () {
							return byID("brood_grassSpider", collection.broodUpg[0].items).owned >= 1;
						}
					},
					{
						"id": "achieve_spiderQueen",
						"title": "Queen of spiders",
						"description": "Spawned 100 spiders",
						"requirement": function () {
							return statFactory.itemTotal.Spider >= 100;
						}
					}
				]
			}
		];
		return collection;
	}
]);