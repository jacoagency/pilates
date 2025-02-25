'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchBookings();

    // Escuchar el evento de nueva reserva
    const handleNewBooking = () => {
      fetchBookings();
    };

    window.addEventListener('bookingCreated', handleNewBooking);

    return () => {
      window.removeEventListener('bookingCreated', handleNewBooking);
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings/user');
      if (!response.ok) throw new Error('Error al cargar las reservas');
      
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      toast.error('Error al cargar tus reservas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }

    setCancelling(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al cancelar la reserva');
      }

      toast.success('Reserva cancelada exitosamente');
      fetchBookings();

      // Disparar evento para actualizar disponibilidad en el calendario
      const event = new CustomEvent('bookingCancelled');
      window.dispatchEvent(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCancelling(null);
    }
  };

  const formatDate = (date) => {
    return format(new Date(date), "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es });
  };

  const isPastBooking = (date) => {
    return new Date(date) < new Date();
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-light text-[#8A7F76] mb-4">
          Tus Próximas Clases
        </h2>
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-gray-100 rounded"></div>
          <div className="h-16 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-light text-[#8A7F76] mb-4">
        Tus Próximas Clases
      </h2>
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-[#8A7F76] text-center py-4">
            No tienes clases programadas
          </p>
        ) : (
          bookings.map((booking) => {
            const isPast = isPastBooking(booking.date);
            
            return (
              <div 
                key={booking._id} 
                className={`p-4 border rounded transition-colors ${
                  isPast 
                    ? 'border-gray-200 opacity-50'
                    : 'border-[#B5A69C]/20 hover:border-[#B5A69C]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#B5A69C] font-medium">
                      Reformer Flow - Cama {booking.bedNumber}
                    </p>
                    <p className="text-[#8A7F76] capitalize">
                      {formatDate(booking.date)}
                    </p>
                  </div>
                  {!isPast && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={cancelling === booking._id}
                      className="text-red-500 hover:text-red-700 text-sm transition-colors disabled:opacity-50"
                    >
                      {cancelling === booking._id ? 'Cancelando...' : 'Cancelar'}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserBookings; 