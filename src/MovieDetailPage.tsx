import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useAppContext} from './AppContext';

interface Movie {
  _id: string;
  title: string;
  year: number;
  criticsRating: number;
  writers: string;
  actors: string;
  directors: string;
  genres: string;
  // ... other properties
}

interface MovieDetailPageProps {
  movie: Movie;
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({route}) => {
  const {movieData} = route.params;
  const [editedMovie, setEditedMovie] = useState<Movie>(movieData);
  const [loading, setLoading] = useState(false);

  const {isDarkMode} = useAppContext();

  const handleEdit = async () => {
    setLoading(true);
    console.log('edited', JSON.stringify(editedMovie));
    try {
      const response = await fetch(
        `https://mdev1004-2023-assignment-2.onrender.com/api/update/${movieData._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedMovie),
        },
      );

      // Handle response
      // Reload data or navigate back
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.error('Error updating movie:', error);
    }
  };

  const containerStyle = isDarkMode
    ? [styles.container, styles.darkContainer]
    : styles.container;

  const titleStyle = isDarkMode
    ? [styles.label, styles.darkLabel]
    : styles.label;

  const inputStyle = isDarkMode
    ? [styles.input, styles.darkInput]
    : styles.input;

  // const textStyle = isDarkMode ? styles.darkText : styles.text;

  let view = editedMovie ? (
    <View style={containerStyle}>
      <Text style={titleStyle}>Title</Text>
      <TextInput
        style={inputStyle}
        value={editedMovie.title}
        onChangeText={text => setEditedMovie({...editedMovie, title: text})}
      />

      <Text style={titleStyle}>Year</Text>
      <TextInput
        style={inputStyle}
        value={editedMovie.year.toString()}
        onChangeText={text =>
          setEditedMovie({...editedMovie, year: parseInt(text)})
        }
        keyboardType="numeric"
      />

      <Text style={titleStyle}>Rating</Text>
      <TextInput
        style={inputStyle}
        value={editedMovie.criticsRating.toString()}
        onChangeText={text =>
          setEditedMovie({...editedMovie, criticsRating: parseInt(text)})
        }
        keyboardType="numeric"
      />

      <Text style={titleStyle}>Genres</Text>
      <TextInput
        style={inputStyle}
        value={editedMovie.genres.toString()}
        onChangeText={text => setEditedMovie({...editedMovie, genres: text})}
      />

      <Text style={titleStyle}>Directors</Text>
      <TextInput
        style={inputStyle}
        value={editedMovie.directors.toString()}
        onChangeText={text => setEditedMovie({...editedMovie, directors: text})}
      />

      <Text style={titleStyle}>Writers</Text>
      <TextInput
        style={inputStyle}
        value={editedMovie.writers.toString()}
        onChangeText={text => setEditedMovie({...editedMovie, writers: text})}
      />

      <Text style={titleStyle}>Actors</Text>
      <TextInput
        style={inputStyle}
        value={editedMovie.actors.toString()}
        onChangeText={text => setEditedMovie({...editedMovie, actors: text})}
      />
      {/* Add more input fields for other properties */}

      <Button title="Edit" onPress={handleEdit} />
      {loading && (
        <ActivityIndicator style={styles.loading} size="large" color="blue" />
      )}
    </View>
  ) : null;

  return view;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff', // Light mode background color
  },
  darkContainer: {
    backgroundColor: '#121212', // Dark mode background color
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000', // Light mode text color
  },
  darkLabel: {
    color: '#ffffff', // Dark mode text color
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000000', // Light mode text color
  },
  darkInput: {
    color: '#ffffff', // Dark mode text color
  },
  text: {
    color: '#000000', // Light mode text color
  },
  darkText: {
    color: '#ffffff', // Dark mode text color
  },
  loading: {
    marginTop: 20,
  },
});

export default MovieDetailPage;
