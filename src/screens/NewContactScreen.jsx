import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ContactForm from '../components/ContactForm';

export default function NewContactScreen({ navigation, onAddContact, onSaved }) {
  const { colors } = useTheme();

  const handleSave = (contactData) => {
    onAddContact(contactData);

    // Regresar a la lista de contactos
    if (onSaved) {
      onSaved();
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <ContactForm onSave={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
