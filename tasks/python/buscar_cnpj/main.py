from requisicao import requisicao
import sys
import asyncio
import json

async def main():
    try:
        cnpj = sys.stdin.readline().strip()

        if not cnpj or not cnpj.isdigit():
            raise ValueError("CNPJ inválido ou não informado!")
        
        result = await requisicao(cnpj)

        response_json = json.dumps(result, ensure_ascii=False, indent=2)

        print(response_json)

    except Exception as e:
        erro_json = json.dumps({"erro": f"Erro no script Python {e}"})
        print(erro_json, file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())