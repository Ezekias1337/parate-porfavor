import base64 from 'react-native-base64';

const base64EncodeString = (string: string): string => {
  return base64.encode(string);
};

export default base64EncodeString;
