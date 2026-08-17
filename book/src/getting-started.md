# Getting Started

We currently do not have binary releases, and you need to build from source. Most functions of Domino need some tools installed:

- `domino prove` requires cvc5 installed for checking invariants
- `domino latex` requires z3 for layouting graphs

Since running Domino requires these tools installed, the easiest way for getting started with Domino on Mac or Linux may be through [nix]:

```bash
nix run github:domino-lang/domino
```

Then, to check a Domino project, run from within the project folder:

```bash
nix run github:domino-lang/domino -- prove
```

Alternatively, if you have a Rust toolchain installed, you can install Domino using:

```bash
cargo install --git https://github.com/domino-lang/domino domino
```

Checking a Domino project this way requires having a somewhat recent version of CVC5 installed (but we don't have hard requirements).

Then, to check a Domino project, run from within the project folder:

```bash
domino prove
```

For more instructions on how to use the CLI, take a look at [the respective book section][cli-section].

[cli-section]: /book/interfaces/cli.html
[nix]: https://nix.dev/
