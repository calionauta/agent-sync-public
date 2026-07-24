# Estrutura do Relatório — Mapa seção por seção

Este arquivo mapeia CADA SEÇÃO dos templates HTML para a referência que a governa.
Antes de preencher qualquer seção, leia a referência indicada na coluna "Governado por".

Preços sempre vêm de `references/config.yaml`. Se um preço for `null`, a LLM deve
entrevistar Cali (ver SKILL.md Passo 3). Se ela não responder, o preço não aparece
no relatório — nunca deixe `[[a definir]]` no HTML.

---

## Sutil → `assets/report-gratuito.html`

| # | Seção no template | Marcadores `[[ ]]` | Governado por | Limites |
|---|-------------------|---------------------|---------------|---------|
| 1 | **Capa** | `TITULO_CURTO`, `NOME_DO_CLIENTE_OU_EMPRESA`, `DATA`, `LABEL_SERVICO` | Extraído do transcript (SKILL.md Passo 1) + label/selo do config.yaml | — |
| 2 | **O que eu ouvi** | `RESUMO_DA_DOR_EM_2_A_4_FRASES` | Extraído do transcript (SKILL.md Passo 1). Incluir 1 citação literal se houver boa fala. | 2–4 frases |
| 3 | **Ganho rápido** (REPETÍVEL: win) | `DOR_ATUAL_EM_UMA_FRASE`, `SOLUÇÃO_SIMPLES`, `FERRAMENTA_QUE_ELE_JÁ_TEM_OU_PEGA_GRÁTIS`, `SIMPLES_CONTRASTE_1_LINHA`, `PRIMEIRO_PASSO_CONCRETO_EM_1_2_LINHAS` | `references/ferramentas.md` (árvore de decisão) + `references/estrategia-simplicidade-radical.md` (contraste 🌱). Primeiro passo DEVE ser concreto. | 1–2 itens |
| 4 | **Por onde começar** | `O_PRIMEIRISSIMO_PASSO_EM_1_A_3_LINHAS` | Derivado do ganho rápido de maior impacto + menor atrito. | 1–3 linhas |
| 5 | **Convite aos serviços** (bloco .invite) | `PRECO_ENCORPADO`, `PRECO_CONCIERGE_MENSAL` (via config.yaml) | SKILL.md Passo 6 + `references/config.yaml`. Listar os 3 serviços (Encorpado, Concierge, Complexo). | 3 opções, ≤10 linhas |
| 6 | **Assinatura** | — | Fixo: "Sob medida, Cali · Brasil · Sommelier de IA" | Fixo |

### Diagrama de fluxo (Sutil)

```
Transcript → Passo 1 (extrair dores, frequência, quotes)
         → Passo 2.1 (3 alternativas para cada dor)
         → Passo 2.2 (híbrida → recomendação principal)
         → Passo 5 (montar: capa > ouvi > ganhos com 🌱 > começar > convite)
         → Upsell para 3 serviços pagos
```

---

## Encorpado → `assets/report-completo.html`

