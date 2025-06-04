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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritosScreen from './app/favoritosScreen';
import { Ionicons } from '@expo/vector-icons';
import TabNavigation from './components/tabNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}