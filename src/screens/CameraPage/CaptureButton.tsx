import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
  },
});

type CaptureButtonProps = {
  onPress: () => void;
};
const CaptureButton = ({onPress}: CaptureButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.captureButton}>
      <View style={styles.captureButtonInner} />
    </TouchableOpacity>
  );
};

export default CaptureButton;
