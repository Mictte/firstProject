import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import ContactForm from '../components/ContactForm';

export default function EditContactScreen({ navigation, route, contacts, onUpdateContact }) {
  const { colors } = useTheme();

  // Estado para guardar el contacto seleccionado
  const [selectedContact, setSelectedContact] = useState(undefined);

  const contactId = route.params?.contactId;

  // Cargar los datos del contacto seleccionado
  useEffect(() => {
    const contact = contacts.find((item) => item.id === contactId);
    setSelectedContact(contact ?? null);
  }, [contactId, contacts]);


  const handleSave = (contactData) => {
    const updatedContact = {
      ...contactData,
      id: selectedContact.id,
    };

    onUpdateContact(updatedContact);

    // Regresar a la lista de contactos
    navigation.goBack();
  };

  if (selectedContact === undefined) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Cargando contacto...</Text>
      </View>
    );
  }

  if (selectedContact === null) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>No se encontró el contacto.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <ContactForm key={selectedContact.id} initialContact={selectedContact} onSave={handleSave} />
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

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
