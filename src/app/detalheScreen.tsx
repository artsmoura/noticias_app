import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Image, Linking, ScrollView, StyleSheet, Text } from "react-native";

export default function DetalheScreen() {
  const route = useRoute<RouteProp<{params: {noticia: any}}, 'params'>>();
  const navigation = useNavigation()
  const {noticia} = route.params

  const content = typeof noticia.content === 'string' ? noticia.content : '';

  const markerIndex = content.indexOf('[+');

  const textoLimpo = markerIndex !== -1 ? noticia.content.slice(0, markerIndex) : noticia.content;

  const openURL = (url: any) => {
    Linking.openURL(url).catch((err: any) => console.error('An error occurred', err));
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: noticia.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{noticia.title}</Text>
      <Text style={styles.description}>{noticia.description}</Text>
      <Text style={styles.content}>{textoLimpo || 'Texto não disponível.'}</Text>
      <Button title="Ler Noticia Completa" onPress={() => openURL(noticia.url)} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  description: { fontSize: 16, marginBottom: 8 },
  content: { fontSize: 14, color: '#444' },
});