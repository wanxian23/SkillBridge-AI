export default function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="adm-section-heading">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  )
}
