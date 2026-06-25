const CONFIG = {
  low:      { label: 'Low',      color: 'var(--color-low)',      bg: 'var(--color-low-bg)' },
  medium:   { label: 'Medium',   color: 'var(--color-medium)',   bg: 'var(--color-medium-bg)' },
  high:     { label: 'High',     color: 'var(--color-high)',     bg: 'var(--color-high-bg)' },
  critical: { label: 'Critical', color: 'var(--color-critical)', bg: 'var(--color-critical-bg)' },
}

export default function SeverityBadge({ severity }) {
  const c = CONFIG[severity] || CONFIG.low
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 8px',
      borderRadius: '4px',
      background: c.bg,
      color: c.color,
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    }}>
      <span style={{
        width: '5px', height: '5px',
        borderRadius: '50%',
        background: c.color,
        flexShrink: 0,
      }} />
      {c.label}
    </span>
  )
}
