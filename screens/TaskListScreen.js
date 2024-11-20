import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function TaskListScreen({ tasks, setTasks, navigation }) {

  // Funcion para detectar y modificar las tascas que se maquen como completadas
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    // Mostramos una alerta de confirmación
    Alert.alert(
      'Confirmar eliminación', 
      '¿Estás seguro de que quieres eliminar esta tarea?', 
      [
        {
          text: 'Cancelar', // Botón de cancelación
          onPress: () => console.log('Eliminación cancelada'), // Acción de cancelación
          style: 'cancel', 
        },
        {
          text: 'Eliminar', // Botón de confirmación
          onPress: () => {
            // Acción para eliminar la tarea
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            console.log('Tarea eliminada');
          },
        },
      ],
      { cancelable: true } // Permite cerrar la alerta tocando fuera de ella
    );
  };

  // Función para editar una tarea
  const editTask = (task) => {
    // Navegar a la pantalla de creación con la tarea que se quiere editar
    navigation.navigate('Creation', {
      task: task, // Pasa la tarea completa como parámetro
      isEdit: true, // Indicamos que estamos editando, no creando
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
              onPress={() => toggleTaskCompletion(item.id)}
            />
            <View style={styles.taskDetails}>
              <Text style={styles.taskTitle}>{item.completed ? <Text style={{ textDecorationLine: 'line-through' }}>{item.title}</Text> : item.title}</Text>
              <Text style={styles.taskDate}>{item.date}</Text>
            </View>

            <TouchableOpacity onPress={() => editTask(item)}  style={styles.EditButton}>
              <Text style={styles.EditText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>

          </View>
        )}
      />
      <Button
        title="Crear Nova Tasca"
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
