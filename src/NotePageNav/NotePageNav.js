import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import Context from '../app/Context'
import { findNote } from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static contextType = Context;


  render() {
    const { notes, folders } = this.context;
    // render={routeProps => {
    //     const { noteId } = routeProps.match.params;
    //     const note = findNote(notes, noteId) || {};
    //     const folder = findFolder(folders, note.folderId);
    //     return <NotePageNav {...routeProps} folder={folder} />;
    // }}

    const { noteId } = this.props.match.params;
    const noteFor = findNote(
      notes, noteId
    )

    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
        Back
      </CircleButton>
        {this.props.folder && (
          <h3 className='NotePageNav__folder-name'>
            {this.props.folder.name}
          </h3>
        )}
      </div>
    )
  }
}

// NotePageNav.defaultProps = {
//   history: {
//     goBack: () => { }
//   }
// }
