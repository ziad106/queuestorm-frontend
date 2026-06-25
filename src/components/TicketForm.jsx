import { useState } from 'react'

const CHANNELS = ['app', 'sms', 'call_center', 'merchant_portal']
const LOCALES = ['en', 'bn', 'mixed']

export default function TicketForm({ onSubmit, loading }) {
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState('app')
  const [locale, setLocale] = useState('en')

  function handleSubmit() {
    if (!message.trim()) return
    onSubmit({
      ticket_id: `T-${Date.now()}`,
      channel,
      locale,
      message: message.trim(),
    })
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font)',
    fontSize: '14px',
    padding: '10px 12px',
    outline: 'none',
    transition: 'border-color 0.15s',
  }

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238B95A6' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '32px',
  }

  const labelStyle = {
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
    marginBottom: '6px',
    display: 'block',
  }

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Row: channel + locale */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Channel</label>
          <select
            value={channel}
            onChange={e => setChannel(e.target.value)}
            style={selectStyle}
          >
            {CHANNELS.map(c => (
              <option key={c} value={c}>{c.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Locale</label>
          <select
            value={locale}
            onChange={e => setLocale(e.target.value)}
            style={selectStyle}
          >
            {LOCALES.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Customer Message</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Paste or type the customer's message here…"
          rows={4}
          style={{
            ...inputStyle,
            resize: 'vertical',
            lineHeight: '1.55',
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
          }}
        />
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          ⌘ Enter to submit
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading || !message.trim()}
        style={{
          background: loading || !message.trim() ? 'var(--color-surface-2)' : 'var(--color-accent)',
          color: loading || !message.trim() ? 'var(--color-text-muted)' : '#000',
          border: 'none',
          borderRadius: 'var(--radius)',
          padding: '11px 20px',
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'var(--font)',
          cursor: loading || !message.trim() ? 'not-allowed' : 'pointer',
          transition: 'background 0.15s, opacity 0.15s',
          alignSelf: 'flex-start',
          letterSpacing: '0.01em',
        }}
      >
        {loading ? 'Classifying…' : 'Classify Ticket →'}
      </button>
    </div>
  )
}
