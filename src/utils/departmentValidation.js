/**
 * Validation rules for the department form.
 * Kept separate from UI so rules stay reusable and easy to maintain.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;
const CODE_PATTERN = /^[A-Z0-9-]{2,10}$/;

/**
 * Builds React Hook Form register options for each department field.
 * @returns {Record<string, object>} Validation config keyed by field name
 */
export function getDepartmentValidationRules() {
  return {
    name: {
      required: 'Department name is required',
      minLength: {
        value: 2,
        message: 'Department name must be at least 2 characters',
      },
      maxLength: {
        value: 100,
        message: 'Department name must be 100 characters or less',
      },
    },
    code: {
      required: 'Department code is required',
      pattern: {
        value: CODE_PATTERN,
        message: 'Use 2–10 uppercase letters, numbers, or hyphens',
      },
    },
    description: {
      required: 'Description is required',
      minLength: {
        value: 10,
        message: 'Description must be at least 10 characters',
      },
      maxLength: {
        value: 500,
        message: 'Description must be 500 characters or less',
      },
    },
    headOfDepartment: {
      required: 'Head of department is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: EMAIL_PATTERN,
        message: 'Enter a valid email address',
      },
    },
    phone: {
      required: 'Phone number is required',
      pattern: {
        value: PHONE_PATTERN,
        message: 'Enter a valid phone number',
      },
    },
    location: {
      required: 'Location is required',
      minLength: {
        value: 2,
        message: 'Location must be at least 2 characters',
      },
    },
    status: {
      required: 'Status is required',
    },
    employeeCount: {
      required: 'Employee count is required',
      min: {
        value: 0,
        message: 'Employee count cannot be negative',
      },
      max: {
        value: 100000,
        message: 'Employee count is too large',
      },
      valueAsNumber: true,
    },
    establishedDate: {
      required: 'Established date is required',
    },
  };
}

/**
 * Empty form defaults used when adding a new department.
 */
export const EMPTY_DEPARTMENT_FORM = {
  name: '',
  code: '',
  description: '',
  headOfDepartment: '',
  email: '',
  phone: '',
  location: '',
  status: 'Active',
  employeeCount: 0,
  establishedDate: '',
};
