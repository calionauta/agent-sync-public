# Catálogo de ferramentas — classificação por nível de investimento

> Preços, planos gratuitos e disponibilidade de recursos **mudam com frequência**. Sempre
> confirme na web (WebSearch/WebFetch) o que for citar como preço ou como "tem plano grátis"
> no mês/ano atual. Este catálogo é um guia de *quando usar o quê*, não uma tabela de preços.
>
> Leia também `references/tool-caveats.md` para notas estáveis sobre restrições geográficas
> e planos necessários.

## Padrão de entradas do catálogo

### Tags por tipo de problema

Cada ferramenta tem uma tag `[Tipo]` que classifica *qual problema resolve*,
não qual tecnologia usa. Isso ajuda a LLM a recomendar pela necessidade do
cliente (ex.: "precisa coletar dados" → `[Formulário]`).

| Tag | Resolve | Exemplos |
|-----|---------|----------|
| `[IA]` | Tarefas de linguagem, raciocínio, análise | ChatGPT, Claude, Gemini, Custom GPT, Claude Skill, Cowork, Tag, Workspace Agents |
| `[Pensamento]` | Análise crítica, pesquisa, comparação, descoberta de gaps, segunda opinião | Claude Projects, ChatGPT Deep Research, Perplexity, NotebookLM |
| `[Automação]` | Fluxos determinísticos, integração entre sistemas | Zapier, n8n, Windmill |
| `[Agente]` | Agentes de IA autônomos que atuam em múltiplos canais | Mercury Agent |
| `[Orquestrador]` | Plataformas que orquestram agentes e/ou combinam IA com automação | multica.ai, eigent.ai |
| `[Dev]` | Ferramentas para times de desenvolvimento de software | RunFusion |
| `[Base]` | Dados estruturados compartilhados | Airtable, Baserow, Fibery |
| `[Wiki]` | Documentação viva, conhecimento | Notion, KiwiFS |
| `[Formulário]` | Coleta de dados de clientes/público | Tally |
| `[Agenda]` | Agendamento de reuniões | Google Agenda Booking Page, Cal.com |
| `[Atendimento]` | Centralização de mensagens de clientes | Chatwoot |
| `[Gateway]` | Proxy, roteamento e governança entre agentes e sistemas | Executor, Bifrost |

### Campos de cada entrada

| Campo | Obrigatório | Para quê |
|-------|-------------|----------|
| `**O que faz**` | Sim | Propósito central em 1–2 linhas |
| `**Quando usar**` | Sim | Cenário ideal — é o que decide a recomendação |
| `**Diferencial**` | Não | Só quando há alternativa direta no mesmo nível |
| `**Quando evitar**` | Não | Só quando há armadilhas conhecidas (preço, limitação técnica, região) |

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

## Avaliação: execução ou pensamento? estocástico ou determinístico?

Antes de escolher ferramentas, duas perguntas em sequência:

**Pergunta 1: A tarefa é de EXECUÇÃO (fazer algo acontecer) ou de PENSAMENTO (analisar/decidir)?**
- **Execução** → segue para a pergunta 2 (estocástico vs. determinístico)
- **Pensamento** → modelos de IA com capacidade crítica + ferramentas de pesquisa. O valor está no questionamento, não na velocidade. Nestes casos, o "toque humano" (validação humana) é especialmente importante — a IA amplia o repertório, mas a decisão final é da pessoa.

**Pergunta 2: A tarefa precisa de julgamento/nuance (estocástico) ou de regras fixas/previsibilidade (determinístico)?**

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
- **"Pesquisar concorrentes e comparar suas ofertas com a minha" → Pensamento (IA crítica — o valor está em encontrar o que eu não sabia que existia)**
- **"Revisar um relatório de diagnóstico apontando inconsistências e lacunas" → Pensamento (IA como segundo par de olhos crítico)**
- **"Listar alternativas que ainda não considerei para um problema do cliente" → Pensamento (IA como ampliadora de repertório, não executora)**

## Árvore de decisão

Cada ferramenta está listada no seu **nível de investimento mais comum** — quanto tempo,
dinheiro e aprendizado o cliente precisa comprometer.

