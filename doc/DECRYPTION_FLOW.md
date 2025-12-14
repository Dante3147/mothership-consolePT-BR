# Fluxo de Descriptografia - Atualizado

## Mudanças Implementadas

### 1. Modal com Campo de Input ✅
O modal `EncryptedMessagesModal` já possui:
- Campo de input para inserir a chave (formato: XXXX-XXXX-XXXX-XXXX)
- Botão "DECODIFICAR" para validar a chave
- Feedback visual de erro se a chave for incorreta
- Dica para procurar a chave no mapa

### 2. Fechamento Automático do Modal ✅
Quando o jogador descriptografa com sucesso:
- O modal fecha automaticamente (`setShowEncryptedModal(false)`)
- Implementado em `encryption-context.tsx` dentro da função `decryptMessages()`

### 3. Exibição no Console ✅
As mensagens descriptografadas aparecem no console de diagnósticos:
- Callback `onDecryptSuccess` registrado em `diagnostics-view.tsx`
- Quando a descriptografia é bem-sucedida, adiciona automaticamente:
  - Cabeçalho estilizado indicando descriptografia concluída
  - Cada transmissão numerada com timestamp
  - Conteúdo descriptografado de cada mensagem
  - Separadores visuais para facilitar leitura

## Fluxo Completo Atualizado

```
[Jogador executa diagnósticos]
    ↓
[50% chance: Mensagens latinas aparecem e são automaticamente criptografadas]
    ↓
[Jogador encontra botão discreto no mapa]
    ↓
[Clica no botão → Chave copiada → keyFound = true]
    ↓
[Botão "DESCRIPTOGRAFAR" aparece pulsando nos controles]
    ↓
[Clica em "DESCRIPTOGRAFAR" → Modal abre]
    ↓
[Insere chave no campo de input]
    ↓
[Clica em "DECODIFICAR"]
    ↓
[Se correto:]
    ├─ Modal fecha automaticamente
    ├─ Console de diagnósticos exibe separador
    ├─ Mostra todas as transmissões descriptografadas
    └─ Mensagens ficam permanentemente descriptografadas (localStorage)
    
[Se incorreto:]
    └─ Mensagem de erro: "⚠ CHAVE INVÁLIDA - ACESSO NEGADO"
```

## Exemplo de Saída no Console

```
╔═══════════════════════════════════════════════════════╗
║  DESCRIPTOGRAFIA CONCLUÍDA - EXIBINDO CONTEÚDO...  ║
╚═══════════════════════════════════════════════════════╝

━━━ TRANSMISSÃO #1 [14/12/2025, 15:30:45] ━━━
[USUÁRIO LATINO 1]: Salve, quid agis?
[USUÁRIO LATINO 2]: Bene, gratias! Et tu?

━━━ TRANSMISSÃO #2 [14/12/2025, 15:31:20] ━━━
[PESQUISADOR_MARS]: In nomine Patris...
[ASTRO_TECH]: Deus ex machina!

════════════════════════════════════════════════════════
```

## Componentes Modificados

### encryption-context.tsx
```typescript
// Novo estado
const [onDecryptSuccess, setOnDecryptSuccess] = useState<(() => void) | undefined>();

// Função modificada
const decryptMessages = (key: string): boolean => {
  if (key.toUpperCase().replace(/\s/g, "") === decryptionKey) {
    // ... descriptografar ...
    setIsDecrypted(true);
    
    // NOVO: Fechar modal
    setShowEncryptedModal(false);
    
    // NOVO: Chamar callback
    if (onDecryptSuccess) {
      onDecryptSuccess();
    }
    
    return true;
  }
  return false;
};
```

### diagnostics-view.tsx
```typescript
// Registra callback quando componente monta
useEffect(() => {
  if (isHorus) {
    setOnDecryptSuccess(() => {
      // Criar mensagens formatadas
      const decryptedMsgs: DiagnosticMessage[] = [/* ... */];
      
      // Adicionar ao console existente
      setVisibleMessages((prev) => [...prev, ...decryptedMsgs]);
    });
  }
}, [isHorus, messages, setOnDecryptSuccess]);
```

## Interface do Context

```typescript
interface EncryptionContextType {
  // ... props existentes ...
  onDecryptSuccess?: () => void;
  setOnDecryptSuccess: (callback: (() => void) | undefined) => void;
}
```

## Persistência

Todos os estados são salvos em localStorage:
- ✅ `horus_encrypted_messages`: Mensagens criptografadas
- ✅ `horus_decryption_key`: Chave de descriptografia
- ✅ `horus_key_room`: Sala onde a chave está
- ✅ `horus_decrypted`: Flag de descriptografia concluída
- ✅ `horus_key_found`: Flag de chave descoberta

## Testando o Sistema

1. **Login**: HORUS-ADMIN / COMP-CON-7
2. **Executar diagnósticos**: Ver mensagens criptografadas (50% chance)
3. **Procurar chave**: Explorar mapa até encontrar botão discreto
4. **Clicar no botão**: Chave copiada para clipboard
5. **Abrir descriptografia**: Botão "DESCRIPTOGRAFAR" aparece pulsando
6. **Colar chave**: Inserir no campo de input do modal
7. **Decodificar**: Clicar em "DECODIFICAR"
8. **Verificar**: Modal fecha e mensagens aparecem no console

## Observações

- O modal fecha **automaticamente** após sucesso
- Não é necessário clicar em "X" ou "Fechar"
- As mensagens descriptografadas são **adicionadas ao final** do console atual
- O console mantém todo o histórico de diagnóstico + as mensagens descriptografadas
- Se recarregar a página após descriptografar, as mensagens permanecem descriptografadas no localStorage
