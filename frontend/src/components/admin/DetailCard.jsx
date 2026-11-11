import Card from './Card'

// Card with a title followed by label / value pairs (e.g. "Account information").
export default function DetailCard({ title, items }) {
  return (
    <Card title={title}>
      <dl className="adm-detail">
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}
