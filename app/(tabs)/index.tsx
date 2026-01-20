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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
        <View style={styles.card}>
          <Image 
            source={require("../../assets/images/logo.jpeg")} 
            style={styles.logo} 
            resizeMode="contain"
          />
          
          <Text style={[styles.subtitle, { marginBottom: 2 }]}>
            Bem-vindo(a) de volta!
          </Text>
          <Text style={styles.subtitle}>
            Acesse sua conta para continuar.
          </Text>

          <TextInput 
            style={styles.input} 
            placeholder="Digite seu CPF" 
            placeholderTextColor="#888"
            keyboardType="numeric"
          />

          <TextInput 
            style={styles.input} 
            placeholder="Digite sua Senha" 
            placeholderTextColor="#888"
            secureTextEntry={true}
          />

          {/* Link para Esqueci minha senha */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Seção de Cadastro */}
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
    backgroundColor: "#b3e6b3", // Fundo verde claro
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#f8f9fa",
    width: "85%",
    padding: 30,
    borderRadius: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
 logo: {
    width: 150, // Ajuste conforme o tamanho da sua imagem
    height: 150,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10, // Diminuímos um pouco para o "esqueci" ficar perto
    color: "#000",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end", // Alinha o texto à direita
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#999",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#669944", // Verde principal
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
    backgroundColor: "#88bb77", // Verde um pouco mais claro para o cadastro
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  signupButtonText: {
    color: "white",
    fontWeight: "600",
  }
});