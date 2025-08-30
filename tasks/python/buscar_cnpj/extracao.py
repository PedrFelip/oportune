from setores import setores_cnae

def extracao(dados: dict):
    estabelecimento: dict = dados.get("estabelecimento", {})

    if (estabelecimento == {}):
        raise Exception("Campo estabelecimento não encontrado")

    nome_empresa = dados.get("razao_social", "Nome não encontrado")
    nome_fantasia = estabelecimento.get("nome_fantasia", "")
    
    if (nome_fantasia == ''):
        nome_fantasia = nome_empresa

    tipo_logradouro = estabelecimento.get('tipo_logradouro', "")
    logradouro = estabelecimento.get("logradouro", "")
    numero = estabelecimento.get("numero", "S/N")
    bairro = estabelecimento.get("bairro", "")
    complemento = estabelecimento.get("complemento", "")
    cidade_obj: dict = estabelecimento.get("cidade", {})
    cidade = cidade_obj.get("nome", '')
    estado_obj: dict = estabelecimento.get("estado", {})
    estado = estado_obj.get("sigla", '')
    cep = estabelecimento.get("cep", "")

    if (estabelecimento.get("ddd1") and estabelecimento.get("telefone1")):
        numero_tel: str = estabelecimento.get("telefone1")
        numero_tel = numero_tel[:4] + "-" + numero_tel[4:]
        telefone = f"({estabelecimento.get("ddd1")}) - {numero_tel}"
    else:
        telefone = None

    partes = [
        f"{tipo_logradouro} {logradouro}, {numero}",
        complemento,
        bairro,
        f"{cidade} - {estado}",
        f"CEP: {cep}"
    ]
    endereco_completo = ", ".join(filter(None, [partes[0], partes[1]])) # Junta endereço e complemento
    endereco_completo += " - " + ", ".join(filter(None, [partes[2], partes[3]])) # Junta bairro e cidade/estado
    endereco_completo += ", " + partes[4] # Adiciona o CEP

    atividade_principal: dict = estabelecimento.get("atividade_principal", {})

    ramo = atividade_principal.get("descricao", '')
        
    codigo_setor = atividade_principal.get("secao", '')

    setor_empresa = setores_cnae.get(codigo_setor, "Setor não encontrado")

    infos = {
        "nome_empresa": nome_empresa,
        "nome_fantasia": nome_fantasia,
        "endereco": endereco_completo,
        "ramo": ramo,
        "setor": setor_empresa,
        "telefone": telefone
    }

    return infos