/* eslint-disable react/prop-types */
/**
 * @fileoverview React component that serves as the admin dashboard
 * @exports Board
 * @author Sam McRuvie
 */
// ----React package/imports
import React, { useState, useEffect } from 'react'
// ----Material-ui package/imports
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
// ----victory package/imports
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'
// ----Project imports
import { listProducts, removeProduct, resetViewsProduct } from './api-admin'
import auth from './../auth/auth-helper'

// material-ui javascript object for JSX component styling
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

/**
 * @name Board
 * @param {JSON} match contains '.params' passesd to component like props
 * @returns {JSX} of the Board component
 */
export default function Board ({ match }) {
  const classes = useStyles() // init material-ui style
  // state storage of products tro be displayed
  const [products, setProducts] = useState([])
  // gets admin users session data from 'jwt' token
  const jwt = auth.isAdmin()

  /**
   * @name loadProductDate
   * @description requests product data and stores in state 'products'
   */
  const loadProductDate = () => {
    // used incase the request need to be aborted mid request
    const abortController = new AbortController()
    const signal = abortController.signal
    // 'list' from './api-admin.js', sends request for all products
    listProducts({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        // sets state 'products'
        setProducts(data)
      }
    })

    return function cleanup () { // aborts request
      abortController.abort()
    }
  }
  useEffect(() => { // executes on load as a ""side efect""
    loadProductDate()
  }, [])
  /**
   * @name deleteProduct
   * @descripting sends request to remove a product then calls 'loadProductDate'
   * @param {String} productId an ID of a product
   */
  const deleteProduct = (productId) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    // 'removeProduct' from './api-admin.js', sends request to remove a product
    removeProduct({
      productId: productId,
      userId: match.params.userId
    }, { t: jwt.token }, signal).then((data) => {
      loadProductDate()
    })
    // clean up function if request needs aborted
    return function cleanup () {
      abortController.abort()
    }
  }
  /**
   * @name resetProduct
   * @descripting sends request to reset a products 'viewsBy' data, then calls 'loadProductDate'
   * @param {String} productId an ID of a product
   */
  const resetProduct = (productId) => {
    resetViewsProduct({
      productId: productId,
      userId: match.params.userId
    }, { t: jwt.token }).then((data) => {
      loadProductDate()
    })
  }
  return ( // JSX of Board component
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
