export function responderBot(mensagem: string): string {
  // Transforma em minúsculo e remove completamente os acentos da digitação do usuário
  const t = mensagem.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (t.includes('sangramento') || t.includes('gengiva')) {
    return 'Sangramento na gengiva pode indicar gengivite. Use escova de cerdas macias e considere marcar uma consulta odontológica.';
  }
  if (t.includes('escovacao') || t.includes('escovar') || t.includes('fio dental')) {
    return 'Ótimo hábito! Escove os dentes pelo menos 3x ao dia e use fio dental diariamente para prevenir problemas bucais.';
  }
  if (t.includes('glicose') || t.includes('glicemia') || t.includes('acucar')) {
    return 'Lembre-se de registrar sua glicemia diariamente para acompanhar sua evolução. Valores entre 70-100 mg/dL em jejum são considerados normais.';
  }
  if (t.includes('insulina') || t.includes('metformina') || t.includes('medicamento') || t.includes('remedio')) {
    return 'Nunca altere a dose dos seus medicamentos sem orientação médica. Registre suas medicações no app para manter o controle.';
  }
  if (t.includes('exercicio') || t.includes('atividade') || t.includes('caminhada') || t.includes('corrida')) {
    return 'A atividade física ajuda a controlar a glicemia. 30 minutos de caminhada por dia já fazem grande diferença!';
  }
  if (t.includes('alimentacao') || t.includes('dieta') || t.includes('comer') || t.includes('comida')) {
    return 'Prefira alimentos com baixo índice glicêmico como vegetais, legumes e grãos integrais. Evite açúcares refinados.';
  }
  if (t.includes('ola') || t.includes('oi') || t.includes('bom dia') || t.includes('boa tarde') || t.includes('boa noite')) {
    return 'Olá! Sou o DIABot, seu assistente de saúde. Posso te ajudar com dúvidas sobre diabetes e saúde bucal. Como posso ajudar?';
  }
  if (t.includes('hipoglicemia') || t.includes('tontura') || t.includes('fraqueza') || t.includes('suor')) {
    return 'Se você está sentindo tontura ou fraqueza, sua glicose pode estar baixa (hipoglicemia). Consuma 15g de carboidrato rápido (como um copo de suco) e meça a glicemia em 15 minutos.';
  }
  if (t.includes('hiperglicemia') || t.includes('sede') || t.includes('boca seca') || t.includes('muita urina')) {
    return 'Boca seca e muita sede podem ser sinais de glicose alta. Beba bastante água e, se a boca seca persistir, redobre a atenção com a higiene bucal, pois isso aumenta o risco de cáries.';
  }
  if (t.includes('dentista') || t.includes('consulta') || t.includes('dor de dente') || t.includes('carie')) {
    return 'Pacientes com diabetes devem visitar o dentista a cada 6 meses. Avise sempre o seu dentista sobre o seu controle glicêmico antes de qualquer procedimento.';
  }
  if (t.includes('ferida') || t.includes('machucado') || t.includes('cicatrizacao') || t.includes('afta')) {
    return 'Atenção: o diabetes pode deixar a cicatrização mais lenta. Se você tem alguma ferida na boca ou na gengiva que não melhora em uma semana, procure um dentista.';
  }
  if (t.includes('halito') || t.includes('mau halito') || t.includes('bafo')) {
    return 'O mau hálito pode ser um sinal de gengivite ou até de cetoacidose diabética (se tiver um cheiro de fruta envelhecida). Mantenha a higiene em dia e monitore sua glicose!';
  }
  if (t.includes('ajuda') || t.includes('como funciona') || t.includes('o que voce faz')) {
    return 'Eu sou o assistente virtual do dIABot! Você pode me perguntar sobre dicas de alimentação, como controlar sua glicemia ou como cuidar melhor da sua saúde bucal.';
  }
  if (t.includes('historico') || t.includes('relatorio') || t.includes('salvar')) {
    return 'Para ver seu histórico, basta acessar a aba "Registros" no menu inferior. Lá ficam salvas todas as suas anotações de glicemia e saúde bucal.';
  }
  if (t.includes('estresse') || t.includes('ansiedade') || t.includes('nervoso') || t.includes('cansado')) {
    return 'O estresse pode aumentar os níveis de glicose no sangue. Tente tirar um momento para respirar fundo, fazer uma atividade relaxante ou dar uma leve caminhada.';
  }
  if (t.includes('relacao') || t.includes('por que') || t.includes('periodontite') || t.includes('inflamacao')) {
    return 'Você sabia que a saúde bucal e o diabetes estão super conectados? Uma gengiva inflamada dificulta o controle da glicose, e a glicose alta piora a inflamação na gengiva. Cuidar de um ajuda o outro!';
  }
  if (t.includes('cirurgia') || t.includes('arrancar') || t.includes('extrair') || t.includes('implante')) {
    return 'Antes de qualquer procedimento odontológico (como extrações ou cirurgias), certifique-se de que sua glicemia está controlada. O seu dentista pode pedir um exame recente de hemoglobina glicada.';
  }
  if (t.includes('protese') || t.includes('dentadura') || t.includes('sapinho') || t.includes('candidiase') || t.includes('mancha branca')) {
    return 'O diabetes descontrolado aumenta o risco de infecções por fungos na boca (como o sapinho), especialmente se você usa prótese ou dentadura. Lembre-se de higienizar bem sua prótese todos os dias!';
  }
  if (t.includes('fumar') || t.includes('cigarro') || t.includes('vape') || t.includes('tabagismo')) {
    return 'Fumar é um grande perigo! O cigarro piora a circulação, dificulta o controle do diabetes e aumenta drasticamente as chances de você desenvolver doenças graves na gengiva e perder dentes.';
  }
  if (t.includes('adicionar') || t.includes('como registrar') || t.includes('novo registro') || t.includes('anotar')) {
    return 'Para adicionar uma nova medição de glicose ou registrar um sintoma bucal, procure o botão de "Adicionar" (ou o ícone de +) na tela principal do seu aplicativo.';
  }
  if (t.includes('pe') || t.includes('pes') || t.includes('unha encravada') || t.includes('calo') || t.includes('formigamento')) {
  return 'Cuide bem dos seus pés! O diabetes pode reduzir a sensibilidade e a cicatrização neles. Examine diariamente, use calçados confortáveis e procure um médico se notar feridas, calos ou formigamento persistente.';
}
if (t.includes('pressao') || t.includes('hipertensao')) {
  return 'Pressão alta é comum em quem tem diabetes e aumenta o risco de complicações. Vale medir regularmente e conversar com seu médico sobre o controle.';
}
if (t.includes('colesterol')) {
  return 'Diabetes e colesterol alto costumam andar juntos. Uma alimentação equilibrada e atividade física ajudam a controlar os dois.';
}
if (t.includes('sono') || t.includes('dormir') || t.includes('insonia')) {
  return 'Uma boa noite de sono ajuda no controle da glicemia. Tente manter um horário regular para dormir e evite telas antes de deitar.';
}
if (t.includes('agua') || t.includes('hidratacao') || t.includes('beber')) {
  return 'Manter-se hidratado é importante, especialmente porque glicose alta aumenta a sede e a perda de líquidos. Beba água regularmente ao longo do dia.';
}
if (t.includes('tipo 1') || t.includes('tipo 2') || t.includes('qual diabetes') || t.includes('diferenca')) {
  return 'O Diabetes Tipo 1 costuma surgir na infância/adolescência e exige insulina desde o início. O Tipo 2 é mais comum em adultos e está mais ligado a hábitos de vida, podendo às vezes ser controlado sem insulina. Fale com seu médico para saber qual é o seu caso.';
}
if (t.includes('hemoglobina glicada') || t.includes('hba1c') || t.includes('exame de sangue')) {
  return 'A hemoglobina glicada (HbA1c) mostra sua média de glicemia dos últimos 2-3 meses, não só do dia. É um dos exames mais importantes para acompanhar o controle do diabetes.';
}
if (t.includes('alcool') || t.includes('bebida') || t.includes('cerveja') || t.includes('vinho')) {
  return 'Álcool pode causar quedas ou picos inesperados na glicemia. Se for consumir, prefira fazê-lo junto com alimentos e sempre com moderação.';
}
if (t.includes('desanimo') || t.includes('difícil') || t.includes('cansei') || t.includes('nao aguento') || t.includes('desisto')) {
  return 'Cuidar da saúde todos os dias pode ser cansativo, e isso é normal. Cada registro que você faz aqui já é um passo importante. Se sentir que está pesado demais, vale conversar com seu médico ou psicólogo sobre isso também.';
}
if (t.includes('familia') || t.includes('apoio') || t.includes('sozinho')) {
  return 'Ter apoio de familiares e amigos faz muita diferença no controle do diabetes. Vale conversar abertamente com quem está perto de você sobre o que você está vivendo.';
}
if (t.includes('calendario') || t.includes('agenda') || t.includes('evento')) {
  return 'Na aba Calendário você pode navegar entre os meses, tocar em qualquer dia para ver os registros daquele dia, e criar lembretes de consultas ou medicações pelo botão "+".';
}
if (t.includes('noticia') || t.includes('novidade')) {
  return 'Você encontra notícias sobre diabetes e saúde bucal direto na tela inicial do app!';
}
if (t.includes('emergencia') || t.includes('desmaio') || t.includes('convulsao') || t.includes('muito mal') || t.includes('socorro')) {
  return 'Isso pode ser uma emergência médica. Procure um pronto-socorro ou ligue para o SAMU (192) imediatamente. Este app não substitui atendimento médico de urgência.';
}
if (t.includes('dor')) {
  return 'Sinto muito que você esteja com dor. Se for dor de dente ou na gengiva, procure um dentista. Se for dor ou formigamento nos pés, fique atento — pode estar ligado ao diabetes, procure seu médico. Se for dor no peito ou algo muito forte, procure ajuda médica imediatamente.';
}

if (t.includes('diabot')) {
  return 'Eu sou o dIABot! Fui criado para ajudar você a entender melhor a relação entre diabetes e saúde bucal, tirar dúvidas do dia a dia e te lembrar de cuidar de você. Ainda estou em desenvolvimento, então minhas respostas são baseadas em palavras-chave por enquanto.';
}

if (t.includes('voce') || t.includes('quem e voce') || t.includes('o que voce e')) {
  return 'Sou o assistente virtual do aplicativo dIABot, feito para dar dicas e informações sobre diabetes e saúde bucal. Não sou um médico nem substituo uma consulta — para diagnósticos e tratamentos, sempre procure um profissional de saúde.';
}

if (t.includes('diabetes')) {
  return 'O diabetes é uma condição em que o corpo tem dificuldade para controlar os níveis de glicose (açúcar) no sangue. Ele exige acompanhamento contínuo — alimentação equilibrada, atividade física, uso correto de medicações e, sim, também cuidado com a saúde bucal, já que os dois estão bem conectados!';
}


  return 'Entendi! Em breve nosso assistente terá mais respostas. Por enquanto, posso ajudar com dúvidas sobre glicemia, saúde bucal, medicamentos e atividade física.';
}