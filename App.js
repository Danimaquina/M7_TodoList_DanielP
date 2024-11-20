import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { db } from './ConfigFirebase'; 
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'; // Funciones de Firestore
import TaskListScreen from './screens/TaskListScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';

const Stack = createStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  // Función para obtener las tareas desde Firestore
  const fetchTasks = async () => {
    const tasksCol = collection(db, 'tasks'); // Obtener la colección "tasks"
    const taskSnapshot = await getDocs(tasksCol); // Obtener los documentos de la colección
    const taskList = taskSnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data(), // Añadir los datos del documento
    }));
    setTasks(taskList); // Guardar las tareas en el estado
  };

  // Función para actualizar una tarea 
  const updateTask = async (id, updatedTask) => {
    try {
      const taskDoc = doc(db, "tasks", id); // Obtener la referencia del documento en Firestore
      await updateDoc(taskDoc, updatedTask); // Actualizar el campo "completed"
      console.log('Tarea actualizada');
      fetchTasks(); // Volver a cargar las tareas
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    try {
      const taskDoc = doc(db, "tasks", id); // Obtener la referencia del documento
      await deleteDoc(taskDoc); // Eliminar el documento
      console.log('Tarea eliminada');
      fetchTasks(); // Volver a cargar las tareas
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Función para añadir una nueva tarea
  const addTask = async (task) => {
    try {
      const newTaskRef = await addDoc(collection(db, "tasks"), task); // Añadir tarea a Firestore
      console.log('Tarea añadida', newTaskRef.id);
      fetchTasks(); // Vuelve a obtener las tareas desde Firestore
    } catch (error) {
      console.error("Error al añadir la tarea:", error);
    }
  };

  // Cargar las tareas al iniciar la aplicación
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskList">
          {props => (
            <TaskListScreen 
              {...props} 
              tasks={tasks} 
              setTasks={setTasks} 
              updateTask={updateTask} // Pasamos la función para actualizar la tarea
              deleteTask={deleteTask} // Pasamos la función para eliminar la tarea
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Creation">
          {props => (
            <CreateTaskScreen 
              {...props} 
              addTask={addTask} // Pasamos la función para añadir la tarea
              updateTask={updateTask} // Pasamos la función para actualizar la tarea
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
