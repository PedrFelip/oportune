"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EditarVagaForm } from "@/features/EditarVaga";
import { editarVaga } from "@/features/Api/editarVaga";
import { useLoading } from "@/contexts/LoadingContext";
import { showMessage } from "@/adapters/showMessage";

type VagaDetalheResponse = {
	id: string;
	titulo: string;
	descricao: string;
	tags: string[];
	requisitos: string[];
	curso: string[];
	semestre: string; // número em string
	prazoInscricao: string; // dd/mm/yyyy
};

function parsePtBrToISO(datePtBr?: string) {
	if (!datePtBr) return "";
	const [d, m, y] = datePtBr.split("/");
	if (!d || !m || !y) return "";
	return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

export default function EditarVagaPage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const { showLoading, hideLoading } = useLoading();

		const [vaga, setVaga] = useState<VagaDetalheResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
				async function fetchVaga() {
			try {
				setLoading(true);
						const res = await fetch(`/api/aluno/buscar-vaga-pelo-id/${id}`);
				if (!res.ok) throw new Error(`Erro ${res.status}`);
						const json = await res.json();
						const dados = (json?.dados ?? null) as VagaDetalheResponse | null;
						if (!dados) throw new Error("Resposta inválida do servidor");
						if (mounted) setVaga(dados);
			} catch (e: any) {
				if (mounted) setError(e.message || "Erro ao carregar vaga");
			} finally {
				if (mounted) setLoading(false);
			}
		}
		if (id) fetchVaga();
		return () => {
			mounted = false;
		};
	}, [id]);

		const vagaFormDefault = useMemo(() => {
			if (!vaga) return undefined;
			const mapTipoToLabel = (t?: string) => {
				if (!t) return "Estágio";
				const up = t.toUpperCase();
				if (up === "ESTAGIO") return "Estágio";
				if (up === "PESQUISA") return "Pesquisa";
				if (up === "EXTENSAO") return "Extensão";
				return "Estágio";
			};
		return {
			titulo: vaga.titulo,
			descricao: vaga.descricao,
					tipo: mapTipoToLabel(vaga.tags?.[0]),
			categorias: vaga.requisitos || [],
			curso: Array.isArray(vaga.curso) ? vaga.curso[0] || "" : "",
			semestre: vaga.semestre || "",
			prazoInscricao: parsePtBrToISO(vaga.prazoInscricao),
		};
	}, [vaga]);

	async function handleSubmit(data: any) {
		showLoading();
		try {
			await editarVaga(id as string, data);
			showMessage.success("Vaga atualizada com sucesso!");
			router.push("/empresa/minhas-vagas");
		} catch (err: any) {
			showMessage.error(err.message || "Erro ao atualizar vaga");
		} finally {
			hideLoading();
		}
	}

	if (loading) return <p className="text-white">Carregando...</p>;
	if (error) return <p className="text-red-400">{error}</p>;
	if (!vagaFormDefault) return null;

	return (
		<EditarVagaForm
			vaga={vagaFormDefault as any}
			onSubmit={handleSubmit}
			onCancel={() => router.back()}
		/>
	);
}
