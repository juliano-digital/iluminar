import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import AppointmentsList from './AppointmentsList';
import AppointmentForm from './AppointmentForm';
import { useAppointments } from '../../hooks/useAppointments';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { appointments, loading, createAppointment, updateAppointment, deleteAppointment } = useAppointments();

  const getHeaderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Visão geral dos agendamentos' };
      case 'appointments':
        return { title: 'Agendamentos', subtitle: 'Gerencie todos os agendamentos' };
      case 'new-appointment':
        return { title: 'Novo Agendamento', subtitle: 'Cadastre um novo agendamento' };
      default:
        return { title: 'Painel Admin', subtitle: '' };
    }
  };

  const headerContent = getHeaderContent();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard appointments={appointments} />;
      case 'appointments':
        return (
          <AppointmentsList
            appointments={appointments}
            loading={loading}
            onUpdate={updateAppointment}
            onDelete={deleteAppointment}
          />
        );
      case 'new-appointment':
        return (
          <div className="p-8">
            <div className="max-w-2xl mx-auto bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6" style={{ fontFamily: 'Space Grotesk' }}>
                Cadastrar Agendamento
              </h2>
              <AppointmentForm
                onSubmit={async (data) => {
                  const success = await createAppointment(data);
                  if (success) {
                    setActiveSection('appointments');
                  }
                  return success;
                }}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="ml-64 transition-all duration-300">
        <Header title={headerContent.title} subtitle={headerContent.subtitle} />
        <main className="min-h-[calc(100vh-100px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