```
PASSO 1: A dor é de ferramenta ou de processo/burocracia?
  → Processo → Bônus de Processo e Cultura (SKILL.md Passo 2.5)
  → Ferramenta ↓

PASSO 1.5: A tarefa é de EXECUÇÃO (fazer algo acontecer) ou de PENSAMENTO
           (analisar, questionar, decidir)?
  → Pensamento → IA com capacidade crítica (Nível 1-2) + TOQUE HUMANO
    (validação, decisão final). A IA amplia o repertório, a pessoa decide.
  → Execução → ↓

PASSO 2: A tarefa é estocástica (precisa de IA) ou determinística (dá pra automatizar)?
  → Estocástica → comece pelos Níveis 1-2. Só suba para Nível 4 se precisar
    de agente de time.
  → Determinística → vá para Nível 3 (fluxos). Só suba para Nível 5 se precisar
    de self-host.
  → Híbrida → IA no nível adequado + automação no nível adequado.

PASSO 3: A tarefa de execução tem consequência significativa se errar?
  (envio de e-mail para cliente errado, alteração em dado financeiro,
  resposta pública em canal oficial)
  → Sim → inclua TOQUE HUMANO (revisão antes da execução)
  → Não → pode rodar autônomo

PASSO 4: Qual o nível de investimento que o cliente está disposto a fazer?
  Comece pelo nível mais baixo que resolve o problema. Só suba se não for suficiente.
```

## Nível 1 — Teste em 5 min

**Investimento:** zero. O cliente já tem a ferramenta ou pega grátis em segundos.

- **[IA] ChatGPT** — Chat + assistente personalizável com memória e conhecimento.
  **O que faz:** assistente de IA conversacional para texto, análise, resumo,
  geração de conteúdo e raciocínio. Custom GPTs empacotam instruções fixas e
  arquivos de conhecimento. Planos Team/Enterprise adicionam knowledge base
  corporativa que o modelo consulta automaticamente.
  **Quando usar:** cliente precisa de IA genérica para tarefas variadas de
  texto — responder e-mails, resumir reuniões, gerar conteúdo, analisar
  documentos. Ideal como porta de entrada (todo mundo conhece).
  (Planos: Free limitado, Plus ~US$20/mês.)
- **[IA] Claude** — Assistente de IA com foco em análise longa e precisão.
  **O que faz:** modelo de IA para conversação, análise de documentos longos,
  escrita e raciocínio. Projects permitem contexto recorrente com knowledge
  base (upload de PDFs, docs, código como referência fixa do projeto).
  **Quando usar:** cliente precisa analisar documentos longos (contratos,
  relatórios, pesquisas) ou quer um assistente com contexto persistente
  que entenda o negócio dele. Diferencial: janela de contexto longa.
  (Planos: Free limitado, Pro ~US$20/mês.)
- **[IA] Gemini** — Assistente integrado ao Google Workspace.
  **O que faz:** IA conversacional do Google, nativa no ecossistema Google
  (Gmail, Docs, Drive, Calendar). Gems são assistentes salvos com instruções
  e arquivos de conhecimento.
  **Quando usar:** cliente vive dentro do Google Workspace e quer IA sem sair
  do ecossistema — resumir e-mails, analisar Docs, criar conteúdo a partir
  de arquivos do Drive. Diferencial: integração nativa com Google.
  (Planos: Free com recursos limitados.)
- **[IA] Scheduled Tasks** — Tarefas de IA recorrentes sem intervenção.
  **O que faz:** executa prompts em segundo plano em horário fixo — resumo
  semanal, varredura de e-mail, relatório diário, lembrete agendado.
  Disponível nos planos pagos das IAs acima (ChatGPT Scheduled Tasks,
  Claude cron).
  **Quando usar:** cliente tem tarefas mentais que se repetem em horário
  fixo e quer automatizar sem configurar workflow técnico.
