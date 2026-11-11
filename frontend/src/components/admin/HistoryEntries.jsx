export default function HistoryEntries({ entries }) {
  return (
    <div className="adm-lines">
      {entries.map((entry) => (
        <div key={`${entry.date}-${entry.decision}`} style={{ marginBottom: 12 }}>
          <p>
            {entry.date} · {entry.actor}
          </p>
          <p>Decision: {entry.decision}</p>
          <p>{entry.note}</p>
        </div>
      ))}
    </div>
  )
}
