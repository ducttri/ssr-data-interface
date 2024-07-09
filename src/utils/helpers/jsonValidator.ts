import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

export async function jsonValidator(data: JSON, schema: JSONSchemaType<any>) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) console.log(validate.errors);

  return valid;
}
