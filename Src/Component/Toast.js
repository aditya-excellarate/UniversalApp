import {useToast} from 'native-base';
import React from 'react';

const ShowToast = message => {
  const toast = useToast();
  toast.show({
    description: message,
  });
};
export default ShowToast;
