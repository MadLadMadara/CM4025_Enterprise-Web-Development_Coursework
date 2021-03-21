/**
 * @fileoverview React component, that is the home page/compennt of the webapp.
 * This page displays the products for non-admin and admin users to view
 * @exports Home
 * @author Sam McRuvie
 */
// ----React package/imports
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// ----Material-ui package/imports
import { makeStyles } from '@material-ui/core/styles'
import img from '../assets/images/1.jpg'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
// ----Project imports
import { list } from '../product/api-products'

// material-ui javascript object for JSX component styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    height: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}))
/**
 * @name Home
 * @returns {JSX} of the Home component page
 */
export default function Home () {
  const classes = useStyles() // init material-ui style

  // state storage of products tro be displayed on home page
  const [products, setProducts] = useState([])

  useEffect(() => { // executes on load as a ""side efect""
    // used incase the request need to be aborted mid request
    const abortController = new AbortController()
    const signal = abortController.signal
    // 'list' from '../product/api-products', sends request for all products
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
    // clean up function if request needs aborted
    return function cleanup () {
      abortController.abort()
    }
  }, [])

  return ( // JSX of Home component
    <div className={classes.root}>
      <GridList cellHeight={'180'} className={classes.gridList} cols={3}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto', width: '100%' }}>
          <ListSubheader component="div">Coffee products</ListSubheader>
        </GridListTile>
        {products.map((product) => ( // iterate over all products in state 'products'
          <GridListTile key={product.name} cols={1}>
            <img src={img} alt={product.name} />
            <Link to={'/product/' + product._id}>
            <GridListTileBar
              title={product.name}
              subtitle={<span>Price: £{product.price} <br/>Weight: {product.weight}g</span>}
              actionIcon={
                <IconButton aria-label={`info about ${product.name}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
