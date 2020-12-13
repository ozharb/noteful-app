import React from 'react'
import NotesContext from './NotesContext'
import config from './config'
import NotefulForm from './NotefulForm/NotefulForm'
import './AddFolder.css'
import PropTypes from 'prop-types';

export default class AddFolder  extends React.Component{
  state = {
    folderName: {value: ''}

};
setFolderName = folderName => {
    this.setState({folderName: {value: folderName, }}); 
};
validateFolder = () => {
  let folderName = this.state.folderName.value;
 
        if (folderName.length <= 0) {
          
            return '(Please name your folder)';
}
}

static contextType = NotesContext;

static defaultProps = {
    history: {
      push: () => { }
    },
  }


  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Folder Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name'  onChange={e => this.setFolderName(e.target.value)} value={this.state.folderName.value}/>
          </div>
          <div className='buttons'>
            <button type='submit' disabled={this.validateFolder()}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
AddFolder.defaultProps = {
  folderName: "",
}
AddFolder.propTypes = {
  folderName: PropTypes.string.isRequired,
  props: PropTypes.shape({
    history: PropTypes.object,
  })
}