import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoticiaItem from "src/components/noticiaItem";
import StatusHandler from "src/components/statusIndicator";
import { pesquisaNoticias } from "src/redux/pesquisaSlice";
import { RootState } from "src/redux/store";
import { RootStackParamList } from "src/types/navigation";
import { NoticiasType } from "src/types/noticias";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ResultadoScreen({route}: any) {
  const dispatch = useDispatch<any>()
  const { noticias, status, error} = useSelector((state: RootState) => state.pesquisa)
  const {q} = route.params
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const loadData = () => {
   dispatch(pesquisaNoticias({q}))
  }
  
  useEffect(() => {
    loadData()
  }, [q])

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
          {status === 'succeeded' && noticias.length > 0 && (
            <FlatList
              data={noticias}
              keyExtractor={(_, i) => i.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
          {isLoading && <ActivityIndicator size="large" style={ styles.loading } />}
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