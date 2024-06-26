import { gql } from "@apollo/client";
import { useEffect, useRef } from "react";

import {
  FieldError,
  PhoneField as PhoneFieldType,
} from "../../generated/graphql";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "../../hooks/useGravityForm";

export const PHONE_FIELD_FIELDS = gql`
  fragment PhoneFieldFields on PhoneField {
    id
    databaseId
    label
    description
    size
    cssClass
    isRequired
    placeholder
    value
    conditionalLogic {
      actionType
      logicType
      rules {
        fieldId
        operator
        value
      }
    }
  }
`;

interface Props {
  field: PhoneFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE = "";

export default function PhoneField({ field, fieldErrors }: Props) {
  const {
    id,
    databaseId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
  } = field;
  const htmlId = `field_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;
  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.updatePhoneFieldValue,
      fieldValue: {
        id,
        value: fieldRef.current.value,
      },
    });
  }, [fieldRef]);
  return (
    <div
      id={`g${htmlId}`}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <label htmlFor={htmlId}>{label}</label>
      <input
        ref={fieldRef}
        type="tel"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ""}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updatePhoneFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          });
        }}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  );
}
