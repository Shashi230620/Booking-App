// import React from 'react';
// import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// // We'll use different icon sets for the logos
// import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// // Get screen height for proportional padding (optional but good practice)
// const { height } = Dimensions.get('window');

// // --- Custom Button Component ---
// interface SocialButtonProps {
//   iconName: string;
//   iconType: 'email' | 'google' | 'apple';
//   text: string;
//   backgroundColor: string;
//   textColor: string;
//   onPress: () => void;
// }

// const SocialButton: React.FC<SocialButtonProps> = ({
//   iconName,
//   iconType,
//   text,
//   backgroundColor,
//   textColor,
//   onPress
// }) => {
//   // Determine the correct icon component based on the type
//   let IconComponent;
//   switch (iconType) {
//     case 'email':
//       IconComponent = MaterialCommunityIcons;
//       break;
//     case 'google':
//       IconComponent = AntDesign;
//       break;
//     case 'apple':
//       IconComponent = AntDesign;
//       break;
//     default:
//       IconComponent = AntDesign; // Default fallback
//   }

//   // Handle icon color inversion for the Apple button
//   const iconColor = iconType === 'apple' ? '#FFFFFF' : (iconType === 'email' ? '#444' : (iconType === 'google' ? undefined : '#444')); // Use default color for google icon

//   return (
//     <TouchableOpacity
//       style={[styles.button, { backgroundColor }]}
//       onPress={onPress}
//       activeOpacity={0.8}
//     >
//       {/* Icon */}
//       {IconComponent && (
//         <IconComponent
//           name={iconName as any}
//           size={22}
//           color={iconColor}
//           style={styles.buttonIcon}
//         />
//       )}

//       {/* Text */}
//       <Text style={[styles.buttonText, { color: textColor }]}>
//         {text}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// // --- Main Screen Component ---
// export default function SignUpScreen() {
//   const navigation=useNavigation();
//   // Mock function for handling button presses
//   const handlePress = (action: string) => {
//     console.log(`${action} pressed!`);
//     // In a real app, this would navigate or trigger an authentication flow
//   };

//   return (
//     // SafeAreaView is essential for handling notches and dynamic islands
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* Title/Header */}
//         <View style={styles.header}>
//           <Text style={styles.title}>Let's Get Started!</Text>
//         </View>

//         {/* Buttons Section */}
//         <View style={styles.buttonsContainer}>
//           {/* Continue with Email */}
//           <SocialButton
//             iconName="email-outline"
//             iconType="email"
//             text="Continue with Email"
//             backgroundColor="#F2F2F2" // Light gray
//             textColor="#444" // Dark text
//             onPress={() => {navigation.navigate('CreateAccount')}}
//           />

//           {/* Continue with Google */}
//           <SocialButton
//             iconName="google"
//             iconType="google"
//             text="Continue with Google"
//             backgroundColor="#F2F2F2" // Light gray
//             textColor="#444" // Dark text
//             onPress={() => handlePress('Google')}
//           />

//           {/* OR Separator */}
//           <Text style={styles.orText}>or</Text>

//           {/* Continue with Apple (Black Button) */}
//           <SocialButton
//             iconName="apple1" // AntDesign name for Apple logo
//             iconType="apple"
//             text="Continue with Apple"
//             backgroundColor="#000000" // Black background
//             textColor="#FFFFFF" // White text
//             onPress={() => handlePress('Apple')}
//           />
//         </View>

//         {/* Sign In Link */}
//         <View style={styles.signInContainer}>
//           <Text style={styles.signInText}>
//             Already Have an Account ?{' '}
//             <Text
//               style={styles.signInLink}
//               onPress={() =>{navigation.navigate('SignIn');}}
//             >
//               Sign in
//             </Text>
//           </Text>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }

// // --- Stylesheet ---
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#FFFFFF', // Set background to white
//   },
//   container: {
//     flex: 1,
//     // Use padding that scales, or fixed padding. 
//     // I'm using a simple fixed vertical padding and horizontal margin for the content
//     paddingHorizontal: 30, 
//     justifyContent: 'center', // Center content vertically
//     paddingBottom: Platform.OS === 'ios' ? 0 : 40, // Adjust bottom padding for different platforms
//   },
//   header: {
//     marginBottom: height * 0.05, // Proportional margin above the buttons
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333', // Dark text color
//     // The screen image suggests a default/system font, which React Native uses by default.
//   },
//   buttonsContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%', // Full width of the container
//     paddingVertical: 14,
//     borderRadius: 12, // Rounded corners
//     marginBottom: 15,
//     // Shadow for a slight lift, common in iOS design
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//       },
//       android: {
//         elevation: 1,
//       },
//     }),
//     borderWidth: 1, // Subtle border to match the image
//     borderColor: '#E8E8E8', // Light border color
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '600', // Semi-bold
//     marginLeft: 10, // Space between icon and text
//   },
//   buttonIcon: {
//     position: 'absolute',
//     left: 20, // Position icon to the left
//   },
//   orText: {
//     fontSize: 14,
//     color: '#888',
//     marginVertical: 15, // Space above and below 'or'
//     fontWeight: '500',
//   },
//   signInContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   signInText: {
//     fontSize: 14,
//     color: '#888',
//     fontWeight: '500',
//   },
//   signInLink: {
//     color: '#4CAF50', // A clear, contrasting color for the link (Green/Teal from the image)
//     fontWeight: '600',
//   },
// });























