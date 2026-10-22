import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';

//CoontactForm es nuestro componente reutilizable
//export defaullt Permite importalo en otros archivos
export default function ContactForm({ onSave, initialContact = null }) {
  const { colors } = useTheme();

  // para almacenar los datos ingresados.
  const [name, setName] = useState(initialContact?.name ?? '');
  const [lastName, setLastName] = useState(initialContact?.lastName ?? '');
  const [age, setAge] = useState(initialContact?.age ?? '');
  const [phone, setPhone] = useState(initialContact?.phone ?? '');
  const [email, setEmail] = useState(initialContact?.email ?? '');
  const [error, setError] = useState('');

  //Guardar los datos del formulario
  const handleSubmit = () => {
    //validamos que se haya ingresado el nombre
    if (name.trim() === '') {
      setError('El nombre es oblgatorio.');
      return;
    }

    setError('');

    const contactData = {
      name: name.trim(),
      lastName: lastName.trim(),
      age: age.trim(),
      phone: phone.trim(),
      email: email.trim(),
    };

    // Envia el contacto a la pantalla padre
    onSave(contactData);
  };

  //Funcion para limpiar el formularioo
  const handleClear = () => {
    setName('');
    setLastName('');
    setAge('');
    setPhone('');
    setEmail('');
    setError('');
  };

  const inputColors = {
    backgroundColor: colors.input,
    borderColor: colors.border,
    color: colors.text,
  };

  return (
    <View style={[styles.formContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Image source={require('../../assets/bulbasur.png')} style={styles.pokemonImage} />

      <Text style={[styles.title, { color: colors.text }]}>{initialContact ? 'Editar contacto' : 'Registro de contacto'}</Text>

      <Text style={[styles.label, { color: colors.text }]}>Nombre:</Text>
      <TextInput style={[styles.input, inputColors]} placeholder="Ingresa tu Nombre" placeholderTextColor={colors.secondary} value={name} onChangeText={setName} />

      <Text style={[styles.label, { color: colors.text }]}>Apellido:</Text>
      <TextInput style={[styles.input, inputColors]} placeholder="Ingresa tu Apellido" placeholderTextColor={colors.secondary} value={lastName} onChangeText={setLastName} />

      <Text style={[styles.label, { color: colors.text }]}>Edad:</Text>
      <TextInput style={[styles.input, inputColors]} placeholder="Ingresa tu Edad" placeholderTextColor={colors.secondary} keyboardType="numeric" value={age} onChangeText={setAge} />

      <Text style={[styles.label, { color: colors.text }]}>Teléfono:</Text>
      <TextInput style={[styles.input, inputColors]} placeholder="Ingresa tu teléfono" placeholderTextColor={colors.secondary} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

      <Text style={[styles.label, { color: colors.text }]}>Correo:</Text>
      <TextInput style={[styles.input, inputColors]} placeholder="Ingresa tu correo" placeholderTextColor={colors.secondary} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

      {error !== '' && (
        <Text style={[styles.errorText, { color: colors.notification }]}>{error}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title={initialContact ? 'Guardar cambios' : 'Guardar'} onPress={handleSubmit} color={colors.primary} />
      </View>

      <View style={styles.clearButtonContainer}>
        <Button title="Limpiar" onPress={handleClear} color={colors.secondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  pokemonImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 12,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24344e',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#344054',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#1e293b',
  },

  buttonContainer: {
    marginTop: 8,
  },

  clearButtonContainer: {
    marginTop: 10,
  },

  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginBottom: 10,
  },
});
