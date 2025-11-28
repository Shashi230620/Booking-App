import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth } from '../Services/firebaseConfig';


const SocialButton = ({ iconName, iconType, title, style, textStyle, onPress }: any) => {
  const Icon =MaterialCommunityIcons;
  const color =
    iconType === 'Facebook'
      ? '#4285F4'
      : iconType === 'Apple'
        ? 'white'
        : 'black';

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Icon name={iconName} size={24} color={color} />
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function SocialLoginScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  // const googleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const credential = GoogleAuthProvider.credential(userInfo.idToken);
  //     await signInWithCredential(auth, credential);
  //     Alert.alert('Welcome back!', 'Logged in with Google');
  //     navigation.replace('Home');
  //   } catch (error) {
  //     Alert.alert('Error', 'Google login failed');
  //   }
  // };
  const googleSignIn = async () => {
    try {
      // Step 1: Check Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Step 2: Force sign-in (clears any old broken state)
      await GoogleSignin.signOut(); // ← THIS LINE IS CRITICAL

      // Step 3: Sign in
      const userInfo = await GoogleSignin.signIn();

      // Step 4: Get tokens
      const { idToken } = await GoogleSignin.getTokens();

      // Step 5: Create credential and sign in to Firebase
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);

      Alert.alert('Success!', 'Signed in with Google');
      navigation.replace('Home');
    } catch (error: any) {
      console.log('Google SignIn Error:', error);
      if (error.code === 'DEVELOPER_ERROR') {
        Alert.alert('Error', 'Google Sign-In misconfigured. Check Web Client ID and SHA-1.');
      } else {
        Alert.alert('Failed', `Google Sign-In failed: ${error.message}`);
      }
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

        <View style={styles.buttonGroup}>
          <SocialButton iconName="email-outline" iconType="Email" title="Continue with Email" style={styles.emailButton} textStyle={styles.emailButtonText} onPress={() => navigation.navigate('CreateAccount')} />
          <SocialButton
            iconName="facebook"
            iconType="Facebook"
            title="Continue with Facebook"
            style={styles.facebookButton}
            textStyle={styles.facebookButtonText}
            onPress={() => Alert.alert('Soon', 'Facebook coming soon')}
          />
          <SocialButton iconName="google" iconType="Google" title="Continue with Google" style={styles.googleButton} textStyle={styles.googleButtonText} onPress={googleSignIn} />
          <Text style={styles.orText}>or</Text>
          <SocialButton iconName="apple" iconType="Apple" title="Continue with Apple" style={styles.appleButton} textStyle={styles.appleButtonText} onPress={() => Alert.alert('Soon', 'Apple coming soon')} />
        </View>

        <Text style={styles.signUpText}>
          {` Don't Have an Account? `}<Text style={styles.signUpLink} onPress={() => navigation.navigate('CreateAccount')}>Sign up</Text>
        </Text>
      </View>
      <View style={{ height: insets.bottom }} />
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
  facebookButton: { backgroundColor: '#F0F0F0' },
  facebookButtonText: { color: 'black' },
  backIcon: {
    fontSize: 26,
    color: '#333',
    marginTop: -2,
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, marginTop: -80 },
  header: { fontSize: 24, fontWeight: '600', marginBottom: 8, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },
  buttonGroup: { width: '100%', maxWidth: 350, alignItems: 'center' },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: 14, borderRadius: 9999, marginBottom: 15, borderWidth: 1, borderColor: '#E8E8E8',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 1 } }),
  },
  buttonText: { fontSize: 16, fontWeight: '600', marginLeft: 10 },
  emailButton: { backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E0E0E0' },
  emailButtonText: { color: 'black' },
  googleButton: { backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E0E0E0' },
  googleButtonText: { color: 'black' },
  orText: { fontSize: 14, color: '#888', marginVertical: 15, fontWeight: '500' },
  appleButton: { backgroundColor: 'black' },
  appleButtonText: { color: 'white' },
  signUpText: { fontSize: 14, color: '#777' },
  signUpLink: { color: '#4CD964', fontWeight: '600' },
});