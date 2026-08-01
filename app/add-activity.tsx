import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import AnimatedButton from '../components/AnimatedButton';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Idioma, Traducao, obterIdioma, traducoes } from '../services/i18n';
import { salvarAtividade } from '../services/storage';

export default function AddActivityScreen() {
  const router = useRouter();
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("Caminhada");
  const [loading, setLoading] = useState(false);
  const [idioma, setIdioma] = useState<Idioma>('pt');

  useEffect(() => { obterIdioma().then(setIdioma); }, []);

  const t: Traducao = traducoes[idioma];

  const tiposAtividade = [
    { label: t.caminhada, valor: 'Caminhada', icon: 'walk' },
    { label: t.corrida, valor: 'Corrida', icon: 'run' },
    { label: t.ciclismo, valor: 'Ciclismo', icon: 'bike' },
  ];

  const handleSave = async () => {
    if (!duration || isNaN(Number(duration))) {
      Alert.alert(t.erro, t.duracaoInvalida);
      return;
    }
    setLoading(true);
    await salvarAtividade({
      id: Date.now().toString(),
      data: new Date().toISOString(),
      tipo: type,
      duracaoMinutos: Number(duration),
    });
    setLoading(false);
    Alert.alert(t.sucesso, t.atividadeSalva);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.novaAtividade}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>{t.tipoAtividade}</Text>

        <View style={styles.optionsGrid}>
          {tiposAtividade.map(item => (
            <ActivityCard
              key={item.valor}
              icon={item.icon}
              label={item.label}
              active={type === item.valor}
              onPress={() => setType(item.valor)}
            />
          ))}
        </View>

        <Text style={styles.label}>{t.duracaoMinutos}</Text>
        <TextInput
          style={styles.input}
          placeholder={t.placeholderDuracao}
          placeholderTextColor={Colors.placeholder}
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="lightning-bolt" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>{t.dicaAtividade}</Text>
        </View>

        <View style={styles.spacer} />
        <AnimatedButton title={t.salvarAtividade} onPress={handleSave} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
}

const ActivityCard = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity style={[styles.activityCard, active && styles.activityCardActive]} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={30} color={active ? Colors.white : Colors.primary} />
    <Text style={[styles.activityLabel, active && styles.activityLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Layout.spacing.l, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  content: { padding: Layout.spacing.l, flexGrow: 1, maxWidth: Platform.OS === 'web' ? 600 : undefined, width: '100%', alignSelf: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 15, marginTop: 10 },
  optionsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  activityCard: { width: '31%', paddingVertical: 15, backgroundColor: '#f9f9f9', borderRadius: 15, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  activityCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  activityLabel: { fontSize: 12, fontWeight: 'bold', color: Colors.text, marginTop: 8 },
  activityLabelActive: { color: Colors.white },
  input: { backgroundColor: '#f9f9f9', height: 55, borderRadius: 12, paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold', color: Colors.text, borderWidth: 1, borderColor: Colors.border, marginBottom: 20 },
  infoBox: { flexDirection: 'row', backgroundColor: '#eef5ea', padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: Colors.primary + '30' },
  infoText: { fontSize: 13, color: Colors.textLight, marginLeft: 10, flex: 1 },
  spacer: { flex: 1, minHeight: 30 },
});
