const express = require("express"); //import express library 
const bodyParser = require("body-parser");
const cors = require("cors"); //import cors
const { login, insert_user } = require("./dbutil");

const app = express(); //create a new express instance in memory 

//- node middleware 

//-- enable form json post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//enable cors to node middleware to allow same site or localhost access
app.use(cors()) 

const SERVER_PORT = 8080; //localhost range - 3000 - 9999

//- GET endpoint - url endpoint or route - ie: json placeholder, githpy api 
app.get("/", (req,res) => {
    const _msg = "# Dashboard api 1.0.1";
    console.log(_msg)
    res.send(_msg)
});

app.get("/test1", (req,res) => {
    const _msg = "# Dashboard api 1.0.1 - test1 route";
    console.log(_msg)
    res.send(_msg)
});

app.get("/login/:username/:password",(req, res) =>{
 
     const _username = req.params.username;
     const _password = req.params.password;
 
     let _msg = `# login route, username: ${_username}, password: ${_password}`;
     console.log(_msg)
 
     let _data = {};
 
     login(_username, _password, (islogin) => {
        _msg = "* login successful";
        _data = { msg: _msg, login: true };

        if (!islogin) {
            _msg = "* invalid username/password";
            _data = { msg: _msg, login: false };
        }
    
       res.send(_data)

    });

  });

 app.post("/register", (req, res) => {
 
    const _body = req.body;
     
    let _msg = `# register route, body: ${JSON.stringify(_body)}`;
    console.log(_msg);
     
    let _return = {};
     
    const _username = _body.username;
    const _password = _body.password;
     
    insert_user(_username, _password, (isnewuser) => {
        _msg = "* registration successful";
        _return = { msg: _msg, register: true };

        if (!isnewuser) {
            _msg = "* invalid registration, username already exists.";
            _return = { msg: _msg, register: false };
        }

        res.send(_return);
    });

});
     
    
//-other - POST, DELETE, PUT

//-start node exporess web server - ie: live server
app.listen(SERVER_PORT, ()=>{
    let _msg = "node express websever running at port: " + SERVER_PORT;
    console.log(_msg);
})


//node src/index.js 
//node src/index.js --watch 