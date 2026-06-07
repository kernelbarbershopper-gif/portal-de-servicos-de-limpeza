import { Professional, Job, ClientReview } from './types';

export const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    name: 'Maria Silva do Carmo',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'Especialista em faxinas residenciais pesadas e organização de armários. Trabalho com limpeza há mais de 8 anos, focando sempre no capricho, pontualidade e satisfação do cliente.',
    phone: '(11) 98765-4321',
    email: 'maria.carmo@exemplo.com',
    rating: 4.9,
    completedJobs: 142,
    hourlyRate: 35,
    cleaningTypes: ['residencial', 'pesada'],
    location: 'Pinheiros, São Paulo - SP',
    experienceYears: 8,
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    gender: 'F',
    isVerified: true,
    reviews: [
      {
        id: 'r1_1',
        reviewerName: 'Mariana Mendonça',
        rating: 5,
        comment: 'A Maria é excelente! Lavou toda a cozinha e organizou meus armários com perfeição. Extremamente confiável e simpática. Recomendo muito!',
        date: '2026-05-15'
      },
      {
        id: 'r1_2',
        reviewerName: 'Juliana Paes',
        rating: 4.8,
        comment: 'Muito pontual e atenciosa com os detalhes. Limpou frestas de janelas que ninguém nunca conseguia tirar poeira.',
        date: '2026-05-10'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Carlos Alberto Souza',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    bio: 'Profissional focado em limpeza de escritórios, salas comerciais e lojas. Possuo equipamentos próprios de aspiração e higienização. Experiência em grandes corporações.',
    phone: '(11) 97654-3210',
    email: 'carlos.comercial@exemplo.com',
    rating: 4.8,
    completedJobs: 98,
    hourlyRate: 40,
    cleaningTypes: ['comercial', 'pos-obra'],
    location: 'Bela Vista, São Paulo - SP',
    experienceYears: 5,
    availability: ['Segunda', 'Quarta', 'Sexta', 'Sábado'],
    gender: 'M',
    isVerified: true,
    reviews: [
      {
        id: 'r2_1',
        reviewerName: 'TechVibe Startups',
        rating: 5,
        comment: 'Contratamos o Carlos para limpar nosso coworking de 150m². Ele foi super profissional, trouxe produtos específicos de alta qualidade e deixou tudo cheiroso.',
        date: '2026-05-20'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Ana Beatriz Ramos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Especializada em limpeza pós-obra detalhista e higienização fina de apartamentos novos. Utilizo produtos adequados que não danificam pisos e revestimentos de alto padrão.',
    phone: '(11) 96543-2109',
    email: 'ana.posobra@exemplo.com',
    rating: 5.0,
    completedJobs: 64,
    hourlyRate: 45,
    cleaningTypes: ['pos-obra', 'residencial', 'pesada'],
    location: 'Jardins, São Paulo - SP',
    experienceYears: 4,
    availability: ['Terça', 'Quinta', 'Sexta', 'Sábado'],
    gender: 'F',
    isVerified: true,
    reviews: [
      {
        id: 'r3_1',
        reviewerName: 'Roberto Alencar',
        rating: 5,
        comment: 'A melhor pós-obra que já contratei! Removeu restos de gesso e tinta dos vidros de forma cirúrgica. Vale cada centavo.',
        date: '2026-05-18'
      }
    ]
  },
  {
    id: 'p4',
    name: 'Raimundo Nonato Santos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Limpador profissional com foco em limpeza industrial, condomínios e grandes galpões. Trabalho com tratamento de pisos, lavagem de pedras e fachadas de vidro baixas.',
    phone: '(11) 95432-1098',
    email: 'raimundo.fachadas@exemplo.com',
    rating: 4.7,
    completedJobs: 210,
    hourlyRate: 38,
    cleaningTypes: ['comercial', 'pesada'],
    location: 'Santana, São Paulo - SP',
    experienceYears: 12,
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    gender: 'M',
    isVerified: true,
    reviews: [
      {
        id: 'r4_1',
        reviewerName: 'Condomínio Spazio',
        rating: 4.5,
        comment: 'Raimundo é experiente e focado. Tratou o piso de ardósia da nossa entrada de forma exemplar.',
        date: '2026-05-02'
      }
    ]
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Faxina Geral em Escritório de Advocacia',
    clientName: 'Advogados Associados Vieira',
    clientType: 'empresa',
    phone: '(11) 3211-5000',
    email: 'contato@vieiraadv.com.br',
    description: 'Precisamos de profissional experiente para limpeza geral de um escritório de 120m² (salas de reunião, banheiros, recepção e copa). Limpeza de poeira nas mesas, aspiração de carpetes, lavagem leve da copa e retirada de lixos.',
    cleaningType: 'comercial',
    price: 250,
    date: '2026-05-28',
    time: '08:00',
    durationHours: 6,
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    sizeSqm: 120,
    status: 'aberto',
    applicants: [],
    assignedTo: null,
    createdAt: '2026-05-24T18:00:00Z',
    extras: ['janelas'],
    chatMessages: [
      {
        id: 'm1_1',
        sender: 'client',
        senderName: 'Advogados Associados Vieira',
        text: 'Olá profissionais! Precisamos que traga os panos de microfibra, nós fornecemos os aspiradores e baldes de água.',
        timestamp: '2026-05-24T18:05:00Z'
      }
    ]
  },
  {
    id: 'j2',
    title: 'Limpeza de Manutenção Residencial',
    clientName: 'Clara Vasconcellos',
    clientType: 'residencial',
    phone: '(11) 99999-8888',
    email: 'clara.vasco@exemplo.com',
    description: 'Limpeza padrão de apartamento de 2 quartos (70m²). Varrer, passar pano, limpar banheiros, cozinha (apenas louça básica e superfícies) e tirar pó dos móveis dos quartos. Tenho todos os produtos de limpeza no local.',
    cleaningType: 'residencial',
    price: 180,
    date: '2026-05-29',
    time: '09:00',
    durationHours: 4,
    address: 'Rua Fradique Coutinho, 450 - Pinheiros, São Paulo - SP',
    sizeSqm: 70,
    status: 'aberto',
    applicants: ['p1'],
    assignedTo: null,
    createdAt: '2026-05-25T01:30:00Z',
    extras: ['geladeira'],
    chatMessages: [
      {
        id: 'm2_1',
        sender: 'client',
        senderName: 'Clara Vasconcellos',
        text: 'Olá! O apartamento é bem arejado.',
        timestamp: '2026-05-25T01:35:00Z'
      },
      {
        id: 'm2_2',
        sender: 'cleaner',
        senderName: 'Maria Silva do Carmo',
        text: 'Olá Clara! Me candidatei. Garanto deixar tudo um brinco! Tenho disponibilidade integral para esta sexta-feira.',
        timestamp: '2026-05-25T01:40:00Z'
      }
    ]
  },
  {
    id: 'j3',
    title: 'Limpeza Pós-Reforma em Consultório Médico',
    clientName: 'Clínica OdontoVirtue',
    clientType: 'empresa',
    phone: '(11) 3550-9900',
    email: 'adm@odontovirtue.com.br',
    description: 'Consultório de odontologia acabou de passar por pintura e ajustes de marcenaria. Há poeira fina de lixamento nas paredes e pisos. Necessita de limpeza minuciosa, remoção de pingos de tinta e higienização cirúrgica.',
    cleaningType: 'pos-obra',
    price: 450,
    date: '2026-05-30',
    time: '13:00',
    durationHours: 8,
    address: 'Alameda Lorena, 1500 - Cerqueira César, São Paulo - SP',
    sizeSqm: 90,
    status: 'aberto',
    applicants: [],
    assignedTo: null,
    createdAt: '2026-05-24T10:00:00Z',
    extras: ['janelas', 'armarios'],
    chatMessages: []
  },
  {
    id: 'j4',
    title: 'Faxina Pesada de Primavera em Sobrado',
    clientName: 'Ricardo de Oliveira',
    clientType: 'residencial',
    phone: '(11) 98888-7777',
    email: 'ricardo.oliveira@exemplo.com',
    description: 'Sobrado de grande porte (250m²) com quintal. Precisa de uma faxina pesada: lavagem de janelas e esquadrias de vidro, limpeza dos azulejos e exaustor da cozinha, aspiração interna e aplicação de cera em pisos de madeira.',
    cleaningType: 'pesada',
    price: 380,
    date: '2026-06-01',
    time: '08:00',
    durationHours: 8,
    address: 'Rua Voluntários da Pátria, 1800 - Santana, São Paulo - SP',
    sizeSqm: 250,
    status: 'aberto',
    applicants: [],
    assignedTo: null,
    createdAt: '2026-05-24T15:20:00Z',
    extras: ['forno', 'janelas'],
    chatMessages: []
  }
];

export const INITIAL_CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'cr1',
    clientName: 'Clara Vasconcellos',
    reviewerName: 'Maria Silva do Carmo',
    rating: 5,
    comment: 'Excelente contratante! Deixou lanchinho, foi super clara nas instruções e pagou adiantado. Recomendo demais!',
    date: '2026-05-20'
  },
  {
    id: 'cr2',
    clientName: 'Advogados Associados Vieira',
    reviewerName: 'Carlos Alberto Souza',
    rating: 4.5,
    comment: 'Ótimo escritório. Equipe atenciosa, produtos de limpeza disponíveis e ambiente bem organizado para trabalhar.',
    date: '2026-05-22'
  }
];

