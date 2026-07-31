import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Typography } from '../../constants/Typography';
import {
  listarAtividades,
  listarGlicemia,
  listarMedicacoes,
  listarSaudeBucal,
  removerAtividade,
  removerGlicemia,
  removerMedicacao,
  removerSaudeBucal,
} from '../../services/storage';

type RegistroHoje = {
  id: string;
  time: string;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  isCommunity: boolean;
  categoria: 'glicemia' | 'bucal' | 'atividade' | 'medicacao';
};

export default function RecordsScreen() {
  const router = useRouter();
  const [registrosHoje, setRegistrosHoje] = useState<RegistroHoje[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const agora = new Date();
        const ehHoje = (iso: string) => {
          const d = new Date(iso);
          return d.getDate() === agora.getDate() &&
            d.getMonth() === agora.getMonth() &&
            d.getFullYear() === agora.getFullYear();
        };
        const hora = (iso: string) =>
          new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const [glicemias, bucais, atividades, medicacoes] = await Promise.all([
          listarGlicemia(),
          listarSaudeBucal(),
          listarAtividades(),
          listarMedicacoes(),
        ]);

        const itens: RegistroHoje[] = [
          ...glicemias.filter(r => ehHoje(r.data)).map(r => ({
            id: r.id, time: hora(r.data), icon: 'water', color: Colors.error,
            title: 'Glicemia', subtitle: `${r.valor} mg/dL (${r.periodo})`,
            isCommunity: false, categoria: 'glicemia' as const,
          })),
          ...bucais.filter(r => ehHoje(r.data)).map(r => {
            const atos = [r.escovacao && 'Escovação', r.fioDental && 'Fio dental', r.enxaguante && 'Enxaguante'].filter(Boolean).join(' + ');
            return {
              id: r.id, time: hora(r.data), icon: 'tooth', color: Colors.success,
              title: 'Saúde Bucal', subtitle: atos || r.observacoes || 'Registro bucal',
              isCommunity: true, categoria: 'bucal' as const,
            };
          }),
          ...atividades.filter(r => ehHoje(r.data)).map(r => ({
            id: r.id, time: hora(r.data), icon: 'run', color: Colors.primary,
            title: 'Atividade', subtitle: `${r.duracaoMinutos} min ${r.tipo}`,
            isCommunity: true, categoria: 'atividade' as const,
          })),
          ...medicacoes.filter(r => ehHoje(r.data)).map(r => ({
            id: r.id, time: hora(r.data), icon: 'pill', color: Colors.warning,
            title: 'Medicação', subtitle: `${r.nome} ${r.dosagem}`,
            isCommunity: true, categoria: 'medicacao' as const,
          })),
        ];

        itens.sort((a, b) => a.time.localeCompare(b.time));
        setRegistrosHoje(itens);
      }
      carregar();
    }, [])
  );

  async function excluir(item: RegistroHoje) {
    const executar = async () => {
      if (item.categoria === 'glicemia') await removerGlicemia(item.id);
      else if (item.categoria === 'bucal') await removerSaudeBucal(item.id);
      else if (item.categoria === 'atividade') await removerAtividade(item.id);
      else if (item.categoria === 'medicacao') await removerMedicacao(item.id);
      setRegistrosHoje(prev => prev.filter(r => r.id !== item.id));
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Deseja excluir "${item.title}"?`)) await executar();
      return;
    }
    Alert.alert('Excluir registro', `Deseja excluir "${item.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: executar },
    ]);
  }

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
          {registrosHoje.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhum registro feito hoje ainda.</Text>
            </View>
          ) : (
            registrosHoje.map(item => (
              <RecordCard
                key={item.id}
                time={item.time}
                icon={item.icon}
                color={item.color}
                title={item.title}
                subtitle={item.subtitle}
                isCommunity={item.isCommunity}
                onDelete={() => excluir(item)}
              />
            ))
          )}
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

const RecordCard = ({ time, icon, color, title, subtitle, isCommunity, onDelete }: any) => (
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
    <TouchableOpacity onPress={onDelete} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <MaterialIcons name="delete-outline" size={20} color={Colors.placeholder} />
    </TouchableOpacity>
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
  
  listContainer: {},
  emptyState: { alignItems: 'center', paddingVertical: 20 },
  emptyText: { color: Colors.placeholder, fontSize: 14 },
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