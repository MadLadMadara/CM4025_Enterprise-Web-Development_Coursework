/* eslint-disable react/prop-types */
/**
 * @fileoverview React component that only renders a prop component if users
 * is logged in and an admin, used in '../MainRouter.js'
 * @exports AdminRoute
 * @author Sam McRuvie
 */

// ----React packages/imports
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// -----Project packages/imports
import auth from './auth-helper'

/**
 * @name AdminRoute
 * @description Routes users to props component if user is admin 
 * else redirect to login
 * @param {JSON} props contains '.path' & '.component'
 * @returns {JSX} to render
 */
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props => (
      auth.isAdmin() // check if user is admin
        ? (
        <Component {...props} /> // render passed component
          )
        : (
        <Redirect to={{ // redirect to logings
          pathname: '/signin',
          state: { from: props.location }
        }}
        />
          )
    )}
  />
)

export default AdminRoute
