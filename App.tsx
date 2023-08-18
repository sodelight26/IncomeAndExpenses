import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'; // นำเข้าหน้าจอ Home
import Makelist from './screens/Makelist';
import Graph from './screens/Graph';
import Summary from './screens/Summary';
import Addcate from './screens/Addcate';
import Addcat from './screens/Addcat';
import Editcat from './screens/Editcat';
import Editsummary from './screens/Editsummary';
import Dataasy from './screens/Dataasy';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home} // ใช้คอมโพเนนต์ Home สำหรับหน้า "Home"
          options={{ title: 'Home' }}
        />

        <Stack.Screen
          name="Makelist"
          component={Makelist}
          options={{ title: 'Makelist' }}
        />

        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{ title: 'Summary' }}
        />

        <Stack.Screen
          name="Graph"
          component={Graph}
          options={{ title: 'Graph' }}
        />

        <Stack.Screen
          name="Addcate"
          component={Addcate}
          options={{ title: 'AddCate' }}
        />

        <Stack.Screen
          name="Addcat"
          component={Addcat}
          options={{ title: 'AddCat' }}
        />

        <Stack.Screen
          name="Editcat"
          component={Editcat}
          options={{ title: 'Editcat' }}
        />

        <Stack.Screen
          name="Editsummary"
          component={Editsummary}
          options={{ title: 'Editsummary' }}
        />

        <Stack.Screen
          name="Dataasy"
          component={Dataasy}
          options={{ title: 'Dataasy' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
