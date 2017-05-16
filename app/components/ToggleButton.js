import React from 'react';
import PropTypes from 'prop-types';
import { autobind as bind } from 'core-decorators';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BLUE } from '../resources/Styles';

export default class ToggleButton extends React.Component {

  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.any,
    ]),
    items: PropTypes.any.isRequired,
    activeIndex: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onButtonClick(item) {
    this.props.onChange(item);
  }

  @bind
  renderItem(item, index) {

    return (
      <TouchableOpacity onPress={() => this.onButtonClick(index)} key={index}>
        <View
          style={[
            styles.button,
            {
              marginLeft: index !== 0 ? 10 : 0,
              opacity: index === this.props.activeIndex ? 1 : 0.5,
            },
          ]}
          key={item}
        >
          <Text style={styles.text}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {

    return (
      <View style={[this.props.style, styles.container]}>
        {this.props.items.map(this.renderItem)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: BLUE,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
