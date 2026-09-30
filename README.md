# Life insurance needs calculator

Fill in the form, get a recommended coverage amount with an explanation of the reasoning, plus an
explanation of term against whole life insurance.

## Run

```
docker build -t calc . && docker run --rm -p 8080:8080 calc
npm start          # http://localhost:8080
```

## What it collects

Dependents and their ages, annual income to replace, total debts, education costs, existing
coverage, and what is affordable each month. All on one screen; submit it and the model produces
the recommendation and the explanation.

This is an estimate, not advice. Speak to a financial professional.

## Still to do

- change an answer without starting again
- tests
