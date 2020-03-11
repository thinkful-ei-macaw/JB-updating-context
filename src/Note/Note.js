import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../App/Context'
import './Note.css'

export default class Note extends React.Component {
  static contextType = Context;

  handleDeleteNote = () => {
    fetch(`http://localhost:9090/notes/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    }).then(response => {
      if (!response.ok)
        return response.json().then(e => Promise.reject(e))

      return response.json()

    }).then(data => {
      this.context.handleDeleteNote(this.props.id);
      this.props.afterDelete()

    })

  }
  render() {
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={this.handleDeleteNote}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
      </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
          {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}