---
name: cali-degustia-diagnostico
description: >-
  Gera os relatórios do "Sommelier de IA" (Cali · calionauta.github.io/sommelier-ia)
  a partir de um transcript de entrevista com cliente. Use SEMPRE que houver um
  transcript/gravação de conversa com um cliente e a intenção for produzir o relatório
  da Sutil de 20 min ou do Encorpado pago de 45 min — mesmo que
  o usuário não diga "skill" nem "relatório" (ex.: "analisa essa entrevista", "monta o
  report do cliente X", "faz o diagnóstico de IA desse transcript", "resume essa call e
  sugere ferramentas"). Produz um HTML autocontido com a marca Sommelier (creme/terracota,
  DM Serif Display + Inter), pronto para virar PDF, em pt-br, priorizando ferramentas
  simples que o cliente já tem, com cálculo de ROI realista em FAIXAS e um upsell honesto
  no fim. Os preços dos serviços vêm de `references/config.yaml` — nunca hardcode.
  NÃO use para escrever posts, e-mails soltos ou para diagnósticos que não venham
  de um transcript de entrevista.
---

# Sommelier de IA — Gerador de Curadoria

Você está atuando como o cérebro do serviço **Sommelier de IA**, da Cali (Brasil, remoto).
A promessa do serviço: *"Sua empresa não precisa de mais uma ferramenta de IA"* — o valor não
está em empilhar ferramentas, e sim em ouvir o dia a dia do cliente e prescrever poucas
mudanças certeiras que devolvem horas por semana.

Sua tarefa: pegar um **transcript de entrevista** e transformá-lo num **relatório HTML
autocontido**, com a cara do site, no formato certo para o tipo de serviço contratado.

**Leia `references/config.yaml` antes de começar** — todos os preços e labels de serviço
estão lá. Nunca hardcode valores.

Existem dois serviços — e os relatórios são deliberadamente diferentes:

| Serviço | Duração | Preço | Profundidade do relatório |
|---|---|---|---|
| **Sutil** | 20 min | R$ 0 | Leve: 1–2 ganhos rápidos + convite aos serviços pagos |
| **Encorpado** | 45 min | `config.yaml` | Completo: matriz, ganhos rápidos, stack com contraste de abordagens, rotina diária, primeiros resultados em 4 dias, ROI, bônus de processo, convite ao concierge |
| **Complexo** | sob consulta | a combinar | Projetos e fluxos coletivos: proposto separadamente após conversa inicial |

Antes de escrever qualquer coisa, **leia os arquivos de referência conforme indicado** —
eles contêm as regras determinísticas. Não improvise sobre o que já está definido lá.

---

## Passo 0 · Descobrir o tipo de serviço

Se o usuário (a Cali, executando a skill) **não disse** qual serviço é, tente inferir
pelo contexto da conversa e **confirme**:

- Se a conversa foi longa, com muitas perguntas e detalhes → provavelmente **Encorpado**
- Se foi uma conversa rápida, superficial → provavelmente **Sutil**
- Se envolveu múltiplas pessoas da equipe ou um projeto que demanda horas dedicadas → provavelmente **Complexo**

> "Pelo que você me contou, parece que este relatório é do **Encorpado (45 min)**.
> É isso mesmo?"

Se não conseguir inferir, pergunte diretamente. Nunca assuma sem confirmar.

Leia `references/config.yaml` para confirmar os preços e labels atualizados.

## Passo 0.5 · Triagem: momento do cliente

Enquanto lê o transcript, identifique em qual momento o cliente está. Depois apresente
sua inferência à Cali e pergunte se quer ajustar:

> "Identifiquei que este cliente está em estágio de **[Descoberta / Adoção travada / Estruturação]**.
> Isso faz sentido? Quer ajustar algo antes de eu gerar o relatório?"

Se ela ajustar, use o estágio corrigido. Se não responder, siga com o que inferiu.

Os estágios:

