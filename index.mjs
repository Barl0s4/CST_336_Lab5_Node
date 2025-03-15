import express from'express';
import fetch from "node-fetch";
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let URL = ("https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=solar%20system&per_page=50&orientation=horizontal");
    let response = await fetch(URL);
    let data = await response.json();
   
    res.render("home", {img: data.hits[0].webformatURL});
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
// app.get('/mercury', (req, res) => {
//     let mercuryInfo = planets.getMercury();
//     res.render("mercury", {mercury: mercuryInfo,} );
// });
// app.get('/venus', (req, res) => {
//     let venusInfo = planets.getVenus();
//     res.render("venus", {venus: venusInfo} );
// });
// app.get('/mars', (req, res) => {
//     let marsInfo = planets.getMars();
//     marsInfo.image = "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png";
//     res.render("mars", {mars: marsInfo} );
// });
// app.get('/saturn', (req, res) => {
//     let saturnInfo = planets.getSaturn();
//     res.render("saturn", {saturn: saturnInfo} );
// });
// app.get('/nasa', (req, res) => {
    
//     res.render("nasa", )
// });
app.listen(3000, () => {
    console.log("server started");
});