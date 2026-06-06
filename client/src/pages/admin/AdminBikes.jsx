import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { formatCategory } from '../../constants/categories';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function AdminBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/motorcycles?limit=200');
      setBikes(res.data.motorcycles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this motorcycle?')) return;
    setDeleting(id);
    try {
      await axiosInstance.delete(`/motorcycles/${id}`);
      setBikes((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Bikes</h1>
        <Link
          to="/admin/bikes/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-accent-primary text-dark-bg font-bold rounded-lg hover:opacity-90 transition"
        >
          <FiPlus /> Add Bike
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse h-96 bg-dark-card rounded-xl" />
      ) : (
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-dark-bg border-b border-dark-border">
              <tr>
                <th className="text-left p-4 font-semibold text-dark-muted">Image</th>
                <th className="text-left p-4 font-semibold text-dark-muted">Name</th>
                <th className="text-left p-4 font-semibold text-dark-muted">Category</th>
                <th className="text-left p-4 font-semibold text-dark-muted">Price</th>
                <th className="text-left p-4 font-semibold text-dark-muted">Stock</th>
                <th className="text-right p-4 font-semibold text-dark-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike) => (
                <tr key={bike._id} className="border-b border-dark-border hover:bg-dark-bg/50">
                  <td className="p-4">
                    {bike.images?.[0] && (
                      <img src={bike.images[0].url} alt={bike.name} className="w-16 h-12 object-cover rounded" />
                    )}
                  </td>
                  <td className="p-4 font-medium">{bike.name}</td>
                  <td className="p-4 text-accent-primary">{formatCategory(bike.category)}</td>
                  <td className="p-4">${bike.price.toLocaleString()}</td>
                  <td className="p-4">{bike.stock}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/bikes/${bike._id}/edit`}
                        className="p-2 hover:bg-dark-bg rounded-lg text-accent-primary transition"
                      >
                        <FiEdit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(bike._id)}
                        disabled={deleting === bike._id}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition disabled:opacity-50"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
