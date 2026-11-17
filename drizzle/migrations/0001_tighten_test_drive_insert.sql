DROP POLICY IF EXISTS "Anyone can submit" ON public.test_drive_requests;
CREATE POLICY "Anyone can submit valid request" ON public.test_drive_requests
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(nome)) BETWEEN 2 AND 100
  AND char_length(btrim(telefone)) BETWEEN 8 AND 20
  AND char_length(carro) BETWEEN 1 AND 150
  AND horario IN ('09:00','10:00','11:00','14:00','15:00','16:00','17:00')
  AND data >= CURRENT_DATE AND data <= CURRENT_DATE + 365
);