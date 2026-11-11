import PageHeading from './PageHeading'
import Card from './Card'
import Button from './Button'

export default function NotFoundNotice({ title, backTo, backLabel }) {
  return (
    <>
      <PageHeading title={title} subtitle="This record could not be found." />
      <Card tone="tint">
        <p>It may have been removed, or the link is out of date.</p>
        <div>
          <Button to={backTo}>{backLabel}</Button>
        </div>
      </Card>
    </>
  )
}
