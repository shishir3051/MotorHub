import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';

export default function Cookies() {
  return (
    <InfoPageLayout title="Cookie Policy" subtitle="Last updated: June 2026">
      <div className="space-y-6 text-dark-muted leading-relaxed text-sm">
        <p>
          MotorHub uses cookies and similar technologies to improve your browsing experience,
          remember your preferences, and analyze site traffic.
        </p>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Types of Cookies We Use</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">Essential:</strong> Required for login, cart, and checkout functionality.</li>
            <li><strong className="text-white">Analytics:</strong> Help us understand how visitors use our site.</li>
            <li><strong className="text-white">Preference:</strong> Remember your settings and filter choices.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Managing Cookies</h2>
          <p>
            You can disable cookies in your browser settings. Note that disabling essential cookies may
            prevent you from logging in or completing purchases.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Session Storage</h2>
          <p>
            We use browser session storage to keep your login and cart separate for admin and customer
            accounts within the same browser.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
