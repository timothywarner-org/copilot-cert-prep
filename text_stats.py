"""
text_stats.py

Analyze a given text file and provide statistics:
- Total lines
- Total words
- Average word length
- Top 5 most common words (excluding stopwords)
"""

import sys
from collections import Counter
import string


# TODO: Ask Copilot to fetch stopwords list automatically

def load_text(filepath: str) -> str:
    """Read and return content of a text file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()


def clean_words(text: str) -> list[str]:
    """Convert text to lowercase, strip punctuation, and split into words."""
    translator = str.maketrans('', '', string.punctuation)
    cleaned = text.lower().translate(translator)
    words = cleaned.split()
    return [w for w in words if w.isalpha()]


def word_statistics(words: list[str]) -> tuple[int, int, float, list[tuple[str, int]]]:
    """
    Calculate:
    - total lines
    - total words
    - average word length
    - top 5 most common words
    """
    total_words = len(words)
    avg_len = sum(len(w) for w in words) / total_words if total_words else 0
    counter = Counter(words)
    common = counter.most_common(5)
    return total_words, avg_len, common


def main(filepath: str):
    text = load_text(filepath)
    words = clean_words(text)
    total_words, avg_len, common = word_statistics(words)

    print(f"File: {filepath}")
    print(f"Total words: {total_words}")
    print(f"Avg word length: {avg_len:.2f}")
    print("Top 5 words:")
    for word, count in common:
        print(f"  {word}: {count}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python text_stats.py <path-to-text-file>")
    else:
        main(sys.argv[1])
