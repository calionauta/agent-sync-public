# Princípios do Sommelier de IA

> Diretrizes consolidadas para avaliar o contexto do cliente, desenhar soluções
> e gerar o relatório. Leia este arquivo antes de começar a desenhar soluções
> (Passo 2 do SKILL.md) e consulte durante o processo para checar se cada decisão
> respeita os princípios.

## 1. O que já existe vem primeiro

Antes de recomendar qualquer ferramenta nova, verifique se o cliente já possui algo
que resolve — seja com uma configuração, uma feature não usada, ou uma integração
nativa. Só recomende ferramenta standalone quando a existente não der conta.

- Já usa Google Workspace? → Google Sheets + Apps Script ou Gemini + Gems.
- Já usa ChatGPT? → Custom GPT, Scheduled Task.
- Já usa CRM/ERP? → Automacão interna do sistema? API disponível?
- Já usa WhatsApp? → API oficial para conectar com automação.

## 2. Remova antes de adicionar

Antes de adicionar ferramentas, pergunte: **o que pode ser removido, simplificado
ou suspenso primeiro?** Menos ferramentas é sempre melhor. O experimento de
subtração (ver `references/bonus-processo.md`) deve ser considerado antes de
qualquer recomendação de ferramenta.

## 3. Experimente desdobramentos que o presente já permite

Não proponha transformações distantes. Parta do que o cliente já tem, já sabe e
já usa. Os próximos passos devem ser acessíveis a partir da posição atual, não
de um destino idealizado. ("O que já funcionou? Onde há menos resistência?")

## 4. Use configurações e funcionalidades de produtos já usados

Cada produto que o cliente já tem provavelmente tem funcionalidades subutilizadas.
Antes de recomendar algo novo, pesquise se a ferramenta existente já faz o que
ele precisa — ou se uma extensão/configuração resolve.

## 5. Integre com o que já existe, não substitua

Integrar com o ecossistema existente (planilhas, WhatsApp, CRM, e-mail) reduz
atrito de adoção. Prefira encaixar sobre substituir. A pergunta não é "qual a
melhor ferramenta do mercado?" e sim "qual a melhor ferramenta PARA O QUE ELE JÁ TEM?"

## 6. Primeiro: execução ou pensamento? Depois: determinístico ou estocástico?

Antes de escolher entre IA e automação, pergunte: **a tarefa é de execução (fazer algo
acontecer) ou de pensamento (analisar, questionar, decidir)?**

- **Execução:** seguir para a avaliação determinístico vs. estocástico (abaixo).
- **Pensamento (IA crítica):** a IA serve como ampliadora de repertório — pesquisa
  comparativa, descoberta de gaps, segunda opinião, sugestão de alternativas. O valor
  está no questionamento, não na velocidade. Nestes casos, o **toque humano**
  (validação, decisão final) é parte essencial da recomendação.

Depois de classificada, avalie o melhor formato:

| A tarefa… | Então prefira… | Exemplo |
|---|---|---|
| É repetitiva e tem regras claras | **Automação** (Nível 3) | Lançar nota fiscal na planilha |
| Varia e precisa de contexto/tom | **IA** (Nível 1-2) | Responder e-mail de reclamação |
| Exige análise crítica, comparação, pesquisa | **IA com capacidade crítica** (Nível 1-2) + toque humano | Pesquisar concorrentes, revisar diagnóstico, sugerir alternativas |
| É misto (análise + ação) | **IA decide, automação executa** | IA classifica lead, automação dispara e-mail

## 7. Toque humano onde o erro custa caro

Identifique etapas onde um erro da IA ou da automação teria consequências
significativas: envio de e-mail para cliente errado, alteração em dado
financeiro, resposta pública em canal oficial, ou decisão baseada em análise
incompleta. Nessas etapas, exija **toque humano** (validação humana) antes
da execução — conferir, aprovar, ajustar.

Isso vale especialmente para recomendações da categoria `[Pensamento]`: a IA
amplia o repertório e sugere alternativas, mas a decisão final é da pessoa.
No card da ferramenta ou na dica rápida, inclua algo como:

> ⚠️ Toque humano: revise a sugestão antes de usar. A IA pode sugerir
> caminhos que você não considerou, mas o julgamento final é seu.

Comunique essa necessidade no relatório. Não é defeito — é responsabilidade.
O termo "toque humano" deve ser usado nos cards e seções em vez de
"human-in-the-loop" para manter o tom acessível em português.

## 8. Mantenha o mais simples possível

A melhor solução é a que o cliente consegue manter sozinho depois de implementada.
Se a recomendação for complexa demais para o perfil do cliente, ela é a
recomendação errada — mesmo que tecnicamente superior.

Critérios de simplicidade:
- Quantas ferramentas novas o cliente precisa aprender? (ideal: 0-1)
- Quanto tempo de setup? (ideal: minutos, não dias)
- Quem vai manter? (se não tem técnico, não recomende self-host)

## 9. Menor investimento de tempo e dinheiro primeiro

Sempre comece pelo nível mais baixo que resolve. Só suba de nível quando o
atual for insuficiente. O custo total (setup + operacão) determina o nível,
não só o preço da ferramenta.

| Nível | Investimento | Quando parar aqui |
|-------|-------------|-------------------|
| 1 — Teste 5 min | Zero | Se o prompt resolve, não vá além. |
| 2 — Configure | Baixo | Se uma Skill/Custom GPT resolve, pare aqui. |
| 3 — Fluxos | Médio | Se automação visual resolve, não suba para self-host. |
| 4 — Agentes | Médio-alto | Só se precisar de time multiplayer. |
| 5 — Self-host | Alto | Só se não der para fazer em cloud. |

## 10. Tempo para primeiro valor (Time to First Value)

A recomendação deve gerar valor **na primeira semana**, idealmente no primeiro
dia. Se o plano de implementação for mais longo que 4 dias, quebre em etapas
onde cada etapa entrega valor sozinha.

A `DICA_RAPIDA` é a principal ferramenta para isso — o cliente testa em minutos.
O Roteiro de 4 Dias é a implementação completa.

## 11. Percepção de investimento-valor (ROI honesto)

O relatório precisa ser um "ótimo negócio" para quem pagou R$ 897. Isso se
constrói com:
- ROI mensal mostrado em faixa conservadora (se paga no 1º mês ou próximo)
- Value Recap com "horas de pesquisa que você não precisou fazer"
- Conexões explícitas entre cada recomendação e a fala do cliente
- Honestidade: se o ROI for baixo para aquele caso, seja transparente

## 12. Autonomia com opções delimitadas

Não jogue 20 ferramentas para o cliente escolher. Ofereça 3-7 ferramentas
curadas, com justificativa clara para cada uma. O cliente pode decidir entre
implementar sozinho (com a DICA_RAPIDA) ou contratar (via upsell).

## 13. Experiência pessoal e memorável

O relatório deve soar pessoal, não genérico. Cada recomendação deve ser tão
específica que o cliente se reconheça imediatamente. Use citações literais,
referencie momentos da conversa, evite texto que serviria para qualquer um.

---

## Como usar estes princípios

- Leia antes do Passo 2 (desenhar soluções).
- Após cada recomendação, cheque: ela viola algum princípio?
- Se viola, ajuste a recomendação até respeitar todos.
- Os princípios NÃO substituem o catálogo de ferramentas (`ferramentas.md`) —
  eles são a lente de avaliação sobre as escolhas do catálogo.
