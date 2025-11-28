import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Import your screens
import SignUpScreen from '@/components/SignUpScreen';
import BagScreen from '../../components/CartSection/BagScreen';
import CreateAccountScreen from '../../components/CreateAccountScreen';
import HomeScreen from '../../components/HomeScreen/HomeScreen';
import ProductDetailScreen from '../../components/HomeScreen/ProductDetailScreen';
import SignInScreen from '../../components/SignInScreen';
import SocialLoginScreen from '../../components/SocialLoginScreen';

const Stack = createStackNavigator();

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      {/* Sign Up / Create Account as initial screen */}
      <Stack.Screen 
        name="CreateAccount" 
        component={CreateAccountScreen} 
        options={{ title: 'Create Account', headerShown: false }}
      />


      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ title: 'Create Account', headerShown: false }}
      />
      
      {/* Sign In Screen */}
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={{ title: 'Sign In', headerShown: false }}
      />
      
      {/* Social Login Screen */}
      <Stack.Screen 
        name="SocialLogin" 
        component={SocialLoginScreen} 
        options={{ title: 'Social Login', headerShown: false }}
      />
      
      {/* Main App Screens */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home', headerShown: false }}
      />
      
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ title: 'Product Details' }}
      />
      
      <Stack.Screen 
        name="Cart" 
        component={BagScreen} 
        options={{ title: 'Shopping Cart' }}
      />
    </Stack.Navigator>
  );
}