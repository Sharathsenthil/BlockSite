const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const animeschema=new Schema({
    anime:{
        type:String,
    required:true
    },
    animegenre:{
        type:String,
        required:true
    },
    body: {
        type: String,
        required: true
      },
},{timestamps:true});

const Anime=mongoose.model('anime',animeschema);
module.exports=Anime;


