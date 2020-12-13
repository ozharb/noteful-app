import React from 'react'
import NotesContext from './NotesContext'
import config from './config'
import './AddNote.css'
import NotefulForm from './NotefulForm/NotefulForm'
import PropTypes from 'prop-types';

export default class AddNote  extends React.Component{
    state = {
        name: {value: '', touched: false},
        folder: {value: ''}
    
    };
    setName = name => {
        this.setState({name: {value: name, touched: true}}); // Switch touched to true
    };
    validateName = () => {
      let name = this.state.name.value;
     
            if (name.length <= 0) {
              
                return '(Please name your note)';
    }
    }
    setFolder = folder => {
      this.setState({folder: {value: folder}})
    }
    validateFolder = () => {
     let folder = this.state.folder.value;
     if (folder === ''){
      return '(Please choose a folder)'
     } else if (folder === 'choose folder'){
       return "(Please choose a folder)"
     }
    
     }
     
    
static contextType = NotesContext;

static defaultProps = {
    history: {
        push: () => {}
    },
}

handleSubmit = e => {
    e.preventDefault()
    const newNote= {
        name: e.target['note-name'].value,
        modified: new Date(),
        folderId: e.target['note-folder'].value,
        content: e.target['note-content'].value
    }
    fetch(`${config.API_ENDPOINT}/notes`, 
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
          },
        body: JSON.stringify(newNote)
    })
    .then(res => {
        if(!res.ok){
        return res.json().then(e=>Promise.reject(e))
        }
        return res.json()
    })
    .then( data =>{
        console.log(data.folderId)
        this.context.addNote(data)
        this.props.history.push(`/folder/${data.folderId}`)})
    .catch( error => {
        console.error({ error })
    })
}

render(){
    const {folders = []}=this.context

    return(
        <section className='add-note'>
            <h2>Make Note</h2>
            <NotefulForm onSubmit={this.handleSubmit}>
            <label htmlFor='note-name-input'>
                Name
                 
                   { <p className="error">{this.validateName()}</p>}
            </label>
            <input type='text' id='note-name-input' name='note-name' 
            value={this.state.name.value}
            onChange={e => this.setName(e.target.value)}/>
            <label htmlFor='note-form-content'>
                Content
               </label>  
                <input id = 'note-form-content' name = "note-content"/>
           
            <label htmlFor='note-form-folder'>
                Folder
            {<p className="error">{this.validateFolder()}</p>}
                 </label>
                <select id='note-form-folder' name = "note-folder" value={this.state.folder.value}
            onChange={e => this.setFolder(e.target.value)}>
                    <option value = {null}>choose folder</option>
                    {folders.map(folder=>
                        <option value = {folder.id} key = {folder.id} id={folder.id}>{folder.name}</option> )}
                </select>
           
            <button className='buttons' type = "submit" disabled={this.validateName()|| this.validateFolder()}>Done</button>
          
         </NotefulForm>
        </section>


    )
}
}
AddNote.defaultProps = {
    name: "",
    folder: ""
}
AddNote.propTypes = {
    name: PropTypes.string.isRequired,
    folder: PropTypes.string.isRequired
  }