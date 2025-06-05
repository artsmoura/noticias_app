import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoticiaItem from "src/components/noticiaItem";
import { buscarNoticias, resetNoticias, resetPagina } from "src/redux/newsSlice";
import { RootState } from "src/redux/store";
import { RootStackParamList } from "src/types/navigation";
import { NoticiasType } from "src/types/noticias";

type MaisNoticiasRouteProp = RouteProp<RootStackParamList, 'MaisNoticias'>
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;


export function MaisNoticiasScreen() {
  const dispatch = useDispatch<any>()
  const { noticias, status, page, hasMore } = useSelector((state: RootState) => state.noticias.maisNoticiaState)
  const route = useRoute<MaisNoticiasRouteProp>()
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const categoria = route.params?.categoria

  const flatListArray = (route.params && Object.keys(route.params).length > 0) ? noticias : noticias.slice(9);

  useFocusEffect(
    useCallback(() => {
      console.log('esta chegando aqui e a categoira eh: ', categoria)
      dispatch(resetNoticias({ target: 'maisNoticiaState' }))
      dispatch(resetPagina({ target: 'maisNoticiaState' }))
      dispatch(buscarNoticias({ country: 'us', category: categoria, page: 1, target: 'maisNoticiaState' }))
    }, [categoria])
  )

  const loadMore = () => {
    if (status !== 'loading' && hasMore) {
      dispatch(buscarNoticias({country: 'us', category: categoria, page: page + 1, target: 'maisNoticiaState'}))
    }
  }

  const renderItem = ({ item }: { item: NoticiasType }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { noticia: item })}>
        <NoticiaItem noticia={item} />
      </TouchableOpacity>
    )

  return (
    <FlatList
      data={flatListArray}
      keyExtractor={(_, i) => i.toString()}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        status === 'loading' ? <ActivityIndicator /> : null
      }
    />
  )
}