import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import cssModules from "react-css-modules";
import styles from "./Button.scss";

const Button = props => {
  const {
    children,
    className,
    fullWidth,
    brand,
    transparent,
    blue,
    green,
    white,
    gray,
    disabled,
    big,
    onClick,
    id = '',
    fill,
    dataTut,
  } = props

  const styleName = cx('button', {
    fill,
    fullWidth,
    brand,
    transparent,
    green,
    blue,
    white,
    gray,
    big,
    disabled,
  })

  return (
    <button
      data-tut={dataTut}
      styleName={styleName}
      className={className}
      onClick={onClick}
      id={id}
      disabled={disabled}
      data-tip
      data-for={id}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  brand: PropTypes.bool,
  green: PropTypes.bool,
  white: PropTypes.bool,
  blue: PropTypes.bool,
  gray: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default cssModules(Button, styles, { allowMultiple: true })
