import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Typography } from '../../constants/Typography';
import { Idioma, Traducao, obterIdioma, salvarIdioma, traducoes } from '../../services/i18n';
import { Usuario, obterUsuario, removerUsuario } from '../../services/storage';

const IDIOMAS: { valor: Idioma; label: string; flag: string }[] = [
  { valor: 'pt', label: 'Português', flag: '🇧🇷' },
  { valor: 'en', label: 'English', flag: '🇺🇸' },
  { valor: 'es', label: 'Español', flag: '🇪🇸' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [idioma, setIdioma] = useState<Idioma>('pt');
  const [modalIdioma, setModalIdioma] = useState(false);
  const [idiomaAlterado, setIdiomaAlterado] = useState(false);

  useEffect(() => {
    obterUsuario().then(setUsuario);
    obterIdioma().then(setIdioma);
  }, []);

  const t: Traducao = traducoes[idioma];

  async function selecionarIdioma(novoIdioma: Idioma) {
    await salvarIdioma(novoIdioma);
    setIdioma(novoIdioma);
    setModalIdioma(false);
    setIdiomaAlterado(novoIdioma !== idioma);
  }

  const handleLogout = async () => {
    await removerUsuario();
    router.replace("/");
  };

  const idiomaAtual = IDIOMAS.find(i => i.valor === idioma);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoHeader}>
        <Image
          source={require("../../assets/images/logo2.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>{t.configuracoes}</Text>

        <View style={styles.sectionCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(usuario?.nome ?? 'U').charAt(0).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.profileName}>{usuario?.nome ?? 'Usuário'}</Text>
              <Text style={styles.profileEmail}>{usuario?.email ?? ''}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>{t.preferencias}</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="notifications"
            label={t.notificacoes}
            right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: Colors.primary }} />}
          />
          <SettingItem icon="lock" label={t.seguranca} onPress={() => {}} />
          <SettingItem
            icon="language"
            label={t.idioma}
            value={`${idiomaAtual?.flag} ${idiomaAtual?.label}`}
            onPress={() => setModalIdioma(true)}
            rightExtra={idiomaAlterado ? (
              <TouchableOpacity
                onPress={() => { if (Platform.OS === 'web') (window as any).location.reload(); }}
                style={styles.reloadButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons name="refresh" size={20} color={Colors.primary} />
              </TouchableOpacity>
            ) : undefined}
          />
        </View>

        <Text style={styles.sectionLabel}>{t.sobreApp}</Text>
        <View style={styles.sectionCard}>
          <SettingItem icon="info" label={t.versaoApp} value="1.0.0" />
          <SettingItem icon="description" label={t.termosUso} onPress={() => {}} />
          <SettingItem icon="help" label={t.ajuda} onPress={() => {}} />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>{t.sair}</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal visible={modalIdioma} transparent animationType="fade" onRequestClose={() => setModalIdioma(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalIdioma(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{t.idioma}</Text>
            {IDIOMAS.map(item => (
              <TouchableOpacity
                key={item.valor}
                style={[styles.idiomaRow, idioma === item.valor && styles.idiomaRowActive]}
                onPress={() => selecionarIdioma(item.valor)}
              >
                <Text style={styles.idiomaFlag}>{item.flag}</Text>
                <Text style={[styles.idiomaLabel, idioma === item.valor && styles.idiomaLabelActive]}>
                  {item.label}
                </Text>
                {idioma === item.valor && (
                  <MaterialIcons name="check" size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const SettingItem = ({ icon, label, value, right, rightExtra, onPress }: any) => (
  <TouchableOpacity style={styles.itemRow} onPress={onPress} disabled={!onPress}>
    <View style={styles.itemLeft}>
      <MaterialIcons name={icon} size={22} color={Colors.primary} style={styles.itemIcon} />
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    {right ? right : (
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        {rightExtra}
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
    paddingBottom: 20,
    maxWidth: Platform.OS === 'web' ? 700 : undefined,
    width: '100%',
    alignSelf: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    width: '80%',
    maxWidth: 340,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalTitle: { fontSize: 16, fontWeight: Typography.weight.bold, color: Colors.text, marginBottom: 16 },
  reloadButton: {
    marginRight: 4,
    padding: 2,
  },
  idiomaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 4,
  },
  idiomaRowActive: { backgroundColor: `${Colors.primary}15` },
  idiomaFlag: { fontSize: 22, marginRight: 12 },
  idiomaLabel: { flex: 1, fontSize: 16, color: Colors.text },
  idiomaLabelActive: { color: Colors.primary, fontWeight: Typography.weight.bold },
});
