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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
            description: "restart boost point.",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        
        },
        13: {
            title: "Self-Mult",
            description: "Multiplies your point gain according to your points.",
            cost: new Decimal(4),
            effect() {
                if  (hasUpgrade('p', 21)) return player.points.add(1).pow(0.15).add(1).pow(1.01)
                else return player.points.add(1).pow(0.15) 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Reverse Synergy-Mult",
            description: "Multiplies your prestige point gain according to your points.",
            cost: new Decimal(8),
            effect() {
                return player.points.add(1).pow(0.15).pow(buyableEffect('e', 11))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        21: {
            title: "Self-Mult Boost",
            description: "RAISES YOUR SELF-MULT TO THE POWER OF 1.2!!!111!!!!1!1!!! <br> !!11!! WOOOOOOOOHHHOOOOOOOO (i have autism).",
            cost: new Decimal(30),
        },
        22:{
            title: "Exp",
            description: "RAISES YOUR POINT GAIN TO THE POWER OF 1.2!!!!!11111!!!111!! <br> !1!!1!!11 YAAAAAYAYAYYYAYYYYYYY (i have autism pt.2).",
            cost: new Decimal(100),
            unlocked() { let SDRedstone = false
                if (hasMilestone('e', 1)) SDRedstone = true
                let gdhhwwciwcdccedjcbedhjeb = SDRedstone
                return gdhhwwciwcdccedjcbedhjeb
            }
        }
    },
})

    


			

			


	


	

   
