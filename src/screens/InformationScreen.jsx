import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function InformationScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Información de la aplicación</Text>

      <Text style={[styles.text, { color: colors.text }]}>Nombre: firstProject - Contactos</Text>
      <Text style={[styles.text, { color: colors.text }]}>Versión: 1.0.0</Text>
      <Text style={[styles.text, { color: colors.text }]}>Autores: Mondragon Karina - Castro Romero </Text>

      <Text style={[styles.description, { color: colors.secondary }]}>
        Aplicación desarrollada con React Native y Expo para administrar una lista de contactos mediante navegación entre pantallas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 20,
    lineHeight: 24,
  },
});
