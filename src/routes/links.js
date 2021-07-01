const express = require('express');
const router = express.Router();
const db = require('../database');

 router.get('/add', (req, res)=> {
    res.render('links/add');
 });

 router.post('/add', async (req, res) => {
      const {title, url, descripcion} = req.body;
      const newLink = {
         title,
         url,
         descripcion
      };
      await db.query('INSERT INTO links set ?', [newLink]);
     res.redirect('/links');
 });

 router.get('/', async (req, res) => {
   const links = await db.query('SELECT * FROM links');
   res.render('links/list.hbs', {links});
 })



module.exports = router;