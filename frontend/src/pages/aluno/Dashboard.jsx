import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  Briefcase,
  FileText,
  Settings,
  User,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Oportunidades Recomendadas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-4 transition-transform duration-200 transform bg-white rounded-lg shadow hover:scale-105">
                    <div>
                      <h3 className="font-semibold">
                        Desenvolvedor Front-end Jr.
                      </h3>
                      <p className="text-sm text-gray-600">Empresa X</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </li>
                  <li className="flex items-center justify-between p-4 transition-transform duration-200 transform bg-white rounded-lg shadow hover:scale-105">
                    <div>
                      <h3 className="font-semibold">
                        Bolsista de Iniciação Científica
                      </h3>
                      <p className="text-sm text-gray-600">
                        Laboratório de IA - Prof. Silva
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Status das Candidaturas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h3 className="font-semibold">Analista de Dados</h3>
                      <p className="text-sm text-gray-600">Empresa Y</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                      Pendente
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <h3 className="font-semibold">
                        Estágio em Marketing Digital
                      </h3>
                      <p className="text-sm text-gray-600">Agência Z</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                      Aprovado
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                <Button className="justify-start">
                  <User className="w-5 h-5 mr-2" />
                  Editar Perfil
                </Button>
                <Button className="justify-start">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Ver Vagas
                </Button>
                <Button className="justify-start">
                  <FileText className="w-5 h-5 mr-2" />
                  Meus Documentos
                </Button>
                <Button className="justify-start">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurações
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
