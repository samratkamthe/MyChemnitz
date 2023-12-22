import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'

const Notes = () => {
    const context=useContext(noteContext)
   
    const{notes}=context
    
  return (
    <div>
        <AddNote/>
       <div className="container  ">
      <h1>Your a Note</h1>
      <div className="row">
      {notes.map((note)=>{
        return  <div className='col-md-3' key={note.id}>
         <Noteitem note={note}/>
         </div>
      })}
      </div>
      </div>
    </div>
  )
}

export default Notes
