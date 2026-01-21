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

export default function SettingsScreen() {
  const router = useRouter(); 
  const [notifications, setNotifications] = useState(true);

  // FUNÇÃO DE LOGOUT (Agora apontando para a raiz real)
  const handleLogout = () => {
    // Como renomeamos o index das tabs, o "/" agora só pode ser o seu Login
    router.replace("/"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com Logo */}
      <View style={styles.logoHeader}>
        <Image 
          source={require("../../assets/images/logo2.jpeg")} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Configurações</Text>
        
        {/* SEÇÃO 1: PERFIL DO VICTOR */}
        <View style={styles.sectionCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>V</Text>
            </View>
            <View>
              <Text style={styles.profileName}>Victor</Text>
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
            right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#669944' }} />} 
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

        {/* BOTÃO SAIR (Logout) */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente auxiliar para as linhas de configuração
const SettingItem = ({ icon, label, value, right, onPress }: any) => (
  <TouchableOpacity 
    style={styles.itemRow} 
    onPress={onPress} 
    disabled={!onPress}
  >
    <View style={styles.itemLeft}>
      <MaterialIcons name={icon} size={22} color="#669944" style={styles.itemIcon} />
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    {right ? right : (
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        {onPress && <MaterialIcons name="chevron-right" size={24} color="#ccc" />}
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  logoHeader: { 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  logo: { width: 100, height: 40 },
  content: { 
    paddingHorizontal: 25, // Margem para o título não encostar
    paddingTop: 20,
    paddingBottom: 40 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 25 },
  sectionLabel: { fontSize: 13, fontWeight: 'bold', color: '#999', marginLeft: 10, marginBottom: 10, textTransform: 'uppercase' },
  sectionCard: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 5, 
    marginBottom: 25, 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#669944', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  profileEmail: { fontSize: 14, color: '#666' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemIcon: { marginRight: 12 },
  itemLabel: { fontSize: 16, color: '#333' },
  itemRight: { flexDirection: 'row', alignItems: 'center' },
  itemValue: { fontSize: 14, color: '#999', marginRight: 5 },
  logoutButton: { 
    marginTop: 10, 
    padding: 18, 
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee'
  },
  logoutText: { color: '#ff4444', fontWeight: 'bold', fontSize: 16 },
});