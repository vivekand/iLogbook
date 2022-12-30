import React, { useState } from "react"; // creating state
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);  // note= initialnote
  //GET ALL NOTES
  const getNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, { // API call 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNTkzMjU1MDcxOTYyYjU5Njk3ZWNlIn0sImlhdCI6MTY3MTgwMzEyOX0.oy2gwpPNBrlZS6lnr83bGcpCx3_OVpl4g5vjOQmflg8"
      }
    });
    const json = await response.json();
    setNotes(json);
  }
  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, { // API call
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNTkzMjU1MDcxOTYyYjU5Njk3ZWNlIn0sImlhdCI6MTY3MTgwMzEyOX0.oy2gwpPNBrlZS6lnr83bGcpCx3_OVpl4g5vjOQmflg8"
      },

      body: JSON.stringify({ title, description, tag })
    });
    const note =await response.json()
    setNotes(notes.concat(note));   // adding "note" into "notse "
       // concat return an array whereas push updates an array
  }

  //DELETE A NOTE 
  const deleteNote = async (id) => {
    // api call 
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNTkzMjU1MDcxOTYyYjU5Njk3ZWNlIn0sImlhdCI6MTY3MTgwMzEyOX0.oy2gwpPNBrlZS6lnr83bGcpCx3_OVpl4g5vjOQmflg8"
      }
    });
    const json = response.json();
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }
  // EDIT NOTE
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/update/${id}`, {  // api call
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNTkzMjU1MDcxOTYyYjU5Njk3ZWNlIn0sImlhdCI6MTY3MTgwMzEyOX0.oy2gwpPNBrlZS6lnr83bGcpCx3_OVpl4g5vjOQmflg8"
      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {  // Logic to edit in client
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description; 
        newNotes[index].tag = tag;
        break;
      }
      
      setNotes(newNotes)

    }
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
