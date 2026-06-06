import React, { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import InfoPageLayout from '../../components/InfoPageLayout';
import axiosInstance from '../../api/axiosInstance';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      await axiosInstance.post('/contact', form);
      setStatus({ type: 'success', text: 'Message sent! We will get back to you within 24 hours.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.response?.data?.error || 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:border-accent-primary outline-none text-sm';

  return (
    <InfoPageLayout
      title="Contact Us"
      subtitle="Have a question about a motorcycle, order, or financing? Our team is here to help."
    >
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-6">
          {[
            { icon: FiMail, label: 'Email', value: 'support@motorhub.com' },
            { icon: FiPhone, label: 'Phone', value: '+1 (800) 555-0199' },
            { icon: FiMapPin, label: 'Address', value: '1200 Rider Blvd, Austin, TX 78701' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center text-accent-primary flex-shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-dark-muted mb-1">{label}</div>
                <div className="text-sm font-medium">{value}</div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-dark-card border border-dark-border rounded-lg text-sm text-dark-muted">
            <strong className="text-white block mb-1">Business Hours</strong>
            Mon – Fri: 9:00 AM – 7:00 PM<br />
            Sat: 10:00 AM – 5:00 PM<br />
            Sun: Closed
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
          {status.text && (
            <div className={`p-4 rounded-lg text-sm border ${
              status.type === 'success'
                ? 'bg-green-500/10 border-green-500/50 text-green-400'
                : 'bg-red-500/10 border-red-500/50 text-red-400'
            }`}>
              {status.text}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-dark-muted mb-2">Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block text-xs uppercase text-dark-muted mb-2">Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Subject *</label>
            <input name="subject" value={form.subject} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-xs uppercase text-dark-muted mb-2">Message *</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={6} className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-accent-primary text-dark-bg font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            <FiSend size={18} />
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </InfoPageLayout>
  );
}
