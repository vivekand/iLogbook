import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes} = context;
  return (
    <>
    
    <AddNote/>   {/*  adding new node  */}
    <div className="row my-3">
      <h2> Your Note</h2>
      {notes.map((note) => {  // diaplay all the notes.
        return <Noteitem key={note._id} note={note}/>
      })}
    </div>
    </>
  );
};

export default Notes;
