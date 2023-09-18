---
theme: default
_class: lead
paginate: true
backgroundColor: #fff
---

# Что нового?

Краткий обзор изменений в новых (и не очень) версиях Python

---

# Мотивация

---

# Объём информации *

---

# Где узнать подробности?

---

https://docs.python.org/3/whatsnew/
<iframe style="height:100%" src="https://docs.python.org/3/whatsnew/"></iframe>

---

# Какие версии Python актуальны на данный момент?

---

https://devguide.python.org/versions/
<iframe style="height:100%" src="https://devguide.python.org/versions/"></iframe>

---

# Какая версия Python сейчас самая популярная?

---

https://pypistats.org/packages/__all__
<iframe style="height:100%" src="https://pypistats.org/packages/__all__"></iframe>

---

```
pip install -U pypistats

pypistats python_minor __all__ --last-month
```

---

```
┌──────────┬─────────┬────────────────┐
│ category │ percent │      downloads │
├──────────┼─────────┼────────────────┤
│ 3.8      │  24.56% │  6,165,327,974 │
│ 3.7      │  22.32% │  5,603,747,202 │
│ 3.9      │  18.76% │  4,709,583,139 │
│ 3.10     │  14.61% │  3,667,107,862 │
│ 3.11     │   5.92% │  1,487,067,893 │
│ 3.6      │   5.77% │  1,448,907,849 │
│ null     │   5.50% │  1,381,068,826 │
│ 2.7      │   2.23% │    560,300,765 │
│ 3.5      │   0.21% │     53,413,822 │
│ 3.4      │   0.09% │     23,739,117 │
│ 3.12     │   0.02% │      5,772,685 │
│ 3.13     │   0.00% │        166,068 │
│ 3.3      │   0.00% │         92,245 │
│ 3.1      │   0.00% │          3,687 │
│ 3.2      │   0.00% │          2,801 │
│ 2.6      │   0.00% │            667 │
│ 2.8      │   0.00% │             58 │
│ Total    │         │ 25,106,302,660 │
└──────────┴─────────┴────────────────┘

Date range: 2023-08-01 - 2023-08-31
```

---

# 3.6

---

# PEP 498: Literal String Interpolation
https://peps.python.org/pep-0498/

---


```python
>>> value = 4 * 20
>>> f'The value is {value}.'
'The value is 80.'
```

---

# PEP 515: Underscores in Numeric Literals
https://www.python.org/dev/peps/pep-0515/

---

```python
# grouping decimal numbers by thousands
amount = 10_000_000.0

# grouping hexadecimal addresses by words
addr = 0xCAFE_F00D

# grouping bits into nibbles in a binary literal
flags = 0b_0011_1111_0100_1110

# same, for string conversions
flags = int('0b_1111_0000', 2)
```

---

# PEP 526: Syntax for Variable Annotations
https://peps.python.org/pep-0526/

---

PEP 484 introduced type hints, a.k.a. type annotations. While its main focus was function annotations, it also introduced the notion of type comments to annotate variables:
```python
# 'primes' is a list of integers
primes = []  # type: List[int]

# 'captain' is a string (Note: initial value is a problem)
captain = ...  # type: str

class Starship:
    # 'stats' is a class variable
    stats = {}  # type: Dict[str, int]
```

---

This PEP aims at adding syntax to Python for annotating the types of variables (including class variables and instance variables), instead of expressing them through comments:
```python
primes: List[int] = []

captain: str  # Note: no initial value!

class Starship:
    stats: ClassVar[Dict[str, int]] = {}
```

---

# PEP 525: Asynchronous Generators
https://peps.python.org/pep-0525/

---

As an illustration of the code quality improvement, consider the following class that prints numbers with a given delay once iterated:
```python
class Ticker:
    """Yield numbers from 0 to `to` every `delay` seconds."""

    def __init__(self, delay, to):
        self.delay = delay
        self.i = 0
        self.to = to

    def __aiter__(self):
        return self

    async def __anext__(self):
        i = self.i
        if i >= self.to:
            raise StopAsyncIteration
        self.i += 1
        if i:
            await asyncio.sleep(self.delay)
        return i
```

