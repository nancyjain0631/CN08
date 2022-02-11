const express = require('express');
const axios = require('axios');
const app = express();
app.set('view engine' , 'ejs');
let a_token = "";

app.get('/' , (req,res) =>{
    res.render('pages/index',{client_id : clientID });
});

const port = process.env.PORT || 3000;
app.listen(port , ()=> console.log(`App listening on port ${port}`));


const clientID = '';
const clientSecret = '';

app.get('/github/callback' , (req,res)=>{
    
    const requestToken = req.query.code;

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/a_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSON
        headers: {
             accept: 'application/json'
        }
      }).then((response) => {
        access_token = response.data.access_token
        res.redirect('/success');
      })

});

let userName ="";


app.get('/success', function(req, res) {

    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: 'token ' + access_token
      }
    })
    .then((response) => {
        
        userName = response.data.login;
        res.redirect('/activity');
    //  res.render('pages/success',{ userData: response.data });
    });

  });

  app.get('/activity', function(req, res) {

        console.log(userName);
    axios({
        method: 'get',
        url: `https://api.github.com/users/${userName}/events`,
        // url: `https://api.github.com/events`,
        headers: {
            Authorization: 'token ' + access_token
          }
      })
      .then((response) => {
        // console.log(response.data[0]);
        //   res.send(response.data[0]);
          res.render('pages/success',{userData:  response.data });
        // res.render('pages/success',{ userData: response.data });
      });
    });


