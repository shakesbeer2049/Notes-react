import React from "react";
import { useState, useEffect } from "react";
import Note from "./Components/Note";
import axios from "axios";
import noteService from './Services/note'
import './index.css'

const App = (props) => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false);

  //Toggle Important
  const toggleImpt = (id) =>{
    console.log(`Importance of ${id} needs to be toggled`);
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

   noteService
   .update(id,changedNote)
   .then(returnedNote => {
     setNotes(notes.map(note=> note.id!==id?note:returnedNote))
   })
  }

 
  const ip = document.querySelector("textarea");

  //ADD NOTE
  function addNote(e) {
    e.preventDefault();
    if (ip.value === "") {
      window.alert("Input can't be empty");
    } else {
      const noteObj = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
      };
     noteService
        .create(noteObj)
        .then(createdNote => {
          setNotes(notes.concat(createdNote));
          console.log(createdNote)
        })

      console.log(notes);
      setNewNote("");
    }
  }

  //Get All Notes
  useEffect(()=>{
    noteService.getAll()
    .then(notes=> {
      setNotes(notes)
    })
   }
    ,[notes.length])
  
 

  function ipHandler(e) {
    setNewNote(e.target.value);
  }
  function viewer() {
    setShowAll(!showAll);
  }

//Display Notes
const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1 className="heading">Notes</h1>
       <form className="form" onSubmit={addNote}>
        <textarea className="form-input" type="text" value={newNote} onChange={ipHandler} />
        <button className="form-btn" type="submit">Save</button>
      </form>
       <button className="toggle-btn" onClick={viewer}>{showAll?'Show Important':'Show All'}</button>
      
      
      <ul className="note-container">

        {notesToShow.map((note,i) => (
         <Note 
         key={i}
         note = {note}
         toggle = {()=>toggleImpt(note.id)} />
        ))}
      </ul>

     
    </div>
  );
};

export default App;
