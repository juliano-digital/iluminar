import { useState, useEffect } from 'react';
import { supabase, type Appointment, type AppointmentInput } from '../lib/supabase';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'barberkings_appointments';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && url !== 'https://your-project.supabase.co' && key !== 'your-anon-key';
};

// Local storage helpers
const getLocalAppointments = (): Appointment[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalAppointments = (appointments: Appointment[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [useSupabase] = useState(isSupabaseConfigured());

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      
      if (useSupabase) {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('scheduled_at', { ascending: true });

        if (error) throw error;
        setAppointments(data || []);
      } else {
        // Fallback to localStorage
        setAppointments(getLocalAppointments());
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  // Create appointment
  const createAppointment = async (input: AppointmentInput) => {
    try {
      if (useSupabase) {
        const { data, error } = await supabase
          .from('appointments')
          .insert([input])
          .select()
          .single();

        if (error) throw error;
        setAppointments(prev => [...prev, data]);
      } else {
        // Fallback to localStorage
        const newAppointment: Appointment = {
          id: crypto.randomUUID(),
          ...input,
          created_at: new Date().toISOString(),
        };
        const updated = [...getLocalAppointments(), newAppointment];
        saveLocalAppointments(updated);
        setAppointments(updated);
      }
      
      toast.success('Agendamento criado com sucesso!');
      return true;
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Erro ao criar agendamento');
      return false;
    }
  };

  // Update appointment
  const updateAppointment = async (id: string, input: AppointmentInput) => {
    try {
      if (useSupabase) {
        const { data, error } = await supabase
          .from('appointments')
          .update(input)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setAppointments(prev => prev.map(apt => apt.id === id ? data : apt));
      } else {
        // Fallback to localStorage
        const updated = getLocalAppointments().map(apt => 
          apt.id === id ? { ...apt, ...input } : apt
        );
        saveLocalAppointments(updated);
        setAppointments(updated);
      }
      
      toast.success('Agendamento atualizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Erro ao atualizar agendamento');
      return false;
    }
  };

  // Delete appointment
  const deleteAppointment = async (id: string) => {
    try {
      if (useSupabase) {
        const { error } = await supabase
          .from('appointments')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setAppointments(prev => prev.filter(apt => apt.id !== id));
      } else {
        // Fallback to localStorage
        const updated = getLocalAppointments().filter(apt => apt.id !== id);
        saveLocalAppointments(updated);
        setAppointments(updated);
      }
      
      toast.success('Agendamento excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Erro ao excluir agendamento');
      return false;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    refetch: fetchAppointments,
  };
}
