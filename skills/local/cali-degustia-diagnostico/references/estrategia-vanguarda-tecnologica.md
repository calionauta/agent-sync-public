# Estratégia: Vanguarda Tecnológica

> Adaptado do arquétipo C (Technological Vanguard) do stelow — voltado para recomendações de ferramentas.

## Filosofia

Use a melhor tecnologia disponível para criar uma experiência quase mágica. A pergunta-guia é: **"e se a pessoa não precisasse fazer nada?"**

## Quando usar como alternativa

- Volume alto (+20x/semana) — o setup se paga rapidamente
- A tarefa exige múltiplas integrações (sistemas diferentes)
- O cliente (ou o time) tem capacidade técnica
- A tarefa tem passos fixos + cognição — o caso ideal para IA + automação
- O custo por execução da IA puro é alto demais para o volume

## Processo

1. Mapeie o fluxo completo da tarefa (entrada → processamento → saída)
2. Identifique os gargalos de decisão (onde precisa de IA) vs. passos mecânicos (automação)
3. Desenhe: **automação faz a espinha dorsal, IA entra nos pontos de julgamento**
4. Considere: agente multi-canal, workflow com n8n/Windmill, self-host se dados sensíveis
5. Inclua TOQUE_HUMANO em toda etapa com consequência significativa

## Exemplos

| Dor | Vanguarda Tecnológica |
|-----|----------------------|
| "Perco 2h/dia respondendo orçamento no WhatsApp" | n8n escuta WhatsApp Business API → IA classifica intento → Custom GPT responde → humano só revisa se for lead quente. |
| "Relatório semanal leva 3h para montar" | Windmill: busca dados de 3 APIs → IA resume → sobe no Notion → dispara e-mail. Zero toque humano. |
| Agendamento é vai e volta | Cal.com self-host + Stripe + Zoom, cliente agenda, paga e recebe link sem intervenção. |
| "Suporte espalhado em 4 canais" | Chatwoot centraliza tudo → IA classifica e sugere resposta → humano só envia. |

## Como apresentar no relatório

Sempre como **⚡ Alternativa mais avançada**, em tom aspiracional, 1 linha no card da recomendação principal. Não como seção separada.

Formato:
> ⚡ Se o volume crescer: [descrição em 1 linha]. Setup: [tempo]. Custo: [R$].

## Limitações

- Setup mais caro e demorado (horas a dias)
- Requer manutenção (diferente de um prompt que não quebra)
- Exige capacidade técnica ou suporte do Concierge
- Pode ser desproporcional para volume baixo

## Relação com as outras estratégias

- **Simplicidade Radical** resolve sem ferramenta — é o ponto de partida
- **Padrão Convencional** resolve com IA no nível mais familiar
- **Vanguarda Tecnológica** automatiza o fluxo inteiro — é o ponto de chegada
- A **Recomendação Principal** (híbrida) equilibra o que faz sentido AGORA, não no futuro idealizado
