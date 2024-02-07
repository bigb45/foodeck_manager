"use client";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import FormSection from "./FormSection";
import { Button } from "./ui/button";
import { baseUrl } from "@/app/page";

export default function RestaurantForm() {
  const initialState = {
    store_name: "",
    address: "",
    delivery_time: 0,
    phone: "",
    cover_image_url: "",
    rating: 0.0,
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    store_name: "",
    address: "",
    delivery_time: 0,
    phone: "",
    cover_image_url: "",
    rating: 0.0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/stores/add_store`, {
        ...formData,
        // @ts-ignore
        delivery_time: parseInt(formData.delivery_time),
        // @ts-ignore
        rating: parseFloat(formData.rating),
      });
      setFormData(initialState);

      if (!response.status) {
        throw new Error("Failed to submit the data. Please try again.");
      }
    } catch (error) {
      // Capture the error message to display to the user
      setError((error as Error).message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-4 pt-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormSection
            {...{
              label: "Enter the restaurant name",
              name: "store_name",
              value: formData.store_name,
              handleChange: handleChange,
            }}
          />
          <FormSection
            {...{
              label: "Enter the restaurant address",
              name: "address",
              value: formData.address,
              handleChange: handleChange,
            }}
          />
          <FormSection
            {...{
              label: "Enter the restaurant phone number",
              name: "phone",
              value: formData.phone,
              handleChange: handleChange,
            }}
          />
          <FormSection
            {...{
              label: "Enter the delivery time",
              name: "delivery_time",
              value: formData.delivery_time,
              handleChange: handleChange,
            }}
          />
          <FormSection
            {...{
              label: "Enter the restaurant image url",
              name: "cover_image_url",
              value: formData.cover_image_url,
              handleChange: handleChange,
            }}
          />
          <FormSection
            {...{
              label: "Enter the restaurant rating",
              name: "rating",
              value: formData.rating,
              handleChange: handleChange,
            }}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}
