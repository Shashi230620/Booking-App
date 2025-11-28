import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { BagProvider } from './components/CartSection/BagContext';
import { AuthProvider } from './context/AuthContext';
import './googleConfig';
import AppNavigator from './src/navigation/AppNavigator';
export default function App() {
  return (
    <AuthProvider>
      <BagProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </BagProvider>
    </AuthProvider>
  );
}