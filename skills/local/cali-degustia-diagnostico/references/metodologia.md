# Metodologia — como raciocinar sobre o transcript

Base: método de produto + Jobs to be Done (JTBD) da Cali, e o modelo do "AI Tools Assessment"
(prescrever 3–7 ferramentas prontas para devolver horas por semana, focando em ganhos de
alto impacto e baixo esforço). O objetivo não é impressionar com tecnologia — é devolver tempo.

## 1. Do transcript aos casos de uso

Para cada dor mencionada, escreva um "caso de uso" no formato:

> **Tarefa hoje** (como é feito, com o quê, quantas vezes) → **Atrito** (o que dói) →
> **Resultado desejado** (o que a pessoa queria que acontecesse sozinho).

Agrupe casos parecidos. Priorize os que aparecem com **frequência alta** e **esforço de
solução baixo** — são os "ganhos rápidos". Deixe o que é raro ou complexo para "o que vem
depois".

## 2. Pensar em ângulos (não pare na primeira ideia)

Para cada caso, gere pelo menos 2 caminhos antes de escolher:
- **Caminho preguiçoso do cliente:** o que exige o mínimo de mudança de hábito? (geralmente
  um prompt salvo, um Custom GPT/Gem, uma Skill, ou uma tarefa agendada).
- **Caminho robusto:** e se o volume crescer? o que escala? (aí talvez automação/self-host).
Escolha o mais simples que resolve *de verdade* o caso atual, e cite o robusto em "o que vem
depois" quando fizer sentido.

## 3. Integrar com o que já existe

Sempre ancore a recomendação nas ferramentas e fluxos que a pessoa **já citou** (planilha,
WhatsApp, e-mail, CRM, Notion, Drive…). "Encaixar" numa ferramenta existente reduz atrito de
adoção e é mais honesto do que propor trocar tudo. Ver `ferramentas.md` para a árvore de
decisão simples-primeiro.

## 4. Suposições explícitas

Quando faltar dado (ver Passo 3 do SKILL.md), marque claramente no relatório:
- Fatos do transcript → texto normal.
- Hipóteses → prefixe com "Assumindo que…" e proponha alternativa.

Isso protege a confiança do cliente e evita prometer o que não se sabe.

## 5. Upsell honesto — o próximo passo do JTBD

O princípio: o relatório entrega valor real e **completo para o seu escopo**; o upsell é
apenas o *próximo passo natural* de quem quer ir além — nunca uma peça faltando de propósito.

- **Gratuito → serviços pagos.** A conversa de 20 min resolve o primeiro passo (1–2
  ganhos). O convite lista os próximos caminhos (ver SKILL.md Passo 6 e `config.yaml`):
  Curadoria Sommelier (ficha de degustação), Concierge (acompanhamento mensal),
  Complexo (projetos e fluxos coletivos). Enquadre como "o próximo passo depende do que fizer sentido
  agora", não como "isto aqui está incompleto".
- **Degustação → Concierge e Complexo.** Metade dos clientes quer ajuda
  para *implementar*. O concierge é acompanhamento contínuo (retainer mensal): construir
  as Skills/automações, ensinar as ferramentas, tirar dúvidas ao longo do mês. O Complexo
  atende projetos ou fluxos que precisam de mais horas dedicadas. **Bônus honesto:** o valor já pago na curadoria
  (ver `config.yaml`) é **abatido** do próximo serviço — quem já fez a degustação não paga duas vezes
  pela mesma etapa. Isso faz o cliente sentir que ganhou, e mantém a conta transparente.

Tom sempre de convite e cuidado, nunca de pressão ou escassez artificial.

## 6. Citações literais do transcript

Extraia falas literais do transcript e distribua no relatório. Elas provam que você ouviu
de verdade e criam identificação imediata com o cliente.

Regras:
- Extraia **2–4 falas** que capturem dor, frustração, desejo ou surpresa do cliente.
- Preserve o texto EXATO do transcript: "né", "tipo", pausas, repetições.
- Distribua contextualmente: 1 no resumo/"O que eu ouvi", 1 em ganhos rápidos (se houver
  boa fala para a respectiva dor), 1 no bônus de processo (se sinal forte).
- Use `<blockquote>` no HTML com o estilo definido no template.
- Nunca edite a fala para soar "melhor". A fala original é mais poderosa.
- Máximo 1 citação por seção. Se uma seção não tiver boa fala, não force — pule.

## 7. Bônus: processo e cultura (só Curadoria Sommelier)

Quando a dor não é falta de ferramenta, e sim burocracia, processo mal desenhado,
ou hábitos estabelecidos, o bônus de processo (SKILL.md Passo 2.5) oferece um experimento
seguro para falhar.

Critérios de ativação no transcript:
- Cliente menciona "processo", "burocracia", "jeito antigo", "sempre foi assim".
- Cliente descreve retrabalho que não é por falta de automação, mas por falta de clareza.
- Cliente diz "todo mundo sabe, mas ninguém segue".

A profundidade varia com o sinal (ver `references/bonus-processo.md`). Mesmo sem sinal
forte, o bônus entra como parágrafo de reflexão — a landing page o promete em todo
Diagnóstico.

## 8. Checagem final antes de entregar

- Toda economia tem base (transcript ou web)? Está em faixa? Usou o valor MÍNIMO da faixa
  de hora quando o transcript não informou?
- As ferramentas propostas existem e estão disponíveis hoje (checou na web o que muda)?
- O relatório respeita os limites do tipo de serviço (`diferencas-planos.md`)?
- Preços vieram de `config.yaml`? Nenhum hardcode?
- Citações literais incluídas? São falas EXATAS do transcript, sem edição?
- (Completo) Bônus de processo está presente mesmo que em versão leve?
- Nenhum marcador `[[ ]]` sobrou? A assinatura da Cali está lá?
- O relatório entrega valor real, não enche linguiça? Cada seção tem conteúdo extraído do
  transcript, não texto genérico?
