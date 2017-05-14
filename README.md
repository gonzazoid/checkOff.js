# <img src="https://img.shields.io/travis/gonzazoid/checkOff.js.svg"></img> <img src="https://img.shields.io/npm/v/gonzazoid.checkoff.js.svg"></img>

# checkOff.js
<p>Like many other developers I was faced with the need to check for certain properties in the received objects. I have tired of writing multi-storey checks when the thought of simplifying my life came to me. Of cource there is typescript with amazing types system which is looks like contracts but type checking is working only with objects that was created in own code, not for objects that came from outside (as intercepted xmlhttprequest requests in chrome extension or post data in node.js express app) that means that type checking in compile-time does not help us in runtime. Yes, there are raml/swagger specs based on which you can build your validators, there is json schema and bunch of utils but sometimes all of them are somewhat redundant and clumsy for simple checks. Finally I wrote my checker, which is nothing more than an extended replacement of the <b>in</b> operator with minimal type checks. All this fit into one function, the code of which you see above.</p>

Usage is simple — first parameter is verifiable object, second — object-pattern, the structure of which repeats the structure that we expect to see in the object under test. Suppose we want to check whether target object has req.body.formData.to property and is this property an array:
```
const target = {req: {body: {formData: {to: 1, body:[1,2,3]}}}};

console.log(checkOff(target, {req: {body: {formData: {to: []}}}}));

```
if type checking is not needed we can specify null in the pattern object and as a result we have an analog of <b>any</b> in typescript:

```
const target = {req: {body: {formData: {to: 1, body:[1,2,3]}}}};

console.log(checkOff(target, {req: {body: {formData: {to: []}}}}));
```

That is, for verification it is enough to specify in the pattern the value of the same type that you want to get in the object being checked:
<ul>
<li>“” for string</li>
<li>0 for number</li>
<li>[] for array</li>
<li>{} for object</li>
<li>() => {} for function</li>
<li>null — there is no type checking, only the presence of a property is checked</li>
</ul>

<p>I wrote this for node but it will work in browsers, I do not use any new fashionable things but perhaps you have to replace the arrow function with a common definition. I did not write a check of objects’ type (instance of class) since then I would have to write something like new SomeClass () in the pattern object that could be heavy, but if someone needs it — feel free to say.</p>
In general, it looks like a fairly convenient way of objects structure checking to me, perhaps it would be useful for someone.

# Reminders on the topic

* If you are running in a browser — checking isArray for arrays created in different windows does not work — <a href="http://web.mit.edu/jwalden/www/isArray.html">Determining with absolute accuracy whether or not a JavaScript object is an array</a>
* The in operator checks properties on a chain of prototypes. If it is necessary to check up own property — use obj.hasOwnProperty method
* Although javascript defines null as an object, in fact, it is not an object — the in operator does not apply to it. Also you can’t call Object.keys(null). So do not pass null-patterns to the checker, if you do not need a check just do not call the checker.
