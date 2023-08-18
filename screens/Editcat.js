import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const Editcat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params;

  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchCategoryName();
  }, []);

  const fetchCategoryName = async () => {
    try {
      const existingCategories = await AsyncStorage.getItem('categories');
      if (existingCategories) {
        const categories = JSON.parse(existingCategories);
        const category = categories.find(category => category.id === categoryId);
        if (category) {
          setCategoryName(category.name);
        }
      }
    } catch (error) {
      console.error('Error fetching category name:', error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const existingCategories = await AsyncStorage.getItem('categories');
      if (existingCategories) {
        const categories = JSON.parse(existingCategories);
        const updatedCategories = categories.map(category => {
          if (category.id === categoryId) {
            return { ...category, name: categoryName };
          }
          return category;
        });
        await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error editing category:', error);
    }
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>แก้ไขหมวดหมู่</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อหมวดหมู่"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <TouchableOpacity style={styles.editButton} onPress={handleEditCategory}>
        <Text style={styles.buttonText}>บันทึก</Text>
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
  editButton: {
    backgroundColor: '#1976D2',
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

export default Editcat;
