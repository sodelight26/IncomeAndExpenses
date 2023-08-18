import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Addcate = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCategories();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchCategories = async () => {
    try {
      const data = await AsyncStorage.getItem('categories');
      console.log('Fetched data:', data);
      if (data) {
        setCategories(JSON.parse(data));
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const saveCategories = async (newCategories) => {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(newCategories));
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  const handleEdit = (categoryId) => {
    navigation.navigate('Editcat', { categoryId }); // นำ categoryId ไปยังหน้า Editcat
  };

  const handleDelete = async (categoryId) => {
    Alert.alert(
      'ยืนยันการลบ',
      'คุณต้องการลบหมวดหมู่นี้หรือไม่?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ลบ',
          onPress: async () => {
            const updatedCategories = categories.filter(category => category.id !== categoryId);
            setCategories(updatedCategories);
            await saveCategories(updatedCategories);
          },
        },
      ],
    );
  };

  const handleAdd = async () => {
    navigation.navigate('Addcat');
    await fetchCategories(); // อัปเดตข้อมูลหมวดหมู่เมื่อกลับจากหน้า Addcat
  };

  const renderCategoryItem = ({ item }) => {
    return (
      <View style={styles.categoryItem}>
        <Text style={styles.categoryText}>{item.name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item.id)} // ส่งค่า item.id ไปยังหน้า Editcat
          >
            <Text style={styles.buttonText}>แก้ไข</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>ลบ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAdd}
      >
        <Text style={styles.buttonText}>เพิ่มหมวดหมู่</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  categoryText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#43a047',
    paddingHorizontal: 20, // ปรับค่า padding แนวนอน
    paddingVertical: 12, // ปรับค่า padding แนวตั้ง
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default Addcate;
