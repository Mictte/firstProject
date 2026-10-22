import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function HelpScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Ayuda</Text>

      <Text style={[styles.text, { color: colors.secondary }]}>Esta aplicación permite consultar, agregar y editar contactos.</Text>

      <Text style={[styles.subtitle, { color: colors.text }]}>¿Cómo utilizarla?</Text>

      <Text style={[styles.text, { color: colors.secondary }]}>1. En Contactos puedes consultar la lista y buscar por nombre.</Text>
      <Text style={[styles.text, { color: colors.secondary }]}>2. Presiona Agregar contacto para registrar uno nuevo.</Text>
      <Text style={[styles.text, { color: colors.secondary }]}>3. Selecciona un contacto para modificar su información.</Text>
      <Text style={[styles.text, { color: colors.secondary }]}>4. Utiliza Guardar para registrar los cambios o Limpiar para borrar los campos del formulario.</Text>
      <Text style={[styles.text, { color: colors.secondary }]}>5. Abre el menú hamburguesa para acceder a Información, Ayuda y Configuración.</Text>
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

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 12,
  },

  text: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 12,
    lineHeight: 23,
  },
});
