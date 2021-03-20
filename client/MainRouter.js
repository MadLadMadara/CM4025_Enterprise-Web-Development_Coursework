import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Routs imported
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoutes from './auth/AdminRoute'
import dashboard from './dashboard/board'
import Menu from './core/Menu'
import Product from './product/product'
import CreateProduct from './dashboard/CreateProduct'

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <PrivateRoute path='/user/edit/:userId' component={EditProfile} />
        <PrivateRoute path='/product/:productId' component={Product} />
        <Route path='/user/:userId' component={Profile} />
        <AdminRoutes path='/admin/dashboard/:userId' component={dashboard} />
        <AdminRoutes path='/admin/CreateProduct/:userId' component={CreateProduct} />
      </Switch>
    </div>
  )
}

export default MainRouter
