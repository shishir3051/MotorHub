import React from 'react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../../components/InfoPageLayout';

export default function Returns() {
  return (
    <InfoPageLayout title="Returns" subtitle="Our return policy is designed to give you confidence in every purchase.">
      <div className="space-y-8 text-dark-muted leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-2">7-Day Return Window</h2>
          <p>
            You may return an unused motorcycle within 7 days of delivery. The bike must be in its original
            condition with fewer than 50 miles recorded and no modifications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">How to Initiate a Return</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Contact our support team via the <Link to="/contact" className="text-accent-primary hover:underline">Contact Us</Link> page.</li>
            <li>Provide your order number and reason for return.</li>
            <li>We will arrange pickup and inspect the motorcycle upon arrival.</li>
            <li>Refunds are processed within 5–10 business days after approval.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">Restocking Fee</h2>
          <p>
            A 10% restocking fee may apply to returns that are not due to manufacturer defects or shipping damage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">Non-Returnable Items</h2>
          <p>
            Custom-ordered motorcycles, bikes with aftermarket modifications, and clearance items marked as final sale cannot be returned.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
