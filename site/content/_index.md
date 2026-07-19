---
title: "Domino"
description: "Automated game-hopping proofs for cryptography. Verify reductions with state-separating proofs and check game equivalence with SMT solvers."
---

# Domino

***A tool for checking game hopping proofs***

Domino is a tool for developing and verifying reduction-based game-hopping proofs. It is optimized for proofs which consist of long sequences of conceptually simple, but tedious-to-verify game hops, as is typical for key exchange.

Games and theorems are defined in a custom language that resembles pseudocode, so it is easy to read and write. Domino can visualize it in HTML and LaTeX/tikz. This allows focussing on the code, not the typesetting.

For verifying proofs, Domino is highly automated. The user still needs to define invariants, but Domino checks them using SMT solvers.


## Getting started

To install Domino, just run:

{{< cli "cargo install --git https://github.com/domino-lang/domino domino" >}}

Then, to check a Domino project, run from within the project folder:

{{< cli "domino prove" >}}


For more info, take a look at the [book](/book).


<hr style="margin: 4em 0 2em 0;">

Domino's development is supported by an NGI0 grant from [NLNet](https://nlnet.nl).
