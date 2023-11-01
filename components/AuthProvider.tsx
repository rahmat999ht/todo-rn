import { createContext, useContext, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const AuthenticatedUserContext = createContext<
  | {
      user: FirebaseAuthTypes.User | null;
      setUser: React.Dispatch<
        React.SetStateAction<FirebaseAuthTypes.User | null>
      >;
      login: () => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthenticatedUserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(
    auth().currentUser
  );

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredensial = await auth().signInWithCredential(googleCredential);
    setUser(userCredensial.user);
  }

  async function onLogout() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    await GoogleSignin.signOut();
    await auth().signOut();
    await auth().currentUser?.reload();
    setUser(null);
  }

  return (
    <AuthenticatedUserContext.Provider
      value={{ user, setUser, login: onGoogleButtonPress, logout: onLogout }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export function useAuthContext() {
  const auth = useContext(AuthenticatedUserContext);
  if (auth === undefined) {
    throw new Error(
      "useAuthContext must be used with a AuthenticatedUserProvider"
    );
  }
  return auth;
}
