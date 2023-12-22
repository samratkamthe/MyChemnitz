import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "6582a5059326c3139e23ae9cf",
          "user": "6582893afcb845f83cdab33a",
          "title": "Dhruv",
          "description": "please descide the next destination",
          "tag": "personal",
          "date": "2023-12-20T08:25:41.457Z",
          "__v": 0
        },
        {
            "_id": "6582a50592326c339e23ae9cf",
            "user": "6582893afcb845f83cdab33a",
            "title": "Samrat",
            "description": "please descide the next destination",
            "tag": "personal",
            "date": "2023-12-20T08:25:41.457Z",
            "__v": 0
          },
          {
            "_id": "6582a50539326c339e23ae9cf",
            "user": "6582893afcb845f83cdab33a",
            "title": "Sunny",
            "description": "please descide the next destination",
            "tag": "personal",
            "date": "2023-12-20T08:25:41.457Z",
            "__v": 0
          },
          {
            "_id": "6582a5059e326c339e23ae9cf",
            "user": "6582893afcb845f83cdab33a",
            "title": "Hailey",
            "description": "please descide the next destination",
            "tag": "personal",
            "date": "2023-12-20T08:25:41.457Z",
            "__v": 0
          },
          {
            "_id": "6582a5059326c3349e23ae9cf",
            "user": "6582893afcb845f83cdab33a",
            "title": "Kendall",
            "description": "please descide the next destination",
            "tag": "personal",
            "date": "2023-12-20T08:25:41.457Z",
            "__v": 0
          },
        {
          "_id": "6582f11e2d61c7056694ba58d",
          "user": "6582893afcb845f83cdab33a",
          "title": "Justin",
          "description": "prague visit and germany",
          "tag": "travelbuzz",
          "date": "2023-12-20T13:50:22.307Z",
          "__v": 0
        }
      ]
      // eslint-disable-next-line 
      const[notes,setNotes]=useState(notesInitial)
      //Add a Note 
      const addNote=(title,description,tag)=>{
       const note={
            "_id": "6582f11e2d61c7056694b2a58d",
          "user": "6582893afcb845f83cdab33a",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-12-20T13:50:22.307Z",
          "__v": 0

        }
                setNotes(notes.concat(note))
      }

      //Delete a Note 
      const deleteNote=(id)=>{
        console.log("This note is deleted with id:"+id)
        const newNote=notes.filter((note)=>{return note._id!==id});
        setNotes(newNote)
        
      }

      //Edit a Note 
      const editNote=()=>{
        
      }
   
return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
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