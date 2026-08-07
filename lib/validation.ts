export interface RegistrationFormErrors {
  name?: string;
  designation?: string;
  eventName?: string;
}

export function validateRegistrationForm(data: {
  name: string;
  designation: string;
  eventName: string;
}): { isValid: boolean; errors: RegistrationFormErrors } {
  const errors: RegistrationFormErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const validRoles = ['Student', 'Faculty', 'Guest'];
  if (!data.designation || !validRoles.includes(data.designation)) {
    errors.designation = 'Please select a role: Student, Faculty, or Guest.';
  }

  if (!data.eventName || data.eventName.trim().length < 2) {
    errors.eventName = 'Please enter the event name.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
