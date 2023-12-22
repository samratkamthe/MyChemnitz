import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'

const Notes = () => {
    const context=useContext(noteContext)
    const{notes,setNotes}=context
  return (
    <div>
       <div className=" my-3 row mx-3 ">
      <h1>Your a Note</h1>
      {notes.map((note)=>{
        return <Noteitem note={note}/>;
      })}
      </div>
    </div>
  )
}

export default Notes
