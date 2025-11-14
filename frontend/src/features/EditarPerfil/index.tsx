"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { CursoType } from "@/features/Cadastro/@types/type";
import { FormSelect } from "@/features/Cadastro/components/FormSelect";
import dados from "@/utils/informacoes.json";
import { FormCalendar } from "@/features/Cadastro/components/FormCalendar";
import { FormTagInput } from "@/components/TagsInputForm";
import { useLayout } from "@/contexts/LayoutContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { showMessage } from "@/adapters/showMessage";
import { editarPerfil } from "../Api/editarPerfil";
import { buscarPerfilAtual } from "../Api/buscarPerfilAtual";
import { User } from "@/models/user";

export interface ProfileEdit {
  nome?: string;
  telefone?: string;
  curso?: CursoType;
  semestre?: number;
  dataFormatura?: string | null;
  habilidadesTecnicas?: string[];
  habilidadesComportamentais?: string[];
  areasInteresse?: string[];
  areaAtuacao?: string[]; // Para professor
  departamento?: string; // Para professor
  titulacao?: string; // Para professor
}

type SemestreOption = {
  value: number;
  label: string;
};

const cardTitleStyle = "text-xl font-bold mb-3 text-white";

export default function EditarPerfilAluno() {
  const { usuario, atualizarUsuario } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { back } = useRouter();
  const { setPageTitle } = useLayout();
  const [isLoadingPerfil, setIsLoadingPerfil] = useState(true);

  useEffect(() => {
    setPageTitle("Editar perfil");
  }, [setPageTitle]);

  const { register, control, watch, setValue, handleSubmit, reset } =
    useForm<ProfileEdit>({
      defaultValues: {
        nome: "",
        telefone: "",
        curso: "" as CursoType,
        semestre: 0,
        dataFormatura: null,
        habilidadesTecnicas: [],
        habilidadesComportamentais: [],
        areasInteresse: [],
      },
    });

  // Carregar dados do perfil ao montar o componente
  useEffect(() => {
    const carregarPerfil = async () => {
      if (!usuario) return;

      try {
        setIsLoadingPerfil(true);
        showLoading();

        const perfilData = await buscarPerfilAtual();
        console.log("Dados do perfil carregados:", perfilData);

        // Atualizar o formulário com os dados carregados
        if (usuario.tipo === "ESTUDANTE" && perfilData) {
          reset({
            nome: perfilData.nome || usuario.nome,
            telefone: perfilData.telefone || "",
            curso: perfilData.cursoValue || (usuario.estudante?.curso as CursoType),
            semestre: perfilData.semestre || 0,
            dataFormatura: perfilData.dataFormatura || null,
            habilidadesTecnicas: perfilData.habilidadesTecnicas || [],
            habilidadesComportamentais: perfilData.habilidadesComportamentais || [],
            areasInteresse: perfilData.areasInteresse || [],
          });
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        showMessage.error("Erro ao carregar dados do perfil");
        
        // Fallback para dados do contexto
        if (usuario.tipo === "ESTUDANTE") {
          reset({
            nome: usuario.nome,
            telefone: usuario.estudante?.telefone ?? "",
            curso: usuario.estudante?.curso as CursoType,
            semestre: usuario.estudante?.semestre ?? 0,
            dataFormatura: usuario.estudante?.dataFormatura ?? null,
            habilidadesTecnicas: usuario.estudante?.habilidadesTecnicas ?? [],
            habilidadesComportamentais: usuario.estudante?.habilidadesComportamentais ?? [],
            areasInteresse: usuario.estudante?.areasInteresse ?? [],
          });
        }
      } finally {
        setIsLoadingPerfil(false);
        hideLoading();
      }
    };

    carregarPerfil();
  }, [usuario, reset, showLoading, hideLoading]);

  const [cursoSemestre, setCursoSemestre] = useState<SemestreOption[]>([]);
  const cursoSelecionadoValue = watch("curso");

  useEffect(() => {
    const cursoSelecionado = dados.cursos.find(
      (c) => c.value === cursoSelecionadoValue
    );

    if (cursoSelecionado && cursoSelecionado.maxSemestres > 0) {
      const semestres = Array.from(
        { length: cursoSelecionado.maxSemestres },
        (_, i) => ({
          value: i + 1,
          label: `${i + 1}º semestre`,
        })
      );

      setCursoSemestre(semestres);
      setValue("semestre", 0);
    } else {
      setCursoSemestre([]);
      setValue("semestre", 0);
    }
  }, [cursoSelecionadoValue, setValue]);

  const onSubmit = async (data: ProfileEdit) => {
    showLoading();

    try {
      if (usuario?.tipo !== "ESTUDANTE") {
        throw new Error(
          "Apenas estudantes podem editar o perfil por enquanto."
        );
      }

      // Preparar payload com todos os campos que foram modificados
      const payload: any = {};
      
      console.log('Dados do formulário:', data);
      
      // Nome
      if (data.nome && data.nome !== usuario.nome) {
        payload.nome = data.nome;
      }
      
      // Telefone
      if (data.telefone !== undefined && data.telefone !== usuario.estudante?.telefone) {
        payload.telefone = data.telefone;
      }
      
      // Curso
      if (data.curso && data.curso !== usuario.estudante?.curso) {
        payload.curso = data.curso;
      }
      
      // Curso e semestre
      if (data.semestre) {
        payload.semestre = Number(data.semestre);
      }

      // Data de formatura (enviar como veio do form)
      if (data.dataFormatura !== undefined) {
        payload.dataFormatura = data.dataFormatura;
      }
      
      // Habilidades e áreas de interesse - sempre enviar para permitir limpar
      if (data.habilidadesTecnicas !== undefined) {
        console.log('Habilidades técnicas do form:', data.habilidadesTecnicas);
        payload.habilidadesTecnicas = data.habilidadesTecnicas;
      }
      
      if (data.habilidadesComportamentais !== undefined) {
        console.log('Habilidades comportamentais do form:', data.habilidadesComportamentais);
        payload.habilidadesComportamentais = data.habilidadesComportamentais;
      }
      
      if (data.areasInteresse !== undefined) {
        console.log('Áreas de interesse do form:', data.areasInteresse);
        payload.areasInteresse = data.areasInteresse;
      }

      console.log('Payload completo a ser enviado:', payload);

      // Verificar se há algo para atualizar
      if (Object.keys(payload).length === 0) {
        showMessage.info("Nenhuma alteração foi feita.");
        hideLoading();
        return;
      }

      const response = await editarPerfil(payload);
      console.log('Resposta do backend:', response);
      
      if (response?.perfil) {
        showMessage.success("Perfil atualizado com sucesso!");
        console.log('Perfil atualizado:', response.perfil);
        
        // Atualizar o contexto de autenticação com os novos dados
        if (usuario) {
          const usuarioAtualizado = {
            ...usuario,
            nome: response.perfil.nome || usuario.nome,
            estudante: {
              ...usuario.estudante,
              telefone: response.perfil.telefone,
              curso: response.perfil.cursoValue,
              semestre: response.perfil.semestre,
              dataFormatura: response.perfil.dataFormatura,
              habilidadesTecnicas: response.perfil.habilidadesTecnicas || [],
              habilidadesComportamentais: response.perfil.habilidadesComportamentais || [],
              areasInteresse: response.perfil.areasInteresse || [],
              faculdade: response.perfil.faculdade,
              fotoPerfil: response.perfil.fotoPerfil,
              dataNascimento: response.perfil.dataNascimento,
              genero: response.perfil.genero,
              matricula: response.perfil.matricula,
              periodo: response.perfil.periodo,
            }
          };
          
          atualizarUsuario(usuarioAtualizado as User);
          console.log('Contexto atualizado com:', usuarioAtualizado);
        }
        
        // Aguardar antes de voltar
        setTimeout(() => {
          back();
        }, 1000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err);
      showMessage.error(err.message || "Erro ao atualizar o perfil.");
    } finally {
      hideLoading();
    }
  };

  if (isLoadingPerfil) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando dados do perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Button variant="ghost_red" onClick={back}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Perfil
            </Button>
            <Button
              type="submit"
              variant="oportune"
              className="flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar Alterações
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ==================== COLUNA ESQUERDA ==================== */}
            <div className="space-y-8">
              {/* 🔹 Informações pessoais */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className={cardTitleStyle}>
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormInput
                    id="nome"
                    label="Nome Completo"
                    {...register("nome")}
                  />
                  <FormInput
                    id="telefone"
                    label="Telefone"
                    mask="(__) _____-____"
                    placeholder="(99) 99999-9999"
                    {...register("telefone")}
                  />
                </CardContent>
              </Card>

              {/* 🔹 Informações acadêmicas (somente estudante) */}
              {usuario?.tipo === "ESTUDANTE" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Informações Acadêmicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <FormSelect
                      name="curso"
                      control={control}
                      label="Curso"
                      options={dados.cursos}
                      placeholder="Selecione seu curso"
                    />
                    <FormSelect
                      control={control}
                      name="semestre"
                      label="Semestre"
                      options={cursoSemestre}
                      placeholder="Selecione o semestre após o curso"
                    />
                    <FormCalendar
                      control={control}
                      name="dataFormatura"
                      label="Previsão de formatura"
                      placeholder="Qual a previsão de sua formatura?"
                      toYear={new Date().getFullYear() + 10}
                    />
                  </CardContent>
                </Card>
              )}

              {usuario?.tipo === "PROFESSOR" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Informações Acadêmicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <FormTagInput
                      label="Área de interesse"
                      placeholder="Adicionar área de interesse"
                      control={control}
                      name="areasInteresse"
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* ==================== COLUNA DIREITA ==================== */}
            <div className="lg:col-span-2 space-y-8">
              {/* 🔹 Habilidades e Interesses */}
              {usuario?.tipo === "ESTUDANTE" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Habilidades e Interesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormTagInput
                      label="Habilidades Técnicas"
                      placeholder="Adicionar habilidade técnica"
                      control={control}
                      name="habilidadesTecnicas"
                    />
                    <FormTagInput
                      label="Habilidades Comportamentais"
                      placeholder="Adicionar habilidade comportamental"
                      control={control}
                      name="habilidadesComportamentais"
                    />
                    <FormTagInput
                      label="Áreas de Interesse"
                      placeholder="Adicionar área de interesse"
                      control={control}
                      name="areasInteresse"
                    />
                  </CardContent>
                </Card>
              )}
              {usuario?.tipo === "PROFESSOR" && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className={cardTitleStyle}>
                      Informações Acadêmicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormInput
                      id="areaAtuacao"
                      label="Área de Atuação"
                      placeholder="Digite sua área de atuação"
                      {...register("areaAtuacao")}
                    />
                    <FormInput
                      id="departamento"
                      label="Departamento"
                      placeholder="Digite seu departamento"
                      {...register("departamento")}
                    />
                    <FormInput
                      id="titulacao"
                      label="Titulação"
                      placeholder="Digite sua titulação"
                      {...register("titulacao")}
                    />
                  </CardContent>
                </Card>
              )}

            </div>
          </div>
        </main>
      </div>
    </form>
  );
}
