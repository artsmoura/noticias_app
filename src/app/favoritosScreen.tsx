import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import NoticiaItem from "src/components/noticiaItem";
import { RootStackParamList } from "src/types/navigation";
import { NoticiasType } from "src/types/noticias";
import { getFavoritos } from "src/utils/storage";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState<NoticiasType[]>([])
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      const buscaFavoritos = async () => {
        const data = await getFavoritos()
        setFavoritos(data)
      }
      buscaFavoritos()
    }, [])
  )

  if (favoritos.length === 0) {
    return <Text>Nenhuma Noticia Encontrada</Text>
  }

  const renderItem = ({ item }: { item: NoticiasType }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { noticia: item })}>
      <NoticiaItem noticia={item} />
    </TouchableOpacity>
  )

  return (
      <FlatList
        data={favoritos}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
      />
    )
}