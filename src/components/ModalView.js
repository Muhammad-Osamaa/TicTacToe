import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import DifficultyLevel from './DifficultyLevel';

const ModalView = ({visible, onCloseModal, onSelectDifficulty}) => {
  const [localDifficulty, setLocalDifficulty] = useState('easy');
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onCloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.secondModalContent}>
            <DifficultyLevel
              difficultyLevel={localDifficulty}
              setDifficultyLevel={setLocalDifficulty}
              onSelectDifficulty={difficulty => {
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
    backgroundColor: 'rgba(0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#EDB7ED',
    padding: 2,
    borderRadius: 10,
    borderColor: '#FF3FA4',
    borderWidth: 1,
    alignItems: 'center',
  },
  secondModalContent: {
    backgroundColor: '#4C0033',
    padding: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF3FA4',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#2B2B52',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalView;
