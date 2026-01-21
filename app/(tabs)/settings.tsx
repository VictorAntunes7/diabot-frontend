import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Importação do seu Design System e Mocks
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { MockUser } from '../../constants/MockData';
import { Typography } from '../../constants/Typography';

export default function SettingsScreen() {
  const router = useRouter(); 
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    router.replace("/"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho Fixo */}
      <View style={styles.logoHeader}>
        <Image 
          source={require("../../assets/images/logo2.jpeg")} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>
      
      {/* O contentContainerStyle é quem manda na rolagem final */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Configurações</Text>
        
        {/* SEÇÃO 1: PERFIL */}
        <View style={styles.sectionCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{MockUser.name.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.profileName}>{MockUser.name}</Text>
              <Text style={styles.profileEmail}>victor@uff.br</Text>
            </View>
          </View>
        </View>

        {/* SEÇÃO 2: PREFERÊNCIAS */}
        <Text style={styles.sectionLabel}>Preferências</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon="notifications" 
            label="Notificações" 
            right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: Colors.primary }} />} 
          />
          <SettingItem icon="lock" label="Segurança" onPress={() => {}} />
          <SettingItem icon="language" label="Idioma" value="Português" onPress={() => {}} />
        </View>

        {/* SEÇÃO 3: SOBRE O DIABOT */}
        <Text style={styles.sectionLabel}>Sobre o DIABot</Text>
        <View style={styles.sectionCard}>
          <SettingItem icon="info" label="Versão do App" value="1.0.0" />
          <SettingItem icon="description" label="Termos de Uso" onPress={() => {}} />
          <SettingItem icon="help" label="Ajuda e Suporte" onPress={() => {}} />
        </View>

        {/* BOTÃO SAIR */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* --- ESTE É O AJUSTE: Espaçador invisível para não cortar o texto --- */}
        <View style={{ height: 100 }} /> 
        
      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-componente de item
const SettingItem = ({ icon, label, value, right, onPress }: any) => (
  <TouchableOpacity style={styles.itemRow} onPress={onPress} disabled={!onPress}>
    <View style={styles.itemLeft}>
      <MaterialIcons name={icon} size={22} color={Colors.primary} style={styles.itemIcon} />
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    {right ? right : (
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        {onPress && <MaterialIcons name="chevron-right" size={24} color={Colors.placeholder} />}
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  logoHeader: { 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: Colors.card, 
    borderBottomWidth: 1, 
    borderBottomColor: Colors.border 
  },
  logo: { width: 100, height: 40 },
  scrollContent: { 
    paddingHorizontal: 25,
    paddingTop: 20,
    // Deixamos um padding generoso aqui também por segurança
    paddingBottom: 20, 
  },
  title: { fontSize: Typography.size.title, fontWeight: Typography.weight.bold, color: Colors.text, marginBottom: 25 },
  sectionLabel: { fontSize: Typography.size.tiny, fontWeight: Typography.weight.bold, color: Colors.textLight, marginLeft: 10, marginBottom: 10, textTransform: 'uppercase' },
  sectionCard: { 
    backgroundColor: Colors.white, 
    borderRadius: Layout.radius.medium, 
    padding: 5, 
    marginBottom: 25, 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  avatarText: { color: Colors.white, fontSize: 22, fontWeight: Typography.weight.bold },
  profileName: { fontSize: Typography.size.subtitle, fontWeight: Typography.weight.bold, color: Colors.text },
  profileEmail: { fontSize: 14, color: Colors.textLight },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: Colors.border },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemIcon: { marginRight: 12 },
  itemLabel: { fontSize: Typography.size.body, color: Colors.text },
  itemRight: { flexDirection: 'row', alignItems: 'center' },
  itemValue: { fontSize: 14, color: Colors.placeholder, marginRight: 5 },
  logoutButton: { 
    marginTop: 10, 
    padding: 18, 
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.medium,
    borderWidth: 1,
    borderColor: Colors.border
  },
  logoutText: { color: Colors.error, fontWeight: Typography.weight.bold, fontSize: 16 },
});