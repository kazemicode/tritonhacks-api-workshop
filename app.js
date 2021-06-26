const express = require("express");
const app = express();
const axios = require('axios');
const path = require('path');
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname,'node_modules/jquery/dist')));
let books;

axios.get('https://postman-library-api.glitch.me/books')
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);


    books = res.data

    for(book of books) {
      console.log(`Got book with title: ${book.title}, author: ${book.author}`);
    }
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });

// Root route
app.get("/",  function(req, res) {
    res.render("index", {title: "TH Library", books});
});



// // configuration for Heroku
app.listen(process.env.PORT || "8081", process.env.IP || "0.0.0.0" , function(){
    console.log("Express Server is Running. . . ")
  });

  