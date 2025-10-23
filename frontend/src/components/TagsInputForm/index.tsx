'use client'

import React, { useState } from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { Plus, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface FormTagInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  className?: string
}

/**
 * 💡 FormTagInput — componente de tags integrado ao RHF
 * - Armazena as tags como array de strings no form;
 * - Permite adicionar/remover;
 * - Suporte total a validação com Zod/RHF;
 * - Padrão visual igual aos outros componentes do sistema.
 */
export function FormTagInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Adicionar item',
  className,
}: FormTagInputProps<T>) {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className={cn('mb-3', className)}>
      {label && (
        <Label className="text-gray-300 mb-2 block" htmlFor={name}>
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const tags: string[] = field.value || []

          const addTag = () => {
            const newTag = inputValue.trim()
            if (newTag && !tags.includes(newTag)) {
              const newTags = [...tags, newTag]
              field.onChange(newTags)
              setInputValue('')
            }
          }

          const removeTag = (tag: string) => {
            const newTags = tags.filter((t) => t !== tag)
            field.onChange(newTags)
          }

          return (
            <>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="random"
                    className="text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 animate-in fade-in"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="relative">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white pr-10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {error?.message && (
                <p className="mt-1 text-xs text-red-400 font-medium">
                  {error.message as string}
                </p>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Pressione Enter ou clique no “+” para adicionar.
              </p>
            </>
          )
        }}
      />
    </div>
  )
}
