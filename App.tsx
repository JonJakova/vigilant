import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { styles } from './App-css';
import { API_URL } from './environments';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const CAMERA_URL = API_URL + "/camera";
  const [isBackendReachable, setIsBackendReachable] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    getCameraStatus();
  }, [isCameraActive]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const changeCameraState = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const getCameraStatus = async () => {
    await fetch(`${CAMERA_URL}/status`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((text) => {
        console.log("Camera status: " + text);
        setIsCameraActive(text == "Camera is running" ? true : false);
        setIsBackendReachable(true);
      })
      .catch((error) => {
        console.error("Error at: " + error);
        setIsBackendReachable(false);
      });
  };

  const startCamera = async () => {
    await fetch(`${CAMERA_URL}/start`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((text) => {
        console.log("Camera status: " + text);
        setIsCameraActive(text == "Camera started" || text == "Camera is already running" ? true : false);
      })
      .catch((error) => {
        console.error("Error at: " + error);
      });
  };

  const stopCamera = async () => {
    await fetch(`${CAMERA_URL}/stop`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((text) => {
        console.log("Camera status: " + text);
        if (text == "Camera stopped") setIsCameraActive(false);
        if (text == "Camera failed to stop") setIsCameraActive(true);
      })
      .catch((error) => {
        console.error("Error at: " + error);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          {
            isBackendReachable
              ? <Text style={styles.title}>{isCameraActive ? "Camera is running 🟢" : "Camera is not running 🔴"}</Text>
              : <Text style={styles.title}>Backend is not reachable</Text>
          }
        </View>
        <View style={styles.subContainer}>
          <Button disabled={!isBackendReachable} title={isCameraActive ? "Stop camera" : "Start camera"} onPress={changeCameraState} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
