import SeverityBadge from './SeverityBadge'

const DEPT_LABELS = {
  customer_support:    'Customer Support',
  dispute_resolution:  'Dispute Resolution',
  payments_ops:        'Payments Ops',
  fraud_risk:          'Fraud & Risk',
}

const CASE_LABELS = {
  wrong_transfer:                  'Wrong Transfer',
  payment_failed:                  'Payment Failed',
  refund_request:                  'Refund Request',
  phishing_or_social_engineering:  'Phishing / Social Engineering',
  other:                           'Other',
}

function Field({ label, children }) {
  return (
    <div>
      <p style={{
        fontSize: '10px',
        fontWeight: '600',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginBottom: '4px',
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}

function Value({ children }) {
  return (
    <p style={{
      fontSize: '14px',
      fontWeight: '500',
      color: 'var(--color-text-primary)',
    }}>
      {children}
    </p>
  )
}

export default function ResultCard({ result }) {
  const confidence = Math.round((result.confidence || 0) * 100)

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--color-text-secondary)',
          letterSpacing: '0.04em',
        }}>
          Classification Result
        </span>
        <span style={{
          fontSize: '11px',
          color: 'var(--color-text-muted)',
        }}>
          {result.ticket_id}
        </span>
      </div>

      {/* Agent summary — hero field */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface-2)',
      }}>
        <p style={{
          fontSize: '10px',
          fontWeight: '600',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '8px',
        }}>
          Agent Summary
        </p>
        <p style={{
          fontSize: '15px',
          fontWeight: '500',
          color: 'var(--color-text-primary)',
          lineHeight: '1.5',
        }}>
          {result.agent_summary}
        </p>
      </div>

      {/* Data grid */}
      <div style={{
        padding: '20px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px 16px',
      }}>
        <Field label="Case Type">
          <Value>{CASE_LABELS[result.case_type] || result.case_type}</Value>
        </Field>

        <Field label="Severity">
          <SeverityBadge severity={result.severity} />
        </Field>

        <Field label="Assigned To">
          <Value>{DEPT_LABELS[result.department] || result.department}</Value>
        </Field>

        <Field label="Confidence">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              flex: 1,
              height: '4px',
              background: 'var(--color-border)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${confidence}%`,
                height: '100%',
                background: confidence >= 80
                  ? 'var(--color-accent)'
                  : confidence >= 60
                  ? 'var(--color-medium)'
                  : 'var(--color-text-muted)',
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }} />
            </div>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--color-text-secondary)',
              minWidth: '32px',
            }}>
              {confidence}%
            </span>
          </div>
        </Field>
      </div>
    </div>
  )
}
