# Roadmap — dIABot

Este documento descreve o estágio atual do projeto e os próximos passos planejados.

## ✅ Fase 1 — Protótipo funcional (concluída)

- [x] Interface completa em React Native + TypeScript (Expo Router)
- [x] Persistência local de dados (AsyncStorage): usuário, glicemia, saúde bucal, atividade física, medicação, eventos de calendário, mensagens de chat
- [x] Assistente virtual (chatbot) baseado em regras/palavras-chave
- [x] Calendário interativo com navegação entre meses e criação de eventos
- [x] Deploy público para testes (Vercel)
- [x] Validação com usuários reais (piloto com pacientes, profissionais de saúde e gestores)

## 🚧 Fase 2 — Backend real (planejada)

Objetivo: substituir o armazenamento local por uma arquitetura cliente-servidor real, com dados persistentes e multiusuário.

- [ ] API REST em **TypeScript** (Express ou NestJS)
- [ ] Banco de dados **PostgreSQL** com **Prisma** como ORM
- [ ] Autenticação real com **JWT** + hash de senha
- [ ] Migração das telas do app: substituir chamadas ao `AsyncStorage` por chamadas HTTP à API
- [ ] Hospedagem gratuita do backend (Render, Railway ou Fly.io)

## 🔮 Fase 3 — Evolução do chatbot (futura, opcional)

- [ ] Avaliação de integração com uma API de LLM (ex: Anthropic, OpenAI, Google) para respostas mais ricas e contextuais
- [ ] Alternativa: treinamento de um classificador simples (ex: scikit-learn) para triagem de intenção

## 💡 Melhorias contínuas (sem fase definida)

- [ ] Testes automatizados (ex: Jest para as funções de `services/storage.ts`)
- [ ] Acessibilidade (contraste, tamanhos de toque, leitura por voz)
- [ ] Internacionalização (caso o projeto expanda além do português)
