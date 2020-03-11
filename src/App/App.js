import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';
import Context from './Context'

class App extends Component {

    handleDeleteNote = (note) => 
    {
        const newNotes = this.state.notes.filter(page => (note.id !== page.id ))
        this.setState({
            notes:[newNotes]
        }) 
    }

    
    state = {
        notes: [],
        folders: [],
    };



    componentDidMount() {
        // fake date loading from API call
        // setTimeout(() => this.setState(dummyStore), 600);
        fetch('http://localhost:9090/folders')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                folders: data,
            })
        });

        fetch('http://localhost:9090/notes')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({ notes: data})
           
        });
    }

        
    

    renderNavRoutes() {

        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}

                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {

        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}

                    />
                ))}
                <Route
                    path="/note/:noteId"
                    
                    
                    render= {(routeProps) => {
                        return <NotePageMain handleDeleteNote = {this.handleDeleteNote} {...routeProps} />
                
                        
                    }}
        
                />
            </>
        );
    }

    render() {
        return (
            <Context.Provider value={{
                notes: this.state.notes,
                folders: this.state.folders
            }} >
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </Context.Provider>
        );
    }
}

export default App;
