import React from 'react';
import PropTypes from 'prop-types';

const CircleButton = ({ index, selected, handleClick, authenticated }) => {
  return (
    <div className={`circle-button ${authenticated ? `bg-green` : selected ? `background-black` : ``}`} onClick={() => handleClick(index)} />
  )
};

CircleButton.propTypes = {
  index: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CircleButton;