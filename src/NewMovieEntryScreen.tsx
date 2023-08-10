import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

// ... (your imports)

const NewMovieEntryScreen: React.FC = () => {
  // State to hold input values
  const [title, setTitle] = React.useState('');
  const [year, setYear] = React.useState('');
  const [criticsRating, setCriticsRating] = React.useState('');

  // Function to handle submission
  const handleAdd = () => {
    // Create a new movie object from the input values
    const newMovie: Movie = {
      _id: 'unique_id', // Assign a unique ID
      title,
      year: parseInt(year),
      criticsRating: parseFloat(criticsRating),
      // ... other properties
    };

    // Now you can perform the API call to add the new movie
    // and handle success/failure accordingly
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

      {/* Add more input fields for other properties */}

      <Button title="Add" onPress={handleAdd} />
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
});

export default NewMovieEntryScreen;
