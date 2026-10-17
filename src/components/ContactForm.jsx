import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native';
//
import{ useState } from 'react';


//CoontactForm es nuestro componente reutilizable 
//export defaullt Permite importalo en otros archivos
export default function ContactForm() {
// para almacenar los datos ingresados.
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // funcion para visualizar la informacion entrante
    const handleSubmit = () => {
        console.log('Datos del formulario:',{
            name,
            lastName,
            age,
            phone,
            email
        });
    };
//Funcion para limpiar el formularioo 
    const handleClear =()=>{
        setName('');
        setLastName('');
        setAge('');
        setPhone('');
        setEmail('');
    };



  return (
    <View style={styles.formContainer}>
        <Image
        source={require('../../assets/bulbasur.png')}
        style={styles.pokemonImage}
        />


      <Text>Registro de contacto</Text>

      <Text>Nombre:</Text>
      <TextInput style={styles.input} placeholder="Ingresa tu Nombre" value={name} onChangeText={setName} />

      <Text>Apellido:</Text>
      <TextInput style={styles.input} placeholder="Ingresa tu Apellido" value={lastName} onChangeText={setLastName} />

      <Text>Edad:</Text>
      <TextInput style={styles.input} placeholder="Ingresa tu Edad" keyboardType="numeric" value={age} onChangeText={setAge} />

      <Text>Teléfono:</Text>
      <TextInput style={styles.input} placeholder="Ingresa tu teléfono" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

      <Text>Correo:</Text>
      <TextInput style={styles.input} placeholder="Ingresa tu correo" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      
      <Button title="Guardar" onPress={handleSubmit} color="#2563eb" />

      <View style={styles.clearButtonContainer}>
        <Button title='Limpiar' onPress={handleClear}color="#64748b"/>
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
  clearButtonContainer:{
    marginTop:10,
  },
});