# Estratégia Híbrida — Recomendação Principal

> Adaptado do stelow-product-interface-alternatives (hybrid-recommendation.md).
> Esta é a metodologia para GERAR a recomendação principal do relatório, combinando
> as 3 estratégias alternativas de forma coerente.

## Fluxo

### 1. Gere as 3 alternativas primeiro

Para cada dor do cliente, desenhe:

| # | Estratégia | Arquivo de referência | Pergunta-guia |
|---|------------|----------------------|---------------|
| 1 | Simplicidade Radical | `references/estrategia-simplicidade-radical.md` | "Qual o mínimo que resolve sem ferramenta nova?" |
| 2 | Padrão Convencional | `references/estrategia-padrao-convencional.md` | "Qual a versão mais familiar de IA?" |
| 3 | Vanguarda Tecnológica | `references/estrategia-vanguarda-tecnologica.md` | "Qual o máximo que a tecnologia permite?" |

**Importante:** gere as 3 em paralelo conceitual. Não escolha uma antes de ter as 3.

### 2. Avalie forças e fraquezas no contexto real

Para cada alternativa, avalie:

| Critério | O que perguntar |
|----------|----------------|
| **Carga Justa** | A solução pesa mais que o problema? (ver `references/principio-carga-justa.md`) |
| **Simplicidade** | A pessoa consegue manter sozinha depois de implementada? |
| **Time to Value** | Gera valor na primeira semana? |
| **Integração** | Conecta com o que o cliente já tem? |
| **Custo total** | Setup + operação cabem no orçamento? |

### 3. Recomende 1 direção primária

Escolha a estratégia que melhor equilibra os critérios acima. Geralmente será o **Padrão Convencional** ou a **Simplicidade Radical**, mas pode ser a Vanguarda Tecnológica se o volume e a capacidade técnica justificarem.

### 4. Adicione traços secundários (opcional)

Pegue elementos de OUTRA estratégia desde que sejam **coerentes** com a direção primária:

- Simplicidade Radical + Padrão Convencional: "comece com o prompt, mas se organize com a planilha primeiro"
- Padrão Convencional + Vanguarda Tecnológica: "use o Custom GPT agora, e quando o volume crescer, automatizamos o fluxo"
- NÃO combinável: Simplicidade Radical + Vanguarda Tecnológica (são polos opostos)

### 5. Explique o que NÃO combinar

Proibido combinar:
- **Simplicidade Radical + Vanguarda Tecnológica** na mesma recomendação — são polos opostos. Um diz "não use ferramenta", o outro diz "use a máxima ferramenta".
- **Mais de 3 ferramentas** para a mesma dor — vira sopa de ferramentas.

### 6. Explicite os trade-offs preservados

Para cada decisão, deixe claro o que foi sacrificado:

> "Recomendo o Custom GPT porque o volume é baixo (~5x/semana) e você já usa ChatGPT.
> A Simplicidade Radical (planilha modelo) seria mais barata, mas exigiria mais do seu tempo.
> A Vanguarda Tecnológica (n8n) seria mais automática, mas o setup de 4h não se paga neste volume.
> **Trade-off:** você ainda vai revisar as respostas antes de enviar — isso não é automático."

### Regra de ouro

A recomendação deve ser **estrategicamente opinada**. A LLM escolhe um lado e justifica com dados do transcript. Não é "tudo funciona" — é "isto é o que faz sentido para VOCÊ agora."

**Evite:**
- Sopa de ferramentas: 3+ ferramentas para a mesma tarefa
- Modelos contraditórios: "use IA, mas faça manual" sem explicar o trade-off
- Síntese "best of all worlds": escolhas de design envolvem sacrificar algo — seja honesto sobre o que foi sacrificado

A recomendação híbrida é a **primeira opção na lista** do relatório. As alternativas (Simplicidade Radical e Vanguarda Tecnológica) aparecem como linhas de contraste no card, nunca como recomendações concorrentes.
