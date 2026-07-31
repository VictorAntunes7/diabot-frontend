import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Typography } from '../../constants/Typography';
import { noticiasMock } from '../../services/noticias';
import { Usuario, listarGlicemia, obterUsuario } from '../../services/storage';

export default function HomeScreen() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [ultimaGlicemia, setUltimaGlicemia] = useState<{ valor: number; periodo: string } | null>(null);

  useFocusEffect(
    useCallback(() => {
      obterUsuario().then(setUsuario);
      listarGlicemia().then((lista) => {
        if (lista.length > 0) setUltimaGlicemia({ valor: lista[0].valor, periodo: lista[0].periodo });
      });
    }, [])
  );

  const nomeExibido = usuario?.nome.split(' ')[0] ?? 'Usuário';

  const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const hojeFormatado = hoje.charAt(0).toUpperCase() + hoje.slice(1);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo2.jpeg")}
          style={styles.logoHeader}
          resizeMode="contain"
        />
      </View>

      {/* Banner de versão demo */}
      <View style={styles.demoBanner}>
        <MaterialIcons name="info-outline" size={14} color="#7a5c00" />
        <Text style={styles.demoBannerText}>
          Versão de demonstração — dados salvos apenas neste dispositivo. Não substitui acompanhamento médico.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.welcomeText}>Olá, {nomeExibido}! 👋</Text>
        <Text style={styles.dateText}>{hojeFormatado}</Text>

        <View style={styles.glucoseCard}>
          <View style={styles.circle}>
            <View style={styles.textContainer}>
              <Text style={styles.glucoseValue}>
                {ultimaGlicemia ? ultimaGlicemia.valor : '—'}
              </Text>
              <Text style={styles.glucoseUnit}>mg/dL</Text>
            </View>
          </View>
          <Text style={styles.glucoseStatus}>Última Glicemia</Text>
          <Text style={styles.glucoseTime}>
            {ultimaGlicemia ? ultimaGlicemia.periodo : 'Nenhum registro ainda'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Últimas Notícias</Text>

        {noticiasMock.map((item) => (
          <TouchableOpacity key={item.id} style={styles.newsCard} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <MaterialIcons name={item.icon} size={24} color={Colors.primary} />
            </View>
            <View style={styles.newsText}>
              <Text style={styles.newsTitle}>{item.titulo}</Text>
              <Text style={styles.newsSubtitle}>{item.resumo}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.placeholder} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.card,
  },
  logoHeader: { width: 120, height: 50 },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ffe082',
    gap: 6,
  },
  demoBannerText: { flex: 1, fontSize: 11, color: '#7a5c00', lineHeight: 16 },
  content: { padding: Layout.spacing.l, paddingBottom: 40 },
  welcomeText: {
    fontSize: Typography.size.title,
    fontWeight: Typography.weight.bold,
    color: Colors.text
  },
  dateText: { fontSize: 14, color: Colors.textLight, marginBottom: 20 },
  glucoseCard: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    borderTopColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderRightColor: Colors.primary,
    borderBottomColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginBottom: 10,
    transform: [{ rotate: '-45deg' }],
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
  },
  glucoseValue: { fontSize: 36, fontWeight: Typography.weight.bold, color: Colors.text },
  glucoseUnit: { fontSize: 14, color: Colors.textLight },
  glucoseStatus: { fontSize: 16, fontWeight: Typography.weight.semiBold, color: Colors.primary },
  glucoseTime: { fontSize: 12, color: Colors.placeholder },
  sectionTitle: {
    fontSize: Typography.size.subtitle,
    fontWeight: Typography.weight.bold,
    marginBottom: 15,
    color: Colors.text
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.m,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#eef5ea',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  newsText: { flex: 1 },
  newsTitle: { fontSize: 16, fontWeight: Typography.weight.bold, color: Colors.text },
  newsSubtitle: { fontSize: 13, color: Colors.textLight },
});