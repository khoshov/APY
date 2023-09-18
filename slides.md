---
theme: default
_class: lead
paginate: true
backgroundColor: #fff
---

# Что нового?

Краткий обзор изменений в новых (и не очень) версиях Python

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

```python
# 'primes' is a list of integers
primes = []  # type: List[int]

# 'captain' is a string (Note: initial value is a problem)
captain = ...  # type: str

class Starship:
    # 'stats' is a class variable
    stats = {}  # type: Dict[str, int]
```

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

```python
result = []
async for i in aiter():
    if i % 2:
        result.append(i)
```

```python
result = [i async for i in aiter() if i % 2]
```

```python
result = [await fun() for fun in funcs]
```

---

# 3.7

---

# PEP 553: Built-in breakpoint()
https://www.python.org/dev/peps/pep-0553/

---

```python
# code example goes here
```

---

# PEP 557: Data Classes
https://www.python.org/dev/peps/pep-0557/

---

```python
# code example goes here
```

---

# PEP 562: Module __getattr__
https://www.python.org/dev/peps/pep-0562/

---

```python
# code example goes here
```

---

# PEP 560: Core support for generic types
https://www.python.org/dev/peps/pep-0560/

---

```python
# code example goes here
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

```python
# code example goes here
```

---

# Typing-related: PEP 591 (Final qualifier), PEP 586 (Literal types), and PEP 589 (TypedDict)
https://peps.python.org/pep-0591/
https://peps.python.org/pep-0586/
https://peps.python.org/pep-0589/

---

```python
# code example goes here
```

---

# f-strings support a handy = specifier for debugging

---

```python
# code example goes here
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

# PEP 634, PEP 635, PEP 636, Structural Pattern Matching
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
