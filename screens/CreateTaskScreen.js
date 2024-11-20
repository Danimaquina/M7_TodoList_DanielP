import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';

export default function CreateTaskScreen({ route, addTask, updateTask, navigation }) {
  const { task, isEdit } = route.params || {};  // Obtenemos la tarea y el indicador de edición

  const [title, setTitle] = useState(task?.title || '');  // Si estamos editando, ponemos el título de la tarea
  const [date, setDate] = useState(new Date(task?.date || Date.now()));  // Si estamos editando, ponemos la fecha de la tarea
  const [showPicker, setShowPicker] = useState(false);
  const [isDateEnabled, setIsDateEnabled] = useState(task?.date !== 'No hay data');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  // En caso de que no haya titulo
  const handleSave = async () => {
    if (!title.trim()) {
      alert("Por favor, ingrese un título para la tarea.");
      return;
    }

    const taskDate = isDateEnabled ? date.toISOString().split('T')[0] : 'No hay data';

    if (isEdit) {
      // Si estamos editando, actualizamos la tarea
      const updatedTask = {
        title,
        date: taskDate,
      };
      await updateTask(task.id, updatedTask); // Llamar a la función para actualizar
    } else {
      // Si estamos creando una nueva tarea
      const newTask = {
        title,
        date: taskDate,
        completed: false,
      };
      await addTask(newTask); // Llamar a la función para agregar la nueva tarea
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
