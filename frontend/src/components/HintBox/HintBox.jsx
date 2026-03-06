import { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { hintAPI } from '../../services/api';
import toast from 'react-hot-toast';
import './HintBox.scss';

const HintBox = ({ question, userQuery, sampleTables }) => {
  const [hint, setHint] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(false);

  const buildSchema = () => {
    if (!sampleTables || sampleTables.length === 0) return 'No schema available.';
    return sampleTables
      .map((t) => {
        const cols = t.columns.map((c) => `  ${c.columnName} ${c.dataType}`).join(',\n');
        return `Table: ${t.tableName}\n(\n${cols}\n)`;
      })
      .join('\n\n');
  };

  const handleGetHint = async () => {
    setLoading(true);
    try {
      const res = await hintAPI.getHint({
        question,
        userQuery: userQuery || '',
        schema: buildSchema(),
      });
      setHint(res.data.hint);
      setIsFallback(!!res.data.fallback);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to get hint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hint-box">
      {hint ? (
        <div className="hint-box__content">
          <div className="hint-box__header">
            <Lightbulb className="hint-box__icon" size={16} />
            <span className="hint-box__label">Hint</span>
            <button
              className="hint-box__close"
              onClick={() => { setHint(null); setIsFallback(false); }}
              aria-label="Dismiss hint"
            >
              <X size={14} />
            </button>
          </div>
          <p className="hint-box__text">{hint}</p>
          {isFallback && (
            <p className="hint-box__fallback">AI hint limit reached - showing a general hint.</p>
          )}
        </div>
      ) : (
        <button
          className={`btn btn--secondary${loading ? ' btn--loading' : ''}`}
          onClick={handleGetHint}
          disabled={loading}
        >
          {!loading && (
            <>
              <Lightbulb size={16} />
              Get Hint
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default HintBox;
