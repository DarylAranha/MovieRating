import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useAppContext} from './AppContext';

const SettingsPage: React.FC = () => {
  const {isDarkMode, toggleDarkMode} = useAppContext();

  const containerStyle = isDarkMode
    ? [styles.container, styles.darkContainer]
    : styles.container;

  const titleStyle = isDarkMode
    ? [styles.title, styles.darkTitle]
    : styles.title;

  const textStyle = isDarkMode ? styles.darkText : styles.text;

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Settings</Text>
      <View style={styles.setting}>
        <Text style={textStyle}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // Default background color (light mode)
  },
  darkContainer: {
    backgroundColor: '#121212', // Dark background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000', // Default text color (light mode)
  },
  darkTitle: {
    color: '#ffffff', // Dark text color
  },
  text: {
    color: '#000000', // Default text color (light mode)
  },
  darkText: {
    color: '#ffffff', // Dark text color
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SettingsPage;
