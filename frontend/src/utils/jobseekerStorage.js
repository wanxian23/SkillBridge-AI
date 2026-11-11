// Browser storage keeps this frontend demo working between pages and refreshes.
export function readJobseekerData(key, fallback) {
  try {
    return (
      JSON.parse(localStorage.getItem(`skillbridge-jobseeker-${key}`)) ??
      fallback
    )
  } catch {
    return fallback
  }
}
export function saveJobseekerData(key, value) {
  try {
    localStorage.setItem(`skillbridge-jobseeker-${key}`, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
