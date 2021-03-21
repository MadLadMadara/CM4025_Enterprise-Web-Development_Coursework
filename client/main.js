/**
 * @fileoverview React main
 * @author Sam McRuvie
 */
// ----React package/imports
import React from 'react'
import { hydrate } from 'react-dom'
// ----Project imports
import App from './App'
// Display web app
hydrate(<App />, document.getElementById('root'))
