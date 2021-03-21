/* eslint-disable react/prop-types */
/**
 * @fileoverview React component that only renders a prop component if users
 * is loggedin, used in '../MainRouter.js'
 * @exports PrivateRoute
 * @author Sam McRuvie
 */

// ----React package/imports
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// ----Project imports
import auth from './auth-helper'

/**
 * @name PrivateRoute
 * @description Routes users to props component if user is signedin
 * else redirect to login
 * @param {JSON} props contains '.path' & '.component'
 * @returns {JSX} to render
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props => (
      auth.isAuthenticated()
        ? (
        <Component {...props} />
          )
        : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}
        />
          )
    )}
  />
)

export default PrivateRoute
