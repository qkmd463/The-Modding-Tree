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
	if (hasUpgrade('r', 11)) mult = mult.times(15)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: reset for restart", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
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
	    }

})

    


			

			


	


	

   
