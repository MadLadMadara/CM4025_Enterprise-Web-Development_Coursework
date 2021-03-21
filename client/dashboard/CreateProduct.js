/**
 * @fileoverview React component that serves as the create product page
 * @exports CreateProduct
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
// ----Project imports
import { createProduct } from './api-admin'
import auth from '../auth/auth-helper'

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
 * @name rostList
 * @type {Array<JSON>}
 * @descripting list of acceptible roast styles
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
 * @name CreateProduct
 * @param {JSON} match contains '.params' passesd to component like props
 * @returns {JSX} the CreateProduct component
 */
export default function CreateProduct ({ match }) {
  const classes = useStyles() // init material-ui style
  // state storage of 'vlaues' from the JSX
  const [values, setValues] = useState({
    name: '',
    rost: '',
    description: '',
    price: 0,
    weight: 0,
    open: false,
    error: ''
  })

  /**
   * @name handleChange updates state 'values' on form input change
   * @description updates state 'values' on form input on change
   * @param {String} name propert name in state 'values'
   */
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  // gets admin users session data from 'jwt' token
  const jwt = auth.isAdmin()

 /**
   * @name clickSubmit
   * @description create product form submit handeler, submits state 'values' to server
   */
  const clickSubmit = () => {
    const product = { // set up json request data
      name: values.name || undefined,
      rost: values.rost || undefined,
      description: values.description || undefined,
      price: values.price || undefined,
      weight: values.weight || undefined
    }
    // 'createProduct' from './api-admin.js', sends request to create new product
    createProduct({
      userId: match.params.userId
    }, { t: jwt.token }, product).then((data) => {
      if (data.error) { // if error, reset vlaues with error message
        setValues({ ...values, error: data.error })
      } else {
        // if no error, set redirect
        setValues({ ...values, error: '', open: true })
      }
    })
  }

  return ( // JSX to of CreateProduct component
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5' className={classes.title}>
            Add product
          </Typography>
          <TextField id='name' label='Name' className={classes.textField} value={values.name} onChange={handleChange('name')} margin='normal' /><br />
          <TextField id='price' type='number' label='Price in £' className={classes.textField} value={values.price} onChange={handleChange('price')} margin='normal' />
          <TextField id='weight' type='number' label='Weight in grams' className={classes.textField} value={values.weight} onChange={handleChange('weight')} margin='normal' />
          <TextField
            id='rost'
            select
            label='Coffee roast style'
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
          <TextField id='multiline-flexible' multiline
          rows='10'
          label='Description'
          className={classes.textField}
          value={values.description}
          onChange={handleChange('description')}
          margin='normal' />
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
        <DialogTitle>Product was created</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to={'/admin/dashboard/' + match.params.userId}>
            <Button color='primary' autoFocus='autoFocus' variant='contained'>
              Go to dashboard
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}
