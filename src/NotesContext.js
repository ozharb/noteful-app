import React from 'react'

const NotesContext = React.createContext({
    notes: [],
    folders: [],
    addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  deleted: false,
  setDeleted: () => {}
})

export default NotesContext