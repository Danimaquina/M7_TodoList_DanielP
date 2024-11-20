import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function TaskListScreen({ tasks, setTasks, navigation, updateTask, deleteTask }) {
  
  // Función para marcar la tarea como completada
  const toggleTaskCompletion = (id, completed) => {
    const updatedTask = { completed: !completed };

    // Actualizar Firestore
    updateTask(id, updatedTask);

    // Actualizar la lista de tareas localmente
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );
  };

  const deleteTaskHandler = (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Eliminación cancelada'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            // Llamar a la función para eliminar la tarea
            deleteTask(id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const editTask = (task) => {
    navigation.navigate('Creation', {
      task: task,
      isEdit: true,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Checkbox
              status={item.completed ? 'checked' : 'unchecked'}
              onPress={() => toggleTaskCompletion(item.id, item.completed)} // Pasar el id y completed
            />
            <View style={styles.taskDetails}>
              <Text style={styles.taskTitle}>
                {item.completed ? (
                  <Text style={{ textDecorationLine: 'line-through' }}>{item.title}</Text>
                ) : (
                  item.title
                )}
              </Text>
              <Text style={styles.taskDate}>{item.date}</Text>
            </View>

            <TouchableOpacity onPress={() => editTask(item)} style={styles.EditButton}>
              <Text style={styles.EditText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTaskHandler(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        title="Crear Nueva Tarea"
        onPress={() => navigation.navigate('Creation')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  task: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  taskDetails: { flex: 1, marginHorizontal: 10 },
  taskTitle: { fontSize: 16, fontWeight: 'bold' },
  taskDate: { fontSize: 14, color: '#888' },
  deleteButton: { padding: 5, backgroundColor: '#ff4d4d', borderRadius: 5 },
  EditButton: { padding: 5, backgroundColor: '#000000', borderRadius: 5 },
  deleteText: { color: 'white', fontWeight: 'bold' },
  EditText: { color: 'white', fontWeight: 'bold' },
});