- **[Wiki] Notion** — Workspace all-in-one com docs, wikis e databases.
  **O que faz:** plataforma de documentação e gestão com editor rich text,
  bases de dados embutidas (tabelas, kanban, calendário), wiki com links
  e templates. Muito usado para documentação interna e gestão de projetos.
  **Quando usar:** cliente precisa de wiki/docs compartilhados e já usa
  Notion ou quer algo simples sem aprender ferramenta nova. Ideal para
  documentação, notas de reunião, base de conhecimento leve.
  **Quando evitar:** volume alto de dados (milhares+ registros), dados
  estruturados que exigem relações complexas, CRM ou inventário pesado —
  prefira Airtable (Nível 2) ou Fibery (Nível 2).
  (Planos: Free com limites, Team pago por membro.)
- **[Formulário] Tally** — Criador de formulários gratuito, sem código.
  **O que faz:** formulários online bonitos e funcionais (contato, pesquisa,
  lead gen, inscrição, pagamento) com editor tipo Notion — só digitar as
  perguntas. Condicional, calculadora, assinatura, upload, notas.
  **Quando usar:** cliente precisa coletar dados de clientes, leads ou
  equipe sem pagar por Typeform/Jotform. Ideal para formulário de contato,
  pesquisa de satisfação, briefings, quizzes.
  **Diferencial:** grátis de verdade (ilimitado), sem plano pago obrigatório.
  Privacidade (GDPR, Europa). Pode embutir em qualquer site.
  (Web: tally.so. Sem self-host — SaaS.)
- **[Agenda] Google Agenda (Booking Page)** — Página de reserva nativa do Google Calendar.
  **O que faz:** link de agendamento integrado ao Google Calendar com detecção de fuso,
  lembrete automático e conferência Google Meet. Grátis com conta Google.
  **Quando usar:** cliente já usa Google Workspace e quer um link de agendamento sem
  aprender ferramenta nova. Setup em 2 minutos em google.com → "Criar página de reserva".
  **Diferencial:** zero configuração para quem já está no ecossistema Google. Nos planos
  pagos do Google Workspace, a página de reserva também aceita pagamento do cliente no
  momento do agendamento (via Google Pay / Stripe integrado).
  **Quando evitar:** precisa de pagamento sem plano Workspace pago, customização profunda
  de branding, múltiplos tipos de evento com durações diferentes, ou self-host — aí
  prefira Cal.com.
  (Web: workspace.google.com/resources/appointment-scheduling. Grátis com conta Google.)
- **[Agenda] Cal.com** — Agendamento de reuniões open-source.
  **O que faz:** link de booking que sincroniza com calendário (Google,
  Outlook, Apple), detecta fuso, envia lembretes, suporta pagamentos
  (Stripe) e vídeo (Zoom, Google Meet, Cal Video). Alternativa open-source
  ao Calendly.
  **Quando usar:** cliente precisa de link de agendamento sem vai e volta
  de e-mails. Ideal para consultores, prestadores de serviços, times de
  vendas/suporte. Grátis para uso individual.
  **Diferencial:** código aberto (AGPLv3), plano free generoso (ilimitado),
  pode self-host (Nível 5) para controle total de dados.
  (Cloud: cal.com. Self-host: GitHub. Planos: Free ilimitado, Teams pago.)

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

- **[IA] Custom GPT (ChatGPT)** — Assistente sob medida com conhecimento fixo.
  **O que faz:** versão configurada do ChatGPT com instruções, arquivos de
  conhecimento e ações (APIs) que definem comportamento e escopo.
  **Quando usar:** cliente já usa ChatGPT e precisa de um assistente
  especializado num tema (ex.: suporte, drafting de propostas) sem
  repetir contexto toda vez. Determinístico, reutilizável.
- **[IA] Claude Skill** — Processo empacotado com instrução e formato.
  **O que faz:** assistente configurado no Claude com instruções fixas,
  formato de saída definido e (opcional) scripts de código nas actions
  para lógica determinística.
  **Quando usar:** cliente já usa Claude e quer um processo repetível
  sem risco de alucinação de formato. Útil para extração estruturada,
  classificação, geração de relatórios no mesmo formato sempre.
