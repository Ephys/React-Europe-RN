import { StatusBar } from 'react-native';

export function sanitizeDate(date) {
  return date.replace(' ', 'T').replace(' +0000 UTC', 'Z');
}

export function coloredNavBar(backgroundColor, textColor) {
  return {
    headerTitleStyle: { color: textColor },
    headerStyle: {
      backgroundColor,
      paddingTop: StatusBar.currentHeight,
      height: 60 + StatusBar.currentHeight,
    },
    headerTintColor: textColor,
  };
}
