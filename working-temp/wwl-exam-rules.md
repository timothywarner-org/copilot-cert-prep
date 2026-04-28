# WWL Exam Writing Style Guide - Condensed Rules

## Table of Contents

- [Acronyms and Abbreviations](#acronyms-and-abbreviations)
- [Answer Choice Rules](#answer-choice-rules)
- [Question Sentences by Item Type](#question-sentences-by-item-type)
- [Instruction Statements](#instruction-statements)
- [Standard Wording](#standard-wording)
- [Word Usage](#word-usage)
- [Formatting Rules](#formatting-rules)
- [Legal and Names](#legal-and-names)
- [Globalization](#globalization)
- [City List](#city-list)

---

## Acronyms and Abbreviations

- Use the form examinees know best; treat consistently per exam.
- **First mention in stem**: spelled-out term + (ACRONYM). Use only the acronym in answer choices.
- **First mention in answer choice**: use spelled-out + (ACRONYM) in every answer choice where it appears. Do not mix spelled-out in one choice and acronym-only in another.
- **Plural first mention**: include "s" after acronym: "organizational units (OUs)".
- **First mention in table/graphic**: no need to spell out. Spell out in subsequent text instead.
- Document acronym usage on the exam style sheet.

## Answer Choice Rules

### Mutual Exclusivity
No answer choice can be a subset of another. If choice C is a shorter version of choice D (the correct answer), C is not unquestionably incorrect. Fix by making each choice fully distinct.

### No "All/None of the Above"
Never use "all of the above," "none of the above," or "both A and B" -- neither the phrase nor the concept.

### Common Wording
If all choices share identical wording, move the shared wording into the stem or question sentence.

### Correct Answers and Distractors
- Correct answers: unquestionably correct to a skilled examinee.
- Distractors: plausible to an unskilled examinee, unquestionably wrong to a skilled one.
- Distractors must reference real technology. Nothing fake or invented.

### Paths and Steps
Do not test memorization of menu paths. Use general language: "Create a new user in the Sales OU" not "Open ADUC > Users OU > File > New User".

### Fragments vs. Full Sentences
Consistent per item. Fragments: lowercase start (unless case-sensitive), no closing punctuation. Full sentences: capital start, period at end.

### Grammatical Structure
Every choice must respond to the syntax of the question sentence. If the question asks "What should you do?" every choice must describe an action in imperative form.

### Inappropriate Cueing
Do not use a word prominently in the stem and only in the correct answer. Either remove the repeated word or use it in at least one distractor too.

### Number and Order
- Minimum 3 choices (single-select). Choose-n: correct answers + 2 distractors minimum.
- No maximum defined, but ~6 is practical.
- Order: logical (related pairs together, shortest to longest, numerical). Disable randomization for numerical answers.
- No "choose all that apply."

### Parallel Form
Choices should be similar in length, phrasing, and technical level. If perfect parallelism is not feasible, at least match the correct answer's form with one distractor, and make the remaining distractors parallel to each other.

### No Teaching Text
Do not explain reasons for actions in answer choices. "Implement round robin by creating three A records..." teaches what round robin is.

### No Explanations
Do not include explanations for actions in answer choices.

### Numbers in Choices
Numerical answer choices remain in numerical order; do not randomize.

## Question Sentences by Item Type

| Item Type | Question Sentence Form |
|-----------|----------------------|
| Active Screen (AS) | Varies by item |
| Best Answer (BA) MC | What is the best approach to achieve the goal? |
| Build List (BL) - not all correct | Which [n] actions should you perform in sequence? |
| Build List (BL) - all correct | In which order should you perform the actions? |
| Drag and Drop (DD) | Varies by item |
| Extended Matching (EMQ) | What should you do? / Which [x] should you use? |
| Hot Area (HA) | Which [option] should you select? |
| Matching | Variations of "Match...to..." |
| Multiple Select MC | What are n possible ways...? / Which n [x] should you use? |
| Single Select MC | What should you do? / Which [x] should you use? |
| Code/Table Analysis | For each of the following statements, select Yes if the statement is true. Otherwise, select No. |

General question sentence rules:
- Begin with an interrogative word (what, which). Exception: preposition placement ("In which folder...").
- Use "what" standalone; use "which" as adjective ("Which tool should you use?").
- Use "should" in question sentences. Avoid can, must, might, do, would, may.
- Avoid negative constructions unless necessary. If used, CAP and BOLDFACE the negative word.
- Avoid "Which statement about xyz is true/false?" -- telegraphs poorly.
- The question should telegraph the answer: a knowledgeable examinee can formulate the answer before reading choices.

## Instruction Statements

Use the approved boilerplate from Minerva. Instruction text follows the question sentence (not in parentheses, not in a separate paragraph unless noted).

| Item Type | Instruction Text |
|-----------|-----------------|
| Active Screen | To answer, configure the appropriate options in the dialog box in the answer area. |
| Best Answer | More than one answer choice may achieve the goal. Select the **BEST** answer. |
| Build List (not all correct) | To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order. |
| Build List (all correct) | To answer, move all actions from the list of actions to the answer area and arrange them in the correct order. |
| Build List (multiple correct orders) | Add as separate bold paragraph: **NOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.** |
| Code/Table Analysis | For each of the following statements, select Yes if the statement is true. Otherwise, select No. |
| Drag and Drop (no empty target) | To answer, move the appropriate [source] to the correct [target]. You may use each [source] once, more than once, or not at all. You may need to move the split bar between panes or scroll to view content. |
| Drag and Drop (empty target) | Same as above + **NOTE: [Targets] may be left blank.** |
| EMQ | Bold note at start: **Note: This question is part of a series of questions that use the same or similar answer choices. An answer choice may be correct for more than one question in the series. Each question is independent of the other questions in this series. Information and details provided in a question apply only to that question.** |
| Graphics Interpretation | Use the drop-down menus to select the answer choice that answers each question based on the information presented in the graphic. |
| Hot Area | To answer, select the appropriate [object] in the answer area. |
| Matching | To answer, move the appropriate [term] from the column on the left to its [example] on the right. You may use each [term] once, more than once, or not at all. + **NOTE: Each correct match is worth one point.** |
| Multiple Select MC | Each correct answer presents part of the solution. / Each correct answer presents a complete solution. |
| Polytomously scored | Add as separate paragraph: **NOTE: Each correct selection is worth one point.** |
| Sentence Completion | Select the answer that correctly completes the sentence. |
| Statement Analysis | For each of the following statements, select Yes if the statement is true. Otherwise, select No. |

## Standard Wording

### Role Statements
Boilerplate role statements are no longer used. Discuss with CDM if needed.

### Network Configuration
- "The network contains one Active Directory domain."
- "The network contains one Active Directory domain named [domain]."
- "The network contains one Active Directory forest that contains two domains."
- "The functional level of the domain is Windows Server 2008."

### Servers and Clients
- "All servers run Windows Server 2008."
- "All client computers run Windows 7 Professional."

### Company Offices
- "The company has a main office and two branch offices."
- "The company has offices in Paris, New York, and Cairo."
- Office types: main office, branch office, satellite office.

### Exhibits
- Embedded: "as shown in the following exhibit."
- Non-embedded (non-case study): "as shown in the exhibit. (Click the **Exhibit** tab.)"
- Non-embedded (case study): "as shown in the exhibit. (Click the **Exhibit** button.)"
- Multiple exhibits: name them: "(Click the **Advanced DNS Settings** tab.)"

### Tables
- "The network is configured as shown [or as described] in the following table."

### Error Messages
- "You receive the error message shown in the exhibit."
- "You receive the following error message: '[message]'."

### Goal Statements
- "You need to [goal]."
- "You need to ensure that [goal]."

### Business Parameters
- "You want to achieve this goal by using the least amount of time."
- "You want to achieve this goal while minimizing costs."

### Requirements Lists
Correct lead-in:
- "You have the following requirements:"
- "The application must meet the following requirements:"
- "Your solution must meet the following requirements:"

Incorrect: "You must meet the following requirements:"

Do not mix requirements for "you" and for the application in the same bulleted list.

### Choose-n Wording
Use plural noun: "Which two versions..." not "Which version... (Choose two.)"

### Security Language
- Use "helps protect" -- never absolute claims.
- Do not say "ensures security" or "is protected."
- State "technologies," "features," "enhancements" without absolute promises.

## Word Usage

| Use | Do Not Use | Notes |
|-----|-----------|-------|
| named | called | for specific names of things |
| should | can, must, might, would, may | in question sentences |
| report | complain | for user feedback |
| want, need | would like | emotional connotations inappropriate |
| application | program | for standalone products (Word, Excel); use "program" for setup programs |
| network adapter | NIC, adapter card, network interface card | |
| by using | using, with | as instrument (see MSTP) |
| so that | in order to, in order for, in order that | |
| technical support | support, tech support | |
| help desk | support desk, technical support desk | acceptable alternative |
| location | site (physical) | "site" = logical location only |
| folder | directory | unless product-specific |
| sales department | Sales Department | lowercase department names |
| cannot, do not | can't, don't | no contractions in exams |

### Verb Tenses
- Prefer present tense: "What happens when you open the file?" not "What will happen..."
- Avoid complex tenses: past perfect, future imperfect.

### "Only" Placement
Place "only" close to the word it limits:
- "Only the admin can change the password." (no one else)
- "The admin can only change the password." (can do nothing else)
- "The admin can change only the password." (can change nothing else)

### Plural vs. Singular
- Use plural when number is uncertain: "client computers" not "client computer(s)".
- Do not use "(s)".

### Phrases to Avoid
Delete with no loss of meaning: "Assume that...", "Suppose that..."

### Protocol Capitalization
Capitalize "protocol" only when it is part of the proper name forming the acronym. Never say "SMTP protocol" (P already = Protocol).

### Version Numbers
- Do not use "version" before the number: "Microsoft SQL Server 2008 10.50.1765.0" not "version 10.50.1765.0".
- Only specify version number when contrasting versions or for clarity.

## Formatting Rules

### Text
- Regular: Segoe UI 11pt, AceStandard style
- Code: Consolas 10pt, CodeBlockNew/CodeNumbered style
- PowerShell cmdlets: Segoe UI 11pt **bold**
- Key names: ALL CAPS (TAB, BACKSPACE, CTRL+ALT+DELETE)

### Blank Lines
Insert blank line before and after: bulleted lists, tables, embedded graphics, code segments.

### Tables
- Column headings: sentence caps, **bold**, centered, Gray-10% shading, singular noun
- Other text: sentence caps, Segoe UI 11pt, left-aligned
- Symbols OK in tables (90% not "90 percent")

### Diagrams
- Sentence caps, Segoe UI 11pt

### Innovative Item Graphics
- Source headings: sentence caps, **bold**, plural
- Source captions: sentence caps, Segoe UI 11pt
- Target heading: **Answer Area**
- Target captions: sentence caps, *italic*, singular (matching source heading)

### File Names
Label as a file and use description: "Open the MyWork.doc file" not "Open MyWork.doc". "Run the executable file" not "Run the .exe file."

## Legal and Names

### Microsoft Product Names
- Include "Microsoft" on first mention per item (per case study for case study exams).
- Parallel construction: if answer A = "Microsoft Project" and B = "Microsoft Excel", then C must = "Microsoft PowerPoint" (not just "PowerPoint").
- For a series, "Microsoft" on first name only: "Microsoft PowerPoint 2010 and Excel 2010."
- No abbreviations or acronyms from trademarks.
- No trademark symbols.
- No improper generic combinations: "applications that run on Windows Server" not "Windows Server applications."

### Company Names
- Use only approved fictitious names from the Fictitious Content Guidelines.
- Use the entire company name every time: "Litware, Inc." not "Litware."
- Introduce company name in text before it appears in a graphic.

### People Names
- Do not use personal names. Use "the user," "User1," "User2."
- Email: first name only with fictitious domain: john@contoso.com.

### IP Addresses
- Contact CDM for guidance on fictitious IPs.

### Server/Hardware/Network Names
- Use generic names: Server1, Server2, Computer1, App1, Subnet1, Site1, DC1, DNS1, SQL1.
- No space between object and number.
- Define on first mention: "You install Windows Server 2008 on a computer named Server1."

## Globalization

### Sentence Structure
- Short sentences (15-20 words target).
- Subject + Verb + Object order.
- No inverted subject-verb ("Never have I...").
- Simple verb tenses (simple present, simple past, simple future).
- Avoid progressive tenses (am/is/are + -ing).
- Avoid perfect tenses (have/has/had + past participle).
- Active voice over passive voice (exception: avoid blaming user, actor unknown).

### Vocabulary
- No country-specific names/measurements without alternatives.
- No idiomatic expressions.
- Same term for same concept throughout.
- Spell out acronyms consistently.

### Parts of Speech
- Avoid over-modified nouns.
- Avoid dropped or misused articles.
- Do not make nouns into verbs or verbs into nouns.
- Include implied pronouns.
- Avoid dangling participles.
- Use "'s" only for possessives, never contractions in exams.

### Other
- No parenthetical clauses.
- No slash as punctuation or substitute for "or."
- No nominalizations.
- No noun stacks (more than two modifiers per noun).
- No stacked prepositional phrases.
- Include "that" and "who" for clarity.
- No possessives on product/feature names.

## City List

### Africa
Cairo, Cape Town, Johannesburg, Lagos, Nairobi, Tangier

### Asia (Eastern)
Beijing, Hong Kong, Kyoto, Osaka, Seoul, Shanghai, Taipei, Tokyo

### Asia (Southern) and Pacific
Auckland, Bangkok, Calcutta, Jakarta, Manila, Melbourne, New Delhi, Perth, Singapore, Sydney

### Asia (Western)
Ankara, Baghdad, Damascus, Riyadh, Tel Aviv

### Europe
Amsterdam, Athens, Barcelona, Berlin, Brussels, Budapest, Copenhagen, Dublin, Frankfurt, Geneva, Glasgow, Hamburg, Helsinki, Lisbon, London, Madrid, Moscow, Oslo, Paris, Prague, Rome, Stockholm, Vienna, Warsaw

### North America
Atlanta, Boston, Chicago, Dallas, Denver, Detroit, Los Angeles, Mexico City, Montreal, New York, Ottawa, Quebec, San Diego, San Francisco, Seattle, Toronto, Vancouver

### South America
Bogota, Buenos Aires, Caracas, Lima, Rio de Janeiro, Santiago, Sao Paulo
