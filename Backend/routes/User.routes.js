import Router from 'express';
import verifyjwt from '../middleware/auth.middleware.js'

import {
    signUp,
    loginUser
} from  '../controllers/User.controller.js'


const router  = Router();

router.route('/register/user').post(signUp);
router.route('/login/user').post( loginUser);

export default router;