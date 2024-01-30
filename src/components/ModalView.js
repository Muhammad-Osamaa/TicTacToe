import React from 'react';
import {View, Modal, TouchableHighlight, StyleSheet} from 'react-native';
import DifficultyLevel from './DifficultyLevel';
import Entypo from 'react-native-vector-icons/Entypo';

const ModalView = ({
  visible,
  onCloseModal,
  onSelectDifficulty,
  difficultyLevel,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.secondModalContent}>
            <View style={styles.closeButtonContainer}>
              <TouchableHighlight
                onPress={onCloseModal}
                style={styles.closeButton}>
                <Entypo size={30} name="circle-with-cross" color="#C7EEFF" />
              </TouchableHighlight>
            </View>
            <DifficultyLevel
              difficultyLevel={difficultyLevel}
              setDifficultyLevel={difficulty => {
                onSelectDifficulty(difficulty);
                onCloseModal();
              }}
              style={styles.difficultyLevel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#C7EEFF',
    padding: 5,
    borderRadius: 10,
    borderColor: '#279EFF',
    borderWidth: 1.5,
    alignItems: 'center',
  },
  secondModalContent: {
    backgroundColor: '#10316B',
    padding: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#279EFF',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    borderColor: '#FF3FA4',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButtonContainer: {
    backgroundColor: '#C7EEFF',
    position: 'absolute',
    borderRadius: 50,
    width: 62,
    height: 62,
    right: -25,
    top: -25,
    borderColor: '#279EFF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#10316B',
    position: 'absolute',
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#279EFF',
    top: 4,
    right: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#C7EEFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalView;
