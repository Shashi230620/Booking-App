// screens/SignInScreen.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth } from '../Services/firebaseConfig'; // ← Make sure this path is correct

const AuthInputField = ({ iconName, placeholder, value, onChangeText, secureTextEntry = false, isError = false }: any) => (
  <View style={[styles.inputContainer, isError && styles.inputContainerError]}>
    <MaterialCommunityIcons name={iconName} size={20} color={isError ? '#D32F2F' : '#666'} style={styles.inputIcon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      keyboardType={iconName === 'email-outline' ? 'email-address' : 'default'}
    />
  </View>
);

export default function SignInScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
   const isFormValid =
    email.trim() !== '' &&
    password.trim() !== ''

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert('Welcome back!', 'You are now signed in');
      navigation.replace('Home'); // ← Change to your main screen
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setErrorMessage("Email doesn't exist. Please sign up first.");
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email address');
      } else {
        setErrorMessage('Sign in failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.header}>Welcome Back!</Text>
        <Text style={styles.subtitle}>{`Great to see you again, You've been missed!`}</Text>

        <View style={styles.inputWrapper}>
          <AuthInputField
            iconName="email-outline"
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            isError={errorMessage.includes('email') || errorMessage.includes('exist')}
          />
        </View>

        <View style={styles.inputWrapper}>
          <AuthInputField
            iconName="lock-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            isError={errorMessage.includes('password')}
          />
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
         <TouchableOpacity
                style={[
                  styles.signInButton,
                  !isFormValid && styles.btnDisabled,
                ]}
                onPress={handleSignIn}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.signInButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            {`Don't Have an Account? `}{' '}
            <Text style={styles.signUpLink} onPress={() => navigation.navigate('CreateAccount')}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  btnDisabled: {
    backgroundColor: 'gray'
  },
  backIcon: {
    fontSize: 26,
    color: '#333',
    marginTop: -2,
  },
  content: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 30, paddingTop: 110},
  header: { fontSize: 24, fontWeight: '600', marginBottom: 8, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 350,
    height: 56, backgroundColor: '#F0F0F0', borderRadius: 12, paddingHorizontal: 15,
    borderWidth: 1, borderColor: 'transparent', marginBottom: 15,
  },
  inputContainerError: { borderColor: '#D32F2F' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  inputWrapper: { width: '100%', maxWidth: 350 },
  errorText: { color: '#D32F2F', fontSize: 13, marginBottom: 15, textAlign: 'center', maxWidth: 350 },
  signInButton: {
    backgroundColor: '#4CD964', width: '100%', maxWidth: 350, height: 56,
    borderRadius: 9999, justifyContent: 'center', alignItems: 'center', marginTop: 10,
  },
  signInButtonText: { color: 'white', fontSize: 18, fontWeight: '600' },
  signUpContainer: { marginTop: 20 },
  signUpText: { fontSize: 14, color: '#777' },
  signUpLink: { color: '#4CD964', fontWeight: '600' },
});