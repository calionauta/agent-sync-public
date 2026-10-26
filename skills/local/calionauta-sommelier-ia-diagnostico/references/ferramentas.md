# Catálogo de ferramentas — classificação por nível de investimento

> Preços, planos gratuitos e disponibilidade de recursos **mudam com frequência**. Sempre
> confirme na web (WebSearch/WebFetch) o que for citar como preço ou como "tem plano grátis"
> no mês/ano atual. Este catálogo é um guia de *quando usar o quê*, não uma tabela de preços.
>
> Leia também `references/tool-caveats.md` para notas estáveis sobre restrições geográficas
> e planos necessários.

## Antes da árvore: é ferramenta ou processo?

Pergunte: a origem dessa dor é falta de ferramenta ou pode ser processo/burocracia?
Se o transcript indicar processo confuso, burocracia, retrabalho por falta de clareza
ou "jeito que sempre foi feito", considere o **Bônus de Processo e Cultura**
(ver SKILL.md Passo 2.5 e `references/bonus-processo.md`) como complemento — ele pode
ser apresentado antes, depois, ou no lugar de uma recomendação de ferramenta quando a
natureza do problema for claramente de processo.

**Regra:** se a dor for de processo, o experimento seguro para falhar é a recomendação
principal; a ferramenta é coadjuvante. Se a dor for de ferramenta, siga a árvore abaixo
normalmente.

## Avaliação: estocástico ou determinístico?

Antes de escolher ferramentas, avalie: **a tarefa precisa de julgamento/nuance (estocástico)
ou de regras fixas/previsibilidade (determinístico)?**

| A tarefa… | Então prefira… | Categoria |
|---|---|---|
| Varia a cada execução, precisa de contexto, tom, julgamento | **IA** (modelo de linguagem) — flexível, mas mais cara por execução | Estocástico |
| Mesma estrutura, regras bem definidas, passos fixos | **Automação** (workflow/script) — mais barata, previsível, zero alucinação | Determinístico |
| Parte análise, parte ação | **IA + automação** combinados — IA decide/analisa, automação executa | Híbrido |

**Regra de token:** automação custa quase zero por execução depois de configurada.
IA custa token a cada chamada. Para tarefas de alto volume, automação SEMPRE vence.
Para tarefas de baixo volume que exigem nuance, IA é a escolha certa.

**Custo real: setup + operação.** A escolha não é só técnica — é econômica:

| | IA (prompt) | Automação (workflow/API) |
|---|---|---|
| Setup | Minutos (escrever um prompt) | Horas/dias (configurar integrações) |
| Custo por execução | Médio-alto (cada chamada gasta token) | Quase zero (API calls são baratas) |
| Velocidade de entrega | Imediata | Depende do setup |
| Melhor para | Volume baixo-médio, tarefas que mudam | Volume alto, tarefas estáveis |

**Ponto de virada:** se a tarefa se repete +20x/semana, a automação se paga em semanas
de economia de token. Se é <5x/semana, a IA via prompt é mais barata no custo total
(setup + operação).

**Para clientes que já têm ChatGPT ou Claude:** a IA é ainda mais vantagem porque o
custo de setup é ZERO (já tem a ferramenta e sabe usar). Só considere automação se
o volume for alto OU se a tarefa exigir integração com sistemas que o chat não alcança.
A automação pode ser mais barata por execução, mas NÃO é mais rápida de aplicar para
quem já está dentro do ecossistema de IA de chat.

**Exemplos de classificação:**
- "Responder e-mail de reclamação" → estocástico (precisa de tom, contexto, julgamento)
- "Extrair dados de nota fiscal e lançar na planilha" → determinístico (regras fixas)
- "Classificar lead como quente/frio/morno" → determinístico se regras claras,
  estocástico se precisa interpretar texto livre
- "Resumir reunião e enviar para o time" → híbrido (IA resume, automação dispara o e-mail)

## Árvore de decisão

Cada ferramenta está listada no seu **nível de investimento mais comum** — quanto tempo,
dinheiro e aprendizado o cliente precisa comprometer.

```
PASSO 1: A dor é de ferramenta ou de processo/burocracia?
  → Processo → Bônus de Processo e Cultura (SKILL.md Passo 2.5)
  → Ferramenta ↓

PASSO 2: A tarefa é estocástica (precisa de IA) ou determinística (dá pra automatizar)?
  → Estocástica → comece pelos Níveis 1-2. Só suba para Nível 4 se precisar
    de agente de time.
  → Determinística → vá para Nível 3 (fluxos). Só suba para Nível 5 se precisar
    de self-host.
  → Híbrida → IA no nível adequado + automação no nível adequado.

PASSO 3: Qual o nível de investimento que o cliente está disposto a fazer?
  Comece pelo nível mais baixo que resolve o problema. Só suba se não for suficiente.
```

## Nível 1 — Teste em 5 min

**Investimento:** zero. O cliente já tem a ferramenta ou pega grátis em segundos.

