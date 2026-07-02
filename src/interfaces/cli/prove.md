# `domino prove`

This is the most useful command that you use most of the time when working with 
Domino. It parses and type checks the project and then verifies the proofs. 
There are several options for the command that we explain here.

> [!IMPORTANT]
> Run this command at the root of a Domino project, where `ssp.toml` is located.

## `-t` or `--transcript`
This option instructs Domino to store the SMT obligations it passes to its prover
backend as a SMT-LIB files under the directory `_build/code_eq` in the current 
project. Domino generates a separate `.smt2` file for each claim (invariant, 
same-output, equal-aborts, and user-defined lemmata) in each oracle exposed by 
each pair of equivalent games, i.e. `{left-game-instance-name}-{right-game-instance-name}-{oracle-name}-{claim}.smt2`.

> [!TIP]
> Use this option for debugging as well as learning how Domino verifies 
> your code equivalence game hops under the hood. You may run your favorite SMT 
> solver directly on this file with various debugging options.

## `-s <SMTSOLVER>` or `--smtsolver <SMTSOLVER>`
This option instructs Domino to use the given SMT solver backend. Possible 
values are `cvc5`, `cvc4`, and `z3`. Default solver is CVC5.

> [!WARNING]
> Currently, we have tested our example projects only with cvc5.

## `--proof <PROOF>`
This option instructs Domino to only attempt proving the given theorem. Notice 
that the theorem name defined with the theorem block in the theorem file is 
considered, not the name of theorem file. For example:

```bash
domino prove --proof Simple4WHS
```

## `--proofstep <PROOFSTEP>`
Given that the previous `--proof` option is provided, user can specify the 
numeric index of the game hop they wish to verify in the given theorem `<PROOF>`. 
Game hops in a `gamehop` block 
are indexed from top to bottom starting from zero. For example:

```bash
domino prove --proof Simple4WHS --proofstep 0
```

## `--oracle <ORACLE>`
Given that the previous two options `--proof` and `--proofstep` are provided and 
the game hop corresponding to `<PROOFSTEP>` is an equivalence game hop, the user 
can specify the name of the oracle they wish to be verified. For example:

```bash
domino prove --proof Simple4WHS --proofstep 0 --oracle NewKey
```

## `--parallel <THREADS>`
This option instructs Domino to spawn a thread pool of size `<THREADS> + 1` for 
SMT solving. It defaults to 1, i.e. 2 threads; therefore, parallel solving is on 
by default.
