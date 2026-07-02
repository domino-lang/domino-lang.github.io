(() => {
  if (!window.hljs) {
    return;
  }

  function domino(hljs) {
    return {
      name: "Domino",
      aliases: ["domino-lang", "ssp"],
      keywords: {
        keyword:
          "package params state import oracles oracle parse types composition const instance compose of return assert abort invoke for theorem assumption assumptions propositions reduction equivalence conjecture hybrid gamehops map invariant lemmas randomness and or xor not as new fn",
        literal: "true false None Some Unwrap emptyset",
        built_in: "Integer Bool String Bits Maybe Table List Set",
      },
      contains: [
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: "keyword",
          begin: /\bsample-name\b/,
        },
        {
          className: "literal",
          begin: /\b(?:0|1)_[A-Za-z0-9_*]+\b/,
        },
        {
          className: "number",
          begin: /\b\d+\b/,
          relevance: 0,
        },
        {
          className: "title",
          begin: /[A-Za-z_][A-Za-z0-9_]*(?=\s*\()/,
          relevance: 0,
        },
      ],
    };
  }

  function smtlib(hljs) {
    return {
      name: "SMT-LIB",
      aliases: ["smt2", "smt-lib", "smtlib2"],
      keywords: {
        $pattern:
          /:[A-Za-z0-9~!@$%^&*_+=<>.?/-]+|[A-Za-z~!@$%^&*_+=<>.?/][A-Za-z0-9~!@$%^&*_+=<>.?/-]*/,
        keyword:
          "assert check-sat check-sat-assuming declare-const declare-datatype declare-datatypes declare-fun declare-sort define-fun define-fun-rec define-funs-rec define-sort echo exit get-assertions get-assignment get-info get-model get-option get-proof get-unsat-assumptions get-unsat-core get-value pop push reset reset-assertions set-info set-logic set-option let par match exists forall lambda as !",
        literal: "true false",
        built_in: "Bool Int Real String RegLan Array BitVec FloatingPoint RoundingMode",
      },
      contains: [
        hljs.COMMENT(";", "$", { relevance: 0 }),
        hljs.QUOTE_STRING_MODE,
        {
          className: "symbol",
          begin: /\|[^|\n]+\|/,
        },
        {
          className: "attr",
          begin: /:[A-Za-z0-9~!@$%^&*_+=<>.?/-]+/,
          relevance: 0,
        },
        {
          className: "number",
          begin: /#x[0-9A-Fa-f]+/,
          relevance: 0,
        },
        {
          className: "number",
          begin: /#b[01]+/,
          relevance: 0,
        },
        {
          className: "number",
          begin: /\b\d+(?:\.\d+)?\b/,
          relevance: 0,
        },
      ],
    };
  }

  if (!hljs.getLanguage("domino")) {
    hljs.registerLanguage("domino", domino);
  }

  if (!hljs.getLanguage("smtlib")) {
    hljs.registerLanguage("smtlib", smtlib);
  }

  const customLanguages = new Set([
    "language-domino",
    "language-domino-lang",
    "language-ssp",
    "language-smtlib",
    "language-smt2",
    "language-smt-lib",
    "language-smtlib2",
  ]);

  function rehighlight(block) {
    if (typeof hljs.highlightElement === "function") {
      hljs.highlightElement(block);
      return;
    }

    if (typeof hljs.highlightBlock === "function") {
      hljs.highlightBlock(block);
    }
  }

  // mdBook loads additional-js after book.js, so custom languages must
  // register and then re-highlight the affected blocks.
  document.querySelectorAll("pre code").forEach((block) => {
    const needsCustomHighlight = Array.from(block.classList).some((className) =>
      customLanguages.has(className),
    );

    if (!needsCustomHighlight) {
      return;
    }

    block.removeAttribute("data-highlighted");
    block.textContent = block.textContent;
    rehighlight(block);
  });
})();
