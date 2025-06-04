import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function StatusHandler({status, error, noticiasLength}: {status: string, error?: string | null, noticiasLength: number}) {
  if (status === 'loading') {
    return(
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0072AE" />
        <Text style={styles.loadingText}>Carregando notícias</Text>
      </View>
    )
  }
  if (status === 'failed') {
    return(
    <View style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar notícias: {error}</Text>
    </View>
    )
  }
  if (noticiasLength === 0) {
    return(
    <View style={styles.centered}>
        <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
    </View>
    )
  }

  return null;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0072AE',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default StatusHandler;