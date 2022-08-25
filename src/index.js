import React, { useState, useEffect } from 'react';
import {
  Pressable,
  Text,
  View,
  Alert,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as GoogleSingIn from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();
console.log('hi');
export default function Index(props) {
  // GOOGLE
  const [googleRequest, googleResponse, googlePromptAsync] =
    GoogleSingIn.useAuthRequest({
      expoClientId:
        '823806881706-a579uqv1s6va2k1v8hhg0b7fu5rg3k51.apps.googleusercontent.com',
    });

  // FACEBOOK
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: '1601048560232636',
    responseType: ResponseType.Code,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [token, settoken] = useState('');

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      console.log('oauth completed successfully');
      console.log(googleResponse);
      settoken(googleResponse?.url);
    }

    if (fbResponse?.type === 'success') {
      console.log('oauth completed successfully');
      console.log(fbResponse);
    }
  }, [googleResponse, fbResponse]);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
          console.log('hi');
        }}
      >
        <View>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.exit}>x</Text>
            </Pressable>
            <Text style={styles.modalText}>Piblic:{props.publicKey}</Text>
            <Text style={styles.modalText}>
              clientSecret:{props.clientSecret}
            </Text>
            <Button
              disabled={!googleRequest}
              title="Signin with googlee"
              onPress={() => {
                googlePromptAsync();
                console.log('hi');
              }}
            />

            <Button
              disabled={!fbRequest}
              title="Signin with facebook"
              onPress={() => {
                fbPromptAsync();
              }}
            />
            <Text>{token}</Text>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>Checkout with xx</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 82,
    margin: 40,
    borderRadius: 5,
    backgroundColor: '#0180FD',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,

    letterSpacing: 0.25,
    color: 'white',
  },
  modalView: {
    height: '100%',
    backgroundColor: 'white',
    padding: 32,
    shadowColor: '#000',
  },

  exit: {
    color: 'grey',
    fontSize: 31,
    textAlign: 'right',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
