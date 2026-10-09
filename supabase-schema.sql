-- ============================================
-- BarberKings - Schema do Banco de Dados
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- Criar tabela de agendamentos
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  service_type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_appointments_name ON appointments(name);
CREATE INDEX idx_appointments_created_at ON appointments(created_at DESC);

-- ============================================
-- Row Level Security (RLS) - Opcional para produção
-- ============================================

-- Habilitar RLS na tabela
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Política: Permitir leitura pública (ajuste conforme necessário)
CREATE POLICY "Allow public read access"
  ON appointments
  FOR SELECT
  USING (true);

-- Política: Permitir inserção pública (ajuste conforme necessário)
CREATE POLICY "Allow public insert access"
  ON appointments
  FOR INSERT
  WITH CHECK (true);

-- Política: Permitir atualização pública (ajuste conforme necessário)
CREATE POLICY "Allow public update access"
  ON appointments
  FOR UPDATE
  USING (true);

-- Política: Permitir exclusão pública (ajuste conforme necessário)
CREATE POLICY "Allow public delete access"
  ON appointments
  FOR DELETE
  USING (true);

-- ============================================
-- Dados de exemplo (opcional)
-- ============================================

-- Inserir alguns agendamentos de exemplo
INSERT INTO appointments (name, phone, scheduled_at, service_type) VALUES
  ('João Silva', '(11) 99999-1234', NOW() + INTERVAL '1 day', 'Corte + Barba'),
  ('Pedro Santos', '(11) 98888-5678', NOW() + INTERVAL '2 days', 'Corte Masculino'),
  ('Carlos Oliveira', '(11) 97777-9012', NOW() + INTERVAL '3 days', 'Day Use VIP'),
  ('Lucas Ferreira', '(11) 96666-3456', NOW() + INTERVAL '1 day' + INTERVAL '2 hours', 'Barba Completa'),
  ('André Costa', '(11) 95555-7890', NOW() + INTERVAL '4 days', 'Platinado');

-- ============================================
-- Funções úteis (opcional)
-- ============================================

-- Função para contar agendamentos de hoje
CREATE OR REPLACE FUNCTION get_today_appointments_count()
RETURNS INTEGER AS $$
BEGIN
  RETURN COUNT(*)::INTEGER
  FROM appointments
  WHERE DATE(scheduled_at) = CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Função para contar agendamentos da semana
CREATE OR REPLACE FUNCTION get_week_appointments_count()
RETURNS INTEGER AS $$
BEGIN
  RETURN COUNT(*)::INTEGER
  FROM appointments
  WHERE scheduled_at >= DATE_TRUNC('week', CURRENT_DATE)
    AND scheduled_at < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;
