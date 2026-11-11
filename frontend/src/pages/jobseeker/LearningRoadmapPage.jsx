import { useState } from 'react'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { activities } from '../../data/jobseekerMockData'
import {
  readJobseekerData,
  saveJobseekerData,
} from '../../utils/jobseekerStorage'
import externalIcon from '../../assets/jobseeker/external-link.svg'

export default function LearningRoadmapPage() {
  const [progress, setProgress] = useState(() =>
    readJobseekerData('progress', ['Completed', 'In Progress', 'Not Started'])
  )
  const [message, setMessage] = useState('')
  const completed = progress.filter((status) => status === 'Completed').length
  const next = progress.findIndex((status) => status !== 'Completed')
  function updateActivity(index) {
    const updated = [...progress]
    updated[index] =
      progress[index] === 'Not Started' ? 'In Progress' : 'Completed'
    if (!saveJobseekerData('progress', updated)) {
      setMessage('Progress could not be saved. Please try again.')
      return
    }
    setProgress(updated)
    setMessage('Progress saved. Continue with your next activity.')
  }
  return (
    <div className="js-page js-page--compact js-learning">
      <PageHeading
        title="Your learning roadmap"
        subtitle={
          message ||
          'Build practical evidence for your Junior Software Developer goal.'
        }
      />
      <Card title="Junior Software Developer">
        <p>
          Focus areas: Docker and unit testing · 3 activities · About 3½ hours
          in total
        </p>
      </Card>
      <div className="js-columns">
        <div className="js-stack">
          {activities.map((activity, index) => (
            <Card key={activity.title}>
              <div className="js-between">
                <h2>
                  {String(index + 1).padStart(2, '0')} · {activity.title}
                </h2>
                <span className="js-badge">{progress[index]}</span>
              </div>
              <p className="js-small">{activity.source}</p>
              <p className="js-ink">{activity.description}</p>
              <div className="js-actions">
                <a
                  className="js-resource-link"
                  href={activity.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open resource
                  <img src={externalIcon} alt="(opens in a new tab)" />
                </a>
                {index === next && (
                  <Button onClick={() => updateActivity(index)}>
                    {progress[index] === 'In Progress'
                      ? 'Mark as complete'
                      : 'Start activity'}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
        <Card tint>
          <p className="js-eyebrow">YOUR PROGRESS</p>
          <strong className="js-number">{completed} of 3</strong>
          <p className="js-ink">Activities completed</p>
          <progress
            max="3"
            value={completed}
            aria-label="Activities completed"
          />
          <h3>
            {completed === 3 ? 'All activities complete' : 'Next activity'}
          </h3>
          {next !== -1 && <h2>{activities[next].title}</h2>}
          <p>
            {completed === 3
              ? 'Well done. Add your practical examples to your profile when you are ready.'
              : 'Complete the resource, practise the task, then update your progress.'}
          </p>
          <h3>Build evidence, not just completion</h3>
          <p>
            Finishing a resource does not automatically change your skill
            proficiency. Add examples to your profile when you are ready.
          </p>
          <Button to="/jobseeker/profile/edit#skills">Update skill evidence</Button>
        </Card>
      </div>
      <p className="js-small" role="status">
        Progress is recorded by you. External learning resources open in a new
        tab.
      </p>
    </div>
  )
}
