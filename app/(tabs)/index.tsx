import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// Dados fictícios para os cards de notícias (Mock Data)
const NEWS_DATA = [
  { id: '1', title: 'Controle da glicemia precisão!', subtitle: 'Confira nossas novas dicas do dia.', icon: '🍎' },
  { id: '2', title: 'Você sabia?', subtitle: 'Saúde bucal pode influenciar no controle do diabetes.', icon: '👄' },
  { id: '3', title: 'Nova receita saudável', subtitle: 'Experimente nosso bolo sem açúcar!', icon: '🍰' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com Logo */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/logo.jpeg")} style={styles.miniLogo} resizeMode="contain" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Indicador de Glicemia (Simulado por enquanto) */}
        <View style={styles.glucoseContainer}>
          <View style={styles.circularProgress}>
            <Text style={styles.glucoseValue}>135</Text>
            <Text style={styles.glucoseUnit}>mg/dL</Text>
            <Text style={styles.glucoseTime}>2 minutes ago</Text>
          </View>
        </View>

        {/* Lista de Notícias */}
        {NEWS_DATA.map((item) => (
          <View key={item.id} style={styles.newsCard}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 100, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', paddingTop: 40 },
  miniLogo: { width: 100, height: 40 },
  content: { padding: 20 },
  glucoseContainer: { alignItems: 'center', marginVertical: 30 },
  circularProgress: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 15,
    borderColor: '#669944', // Verde do DIABot
    alignItems: 'center',
    justifyContent: 'center',
  },
  glucoseValue: { fontSize: 48, fontWeight: 'bold', color: '#333' },
  glucoseUnit: { fontSize: 16, color: '#666' },
  glucoseTime: { fontSize: 12, color: '#999', marginTop: 5 },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardIcon: { fontSize: 30, marginRight: 15 },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#666' },
});