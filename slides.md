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
# code example goes here
```

---

# PEP 526: Syntax for Variable Annotations
https://peps.python.org/pep-0526/

---

```python
# code example goes here
```

---

# PEP 525: Asynchronous Generators
https://peps.python.org/pep-0525/

---

```python
# code example goes here
```

---

# PEP 530: Asynchronous Comprehensions
https://peps.python.org/pep-0530/

---

```python
# code example goes here
```

---

# 3.7

---

# 3.8

---

# 3.9

---

# 3.10

---

# 3.11

---