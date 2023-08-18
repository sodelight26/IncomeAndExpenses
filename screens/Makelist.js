import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Makelist = () => {
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [categories, setCategories] = useState([]);
  
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await AsyncStorage.getItem('categories');
      if (data) {
        setCategories(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddIncome = async () => {
    const id = await generateNewId('summary');
    const newItem = {
      id: id ,
      date: date,
      category: category,
      amount: amount,
      note: note,
      type: 'income',
      timestamp: new Date().toISOString(),
    };

    if (isNewItemIdValid(newItem, 'summary')) {
      await saveItem(newItem, 'summary');
      navigation.navigate('Summary');
    } else {
      // Handle duplicate item case
      console.log('Duplicate item found');
      // You can show an alert here or handle the duplicate case as needed
    }
  };

  const handleAddExpense = async () => {
    const id = await generateNewId('summary');
    const newItem = {
      id: id ,
      date: date,
      category: category,
      amount: amount,
      note: note,
      type: 'expense',
      timestamp: new Date().toISOString(),
    };

    if (isNewItemIdValid(newItem, 'summary')) {
      await saveItem(newItem, 'summary');
      navigation.navigate('Summary');
    } else {
      // Handle duplicate item case
      console.log('Duplicate item found');
      // You can show an alert here or handle the duplicate case as needed
    }
  };

  const generateNewId = async (summary) => {
    try {
      const existingData = await AsyncStorage.getItem(summary);
      const newData = existingData ? JSON.parse(existingData) : [];
  
      // Find the highest existing id and increment by 1
      const maxId = newData.reduce((max, item) => Math.max(max, item.id), 0);
      const newId = maxId + 1;
  
      return newId;
    } catch (error) {
      console.error('Error generating new id:', error);
      return null;
    }
  };

  const isNewItemIdValid = async (newItem, summary) => {
    try {
      const existingData = await AsyncStorage.getItem(summary);
      const newData = existingData ? JSON.parse(existingData) : [];
  
      // ตรวจสอบว่ามีรายการที่มี id เดียวกันกับ newItem หรือไม่
      const isDuplicate = newData.some(item => item.id === newItem.id);
  
      return !isDuplicate;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดข้อมูลที่ซ้ำกัน:', error);
      return false;
    }
  };
  
  const saveItem = async (item, summary) => {
    try {
      const existingData = await AsyncStorage.getItem(summary);
      const newData = existingData ? JSON.parse(existingData) : [];
      newData.push(item);
      await AsyncStorage.setItem(summary, JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>วันที่</Text>
      <TextInput
        style={styles.input}
        value={date.toDateString()}
        onChangeText={setDate}
      />

      <Text style={styles.label}>หมวดหมู่</Text>
      <Picker
        style={styles.input}
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="เลือกหมวดหมู่" value="" />
        {categories.map((category) => (
          <Picker.Item
            key={category.id} // เพิ่ม key ที่ไม่ซ้ำกัน
            label={category.name}
            value={category.name}
          />
        ))}
      </Picker>
      <Text style={styles.label}>จำนวนเงิน</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Text style={styles.label}>คำอธิบาย</Text>
      <TextInput
        style={[styles.input, styles.textarea]} // ปรับขนาดของ TextInput ให้เป็น TextArea
        value={note}
        onChangeText={setNote}
        multiline={true}
      />
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={[styles.button, styles.incomeButton]}
          onPress={handleAddIncome}
        >
          <Text style={styles.buttonText}>รายรับ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.expenseButton]}
          onPress={handleAddExpense}
        >
          <Text style={styles.buttonText}>รายจ่าย</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 5,
  },
  textarea: {
    height: 80, // ปรับสูงของ TextArea
  },
  buttonContainer: {
    flexDirection: 'row', // เรียงปุ่มในแนวนอน
    justifyContent: 'space-between', // กระจายช่องว่างระหว่างปุ่ม
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // ให้ปุ่มขยายเต็มขนาดของพื้นที่ที่ให้มา
  },
  incomeButton: {
    backgroundColor: '#43a047', // เปลี่ยนสีรายรับเป็นเขียว
    marginRight: 8, // ช่องว่างขวาของปุ่มรายรับ
  },
  expenseButton: {
    backgroundColor: '#e53935', // เปลี่ยนสีรายจ่ายเป็นแดง
    marginLeft: 8, // ช่องว่างซ้ายของปุ่มรายจ่าย
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default Makelist;