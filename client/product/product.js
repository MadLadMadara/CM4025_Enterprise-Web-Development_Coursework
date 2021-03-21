/* eslint-disable react/prop-types */
/**
 * @fileoverview React component that serves as the product paged
 * @exports Product
 * @author Sam McRuvie
 */
// ----React package/imports
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
// ----Material-ui package/imports
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// ----Project imports
import auth from './../auth/auth-helper'
import { read } from './api-products'

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
 * @name Product
 * @param {JSON} match contains '.params' passesd to component like props
 * @returns {JSX} of the Product component
 */
export default function Product ({ match }) {
  const classes = useStyles() // init material-ui style
  // state storage of product to be displayed
  const [product, setProduct] = useState({})
  // state storage of redirectToSignin, used to redirect if user is not authorized
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => { // executes on load as a ""side efect""
    // used incase the request need to be aborted mid request
    const abortController = new AbortController()
    const signal = abortController.signal
    // 'read' from './api-products.js', sends request get a single product
    read({
      productId: match.params.productId,
      userId: auth.isAuthenticated().user._id
    }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setProduct(data)
      }
    })

    return function cleanup () { // aborts request
      abortController.abort()
    }
  }, [match.params.productId])

  if (redirectToSignin) { // rdirects user to signin if redirectToSignin is true, loads JSX
    return <Redirect to='/signin' />
  }
  return ( // JSX of Product component
    <Paper className={classes.root} elevation={4}>
      <Typography variant='h5' className={classes.title}>
        {product.name}
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText primary={'Price'} secondary={'£'+ product.price}/>
          <ListItemText primary={'Weight'} secondary={product.weight + 'g'}/>
          <ListItemText primary={'Roast type'} secondary={product.rost}/>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={'Description'} secondary={product.description}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={'Views'} secondary={product.views}/>
        </ListItem>
      </List>
    </Paper>
  )
}