---

The same can be implemented as a much simpler asynchronous generator:
```python
async def ticker(delay, to):
    """Yield numbers from 0 to `to` every `delay` seconds."""
    for i in range(to):
        yield i
        await asyncio.sleep(delay)
```

---

# PEP 530: Asynchronous Comprehensions
https://peps.python.org/pep-0530/

---

To illustrate the readability improvement, consider the following example:
```python
result = []
async for i in aiter():
    if i % 2:
        result.append(i)
```

---

With the proposed asynchronous comprehensions syntax, the above code becomes as short as:
```python
result = [i async for i in aiter() if i % 2]
```

---

The PEP also makes it possible to use the await expressions in all kinds of comprehensions:
```python
result = [await fun() for fun in funcs]
```

---

# 3.7

---

# PEP 553: Built-in breakpoint()
https://www.python.org/dev/peps/pep-0553/

---

Python has long had a great debugger in its standard library called pdb. Setting a break point is commonly written like this:
```python
foo()
import pdb; pdb.set_trace()
bar()
```

---

This PEP proposes a new built-in function called breakpoint() which enters a Python debugger at the call site. Thus the example above would be written like so:
```python
foo()
breakpoint()
bar()
```

---

# PEP 557: Data Classes *
https://www.python.org/dev/peps/pep-0557/

---

The @dataclass decorator adds generated methods to the class and returns the same class it was given.
```python
@dataclass
class InventoryItem:
    '''Class for keeping track of an item in inventory.'''
    name: str
    unit_price: float
    quantity_on_hand: int = 0

    def total_cost(self) -> float:
        return self.unit_price * self.quantity_on_hand
```

---

The @dataclass decorator will add the equivalent of these methods to the InventoryItem class:
```python
def __init__(self, name: str, unit_price: float, quantity_on_hand: int = 0) -> None:
    self.name = name
    self.unit_price = unit_price
    self.quantity_on_hand = quantity_on_hand
def __repr__(self):
    return f'InventoryItem(name={self.name!r}, unit_price={self.unit_price!r}, quantity_on_hand={self.quantity_on_hand!r})'
def __eq__(self, other):
    if other.__class__ is self.__class__:
        return (self.name, self.unit_price, self.quantity_on_hand) == (other.name, other.unit_price, other.quantity_on_hand)
    return NotImplemented
def __ne__(self, other):
    if other.__class__ is self.__class__:
        return (self.name, self.unit_price, self.quantity_on_hand) != (other.name, other.unit_price, other.quantity_on_hand)
    return NotImplemented
def __lt__(self, other):
    if other.__class__ is self.__class__:
        return (self.name, self.unit_price, self.quantity_on_hand) < (other.name, other.unit_price, other.quantity_on_hand)
    return NotImplemented
def __le__(self, other):
    if other.__class__ is self.__class__:
        return (self.name, self.unit_price, self.quantity_on_hand) <= (other.name, other.unit_price, other.quantity_on_hand)
    return NotImplemented
def __gt__(self, other):
    if other.__class__ is self.__class__:
        return (self.name, self.unit_price, self.quantity_on_hand) > (other.name, other.unit_price, other.quantity_on_hand)
    return NotImplemented
def __ge__(self, other):
    if other.__class__ is self.__class__:
        return (self.name, self.unit_price, self.quantity_on_hand) >= (other.name, other.unit_price, other.quantity_on_hand)
    return NotImplemented
```

---

# PEP 562: Module `__getattr__`
https://www.python.org/dev/peps/pep-0562/

---

A typical example is managing deprecation warnings.
```python
# lib.py

from warnings import warn

deprecated_names = ["old_function", ...]

def _deprecated_old_function(arg, other):
    ...

def __getattr__(name):
    if name in deprecated_names:
        warn(f"{name} is deprecated", DeprecationWarning)
        return globals()[f"_deprecated_{name}"]
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

# main.py

from lib import old_function  # Works, but emits the warning
```

