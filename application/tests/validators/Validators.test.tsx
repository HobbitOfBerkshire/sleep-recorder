import {
  validateDate,
  validateDuration,
  validateGender,
  validateName,
} from '../../src/validators/validators';

describe('validateName function', () => {
  it('returns error message when name is empty', () => {
    expect(validateName('')).toBe('Name is required.');
  });

  it('returns error message when name exceeds 12 characters', () => {
    expect(validateName('VeryLongNameThatExceedsTwelveCharacters')).toBe(
      'Name must be less than or equal to 12 characters.',
    );
  });

  it('returns undefined when name is valid', () => {
    expect(validateName('John')).toBeUndefined();
  });
});

describe('validateGender function', () => {
  it('returns error message when gender is empty', () => {
    expect(validateGender('')).toBe('Gender is required.');
  });

  it('returns undefined when gender is valid', () => {
    expect(validateGender('Male')).toBeUndefined();
  });
});

describe('validateDuration function', () => {
  it('returns error message when duration is not a number', () => {
    expect(validateDuration(NaN)).toBe('Duration must be a positive number.');
  });

  it('returns error message when duration is zero or negative', () => {
    expect(validateDuration(0)).toBe('Duration must be a positive number.');
    expect(validateDuration(-5)).toBe('Duration must be a positive number.');
  });

  it('returns undefined when duration is valid', () => {
    expect(validateDuration(2)).toBeUndefined();
  });
});

describe('validateDate function', () => {
  it('returns error message when date is empty', () => {
    expect(validateDate('')).toBe('Date is required.');
  });

  it('returns error message when date format is invalid', () => {
    expect(validateDate('2024-06-32')).toBe('Invalid date format.');
  });

  it('returns error message when date is in the future', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2024-06-24').getTime());

    expect(validateDate('2030-06-25')).toBe('Date cannot be in the future.');
  });

  it('returns undefined when date is valid', () => {
    expect(validateDate('2024-06-24')).toBeUndefined();
  });
});
