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

export default function AddOralHealthScreen() {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Estados para as atividades
  const [activities, setActivities] = useState({
    brushing: false,
    flossing: false,
    mouthwash: false,
  });

  const toggleActivity = (key: keyof typeof activities) => {
    setActivities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    if (!activities.brushing && !activities.flossing && !activities.mouthwash && !notes) {
      Alert.alert("Aviso", "Por favor, selecione pelo menos uma atividade ou adicione uma nota.");
      return;
    }

    setLoading(true);
    // Simulação de salvamento no sistema
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Registo de saúde bucal guardado!");
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
          <Text style={styles.headerTitle}>Saúde Bucal</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.label}>O que realizou agora?</Text>
          
          <View style={styles.optionsGrid}>
            <SelectionCard 
              icon="tooth" 
              label="Escovação" 
              active={activities.brushing} 
              onPress={() => toggleActivity('brushing')} 
            />
            <SelectionCard 
              icon="multi-flat" 
              label="Fio Dental" 
              active={activities.flossing} 
              onPress={() => toggleActivity('flossing')} 
            />
            <SelectionCard 
              icon="cup-water" 
              label="Enxaguante" 
              active={activities.mouthwash} 
              onPress={() => toggleActivity('mouthwash')} 
            />
          </View>

          <Text style={styles.label}>Observações (Opcional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Ex: Notei um pequeno sangramento na gengiva..."
            placeholderTextColor={Colors.placeholder}
            multiline={true}
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />

          <View style={styles.spacer} />

          <AnimatedButton 
            title="Guardar Registo" 
            onPress={handleSave} 
            loading={loading}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

// Componente para os cartões de seleção
const SelectionCard = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity 
    style={[styles.selectionCard, active && styles.selectionCardActive]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <MaterialCommunityIcons 
      name={icon} 
      size={32} 
      color={active ? Colors.white : Colors.primary} 
    />
    <Text style={[styles.selectionText, active && styles.selectionTextActive]}>{label}</Text>
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
  headerTitle: { 
    fontSize: Typography.size.subtitle, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text 
  },
  content: { padding: Layout.spacing.l, flexGrow: 1 },
  label: { 
    fontSize: 16, 
    fontWeight: Typography.weight.semiBold, 
    color: Colors.text, 
    marginBottom: 15,
    marginTop: 10
  },
  optionsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30 
  },
  selectionCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 5
  },
  selectionCardActive: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  selectionText: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: Colors.text, 
    marginTop: 8,
    textAlign: 'center' 
  },
  selectionTextActive: { color: Colors.white },
  textArea: {
    backgroundColor: '#f9f9f9',
    borderRadius: Layout.radius.medium,
    padding: 15,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    textAlignVertical: 'top',
    height: 120,
    marginBottom: 30
  },
  spacer: { flex: 1 },
});