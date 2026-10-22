import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function ContactCard(props) {
  const { colors } = useTheme();

  //LOGICA DE LA TARJETA DE CONTACTO
  // siempre regresa jsx interfaz de usuario
  return (
    <View>
      <Text style={{ color: colors.text }}>Hola! {props.name}!</Text>
      <Text style={{ color: colors.secondary }}>Edad: {props.age} </Text>
      <Text style={{ color: colors.secondary }}>Teléfono: {props.telefono}</Text>
      <Text style={{ color: colors.secondary }}>Correo: {props.email}</Text>
    
    </View>
  );
}
