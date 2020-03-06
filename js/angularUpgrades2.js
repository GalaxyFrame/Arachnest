ARACHNEST.factory("collectionFactory", ["statFactory",
	function () {
		var collection = {};
		collection.broodUpg = { // Brood upgrades
			"Spider": { // Spider group of Brood upgrades
				"brood_grassSpider": { // upgrade within the Spider group
					"title": "Grass spider",
					"description": "These small spiders wander around in search of food.",
					"costType": "food",
					"initCost": 10,
					"add": { "fpc": 1 },
					"requirement": function () {
						return true;
					}
				},
				"brood_cobwebSpider": {
					"title": "Cobweb spider",
					"description": "These small spiders have poor eyesight, but they make up for it by using webs.",
					"costType": "food",
					"initCost": 25,
					"add": { "fpc": 1 },
					"requirement": function () {
						return true;
					}
				},
				"brood_crabSpider": {
					"title": "Crab spider",
					"description": "These small spiders ambush their prey by blending into their surroundings.",
					"costType": "food",
					"initCost": 50,
					"add": { "fpc": 5 },
					"requirement": function () {
						return collection.broodUpg.Spider.brood_grassSpider.owned >= 1;
					}
				},
				"brood_wolfSpider": {
					"title": "Wolf spider",
					"description": "These spiders have great eyesight and can even hunt at night.",
					"costType": "food",
					"initCost": 100,
					"add": { "fpc": 10 },
					"requirement": function () {
						return false;
					}
				},
				"brood_fishingSpider": {
					"title": "Fishing Spider",
					"description": "Similar to wolf spiders, however, these spiders are commonly found near" +
						" bodies of water. They not only hunt near the water, but they can hunt ON the water.",
					"costType": "food",
					"initCost": 200,
					"add": { "fpc": 20 },
					"requirement": function () {
						return false;
					}
				}
			},
			"Web": {
				"brood_brokenWeb": {
					"title": "Broken web",
					"description": "This web is broken, but it works.",
					"costType": "food",
					"initCost": 100,
					"add": { "fps": 1 },
					"requirement": function () {
						return collection.broodUpg.Spider.brood_cobwebSpider.owned >= 1;
					}
				},
				"brood_weakWeb": {
					"title": "Weak web",
					"description": "It's weak, but at least it's not broken.",
					"costType": "food",
					"initCost": 200,
					"add": { "fps": 2 },
					"requirement": function () {
						return false;
					}
				}
			},
			"Nest": {
				"brood_normalSilk": {
					"title": "Normal silk",
					"description": "Security and nutrients. Silk is important.",
					"costType": "food",
					"initCost": 1000000,
					"add": { "sps": 1 },
					"requirement": function () {
						return false;
					}
				},
				"brood_enhancedSilk": {
					"title": "Enhanced silk",
					"description": "This silk is enhanced with special proteins.",
					"costType": "food",
					"initCost": 10000000,
					"add": { "sps": 5 },
					"requirement": function () {
						return false;
					}
				},
				"brood_richSilk": {
					"title": "Rich silk",
					"description": "This silk is rich with strength and elasticity. It's also healthy to eat!",
					"costType": "food",
					"initCost": 50000000,
					"add": { "sps": 20 },
					"requirement": function () {
						return false;
					}
				},
				"brood_skinThread": {
					"title": "Skin thread",
					"description": "This powerful thread wraps around the outside of your nest, " +
						"providing it with protection",
					"costType": "food",
					"initCost": 100000000,
					"add": { "sps": 1000 },
					"requirement": function () {
						return false;
					}
				},
				"brood_vascularThread": {
					"title": "Vascular thread",
					"description": "This thread is hollow and " +
						"allow a stream of food to flow directly to each spiderling",
					"costType": "food",
					"initCost": 200000000,
					"add": { "sps": 1000 },
					"requirement": function () {
						return false;
					}
				},
				"brood_muscularThread": {
					"title": "Muscular thread",
					"description": "This thread can be contracted, rather than stretched. " +
						"This allows your nest to move!",
					"costType": "food",
					"initCost": 500000000,
					"add": { "sps": 1000 },
					"requirement": function () {
						return false;
					}
				},
				"brood_boneThread": {
					"title": "Bone thread",
					"description": "This thread is compact and sturdy. " +
						"Not only does it provide further security, but it can be moved with the muscular threads!",
					"costType": "food",
					"initCost": 650000000,
					"add": { "sps": 1000 },
					"requirement": function () {
						return false;
					}
				},
				"brood_nerveThread": {
					"title": "Nerve thread",
					"description": "This thread is thin and sensitive. " +
						"It allows your spiderlings to effectively communicate with one another",
					"costType": "food",
					"initCost": 800000000,
					"add": { "sps": 1000 },
					"requirement": function () {
						return false;
					}
				},
				"brood_sentience": {
					"title": "Sentience",
					"description": "Your spiderlings can communicate and " +
						"react so well that the nest itself is essentially alive",
					"costType": "food",
					"initCost": 1000000000,
					"add": { "sps": 1000 },
					"requirement": function () {
						return false;
					}
				}
			}
		};

		collection.evolutionUpg = [ //Evolution
			{
				"evo_spiderCamo": {
					"title": "Spider camo",
					"description": "Evolve camouflage, allowing your spiders to more easily capture prey.\n" +
						"Increase grass spider FPC by 1 + Unlocks Crab Spiders",
					"costType": "food",
					"initCost": 100,
					"evolve": function () {
						collection.broodUpg.Spider.brood_grassSpider.add.fpc += 1;
					},
					"requirement": function () {
						//At least one grass spider owned and this upgrade not already purchased
						return (collection.broodUpg.Spider.brood_grassSpider.owned >= 1)
							&& (collection.evolutionUpg[0].evo_spiderCamo.owned < 1);
					}
				},
				"evo_betterSenses": {
					"title": "Better senses",
					"description": "Evolve better senses on all of your spiders.\n" +
						"Increases spider FPC by 1%",
					"costType": "food",
					"initCost": 10000,
					"requirement": function () {
						return false;
					}
				},
				"evo_spinnerets": {
					"title": "Spinnerets",
					"description": "Learn how to use those spinnerets!\n" +
						"Increases Exp.S FPC by 1 + Unlocks Broken Webs",
					"costType": "food",
					"initCost": 200,
					"requirement": function () {
						return false;
					}
				},
				"evo_webPlacement": {
					"title": "Web placement",
					"description": "Get better at picking locations for webs.\n" +
						"Increases web FPS by 1%",
					"costType": "food",
					"initCost": 10000,
					"requirement": function () {
						return false;
					}
				},
				"evo_stickyWebs": {
					"title": "Sticky webs",
					"description": "Start producing sticky fluids on all of your webs.\n" +
						"Increases web FPS by 1%",
					"costType": "food",
					"initCost": 30000,
					"requirement": function () {
						return false;
					}
				},
				"evo_softerSilk": {
					"title": "Softer silk",
					"description": "Soft silk inside the nest keeps spiderlings happy!\n" +
						"Increases nest SPS by 1%",
					"costType": "food",
					"initCost": 30000,
					"requirement": function () {
						return false;
					}
				},
				"evo_nightVision": {
					"title": "Night vision",
					"description": "Hunting at night is great, but it gets better with sight!\n" +
						"Increase Exp.S FPC by 2 + Unlocks Wolf Spiders",
					"requirement": function () {
						return false;
					}
				},
				"evo_hydrophobicHairs": {
					"title": "Hydrophobic hairs",
					"description": "These hairs allow spiders to walk on water and even survive beneath the surface.\n" +
						"Increase Exp.S FPC by 3 + Unlocks Fishing Spiders",
					"requirement": function () {
						return false;
					}
				}
			}
		];

		collection.achievement = [ //Achievement
			{// 0
				"id": "achieve_motherSpider",
				"title": "Mother of spiders.",
				"description": "Spawned your first spider.",
				"requirement": function () {
					return collection.broodUpg.Spider.brood_grassSpider.owned >= 1;
				}
			}
		];
		return collection;
	}
]);