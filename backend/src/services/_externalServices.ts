import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const toolsPython = path.join(__dirname, '../../../tools/python')

const pythoncmd = process.platform === 'win32' ? 'python' : 'python3'

export function runPython(scriptExecute: string, payload: any) {
  const scriptPath = path.join(toolsPython, `${scriptExecute}.py`)

  if (!fs.existsSync(scriptPath)) {
    // Verifica se os scripts existem
    throw new Error('Script não encontrado')
  }

  return new Promise((resolve, reject) => {
    const py = spawn(pythoncmd, [scriptPath])
    let stdout = '' // Buffer do caminho feliz
    let stderr = '' // Buffer dos erros

    const timer = setTimeout(() => {
      py.kill('SIGKILL')
      reject(new Error('Timeout ao executar o script Python'))
    }, 20000)

    py.stdout.on('data', chunk => {
      stdout += chunk.toString() // Acumula o caminho feliz que o Python manda via print
    })

    py.stderr.on('data', err => {
      stderr += err.toString() // Acumula os erros enviados via print
    })

    py.on('close', code => {
      clearTimeout(timer)
      if (code !== 0) {
        return reject(new Error(`Python saiu com erro ${code}. Erro: ${stderr || 'Sem detalhes'}`))
      }
      try {
        resolve(JSON.parse(stdout))
      } catch (e: any) {
        reject('Erro ao parsear a resposta do Python ' + e.message + '\nSaída: ' + stderr)
      }
    })

    py.stdin.write(JSON.stringify(payload) + '\n')
    py.stdin.end()
  })
}
