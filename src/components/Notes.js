import React, { useContext, useEffect, useRef ,useState} from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import {useNavigate} from 'react-router-dom'
const Notes = (props) => {
  let navigate= useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    
    if(localStorage.getItem('token')){
      getNotes();
      console.log("haaa");
    }
    else{
        navigate('/login')
        console.log("naa");
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const updateNote = (currentNote) => {
    ref.current.click();
    // setNote(currentNote);
    setNote({id:currentNote._id, etitle: currentNote.title, edescription:currentNote.description,etag:currentNote.tag});

  }

 

  const handleClick=(e)=>{
    // console.log("udating the note" ,note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Edited successfully","success")
   
}
const onChange=(e)=>{
  setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>

      <AddNote showAlert={props.showAlert}/>   {/*  adding new node  */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="edescription"  value={note.edescription} name="edescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control"  value={note.etag} id="etag" name="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  disabled={note.etitle.length<5|| note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2> Your Note</h2>
        <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div>
        

        {notes.map((note) => {  // diaplay all the notes.
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
        })}
      </div>
    </>
  );
};

export default Notes;