- **[IA] Gem (Gemini)** — Assistente salvo no ecossistema Google.
  **O que faz:** versão configurada do Gemini com instruções fixas
  e arquivos de conhecimento. Integrado ao Google Workspace.
  **Quando usar:** cliente vive no Google Workspace e quer um assistente
  persistente que entenda seu contexto de negócio. Determinístico,
  reutilizável.
- **[IA] Claude Cowork** — Agente autônomo com contexto da empresa.
  **O que faz:** agente que usa a knowledge base do Project como contexto
  (PDFs da empresa, docs, base de conhecimento). Autônomo para análise
  individual de contratos, pesquisas e documentos internos.
  **Quando usar:** cliente precisa de uma análise aprofundada de documentos
  longos com contexto do negócio, sem intervenção humana guiando o chat.
- **[IA] Scheduled Tasks** — Mesmo conceito do Nível 1, disponível nos planos
  pagos. A diferença é que aqui pode ser configurada com maior frequência
  e com scripts/actions nas Skills.
- **[Base] Airtable** — Planilha-relacional como serviço (SaaS). Interface de
  planilha com banco de dados relacional por baixo. Ideal para CRM leve,
  gestão de projetos, inventário e dados estruturados que não cabem em planilha
  comum mas não justificam um banco de verdade.
  **Quando usar:** cliente precisa de base compartilhada com formulários,
  views (kanban, calendário, grid) e automações simples sem escrever código.
  **Quando evitar:** volume acima de 100k registros (limitante), dados
  sensíveis que não podem sair do país (SaaS americano), orçamento apertado
  (planos pagos por membro).
    (Planos: Free com 1k registros/base, Team ~US$20/mês por membro.)

- **[Base] Baserow** — Base de dados open-source (MIT), PostgreSQL nativo,
  alternativa self-host ao Airtable. Interface de planilha com banco relacional,
  views (grid, kanban, calendário, timeline), formulários, pesquisas, construtor
  de aplicativos e automações visuais.
  **O que faz:** organiza dados estruturados em bases compartilhadas com múltiplas
  visualizações, permissões granulares, API REST completa e webhooks. Suporta
  importação de Airtable, CSV, Excel, JSON e XML.
  **Diferencial:** ao contrário de Airtable, é open-source (MIT) e pode ser
  self-hostado via Docker para controle total de dados — sem limites de linhas
  ou armazenamento na versão self-host. Tem construtor de aplicativos próprio
  (não apenas base de dados) e assistente de IA (Kuma) que monta a estrutura
  do zero por descrição em linguagem natural.
  **Casos de uso:** base de dados compartilhada, CRM leve, gestão de projetos,
  inventário, formulários de coleta — especialmente quando o cliente não quer
  depender de SaaS americano ou precisa de dados sensíveis sob controle.
  **Quando usar:** cliente precisa de base de dados visual tipo Airtable mas
  quer opção de self-host, ou tem dados sensíveis que não podem sair do país,
  ou quer evitar custo por usuário do Airtable.
  **Quando evitar:** cliente não tem capacidade técnica para self-host e o
  plano cloud gratuito (3k linhas/workspace) for insuficiente; precisa de CRM
  com modelo de vendas já estruturado (prefira um CRM de verdade).
  (Cloud gratuita em baserow.io: 3k linhas, 2GB de armazenamento, 2k créditos
  de automação, 500 usuários externos, views grid/form/gallery. Premium
  ~US$10/user/mês. Self-host via Docker: github.com/baserow/baserow.)

