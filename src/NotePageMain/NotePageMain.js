import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import Context from '../App/Context'
import {findNote} from '../notes-helpers'

export default class NotePageMain extends React.Component {
  
  static contextType = Context

  render() {
    console.log(this.props)
    const {notes} = this.context;
    console.log(this.context)
     const { noteId } = this.props.match.params;
     console.log(this.props)
      const note = findNote(notes, noteId);
      if(!note) {
        return (
          <p>loading</p>
        )
      }

  return (
    
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        handleDeleteNote = {this.props.handleDeleteNote}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
