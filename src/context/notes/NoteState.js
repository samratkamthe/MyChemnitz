import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "6582a5059326c339e23ae9cf",
          "user": "6582893afcb845f83cdab33a",
          "title": "Dhruv",
          "description": "please descide the next destination",
          "tag": "personal",
          "date": "2023-12-20T08:25:41.457Z",
          "__v": 0
        },
        {
            "_id": "6582a5059326c339e23ae9cf",
            "user": "6582893afcb845f83cdab33a",
            "title": "Samrat",
            "description": "please descide the next destination",
            "tag": "personal",
            "date": "2023-12-20T08:25:41.457Z",
            "__v": 0
          },
          {
            "_id": "6582a5059326c339e23ae9cf",
            "user": "6582893afcb845f83cdab33a",
            "title": "Sunny",
            "description": "please descide the next destination",
            "tag": "personal",
            "date": "2023-12-20T08:25:41.457Z",
            "__v": 0
          },
          {
            "_id": "6582a5059326c339e23ae9cf",
            "user": "6582893afcb845f83cdab33a",
            "title": "Hailey",
            "description": "please descide the next destination",
            "tag": "personal",
            "date": "2023-12-20T08:25:41.457Z",
            "__v": 0
          },
          {
            "_id": "6582a5059326c339e23ae9cf",
            "user": "6582893afcb845f83cdab33a",
            "title": "Kendall",
            "description": "please descide the next destination",
            "tag": "personal",
            "date": "2023-12-20T08:25:41.457Z",
            "__v": 0
          },
        {
          "_id": "6582f11e2d61c706694ba58d",
          "user": "6582893afcb845f83cdab33a",
          "title": "Justin",
          "description": "prague visit and germany",
          "tag": "travelbuzz",
          "date": "2023-12-20T13:50:22.307Z",
          "__v": 0
        }
      ]
      const[notes,setNotes]=useState(notesInitial)
   
return(
    <NoteContext.Provider value={{notes,setNotes}}>
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