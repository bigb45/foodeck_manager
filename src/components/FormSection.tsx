import React, { ComponentProps } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function FormSection(props: {
  label: string;
  name: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label>{props.label}</Label>
      <Input
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}
