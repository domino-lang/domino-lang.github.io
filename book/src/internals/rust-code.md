# Rust Code Structure

The `ssp` tool is written in Rust. Here we will go over the structure of its code. First, it is a normal cargo project, so it follows the basic structure of a crate.

## Entrypoint: `/src`

In the src folder, there are a bunch of folders, which we will ignore for now. Instead, we will look at the files:

- identifier.rs
- expressions.rs
- types.rs
- statement.rs
- package.rs
- hacks.rs
- lib.rs

For several of them, you can probably guess what they are about. Identifiers, expressions, types and statements are defined in the respective files. The file `package.rs` contains type definitions for SSP packages, as well as compositions of packages. the `hacks.rs` file contains some smaller hacks that we haven't quite found a good way to properly implement. The lib file just "really ties the room together" and ensures all the types and functions defined in the other files are accessible by the rest of the program.

Now let's take a look at the directories:

- parser/
- transforms/
- writers/
- cli/
- examples/
- bin/

The parser, well, parses the pseudocode into the types defined in the files listed above. This is just "dumb" parsing for the most part, and we still need to do some static analysis like e.g. type checking. All of this is done by transforms. These all live in the transforms directory. We will later take a closer look at them. In the writers directory we have code that encodes compositions etc. in different formats. This is also where the smt code generator lives. The cli folder contains some helper code for our command-line interface. Nothing super exciting. The examples directory contains composition code back from when we didn't have a parser for the pseudocode yet. We should probably delete it. And finally, the code for the executable is in the bin folder.

