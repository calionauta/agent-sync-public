# Princípio da Carga Justa

> Critério de avaliação para qualquer recomendação: a solução não pode pesar mais que o problema que resolve.

## Os 4 critérios

Para cada recomendação, avalie em 4 dimensões. Se 2 ou mais forem "alto", a solução é desproporcional — prefira uma estratégia mais simples.

| # | Critério | O que mede | ⬇️ Baixo | ⬆️ Alto |
|---|----------|-----------|----------|---------|
| 1 | **Complexidade técnica** | Dificuldade de instalar, configurar e manter | Prompt pronto em 5 minutos, sem instalação | Self-host, múltiplas integrações, Docker, API keys |
| 2 | **Atrito diário** | Quantos passos extras a pessoa tem na rotina | Abre e usa no fluxo normal | Precisa lembrar de abrir, configurar parâmetros, manter consistência |
| 3 | **Investimento** | Dinheiro + tempo para começar | Grátis ou plano que o cliente já paga | Plano pago novo + horas de setup |
| 4 | **Risco** | O que acontece se algo falhar | Dá para refazer na hora, sem consequência | Perde dados, envia para cliente errado, decisão financeira errada |

## Regra de ouro

**Se a carga total for maior que a dor original, a recomendação está errada — mesmo que tecnicamente correta.**

Uma automação de 4h de setup para uma tarefa que toma 30 min/semana é desproporcional. Um Custom GPT de 10 min para a mesma tarefa é carga justa.

## Como usar

1. Antes de finalizar qualquer recomendação, passe pelos 4 critérios
2. Se 2+ forem "alto": desça para a próxima estratégia mais simples
3. Anote qual critério pesou na decisão — vira parte da justificativa no relatório

## Exemplos

| Recomendação | Complexidade | Atrito | Investimento | Risco | Veredito |
|-------------|:-----------:|:-----:|:-----------:|:----:|:--------:|
| Custom GPT para e-mails | ⬇️ Baixo | ⬇️ Baixo | ⬇️ Baixo | ⬇️ Baixo | ✅ Carga justa |
| n8n self-host para 3 leads/semana | ⬆️ Alto | ⬆️ Alto | ⬆️ Alto | ⬇️ Baixo | ❌ Desproporcional |
| Planilha compartilhada no Drive | ⬇️ Baixo | ⬇️ Baixo | ⬇️ Baixo | ⬇️ Baixo | ✅ Carga justa |
| Agente multi-canal para suporte 24h | ⬆️ Alto | ⬇️ Baixo | ⬆️ Alto | ⬆️ Alto | ⚠️ Avaliar se a dor justifica |
| Scheduled Task para relatório semanal | ⬇️ Baixo | ⬇️ Baixo | ⬇️ Baixo | ⬇️ Baixo | ✅ Carga justa |
