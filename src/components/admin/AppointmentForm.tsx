import { useState, FormEvent } from 'react';
import { Input } from './Input';
import { Select } from './Select';
import Button from './Button';
import { type AppointmentInput } from '../../lib/supabase';

interface AppointmentFormProps {
  onSubmit: (data: AppointmentInput) => Promise<boolean>;
  initialData?: AppointmentInput;
  isEditing?: boolean;
  onCancel?: () => void;
}

const serviceOptions = [
  { value: 'Corte Masculino', label: 'Corte Masculino — R$ 55' },
  { value: 'Corte + Barba', label: 'Corte + Barba — R$ 85' },
  { value: 'Barba Completa', label: 'Barba Completa — R$ 45' },
  { value: 'Platinado', label: 'Platinado — R$ 120' },
  { value: 'Day Use VIP', label: 'Day Use VIP — R$ 180' },
  { value: 'Corte Infantil', label: 'Corte Infantil — R$ 40' },
];

// Phone mask helper
const applyPhoneMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

export default function AppointmentForm({ onSubmit, initialData, isEditing = false, onCancel }: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentInput>({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    scheduled_at: initialData?.scheduled_at ? new Date(initialData.scheduled_at).toISOString().slice(0, 16) : '',
    service_type: initialData?.service_type || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AppointmentInput, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (!phoneNumbers) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      newErrors.phone = 'Telefone deve ter 10 ou 11 dígitos';
    }

    if (!formData.scheduled_at) {
      newErrors.scheduled_at = 'Horário é obrigatório';
    } else {
      const selectedDate = new Date(formData.scheduled_at);
      const now = new Date();
      if (!isEditing && selectedDate < now) {
        newErrors.scheduled_at = 'Horário deve ser no futuro';
      }
    }

    if (!formData.service_type) {
      newErrors.service_type = 'Tipo de serviço é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    const success = await onSubmit(formData);
    setIsSubmitting(false);

    if (success && !isEditing) {
      // Reset form on successful creation
      setFormData({
        name: '',
        phone: '',
        scheduled_at: '',
        service_type: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nome do Cliente"
        type="text"
        placeholder="Digite o nome completo"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      <Input
        label="Telefone"
        type="tel"
        placeholder="(11) 99999-9999"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: applyPhoneMask(e.target.value) })}
        error={errors.phone}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        }
      />

      <Input
        label="Data e Horário"
        type="datetime-local"
        value={formData.scheduled_at}
        onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
        error={errors.scheduled_at}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />

      <Select
        label="Tipo de Serviço"
        value={formData.service_type}
        onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
        options={serviceOptions}
        error={errors.service_type}
      />

      <div className="flex gap-4 pt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="primary" loading={isSubmitting} className="flex-1">
          {isEditing ? 'Salvar Alterações' : 'Criar Agendamento'}
        </Button>
      </div>
    </form>
  );
}
