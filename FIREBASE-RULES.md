# Regras Firestore – Lembrete Aniversários

Use no **Firebase Console** (Firestore → Regras) ou via CLI.

## Regras atuais (projeto)

O [firestore.rules](firestore.rules) está com **leitura e escrita abertas** (`allow read, write: if true`) para a coleção `employees`, assim o app funciona **sem login**.  
Quando configurar Firebase Auth, troque para regras que exijam `request.auth != null` (veja variantes abaixo).

**Cole no Console somente o bloco abaixo — sem as linhas \`\`\`.**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /employees/{employeeId} {
      allow read, write: if true;
    }
  }
}
```

- **Coleção:** `employees`
- **Campos:** `id`, `name`, `birthDay` (1–31), `birthMonth` (1–12), `unit`, `position`, `phone`, `photoUrl` (opcional).

## Variantes (com Auth)

**Só usuários logados:**

```
match /employees/{employeeId} {
  allow read, write: if request.auth != null;
}
```

**Leitura pública, escrita autenticada:**

```
match /employees/{employeeId} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

**Só e-mail verificado:**

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
