import { LayoutGrid, Table2 } from 'lucide-react';
import './SampleDataViewer.scss';

const SampleDataViewer = ({ tables = [] }) => {
  if (!tables || tables.length === 0) return null;

  return (
    <div className="sample-data-viewer">
      <div className="sample-data-viewer__header">
        <LayoutGrid className="sample-data-viewer__icon" size={16} strokeWidth={1.5} />
        <h3 className="sample-data-viewer__title">Sample Data</h3>
      </div>

      {tables.map((table, idx) => (
        <div key={idx} className="sample-table">
          <div className="sample-table__name">
            <span className="sample-table__name-label">
              <Table2 size={13} strokeWidth={1.5} /> {table.tableName}
            </span>
          </div>

          <div className="results-table">
            <table className="results-table__container">
              <thead className="results-table__head">
                <tr>
                  {table.columns.map((col, ci) => (
                    <th key={ci}>
                      {col.columnName}
                      <span className="sample-data-viewer__col-type">
                        {col.dataType}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="results-table__body">
                {table.rows && table.rows.length > 0 ? (
                  table.rows.map((row, ri) => (
                    <tr key={ri}>
                      {(Array.isArray(row) ? row : Object.values(row)).map(
                        (cell, ci) => (
                          <td
                            key={ci}
                            className={cell === null ? 'null-value' : ''}
                          >
                            {cell === null ? 'NULL' : String(cell)}
                          </td>
                        )
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={table.columns.length}
                      className="sample-data-viewer__empty"
                    >
                      No sample rows
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SampleDataViewer;