- **[Base] Fibery** — Plataforma de workspace que constrói **qualquer sistema**
  de negócio sob medida (CRM, gestão de projetos, inventário, RH, processos) sem
  código. Documentos + banco de dados relacional visual + gestão de projetos num
  só lugar. Interface de planilha com relations, formulários, views (kanban,
  calendário, timeline, Gantt) e automações.
  **Diferencial:** ao criar a conta, a IA do Fibery pergunta sobre seu negócio e
  **monta todo o sistema customizado na hora** — tabelas, relations, views,
  automações — sem precisar configurar nada manualmente. Além disso, usa um modelo
  de dados relacional real com entidades, relations e computed fields (não é
  planilha com esteroides). Ideal para PMEs que precisam de um único ambiente
  para tudo, sem pagar por ferramentas separadas.
  **Quando usar:** cliente precisa de sistema de gestão sob medida (CRM no lugar
  de planilha, gestão de projetos, etc) mas não quer self-host nem configurar do
  zero; tem processos que misturam docs e dados; equipe de até 10 pessoas (plano
  free grátis). A IA do Fibery gera o sistema num passe de mágica — ideal para
  quem não sabe por onde começar.
  **Quando evitar:** volume alto de registros (centenas de milhares), dados
  sensíveis que exigem self-host obrigatório, orçamento zero (free é generoso mas
  tem limites de espaço e automações).
  (Planos: Free para até 10 usuários, Team ~US$10/mês por membro. Sem self-host
  oficial — SaaS apenas. Web: fibery.io.)

- **[Wiki] KiwiFS** — Filesystem de Markdown para agentes e times.
  Um binary só, zero config. Cria uma base de conhecimento viva que agentes de IA
  (Claude Code, ChatGPT, Cursor, OpenCode) leem e escrevem via MCP (62 tools),
  REST, NFS, S3, WebDAV ou FUSE — e humanos acessam numa Web UI integrada.
  **O que faz:** um diretório de arquivos `.md` vira uma wiki com busca全文
  (BM25 + vetorial), links `[[wiki]]`, grafo de conhecimento, versão (git
  automático a cada escrita), queries DQL sobre frontmatter, e webhooks.
  **Quando usar:** cliente precisa de uma base de conhecimento compartilhada
  que agentes de IA possam consultar e atualizar — documentação interna,
  runbooks, atas de reunião, base de respostas do suporte. Ideal quando o
  time já usa markdown ou quer sair de ferramentas proprietárias (Notion,
  Confluence) sem perder a experiência de wiki.
  **Diferencial:** diferente de Notion/Confluence, agentes de IA escrevem
  nativamente (MCP nativo). Diferente de Obsidian, é servido e multi-usuário.
  Diferente de soluções SaaS, é self-host com um binary. Cada escrita vira
  commit git — auditoria imutável sem configurar nada.
  **Benefícios principais:** contexto composto entre sessões de IA (agente
  lê o que escreveu antes), humanos e agentes no mesmo repositório de
  markdown, busca híbrida (texto + vetor), 19 importadores (Notion, CSV,
  Postgres, Obsidian etc.), schema validation opcional.
  (Self-host via binary ou Docker. BSL 1.1 — gratuito para uso interno.
  GitHub: github.com/kiwifs/kiwifs. Docs: docs.kiwifs.com.)

### DICA_RAPIDA — Nível 2

Instrução/configuração básica para criar a Skill + input que o cliente precisa
fornecer (texto, arquivos, exemplos). Pesquise docs oficiais.

Ex.: "Crie um Custom GPT com as instruções: 'Você é um assistente de vendas que
responde no tom da empresa.' Suba 3 e-mails de exemplo como referência. Teste
com um e-mail real."

## Nível 3 — Automatize fluxos

**Investimento:** médio. Conecta sistemas com workflows visuais. A pessoa ou
um não-técnico consegue manter.

- **[Automação] Zapier** — Automatização no-code entre apps.
  **O que faz:** conecta 750+ apps com workflows visuais ("Zaps") sem
  escrever código. Dispara ações baseadas em eventos (e-mail, formulário,
  pagamento etc.).
  **Quando usar:** cliente quer automatizar integrações simples sem
  ninguém técnico. Setup rápido, mas fica caro em escala.
  **Quando evitar:** volume alto de execuções (planos pagos por task),
  ou quando há budget técnico para n8n/Windmill (mais baratos em escala).
- **[Automação] n8n (cloud)** — Workflows visuais conectando apps/APIs.
  **O que faz:** editor visual de fluxos com 400+ integrações e nós de
  código (JS/Python). Versão cloud gratuita limitada.
  **Quando usar:** cliente precisa de automação multi-etapa com lógica
  condicional e tem capacidade de manter a configuração. Prefira sobre
  Zapier quando o volume de execuções for médio/alto.
  **Alternativa self-host:** Nível 5, sem limites de execução.
