// tone: paper | tint | rose       titleTone: ink | accent | danger
export default function Card({
  title,
  tone = 'paper',
  titleTone = 'ink',
  compact = false,
  className = '',
  children,
}) {
  const classes = [
    'adm-card',
    tone !== 'paper' && `adm-card--${tone}`,
    compact && 'adm-card--compact',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes}>
      {title && <h2 className={titleTone === 'ink' ? undefined : `is-${titleTone}`}>{title}</h2>}
      {children}
    </section>
  )
}