- **[IA] ChatGPT** — Chat para tarefas pontuais. **Custom GPTs** para assistente
  reutilizável com instruções fixas (ex.: responder e-mails, gerar descrições).
- **[IA] Claude** — Chat; **Projects** para contexto recorrente.
- **[IA] Gemini** — Chat; integração nativa com Google Workspace (Gmail, Docs, Drive).
- **[IA] Scheduled Tasks** — Tarefas agendadas nos planos pagos das IAs acima.
  Ideal para recorrência: resumo semanal, lembrete, relatório.

**Regra Skills:** para QUALQUER recomendação deste nível, avalie se uma
**Skill / Custom GPT / Gem** pode tornar o processo mais determinístico.
Skills empacotam instruções, exemplos e workflows num assistente reutilizável.

**Dica de scripts em Skills:** sugira usar **scripts de código nas referências/ações**
da Skill para mais determinismo e economia de tokens. O código faz a lógica repetitiva;
o LLM só entra no que exige linguagem natural. Na `DICA_RAPIDA`, inclua como pedir
para a IA criar esse script: "Peça à IA: 'Crie um script [linguagem] que estrutura a
saída como [formato].'"

### DICA_RAPIDA — Nível 1

Prompt básico para copiar e colar + input necessário + como usar no dia a dia.
Pesquise docs oficiais para confirmar sintaxe.

Ex.: "Prompt: 'Resuma este e-mail em 3 tópicos e sugira resposta.' Cole o e-mail
no Custom GPT. Ele já conhece seu tom de resposta."

## Nível 2 — Configure e use

**Investimento:** baixo. Configura uma vez (minutos), usa para sempre. Zero código.

- **[IA] Custom GPT (ChatGPT)** — Assistente com instruções fixas, arquivos de
  referência, e ações configuradas.
- **[IA] Claude Skill** — Processo empacotado com instrução, formato de saída e
  (opcional) scripts de código. Determinístico, repetível.
- **[IA] Gem (Gemini)** — Assistente salvo no ecossistema Google.
- **[IA] Claude Cowork** — Agente autônomo em cima de documentos (PDFs, contratos,
  pesquisas). Ideal para análise individual.
- **[IA] Scheduled Tasks** — Tarefa agendada recorrente. Pode incluir IA ou não.

### DICA_RAPIDA — Nível 2

Instrução/configuração básica para criar a Skill + input que o cliente precisa
fornecer (texto, arquivos, exemplos). Pesquise docs oficiais.

Ex.: "Crie um Custom GPT com as instruções: 'Você é um assistente de vendas que
responde no tom da empresa.' Suba 3 e-mails de exemplo como referência. Teste
com um e-mail real."

## Nível 3 — Automatize fluxos

**Investimento:** médio. Conecta sistemas com workflows visuais. A pessoa ou
um não-técnico consegue manter.

- **[Automação] Zapier** — 750+ integrações, cloud, zero setup técnico. Ideal
  quando não há ninguém técnico. Mais caro em escala.
- **[Automação] n8n (cloud)** — Workflows visuais conectando apps/APIs.
  Versão cloud gratuita limitada. Prefira sobre Zapier se puder manter.
- **[Automação] Windmill (cloud)** — Scripts + fluxos + painéis internos.
  Versão cloud gratuita. Requer mais conhecimento que n8n.
- **[Infra] Chatwoot** — Centraliza atendimento ao cliente de múltiplos canais
  (e-mail, chat, WhatsApp, Instagram, Telegram) num só lugar. Open-source, cloud
  ou self-host. Alternativa open-source a Intercom/Zendesk. Útil quando a dor é
  "mensagens espalhadas em vários lugares" — não é IA, mas organiza o fluxo antes
  de automatizar. (Verificar plano cloud gratuito em chatwoot.com.)

### DICA_RAPIDA — Nível 3

Template pronto / workflow de exemplo / configuração inicial em 2 passos.
Pesquise na web se há template oficial ou community workflow.

Ex.: "No n8n, importe este workflow: [link da web]. Conecte Gmail + Planilhas
e clique em 'Execute'. Leva 10 min para configurar."

## Nível 4 — Adote um agente de equipe

**Investimento:** médio-alto. Agente compartilhado no time, com memória,
canais e delegação. Requer plano pago (Team/Enterprise).

- **[IA] Claude Tag** — Claude como membro do time dentro do Slack. Aprende
  com os canais, age assincronamente, modo ambiente. Requer Claude Team/Enterprise.
  Alternativa direta aos Workspace Agents.
- **[IA] ChatGPT Workspace Agents** — Agentes que rodam workflows em segundo plano
  e atuam em canais (Slack, ChatGPT). Requer ChatGPT Business/Enterprise.
  Alternativa direta ao Claude Tag.
- **[Híbrido] Mercury Agent (cloud)** — Agente multi-canal (CLI, Telegram, Discord,
  Slack, Signal) com skill system, autopilot, second brain. Oferece versão cloud.
  Alternativa open-source a Claude Code/Codex.

