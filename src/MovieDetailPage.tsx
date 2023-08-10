import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface Movie {
  _id: string;
  title: string;
  year: number;
  criticsRating: number;
  // ... other properties
}

interface MovieDetailPageProps {
  movie: Movie;
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({route}) => {
  const {movieData} = route.params;
  const [editedMovie, setEditedMovie] = useState<Movie>(movieData);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    console.log('edited', editedMovie);
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

  let view = editedMovie ? (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={editedMovie.title}
        onChangeText={text => setEditedMovie({...editedMovie, title: text})}
      />

      <Text style={styles.label}>Year</Text>
      <TextInput
        style={styles.input}
        value={editedMovie.year.toString()}
        onChangeText={text =>
          setEditedMovie({...editedMovie, year: parseInt(text)})
        }
        keyboardType="numeric"
      />

      <Text style={styles.label}>Rating</Text>
      <TextInput
        style={styles.input}
        value={editedMovie.criticsRating.toString()}
        onChangeText={text =>
          setEditedMovie({...editedMovie, criticsRating: parseInt(text)})
        }
        keyboardType="numeric"
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

export default MovieDetailPage;
