import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

const HEADERS = [
  'Code',
  'Department',
  'Head',
  'Email',
  'Location',
  'Employees',
  'Status',
  'Actions',
];

/**
 * Professional department listing table with pagination and row actions.
 */
function DepartmentTable({
  departments,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onEdit,
  onDelete,
}) {
  const hasRows = departments.length > 0;

  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <TableContainer className="department-table-wrapper">
        <Table aria-label="Departments table" size="medium">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              {HEADERS.map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: 700, whiteSpace: 'nowrap', color: 'text.secondary' }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {!hasRows ? (
              <TableRow>
                <TableCell colSpan={HEADERS.length}>
                  <Box className="department-empty-state">
                    <InboxOutlinedIcon sx={{ fontSize: 42, color: 'text.disabled', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                      No departments found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search or filters, or add a new department.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              departments.map((department) => (
                <TableRow
                  key={department.id}
                  hover
                  sx={{ '&:last-child td': { borderBottom: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {department.code}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {department.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{department.headOfDepartment}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>{department.email}</TableCell>
                  <TableCell>{department.location}</TableCell>
                  <TableCell align="center">{department.employeeCount}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={department.status}
                      color={department.status === 'Active' ? 'success' : 'default'}
                      variant={department.status === 'Active' ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="View">
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label={`View ${department.name}`}
                          onClick={() => onView(department)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="info"
                          aria-label={`Edit ${department.name}`}
                          onClick={() => onEdit(department)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          aria-label={`Delete ${department.name}`}
                          onClick={() => onDelete(department)}
                        >
                          <DeleteOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows"
      />
    </Paper>
  );
}

export default DepartmentTable;
