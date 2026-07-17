function StatsCard({ label, value }) {
  return (
    <div className="stats-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}

export default StatsCard
