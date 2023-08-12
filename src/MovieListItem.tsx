import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppContext} from './AppContext';

interface Movie {
  _id: string;
  title: string;
  year: number;
  criticsRating: number;
  posterLink: string;
}

interface MovieListItemProps {
  movie: Movie;
}

const MovieListItem: React.FC<MovieListItemProps> = ({movie}) => {
  const navigation = useNavigation();

  const {isDarkMode} = useAppContext();

  const handlePress = () => {
    console.log(movie);
    navigation.navigate('MovieDetail', {movieData: movie});
  };

  const containerStyle = isDarkMode
    ? [styles.container, styles.darkContainer]
    : styles.container;

  const titleStyle = isDarkMode
    ? [styles.title, styles.darkLabel]
    : styles.title;

  const titleYear = isDarkMode ? [styles.year, styles.darkLabel] : styles.title;

  const titleRating = isDarkMode
    ? [styles.rating, styles.darkLabel]
    : styles.title;

  return (
    <TouchableOpacity onPress={handlePress} style={containerStyle}>
      <View style={styles.container}>
        {/* <Image source={{uri: movie.posterLink}} style={styles.poster} /> */}
        <View style={styles.details}>
          <Text style={titleStyle}>{movie.title}</Text>
          <Text style={titleYear}>{movie.year}</Text>
          <Text style={titleRating}>{movie.criticsRating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkContainer: {
    backgroundColor: '#121212', // Dark mode background color
    flex: 1,
  },
  darkLabel: {
    color: '#ffffff', // Dark mode text color
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 16,
  },
  rating: {
    fontSize: 16,
    color: 'green',
  },
});

export default MovieListItem;
