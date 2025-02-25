'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (date) => {
    return format(new Date(date), "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es });
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
          bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="p-4 border border-[#B5A69C]/20 rounded hover:border-[#B5A69C] transition-colors"
            >
              <p className="text-[#B5A69C] font-medium">
                Reformer Flow - Cama {booking.bedNumber}
              </p>
              <p className="text-[#8A7F76] capitalize">
                {formatDate(booking.date)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserBookings; 