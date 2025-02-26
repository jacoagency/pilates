'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

const AdminStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) throw new Error('Error al cargar datos');
      
      const data = await response.json();
      setData(data);
    } catch (error) {
      toast.error('Error al cargar los datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
  };

  const formatDateTime = (date) => {
    return format(new Date(date), "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es });
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-light text-[#8A7F76] mb-4">
          Estadísticas Generales
        </h2>
        <div className="space-y-4">
          <div className="p-4 border border-[#B5A69C]/20 rounded">
            <p className="text-[#B5A69C] font-medium">Total de Usuarios</p>
            <p className="text-[#8A7F76] text-2xl">{data?.stats.totalUsers || 0}</p>
          </div>
          <div className="p-4 border border-[#B5A69C]/20 rounded">
            <p className="text-[#B5A69C] font-medium">Clases Programadas</p>
            <p className="text-[#8A7F76] text-2xl">{data?.stats.futureBookings || 0}</p>
          </div>
        </div>

        <h2 className="text-2xl font-light text-[#8A7F76] mt-8 mb-4">
          Usuarios Registrados
        </h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {data?.users.map(user => (
            <div key={user._id} className="p-3 border border-[#B5A69C]/20 rounded">
              <p className="font-medium text-[#8A7F76]">{user.name}</p>
              <p className="text-sm text-[#B5A69C]">{user.email}</p>
              <p className="text-xs text-gray-500">Registrado: {formatDate(user.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-light text-[#8A7F76] mb-4">
          Próximas Reservas
        </h2>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {data?.bookings.map(booking => (
            <div key={booking._id} className="p-4 border border-[#B5A69C]/20 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[#B5A69C] font-medium">
                    {booking.userId.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.userId.email}
                  </p>
                  <p className="text-[#8A7F76] mt-1">
                    {formatDateTime(booking.date)}
                  </p>
                  <p className="text-sm text-[#B5A69C] mt-1">
                    Cama {booking.bedNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats; 