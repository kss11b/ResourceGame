const express = require("express");
const os = require("os");
const app = express();
const ejs = require('ejs')
const apiRouter = express.Router()
const request = require('request-promise')

const techUrl = 'https://newsapi.org/v1/articles?source=hacker-news&sortBy=latest&apiKey=f76904152bf944798a8a79a3be817402'
const sportsUrl = 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=f76904152bf944798a8a79a3be817402'
const businessUrl = 'https://newsapi.org/v1/articles?source=business-insider&sortBy=latest&apiKey=f76904152bf944798a8a79a3be817402'
const scienceUrl = 'https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=f76904152bf944798a8a79a3be817402'
const politicsUrl = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=f76904152bf944798a8a79a3be817402'
const entertainmentUrl = 'https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=f76904152bf944798a8a79a3be817402'

app.use(express.static("dist"));

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.get("/api/getArticles", (req, res) =>
request({
  "method":"GET",
  "uri": techUrl,
  "json": true,
}).then(response => {console.log(response, 'response'); return res.send(response)})
);

app.get("/api/getTechArticles", (req, res) =>
request({
  "method":"GET",
  "uri": techUrl,
  "json": true,
}).then(response => {console.log(response, 'response aaaaa'); return res.send(response)})
);

app.get("/api/getSportsArticles", (req, res) =>
request({
  "method":"GET",
  "uri": sportsUrl,
  "json": true,
}).then(response => {console.log(response, 'response aaaaa'); return res.send(response)})
);

app.get("/api/getBusinessArticles", (req, res) =>
request({
  "method":"GET",
  "uri": businessUrl,
  "json": true,
}).then(response => {console.log(response, 'response aaaaa'); return res.send(response)})
);

app.get("/api/getScienceArticles", (req, res) =>
request({
  "method":"GET",
  "uri": scienceUrl,
  "json": true,
}).then(response => {console.log(response, 'response aaaaa'); return res.send(response)})
);

app.get("/api/getPoliticalArticles", (req, res) =>
request({
  "method":"GET",
  "uri": politicsUrl,
  "json": true,
}).then(response => {console.log(response, 'response aaaaa'); return res.send(response)})
);

app.get("/api/getEntertainmentArticles", (req, res) =>
request({
  "method":"GET",
  "uri": entertainmentUrl,
  "json": true,
}).then(response => {console.log(response, 'response aaaaa'); return res.send(response)})
);

app.get("/", (req, res) =>
  res.render('index', {})
);

app.all('/*', (req, res) => {
  res.render('index', {});
});


app.use('/public', express.static('public'));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', `${__dirname}/public`);

app.use('/api', apiRouter);


app.listen(8080, () => console.log("Listening on port 8080!"));
