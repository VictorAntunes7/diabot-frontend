import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

// Importação do Design System
import AnimatedButton from '../components/AnimatedButton';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';

export default function AddMedicationScreen() {
  const router = useRouter();
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!medName || !dosage) {
      Alert.alert("Erro", "Por favor, preencha o nome do medicamento e a dosagem.");
      return;
    }

    setLoading(true);
    // Simulação de salvamento no sistema
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Medicação registrada com sucesso!");
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
          <Text style={styles.headerTitle}>Nova Medicação</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="pill" size={60} color={Colors.warning} />
          </View>

          <Text style={styles.label}>Nome do Medicamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Metformina"
            placeholderTextColor={Colors.placeholder}
            value={medName}
            onChangeText={setMedName}
          />

          <Text style={styles.label}>Dosagem</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 500mg"
            placeholderTextColor={Colors.placeholder}
            value={dosage}
            onChangeText={setDosage}
          />

          <View style={styles.infoBox}>
            <MaterialIcons name="info-outline" size={20} color={Colors.textLight} />
            <Text style={styles.infoText}>
              O horário do registro será salvo automaticamente como o horário atual.
            </Text>
          </View>

          <View style={styles.spacer} />

          <AnimatedButton 
            title="Registrar Medicação" 
            onPress={handleSave} 
            loading={loading}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  headerTitle: { 
    fontSize: Typography.size.subtitle, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text 
  },
  content: { padding: Layout.spacing.l, flexGrow: 1 },
  iconContainer: { alignItems: 'center', marginVertical: 30 },
  label: { 
    fontSize: 16, 
    fontWeight: Typography.weight.semiBold, 
    color: Colors.text, 
    marginBottom: 8,
    marginLeft: 5
  },
  input: {
    backgroundColor: '#f9f9f9',
    height: 55,
    borderRadius: Layout.radius.medium,
    paddingHorizontal: 20,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#fffbe6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ffe58f'
  },
  infoText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 10,
    flex: 1
  },
  spacer: { flex: 1, minHeight: 30 },
});