# Invariants, Lemmata, and Randomness Mapping

Domino allows the user to express their state relations, lemmata, and 
randomness mappings with SMT-LIB language. Additionally, Domino defines a 
syntactic sugar to help writing these relations.

## Invariants
For each equivalence game hop, Domino expects us to define a function called 
`invariant` which takes the states of the left and right sides of the 
code equivalence.

```smtlib
(define-fun invariant 
    (
        (left-state <GameState_{left-game-instance-name>}_<$<!{int-param-1}!>...<!{int-param-n}!>$>>)
        (right-state <GameState_{right-game-instance-name>}_<$<!{int-param-1}!>...<!{int-param-n}!>$>>)
    )
    Bool
    ; your invariant
)
```

Notice that the game instance name shall be the same as the name used when 
instantiating the name in the theorem. Moreover, only integer parameters of the 
games (in the order of declaration in the composition files) 
appear in the game state type. For example:

```smtlib
(define-fun invariant
    (
        (left-game <GameState_Left_<$<!n!><!m!>$>>)
        (right-game <GameState_Right_<$<!n!><!m!>$>>)
    )
    Bool
    true
)
```

> [!TIP]
> You can find the exact type for your game states in the transcripts generated 
> by Domino CLI. [Read about transcripts in CLI options.](../interfaces/cli.md)

> [!NOTE]
> Why only integer parameters?
>
> Integer parameters can be used to declare bit string types (`Bits(n)`)
> and bit strings are translated to a corresponding `Bits_n`. That is, unlike 
> other parameters (functions, booleans, etc.) they can be used to modify 
> types and not just code of packages. Therefore, the current implementation 
> creates a new game (and package) state type for each combination of concrete 
> bit string types. For instance, if a game with an integer parameter `n`is 
> instantiated with literal integer `256` as well as a theorem parameter `skeylen`,
> two game states with `<!256!>` and `<!skeylen!>` in their names are 
> defined in the transcript.

> [!WARNING]
> It is possible that in future, only integers used for type modifications are 
> used in the game state type names. Therefore, it is always a good idea to 
> check the transcript.



### Syntactic Sugar