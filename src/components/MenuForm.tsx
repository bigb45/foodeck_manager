import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import FormSection from "./FormSection";
import { Button } from "./ui/button";
import axios, { AxiosResponse } from "axios";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import AddSectionDialog from "./AddSectionDialog";
import { baseUrl } from "@/app/page";

interface Restaurant {
  id: string;
  name: string;
}

const log = console.log;
export default function MenuForm() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const [restaurants, setRestaurants] = useState<Restaurant[]>();

  const [selectedSection, setSelectedSection] = useState<Restaurant>();
  const [sections, setSections] = useState<Restaurant[]>();

  async function getRestaurants() {
    const response: AxiosResponse<
      {
        store_id: string;
        store_name: string;
      }[]
    > = await axios.get(`${baseUrl}/stores/all`);
    const res = response.data.map((store) => {
      return { id: store.store_id, name: store.store_name };
    });
    setRestaurants(res);
    log(res);
  }

  async function getSections() {
    const response: AxiosResponse<
      {
        section_id: string;
        section_title: string;
      }[]
    > = await axios.get(`${baseUrl}/stores/${selectedRestaurant?.id}/menu/all`);
    const res: Restaurant[] = response.data.map((section) => {
      return { id: section.section_id, name: section.section_title };
    });
    setSections(res);
    log(res);
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      restaurant_id: selectedRestaurant?.id || "",
      section_id: selectedSection?.id || "",
    }));
    getSections();
  }, [selectedRestaurant, selectedSection]);

  const [formData, setFormData] = useState({
    restaurant_id: "",
    section_id: "",
    menu_name: "",
    description: "",
    price: 0.0,
    image_url: "",
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(`${baseUrl}/stores/add_menu`, {
      ...formData,
      // @ts-ignore
      price: parseFloat(formData.price),
    });
  };

  const handleSectionSelectionChange = (value: string) => {
    const section = sections?.find((s) => s.id === value);
    setSelectedSection(section);
  };

  const handleRestaurantSelectionChange = (value: string) => {
    const restaurant = restaurants?.find((r) => r.id === value);
    setSelectedRestaurant(restaurant);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <form
        onSubmit={submitForm}
        className="flex flex-col items-center justify-center gap-4 pt-4"
      >
        <Select onValueChange={handleRestaurantSelectionChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={"Select a Restaurant"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Restaurant Name</SelectLabel>
              {restaurants &&
                restaurants.map((restaurant) => {
                  return (
                    <SelectItem value={restaurant.id} key={restaurant.id}>
                      {restaurant.name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={handleSectionSelectionChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={"Select a Section"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Section Name</SelectLabel>
              {sections &&
                sections.map((section) => {
                  return (
                    <SelectItem
                      value={section.id}
                      key={section.id}
                      onSelect={() => setSelectedRestaurant(section)}
                    >
                      {section.name}
                    </SelectItem>
                  );
                })}
              <AddSectionDialog
                onSectionAdd={() => getSections()}
                restaurantId={selectedRestaurant?.id || ""}
                childButton={
                  <Button variant="outline" className="w-full">
                    Add Section
                  </Button>
                }
              />
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-2 gap-4">
          <FormSection
            {...{
              label: "Enter the menu name",
              name: "menu_name",
              value: formData.menu_name,
              handleChange: handleChange,
            }}
          />
          <FormSection
            {...{
              label: "Enter the menu description",
              name: "description",
              value: formData.description,
              handleChange: handleChange,
            }}
          />
          <FormSection
            {...{
              label: "Enter the menu price",
              name: "price",
              value: formData.price,
              handleChange: handleChange,
            }}
          />
          <FormSection
            {...{
              label: "Enter the menu image url",
              name: "image_url",
              value: formData.image_url,
              handleChange: handleChange,
            }}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
