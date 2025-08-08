import React, { useState } from "react";

import NoteContext from "./noteContext";


const NoteState=(props)=>{
 
  const host=process.env.REACT_APP_API_URI

    const notesInitial=[]
    const BookMarkInitial=[]


      // eslint-disable-next-line 
      const[notes,setNotes]=useState(notesInitial)
      const[booked,setBooked]=useState(BookMarkInitial)
      
      

////////////////////////////////////////////////////     G E T  N O T E    ///////////////////////////////////////////////////////////////
      //GET AL NOTES
       const getNotes=async()=>{
        //Server side add
       
        const response=await fetch(`${host}/api/notes/getnotes`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
        })
        const json=await response.json()
        // console.log(json)
        setNotes(json)
      }
////////////////////////////////////////////////////     A D D    N O T E    //////////////////////////////////////////////////////////
      //Add a Note 
      const addNote=async(title,description,tag)=>{
        //Server side add
        const response=await fetch(`${host}/api/notes/addnotes`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
          body:JSON.stringify({title,description,tag})
          
        })
        const note=await response.json();
        setNotes(notes.concat(note))
      }
//////////////////////////////////////////////////// D E L E T E  N O T E    ////////////////////////////////////////////////////////////////
      //Delete a Note 
      //API CALL For Delete 
      const deleteNote=async(id)=>{
        // eslint-disable-next-line
      const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
         
        },
        
      });
      // const json= await response.json()
      // console.log(json)
      ///Logic
        // console.log("This note is deleted with id:"+id)
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes)
        
      }
////////////////////////////////////////////////////     E D I T    N O T E    //////////////////////////////////////////////////////////////
      //Edit a Note 
      const editNote=async(id,title,description,tag)=>{
        //API call 
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
          body:JSON.stringify({title,description,tag})
        })
        // eslint-disable-next-line
        const json=response.json();

        //Logic to edit in client 
        let newNotes=JSON.parse(JSON.stringify(notes))
        // console.log("these are notes",newNotes)
        for(let index=0; index<newNotes.length; index++){
          const element=newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes)

        
      }



///////////////////////////////////////////////GET Bookmarks/////////////////////////////////////////////////////////
const fetchBookmarks = async () => {
  // console.log("Fetch runned")
  const response = await fetch(`${host}/api/bookmarks/getBookmarks`, {
    method: 'GET',
    headers: {
      'auth-token': localStorage.getItem('token')
    }
  });

  const data = await response.json();
  setBooked(data);
};

//////////////////////////////////////////////  ADD   Bookmark/////////////////////////////////////////////////////////////
 const addBookmarkNote=async(name, amenity, tourism, description, website,LocId )=>{
  // console.log(LocId)
        //Server side add
        const response=await fetch(`${host}/api/bookmarks/save`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
           
          },
          body:JSON.stringify({ name, amenity, tourism, description, website,LocId })
          
        })
        const savedBookm=await response.json();
        // setBooked(booked.concat(savedBookm))
         setBooked(prev => [...prev, savedBookm]);
        
      }
//////////////////////////////////////////////  DELETE  Bookmark/////////////////////////////////////////////////////////////

const deleteBookmark=async(id)=>{
        // eslint-disable-next-line
      const response=await fetch(`${host}/api/bookmarks/deletebookmark/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
         
        },
        
      });
      // const json= await response.json()
      // console.log(json)
      ///Logic
        // console.log("This note is deleted with id:"+id)
        const newBookmarks=booked.filter((book)=>{return book._id!==id});
        setBooked(newBookmarks)
        
      }


      

        


return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,addBookmarkNote,fetchBookmarks,booked,deleteBookmark}}>
        {props.children}

    </NoteContext.Provider>
)
}
export default NoteState



























































// import React from "react";
// import NoteContext from "./noteContext";
// import { useState } from "react";

// const NoteState=(props)=>{
//     const s1={
//         "name":"Samrat",
//         "class":"8a"
//     }
//     const[state,setState]=useState(s1);
//     const update =()=>{
//         setTimeout(()=>{
//             setState({
//                 "name":"Sunny",
//                 "class":"5a"
//             })

//         },3000)
//     }
// return(
//     <NoteContext.Provider value={{state,update}}>
//         {props.children}

//     </NoteContext.Provider>
// )
// }
// export default NoteState