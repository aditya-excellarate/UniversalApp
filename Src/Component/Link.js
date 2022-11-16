import {StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import {TextLink, useLink} from 'solito/link';

const DefaultLink = ({link = '', as, onPress, title, ...props}) => {
  const linkProps = useLink({
    href: link,
    as,
  });
  return (
    <TextLink {...props} {...linkProps}>
      <Text>{title}</Text>
    </TextLink>
  );
};

const styles = StyleSheet.create({});
export default DefaultLink;
