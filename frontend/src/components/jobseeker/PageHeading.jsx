export default function PageHeading({ title, subtitle }) {
  return (
    <div className="js-heading">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
