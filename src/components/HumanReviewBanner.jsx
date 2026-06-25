export default function HumanReviewBanner({ caseType }) {
  const isPhishing = caseType === 'phishing_or_social_engineering'
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '14px 16px',
      background: 'var(--color-critical-bg)',
      border: '1px solid var(--color-critical)',
      borderRadius: 'var(--radius)',
    }}>
      <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠</span>
      <div>
        <p style={{
          fontSize: '13px',
          fontWeight: '600',
          color: 'var(--color-critical)',
          marginBottom: '2px',
        }}>
          Human Review Required
        </p>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          {isPhishing
            ? 'Potential phishing or social engineering. Escalate to fraud team immediately.'
            : 'Critical severity ticket. Do not leave in queue — assign to a senior agent now.'}
        </p>
      </div>
    </div>
  )
}
