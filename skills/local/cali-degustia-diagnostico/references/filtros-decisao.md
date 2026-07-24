# Filtros de Decisão: IA vs. Automação vs. Solução Manual

> Use estes 3 filtros em sequência para decidir a abordagem de cada recomendação.
> Eles substituem afirmações genéricas sobre "o que IA resolve" por critérios objetivos.

## Filtro 1 — Variabilidade (Padrão vs. Imprevisível)

A primeira pergunta: **a tarefa segue um padrão fixo ou varia a cada execução?**

| Se a tarefa... | Então prefira... | Custo por execução | Exemplo |
|----------------|-----------------|-------------------|---------|
| Segue o mesmo padrão, regras fixas, dados estruturados (números, categorias fixas, formulários) | **Automação simples** (se-então, script, workflow, fórmula de planilha) | Quase zero | Salvar anexo de e-mail no Drive, atualizar CRM, gerar PDF |
| Entrada varia, contexto muda, dados não estruturados (texto livre, áudio, imagem, PDF escaneado) | **IA** (modelo de linguagem, visão computacional) | Custo por token | Extrair intenção de e-mail confuso, resumir reunião, classificar sentimento |
| É mista — parte previsível, parte imprevisível | **Híbrido**: automação faz a parte previsível, IA entra só no gargalo de decisão | Custo reduzido | IA classifica lead (imprevisível), automação dispara e-mail (previsível) |

## Filtro 2 — Cognição (Processar vs. Compreender)

A segunda pergunta: **a tarefa exige raciocínio/síntese ou só movimentação de dados?**

| Se a tarefa... | Então prefira... | Confiabilidade | Exemplo |
|----------------|-----------------|----------------|---------|
| É mecânica: mover, copiar, transformar, calcular dados estruturados | **Automação ou solução manual** (script, workflow, planilha) | 100% previsível, zero alucinação | Atualizar linha no CRM, enviar alerta, calcular total da planilha |
| Exige raciocínio, síntese, geração, interpretação de contexto ou nuance | **IA** (LLM) | Probabilística — requer revisão humana em casos críticos | Resumir reunião, criar rascunho de proposta, reescrever e-mail com tom adequado |
| Exige pesquisa, comparação, descoberta de gaps | **IA com capacidade crítica** (Deep Research, Perplexity, NotebookLM) + **toque humano** | A IA amplia o repertório, a pessoa decide | Pesquisar concorrentes, revisar diagnóstico, sugerir alternativas |

## Filtro 3 — Custo-Benefício 80/20 (Estabilidade vs. Flexibilidade)

A terceira pergunta: **qual o volume e a estabilidade da tarefa?**

| Cenário | Abordagem | Lógica | Exemplo |
|---------|-----------|--------|---------|
| Volume alto (+20x/semana), tarefa estável (não muda toda semana) | **Automação como espinha dorsal** | Setup se paga rápido. IA só nos gargalos de decisão. | 30 orçamentos/dia → n8n extrai dados, IA só preenche descrição |
| Volume baixo (-5x/semana), tarefa que muda | **IA via prompt** (ferramenta que o cliente já tem) | Custo de setup é zero. Setup de automação não compensa. | 3 e-mails/dia → Custom GPT rascunha, humano revisa |
| Volume médio (5-20x/semana) | **Híbrido com peso na simplicidade** | Comece com IA via prompt. Se mantiver o volume por 1 mês, automatize. | 10 agendamentos/semana → link do Google Agenda resolve; se crescer, migra para Cal.com |
| Tarefa que exige cognição + alto volume | **IA + automação combinados** | IA analisa/decide, automação executa. Cada um no que faz melhor. | 50 e-mails/dia → IA classifica (urgencial, lead, dúvida), automação encaminha para a fila correta |

## Resumo prático

Antes de escolher entre IA, automação ou solução manual, faça as 3 perguntas em ordem:

1. **Variabilidade:** A entrada é sempre igual ou varia? → previsível = automação, imprevisível = IA
2. **Cognição:** Precisa de raciocínio ou só de execução? → raciocínio = IA, execução = automação/manual
3. **Volume:** Compensa o setup? → alto volume = automação se paga, baixo volume = prompt resolve

**Erro mais comum:** usar IA onde uma condicional resolveria. Toda execução que pode ser descrita como "se X então Y" não precisa de IA.

**Erro mais comum #2:** automatizar uma tarefa que aparece 3x por semana. O setup de 4h demora 3 meses para se pagar. Um prompt de 5 minutos resolve.
