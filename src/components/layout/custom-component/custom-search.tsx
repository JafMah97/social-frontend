"use client";


import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function CustomSearch() {

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup className="bg-background">
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default">Search</InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align={"inline-start"}>
        <Search/>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
