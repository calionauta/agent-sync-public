# Cálculo de ROI — realista, em faixas, sempre com base

O objetivo é ganhar confiança, não impressionar. Números inflados destroem a credibilidade do
serviço. Portanto: **faixas, não absolutos**; **base sempre** (transcript ou web); **conservador
quando incerto**.

## Método (passo a passo)

### 1. Tempo economizado por tarefa
Para cada ganho rápido:
```
horas_semana = frequência_por_semana × tempo_por_ocorrência × % que a IA realmente elimina
```
- **frequência** e **tempo por ocorrência**: tire do transcript. Se não houver, é suposição
  explícita (pergunte à Cali; senão assuma e marque como hipótese).
- **% eliminado**: quase nunca é 100%. A IA acelera/rascunha, mas há revisão humana. Use uma
  faixa honesta (ex.: 50–80% do tempo da tarefa) e **cheque na web** se o ganho alegado por
  aquele tipo de ferramenta é plausível. Sem evidência, use a ponta baixa.

Some por tarefa → **faixa total de horas/semana** (ex.: 4–7 h/semana). Sempre intervalo.

### 2. Fator de adoção (realismo)
Nem todo ganho teórico vira ganho real: curva de aprendizado, dias que a pessoa esquece de usar.
Aplique um desconto de adoção (ex.: considerar 60–85% do ganho teórico) e reflita isso na faixa.
Diga isso no relatório em uma linha — soa honesto e prepara expectativa.

### 3. Converter em dinheiro (faixa)
```
economia_mensal ≈ horas_semana × 4,33 × custo_da_hora
```
- **custo_da_hora**: baseie em quem faz a tarefa. Se o transcript disser salário/valor da hora,
  use. Se não, **pesquise na web** uma faixa de remuneração típica daquele papel no Brasil.
  Use APENAS o valor MÍNIMO da faixa pesquisada. Marque explicitamente como "valor mínimo
  estimado, pois não foi informado pelo cliente." Isso evita superestimativas e mantém
  a credibilidade do serviço.
- Como sai de uma faixa de horas e um valor mínimo de custo, o resultado é naturalmente
  uma **faixa conservadora de reais/mês**. Apresente arredondado (ex.: "R$ 1.500–3.000/mês").
  Se usou valor mínimo da hora, a ponta inferior da faixa é a mais realista.

### 4. ROI líquido
```
roi_liquido_mensal ≈ economia_mensal − custo_mensal_das_ferramentas
```
Some o custo das ferramentas propostas (confirme preços na web). Mostre o custo das ferramentas
separado — transparência importa mais que um número grande.

### 5. Value Recap (seção "O que este relatório te entrega")

Além do ROI das ferramentas, o relatório entrega **horas de pesquisa economizadas** —
tempo que o cliente gastaria pesquisando soluções por conta própria.

Para `ESTIMATIVA_HORAS_PESQUISA`, use faixa conservadora:
- **Mínimo:** 2–3 h (cliente já tinha alguma noção do que precisa)
- **Máximo:** 6–10 h (cliente começou do zero, tema complexo)
- Baseie no transcript: "já pesquisei bastante" → ponta baixa. "Não faço ideia" → ponta alta.
- **Sempre em faixa** (ex.: "4–8"). Nunca número absoluto.

Esta estimativa é sobre o valor da curadoria em si — separada do ROI das ferramentas.

## Regras de apresentação

- **Sempre faixa.** "R$ 1.500–3.000/mês", "4–7 h/semana". Nunca "R$ 2.480,00".
- **Nunca copie os valores de exemplo dos marcadores `[[ ]]`.** Os marcadores têm
  `_ex_` justamente para indicar EXEMPLO DE FORMATO, não valor para copiar.
  Ex.: `FAIXA_HORAS_ex_4–7 h` — calcule seus próprios valores baseado no transcript.
- **Sempre base.** Cada número tem origem: transcript, suposição explícita, ou fonte web.
- **WebSearch de checagem.** Depois de calcular, pesquise na web para verificar se a
  faixa é plausível para aquele tipo de ferramenta/tarefa. Se a web não sustentar,
  reduza a faixa.
- **Conservador.** Na dúvida, puxe para baixo. É melhor entregar acima da promessa.
- **Sem base = não afirme.** Rebaixe para "a validar na conversa" em vez de inventar.
- **Coerência com a garantia.** O serviço promete devolver horas reais; o ROI do relatório
  precisa ser algo que a Cali defenda de cabeça erguida na conversa de revisão.

## Exemplo (formato, não valores a copiar)

> Assumindo ~15 orçamentos/semana, ~12 min cada, hoje feitos à mão. Um Custom GPT com o
> catálogo reduz ~60–80% desse tempo. Ganho estimado: **2–3 h/semana**. Com custo de hora de
> um assistente administrativo (faixa pesquisada), isso representa **R$ 700–1.400/mês**, contra
> **R$ 0–100/mês** de ferramenta (plano existente). *ROI líquido: R$ 600–1.300/mês.*
