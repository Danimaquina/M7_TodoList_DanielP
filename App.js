import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './screens/TaskListScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';

const Stack = createStackNavigator();

export default function App() {
  // Lista de tascas
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Comprar pa', date: '2024-11-20', completed: false },
    { id: '2', title: 'Fer esport', date: '2024-11-22', completed: true },
  ]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now().toString() }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pasamos tasks y setTasks como props a TaskListScreen */}
        <Stack.Screen name="TaskList">
          {(props) => <TaskListScreen {...props} tasks={tasks} setTasks={setTasks} />}
        </Stack.Screen>

        {/* Pasamos addTask como prop a CreateTaskScreen */}
        <Stack.Screen name="Creation">
          {(props) => <CreateTaskScreen {...props} addTask={addTask} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
