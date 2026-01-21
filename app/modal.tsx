import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importação do seu Design System
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Typography } from '../constants/Typography';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* StatusBar clara para contrastar com o cabeçalho do modal no iOS */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
      <Image 
        source={require("../assets/images/logo.jpeg")} 
        style={styles.logo} 
        resizeMode="contain" 
      />

      <View style={styles.content}>
        <Text style={styles.title}>Sobre o DIABot</Text>
        <Text style={styles.description}>
          O DIABot é um assistente inteligente desenvolvido para auxiliar no controle do diabetes e na manutenção da saúde bucal.
        </Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Versão: 1.0.0 (Beta)</Text>
          <Text style={styles.infoText}>Projeto Acadêmico - UFF</Text>
        </View>
      </View>

      {/* Botão para fechar o modal e voltar para onde o usuário estava */}
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.closeButtonText}>Entendido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: Typography.size.title,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
    marginBottom: 15,
  },
  description: {
    fontSize: Typography.size.body,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  infoBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.card,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: Typography.size.caption,
    color: Colors.textLight,
    marginVertical: 2,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: Layout.radius.button,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: Typography.weight.bold,
    fontSize: 16,
  },
});