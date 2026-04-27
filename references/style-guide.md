# Microsoft Writing Style Guide -- Key Principles

Source: Microsoft Writing Style Guide (internal reference PDF, `references/style-guide.pdf`)
Purpose: Governs the voice, tone, and formatting of all generated exam questions and lab instructions.
Last extracted: 2026-03-02

---

## Table of contents

1. [Voice and tone](#voice-and-tone)
2. [Top 10 tips](#top-10-tips)
3. [Capitalization](#capitalization)
4. [Formatting text in instructions](#formatting-text-in-instructions)
5. [Procedures and instructions](#procedures-and-instructions)
6. [Describing interactions with UI](#describing-interactions-with-ui)
7. [Word choice](#word-choice)
8. [Grammar and parts of speech](#grammar-and-parts-of-speech)
9. [Numbers](#numbers)
10. [Punctuation](#punctuation)
11. [Acronyms and abbreviations](#acronyms-and-abbreviations)
12. [Cloud-computing terminology](#cloud-computing-terminology)
13. [Bias-free communication](#bias-free-communication)
14. [should vs. must](#should-vs-must)

---

## Voice and tone

Microsoft voice is built on three principles:

- **Warm and relaxed** -- Natural, less formal, grounded in real everyday conversations. Occasionally fun (know when to celebrate).
- **Crisp and clear** -- To the point. Write for scanning first, reading second. Make it simple above all.
- **Ready to lend a hand** -- Show customers you are on their side. Anticipate real needs and offer great information at just the right time.

### Style tips

- **Get to the point fast.** Start with the key takeaway. Put the most important thing in the most noticeable spot. Make choices and next steps obvious.
- **Talk like a person.** Choose optimistic, conversational language. Use short everyday words, contractions, and sentence-style capitalization. Shun jargon and acronyms.
- **Simpler is better.** Break it up. Step it out. Layer. Short sentences and fragments are easier to scan and read. Prune every excess word.

### Focus on the customer

- Use second person (you) most of the time.
- Avoid plural first person (we, us) except in privacy/security contexts or to avoid awkward phrasing like "it is recommended."
- Do not use "Microsoft recommends" or "it is recommended." Use "we recommend" if needed, or rewrite with imperative mood.

---

## Top 10 tips

1. **Use bigger ideas, fewer words.** Shorter is always better.
   - Replace: "If you're ready to purchase Office 365 for your organization, contact your Microsoft account representative."
   - With: "Ready to buy? Contact us."

2. **Write like you speak.** Read your text aloud. Avoid jargon and overly complex language.
   - Replace: "Invalid ID"
   - With: "You need an ID that looks like this: someone\@example.com"

3. **Project friendliness.** Use contractions: it's, you'll, you're, we're, let's.
   - **Note for this project:** Exam questions and lab instructions do NOT use contractions per our guardrails. This tip applies to general Microsoft content only.

4. **Get to the point fast.** Lead with what is most important. Front-load keywords for scanning.

5. **Be brief.** Give customers just enough information to make decisions confidently.

6. **When in doubt, do not capitalize.** Default to sentence-style capitalization. Never use title capitalization in headings (Like This). Never.

7. **Skip periods on headings.** Skip end punctuation on titles, headings, subheadings, UI titles, and short list items (three or fewer words).

8. **Remember the last comma.** In a list of three or more items, include a comma before the conjunction (Oxford/serial comma).
   - Correct: "Android, iOS, and Windows"

9. **Do not be spacey.** One space after periods. No spaces around em dashes.

10. **Revise weak writing.** Start statements with a verb. Edit out "you can" and "there is/are/were."
    - Replace: "You can access Office apps across your devices."
    - With: "Access Office apps across your devices."

---

## Capitalization

### Sentence-style capitalization (default)

Capitalize only the first word and any proper nouns. Use for:

- Headings and titles (including blog posts, documentation articles, press releases)
- UI labels
- List items
- Phrases and subheadings

Examples:

- "Find a Microsoft partner" (not "Find a Microsoft Partner")
- "Limited-time offer" (not "Limited-Time Offer")

### Title-style capitalization (rare)

Use only for product/service names, book/song titles, article titles in citations, blog names, and people titles. Rules:

- Always capitalize the first and last words.
- Do not capitalize: a, an, the (unless first word).
- Do not capitalize prepositions of four or fewer letters (on, to, in, up, down, of, for) unless first or last.
- Do not capitalize: and, but, or, nor, yet, so (unless first or last).
- Capitalize all other words including verbs (is), adverbs, adjectives, and pronouns.

### Key rules

- Do not capitalize the spelled-out form of an acronym unless it is a proper noun.
- Do not use all uppercase for emphasis.
- Do not use internal capitalization (AutoScale, e-Book) unless it is part of a brand name.
- Technology concepts, product categories, devices, and features are common nouns (lowercase): cloud computing, smartphone, e-commerce, open source.
- When words are joined by a slash, capitalize the word after the slash if the word before it is capitalized: Country/Region.

### Hyphenated compound words in titles

Capitalize the word after a hyphen if it would be capitalized without the hyphen or it is the last word.

- "Self-Paced Training for Microsoft Visual Studio"
- "Copy-and-Paste Support in Windows Apps"

---

## Formatting text in instructions

Use consistent formatting to help readers locate and interpret information. In documentation and technical content, follow these conventions.

### UI elements (buttons, checkboxes, options)

- Avoid talking about UI elements. Instead, describe what the customer needs to do.
- When you must refer to a UI element by name, use **bold** for the name.
- Use sentence-style capitalization unless you need to match the UI.
- Do not include end punctuation (colons, ellipses) from labels.
- Do not include the element type (button, checkbox) unless it adds needed clarity.

Examples:

- "Select **Save as**" (not "Select the **Save as** button" or "Select **Save as...**")
- "Clear the **Match case** checkbox."
- "Select **Allow row to break across pages**."

### Commands and menus

- Use **bold** for command and menu names.
- Use sentence-style capitalization unless matching the UI.
- Do not include "command" or "menu" unless it adds clarity.

Examples:

- "Go to **Tools**, and select **Change language**."
- "On the **Design** menu, select **Colors**."

### Tabs, blades, panes, palettes, dialogs, toggles

All follow the same pattern:

- Avoid talking about the element. Focus on what the customer does.
- When you must name the element, use **bold**.
- Use sentence-style capitalization unless matching the UI.
- Do not include the element type word unless it adds clarity.

Examples:

- "On the **Design** tab, select **Header row**."
- "In **Web app**, provide a name for your site."
- "Go to **Audit logs** to view events."
- "On the **Resource group** blade, select **Summary**."
- "Turn on the **Pass all filters** toggle."

### Key names and keyboard shortcuts

- Capitalize key names. Use **bold** in instructions.
- No space around the plus sign (+) in shortcuts.

Examples:

- **Shift**, **F7**
- **Ctrl+Alt+Del**
- "To open the Preview tab, select **Alt+3**."

### Code and command-line elements

- Use `code style` for: commands, command-line options, code samples, keywords, variables, functions, methods, classes, data types, constants, environment variables, parameters, markup tags, registry subtrees.
- Capitalize command-line options the way they must be typed: `/a`, `/Aw`.

### Other elements

| Element | Convention | Example |
| ------- | --------- | ------- |
| Database names | **Bold** (code style if in code syntax) | **WingtipToys** database |
| Device/port names | All uppercase | USB, LPT1 |
| Error messages | Sentence-style capitalization. Enclose in quotation marks when referencing in text. | If you see the error message, "Check scanner status and try again," ... |
| File name extensions | All lowercase | .mdb, .doc |
| File names (user-defined) | Title-style capitalization. **Bold** in procedures when directing the customer to interact. Code style in code syntax. | **My Taxes for 2025** |
| Folder/directory names | Sentence-style capitalization. **Bold** in procedures. Code style in code syntax. | **Documents** |
| New terms | Italicize the first mention if defining immediately in text. | Microsoft Exchange consists of both *server* and *client* components. |
| Placeholders | *Italic* for UI text. Angle brackets for code: `<version>`. | Enter *password*. `/v:<version>` |
| Products/services/trademarks | Usually title-style capitalization. | Microsoft Word, Surface Pro |
| URLs | All lowercase. | `www.microsoft.com` |
| User input | Usually lowercase unless case sensitive. **Bold** or *italic* depending on element. | Enter **hello world** |
| Strings | Sentence-style capitalization. Enclose in quotation marks or use code style for code strings. | Select "Now is the time." |
| Windows | Regular text (no bold). Sentence-style capitalization unless matching UI. Do not use "window" for dialogs, blades, or similar elements. | Switch to the source document. |

---

## Procedures and instructions

### When to use procedures

The best procedure is the one you do not need. If the UI is clear, a procedure is unnecessary. When a procedure is needed, look for the simplest presentation: a picture, a video, a single sentence, or a numbered list.

### Step-by-step instructions

- Use numbered steps -- no more than seven, preferably fewer.
- Write a complete sentence for each step. Capitalize the first word. End with a period.
- Use imperative verb forms. Tell the customer what to do.
- Use consistent sentence structures. Use a phrase at the start when needed to establish location, then start with a verb.
- Combine short steps that occur in the same place in the UI.
- Include finalizing actions (OK, Apply) in the related step.
- Make sure the customer knows where the action takes place before describing the action.
- Try to fit the whole procedure on one screen.

Examples:

> **To add an account**
>
> 1. On the **Start** screen, select the tiles you want to group together.
> 2. Drag them to an open space. When a gray bar appears behind them, release the tiles to create the new group.

### Single-step procedures

Use a bullet instead of a number.

> **To move a group of tiles**
>
> - On the Start screen, zoom out and drag the group where you want.

### Right angle bracket shorthand

Abbreviate simple sequential menu interactions with right angle brackets. Include a space before and after each bracket. Do not bold the brackets.

> Select **Accounts** > **Other accounts** > **Add an account**.

**Accessibility note:** Screen readers may skip brackets. Check with an accessibility expert before using this approach.

### Tips for writing steps

- Make sure the customer knows where the action occurs before describing the action.
- If in the same UI context, location details are usually unnecessary.
- If needed, provide a brief phrase at the beginning: "On the **Design** tab, select **Header Row**."
- If there is a chance of confusion, provide an introductory step: "On the ribbon, go to the **Design** tab."

---

## Describing interactions with UI

Use input-neutral verbs that work with any input method (touch, mouse, keyboard, voice).

| Verb | Use for | Example |
| ---- | ------- | ------- |
| **Open** | Apps, programs, blades, File Explorer, files, folders, shortcut menus | Open **Photos**. |
| **Close** | Apps, blades, dialogs, files, folders, notifications, tabs | Close **Excel**. |
| **Leave** | Websites and webpages | Select **Submit** to complete the survey and leave this page. |
| **Go to** | Opening a menu, going to a tab or place in the UI, going to a website | Go to **File**, and then select **Close**. |
| **Select** | Buttons, checkboxes, list values, links, menu items, keys, keyboard shortcuts | Select the **Modify** button. / Select **F5**. / Select **Ctrl+Alt+Delete**. |
| **Select and hold** | Pressing and holding a UI element (~1 second). OK to add "(or right-click)" for non-touch contexts. | Select and hold (or right-click) the Windows taskbar. |
| **>** (angle bracket) | Sequential steps in a clear, consistent path | Select **Accounts** > **Other accounts** > **Add an account**. |
| **Clear** | Removing the selection from a checkbox | Clear the **Header row** checkbox. |
| **Choose** | An exclusive option based on the customer's preference | On the **Font** tab, choose the effects you want. |
| **Switch / Turn on / Turn off** | Toggle keys and toggle switches | Turn on the toggle under **Turn on high contrast**. |
| **Enter** | Typing or inserting a value | In the search box, enter... |
| **Move / Drag** | Moving items from one place to another | Drag the file to the folder. |
| **Zoom / Zoom in / Zoom out** | Changing magnification | Zoom in to see more details. |

### Verbs to avoid

- Avoid **press**, **press and hold**, and **right-click** if you can. Use input-neutral verbs.
- Do not use **click** or **double-click** -- use **select**.
- Do not use **pull down** for menus.

---

## Word choice

- Choose simple, precise words used in everyday conversations.
- Use common contractions (except in exam questions and lab instructions per project guardrails).
- Avoid words with more than one meaning.
- Use as few words as possible. Omit unnecessary adverbs. Use precise one-word verbs (try, not attempt to).
- If you mean the same thing, use the same word consistently.
- Do not give technical meanings to common words (do not use "bucket" to mean "group").
- Do not create new words if one already exists.
- Use technical terms carefully. Define in context if there is a chance the audience will not understand.
- Do not attribute human characteristics to devices and products. Devices do not think or feel.
- Avoid jargon when a familiar word will do.

### Key word preferences

| Instead of | Use |
| --------- | --- |
| carry out | run (for commands, macros, programs) |
| reboot | restart |
| quit | close (apps), sign out (sessions), end (connections) |
| bug fix | software update |
| build (general audience) | create |
| enable/disable | turn on/turn off |
| appears/displays | (no recommendation -- use naturally) |
| e.g. | for example, such as, like |
| can (when not expressing ability) | (delete it and describe the action directly) |
| may | might (for possibility); do not use may for permission |
| should | (only for recommended but optional actions) |
| must | (only for required actions) |

---

## Grammar and parts of speech

- **Present tense.** Use verbs that indicate action happening now (is, open). Avoid will, was, and -ed forms.
- **Indicative mood** for most content (statements of fact). **Imperative mood** for procedures (direct commands). **Subjunctive mood** sparingly.
- **Active voice** whenever possible. In passive voice, the receiver of the action is the subject.
- **Second person** (you) most of the time.
- **No gender-specific pronouns** in generic references. Rewrite with you or a role. They is acceptable as a singular non-binary pronoun.
- **Collective nouns** take a singular pronoun: "The company upgraded its cloud storage."
- **Avoid dangling and misplaced modifiers.** Keep sentences short and simple. Position modifiers to make it clear what they modify.
- **Avoid consecutive prepositional phrases.** Long chains are hard to read.
- **Words ending in -ing** -- Make it clear whether the word is a verb, noun, or adjective. "Meeting requirements" is ambiguous; "Meeting the requirements" or "The meeting requirements" is clear.

---

## Numbers

### Numerals vs. words

- Spell out zero through nine in body text. Use numerals for 10 or greater.
- OK to use numerals for 0-9 when space is limited (tables, UI).
- If one item in a category requires a numeral, use numerals for all items of that type.
- When two numbers referring to different things appear together, spell out one: "fifteen 20-page articles."
- Do not start a sentence with a numeral. Add a modifier or spell it out.

### Always use numerals for

- Measurements (distance, temperature, volume, size, weight, pixels, points)
- Numbers the customer is directed to enter
- Round numbers of 1 million or more (7 million)
- Dimensions (use multiplication sign with spaces: 4 x 4 tile, 1280 x 1024)
- Time of day (10:45 AM, 6:30 PM). Exception: use noon or midnight instead of 12:00.
- Percentages (use numeral + percent sign: 50%, 1%). Use "percentage" when no quantity is specified.
- Coordinates, numbered sections (row 3, column 4, Chapter 10, step 1)

### Commas in numbers

- Use commas in numbers with four or more digits: 1,000; $1,024; 1,093 MB.
- Exception for years, pixels, baud: commas only with five or more digits (2500 B.C. but 10,000 B.C.).
- No commas in page numbers, addresses, or decimal fractions.

### Dates

- Do not use ordinal numbers for dates (not "June first"). Use a numeral: June 1, October 28.
- Always spell out the month name (never use 6/12/2017 format).

### Ordinal numbers

- Always spell out: first, second, twenty-first.
- Do not add -ly (not firstly, secondly).

### Ranges

- Use "from" and "through" for ranges: "from 9 through 17."
- Use en dash in page ranges or where space is limited: 2016-2020, pages 112-120.
- Use "to" in time ranges: 10:00 AM to 2:00 PM.
- Do not use "from" before a range shown with an en dash (not "from 10-15").

### Fractions and decimals

- Hyphenate spelled-out fractions: one-third, two-thirds. Exception: three sixty-fourths.
- Add a zero before the decimal point for fractions less than one: 0.5 cm. Exception: omit when the customer enters the value (enter .75").
- In measurements, use the plural form for decimal quantities: 0.5 inches, 0 inches, 1 inch.

### Abbreviations for large numbers

- In general, spell out thousand, million, billion, or use the entire number.
- If you must abbreviate: capitalize K, M, B. No space between number and abbreviation. Avoid decimals with K.

---

## Punctuation

### Core rules

- End all sentences with a period, even if only two words.
- One space after periods, question marks, exclamation marks, and colons.
- Use the Oxford comma (serial comma) in lists of three or more items: "networks, storage, and virtual machines."
- Use a comma after introductory phrases, to join independent clauses with a conjunction, and to surround the year in a complete date.
- Lowercase the word after a colon unless it is a proper noun or the first word of a quotation.
- Use exclamation points sparingly.
- Use question marks sparingly.

### Lists

- Include a colon at the end of a phrase that directly introduces a list.
- If list elements complete the introductory phrase, use a period after every element.
- If all list elements are short phrases (three words or fewer), do not end them with periods.
- If one or more elements are complete sentences, use a period after every element.

### Quotation marks

- Place closing quotation marks outside commas and periods.
- Place closing quotation marks inside other punctuation.
- Exception: if punctuation is part of the quoted material, place it inside the quotation marks.

### Hyphens

- In general, do not use hyphens unless leaving them out could result in confusion.
- No spaces around em dashes.
- Do not use a slash (/) as a substitute for "or."

### Formatting punctuation

- Format punctuation in the same font style as the main content of the sentence.
- Exception: if punctuation is part of a UI element, command, or user input, format it the same as that element.
  - "Enter **Balance due:** in cell A14." (colon is bold because the customer types it)
  - "On the **Insert** menu, go to **Pictures**, and then select **From File**." (comma after Pictures is not bold)

---

## Acronyms and abbreviations

- Always spell out Microsoft product and feature names.
- Only use acronyms your audience is familiar with.
- Spell out the term first with the acronym in parentheses. On subsequent mentions, use the acronym alone.
- Lowercase the spelled-out form unless it is a proper noun.
- Do not spell out if listed in Merriam-Webster or if the audience is familiar (e.g., AI, URL, USB).
- Do not introduce an acronym used only once (unless needed for SEO).
- Avoid using an acronym for the first time in a title or heading.
- Use "a" or "an" based on pronunciation: an ISP, a SQL database.
- Form the plural by adding s: three APIs.
- Do not use the possessive form unless the acronym refers to a person or organization.

---

## Cloud-computing terminology

Key terms for Azure-related content:

| Term | Usage |
| ---- | ----- |
| cloud, the cloud | Do not capitalize unless part of "the Microsoft Cloud" or a product name. Use mostly as an adjective. Prefer "cloud computing" or "cloud services" over "the cloud." |
| cloud computing | Two words, lowercase. Use instead of "the cloud" when referring generally to delivery of computing services over the internet. |
| cloud platform | Use only for technical audiences (e.g., Azure content). |
| cloud services | Use to refer to servers, storage, databases, software provided via the cloud. |
| cloud native / cloud-native | Lowercase. Hyphenate as adjective before a noun: cloud-native app. Do not use "born in the cloud." |
| hybrid cloud | Define on first mention. For general audiences, use "hybrid model." |
| multicloud | One word, no hyphen. |
| multitenant / multitenancy | One word, no hyphen. For general audiences, prefer friendlier language. |
| on-premises / off-premises | Always plural (premises). Do not use on-premise or off-premise. Hyphenate in all positions. Do not use "on-premises cloud." |
| cross-tenant | Hyphenate in all positions. |
| serverless | One word, no hyphen. |
| the Microsoft Cloud | Capitalize. Refers to the entire Microsoft cloud platform (Azure, Dynamics 365, Microsoft 365, Power Platform). Always include "the." |
| IaaS, PaaS, SaaS | Spell out on first mention with abbreviation in parentheses. Do not capitalize as IAAS/PAAS/SAAS. Do not hyphenate as modifiers. Technical audiences only. |
| edge / edge computing | Lowercase. Use "at the edge" (not "on the edge"). |

---

## Bias-free communication

- Use people-first language by default (refer first to the person, then the disability).
- Identity-first language is acceptable when a person or community prefers it.
- Do not use language with offensive or insensitive connotations.
- Do not use gendered pronouns in generic references. Use "you" or a role.
- Do not use "master/slave" -- use "primary/replica," "primary/secondary," or similar.
- Do not use "blacklist/whitelist" -- use "block list/allow list."
- Avoid militaristic language.

---

## should vs. must

- Consider alternatives first: imperative mood for required actions, "we recommend" for optional ones.
- **should** -- Use only for actions that are recommended but optional. Do not use to indicate probability.
  - "You should back up your data periodically."
- **must** -- Use only for required actions.
  - "To save copies in the same location, you must save each copy with a different file name."
- Do not use "Microsoft recommends" or "it is recommended."

---

## Quick reference for this project

These rules are especially relevant to GH-300 exam questions and lab instructions:

1. **Sentence-style capitalization** everywhere except proper nouns and product names.
2. **Bold** for UI element names in instructions (buttons, menus, tabs, blades, dialogs, toggles, panes).
3. **Do not include element type** (button, checkbox) unless needed for clarity.
4. **Imperative mood** in procedure steps. Tell the customer what to do.
5. **Oxford comma** in all lists.
6. **No contractions** (project guardrail, overrides general Microsoft friendliness advice).
7. **Input-neutral verbs**: select (not click), enter (not type), go to, open, close.
8. **Current Azure terminology** only. See copilot-instructions.md for the rename table.
9. **on-premises** (never on-premise). **cloud-native** (hyphenated before a noun).
10. **Spell out 0-9**, numerals for 10+. Always use numerals for measurements, percentages, and time.
11. **should** for recommendations, **must** for requirements. Prefer imperative mood over both.
12. **No "all of the above"** or "none of the above" in exam choices.
13. **Distractors must be real** -- no fake Azure services, no fake CLI flags.
14. **Every rationale is exactly 2 sentences** per the skill spec.

