// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import React, { useState } from 'react';
// import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// interface AuthInputFieldProps {
//   iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
//   placeholder: string;
//   value: string;
//   onChangeText: (text: string) => void;
//   secureTextEntry?: boolean;
//   isError?: boolean;
//   keyboardType?: KeyboardTypeOptions;
// }

// const AuthInputField: React.FC<AuthInputFieldProps> = ({ 
//   iconName, 
//   placeholder, 
//   value, 
//   onChangeText, 
//   secureTextEntry = false, 
//   isError = false, 
//   keyboardType = 'default' 
// }) => (
//   <View style={[styles.inputContainer, isError && styles.inputContainerError]}>
//     <MaterialCommunityIcons name={iconName} size={20} color={isError ? '#D32F2F' : '#666'} style={styles.inputIcon} />
//     <TextInput
//       style={styles.input}
//       placeholder={placeholder}
//       placeholderTextColor="#999"
//       value={value}
//       onChangeText={onChangeText}
//       secureTextEntry={secureTextEntry}
//       keyboardType={keyboardType}
//       autoCapitalize="none"
//     />
//   </View>
// );

// export default function CreateAccountScreen() {
//   const navigation = useNavigation();
//   const insets = useSafeAreaInsets();

//   // EMPTY INITIAL VALUES - no pre-filled text
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [passwordMismatch, setPasswordMismatch] = useState(false); // starts hidden
//   const passwordMismatchMessage = "Your password doesn't match.";

//   const handleSignUp = () => {
//     // Simple validation example (you can keep or expand this)
//     if (password !== confirmPassword) {
//       setPasswordMismatch(true);
//       return;
//     }
//     setPasswordMismatch(false);
//     console.log('Sign Up pressed with:', { email, password, confirmPassword });
//     navigation.navigate('SocialLogin');
//   };

//   const handleSignIn = () => {
//     navigation.navigate('SignIn');
//   };

//   const handleGoBack = () => {
//     console.log('Go back pressed');
//     navigation.goBack(); // optional: actually go back
//   };

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar style="dark" />

//       {/* Back Button */}
//       <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//         <MaterialCommunityIcons name="chevron-left" size={30} color="#333" />
//       </TouchableOpacity>

//       <View style={styles.content}>
//         <Text style={styles.header}>Create Your Account ✨</Text>

//         {/* Email Input */}
//         <AuthInputField
//           iconName="email-outline"
//           placeholder="Email Address"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />

//         {/* Password Input */}
//         <AuthInputField
//           iconName="lock-outline"
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={true}
//         />

//         {/* Confirm Password Input */}
//         <View style={styles.passwordConfirmWrapper}>
//           <AuthInputField
//             iconName="lock-outline"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry={true}
//             isError={passwordMismatch}
//           />
//           {passwordMismatch && <Text style={styles.passwordMismatchText}>{passwordMismatchMessage}</Text>}
//         </View>

//         {/* Sign Up Button */}
//         <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
//           <Text style={styles.signUpButtonText}>Sign up</Text>
//         </TouchableOpacity>

//         {/* Already Have an Account? Sign in */}
//         <View style={styles.signInContainer}>
//           <Text style={styles.signInText}>
//             Already Have an Account? <Text style={styles.signInLink} onPress={handleSignIn}>Sign in</Text>
//           </Text>
//         </View>
//       </View>

//       <View style={{ height: insets.bottom }} />
//     </View>
//   );
// }

// // STYLES (unchanged)
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'white', },
//   backButton: { position: 'absolute', top: 50, left: 15, zIndex: 1, width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', },
//   content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, marginTop: -80, },
//   header: { fontSize: 24, fontWeight: '600', marginBottom: 40, color: '#333', },
//   inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 350, height: 56, backgroundColor: '#F0F0F0', borderRadius: 12, marginBottom: 15, paddingHorizontal: 15, borderWidth: 1, borderColor: 'transparent', },
//   inputContainerError: { borderColor: '#D32F2F', },
//   inputIcon: { marginRight: 10, },
//   input: { flex: 1, fontSize: 16, color: '#333', },
//   passwordConfirmWrapper: { width: '100%', maxWidth: 350, },
//   passwordMismatchText: { color: '#D32F2F', fontSize: 13, marginTop: -10, marginBottom: 15, marginLeft: 15, },
//   signUpButton: { backgroundColor: '#4CD964', width: '100%', maxWidth: 350, height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20, },
//   signUpButtonText: { color: 'white', fontSize: 18, fontWeight: '600', },
//   signInContainer: { marginTop: 5, },
//   signInText: { fontSize: 14, color: '#777', fontWeight: '500', },
//   signInLink: { color: '#4CD964', fontWeight: '600', },
// });

















// screens/CreateAccountScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../Services/firebaseConfig';

export default function CreateAccountScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const isFormValid =
    email.trim() !== '' &&
    password.trim() !== '' &&
    confirm.trim() !== '' &&
    password === confirm;

  const signUp = async () => {
    if (password !== confirm) return Alert.alert('Error', 'Passwords do not match');
    if (!email || !password) return Alert.alert('Error', 'Fill all fields');

    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      Alert.alert('Check Your Email', 'Verification link sent!', [{ text: 'OK', onPress: () => navigation.replace('SocialLogin') }]);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#999" />
        <TextInput
          style={styles.iconInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          style={styles.iconInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          style={styles.iconInput}
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={[
          styles.btn,
          !isFormValid && styles.btnDisabled,
        ]}
        onPress={signUp}
        disabled={!isFormValid || loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.btnText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>
          Already Have an Account?{' '}
          <Text
            style={styles.signInLink}
            onPress={() => navigation.navigate('SocialLogin')}
          >
            Sign in
          </Text>
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 30, justifyContent: 'flex-start', paddingTop: 110, },
  title: { fontSize: 28, fontWeight: '500', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#F0F0F0', padding: 16, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: '#4CD964', padding: 16, borderRadius: 9999, alignItems: 'center', marginTop: 20 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  signInContainer: { marginTop: 20, alignItems: 'center' },
  signInText: { fontSize: 14, color: '#888', fontWeight: '500' },
  signInLink: { color: '#4CAF50', fontWeight: '600' },
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
  backIcon: {
    fontSize: 26,
    color: '#333',
    marginTop: -2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 15,
    height: 55,
  },
  iconInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  btnDisabled: {
    backgroundColor: 'gray'
  },
});