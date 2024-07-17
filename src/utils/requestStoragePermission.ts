import {PermissionsAndroid} from 'react-native';

export const checkStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted) {
      //   console.log('You can use the camera');
      return true;
    } else {
      //   console.log('Camera permission denied');
      return false;
    }
  } catch (error) {
    // console.log('Camera permission denied', error);
    return false;
  }
};

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    return (
      granted['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (error) {
    console.log('Storage permission denied', error);
    return false;
  }
};
