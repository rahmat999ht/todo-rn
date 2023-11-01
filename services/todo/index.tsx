import { useEffect, useState } from "react";
import { ITodo } from "../../types/Todo";
import { db } from "../firebaseConfig";

import {
  collection,
  addDoc,
  deleteDoc,
  //   getDocs,
  doc,
  where,
  updateDoc,
  onSnapshot,
  getDoc,
  query,
} from "firebase/firestore";

const converterTodo = {
  toFirestore({ id, ...todo }: ITodo) {
    return todo;
  },
  fromFirestore(snapshot: { data: () => any; id: any }): ITodo {
    const data = snapshot.data();
    return {
      userId: data["userId"],
      descripsion: data["descripsion"],
      isDone: data["isDone"],
      title: data["title"],
      id: snapshot.id,
    };
  },
};

export const todoCollection = collection(db, "todos").withConverter(
  converterTodo
);

export const doneQuery = (id: string) =>
  query(
    collection(db, "todos").withConverter(converterTodo),
    where("isDone", "==", true),
    where("userId", "==", id)
  );

export const todoQuery = (id: string) =>
  query(
    collection(db, "todos").withConverter(converterTodo),
    where("isDone", "==", false),
    where("userId", "==", id)
  );

export const addTodo = async (todo: ITodo) => {
  try {
    const newTodo = await addDoc(todoCollection, todo);
    console.log("Add Todo", todo);
    return newTodo;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateTodo = async ({ id, ...todo }: ITodo) => {
  try {
    const updateTodo = await updateDoc(doc(db, "todos", id), todo);
    console.log("Update Todo", todo);
    return updateTodo;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getTodo = async (id: string) => {
  try {
    const todo = await getDoc(
      doc(db, "todos", id).withConverter(converterTodo)
    );
    console.log("Update Todo", todo);
    return todo;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteTodo = async ({ id }: ITodo) => {
  try {
    await deleteDoc(doc(db, "todos", id));
    console.log("Delete Todo", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export function useGetAllTodo(isDoneView: boolean) {
  const [data, setData] = useState<ITodo[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (isDoneView) {
      const unSubTodo = onSnapshot(
        doneQuery("dicky46darmawan@gmail.com"),
        (doc) => {
          const todos = doc.docs.map((v) => v.data());
          setData(todos);
          setLoading(false);
        }
      );

      return unSubTodo;
    }

    const unSubTodo = onSnapshot(
      todoQuery("dicky46darmawan@gmail.com"),
      (doc) => {
        const todos = doc.docs.map((v) => v.data());
        setData(todos);
        setLoading(false);
      }
    );

    return unSubTodo;
  }, []);

  return {
    data,
    isEmpty: data.length === 0,
    setData,
    isLoading,
    setLoading,
  };
}

export const defaultData: ITodo = {
  id: "New",
  descripsion: "",
  userId: "",
  isDone: false,
  title: "",
};

export function useGetTodo(id: string) {
  const [data, setData] = useState<ITodo>(defaultData);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id !== "New") {
      setLoading(true);
      getTodo(id).then((todo) => {
        setData((value) => todo?.data() ?? value);
        setLoading(false);
      });
    }
  }, []);

  return {
    data,
    setData,
    isLoading,
    setLoading,
  };
}
