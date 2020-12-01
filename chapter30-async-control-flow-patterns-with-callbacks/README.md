# Part 4: Node.js avanced patterns and techniques
## Chapter 30 &mdash; Asynchronous Control Flow Patterns with Callbacks
> tbd

### Contents (TBD)

### Intro 
Asynchronous code and continuation-passing style (CPS) can be frustrating:
+ It is difficult to predict the order execution
+ It is easy to create inefficient and unreadable code when orchestrating sets of operations

### The difficulties of asynchronous programming
Let's create a simple program to illustrate the difficulties of asynchronous programming.

The program will be a simple *web crawler* that takes in a web URL as input and downloads its contents locally into a file.

The core functionality of the module will be contained inside a module `spider.js`, and will delegate some tasks to a local module `utils.js` and to the npm packages `superagent` and `mkdirp`.

Let's have a look at the `spider.js` file:

```javascript
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';

export function spider(url, cb) {
  const filename = urlToFilename(url);

  // has filename already been downloaded
  fs.access(filename, err => {
    // ENOENT means file did not previously exist    
    if (err?.code === 'ENOENT') {
      superagent.get(url).end((err, res) => {
        if (err) {
          cb(err);
        } else {
          // create the dir that will host the file
          mkdirp(path.dirname(filename), err => {
            if (err) {
              cb(err);
            } else {
              // write the responde of the HTTP request to the file system
              fs.writeFile(filename, res.text, err => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              });
            }
          });
        }
      });
    } else {
      cb(null, filename, false);
    }
  });
}
```

The function starts by checking whether the URL was already downloaded using `fs.access(...)`. If the response is different from `ENOENT` which is the result that tells us the file does not exist, the URL will be downloaded. Otherwise, it means the file has already been downloaded, and we invoke the received callback passing it the name of the downloaded file and `false` to signal it was already there.

Then, we access the URL and get the response using `superagent.get(url).end((err, res) => ...)`. If we find and error, we invoke the callback passing `err` in the first parameter. Otherwise, we proceed to the next step.

In the next step we use `mkdirp(path.dirname(filename), err => ...)` to create the directory that will contain the file.

Finally, we write the content that was downloaded using `fs.writeFile`.

The function is invoked from a `main.js` program that invokes the function with the parameter that was given to the program and the callback that just prints some informational messages telling the user how the process went:

```javascript
import { spider } from './lib/spider.js';

spider(process.argv[2] ?? 'http://www.example.com', (err, filename, downloaded) => {
  if (err) {
    console.error(`ERROR: main: ${ err.message }`);    
  } else if (downloaded) {
    console.log(`INFO: Completed download of ${ filename }`);
  } else {
    console.log(`INFO: '${ filename } was already downloaded`);
  }
});
```

| EXAMPLE: |
| :------- |
| You have the first version of the web crawler in [01 &mdash; A simple web crawler](./01-a-simple-web-crawler/). |

#### Callback hell
Even in the simple example above, you can appreciate the several levels of indentation, and the number of nested `()` and `{}` that complicates the maintainability and readability of the code.

The situation where the abundance of closures and *in-place callback* definitions transforms the code in an unreadable and unmmanageable blob is known as **callback hell*. It's one of the most widely recognized and severe *anti-patterns* of Node.js and JavaScript in general:

```javascript
asyncFoo(err => {
  asyncBar(err => {
    asyncFooBar(err => {
      ...
    })
  })
});
```

The most evident problem with this code is its poor readability &mdash; it's impossible to keep track where a function ends and where another begins.

Another issue is caused by the overlapping of the variable names used in each scope &mdash; `err`, `cb`, etc. are likely to be reused in each of the functions and it is easy to lose track of which one you are referring to. Some developers name the variables as `err1`, `err2`... but that solution is not very good either.

### Callback best practices and control flow patterns
The previous example is a textbook definition of the callback hell that we should avoid. However, it is not the only problem we should be aware of wen writing asynchronous code with callbacks. Iteration and recursion also require special techniques.

#### Callback discipline
The first rule to keep in mind is:
> Do not abuse in-place definitions when defining callbacks.

It might be tempting not to do so, as it relieves you from thinking about modularity and reusability, but in the long run, complicates the solution.

You can also apply the following principles:
+ Exit as soon as possible &mdash; use `return`, `continue`, or `break`, depending on the context, to immediately exit the current statement instead of writing (and nesting) complete *if...else* statements.
+ Create named functions for callbacks, keeping them out of closures and passing intermediate results as arguments. Naming functions will also help with problem identification in stack traces.
+ Modularize the code. Split the code into smaller, reusable functions whenever possible.

#### Applying the callback discipline
Let's apply the previous principles to our simple web crawler.

The first step consists in changing the complete *if...else* function into *early returns*:

```javascript
// if (err) {
//   cb(err)
// } else {
//   // .. everything went well
// }
if (err) {
  return cb(err)
}
// everything went well
```

This is often referred to as the **early return principle**.

| NOTE: |
| :---- |
| A common mistake when doing this simple refactoring is to forget the `return` when doing the early exit from the function. Note also that the return code from the callback is typically ignored, as the result is passed using *CPS*.

The second optimization consists in identifyin reusable pieces of code such as `saveFile(...)` and `download(...)`. This will make the code more readable and alleviate the *callback pyramid*.

### You know you've mastered this chapter when...

### Code and Exercises

#### [01 &mdash; A simple web crawler](./01-a-simple-web-crawler/)
First version of a simple web crawler that takes in a web URL as input and downloads its contents locally to a file
