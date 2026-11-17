import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';

/**
 * Read-only department detail view.
 */
function DepartmentDetails({ open, department, onClose }) {
  if (!department) {
    return null;
  }

  const fields = [
    { label: 'Department Code', value: department.code },
    { label: 'Department Name', value: department.name },
    {
      label: 'Status',
      value: (
        <Chip
          size="small"
          label={department.status}
          color={department.status === 'Active' ? 'success' : 'default'}
        />
      ),
    },
    { label: 'Head of Department', value: department.headOfDepartment },
    { label: 'Email', value: department.email },
    { label: 'Phone', value: department.phone },
    { label: 'Location', value: department.location },
    { label: 'Employee Count', value: department.employeeCount },
    { label: 'Established Date', value: department.establishedDate },
    {
      label: 'Description',
      value: department.description,
      fullWidth: true,
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Department Details</DialogTitle>
      <Divider />
      <DialogContent>
        <div className="department-details-grid">
          {fields.map((field) => (
            <div
              key={field.label}
              className={`department-details-field${field.fullWidth ? ' department-details-field--full' : ''}`}
            >
              <Typography component="span" className="department-details-label">
                {field.label}
              </Typography>
              {typeof field.value === 'string' || typeof field.value === 'number' ? (
                <Typography component="span" className="department-details-value">
                  {field.value}
                </Typography>
              ) : (
                field.value
              )}
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{ textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DepartmentDetails;
