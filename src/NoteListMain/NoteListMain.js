import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NotesContext from '../NotesContext'
import { getNotesForFolder } from '../notes-helpers'
import NotefulError from '../NotefulError'
import PropTypes from 'prop-types';

export default class NoteListMain extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotesContext
render(){
  const { folderId } = this.props.match.params
  const { notes=[] } = this.context
  const notesForFolder = getNotesForFolder(notes, folderId)

  return (
    <>
   <NotefulError>
    <section className='NoteListMain'>
      <ul>
      {notesForFolder.map(note =>
       
          <li key={note.id}>
            
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
         
          </li>

        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
    </NotefulError>
    </>
  )
}
}
NoteListMain.defaultProps = {
  notes: [],
}
NoteListMain.propTypes = {
  context: PropTypes.shape({
    notes: PropTypes.array
  })
}
