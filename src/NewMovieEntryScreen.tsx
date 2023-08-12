import React from 'react';
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
  title: string;
  year: number;
  criticsRating: number;
  writers: string;
  actors: string;
  directors: string;
  genres: string;
  // ... other properties
}

const NewMovieEntryScreen: React.FC = () => {
  // State to hold input values
  const [title, setTitle] = React.useState('');
  const [year, setYear] = React.useState('');
  const [criticsRating, setCriticsRating] = React.useState('');
  const [writers, setWriters] = React.useState('');
  const [actors, setActors] = React.useState('');
  const [directors, setDirectors] = React.useState('');
  const [genres, setGenres] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {isDarkMode} = useAppContext();

  // Function to handle submission
  const handleAdd = async () => {
    setLoading(true);
    // Create a new movie object from the input values
    const newMovie: Movie = {
      title,
      year: parseInt(year),
      criticsRating: parseFloat(criticsRating),
      writers,
      actors,
      directors,
      genres,
      // ... other properties
    };

    // Now you can perform the API call to add the new movie
    // and handle success/failure accordingly
    try {
      const response = await fetch(
        `https://mdev1004-2023-assignment-2.onrender.com/api/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMovie),
        },
      );
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

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Title</Text>
      <TextInput style={inputStyle} value={title} onChangeText={setTitle} />

      <Text style={titleStyle}>Year</Text>
      <TextInput
        style={inputStyle}
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />

      <Text style={titleStyle}>Critics Rating</Text>
      <TextInput
        style={inputStyle}
        value={criticsRating}
        onChangeText={setCriticsRating}
        keyboardType="decimal-pad"
      />

      <Text style={titleStyle}>Actors</Text>
      <TextInput style={inputStyle} value={actors} onChangeText={setActors} />

      <Text style={titleStyle}>Writers</Text>
      <TextInput style={inputStyle} value={writers} onChangeText={setWriters} />

      <Text style={titleStyle}>Genres</Text>
      <TextInput style={inputStyle} value={genres} onChangeText={setGenres} />

      <Text style={titleStyle}>Directors</Text>
      <TextInput
        style={inputStyle}
        value={directors}
        onChangeText={setDirectors}
      />

      {/* Add more input fields for other properties */}

      <Button title="Add" onPress={handleAdd} />
      {loading && (
        <ActivityIndicator style={styles.loading} size="large" color="blue" />
      )}
    </View>
  );
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

export default NewMovieEntryScreen;
