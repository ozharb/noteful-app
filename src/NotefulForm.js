import React from 'react'
import PropTypes from 'prop-types';

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
NotefulForm.defaultProps = {
  name: "",
  folder: "",
  className: ""
}
NotefulForm.propTypes = {
  name: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}