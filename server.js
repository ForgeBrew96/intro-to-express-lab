const express = require(`express`)
const PORT = process.env.PORT || 3000
const app = express()

//=========================================================

app.listen(PORT, () => {
    console.log(`express server running on port ${PORT}`)
} )

app.get('/', (req, res) => {
    res.send('welcome')
})

//The parameter has to be defined. req.params.<the defined variable>
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username
    res.send(`Hail courageous ${username}! May your path be paved with wonder and your heart filled with the fire of the Great Dragon Na'tholin!`)
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1));
}

app.get(`/roll/:diceRoll`, (req, res) => {
    const diceRoll = parseInt(req.params.diceRoll)
    const rollResult = getRandomInt(0, diceRoll)
    if(diceRoll >= 0) {
        res.send(`You rolled a ${rollResult}`)
    } else {
        res.send(`You must specify a number`)
    }
})

app.get('/collectibles/:index', (req, res) => {
    const collectibles = [
    { name: 'Star Wars Unlimited TCG', binder: 'blue', format: 'standard'},
    { name: 'Yugioh', binder: 'green', format: ['edison', 'HAT', 'finishline']},
    { name: 'Digimon', binder: 'red', format: 'standard'},
    ];
const index = parseInt(req.params.index)
    if (index >= 0) {
        res.send(`So you want to look through the ${collectibles[index].name}? It's in the ${collectibles[index].binder} binder. I'll pull it up now.`)
    } else {
        res.send(`This item is not yet stock, check back soon!`)
    }
})

// localhost:3000/shoes?minPrice=&maxPrice=&type=

app.get('/shoes', (req, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];
    const minPrice = parseInt(req.query.minPrice)
    const maxPrice = parseInt(req.query.maxPrice)
    const type = req.query.type

    const filteredShoes = shoes.filter(shoe =>
        shoe.price >= minPrice || 
        shoe.price <= maxPrice || 
        shoe.type === type
    )

    if(minPrice >= 0 || maxPrice >= 0 || type !== "") {
        res.send(filteredShoes)
    } else {
        res.send(shoes)
    }
});