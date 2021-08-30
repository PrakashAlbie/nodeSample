const express= require('express');
const router=express.Router();
const blogController = require('../controller/blogController')


router.get('/update/:id', blogController.blog_update_get);
router.post('/update/:id', blogController.blog_update_post);
router.get('/',blogController.blog_index);
router.post('/create',blogController.blog_create_post); //save to DB
router.get('/create',blogController.blog_create_get);
router.get('/:id',blogController.blog_details);

router.delete('/:id',blogController.blog_delete);

module.exports = router;
