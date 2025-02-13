import React from "react";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";

export const SelectInput = ({ label, options, value, onChange }: any) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option: string, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
);

export const TextInput = ({ label, value, onChange, type = "text" }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} value={value} onChange={handleChange} />
    </Form.Group>
  );
};

export const DateSelect = ({ label, value, onChange }: any) => (
  <Form.Group className="mb-3">
    <Form.Label >{label}</Form.Label>
    <Form.Control
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </Form.Group>
);

export const getCurrentDateTime = () => dayjs().format("YYYY-MM-DDTHH:mm:ss");
