To prove that oracles with for-loops provide the same input-output-behaviour, the induction proceeds in sub-steps. We first prove that if invariant(Left-old,Right-old) holds, then loop-invariant holds on the left and right oracle state after running all the code up to the for loop. Then, we prove that if loop-invariant holds before a loop step, it also holds after a loop step. Finally, we prove that if the loop-invariant holds in the end of the for-loop, then the invariant holds on Left-new and Right-new.

Limitations
- We require the two for-loops to be of the same length.
- Aborts need to be at identical times on the left and the right.
- Randomness mapping can only be done within a single iteration of the for loop.
