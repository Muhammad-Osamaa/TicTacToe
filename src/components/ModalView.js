import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import DifficultyLevel from './DifficultyLevel';

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
              <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
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
    borderColor: '#0077C0',
    borderWidth: 1.5,
    alignItems: 'center',
  },
  secondModalContent: {
    backgroundColor: '#10316B',
    padding: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0077C0',
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
    width: 66,
    height: 66,
    right: -33,
    top: -33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#0077C0',
    position: 'absolute',
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: '#0077C0',
    top: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#C7EEFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalView;
