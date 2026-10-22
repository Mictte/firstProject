import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import ContactListScreen from './src/screens/ContactListScreen';
import NewContactScreen from './src/screens/NewContactScreen';
import EditContactScreen from './src/screens/EditContactScreen';
import InformationScreen from './src/screens/InformationScreen';
import HelpScreen from './src/screens/HelpScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Colores para el tema claro
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563eb',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
    border: '#e2e8f0',
    notification: '#dc2626',
    secondary: '#64748b',
    input: '#ffffff',
    buttonText: '#ffffff',
  },
};

// Colores para el tema oscuro
const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#2563eb',
    background: '#0f172a',
    card: '#1e293b',
    text: '#f1f5f9',
    border: '#334155',
    notification: '#f87171',
    secondary: '#94a3b8',
    input: '#1e293b',
    buttonText: '#ffffff',
  },
};

const initialContacts = [
  {
    id: '1',
    name: 'Daniel',
    lastName: 'Castro',
    age: '30',
    phone: '664-119-2020',
    email: 'DanyBoy@example.com',
  },
  {
    id: '2',
    name: 'Ana',
    lastName: 'Amezcua',
    age: '45',
    phone: '663-999-8055',
    email: 'macaria@example.com',
  },
  {
    id: '3',
    name: 'Karina',
    lastName: 'Mondragon',
    age: '31',
    phone: '664-776-8989',
    email: 'mictte@example.com',
  },
];

// Navegacion para consultar, agregar y editar contactos
function ContactsStack({ contacts, onAddContact, onUpdateContact }) {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={({ navigation, route }) => ({
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
        headerLeft: () => (
          <View style={styles.headerButtons}>
            <Pressable onPress={() => navigation.getParent('MainDrawer')?.openDrawer()} accessibilityLabel="Abrir menú">
              <Ionicons name="menu" size={26} color={colors.text} />
            </Pressable>

            {route.name !== 'Contacts' && (
              <Pressable onPress={() => navigation.goBack()} accessibilityLabel="Regresar">
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </Pressable>
            )}
          </View>
        ),
      })}
    >
      <Stack.Screen name="Contacts" options={{ title: 'Contactos' }}>
        {(props) => <ContactListScreen {...props} contacts={contacts} />}
      </Stack.Screen>

      <Stack.Screen name="NewContact" options={{ title: 'Nuevo contacto' }}>
        {(props) => <NewContactScreen {...props} onAddContact={onAddContact} />}
      </Stack.Screen>

      <Stack.Screen name="EditContact" options={{ title: 'Editar contacto' }}>
        {(props) => <EditContactScreen {...props} contacts={contacts} onUpdateContact={onUpdateContact} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Tabs
function MainTabs({ contacts, onAddContact, onUpdateContact, onChangeTheme }) {
  const { colors } = useTheme();
  const [newContactKey, setNewContactKey] = useState(0);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerLeft: () => (
          <Pressable style={styles.menuButton} onPress={() => navigation.getParent('MainDrawer')?.openDrawer()} accessibilityLabel="Abrir menú">
            <Ionicons name="menu" size={26} color={colors.text} />
          </Pressable>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'NewContactTab') iconName = 'person-add-outline';
          if (route.name === 'SettingsTab') iconName = 'settings-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" options={{ title: 'Home', headerShown: false }}>
        {() => <ContactsStack contacts={contacts} onAddContact={onAddContact} onUpdateContact={onUpdateContact} />}
      </Tab.Screen>

      <Tab.Screen name="NewContactTab" options={{ title: 'Nuevo contacto' }}>
        {(props) => (
          <NewContactScreen
            {...props}
            key={newContactKey}
            onAddContact={onAddContact}
            onSaved={() => {
              setNewContactKey((previousKey) => previousKey + 1);
              props.navigation.navigate('Home');
            }}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="SettingsTab" options={{ title: 'Configuración' }}>
        {(props) => <SettingsScreen {...props} onChangeTheme={onChangeTheme} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [isDark, setIsDark] = useState(false);

  const currentTheme = isDark ? darkTheme : lightTheme;

  // Agregar un nuevo contacto a la lsta
  const handleAddContact = (newContact) => {
    const contact = {
      ...newContact,
      id: Date.now().toString(),
    };

    setContacts((previousContacts) => [
      ...previousContacts,
      contact,
    ]);
  };

  // Actualizar los datos de un contacto existente
  const handleUpdateContact = (updatedContact) => {
    setContacts((previousContacts) =>
      previousContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer theme={currentTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <Drawer.Navigator
          id="MainDrawer"
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: currentTheme.colors.card },
            headerTintColor: currentTheme.colors.text,
            drawerActiveTintColor: currentTheme.colors.primary,
            drawerInactiveTintColor: currentTheme.colors.secondary,
            drawerStyle: { backgroundColor: currentTheme.colors.card },
          }}
        >
          <Drawer.Screen name="Home" options={{ title: 'Contactos', headerShown: false, drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} /> }}>
            {() => <MainTabs contacts={contacts} onAddContact={handleAddContact} onUpdateContact={handleUpdateContact} onChangeTheme={setIsDark} />}
          </Drawer.Screen>

          <Drawer.Screen name="Information" component={InformationScreen} options={{ title: 'Información', drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} /> }} />

          <Drawer.Screen name="Help" component={HelpScreen} options={{ title: 'Ayuda', drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} /> }} />

          <Drawer.Screen name="Settings" options={{ title: 'Configuración', drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }}>
            {(props) => <SettingsScreen {...props} onChangeTheme={setIsDark} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginRight: 12,
  },

  menuButton: {
    marginLeft: 16,
  },
});
