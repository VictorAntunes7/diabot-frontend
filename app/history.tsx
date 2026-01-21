import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// Importação do Design System do DIABot
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';

// Mock de dados históricos para visualização
const HISTORY_DATA = [
  { id: '1', date: 'Hoje', time: '09:00', type: 'pill', title: 'Medicação', subtitle: 'Metformina 500mg', color: Colors.warning },
  { id: '2', date: 'Hoje', time: '08:30', type: 'tooth', title: 'Saúde Bucal', subtitle: 'Escovação completa', color: Colors.success },
  { id: '3', date: 'Hoje', time: '07:00', type: 'water', title: 'Glicemia', subtitle: '110 mg/dL', color: Colors.error },
  { id: '4', date: 'Ontem', time: '22:00', type: 'water', title: 'Glicemia', subtitle: '145 mg/dL', color: Colors.error },
  { id: '5', date: 'Ontem', time: '20:00', type: 'run', title: 'Atividade', subtitle: '30 min Caminhada', color: Colors.primary },
  { id: '6', date: '20 Jan', time: '12:30', type: 'water', title: 'Glicemia', subtitle: '128 mg/dL', color: Colors.error },
  { id: '7', date: '20 Jan', time: '08:00', type: 'tooth', title: 'Saúde Bucal', subtitle: 'Fio dental', color: Colors.success },
];

export default function HistoryScreen() {
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <View style={styles.recordItem}>
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      
      <View style={[styles.iconCircle, { backgroundColor: `${item.color}15` }]}>
        <MaterialCommunityIcons name={item.type} size={24} color={item.color} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>

      <MaterialIcons name="chevron-right" size={24} color={Colors.placeholder} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Saúde</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={HISTORY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.l,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { 
    fontSize: Typography.size.subtitle, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text 
  },
  backButton: { padding: 5 },
  filterButton: { padding: 5 },
  listContent: { padding: Layout.spacing.l, paddingBottom: 40 },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  dateBadge: { width: 60, marginRight: 10 },
  dateText: { fontSize: 12, fontWeight: 'bold', color: Colors.text },
  timeText: { fontSize: 11, color: Colors.textLight },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  infoContainer: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  itemSubtitle: { fontSize: 13, color: Colors.textLight, marginTop: 2 },
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: Colors.placeholder, fontSize: 16 },
});