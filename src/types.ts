export type CleaningType = 'residencial' | 'comercial' | 'pos-obra' | 'pesada';

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'cleaner';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  phone: string;
  email: string;
  rating: number;
  completedJobs: number;
  hourlyRate: number;
  cleaningTypes: CleaningType[];
  location: string;
  experienceYears: number;
  availability: string[]; // e.g., ['Segunda', 'Quarta', 'Sexta']
  gender: 'M' | 'F' | 'Outro';
  isVerified: boolean;
  reviews: Review[];
}

export interface Job {
  id: string;
  title: string;
  clientName: string;
  clientType: 'empresa' | 'residencial';
  phone: string;
  email: string;
  description: string;
  cleaningType: CleaningType;
  price: number;
  date: string;
  time: string;
  durationHours: number;
  address: string;
  sizeSqm: number;
  status: 'aberto' | 'em_andamento' | 'concluido';
  applicants: string[]; // List of Professional IDs
  assignedTo: string | null; // Professional ID or null
  createdAt: string;
  extras?: string[]; // e.g., ['geladeira', 'forno', 'janelas', 'armarios', 'passar-roupa']
  chatMessages: ChatMessage[];
}

export interface Application {
  id: string;
  jobId: string;
  professionalId: string;
  status: 'pendente' | 'aceito' | 'recusado';
  appliedAt: string;
}