---

Another widespread use case for __getattr__ would be lazy submodule imports. Consider a simple example:
```python
# lib/__init__.py

import importlib

__all__ = ['submod', ...]

def __getattr__(name):
    if name in __all__:
        return importlib.import_module("." + name, __name__)
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

# lib/submod.py

print("Submodule loaded")
class HeavyClass:
    ...

# main.py

import lib
lib.submod.HeavyClass  # prints "Submodule loaded"
```

---

In addition, to allow modifying result of a dir() call on a module to show deprecated and other dynamically generated attributes, it is proposed to support module level __dir__ function. For example:
```python
# lib.py

deprecated_names = ["old_function", ...]
__all__ = ["new_function_one", "new_function_two", ...]

def new_function_one(arg, other):
   ...
def new_function_two(arg, other):
    ...

def __dir__():
    return sorted(__all__ + deprecated_names)

# main.py

import lib

dir(lib)  # prints ["new_function_one", "new_function_two", "old_function", ...]
```

---

# 3.8

---

# PEP 572: Assignment Expressions
https://peps.python.org/pep-0572/

---

```python
# Handle a matched regex
if (match := pattern.search(data)) is not None:
    # Do something with match

# A loop that can't be trivially rewritten using 2-arg iter()
while chunk := file.read(8192):
   process(chunk)

# Reuse a value that's expensive to compute
[y := f(x), y**2, y**3]

# Share a subexpression between a comprehension filter clause and its output
filtered_data = [y for x in data if (y := f(x)) is not None]
```

---

# PEP 570: Python Positional-Only Parameters
https://www.python.org/dev/peps/pep-0570/

---

From the “ten-thousand foot view”, eliding *args and **kwargs for illustration, the grammar for a function definition would look like:
```python
def name(positional_or_keyword_parameters, *, keyword_only_parameters):
    ...
```

---

Building on that example, the new syntax for function definitions would look like:
```python
def name(positional_only_parameters, /, positional_or_keyword_parameters, *, keyword_only_parameters):
    ...
```

---

# PEP 591 – Adding a final qualifier to typing
https://peps.python.org/pep-0591/

---

The typing.final decorator is used to restrict the use of inheritance and overriding.
```python
from typing import final

@final
class Base:
    ...

class Derived(Base):  # Error: Cannot inherit from final class "Base"
    ...
```

---

# PEP 586 – Literal Types
https://peps.python.org/pep-0586/

---

Literal types indicate that some expression has literally a specific value.
```python
from typing import Literal

def accepts_only_four(x: Literal[4]) -> None:
    pass

accepts_only_four(4)   # OK
accepts_only_four(19)  # Rejected
```

---

# PEP 589 – TypedDict: Type Hints for Dictionaries with a Fixed Set of Keys
https://peps.python.org/pep-0589/

---

Here is an example where PEP 484 doesn’t allow us to annotate satisfactorily:
```python
movie = {'name': 'Blade Runner', 'year': 1982}
```

---

This PEP proposes the addition of a new type constructor, called TypedDict, to allow the type of movie to be represented precisely:
```python
from typing import TypedDict

class Movie(TypedDict):
    name: str
    year: int

movie: Movie = {'name': 'Blade Runner', 'year': 1982}
```

---

# f-strings support a handy = specifier for debugging

---

```python
>>> python = 3.7
>>> f"python={python}"
'python=3.7'
```

---

```python
>>> python = 3.8
>>> f"{python=}"
'python=3.8'
```

---

# 3.9

---

# PEP 615: Support for the IANA Time Zone Database in the Standard Library
https://peps.python.org/pep-0615/

---

```python
>>> from datetime import datetime
>>> from zoneinfo import ZoneInfo
>>> datetime.now(tz=ZoneInfo("Europe/Oslo"))
datetime.datetime(2020, 9, 8, 17, 12, 0, 939001, tzinfo=zoneinfo.ZoneInfo(key='Europe/Oslo'))

>>> datetime(2020, 10, 5, 3, 9, tzinfo=ZoneInfo("America/Vancouver"))
datetime.datetime(2020, 10, 5, 3, 9, tzinfo=zoneinfo.ZoneInfo(key='America/Vancouver'))
```

