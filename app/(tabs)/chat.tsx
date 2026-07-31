import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { responderBot } from '../../services/bot';
import { MensagemChat, listarMensagens, salvarMensagem } from '../../services/storage';

export default function ChatScreen() {
  const [mensagens, setMensagens] = useState<MensagemChat[]>([]);
  const [texto, setTexto] = useState('');
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    listarMensagens().then(setMensagens);
  }, []);

  async function enviar() {
    const textoLimpo = texto.trim();
    if (!textoLimpo) return;

    const msgUsuario: MensagemChat = {
      id: Date.now().toString(),
      texto: textoLimpo,
      remetente: 'usuario',
      data: new Date().toISOString(),
    };

    const respostaTexto = responderBot(textoLimpo);
    const msgBot: MensagemChat = {
      id: (Date.now() + 1).toString(),
      texto: respostaTexto,
      remetente: 'bot',
      data: new Date().toISOString(),
    };

    await salvarMensagem(msgUsuario);
    await salvarMensagem(msgBot);

    const atualizadas = await listarMensagens();
    setMensagens(atualizadas);
    setTexto('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.botAvatar}>
          <MaterialIcons name="smart-toy" size={22} color={Colors.white} />
        </View>
        <View>
          <Text style={styles.headerTitle}>DIABot</Text>
          <Text style={styles.headerSubtitle}>Assistente de saúde</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={listRef}
          data={mensagens}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="smart-toy" size={48} color={Colors.border} />
              <Text style={styles.emptyTitle}>Olá! Sou o DIABot 👋</Text>
              <Text style={styles.emptyText}>
                Posso te ajudar com dúvidas sobre diabetes e saúde bucal. Como posso ajudar?
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[
              styles.bubble,
              item.remetente === 'usuario' ? styles.bubbleUser : styles.bubbleBot,
            ]}>
              <Text style={[
                styles.bubbleText,
                item.remetente === 'usuario' ? styles.bubbleTextUser : styles.bubbleTextBot,
              ]}>
                {item.texto}
              </Text>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            placeholderTextColor={Colors.placeholder}
            value={texto}
            onChangeText={setTexto}
            multiline
            onSubmitEditing={enviar}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[styles.sendButton, !texto.trim() && styles.sendButtonDisabled]}
            onPress={enviar}
            activeOpacity={0.7}
            disabled={!texto.trim()}
          >
            <MaterialIcons name="send" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: Typography.weight.bold, color: Colors.text },
  headerSubtitle: { fontSize: 12, color: Colors.textLight },
  listContent: { padding: 16, paddingBottom: 8, flexGrow: 1 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60, paddingHorizontal: 30 },
  emptyTitle: { fontSize: 18, fontWeight: Typography.weight.bold, color: Colors.text, marginTop: 16, marginBottom: 8 },
  emptyText: { fontSize: 14, color: Colors.textLight, textAlign: 'center', lineHeight: 20 },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    marginBottom: 8,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bubbleText: { fontSize: 15, lineHeight: 21 },
  bubbleTextUser: { color: Colors.white },
  bubbleTextBot: { color: Colors.text },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: '#f9f9f9',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: { backgroundColor: Colors.border },
});
