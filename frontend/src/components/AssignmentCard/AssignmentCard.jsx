import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './AssignmentCard.scss';

const difficultyClass = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
};

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();

  return (
    <div
      className="assignment-card"
      onClick={() => navigate(`/assignments/${assignment._id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/assignments/${assignment._id}`)}
    >
      <div className="assignment-card__header">
        <h3 className="assignment-card__title">{assignment.title}</h3>
        <span
          className={`assignment-card__difficulty assignment-card__difficulty--${difficultyClass[assignment.difficulty]}`}
        >
          {assignment.difficulty}
        </span>
      </div>

      <p className="assignment-card__description">{assignment.description}</p>

      <div className="assignment-card__footer">
        <button
          className="btn btn--primary btn--sm btn--full"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/assignments/${assignment._id}`);
          }}
        >
          Attempt <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
