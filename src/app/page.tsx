"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState, FormEvent, useEffect } from "react";
import FormSection from "@/components/FormSection";
import RestaurantForm from "@/components/RestaurantForm";
import MenuForm from "@/components/MenuForm";
const baseUrl = "http://192.168.1.101:3000";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-12 pt-20 w-fit mb-80">
        <div>
          <h1 className="text-4xl">Add a new restaurant</h1>
          <RestaurantForm />
        </div>

        <div>
          <h1 className="text-4xl text-center">
            Add a New Menu to a restaurant
          </h1>
          <MenuForm />
        </div>
      </div>
    </main>
  );
}

export { Page, baseUrl };
