import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import 'font-awesome/css/font-awesome.css'
import '@blank-string/components'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
