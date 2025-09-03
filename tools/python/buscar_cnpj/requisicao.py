from extracao import extracao
import aiohttp
import asyncio

async def requisicao(cnpj: str):
    if not cnpj:
        raise ValueError("CNPJ não informado")

    # Formata o CNPJ para remover caracteres não numéricos, se necessário
    cnpj_limpo = "".join(filter(str.isdigit, cnpj))
    rota_completa = f"https://publica.cnpj.ws/cnpj/{cnpj_limpo}"

    # print(f"Consultando CNPJ: {cnpj_limpo}...")

    try:
        # Usa um gerenciador de contexto para a sessão, garantindo que ela seja fechada
        async with aiohttp.ClientSession() as session:
            # A palavra-chave 'await' pausa a execução desta função até a resposta chegar,
            # permitindo que o loop de eventos do asyncio execute outras tarefas.
            async with session.get(rota_completa) as response:
                # Levanta um erro para respostas com status HTTP 4xx ou 5xx
                response.raise_for_status()
                
                dados: dict = await response.json()

                info = extracao(dados)

                return info

    except aiohttp.ClientResponseError as http_err:
        print(f"Erro HTTP ocorreu: {http_err} - Status: {http_err.status}")
        try:
            error_body = await http_err.request_info.real_url.text()
            print(f"Corpo da resposta: {error_body}")
        except Exception:
            pass
    except Exception as e:
        print(f"Ocorreu um erro inesperado: {e}")