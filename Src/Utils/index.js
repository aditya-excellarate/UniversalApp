import RNFetchBlob from 'rn-fetch-blob';

export const DownloadFile = (url, ext = 'Video.mp4') => {
  console.log('@@@@ ext', ext);
  const {dirs} = RNFetchBlob.fs;
  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: ext,
      path: `${dirs.DownloadDir}/${ext}`,
    },
  })
    .fetch('GET', url, {})
    .then(res => {
      console.log('The file saved to ', res.path());
    })
    .catch(e => {
      console.log(e);
    });
};
export const UploadFile = data => {
  RNFetchBlob.fetch(
    'POST',
    'http://10.0.2.2:9000/vendor/editMenuItem',
    {
      //... some headers,
      'Content-Type': 'octet-stream',
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
    },
    [data],
    // base64DataString,
  )
    // listen to upload progress event
    .uploadProgress((written, total) => {
      console.log('uploaded', written / total);
    })
    // listen to download progress event
    .progress((received, total) => {
      console.log('progress', received / total);
    })
    .then(resp => {
      console.log('@@@ resp', resp);
      // ...
    })
    .catch(err => {
      console.log('@@@ resp', err);
      // ...
    });
};
