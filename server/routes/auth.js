import {Router} from 'express'
import {register, login, getUser} from '../controllers/auth.js'
import {checkAuth} from "../utils/checkAuth.js";

const router = new Router()

//Registration
router.post('/register', register)

//Login
router.post('/login', login)

//Get User Info
router.get('/user', checkAuth, getUser)

export default router