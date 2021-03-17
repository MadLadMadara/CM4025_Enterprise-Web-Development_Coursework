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
        console.log('Here is the user data')
        console.log(data)
        setProducts(data)
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
      <Card key={i}>
        <Link to={'/product/' + item._id}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Link>
      </Card>
      )
    })}
    </Paper>
  )
}
