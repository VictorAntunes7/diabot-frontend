import { MaterialIcons } from '@expo/vector-icons';

export type Noticia = {
  id: string;
  titulo: string;
  resumo: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export const noticiasMock: Noticia[] = [
  {
    id: '1',
    titulo: 'Diabetes e saúde bucal',
    resumo: 'Glicemia alta aumenta o risco de gengivite e periodontite. Saiba como se proteger.',
    icon: 'health-and-safety',
  },
  {
    id: '2',
    titulo: '5 hábitos para controlar a glicemia',
    resumo: 'Pequenas mudanças de rotina que fazem grande diferença no controle diário.',
    icon: 'tips-and-updates',
  },
  {
    id: '3',
    titulo: 'Alimentação com baixo índice glicêmico',
    resumo: 'Frutas, legumes e grãos integrais que ajudam a manter o açúcar estável.',
    icon: 'restaurant',
  },
  {
    id: '4',
    titulo: 'Exercício físico e diabetes',
    resumo: '30 minutos de caminhada por dia já ajudam a reduzir os níveis de glicose.',
    icon: 'fitness-center',
  },
  {
    id: '5',
    titulo: 'Quando consultar o dentista?',
    resumo: 'Pacientes diabéticos devem visitar o dentista a cada 3 a 6 meses.',
    icon: 'event-available',
  },
];
