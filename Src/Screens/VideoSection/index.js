/* eslint-disable prettier/prettier */
import {Platform, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import {ArrowDownIcon, Box, Button, CloseIcon, useToast} from 'native-base';
import {DownloadFile} from '../../Utils';
import DocumentPicker from 'react-native-document-picker';
import Axios from '../../apis/interceptor';
import DefaultLink from '../../Component/Link';
import ImageSection from '../ImageSection';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [singleFile, setSingleFile] = useState('');
  const [URL, setURL] = useState();
  const toast = useToast();
  const isWeb = Platform.OS !== 'ios' && Platform.OS !== 'android';

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);

      setURL(`${res[0]?.uri}`);

      if (res[0]?.type?.includes('video')) {
        setShowVideo(true);
      } else if (res[0]?.type?.includes('image/jpeg')) {
        setShowImage(true);
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const Upload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const newImage = {
        name: res[0]?.name,
        uri: res[0]?.uri,
        type: res[0]?.type,
      };
      const formData = new FormData();
      formData.append('image', newImage);
      Axios({header: {'Content-Type': 'multipart/form-data'}})
        .post('vendor/dummy', formData)
        .then(data =>
          toast.show({
            description: 'uploaded',
          }),
        )
        .catch(err => alert('error'));
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <Box style={{width: '100%', height: '100%'}}>
      {!!showVideo && (
        <>
          <ArrowDownIcon
            onPress={() => DownloadFile(URL, 'Video.mp4')}
            size="5"
            mt="0.5"
            color="emerald.500"
            style={styles.downloadICon}
          />
          <CloseIcon
            onPress={() => setShowVideo(false)}
            size="5"
            mt="0.5"
            color="emerald.500"
            style={{...styles.downloadICon, left: 350}}
          />

          <Video
            source={{
              uri: URL,
            }}
            ref={videoRef}
            resizeMode="contain"
            controls={true}
            onBuffer={buffer => console.log('@@@@@ buffer', buffer)} // Callback when remote video is buffering
            onError={err => console.log('@@@@@ error', err)} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
          />
        </>
      )}
      {!showVideo && !showImage && (
        <Box style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button size="xs" rounded="none" w="1/4" onPress={() => Upload()}>
            Upload
          </Button>

          <Button
            size="xs"
            rounded="none"
            w="1/4"
            mt="0.5"
            onPress={() => selectOneFile()}
          >
            Select File
          </Button>
          <DefaultLink link="/Download" title="Navigate to Download" />
          {isWeb && (
            <DefaultLink link="/DropZone" title="Navigate to DropZone" />
          )}
        </Box>
      )}
      {showImage && <ImageSection URL={URL} setShowImage={setShowImage} />}
    </Box>
  );
};

export default VideoSection;

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