- **[Automação] Windmill (cloud)** — Scripts + fluxos + painéis internos.
  **O que faz:** plataforma de automação com scripts (TS/Python/Go/Bash),
  workflows visuais e geração automática de UIs (painéis administrativos).
  Versão cloud gratuita generosa.
  **Quando usar:** cliente precisa não só de automação mas também de
  painéis internos (admin panels, dashboards) e tem quem saiba programar
  minimamente. Mais flexível que n8n, porém requer mais conhecimento.
  **Alternativa self-host:** Nível 5.
- **[Atendimento] Chatwoot** — Central de atendimento multicanal open-source.
  **O que faz:** unifica atendimento de e-mail, chat, WhatsApp, Instagram,
  Telegram e Facebook Messenger numa só interface. Open-source, cloud ou
  self-host.
  **Quando usar:** cliente tem mensagens de cliente espalhadas em vários
  canais e precisa organizar antes de automatizar. Alternativa open-source
  a Intercom/Zendesk. Não é IA — é organização de fluxo pré-automação.
  (Verificar plano cloud gratuito em chatwoot.com.)

### DICA_RAPIDA — Nível 3

Template pronto / workflow de exemplo / configuração inicial em 2 passos.
Pesquise na web se há template oficial ou community workflow.

Ex.: "No n8n, importe este workflow: [link da web]. Conecte Gmail + Planilhas
e clique em 'Execute'. Leva 10 min para configurar."

## Nível 4 — Adote um agente de equipe

**Investimento:** médio-alto. Agente compartilhado no time, com memória,
canais e delegação. Requer plano pago (Team/Enterprise).

- **[IA] Claude Tag** — Claude como membro do time no Slack.
  **O que faz:** agente de IA que aprende com canais do Slack, age
  assincronamente e pode ser marcado como @Claude em qualquer canal.
  Modo ambiente para contexto contínuo.
  **Quando usar:** time usa Slack e quer IA integrada ao fluxo de
  trabalho diário — responde dúvidas, analisa tickets, ajuda em
  decisões. Requer Claude Team/Enterprise.
  Alternativa direta aos Workspace Agents.
- **[IA] ChatGPT Workspace Agents** — Agentes de fundo no ChatGPT/Slack.
  **O que faz:** agentes que rodam workflows em segundo plano, atuam
  em canais (Slack, ChatGPT) e acessam a knowledge base corporativa
  automaticamente.
  **Quando usar:** alternativa ao Claude Tag para quem está no
  ecossistema ChatGPT Business/Enterprise. Mesmo caso de uso: IA
  integrada ao fluxo do time.
- **[Agente] Mercury Agent (cloud)** — Agente multi-canal com skill system.
  **O que faz:** agente que opera via CLI, Telegram, Discord, Slack e
  Signal com sistema de skills, autopilot e second brain. Versão cloud
  disponível.
  **Quando usar:** cliente quer um agente que não fique preso a um
  único ecossistema (Slack vs ChatGPT) e precisa de skills modulares.
  Alternativa open-source a Claude Code/Codex.
- **[Gateway] Executor** — Camada de integração para agentes de IA. Conecta
  qualquer agente compatível com MCP (Claude Code, ChatGPT, Cursor, OpenCode
  etc.) às APIs da empresa (OpenAPI, GraphQL, MCP, Google Discovery) — com
  autenticação e políticas por ferramenta.
  **O que faz:** um catálogo centralizado de integrações. Configure uma vez
  as credenciais e permissões de cada API; todo agente enxerga as mesmas
  ferramentas sem configurar nada adicional.
  **Quando usar:** cliente tem agentes de IA e precisa que eles acessem
  sistemas reais da empresa (CRM, planilhas, e-mail, banco de dados) sem
  expor chaves de API diretamente.
  **Diferencial:** open-source (MIT), roda local (CLI, desktop) ou cloud,
  plugin system para qualquer tipo de integração. Cada tool tem política
  de aprovação — permite, bloqueia ou pede confirmação por execução.
  (npm: executor, web: executor.sh. GitHub: github.com/UsefulSoftwareCo/executor)