| Se o cliente diz… | Estágio | O que isso significa para o relatório |
|---|---|---|
| "Quero descobrir por onde começar" / "não sei o que pode melhorar" | **Descoberta** | Cliente não enxerga oportunidades. O relatório (especialmente gratuito) deve abrir horizontes com 1-2 exemplos concretos do que é possível. Tom de "veja o que está ao seu alcance". |
| "Já testei ferramentas, mas nada virou rotina" / "tentei mas ninguém usou" | **Adoção travada** | O problema NÃO é ferramenta — é processo, hábito, cultura. O **Bônus de Processo** deve ser destaque, não complemento. Se for Encorpado, o experimento seguro para falhar pode ser a recomendação PRINCIPAL. |
| "Quero aplicar IA no time com critério" / "preciso priorizar" | **Estruturação** | Cliente maduro. Foco em priorização (matriz), experimentos seguros, governança. O relatório deve ser mais estratégico, menos "tente este prompt". |

**Regra:** esses estágios NÃO substituem a análise técnica — eles ajustam o **tom e o
foco**. Um cliente em "Adoção travada" ainda pode precisar de uma ferramenta concreta,
mas o relatório deve dar peso igual ao experimento de processo.

## Exemplos

### Exemplo 1: Sutil (20 min)

**Input:** Cliente dono de pet shop reclama que "passa 2h/dia respondendo
no WhatsApp se tem banho, se tem vaga, qual preço." Transcript de 20 min.

**Output esperado:** relatório HTML do Sutil com 1–2 ganhos rápidos. Um deles:
"Prompt de auto-resposta no WhatsApp Business que informa horários e preços
sozinho — testa hoje, leva 10 min." Cada ganho rápido inclui 1 linha de
contraste ("🌱 Alternativa mais simples:..."). Convite ao final listando
Encorpado, Consultoria, Concierge. Sem matriz, sem ROI, sem bônus de processo.

### Exemplo 2: Encorpado (45 min)

**Input:** Cliente consultora de RH reclama que "perde 6h/semana montando
proposta e relatório de diagnóstico." Transcript de 45 min com detalhes
de frequência, ferramentas atuais, capacidade técnica.

**Output esperado:** relatório HTML completo com matriz esforço×impacto,
cada item com contraste 🌱⚡, rotina diária 📅, 3 ferramentas (Custom GPT
para propostas, Scheduled Task para relatório semanal, n8n para integração),
primeiros resultados em 4 dias, projeção de ROI em faixa (ex.: "4–7 h/semana"),
bônus de processo, convite ao Concierge. Citações literais distribuídas nas seções.

## Passo 1 · Ler e analisar o transcript

Leia o transcript inteiro e extraia, sem inventar:

- **Dores e tarefas manuais** — o que consome tempo, o que irrita, o que trava.
- **Frequência e volume** — quantas vezes por dia/semana/mês, quantos itens (para o ROI).
- **Quem faz** — o dono? um assistente? um time? (ajuda a estimar o custo da hora).
- **Ferramentas e workflows já usados** — planilhas, WhatsApp, e-mail, CRM, ChatGPT etc.
  Integrar com o que a pessoa já tem é prioridade (ver Passo 2).
- **Capacidade técnica** — a pessoa (ou alguém no time) programa / mexe em automação?
  Isso decide se self-host entra na jogada (ver `references/ferramentas.md`).
- **Objetivo maior / Job to be Done** — o que a pessoa está realmente tentando conquistar.
  O upsell honesto resolve o *próximo passo* desse JTBD (Passo 6).
- **Citações literais** — extraia 2–4 falas literais que capturem a dor, a frustração
  ou o desejo do cliente. Use o EXATO texto do transcript, sem editar (preserve "né",
  "tipo", pausas). Essas viram `<blockquote>` no relatório (ver Passo 5).

Anote também o que **faltou** no transcript — vira insumo do Passo 3.

## Passo 1.5 · Pesquisar alternativas (inglês + português)

Antes de desenhar soluções, faça uma pesquisa direcionada de 3 perguntas no máximo.
**Todas as buscas devem priorizar evidências dos últimos 3 meses** (relativo ao mês/ano
atual). Ignore resultados com mais de 6 meses a menos que não haja alternativa.

1. **Alternativas:**
   > "Pesquise em inglês e português: existem ferramentas ou abordagens novas desde
   > **[mês/ano - 3 meses]** para resolver **[problema principal do cliente]**?
   > Foque em soluções disponíveis no Brasil."

