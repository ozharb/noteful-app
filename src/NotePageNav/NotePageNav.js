import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandPointLeft} from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NotesContext from '../NotesContext'
import { findNote, findFolder } from '../notes-helpers'
import PropTypes from 'prop-types';

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NotesContext;
  render(){
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon={faHandPointLeft} />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.title}
        </h3>
      )}
    </div>
  )
}

}

NotePageNav.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.object,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
}