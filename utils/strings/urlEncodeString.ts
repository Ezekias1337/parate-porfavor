const urlEncodeString = (string: string): string => {
  const urlEncoded = string
    .replace(/\+/g, "%2B")
    .replace(/\//g, "%2F")
    .replace(/=/g, "%3D");

  return urlEncoded;
};

export default urlEncodeString;
