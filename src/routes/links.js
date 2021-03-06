const express = require('express');
const router = express.Router();
const db = require('../database');
const {isLoggedIn} = require('../lib/authorization');

 //GET para agregar nuevo link
 router.get('/add',isLoggedIn, (req, res)=> {
    res.render('links/add');
 });

 //POST del nuevo link
 router.post('/add', isLoggedIn, async (req, res) => {
      const {title, url, descripcion} = req.body;
      const newLink = {
         title,
         url,
         descripcion,
         user_id: req.user.id
      };
      await db.query('INSERT INTO links set ?', [newLink]);
      req.flash('success', 'Link guardado correctamente');
     res.redirect('/links');
 });

 //Lectura de los links dependiendo el usuario que los haya creado 
 router.get('/', isLoggedIn, async (req, res) => {
   const links = await db.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
   res.render('links/list.hbs', {links});
 });

 //Eliminacion de los links
 router.get('/delete/:id', isLoggedIn, async(req, res) => {
      const {id} = req.params;
      await db.query('DELETE FROM links WHERE id = ?', [id]);
      req.flash('success', 'Link eliminado correctamente');
      res.redirect('/links');
 });

 router.get('/edit/:id',isLoggedIn, async(req, res) => {
   const {id} = req.params;
   const record = await db.query('SELECT * FROM links WHERE id = ?', [id]);
   res.render('links/edit.hbs', {links: record[0]});
});

router.post('/edit/:id', isLoggedIn, async(req, res) => {
   const {id} = req.params;
   const {title, url, descripcion} = req.body;
   const newLink = {
      title,
      url,
      descripcion
   };
   await db.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
   req.flash('success', 'Link modificado correctamente');
  res.redirect('/links');
});



module.exports = router;