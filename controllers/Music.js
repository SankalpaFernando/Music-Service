const { S3,rawUpload } = require("../util/upload");
const ytdl = require("ytdl-core");
const User = require("../models/User");
const { YouTube } = require('popyt')
const {validateUrl} =require('youtube-validate')
const {YOUTUBE_KEY}=process.env
const GetMusic=async(req,res)=>{
  const {uid}=req.session;
  try{
    const songs = await User.findById(id);
    console.log("Songs", songs)
    res.json({valid:true,songs})
  }catch{
    res.json({success:false})
  }
}
const PostYoutube=async(req,res)=>{
    try{
      const { url,id } = req.body;
      const {uid} =req.session
      if(await validateUrl(url)){
        const youtube = new YouTube(YOUTUBE_KEY)
        const video = await youtube.getVideo(id);
        const channel=await youtube.getChannel(video.channelId)
        const fileStream=await ytdl(url);
        const location=await rawUpload(fileStream);
        await User.updateOne(
          { _id: uid },
          { $addToSet: { songs: [{location,id,title:video.title,thumbnail:video.thumbnails.standard,name:channel.name}] } }
        );
        res.json({valid:true})
      }else{
        res.json({valid:false})
      }
    }catch{
      res.json({valid:false}) 
    }
    
}



module.exports = {GetMusic,PostYoutube}