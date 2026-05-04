import { prisma } from '@/lib/db';
import { Mail, Clock, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { ContactActions } from './_components/contact-actions';

export const dynamic = 'force-dynamic';

async function getContacts() {
  return prisma.contact_submission.findMany({
    orderBy: { created_at: 'desc' },
  });
}

export default async function AdminContactsPage() {
  const contacts = await getContacts();
  const newCount = contacts.filter(c => c.status === 'new').length;

  return (
    <div>
      {/* Header */}
      <div className="glass-panel p-6 mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--floyd-text-heading)' }}
        >
          Contact Messages
        </h1>
        <p style={{ color: 'var(--floyd-text-body)' }}>
          {contacts.length} message{contacts.length !== 1 ? 's' : ''} total
          {newCount > 0 && (
            <span className="font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>
              {' '}\u2022 {newCount} new
            </span>
          )}
        </p>
      </div>

      {/* Messages List */}
      {contacts.length === 0 ? (
        <div className="floyd-card p-12 text-center">
          <Mail
            size={48}
            className="mx-auto mb-4"
            style={{ color: 'var(--floyd-accent-cyan)' }}
          />
          <p style={{ color: 'var(--floyd-text-body)' }}>
            No messages yet. The inbox is quiet... suspiciously quiet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="floyd-card p-6"
              style={{
                borderColor: contact.status === 'new'
                    ? 'var(--floyd-accent-cyan)'
                    : 'var(--floyd-glow-purple)',
                opacity: contact.status === 'responded' ? 0.85 : 1,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3
                      className="text-lg font-bold"
                      style={{ color: 'var(--floyd-text-heading)' }}
                    >
                      {contact.name}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                      style={{
                        background:
                          contact.status === 'new'
                            ? 'rgba(0, 229, 255, 0.2)'
                            : contact.status === 'read'
                            ? 'rgba(255, 171, 0, 0.2)'
                            : 'rgba(118, 255, 3, 0.2)',
                        color:
                          contact.status === 'new'
                            ? 'var(--floyd-accent-cyan)'
                            : contact.status === 'read'
                            ? 'var(--floyd-accent-orange)'
                            : 'var(--floyd-accent-green)',
                      }}
                    >
                      {contact.status === 'new' && <AlertCircle size={12} />}
                      {contact.status === 'responded' && <CheckCircle size={12} />}
                      {contact.status}
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--floyd-accent-cyan)' }}
                  >
                    {contact.email}
                  </p>
                  {contact.subject && (
                    <p
                      className="text-sm mt-1"
                      style={{ color: 'var(--floyd-text-muted)' }}
                    >
                      Subject: {contact.subject}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs flex items-center gap-1"
                    style={{ color: 'var(--floyd-text-muted)' }}
                  >
                    <Clock size={12} />
                    {new Date(contact.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div
                className="p-4 rounded-lg mb-4"
                style={{ background: 'rgba(20, 10, 30, 0.9)' }}
              >
                <p
                  className="whitespace-pre-wrap"
                  style={{ color: 'var(--floyd-text-body)' }}
                >
                  {contact.message}
                </p>
              </div>

              <ContactActions id={contact.id} status={contact.status} email={contact.email} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
