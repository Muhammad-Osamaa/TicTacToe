import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';

const Modalize = ({visible, onCloseModal, children}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}>
      <View style={styles.modalContent}>
        {children}
        <TouchableOpacity onPress={onCloseModal} style={styles.closeButton}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
export default Modalize;