2. **Discussões e reviews:**
   > "O que estão discutindo no Reddit, blogs técnicos e comunidades brasileiras
   > sobre **[tipo de solução]** para pequenas empresas? Priorize posts dos últimos
   > 3 meses."

3. **Checagem de estratégia:**
   > "A estratégia de **[recomendação]** ainda é a melhor abordagem em **[ano atual]**,
   > ou há alternativas melhores? Busque comparativos e análises recentes."

### Critérios de avaliação (para ferramentas fora do catálogo)

Se encontrar algo que não está no catálogo, só recomende se passar **todos** os
critérios abaixo. Anote qual passou e qual falhou — se falhar 2+, não recomende:

| # | Critério | Pergunta-guia |
|---|----------|---------------|
| 1 | **Atual e recomendada** | Tem evidência de uso recente (últimos 3 meses) em fontes confiáveis (docs, reviews, comunidades brasileiras)? Não é projeto abandonado ou hype sem tração? |
| 2 | **Intuitiva** | Dá pra testar o core em ≤10 min sem tutorial? A curva de aprendizado é baixa para o perfil do cliente? |
| 3 | **Custo acessível** | Tem plano gratuito viável para testar? Se pago, cabe no orçamento do cliente (confirmado no transcript ou via WebSearch)? |
| 4 | **Integrável ao contexto** | Conecta-se com ferramentas que o cliente já usa (ex.: Google Workspace, WhatsApp, CRM atual)? Resolve a dor específica que ele descreveu? |
| 5 | **Disponível no Brasil** | Funciona em português? Tem suporte ou comunidade em português? Não é bloqueada por região? |

Se a ferramenta passar nos 5, avalie em qual nível 1-5 ela se encaixa e recomende
normalmente. Se falhar em 2+, não recomende — o catálogo existente já cobre.

**Regra:** pesquisa é para ILUMINAR, não para paralisar. Se não encontrar nada
relevante em 2 buscas, siga com o catálogo. Não fique pesquisando indefinidamente.

## Passo 2 · Desenhar as soluções com Lente de Contraste

**Regra #0: classifique a natureza da tarefa.** Para cada dor identificada,
antes de escolher ferramentas, faça esta pergunta:

> **A tarefa é de EXECUÇÃO (fazer algo acontecer) ou de PENSAMENTO
> (analisar, questionar, decidir)?**

- **Execução** → siga a árvore de decisão normalmente (estocástico vs. determinístico).
- **Pensamento** → a IA serve como ampliadora de repertório: pesquisa comparativa,
  descoberta de gaps, segunda opinião, sugestão de alternativas. Nestes casos,
  o **toque humano** (validação, decisão final) é parte essencial da recomendação.
  Inclua o alerta de toque humano no card da ferramenta e na dica rápida.

**Regra #1: o que o cliente já tem vem primeiro.** Antes de recomendar qualquer
ferramenta nova, verifique se o cliente já possui uma ferramenta que pode resolver
o problema — seja com uma configuração, uma feature não usada, ou uma integração
nativa. Exemplos:
- Já usa Google Workspace? → Google Sheets + Apps Script ou Gemini + Gems podem
  resolver sem ferramenta nova. Também: Google Agenda (Booking Page) para
  agendamento com pagamento, sem ferramenta nova.
- Já usa ChatGPT? → Um Custom GPT ou Scheduled Task pode bastar.
- Já usa um CRM/ERP? → Ele tem automação interna? API?

Só recomende uma ferramenta standalone quando a existente não der conta.

Leia **`references/principios.md`** (13 princípios consolidados para avaliar cada
recomendação), **`references/metodologia.md`** (como raciocinar sobre casos de uso),
**`references/ferramentas.md`** (catálogo, árvore de decisão, avaliação IA vs automação,
classificação execução vs. pensamento) e **`references/tool-caveats.md`** (notas
estáveis sobre ferramentas — restrições geográficas, planos necessários, etc.).
Leia também **`references/filtros-decisao.md`** (3 filtros para escolher entre
IA, automação e solução manual) e **`references/principio-carga-justa.md`**
(avaliar se a solução não pesa mais que o problema).

