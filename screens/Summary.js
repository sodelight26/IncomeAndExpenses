import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Summary = () => {
  const navigation = useNavigation();
  const [summary, setSummary] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await AsyncStorage.getItem('summary');
      if (data) {
        setSummary(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    toggleModal();
  };
  
  const handleDelete = async (itemId) => {
    toggleModal();
    Alert.alert(
      'ยืนยันการลบ',
      'คุณแน่ใจหรือไม่ที่จะลบรายการนี้?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: async () => {
            const updatedSummary = summary.filter(item => item.id !== itemId);
            setSummary(updatedSummary);
            await saveSummary(updatedSummary);
          },
        },
      ],
    );
  };

  const saveSummary = async (updatedSummary) => {
    try {
      await AsyncStorage.setItem('summary', JSON.stringify(updatedSummary));
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSeeAllPress = () => {
    navigation.navigate('Graph');
  };

  const totalItems = summary.length;

  // คำนวณรายรับทั้งหมด
  const totalIncome = summary
    .filter(item => item.type === 'income')
    .reduce((total, item) => total + parseFloat(item.amount), 0);

  // คำนวณรายจ่ายทั้งหมด
  const totalExpense = summary
    .filter(item => item.type === 'expense')
    .reduce((total, item) => total + parseFloat(item.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <View style={styles.container}>
      <ScrollView>
        {summary.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => handleEdit(item)}
          >
            <Badge
              value={item.id}
              badgeStyle={{ backgroundColor: item.type === 'income' ? 'green' : 'red' }}
            />
            <View style={styles.itemContent}>
              <Text style={styles.timestampText}>{new Date(item.timestamp).toLocaleString()}</Text>
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.noteText}>{item.note}</Text>
              <Text style={styles.timestampText}>{item.timestamp}</Text>
            </View>
            <Text
              style={[
                styles.amountText,
                { color: item.type === 'income' ? 'green' : 'red' },
              ]}
            >
              {item.type === 'income' ? '+' : '-'} {item.amount ? item.amount.toLocaleString() : 'N/A'} บาท
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <View>
          <Text style={styles.headerText}>สรุปรายการ</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, styles.blackText]}>จำนวนรายการ</Text>
              <Text style={[styles.summaryValue, styles.blackText]}>{totalItems}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, styles.greenText]}>รายรับ</Text>
              <Text style={[styles.summaryValue, styles.greenText]}>{totalIncome.toFixed(2)} บาท</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, styles.redText]}>รายจ่าย</Text>
              <Text style={[styles.summaryValue, styles.redText]}>{totalExpense.toFixed(2)} บาท</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, styles.blueText]}>ยอดคงเหลือ</Text>
              <Text style={[styles.summaryValue, styles.blueText]}>{totalBalance.toFixed(2)} บาท</Text>
            </View>
          </View>
        </View>


      </View>
      <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllPress}>
        <Text style={styles.seeAllButtonText}>กดดูภาพรวม</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={() => {
            toggleModal();
            navigation.navigate('Editsummary', { selectedItem });
          }}>
            <Text style={styles.modalButtonText}>แก้ไข</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.modalButton} onPress={() => {
            handleDelete(selectedItem.id);
            toggleModal();
          }}>
            <Text style={styles.modalButtonText}>ลบ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
            <Text style={styles.modalButtonText}>ยกเลิก</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  noteText: {
    fontSize: 14,
    color: '#666',
  },
  timestampText: {
    fontSize: 12,
    color: '#999',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  seeAllButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'blue',
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 0.5,
    width: '100%', // ปรับความกว้างให้เท่ากับขนาดจอ
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 1,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // จัดให้รับขนาดของส่วนซ้ายที่คงที่
  },
  summaryValue: {
    fontSize: 16,
    textAlign: 'right', // จัดให้ข้อความชิดขวา
  },

  blackText: {
    color: 'black',
  },
  greenText: {
    color: 'green',
  },
  redText: {
    color: 'red',
  },
  blueText: {
    color: 'blue',
  },

});

export default Summary;
