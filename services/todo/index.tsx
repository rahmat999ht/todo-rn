import { useEffect, useState } from "react";
import { ITodo } from "../../types/Todo";
// import { db } from "../firebaseConfig";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "../../components/AuthProvider";

export const todoCollection = firestore().collection("todos");

export const doneQuery = (id: string) =>
  todoCollection.where("userId", "==", id).where("isDone", "==", true);

export const todoQuery = (id: string) =>
  todoCollection.where("userId", "==", id).where("isDone", "==", false);

export const addTodo = async (todo: ITodo) => {
  try {
    const newTodo = await todoCollection.add(todo);
    console.log("Add Todo", todo);
    return newTodo;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateTodo = async ({ id, ...todo }: ITodo) => {
  try {
    const updateTodo = await todoCollection.doc(id).set(todo);
    console.log("Update Todo", todo);
    return updateTodo;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getTodo = async (id: string) => {
  try {
    const todo = await todoCollection.doc(id).get();
    const data = todo.data();
    if (todo.exists && data) {
      return {
        userId: data["userId"],
        descripsion: data["descripsion"],
        isDone: data["isDone"],
        title: data["title"],
        id: todo.id,
      } satisfies ITodo;
    }
    console.log("Update Todo", todo);
    return defaultData;
  } catch (e) {
    console.error("Error adding document: ", e);
    return defaultData;
  }
};

export const deleteTodo = async ({ id }: ITodo) => {
  try {
    await todoCollection.doc(id).delete();
    console.log("Delete Todo", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export function useGetAllTodo(isDoneView: boolean) {
  const [data, setData] = useState<ITodo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);

    if (isDoneView) {
      doneQuery(user?.email ?? "").onSnapshot({
        next(doc) {
          const todos = doc.docs.map((snapshot) => {
            const data = snapshot.data();
            return {
              userId: data["userId"],
              descripsion: data["descripsion"],
              isDone: data["isDone"],
              title: data["title"],
              id: snapshot.id,
            };
          }) satisfies ITodo[];
          setData(todos);
          setLoading(false);
        },
        error(error) {
          console.log("error isDoneView", error);
          setLoading(false);
        },
      });

      // return () => unSubTodo();
    } else {
      todoQuery(user?.email ?? "").onSnapshot({
        next(doc) {
          const todos = doc.docs.map((snapshot) => {
            const data = snapshot.data();
            return {
              userId: data["userId"],
              descripsion: data["descripsion"],
              isDone: data["isDone"],
              title: data["title"],
              id: snapshot.id,
            };
          }) satisfies ITodo[];
          setData(todos);
          setLoading(false);
        },
        error(error) {
          console.log("error isDoneView", error);
          setLoading(false);
        },
      });

    }
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
        setData((value) => todo as ITodo);
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
