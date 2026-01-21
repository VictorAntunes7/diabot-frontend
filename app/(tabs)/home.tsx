import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Importação do seu Design System e Mocks
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { MockUser } from '../../constants/MockData';
import { Typography } from '../../constants/Typography';

// Dados das notícias para o monitoramento integrado
const NEWS_DATA = [
  { id: '1', title: 'Saúde Bucal e Diabetes', subtitle: 'A relação que você precisa conhecer.', icon: 'health-and-safety' },
  { id: '2', title: 'Dica de Alimentação', subtitle: 'Frutas com baixo índice glicêmico.', icon: 'restaurant' },
  { id: '3', title: 'Exercícios em Casa', subtitle: 'Mantenha-se ativo com 15 minutos diários.', icon: 'fitness-center' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com Logo Centralizada */}
      <View style={styles.header}>
        <Image 
          // Ajustado para logo.jpeg conforme seu explorer
          source={require("../../assets/images/logo2.jpeg")} 
          style={styles.logoHeader} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Olá, {MockUser.name}! 👋</Text>
        <Text style={styles.dateText}>Quarta-feira, 21 de Janeiro</Text>

        {/* Indicador de Glicemia em Arco */}
        <View style={styles.glucoseCard}>
          <View style={styles.circle}>
            {/* View que anula a rotação do círculo para o texto ficar reto */}
            <View style={styles.textContainer}>
              <Text style={styles.glucoseValue}>135</Text>
              <Text style={styles.glucoseUnit}>mg/dL</Text>
            </View>
          </View>
          <Text style={styles.glucoseStatus}>Glicemia Atual</Text>
          <Text style={styles.glucoseTime}>Medido há 5 minutos</Text>
        </View>

        <Text style={styles.sectionTitle}>Últimas Notícias</Text>
        
        <FlatList
          data={NEWS_DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.newsCard} activeOpacity={0.7}>
              <View style={styles.iconCircle}>
                <MaterialIcons name={item.icon as any} size={24} color={Colors.primary} />
              </View>
              <View style={styles.newsText}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSubtitle}>{item.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={Colors.placeholder} />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { 
    height: 80, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: Colors.border,
    backgroundColor: Colors.card,
  },
  logoHeader: { width: 120, height: 50 },
  content: { flex: 1, padding: Layout.spacing.l },
  welcomeText: { 
    fontSize: Typography.size.title, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text 
  },
  dateText: { fontSize: 14, color: Colors.textLight, marginBottom: 20 },
  
  // Cartão do Medidor (O Arco)
  glucoseCard: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    borderTopColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderRightColor: Colors.primary,
    borderBottomColor: Colors.border, // Cria a abertura embaixo
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginBottom: 10,
    transform: [{ rotate: '-45deg' }], // Gira para alinhar a abertura
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }], // Desfaz a rotação para o texto ficar reto
  },
  glucoseValue: { fontSize: 36, fontWeight: Typography.weight.bold, color: Colors.text },
  glucoseUnit: { fontSize: 14, color: Colors.textLight },
  glucoseStatus: { fontSize: 16, fontWeight: Typography.weight.semiBold, color: Colors.primary },
  glucoseTime: { fontSize: 12, color: Colors.placeholder },

  sectionTitle: { 
    fontSize: Typography.size.subtitle, 
    fontWeight: Typography.weight.bold, 
    marginBottom: 15, 
    color: Colors.text 
  },
  
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.m,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#eef5ea', // Tom suave de Colors.primary
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  newsText: { flex: 1 },
  newsTitle: { fontSize: 16, fontWeight: Typography.weight.bold, color: Colors.text },
  newsSubtitle: { fontSize: 13, color: Colors.textLight },
});