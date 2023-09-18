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
---

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

# PEP 562: Module __getattr__
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

# PEP 572: Syntax for Statement-Local Name Bindings
https://peps.python.org/pep-0572/

---

```python
# code example goes here
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

# PEP 615, Support for the IANA Time Zone Database in the Standard Library
https://peps.python.org/pep-0615/

---

```python
# code example goes here
```

---

# PEP 584, Add Union Operators To dict
https://peps.python.org/pep-0584/

---

```python
# code example goes here
```

---

# PEP 614, Relaxing Grammar Restrictions On Decorators
https://peps.python.org/pep-0614/

---

```python
# code example goes here
```

---

# PEP 593, Flexible function and variable annotations
https://peps.python.org/pep-0593/

---

```python
# code example goes here
```

---

# PEP 585, Type Hinting Generics In Standard Collections
https://peps.python.org/pep-0585/

---

```python
# code example goes here
```

---

# PEP 616, String methods to remove prefixes and suffixes
https://peps.python.org/pep-0616/

---

```python
# code example goes here
```

---

# 3.10

---

# PEP 604, Allow writing union types as X | Y
https://peps.python.org/pep-0604/

---

```python
# code example goes here
```

---

# PEP 634, PEP 635, PEP 636, Structural Pattern Matching *
https://peps.python.org/pep-0634/
https://peps.python.org/pep-0635/
https://peps.python.org/pep-0636/

---

```python
# code example goes here
```

---

# 3.11

---

# PEP 654, Exception Groups and except*.
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
# code example goes here
```

---

# PEP 680, Support for parsing TOML in the standard library
https://peps.python.org/pep-0680/

---

```python
# code example goes here
```

---

# 3.12

---

# PEP 701: Syntactic formalization of f-strings
https://docs.python.org/3.12/whatsnew/3.12.html#whatsnew312-pep701

---

```python
# code example goes here
```

---

# Ever Better Error Messages
https://docs.python.org/3.12/whatsnew/3.12.html#improved-error-messages

---

```python
# code example goes here
```

---
