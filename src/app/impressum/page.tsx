import type { Metadata } from 'next';
import LegalPage from '@/shared/LegalPage';
import { LEGAL } from '@/data/legal';

export const metadata: Metadata = {
  title: 'Impressum / Legal Notice',
  description: 'Legal notice for Data World Adventures.',
  alternates: {
    canonical: '/impressum',
  },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum / Legal Notice">
      <p>Information according to § 5 ECG and § 25 MedienG (Austria).</p>

      <h2>Owner and publisher</h2>
      <p>
        {LEGAL.name}
        <br />
        {LEGAL.businessName}
        <br />
        {LEGAL.address.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
      </p>

      <h2>Business purpose</h2>
      <p>{LEGAL.businessPurpose}</p>

      <h2>VAT ID</h2>
      <p>{LEGAL.vatId}</p>

      <h2>Editorial policy</h2>
      <p>
        Information about the Data World Adventures book series and its creators, and about children&apos;s
        data literacy.
      </p>

      <h2>Online dispute resolution</h2>
      <p>
        The European Commission provides a platform for online dispute resolution at{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        . We are not obliged or willing to take part in dispute resolution proceedings before a consumer
        arbitration board.
      </p>
    </LegalPage>
  );
}
