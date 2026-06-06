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
          <h2 className="text-lg font-bold text-white mb-2">Use of Service</h2>
          <p>
            You must be at least 18 years old and hold a valid motorcycle license to purchase vehicles.
            You agree to provide accurate account and payment information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Orders &amp; Pricing</h2>
          <p>
            All prices are listed in USD. We reserve the right to correct pricing errors. An order is confirmed
            only after payment is successfully processed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Limitation of Liability</h2>
          <p>
            MotorHub is not liable for indirect, incidental, or consequential damages arising from use of our
            services. Our total liability is limited to the amount paid for the product in question.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Texas, United States.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
