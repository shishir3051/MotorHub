import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  imageUrl: '',
  engine: '',
  displacement: '',
  power: '',
  torque: '',
  weight: '',
  fuelCapacity: '',
  topSpeed: '',
  transmissionType: '',
  material: '',
  armor: '',
  certification: '',
  fitment: '',
  capacity: '',
};

export default function AdminBikeForm() {
  const { id } = useParams();
  const location = useLocation();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  
  // Determine form type based on URL path
  const type = location.pathname.includes('/gear') 
    ? 'gear' 
    : location.pathname.includes('/parts') 
      ? 'parts' 
      : 'bikes';
      
  const typeLabel = type === 'gear' ? 'Gear' : type === 'parts' ? 'Part' : 'Motorcycle';

  const [form, setForm] = useState({
    ...emptyForm,
    category: type === 'gear' ? 'gear' : type === 'parts' ? 'accessories' : 'cruiser'
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const fetchItem = async () => {
      try {
        const res = await axiosInstance.get(`/motorcycles/${id}`);
        const item = res.data;
        setForm({
          name: item.name || '',
          brand: item.brand || '',
          model: item.model || '',
          year: item.year || new Date().getFullYear(),
          price: item.price || '',
          description: item.description || '',
          category: item.category || (type === 'gear' ? 'gear' : type === 'parts' ? 'accessories' : 'cruiser'),
          stock: item.stock ?? 10,
          rating: item.rating ?? 4.5,
          featured: item.featured || false,
          imageUrl: item.images?.[0]?.url || '',
          engine: item.specifications?.engine || '',
          displacement: item.specifications?.displacement || '',
          power: item.specifications?.power || '',
          torque: item.specifications?.torque || '',
          weight: item.specifications?.weight || '',
          fuelCapacity: item.specifications?.fuelCapacity || '',
          topSpeed: item.specifications?.topSpeed || '',
          transmissionType: item.specifications?.transmissionType || '',
          material: item.specifications?.material || '',
          armor: item.specifications?.armor || '',
          certification: item.specifications?.certification || '',
          fitment: item.specifications?.fitment || '',
          capacity: item.specifications?.capacity || '',
        });
      } catch (err) {
        setError(`Failed to load ${typeLabel.toLowerCase()}`);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, isEdit, typeLabel, type]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: inputType === 'checkbox' ? checked : value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    setError('');

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axiosInstance.post('/upload', formData, config);
      setForm((prev) => ({ ...prev, imageUrl: data.imageUrl }));
    } catch (err) {
      setError(err.response?.data?.error || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      name: form.name,
      brand: form.brand,
      model: form.model,
      year: Number(form.year) || new Date().getFullYear(),
      price: Number(form.price),
      description: form.description,
      category: form.category,
      stock: Number(form.stock),
      rating: Number(form.rating),
      featured: form.featured,
      images: [{ url: form.imageUrl, alt: form.name }],
      specifications: {},
    };

    // Attach relevant specifications
    const specsList = type === 'bikes' 
      ? ['engine', 'displacement', 'power', 'torque', 'weight', 'fuelCapacity', 'topSpeed', 'transmissionType']
      : type === 'gear' 
        ? ['material', 'armor', 'certification', 'weight']
        : ['material', 'fitment', 'capacity', 'weight'];
        
    specsList.forEach(field => {
      if (form[field]) payload.specifications[field] = form[field];
    });

    try {
      if (isEdit) {
        await axiosInstance.put(`/motorcycles/${id}`, payload);
      } else {
        await axiosInstance.post('/motorcycles', payload);
      }
      navigate(`/admin/${type}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse h-96 bg-dark-card rounded-xl" />;

  const inputClass = 'w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none text-sm';

  const specsList = type === 'bikes' 
    ? ['engine', 'displacement', 'power', 'torque', 'weight', 'fuelCapacity', 'topSpeed', 'transmissionType']
    : type === 'gear' 
      ? ['material', 'armor', 'certification', 'weight']
      : ['material', 'fitment', 'capacity', 'weight'];

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? `Edit ${typeLabel}` : `Add ${typeLabel}`}</h1>

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
          {type === 'bikes' && (
            <div>
              <label className="block text-xs uppercase text-dark-muted mb-2">Model</label>
              <input name="model" value={form.model} onChange={handleChange} className={inputClass} />
            </div>
          )}
          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} required className={inputClass} disabled={type !== 'bikes'}>
              {type === 'bikes' ? (
                CATEGORIES.filter((c) => c.value).map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))
              ) : type === 'gear' ? (
                <option value="gear">Gear & Apparel</option>
              ) : (
                <option value="accessories">Parts & Accessories</option>
              )}
            </select>
          </div>
          {type === 'bikes' && (
            <div>
              <label className="block text-xs uppercase text-dark-muted mb-2">Year</label>
              <input name="year" type="number" value={form.year} onChange={handleChange} className={inputClass} />
            </div>
          )}
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
          <label className="block text-xs uppercase text-dark-muted mb-2">Image URL or Upload</label>
          <div className="flex flex-col gap-2">
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={inputClass} placeholder="/images/placeholder.svg" />
            <div className="flex items-center gap-4 mt-2">
              <input 
                type="file" 
                onChange={handleFileUpload} 
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent-primary/10 file:text-accent-primary hover:file:bg-accent-primary/20"
                accept="image/*"
              />
              {uploading && <span className="text-sm text-accent-primary animate-pulse">Uploading...</span>}
            </div>
          </div>
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
            {specsList.map((field) => (
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
            {saving ? 'Saving...' : isEdit ? `Update ${typeLabel}` : `Add ${typeLabel}`}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/admin/${type}`)}
            className="px-8 py-3 border border-dark-border rounded-lg hover:border-accent-primary transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
