import {View, Text} from 'react-native';


export default function ContactCard(props){
    //LOGICA DE LA TARJETA DE CONTACTO
    // siempre regresa jsx interfaz de usuario
return (
    <View>
        <Text>Hola {props.name}!</Text>
        <Text>Teléfono: {props.telefono}</Text>
    </View>
);
}