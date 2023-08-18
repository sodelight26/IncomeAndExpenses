import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Editsummary = ({ route, navigation }) => {
  const { selectedItem } = route.params;

  const [category, setCategory] = useState(selectedItem.category);
  const [amount, setAmount] = useState(selectedItem.amount.toString());
  const [note, setNote] = useState(selectedItem.note);
  const [type, setType] = useState(selectedItem.type);

  const handleEdit = async () => {
    try {
      const existingSummary = await AsyncStorage.getItem('summary');
      if (existingSummary) {
        const summary = JSON.parse(existingSummary);
        const updatedSummary = summary.map(item => {
          if (item.id === selectedItem.id) {
            return {
              ...item,
              category: category,
              amount: parseFloat(amount),
              note: note,
              type: type,
            };
          }
          return item;
        });
        await AsyncStorage.setItem('summary', JSON.stringify(updatedSummary));
        navigation.goBack(); // หลังจากแก้ไขเสร็จให้กลับไปยังหน้า Summary
      }
    } catch (error) {
      console.error('Error editing summary:', error);
    }
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

export default Editsummary;