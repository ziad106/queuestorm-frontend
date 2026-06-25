import { useState } from 'react'
import TicketForm from './components/TicketForm'
import ResultCard from './components/ResultCard'
import HumanReviewBanner from './components/HumanReviewBanner'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(payload) {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sort-ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || `Server error ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px 80px',
    }}>
      {/* Header */}
      <header style={{ width: '100%', maxWidth: '680px', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}>
          <div style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: 'var(--color-accent)',
          }} />
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}>
            QueueStorm
          </span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          lineHeight: '1.2',
          color: 'var(--color-text-primary)',
          marginBottom: '8px',
        }}>
          Ticket Triage
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          lineHeight: '1.5',
        }}>
          Paste a customer message. Get instant classification for routing and review.
        </p>
      </header>

      {/* Main */}
      <main style={{ width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TicketForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <div style={{
            padding: '14px 16px',
            background: 'var(--color-critical-bg)',
            border: '1px solid var(--color-critical)',
            borderRadius: 'var(--radius)',
            color: 'var(--color-critical)',
            fontSize: '13px',
          }}>
            {error}
          </div>
        )}

        {result && (
          <>
            {result.human_review_required && <HumanReviewBanner caseType={result.case_type} />}
            <ResultCard result={result} />
          </>
        )}
      </main>
    </div>
  )
}
