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
            <TouchableOpacity
              style={{
                backgroundColor: '#EDB7ED',
                position: 'absolute',
                right: -20,
                top: -20,
                borderRadius: 80,
                width: '15%',
                borderWidth: 4,
                borderColor: '#FF3FA4',
              }}>
              <Text
                style={{
                  color: '#FF3FA4',
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                X
              </Text>
            </TouchableOpacity>
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
    backgroundColor: '#EDB7ED',
    padding: 5,
    borderRadius: 10,
    borderColor: '#FF3FA4',
    borderWidth: 1.5,
    alignItems: 'center',
  },
  secondModalContent: {
    backgroundColor: '#4C0033',
    padding: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF3FA4',
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
});

export default ModalView;
