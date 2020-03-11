import React from 'react'

const Context = React.createContext({
    folders: [],
    notes: [],
    handleDeleteNote: () => { }
})

export default Context