| # | Seção no template | Marcadores `[[ ]]` | Governado por | Limites |
|---|-------------------|--------------------|---------------|---------|
| 1 | **Capa** | `TITULO_CURTO_DO_DIAGNOSTICO`, `NOME_DO_CLIENTE_OU_EMPRESA`, `DATA`, `TIPO_DE_NEGOCIO`, `FOCO_PRINCIPAL`, `LABEL_SERVICO` | Extraído do transcript (SKILL.md Passo 1) + label/selo do config.yaml | — |
| 2 | **Resumo Executivo** | `DOR_PRINCIPAL_EM_2_A_4_FRASES`, `RESULTADO_ESPERADO_EM_2_A_4_FRASES`, `FAIXA_HORAS_ex_4–7 h`, `OPORTUNIDADES_1_LINHA` | Extraído do transcript (Passo 1). Horas: `references/calculo-roi.md`. Incluir 1 citação literal. | — |
| 3 | **Matriz Impacto × Esforço** | (4 quadrantes com itens do transcript) | `references/matriz-impacto-esforco.md`. | 2–4 itens por quadrante |
| 4 | **Para provar agora** (REPETÍVEL: qwrow) com callout 💡 | `DOR_ATUAL`, `SOLUÇÃO_SIMPLES`, `FERRAMENTA`, `SIMPLES`, `SETUP_SIMPLES`, `VANGUARDA`, `SETUP_VANGUARDA` | `references/ferramentas.md` + `references/estrategia-hibrida.md`. Callout antes da lista. Itens = quadrantes "Ganhos rápidos" da matriz. | 3–6 itens |
| 5 | **Bônus: Processo e Cultura** | `CONTEXTO`, `TIPO_EXPERIMENTO`, `DESCRICAO_DO_EXPERIMENTO`, `PERGUNTA_GUIA` | `references/bonus-processo.md`. Obrigatório (profundidade variável). | Máx. 1 bloco |
| 6 | **Ferramentas Recomendadas** (REPETÍVEL: tool) | `NOME_DA_FERRAMENTA`, `PARA_QUE_SERVE_NO_CASO_DELE_1_FRASE`, `CUSTO_ou_Grátis`, `ESFORÇO_ex_baixo`, `FAIXA_HORAS_ex_2–3 h/sem`, `DICA_RAPIDA`, `SIMPLES_ALTERNATIVA`, `VANGUARDA_ALTERNATIVA`, `ROTINA_QUANDO`, `ROTINA_TEMPO`, `ROTINA_PASSOS`, `MES_ANO_VERIFICACAO`, `LINKS_VERIFICADOS`, `TOQUE_HUMANO` | `references/ferramentas.md` + `references/estrategia-hibrida.md` (contraste) + `references/calculo-roi.md` (economia) + WebSearch (links verificados). | 3–7 cards |
| 7 | **Primeiros resultados em 4 dias** | `O_QUE_FAZER`, `FERRAMENTA` | `references/metodologia.md`. | 4 dias fixos |
| 8 | **O Que Vem Depois** (REPETÍVEL: after) | `MOVIMENTO_MAIOR`, `FERRAMENTA_OU_ABORDAGEM` | `references/matriz-impacto-esforco.md` (quadrante "Projetos maiores"). | 2–3 itens |
| 9 | **Impacto Financeiro** | `FAIXA_ROI_ex_R$ 1.500–3.000`, `FAIXA_HORAS_ex_4–7 h`, `FAIXA_CUSTO_ex_R$ 0–200` | `references/calculo-roi.md`. Tudo em faixas. | 3 cards |
| 10 | **Value Recap** | `ESTIMATIVA_HORAS_PESQUISA`, `FAIXA_HORAS_ex_4–7 h/sem`, `FAIXA_ROI_ex_R$ 1.500–3.000/mês` | Extraído do Impacto Financeiro. | 3 cards |
| 11 | **Próximos Passos + Convite** | `PASSO_1_TITULO`, `PASSO_1_DESC` etc.; `PRECO_ENCORPADO` | SKILL.md Passo 6 + `references/config.yaml`. Se concierge.preco é null e Cali não respondeu: o preço não aparece. | 3 passos + 1 concierge |
| 12 | **Assinatura** | — | Fixo: "Sob medida, Cali · Brasil · Sommelier de IA" | Fixo |

### Diagrama de fluxo (Encorpado)

```
Transcript → Passo 1 (extrair dores, frequência, quotes, capacidade técnica)
         → Passo 1.5 (pesquisar alternativas em pt + en)
         → Passo 2.1 (gerar 3 alternativas: 🌱 Simplicidade Radical,
                       📋 Padrão Convencional, ⚡ Vanguarda Tecnológica)
         → Passo 2.2 (gerar híbrida → recomendação principal)
         → Passo 2.5 (avaliar sinal de processo/cultura → bônus)
         → Passo 3 (entrevistar Cali para preencher lacunas)
         → Passo 4 (pesquisar preços, validar ROI, links na web)
         → Passo 5 (montar: capa > sumário > matriz > callout 💡 +
                     provar agora com 🌱⚡ > bônus > adega com 🌱⚡📅 >
                     roteiro > depois > financeiro > valor > passos > assinatura)
         → Passo 6 (upsell honesto)
         → Passo 7 (pré-voo: checklist expandido)
```

---

## Regras de preenchimento (ambos os tipos)

1. **Cada seção deve ter conteúdo EXTRAÍDO do transcript.** Se uma seção não tiver
   material, deixe o quadrante com "Nada identificado nesta conversa" — nunca invente.

2. **Quotes (citações literais):** extraia 2–4 falas literais do transcript. Distribua:
   - "O que eu ouvi" / "Resumo Executivo": 1 citação da dor central.
   - "Para provar agora": 1 citação se houver boa fala.
   - "Bônus": 1 citação se sinal forte.
   - Nunca edite a fala. Preserve "né", "tipo", pausas. Use `<blockquote>`.

3. **Preços:** leia de `references/config.yaml`. Se `concierge_ai.preco` for `null`,
   entreviste Cali (Passo 3). Se ela não responder, o preço não aparece no relatório.
   **Nunca** deixe `[[a definir]]` no HTML.

4. **Contraste 🌱⚡:** no Encorpado, cada item de "Para provar agora" e cada card de
   ferramenta tem 2 linhas de contraste — Simplicidade Radical (🌱) e Vanguarda
   Tecnológica (⚡). No Sutil, só 🌱 (1 linha).

5. **Links verificados:** no Encorpado, cada card de ferramenta tem links pesquisados
   na web. Incluir mês/ano da verificação. Nunca inventar URLs.

6. **Consistência visual:** mantenha a paleta (`--bg`, `--accent`, `--serif`, `--sans`)
   e a estrutura do template. Nunca recrie o HTML do zero.

7. **Sem `[[` no final:** varra o HTML gerado. Se qualquer `[[` sobrou, é erro.
   Também: nenhuma instrução "consulte a Cali" ou "pergunte ao usuário" no texto final.

8. **Suposições:** se usou suposições (Passo 3), liste-as no chat para Cali validar.
   Não coloque no relatório.
