import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  EMPTY_DEPARTMENT_FORM,
  getDepartmentValidationRules,
} from '../../utils/departmentValidation';

/**
 * Add/Edit department dialog powered by React Hook Form.
 */
function DepartmentForm({ open, mode = 'add', initialValues, onClose, onSubmit }) {
  const rules = getDepartmentValidationRules();
  const isEdit = mode === 'edit';

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EMPTY_DEPARTMENT_FORM,
  });

  // Populate (or clear) fields whenever the dialog opens
  useEffect(() => {
    if (!open) {
      return;
    }

    reset(initialValues || EMPTY_DEPARTMENT_FORM);
  }, [open, initialValues, reset]);

  /**
   * Validates via RHF, then hands clean data to the parent CRUD handler.
   */
  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset(EMPTY_DEPARTMENT_FORM);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogTitle>{isEdit ? 'Edit Department' : 'Add Department'}</DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Department Name"
                fullWidth
                {...register('name', rules.name)}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Department Code"
                fullWidth
                slotProps={{
                  htmlInput: { style: { textTransform: 'uppercase' } },
                }}
                {...register('code', rules.code)}
                error={Boolean(errors.code)}
                helperText={errors.code?.message}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={3}
                {...register('description', rules.description)}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Head of Department"
                fullWidth
                {...register('headOfDepartment', rules.headOfDepartment)}
                error={Boolean(errors.headOfDepartment)}
                helperText={errors.headOfDepartment?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register('email', rules.email)}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Phone"
                fullWidth
                {...register('phone', rules.phone)}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Location"
                fullWidth
                {...register('location', rules.location)}
                error={Boolean(errors.location)}
                helperText={errors.location?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="status"
                control={control}
                rules={rules.status}
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.status)}>
                    <InputLabel id="department-status-label">Status</InputLabel>
                    <Select
                      {...field}
                      labelId="department-status-label"
                      label="Status"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    {errors.status ? (
                      <FormHelperText>{errors.status.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Employee Count"
                type="number"
                fullWidth
                slotProps={{ htmlInput: { min: 0 } }}
                {...register('employeeCount', rules.employeeCount)}
                error={Boolean(errors.employeeCount)}
                helperText={errors.employeeCount?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Established Date"
                type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('establishedDate', rules.establishedDate)}
                error={Boolean(errors.establishedDate)}
                helperText={errors.establishedDate?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {isEdit ? 'Update Department' : 'Save Department'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DepartmentForm;