---

# PEP 584: Add Union Operators To dict
https://peps.python.org/pep-0584/

---

Dict union will return a new dict consisting of the left operand merged with the right operand
```python
>>> d = {'spam': 1, 'eggs': 2, 'cheese': 3}
>>> e = {'cheese': 'cheddar', 'aardvark': 'Ethel'}
>>> d | e
{'spam': 1, 'eggs': 2, 'cheese': 'cheddar', 'aardvark': 'Ethel'}
>>> e | d
{'cheese': 3, 'aardvark': 'Ethel', 'spam': 1, 'eggs': 2}
```

---

The augmented assignment version operates in-place:
```python
>>> d |= e
>>> d
{'spam': 1, 'eggs': 2, 'cheese': 'cheddar', 'aardvark': 'Ethel'}
```

---

# PEP 585: Type Hinting Generics In Standard Collections
https://peps.python.org/pep-0585/


---
This PEP proposes to enable support for the generics syntax in all standard collections currently available in the typing module.
```python
from __future__ import annotations

def find(haystack: dict[str, list[int]]) -> int:
    ...
```

---

# PEP 616: String methods to remove prefixes and suffixes
https://peps.python.org/pep-0616/

---

```python
def strip_quotes(text):
    if text.startswith('"'):
        text = text[1:]
    if text.endswith('"'):
        text = text[:-1]
    return text
```

---

```python
def strip_quotes(text):
    return text.removeprefix('"').removesuffix('"')
```

---

# 3.10

---

# PEP 604: Allow writing union types as X | Y
https://peps.python.org/pep-0604/

---

The new union syntax should be accepted for function, variable and parameter annotations.
```python
# Instead of
# def f(list: List[Union[int, str]], param: Optional[int]) -> Union[float, str]
def f(list: List[int | str], param: int | None) -> float | str:
    pass

f([1, "abc"], None)

# Instead of typing.List[typing.Union[str, int]]
typing.List[str | int]
list[str | int]

# Instead of typing.Dict[str, typing.Union[int, float]]
typing.Dict[str, int | float]
dict[str, int | float]
```

---

# PEP 634: Structural Pattern Matching *
https://peps.python.org/pep-0634/

---

```python
>>> user = {
...     "name": {"first": "Pablo", "last": "Galindo Salgado"},
...     "title": "Python 3.10 release manager",
... }

>>> match user:
...     case {"name": {"first": first_name}}:
...         pass
...

>>> first_name
'Pablo'
```

---

```python
def sum_list(numbers):
    match numbers:
        case []:
            return 0
        case [int(first) | float(first), *rest]:
            return first + sum_list(rest)
        case _:
            raise ValueError(f"Can only sum lists of numbers")

>>> sum_list([45.94, 46.17, 46.72])
138.82999999999998
```

---

# 3.11

---

# PEP 654: Exception Groups and except*.
https://peps.python.org/pep-0654/

---

```python
# code example goes here
```

---

# PEP 657: Include Fine Grained Error Locations in Tracebacks
https://peps.python.org/pep-0657/

---

```python
# inverse.py

def inverse(number):
    return 1 / number

print(inverse(0))

$ python inverse.py
Traceback (most recent call last):
  File "/home/realpython/inverse.py", line 6, in <module>
    print(inverse(0))
          ^^^^^^^^^^
  File "/home/realpython/inverse.py", line 4, in inverse
    return 1 / number
           ~~^~~~~~~~
ZeroDivisionError: division by zero
```

---

# PEP 680: Support for parsing TOML in the standard library
https://peps.python.org/pep-0680/

---

