import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importação do Design System e Constantes
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Typography } from '../../constants/Typography';

export default function RecordsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho com Logo Centralizada */}
        <View style={styles.header}>
          <Image 
            source={require("../../assets/images/logo2.jpeg")} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        {/* --- CARD DO GRÁFICO (Resumo Semanal) --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Glicemia (Últimos 7 dias)</Text>
          
          <View style={styles.legendRow}>
            <View style={styles.legendItem}><View style={[styles.dot, {backgroundColor: Colors.error}]} /><Text style={styles.legendText}>Alta/Baixa</Text></View>
            <View style={styles.legendItem}><View style={[styles.dot, {backgroundColor: Colors.warning}]} /><Text style={styles.legendText}>Atenção</Text></View>
            <View style={styles.legendItem}><View style={[styles.dot, {backgroundColor: Colors.success}]} /><Text style={styles.legendText}>Ideal</Text></View>
          </View>

          <View style={styles.chartArea}>
            <Bar day="Dom" height={80} color={Colors.warning} value="148" />
            <Bar day="Seg" height={100} color={Colors.error} value="193" />
            <Bar day="Ter" height={40} color={Colors.error} value="70" />
            <Bar day="Qua" height={60} color={Colors.success} value="95" />
            <Bar day="Qui" height={75} color={Colors.success} value="113" />
            <Bar day="Sex" height={85} color={Colors.success} value="130" />
            <Bar day="Sáb" height={50} color={Colors.success} value="105" />
          </View>
          
          {/* Link para a tela de Histórico Completo */}
          <TouchableOpacity 
            style={styles.moreButton} 
            activeOpacity={0.7}
            onPress={() => router.push("/history")}
          >
            <Text style={styles.moreText}>Ver histórico completo</Text>
            <MaterialIcons name="chevron-right" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>


        {/* --- GRID DE AÇÕES RÁPIDAS --- */}
        <Text style={styles.sectionTitle}>Adicionar Registro</Text>
        <View style={styles.actionsGrid}>
          {/* Botão Glicemia */}
          <ActionButton 
            icon="water" 
            label="Glicemia" 
            color={Colors.error} 
            onPress={() => router.push("/add-glucose")} 
          />
          
          {/* Botão Saúde Bucal */}
          <ActionButton 
            icon="tooth" 
            label="Saúde Bucal" 
            color={Colors.success} 
            isCommunity 
            onPress={() => router.push("/add-oral-health")}
          />

          {/* Botão Medicação */}
          <ActionButton 
            icon="pill" 
            label="Medicação" 
            color={Colors.warning} 
            isCommunity 
            onPress={() => router.push("/add-medication")}
          />

          {/* Botão Atividade */}
          <ActionButton 
            icon="run" 
            label="Atividade" 
            color={Colors.primary} 
            isCommunity 
            onPress={() => router.push("/add-activity")}
          />
        </View>


        {/* --- LISTA DE REGISTROS DE HOJE --- */}
        <Text style={styles.sectionTitle}>Registros de Hoje</Text>
        <View style={styles.listContainer}>
          <RecordCard time="07:00" icon="water" color={Colors.error} title="Glicemia" subtitle="110 mg/dL (Jejum)" />
          <RecordCard time="08:30" icon="tooth" color={Colors.success} title="Saúde Bucal" subtitle="Escovação + Fio dental" isCommunity />
          <RecordCard time="09:00" icon="pill" color={Colors.warning} title="Medicação" subtitle="Metformina 500mg" isCommunity />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Sub-componentes Auxiliares ---

const Bar = ({ day, height, color, value }: any) => (
  <View style={styles.barWrapper}>
    <Text style={styles.barValue}>{value}</Text>
    <View style={[styles.bar, {height: height, backgroundColor: color}]} />
    <Text style={styles.barDay}>{day}</Text>
  </View>
);

const ActionButton = ({ icon, label, color, isCommunity, onPress }: any) => (
  <TouchableOpacity style={styles.gridButton} activeOpacity={0.7} onPress={onPress}>
    <View style={[styles.gridIconCircle, { backgroundColor: `${color}15` }]}>
      {isCommunity ? 
        <MaterialCommunityIcons name={icon} size={28} color={color} /> : 
        <Ionicons name={icon} size={28} color={color} />
      }
    </View>
    <Text style={styles.gridLabel}>{label}</Text>
  </TouchableOpacity>
);

const RecordCard = ({ time, icon, color, title, subtitle, isCommunity }: any) => (
  <TouchableOpacity style={styles.recordCard} activeOpacity={0.7}>
    <View style={styles.timeContainer}>
      <Text style={styles.recordTime}>{time}</Text>
    </View>
    <View style={[styles.recordIconCircle, { backgroundColor: `${color}15` }]}>
      {isCommunity ? 
        <MaterialCommunityIcons name={icon} size={20} color={color} /> : 
        <Ionicons name={icon} size={20} color={color} />
      }
    </View>
    <View style={styles.recordDetails}>
      <Text style={styles.recordTitle}>{title}</Text>
      <Text style={styles.recordSubtitle}>{subtitle}</Text>
    </View>
    <MaterialIcons name="edit" size={20} color={Colors.placeholder} />
  </TouchableOpacity>
);

// --- Estilos ---

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  scrollContent: { 
    padding: Layout.spacing.l, 
    paddingBottom: 120 // Margem extra para não ser cortado pela barra de abas
  },
  header: { alignItems: 'center', marginBottom: Layout.spacing.l },
  logo: { width: 100, height: 40 },
  
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.card,
    padding: Layout.spacing.l,
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardTitle: { 
    fontSize: Typography.size.subtitle, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text, 
    marginBottom: 15, 
    textAlign: 'center' 
  },
  chartArea: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    height: 180, 
    paddingTop: 20 
  },
  legendRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: Typography.size.tiny, color: Colors.textLight },
  barWrapper: { alignItems: 'center', flex: 1 },
  barValue: { fontSize: 10, color: Colors.textLight, marginBottom: 4, fontWeight: Typography.weight.semiBold },
  bar: { width: 12, borderRadius: 6 },
  barDay: { fontSize: 11, color: Colors.placeholder, marginTop: 8 },
  
  moreButton: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 15, 
    paddingTop: 15, 
    borderTopWidth: 1, 
    borderTopColor: Colors.border 
  },
  moreText: { color: Colors.primary, fontWeight: Typography.weight.bold, marginRight: 5 },
  
  sectionTitle: { 
    fontSize: Typography.size.subtitle, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text, 
    marginBottom: 15, 
    marginLeft: 5 
  },
  
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 25 },
  gridButton: {
    width: '48%',
    backgroundColor: Colors.white,
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
  gridLabel: { fontWeight: Typography.weight.bold, color: Colors.text },
  
  listContainer: { },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeContainer: { marginRight: 15 },
  recordTime: { fontSize: 14, fontWeight: Typography.weight.bold, color: Colors.primary },
  recordIconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  recordDetails: { flex: 1 },
  recordTitle: { fontSize: 16, fontWeight: Typography.weight.bold, color: Colors.text },
  recordSubtitle: { fontSize: Typography.size.caption, color: Colors.textLight, marginTop: 2 },
});