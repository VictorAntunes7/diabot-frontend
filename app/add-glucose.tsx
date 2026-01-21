import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AnimatedButton from '../components/AnimatedButton';
import { Colors } from '../constants/Colors';
// Removi o SuccessModal temporariamente para você testar se o erro some
// Se funcionar, a gente volta ele com o caminho certo

export default function AddGlucoseScreen() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [period, setPeriod] = useState("Jejum");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!value || isNaN(Number(value))) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="close" size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Glicemia</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Valor da Glicemia (mg/dL)</Text>
          <TextInput
            style={styles.input}
            placeholder="110"
            placeholderTextColor={Colors.placeholder}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />

          <Text style={styles.label}>Período</Text>
          <View style={styles.periodContainer}>
            <TouchableOpacity 
              style={[styles.pBtn, period === "Jejum" && styles.pBtnActive]} 
              onPress={() => setPeriod("Jejum")}
            >
              <Text style={[styles.pTxt, period === "Jejum" && styles.pTxtActive]}>Jejum</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.pBtn, period === "Pós-refeição" && styles.pBtnActive]} 
              onPress={() => setPeriod("Pós-refeição")}
            >
              <Text style={[styles.pTxt, period === "Pós-refeição" && styles.pTxtActive]}>Pós-refeição</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
          <AnimatedButton title="Salvar Registro" onPress={handleSave} loading={loading} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  content: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 10 },
  input: { backgroundColor: '#f9f9f9', height: 60, borderRadius: 15, paddingHorizontal: 20, fontSize: 24, fontWeight: 'bold', color: Colors.primary, marginBottom: 30, borderWidth: 1, borderColor: Colors.border },
  periodContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  pBtn: { flex: 0.48, height: 50, borderRadius: 15, backgroundColor: '#f9f9f9', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  pBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  pTxt: { fontSize: 14, fontWeight: '600', color: Colors.textLight },
  pTxtActive: { color: Colors.white },
});