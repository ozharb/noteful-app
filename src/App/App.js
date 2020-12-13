import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAnchor} from '@fortawesome/free-solid-svg-icons';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
//import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
import NotesContext from '../NotesContext';
import config from '../config'
import AddNote from '../AddNote'
import AddFolder from '../AddFolder'
import NotefulError from '../NotefulError'

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
          fetch(`${config.API_ENDPOINT}/notes`),
          fetch(`${config.API_ENDPOINT}/folders`)
        ])
          .then(([notesRes, foldersRes]) => {
            if (!notesRes.ok)
              return notesRes.json().then(e => Promise.reject(e))
            if (!foldersRes.ok)
              return foldersRes.json().then(e => Promise.reject(e))
    
            return Promise.all([
              notesRes.json(),
              foldersRes.json(),
            ])
          })
          .then(([notes, folders]) => {
            this.setState({ notes, folders })
          })
          .catch(error => {
            console.error({ error })
          })
      }
    handleAddFolder = folder => {
        this.setState({
            folders: [
                ...this.state.folders,
                folder
            ]
        })
    }

    handleAddNote = note => {
        this.setState({
            notes: [
                ...this.state.notes,
                note
            ]
        })
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note=>
                note.id !== noteId)
        })
    }

    renderNavRoutes() {
       
        return (
            <>
             {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component =
                           {NoteListNav}        
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    commponent = {NotePageNav}
                />
                 <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
            
            {['/', '/folder/:folderId'].map(path =>
              <Route
                exact
                key={path}
                path={path}
                component={NoteListMain}
              />
            )}
            <Route
              path='/note/:noteId'
              component={NotePageMain}
            />
            <Route
              path='/add-folder'
              component={AddFolder}
            />
            <Route
              path='/add-note'
              component={AddNote}
            />
          </>
        
        );
    }
    
      
      
    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
            deleteNote: this.handleDeleteNote,
        };
        return (
            <NotesContext.Provider value = {value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                  <NotefulError>
                <header className="App__header">
                    
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon={faAnchor} className = "logo"/>
                    </h1>
                </header>
              
                <main className="App__main">
                
                    {this.renderMainRoutes()}</main>
                </NotefulError>
            </div>
            </NotesContext.Provider>
        );
    }
}

export default App;

