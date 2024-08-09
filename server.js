const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('views'));

let des = '';
let con = '';
let tem = '';
let image = '';


app.get('/', (req,res)=>{

    res.render('weather', {des: des, con: con, tem:tem, image: image});

});


app.post('/', (req,res)=>{

    let city = req.body.City_name;

    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=Your API Key";

    https.get(url, (respond)=>{

        respond.on('data',(data)=>{

            let weatherData = JSON.parse(data);

            tem = weatherData.main.temp;
            des = weatherData.weather[0].description;
            con = weatherData.sys.country;
            image = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";

        });
    });

    res.redirect('/');



});


app.listen(5000, ()=>{
    console.log('Server Started With The Port No 5000');
    
})
