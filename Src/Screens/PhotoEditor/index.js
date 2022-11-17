import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PhotoEdit from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {Pressable} from 'native-base';
const PhotoEditor = () => {
  const editImage = () => {
    PhotoEdit.Edit({
      path: RNFS.DocumentDirectoryPath + '/photo.png',
      // stickers: [
      //   'sticker0',
      //   'sticker1',
      //   'sticker2',
      //   'sticker3',
      //   'sticker4',
      //   'sticker5',
      //   'sticker6',
      //   'sticker7',
      //   'sticker8',
      //   'sticker9',
      //   'sticker10',
      // ],
      // hiddenControls: [
      //   'clear',
      //   'crop',
      //   'draw',
      //   'save',
      //   'share',
      //   'sticker',
      //   'text',
      // ],
      colors: undefined,
      onDone: () => {
        console.log('on done');
      },
      onCancel: () => {
        console.log('on cancel');
      },
    });
  };

  useEffect(() => {
    let photoPath = RNFS.DocumentDirectoryPath + '/photo.png';
    let binaryFile = Image.resolveAssetSource(require('./assets/photo.png'));

    RNFetchBlob.config({fileCache: true})
      .fetch('GET', binaryFile.uri)
      .then(resp => {
        RNFS.moveFile(resp.path(), photoPath)
          .then(() => {
            console.log('FILE WRITTEN!');
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <Pressable
      onPress={editImage}
      style={{
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>index</Text>
    </Pressable>
  );
};

export default PhotoEditor;

const styles = StyleSheet.create({});
