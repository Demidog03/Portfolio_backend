import Post from '../models/Post.js'
import User from "../models/User.js";
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'

//create post
export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body
        const user = await User.findById(req.userId)

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name //init name of image
            const __dirname = dirname(fileURLToPath(import.meta.url)) //controllers folder
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName)) //sending file to uploads folder

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage}
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId
        })

        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: {posts: newPostWithoutImage}
        })

        return res.json(newPostWithoutImage)
    }catch (error){
        res.json({message: 'Failed posting!'})
    }
}

//get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if(!posts){
            return res.json({
                message: 'No posts'
            })
        }

        res.json({posts, popularPosts})
    }catch (error){
        res.json({
            message: 'Get posts failed!'
        })
    }
}

//remove post
export const removePost = async (req, res) => {
    try {
        const post  = await Post.findByIdAndDelete(req.params.id)
        if(!post) return res.json({message: 'Post does not exist!'})

        await User.findByIdAndUpdate(req.userId,  {
            $pull: {posts: req.params.id}
        })

        res.json({message: 'Post was deleted!'})
    }catch (error){
        res.json({
            message: 'Remove Post failed!'
        })
    }
}

