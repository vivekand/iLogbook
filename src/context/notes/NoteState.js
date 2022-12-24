import React, { useState } from "react"; // creating state
import noteContext from "./noteContext";
const NoteState = (props) => {
  const notesInitial=[
    {
      "_id": "63a6080e58f7f2a41e0bce88",
      "user": "63a593255071962b59697ece",
      "title": "gfsdfJayshritam",
      "description": "Jdfsgayshriram",
      "tag": "Ramfdgs",
      "date": "2022-12-23T19:57:02.215Z",
      "__v": 0
    },
    {
      "_id": "63a6a3d40aec816230f024da",
      "user": "63a593255071962b59697ece",
      "title": "gfsdfJayshritam",
      "description": "Jdfsgayshriram",
      "tag": "Ramfdgs",
      "date": "2022-12-24T07:01:40.292Z",
      "__v": 0
    }
  ]
   const [notes,setNotes]= useState(notesInitial);
  return (
    <noteContext.Provider value={{notes,setNotes}}>
        {props.children}
        </noteContext.Provider>
  );
};
export default NoteState;
