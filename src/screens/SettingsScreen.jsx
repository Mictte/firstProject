import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function SettingsScreen({ onChangeTheme }) {
  const { dark, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Configuración</Text>

      <View style={[styles.option, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.optionText}>
          <Text style={[styles.text, { color: colors.text }]}>Modo oscuro</Text>
          <Text style={[styles.description, { color: colors.secondary }]}>
            Cambiar la apariencia de la aplicación.
          </Text>
        </View>

        <Switch value={dark} onValueChange={onChangeTheme} trackColor={{ false: '#cbd5e1', true: '#2563eb' }} thumbColor="#ffffff" />
      </View>

      <Text style={[styles.description, { color: colors.secondary }]}>
        Tema actual: {dark ? 'Oscuro' : 'Claro'}
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

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },

  optionText: {
    flex: 1,
    marginRight: 12,
  },

  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#64748b',
  },
});
