import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import { listProducts, listUsers } from './api-admin'
import Paper from '@material-ui/core/Paper'
import img from '../assets/images/1.jpg'
import auth from './../auth/auth-helper'

// style
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    padding: theme.spacing(3)
  },
  media: {
    height: 140
  }
}))

export default function Home ({ match }) {
  const classes = useStyles()
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listProducts({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        console.log('Here is the user data')
        console.log(data)
        setProducts(data)
      }
    })

    return function cleanup () {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listUsers({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        console.log('users')
        console.log(data)
        setUsers(data)
      }
    })

    return function cleanup () {
      abortController.abort()
    }
  }, [])

  return (
    <Paper className={classes.root} elevation={4}>
    {products.map((item, i) => {
      return (
      
    </Paper>
  )
}
