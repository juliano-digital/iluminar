import { type Appointment } from '../../lib/supabase';

interface DashboardProps {
  appointments: Appointment[];
}

export default function Dashboard({ appointments }: DashboardProps) {
  // Calculate stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.scheduled_at);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate.getTime() === today.getTime();
  });

  const thisWeekAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.scheduled_at);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    return aptDate >= weekStart && aptDate < weekEnd;
  });

  const stats = [
    {
      label: 'Agendamentos Hoje',
      value: todayAppointments.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-[#B8FF00]',
      bgColor: 'bg-[#B8FF00]/10',
    },
    {
      label: 'Esta Semana',
      value: thisWeekAppointments.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'text-[#00E5FF]',
      bgColor: 'bg-[#00E5FF]/10',
    },
    {
      label: 'Total de Agendamentos',
      value: appointments.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'text-[#7B2FBE]',
      bgColor: 'bg-[#7B2FBE]/10',
    },
  ];

  // Recent appointments
  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="p-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-bold text-[#F5F5F5]" style={{ fontFamily: 'Space Grotesk' }}>
                {stat.value}
              </p>
              <p className="text-sm text-[#A0A0A0]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6" style={{ fontFamily: 'Space Grotesk' }}>
          Agendamentos Recentes
        </h2>
        
        {recentAppointments.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-[#2A2A2A] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-[#A0A0A0]">Nenhum agendamento encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] hover:border-[#B8FF00]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#B8FF00]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#B8FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#F5F5F5]">{appointment.name}</p>
                    <p className="text-sm text-[#A0A0A0]">{appointment.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#F5F5F5]">
                    {new Date(appointment.scheduled_at).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-xs text-[#A0A0A0]">
                    {new Date(appointment.scheduled_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
