import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { NoticiasType } from "src/types/noticias";
import { FormataData } from "../utils/formataData"

export default function NoticiaItem({ noticia }: { noticia: NoticiasType }) {
  const dataFormatada: string = (FormataData(noticia.publishedAt))

  return (
    <View style={styles.container}>
      {noticia.urlToImage ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: noticia.urlToImage }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.noImageContainer}>
          <Feather name="image" size={24} color="#666" />
          <Text style={styles.noImageText}>Imagem não disponível</Text>
        </View>
      )}
      <View style={styles.textArea}>
        <Text style={styles.textSub}>{noticia.source.name}</Text>
        <Text style={styles.title}>{noticia.title}</Text>
        <Text style={styles.textSub}>{dataFormatada}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 10, 
    borderColor: '#ccc',
    flexDirection: 'row'
  },
  title: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  textArea: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#dedede',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  noImageText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  textSub: {
    color: 'grey'
  }
});