/* eslint-disable react/prop-types */
/**
 * @fileoverview React component that serves as the profile page
 * @exports Profile
 * @author Sam McRuvie
 */
// ----React package/imports
import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
// ----Material-ui package/imports
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
// ----Project imports
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import { read } from './api-user.js'

// material-ui javascript object for JSX component styling
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))
/**
 * @name Profile
 * @param {JSON} match contains '.params' passesd to component like props
 * @returns {JSX} the Profile component
 */
export default function Profile ({ match }) {
  const classes = useStyles() // init material-ui style
  const [user, setUser] = useState({}) // state storage of user data
  const [redirectToSignin, setRedirectToSignin] = useState(false) // state storage of 'redirectToSignin'
  // gets users session data from 'jwt' token
  const jwt = auth.isAuthenticated()

  useEffect(() => { // executes on load as a ""side efect""
    const abortController = new AbortController()
    const signal = abortController.signal
    // 'read' from './api-user.js', sends request to get single user
    read({
      userId: match.params.userId
    }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) { // set state setRedirectToSignin to true if error
        setRedirectToSignin(true)
      } else {
        // set prefrences
        data.rost = data.preferences.coffee.rost
        data.preGround = data.preferences.coffee.preGround
        // update state 'user' with retrived user
        setUser(data)
      }
    })

    return function cleanup () { // aborts request
      abortController.abort()
    }
  }, [match.params.userId])
  // renders JSX if redirectToReferrer from state 'redirectToSignin' is true, redirects user
  if (redirectToSignin) {
    return <Redirect to='/signin' />
  }

  return ( // JSX to of signin component
    <Paper className={classes.root} elevation={4}>
      <Typography variant='h6' className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} /> {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id &&
              (<ListItemSecondaryAction>
                <Link to={'/user/edit/' + user._id}>
                  <IconButton aria-label='Edit' color='primary'>
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>)
            }
        </ListItem>
        <ListItem>
          <ListItemText primary={'Age'} secondary={user.age}/>
          <ListItemText primary={'Gender'} secondary={user.gender}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={'Pre-ground'} secondary={user.preGround ? 'Yes' : 'No'}/>
          <ListItemText primary={'Roast'} secondary={user.rost}/>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={'Joined: ' + (
            new Date(user.created)).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  )
}
