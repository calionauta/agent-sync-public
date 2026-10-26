# Estrutura do Relatório — Mapa seção por seção

Este arquivo mapeia CADA SEÇÃO dos templates HTML para a referência que a governa.
Antes de preencher qualquer seção, leia a referência indicada na coluna "Governado por".

Preços sempre vêm de `references/config.yaml`. Se um preço for `null`, pergunte à Cali.

---

## Conversa Gratuita → `assets/report-gratuito.html`

| # | Seção no template | Marcadores `[[ ]]` | Governado por | Limites |
|---|-------------------|---------------------|---------------|---------|
| 1 | **Capa** | `TITULO_CURTO`, `NOME_DO_CLIENTE_OU_EMPRESA`, `DATA` | Extraído do transcript (SKILL.md Passo 1) + label/selo do config.yaml | — |
| 2 | **O que eu ouvi** | `RESUMO_DA_DOR_EM_2_A_4_FRASES` | Extraído do transcript (SKILL.md Passo 1). Incluir 1 citação literal se houver boa fala. | 2–4 frases |
| 3 | **Ganho rápido** (REPETÍVEL: win) | `DOR_ATUAL_EM_UMA_FRASE`, `SOLUÇÃO_SIMPLES`, `FERRAMENTA_QUE_ELE_JÁ_TEM_OU_PEGA_GRÁTIS`, `PRIMEIRO_PASSO_CONCRETO_EM_1_2_LINHAS` | `references/ferramentas.md` (árvore de decisão). Primeiro passo DEVE ser concreto, executável hoje/esta semana. | 1–2 itens |
| 4 | **Por onde começar** | `O_PRIMEIRISSIMO_PASSO_EM_1_A_3_LINHAS` | Derivado do ganho rápido de maior impacto + menor atrito. | 1–3 linhas |
| 5 | **Convite aos serviços** (bloco .invite) | `PRECO_DIAGNOSTICO` e `PRECO_CONCIERGE` (via config.yaml) | SKILL.md Passo 6 + `references/config.yaml`. Listar os 3 serviços pagos com tom de convite, não pressão. | 3 opções, formato ≤10 linhas |
| 6 | **Assinatura** | — | Fixo: "Com cuidado, Cali · Florianópolis, SC · Sommelier de IA" | Fixo |

### Diagrama de fluxo (gratuito)

```
Transcript → Passo 1 (extrair dores, frequência, quotes)
         → Passo 2 (árvore de ferramentas → 1-2 ganhos)
         → Passo 5 (montar: capa > ouvi > ganhos > começar > convite)
         → Upsell para 3 serviços pagos (Passo 6 + config.yaml)
```

---

## Diagnóstico Sommelier → `assets/report-completo.html`

