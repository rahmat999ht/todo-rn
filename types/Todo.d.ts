import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type ITodo = {
  id: string;
  userId: string;
  title: string;
  descripsion: string;
  dateTime: FirebaseFirestoreTypes.Timestamp;
  isDone: boolean;
};
