import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import AnimatedButton from '../components/AnimatedButton';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';
import { Idioma, Traducao, obterIdioma, traducoes } from '../services/i18n';
import { salvarSaudeBucal } from '../services/storage';

export default function AddOralHealthScreen() {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [idioma, setIdioma] = useState<Idioma>('pt');
  const [activities, setActivities] = useState({ brushing: false, flossing: false, mouthwash: false });

  useEffect(() => { obterIdioma().then(setIdioma); }, []);

  const t: Traducao = traducoes[idioma];

  const toggleActivity = (key: keyof typeof activities) => {
    setActivities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    if (!activities.brushing && !activities.flossing && !activities.mouthwash && !notes) {
      Alert.alert(t.aviso, t.selecioneAtividade);
      return;
    }
    setLoading(true);
    await salvarSaudeBucal({
      id: Date.now().toString(),
      data: new Date().toISOString(),
      escovacao: activities.brushing,
      fioDental: activities.flossing,
      enxaguante: activities.mouthwash,
      observacoes: notes || undefined,
    });
    setLoading(false);
    Alert.alert(t.sucesso, t.registroBucalSalvo);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.saudeBucalTitulo}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>{t.oQueRealizou}</Text>

        <View style={styles.optionsGrid}>
          <SelectionCard icon="tooth" label={t.escovacao} active={activities.brushing} onPress={() => toggleActivity('brushing')} />
          <SelectionCard icon="multi-flat" label={t.fioDental} active={activities.flossing} onPress={() => toggleActivity('flossing')} />
          <SelectionCard icon="cup-water" label={t.enxaguante} active={activities.mouthwash} onPress={() => toggleActivity('mouthwash')} />
        </View>

        <Text style={styles.label}>{t.observacoesOpcional}</Text>
        <TextInput
          style={styles.textArea}
          placeholder={t.placeholderObservacoes}
          placeholderTextColor={Colors.placeholder}
          multiline={true}
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />

        <View style={styles.spacer} />
        <AnimatedButton title={t.guardarRegisto} onPress={handleSave} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
}

const SelectionCard = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity style={[styles.selectionCard, active && styles.selectionCardActive]} onPress={onPress} activeOpacity={0.7}>
    <MaterialCommunityIcons name={icon} size={32} color={active ? Colors.white : Colors.primary} />
    <Text style={[styles.selectionText, active && styles.selectionTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Layout.spacing.l, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerTitle: { fontSize: Typography.size.subtitle, fontWeight: Typography.weight.bold, color: Colors.text },
  content: { padding: Layout.spacing.l, flexGrow: 1, maxWidth: Platform.OS === 'web' ? 600 : undefined, width: '100%', alignSelf: 'center' },
  label: { fontSize: 16, fontWeight: Typography.weight.semiBold, color: Colors.text, marginBottom: 15, marginTop: 10 },
  optionsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  selectionCard: { width: '31%', aspectRatio: 1, backgroundColor: '#f9f9f9', borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border, padding: 5 },
  selectionCardActive: { backgroundColor: Colors.success, borderColor: Colors.success },
  selectionText: { fontSize: 11, fontWeight: 'bold', color: Colors.text, marginTop: 8, textAlign: 'center' },
  selectionTextActive: { color: Colors.white },
  textArea: { backgroundColor: '#f9f9f9', borderRadius: Layout.radius.medium, padding: 15, fontSize: 16, color: Colors.text, borderWidth: 1, borderColor: Colors.border, textAlignVertical: 'top', height: 120, marginBottom: 30 },
  spacer: { flex: 1 },
});
