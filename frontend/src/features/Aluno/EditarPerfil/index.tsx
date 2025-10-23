"use client";

import { useState } from "react";
import { ArrowLeft, Save, Upload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FormInput from "@/components/FormInput"; // 👈 Usa seu componente existente

export default function EditarPerfilAluno() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Main */}
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Button
              variant="ghost"
              className="flex items-center text-blue-400 hover:text-blue-300 font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Perfil
            </Button>
            <h2 className="text-3xl font-bold mt-2">Editar Perfil</h2>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20">
            <Save className="w-5 h-5 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormInput
                  id="nome"
                  name="nome"
                  label="Nome Completo"
                  value="Pedro Felipe"
                />
                <FormInput
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value="pedro.felipe@email.com"
                />
                <FormInput
                  id="telefone"
                  name="telefone"
                  label="Telefone"
                  mask="(__) _____-____"
                  value="(81) 99999-8888"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Informações Acadêmicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormInput
                  id="curso"
                  name="curso"
                  label="Curso"
                  value="Engenharia de Software"
                />
                <FormInput
                  id="semestre"
                  name="semestre"
                  label="Semestre"
                  type="number"
                  value="5"
                />
                <FormInput
                  id="formatura"
                  name="formatura"
                  label="Previsão de Formatura"
                  type="date"
                  value="2027-12-20"
                />
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Habilidades e Interesses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TagInput
                  label="Habilidades Técnicas"
                  placeholder="Adicionar habilidade técnica"
                  initialTags={["React", "Node.js", "Python", "SQL"]}
                />
                <TagInput
                  label="Áreas de Interesse"
                  placeholder="Adicionar área de interesse"
                  initialTags={[
                    "Desenvolvimento Web",
                    "Inteligência Artificial",
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormInput
                  id="portfolio"
                  name="portfolio"
                  label="Link do Portfólio"
                  type="url"
                  placeholder="https://github.com/seu-usuario"
                />

                <div>
                  <Label className="block mb-2 text-sm font-medium text-[#c4d3e6]">
                    Currículo (PDF)
                  </Label>
                  <label
                    htmlFor="curriculo"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 transition-colors"
                  >
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Clique para enviar</span>{" "}
                      ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                    <input id="curriculo" type="file" className="hidden" />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---- Componente TagInput ---- */

function TagInput({
  label,
  placeholder,
  initialTags = [],
}: {
  label: string;
  placeholder: string;
  initialTags?: string[];
}) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <Label className="text-gray-300 mb-2 block">{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-500/20 text-blue-200 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 animate-in fade-in"
          >
            {tag}
            <button onClick={() => removeTag(tag)}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white pr-10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
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
      <p className="text-xs text-gray-500 mt-1">
        Pressione Enter ou clique no “+” para adicionar.
      </p>
    </div>
  );
}