- **[Gateway] Bifrost** — Gateway de IA empresarial (rota, custo, governança).
  **O que faz:** proxy único para LLMs que roteia requisições entre 8+
  provedores (OpenAI, Anthropic, Google, etc.), gerencia orçamentos por
  time/chave virtual, aplica fallback automático, e expõe observabilidade
  (latência, taxa de erro, gasto). Drop-in replacement: muda uma linha
  do SDK e tudo passa pelo gateway. Open-source.
  **Quando usar:** cliente é time de tecnologia que usa múltiplos LLMs
  e não sabe quanto gasta, quer limites por área, precisa de proxy com
  governança, ou quer fallback entre provedores sem mudar código.
  **Diferencial:** ao contrário de LiteLLM (mais lento em escala), Bifrost
  tem latência 54x menor e memória 68% menor nos benchmarks. Suporta
  MCP gateway nativo, virtual keys, guardrails e SSO.
  (Cloud: getbifrost.ai. GitHub: github.com/maximhq/bifrost.)

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
  **Quando usar:** cliente precisa de automação com volume alto de
  execuções, dados sensíveis que não podem sair do país, ou quer
  controle total sem limites de plano.
  Total controle, sem custo por execução.
- **[Automação] Windmill (self-host)** — Mesmo que o Nível 3, mas na sua infra.
  **Quando usar:** cliente precisa de automação + painéis internos com
  dados sensíveis, ou quer flexibilidade máxima de scripts customizados
  sem limite de execução.
  Total controle, sem custo por execução.
- **[Orquestrador] multica.ai** — Orquestração de IA com agentes e fluxos.
  **O que faz:** plataforma de automação com agentes de IA, workflows
  e integrações.
  **Quando usar:** cliente já tem familiaridade com automação e quer
  adicionar IA como orquestrador de fluxos.
  (Confirmar planos atuais na web — muda com frequência.)
- **[Orquestrador] eigent.ai** — Agentes e automação com IA.
  **O que faz:** plataforma para construir agentes de IA e automatizar
  fluxos com modelos de linguagem.
  **Quando usar:** alternativa a multica.ai para quem quer comparar
  abordagens de orquestração de agentes.
  (Confirmar planos atuais na web — muda com frequência.)
- **[Agente] Mercury Agent (self-host)** — Agente multi-canal na sua infra.
  **O que faz:** mesma skill system, autopilot e second brain do Mercury
  Agent cloud (Nível 4), mas na sua própria infraestrutura. Roda 24/7
  como daemon.
  **Quando usar:** cliente testou na cloud (Nível 4) e quer migrar para
  self-host por questões de custo, latência ou dados sensíveis.
  (Verificar docs em mercuryagent.sh.)
- **[Dev] RunFusion (Fusion)** — Orquestrador multi-agente para dev software.
  **O que faz:** agents plan, code, review e fazem ship de software
  em worktrees isolados. Open-source (MIT).
  **Quando usar:** time de desenvolvimento quer automatizar parte do
  ciclo de desenvolvimento com agentes.
  **Quando evitar:** cliente não é time de software — não resolve
  problemas de negócio, automação de marketing, CRM etc.
  (Requer npm/node, git. Docs em runfusion.ai.)
- **[Agenda] Cal.com (self-host)** — Autogerenciamento ou cloud do Cal.com.
  **O que faz:** mesma plataforma de agendamento do Nível 1, mas na sua
  própria infraestrutura. Controle total de dados, customização ilimitada,
  sem dependência de SaaS.
  **Quando usar:** cliente precisa de agendamento com dados sensíveis,
  quer branding completo, ou tem volume alto de bookings que justifica
  o self-host.
  (Self-host via Docker. GitHub: github.com/calcom/cal.com.)

### DICA_RAPIDA — Nível 5

Link para demo cloud / trial gratuito / comando Docker / npm install inicial.
Confirme na web se há ambiente de teste gratuito.

Ex.: "Teste grátis em [url da web] sem instalar nada. Se fizer sentido para
o dia a dia, podemos configurar o self-host juntos."

