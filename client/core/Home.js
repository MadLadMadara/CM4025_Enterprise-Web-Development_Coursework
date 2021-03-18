import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import { list } from '../product/api-products'
import Paper from '@material-ui/core/Paper'
import img from '../assets/images/1.jpg'
import {  Grid } from '@material-ui/core'


// style
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export default function Home () {
  const classes = useStyles()

  const [products, setProducts] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })

    return function cleanup () {
      abortController.abort()
    }
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} m={6}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  )
}
