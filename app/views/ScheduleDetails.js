import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BLUE, WHITE, LIGHT_GREY } from '../resources/Styles';
import Avatar from '../components/Avatar';
import Schedule from '../resources/Schedule';

function findInSchedule(id) {
  const keys = Object.keys(Schedule);

  for (let i = 0; i < keys.length; i++) {
    const day = Schedule[keys[i]];
    for (let j = 0; j < day.length; j++) {
      const entries = day[j].data;

      for (let k = 0; k < entries.length; k++) {
        const entry = entries[k];

        if (entry.id === id) {
          return entry;
        }
      }
    }
  }

  return null;
}

export default class ScheduleDetails extends React.Component {

  constructor(props) {
    super(props);

    this.onProps(props);
  }

  componentWillReceiveProps(props) {
    this.onProps(props);
  }

  onProps(props) {
    const itemId = Number(props.navigation.state.params.item);
    this.displayedItem = findInSchedule(itemId);
  }

  render() {

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>{this.displayedItem.title}</Text>
          <Text style={styles.subtitle}>Thursday, May 18, 10-10:45 AM</Text>
          <Text style={styles.description}>
            {this.displayedItem.description}
          </Text>
        </View>
        <View style={[styles.author, styles.container]}>
          <Avatar img={this.displayedItem} />
          <View style={styles.usernameWrapper}>
            <Text style={styles.username}>Lucy Vatne</Text>
            <Text style={styles.authorTitle}>The best doggo</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    borderTopColor: BLUE,
    borderTopWidth: 80,
    flex: 1,
    backgroundColor: WHITE,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  container: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },

  author: {
    borderTopColor: LIGHT_GREY,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: '400',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '400',
  },

  description: {
    fontSize: 17,
    paddingTop: 20,
    lineHeight: 27,
  },

  usernameWrapper: {
    paddingLeft: 20,
  },

  authorTitle: {
    fontSize: 17,
  },

  username: {
    color: BLUE,
    fontSize: 25,
  },
});
