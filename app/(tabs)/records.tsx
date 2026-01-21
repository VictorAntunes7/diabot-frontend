import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecordsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho Simples */}
        <View style={styles.header}>
          <Image 
            source={require("../../assets/images/logo2.jpeg")} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        {/* --- CARD DO GRÁFICO (Modernizado) --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Glicemia (Últimos 7 dias)</Text>
          
          {/* Legenda Limpa */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}><View style={[styles.dot, {backgroundColor: '#d64d5e'}]} /><Text style={styles.legendText}>Alta/Baixa</Text></View>
            <View style={styles.legendItem}><View style={[styles.dot, {backgroundColor: '#f6b93b'}]} /><Text style={styles.legendText}>Atenção</Text></View>
            <View style={styles.legendItem}><View style={[styles.dot, {backgroundColor: '#38ada9'}]} /><Text style={styles.legendText}>Ideal</Text></View>
          </View>

          <View style={styles.chartArea}>
            {/* Simulação das barras mais limpas */}
            <Bar day="Dom" height={80} color="#f6b93b" value="148" />
            <Bar day="Seg" height={100} color="#d64d5e" value="193" />
            <Bar day="Ter" height={40} color="#d64d5e" value="70" />
            <Bar day="Qua" height={60} color="#38ada9" value="95" />
            <Bar day="Qui" height={75} color="#38ada9" value="113" />
            <Bar day="Sex" height={85} color="#38ada9" value="130" />
            <Bar day="Sáb" height={50} color="#38ada9" value="105" />
          </View>
          
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreText}>Ver histórico completo</Text>
            <MaterialIcons name="chevron-right" size={20} color="#669944" />
          </TouchableOpacity>
        </View>


        {/* --- GRID DE AÇÕES RÁPIDAS (Novo!) --- */}
        <Text style={styles.sectionTitle}>Adicionar Registro</Text>
        <View style={styles.actionsGrid}>
          <ActionButton icon="water" label="Glicemia" color="#d64d5e" />
          <ActionButton icon="tooth" label="Saúde Bucal" color="#38ada9" isCommunity />
          <ActionButton icon="pill" label="Medicação" color="#f6b93b" isCommunity />
          <ActionButton icon="run" label="Atividade" color="#669944" isCommunity />
        </View>


        {/* --- LISTA DE HOJE (Modernizada) --- */}
        <Text style={styles.sectionTitle}>Registros de Hoje</Text>
        <View style={styles.listContainer}>
          <RecordCard time="07:00" icon="water" color="#d64d5e" title="Glicemia" subtitle="110 mg/dL (Jejum)" />
          <RecordCard time="08:30" icon="tooth" color="#38ada9" title="Saúde Bucal" subtitle="Escovação + Fio dental" isCommunity />
          <RecordCard time="09:00" icon="pill" color="#f6b93b" title="Medicação" subtitle="Metformina 500mg" isCommunity />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Sub-componentes Modernizados ---

const Bar = ({ day, height, color, value }: any) => (
  <View style={styles.barWrapper}>
    <Text style={styles.barValue}>{value}</Text>
    <View style={[styles.bar, {height: height, backgroundColor: color}]} />
    <Text style={styles.barDay}>{day}</Text>
  </View>
);

// Botões quadrados modernos em Grid
const ActionButton = ({ icon, label, color, isCommunity }: any) => (
  <TouchableOpacity style={styles.gridButton} activeOpacity={0.7}>
    <View style={[styles.gridIconCircle, { backgroundColor: `${color}20` }]}>
      {isCommunity ? 
        <MaterialCommunityIcons name={icon} size={28} color={color} /> : 
        <Ionicons name={icon} size={28} color={color} />
      }
    </View>
    <Text style={styles.gridLabel}>{label}</Text>
  </TouchableOpacity>
);

// Cards de registro estilo "timeline"
const RecordCard = ({ time, icon, color, title, subtitle, isCommunity }: any) => (
  <TouchableOpacity style={styles.recordCard} activeOpacity={0.7}>
    <View style={styles.timeContainer}>
      <Text style={styles.recordTime}>{time}</Text>
    </View>
    <View style={[styles.recordIconCircle, { backgroundColor: `${color}20` }]}>
      {isCommunity ? 
        <MaterialCommunityIcons name={icon} size={20} color={color} /> : 
        <Ionicons name={icon} size={20} color={color} />
      }
    </View>
    <View style={styles.recordDetails}>
      <Text style={styles.recordTitle}>{title}</Text>
      <Text style={styles.recordSubtitle}>{subtitle}</Text>
    </View>
    <MaterialIcons name="edit" size={20} color="#ccc" />
  </TouchableOpacity>
);


// --- Estilos Otimizados ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' }, // Fundo cinza bem claro
  scrollContent: { padding: 20, paddingBottom: 30 },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 100, height: 40 },
  
  // Estilo Geral dos Cards Brancos
  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginBottom: 25,
    elevation: 4, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, textAlign: 'center' },

  // Gráfico
  chartArea: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 180, paddingTop: 20 },
  legendRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: '#666' },
  barWrapper: { alignItems: 'center', flex: 1 },
  barValue: { fontSize: 10, color: '#666', marginBottom: 4, fontWeight: '600' },
  bar: { width: 12, borderRadius: 6 }, // Barras mais finas e arredondadas
  barDay: { fontSize: 11, color: '#999', marginTop: 8 },
  moreButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  moreText: { color: '#669944', fontWeight: '600', marginRight: 5 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },

  // Grid de Ações
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 25 },
  gridButton: {
    width: '48%', // Dois por linha
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  gridIconCircle: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  gridLabel: { fontWeight: 'bold', color: '#333' },

  // Lista de Registros
  listContainer: { },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  timeContainer: { marginRight: 15 },
  recordTime: { fontSize: 14, fontWeight: 'bold', color: '#669944' },
  recordIconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  recordDetails: { flex: 1 },
  recordTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  recordSubtitle: { fontSize: 13, color: '#666', marginTop: 2 },
});