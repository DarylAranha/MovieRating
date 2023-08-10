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

interface Movie {
  _id: string;
  title: string;
  year: number;
  criticsRating: number;
  posterLink: string;
  // ... other movie properties
}

interface MovieData {
  success: boolean;
  msg: string;
  data: Movie[];
}

const MovieListPage: React.FC = () => {
  const [movieData, setMovieData] = useState<Movie[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function fetchMovies() {
    setLoading(true);
    try {
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
    fetchMovies();

    setRefreshing(false);
  };

  if (!movieData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginTop: 20,
  },
});

export default MovieListPage;
