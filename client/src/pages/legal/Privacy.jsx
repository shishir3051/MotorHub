import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';

export default function Privacy() {
  return (
    <InfoPageLayout title="Privacy Policy" subtitle="Last updated: June 2026">
      <div className="space-y-6 text-dark-muted leading-relaxed text-sm">
        <p>
          MotorHub (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This policy explains how we collect,
          use, and protect your personal information when you use our website and services.
        </p>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Account details: name, email, phone, and address</li>
            <li>Order and payment information</li>
            <li>Browsing activity and device data via cookies</li>
            <li>Communications you send through our contact form</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Process orders and deliver motorcycles</li>
            <li>Provide customer support</li>
            <li>Improve our website and services</li>
            <li>Send order updates and promotional emails (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Data Security</h2>
          <p>
            We use industry-standard encryption and secure servers to protect your data. Passwords are hashed
            and never stored in plain text.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal data by contacting support@motorhub.com.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
