import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';

const sections = [
  {
    title: 'Free Shipping',
    body: 'Orders over $500 qualify for free standard shipping within the continental United States.',
  },
  {
    title: 'Delivery Timeline',
    body: 'In-stock motorcycles are delivered within 2–3 business days. Custom or pre-order models ship as soon as they arrive at our warehouse.',
  },
  {
    title: 'White Glove Delivery',
    body: 'Premium delivery includes professional unloading, basic setup, and a walkthrough of your new motorcycle. Available for $299 on select models.',
  },
  {
    title: 'Tracking',
    body: 'You will receive a tracking number and delivery updates via email once your order ships.',
  },
  {
    title: 'International Shipping',
    body: 'We currently ship within the US only. International inquiries can be directed to support@motorhub.com.',
  },
];

export default function Shipping() {
  return (
    <InfoPageLayout title="Shipping Info" subtitle="Everything you need to know about getting your motorcycle delivered.">
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-xl font-bold text-accent-primary mb-2">{s.title}</h2>
            <p className="text-dark-muted leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
}
