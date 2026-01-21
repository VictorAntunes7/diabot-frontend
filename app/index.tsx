import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function Index() {
  const router = useRouter(); 
  
  // Estados para capturar o que o usuário digita
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Função que valida os campos antes de entrar
  const handleLogin = () => {
    if (cpf.trim() === "" || password.trim() === "") {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    
    // Se estiver preenchido, limpa o erro e navega para as abas
    setError("");
    router.replace("/(tabs)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
        <View style={styles.card}>
          <Image 
            source={require("../assets/images/logo.jpeg")} 
            style={styles.logo} 
            resizeMode="contain"
          />
          
          <Text style={styles.subtitle}>
            Acesse sua conta para continuar.
          </Text>

          {/* Exibição da mensagem de erro */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput 
            style={[styles.input, error && !cpf ? styles.inputError : null]} 
            placeholder="Digite seu CPF" 
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />

          <TextInput 
            style={[styles.input, error && !password ? styles.inputError : null]} 
            placeholder="Digite sua Senha" 
            placeholderTextColor="#888"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupLabel}>É a sua primeira visita?</Text>
            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.signupButtonText}>cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b3e6b3",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#f8f9fa",
    width: "85%",
    padding: 30,
    borderRadius: 40,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logo: {
    width: 150, 
    height: 150,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10, 
    color: "#000",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end", 
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#999",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#669944", 
    width: "100%",
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    alignItems: "center",
  },
  signupLabel: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#88bb77", 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  signupButtonText: {
    color: "white",
    fontWeight: "600",
  }
});