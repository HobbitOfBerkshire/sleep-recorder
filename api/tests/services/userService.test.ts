import db from '../../src/services';
import {
  addUser,
  createUser,
  getUserByNameAndGender,
} from '../../src/services/userService';

jest.mock('../../src/services/index', () => ({
  prepare: jest.fn(),
}));

const mockDb = db as jest.Mocked<typeof db>;

describe('addUser', () => {
  it('should add a new user successfully', () => {
    const mockName = 'John Doe';
    const mockGender = 'Male';

    const mockStatement = {
      run: jest.fn(),
    };
    mockDb.prepare.mockReturnValue(mockStatement as any);

    addUser(mockName, mockGender);

    expect(mockDb.prepare).toHaveBeenCalledWith(
      'INSERT INTO users (name, gender) VALUES (?, ?)',
    );
    expect(mockStatement.run).toHaveBeenCalledWith(mockName, mockGender);
  });
});

describe('getUserByNameAndGender', () => {
  it('should return user ID if user exists', () => {
    const mockName = 'John Doe';
    const mockGender = 'Male';
    const mockUserId = 1;

    const mockStatement = {
      get: jest.fn().mockReturnValue({ id: mockUserId }),
    };
    mockDb.prepare.mockReturnValue(mockStatement as any);

    const result = getUserByNameAndGender(mockName, mockGender);

    expect(mockDb.prepare).toHaveBeenCalledWith(
      'SELECT id FROM users WHERE LOWER(name) = LOWER(?) AND gender = ?',
    );
    expect(result).toEqual({ id: mockUserId });
  });

  it('should return undefined if user does not exist', () => {
    const mockName = 'Jane Doe';
    const mockGender = 'Female';

    const mockStatement = {
      get: jest.fn().mockReturnValue(undefined),
    };
    mockDb.prepare.mockReturnValue(mockStatement as any);

    const result = getUserByNameAndGender(mockName, mockGender);

    expect(mockDb.prepare).toHaveBeenCalledWith(
      'SELECT id FROM users WHERE LOWER(name) = LOWER(?) AND gender = ?',
    );
    expect(result).toBeUndefined();
  });
});

describe('createUser', () => {
  it('should create a new user and return user ID', () => {
    const mockName = 'John Doe';
    const mockGender = 'Male';
    const mockLastInsertId = 1;

    const mockStatement = {
      run: jest.fn().mockReturnValue({ lastInsertRowid: mockLastInsertId }),
    };
    mockDb.prepare.mockReturnValue(mockStatement as any);

    const result = createUser(mockName, mockGender);

    expect(mockDb.prepare).toHaveBeenCalledWith(
      'INSERT INTO users (name, gender) VALUES (?, ?)',
    );
    expect(mockStatement.run).toHaveBeenCalledWith(mockName, mockGender);
    expect(result).toEqual({ id: mockLastInsertId });
  });
});
