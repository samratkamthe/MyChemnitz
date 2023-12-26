const express =require("express");
const router =express.Router();
const Notes=require('../models/Notes');
const { body, validationResult } = require('express-validator');
var fetchuser=require("../middleware/fetchuser")

//ROUTE:1 Here we are getting all the notes of the user using the id which is Notes.user:id which is equal to req.user.id which we get from the fetchuser function 
router.get('/getnotes',fetchuser,async(req,res)=>{
try{
    const notes=await Notes.find({user:req.user.id})
    console.log({user:req.user.id})
   
    res.json(notes)
}catch (error){
    res.status(401).send({error:"please check the authentication"})
    console.log(error)
}
})
//ROUTE :2 we are adding the notes to the notes database
router.post('/addnotes',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),//is email means that it has to be an email 
    body('description','Enter a valid description').isLength({min:5})
],async(req,res)=>{
    const error=validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      try{
        const{title, description,tag}=req.body
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save()
        res.json(savedNote)
      }catch(error){
       console.log(error.message);
        res.status(500).send("Internal server error ")
      }
})
//ROUTER : 3 HERE we are updating the existing notes with the help of sending the id of actuall note in the url to recognise which note to delete 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    try{
    const newNotes={};
    if(title){newNotes.title=title};
    if(description){newNotes.description=description};
    if(tag){newNotes.tag=tag};

    //find the note to be updated 
    let  note=await Notes.findById(req.params.id);
    if(!note){
       return res.status(404).send("not found")

    }
    if(note.user.toString()!==req.user.id){
        return res.status(404).send("please check the ':id' again")
    }
 note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true});
 res.json({note});
    }catch(error){
        console.log(error.message);
         res.status(500).send("Internal server error ")
       }

})
//ROUTE :4 Here we are simply deleting the note 
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
try{
    let  note=await Notes.findById(req.params.id);
    if(!note){
       return res.status(404).send("not found")

    }
    if(note.user.toString()!==req.user.id){
        return res.status(404).send("please check the ':id' again")
    }
 note=await Notes.findByIdAndDelete(req.params.id);
//  res.json({note});
 res.send("The Note is Deleted Successfully ")

}catch(error){
    console.log(error.message);
     res.status(500).send("Internal server error ")
   }
})

module.exports=router
