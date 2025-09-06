import express from 'express';
import verifyjwt from "../middleware/auth.middleware.js";
import isAdmin from '../middleware/isAdmin.js'
import Router from 'express'
import {
    createitem,
    updateitem ,
    deleteitem,
    filteritem
} from '../controllers/item.controller.js'
import upload from '../middleware/multer.middleware.js'

const router  = Router();

router.route('/item/create').post(verifyjwt,isAdmin, upload.single("image"),createitem);
router.route('/item/update/:id').put(verifyjwt ,isAdmin , upload.single("image"),updateitem);
router.route('/item/delete/:id').delete(verifyjwt , isAdmin , deleteitem);
router.route('/item/filter').get(filteritem);


export default router ;