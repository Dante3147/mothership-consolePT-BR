# Sistema de Criptografia - Minigame HORUS

## Fluxo do Jogo

### 1. Login Inicial
- **Usuário**: `HORUS-ADMIN`
- **Senha**: `COMP-CON-7`
- **Código de Acesso**: `HORUS-7` (usado em todas as portas: HANGAR→AIRLOCK_NORTE, SALA_CONTROLE→NUCLEO_REATOR, NUCLEO_REATOR→SUBTERRANEO)

### 2. Descobrindo o Mistério
Ao executar diagnósticos, há:
- **50% de chance**: Cada um dos 3 grupos de usuários latinos aparecerem OU uma mensagem "⚠ DADOS CRIPTOGRAFADOS ⚠"
- **40% de chance**: Conversas conterem memes brasileiros ao invés de conteúdo sério
- Mensagens latinas são automaticamente armazenadas criptografadas

### 3. Encontrando a Chave
A chave de descriptografia está escondida em **uma sala aleatória** do mapa:
- Salas possíveis: COMANDO, OBSERVATORIO, SALA_OPS, LAB_PRINCIPAL, ARMORY, SALA_CONTROLE, NUCLEO_REATOR, SUBTERRANEO
- O botão é **muito discreto** (opacidade 10%, texto pequeno)
- Ao passar o mouse, fica mais visível
- Ao clicar: 
  - Copia a chave para área de transferência
  - Marca `keyFound = true`
  - Mostra animação de confirmação (✓)
  - Persiste no localStorage

### 4. Desbloqueando o Botão
Quando `keyFound = true`:
- O botão **"DESCRIPTOGRAFAR"** aparece nos controles
- Tem animação **pulsante** (`animate-pulse`) para chamar atenção
- Antes disso, o botão é **completamente oculto** (retorna `null`)

### 5. Descriptografando
1. Clique no botão "DESCRIPTOGRAFAR"
2. Cole a chave no formato: `XXXX-XXXX-XXXX-XXXX`
3. Se correta: revela todas as conversas latinas descriptografadas
4. O estado persiste mesmo após recarregar a página

## Implementação Técnica

### Algoritmo de Criptografia
- **Caesar Cipher** com shift de +7 caracteres
- **Base64** encoding do resultado
- Descriptografia inverte o processo: Base64 decode → Caesar shift -7

### Estados Persistentes (localStorage)
- `horus_encrypted_messages`: Array de mensagens criptografadas
- `horus_decryption_key`: Chave gerada (formato XXXX-XXXX-XXXX-XXXX)
- `horus_key_room`: Sala onde a chave está escondida
- `horus_decrypted`: Flag se já descriptografou
- `horus_key_found`: **NOVO** - Flag se o jogador já descobriu a chave

### Componentes Modificados
1. **encryption-context.tsx**
   - Gerencia todo o sistema de criptografia
   - Estado `keyFound` controla visibilidade do botão
   - `copyKeyToClipboard()` marca `keyFound = true`

2. **station-controls.tsx**
   - Verifica `isHorus && button.label === "DESCRIPTOGRAFAR" && !keyFound`
   - Se condição for verdadeira: `return null` (esconde botão)
   - Adiciona classe `animate-pulse` quando `keyFound && isDecryptButton`

3. **control-button.tsx**
   - Adiciona suporte para prop `className` customizada
   - Permite passar animações e estilos extras

4. **decryption-key-button.tsx**
   - Botão discreto (text-xs, opacity-10)
   - Hover aumenta opacidade para 100%
   - Animação de confirmação ao clicar

5. **station-graph-map.tsx**
   - Renderiza o botão da chave via `foreignObject` no SVG
   - Posicionado em 75% da altura da sala
   - Apenas na sala aleatória definida

## Progressão do Jogador

```
[Início] → Login (HORUS-ADMIN/COMP-CON-7)
    ↓
[Exploração] → Diagnósticos revelam mensagens criptografadas
    ↓
[Busca] → Navegar pelo mapa procurando botão discreto
    ↓
[Descoberta] → Encontrar e clicar no botão → Chave copiada
    ↓
[Revelação] → Botão DESCRIPTOGRAFAR aparece pulsando
    ↓
[Solução] → Colar chave e descriptografar mensagens latinas
```

## Balanceamento
- **Dificuldade**: Média-Alta (requer exploração ativa)
- **Recompensa**: Lore/conversas ocultas em latim
- **Persistência**: Estado salvo permite pausar e retornar
- **Visual**: Botão discreto torna descoberta gratificante
- **Feedback**: Pulsação chama atenção após descoberta

## Códigos de Acesso
Todos os sistemas usam códigos unificados para simplificar:
- **Admin Login**: HORUS-ADMIN / COMP-CON-7
- **Todas as Portas**: HORUS-7
