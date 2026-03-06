import { AlertTriangle, Play, CheckCircle } from 'lucide-react';
import './QueryResults.scss';

const QueryResults = ({ results, error, loading }) => {
  if (loading) {
    return (
      <div className="query-results query-results--loading">
        <div className="query-results__spinner" />
        <span>Executing query…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="query-results query-results--error">
        <AlertTriangle className="query-results__error-icon" size={20} />
        <div>
          <p className="query-results__error-title">Query Error</p>
          <pre className="query-results__error-msg">{error}</pre>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="query-results query-results--empty">
        <Play className="query-results__empty-icon" size={30} strokeWidth={2.5} />
        <p>Run a query to see results here</p>
        <p className="query-results__empty-hint">Press Ctrl+Enter or click Run Query</p>
      </div>
    );
  }

  const { rows = [], fields = [] } = results;
  const rowCount = rows.length;

  if (rows.length === 0) {
    return (
      <div className="query-results query-results--empty">
        <CheckCircle className="query-results__empty-icon" size={28} strokeWidth={1.5} />
        <p>Query executed successfully</p>
        <p className="query-results__empty-hint">No rows returned</p>
      </div>
    );
  }

  const columns = fields.length > 0 ? fields.map((f) => f.name) : Object.keys(rows[0]);

  return (
    <div className="query-results">
      <div className="query-results__meta">
        <span className="query-results__count">
          {rowCount} row{rowCount !== 1 ? 's' : ''} returned
        </span>
      </div>
      <div className="results-table">
        <table className="results-table__container">
          <thead className="results-table__head">
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="results-table__body">
            {rows.map((row, ri) => (
              <tr key={ri}>
                {columns.map((col) => (
                  <td
                    key={col}
                    className={row[col] === null ? 'null-value' : ''}
                  >
                    {row[col] === null ? 'NULL' : String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueryResults;
