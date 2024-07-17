import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCameraPermission,
  useLocationPermission,
} from 'react-native-vision-camera';
import CaptureButton from './CaptureButton';
import {SAFE_AREA_PADDING} from './constants';
import {StatusBarBlurBackground} from './StatusBarBlurBackground';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {NativeModules} from 'react-native';

const {Exif} = NativeModules;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    height: '100%',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  camView: {
    flex: 1,
  },
  abFill: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    borderColor: 'red',
    borderWidth: 2,
    flex: 1,
    display: 'flex',
    height: '100%',
  },
});

const CameraPage = () => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const location = useLocationPermission();

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    if (!location.hasPermission) {
      location.requestPermission();
    }
  }, [location, hasPermission, requestPermission]);

  const onInitialized = () => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  };

  if (!location.hasPermission) {
    return (
      <View>
        <Text>LOCATION PERMISSION NOT GRANTED</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View>
        <Text>NO CAMERA DEVICE ERROR</Text>
      </View>
    );
  }
  if (!hasPermission) {
    return (
      <View>
        <Text>CAMERA PERMISSION NOT GRANTED</Text>
      </View>
    );
  }

  const onCapture = async () => {
    if (camera && camera.current) {
      const photo = await camera.current.takePhoto();
      console.log('PHOTO', photo);
      // console.log('exif', Exif.getExif(`file://${photo.path}`));
      Exif.getLatLong(
        photo.path,
        (latlong: unknown) => {
          console.log(latlong);
        },
        (error: unknown) => {
          console.error(error);
        },
      );

      await CameraRoll.save(`file://${photo.path}`, {
        type: 'photo',
      });
    }
  };

  const onError = (error: CameraRuntimeError) => {
    console.log('ERROR', error);
  }

  return (
    <View style={styles.cameraContainer}>
      {device !== null && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          //   style={styles.abFill}
          device={device}
          isActive={true}
          onInitialized={onInitialized}
          enableLocation={location.hasPermission}
          photo={true}
          video={false}
          onError={onError}
          photoQualityBalance='speed'
        />
      )}

      <StatusBarBlurBackground />
      <View style={styles.captureButton}>
        <CaptureButton onPress={onCapture} />
      </View>
    </View>
  );
};

export default CameraPage;
