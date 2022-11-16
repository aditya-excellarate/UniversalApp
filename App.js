/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Route from './Src/Route';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flexGrow: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const newColorTheme = {
    brand: {
      900: '#8287af',
      800: '#7c83db',
      700: '#b3bef6',
    },
  };
  const client = new ApolloClient({
    uri: 'https://localhost/',
    cache: new InMemoryCache(),
  });

  const theme = extendTheme({colors: newColorTheme});
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
      // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      // backgroundColor={backgroundStyle.backgroundColor}
      />
      <ApolloProvider client={client}>
        <NativeBaseProvider theme={theme} isSSR>
          <Route />
        </NativeBaseProvider>
      </ApolloProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

// Offline data
// Image editing/scribbling

// Uniform UI for all selected platforms  --Done
// Image/Video/PDF download & upload  --Done
// Clipboard  --Done
// API calls with GraphQL  --require graphQl
// Unit testing (If required)
// Drag and Drop
