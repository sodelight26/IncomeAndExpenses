import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dataasy = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const allData = await AsyncStorage.getAllKeys();
      const jsonData = await AsyncStorage.multiGet(allData);
      const parsedData = jsonData.map(item => JSON.parse(item[1]));
      setData(parsedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ข้อมูลทั้งหมดที่เก็บไว้ใน AsyncStorage</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dataItem}>
            <Text style={styles.dataText}>{JSON.stringify(item)}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dataItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
  },
});

export default Dataasy;
