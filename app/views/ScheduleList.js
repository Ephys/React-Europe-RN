import React from 'react';
import {
  StyleSheet, Text, View, Image, SectionList, Button, TouchableOpacity, StatusBar, Animated, Platform,
} from 'react-native';
import { autobind as bind } from 'core-decorators';
import moment from 'moment';
import headerBackground from '../resources/hero.png';
import logo from '../resources/logo.png';
import { LIGHT_GREY } from '../resources/Styles';
import ToggleButton from '../components/ToggleButton';
import Avatar from '../components/Avatar';
import Schedule from '../resources/Schedule';
import { sanitizeDate } from '../util';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ScheduleList extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    selectedDay: 0,
    scrollY: new Animated.Value(0),
  };

  constructor(props) {
    super(props);

    this.scrollHandler = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      { useNativeDriver: true },
    );
  }

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
  renderHeader() {

    const translateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
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
      </Animated.View>
    );
  }

  @bind
  shouldListItemUpdate(newItem, oldItem) {
    return newItem !== oldItem;
  }

  @bind
  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this.goToDetails(item)}>
        <View style={styles.listItem}>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.entryName}>{item.title}</Text>
            {item.speakers.map(speaker => {
              return <Text key={`${speaker.github}#${speaker.name}`}>{speaker.name}</Text>;
            })}
          </View>
          <View>
            {item.speakers.map(speaker => {
              return <Avatar key={`${speaker.github}#${speaker.name}`} img={speaker.avatarUrl} size={40} />;
            })}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {

    return (
      <View style={styles.page}>
        <AnimatedSectionList
          contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT }}
          renderItem={this.renderItem}
          renderSectionHeader={renderSectionHeader}
          sections={Schedule[Object.keys(Schedule)[this.state.selectedDay]]}
          keyExtractor={extractKey}
          scrollEventThrottle={16}
          onScroll={this.scrollHandler}
          shouldItemUpdate={this.shouldListItemUpdate}
          refreshing={false}
        />
        {this.renderHeader()}
      </View>
    );
  }
}

function extractKey(item) {
  return item.id;
}

// eslint-disable-next-line react/prop-types
function renderSectionHeader({ section }) {

  const date = moment(sanitizeDate(section.key));

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
    paddingTop: 50 + StatusBar.currentHeight,

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
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
    top: 10 + StatusBar.currentHeight,
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
