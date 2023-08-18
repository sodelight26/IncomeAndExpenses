import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const EditSummary = ({ navigation }) => {
  const route = useRoute();
  const { selectedItem } = route.params; // Make sure this prop is passed in navigation

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    setCategory(selectedItem.category);
    setAmount(selectedItem.amount.toString());
    setNote(selectedItem.note);
    setType(selectedItem.type);
  }, [selectedItem]);

  const handleEdit = (item) => {
  
  setSelected
setSelectedItem(item);
  navigation.
 
navigate('EditSummary', { selectedItem: item }); // Pass the selectedItem prop
};

  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>แก้ไขข้อมูล</Text>
      <TextInput
        style={styles.input}
        placeholder="หมวดหมู่"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="จำนวนเงิน"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="คำอธิบาย"
        value={note}
        onChangeText={setNote}
      />
      <TextInput
        style={styles.input}
        placeholder="ประเภท"
        value={type}
        onChangeText={setType}
      />
      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.buttonText}>บันทึก</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  editButton: {
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditSummary;