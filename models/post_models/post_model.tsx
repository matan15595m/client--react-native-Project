import { useState } from "react"
import posts_api from "../../api/posts_api"

export type Post = {
    message:string,
    sender:string,
    imageURL:string
}

   const getAllPosts = async (accessToken:string,sender:any)=>{ 
        const res:any = await posts_api.getAllPosts(accessToken,sender)
        let posts = Array<any>()
        if(res.data){
            res.data.forEach((post:any)=>{
                // const p:Post ={
                //     message:post.message,
                //     sender:post.sender,
                //     imageURL:post.imageURL
                // }
                posts.push(post)
            });
        }  
        
       return posts
   }
   
   const addPost = async (post:Post,accessToken:string) => {
    const p = {
        message:post.message,
        sender:post.sender,
        imageURL:post.imageURL
    }
    try {
        const res = posts_api.addPost(p,accessToken)
        console.log(res)
    } catch (err) {
        console.log("add post failed: " + err)
    }
}
const updatePost = async (post:any,accessToken:string,id:any) => {
    // const p = {
    //     message:post.message,
    //     sender:post.sender,
    //     imageURL:post.imageURL
    // }
    try {
        const res = posts_api.updatePostById(accessToken,post,id)
        console.log(res)
    } catch (err) {
        console.log("add post failed: " + err)
    }
}

const uploadImage = async (imageURI: String) => {

    var body = new FormData();
    body.append('file', { name: "name" , type: 'image/jpeg', uri: imageURI},"");
    try {
        const res = await posts_api.uploadImage(body)
        if (!res.ok) {
            console.log("save failed " + res.problem)
        } else {
            if (res.data) {
                const d: any = res.data
                console.log("----= url:" + d.url)
                return d.url
            }
        }
    } catch (err) {
        console.log("save failed " + err)
    }
    return ""
}

   export default {getAllPosts,addPost,uploadImage,updatePost}