addLayer("r", {
    name: "restart", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "r", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#d93636",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "restart", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.08, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('r', 13)) mult = mult.times(upgradeEffect('r', 13))
	if (hasUpgrade('r', 21)) mult = mult.times(15)
	if (hasUpgrade('r', 22)) mult = mult.times(upgradeEffect('r', 22))
	if (hasUpgrade('p', 12)) mult = mult.times(25)
	if (hasUpgrade('p', 21)) mult = mult.times(upgradeEffect('p', 21))
	if (hasUpgrade('c', 11)) mult = mult.times(50)
	if (hasUpgrade('c', 13)) mult = mult.times(upgradeEffect('c', 13))
	if (hasUpgrade('r', 33)) mult = mult.pow(1.006)
	if (hasUpgrade('p', 42)) mult = mult.pow(upgradeEffect('p', 42))
	if (hasUpgrade('p', 43)) mult = mult.pow(upgradeEffect('p', 43))
	if (hasUpgrade('p', 44)) mult = mult.pow(upgradeEffect('p', 44))
	if (hasUpgrade('c', 31)) mult = mult.pow(upgradeEffect('c', 31))
	if (hasUpgrade('d', 11)) mult = mult.times(1e6)
	if (hasUpgrade('d', 12)) mult = mult.times(upgradeEffect('d', 12))
	if (hasUpgrade('d', 13)) mult = mult.pow(1.01)
	if (hasUpgrade('d', 14)) mult = mult.pow(upgradeEffect('d', 14))
	if (hasUpgrade('r', 43)) mult = mult.times(upgradeEffect('r', 43))
	if (hasMilestone('pl', 0)) mult = mult.times(1e7)
	if (hasMilestone('pl', 2)) mult = mult.pow(1.5)
	if (hasUpgrade('pl', 11)) mult = mult.times(upgradeEffect('pl', 11))
	if (inChallenge('d', 11)) mult = mult.pow(0.0001)
 	if(mult.gte("e1e12")) mult=mult.div("e1e12").pow(0.1).mul("e1e12")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuse
        return new Decimal(1)
    },
    passiveGeneration() { 
        if (hasUpgrade("r", 23)) return (hasUpgrade("r", 23)?1:0)
        },    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: reset for restart", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("pl", 1) && resettingLayer<="pl") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
	},
	    upgrades: {
        11: {
            title: "11",
            description: "10x point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "12",
            description: "restart boost points.",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	13: {
            title: "13",
            description: "restart boost restart.",
            cost: new Decimal(125),
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    },
	14: {
            title: "14",
            description: "points boost points.",
            cost: new Decimal(5000),
		            effect() {
                return player.points.add(1).pow(0.45)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    },
        21: {
            title: "21",
            description: "15x restart gain.",
            cost: new Decimal(270000),
        	},
	22: {
            title: "22",
            description: "points boost restart.",
            cost: new Decimal(900000000),
		            effect() {
                return player.points.plus(10).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect	    
	    },
	23: {
            title: "23",
            description: "+100% restart/s.",
            cost: new Decimal(1e32),
        },
	24: {
            title: "24",
            description: "points boost prestige.",
            cost: new Decimal(1e160),
		            effect() {
                return player.points.plus(10).pow(0.3).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect	    
	    },
	31: {
            title: "31",
            description: "restart boost prestige.",
            cost: new Decimal(1e250),
		            effect() {
                return player.r.points.plus(10).pow(1.4).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect	    
	    },
	32: {
            title: "32",
            description: "points ^1.003.",
            cost: new Decimal("1e5000"),
	    },
	33: {
            title: "33",
            description: "restart ^1.006.",
            cost: new Decimal("1e7000"),
	    },
	34: {
            title: "34",
            description: "prestige ^1.009.",
            cost: new Decimal("1e8000"),
	    },
	41: {
            title: "41",
            description: "coins ^1.5.",
            cost: new Decimal("1e16000"),
	    },
	42: {
            title: "42",
            description: "diamonds ^2.5.",
            cost: new Decimal("1e30000000"),
	    },
	43: {
            title: "43",
            description: "diamonds boosts restart",
            cost: new Decimal("1e3e10"),
            effect() {
                return player.d.points.add(1).pow(500000)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
	44: {
            title: "44",
            description: "diamonds boosts prestige",
            cost: new Decimal("1e3.5e10"),
            effect() {
                return player.d.points.add(1).pow(60000)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
	    }

		    
}),
	addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "p", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	    	restart: new Decimal(0),
    }},
    color: "#208ec9",
    requires: new Decimal("1e14"), // Can be a function that takes requirement increases into account
    resource: "prestige", // Name of prestige currency
    baseResource: "restart", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.16, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('p', 13)) mult = mult.times(2)
	if (hasUpgrade('p', 22)) mult = mult.times(upgradeEffect('p', 22))
	if (hasUpgrade('r', 24)) mult = mult.times(upgradeEffect('r', 24))
	if (hasUpgrade('r', 31)) mult = mult.times(upgradeEffect('r', 31))
	if (hasUpgrade('c', 11)) mult = mult.times(50)
	if (hasUpgrade('c', 14)) mult = mult.times(upgradeEffect('c', 14))
	if (hasUpgrade('r', 34)) mult = mult.pow(1.009)
	if (hasUpgrade('c', 32)) mult = mult.pow(upgradeEffect('c', 32))
	if (hasUpgrade('c', 33)) mult = mult.pow(upgradeEffect('c', 33))
	if (hasUpgrade('c', 34)) mult = mult.pow(upgradeEffect('c', 34))
	if (hasUpgrade('c', 41)) mult = mult.pow(upgradeEffect('c', 41))
	if (hasUpgrade('d', 11)) mult = mult.times(1e6)
	if (hasUpgrade('d', 12)) mult = mult.times(upgradeEffect('d', 12))
	if (hasUpgrade('d', 13)) mult = mult.pow(1.01)
	if (hasUpgrade('d', 14)) mult = mult.pow(upgradeEffect('d', 14))
	if (hasUpgrade('r', 44)) mult = mult.times(upgradeEffect('r', 44))
	if (hasMilestone('pl', 0)) mult = mult.times(1e7)
	if (hasUpgrade('pl', 11)) mult = mult.times(upgradeEffect('pl', 11))
	if (hasMilestone('pl', 3)) mult = mult.pow(8.4)		
	if (inChallenge('d', 11)) mult = mult.pow(0.0001)
 	if(mult.gte("e1e12")) mult=mult.div("e1e12").pow(0.1).mul("e1e12")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    passiveGeneration() { 
        if (hasUpgrade("p", 23)) return (hasUpgrade("p", 23)?1:0)
        },    
    hotkeys: [
        {key: "p", description: "p: reset for prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("pl", 2) && resettingLayer<="pl") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
	},
		upgrades: {
        11: {
            title: "11",
            description: "10000x point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "12",
            description: "25x restart gain.",
            cost: new Decimal(1),
        },
        13: {
            title: "13",
            description: "2x prestige gain.",
            cost: new Decimal(1),
        },
        14: {
            title: "14",
            description: "prestige boost points.",
            cost: new Decimal(50),
            effect() {
                return player[this.layer].points.add(1).pow(8)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect		
            },
	21: {
            title: "21",
            description: "prestige boost restart.",
            cost: new Decimal(30000),
            effect() {
                return player[this.layer].points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	22: {
            title: "22",
            description: "prestige boost prestige.",
            cost: new Decimal(10000000),
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	23: {
            title: "23",
            description: "+100% prestige/s.",
            cost: new Decimal(1e11),
        },
	24: {
            title: "24",
            description: "points boost coins.",
            cost: new Decimal(1e190),
            effect() {
                return player.points.add(10).pow(0.0001).log10().plus(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	31: {
            title: "31",
            description: "restart boost coins.",
            cost: new Decimal("1e330"),
            effect() {
                return player.r.points.add(10).pow(0.001).log10().plus(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	32: {
            title: "32",
            description: "prestige boost coins.",
            cost: new Decimal("1e650"),
            effect() {
                return player.p.points.add(10).pow(0.01).log10().plus(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	33: {
            title: "33",
            description: "points raises points",
            cost: new Decimal("1e1700"),
            effect() {
                return player.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	34: {
            title: "34",
            description: "restart raises points",
            cost: new Decimal("1e2000"),
            effect() {
                return player.r.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	41: {
            title: "41",
            description: "prestige raises points",
            cost: new Decimal("1e2500"),
            effect() {
                return player.p.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	42: {
            title: "42",
            description: "points raises restart",
            cost: new Decimal("1e8000"),
            effect() {
                return player.points.add(10).log10().pow(0.00005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	43: {
            title: "43",
            description: "restart raises restart",
            cost: new Decimal("1e11000"),
            effect() {
                return player.r.points.add(10).log10().pow(0.00005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	44: {
            title: "44",
            description: "prestige raises restart",
            cost: new Decimal("1e17000"),
            effect() {
                return player.p.points.add(10).log10().pow(0.00005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
	}
	}),

	addLayer("c", {
    name: "coins", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "c", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	    	prestige: new Decimal(0),
		restart: new Decimal(0),
    }},
    color: "#d9c216",
    requires: new Decimal(1e80), // Can be a function that takes requirement increases into account
    resource: "coins", // Name of prestige currency
    baseResource: "prestige", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.011, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('p', 24)) mult = mult.times(upgradeEffect('p', 24))
	if (hasUpgrade('p', 31)) mult = mult.times(upgradeEffect('p', 31))
	if (hasUpgrade('p', 32)) mult = mult.times(upgradeEffect('p', 32))
	if (hasUpgrade('c', 21)) mult = mult.times(3)
	if (hasUpgrade('c', 22)) mult = mult.times(upgradeEffect('c', 22))
	if (hasUpgrade('r', 41)) mult = mult.pow(1.5)
	if (hasUpgrade('d', 11)) mult = mult.times(1e6)
	if (hasUpgrade('c', 42)) mult = mult.pow(upgradeEffect('c', 42))
	if (hasUpgrade('c', 43)) mult = mult.pow(upgradeEffect('c', 43))
	if (hasUpgrade('c', 44)) mult = mult.pow(upgradeEffect('c', 44))
	if (hasUpgrade('d', 12)) mult = mult.times(upgradeEffect('d', 12))
	if (hasUpgrade('d', 13)) mult = mult.pow(1.01)
	if (hasUpgrade('d', 14)) mult = mult.pow(upgradeEffect('d', 14))
	if (hasUpgrade('d', 24)) mult = mult.times(upgradeEffect('d', 24))
	if (hasUpgrade('d', 32)) mult = mult.pow(upgradeEffect('d', 32))
	if (hasMilestone('pl', 0)) mult = mult.times(1e7)
	if (hasUpgrade('pl', 11)) mult = mult.times(upgradeEffect('pl', 11))
	if (inChallenge('d', 11)) mult = mult.pow(0.0001)
 	if(mult.gte("e1e12")) mult=mult.div("e1e12").pow(0.1).mul("e1e12")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    if (inChallenge('c', 11)) mult = new Decimal(0.0001)
    },
    passiveGeneration() { 
        if (hasUpgrade("c", 23)) return (hasUpgrade("c", 23)?1:0)
        },    
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: reset for coins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("pl", 3) && resettingLayer<="pl") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
		}
		upgrades: {
        11: {
            title: "11",
            description: "50x points, restart, prestige.",
            cost: new Decimal(1),
        },
        12: {
            title: "12",
            description: "coins boost points.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(3).pow(45)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        13: {
            title: "13",
            description: "coins boost restart.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(2).pow(2.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        14: {
            title: "14",
            description: "coins boost prestige.",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(0.9)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        21: {
            title: "21",
            description: "3x coins gain.",
            cost: new Decimal(500),
        },
        22: {
            title: "22",
            description: "coins boost coins.",
            cost: new Decimal(40000),
            effect() {
                return player[this.layer].points.add(1).pow(0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        23: {
            title: "23",
            description: "+100% coins/s.",
            cost: new Decimal(1000000),
		},
		24: {
            title: "24",
            description: "coins raises points",
            cost: new Decimal("1e200"),
            effect() {
                return player.c.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		31: {
            title: "31",
            description: "coins raises restart",
            cost: new Decimal("1e300"),
            effect() {
                return player.c.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		32: {
            title: "32",
            description: "points raises prestige",
            cost: new Decimal("1e400"),
            effect() {
                return player.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		33: {
            title: "33",
            description: "restart raises prestige",
            cost: new Decimal("1e500"),
            effect() {
                return player.r.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		34: {
            title: "34",
            description: "prestige raises prestige",
            cost: new Decimal("1e600"),
            effect() {
                return player.p.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		41: {
            title: "41",
            description: "coins raises prestige",
            cost: new Decimal("1e700"),
            effect() {
                return player.c.points.add(10).log10().pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		42: {
            title: "42",
            description: "points raises coins",
            cost: new Decimal("1e24008"),
            effect() {
                return player.points.add(10).log10().pow(0.03)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		43: {
            title: "43",
            description: "restart raises coins",
            cost: new Decimal("1e26000"),
            effect() {
                return player.r.points.add(10).log10().pow(0.03)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		44: {
            title: "44",
            description: "prestige raises coins",
            cost: new Decimal("1e32000"),
            effect() {
                return player.p.points.add(10).log10().pow(0.03)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		},
	}),

		addLayer("d", {
    name: "diamonds", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "d", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	    restart: new Decimal(0),
		coins: new Decimal(0),
    }},
    color: "#30a19d",
    requires: new Decimal("1e24000"), // Can be a function that takes requirement increases into account
    resource: "diamonds", // Name of prestige currency
    baseResource: "coins", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000003, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('d', 21)) mult = mult.times(1.7)	
	if (hasUpgrade('d', 22)) mult = mult.times(upgradeEffect('d', 22))
	if (hasUpgrade('d', 31)) mult = mult.times(upgradeEffect('d', 31))
	if (hasUpgrade('r', 42)) mult = mult.pow(2.5)
	if (hasUpgrade('d', 33)) mult = mult.pow(upgradeEffect('d', 33))
	if (hasUpgrade('d', 34)) mult = mult.pow(upgradeEffect('d', 34))
	if (hasUpgrade('d', 41)) mult = mult.pow(upgradeEffect('d', 41))
	if (hasUpgrade('d', 42)) mult = mult.pow(upgradeEffect('d', 42))
	if (hasUpgrade('d', 43)) mult = mult.pow(upgradeEffect('d', 43))
	if (hasMilestone('pl', 0)) mult = mult.times(1e7)
	if (hasChallenge('d', 11)) mult = mult.times("1e1000")
	if (hasUpgrade('pl', 11)) mult = mult.times(upgradeEffect('pl', 11))
 	if(mult.gte("e1e12")) mult=mult.div("e1e12").pow(0.1).mul("e1e12")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    passiveGeneration() { 
        if (hasUpgrade("c", 23)) return (hasUpgrade("d", 23)?1:0)
        },    
    hotkeys: [
        {key: "d", description: "d: reset for diamonds", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades: {
        11: {
            title: "11",
            description: "1000000x points, restart, prestige, coins.",
            cost: new Decimal(1),
        },
	    12: {
            title: "12",
            description: "diamonds boosts points, restart, prestige, coins.",
            cost: new Decimal(1),
            effect() {
                return player.d.points.add(1).pow(500)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
	    13: {
            title: "13",
            description: "points, restart, prestige, coins ^1.01.",
            cost: new Decimal(1), 
		},
		14: {
            title: "14",
            description: "diamonds raises restart, prestige, coins",
            cost: new Decimal(1),
            effect() {
                return player.d.points.add(10).log10().pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		21: {
            title: "21",
            description: "x1.7 diamonds.",
            cost: new Decimal(1), 
		},
		22: {
            title: "22",
            description: "diamonds boosts diamonds",
            cost: new Decimal(1),
            effect() {
                return player.d.points.add(10).log10().pow(2.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
        23: {
            title: "23",
            description: "+100% diamonds/s.",
            cost: new Decimal(100),
		},
	    24: {
            title: "24",
            description: "diamonds boosts coins.",
            cost: new Decimal(10000),
            effect() {
                return player.d.points.add(1).pow(50000)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		31: {
            title: "31",
            description: "coins boosts diamonds.",
            cost: new Decimal(10000000),
		            effect() {
                return player.c.points.add(10).pow(0.0001).log10().add(1)
		},
	 		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		32: {
            title: "32",
            description: "coins raises coins",
            cost: new Decimal(1e36),
            effect() {
                return player.d.points.add(10).log10().pow(0.03)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		33: {
            title: "33",
            description: "points raises diamonds",
            cost: new Decimal(1e52),
            effect() {
                return player.points.add(10).log10().pow(0.04)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		34: {
            title: "34",
            description: "restart raises diamonds",
            cost: new Decimal(1e87),
            effect() {
                return player.r.points.add(10).log10().pow(0.04)
			},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		41: {
            title: "41",
            description: "prestige raises diamonds",
            cost: new Decimal(1e125),
            effect() {
                return player.p.points.add(10).log10().pow(0.04)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		42: {
            title: "42",
            description: "coins raises diamonds",
            cost: new Decimal("1e320"),
            effect() {
                return player.c.points.add(10).log10().pow(0.04)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		43: {
            title: "43",
            description: "diamonds raises diamonds",
            cost: new Decimal("1e890"),
            effect() {
                return player.d.points.add(10).log10().pow(0.04)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		44: {
            title: "44",
            description: "diamonds boosts points",
            cost: new Decimal("1e1365"),
            effect() {
                return player.d.points.add(1).pow(50000000)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		},
    challenges: {
        11: {
            name: "diamond challenge",
            challengeDescription: "points, restart, prestige, coins ^0.0001",
            goalDescription: "1e33800 coins",
            rewardDescription: "x1e1000x diamonds",
            canComplete() {
                return (player.c.points.gte("1e33800"))
            },
            completionLimit: 1,
		},
	}
		}),
			addLayer("pl", {
    name: "planet", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "pl", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	    restart: new Decimal(0),
		coins: new Decimal(0),
		diamonds: new Decimal(0),
    }},
    color: "#a7bf0b",
    requires: new Decimal("1e1600000"), // Can be a function that takes requirement increases into account
    resource: "planet", // Name of prestige currency
    baseResource: "diamonds", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 14, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0.5)
 	if(mult.gte("e1e12")) mult=mult.div("e1e12").pow(0.1).mul("e1e12")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    passiveGeneration() { 
        },    
    hotkeys: [
        {key: "l", description: "l: reset for planet", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	canBuyMax(){
	return true
 },
	upgrades: {
	    11: {
            title: "11",
            description: "planet boost all previous currencies.",
            cost: new Decimal(3),
            effect() {
                return player.pl.points.add(1).pow(13000000)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
		},
		},
    milestones: {
        0: {
            requirementDescription: "1 planet",
            effectDescription: "x10000000 all previous currencies.",
            done() { return player.pl.points.gte(1) }
        },
        1: {
            requirementDescription: "2 planet",
            effectDescription: "keep restart upgrades, points ^1.1.",
            done() { return player.pl.points.gte(2) }
        },
        2: {
            requirementDescription: "3 planet",
            effectDescription: "keep prestige upgrades, restart ^1.5.",
            done() { return player.pl.points.gte(3) }
		},
        3: {
            requirementDescription: "4 planet",
            effectDescription: "keep coins upgrades, prestige ^8.4.",
            done() { return player.pl.points.gte(4) }
		},
		}
			})


			


	


	

   
