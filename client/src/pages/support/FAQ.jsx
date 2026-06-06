import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import InfoPageLayout from '../../components/InfoPageLayout';

const faqs = [
  {
    q: 'How do I purchase a motorcycle?',
    a: 'Browse our shop, add your chosen bike to the cart, and proceed to checkout. You can pay securely online and schedule delivery or pickup.',
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes. Select models qualify for 0% APR financing for up to 36 months. Apply at checkout or contact our sales team for custom plans.',
  },
  {
    q: 'Can I test ride before buying?',
    a: 'Test rides are available at our Austin showroom by appointment. Book through Contact Us or call us directly.',
  },
  {
    q: 'What warranty is included?',
    a: 'All new motorcycles include the full manufacturer warranty. Extended coverage options are available at purchase.',
  },
  {
    q: 'How long does delivery take?',
    a: 'In-stock bikes ship within 2–3 business days. Custom orders may take 2–6 weeks depending on the model.',
  },
  {
    q: 'Can I return a motorcycle?',
    a: 'Returns are accepted within 7 days of delivery for unused bikes in original condition. See our Returns page for full details.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <InfoPageLayout title="FAQ" subtitle="Answers to the most common questions from our riders.">
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div key={i} className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-dark-bg/50 transition"
            >
              <span className="font-semibold pr-4">{item.q}</span>
              <FiChevronDown className={`flex-shrink-0 transition-transform ${open === i ? 'rotate-180 text-accent-primary' : 'text-dark-muted'}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-dark-muted text-sm leading-relaxed border-t border-dark-border pt-4">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
}
