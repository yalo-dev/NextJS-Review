import { gql } from "@apollo/client";
import { GfForm } from "../generated/graphql";

import { client } from "../app/lib/apollo";
import { CHECKBOX_FIELD_FIELDS } from "../components/GravityFormsFields/CheckboxField";
import { EMAIL_FIELD_FIELDS } from "../components/GravityFormsFields/EmailField";
import { HIDDEN_FIELD_FIELDS } from "../components/GravityFormsFields/HiddenField";
import { PHONE_FIELD_FIELDS } from "../components/GravityFormsFields/PhoneField";
import { RADIO_FIELD_FIELDS } from "../components/GravityFormsFields/RadioField";
import { SELECT_FIELD_FIELDS } from "../components/GravityFormsFields/SelectField";
import { TEXTAREA_FIELD_FIELDS } from "../components/GravityFormsFields/TextAreaField";
import { TEXT_FIELD_FIELDS } from "../components/GravityFormsFields/TextField";

const GET_FORM = gql`
  query getForm($formId: ID!) {
    gfForm(id: $formId, idType: DATABASE_ID) {
      formId
      title
      description
      submitButton {
        text
      }
      confirmations {
        isDefault
        message
      }
      formFields(first: 50) {
        nodes {
          id
          type
          ... on CheckboxField {
            ...CheckboxFieldFields
          }
          ... on EmailField {
            ...EmailFieldFields
          }
          ... on PhoneField {
            ...PhoneFieldFields
          }
          ... on RadioField {
            ...RadioFieldFields
          }
          ... on TextField {
            ...TextFieldFields
          }
          ... on TextAreaField {
            ...TextAreaFieldFields
          }
          ... on SelectField {
            ...SelectFieldFields
          }
          ... on HiddenField {
            ...HiddenFieldFields
          }
        }
      }
    }
  }
  ${CHECKBOX_FIELD_FIELDS}
  ${EMAIL_FIELD_FIELDS}
  ${PHONE_FIELD_FIELDS}
  ${RADIO_FIELD_FIELDS}
  ${TEXT_FIELD_FIELDS}
  ${SELECT_FIELD_FIELDS}
  ${HIDDEN_FIELD_FIELDS}
  ${TEXTAREA_FIELD_FIELDS}
`;

export default async function getGravityForm(
  formId: number,
): Promise<GfForm | undefined> {
  const result = await client.query({
    query: GET_FORM,
    variables: { formId },
  });

  return result?.data?.gfForm; // Changed 'gravityFormsForm' to 'gfForm' to match the query
}
