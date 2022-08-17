import React, { useState } from 'react';
import { Pressable, Text, View, Alert, Modal, StyleSheet } from 'react-native';

export default function Index(props: any) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
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
