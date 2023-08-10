import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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

  const handlePress = () => {
    console.log(movie);
    navigation.navigate('MovieDetail', {movieData: movie});
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.container}>
        {/* <Image source={{uri: movie.posterLink}} style={styles.poster} /> */}
        <View style={styles.details}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
          <Text style={styles.rating}>{movie.criticsRating}</Text>
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
