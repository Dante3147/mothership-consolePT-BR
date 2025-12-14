# Sistema de Criptografia HORUS 🔐

## Visão Geral

Sistema complexo de easter egg para a Base HORUS (TAO-095) que implementa conversas secretas criptografadas entre 3 membros misteriosos.

## Como Funciona

### 1. Detecção de Mensagens Criptografadas

Quando o diagnóstico da HORUS é executado:
- **50% de chance**: Mensagens em latim dos usuários misteriosos aparecem
- **50% de chance**: Aparece "⚠ USUÁRIO DESCONHECIDO: DADOS CRIPTOGRAFADOS ⚠"

### 2. Botão Invisível nas Mensagens Criptografadas

Quando as mensagens estão criptografadas:
- Um botão **praticamente invisível** (opacity: 0.05) cobre a área da mensagem de aviso
- Ao passar o mouse, a opacidade aumenta sutilmente para 0.1
- Ao clicar, abre o modal "DADOS_CRIPTOGRAFADOS.TXT"

### 3. Arquivo de Dados Criptografados

O modal mostra:
- Título estilizado como arquivo .TXT
- Lista de todas as transmissões interceptadas
- Mensagens em formato criptografado (Caesar Cipher + Base64)
- Campo para inserir chave de decodificação
- Contador de mensagens capturadas

**Exemplo de mensagem criptografada:**
```
UGIwbndldCBieGlrZSBhYiBqaGFiLiBNZGlsIHpjIG9lem
```

### 4. Chave de Decodificação Escondida

A chave é gerada aleatoriamente ao carregar o cenário:
- Formato: `XXXX-XXXX-XXXX-XXXX` (ex: `A7F2-K9M3-P1L8-D4W6`)
- Escondida em uma sala aleatória do mapa (COMANDO, OBSERVATORIO, SALA_OPS, LAB_PRINCIPAL, ARMORY, SALA_CONTROLE, NUCLEO_REATOR ou SUBTERRANEO)
- Botão **extremamente sutil** (opacity: 0.05) com texto "CHAVE DE DECODIFICAÇÃO"

### 5. Copiar a Chave

Quando o jogador encontra e clica no botão:
1. Chave é copiada automaticamente para área de transferência
2. Animação de **check-in** aparece com bounce
3. Mostra a chave copiada por 3 segundos
4. Tooltip aparece ao passar o mouse

### 6. Decodificação

No modal de dados criptografados:
1. Jogador cola a chave no campo de input
2. Clica em "DECODIFICAR"
3. Se a chave estiver correta:
   - Todas as mensagens são descriptografadas
   - Revela as conversas em latim dos 3 membros
4. Se incorreta:
   - Mensagem de erro: "⚠ CHAVE INVÁLIDA - ACESSO NEGADO"

## Arquitetura Técnica

### Componentes Criados

1. **`encryption-context.tsx`**
   - Gerencia estado de mensagens criptografadas
   - Gera chave aleatória
   - Escolhe sala aleatória
   - Funções de criptografia/descriptografia
   - Persistência em localStorage

2. **`encrypted-messages-modal.tsx`**
   - Modal estilizado como terminal
   - Lista de mensagens interceptadas
   - Campo de input para chave
   - Sistema de validação

3. **`decryption-key-button.tsx`**
   - Botão praticamente invisível
   - Animação de check ao copiar
   - Tooltip informativo

### Modificações em Arquivos Existentes

1. **`diagnostics-view.tsx`**
   - Detecta mensagens latinas
   - Adiciona ao sistema de criptografia
   - Botão invisível em avisos criptografados
   - Renderiza modal

2. **`station-graph-map.tsx`**
   - Detecta sala com chave
   - Renderiza botão de decodificação
   - Suporte a foreignObject no SVG

3. **`provider-registry.tsx`**
   - Adiciona EncryptionProvider

## Algoritmo de Criptografia

### Encrypt (Caesar Cipher + Base64)
```
1. Texto original: "Ordo ab chao"
2. Caesar Shift (+7): "Vykv hi johv"
3. Base64: "VnlrdiBoaSBqb2h2"
```

### Decrypt
```
1. Base64 Decode: "VnlrdiBoaSBqb2h2" → "Vykv hi johv"
2. Caesar Shift (-7): "Ordo ab chao"
```

## Persistência

Todos os dados são salvos em `localStorage`:
- `horus_encrypted_messages`: Array de mensagens
- `horus_decryption_key`: Chave gerada
- `horus_key_room`: Sala com a chave
- `horus_decrypted`: Se já foi descriptografado

## Experiência do Jogador

### Etapa 1: Descoberta
- Jogador vê "DADOS CRIPTOGRAFADOS" no diagnóstico
- Percebe algo estranho ao passar mouse (cursor muda)
- Clica e descobre arquivo .TXT

### Etapa 2: Investigação
- Vê mensagens totalmente criptografadas
- Lê dica: "Procure por 'CHAVE DE DECODIFICAÇÃO' no mapa"
- Explora todas as salas do mapa

### Etapa 3: Encontro
- Eventualmente passa mouse sobre sala certa
- Botão invisível aparece levemente
- Clica e vê animação de check-in
- Chave copiada!

### Etapa 4: Revelação
- Cola chave no modal
- Decodifica mensagens
- Lê conversas secretas dos membros misteriosos em latim

## Customização

Para adicionar mais salas possíveis:
```typescript
const possibleRooms = [
  "COMANDO",
  "OBSERVATORIO",
  "NOVA_SALA_AQUI", // <-- Adicione aqui
];
```

Para mudar dificuldade do botão invisível:
```typescript
// Mais fácil de ver
className="opacity-10 hover:opacity-30"

// Mais difícil de ver
className="opacity-1 hover:opacity-5"
```

## Easter Eggs nos Easter Eggs

- As mensagens latinas têm significados filosóficos/ocultistas reais
- Cada grupo de 3 membros tem um tema (Iniciados, Hierophantes, Illuminatus)
- O algoritmo Caesar Shift usa 7 (número místico)
- Formato da chave similar a chaves de licença de software

## Troubleshooting

**Chave não aparece no mapa:**
- Verifique se `randomRoom` está sendo carregado
- Confira localStorage: `horus_key_room`

**Mensagens não são salvas:**
- Verifique se há mensagens latinas no diagnóstico
- Confira se `isHorus` é true

**Decodificação falha:**
- Chave é case-insensitive
- Espaços são removidos automaticamente
- Formato deve ser XXXX-XXXX-XXXX-XXXX
