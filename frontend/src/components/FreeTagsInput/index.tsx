"use client";

import React, { useState, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface FreeTagsInputProps {
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function FreeTagsInput({
  value = [],
  onChange,
  placeholder = "Digite e pressione Enter ou clique em +",
}: FreeTagsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const addTag = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      onChange([...value, trimmedValue]);
      setInputValue("");
      inputRef.current?.focus();
    }
  }, [inputValue, value, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag();
      } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
        e.preventDefault();
        const newTags = [...value];
        newTags.pop();
        onChange(newTags);
      }
    },
    [inputValue, value, onChange, addTag]
  );

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
          />
        </div>
        <Button
          type="button"
          onClick={addTag}
          disabled={!inputValue.trim()}
          className="bg-[#2474e4] hover:bg-[#1a5bb8] text-white rounded-lg px-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      
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
    </div>
  );
}
