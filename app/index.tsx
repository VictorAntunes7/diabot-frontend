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

export default function LoginScreen() {
  const router = useRouter(); 
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    
    // CORREÇÃO DA ROTA: Como renomeamos o arquivo para home.tsx,
    // precisamos apontar para a rota específica.
    router.replace("/(tabs)/home"); 
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
          
          <Text style={styles.welcomeText}>Bem-vindo ao DIABot!</Text>
          <Text style={styles.subtitle}>Sua saúde com monitoramento inteligente.</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, error && cpf.length < 14 ? styles.inputError : null]} 
              placeholder="CPF: 000.000.000-00" 
              placeholderTextColor="#aaa"
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
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.orText}>ou</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#b3e6b3", justifyContent: "center", alignItems: "center" },
  card: { 
    backgroundColor: "#f8f9fa", 
    width: "88%", 
    paddingVertical: 20, 
    paddingHorizontal: 22, 
    borderRadius: 35, 
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logoContainer: { width: 140, height: 110, marginBottom: 5, justifyContent: 'center', alignItems: 'center' },
  logo: { width: '100%', height: '100%' },
  welcomeText: { fontSize: 20, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 13, color: "#777", textAlign: "center", marginBottom: 12 },
  errorText: { color: "#d32f2f", fontSize: 11, marginBottom: 8, fontWeight: "600" },
  inputContainer: { width: "100%", marginBottom: 8 },
  input: { width: "100%", height: 46, backgroundColor: "#f9f9f9", borderRadius: 20, paddingHorizontal: 15, fontSize: 14, borderWidth: 1, borderColor: "#eee" },
  inputError: { borderColor: "#ff4444" },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 12, marginRight: 10 },
  forgotText: { color: "#669944", fontSize: 12, fontWeight: "bold" },
  primaryButton: { backgroundColor: "#669944", width: "100%", height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  primaryButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  separator: { flexDirection: "row", alignItems: "center", marginVertical: 10, width: "80%" },
  line: { flex: 1, height: 1, backgroundColor: "#eee" },
  orText: { marginHorizontal: 10, color: "#bbb", fontSize: 11 },
  secondaryButton: { width: "75%", height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "#669944" },
  secondaryButtonText: { color: "#669944", fontSize: 13, fontWeight: "600" },
});