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

export default function AddActivityScreen() {
  const router = useRouter();
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("Caminhada");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!duration || isNaN(Number(duration))) {
      Alert.alert("Erro", "Por favor, insira uma duração válida em minutos.");
      return;
    }

    setLoading(true);
    // Simulação de salvamento
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Atividade registada com sucesso!");
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
          <Text style={styles.headerTitle}>Nova Atividade</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.label}>Tipo de Atividade</Text>
          
          <View style={styles.optionsGrid}>
            <ActivityCard 
              icon="walk" 
              label="Caminhada" 
              active={type === "Caminhada"} 
              onPress={() => setType("Caminhada")} 
            />
            <ActivityCard 
              icon="run" 
              label="Corrida" 
              active={type === "Corrida"} 
              onPress={() => setType("Corrida")} 
            />
            <ActivityCard 
              icon="bike" 
              label="Ciclismo" 
              active={type === "Ciclismo"} 
              onPress={() => setType("Ciclismo")} 
            />
          </View>

          <Text style={styles.label}>Duração (minutos)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 30"
            placeholderTextColor={Colors.placeholder}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />

          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="lightning-bolt" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>
              A atividade física ajuda a baixar os níveis de açúcar no sangue.
            </Text>
          </View>

          <View style={styles.spacer} />

          <AnimatedButton 
            title="Salvar Atividade" 
            onPress={handleSave} 
            loading={loading}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const ActivityCard = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity 
    style={[styles.activityCard, active && styles.activityCardActive]} 
    onPress={onPress}
  >
    <MaterialCommunityIcons 
      name={icon} 
      size={30} 
      color={active ? Colors.white : Colors.primary} 
    />
    <Text style={[styles.activityLabel, active && styles.activityLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

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
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  content: { padding: Layout.spacing.l, flexGrow: 1 },
  label: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 15, marginTop: 10 },
  optionsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  activityCard: {
    width: '31%',
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border
  },
  activityCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  activityLabel: { fontSize: 12, fontWeight: 'bold', color: Colors.text, marginTop: 8 },
  activityLabelActive: { color: Colors.white },
  input: {
    backgroundColor: '#f9f9f9',
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#eef5ea',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary + '30'
  },
  infoText: { fontSize: 13, color: Colors.textLight, marginLeft: 10, flex: 1 },
  spacer: { flex: 1, minHeight: 30 },
});