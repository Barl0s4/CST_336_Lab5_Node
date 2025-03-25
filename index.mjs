import express from'express';
import fetch from "node-fetch";
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let URL = ("https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=solar%20system&per_page=50&orientation=horizontal");
    let response = await fetch(URL);
    let data = await response.json();
    let randomNumber = Math.floor(Math.random() * 46);
    res.render("home", {img: data.hits[randomNumber].webformatURL});
});

app.get('/nasa', async (req, res) => {
    let apiKey = '9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD';
    let date = new Date().toISOString();
    let currentDate = date.split('T')[0];
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
    console.log.apply(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    res.render('nasa', {imageUrl: data.url, description: data.explanation});
});

app.get('/getInfo', (req, res) => {
    let infoType = req.query.info;

    if (infoType === "Meteorites") {
        let meteoritesInfo = planets.getMeteorite();
        res.render('MeteoritesInfo', { meteoritesInfo });
    } else if (infoType === "Comet") {
        let cometInfo = planets.getComets();
        res.render('CometInfo', { cometInfo });
    } else if (infoType === "Asteroid") {
        let asteroidInfo = planets.getAsteroids();
        res.render('AsteroidInfo', { asteroidInfo });
    }
});


app.get('/getPlanetInfo', (req, res) => {
    let planetSelect = req.query.planet;
    let planetInfo;

    if(planetSelect === 'Mars'){
        planetInfo = planets.getMars();
    } else if(planetSelect === 'Mercury'){
        planetInfo = planets.getMercury();
    } else if (planetSelect === 'Venus') {
        planetInfo = planets.getVenus();
    } else if (planetSelect === 'Earth') {
        planetInfo = planets.getEarth();
    } else if (planetSelect === 'Saturn') {
        planetInfo = planets.getSaturn();
    } else if (planetSelect === 'Jupiter') {
        planetInfo = planets.getJupiter();
    } else if (planetSelect === 'Uranus') {
        planetInfo = planets.getUranus();
    } else if (planetSelect === 'Pluto') {
        planetInfo = planets.getPluto();
    } else if (planetSelect === 'Sun') {
        planetInfo = planets.getSun();
    } else if (planetSelect === 'Neptune'){
        planetInfo = planets.getNeptune();
    }
    console.log(planetInfo);
    res.render('planetInfo', {planetInfo, planetSelect});
    
});

app.listen(3000, () => {
    console.log("server started");
});

  
