import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Typography } from '../../constants/Typography';
import { Idioma, Traducao, obterIdioma, traducoes } from '../../services/i18n';
import {
  EventoCalendario,
  listarAtividades,
  listarEventos,
  listarGlicemia,
  listarMedicacoes,
  listarSaudeBucal,
  removerEvento,
  salvarEvento,
} from '../../services/storage';

type ItemAgenda = {
  id: string;
  hora: string;
  titulo: string;
  categoria: string;
  cor: string;
  ehEvento: boolean;
};

export default function CalendarScreen() {
  const hojeReal = new Date();

  const [offsetMes, setOffsetMes] = useState(0);
  const [diaSelecionado, setDiaSelecionado] = useState(hojeReal.getDate());
  const [diasComRegistro, setDiasComRegistro] = useState<Set<number>>(new Set());
  const [agendaDia, setAgendaDia] = useState<ItemAgenda[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [idioma, setIdioma] = useState<Idioma>('pt');

  const [modalVisivel, setModalVisivel] = useState(false);
  const [tituloEvento, setTituloEvento] = useState('');
  const [tipoEvento, setTipoEvento] = useState<EventoCalendario['tipo']>('Consulta');

  const dataBase = new Date(hojeReal.getFullYear(), hojeReal.getMonth() + offsetMes, 1);
  const mesAtual = dataBase.getMonth();
  const anoAtual = dataBase.getFullYear();

  const t: Traducao = traducoes[idioma];

  const nomeMes = dataBase.toLocaleDateString(t.locale, { month: 'long', year: 'numeric' });
  const nomeMesFormatado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

  const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
  const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
  const celulas = [
    ...Array(primeiroDia).fill(null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1),
  ];

  const ehHoje = offsetMes === 0 && diaSelecionado === hojeReal.getDate();

  function irParaHoje() {
    setOffsetMes(0);
    setDiaSelecionado(hojeReal.getDate());
  }

  useFocusEffect(
    useCallback(() => {
      obterIdioma().then(setIdioma);

      async function carregar() {
        const [glicemias, bucais, atividades, medicacoes, eventos] = await Promise.all([
          listarGlicemia(),
          listarSaudeBucal(),
          listarAtividades(),
          listarMedicacoes(),
          listarEventos(),
        ]);

        const todos = [
          ...glicemias.map(r => ({ id: r.id, data: r.data, titulo: `Glicemia: ${r.valor} mg/dL`, categoria: 'Diabetes', cor: Colors.error, ehEvento: false })),
          ...bucais.map(r => ({ id: r.id, data: r.data, titulo: 'Saúde Bucal', categoria: 'Bucal', cor: Colors.success, ehEvento: false })),
          ...atividades.map(r => ({ id: r.id, data: r.data, titulo: `${r.tipo}: ${r.duracaoMinutos} min`, categoria: 'Atividade', cor: Colors.primary, ehEvento: false })),
          ...medicacoes.map(r => ({ id: r.id, data: r.data, titulo: `${r.nome} ${r.dosagem}`, categoria: 'Medicação', cor: Colors.warning, ehEvento: false })),
          ...eventos.map(e => ({ id: e.id, data: e.data, titulo: e.titulo, categoria: e.tipo, cor: Colors.primary, ehEvento: true })),
        ];

        const dias = new Set<number>();
        todos.forEach(r => {
          const d = new Date(r.data);
          if (d.getMonth() === mesAtual && d.getFullYear() === anoAtual) dias.add(d.getDate());
        });
        setDiasComRegistro(dias);

        const itensDoDia: ItemAgenda[] = todos
          .filter(r => {
            const d = new Date(r.data);
            return d.getDate() === diaSelecionado && d.getMonth() === mesAtual && d.getFullYear() === anoAtual;
          })
          .map(r => ({
            id: r.id,
            hora: new Date(r.data).toLocaleTimeString(t.locale, { hour: '2-digit', minute: '2-digit' }),
            titulo: r.titulo,
            categoria: r.categoria,
            cor: r.cor,
            ehEvento: r.ehEvento,
          }));

        setAgendaDia(itensDoDia);
      }
      carregar();
    }, [offsetMes, diaSelecionado, refreshTrigger, idioma])
  );

  async function salvarNovoEvento() {
    if (!tituloEvento.trim()) return;
    await salvarEvento({
      id: Date.now().toString(),
      data: new Date(anoAtual, mesAtual, diaSelecionado, 9, 0).toISOString(),
      titulo: tituloEvento.trim(),
      tipo: tipoEvento,
    });
    setTituloEvento('');
    setModalVisivel(false);
    setRefreshTrigger(prev => prev + 1);
  }

  function confirmarExclusao(id: string, titulo: string) {
    if (Platform.OS === 'web') {
      if (window.confirm(`Deseja excluir "${titulo}"?`)) {
        removerEvento(id).then(() => setRefreshTrigger(prev => prev + 1));
      }
      return;
    }
    Alert.alert('Excluir evento', `Deseja excluir "${titulo}"?`, [
      { text: t.cancelar, style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          await removerEvento(id);
          setRefreshTrigger(prev => prev + 1);
        },
      },
    ]);
  }

  const tituloSecao = ehHoje ? t.registrosHoje : `${t.registrosDia} ${diaSelecionado}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoHeader}>
        <Image source={require('../../assets/images/logo2.jpeg')} style={styles.logo} resizeMode="contain" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setOffsetMes(offsetMes - 1)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="chevron-left" size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{nomeMesFormatado}</Text>
          <TouchableOpacity onPress={() => setOffsetMes(offsetMes + 1)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="chevron-right" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarCardHeader}>
            <View style={styles.weekDaysRow}>
              {t.diasSemana.map((day, index) => (
                <Text key={index} style={styles.weekDayText}>{day}</Text>
              ))}
            </View>
            <View style={styles.calendarActions}>
              {!ehHoje && (
                <TouchableOpacity style={styles.hojeButton} onPress={irParaHoje}>
                  <Text style={styles.hojeButtonText}>{t.hoje}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.addButton} onPress={() => setModalVisivel(true)}>
                <MaterialIcons name="add" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.daysGrid}>
            {celulas.map((dia, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dayCell}
                disabled={dia === null}
                onPress={() => dia && setDiaSelecionado(dia)}
              >
                {dia !== null && (
                  <>
                    <View style={[
                      styles.dayCellInner,
                      dia === diaSelecionado && styles.dayCellActive,
                      dia === hojeReal.getDate() && offsetMes === 0 && dia !== diaSelecionado && styles.dayCellHoje,
                    ]}>
                      <Text style={[
                        styles.dayNumber,
                        dia === diaSelecionado && styles.dayNumberActive,
                        dia === hojeReal.getDate() && offsetMes === 0 && dia !== diaSelecionado && styles.dayNumberHoje,
                      ]}>
                        {dia}
                      </Text>
                    </View>
                    {diasComRegistro.has(dia) && (
                      <View style={[styles.dotIndicator, dia === diaSelecionado && styles.dotIndicatorActive]} />
                    )}
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.tasksSection}>
          <View style={styles.tasksSectionHeader}>
            <Text style={styles.tasksTitle}>{tituloSecao}</Text>
          </View>

          {agendaDia.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="event-note" size={36} color={Colors.border} />
              <Text style={styles.emptyText}>{t.nenhumRegistroDia}</Text>
            </View>
          ) : (
            <FlatList
              data={agendaDia}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.taskCard}>
                  <View style={[styles.taskDot, { backgroundColor: item.cor }]} />
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskTitle}>{item.titulo}</Text>
                    <Text style={styles.taskCategory}>{item.categoria}</Text>
                  </View>
                  <Text style={styles.taskHora}>{item.hora}</Text>
                  {item.ehEvento && (
                    <TouchableOpacity
                      onPress={() => confirmarExclusao(item.id, item.titulo)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      style={{ marginLeft: 8 }}
                    >
                      <MaterialIcons name="delete-outline" size={20} color={Colors.placeholder} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>

      <Modal visible={modalVisivel} transparent animationType="slide" onRequestClose={() => setModalVisivel(false)}>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setModalVisivel(false)} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.novoEvento} {diaSelecionado}</Text>

            <TextInput
              style={styles.modalInput}
              placeholder={t.tituloEvento}
              placeholderTextColor={Colors.placeholder}
              value={tituloEvento}
              onChangeText={setTituloEvento}
              autoFocus
            />

            <View style={styles.tiposRow}>
              {t.tiposEvento.map((tipo, i) => {
                const tiposBase: EventoCalendario['tipo'][] = ['Consulta', 'Lembrete', 'Medicação'];
                const tipoBase = tiposBase[i];
                return (
                  <TouchableOpacity
                    key={tipo}
                    onPress={() => setTipoEvento(tipoBase)}
                    style={[styles.tipoBtn, tipoEvento === tipoBase && styles.tipoBtnActive]}
                  >
                    <Text style={[styles.tipoText, tipoEvento === tipoBase && styles.tipoTextActive]}>{tipo}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={salvarNovoEvento}>
              <Text style={styles.saveButtonText}>{t.salvar}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisivel(false)}>
              <Text style={styles.cancelText}>{t.cancelar}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  logoHeader: {
    alignItems: 'center', paddingVertical: 10,
    backgroundColor: Colors.card, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  logo: { width: 100, height: 40 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 25, paddingVertical: 15,
  },
  headerTitle: { fontSize: Typography.size.title, fontWeight: Typography.weight.bold, color: Colors.text },
  calendarCard: {
    backgroundColor: Colors.white, marginHorizontal: 20, padding: 15,
    borderRadius: Layout.radius.card, elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
  },
  calendarCardHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
  },
  weekDaysRow: { flex: 1, flexDirection: 'row' },
  weekDayText: {
    width: `${100 / 7}%` as any, textAlign: 'center',
    color: Colors.placeholder, fontWeight: Typography.weight.bold, fontSize: 13,
  },
  calendarActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  hojeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  hojeButtonText: { fontSize: 12, color: Colors.primary, fontWeight: Typography.weight.bold },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%` as any, height: 44, alignItems: 'center', justifyContent: 'center' },
  dayCellInner: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  dayCellActive: { backgroundColor: Colors.primary },
  dayCellHoje: { borderWidth: 1.5, borderColor: Colors.primary },
  dayNumber: { fontSize: 14, color: Colors.text },
  dayNumberActive: { color: Colors.white, fontWeight: Typography.weight.bold },
  dayNumberHoje: { color: Colors.primary, fontWeight: Typography.weight.bold },
  dotIndicator: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.primary, marginTop: 1 },
  dotIndicatorActive: { backgroundColor: Colors.white },
  tasksSection: { paddingHorizontal: 25, marginTop: 20, paddingBottom: 40, maxWidth: Platform.OS === 'web' ? 800 : undefined, width: '100%', alignSelf: 'center' },
  tasksSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  tasksTitle: { fontSize: Typography.size.subtitle, fontWeight: Typography.weight.bold, color: Colors.text },
  addButton: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  emptyState: { alignItems: 'center', paddingVertical: 30 },
  emptyText: { color: Colors.placeholder, fontSize: 14, marginTop: 10 },
  taskCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    padding: 15, borderRadius: Layout.radius.input, marginBottom: 10,
    borderWidth: 1, borderColor: Colors.border,
  },
  taskDot: { width: 10, height: 10, borderRadius: 5, marginRight: 14 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: Typography.size.body, fontWeight: Typography.weight.semiBold, color: Colors.text },
  taskCategory: { fontSize: Typography.size.caption, color: Colors.textLight, marginTop: 2 },
  taskHora: { fontSize: 13, fontWeight: Typography.weight.bold, color: Colors.primary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: Colors.white, padding: 24,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  modalTitle: { fontSize: 16, fontWeight: Typography.weight.bold, color: Colors.text, marginBottom: 16 },
  modalInput: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 12,
    padding: 12, fontSize: 15, color: Colors.text, marginBottom: 14,
  },
  tiposRow: { flexDirection: 'row', marginBottom: 20 },
  tipoBtn: {
    flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border, marginRight: 8,
  },
  tipoBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tipoText: { fontSize: 13, color: Colors.textLight, fontWeight: Typography.weight.semiBold },
  tipoTextActive: { color: Colors.white },
  saveButton: { backgroundColor: Colors.primary, padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  saveButtonText: { color: Colors.white, fontWeight: Typography.weight.bold, fontSize: 15 },
  cancelText: { textAlign: 'center', color: Colors.textLight, fontSize: 14 },
});
