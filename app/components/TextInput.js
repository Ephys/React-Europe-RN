import React from 'react';
import { View, TextInput as NativeTextInput, StyleSheet } from 'react-native';
import { LIGHT_GREY } from '../resources/Styles';

export default function TextInput(props) {

  return (
    <View style={styles.wrapper}>
      <NativeTextInput {...props} style={[props.style, styles.input]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderColor: LIGHT_GREY,
    borderBottomWidth: 1,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
