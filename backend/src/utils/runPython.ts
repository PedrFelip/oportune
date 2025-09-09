import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const toolsPython = path.join(__dirname, "../../../tools/python");


const pythoncmd = process.platform === "win32" ? "python" : "python3";

/**
 * 
 * @param scriptExecute 
 * @param payload 
 * @returns 
 */
export function runPython(scriptExecute: string, payload: any): Promise<any> {
 
  const scriptPath = path.join(toolsPython, `${scriptExecute}.py`);

 
  if (!fs.existsSync(scriptPath)) {
    
    return Promise.reject(new Error(`Script Python não encontrado em: ${scriptPath}`));
  }

  return new Promise((resolve, reject) => {
   
    const py = spawn(pythoncmd, ["-X", "utf8", scriptPath]);
   

    let stdout = ""; 
    let stderr = ""; 

    
    const timer = setTimeout(() => {
      py.kill("SIGKILL"); 
      reject(new Error("Timeout de 20 segundos excedido ao executar o script Python."));
    }, 20000); 

    
    py.stdout.on("data", (chunk) => {
      stdout += chunk.toString("UTF-8");
    });

    
    py.stderr.on("data", (err) => {
      stderr += err.toString("UTF-8");
    });

    
    py.on("close", (code) => {
      clearTimeout(timer); 

      
      if (code !== 0) {
        return reject(
          new Error(
            `Processo Python saiu com código de erro ${code}. Detalhes: ${stderr || "Nenhum detalhe de erro fornecido."}`
          )
        );
      }

      
      try {
        if (!stdout.trim()) {
          return reject(new Error("O script Python retornou uma resposta vazia."));
        }
        resolve(JSON.parse(stdout));
      } catch (e: any) {
        reject(
          new Error(
            `Erro ao analisar a resposta JSON do Python. Mensagem: ${e.message}. Saída recebida: ${stdout}`
          )
        );
      }
    });

  
    py.stdin.write(JSON.stringify(payload) + "\n");
    py.stdin.end();
  });
}
