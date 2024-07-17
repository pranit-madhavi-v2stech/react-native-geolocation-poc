import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {requestStoragePermission} from '../../utils/requestStoragePermission';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
// type Routes = {
//   PermissionsPage: undefined;
//   CameraPage: undefined;
//   CodeScannerPage: undefined;
//   MediaPage: {
//     path: string;
//     type: 'video' | 'photo';
//   };
//   Devices: undefined;
//   DocumentUpload: undefined;
// };

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any>;
};

const DocumentUpload = ({navigation}: Props) => {
  useEffect(() => {
    requestStoragePermission();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Document Upload</Text>
      <Button
        title="Upload Document"
        onPress={() => {
          navigation.navigate('CameraPage');
        }}
      />
    </View>
  );
};

export default DocumentUpload;
