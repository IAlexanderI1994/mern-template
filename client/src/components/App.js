import React, { Component } from 'react'
import axios from 'axios'
import '../styles/App.css'

class App extends Component {
  componentDidMount () {
    axios.get('/api/users/test').then(r => console.log(r.data))

  }

  render () {

    return (
      <div>
        <h1>My React App!</h1>
      </div>
    )
  }
}

export default App