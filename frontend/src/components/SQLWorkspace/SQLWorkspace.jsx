import { useState, useCallback, useEffect } from 'react';
import { Play, CheckCircle, RotateCcw } from 'lucide-react';
import QuestionPanel from '../QuestionPanel/QuestionPanel';
import SampleDataViewer from '../SampleDataViewer/SampleDataViewer';
import SQLEditor from '../SQLEditor/SQLEditor';
import QueryResults from '../QueryResults/QueryResults';
import HintBox from '../HintBox/HintBox';
import { queryAPI, progressAPI } from '../../services/api';
import toast from 'react-hot-toast';
import './SQLWorkspace.scss';

const SQLWorkspace = ({ assignment }) => {
  const [query, setQuery] = useState('SELECT * FROM users;');
  const [results, setResults] = useState(null);
  const [queryError, setQueryError] = useState(null);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Load existing progress (attempt count, completion, last query)
  useEffect(() => {
    progressAPI
      .getByAssignment(assignment._id)
      .then((res) => {
        const p = res.data?.data;
        if (p) {
          setAttempts(p.attemptCount || 0);
          setCompleted(p.isCompleted || false);
          if (p.sqlQuery) setQuery(p.sqlQuery);
        }
      })
      .catch(() => null);
  }, [assignment._id]);

  const handleExecute = useCallback(async () => {
    if (!query.trim()) {
      toast.error('Please write a query first.');
      return;
    }

    setRunning(true);
    setQueryError(null);
    setResults(null);

    try {
      const res = await queryAPI.execute({
        assignmentId: assignment._id,
        query: query.trim(),
      });

      setResults(res.data);
      setAttempts((prev) => prev + 1);

      // Save progress (not yet marked complete)
      await progressAPI
        .save({
          assignmentId: assignment._id,
          sqlQuery: query,
          isCompleted: completed,
        })
        .catch(() => null);
    } catch (err) {
      const msg = err.response?.data?.message || 'Query execution failed.';
      setQueryError(msg);
    } finally {
      setRunning(false);
    }
  }, [assignment._id, query, completed]);

  const handleMarkComplete = useCallback(async () => {
    if (!results) {
      toast.error('Run your query successfully before marking as complete.');
      return;
    }
    try {
      await progressAPI.save({
        assignmentId: assignment._id,
        sqlQuery: query,
        isCompleted: true,
      });
      setCompleted(true);
      toast.success('Assignment marked as complete!');
    } catch {
      toast.error('Failed to save progress.');
    }
  }, [assignment._id, query, results]);

  return (
    <div className="workspace-layout">
      {/* Left Panel */}
      <div className="workspace-layout__left">
        <QuestionPanel assignment={assignment} />
        <SampleDataViewer tables={assignment.sampleTables} />
      </div>

      {/* Right Panel */}
      <div className="workspace-layout__right">
        <SQLEditor
          value={query}
          onChange={setQuery}
          onExecute={handleExecute}
          disabled={running}
        />

        {/* Action Row */}
        <div className="sql-workspace__actions">
          <button
            className={`btn btn--primary${running ? ' btn--loading' : ''}`}
            onClick={handleExecute}
            disabled={running}
          >
            {!running && (
              <>
                <Play size={14} />
                Run Query
              </>
            )}
          </button>

          <HintBox
            question={assignment.question}
            userQuery={query}
            sampleTables={assignment.sampleTables}
          />

          {/* Attempt counter */}
          <div className="sql-workspace__attempts" title="Total query runs for this assignment">
            <RotateCcw size={13} />
            <span className="sql-workspace__attempts-count">{attempts}</span>
            <span>{attempts === 1 ? 'attempt' : 'attempts'}</span>
          </div>

          <button
            className={`btn btn--sm sql-workspace__complete-btn${completed ? ' sql-workspace__complete-btn--done' : ''}`}
            onClick={handleMarkComplete}
            disabled={completed}
            title={completed ? 'Assignment completed' : 'Mark this assignment as complete'}
          >
            <CheckCircle size={14} />
            {completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>

        <QueryResults
          results={results}
          error={queryError}
          loading={running}
        />
      </div>
    </div>
  );
};

export default SQLWorkspace;
