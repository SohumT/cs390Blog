import express from "express";

import {BlogModel} from "../schema/blog.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  return res.send(blogs.map((blog) => blog.toObject()));
});

const BLOG_PASSWORD=process.env.BLOG_PASSWORD;
router.post("/create-post", async (req, res) => {

  // body should be JSON
  const body = req.body;

  if(body.password != BLOG_PASSWORD){
    return res.send({error:"wrong password"}, 401);
  }
  
  // create blog model with the request body
  const blog = new BlogModel({content: body.content, title: body.title});
  // remember to await .save();
  // save to mongodb
  await blog.save();
  // get an object representation and send it back to the client
  return res.send(blog.toObject());
});

router.post("/delete-post", async (req, res) => {

  const body = req.body
  const id = body.postId

  const deleteRet = await BlogModel.deleteOne({ _id: id });

  return res.send(id)

})

export default router;
