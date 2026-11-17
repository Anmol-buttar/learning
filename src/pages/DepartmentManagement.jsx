import { useCallback, useState } from 'react';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
} from '@mui/material';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import ConfirmDialog from '../components/common/ConfirmDialog';
import DepartmentTable from '../components/departments/DepartmentTable';
import DepartmentForm from '../components/departments/DepartmentForm';
import DepartmentDetails from '../components/departments/DepartmentDetails';
import { useDepartments } from '../hooks/useDepartments';
import '../styles/department.css';

const FORM_CLOSED = { open: false, mode: 'add', department: null };

/**
 * Main Department Management page.
 * Orchestrates listing, CRUD dialogs, filters, and user feedback.
 */
function DepartmentManagement() {
  const {
    paginatedDepartments,
    searchTerm,
    statusFilter,
    page,
    rowsPerPage,
    totalCount,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    handleSearchChange,
    handleStatusFilterChange,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useDepartments();

  const [formState, setFormState] = useState(FORM_CLOSED);
  const [viewDepartment, setViewDepartment] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const openAddForm = useCallback(() => {
    setFormState({ open: true, mode: 'add', department: null });
  }, []);

  const openEditForm = useCallback((department) => {
    setFormState({ open: true, mode: 'edit', department });
  }, []);

  const closeForm = useCallback(() => {
    setFormState(FORM_CLOSED);
  }, []);

  /**
   * Routes form submission to create or update based on dialog mode.
   */
  const handleFormSubmit = useCallback(
    async (formData) => {
      if (formState.mode === 'edit' && formState.department) {
        updateDepartment(formState.department.id, formData);
        showSnackbar('Department updated successfully');
      } else {
        addDepartment(formData);
        showSnackbar('Department added successfully');
      }

      closeForm();
    },
    [formState, addDepartment, updateDepartment, closeForm, showSnackbar],
  );

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) {
      return;
    }

    deleteDepartment(deleteTarget.id);
    showSnackbar(`"${deleteTarget.name}" deleted successfully`, 'info');
    setDeleteTarget(null);
  }, [deleteTarget, deleteDepartment, showSnackbar]);

  return (
    <div className="department-page">
      <div className="department-page__container">
        <PageHeader
          title="Department Management"
          subtitle="Create, view, update, and organize company departments."
          addLabel="Add Department"
          onAdd={openAddForm}
        />

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <div className="department-page__toolbar">
            <div className="department-page__toolbar-filters">
              <SearchBar
                value={searchTerm}
                onChange={handleSearchChange}
                label="Search departments"
                placeholder="Search by name, code, head, email..."
              />

              <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 160 } }}>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  label="Status"
                  value={statusFilter}
                  onChange={(event) => handleStatusFilterChange(event.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </Paper>

        <DepartmentTable
          departments={paginatedDepartments}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onView={setViewDepartment}
          onEdit={openEditForm}
          onDelete={setDeleteTarget}
        />
      </div>

      <DepartmentForm
        open={formState.open}
        mode={formState.mode}
        initialValues={formState.department}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />

      <DepartmentDetails
        open={Boolean(viewDepartment)}
        department={viewDepartment}
        onClose={() => setViewDepartment(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Department"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ''
        }
        confirmLabel="Confirm Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DepartmentManagement;
