import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

// Importação do Design System e Componentes
import AnimatedButton from '../components/AnimatedButton';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';

export default function LoginScreen() {
  const router = useRouter(); 
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '') 
      .replace(/(\d{3})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') 
      .replace(/(-\d{2})\d+?$/, '$1'); 
  };

  const handleCpfChange = (text: string) => {
    setCpf(formatCPF(text));
  };

  const handleLogin = () => {
    if (cpf.length < 14 || password.trim() === "") {
      setError("Campos inválidos.");
      return;
    }
    
    setError("");
    setLoading(true);

    // Simulação de autenticação acadêmica
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)/home"); 
    }, 1200);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          
          <View style={styles.logoContainer}>
            <Image 
              source={require("../assets/images/logo.jpeg")} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          </View>
          
          <Text style={styles.welcomeText}>Bem-vindo(a) de volta!</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar.</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, error && cpf.length < 14 ? styles.inputError : null]} 
              placeholder="CPF: 000.000.000-00" 
              placeholderTextColor={Colors.placeholder}
              keyboardType="numeric"
              maxLength={14}
              value={cpf}
              onChangeText={handleCpfChange}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, error && !password ? styles.inputError : null]} 
              placeholder="Senha" 
              placeholderTextColor={Colors.placeholder}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <AnimatedButton 
            title="Entrar" 
            onPress={handleLogin} 
            loading={loading}
          />

          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.orText}>ou</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            activeOpacity={0.7}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.secondaryButtonText}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  card: { 
    backgroundColor: Colors.card, 
    width: "88%", 
    paddingVertical: Layout.spacing.l, 
    paddingHorizontal: Layout.spacing.l, 
    borderRadius: Layout.radius.card, 
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logoContainer: { 
    width: 140, 
    height: 110, 
    marginBottom: Layout.spacing.xs, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logo: { width: '100%', height: '100%' },
  welcomeText: { 
    fontSize: Typography.size.title, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text 
  },
  subtitle: { 
    fontSize: Typography.size.caption, 
    color: Colors.textLight, 
    textAlign: "center", 
    marginBottom: 12 
  },
  errorText: { 
    color: Colors.error, 
    fontSize: 11, 
    marginBottom: 8, 
    fontWeight: Typography.weight.semiBold 
  },
  inputContainer: { width: "100%", marginBottom: 8 },
  input: { 
    width: "100%", 
    height: 46, 
    backgroundColor: "#f9f9f9", 
    borderRadius: Layout.radius.input, 
    paddingHorizontal: 15, 
    fontSize: 14, 
    borderWidth: 1, 
    borderColor: Colors.border 
  },
  inputError: { borderColor: Colors.error },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 15, marginRight: 10 },
  forgotText: { 
    color: Colors.primary, 
    fontSize: Typography.size.caption, 
    fontWeight: Typography.weight.bold 
  },
  separator: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginVertical: 12, 
    width: "80%" 
  },
  line: { flex: 1, height: 1, backgroundColor: Colors.border },
  orText: { marginHorizontal: 10, color: Colors.placeholder, fontSize: 11 },
  secondaryButton: { 
    width: "75%", 
    height: 42, 
    borderRadius: 21, 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 1.5, 
    borderColor: Colors.primary 
  },
  secondaryButtonText: { 
    color: Colors.primary, 
    fontSize: 13, 
    fontWeight: Typography.weight.semiBold 
  },
});