import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoticiaItem from "src/components/noticiaItem";
import StatusHandler from "src/components/statusIndicator";
import { pesquisaNoticias, resetPesquisa } from "src/redux/pesquisaSlice";
import { RootState } from "src/redux/store";
import { RootStackParamList } from "src/types/navigation";
import { NoticiasType } from "src/types/noticias";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ResultadoScreen({route}: any) {
  const dispatch = useDispatch<any>()
  const { noticias, status, error, page, hasMore} = useSelector((state: RootState) => state.pesquisa)
  const {q} = route.params
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useFocusEffect(useCallback(() => {
    dispatch(resetPesquisa())
    dispatch(pesquisaNoticias({q, page: 1}))
  }, [q]))

  const loadMore = () => {
    if (status !== 'loading' && hasMore) {
      dispatch(pesquisaNoticias({q, page: page + 1}))
    }
  }

  const isLoading = status === 'loading';
    
  const renderItem = ({ item }: { item: NoticiasType }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { noticia: item })}>
      <NoticiaItem noticia={item} />
    </TouchableOpacity>
  )
  
    return (
      <SafeAreaView>
        <View>
          <StatusHandler status={status} error={error} noticiasLength={noticias.length} />
          {noticias.length > 0 && (
            <FlatList
              data={noticias}
              keyExtractor={(_, i) => i.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 100 }}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isLoading ? <ActivityIndicator /> : null
              }
            />
          )}
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute', 
    top: '50%', 
    alignSelf: 'center'
  }
})