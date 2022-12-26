import React, { useState } from "react"; // creating state
import noteContext from "./noteContext";
const NoteState = (props) => {
  const notesInitial=[
    {
      "_id": "63a6080e58f7f2a41e0bce88",
      "user": "63a593255071962b59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-23T19:57:02.215Z",
      "__v": 0
    },
    {
      "_id": "63ah6a3deryrey40aec816230f024da",
      "user": "63a5try93255ersuytre071962b59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-24T07:01:40.292Z",
      "__v": 0
    },
    {
      "_id": "63art080e58f7yutresyuf2a41e0bce88",
      "user": "63a5932550719rtustu62b59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-23T19:57:02.215Z",
      "__v": 0
    },
    {
      "_id": "63a6atrer3dtruytrss40aec816230f024da",
      "user": "63a59325507sdryttrsytr1962b59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-24T07:01:40.292Z",
      "__v": 0
    },
    {
      "_id": "63a6080e5tryserytret8f7f2a41e0bce88",
      "user": "63a59325507sutrrryts1962b59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-23T19:57:02.215Z",
      "__v": 0
    },
    {
      "_id": "63a6a3d40aerwytryudrtsdrtustec816230f024da",
      "user": "63a59325507196tr2b59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-24T07:01:40.292Z",
      "__v": 0
    },
    {
      "_id": "63a6080e58wertrguhydghref7f2a41e0bce88",
      "user": "63a5932550719trdy62b59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-23T19:57:02.215Z",
      "__v": 0
    },
    {
      "_id": "63a6a3d40aetyrsyweyrgherre5c816230f024da",
      "user": "63a59325507fdghjsh1962b59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-24T07:01:40.292Z",
      "__v": 0
    },
    {
      "_id": "63a6080e58f75ytfghwrefjhgfj2a41e0bce88",
      "user": "63a593255071962bhjgfj59697ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-23T19:57:02.215Z",
      "__v": 0
    },
    {
      "_id": "63a6a3d40aecewyrgt816230f024dahghjk",
      "user": "63a593255071962b5969hgjhg7ece",
      "title": "Krishna",
      "description": "Give me a right path ",
      "tag": "Ramfdgs",
      "date": "2022-12-24T07:01:40.292Z",
      "__v": 0
    }
  ]


    const [notes,setNotes]= useState(notesInitial);
    // Add a note 
    console.log("adding a note");
     const addNote=(title,description,tag)=>{
        
        const note={"_id": "63a608rrew0e58f7f2a41e0bce88",
        "user": "63a593255071962b59697ece",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-12-23T19:57:02.215Z",
        "__v": 0}     // concat return an array whereas push updates an array
        setNotes(notes.concat(note));
     }
     
    // delete a note

    const deleteNote=()=>{
        
    }

    // Edit a note 

    const editNote=()=>{
        
    }

  return (
    <noteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
        {props.children}
        </noteContext.Provider>
  );
};
export default NoteState;
