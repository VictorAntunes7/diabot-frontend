import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';
import { Idioma, obterIdioma, traducoes } from '../services/i18n';
import {
  listarAtividades, listarGlicemia, listarMedicacoes, listarSaudeBucal,
  removerAtividade, removerGlicemia, removerMedicacao, removerSaudeBucal,
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

export default function HistoryScreen() {
  const router = useRouter();
  const [registros, setRegistros] = useState<ItemHistorico[]>([]);
  const [idioma, setIdioma] = useState<Idioma>('pt');

  async function carregar() {
    const lang = await obterIdioma();
    setIdioma(lang);
    const t = traducoes[lang];

    const hoje = new Date();
    const ontem = new Date();
    ontem.setDate(hoje.getDate() - 1);

    const formatarData = (iso: string) => {
      const d = new Date(iso);
      if (d.toDateString() === hoje.toDateString()) return t.hoje;
      if (d.toDateString() === ontem.toDateString()) return t.ontem;
      return d.toLocaleDateString(t.locale, { day: '2-digit', month: 'short' });
    };
    const formatarHora = (iso: string) =>
      new Date(iso).toLocaleTimeString(t.locale, { hour: '2-digit', minute: '2-digit' });

    const [glicemias, bucais, atividades, medicacoes] = await Promise.all([
      listarGlicemia(), listarSaudeBucal(), listarAtividades(), listarMedicacoes(),
    ]);

    const itens: ItemHistorico[] = [
      ...glicemias.map(r => ({
        id: r.id, date: formatarData(r.data), time: formatarHora(r.data),
        type: 'water', title: t.glicemiaLabel,
        subtitle: `${r.valor} mg/dL (${r.periodo})`, color: Colors.error,
        categoria: 'glicemia' as const,
      })),
      ...bucais.map(r => {
        const atos = [r.escovacao && t.escovacao, r.fioDental && t.fioDental, r.enxaguante && t.enxaguante].filter(Boolean).join(', ');
        return {
          id: r.id, date: formatarData(r.data), time: formatarHora(r.data),
          type: 'tooth', title: t.saudeBucalLabel,
          subtitle: atos || r.observacoes || t.saudeBucalLabel, color: Colors.success,
          categoria: 'bucal' as const,
        };
      }),
      ...atividades.map(r => ({
        id: r.id, date: formatarData(r.data), time: formatarHora(r.data),
        type: 'run', title: t.atividadeLabel,
        subtitle: `${r.duracaoMinutos} min ${r.tipo}`, color: Colors.primary,
        categoria: 'atividade' as const,
      })),
      ...medicacoes.map(r => ({
        id: r.id, date: formatarData(r.data), time: formatarHora(r.data),
        type: 'pill', title: t.medicacaoLabel,
        subtitle: `${r.nome} ${r.dosagem}`, color: Colors.warning,
        categoria: 'medicacao' as const,
      })),
    ];

    itens.sort((a, b) => b.id.localeCompare(a.id));
    setRegistros(itens);
  }

  useFocusEffect(useCallback(() => { carregar(); }, []));

  const t = traducoes[idioma];

  function confirmarExclusao(item: ItemHistorico) {
    if (Platform.OS === 'web') {
      if (window.confirm(`${t.confirmarExcluir} "${item.title}"?`)) {
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
    Alert.alert(t.excluirRegistro, `${t.confirmarExcluir} "${item.title}"?`, [
      { text: t.cancelar, style: 'cancel' },
      {
        text: t.excluir, style: 'destructive',
        onPress: async () => {
          if (item.categoria === 'glicemia') await removerGlicemia(item.id);
          else if (item.categoria === 'bucal') await removerSaudeBucal(item.id);
          else if (item.categoria === 'atividade') await removerAtividade(item.id);
          else if (item.categoria === 'medicacao') await removerMedicacao(item.id);
          carregar();
        },
      },
    ]);
  }

  const renderItem = ({ item }: { item: ItemHistorico }) => (
    <TouchableOpacity style={styles.recordItem} onLongPress={() => confirmarExclusao(item)} activeOpacity={0.7}>
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.historicoSaude}</Text>
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
            <Text style={styles.emptyText}>{t.nenhumRegistroEncontrado}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Layout.spacing.l, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerTitle: { fontSize: Typography.size.subtitle, fontWeight: Typography.weight.bold, color: Colors.text },
  backButton: { padding: 5 },
  filterButton: { padding: 5 },
  listContent: { padding: Layout.spacing.l, paddingBottom: 40 },
  recordItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  dateBadge: { width: 60, marginRight: 10 },
  dateText: { fontSize: 12, fontWeight: 'bold', color: Colors.text },
  timeText: { fontSize: 11, color: Colors.textLight },
  iconCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  infoContainer: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  itemSubtitle: { fontSize: 13, color: Colors.textLight, marginTop: 2 },
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: Colors.placeholder, fontSize: 16 },
});
