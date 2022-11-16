import {StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import {Button, Pressable} from 'native-base';
import {useLink} from 'solito/link';

const DefaultButton = ({href = '', as, onPress, title, ...props}) => {
  const linkProps = useLink({
    href,
    as,
  });
  return (
    // <Pressable {...props} {...linkProps}>
    <Button
      size="xs"
      rounded="none"
      w="1/4"
      {...props}
      {...linkProps}
      onPress={onPress}>
      {title}
    </Button>
    // </Pressable>
  );
};

const styles = StyleSheet.create({});
export default DefaultButton;
