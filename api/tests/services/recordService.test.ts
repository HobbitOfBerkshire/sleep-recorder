import db from '../../src/services';
import {
  createUser,
  getUserByNameAndGender,
} from '../../src/services/userService';
import { addRecord, getAllRecords } from '../../src/services/recordsService';
import { Record } from '../../src/types';

jest.mock('../../src/services/index', () => ({
  prepare: jest.fn(),
}));

jest.mock('../../src/services/userService', () => ({
  createUser: jest.fn(),
  getUserByNameAndGender: jest.fn(),
}));

const mockDb = db as jest.Mocked<typeof db>;
const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>;
const mockGetUserByNameAndGender =
  getUserByNameAndGender as jest.MockedFunction<typeof getUserByNameAndGender>;

describe('getAllRecords', () => {
  it('should fetch all records successfully', () => {
    const mockRecords: Record[] = [
      {
        id: 1,
        duration: 8,
        date: '2024-06-12',
        name: 'John Doe',
        gender: 'Male',
      },
      {
        id: 2,
        duration: 7,
        date: '2024-06-12',
        name: 'Jane Smith',
        gender: 'Female',
      },
    ];

    const mockStatement = {
      all: jest.fn().mockReturnValue(mockRecords),
    };

    mockDb.prepare.mockReturnValue(mockStatement as any);

    const records = getAllRecords();

    expect(records).toEqual(mockRecords);
    expect(mockDb.prepare).toHaveBeenCalledWith(expect.any(String));
  });
});

describe('addRecord', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new record successfully', () => {
    const mockName = 'John Doe';
    const mockGender = 'Male';
    const mockDuration = 8;
    const mockDate = '2024-06-30';
    const mockUserId = 1;

    mockGetUserByNameAndGender.mockReturnValue({ id: mockUserId });

    const mockStatement = {
      run: jest.fn(),
    };
    mockDb.prepare.mockReturnValue(mockStatement as any);

    addRecord(mockName, mockGender, mockDuration, mockDate);

    expect(mockGetUserByNameAndGender).toHaveBeenCalledWith(
      mockName,
      mockGender,
    );
    expect(mockStatement.run).toHaveBeenCalledWith(
      mockUserId,
      mockDuration,
      expect.any(String),
    );
  });

  it('should create a new user and add a record', () => {
    const mockName = 'Jane Smith';
    const mockGender = 'Female';
    const mockDuration = 7;
    const mockDate = '2024-06-30';
    const mockUser = { id: 2 };

    mockGetUserByNameAndGender.mockReturnValue(undefined);
    mockCreateUser.mockReturnValue(mockUser);

    addRecord(mockName, mockGender, mockDuration, mockDate);

    expect(mockGetUserByNameAndGender).toHaveBeenCalledWith(
      mockName,
      mockGender,
    );
    expect(mockCreateUser).toHaveBeenCalledWith(mockName, mockGender);
  });
});
