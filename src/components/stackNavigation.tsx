import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/navigation";
import PesquisaHeader from "./pesquisaHeader";
import HomeScreen from "src/app/homeScreen";
import DetalheScreen from "src/app/detalheScreen";
import ResultadoScreen from "src/app/resultadoScreen";
import { MaisNoticiasScreen } from "src/app/maisNoticias";
import categoriaNomes from "src/constants/categoriaNomes";
import { useRoute } from "@react-navigation/native";
import FavoritosScreen from "src/app/favoritosScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function StackNavigation() {
  const route = useRoute()
  const isFavScreen = route.name === 'Favoritos' 

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: "#0072AE" 
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <PesquisaHeader />,
        headerTitle: "Notícias",
        headerBackButtonDisplayMode: "minimal"
      }}
    >
      {isFavScreen ? (
        <Stack.Screen 
          name="Favoritos" component={FavoritosScreen}
          options={{
            headerTitle: 'Favoritos',
          }} 
        />
      ) : (
        <Stack.Screen 
          name="Home" component={HomeScreen}
          options={{
            headerTitle: 'Notícias',
            headerRight: () => <PesquisaHeader />,
          }} 
        />
      )
      }
      <Stack.Screen name="Detalhes" component={DetalheScreen} />
      <Stack.Screen name="Resultados" component={ResultadoScreen} />
      <Stack.Screen 
        name="MaisNoticias"
        component={MaisNoticiasScreen}
        options={({ route }) => {
          const categoria = route.params?.categoria;
          return {
            headerTitle: categoria ? categoriaNomes[categoria] || 'Mais Notícias' : 'Mais Notícias',
          };
        }}
      />
    </Stack.Navigator>
  )
}