import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView } from "react-native";
import ContactForm from './src/components/ContactForm';

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <ContactForm/>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:'#eef2f8',
  },

  container: {
    flexGrow: 1,
    alignItems:'center',
    justifyContent: "center",
    padding:20,
  },
});
