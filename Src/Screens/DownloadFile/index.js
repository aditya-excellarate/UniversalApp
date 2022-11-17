import {StyleSheet, View, PermissionsAndroid, Alert} from 'react-native';
import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {Text, Pressable, Box} from 'native-base';

const DownloadFile = () => {
  const actualDownload = () => {
    const {dirs} = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'test.pdf',
        path: `${dirs.DownloadDir}/test.pdf`,
      },
    })
      .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
      .then(res => {
        console.log('The file saved to ', res.path());
      })
      .catch(e => {
        console.log(e);
      });
  };

  const download = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Pressable onPress={download}>
        <Text>Download PDF by clicking here!!!</Text>
      </Pressable>
    </Box>
  );
};
export default DownloadFile;
const styles = StyleSheet.create({});
