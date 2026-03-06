import './QuestionPanel.scss';

const difficultyClass = { Easy: 'easy', Medium: 'medium', Hard: 'hard' };

const QuestionPanel = ({ assignment }) => {
  if (!assignment) return null;

  return (
    <div className="question-panel">
      <div className="question-panel__header">
        <span
          className={`question-panel__difficulty question-panel__difficulty--${difficultyClass[assignment.difficulty]}`}
        >
          {assignment.difficulty}
        </span>
        <h2 className="question-panel__title">{assignment.title}</h2>
      </div>

      <div className="question-panel__section">
        <p className="question-panel__section-label">Description</p>
        <p className="question-panel__text">{assignment.description}</p>
      </div>

      <div className="question-panel__section">
        <p className="question-panel__section-label">Question</p>
        <p className="question-panel__question">{assignment.question}</p>
      </div>
    </div>
  );
};

export default QuestionPanel;
