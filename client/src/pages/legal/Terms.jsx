import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';

export default function Terms() {
  return (
    <InfoPageLayout title="Terms of Service" subtitle="Last updated: June 2026">
      <div className="space-y-6 text-dark-muted leading-relaxed text-sm">
        <p>
          By accessing or using MotorHub, you agree to these Terms of Service. Please read them carefully
          before making a purchase.
        </p>

        <section>
          <h2 className="text-lg font-bold text-dark-text mb-2">Use of Service</h2>
          <p className="text-dark-muted mb-4 leading-relaxed">
            You must be at least 18 years old to purchase a motorcycle. By using this site, you warrant that you are of legal age and have the capacity to enter into a binding contract.
          </p>

          <h2 className="text-lg font-bold text-dark-text mb-2">Orders & Pricing</h2>
          <p className="text-dark-muted mb-4 leading-relaxed">
            All prices are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase or errors in product or pricing information.
          </p>

          <h2 className="text-lg font-bold text-dark-text mb-2">Limitation of Liability</h2>
          <p className="text-dark-muted mb-4 leading-relaxed">
            MotorHub shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
          </p>

          <h2 className="text-lg font-bold text-dark-text mb-2">Governing Law</h2>
          <p className="text-dark-muted mb-6 leading-relaxed"> by the laws of the State of Texas, United States.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
