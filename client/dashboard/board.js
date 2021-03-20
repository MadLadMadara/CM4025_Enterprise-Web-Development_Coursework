import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import RestartIcon from '@material-ui/icons/RestorePageRounded'

import { listProducts, removeProduct, resetViewsProduct } from './api-admin'

import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'

import auth from './../auth/auth-helper'

// style
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 'auto',
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3)
  }),
  title: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))

export default function Home ({ match }) {
  const classes = useStyles()
  const [products, setProducts] = useState([])
  const jwt = auth.isAuthenticated()

  const loadProductDate = () => {
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
        setProducts(data)
      }
    })

    return function cleanup () {
      abortController.abort()
    }
  }
  useEffect(() => {
    loadProductDate()
  }, [])

  const deleteProduct = (productId) => {
    const abortController = new AbortController()
    const signal = abortController.signal

    removeProduct({
      productId: productId,
      userId: match.params.userId
    }, { t: jwt.token }, signal).then((data) => {
      loadProductDate()
    })
  }

  const resetProduct = (productId) => {
    resetViewsProduct({
      productId: productId,
      userId: match.params.userId
    }, { t: jwt.token }).then((data) => {
      loadProductDate()
    })
  }
  return (
    <Grid container spacing={3} className={classes.root} >
      <Grid item xs={12}>
        <Typography variant='h5' className={classes.title}>
          Product listings
        </Typography>
      </Grid>
      {products.map((product, i) => {
        return (
        <Grid item md={12} lg={6} key={i}>
          <Paper className={classes.paper} elevation={5}>
            <List dense>
              <ListItem>
                <ListItemText primary={'Name'} secondary={product.name}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Price'} secondary={'£' + product.price}/>
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
              <IconButton aria-label='Delete' onClick={() => deleteProduct(product._id)} color='secondary'>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label='Reset' onClick={() => resetProduct(product._id)} color='secondary'>
                <RestartIcon />
              </IconButton>
            </List>
            <Divider />
            <Grid container spacing={3} className={classes.root} >
              <Grid item xs={12}>
              <Typography variant='h5'>
                    click-through demographics
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <Typography variant='h7'>
                    Age
                </Typography>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}>
                  <VictoryBar
                    data={product.analytics.age}
                  />
                </VictoryChart>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <Typography variant='h7'>
                    Gender
                </Typography>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}>
                  <VictoryBar
                    data={product.analytics.gender}
                  />
                </VictoryChart>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <Typography variant='h7'>
                    Roast prefrence
                </Typography>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}>
                  <VictoryBar
                    data={product.analytics.rost}
                  />
                </VictoryChart>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <Typography variant='h7'>
                    Whole-bean or pre-ground
                </Typography>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}>
                  <VictoryBar
                    data={product.analytics.preground}
                  />
                </VictoryChart>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        )
      })}
    </Grid>
  )
}
