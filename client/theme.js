/**
 * @fileoverview material-ui styles global style settings
 * @exports theme
 * @author Sam McRuvie
 */
// ----Material-ui package/imports
import { createMuiTheme } from '@material-ui/core/styles'
// ----Material-ui Global Theam
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: '##231f20',
      main: '#231f20',
      dark: '#231f20',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff79b0',
      main: '#99080c',
      dark: '#c60055',
      contrastText: '#000'
    },
    openTitle: '#231f20',
    protectedTitle: '#231f20',
    type: 'light'
  }
})
export default theme
