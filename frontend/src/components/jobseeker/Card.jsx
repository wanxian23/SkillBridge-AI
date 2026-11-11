export default function Card({
  children,
  className = '',
  title,
  tint = false,
}) {
  return (
    <section className={`js-card ${tint ? 'js-card--tint' : ''} ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}
