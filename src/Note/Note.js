import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSkullCrossbones} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Note.css'
import NotesContext from '../NotesContext'
import config from '../config'



class Note extends Component {
  

  static defaultProps ={
    onDeleteNote: () => {},
  }
static contextType = NotesContext;

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
      this.props.history.goBack()
      // allow parent to perform extra behaviour
      // this.props.onDeleteNote(noteId)
    })
    .catch(error => {
      console.error({ error })
    })
}

render(){
  const { name, id, modified } = this.props
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <button className='Note__delete' 
      type='button'
      onClick={this.handleClickDelete}
      >
         
        <FontAwesomeIcon icon={faSkullCrossbones}  />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}
Note.defaultProps = {
  name:"",
  id: "",
}

Note.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.isRequired,
    name: PropTypes.string.isRequired,
  }),

}
export default Note