```python
# pyproject.toml

[build-system]
requires = ["flit_core>=3.2.0,<4"]
build-backend = "flit_core.buildapi"

[project]
name = "tomli"
version = "2.0.1"  # DO NOT EDIT THIS LINE MANUALLY. LET bump2version DO IT
description = "A lil' TOML parser"
requires-python = ">=3.7"
readme = "README.md"
keywords = ["toml"]

    [project.urls]
    "Homepage" = "https://github.com/hukkin/tomli"
    "PyPI" = "https://pypi.org/project/tomli"
```

---
 
```python
# TOML support, which allows you to parse TOML documents using the standard library
import tomllib
with open("pyproject.toml", mode="rb") as fp:
    tomllib.load(fp)

# {'build-system': {'requires': ['flit_core>=3.2.0,<4'],
#                   'build-backend': 'flit_core.buildapi'},
#  'project': {'name': 'tomli',
#              'version': '2.0.1',
#              'description': "A lil' TOML parser",
#              'requires-python': '>=3.7',
#              'readme': 'README.md',
#              'keywords': ['toml'],
#              'urls': {'Homepage': 'https://github.com/hukkin/tomli',
#                       'PyPI': 'https://pypi.org/project/tomli'}}}
```
 
---

# 3.12

---

# PEP 701: Syntactic formalization of f-strings
https://docs.python.org/3.12/whatsnew/3.12.html#whatsnew312-pep701

---
Quote reuse: in Python 3.11, reusing the same quotes as the containing f-string raises a SyntaxError, forcing the user to either use other available quotes (like using double quotes or triple quotes if the f-string uses single quotes). In Python 3.12, you can now do things like this:
```python
>>> songs = ['Take me back to Eden', 'Alkaline', 'Ascensionism']
>>> f"This is the playlist: {", ".join(songs)}"
'This is the playlist: Take me back to Eden, Alkaline, Ascensionism'
```

---

Note that before this change there was no explicit limit in how f-strings can be nested, but the fact that string quotes cannot be reused inside the expression component of f-strings made it impossible to nest f-strings arbitrarily. In fact, this is the most nested f-string that could be written:
```python
>>> f"""{f'''{f'{f"{1+1}"}'}'''}"""
'2'

>>> f"{f"{f"{f"{f"{f"{1+1}"}"}"}"}"}"
'2'
```

---

Multi-line expressions and comments: In Python 3.11, f-strings expressions must be defined in a single line even if outside f-strings expressions could span multiple lines (like literal lists being defined over multiple lines), making them harder to read. In Python 3.12 you can now define expressions spanning multiple lines and include comments on them:
```python
>>> f"This is the playlist: {", ".join([
...     'Take me back to Eden',  # My, my, those eyes like fire
...     'Alkaline',              # Not acid nor alkaline
...     'Ascensionism'           # Take to the broken skies at last
... ])}"
'This is the playlist: Take me back to Eden, Alkaline, Ascensionism'
```

---

# Ever Better Error Messages
https://docs.python.org/3.12/whatsnew/3.12.html#improved-error-messages

---

```python
# Modules from the standard library are now potentially suggested as part of the error messages displayed by the interpreter when a NameError is raised to the top level.
sys.version_info
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'sys' is not defined. Did you forget to import 'sys'?
```

---

```python
# Improve the error suggestion for NameError exceptions for instances.
class A:
   def __init__(self):
       self.blech = 1

   def foo(self):
       somethin = blech

A().foo()
  File "<stdin>", line 1
    somethin = blech
               ^^^^^
NameError: name 'blech' is not defined. Did you mean: 'self.blech'?
```

---

```python
# Improve the SyntaxError error message when the user types import x from y instead of from y import x

import a.y.z from b.y.z
  File "<stdin>", line 1
    import a.y.z from b.y.z
    ^^^^^^^^^^^^^^^^^^^^^^^
SyntaxError: Did you mean to use 'from ... import ...' instead?
```

---

```python
# ImportError exceptions raised from failed from <module> import <name> statements now include suggestions for the value of <name> based on the available names in <module>.

from collections import chainmap
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: cannot import name 'chainmap' from 'collections'. Did you mean: 'ChainMap'?
```