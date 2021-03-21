/**
 * @fileoverview React component that links to each page, displays on all pages.
 * @exports Menu used in "../MainRouter.js"
 * @author Sam McRuvie
 */

// ----React package/imports
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
// ----Material-ui package/imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
// ----Project imports
import auth from './../auth/auth-helper'

/**
 * @name isActive
 * @type {Function}
 * @description Checks a path agaenst users path history and returns 
 * a json object to change the style
 * @param {JSON} history Url histery of user
 * @param {String} path path to be checked agenst
 * @returns {JSON} with property 'color' containing hex value
 */
const isActive = (history, path) => {
  if (history.location.pathname === path) { return { color: '#99080c' } } else { return { color: '#ffffff' } }
}

/**
 * @name Menu
 * @description Menu component with links to each page,
 * dynamicaly highlights which pages user is on baised on url history
 * @returns JSX of Menu bar component
 */
const Menu = withRouter(({ history }) => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='h6' color='inherit'>
        Coffee house roastery
      </Typography>
      <Link to='/'>
        <IconButton aria-label='Home' style={isActive(history, '/')}>
          <HomeIcon />
        </IconButton>
      </Link>
      {
        // Checks if user is isgned in
        !auth.isAuthenticated() && (<span>
          <Link to='/signup'>
            <Button style={isActive(history, '/signup')}>Sign up
            </Button>
          </Link>
          <Link to='/signin'>
            <Button style={isActive(history, '/signin')}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        // Checks if user is isgned in
        auth.isAuthenticated() && (<span>
          <Link to={'/user/' + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, '/user/' + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button
            color='inherit' onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}
          >Sign out
          </Button>
        </span>)
      }
      {
        // Checks if user is isgned in and admin
        auth.isAdmin() && (<span>
          <Link to={'/admin/dashboard/' + auth.isAdmin().user._id}>
            <Button style={isActive(history, '/admin/dashboard/' + auth.isAdmin().user._id)}>Admin dashboard</Button>
          </Link>
          <Link to={'/admin/CreateProduct/' + auth.isAdmin().user._id}>
            <Button style={isActive(history, '/admin/CreateProduct/' + auth.isAdmin().user._id)}>Create product</Button>
          </Link>
        </span>)
      }
    </Toolbar>
  </AppBar>
))

export default Menu
