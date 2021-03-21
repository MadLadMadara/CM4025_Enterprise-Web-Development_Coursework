// TODO:Comment

import { createMuiTheme } from '@material-ui/core/styles'
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
