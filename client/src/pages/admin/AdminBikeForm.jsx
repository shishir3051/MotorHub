import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { CATEGORIES } from '../../constants/categories';

const emptyForm = {
  name: '',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  price: '',
  description: '',
  category: 'cruiser',
  stock: 10,
  rating: 4.5,
  featured: false,
  imageUrl: '/images/motorcycles/cruiser.svg',
  engine: '',
  displacement: '',
  power: '',
  torque: '',
  weight: '',
  fuelCapacity: '',
  topSpeed: '',
  transmissionType: '',
};

export default function AdminBikeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const fetchBike = async () => {
      try {
        const res = await axiosInstance.get(`/motorcycles/${id}`);
        const bike = res.data;
        setForm({
          name: bike.name || '',
          brand: bike.brand || '',
          model: bike.model || '',
          year: bike.year || new Date().getFullYear(),
          price: bike.price || '',
          description: bike.description || '',
          category: bike.category || 'cruiser',
          stock: bike.stock ?? 10,
          rating: bike.rating ?? 4.5,
          featured: bike.featured || false,
          imageUrl: bike.images?.[0]?.url || `/images/motorcycles/${bike.category}.svg`,
          engine: bike.specifications?.engine || '',
          displacement: bike.specifications?.displacement || '',
          power: bike.specifications?.power || '',
          torque: bike.specifications?.torque || '',
          weight: bike.specifications?.weight || '',
          fuelCapacity: bike.specifications?.fuelCapacity || '',
          topSpeed: bike.specifications?.topSpeed || '',
          transmissionType: bike.specifications?.transmissionType || '',
        });
      } catch (err) {
        setError('Failed to load motorcycle');
      } finally {
        setLoading(false);
      }
    };
    fetchBike();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'category' && !isEdit) {
        next.imageUrl = `/images/motorcycles/${value}.svg`;
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      name: form.name,
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      description: form.description,
      category: form.category,
      stock: Number(form.stock),
      rating: Number(form.rating),
      featured: form.featured,
      images: [{ url: form.imageUrl, alt: form.name }],
      specifications: {
        engine: form.engine,
        displacement: form.displacement,
        power: form.power,
        torque: form.torque,
        weight: form.weight,
        fuelCapacity: form.fuelCapacity,
        topSpeed: form.topSpeed,
        transmissionType: form.transmissionType,
      },
    };

    try {
      if (isEdit) {
        await axiosInstance.put(`/motorcycles/${id}`, payload);
      } else {
        await axiosInstance.post('/motorcycles', payload);
      }
      navigate('/admin/bikes');
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse h-96 bg-dark-card rounded-xl" />;

  const inputClass = 'w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none text-sm';

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Motorcycle' : 'Add Motorcycle'}</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 text-red-400 rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-card border border-dark-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Brand *</label>
            <input name="brand" value={form.brand} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Model</label>
            <input name="model" value={form.model} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} required className={inputClass}>
              {CATEGORIES.filter((c) => c.value).map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Year</label>
            <input name="year" type="number" value={form.year} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Price *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Stock</label>
            <input name="stock" type="number" value={form.stock} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Rating</label>
            <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase text-dark-muted mb-2">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={inputClass} placeholder="/images/motorcycles/cruiser.svg" />
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" className="mt-3 w-48 h-32 object-cover rounded-lg border border-dark-border" />
          )}
        </div>

        <div>
          <label className="block text-xs uppercase text-dark-muted mb-2">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} />
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-accent-primary">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['engine', 'displacement', 'power', 'torque', 'weight', 'fuelCapacity', 'topSpeed', 'transmissionType'].map((field) => (
              <div key={field}>
                <label className="block text-xs uppercase text-dark-muted mb-2">{field}</label>
                <input name={field} value={form[field]} onChange={handleChange} className={inputClass} />
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-accent-primary" />
          <span>Featured on homepage</span>
        </label>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-accent-primary text-dark-bg font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {saving ? 'Saving...' : isEdit ? 'Update Bike' : 'Add Bike'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/bikes')}
            className="px-8 py-3 border border-dark-border rounded-lg hover:border-accent-primary transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
