import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VideoSection from '../Screens/VideoSection';
import DownloadFile from '../Screens/DownloadFile';
import DropzoneComponent from '../Screens/DragNDrop';
import PhotoEditor from '../Screens/PhotoEditor';

const Route = () => {
  const Stack = createNativeStackNavigator();
  const linking = {
    prefixes: [,/* your linking prefixes */],
    config: {
      /* configuration for matching screens with paths */
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PhotoEditor}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="Download"
          component={DownloadFile}
          options={{
            title: 'Download',
          }}
        />
        <Stack.Screen
          name="DropZone"
          component={DropzoneComponent}
          options={{
            title: 'DropZone',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Route;
