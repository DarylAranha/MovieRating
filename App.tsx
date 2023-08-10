import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MovieListPage from './src/MovieListPage';
import MovieDetailPage from './src/MovieDetailPage';
import NewMovieEntryScreen from './src/NewMovieEntryScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MovieList" component={MovieListPage} />
        <Stack.Screen name="MovieDetail" component={MovieDetailPage} />
        <Stack.Screen name="NewMovieEntry" component={NewMovieEntryScreen} />
        {/* Add more screens/routes if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
