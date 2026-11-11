import Button from './Button'

export default function DecisionPanel({
  title,
  description,
  confirmLabel,
  onConfirm,
  confirmDisabled = false,
  cancelLabel = 'Cancel review',
  cancelTo,
}) {
  return (
    <aside className="adm-card adm-decision" aria-label={title}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button fullWidth onClick={onConfirm} disabled={confirmDisabled}>
        {confirmLabel}
      </Button>
      <Button fullWidth variant="tint" to={cancelTo}>
        {cancelLabel}
      </Button>
    </aside>
  )
}
