import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
  return (
  
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Makelist')}
        >
          <Text style={styles.buttonText}>ทำรายการ</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Summary')}
        >
          <Text style={styles.buttonText}>สรุปผล</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('Addcate')}
        >
          <Text style={styles.buttonText}>หมวดหมู่</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('Dataasy')}
        >
          <Text style={styles.buttonText}>Data</Text>
        </TouchableOpacity>
      </View>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0085E6',
    width: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Home;
