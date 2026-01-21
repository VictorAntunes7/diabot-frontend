import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Importação das suas constantes de cores
import { Colors } from '../constants/Colors';

export const unstable_settings = {
  // Garante que o botão de voltar não quebre o fluxo das abas
  anchor: '(tabs)',
};

export default function RootLayout() {
  // Criamos um tema customizado baseado no DefaultTheme para o DIABot
  const DiabotTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.background, // Usa o verde #b3e6b3 definido
    },
  };

  return (
    <ThemeProvider value={DiabotTheme}>
      {/* Escondemos o cabeçalho global para usar nossos headers customizados */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tela inicial (Login) */}
        <Stack.Screen name="index" /> 
        
        {/* Tela de Cadastro (Adicionada conforme seu Explorer) */}
        <Stack.Screen name="signup" /> 
        
        {/* Grupo de Abas principais */}
        <Stack.Screen name="(tabs)" />
        
        {/* Modais de sistema ou alertas */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            headerShown: true, 
            title: 'Informação' 
          }} 
        />
      </Stack>
      
      {/* StatusBar fixa em 'dark' para os ícones ficarem pretos sobre o fundo verde claro */}
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}