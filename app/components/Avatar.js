import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

export default function Avatar(props) {

  return (
    <Image
      source={{ uri: props.img }}
      style={{
        height: props.size,
        width: props.size,
        borderRadius: 50,
      }}
    />
  );
}

Avatar.propTypes = {
  img: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  size: 80,
};
