"use client";

import React, { useState, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";

interface Suggestion {
  value: string;
  label: string;
  maxSemestres?: number;
}

interface AutocompleteTagsInputProps {
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  suggestions?: Suggestion[];
}

export function TagsInput({
  value = [],
  onChange,
  placeholder,
  suggestions = [],
}: AutocompleteTagsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = useCallback(
    (selectedValue: string) => {
      setInputValue("");
      if (selectedValue && !value.includes(selectedValue)) {
        onChange([...value, selectedValue]);
      }
      setOpen(false);
    },
    [value, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
        e.preventDefault();
        const newTags = [...value];
        newTags.pop();
        onChange(newTags);
      }
    },
    [inputValue, value, onChange]
  );

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex flex-wrap gap-2 rounded-md p-2 items-center">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
              <button
                type="button"
                className="ml-2 rounded-full outline-none hover:bg-destructive/50"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </Badge>
          ))}
          <PopoverTrigger asChild>
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (!open) setOpen(true);
              }}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
            />
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Procure uma tag..." />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              <CommandGroup>
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={`${suggestion.label}-${suggestion.value}`}
                    value={suggestion.label}
                    onSelect={handleSelect}
                    disabled={value.includes(suggestion.value)}
                    className={
                      value.includes(suggestion.value)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  >
                    {suggestion.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
