# Regras Firestore – Lembrete Aniversários

Use no **Firebase Console** (Firestore → Regras) ou via CLI.

## Regras recomendadas

**Cole no Console somente o bloco abaixo — sem as linhas \`\`\` .**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /employees/{employeeId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

- **Coleção:** `employees`
- **Campos:** `id`, `name`, `birthDay` (1–31), `birthMonth` (1–12), `unit`, `position`, `phone`, `photoUrl` (opcional).

## Variantes

**Leitura pública, escrita autenticada:**

```
match /employees/{employeeId} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

*(Substitua só o bloco \`match /employees/...\` dentro de \`match /databases/.../documents { ... }\`.)*

**Só usuários com e-mail verificado:**

```
match /employees/{employeeId} {
  allow read, write: if request.auth != null && request.auth.token.email_verified == true;
}
```

**Desativar tudo (manutenção):**

```
match /employees/{employeeId} {
  allow read, write: if false;
}
```

## Deploy via CLI

```bash
firebase deploy --only firestore:rules
```

Use o arquivo [firestore.rules](firestore.rules) no projeto. O conteúdo dele já está pronto para o Console — sem markdown.
