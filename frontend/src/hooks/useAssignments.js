import { useState, useEffect } from 'react';
import { assignmentAPI } from '../services/api';

export const useAssignments = (params = {}) => {
  const [assignments, setAssignments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await assignmentAPI.getAll(params);
        setAssignments(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load assignments.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [paramsKey]);

  return { assignments, pagination, loading, error };
};

export const useAssignment = (id) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchAssignment = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await assignmentAPI.getById(id);
        setAssignment(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Assignment not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id]);

  return { assignment, loading, error };
};
