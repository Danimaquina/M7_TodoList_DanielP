import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Pantalla Principal</Text>
      <Button
        title="Ir a detalles"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
