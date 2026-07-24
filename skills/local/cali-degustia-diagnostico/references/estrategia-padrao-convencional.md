# Estratégia: Padrão Convencional

> Adaptado do arquétipo A (Conventional Standard) do stelow — voltado para recomendações de ferramentas.

## Filosofia

Use o caminho mais familiar e estabelecido. A IA no modo mais previsível: prompt, Custom GPT, Skill, Gem. A pergunta-guia é: **"qual a versão mais familiar de IA para este problema?"**

## Quando usar como alternativa

- O cliente já usa a ferramenta base (ChatGPT, Claude, Gemini)
- A tarefa exige cognição (interpretação, resumo, geração)
- O volume é baixo a médio (<20x/semana)
- O setup precisa ser rápido (minutos, não horas)
- A tarefa precisa de julgamento/nuance, não de regras fixas

## Processo

1. Identifique qual ferramenta de IA o cliente já tem ou conhece
2. Determine se a tarefa cabe em um prompt salvo (Custom GPT / Skill / Gem)
3. Se repetir em horário fixo: Scheduled Task
4. Se precisar de contexto longo: Claude Project / ChatGPT Workspace
5. Sempre inclua TOQUE_HUMANO em tarefas com consequência significativa

## Exemplos

| Dor | Padrão Convencional |
|-----|---------------------|
| "Perco 2h/dia respondendo orçamento" | Custom GPT com catálogo de preços e tom de resposta. Cola a pergunta, ele responde, confere e envia. |
| "Relatório semanal leva 3h" | Scheduled Task no ChatGPT — toda sexta às 17h ele gera o resumo dos dados da semana. |
| "Esqueço tom da marca em e-mails" | Skill no Claude com exemplos de e-mails anteriores. Ativa com um atalho. |
| "Análise de contrato demora" | Claude Project com knowledge base de contratos anteriores. Pede análise em linguagem natural. |

## Como apresentar no relatório

A LLM usa esta estratégia como base para gerar a **Recomendação Principal (híbrida)**. Ela não aparece como label separado no relatório — seus traços são incorporados na recomendação.

Efeito esperado: a recomendação principal usa ferramentas que o cliente já conhece, com setup em minutos.

## Limitações

- Depende de a pessoa lembrar de usar (não é automático)
- Custo por execução (cada chamada gasta token)
- Não escala bem para volume alto sem Scheduled Tasks
- A IA pode alucinar — requer confirmação humana

## Relação com as outras estratégias

- **Simplicidade Radical** resolve sem IA nenhuma
- **Padrão Convencional** adiciona IA no nível mais acessível
- **Vanguarda Tecnológica** automatiza o fluxo inteiro, removendo a dependência de lembrança
- A **Recomendação Principal** (híbrida) pega o melhor de cada uma sem contradizer
