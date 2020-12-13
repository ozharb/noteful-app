import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NotesContext from '../NotesContext'
import { findNote } from '../notes-helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandPointLeft} from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../CircleButton/CircleButton'
import PropTypes from 'prop-types'

export default class NotePageMain extends React.Component {
  

static contextType = NotesContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }
  
  render() {
   
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
  

console.log(note)
 console.log("noteId =" + noteId)

  return (
    <>
     
    <section className='NotePageMain'>
 
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        onDeleteNote={this.handleDeleteNote}
      />
   
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
          <CircleButton
    tag='button'
    role='link'
    onClick={() => this.props.history.goBack()}
    className='NotePageNav__back-button'
  >
    <FontAwesomeIcon icon={faHandPointLeft}/>
    <br />
    Back
  </CircleButton>
    </section>
    </>
  )
}
}

NotePageMain.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.object,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
}