import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { baseUrl } from "@/app/page";
const log = console.log;
export default function AddSectionDialog({
  onSectionAdd,
  childButton,
  restaurantId,
}: {
  onSectionAdd: () => void;
  childButton: React.ReactNode;
  restaurantId: string;
}) {
  const [sectionName, setSectionName] = useState("");
  const handleSubmit = async () => {
    await axios.post(`${baseUrl}/stores/add_section`, {
      store_id: restaurantId,
      section_title: sectionName,
    });
    onSectionAdd();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{childButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new section</DialogTitle>
          <DialogDescription>
            Add a new section to your menu. Sections are used to group your menu
            items.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Section Name
            </Label>
            <Input
              id="name"
              defaultValue="Burgers"
              className="col-span-3"
              onChange={(e) => setSectionName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
