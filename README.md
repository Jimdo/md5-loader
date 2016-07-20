#md5-loader

The md5 loader lets you `import` the checksum of a directory as a variable.

## Potential use case

In a redux app there is the chance you want to persist the store or parts of it in the `localStorage`/`sessionStorage` and rehydrate your app on page-reload or a later session.
However this means you may get very old data from the store if your app has changed significantly in the mean time. Therefore you need some kind of versioning in the localStorage/sessionStorage.

The md5-loader allows you to get the md5-checksum of e.g. your `reducer`-directory, so everytime a reducer changes, the version for the store will change. This allows you to check on rehydration if the versions match and reject or migrate the stored state.

## Parameters

As webpack tries to import content before passing them to the loader you cant specify the directory like you would be used in a *normal* loader.
Instead you should use the `md5-loader` inline and specify the `path` to the directory as a loader *query-parameter*.
As there is no actual file required the loader also does not get the `context` in which it is running, thus you must specify the path to the directory absolute from the root of your project (where your node_modules live etc.).

## Example

```js
var checksum = require('md5-loader?path=some/path/from/root/of/project!');
console.log(checksum);
// logs the md5-checksum of the above directory
```
