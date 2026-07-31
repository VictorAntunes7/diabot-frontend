export function responderBot(mensagem: string): string {
  const t = mensagem.toLowerCase();

  if (t.includes('sangramento') || t.includes('gengiva')) {
    return 'Sangramento na gengiva pode indicar gengivite. Use escova de cerdas macias e considere marcar uma consulta odontológica.';
  }
  if (t.includes('escovação') || t.includes('escovar') || t.includes('fio dental')) {
    return 'Ótimo hábito! Escove os dentes pelo menos 3x ao dia e use fio dental diariamente para prevenir problemas bucais.';
  }
  if (t.includes('glicose') || t.includes('glicemia') || t.includes('açúcar')) {
    return 'Lembre-se de registrar sua glicemia diariamente para acompanhar sua evolução. Valores entre 70-100 mg/dL em jejum são considerados normais.';
  }
  if (t.includes('insulina') || t.includes('metformina') || t.includes('medicamento') || t.includes('remédio')) {
    return 'Nunca altere a dose dos seus medicamentos sem orientação médica. Registre suas medicações no app para manter o controle.';
  }
  if (t.includes('exercício') || t.includes('atividade') || t.includes('caminhada') || t.includes('corrida')) {
    return 'A atividade física ajuda a controlar a glicemia. 30 minutos de caminhada por dia já fazem grande diferença!';
  }
  if (t.includes('alimentação') || t.includes('dieta') || t.includes('comer') || t.includes('comida')) {
    return 'Prefira alimentos com baixo índice glicêmico como vegetais, legumes e grãos integrais. Evite açúcares refinados.';
  }
  if (t.includes('olá') || t.includes('oi') || t.includes('bom dia') || t.includes('boa tarde') || t.includes('boa noite')) {
    return 'Olá! Sou o DIABot, seu assistente de saúde. Posso te ajudar com dúvidas sobre diabetes e saúde bucal. Como posso ajudar?';
  }

  return 'Entendi! Em breve nosso assistente terá mais respostas. Por enquanto, posso ajudar com dúvidas sobre glicemia, saúde bucal, medicamentos e atividade física.';
}
