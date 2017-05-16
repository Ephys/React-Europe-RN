// import React from 'react';
import { StackNavigator } from 'react-navigation';
import ScheduleList from './app/views/ScheduleList';
import ScheduleDetails from './app/views/ScheduleDetails';
import Feedback from './app/views/Feedback';

export default StackNavigator({
  Home: {
    screen: ScheduleList,
  },
  Feedback: {
    screen: Feedback,
  },
  ScheduleDetails: {
    path: 'schedule/:item',
    screen: ScheduleDetails,
  },
});