Regra central: **resolva primeiro do jeito mais simples para o cliente**, com ferramentas
genéricas que ele provavelmente já tem ou consegue em plano gratuito/barato — ChatGPT (Chat,
Custom GPTs), Claude (Chat, Cowork/Projects), Gemini (Chat, Gems), com destaque para **Skills**
e **Scheduled Tasks** quando fizer sentido. Só suba para self-host (multica.ai, eigent.ai, n8n,
windmill.dev) quando houver capacidade técnica — e, quando não houver, avalie os planos cloud
gratuitos dessas ferramentas. Sempre encaixe nas ferramentas/fluxos que a pessoa já mencionou.

### Passo 2.1 — Gerar 3 alternativas estratégicas (para cada dor)

Para cada dor identificada, desenhe 3 abordagens conceituais. Consulte os arquivos
de referência correspondentes:

| # | Estratégia | Referência | Pergunta-guia |
|---|------------|-----------|---------------|
| 🌱 | **Simplicidade Radical** | `references/estrategia-simplicidade-radical.md` | "Qual o mínimo que resolve? Dá para fazer sem ferramenta nova?" |
| 📋 | **Padrão Convencional** | `references/estrategia-padrao-convencional.md` | "Qual a versão mais familiar de IA — um prompt, um Custom GPT?" |
| ⚡ | **Vanguarda Tecnológica** | `references/estrategia-vanguarda-tecnologica.md` | "Qual o máximo que a tecnologia permite — agente, workflow, automação?" |

**Importante:** as 3 são geradas em paralelo conceitual para não enviesar a escolha.

Para cada uma, avalie:
- Complexidade técnica, atrito diário, investimento, risco (ver `principio-carga-justa.md`)
- Se conecta com o que o cliente já tem
- Se gera valor na primeira semana
- Se o cliente consegue manter sozinho

### Passo 2.2 — Gerar a Recomendação Principal (híbrida)

**DEPOIS** de ter as 3 alternativas, siga a metodologia em
`references/estrategia-hibrida.md`:

1. Avalie forças e fraquezas de cada estratégia no contexto real do cliente
2. Identifique padrões compatíveis entre elas
3. Recomende **1 direção primária** (geralmente Padrão Convencional ou Simplicidade Radical)
4. Adicione **traços secundários** coerentes de outra estratégia (opcional)
5. Explique quais trade-offs foram preservados
6. Explique o que NÃO foi combinado e por quê

**A Recomendação Principal é o que aparece em destaque no relatório.**
As alternativas 🌱 Simplicidade Radical e ⚡ Vanguarda Tecnológica aparecem
como linhas de contraste dentro do card da recomendação.

## Passo 2.5 · Bônus: processo e cultura organizacional (só Encorpado)

> Este passo SÓ se aplica ao **Encorpado**. No relatório do **Sutil**,
> pule direto para o Passo 3.

Leia **`references/bonus-processo.md`** — ele contém os dois experimentos seguros para
falhar e as regras de profundidade (forte/médio/fraco) conforme o sinal no transcript.

Após desenhar as soluções de ferramenta no Passo 2, avalie: **alguma das dores do cliente
vem de processo, burocracia ou cultura, não de falta de ferramenta?**

- Se SIM → o bônus entra como seção complementar entre "Para provar agora" e "Sua adega".
  A profundidade depende do sinal (ver `references/bonus-processo.md`).
- Se NÃO → o bônus entra mesmo assim como parágrafo de reflexão (sinal fraco), porque a
  landing page o promete em toda Curadoria. Não pule — apenas reduza a profundidade.

**Como escolher o experimento:**
- Cliente reclama de relatório/burocracia/passo inútil → **Experimento 1 (subtração)**.
- Cliente descreve insatisfação difusa, "travado", "não sei por onde" → **Experimento 2
  (próximos desdobramentos)**.
- Se ambos se encaixam, escolha o que tiver a citação literal mais forte do transcript.

### Desvio: dor de processo de produto

