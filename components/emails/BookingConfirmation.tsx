import { 
  Html,
  Body,
  Container,
  Text,
  Preview,
  Section,
  Heading,
} from '@react-email/components';
import * as React from 'react';

interface BookingConfirmationProps {
  userName: string;
  date: string;
  time: string;
  bedNumber: number;
}

export const BookingConfirmationEmail: React.FC<BookingConfirmationProps> = ({
  userName,
  date,
  time,
  bedNumber,
}) => (
  <Html>
    <Preview>Confirmación de tu reserva en Reformer Flow</Preview>
    <Body style={{ backgroundColor: '#F8F5F1', padding: '20px' }}>
      <Container>
        <Section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <Heading>¡Hola {userName}!</Heading>
          <Text>Tu reserva ha sido confirmada con éxito.</Text>
          <Text>Detalles de tu clase:</Text>
          <Text>📅 Fecha: {date}</Text>
          <Text>⏰ Hora: {time}</Text>
          <Text>🛏️ Cama: {bedNumber}</Text>
          <Text style={{ marginTop: '20px' }}>
            Recuerda llegar 10 minutos antes de tu clase.
          </Text>
          <Text style={{ color: '#666', fontSize: '14px', marginTop: '20px' }}>
            Si necesitas cancelar tu reserva, puedes hacerlo desde tu dashboard.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
); 