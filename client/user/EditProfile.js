/* eslint-disable react/prop-types */
/**
 * @fileoverview React component that serves as the edit profile page
 * @exports EditProfile
 * @author Sam McRuvie
 */
// ----React package/imports
import React, { useState, useEffect } from 'react'
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
import MenuItem from '@material-ui/core/MenuItem'
// ----Project imports
import auth from './../auth/auth-helper'
import { read, update } from './api-user.js'

// material-ui javascript object for JSX component styling
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
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
 * @name gendersList
 * @type {Array<JSON>}
 * @descripting list of genders
 */
const gendersList = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Femle'
  },
  {
    value: 'non-binery',
    label: 'Non-binery'
  },
  {
    value: 'other',
    label: 'Other'
  }
]

/**
 * @name groundList
 * @type {Array<JSON>}
 * @descripting list of ground preferances
 */
const groundList = [
  {
    value: true,
    label: 'Pre-ground'
  },
  {
    value: false,
    label: 'Whole bean'
  }
]

/**
 * @name rostList
 * @type {Array<JSON>}
 * @descripting list of roast preferances
 */
const rostList = [
  {
    value: 'light',
    label: 'Light'
  },
  {
    value: 'medium',
    label: 'Medium'
  },
  {
    value: 'dark',
    label: 'Dark'
  }
]
/**
 * @name EditProfile
 * @param {JSON} match contains '.params' passesd to component like props
 * @returns {JSX} the EditProfile component
 */
export default function EditProfile ({ match }) {
  const classes = useStyles() // init material-ui style
  // state storage of user form 'vlaues'
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    age: 0,
    gender: '',
    preGround: false,
    rost: '',
    open: false,
    error: ''
  })
  // gets admin users session data from 'jwt' token
  const jwt = auth.isAuthenticated()

  useEffect(() => { // executes on load as a ""side efect""
    // used incase the request need to be aborted mid request
    const abortController = new AbortController()
    const signal = abortController.signal
    // 'read' from './api-user.js.js', sends request to get one user data
    read({
      userId: match.params.userId
    }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, name: data.name, email: data.email, age: data.age, gender: data.gender, rost: data.preferences.coffee.rost, preGround: data.preferences.coffee.preGround })
      }
    })
    return function cleanup () { // aborts request
      abortController.abort()
    }
  }, [match.params.userId])

  const clickSubmit = () => { // form submit handeler
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      age: values.age || undefined,
      gender: values.gender || undefined,
      preferences: {
        coffee: {
          preGround: values.preGround || undefined,
          rost: values.rost || undefined
        }
      }
    }
    // 'update' from './api-user.js.js', sends request to update a users data
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error }) // if error, reset vlaues with error message
      } else {
        // if no error, set jwt token and redirect
        setValues({ ...values, userId: data._id, redirectToProfile: true })
      }
    })
  }
  s/**
   * @name handleChange
   * @description updates state 'values' on form input on change
   * @param {String} name propert name in state 'values'
   */
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  // renders JSX if redirectToReferrer from state 'values' is true, redirects user
  if (values.redirectToProfile) {
    return (<Redirect to={'/user/' + values.userId} />)
  }
  return ( // JSX to of EditProfile component
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.title}>
          Edit Profile
        </Typography>
        <TextField id='name' label='Name' className={classes.textField} value={values.name} onChange={handleChange('name')} margin='normal' /><br />
        <br />
        <TextField id='email' type='email' label='Email' className={classes.textField} value={values.email} onChange={handleChange('email')} margin='normal' /><br />
        <TextField id='password' type='password' label='Password' className={classes.textField} value={values.password} onChange={handleChange('password')} margin='normal' />
        <TextField id='age' type='number' label='age' className={classes.textField} value={values.age} onChange={handleChange('age')} margin='normal' />
        <TextField
            id='gender'
            select
            label='gender'
            className={classes.textField}
            value={values.gender}
            onChange={handleChange('gender')}
            helperText='Select your gender'
          >
            {gendersList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant='h6' className={classes.subTitle}>
            Coffee preferences
          </Typography>
          <TextField
            id='preGround'
            select
            label='Whole bean or pre-ground'
            className={classes.textField}
            value={values.preGround}
            onChange={handleChange('preGround')}
          >
            {groundList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='rost'
            select
            label='Prefered coffee rost'
            className={classes.textField}
            value={values.rost}
            onChange={handleChange('rost')}
          >
            {rostList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br /> {
            values.error && (<Typography component='p' color='error'>
              <Icon color='error' className={classes.error}>error</Icon>
              {values.error}
                             </Typography>)
          }
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
