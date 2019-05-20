# Express-Env

Safely expose your environment variables to dynamically fetch them in the frontend.

```ts
import expressEnv from 'express-env'

app.use('/env', expressEnv())
```

```html
<!DOCTYPE html>
<html>
<head>
  <script src="./env"></script>
</head>
<body>
  <script>
    console.log(window.ENV)
  </script>
</body>
</html>
```

## Configurable Options

### Namespace
```ts
process.env = {
  'WILLEM': 'DAFOE',
  'MICHAEL': 'DOUGLAS',
}

app.use('/env', expressEnv({ namespace: 'window.LEAKY_ENVIRONMENT' }))
// GET /env: window.LEAKY_ENVIRONMENT = {"WILLEM":"DAFOE","MICHAEL":"DOUGLAS"}
```

### Black and Whitelisting

As an array of strings:
```ts
process.env = {
  'WILLEM': 'DAFOE',
  'MICHAEL': 'DOUGLAS',
}

app.use('/env', expressEnv({ whitelist: ['MICHAEL'] }))
// GET /env: window.ENV = {"MICHAEL":"DOUGLAS"}
```

As a function:
```ts
process.env = {
  'WILLEM': 'DAFOE',
  'MICHAEL': 'DOUGLAS',
}

app.use('/env', expressEnv({ blacklist: (value: string, key: string) => key.includes('CH') }))
// GET /env: window.ENV = {"WILLEM":"DAFOE"}
```