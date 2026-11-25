export function parseCourse(payload) {
  const data = payload?.data;
  if (!data || typeof data.categoryName !== 'string' || !data.categoryName.trim() ||
      typeof data.categoryDescription !== 'string' || ![0, 1, '0', '1'].includes(data.status)) {
    throw new Error('The course service returned an unexpected response.');
  }
  return { categoryName: data.categoryName.trim(), categoryDescription: data.categoryDescription,
    status: Number(data.status) };
}

export async function addCourse(fetcher = fetch, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const url = new URL('https://65.1.150.227:5000/api/Tests/add');
  url.search = new URLSearchParams({categoryName: 'Learn JavaScript', categoryDescription: 'Best language', status: 1});
  try {
    const response = await fetcher(url, {method: 'POST', headers: {'Content-Type': 'text/plain'}, signal: controller.signal});
    if (!response.ok) throw new Error(`The course service returned HTTP ${response.status}.`);
    return parseCourse(await response.json());
  } catch (error) {
    if (controller.signal.aborted) throw new Error('The request timed out. The course may have been saved remotely; check before trying again.');
    throw new Error('Could not confirm the course was saved. Check the service before trying again.');
  } finally {
    clearTimeout(timer);
  }
}

export function filterCourses(courses, {query = '', status = '', sort = 'old'} = {}) {
  const search = query.trim().toLowerCase();
  const filtered = courses.filter(course =>
    (status === '' || String(course.status) === status) &&
    `${course.categoryName} ${course.categoryDescription}`.toLowerCase().includes(search));
  return sort === 'new' ? filtered.reverse() : filtered;
}
