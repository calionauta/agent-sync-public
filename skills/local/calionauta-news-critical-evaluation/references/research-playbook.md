# Research playbook

## Contents
- General rules
- Recipe A: input is a URL
- Recipe B: input is a topic
- Source triage
- Perspective sampling recipe
- Tier 2 tools
- Stop conditions

## General rules

- Use the real current date in queries ("2026", "this week"), never a stale year.
- Keep queries short and specific (1-6 words). Start broad, then narrow. Every query should differ meaningfully from the previous one.
- Search for the outlet and the author separately from the claim.
- Fetch pages when snippets are too thin. Only fetch URLs that came from the user or from earlier results.
- Search for the opposing view explicitly. Search results are not balanced by default, even for neutral queries, so run separate searches for each side of a contested topic.
- If a requested source cannot be found, say so.

## Recipe A: input is a URL

1. **Fetch** the article. Record outlet, author, date, type, central claim, cited sources.
2. **Source check** (search about them): `<outlet> ownership funding`, `<outlet> reliability corrections`, `<author> <outlet>`. For unfamiliar outlets, check an encyclopedia entry and what other outlets say about it.
3. **Trace the claim**: follow the article's links to the primary source (study, filing, dataset, original post). If it only cites another outlet, go one hop further and repeat. Note whether context survived.
4. **Find other coverage by perspective**: choose the axis (see the recipe below), then search the central claim in plain words and read 1-2 outlets per perspective that are not rewriting one wire story.
5. **Find the counter-story**: `<topic> criticism`, `<topic> debunked`, `<topic> fact check`, `<topic> why wrong`, and the main opposing party's own statement.
6. **Check maturity**: search the topic with "update", "correction", "retracted"; check dates.

## Recipe B: input is a topic

1. **Discover**: 2-3 searches for the topic ("<topic>", "<topic> latest", "<topic> analysis") to see which stories define it. Prefer reports with named evidence over commentary.
2. **Choose an anchor**: the earliest primary report or the most-cited one. Name the alternatives.
3. Continue with Recipe A from step 2 on the anchor story.
4. If the topic is a trend or "everyone is saying" signal, also check whether it traces back to one origin (a single post, one report) that many outlets repeated.

## Source triage

Prefer, in order: primary documents and original data; outlets with transparent corrections and named reporting; specialist outlets for specialist topics; wire services for basic facts; aggregators last. Do not equate prestige with correctness or obscurity with unreliability: weigh each by the criteria. Social posts and forums are evidence of what people say, not of what happened, unless they are the primary record (an eyewitness post, an official account).

## Perspective sampling recipe

1. **Pick the axis** from the topic (political, stakeholder, evidence role, geographic and party). See `references/outlets.md` for the table.
2. **Pick outlets**: 2-4 per perspective from the user's list in `references/outlets.md`, plus any you discover. Do not invent lean labels for outlets; if the list does not say where an outlet sits, treat it as unlabeled and say so.
3. **Query**:
   - With code and network: `python scripts/coverage_sample.py --query '"<topic phrase>"' --timespan 7d --max 8 --group "perspectiveA=dom1,dom2" --group "perspectiveB=dom3,dom4"`. Run it once with `--dry-run` to inspect the requests. The script waits between requests because GDELT's public limit is about one per 5 seconds per IP. GDELT covers roughly the last 3 months; for older stories use web search.
   - Without: one web search per perspective that names the outlets (for example `<topic> <outlet name>`). Results are not balanced by default, so run each perspective separately.
4. **Read**, do not just count. One article per perspective that returned results; note its claim, evidence and what it leaves out.
5. **Report** the axis, the outlets sampled and the empty perspectives.

Query hygiene: quote phrases, put OR groups in parentheses, keep the topic query specific. If a perspective is empty, retry once with a broader phrase before reporting it empty.

Limits to state when relevant: GDELT indexes what it crawled, not everything published; Media Cloud has data for a source only from when it started collecting that source's feeds; free news APIs often delay results by 12-24 hours, which matters for hours-old stories.

## Tier 2 tools

Use these only when they are installed and they add something Tier 1 cannot. Do not install anything during a run. Do not paste keys or cookies in chat.

**last30days** - cross-platform discourse search (Reddit, X, YouTube, Hacker News, Polymarket, web), scored by engagement.
- Best for: very recent stories (days), mapping who is amplifying and what counter-narratives circulate, how practitioners or communities react, what prediction markets price.
- Invoke as the skill's own command with the topic (for example `/last30days <topic>`); follow its own instructions for options.
- Treat output as *discourse*, not as evidence. High engagement can mean a story is popular, outrage-driven or coordinated. Report it under "Discourse" in Sources and use it for 1.1, 4.1 and 4.2 only.

**agent-reach** - read-only access to platforms that plain fetch cannot read (X, Reddit, YouTube/Bilibili transcripts, podcasts, others).
- Best for: the claim originates in a video, a podcast, or a login-walled post and you need the original wording and context (2.2).
- It reads only; never use it to post or interact.
- Skip for ordinary news articles and for anything a normal fetch can read.

If neither is available, continue with Tier 1 and add one line to the output: "Social discourse not mapped."

## Stop conditions

Stop researching when each criterion either has retrieved evidence or is honestly `Unknown`, or when the budget (quick 4-6 calls, full 10-20) is spent. More searching on the same angle will not change the answer; if the story is hours old, say what to re-check instead.
