import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

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
      // const response = await fetch(`http:localhost:3000/api/add`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newMovie),
      // });
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Year</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Critics Rating</Text>
      <TextInput
        style={styles.input}
        value={criticsRating}
        onChangeText={setCriticsRating}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Actors</Text>
      <TextInput style={styles.input} value={actors} onChangeText={setActors} />

      <Text style={styles.label}>Writers</Text>
      <TextInput
        style={styles.input}
        value={writers}
        onChangeText={setWriters}
      />

      <Text style={styles.label}>Genres</Text>
      <TextInput style={styles.input} value={genres} onChangeText={setGenres} />

      <Text style={styles.label}>Directors</Text>
      <TextInput
        style={styles.input}
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
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
  },
});

export default NewMovieEntryScreen;
