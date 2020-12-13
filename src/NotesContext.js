import React from 'react'

const NotesContext = React.createContext({
    notes: [],
    folders: [],
    addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default NotesContext