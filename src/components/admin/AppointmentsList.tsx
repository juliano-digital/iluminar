import { useState } from 'react';
import { type Appointment } from '../../lib/supabase';
import Badge from './Badge';
import Button from './Button';
import Modal from './Modal';
import AppointmentForm from './AppointmentForm';

interface AppointmentsListProps {
  appointments: Appointment[];
  loading: boolean;
  onUpdate: (id: string, data: any) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export default function AppointmentsList({ appointments, loading, onUpdate, onDelete }: AppointmentsListProps) {
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter appointments
  const filteredAppointments = appointments.filter(apt =>
    apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.phone.includes(searchTerm) ||
    apt.service_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by scheduled_at
  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime()
  );

  const getServiceBadgeVariant = (service: string) => {
    switch (service) {
      case 'Day Use VIP': return 'success';
      case 'Platinado': return 'warning';
      case 'Corte + Barba': return 'info';
      default: return 'default';
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-[#B8FF00]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-[#A0A0A0]">Carregando agendamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#141414] border border-[#2A2A2A] rounded-lg text-[#F5F5F5] placeholder-[#6B6B6B] focus:outline-none focus:border-[#B8FF00]/50 focus:shadow-[0_0_16px_rgba(184,255,0,0.1)] transition-all duration-300"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
          <span className="font-medium text-[#F5F5F5]">{sortedAppointments.length}</span>
          agendamento{sortedAppointments.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              <th className="text-left px-6 py-4 text-xs font-medium text-[#A0A0A0] uppercase tracking-wider">Cliente</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[#A0A0A0] uppercase tracking-wider">Telefone</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[#A0A0A0] uppercase tracking-wider">Data/Hora</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[#A0A0A0] uppercase tracking-wider">Serviço</th>
              <th className="text-right px-6 py-4 text-xs font-medium text-[#A0A0A0] uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <svg className="w-16 h-16 mx-auto text-[#2A2A2A] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-[#A0A0A0]">Nenhum agendamento encontrado</p>
                </td>
              </tr>
            ) : (
              sortedAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#1E1E1E] transition-colors duration-300"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#B8FF00]/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#B8FF00]">
                          {appointment.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-[#F5F5F5]">{appointment.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#A0A0A0]">{appointment.phone}</td>
                  <td className="px-6 py-4">
                    <div className="text-[#F5F5F5]">
                      {new Date(appointment.scheduled_at).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-xs text-[#A0A0A0]">
                      {new Date(appointment.scheduled_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getServiceBadgeVariant(appointment.service_type)}>
                      {appointment.service_type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingAppointment(appointment)}
                        className="p-2 text-[#A0A0A0] hover:text-[#B8FF00] hover:bg-[#B8FF00]/10 rounded-lg transition-all duration-300"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        disabled={deletingId === appointment.id}
                        className="p-2 text-[#A0A0A0] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 disabled:opacity-50"
                        title="Excluir"
                      >
                        {deletingId === appointment.id ? (
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedAppointments.length === 0 ? (
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-[#2A2A2A] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-[#A0A0A0]">Nenhum agendamento encontrado</p>
          </div>
        ) : (
          sortedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#B8FF00]/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#B8FF00]">
                      {appointment.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[#F5F5F5]">{appointment.name}</p>
                    <p className="text-sm text-[#A0A0A0]">{appointment.phone}</p>
                  </div>
                </div>
                <Badge variant={getServiceBadgeVariant(appointment.service_type)}>
                  {appointment.service_type}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {new Date(appointment.scheduled_at).toLocaleDateString('pt-BR')} às{' '}
                  {new Date(appointment.scheduled_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="flex gap-2 pt-4 border-t border-[#2A2A2A]">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingAppointment(appointment)}
                  className="flex-1"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  }
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(appointment.id)}
                  disabled={deletingId === appointment.id}
                  className="flex-1"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingAppointment && (
        <Modal
          isOpen={!!editingAppointment}
          onClose={() => setEditingAppointment(null)}
          title="Editar Agendamento"
        >
          <AppointmentForm
            initialData={{
              name: editingAppointment.name,
              phone: editingAppointment.phone,
              scheduled_at: new Date(editingAppointment.scheduled_at).toISOString().slice(0, 16),
              service_type: editingAppointment.service_type,
            }}
            isEditing
            onCancel={() => setEditingAppointment(null)}
            onSubmit={async (data) => {
              const success = await onUpdate(editingAppointment.id, data);
              if (success) {
                setEditingAppointment(null);
              }
              return success;
            }}
          />
        </Modal>
      )}
    </div>
  );
}
