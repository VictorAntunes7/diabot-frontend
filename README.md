DIABot - Monitoramento Integrado de Diabetes e Saúde Bucal
O DIABot é uma solução mobile projetada para auxiliar pacientes diabéticos no gerenciamento diário de sua condição, com o diferencial estratégico de monitorar a saúde bucal — um fator frequentemente negligenciado, mas que possui correlação direta com o controle glicêmico.

O aplicativo centraliza o registro de níveis de glicose, medicação, atividades físicas e hábitos de higiene oral, quebrando o ciclo vicioso onde infecções bucais dificultam o controle da glicemia e vice-versa.

💻 Especificações Técnicas do Frontend
Como um projeto desenvolvido dentro do curso de Sistemas de Informação na UFF, o frontend do DIABot foi construído com foco em padrões de engenharia modernos, escalabilidade e uma experiência de usuário (UX) intuitiva.

🏗️ Arquitetura e Navegação
Expo Router (File-based Routing): Implementação de roteamento baseado no sistema de arquivos, garantindo uma estrutura de navegação limpa e declarativa. O app utiliza uma interface de abas (Tabs) para acesso rápido às funcionalidades principais e uma pilha de navegação (Stack) para fluxos de formulários e históricos.

Estrutura Modular: Organização de diretórios que separa logicamente as rotas (app/), componentes reutilizáveis (components/) e definições globais (constants/), facilitando a manutenção e futuras expansões do código.

🎨 Design System e Estilização
Design Tokens (Single Source of Truth): Centralização da identidade visual através de arquivos de constantes (Colors.ts, Layout.ts, Typography.ts). Essa abordagem permite que o app mantenha consistência estética absoluta e suporte mudanças globais de interface com esforço mínimo.

Componentização Avançada: Desenvolvimento de componentes modulares como AnimatedButton, ActionButton e RecordCard. O uso de propriedades (props) permite que o mesmo componente assuma diferentes estados visuais, reduzindo a duplicidade de código.

Responsividade Adaptativa: Utilização de SafeAreaView e ScrollView para garantir que a interface se adapte perfeitamente a diferentes tamanhos de dispositivos e orientações de tela.

⌨️ Desenvolvimento com TypeScript
Tipagem Estática: O projeto foi desenvolvido 100% em TypeScript, garantindo segurança no fluxo de dados e reduzindo erros em tempo de execução.

Interfaces de Contrato: Definição de tipos rigorosos para os registros de saúde, preparando o frontend para uma integração transparente com APIs REST ou bancos de dados locais (como SQLite ou AsyncStorage).

🔄 UX e Interatividade
Feedback Visual Animado: Uso da Animated API do React Native para criar transições suaves e o SuccessModal — um componente personalizado que fornece confirmação visual instantânea após cada registro de saúde.

Otimização de Entrada de Dados: Configuração de teclados inteligentes (numéricos para glicose, multiline para observações) e fluxos de navegação que reduzem a carga cognitiva e o tempo de preenchimento do usuário.

🛠️ Stack Tecnológica
Framework: React Native (SDK 50+)

Gerenciamento de Rotas: Expo Router

Linguagem: TypeScript

Estilização: StyleSheet API (CSS-in-JS)

Ícones: Expo Vector Icons (Material Community & Ionicons)
