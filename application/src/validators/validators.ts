export const validateName = (name: string): string | undefined => {
  if (!name.trim()) {
    return 'Name is required.';
  }
  if (name.trim().length > 12) {
    return 'Name must be less than or equal to 12 characters.';
  }
  return undefined;
};

export const validateGender = (gender: string): string | undefined => {
  if (!gender) {
    return 'Gender is required.';
  }
  return undefined;
};

export const validateDuration = (duration: number): string | undefined => {
  if (isNaN(duration) || duration <= 0) {
    return 'Duration must be a positive number.';
  }
  return undefined;
};

export const validateDate = (date: string): string | undefined => {
  if (!date) {
    return 'Date is required.';
  }

  const selectedDate = new Date(date);
  const currentDate = new Date();
  if (isNaN(selectedDate.getTime())) {
    return 'Invalid date format.';
  }
  if (selectedDate > currentDate) {
    return 'Date cannot be in the future.';
  }

  return undefined;
};
