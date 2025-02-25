'use client';

import { useState, useEffect } from 'react';
import { format, addDays, startOfToday, isBefore, isAfter, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

const timeSlots = {
  'LUNES': ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  'MARTES': ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  'MIÉRCOLES': ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  'JUEVES': ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  'VIERNES': ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  'SÁBADO': ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
  'DOMINGO': ['9:00', '10:00', '11:00']
};

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState({});

  const today = startOfToday();
  const maxDate = addDays(today, 14); // 2 semanas desde hoy

  useEffect(() => {
    if (selectedDate) {
      // Cargar disponibilidad para todos los horarios del día seleccionado
      const daySlots = timeSlots[getDayName(selectedDate)] || [];
      daySlots.forEach(time => {
        checkAvailability(selectedDate, time);
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleBookingCancelled = () => {
      if (selectedDate) {
        const daySlots = timeSlots[getDayName(selectedDate)] || [];
        daySlots.forEach(time => {
          checkAvailability(selectedDate, time);
        });
      }
    };

    window.addEventListener('bookingCancelled', handleBookingCancelled);

    return () => {
      window.removeEventListener('bookingCancelled', handleBookingCancelled);
    };
  }, [selectedDate]);

  const getDayName = (date) => {
    return format(date, 'EEEE', { locale: es }).toUpperCase();
  };

  const checkAvailability = async (date, time) => {
    try {
      const response = await fetch(`/api/bookings/availability?date=${date.toISOString()}&time=${time}`);
      const data = await response.json();
      setAvailableSlots(prev => ({
        ...prev,
        [`${format(date, 'yyyy-MM-dd')}-${time}`]: data.availableBeds
      }));
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const isDateSelectable = (date) => {
    return !isBefore(date, today) && !isAfter(date, maxDate);
  };

  const isTimeSelectable = (time) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hours, minutes);

    return !isBefore(selectedDateTime, now);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Por favor selecciona fecha y hora');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          timeSlot: selectedTime,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al realizar la reserva');
      }

      toast.success('¡Reserva realizada con éxito!');
      setSelectedTime(null);
      
      // Disparar evento para actualizar las reservas
      const event = new CustomEvent('bookingCreated');
      window.dispatchEvent(event);
      
      // Recargar disponibilidad de todos los horarios del día
      const daySlots = timeSlots[getDayName(selectedDate)] || [];
      await Promise.all(daySlots.map(time => checkAvailability(selectedDate, time)));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-light text-[#8A7F76] mb-6">Reservar Clase</h2>
      
      {/* Selector de fecha */}
      <div className="mb-8">
        <h3 className="text-[#B5A69C] mb-4">Selecciona un día</h3>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(14)].map((_, index) => {
            const date = addDays(today, index);
            const dayName = getDayName(date);
            const isSelectable = isDateSelectable(date);
            
            return (
              <button
                key={index}
                onClick={() => isSelectable && setSelectedDate(date)}
                disabled={!isSelectable}
                className={`p-4 rounded-lg text-center transition-colors ${
                  format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                    ? 'bg-[#B5A69C] text-white'
                    : isSelectable
                    ? 'border border-[#B5A69C] text-[#B5A69C] hover:bg-[#B5A69C]/10'
                    : 'border border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium">{format(date, 'dd')}</div>
                <div className="text-xs">{dayName.slice(0, 3)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selector de hora */}
      {selectedDate && (
        <div>
          <h3 className="text-[#B5A69C] mb-4">Selecciona un horario</h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots[getDayName(selectedDate)]?.map((time) => {
              const isSelectable = isTimeSelectable(time);
              const availableBedsKey = `${format(selectedDate, 'yyyy-MM-dd')}-${time}`;
              const availableBeds = availableSlots[availableBedsKey];
              const isFull = availableBeds === 0;

              return (
                <button
                  key={time}
                  onClick={() => isSelectable && !isFull && setSelectedTime(time)}
                  disabled={!isSelectable || isFull}
                  className={`p-3 rounded text-center transition-colors relative ${
                    selectedTime === time
                      ? 'bg-[#B5A69C] text-white'
                      : isSelectable && !isFull
                      ? 'border border-[#B5A69C] text-[#B5A69C] hover:bg-[#B5A69C]/10'
                      : 'border border-gray-200 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <span>{time}</span>
                  {availableBeds !== undefined && (
                    <span className={`text-xs block mt-1 ${
                      availableBeds <= 2 ? 'text-red-500' : ''
                    }`}>
                      {availableBeds} {availableBeds === 1 ? 'lugar' : 'lugares'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Botón de reserva */}
      {selectedDate && selectedTime && (
        <button
          onClick={handleBooking}
          disabled={loading}
          className="mt-8 w-full p-4 bg-[#B5A69C] text-white rounded hover:bg-[#8A7F76] transition-colors disabled:opacity-50"
        >
          {loading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>
      )}
    </div>
  );
};

export default BookingCalendar; 