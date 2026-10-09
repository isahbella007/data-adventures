import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/shared/LegalPage';
import { LEGAL } from '@/data/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Data World Adventures handles your personal data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        We teach children to be careful with their data, so we try to collect as little of yours as possible.
        This page explains what we collect, why, and what you can do about it.
      </p>

      <h2>Who is responsible</h2>
      <p>
        {LEGAL.name}, {LEGAL.businessName}, {LEGAL.address.join(', ')}. Email:{' '}
        <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
      </p>

      <h2>No tracking, no advertising cookies</h2>
      <p>
        This website does not use analytics, advertising cookies or tracking scripts. Fonts are served from our
        own website, not from Google.
      </p>

      <h2>Hosting</h2>
      <p>
        The website is hosted by Netlify, Inc. (USA). When you visit, Netlify processes technical data such as
        your IP address, browser type and the pages requested, in order to deliver the site and keep it secure
        (Art. 6(1)(f) GDPR). Netlify participates in the EU-US Data Privacy Framework.
      </p>

      <h2>Newsletter (&ldquo;Privacy Radar&rdquo;)</h2>
      <p>
        If you sign up, we store your email address to tell you about new books and free printables. The legal
        basis is your consent (Art. 6(1)(a) GDPR). Email addresses are stored and sent by our newsletter
        provider Brevo (Sendinblue SAS, France), which processes them on our behalf under a data processing
        agreement.
      </p>
      <p>
        The newsletter is for grown-ups. Please do not sign up with a child&apos;s email address.
      </p>
      <p>
        You can unsubscribe at any time using the link in every email, or by writing to us. We then delete your
        address from the list.
      </p>

      <h2>Buying the book</h2>
      <p>
        The &ldquo;Get the Book&rdquo; buttons link to Amazon and Selar. If you follow them, those shops&apos;
        own privacy policies apply. We do not receive your payment details.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right to access, correct, delete or restrict the use of your data, to data portability, to
        object, and to withdraw consent at any time. Just email us. You can also complain to the Austrian Data
        Protection Authority (Datenschutzbehörde,{' '}
        <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">
          dsb.gv.at
        </a>
        ).
      </p>

      <p style={{ marginTop: 40, fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>
        Last updated: {LEGAL.lastUpdated}. See also our <Link href="/impressum">Impressum</Link>.
      </p>
    </LegalPage>
  );
}
