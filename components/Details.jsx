export default function Details({ filters, onChange, onReset }) {
  return <section className="course-filters" aria-label="Filter courses">
    <label>Search courses<input type="search" value={filters.query} onChange={event => onChange('query', event.target.value)} /></label>
    <label>Added order<select value={filters.sort} onChange={event => onChange('sort', event.target.value)}>
      <option value="old">Oldest added first</option><option value="new">Newest added first</option>
    </select></label>
    <label>Publication status<select value={filters.status} onChange={event => onChange('status', event.target.value)}>
      <option value="">All statuses</option><option value="1">Published</option><option value="0">Drafted</option>
    </select></label>
    <label>Type<select disabled aria-describedby="type-help"><option>Unavailable</option></select></label>
    <button className="btn btn-outline-primary" onClick={onReset}>Reset filters</button>
    <p id="type-help">Course type is not provided by the current service.</p>
  </section>;
}
