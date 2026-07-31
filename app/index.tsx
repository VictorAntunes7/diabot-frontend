import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import AnimatedButton from '../components/AnimatedButton';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';
import { Idioma, Traducao, obterIdioma, traducoes } from '../services/i18n';
import { obterUsuario } from '../services/storage';

export default function LoginScreen() {
  const router = useRouter();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [idioma, setIdioma] = useState<Idioma>('pt');

  useEffect(() => {
    obterIdioma().then(setIdioma);
    obterUsuario().then(usuario => {
      if (usuario) router.replace('/(tabs)/home');
      else setVerificando(false);
    });
  }, []);

  if (verificando) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  const t: Traducao = traducoes[idioma];

  const formatCPF = (value: string) =>
    value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');

  const handleLogin = () => {
    if (cpf.length < 14 || password.trim() === "") {
      setError(t.camposInvalidos);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)/home");
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.welcomeText}>{t.bemVindo}</Text>
        <Text style={styles.subtitle}>{t.acesseSuaConta}</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error && cpf.length < 14 ? styles.inputError : null]}
            placeholder={t.placeholderCpf}
            placeholderTextColor={Colors.placeholder}
            keyboardType="numeric"
            maxLength={14}
            value={cpf}
            onChangeText={(text) => setCpf(formatCPF(text))}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error && !password ? styles.inputError : null]}
            placeholder={t.placeholderSenha}
            placeholderTextColor={Colors.placeholder}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
          <Text style={styles.forgotText}>{t.esqueceuSenha}</Text>
        </TouchableOpacity>

        <AnimatedButton title={t.entrar} onPress={handleLogin} loading={loading} />

        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>{t.ou}</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7} onPress={() => router.push("/signup")}>
          <Text style={styles.secondaryButtonText}>{t.criarConta}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: Colors.card, width: "88%",
    maxWidth: Platform.OS === 'web' ? 440 : undefined,
    paddingVertical: Layout.spacing.l, paddingHorizontal: Layout.spacing.l,
    borderRadius: Layout.radius.card, alignItems: "center",
    elevation: 5, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10,
  },
  logoContainer: { width: 140, height: 110, marginBottom: Layout.spacing.xs, justifyContent: 'center', alignItems: 'center' },
  logo: { width: '100%', height: '100%' },
  welcomeText: { fontSize: Typography.size.title, fontWeight: Typography.weight.bold, color: Colors.text },
  subtitle: { fontSize: Typography.size.caption, color: Colors.textLight, textAlign: "center", marginBottom: 12 },
  errorText: { color: Colors.error, fontSize: 11, marginBottom: 8, fontWeight: Typography.weight.semiBold },
  inputContainer: { width: "100%", marginBottom: 8 },
  input: { width: "100%", height: 46, backgroundColor: "#f9f9f9", borderRadius: Layout.radius.input, paddingHorizontal: 15, fontSize: 14, borderWidth: 1, borderColor: Colors.border },
  inputError: { borderColor: Colors.error },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 15, marginRight: 10 },
  forgotText: { color: Colors.primary, fontSize: Typography.size.caption, fontWeight: Typography.weight.bold },
  separator: { flexDirection: "row", alignItems: "center", marginVertical: 12, width: "80%" },
  line: { flex: 1, height: 1, backgroundColor: Colors.border },
  orText: { marginHorizontal: 10, color: Colors.placeholder, fontSize: 11 },
  secondaryButton: { width: "75%", height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: Colors.primary },
  secondaryButtonText: { color: Colors.primary, fontSize: 13, fontWeight: Typography.weight.semiBold },
});