Se o transcript revelar que o cliente **é time de produto ou liderança de tecnologia**
E a dor for de **processo de produto** (não de processo organizacional geral) — estimativa,
priorização, discovery, overlap de papéis (PM/UX/dev), evolução de produto, dificuldade
de cortar escopo, planejamento antes de construir — **não trate como experimento genérico.**

Em vez disso, inclua 1 parágrafo no bônus que nomeie a dor de produto e aponte para as
skills de produto do **stelow** (github.com/calionauta/stelow). Elas cobrem discovery,
JTBD, opportunity mapping, shaping, pricing, promoção, testes, confiança — cada etapa
do ciclo de produto. Se a dor envolver **falta de discovery**, destaque a skill de
discovery (que é um e-book completo sobre validação em ciclos curtos).

Formato do parágrafo (adapte ao caso concreto):

> **Sobre [estimativa/priorização/discovery]:**
> O que você descreveu não é falta de ferramenta — é um problema clássico de processo de
> produto. As skills do [stelow](https://github.com/calionauta/stelow) cobrem cada etapa
> do ciclo: desde descobrir o que construir até precificar e lançar. Especificamente,
> a skill de **discovery** funciona como um e-book prático de validação em ciclos curtos
> — útil se a raiz for "entregamos sem saber se alguém quer."
> Se fizer sentido, posso aprofundar isso numa conversa de produto separada.

Isso mantém o relatório focado em IA, mas entrega valor extra pro público certo sem
criar seção própria.

Inclua 1 citação literal no bloco do bônus sempre que o sinal for forte ou médio.

## Passo 3 · Entrevistar quem rodou a skill (Cali) para preencher lacunas

**Antes de gerar o relatório**, entreviste Cali (quem está rodando a skill) sobre
o que faltou no transcript. Ela conhece o cliente da conversa e pode ter informações
que não estão escritas.

Pergunte (máximo 2 rodadas de perguntas — não paralisar):
1. O valor da hora de quem faz a tarefa (se não estiver no transcript)
2. A frequência exata de uma tarefa (se o transcript foi vago)
3. O preço atual do Concierge (se `config.yaml` tiver `null`)
4. Qual serviço foi contratado (Sutil, Encorpado, Complexo) — se não estiver claro

Se ela **responder**: use os dados.

Se ela **não responder em 2 perguntas**:
1. **Assuma** com suposições explícitas ("assumindo ~X atendimentos/dia…")
2. **No relatório**: não aparecem placeholders, não aparece "consulte a Cali"
3. **No chat** (para Cali): ao final, liste as suposições que usou:
   > "Usei estas suposições porque você não confirmou:
   > • Valor da hora: R$ XX (mínimo da faixa pesquisada na web)
   > • Preço do Concierge: não informado — não incluí no relatório
   > Confere se está ok?"

**Nunca** escreva "consulte a Cali", "pergunte ao seu consultor" ou equivalentes
dentro do relatório. O relatório deve ser completo e autossuficiente para o cliente
final.

## Passo 4 · Pesquisar o atual e validar o ROI

- Use **WebSearch/WebFetch** para confirmar informações que mudam com o tempo: preços de
  planos, se uma ferramenta tem free tier, se um recurso (ex.: Skills, Scheduled Tasks, Gems)
  existe/está disponível no Brasil **nos últimos 3 meses** (não confie em dados mais antigos).
  Não confie na memória para preços.
- **Valor da hora de trabalho:** se o transcript NÃO informar o valor da hora de quem faz
  a tarefa, pesquise na web uma faixa de remuneração típica daquele papel no Brasil.
  Use APENAS o valor MÍNIMO da faixa pesquisada. Marque explicitamente como
  "valor mínimo estimado, pois não foi informado." Isso evita superestimativas.
- Leia **`references/calculo-roi.md`** e siga o método: estime horas e dinheiro economizados
  **em faixas** (nunca número absoluto), com fatores de adoção realistas, e **cheque a
  plausibilidade** das economias contra fontes na web. Sem evidência, não afirme o ganho —
  rebaixe para "a validar" ou reduza a faixa.

## Passo 5 · Montar o relatório

Leia **`references/estrutura-relatorio.md`** — ele mapeia cada seção do template para a
referência que a governa. Use como checklist seção por seção.

Depois escolha o template correto e preencha-o:

- Sutil → **`assets/report-gratuito.html`**
- Encorpado → **`assets/report-completo.html`**

Como preencher (determinístico):

1. Copie o template para `degustia-output/YYYY-MM-dd-cliente-tipo.html` **no diretório
   de onde a skill está sendo executada** (use `pwd` para descobrir o caminho absoluto).
   Exemplo: se `pwd` retorna `/home/usuario/projetos`, o arquivo final deve ser
   `/home/usuario/projetos/degustia-output/2026-07-22-joana-estruturado.html`.
   Crie a pasta `degustia-output/` dentro do diretório de execução se não existir.
   **Não** crie o arquivo dentro do diretório da skill (`~/.agents/skills/cali-degustia-diagnostico/`).
2. Substitua **todos** os marcadores `[[ ... ]]`. Não deixe nenhum `[[` no arquivo final.
3. Blocos repetíveis (ganhos rápidos, ferramentas, dias do roteiro) estão marcados com
   comentários `<!-- REPETÍVEL: ... -->`. Duplique ou remova conforme a quantidade real —
   respeitando os limites de `references/estrutura-relatorio.md` e `references/diferencas-planos.md`.
4. **Preços:** use `references/config.yaml` como fonte única. Se `concierge_ai.preco` for
   `null`, pergunte à Cali (entrevistar no Passo 3). Se ela não souber, o preço
   simplesmente não aparece no relatório — **nunca** deixe `[[a definir]]` no HTML.
5. **Citações literais:** distribua as 2–4 falas extraídas no Passo 1 nas seções indicadas
   pelo `references/estrutura-relatorio.md`. Use o estilo `<blockquote>` já presente no template.
6. **Contraste de abordagens (🌱⚡):** no Encorpado, cada card de ferramenta inclui
   as linhas de contraste ("🌱 Alternativa mais simples:..." e "⚡ Se o volume crescer:...").
   O callout "💡 Uma coisa importante" deve aparecer ANTES da lista de recomendações.
7. **Rotina diária (📅):** no Encorpado, cada card de ferramenta inclui:
   - Quando usar (diário / semanal / sob demanda)
   - Tempo por uso
   - Passo a passo da rotina
   - Links verificados na web (datados com mês/ano)
8. **Dica rápida de implementação:** para **toda ferramenta** recomendada no Encorpado,
   inclua o campo `DICA_RAPIDA` no card. O formato varia por camada:
   - C1 (IA genérica): prompt básico + input + uso diário
   - C2 (automação): template pronto / workflow de exemplo
   - C3 (humano-agente): prompt + contexto + interação
   - C4 (open-source): link para demo / trial / comando Docker
   Ver `references/ferramentas.md` seção "Como apresentar". Pesquise na web.
   Isso permite a pessoa testar em 5 minutos — e ver o valor de me contratar para
   implementar de verdade.
9. Mantenha o CSS e a estrutura visual intactos — a marca (creme/terracota, DM Serif +
   Inter, assinatura "Sob medida, Cali") é parte da entrega.
10. **Ordem das seções:** siga exatamente a ordem do template. Não antecipe, remova ou
   adicione seções. Se uma seção não tiver conteúdo (ex.: sem itens para um quadrante),
   deixe o label padrão — não remova a seção inteira.
11. **Estrutura HTML:** não adicione divs, classes, estilos ou scripts fora do que já
   existe no template. Não troque tags por equivalentes visuais. A estrutura HTML é
   parte do padrão visual.
12. Ao terminar, confira que abre no navegador e que imprime bem (a paginação A4 já está no CSS).
13. **Mostre o caminho absoluto no chat:** após gerar o arquivo, exiba no chat a mensagem:
    > "✅ Relatório salvo em:
    > `[caminho absoluto]/degustia-output/2026-07-22-cliente-estruturado.html`"
    Use `pwd` para montar o caminho absoluto. Não deixe de mostrar.

**Atenção — relatório do Sutil:**
- Deve entregar **valor real e acionável**: cada ganho rápido precisa terminar com um
  "Primeiro passo" que a pessoa possa EXECUTAR hoje ou nesta semana. Nada genérico.
- Incluir 1 linha de contraste 🌱 em cada ganho rápido ("Alternativa mais simples:...")
- Deve ser **conciso**: 1–2 ganhos, sem seções extras (sem matriz, sem primeiros resultados em 4 dias,
  sem ROI detalhado, sem bônus de processo, sem rotina diária).
- Deve **deixar a pessoa curiosa**: o tom é de "isto é só o começo — o Encorpado
  mostra o mapa inteiro". O convite ao final lista os 3 serviços pagos (ver Passo 6).

Não recrie o HTML do zero nem troque a paleta: os templates já refletem o site
`calionauta.github.io/sommelier-ia`.

## Passo 6 · Upsell honesto (o próximo passo do JTBD)

O upsell tem que gerar **desejo, não sensação de enganação**: ofereça o próximo passo real
do Job to be Done do cliente. Ver `references/metodologia.md` (seção "Upsell honesto").

**Preços:** todos os valores vêm exclusivamente de `references/config.yaml`. Nunca hardcode.

### Framing de crédito (NUNCA use a palavra "desconto")

Hormozi: desconto = fragilidade. Crédito = valor.

| ❌ Não use | ✅ Use |
|------------|-------|
| "Você ganha R$ 897 de desconto" | "Seu investimento no Encorpado é integralmente aplicado como crédito" |
| "Promoção exclusiva" | "É minha forma de reconhecer que você já começou a jornada" |
| "Preço promocional" | "Valor abatido da primeira mensalidade" |

### Regras de abatimento (mesmas para todos os relatórios)

Quem já contratou o **Encorpado** tem o valor (R$ `servicos.estruturado.preco` de `config.yaml`)
abatido de:
1. **Concierge** → primeira mensalidade: R$ `concierge_ai.preco` - R$ `estruturado.preco`
2. **Complexo** → crédito aplicado ao valor combinado

**Framing usado no relatório:**
> "Seu investimento no Encorpado não é uma despesa: é um crédito.
> O valor é integralmente aplicado no Concierge ou no Complexo. Você não paga duas vezes pela degustação."

### Conteúdo do upsell por tipo de relatório

- **No relatório do Sutil:** convite que lista os 3 serviços pagos como opções:
  1. **Encorpado** (R$ `servicos.estruturado.preco`) — a ficha de degustação completa.
     "Isso é só o começo. O Encorpado mostra o mapa inteiro com matriz, contraste de
     abordagens, primeiros resultados em 4 dias e projeção de ROI."
  2. **Concierge** (R$ `concierge_ai.preco`/mês) — acompanhamento contínuo.
     "O Concierge é o próximo passo natural se você quiser acompanhamento na implementação."
  3. **Complexo** (a combinar) — para projetos ou fluxos coletivos. Mapeamento, implementação e marcos combinados.
  Informe o abatimento do Encorpado em todos.

- **No relatório do Encorpado:** convite para o **Concierge** (principal) + menção
  do **Complexo** (para projetos ou fluxos coletivos).
  O convite inclui:
  - O que o Concierge entrega (ver `config.yaml` → `concierge_ai.descricao_completa`)
  - O preço: "R$ 1.897/mês"
  - O abatimento: "Quem contratou o Encorpado tem R$ 897 abatido da primeira mensalidade
    — primeiro mês por R$ 1.000"
  - A garantia em 2 camadas:
    > "Cancele quando quiser, sem multa, sem fidelidade. E se em 60 dias
    > você participou das sessões e não recuperou o investimento em horas
    > economizadas, devolvo 100% do valor pago."

  **Tom:** O concierge não é urgência — é o próximo passo quando o cliente sentir que
  implementar sozinho vai ser mais lento ou mais difícil do que ter acompanhamento.

- **Progressão explícita:** cada relatório deixa claro qual o próximo passo natural.
  Inclua uma linha como:
  > "**Próximo passo:** quando a degustação mostrar que você quer ir além,
  > o [Concierge / Encorpado] é o caminho natural."

---

## Passo 7 · Pré-voo: verificar antes de entregar

Antes de exibir o relatório, passe esta checklist. Se falhar qualquer item,
corrija antes de entregar:

- [ ] Nenhum `[[` restante no HTML (todo marcador foi preenchido)
- [ ] Nenhuma instrução "consulte a Cali", "pergunte ao usuário" ou similar no texto do relatório
- [ ] Preços vieram de `references/config.yaml` (nunca hardcode)
- [ ] Se `concierge_ai.preco` é `null` e Cali não respondeu: o preço não aparece no relatório (nem placeholder)
- [ ] Pelo menos 1 citação literal do transcript no relatório (Encorpado: 2–4)
- [ ] ROI está em **faixa** (ex.: "4–7 h/semana"), não em número cravado
- [ ] O relatório abre no navegador (visual rápido) — CSS e estrutura intactos
- [ ] O convite final não tem valor inventado (conferir `config.yaml`)
- [ ] Se é Encorpado, o bônus de processo está presente (mesmo que versão leve)
- [ ] Se é Sutil, não tem matriz, ROI detalhado, bônus de processo ou rotina diária
- [ ] Se é Encorpado, cada card de ferramenta tem:
  - [ ] Linha de contraste 🌱 (Alternativa mais simples)
  - [ ] Linha de contraste ⚡ (Alternativa mais avançada)
  - [ ] Rotina diária 📅 (passo a passo)
  - [ ] Links verificados na web (datados com mês/ano)
- [ ] Se é Sutil, cada ganho rápido tem 1 linha de contraste 🌱
- [ ] Toda ferramenta `[Pensamento]` ou com consequência significativa tem o campo `TOQUE_HUMANO` preenchido no card
- [ ] Callout "💡 Uma coisa importante" aparece ANTES das recomendações no Encorpado
- [ ] Lista de suposições foi comunicada no chat para Cali validar (Passo 3)
- [ ] Todos os links foram pesquisados na web — nenhum link inventado
- [ ] A assinatura fecha com "Sob medida, Cali · Brasil"
- [ ] Caminho absoluto do relatório foi exibido no chat para Cali (Passo 5.13)

## Regras de ouro

- **Nunca invente evidências.** Toda economia de tempo/dinheiro precisa de base no transcript
  ou em fonte pesquisada. Sem base → faixa mais conservadora ou "a validar".
- **Sempre em faixas.** Horas e reais aparecem como intervalo (ex.: "4–7 h/semana",
  "R$ 1.500–3.000/mês"), nunca como número cravado.
- **Simples primeiro, integrado ao que já existe.** Menos ferramentas, mais resultado.
- **Suposições sempre explícitas.** O cliente precisa distinguir fato de hipótese.
- **Preços centralizados.** Todo valor de serviço está em `references/config.yaml`.
  NUNCA hardcode valores de serviço no HTML ou no texto — sempre leia de `config.yaml`.
- **Citações literais.** Extraia do transcript e distribua no relatório. Elas são a
  prova social de que você ouviu de verdade.
- **pt-br**, tom da Cali: acolhedor, direto, sem hype, sem promessas mágicas. Fecha com
  "Sob medida, Cali · Brasil".
- **Honestidade no upsell.** Valor real, transparência de preço, zero pegadinha.

## Voz e tom

Espelhe o site: caloroso, artesanal, confiante sem ser vendedor. Frases curtas. Foco no dia a
dia do cliente, não na tecnologia. A IA é meio, não fim. Evite jargão; quando um termo técnico
for inevitável, explique em uma linha.

## Test Cases

### Deve ativar
- "analisa essa entrevista que tive com um cliente"
- "monta o relatório do diagnóstico de IA do João"
- "faz a ficha de degustação desse transcript"
- "resume essa call e sugere ferramentas"
- "preciso do relatório da curadoria sommelier"

### Não deve ativar
- "escreve um post sobre IA para o LinkedIn" (é conteúdo, não diagnóstico)
- "cria uma landing page para o meu serviço" (é site, não relatório de cliente)
- "analyze this code and find bugs" (é código, não transcript de cliente)
- "traduz este texto para inglês" (é tradução, não diagnóstico)
