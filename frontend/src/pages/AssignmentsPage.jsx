import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { useAssignments } from '../hooks/useAssignments';
import AssignmentCard from '../components/AssignmentCard/AssignmentCard';
import useMeta from '../hooks/useMeta';
import './AssignmentsPage.scss';

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

const AssignmentsPage = () => {
  useMeta({
    title: 'Assignments',
    description:
      'Browse 30+ SQL assignments from beginner SELECT queries to advanced JOINs, aggregations, CTEs, and window functions.',
  });

  const [page, setPage] = useState(1);
  const [difficulty, setDifficulty] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Trigger search 300ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { assignments, pagination, loading, error } = useAssignments({
    page,
    limit: 12,
    ...(difficulty && { difficulty }),
    ...(search && { search }),
  });

  const handleDifficulty = (d) => {
    setDifficulty(d === 'All' ? '' : d);
    setPage(1);
  };

  return (
    <main className="assignments-page page__content">
      {/* Header */}
      <div className="section-header">
        <div>
          <h1 className="section-header__title">SQL Assignments</h1>
          <p className="section-header__subtitle">
            Practice SQL with real datasets
          </p>
        </div>
        {pagination && (
          <span className="assignments-page__total">
            {pagination.total} assignments
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="assignments-page__filters">
        {/* Search — debounced, no submit button needed */}
        <div className="assignments-page__search" role="search">
          <input
            type="search"
            placeholder="Search assignments…"
            className="assignments-page__search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search assignments"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="assignments-page__difficulty-filter">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              className={`btn btn--sm ${
                (difficulty === '' && d === 'All') || difficulty === d
                  ? 'btn--primary'
                  : 'btn--secondary'
              }`}
              onClick={() => handleDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="assignments-page__loading">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="assignments-page__skeleton" />
          ))}
        </div>
      ) : error ? (
        <div className="assignments-page__error">
          <p><AlertTriangle size={16} /> {error}</p>
        </div>
      ) : assignments.length === 0 ? (
        <div className="assignments-page__empty">
          <p>No assignments found.</p>
        </div>
      ) : (
        <div className="assignments-grid">
          {assignments.map((a) => (
            <AssignmentCard key={a._id} assignment={a} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="assignments-page__pagination">
          <button
            className="btn btn--secondary btn--sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <span className="assignments-page__page-info">
            Page {page} of {pagination.pages}
          </span>
          <button
            className="btn btn--secondary btn--sm"
            onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </main>
  );
};

export default AssignmentsPage;
