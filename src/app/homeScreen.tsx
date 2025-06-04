import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StyleSheet, ScrollView, View, FlatList, Text, RefreshControl, ActivityIndicator, Animated, useAnimatedValue, useWindowDimensions, ImageBackground, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoticiaItem from "src/components/noticiaItem";
import categoriaNomes from "src/constants/categoriaNomes";
import { buscarNoticias, resetNoticias, resetPagina } from "src/redux/newsSlice";
import { RootState } from "src/redux/store";
import { RootStackParamList } from "src/types/navigation";
import { NoticiasType } from "src/types/noticias";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const dispatch = useDispatch<any>()
  const { noticias, status, error} = useSelector((state: RootState) => state.noticias.home)
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const safeAreaTab = useSafeAreaInsets()

  const categorias = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  const loadData = () => {
    dispatch(resetNoticias({ target: 'home' }))
    dispatch(resetPagina({ target: 'home' }))
    dispatch(buscarNoticias({ country: 'us', target: 'home' }))
  }

  useEffect(() => {
    loadData()
  }, [])

  const renderItem = ({ item }: { item: NoticiasType }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { noticia: item })}>
      <NoticiaItem noticia={item} />
    </TouchableOpacity>
  )

  const scrollX = useAnimatedValue(0);

  const carroselArray = noticias.slice(0, 4)
  const flatListArray = noticias.slice(4, 9); 

  const isLoading = status === 'loading';

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {status === 'failed' && <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{error}</Text>}

            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            >
              {carroselArray.map((noticia, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('Detalhes', { noticia })}>
                  <ImageBackground
                    source={{ uri: noticia.urlToImage }}
                    style={styles.cardImage}
                    imageStyle={styles.imageStyle}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.infoText}>{noticia.title}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView
              style={styles.categorias}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categorias.map((categoria) => (
                <TouchableOpacity
                  key={categoria}
                  style={styles.categoriaBtn}
                  onPress={() => navigation.navigate('MaisNoticias', { categoria })}
                >
                  <Text style={styles.categoriaText}>
                    {categoriaNomes[categoria] || categoria}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        }
        style={{ flex: 1 }}
        data={flatListArray}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadData} />
        }
        ListEmptyComponent={
          !isLoading ? <Text style={{ textAlign: 'center' }}>Nenhuma notícia encontrada.</Text> : null
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.btnVerMais}
            onPress={() => navigation.navigate('MaisNoticias', {})}
          >
            <Text style={styles.verMais}>Mais Notícias</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  cardImage: {
    height: 220,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: windowWidth
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  btnVerMais: {
    padding: 16,
    alignItems: 'center',
  },
  verMais: {
    color: '#007BFF', 
    fontSize: 16
  },
  categorias: {
    marginVertical: 10,
    paddingHorizontal: 5,
    minHeight: 35
  },
  categoriaBtn: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10,
    maxHeight: 32
  },
  categoriaText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  loading: {
    position: 'absolute', 
    top: '50%', 
    alignSelf: 'center'
  },
  imageStyle: {
    resizeMode: 'cover'
  }
});
