/**
 * @fileoverview React component that handels delete user Dialog
 * @exports DeleteUser
 * @author Sam McRuvie
 */
// ----React package/imports
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
// ----Material-ui package/imports
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// ----Project imports
import auth from './../auth/auth-helper'
import { remove } from './api-user.js'
/**
 * @name DeleteUser
 * @param {JSON} props must contains '.userId'
 * @returns {JSX} the DeleteUser component
 */
export default function DeleteUser (props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  // gets users session data from 'jwt' token
  const jwt = auth.isAuthenticated()

  const clickButton = () => { // handeler for setting open, sets state 'open' true
    setOpen(true)
  }
  /**
   * @name deleteAccount
   * @description deletes user with 'props.userId'
   */
  const deleteAccount = () => {
    // 'remove' form './api-user.js' Sends request to remove user
    remove({
      userId: props.userId
    }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        // console.log(data.error)
      } else {
        auth.clearJWT() // cleare session storage 
        setRedirect(true) // set state 'redirect' to true
      }
    })
  }

  const handleRequestClose = () => { // handeler for setting open, sets state 'open' false
    setOpen(false)
  }

  if (redirect) { // redirects user to signin if redirectToSignin is true, loads JSX
    return <Redirect to='/' />
  }
  return ( // JSX of DeleteUser component
    <span>
      <IconButton aria-label='Delete' onClick={clickButton} color='secondary'>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteAccount} color='secondary' autoFocus='autoFocus'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
// required props type
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}
