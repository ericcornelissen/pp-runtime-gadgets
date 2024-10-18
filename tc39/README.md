# `test262` for finding gadgets

The contents of this directory use the [`tc39/test262`] suite to help find
gadgets in the JavaScript language. To do this is rewrites all tests to wrap
objects with [`Proxy`]s that emit something if a missing property access occurs.
The logs of the test run are then analyzed and converted into a [SARIF] file for
manual inspection.

[`proxy`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[sarif]: https://sarifweb.azurewebsites.net/
[`tc39/test262`]: https://github.com/tc39/test262

## Usage

First, make sure you cloned the test262 suite. Either ensure you cloned the repo
with `--recurse-submodules` or run `git submodule update --init` separately.

To run the analysis locally invoke:

```shell
./run.sh
```

Alternative, you can do this in a OCI container (should work with `podman` too):

```shell
docker build --file Containerfile --tag pp-runtime-gadgets-tc39 .
docker run -it pp-runtime-gadgets-tc39
$ sh run.sh
```

The analysis can take up to XX minutes.
