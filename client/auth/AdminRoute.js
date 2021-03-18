import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props => (
      auth.isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}
        />
      )
    )}
  />
)

export default AdminRoute
