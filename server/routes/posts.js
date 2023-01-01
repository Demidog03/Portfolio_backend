import {Router} from 'express'
import {checkAuth} from "../utils/checkAuth.js";
import {createPost, getAllPosts, removePost} from "../controllers/posts.js";

const router = new Router()

//Create Post
router.post('/', checkAuth, createPost)
router.get('/', getAllPosts)

router.delete('/:id', checkAuth, removePost)


export default router