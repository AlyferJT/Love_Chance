import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.post('/love-test', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://love-calculator.p.rapidapi.com/getPercentage',
            params: {
              sname: req.body['sname'],
              fname: req.body['fname']
            },
            headers: {
              'X-RapidAPI-Key': '73a1c381ccmsh507f28b31bc7909p1991cfjsn2fcd115155fb',
              'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
            }
          };

        const response = await axios.request(options)
        const data = response.data
        const sendData = {
            percentage: data['percentage'] + '%',
            text: data['result']
        }

        res.render('index.ejs', sendData)
    } catch(error) {
        res.render('index.ejs', {
            text: error.message,
            percentage: 'Sorry, an error ocurred... Try again later  ',
        })
    }
})

app.listen(port, () => {
    console.log(`The server is running at port ${port}`)
});