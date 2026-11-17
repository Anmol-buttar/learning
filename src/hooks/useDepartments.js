import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DEPARTMENTS_STORAGE_KEY,
  INITIAL_DEPARTMENTS,
} from '../data/departmentsData';

/**
 * Loads departments from localStorage, falling back to seed data
 * when storage is empty or corrupted.
 */
function loadDepartmentsFromStorage() {
  try {
    const stored = localStorage.getItem(DEPARTMENTS_STORAGE_KEY);
    if (!stored) {
      return INITIAL_DEPARTMENTS;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return INITIAL_DEPARTMENTS;
    }

    return parsed;
  } catch {
    // Corrupted storage should not break the module
    return INITIAL_DEPARTMENTS;
  }
}

/**
 * Persists the current department list so refresh keeps user changes.
 */
function persistDepartments(departments) {
  localStorage.setItem(DEPARTMENTS_STORAGE_KEY, JSON.stringify(departments));
}

/**
 * Custom hook that owns all department CRUD + list filtering logic.
 * Keeps business rules out of presentational components.
 */
export function useDepartments() {
  const [departments, setDepartments] = useState(loadDepartmentsFromStorage);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Keep localStorage in sync whenever the list changes
  useEffect(() => {
    persistDepartments(departments);
  }, [departments]);

  /**
   * Creates a new department record with a unique id.
   */
  const addDepartment = useCallback((formData) => {
    const newDepartment = {
      ...formData,
      id: `dept-${Date.now()}`,
      code: formData.code.toUpperCase(),
      employeeCount: Number(formData.employeeCount) || 0,
    };

    setDepartments((prev) => [newDepartment, ...prev]);
    setPage(0);
    return newDepartment;
  }, []);

  /**
   * Updates an existing department in place to avoid duplicates.
   */
  const updateDepartment = useCallback((id, formData) => {
    setDepartments((prev) =>
      prev.map((department) =>
        department.id === id
          ? {
              ...department,
              ...formData,
              id,
              code: formData.code.toUpperCase(),
              employeeCount: Number(formData.employeeCount) || 0,
            }
          : department,
      ),
    );
  }, []);

  /**
   * Removes a department after the user confirms deletion.
   */
  const deleteDepartment = useCallback((id) => {
    setDepartments((prev) => prev.filter((department) => department.id !== id));
  }, []);

  /**
   * Finds a single department by id for view/edit flows.
   */
  const getDepartmentById = useCallback(
    (id) => departments.find((department) => department.id === id) || null,
    [departments],
  );

  // Filter + search run before pagination so page counts stay accurate
  const filteredDepartments = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return departments.filter((department) => {
      const matchesStatus =
        statusFilter === 'All' || department.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchable = [
        department.name,
        department.code,
        department.headOfDepartment,
        department.email,
        department.location,
        department.description,
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedSearch);
    });
  }, [departments, searchTerm, statusFilter]);

  // Slice the filtered list for the current page
  const paginatedDepartments = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredDepartments.slice(start, start + rowsPerPage);
  }, [filteredDepartments, page, rowsPerPage]);

  // Reset to first page when filters change to avoid empty pages
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    setPage(0);
  }, []);

  const handleStatusFilterChange = useCallback((value) => {
    setStatusFilter(value);
    setPage(0);
  }, []);

  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return {
    departments,
    filteredDepartments,
    paginatedDepartments,
    searchTerm,
    statusFilter,
    page,
    rowsPerPage,
    totalCount: filteredDepartments.length,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentById,
    handleSearchChange,
    handleStatusFilterChange,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}
