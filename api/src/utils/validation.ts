import Ajv from 'ajv';

const ajv = new Ajv();

export const validateAgainstSchema = (data: any, schema: any): boolean => {
  const validate = ajv.compile(schema);
  return validate(data);
};
