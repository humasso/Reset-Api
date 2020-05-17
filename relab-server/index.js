const express = require('express');
const app = new express();
const cors = require('cors');
app.use(new cors());

const sqlUtils = require('./SqlUtils.js'); 

app.get('/', function (req, res) {
   sqlUtils.connect(req, res, sqlUtils.makeSqlRequest);
});

app.get('/ci_vettore/:foglio', function (req, res) {
    console.log(req.params.foglio);
    sqlUtils.connect(req, res, sqlUtils.ciVettRequest);
 });
 
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

