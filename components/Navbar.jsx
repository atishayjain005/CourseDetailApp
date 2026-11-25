export default function Navbar({ onAdd, pending }) {
  return <header className="course-header">
    <h1>My Courses</h1>
    <button className="btn btn-primary" onClick={onAdd} disabled={pending} aria-busy={pending}>
      {pending ? 'Adding course…' : 'Add Course'}
    </button>
  </header>;
}
