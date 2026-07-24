# Matriz Impacto × Esforço

> **Apenas para a Curadoria Sommelier** (ficha de degustação, `assets/report-completo.html`).
> A Conversa Gratuita NÃO inclui matriz.

A matriz organiza os casos de uso em 4 quadrantes. Ela NÃO é auto-contida: os itens
dos quadrantes "Ganhos rápidos" e "Projetos maiores" DEVEM ser exatamente os mesmos
das seções "Para provar agora" e "O que vem depois dos primeiros goles" do relatório.

## Eixos

| Eixo | O que mede | ALTO | BAIXO |
|------|-----------|------|-------|
| **Impacto** | Quanto tempo/dinheiro/energia a solução devolve por semana | Libera 2+ h/semana, ou resolve dor que aparece todo dia | Libera < 1 h/semana, ou dor esporádica |
| **Esforço** | Quanto custa implementar (setup, aprendizado, dinheiro, mudança de hábito) | Requer ferramenta nova, integração complexa, aprendizado técnico, ou mudança estrutural | Já tem a ferramenta, ou é um prompt/Custom GPT/Gem/Skill pronto em minutos |

## Como classificar cada caso de uso

Para cada caso de uso do transcript (SKILL.md Passo 1), responda:

1. **Frequência:** aparece todo dia? toda semana? raramente?
2. **Tempo atual:** quanto tempo leva hoje?
3. **Ferramenta necessária:** o cliente já tem? é grátis? precisa comprar/implementar?
4. **Capacidade técnica:** precisa de setup técnico ou é autosserviço?

**Regras de classificação:**

- **Ganho rápido** = impacto ALTO + esforço BAIXO → foco principal do relatório.
- **Projeto maior** = impacto ALTO + esforço ALTO → seção "O Que Vem Depois".
- **Complemento** = impacto BAIXO + esforço BAIXO → menção rápida ou ignorar.
- **Deixar de lado** = impacto BAIXO + esforço ALTO → citar só se o cliente mencionou explicitamente.

## Quantos itens por quadrante

| Quadrante | Mínimo | Máximo | Vai para qual seção do relatório |
|-----------|--------|--------|-----------------------------------|
| Ganhos rápidos | 3 | 6 | Seção "Para provar agora" + capa/ROI |
| Projetos maiores | 0 | 3 | Seção "O Que Vem Depois" |
| Complementos | 0 | 2 | Só na matriz, sem seção própria |
| Deixar de lado | 0 | 1 | Só na matriz, sem seção própria |

Se o transcript render menos que 3 casos de uso para "Ganhos rápidos", use o que tem
— nunca invente.

## Preenchendo os quadrantes no HTML

O template tem labels fixos nos 4 quadrantes. A LLM deve ADICIONAR exemplos concretos
dentro de cada quadrante. Exemplo (completo, após preencher):

```
<!-- ANTES (template estático): -->
<div class="quad qw">
  <div class="qn">Ganhos rápidos</div>
  <div class="qnote">Alto impacto, baixo esforço — é aqui que a degustação foca.</div>
</div>

<!-- DEPOIS (preenchido): -->
<div class="quad qw">
  <div class="qn">Ganhos rápidos</div>
  <div class="qnote">Alto impacto, baixo esforço — é aqui que sua curadoria foca.</div>
  <ul style="margin-top:10px;font-size:.88rem;color:var(--bg);opacity:.9;padding-left:18px;">
    <li>Orçamentos manuais → Custom GPT</li>
    <li>Relatório semanal → tarefa agendada</li>
    <li>Categorização de e-mail → filtro + Gemini</li>
  </ul>
</div>
```

A LLM deve:
1. Manter o texto original do `div.qnote` (é parte da marca).
2. Adicionar uma `<ul>` com os itens concretos após o `qnote`.
3. Usar o estilo inline (`style="..."`) nos itens para manter a consistência visual — 
   não criar novas classes CSS.

## Regras de ouro

- **Consistência:** os itens nomeados nos quadrantes DEVEM ser os mesmos das seções
  "Para provar agora" (linhas) e "O Que Vem Depois" (after). Se mudar um, muda nos dois lugares.
- **Sem invenção:** se o quadrante "Deixar de lado" ficar vazio, adicione um `<li>` com
  "Nada identificado nesta conversa" em itálico.
- **Hierarquia visual:** o quadrante "Ganhos rápidos" (`quad.qw`) já tem fundo accent
  (cor de destaque). Os outros quadrantes ficam com fundo neutro. Não altere isso.
- **Matriz não substitui seções:** a matriz é um MAPA VISUAL. As seções "Para provar agora"
  e "O Que Vem Depois" contêm a versão DETALHADA (cada item com dor → solução).