### DICA_RAPIDA — Nível 4

Prompt + contexto + como configurar o canal e delegar tarefas. Para Tag/Workspace
Agents: como o admin configura o agente no canal.

Ex.: "No Claude Tag, um admin conecta o @Claude ao canal #suporte no Slack.
Qualquer pessoa do canal pode digitar '@Claude analise os tickets prioritários'.
O agente aprende com o histórico do canal."

## Nível 5 — Host próprio

**Investimento:** alto. Instala, mantém infra, atualiza. Só para quem tem
equipe técnica ou o próprio cliente é técnico.

- **[Automação] n8n (self-host)** — Mesmo que o Nível 3, mas na sua infra.
  Total controle, sem limites de execução.
- **[Automação] Windmill (self-host)** — Mesmo que o Nível 3, mas na sua infra.
- **[Híbrido] multica.ai** — Orquestração/automação com IA. Agentes e fluxos.
  (Confirmar planos atuais na web — muda com frequência.)
- **[Híbrido] eigent.ai** — Agentes e automação com IA.
  (Confirmar planos atuais na web — muda com frequência.)
- **[Híbrido] Mercury Agent (self-host)** — Instalação via npm ou binary.
  Roda 24/7 como daemon. Alternativa open-source completa.
  (Verificar docs em mercuryagent.sh.)
- **[Híbrido] RunFusion (Fusion)** — Orquestrador multi-agente open-source (MIT).
  Agents plan, code, review, and ship software em worktrees isolados.
  Requer npm/node, git, e conhecimento de desenvolvimento de software.
  Não é ferramenta de automação de negócios — é para times que constroem software.
  (Verificar docs em runfusion.ai.)

### DICA_RAPIDA — Nível 5

Link para demo cloud / trial gratuito / comando Docker / npm install inicial.
Confirme na web se há ambiente de teste gratuito.

Ex.: "Teste grátis em [url da web] sem instalar nada. Se fizer sentido para
o dia a dia, podemos configurar o self-host juntos."

## Como apresentar cada ferramenta no relatório

Cada card de ferramenta no relatório completo tem 6 campos:

| Campo | Marcador `[[ ]]` | Obrigatório? | O que preencher |
|-------|-------------------|-------------|-----------------|
| **Nome** | `NOME_DA_FERRAMENTA` | Sim | Do catálogo acima. Inclua o tipo `[IA]`, `[Automação]` ou `[Híbrido]` no nome. |
| **Conexão com o caso** | `PARA_QUE_SERVE_NO_CASO_DELE_1_FRASE` | Sim | **Por que esta ferramenta para esta pessoa?** Conecte ao que ela disse no transcript. Inclua, em 1 linha, o racional econômico: se o volume for baixo, justifique IA ("~3x/semana — não compensa automatizar"); se alto, justifique automação ("30x/dia — o setup se paga em semanas"). Ex.: "Você mencionou que perde 2h/dia classificando e-mails — para este volume alto, esta ferramenta [Automação] se paga rápido." |
| **Custo** | `CUSTO_ou_Grátis` | Sim | Faixa ou "grátis". Confirmado na web (WebSearch). |
| **Setup** | `ESFORÇO_ex_baixo` | Sim | "baixo" / "médio" / "alto" ou número de dias. |
| **Economia** | `FAIXA_HORAS_ex_2–3 h/sem` | Sim | Faixa de horas/semana (ver `calculo-roi.md`). |
| **Dica rápida** | `DICA_RAPIDA` | Sim (todo nível) | Formato varia por nível. Ver seção DICA_RAPIDA de cada nível acima. |

Regras para a dica:
- **Propósito:** dar um gostinho de 5 minutos — não é tutorial de instalação.
  A pessoa prova o valor agora; a implementação completa é o que o upsell do
  Concierge / Consultoria resolve (Passo 6 do SKILL.md).
- **Tamanho:** Níveis 1-2 → 2-4 linhas (teste rápido). Níveis 3-5 → até 6 linhas
  (cabe um link de template ou comando de instalação simples).
- Se a dica precisar de mais linhas que isso, não é mais "dica rápida" — é manual
  de setup. Nesse caso, resuma ao mínimo para testar e deixe o resto para o upsell.
- **Pesquise na web** a documentação oficial para links de templates, preços de trial,
  sintaxe de prompts.
- **Nunca invente link ou template.** Se não encontrar na web, escreva uma dica genérica
  funcional (ex.: "Crie um novo Custom GPT com as instruções abaixo e teste com um caso real.").
- **Tom:** "teste você mesmo" — não "eu faço por você". A oferta de implementação vem
  no upsell.

**Regra de ouro:** "conexão com o caso" é o campo mais importante do card. Se a LLM
escrever algo que serviria para qualquer cliente, está errado. Cada card deve ser tão
específico que o cliente se reconheça imediatamente.
