import React, { useEffect, useRef,useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const context=useContext(noteContext)
   let navigator= useNavigate();
    const{notes,getNotes,editNote}=context
    useEffect(()=>{
      if(localStorage.getItem('token')){
      getNotes();
      }
      else{
        navigator("/login")
      }
// eslint-disable-next-line
    },[])
    const[note,setNote]=useState({etitle:"",edescription:"",etag:""})
    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

      
    }
    const ref=useRef(null)
    const refClose=useRef(null)


   
    const handleClick=(e)=>{
      console.log("update",note)
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
      props.showAlert("Updated","success","Successfully")

       
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
      
    }
    
  return (
    <div>
        <AddNote showAlert={props.showAlert}/>
        
<button style={{display:"none"}} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div   className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description </label>
    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag </label>
    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange}/>
  </div>
  
</form>
        
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
       <div className="container  ">
      <h1>Your Notes</h1>
      <div className="row">
      <div className="container text-center ">
        {notes.length===0 && 'No Notes to display'}
        </div>
      {notes.map((note)=>{
        return  <div className='col-md-3' key={note._id}>
         <Noteitem note={note} updateNote={updateNote} showAlert={props.showAlert}/>
         </div>
      })}
      </div>
      </div>
    </div>
  )
}

export default Notes
