# Sistema de Minigame de Descriptografia - HORUS
## Versão 2.0 - Redesenhado

## Fluxo Completo do Minigame

### 1. Início do Minigame
```
Jogador clica em "EXECUTAR DIAGNÓSTICO"
    ↓
Console roda por ~22 segundos
    ↓
Console se fecha automaticamente
    ↓
Jogador é redirecionado para aba "MAPA" (interior-ascii)
    ↓
MINIGAME INICIADO
```

### 2. Procurando a Chave no Mapa
- **Botão aparece em sala aleatória** (8 salas possíveis):
  - COMANDO
  - OBSERVATORIO
  - SALA_OPS
  - LAB_PRINCIPAL
  - ARMORY
  - SALA_CONTROLE
  - NUCLEO_REATOR
  - SUBTERRANEO

- **Comportamento do botão**:
  - 🔹 **Invisível por padrão**
  - 🔹 **Aparece apenas ao passar o mouse** sobre a sala
  - 🔹 **Pulsando** (animate-pulse) quando visível
  - 🔹 Texto: **"CHAVE-DESCRIPTOGRAFIA"**
  - 🔹 Estilo: Borda verde (#126127), fundo preto

### 3. Copiando o Código
```
Jogador passa mouse sobre sala aleatória
    ↓
Botão "CHAVE-DESCRIPTOGRAFIA" aparece pulsando
    ↓
Jogador clica no botão
    ↓
Código é copiado para área de transferência
    ↓
Animação "✓ CÓDIGO COPIADO" aparece (verde, bounce)
    ↓
Estado `keyCopied` = true (persiste no localStorage)
```

### 4. Botão de Descriptografia nos Controles
- **Botão "DESCRIPTOGRAFAR"** aparece nos controles
- **Condição**: Só aparece se `keyCopied = true`
- **Comportamento**: 
  - Ao clicar, abre modal de descriptografia
  - Modal tem campo para colar o código
  - Botão "CONFIRMAR" valida o código

### 5. Descriptografando
```
Jogador abre "DESCRIPTOGRAFAR" nos controles
    ↓
Modal aparece com campo de input
    ↓
Jogador cola código (XXXX-XXXX-XXXX-XXXX)
    ↓
Clica em "CONFIRMAR" (ou pressiona Enter)
    ↓
Sistema valida código
```

**Se código CORRETO**:
```
✓ Modal fecha automaticamente (500ms)
    ↓
✓ Alert: "DESCRIPTOGRAFIA CONCLUÍDA COM SUCESSO"
    ↓
✓ Console mostra mensagens descriptografadas
    ↓
✓ Estado persiste (localStorage: horus_decrypted)
```

**Se código INCORRETO**:
```
⚠ Mensagem de erro: "CÓDIGO INVÁLIDO - ACESSO NEGADO"
    ↓
Jogador pode tentar novamente
```

## Componentes Modificados

### 1. DecryptionKeyButton.tsx
**Novo comportamento**:
```tsx
- Wrapper com onMouseEnter/onMouseLeave
- Botão só renderiza quando showButton = true (hover)
- Classe: animate-pulse (sempre pulsando quando visível)
- Texto: "CHAVE-DESCRIPTOGRAFIA"
- Ao clicar: copyKeyToClipboard()
- Animação "CÓDIGO COPIADO" com ícone de check (verde, bounce)
```

### 2. EncryptedMessagesModal.tsx
**Novo design**:
```tsx
- Modal simplificado (max-w-md)
- Apenas campo de input + botão CONFIRMAR
- Não exibe mais lista de mensagens
- Enter também confirma
- Erro inline se código inválido
```

### 3. DiagnosticsView.tsx
**Auto-fechamento**:
```tsx
- Detecta quando diagnóstico completa
- Se isHorus && isComplete:
  - Aguarda 2 segundos
  - Fecha diagnósticos (hideDiagnostics)
  - Redireciona para /interior-ascii (mapa)
- Callback de sucesso mostra alert + mensagens no console
```

### 4. EncryptionContext.tsx
**Validação e callback**:
```tsx
- decryptMessages() valida código
- Se correto:
  - Descriptografa todas as mensagens
  - Fecha modal após 500ms
  - Chama onDecryptSuccess após 600ms
  - Persiste no localStorage
```

### 5. StationControls.tsx
**Botão condicional**:
```tsx
- Botão "DESCRIPTOGRAFAR" só aparece se keyCopied = true
- Abre modal ao clicar
- Animação pulse quando keyFound = true
```

## Estados Persistentes (localStorage)

| Chave | Valor | Descrição |
|-------|-------|-----------|
| `horus_decryption_key` | String | Código gerado (XXXX-XXXX-XXXX-XXXX) |
| `horus_key_room` | String | Sala onde a chave está escondida |
| `horus_key_found` | "true" | Se jogador descobriu a chave |
| `horus_decrypted` | "true" | Se já descriptografou |
| `horus_encrypted_messages` | JSON | Mensagens criptografadas |

## Fluxo Visual

```
╔═══════════════════════════════════════════════════════╗
║               FLUXO DO MINIGAME HORUS                ║
╚═══════════════════════════════════════════════════════╝

[PASSO 1] Executar Diagnóstico
    │
    ├─> Console roda por 22 segundos
    │
    └─> Auto-fecha e vai para MAPA

[PASSO 2] Explorar Mapa
    │
    ├─> Passar mouse sobre salas
    │
    └─> Encontrar botão "CHAVE-DESCRIPTOGRAFIA" pulsando

[PASSO 3] Copiar Chave
    │
    ├─> Clicar no botão
    │
    └─> "✓ CÓDIGO COPIADO" aparece

[PASSO 4] Descriptografar
    │
    ├─> Botão "DESCRIPTOGRAFAR" aparece nos controles
    │
    ├─> Abrir modal
    │
    ├─> Colar código
    │
    └─> Confirmar

[PASSO 5] Sucesso
    │
    ├─> Modal fecha
    │
    ├─> Alert de sucesso
    │
    └─> Mensagens liberadas no console

══════════════════════════════════════════════════════
```

## Diferenças da Versão Anterior

| Aspecto | V1.0 (Antiga) | V2.0 (Nova) |
|---------|---------------|-------------|
| **Botão no mapa** | Sempre visível (opacidade 10%) | Só aparece no hover |
| **Animação** | Opacidade aumenta no hover | Pulse constante quando visível |
| **Confirmação** | Mensagem pequena | "CÓDIGO COPIADO" grande e verde |
| **Modal** | Lista de mensagens criptografadas | Apenas campo de input |
| **Início** | Manual | Auto-fecha diagnóstico e vai para mapa |
| **Resultado** | Mensagens no modal | Alert + mensagens no console |
| **Botão controles** | Sempre visível | Só após copiar código |

## Testando o Sistema

1. **Login**: HORUS-ADMIN / COMP-CON-7
2. **Executar Diagnóstico**: Aguardar 22 segundos
3. **Auto-redirecionamento**: Ser levado ao mapa
4. **Explorar**: Passar mouse sobre salas até encontrar botão
5. **Copiar**: Clicar em "CHAVE-DESCRIPTOGRAFIA"
6. **Ver confirmação**: "CÓDIGO COPIADO" verde
7. **Abrir modal**: Clicar em "DESCRIPTOGRAFAR" nos controles
8. **Colar e confirmar**: Ctrl+V no campo, clicar "CONFIRMAR"
9. **Ver resultado**: Alert + mensagens no console

## Código de Acesso
- **Formato**: XXXX-XXXX-XXXX-XXXX
- **Exemplo**: A7F2-K8J4-M3N9-P1Q5
- **Geração**: Aleatória a cada inicialização
- **Persistência**: Salvo no localStorage
