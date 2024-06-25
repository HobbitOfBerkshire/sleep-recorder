import supertest from 'supertest';
import app from '../../src';
import { addRecord, getAllRecords } from '../../src/services/recordsService';

jest.mock('../../src/services/recordsService', () => ({
  getAllRecords: jest.fn(),
  addRecord: jest.fn(),
}));

describe('GET /api/records', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch records successfully', async () => {
    const mockRecords = [
      { id: 1, name: 'John Doe', duration: 7, timestamp: 1625136000 },
      { id: 2, name: 'Jane Smith', duration: 6, timestamp: 1625222400 },
    ];

    (getAllRecords as jest.Mock).mockReturnValue(mockRecords);

    const response = await supertest(app).get('/api/records').expect(200);

    expect(response.body).toEqual(mockRecords);
  });

  it('should handle error when fetching records', async () => {
    const errorMessage = 'Database connection error';

    (getAllRecords as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const response = await supertest(app).get('/api/records').expect(500);

    expect(response.body.error).toBe('Failed to fetch records');
  });
});

describe('POST /api/records', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new record', async () => {
    const recordData = {
      name: 'John Doe',
      gender: 'Male',
      duration: 8,
      date: '2024-06-30',
    };

    const response = await supertest(app)
      .post('/api/records')
      .send(recordData)
      .expect(201);

    expect(addRecord).toHaveBeenCalledWith('John Doe', 'Male', 8, '2024-06-30');
    expect(response.body.message).toBe('Record added successfully');
  });

  it('should handle validation errors', async () => {
    const invalidRecordData = {
      name: 'John Doe',
      gender: 'Male',
      duration: 'invalid',
      date: '2024-06-30',
    };

    const response = await supertest(app)
      .post('/api/records')
      .send(invalidRecordData)
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(addRecord).not.toHaveBeenCalled();
  });

  it('should handle database error', async () => {
    const recordData = {
      name: 'John Doe',
      gender: 'Male',
      duration: 8,
      date: '2024-06-30',
    };

    (addRecord as jest.Mock).mockImplementation(() => {
      throw new Error('Database connection error');
    });

    const response = await supertest(app)
      .post('/api/records')
      .send(recordData)
      .expect(500);

    expect(response.body.message).toBe(
      'Failed to add record. Please try again.',
    );
  });
});
