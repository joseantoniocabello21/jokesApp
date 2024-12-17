1. What's a closure? Where in the code is there a closure?

A closure is when a function can access values out of their own scope. In the code we can see examples of closures with the react, and custom hooks.

2. Which are the potential side-effects in any function? Could you point out any of these cases in
   your code? Are they expected? Can they be avoided?

We can have some side effects in functions if we dont take care of them properly, as examples we can reassign values, or have unexpected results.
In the application developed one of our possible side effects is when fetching data, because we can't know if the service is going to be available when we needed, reasons out of our hands, but we can have good practices taking care of handling errors, a proper use of variables and scoping, and the use of typescript.
