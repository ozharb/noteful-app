import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NotesContext from '../NotesContext'
import { findNote } from '../notes-helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandPointLeft} from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../CircleButton/CircleButton'
import PropTypes from 'prop-types'
import config from '../config'
export default class NotePageMain extends React.Component {
  

static contextType = NotesContext

  handleClickDelete = e => {
  e.preventDefault()
  const noteId = parseInt(this.props.id)


  fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      
    })
    .then(() => {
     
      this.context.deleteNote(noteId)
      console.log(noteId)
      // allow parent to perform extra behaviour
      // this.props.onDeleteNote(noteId)
    
    })
    .catch(error => {
      console.error({ error })
    })
}
deleteMessage = () => {
  console.log('deleted')

         
     
            if (this.context.deleted === true) {
              
            return 'Note Deleted';
}
}
  render() {
   
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: 'Note Deleted' }
  

console.log(note)
 console.log("noteId =" + noteId)

  return (
    <>
     
    <section className='NotePageMain'>
 
      <Note
        id={note.id}
        name={note.notename}
        modified={note.date_made}
        handleClickDelete={this.handleClickDelete}
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