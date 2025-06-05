import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Dimensions, Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormataData } from "src/utils/formataData";
import { addFavorito, isFavorito, removeFavorito } from "src/utils/storage";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get('window').width;

export default function DetalheScreen() {
  const route = useRoute<RouteProp<{params: {noticia: any}}, 'params'>>();
  const [favoritado, setFavoritado] = useState(false)
  const navigation = useNavigation()
  const {noticia} = route.params
  const insets = useSafeAreaInsets()

  const content = typeof noticia.content === 'string' ? noticia.content : '';

  const markerIndex = content.indexOf('[+');

  const textoLimpo = markerIndex !== -1 ? noticia.content.slice(0, markerIndex) : noticia.content;
  const dataFormatada: string = (FormataData(noticia.publishedAt))

  const openURL = (url: any) => {
    Linking.openURL(url).catch((err: any) => console.error('An error occurred', err));
  }

  useEffect(() => {
    const verificarFavorito = async () => {
      const existe = await isFavorito(noticia)
      setFavoritado(existe)
    };
    verificarFavorito()
  }, [])

  const handleFavoritar = async () => {
  if (favoritado) {
    await removeFavorito(noticia);
  } else {
    await addFavorito(noticia);
  }
  const existe = await isFavorito(noticia)
  setFavoritado(existe)
};

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <LinearGradient
        colors={['rgba(0, 0, 0, 0.72)', 'transparent']}
        style={styles.topGradientOverlay}
        />
      {noticia.urlToImage ? (
        <Image source={{ uri: noticia.urlToImage }} style={styles.image} />
      ) : (
        <View style={styles.noImageContent}>
          <Ionicons name="image" size={34} color="#666" />
          <Text style={styles.noImageText}>Imagem não disponível</Text>
        </View>
      )}
      <View style={[styles.btnHeader, {top: insets.top}]}>
        <View style={styles.voltarBtn}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name='chevron-back'
              size={24}
              color={'#888'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.favoritoBtn}>
          <TouchableOpacity onPress={handleFavoritar}>
            <Ionicons
              name={favoritado ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={favoritado ? '#f0c330' : '#888'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <Text>Publicado por {''}
            <Text style={{fontWeight: 'bold'}}>{noticia.source.name}</Text>
          </Text>
          <Text>{dataFormatada}</Text>
        </View>
        <Text style={styles.title}>{noticia.title}</Text>
        <Text style={styles.description}>{noticia.description}</Text>
        <Text style={styles.content}>{textoLimpo || 'Texto não disponível.'}</Text>
        <Button title="Ler Noticia Completa" onPress={() => openURL(noticia.url)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    position: 'relative',
  },
  bodyContainer:{
    padding: 16
  },
  btnHeader:{
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 999
  },
  favoritoBtn: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  voltarBtn: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: {
    width: windowWidth, 
    height: 350, 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginVertical: 8 
  },
  description: {
    fontSize: 16, 
    marginBottom: 8 
  },
  content: { 
    fontSize: 14, 
    color: '#444'
  },
  noImageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
    height: 200,
    backgroundColor: '#dedede',
  },
  noImageText: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  topGradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '18%',
    zIndex: 999,
  },
});