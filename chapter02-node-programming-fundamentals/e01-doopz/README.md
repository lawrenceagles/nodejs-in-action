# Chapter 1: Getting started &mdash; e01-doopz
> find duplicate files recursively

## Description
A command-line application that looks for duplicate files recursively, from a given directory.

The application is built as a workflow in which first of all the files from the given directory is retrieved, and then in parallel the duplicates are searched.

The application displays:
+ files that have the same name
+ files that have the same length
+ files that have the same MD5 checksum

Note that process could be improved by computing the checksum only when files have the same length.
