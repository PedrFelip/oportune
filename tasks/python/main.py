import aiohttp
import asyncio
import requests

async def requisicao(cnpj: str):
    if (cnpj is None):
        raise ValueError("CNPJ não informado")
    
    rota_completa = f"https://publica.cnpj.ws/cnpj/{cnpj}"

    try:
        # async with aiohttp.ClientSession() as session:
        #     async with session.get(rota_completa) as response:
        #         dados = await response.json()

        response = requests.get(rota_completa, headers={"Accept":"*/*"})

        data = response.json()

        print(data)
    except Exception as e:
        print(e)

asyncio.run(requisicao("725812833000113"))