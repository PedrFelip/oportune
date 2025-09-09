from extracao import extracao
import aiohttp
import asyncio

async def requisicao(cnpj: str):
    if not cnpj:
        raise ValueError("CNPJ não informado")

    
    cnpj_limpo = "".join(filter(str.isdigit, cnpj))
    rota_completa = f"https://publica.cnpj.ws/cnpj/{cnpj_limpo}"

    

    try:
       
        async with aiohttp.ClientSession() as session:
            
            async with session.get(rota_completa) as response:
                
                response.raise_for_status()
                
                dados: dict = await response.json(encoding='UTF-8')

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