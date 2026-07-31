import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AnimatedButton from '../components/AnimatedButton';
import { Colors } from '../constants/Colors';
import { Idioma, Traducao, obterIdioma, traducoes } from '../services/i18n';
import { salvarGlicemia } from '../services/storage';

export default function AddGlucoseScreen() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [period, setPeriod] = useState<'Jejum' | 'Pós-refeição'>('Jejum');
  const [loading, setLoading] = useState(false);
  const [idioma, setIdioma] = useState<Idioma>('pt');

  useEffect(() => { obterIdioma().then(setIdioma); }, []);

  const t: Traducao = traducoes[idioma];

  const handleSave = async () => {
    if (!value || isNaN(Number(value))) return;
    setLoading(true);
    await salvarGlicemia({
      id: Date.now().toString(),
      data: new Date().toISOString(),
      valor: Number(value),
      periodo: period,
    });
    setLoading(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.novaGlicemia}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>{t.valorGlicemia}</Text>
        <TextInput
          style={styles.input}
          placeholder="110"
          placeholderTextColor={Colors.placeholder}
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        <Text style={styles.label}>{t.periodo}</Text>
        <View style={styles.periodContainer}>
          <TouchableOpacity style={[styles.pBtn, period === "Jejum" && styles.pBtnActive]} onPress={() => setPeriod("Jejum")}>
            <Text style={[styles.pTxt, period === "Jejum" && styles.pTxtActive]}>{t.jejum}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pBtn, period === "Pós-refeição" && styles.pBtnActive]} onPress={() => setPeriod("Pós-refeição")}>
            <Text style={[styles.pTxt, period === "Pós-refeição" && styles.pTxtActive]}>{t.posRefeicao}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
        <AnimatedButton title={t.salvarRegistro} onPress={handleSave} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  content: { flex: 1, padding: 20, maxWidth: Platform.OS === 'web' ? 600 : undefined, width: '100%', alignSelf: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 10 },
  input: { backgroundColor: '#f9f9f9', height: 60, borderRadius: 15, paddingHorizontal: 20, fontSize: 24, fontWeight: 'bold', color: Colors.primary, marginBottom: 30, borderWidth: 1, borderColor: Colors.border },
  periodContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  pBtn: { flex: 0.48, height: 50, borderRadius: 15, backgroundColor: '#f9f9f9', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  pBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  pTxt: { fontSize: 14, fontWeight: '600', color: Colors.textLight },
  pTxtActive: { color: Colors.white },
});
