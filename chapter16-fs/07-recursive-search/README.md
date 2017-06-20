# 07-recursive-search
> searching for files recursively on a directory tree

## Description
The example illustrates how to search on a given directory tree for file matching a given file pattern such as `/file.*/`.

If applied to the example-tree, we intend to obtain the following list:
```
[
  "dir-a/dir-b/dir-c/file-e.txt",
  "dir-a/dir-b/file-c.js",
  "dir-a/dir-b/file-d.cpp",
  "dir-a/file-a.js",
  "dir-a/file-b.log"
]
```

This functionality is implemented in a module that exposes both sync and async versions of the functionality.