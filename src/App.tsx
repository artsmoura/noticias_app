import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from './app/homeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import { NavigationContainer } from '@react-navigation/native';
import DetalheScreen from './app/detalheScreen';
import PesquisaHeader from './components/pesquisaHeader';
import ResultadoScreen from './app/resultadoScreen';
import { MaisNoticiasScreen } from './app/maisNoticias';
import categoriaNomes from './constants/categoriaNomes';

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
          }}
        >
          <Stack.Screen 
            name="Home" component={HomeScreen}
            options={{
              headerTitle: 'Notícias',
              headerRight: () => <PesquisaHeader />,
            }} 
          />
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
      </NavigationContainer>
    </Provider>
  );
}