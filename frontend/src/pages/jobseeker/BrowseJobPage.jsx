import { useState } from 'react'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { jobs } from '../../data/jobseekerMockData'

export default function BrowseJobPage() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('Malaysia')
  const [filters, setFilters] = useState({ search: '', location: 'Malaysia' })
  const [type, setType] = useState('All types')
  const [experience, setExperience] = useState('Any requirement')
  const results = jobs.filter((job) => {
    const text = `${job.title} ${job.skills} ${job.employer}`.toLowerCase()
    return (
      text.includes(filters.search.toLowerCase()) &&
      `${job.location} Malaysia`
        .toLowerCase()
        .includes(filters.location.toLowerCase()) &&
      (type === 'All types' || job.type === type) &&
      (experience === 'Any requirement' || job.experience === experience)
    )
  })
  function resetSearch() {
    setSearch('')
    setLocation('Malaysia')
    setFilters({ search: '', location: 'Malaysia' })
    setType('All types')
    setExperience('Any requirement')
  }
  return (
    <div className="js-page">
      <PageHeading
        title="Find your next opportunity"
        subtitle="Explore IT roles in Malaysia and understand how your profile compares."
      />
      <form
        className="js-card js-search"
        onSubmit={(event) => {
          event.preventDefault()
          setFilters({ search: search.trim(), location: location.trim() })
        }}
      >
        <label>
          Job title or skill
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Software developer, Java, SQL…"
          />
        </label>
        <label>
          Location
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <Button type="submit">Search jobs</Button>
      </form>
      <div className="js-columns">
        <div className="js-stack">
          <h3>
            {results.length}{' '}
            {results.length === 1 ? 'opportunity' : 'opportunities'} for you
          </h3>
          <p className="js-small">
            Recommended first · Based on your current profile
          </p>
          {results.map((job) => (
            <Card key={job.id} className="js-job-card">
              <div className="js-between">
                <div>
                  <h2>{job.title}</h2>
                  <p>
                    {job.employer} · {job.location}
                  </p>
                </div>
                <span className="js-match">
                  {job.match}%<br />
                  match
                </span>
              </div>
              <strong>
                {job.salary} / month · {job.type}
              </strong>
              <p>{job.skills}</p>
              <div className="js-between">
                <p className="js-small">
                  {job.id === jobs[0].id && (
                    <>
                      {job.experience}
                      <br />
                    </>
                  )}
                  {job.note}
                </p>
                <Button to={`/jobseeker/jobs/${job.id}`}>View job</Button>
              </div>
            </Card>
          ))}
          {results.length === 0 && (
            <Card title="No jobs found">
              <p>
                Try another job title, skill or location, or clear your filters.
              </p>
              <Button variant="tint" onClick={resetSearch}>
                Reset search
              </Button>
            </Card>
          )}
        </div>
        <Card title="Refine your search">
          <label>
            Job category
            <select defaultValue="Information technology">
              <option>Information technology</option>
            </select>
          </label>
          <label>
            Employment type
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option>All types</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>
          </label>
          <label>
            Experience requirement
            <select
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
            >
              <option>Any requirement</option>
              <option>No experience required</option>
              <option>Not specified</option>
            </select>
          </label>
          <h3 className="js-accent">Match scores explained</h3>
          <p>
            A match reflects documented requirements—not your chance of being
            hired. Open a job to review the breakdown.
          </p>
          <Button to="/jobseeker/profile" variant="tint">
            Review my profile
          </Button>
        </Card>
      </div>
    </div>
  )
}
