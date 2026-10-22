import { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import ContactCard from '../components/ContactCard';

export default function ContactListScreen({ navigation, contacts }) {
  const [search, setSearch] = useState('');
  const { colors } = useTheme();

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.name} ${contact.lastName}`;
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.searchInput, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text }]}
        placeholder="Buscar contacto..."
        placeholderTextColor={colors.secondary}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate('EditContact', { contactId: item.id })}
          >
            <ContactCard name={`${item.name} ${item.lastName}`} age={item.age} telefono={item.phone} email={item.email} />
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.secondary }]}>No se encontraron contactos.</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      <Pressable style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('NewContact')}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Agregar contacto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },

  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  listContent: {
    paddingBottom: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },

  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 24,
  },

  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
