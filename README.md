# SpaJS- API
Single Page APP to NodeJS in backend with express

# Install
`npm i https://github.com/uJ0hn/SpaJS-API/tree/master`

```javascript
const express = require('express')
const app = express()
const spajs = require('spajs')
const api = new spajs(app).spaApi

# Substitua o app.get por api.get
api.get('/', (req, res) => {
	res.send(`
<head>
<title>Example</title>
</head>
<body>
<h1>Example Page /</h1>
<a href="/page1">Page 1</a>
</body>
`)

api.get('/page1', (req, res) => {
	res.send(`
<head>
<title>Example Page 1</title>
</head>
<body>
<h1>Example Page Page 1</h1>
<a href="/">Page /</a>
</body>
`)

})

app.listen(8080, "0.0.0.0", () => {
	console.log('WebSite started')
})
```
