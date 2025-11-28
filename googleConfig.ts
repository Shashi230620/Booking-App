// googleConfig.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '776054261502-797i4l1nc7781hvnhheul8auqft2mj72.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});
