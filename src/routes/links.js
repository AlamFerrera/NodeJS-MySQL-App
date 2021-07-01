const express = require('express');
const router = express.Router();
const db = require('../database');

 //GET para agregar nuevo link
 router.get('/add', (req, res)=> {
    res.render('links/add');
 });

 //POST del nuevo link
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

 //Lectura de los links
 router.get('/', async (req, res) => {
   const links = await db.query('SELECT * FROM links');
   res.render('links/list.hbs', {links});
 });

 //Eliminacion de los links
 router.get('/delete/:id', async(req, res) => {
      const {id} = req.params;
      await db.query('DELETE FROM links WHERE id = ?', [id]);
      res.redirect('/links');
 });

 router.get('/edit/:id', async(req, res) => {
   const {id} = req.params;
   const record = await db.query('SELECT * FROM links WHERE id = ?', [id]);
   res.render('links/edit.hbs', {links: record[0]});
});

router.post('/edit/:id', async(req, res) => {
   const {id} = req.params;
   const {title, url, descripcion} = req.body;
   const newLink = {
      title,
      url,
      descripcion
   };
   await db.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
  res.redirect('/links');
});



module.exports = router;