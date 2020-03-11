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




    state = {
        notes: [],
        folders: [],
    };

    handleDeleteNote = (id) => {

        const newNotes = this.state.notes.filter(page => (id !== page.id))
        console.log(newNotes)
        this.setState({
            notes: newNotes
        })



    }



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
                this.setState({ notes: data })

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
                        render={(routeProps) => {
                            return <NoteListNav handleDeleteNote={this.handleDeleteNote} {...routeProps} />
                        }}

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
                        render={(routeProps) => {
                            return <NoteListMain handleDeleteNote={this.handleDeleteNote} {...routeProps} />
                        }}

                    />
                ))}
                <Route
                    path="/note/:noteId"


                    render={(routeProps) => {
                        return <NotePageMain handleDeleteNote={this.handleDeleteNote} {...routeProps} />


                    }}

                />
            </>
        );
    }

    render() {
        return (
            <Context.Provider value={{
                notes: this.state.notes,
                folders: this.state.folders,
                handleDeleteNote: this.handleDeleteNote
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
