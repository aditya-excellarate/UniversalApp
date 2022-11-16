import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Box, Button, HStack, Input, Pressable, Text} from 'native-base';
import Clipboard from '@react-native-clipboard/clipboard';
const Home = () => {
  const [copiedText, setCopiedText] = useState('');
  const [textInserted, setTextInserted] = useState('');
  const copyToClipboard = () => {
    Clipboard.setString(textInserted);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <Box flex={1} bg="#fff" p={5}>
      <HStack flex={1} bg="#fff" p={5} justifyContent="space-between">
        <Box
          width={100}
          height={100}
          bg="#90EE90"
          alignItems="center"
          justifyContent="center"
        />
        <Box
          width={100}
          height={100}
          bg="#008631"
          alignItems="center"
          justifyContent="center"
        />
      </HStack>
      <Box alignItems="center">
        <Input
          type={'text'}
          w="100%"
          py="0"
          onChangeText={setTextInserted}
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/4"
              h="full"
              onPress={copyToClipboard}
            >
              copy to Clipboard
            </Button>
          }
          placeholder="Enter Text to copy"
        />
      </Box>
      <Pressable onPress={fetchCopiedText}>
        <Text>Click here to View copied text {copiedText}</Text>
      </Pressable>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
