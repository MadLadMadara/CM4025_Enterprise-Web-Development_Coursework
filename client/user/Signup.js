/* eslint-disable react/prop-types */
/**
 * @fileoverview React component that serves as the signup pages
 * @exports Signup
 * @author Sam McRuvie
 */
// ----React package/imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// ----Material-ui package/imports
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
// ----Project import
import { create } from './api-user.js'

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
  },
  subTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.openTitle
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
    label: 'female'
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
 * @name Signup
 * @returns {JSX} the Signup component
 */
export default function Signup () {
  const classes = useStyles()
  // state storage of user form 'vlaues'
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    age: '',
    gender: '',
    preGround: false,
    rost: '',
    open: false,
    error: ''
  })

  /**
   * @name handleChange
   * @description updates state 'values' on form input on change
   * @param {String} name propert name in state 'values'
   */
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => { // form submit handeler
    const user = { // prepare state 'vlaues' for JSON request
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
    // 'create' from './api-user.js.js', sends request to create a user
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error }) // if error, reset vlaues with error message
      } else {
        // if no error, set jwt token and redirect
        setValues({ ...values, error: '', open: true })
      }
    })
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5' className={classes.title}>
            Sign Up
          </Typography>
          <TextField id='name' label='Name' className={classes.textField} value={values.name} onChange={handleChange('name')} margin='normal' /><br />
          <TextField id='email' type='email' label='Email' className={classes.textField} value={values.email} onChange={handleChange('email')} margin='normal' /><br />
          <TextField id='password' type='password' label='Password' className={classes.textField} value={values.password} onChange={handleChange('password')} margin='normal' />
          <TextField id='age' type='number' label='Age' className={classes.textField} value={values.age} onChange={handleChange('age')} margin='normal' />
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
        </CardContent>
        <CardActions>
          <Button color='primary' variant='contained' onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to='/signin'>
            <Button color='primary' autoFocus='autoFocus' variant='contained'>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}
