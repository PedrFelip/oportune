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
import { X } from "lucide-react";

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
        <PopoverTrigger asChild>
          <div className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus-within:border-[#2474e4] focus-within:ring-2 focus-within:ring-[#2474e4]/30 cursor-pointer">
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
              className="border-0 bg-transparent p-0 focus:ring-0 focus:outline-none text-white placeholder:text-white/50"
            />
          </div>
        </PopoverTrigger>
        
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)]">
            {value.map((tag, index) => (
              <Badge 
                key={`${tag}-${index}`}
                className="bg-[#2474e4]/20 hover:bg-[#2474e4]/30 text-white border border-[#2474e4]/40 px-3 py-1 rounded-full flex items-center gap-2 text-sm transition-all"
              >
                {tag}
                <button
                  type="button"
                  className="rounded-full hover:bg-white/20 transition-all p-0.5"
                  onClick={() => removeTag(tag)}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-[#1E293B] border-white/10">
          <Command className="bg-[#1E293B]">
            <CommandInput 
              placeholder="Procure um curso..." 
              className="text-white placeholder:text-white/50"
            />
            <CommandList>
              <CommandEmpty className="text-white/70 py-6 text-center text-sm">
                Nenhum resultado encontrado.
              </CommandEmpty>
              <CommandGroup>
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={`${suggestion.label}-${suggestion.value}`}
                    value={suggestion.label}
                    onSelect={handleSelect}
                    disabled={value.includes(suggestion.value)}
                    className={`text-white ${
                      value.includes(suggestion.value)
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#2474e4]/20 cursor-pointer"
                    }`}
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
