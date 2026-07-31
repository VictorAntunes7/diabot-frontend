import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import AnimatedButton from '../components/AnimatedButton';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';
import { Idioma, Traducao, obterIdioma, traducoes } from '../services/i18n';
import { salvarMedicacao } from '../services/storage';

export default function AddMedicationScreen() {
  const router = useRouter();
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [loading, setLoading] = useState(false);
  const [idioma, setIdioma] = useState<Idioma>('pt');

  useEffect(() => { obterIdioma().then(setIdioma); }, []);

  const t: Traducao = traducoes[idioma];

  const handleSave = async () => {
    if (!medName || !dosage) {
      Alert.alert(t.erro, t.preenchaMedicacao);
      return;
    }
    setLoading(true);
    await salvarMedicacao({
      id: Date.now().toString(),
      data: new Date().toISOString(),
      nome: medName,
      dosagem: dosage,
    });
    setLoading(false);
    Alert.alert(t.sucesso, t.medicacaoSalva);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.novaMedicacao}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="pill" size={60} color={Colors.warning} />
        </View>

        <Text style={styles.label}>{t.nomeMedicamento}</Text>
        <TextInput style={styles.input} placeholder={t.placeholderMedicamento} placeholderTextColor={Colors.placeholder} value={medName} onChangeText={setMedName} />

        <Text style={styles.label}>{t.dosagem}</Text>
        <TextInput style={styles.input} placeholder={t.placeholderDosagem} placeholderTextColor={Colors.placeholder} value={dosage} onChangeText={setDosage} />

        <View style={styles.infoBox}>
          <MaterialIcons name="info-outline" size={20} color={Colors.textLight} />
          <Text style={styles.infoText}>{t.dicaMedicacao}</Text>
        </View>

        <View style={styles.spacer} />
        <AnimatedButton title={t.registrarMedicacao} onPress={handleSave} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Layout.spacing.l, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerTitle: { fontSize: Typography.size.subtitle, fontWeight: Typography.weight.bold, color: Colors.text },
  content: { padding: Layout.spacing.l, flexGrow: 1, maxWidth: Platform.OS === 'web' ? 600 : undefined, width: '100%', alignSelf: 'center' },
  iconContainer: { alignItems: 'center', marginVertical: 30 },
  label: { fontSize: 16, fontWeight: Typography.weight.semiBold, color: Colors.text, marginBottom: 8, marginLeft: 5 },
  input: { backgroundColor: '#f9f9f9', height: 55, borderRadius: Layout.radius.medium, paddingHorizontal: 20, fontSize: 16, color: Colors.text, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  infoBox: { flexDirection: 'row', backgroundColor: '#fffbe6', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#ffe58f' },
  infoText: { fontSize: 12, color: Colors.textLight, marginLeft: 10, flex: 1 },
  spacer: { flex: 1, minHeight: 30 },
});
