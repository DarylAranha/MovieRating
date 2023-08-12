import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppProvider, useAppContext} from './src/AppContext';

import MovieListPage from './src/MovieListPage';
import MovieDetailPage from './src/MovieDetailPage';
import NewMovieEntryScreen from './src/NewMovieEntryScreen';
import SettingsPage from './src/SettingsPage';

import Header from './src/Header';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <AppProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MovieList" component={MovieListPage} />
            <Stack.Screen name="MovieDetail" component={MovieDetailPage} />
            <Stack.Screen
              name="NewMovieEntry"
              component={NewMovieEntryScreen}
            />
            <Stack.Screen name="Settings" component={SettingsPage} />
            {/* Add more screens/routes if needed */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
