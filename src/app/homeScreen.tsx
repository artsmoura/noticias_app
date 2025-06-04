import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StyleSheet, ScrollView, View, FlatList, Text, RefreshControl, ActivityIndicator, Animated, useAnimatedValue, useWindowDimensions, ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoticiaItem from "src/components/noticiaItem";
import categoriaNomes from "src/constants/categoriaNomes";
import { buscarNoticias, resetNoticias, resetPagina } from "src/redux/newsSlice";
import { RootState } from "src/redux/store";
import { RootStackParamList } from "src/types/navigation";
import { NoticiasType } from "src/types/noticias";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const dispatch = useDispatch<any>()
  const { noticias, status, error} = useSelector((state: RootState) => state.noticias.home)
  const navigation = useNavigation<HomeScreenNavigationProp>();

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

  const {width: windowWidth} = useWindowDimensions();

  const carroselArray = noticias.slice(0, 4)
  const flatListArray = noticias.slice(4, 9); 

  const isLoading = status === 'loading';

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {status === 'failed' && <Text style={{ color: 'red' }}>{error}</Text>}
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ], { useNativeDriver: false })}
          scrollEventThrottle={1}>
            {carroselArray.map((noticia, NoticiaIndex) => {
                return (
                  <TouchableOpacity key={NoticiaIndex} onPress={() => navigation.navigate('Detalhes', { noticia })}>
                    <View
                      style={{width: windowWidth, height: 250}}
                      key={NoticiaIndex}>
                      <ImageBackground 
                        source={{uri: noticia.urlToImage}} 
                        style={styles.card}>
                        <View style={styles.textContainer}>
                          <Text style={styles.infoText}>
                            {noticia.title}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                );
              })}
        </ScrollView>
        <ScrollView
          style={styles.categorias}
          horizontal
          showsVerticalScrollIndicator = {false}
        >
          {categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria}
              style={styles.categoriaBtn}
              onPress={() => navigation.navigate('MaisNoticias', {categoria})}
            >
              <Text style={styles.categoriaText}>
                {categoriaNomes[categoria] || categorias}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
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
              <Text style={styles.verMais}>Mais Noticias</Text>
            </TouchableOpacity>
          }
        />
        {isLoading && <ActivityIndicator size="large" style={ styles.loading } />}
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
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
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 45
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
  }
});
