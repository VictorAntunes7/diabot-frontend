import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Tipos ---

export type Usuario = {
  nome: string;
  email: string;
  cpf: string;
};

export type RegistroGlicemia = {
  id: string;
  data: string;
  valor: number;
  periodo: 'Jejum' | 'Pós-refeição';
};

export type RegistroSaudeBucal = {
  id: string;
  data: string;
  escovacao: boolean;
  fioDental: boolean;
  enxaguante: boolean;
  observacoes?: string;
};

export type RegistroAtividade = {
  id: string;
  data: string;
  tipo: string;
  duracaoMinutos: number;
};

export type RegistroMedicacao = {
  id: string;
  data: string;
  nome: string;
  dosagem: string;
};

export type MensagemChat = {
  id: string;
  texto: string;
  remetente: 'usuario' | 'bot';
  data: string;
};

export type EventoCalendario = {
  id: string;
  data: string;
  titulo: string;
  tipo: 'Consulta' | 'Lembrete' | 'Medicação';
};

// --- Chaves ---

const CHAVES = {
  usuario: 'usuario',
  glicemia: 'registros_glicemia',
  saudeBucal: 'registros_saude_bucal',
  atividade: 'registros_atividade',
  medicacao: 'registros_medicacao',
  eventos: 'eventos_calendario',
  chat: 'historico_chat',
};

// --- Usuário ---

export async function salvarUsuario(usuario: Usuario) {
  await AsyncStorage.setItem(CHAVES.usuario, JSON.stringify(usuario));
}

export async function obterUsuario(): Promise<Usuario | null> {
  const dados = await AsyncStorage.getItem(CHAVES.usuario);
  return dados ? JSON.parse(dados) : null;
}

export async function removerUsuario() {
  await AsyncStorage.removeItem(CHAVES.usuario);
}

// --- Glicemia ---

export async function salvarGlicemia(registro: RegistroGlicemia) {
  const lista = await listarGlicemia();
  lista.unshift(registro); // mais recente primeiro
  await AsyncStorage.setItem(CHAVES.glicemia, JSON.stringify(lista));
}

export async function listarGlicemia(): Promise<RegistroGlicemia[]> {
  const dados = await AsyncStorage.getItem(CHAVES.glicemia);
  return dados ? JSON.parse(dados) : [];
}

// --- Saúde Bucal ---

export async function salvarSaudeBucal(registro: RegistroSaudeBucal) {
  const lista = await listarSaudeBucal();
  lista.unshift(registro);
  await AsyncStorage.setItem(CHAVES.saudeBucal, JSON.stringify(lista));
}

export async function listarSaudeBucal(): Promise<RegistroSaudeBucal[]> {
  const dados = await AsyncStorage.getItem(CHAVES.saudeBucal);
  return dados ? JSON.parse(dados) : [];
}

// --- Atividade ---

export async function salvarAtividade(registro: RegistroAtividade) {
  const lista = await listarAtividades();
  lista.unshift(registro);
  await AsyncStorage.setItem(CHAVES.atividade, JSON.stringify(lista));
}

export async function listarAtividades(): Promise<RegistroAtividade[]> {
  const dados = await AsyncStorage.getItem(CHAVES.atividade);
  return dados ? JSON.parse(dados) : [];
}

// --- Medicação ---

export async function salvarMedicacao(registro: RegistroMedicacao) {
  const lista = await listarMedicacoes();
  lista.unshift(registro);
  await AsyncStorage.setItem(CHAVES.medicacao, JSON.stringify(lista));
}

export async function listarMedicacoes(): Promise<RegistroMedicacao[]> {
  const dados = await AsyncStorage.getItem(CHAVES.medicacao);
  return dados ? JSON.parse(dados) : [];
}

// --- Remoção ---

export async function removerGlicemia(id: string) {
  const lista = await listarGlicemia();
  await AsyncStorage.setItem(CHAVES.glicemia, JSON.stringify(lista.filter(i => i.id !== id)));
}

export async function removerSaudeBucal(id: string) {
  const lista = await listarSaudeBucal();
  await AsyncStorage.setItem(CHAVES.saudeBucal, JSON.stringify(lista.filter(i => i.id !== id)));
}

export async function removerAtividade(id: string) {
  const lista = await listarAtividades();
  await AsyncStorage.setItem(CHAVES.atividade, JSON.stringify(lista.filter(i => i.id !== id)));
}

export async function removerMedicacao(id: string) {
  const lista = await listarMedicacoes();
  await AsyncStorage.setItem(CHAVES.medicacao, JSON.stringify(lista.filter(i => i.id !== id)));
}

// --- Eventos do Calendário ---

export async function salvarEvento(evento: EventoCalendario) {
  const lista = await listarEventos();
  lista.push(evento);
  await AsyncStorage.setItem(CHAVES.eventos, JSON.stringify(lista));
}

export async function listarEventos(): Promise<EventoCalendario[]> {
  const dados = await AsyncStorage.getItem(CHAVES.eventos);
  return dados ? JSON.parse(dados) : [];
}

export async function removerEvento(id: string) {
  const lista = await listarEventos();
  await AsyncStorage.setItem(CHAVES.eventos, JSON.stringify(lista.filter(e => e.id !== id)));
}

// --- Chat ---

export async function salvarMensagem(mensagem: MensagemChat) {
  const lista = await listarMensagens();
  lista.push(mensagem);
  await AsyncStorage.setItem(CHAVES.chat, JSON.stringify(lista));
}

export async function listarMensagens(): Promise<MensagemChat[]> {
  const dados = await AsyncStorage.getItem(CHAVES.chat);
  return dados ? JSON.parse(dados) : [];
}