| # | Seção no template | Marcadores `[[ ]]` | Governado por | Limites |
|---|-------------------|--------------------|---------------|---------|
| 1 | **Capa** | `TITULO_CURTO_DO_DIAGNOSTICO`, `NOME_DO_CLIENTE_OU_EMPRESA`, `DATA`, `TIPO_DE_NEGOCIO`, `FOCO_PRINCIPAL` | Extraído do transcript (SKILL.md Passo 1) + label/selo do config.yaml | — |
| 2 | **Resumo Executivo** | `DOR_PRINCIPAL_EM_2_A_4_FRASES`, `RESULTADO_ESPERADO_EM_2_A_4_FRASES`, `FAIXA_HORAS_ex_4–7 h`, `OPORTUNIDADES_1_LINHA` | Extraído do transcript (Passo 1). `OPORTUNIDADES_1_LINHA`: resuma quantas oportunidades identificou e onde estão destacadas ("Identifiquei 5 oportunidades de ganho de tempo — as 3 de maior impacto estão na matriz abaixo."). Horas: `references/calculo-roi.md`. Incluir 1 citação literal que capture a dor central. | — |
| 3 | **Matriz Impacto × Esforço** | (4 quadrantes com itens concretos do transcript) | `references/matriz-impacto-esforco.md`. Cada quadrante leva exemplos reais, não apenas o label estático. | 2–4 itens por quadrante (pode ser menos se não houver) |
| 4 | **Ganhos Rápidos** (REPETÍVEL: qwrow) | `DOR_ATUAL`, `SOLUÇÃO_SIMPLES`, `FERRAMENTA` | `references/ferramentas.md` + `references/matriz-impacto-esforco.md`. Os itens DEVEM ser os mesmos do quadrante "Ganhos rápidos" da matriz. | 3–6 itens |
| 5 | **Bônus: Processo e Cultura** (bloco opcional) | `CONTEXTO`, `TIPO_EXPERIMENTO`, `DESCRICAO_DO_EXPERIMENTO`, `PERGUNTA_GUIA`, `CITACAO` | `references/bonus-processo.md`. Obrigatório estar presente, mas a profundidade varia conforme o sinal no transcript. Incluir 1 citação literal se sinal forte. | Máx. 1 bloco |
| 6 | **Ferramentas Recomendadas** (REPETÍVEL: tool) | `NOME_DA_FERRAMENTA`, `PARA_QUE_SERVE_NO_CASO_DELE_1_FRASE`, `CUSTO_ou_Grátis`, `ESFORÇO_ex_baixo`, `FAIXA_HORAS_ex_2–3 h/sem`, `DICA_RAPIDA` | `references/ferramentas.md` (avaliação estocástico/determinístico + níveis 1-5 + dica rápida por nível) + `references/tool-caveats.md` (restrições). Custo: `references/config.yaml` + WebSearch. Horas: `references/calculo-roi.md`. | 3–7 cards |
| 7 | **Plano de 4 Dias** | `O_QUE_FAZER`, `FERRAMENTA` | `references/metodologia.md` (sequenciamento: setup → testar → refinar → revisar). Cada dia = uma ferramenta ou um ganho rápido. | 4 dias fixos |
| 8 | **O Que Vem Depois** (REPETÍVEL: after) | `MOVIMENTO_MAIOR`, `FERRAMENTA_OU_ABORDAGEM` | `references/matriz-impacto-esforco.md` (quadrante "Projetos maiores"). Os itens DEVEM ser os mesmos. | 2–3 itens |
| 9 | **Impacto Financeiro** | `FAIXA_ROI_ex_R$ 1.500–3.000`, `FAIXA_HORAS_ex_4–7 h`, `FAIXA_CUSTO_ex_R$ 0–200` | `references/calculo-roi.md`. Tudo em faixas. ROI líquido = economia − custo ferramentas. Incluir nota de fator de adoção. | 3 cards fixos |
| 10 | **Value Recap** | `ESTIMATIVA_HORAS_PESQUISA`, `FAIXA_HORAS_ex_4–7 h/sem`, `FAIXA_ROI_ex_R$ 1.500–3.000/mês` | Extraído das seções anteriores (Impacto Financeiro). `ESTIMATIVA_HORAS_PESQUISA`: faixa conservadora de quanto tempo o cliente economizou ao não precisar pesquisar por conta própria (ex.: "4–8"). Todos em faixas, SEMPRE. | 3 cards fixos |
| 11 | **Próximos Passos + Convite** | `PASSO_1_TITULO`, `PASSO_1_DESC`, etc.; `OPCIONAL_PRECO_CONCIERGE` | SKILL.md Passo 6 + `references/config.yaml`. Preço do Concierge: ler do YAML. Se null, perguntar à Cali. | 3 passos fixos + 1 box do Concierge |
| 12 | **Assinatura** | — | Fixo: "Com cuidado, Cali · Florianópolis, SC · Sommelier de IA" | Fixo |

### Diagrama de fluxo (completo)

```
Transcript → Passo 1 (extrair dores, frequência, quotes, capacidade técnica)
         → Passo 2 (árvore de ferramentas → N soluções)
         → Passo 2.5 (avaliar sinal de processo/cultura → bônus)
         → Passo 3 (lacunas: perguntar ou assumir)
         → Passo 4 (pesquisar preços, validar ROI, buscar valor hora)
         → Passo 5 (montar: capa > resumo > matriz > ganhos > bônus > ferramentas >
                     plano > depois > financeiro > passos > assinatura)
         → Passo 6 (upsell honesto)
```

---

## Regras de preenchimento (ambos os tipos)

1. **Cada seção deve ter conteúdo EXTRAÍDO do transcript.** Se uma seção não tiver
   material (ex.: nenhum item para "Deixar de lado" na matriz), deixe o quadrante com
   "Nada identificado nesta conversa" — nunca invente itens para preencher.

2. **Quotes (citações literais):** extraia 2–4 falas literais do transcript. Distribua:
   - "O que eu ouvi" / "Resumo Executivo": 1 citação que capture a dor central.
   - "Ganhos Rápidos": 1 citação se houver boa fala para a respectiva dor.
   - "Bônus": 1 citação se o sinal de processo for forte.
   - Nunca edite a fala. Preserve "né", "tipo", pausas. Use `<blockquote>` com o estilo do template.

3. **Preços:** leia de `references/config.yaml`. Se `concierge_ai.preco` for `null`,
   pergunte à Cali. Se ela não souber, deixe `"[[a definir]]"` no HTML.

4. **Consistência visual:** mantenha a paleta (`--bg`, `--accent`, `--serif`, `--sans`)
   e a estrutura do template. Nunca recrie o HTML do zero.

5. **Sem `[[` no final:** varra o HTML gerado. Se qualquer `[[` sobrou, é erro.
