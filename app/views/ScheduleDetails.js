import React from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import moment from 'moment';
import { autobind as bind } from 'core-decorators';
import { BLUE, LIGHT_GREY, WHITE } from '../resources/Styles';
import Avatar from '../components/Avatar';
import Schedule from '../resources/Schedule';
import { coloredNavBar, sanitizeDate } from '../util';

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

  static navigationOptions(arg) {
    const item = findInSchedule(arg.navigation.state.params.item);

    return {
      title: item.title,
      ...coloredNavBar(BLUE, WHITE),
    };
  }

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

  @bind
  renderSpeaker(speaker) {
    return (
      <View key={speaker.github + speaker.twitter} style={[styles.author, styles.container]}>
        <Avatar img={speaker.avatarUrl} />
        <View style={styles.usernameWrapper}>
          <Text style={styles.username}>{speaker.name}</Text>
          <Text style={styles.speakerBio}>{speaker.bio}</Text>
        </View>
      </View>
    );
  }

  render() {

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>{this.displayedItem.title}</Text>
          <Text style={styles.subtitle}>{moment(sanitizeDate(this.displayedItem.startDate)).format('LLLL')}</Text>
          <Text style={styles.description}>
            {this.displayedItem.description}
          </Text>
        </View>
        {this.displayedItem.speakers.map(this.renderSpeaker)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
    flexShrink: 1,
  },

  speakerBio: {
    fontSize: 17,
  },

  username: {
    color: BLUE,
    fontSize: 25,
  },
});
