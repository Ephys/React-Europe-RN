import React from 'react';
import { StyleSheet, Text, ScrollView, View, Slider, Switch, Button, Modal } from 'react-native';
import { autobind as bind } from 'core-decorators';
import TextInput from '../components/TextInput';
import { BLUE, WHITE } from '../resources/Styles';
import { coloredNavBar } from '../util';

export default class Feedback extends React.Component {

  static navigationOptions = {
    title: 'feedback',
    ...coloredNavBar(BLUE, WHITE),
  };

  state = {
    modal: false,
  };

  @bind
  onFullNameChange(fullName) {
    this.setState({ fullName });
  }

  @bind
  onSubmit() {
  }

  @bind
  openModal() {
    this.setState({ modal: true });
  }

  @bind
  closeModal() {
    this.setState({ modal: false });
  }

  render() {
    return (
      <View style={styles.page}>
        <Modal
          animationType="fade"
          visible={this.state.modal}
          onRequestClose={this.closeModal}
          transparent
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={[
              {
                backgroundColor: 'white',
                marginTop: 22,
              },
            ]}
          >
            <Text>Hello World!</Text>
          </View>
        </Modal>

        <ScrollView
          keyboardDismissMode="on-drag"
          style={styles.page}
        >
          <Button title="Autofill Contact Info" onPress={this.openModal} />
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <TextInput
            placeholder="Full name"
            style={styles.input}
            onChangeText={this.onFullNameChange}
            maxLength={255}
          />
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            style={styles.input}
            onChangeText={this.onFullNameChange}
            maxLength={255}
          />
          <TextInput
            keyboardType="phone-pad"
            placeholder="Phone Number"
            style={styles.input}
            onChangeText={this.onFullNameChange}
            maxLength={255}
          />

          <Text style={styles.sectionTitle}>Feedback</Text>
          <TextInput
            placeholder="Please write at least two or three sentences to share your feedback with us."
            multiline
            style={styles.textarea}
          />

          <Text style={styles.sectionTitle}>How do you feel?</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>Sad</Text>
            <Slider minimumValue={0} maximumValue={10} step={1} />
            <Text>Happy</Text>
          </View>

          <View>
            <Text>This feedback is urgent</Text>
            <Switch />
          </View>
          <Button title="submit" onPress={this.onSubmit} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  textarea: {
    height: 100,
  },

  sectionTitle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f9',
  },
});
