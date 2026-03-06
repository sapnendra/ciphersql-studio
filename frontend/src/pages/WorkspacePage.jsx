import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAssignment } from '../hooks/useAssignments';
import SQLWorkspace from '../components/SQLWorkspace/SQLWorkspace';
import './WorkspacePage.scss';

const WorkspacePage = () => {
  const { id } = useParams();
  const { assignment, loading, error } = useAssignment(id);

  if (loading) {
    return (
      <div className="workspace-loading">
        <div className="workspace-loading__spinner" />
        <p>Loading assignment…</p>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="workspace-error">
        <h2>Assignment Not Found</h2>
        <p>{error || 'This assignment does not exist.'}</p>
        <Link to="/assignments" className="btn btn--primary">
          <ArrowLeft size={14} /> Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div className="workspace-page">
      {/* Breadcrumb */}
      <div className="workspace-page__breadcrumb">
        <Link to="/assignments" className="workspace-page__back">
          <ArrowLeft size={14} /> Assignments
        </Link>
        <span className="workspace-page__separator">/</span>
        <span className="workspace-page__current">{assignment.title}</span>
      </div>

      <SQLWorkspace assignment={assignment} />
    </div>
  );
};

export default WorkspacePage;
