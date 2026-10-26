# Outlets for perspective sampling

This file is **yours to curate**. The skill reads it to decide which outlets to sample for each perspective. Edit it freely.

## Contents
- How to use this file
- Choosing the axis
- Neutral-type starter list (no lean claims)
- Your lists (fill in)
- Rules for keeping it honest

## How to use this file

1. Pick the perspective axis that fits the topic (next section).
2. Take 2-4 outlets per perspective from the lists below.
3. Sample them with `scripts/coverage_sample.py` (one `--group "label=domain1,domain2"` per perspective) or, where the script cannot run, with targeted web searches that name the outlets.
4. Record which perspectives returned nothing. An empty perspective is a finding.

## Choosing the axis

| Topic type | Axis | Example perspectives |
|---|---|---|
| Politics, policy, culture war | **Political** | whatever positions are relevant in that country (do not assume a left/right line fits every country) |
| Tech, AI, product, business | **Stakeholder** | vendor / company, competitor, practitioner or user community, independent critic, regulator, academic or researcher |
| Science, health | **Evidence role** | primary study authors, independent experts, specialist press, patient or practitioner voices, fact-checkers |
| Conflict, international | **Geographic and party** | outlets from each country involved, international wires, local reporters, affected communities |

## Neutral-type starter list (no lean claims)

These are categorized by what they *are*, not by where they sit politically. Domains are for the `domain:` filter; check each one before relying on it.

| Type | Outlet | Domain | Notes |
|---|---|---|---|
| Wire service | Reuters | reuters.com | |
| Wire service | Associated Press | apnews.com | |
| Public broadcaster | BBC | bbc.com | |
| Fact-checker | Agência Lupa | lupa.news | Brazil |
| Fact-checker | Aos Fatos | aosfatos.org | Brazil |
| Fact-checker | Snopes | snopes.com | |
| Fact-checker | FactCheck.org | factcheck.org | |

## Your lists (fill in)

Copy this block per axis. Keep **position** as your own call, with a short reason, so you can revisit it.

```
Axis: <political | stakeholder | ...>   Country/region: <...>
| Perspective | Outlet | Domain | Why I placed it here (source or reasoning) |
|---|---|---|---|
|  |  |  |  |
```

## Rules for keeping it honest

- **Labels are contestable.** Outside-rater labels (AllSides, Media Bias/Fact Check, others) are human judgments and mostly built around the US. Use them to *seed* a list, then check them against what the outlet actually publishes.
- **Check licenses.** AllSides ratings are published under a non-commercial license; if you use them in client work, read the terms first.
- **Outlet is not article.** A single outlet's position does not tell you what one of its articles says. Read the article.
- **Mix types.** Include at least one primary or specialist source (a filing, a study, a trade outlet) next to general news.
- **Review periodically.** Ownership and editorial lines change.
