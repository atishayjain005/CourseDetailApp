import Image from 'next/image';
export default function Main({ courses, hasCourses }) {
  return <section aria-label="Courses">
    <p role="status">{courses.length} {courses.length === 1 ? 'course' : 'courses'} shown</p>
    {!courses.length && <p>{hasCourses ? 'No courses match these filters. Reset filters to see all courses.' : 'No courses added in this session yet.'}</p>}
    <div className="course-grid">{courses.map(course => <article className="course-card" key={course.localId}>
      <Image src="/js.png" alt="" width={1000} height={600} />
      <h2>{course.categoryName}</h2><p>{course.categoryDescription}</p>
      <span className="course-status">{course.status === 1 ? 'Published' : 'Drafted'}</span>
    </article>)}</div>
  </section>;
}