## Como apresentar cada ferramenta no relatório

Cada card de ferramenta no relatório completo tem 6 campos:

| Campo | Marcador `[[ ]]` | Obrigatório? | O que preencher |
|-------|-------------------|-------------|-----------------|
| **Nome** | `NOME_DA_FERRAMENTA` | Sim | Do catálogo acima. Inclua o tipo `[IA]`, `[Automação]`, `[Agente]`, `[Orquestrador]`, `[Dev]`, `[Base]`, `[Wiki]`, `[Formulário]`, `[Agenda]`, `[Atendimento]` ou `[Gateway]` — o tipo ajuda o cliente a entender *que problema* a ferramenta resolve. |
| **Conexão com o caso** | `PARA_QUE_SERVE_NO_CASO_DELE_1_FRASE` | Sim | **Por que esta ferramenta para esta pessoa?** Conecte ao que ela disse no transcript. Inclua, em 1 linha, o racional econômico: se o volume for baixo, justifique IA ("~3x/semana — não compensa automatizar"); se alto, justifique automação ("30x/dia — o setup se paga em semanas"). Ex.: "Você mencionou que perde 2h/dia classificando e-mails — para este volume alto, esta ferramenta [Automação] se paga rápido." |
| **Custo** | `CUSTO_ou_Grátis` | Sim | Faixa ou "grátis". Confirmado na web (WebSearch). |
| **Setup** | `ESFORÇO_ex_baixo` | Sim | "baixo" / "médio" / "alto" ou número de dias. |
| **Economia** | `FAIXA_HORAS_ex_2–3 h/sem` | Sim | Faixa de horas/semana (ver `calculo-roi.md`). |
| **Dica rápida** | `DICA_RAPIDA` | Sim (todo nível) | Formato varia por nível. Ver seção DICA_RAPIDA de cada nível acima. |
| **Toque humano ⚠️** | `TOQUE_HUMANO` | Obrigatório se `[Pensamento]` OU se a tarefa tiver consequência significativa (erro custa caro) | Alerta de validação humana: "Revise antes de usar. A IA sugere, você decide." Ex.: "⚠️ Toque humano: a IA pode sugerir alternativas que você não considerou, mas o julgamento final é seu — revise antes de aplicar.", ou "⚠️ Toque humano: a IA monta a minuta, mas você confere antes de enviar ao cliente." |

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

---

## Estratégia: agendamento — Google Agenda Booking Page vs. Cal.com

Quando o cliente disser que perde tempo com agendamento (WhatsApp, e-mails, vai e volta),
siga esta ordem de recomendação:

| Cenário | Recomendar | Por quê |
|---------|-----------|---------|
| Cliente **já usa Google Workspace**, agendamento simples (1 tipo de serviço, sem pagamento) | **Google Agenda Booking Page** | Zero configuração, integração nativa com o calendário que ele já usa |
| Cliente **já usa Google Workspace**, precisa de **pagamento** no ato do agendamento | **Google Agenda Booking Page** (se tiver plano Google Workspace pago — o recurso de pagamentos está disponível nos planos pagos) | A página de reserva aceita pagamento via Google Pay / Stripe quando o Workspace é pago |
| Precisa de **múltiplos serviços**, durações diferentes, customização de branding | **Cal.com** (cloud) | Mais flexível que a página nativa do Google |
| Precisa de **pagamento** mas não tem/não quer Workspace pago | **Cal.com** (cloud, com Stripe integrado) | Cal.com tem pagamento no plano gratuito |
| Cliente quer **dados sensíveis** ou self-host | **Cal.com self-host** (Nível 5) | Controle total de dados |
| Cliente já tem **Cal.com** e quer testar sem compromisso | **Cal.com cloud** (plano free ilimitado) | Já está no ecossistema |

**Regra:** Google Agenda Booking Page é a opção padrão para quem já está no ecossistema
Google — setup de 2 minutos, sem ferramenta nova. Cal.com é a alternativa quando o Google
não cobre o que o cliente precisa (pagamento sem Workspace pago, múltiplos eventos,
customização, self-host).
