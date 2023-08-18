import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Addcat = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = async () => {
    if (categoryName.trim() === '') {
      return; // ไม่ต้องทำอะไรถ้าชื่อหมวดหมู่ว่างเปล่า
    }

    try {
      const newCategory = { id: String(Date.now()), name: categoryName };
      const existingCategories = await AsyncStorage.getItem('categories');
      const updatedCategories = existingCategories
        ? JSON.parse(existingCategories).concat(newCategory)
        : [newCategory];

      await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
      setCategoryName('');

      // กลับไปหน้ารายการหลังจากเพิ่ม
      navigation.navigate('Addcate');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เพิ่มหมวดหมู่</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อหมวดหมู่"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
        <Text style={styles.buttonText}>เพิ่ม</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#43a047',
    padding: 12,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Addcat;
