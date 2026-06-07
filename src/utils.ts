import { CleaningType } from './types';

export function getCleaningTypeLabel(type: CleaningType): string {
  switch (type) {
    case 'residencial':
      return 'Residencial';
    case 'comercial':
      return 'Comercial/Escritório';
    case 'pos-obra':
      return 'Pós-Obra Fina';
    case 'pesada':
      return 'Faxina Pesada';
    default:
      return type;
  }
}

export function getCleaningTypeColor(type: CleaningType): { bg: string; text: string; border: string } {
  switch (type) {
    case 'residencial':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200'
      };
    case 'comercial':
      return {
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200'
      };
    case 'pos-obra':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200'
      };
    case 'pesada':
      return {
        bg: 'bg-cyan-50',
        text: 'text-cyan-700',
        border: 'border-cyan-200'
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200'
      };
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export interface ExtraItem {
  id: string;
  label: string;
  price: number;
}

export const EXTRAS_AVAILABLE: ExtraItem[] = [
  { id: 'geladeira', label: 'Geladeira por dentro', price: 50 },
  { id: 'forno', label: 'Forno por dentro', price: 40 },
  { id: 'janelas', label: 'Limpeza de Janelas', price: 45 },
  { id: 'armarios', label: 'Armários de cozinha por dentro', price: 60 },
  { id: 'passar-roupa', label: 'Passar de Roupas (+1hr)', price: 50 },
  { id: 'produtos', label: 'Fornecer produtos de limpeza', price: 35 }
];

export function getExtraLabel(extraId: string): string {
  const found = EXTRAS_AVAILABLE.find(e => e.id === extraId);
  return found ? found.label : extraId;
}

export function getExtraPrice(extraId: string): number {
  const found = EXTRAS_AVAILABLE.find(e => e.id === extraId);
  return found ? found.price : 0;
}

