import React from 'react';
import { StyleSheet, Text, View, Image, SectionList, Button, TouchableOpacity } from 'react-native';
import { autobind as bind } from 'core-decorators';
import moment from 'moment';
import headerBackground from '../resources/hero.png';
import logo from '../resources/logo.png';
import { LIGHT_GREY } from '../resources/Styles';
import ToggleButton from '../components/ToggleButton';
import Avatar from '../components/Avatar';
import Schedule from '../resources/Schedule';

export default class ScheduleList extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    selectedDay: 0,
  };

  @bind
  onDayChange(selectedDay) {
    this.setState({ selectedDay });
  }

  @bind
  goToFeedback() {
    this.props.navigation.navigate('Feedback');
  }

  @bind
  goToDetails(item) {
    this.props.navigation.navigate('ScheduleDetails', { item: item.id });
  }

  @bind
  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this.goToDetails(item)}>
        <View style={styles.listItem}>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.entryName}>{item.title}</Text>
            {item.speaker ? <Text>{item.speaker.name}</Text> : null}
          </View>
          <View>
            {item.speaker ? <Avatar img={item.speaker.avatar} /> : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {

    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <View style={styles.heroWrapper}>
            <Image source={headerBackground} style={styles.hero} />
            <View style={styles.heroOverlay} />
          </View>
          <Image style={styles.headerLogo} source={logo} />
          <Text style={styles.headerText}>React Europe</Text>
          <ToggleButton
            items={Object.keys(Schedule)}
            style={styles.buttons}
            onChange={this.onDayChange}
            activeIndex={this.state.selectedDay}
          />
          <View style={styles.feedbackButton}>
            <Button title="Feedback" onPress={this.goToFeedback} />
          </View>
        </View>

        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={renderSectionHeader}
          sections={Schedule[Object.keys(Schedule)[this.state.selectedDay]]}
          keyExtractor={extractKey}
        />
      </View>
    );
  }
}

function extractKey(item) {
  return item.id;
}

// eslint-disable-next-line react/prop-types
function renderSectionHeader({ section }) {

  const date = moment(section.key.replace(' ', 'T').replace(' +0000 UTC', 'Z'));

  return <Text style={styles.entryTime}>{date.format('LT')} ({date.fromNow()})</Text>;
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  headerLogo: {
    height: 70,
    width: 70,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  headerText: {
    color: 'white',
    fontSize: 35,
  },
  hero: {
    height: null,
    flex: 1,
    resizeMode: 'cover',
  },
  heroOverlay: {
    backgroundColor: 'black',
    opacity: 0.75,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  heroWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  feedbackButton: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  entryTime: {
    backgroundColor: LIGHT_GREY,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttons: {
    paddingTop: 25,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  entryName: {
    fontWeight: 'bold',
  },
});
