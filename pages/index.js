import Head from 'next/head';
import { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Details from '../components/Details';
import { addCourse, filterCourses } from '../lib/courses.mjs';
const initialFilters = {query: '', status: '', sort: 'old'};
export default function Home() {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const inFlight = useRef(false);
  const nextId = useRef(0);
  async function handleAdd() {
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setError('');
    try {
      const course = await addCourse();
      const entry = {...course, localId: ++nextId.current};
      setCourses(previous => [...previous, entry]);
    } catch (failure) {
      setError(failure.message);
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }
  return <main className="course-page">
    <Head><title>My Courses | Course Detail App</title><meta name="description" content="Course management interface with search and publication filters." /></Head>
    <Navbar onAdd={handleAdd} pending={pending} />
    <p>Add Course sends the existing JavaScript sample to the course service. This page only shows courses added during this session; reloading clears the local list.</p>
    {error && <p role="alert">{error}</p>}
    <Details filters={filters} onChange={(key, value) => setFilters(previous => ({...previous, [key]: value}))} onReset={() => setFilters(initialFilters)} />
    <Main courses={filterCourses(courses, filters)} hasCourses={courses.length > 0} />
  </main>;
}
