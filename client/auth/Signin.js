/* eslint-disable react/prop-types */
/**
 * @fileoverview React component that serves as the sign in pages,
 * @exports Signin
 * @author Sam McRuvie
 */

// ----React package/imports
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// ----Material-ui package/imports
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
// ----Project imports
import auth from './../auth/auth-helper'
import { signin } from './api-auth.js'

// material-ui javascript object for JSX component styling
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))
/**
 * @name Signin
 * @description React component foer signin page
 * @param {JSON} props contains/uses 'props.location.state' for passing state
 * between components
 * @returns JSX of signin component
 */
export default function Signin (props) {
  const classes = useStyles() // init material-ui style
  // state storage of form data
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  })

  /**
   * @name clickSubmit
   * @description login form submit handeler, submits state 'values' to server
   */
  const clickSubmit = () => {
    const user = { // set up json request data
      email: values.email || undefined,
      password: values.password || undefined
    }
    // Send user data request to server
    signin(user).then((data) => {
      if (data.error) { // if error, reset vlaues with error message
        setValues({ ...values, error: data.error })
      } else {
        // if no error, set jwt token and redirect
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true })
        })
      }
    })
  }
  /**
   * @name handleChange
   * @description updates state 'values' on form input on change
   * @param {String} name propert name in state 'values'
   */
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  /**
   * @name from
   * @description gets redirection path based on 'props.location.state' if
   * set else returns '/'
   * @returns {String} Router path
   */
  const { from } = props.location.state || {
    from: {
      pathname: '/'
    }
  }

  const { redirectToReferrer } = values // gets redirectToReferrer from state 'values'
  // renders JSX if redirectToReferrer from state 'values' is true, redirects user
  if (redirectToReferrer) {
    return (<Redirect to={from} />)
  }

  return ( // JSX to of signin component
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.title}>
          Sign In
        </Typography>
        <TextField id='email' type='email' label='Email' className={classes.textField} value={values.email} onChange={handleChange('email')} margin='normal' /><br />
        <TextField id='password' type='password' label='Password' className={classes.textField} value={values.password} onChange={handleChange('password')} margin='normal' />
        <br /> {
            values.error && (<Typography component='p' color='error'>
              <Icon color='error' className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
      </CardContent>
      <CardActions>
        <Button color='primary' variant='contained' onClick={clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
  )
}
