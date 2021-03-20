import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'

import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import { read } from './api-products'
import { Redirect, Link } from 'react-router-dom'

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

export default function Profile ({ match }) {
  const classes = useStyles()
  const [product, setProduct] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

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

    return function cleanup () {
      abortController.abort()
    }
  }, [match.params.productId])

  if (redirectToSignin) {
    return <Redirect to='/signin' />
  }
  return (
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
