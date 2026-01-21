import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
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

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleSignUp = () => {
    if (!name || !email || cpf.length < 14 || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    
    // Simulação de cadastro acadêmico
    setTimeout(() => {
      setLoading(false);
      alert("Conta criada com sucesso!");
      router.replace("/"); // Retorna para a tela de Login
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: '100%' }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <Image 
                source={require("../assets/images/logo.jpeg")} 
                style={styles.logo} 
                resizeMode="contain" 
              />
              
              <Text style={styles.welcomeText}>Criar Conta</Text>
              <Text style={styles.subtitle}>Junte-se ao DIABot para cuidar da sua saúde.</Text>

              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Nome Completo" 
                  placeholderTextColor={Colors.placeholder}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input} 
                  placeholder="E-mail" 
                  placeholderTextColor={Colors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input} 
                  placeholder="CPF: 000.000.000-00" 
                  placeholderTextColor={Colors.placeholder}
                  keyboardType="numeric"
                  maxLength={14}
                  value={cpf}
                  onChangeText={(text) => setCpf(formatCPF(text))}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Crie uma Senha" 
                  placeholderTextColor={Colors.placeholder}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <AnimatedButton 
                title="Cadastrar" 
                onPress={handleSignUp} 
                loading={loading}
              />

              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Text style={styles.backButtonText}>Já tenho uma conta. Voltar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    alignItems: "center" 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingVertical: 20 
  },
  card: { 
    backgroundColor: Colors.white, 
    width: "88%", 
    paddingVertical: 25, 
    paddingHorizontal: 22, 
    borderRadius: Layout.radius.card, 
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logo: { 
    width: 100, 
    height: 80, 
    marginBottom: 5 
  },
  welcomeText: { 
    fontSize: Typography.size.title, 
    fontWeight: Typography.weight.bold, 
    color: Colors.text 
  },
  subtitle: { 
    fontSize: Typography.size.caption, 
    color: Colors.textLight, 
    textAlign: "center", 
    marginBottom: 15 
  },
  inputContainer: { 
    width: "100%", 
    marginBottom: 10 
  },
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
  backButton: { 
    marginTop: 15 
  },
  backButtonText: { 
    color: Colors.primary, 
    fontSize: Typography.size.caption, 
    fontWeight: Typography.weight.bold 
  },
});