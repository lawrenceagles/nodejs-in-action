# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational design patterns
### Exercise 3: A tamper-free queue
Create a `Queue` class that has only one publicly accessible method called `dequeue()`. Such a method returns a `Promise` that resolves with a new element extracted from an internal `queue` data structure.

If the queue is empty, then the `Promise` will resolve when a new item is added. The `Queue` class must also have a *revealing constructor* that provides a function called `enqueue()` to the *executor* that pushes a new element to the end of the internal queue.

The `enqueue()` function can be invoked asynchronously and it must also take care of unblocking any eventual `Promise` returned by the `dequeue()` method.

To try out the `Queue` class, you could build a small HTTP server into the executor function. Such a server would received messages or tasks from a client and would push them into the queue. A loop would then consume all those messages using the `dequeue()` method.

