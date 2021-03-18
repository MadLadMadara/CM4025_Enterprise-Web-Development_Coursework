import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import img from '../assets/images/1.jpg'

import { list } from '../product/api-products'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

// style
// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     marginTop: theme.spacing(5)
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary
//   }
// }))

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
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
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: '50px', width: '100%' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {products.map((product) => (
          <GridListTile key={product.name}>
            <img src={img} alt={product.name} />
            <GridListTileBar
              title={product.title}
              subtitle={<span>by: {product.price}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${product.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