// screens/SignUpScreen.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React from 'react';
import { Alert, Dimensions, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../Services/firebaseConfig';

const { height } = Dimensions.get('window');


const SocialButton = ({ iconName, iconType, title, style, textStyle, onPress }: any) => {
  const Icon = MaterialCommunityIcons;
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
export default function SignUpScreen() {
  const navigation = useNavigation<any>();

  // const signInWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const credential = GoogleAuthProvider.credential(userInfo.idToken);
  //     await signInWithCredential(auth, credential);
  //     Alert.alert('Welcome!', 'Signed in with Google!');
  //     navigation.replace('Home'); // Change to your main screen
  //   } catch (error: any) {
  //     if (error.code !== 'SIGN_IN_CANCELLED') Alert.alert('Error', 'Google Sign-In failed');
  //   }
  // };
  const signInWithGoogle = async () => {
    try {
      // 1. Check Google Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // 2. CLEAR ANY OLD SESSION — THIS IS THE KEY THAT FIXES 99% OF FAILURES
      await GoogleSignin.signOut();

      // 3. Trigger Google Sign-In
      const userInfo = await GoogleSignin.signIn();

      // 4. Get fresh tokens (more reliable than userInfo.idToken)
      const tokens = await GoogleSignin.getTokens();

      if (!tokens.idToken) {
        throw new Error('No idToken received');
      }

      // 5. Create Firebase credential and sign in
      const credential = GoogleAuthProvider.credential(tokens.idToken);
      await signInWithCredential(auth, credential);

      Alert.alert('Welcome!', 'Signed in with Google!');
      navigation.replace('Home');
    } catch (error: any) {
      console.log('Google SignIn Error:', error.code, error.message);

      if (error.code === 'DEVELOPER_ERROR') {
        Alert.alert('Setup Error', 'Google Sign-In is misconfigured. Check SHA-1 and Web Client ID.');
      } else if (error.code === 'SIGN_IN_CANCELLED') {
        // User cancelled — do nothing
      } else {
        Alert.alert('Login Failed', error.message || 'Google Sign-In failed. Try again.');
      }
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{`Let's Get Started!`}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <SocialButton iconName="email-outline" iconType="Email" title="Continue with Email" style={styles.emailButton} textStyle={styles.emailButtonText} onPress={() => navigation.navigate('SignIn')} />
                    <SocialButton
                      iconName="facebook"
                      iconType="Facebook"
                      title="Continue with Facebook"
                      style={styles.facebookButton}
                      textStyle={styles.facebookButtonText}
                      onPress={() => Alert.alert('Soon', 'Facebook coming soon')}
                    />
                    <SocialButton iconName="google" iconType="Google" title="Continue with Google" style={styles.googleButton} textStyle={styles.googleButtonText} onPress={signInWithGoogle} />
                    <Text style={styles.orText}>or</Text>
                    <SocialButton iconName="apple" iconType="Apple" title="Continue with Apple" style={styles.appleButton} textStyle={styles.appleButtonText} onPress={() => Alert.alert('Soon', 'Apple coming soon')} />
         
        </View>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already Have an Account?{' '}
            <Text style={styles.signInLink} onPress={() => navigation.navigate('SocialLogin')}>
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  facebookButton: { backgroundColor: '#F0F0F0' },
  facebookButtonText: { color: 'black' },
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  appleButton: { backgroundColor: 'black' },
  appleButtonText: { color: 'white' },
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center', paddingBottom: Platform.OS === 'ios' ? 0 : 40 },
  header: { marginBottom: height * 0.05, alignItems: 'center' },
  emailButton: { backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E0E0E0' },
  emailButtonText: { color: 'black' },
  googleButton: { backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E0E0E0' },
  googleButtonText: { color: 'black' },
  title: { fontSize: 24, fontWeight: '500', color: '#333' },
  buttonsContainer: { width: '100%', alignItems: 'center' },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: 14, borderRadius: 9999, marginBottom: 15, borderWidth: 1, borderColor: '#E8E8E8',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 1 } }),
  },
  buttonText: { fontSize: 16, fontWeight: '600', marginLeft: 10 },
  orText: { fontSize: 14, color: '#888', marginVertical: 15, fontWeight: '500' },
  signInContainer: { alignItems: 'center' },
  signInText: { fontSize: 14, color: '#888', fontWeight: '500' },
  signInLink: { color: '#4CAF50', fontWeight: '600' },
});