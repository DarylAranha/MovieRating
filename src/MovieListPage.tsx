import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  Button,
} from 'react-native';
import MovieListItem from './MovieListItem';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from './AppContext';

interface Movie {
  _id: string;
  title: string;
  year: number;
  criticsRating: number;
  posterLink: string;
  // ... other movie properties
}

const MovieListPage: React.FC = () => {
  const [movieData, setMovieData] = useState<Movie[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const {isDarkMode} = useAppContext();

  async function fetchMovies() {
    setLoading(true);
    try {
      // const response = await fetch('http:localhost:3000/api/list');
      const response = await fetch(
        'https://mdev1004-2023-assignment-2.onrender.com/api/list',
      );
      const responseData = await response.json();
      setMovieData(responseData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching movies:', error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    // Implement your refresh logic here
    // For example, you can refetch the movie data
    // and update editedMovie
    await fetchMovies();

    setRefreshing(false);
  };

  if (!movieData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const containerStyle = isDarkMode
    ? [styles.container, styles.darkContainer]
    : styles.container;

  return (
    <ScrollView
      style={containerStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={containerStyle}>
        <FlatList
          data={movieData}
          keyExtractor={item => item._id}
          renderItem={({item}) => <MovieListItem movie={item} />}
        />
      </View>
      {loading && (
        <ActivityIndicator style={styles.loading} size="large" color="blue" />
      )}
      <Button
        title="Add New Entry"
        onPress={() => navigation.navigate('NewMovieEntry')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
        style={styles.settingsButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Light mode background color
  },
  darkContainer: {
    backgroundColor: '#121212', // Dark mode background color
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginTop: 20,
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default MovieListPage;
