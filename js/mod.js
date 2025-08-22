let modInfo = {
	name: "The ??? Tree",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade('r', 11)) gain = gain.times(10)
	if (hasUpgrade('r', 12)) gain = gain.times(upgradeEffect('r', 12))
	if (hasUpgrade('r', 14)) gain = gain.times(upgradeEffect('r', 14))
	if (hasUpgrade('p', 11)) gain = gain.times(10000)
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('c', 11)) gain = gain.times(50)
	if (hasUpgrade('c', 12)) gain = gain.times(upgradeEffect('c', 12))
	if (hasUpgrade('r', 32)) gain = gain.pow(1.003)
	if (hasUpgrade('p', 33)) gain = gain.pow(upgradeEffect('p', 33))
	if (hasUpgrade('p', 34)) gain = gain.pow(upgradeEffect('p', 34))
	if (hasUpgrade('p', 41)) gain = gain.pow(upgradeEffect('p', 41))
	if (hasUpgrade('p', 42)) gain = gain.pow(upgradeEffect('p', 42))
	if (hasUpgrade('c', 24)) gain = gain.pow(upgradeEffect('c', 24))
	if (hasUpgrade('d', 11)) gain = gain.times(1e6)
	if (hasUpgrade('d', 12)) gain = gain.times(upgradeEffect('d', 12))
	if (hasUpgrade('d', 13)) gain = gain.pow(1.01)
	if (hasUpgrade('d', 44)) gain = gain.times(upgradeEffect('d', 44))
	if (inChallenge('d', 11)) gain = gain.pow(0.0001)
    softcap: new Decimal("e1e12"),
    softcapPower: 0.1,
	return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("eee280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
