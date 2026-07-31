import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';
import {
  listarAtividades,
  listarGlicemia,
  listarMedicacoes,
  listarSaudeBucal,
  removerAtividade,
  removerGlicemia,
  removerMedicacao,
  removerSaudeBucal,
} from '../services/storage';

type ItemHistorico = {
  id: string;
  date: string;
  time: string;
  type: string;
  title: string;
  subtitle: string;
  color: string;
  categoria: 'glicemia' | 'bucal' | 'atividade' | 'medicacao';
};

function formatarData(iso: string) {
  const d = new Date(iso);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);
  if (d.toDateString() === hoje.toDateString()) return 'Hoje';
  if (d.toDateString() === ontem.toDateString()) return 'Ontem';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function formatarHora(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function HistoryScreen() {
  const router = useRouter();
  const [registros, setRegistros] = useState<ItemHistorico[]>([]);

  async function carregar() {
    const [glicemias, bucais, atividades, medicacoes] = await Promise.all([
      listarGlicemia(),
      listarSaudeBucal(),
      listarAtividades(),
      listarMedicacoes(),
    ]);

    const itens: ItemHistorico[] = [
      ...glicemias.map(r => ({
        id: r.id, date: formatarData(r.data), time: formatarHora(r.data),
        type: 'water', title: 'Glicemia',
        subtitle: `${r.valor} mg/dL (${r.periodo})`, color: Colors.error,
        categoria: 'glicemia' as const,
      })),
      ...bucais.map(r => {
        const atos = [r.escovacao && 'Escovação', r.fioDental && 'Fio dental', r.enxaguante && 'Enxaguante'].filter(Boolean).join(', ');
        return {
          id: r.id, date: formatarData(r.data), time: formatarHora(r.data),
          type: 'tooth', title: 'Saúde Bucal',
          subtitle: atos || r.observacoes || 'Registro bucal', color: Colors.success,
          categoria: 'bucal' as const,
        };
      }),
      ...atividades.map(r => ({
        id: r.id, date: formatarData(r.data), time: formatarHora(r.data),
        type: 'run', title: 'Atividade',
        subtitle: `${r.duracaoMinutos} min ${r.tipo}`, color: Colors.primary,
        categoria: 'atividade' as const,
      })),
      ...medicacoes.map(r => ({
        id: r.id, date: formatarData(r.data), time: formatarHora(r.data),
        type: 'pill', title: 'Medicação',
        subtitle: `${r.nome} ${r.dosagem}`, color: Colors.warning,
        categoria: 'medicacao' as const,
      })),
    ];

    itens.sort((a, b) => b.id.localeCompare(a.id));
    setRegistros(itens);
  }

  useFocusEffect(useCallback(() => { carregar(); }, []));

  function confirmarExclusao(item: ItemHistorico) {
    if (Platform.OS === 'web') {
      if (window.confirm(`Deseja excluir "${item.title}"?`)) {
        (async () => {
          if (item.categoria === 'glicemia') await removerGlicemia(item.id);
          else if (item.categoria === 'bucal') await removerSaudeBucal(item.id);
          else if (item.categoria === 'atividade') await removerAtividade(item.id);
          else if (item.categoria === 'medicacao') await removerMedicacao(item.id);
          carregar();
        })();
      }
      return;
    }
    Alert.alert(
      'Excluir registro',
      `Deseja excluir "${item.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir', style: 'destructive',
          onPress: async () => {
            if (item.categoria === 'glicemia') await removerGlicemia(item.id);
            else if (item.categoria === 'bucal') await removerSaudeBucal(item.id);
            else if (item.categoria === 'atividade') await removerAtividade(item.id);
            else if (item.categoria === 'medicacao') await removerMedicacao(item.id);
            carregar();
          },
        },
      ]
    );
  }

  const renderItem = ({ item }: { item: ItemHistorico }) => (
    <TouchableOpacity
      style={styles.recordItem}
      onLongPress={() => confirmarExclusao(item)}
      activeOpacity={0.7}
    >
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={[styles.iconCircle, { backgroundColor: `${item.color}15` }]}>
        <MaterialCommunityIcons name={item.type as any} size={24} color={item.color} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>

      <MaterialIcons name="delete-outline" size={22} color={Colors.placeholder} onPress={() => confirmarExclusao(item)} />
    </TouchableOpacity>
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
        data={registros}
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