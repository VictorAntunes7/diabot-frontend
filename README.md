# dIABot 🩺🦷

> App mobile de monitoramento de saúde focado na relação entre Diabetes Mellitus e Saúde Bucal — projeto de extensão universitária (UFF).

🔗 **Demo ao vivo:** [diabot-demo.vercel.app](https://diabot-demo.vercel.app)

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d04ba0b2-069a-4d28-837c-1b351a4e6a6e" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/58d8b42a-aa3d-4ed4-8dd7-d67ebecb6cdf" />


---

## 📌 Sobre o projeto

Pessoas com diabetes têm risco significativamente maior de desenvolver problemas bucais (gengivite, periodontite), e o inverso também é verdade — inflamação bucal dificulta o controle glicêmico. A maioria dos pacientes desconhece essa relação.

O **dIABot** é um diário de saúde digital que permite ao usuário:
- Registrar glicemia, saúde bucal, atividade física e medicações diariamente
- Visualizar histórico e evolução em um calendário interativo
- Conversar com um assistente virtual educativo sobre diabetes e saúde bucal
- Acompanhar notícias sobre os dois temas

Este repositório contém a versão de **piloto/validação** do projeto, focada em testar a experiência do usuário com os três públicos-alvo (pacientes, profissionais de saúde e gestores) antes de evoluir para uma arquitetura de produção completa.

## 🛠️ Stack técnica

- **React Native** + **TypeScript**
- **Expo Router** (roteamento baseado em arquivos)
- **AsyncStorage** para persistência local (fase atual — ver seção de arquitetura abaixo)
- Deploy web via **Expo Web Export** + **Vercel**

## 🏗️ Decisão de arquitetura desta fase

Este protótipo usa **armazenamento local no dispositivo** (AsyncStorage) em vez de um backend/banco de dados na nuvem. Foi uma decisão consciente para validar rapidamente a experiência do usuário e a aceitação da proposta de valor, sem a complexidade e o tempo de implementar infraestrutura de servidor nesta etapa.

Isso implica:
- Cada usuário tem seus dados isolados no próprio dispositivo/navegador
- Não há sincronização entre dispositivos nesta versão
- O app comunica isso claramente ao usuário (banner de "versão de demonstração")

📍 Os próximos passos do projeto (backend real, banco de dados, etc.) estão descritos em [`ROADMAP.md`](./ROADMAP.md).

## 🤖 Sobre o chatbot (dIABot)

O assistente virtual do app é atualmente um **sistema baseado em regras/palavras-chave** — a mensagem do usuário é normalizada e comparada com um conjunto de tópicos pré-definidos sobre diabetes e saúde bucal, retornando respostas educativas relevantes. Não é um modelo de IA/machine learning nesta fase; essa evolução está prevista para uma etapa futura do projeto (ver ROADMAP).

## 🚀 Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/VictorAntunesCastro/diabot.git
cd diabot

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npx expo start
```
Depois, abra no Expo Go (celular) ou aperte `w` no terminal para abrir a versão web.

### Gerar build web e publicar
```bash
npx expo export -p web
cd dist
vercel --prod
```

## 📋 Funcionalidades

- [x] Cadastro simples (sem senha, sem atrito)
- [x] Registro de glicemia, saúde bucal, atividade física e medicação
- [x] Histórico completo com exclusão de registros
- [x] Calendário interativo (navegação entre meses, criação de eventos/lembretes)
- [x] Chat com assistente virtual educativo
- [x] Notícias sobre diabetes e saúde bucal
- [ ] Backend com banco de dados persistente (próxima fase)
- [ ] Autenticação real (JWT)
- [ ] Sincronização multiusuário/multidispositivo

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo [`LICENSE`](./LICENSE) para mais detalhes.

## 👤 Autor

Desenvolvido por **Victor Castro** como parte de projeto de extensão da UFF.

[LinkedIn](https://www.linkedin.com/in/victorantunescastro/) · [GitHub](https://github.com/VictorAntunesCastro)
