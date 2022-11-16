import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Text,
  Box,
  AspectRatio,
  Image,
  ArrowDownIcon,
  CloseIcon,
} from 'native-base';
import {DownloadFile} from '../../Utils';
const ImageSection = ({URL, setShowImage}) => {
  console.log('@@@@ url', URL);
  return (
    <Box flexGrow={1} bg="#fff" alignItems="center" justifyContent="center">
      <ArrowDownIcon
        onPress={() => DownloadFile(URL, 'image.jpeg')}
        size="5"
        mt="0.5"
        color="emerald.500"
        style={styles.downloadICon}
      />
      <CloseIcon
        onPress={() => setShowImage(false)}
        size="5"
        mt="0.5"
        color="emerald.500"
        style={{...styles.downloadICon, left: 350}}
      />
      <AspectRatio
        height={{
          base: 200,
          md: 400,
        }}>
        <Image
          resizeMode="cover"
          source={{
            uri: URL,
          }}
          alt="Picture of a Flower"
        />
      </AspectRatio>
    </Box>
  );
};

export default ImageSection;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
  },
  downloadICon: {
    position: 'absolute',
    top: 40,
    left: 30,
    bottom: 0,
    right: 0,
    zIndex: 50,
  },
});
