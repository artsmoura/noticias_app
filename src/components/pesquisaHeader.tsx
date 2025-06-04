import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PesquisaHeader() {
  const [visible, setVisible] = useState(false);
  const [termo, setTermo] = useState("");
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = () => {
    if (!termo.trim()) return;
    setVisible(false);
    Keyboard.dismiss();
    navigation.navigate("Resultados", { q: termo });
    setTermo("");
  };

  return (
    <>
      <TouchableOpacity 
        onPress={() => {
          if(visible) {
            setVisible(false)
            Keyboard.dismiss()
          } else {
            setVisible(true)
          }
        }} 
        style={{ paddingRight: 15 }}
      >
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss()
          setVisible(false)
        }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Buscar..."
                placeholderTextColor="#888"
                value={termo}
                onChangeText={setTermo}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                style={styles.input}
                autoFocus
              />
              <TouchableOpacity onPress={handleSearch}>
                <Ionicons name="arrow-forward" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "ios" ? 100 : 80,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
    marginRight: 10,
  },
});
