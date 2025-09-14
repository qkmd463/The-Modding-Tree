addLayer("a", {
    name: "a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6529cc",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "a", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "a: Reset for a", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
buyables: {
11: {
title: “11”,
unlocked() { return true },
cost(x) {
let exp1 = new Decimal(1.2)
let exp2 = new Decimal (1.1005)
return new Decimal(2).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x)))).floor()
},
display() {
return “Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " A-Points” + "
Bought: " + getBuyableAmount(this.layer, this.id) + 
Effect: Nothing” + format(buyableEffect(this.layer, this.id))
},
canAfford() {
return player.A.points.gte(this.cost())
},
buy() {
let cost = new Decimal (1)
player.a.points = player.a.points.sub(this.cost().mul(cost))
setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
},
effect(x) {
let base1 = new Decimal(1.46)
let base2 = x
let expo = new Decimal(1.012)
let eff = base1.pow(Decimal.pow(base2, expo)).times(3)
return eff
},
},
},
}),
