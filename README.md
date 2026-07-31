# dIABot 🤖🩺

App de saúde focado em diabetes e saúde bucal, desenvolvido com React Native + Expo. Protótipo funcional com dados salvos localmente via AsyncStorage.

## Funcionalidades

- **Login / Cadastro** — perfil salvo localmente, redirecionamento automático se já logado
- **Home** — saudação personalizada, última glicemia registrada, notícias sobre diabetes e saúde bucal
- **Registros** — adicionar e excluir registros de glicemia, saúde bucal, atividade física e medicação
- **Histórico** — listagem de todos os registros com filtro por categoria e exclusão
- **Calendário** — navegação por meses, criação de eventos (Consulta / Lembrete / Medicação), visualização de registros de saúde por dia
- **Chat** — chatbot simulado com respostas por palavras-chave sobre diabetes, saúde bucal, exercício e medicamentos
- **Ajustes** — exibição do perfil e logout

## Estrutura

```
app/
  (tabs)/
    home.tsx
    calendar.tsx
    records.tsx
    chat.tsx
    settings.tsx
  index.tsx         # Login
  signup.tsx
  history.tsx
  add-glucose.tsx
  add-oral-health.tsx
  add-activity.tsx
  add-medication.tsx

services/
  storage.ts        # AsyncStorage — todos os tipos e funções de dados
  bot.ts            # Lógica do chatbot
  noticias.ts       # Notícias mockadas
```

## Tecnologias

- [Expo](https://expo.dev) + React Native
- AsyncStorage (`@react-native-async-storage/async-storage`)
- Expo Router (file-based routing)
- React Native Web (compatível com browser via Vercel)

## Como rodar

```bash
npm install
npx expo start
```

Para abrir no browser:

```bash
npx expo start --web
```

## Observações técnicas

- `Alert.alert` não funciona no browser — todas as confirmações de exclusão usam `Platform.OS === 'web' ? window.confirm(...) : Alert.alert(...)`
- Registros usam `unshift` no storage, então `lista[0]` é sempre o mais recente
- Telas que precisam recarregar ao voltar usam `useFocusEffect` em vez de `useEffect`
- Logout remove apenas o perfil do usuário, não os registros de saúde
