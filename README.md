# 🌳 Database Tree Structure - Simulador de Banco de Dados com Árvore B+

Uma aplicação web interativa que simula um sistema de banco de dados utilizando **árvore B+** como estrutura de dados para indexação. Desenvolvido como projeto acadêmico para o Instituto Federal de Pernambuco (IFPE).

## 📋 Sumário

- [Objetivo do Projeto](#-objetivo-do-projeto)
- [Arquitetura e Estruturas de Dados](#-arquitetura-e-estruturas-de-dados)
- [Features Implementadas](#-features-implementadas)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Instalação e Execução](#-instalação-e-execução)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades Técnicas](#-funcionalidades-técnicas)
- [Futuras Implementações](#-futuras-implementações)
- [Contribuição](#-contribuição)

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido para demonstrar na prática como funcionam as estruturas de dados de árvore B+ em sistemas de gerenciamento de banco de dados (SGBD). A aplicação permite:

- Criar tabelas com esquemas personalizados
- Inserir, atualizar e excluir dados
- Visualizar como os dados são organizados internamente na árvore B+
- Gerenciar relacionamentos entre tabelas (chaves estrangeiras)
- Entender os conceitos de indexação em bancos de dados

## 🏗️ Arquitetura e Estruturas de Dados

### Árvore B+ (B-Plus Tree)

A implementação utiliza uma **árvore B+ de ordem 3** com as seguintes características:

```
Estrutura da Árvore B+:
┌─────────────────────────────────┐
│         Nó Interno              │
│  ┌─────┐ ┌─────┐ ┌─────┐      │
│  │  5  │ │ 10  │ │ 15  │      │
│  └─┬───┘ └─┬───┘ └─┬───┘      │
└────┼──────┼──────┼────────────┘
     │      │      │
     v      v      v
   ┌─────┐┌─────┐┌─────┐
   │Folha││Folha││Folha│
   │1,2,3││6,7,8││11,12│
   └──┬──┘└──┬──┘└──┬──┘
      └─────→└─────→└──→ null
```

**Características principais:**
- **Nós internos**: Armazenam apenas chaves de navegação
- **Nós folha**: Armazenam pares chave-valor (dados reais)
- **Lista ligada**: Nós folha conectados para busca sequencial eficiente
- **Balanceamento**: Árvore sempre balanceada automaticamente

### Classes Principais

```typescript
// Hierarquia das classes
BPlusNode<K,V> (abstrata)
├── InternalNode<K,V>  // Nós internos
└── LeafNode<K,V>      // Nós folha

SimpleBPlusTree<K,V>   // Implementação da árvore
Database               // Gerenciador de tabelas
Table                  // Representação de uma tabela
```

## ✅ Features Implementadas

### 🗄️ Gerenciamento de Tabelas
- ✅ **Criar tabelas** com esquemas personalizados
- ✅ **Visualizar tabelas** existentes e seus esquemas
- ✅ **Excluir tabelas** com validação de integridade
- ✅ **Atualizar estrutura** de tabelas existentes

### 📊 Tipos de Dados Suportados
- ✅ **String** - Texto
- ✅ **Integer** - Números inteiros
- ✅ **Float** - Números decimais
- ✅ **Boolean** - Verdadeiro/Falso
- ✅ **Date** - Datas

### 🔑 Gerenciamento de Chaves
- ✅ **Chaves primárias** - Identificadores únicos
- ✅ **Chaves estrangeiras** - Relacionamentos entre tabelas
- ✅ **Auto-incremento** - Geração automática de IDs
- ✅ **Validação de integridade** - FK constraints

### 📋 Operações CRUD
- ✅ **Create** - Inserção de novos registros
- ✅ **Read** - Busca e listagem de dados
- ✅ **Update** - Atualização de registros existentes
- ✅ **Delete** - Remoção com cascade automático

### 🔍 Operações de Busca
- ✅ **Busca por chave primária** - O(log n)
- ✅ **Busca por intervalo** - Range queries eficientes
- ✅ **Listagem completa** - Traversal sequencial

### 💾 Persistência de Dados
- ✅ **LocalStorage** - Dados salvos no navegador
- ✅ **Serialização JSON** - Formato legível
- ✅ **Carregamento automático** - Restaura estado anterior

## 🛠️ Tecnologias Utilizadas

### Frontend & Framework
- **React 19** - Interface de usuário
- **React Router 7** - Roteamento e navegação
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização

### Build & Desenvolvimento
- **Vite** - Build tool moderna
- **pnpm** - Gerenciador de pacotes
- **Node.js** - Runtime JavaScript

### Bibliotecas Auxiliares
- **SweetAlert2** - Modais e alertas elegantes
- **Flatted** - Serialização de estruturas circulares

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Clonando o Repositório
```bash
git clone https://github.com/seu-usuario/database-tree-structure.git
cd database-tree-structure
```

### Instalação das Dependências
```bash
# Com pnpm (recomendado)
pnpm install

# Ou com npm
npm install
```

### Executando em Desenvolvimento
```bash
# Inicia o servidor de desenvolvimento
pnpm dev

# Ou com npm
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção
```bash
# Gera build otimizado
pnpm build

# Inicia servidor de produção
pnpm start
```

### Verificação de Tipos
```bash
# Executa verificação do TypeScript
pnpm typecheck
```

## 📖 Como Usar

### 1. Criando uma Nova Tabela

1. Acesse a página principal
2. Clique em **"Criar Tabela"**
3. Defina o nome da tabela
4. Configure as colunas:
   - **Nome**: Identificador da coluna
   - **Tipo**: String, Int, Float, Boolean, Date
   - **Nullable**: Se aceita valores nulos
   - **Primary Key**: Se é chave primária
   - **Foreign Key**: Referência para outra tabela
5. Clique em **"Criar Tabela"**

### 2. Visualizando Dados

1. Na página principal, encontre sua tabela
2. Clique em **"Visualizar dados da tabela"**
3. Visualize todos os registros em formato tabular

### 3. Inserindo Dados

1. Na página de dados da tabela
2. Clique em **"Adicionar Coluna"** (funcionalidade em desenvolvimento)
3. Preencha os campos conforme o esquema

### 4. Operações com Dados

- **Editar**: Clique no ícone de edição ao lado do registro
- **Excluir**: Clique no ícone de exclusão (com cascade automático)

## 📁 Estrutura do Projeto

```
database-tree-structure/
├── app/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── AppButton.tsx
│   │   ├── AppForm.tsx
│   │   ├── AppInput.tsx
│   │   ├── AppLabel.tsx
│   │   └── AppSelect.tsx
│   ├── layouts/              # Layouts da aplicação
│   │   └── default.tsx
│   ├── modules/
│   │   ├── database-manager/ # Módulo principal do SGBD
│   │   │   ├── classes/      # Classes das estruturas de dados
│   │   │   │   ├── b-plus-node.class.ts      # Nó base da árvore B+
│   │   │   │   ├── internal-node.class.ts    # Nós internos
│   │   │   │   ├── leaf-node.class.ts        # Nós folha
│   │   │   │   ├── simple-b-plus-tree.class.ts # Implementação da árvore B+
│   │   │   │   ├── database.class.ts         # Gerenciador de banco
│   │   │   │   └── table.class.ts            # Representação de tabela
│   │   │   ├── components/   # Componentes específicos
│   │   │   │   ├── form-column.tsx
│   │   │   │   ├── show-data-column.tsx
│   │   │   │   └── show-tables.tsx
│   │   │   ├── css/          # Estilos CSS
│   │   │   ├── enums/        # Enumerações
│   │   │   ├── interfaces/   # Interfaces TypeScript
│   │   │   ├── routes/       # Páginas da aplicação
│   │   │   │   ├── index.tsx         # Página principal
│   │   │   │   ├── create-table.tsx  # Criar tabela
│   │   │   │   ├── data-table.tsx    # Visualizar dados
│   │   │   │   └── update-table.tsx  # Atualizar tabela
│   │   │   └── types/        # Tipos TypeScript
│   │   ├── home/             # Módulo da página inicial
│   │   └── example/          # Módulo de exemplo
│   ├── plugins/              # Plugins e utilitários
│   │   └── swal.ts          # Configuração SweetAlert2
│   ├── root.tsx             # Componente raiz
│   └── routes.ts            # Configuração de rotas
├── database.json            # Dados de exemplo
├── package.json             # Dependências do projeto
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
└── react-router.config.ts  # Configuração React Router
```

## ⚙️ Funcionalidades Técnicas

### Algoritmos da Árvore B+

#### Inserção
```typescript
// Complexidade: O(log n)
insert(key: K, value: V): void {
  const split = this.insertRecursive(this.root, key, value);
  if (split) {
    // Cria nova raiz quando há split na raiz atual
    const newRoot = new InternalNode<K, V>();
    newRoot.keys = [split.key];
    newRoot.children = [this.root, split.right];
    this.root = newRoot;
  }
}
```

#### Busca
```typescript
// Complexidade: O(log n)
search(key: K): V | null {
  let node = this.root;
  // Navega pelos nós internos
  while (node instanceof InternalNode) {
    let i = 0;
    while (i < node.keys.length && key >= node.keys[i]) {
      i++;
    }
    node = node.children[i];
  }
  // Busca no nó folha
  const leaf = node as LeafNode<K, V>;
  const index = leaf.keys.indexOf(key);
  return index !== -1 ? leaf.values[index] : null;
}
```

#### Busca por Intervalo
```typescript
// Complexidade: O(log n + k), onde k é o número de resultados
rangeSearch(from: K, to: K): V[] {
  // Encontra o primeiro nó folha
  // Percorre a lista ligada de folhas
  // Coleta todos os valores no intervalo
}
```

### Validações de Integridade

- **Chave Primária**: Unicidade garantida pela árvore B+
- **Chave Estrangeira**: Validação antes da inserção
- **Cascade Delete**: Remoção automática de registros dependentes
- **Nullable Constraints**: Validação de campos obrigatórios

### Persistência de Dados

```typescript
// Serialização para LocalStorage
save(): void {
  const payload = { tables: {} };
  for (const [name, table] of this.tables.entries()) {
    payload.tables[name] = table.dump();
  }
  localStorage.setItem("database", JSON.stringify(payload, null, 2));
}

// Desserialização do LocalStorage
static load(): Database {
  const raw = localStorage.getItem("database");
  // Reconstrói as tabelas e dados
}
```

## 🔮 Futuras Implementações

### 📊 Melhorias na Interface
- [ ] **Visualização gráfica da árvore B+** - Diagrama interativo
- [ ] **Editor visual de esquemas** - Drag & drop para criar tabelas
- [ ] **Dashboard com estatísticas** - Métricas de performance
- [ ] **Modo escuro/claro** - Tema configurável

### 🚀 Funcionalidades Avançadas
- [ ] **Queries SQL simples** - SELECT, WHERE, JOIN básicos
- [ ] **Índices secundários** - Múltiplos índices por tabela
- [ ] **Transações** - ACID properties
- [ ] **Backup/Restore** - Exportar/importar dados

### 🔧 Melhorias Técnicas
- [ ] **Árvore B+ de ordem variável** - Configuração dinâmica
- [ ] **Compactação de nós** - Otimização de espaço
- [ ] **Cache de consultas** - Melhoria de performance
- [ ] **Logs de operações** - Auditoria e debugging

### 📱 Expansões
- [ ] **Modo offline completo** - Service Workers
- [ ] **Exportação para formatos** - CSV, JSON, SQL
- [ ] **API REST** - Backend para persistência real
- [ ] **Multiplayer** - Colaboração em tempo real

### 🎓 Recursos Educacionais
- [ ] **Tutorial interativo** - Passo a passo guiado
- [ ] **Visualização de operações** - Animações dos algoritmos
- [ ] **Métricas de complexidade** - Big O em tempo real
- [ ] **Comparação com outras estruturas** - Array, Hash, B-Tree

## 🧪 Testes e Validação

### Cenários de Teste Implementados
- ✅ Inserção de registros únicos
- ✅ Validação de chave primária duplicada
- ✅ Validação de chave estrangeira
- ✅ Cascade delete automático
- ✅ Persistência no LocalStorage

### Cenários de Teste Futuros
- [ ] Stress test com grandes volumes
- [ ] Testes de concorrência
- [ ] Validação de integridade complexa
- [ ] Testes de performance

## 🤝 Contribuição

Este é um projeto acadêmico, mas contribuições são bem-vindas!

### Como Contribuir
1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Diretrizes
- Siga os padrões TypeScript existentes
- Adicione testes para novas funcionalidades
- Documente código complexo
- Mantenha commits organizados e descritivos

## 📝 Licença

Este projeto é desenvolvido para fins educacionais no IFPE. Consulte o arquivo LICENSE para mais detalhes.

## 👥 Autores

- **Seu Nome** - *Desenvolvimento principal* - [GitHub](https://github.com/seu-usuario)

## 🎓 Agradecimentos

- **Instituto Federal de Pernambuco (IFPE)** - Instituição de ensino
- **Professores da disciplina** - Orientação acadêmica
- **Comunidade React/TypeScript** - Recursos e documentação

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**

📚 **Projeto desenvolvido para aprendizado de estruturas de dados e algoritmos**

🚀 **Versão atual: 1.0.0** | **Última atualização: Dezembro 2024**
