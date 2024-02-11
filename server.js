/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: ______________________ Student ID: ______________ Date: ______________
*
* Published URL: ___________________________________________________________
*
********************************************************************************/
const legoData = require('./modules/legoSets');
const express = require('express');
const path = require('path');

const app = express();
const port = 1400;

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to ensure legoData.initialize() is completed before proceeding
app.use(async (req, res, next) => {
  try {
    const initializedSets = await legoData.initialize();
    // Assign the initialized sets to the response locals for later use
    res.locals.initializedSets = initializedSets;
    next();
  } catch (error) {
    res.status(500).send('Error initializing Lego data');
  }
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/lego/sets', async (req, res) => {
  try {
    const theme = req.query.theme;
    if (theme) {
      const sets = await legoData.getSetsByTheme(theme);
      res.json(sets);
    } else {
      const allSets = await legoData.getAllSets();
      res.json(allSets);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get('/lego/sets/:setNum', async (req, res) => {
  try {
    const setNum = req.params.setNum;
    const set = await legoData.getSetByNum(setNum);
    res.json(set);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// 404 Error handling
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
