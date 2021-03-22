/**
 * @fileoverview Express configuration and initilasation for server
 * @exports app
 * @author Sam McRuvie
 */
// ---- Express package/imports/middle ware
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

// ---- Server side render package/imports
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme'

// will only add dev fundel if config.env = 'development'
import devBundle from './devBundle'

// ---- Express routes package/imports
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import productRoutes from './routes/product.routes'
import adminRouter from './routes/admin.routes'

// ---- Template JSX page imports
import Template from '../template'

// ---------- CONSTs
const CURRENT_WORKING_DIR = process.cwd()
const app = express()

// ----------- Middleware packages

devBundle.compile(app)

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// ---------- Express routes setup
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', productRoutes)
app.use('/', adminRouter)

// ---------- React routes
app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets()
  const context = {}
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  )
  if (context.url) {
    return res.redirect(303, context.url)
  }
  const css = sheets.toString()
  res.status(200).send(Template({
    markup: markup,
    css: css
  }))
})
// ---------- Error handeling
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message })
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message })
    console.log(err)
  }
})

export default app
