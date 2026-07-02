# `domino latex`

This command instructs Domino to export composition diagrams (in TikZ) next to
the pseudocode of the packages (with CryptoCode) to LaTeX. Moreover, it states
the theorems proved in the project and the game hops for each of them. 

The output LaTeX files are stored under the directory `_build/latex` in the 
current project. Some files are marked with `_lossy` in the end of their names. 
These are intended to contain a more readable version of the pseudocode of packages 
for cryptographers or anyone who may care less about the syntactic salt of Domino.

> [!TIP]
> Domino generates two LaTeX files (called `Theorem_{Theorem-Name}.tex` and 
> `Theorem_{Theorem-Name}_lossy.tex`) for each theorem 
> in the project. Consider compiling either of these two files if you want to 
> get an overview of the project.

> [!WARNING]
> It might take a few seconds or minutes for the job to finish. Be patient! Read 
> the rest of the section to see why!

## `-s <SOLVER>` or `--smtsolver <SOLVER>`
This option instructs Domino to use the given SMT solver for generating 
composition diagrams. Possible values are `cvc4`, `cvc5`, and `z3`. It defaults to 
`cvc5`.

> [!TIP]
> Unlike code equivalences, `z3` has shown to be much faster with solving 
> constraints used for construction of composition diagrams.

> [!NOTE]
> How come is an SMT solver used for LaTeX export?
> 
> Eye-catching SSP diagrams can not be generated carelessly. Packages shall not 
> overlap. Calling packages shall lie to the left of the callee packages. Edges 
> shall not cross packages. There should be enough spacing between packages and 
> edges to be aesthetically charming. 
> 
> These requirements require a careful algorithm to be designed. However, as 
> developers of a formal verification tool, we decided to formally state our 
> requirements and let the solver to find a solution adhering to our 
> specifications. [Read more about the constraints passed to the SMT solver here.](../../internals/graph-construction.md)