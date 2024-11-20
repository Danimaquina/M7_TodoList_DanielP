import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';

export default function CreateTaskScreen({ route, addTask, navigation }) {
  const { task, isEdit } = route.params || {}; // Obtenemos la tarea y el indicador de edición de los parámetros

  const [title, setTitle] = useState(task?.title || ''); // Si estamos editando, ponemos el título de la tarea
  const [date, setDate] = useState(new Date(task?.date || Date.now())); // Si estamos editando, ponemos la fecha de la tarea
  const [showPicker, setShowPicker] = useState(false);
  const [isDateEnabled, setIsDateEnabled] = useState(task?.date !== 'No hay data');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleSave = () => {
    // Verificamos si el título está vacío
    if (!title.trim()) {
      // Si el título está vacío, mostramos una alerta
      Alert.alert('Error', 'El título de la tarea no puede estar vacío.');
      return; // No continuamos con el guardado
    }

    // Verificampos si podemos poner una data
    const taskDate = isDateEnabled ? date.toISOString().split('T')[0] : 'No hay data';

    if (isEdit) {
      // Si estamos editando, actualizamos la tarea en la lista
      const updatedTask = {
        ...task,
        title,
        date: taskDate,
      };
      addTask(updatedTask); // Usamos la misma función para añadir la tarea (actualizada)
    } else {
      // Si estamos creando una nueva tarea
      const newTask = {
        id: Date.now().toString(),
        title,
        date: taskDate,
        completed: false,
      };
      addTask(newTask); // Añadimos la tarea
    }

    navigation.goBack(); // Volver a la pantalla de lista de tareas
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDate(new Date(task.date));
      setIsDateEnabled(task.date !== 'No hay data');
    }
  }, [task]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Títol de la Tasca:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escriu el títol..."
        value={title}
        onChangeText={setTitle}
      />
      
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={isDateEnabled ? 'checked' : 'unchecked'}
          onPress={() => setIsDateEnabled(!isDateEnabled)}
        />
        <Text style={styles.checkboxLabel}>Assignar una data</Text>
      </View>

      {isDateEnabled && (
        <>
          <Button title="Seleccionar Data" onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Text style={styles.selectedDate}>
            Data seleccionada: {date.toISOString().split('T')[0]}
          </Text>
        </>
      )}

      <Button title={isEdit ? "Actualizar Tasca" : "Guardar Tasca"} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5, marginBottom: 16 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkboxLabel: { fontSize: 16, marginLeft: 8 },
  selectedDate: { fontSize: 14, color: '#555', marginTop: 10 },
});
