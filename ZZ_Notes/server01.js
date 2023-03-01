//Implement the Serialization of a Passport User
  //Organized version of this code at very bottom!!






//Wouldn't pass the last 2 test when on Port 8080
//But on 3000...    like magic
'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
/****  NOTICE THIS BELOW... they're == ****/
//const { objectID } = require('mongodb');
const objectID = require('mongodb').objectID;
//const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Why arent these needed???
//const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//ANS: They are in connection.js doofus!!! Look at myDB above!
console.log(myDB);

const app = express();


app.set('view engine', 'pug');
app.set('views', './views/pug');



app.use(session( {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());



fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
  // res.render('index', { title: 'Hello', message: 'Please log in' });
  //https://www.geeksforgeeks.org/node-js-process-cwd-method/
  res.render(process.cwd() + '/views/pug/index', { title: 'Hello', message: 'Please log in' });
});

// app.use(session( {
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));





// app.use(passport.initialize());
// app.use(passport.session());
// console.log(session);

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//   myDB.findOne({ _id: new ObjectID(id) }, (err, doc) => {
//     done(null, null);
//   });
// });








myDB(async client => {
  const myDataBase = await client.db('chat_app').collection('chats');

  /*app.route('/').get((req, res) => {
    //Why do they use index and not index.pug??
    res.render('index', {
      title: 'Connected to Database',
      message: 'Please login'
    });
  });*/

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new objectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });

}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('index', { title: e, message: 'Unable to connect to database' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});






// app.set('view engine', 'pug').set('views', './views/pug');

//??How did we know to put route here??
//??How is adding get in the middle like that ok??? Why not the normal (route, callback)
//app.route('/').get((req, res) => { res.render('index'); });


/*
'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views/pug');
fccTesting(app); // For fCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
  // Change the response to render the Pug template
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
*/











//DIFFERENCES
//FCC:  myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
//ME:   myDataBase.findOne({ _id: new objectID(id) }, (err, doc) => {
  //NOTE: Had the capital O originally!!

//FCC:  message: 'Please log in'
//ME:   message: 'Please login'
  //NOTE: In forum they said the wording mattered so believe this was the true reason!!

//NOTE:Actually I have no effing idea b/c I did have it correct below!!!







/*
'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const objectID = require('mongodb').objectID;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views/pug');

app.use(session( {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
  res.render(process.cwd() + '/views/pug/index', { title: 'Hello', message: 'Please log in' });
});

myDB(async client => {
  const myDataBase = await client.db('chat_app').collection('chats');

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new objectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });

}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('index', { title: e, message: 'Unable to connect to database' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
*/