/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Platform, PermissionsAndroid, Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Amplify, { Storage } from 'aws-amplify';
import awsmobile from './src/aws-exports';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
Amplify.configure(awsmobile);


const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};
https://gvod-dev-output-ihv97pr4.s3.us-east-2.amazonaws.com/public/testing3/testing3.m3u8

async function saveVideo(res) {
  console.log('===== res =======', res)
//   fetch(res.uri)
// .then(response => {
//   console.log('===== ref =======', response)
//   return response.blob().then((resp)=> {
//     Storage.put('user3.mov', resp).then((ref)=> {
//       console.log('===== ref =======', ref)
//       Alert.alert('video uploded successfully')
//     })
//   })
// })
// .catch((error) => {
// console.log('There has been a problem with your fetch operation: ' + error.message);
//  // ADD THIS THROW error
//   // throw error;
// });



  console.log('============')
  const response = await fetch(res.uri)
    const blob = await response.blob();
    const ref = await Storage.put('testing3.mov', blob)
    console.log('===== ref =======', ref)
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const chooseFile = () => {
    requestCameraPermission()
    requestExternalWritePermission()
    let options = {
      title: 'Select Image',
      mediaType: 'video',
      path:'video',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        mediaType: 'video',
        path:'video',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        let source = response;
        console.log('=======', source)
        saveVideo(response)
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        // setFilePath(source);
      }
    });
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
          <TouchableOpacity
          activeOpacity={0.5}
          style={{alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#DDDDDD',
          padding: 5,}}
          onPress={chooseFile}>
          <Text style={{padding: 10,
    color: 'black',}}>
            Choose Image
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={saveVideo}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>SAVE</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
