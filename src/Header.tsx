import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface HeaderProps {
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({isDarkMode}) => {
  const headerStyles = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
  };

  const titleStyles = {
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <View style={[styles.header, headerStyles]}>
      <Text style={[styles.title, titleStyles]}>My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
