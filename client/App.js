/**
 * @fileoverview App component, acts as wrapper for react web appliation
 * @exports App
 * @author Sam McRuvie
 */
// ----React package/imports
import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
// ----Material-ui package/imports
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

/**
 * @name App
 * @description Wrapper for react web appliation
 * @returns App JSX
 */
const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}
export default hot(module)(App)
