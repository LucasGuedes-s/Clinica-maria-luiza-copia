# Requisitos funcionais e não funcionais

### Requisitos funcionais:

1. Profissional deve poder fazer login
    1. E Logout
2. Profissional deve ter niveis de permissão
    1. Admin (Usuário que tem acesso a todo sistema)
    2. Recepcionistas (Usuário com permissões de acesso e modificações)
    3. Profissional (Usuário com permissões de acesso e modificações)
    4. Usuários (Usuário que acessam o histórico de consultas)
3. O profissional tem permissão de:
    1. Poder vizualizar os agendamentos do dia
    2. Histórico de consultas
    3. Registrar consulta do paciente.
    4. Pode cadastrar um novo paciente
    5. Pode registrar pagamentos
4. Usuário administrador deve poder ter acesso geral ao sistema:
    1. Deve ter a autorização de gerar relatórios.
    2. Só o administrador pode cadastrar um novo profissional
5. O usuário recepcionista tem permissão de:
    1. Criar uma sala
    2. Agendar atendimento para um profissional em uma sala
    3. Registrar pagamentos
6. Os usuários devem ter acesso ao histórico de consultas

### Requisitos Não-funcionais

1. **Desempenho**:
    - O sistema deve responder rapidamente às solicitações do usuário, com tempos de carregamento mínimos para páginas e operações.
    - As operações, como login, logout, criação de salas, geração de relatórios, cadastro de pacientes, devem ser processadas de forma eficiente.
    - Erros devem ser disparados para o usuário, caso ocorra falhas
2. **Escalabilidade**:
    - O sistema deve ser capaz de lidar com um aumento significativo no número de usuários, sem perda de desempenho.
3. **Segurança**:
    - Os dados dos usuários devem ser armazenados de forma segura, com criptografia de senhas e informações sensíveis.
    - O sistema deve ter mecanismos de autenticação e autorização robustos para garantir que apenas usuários autorizados possam acessar recursos específicos.
4. **Usabilidade**:
    - A interface do usuário deve ser intuitiva, clara e fácil de usar para todos os níveis de permissão.
    - As mensagens de erro devem ser claras e oferecer orientações sobre como resolver o problema.
5. **Confiabilidade**:
    - O sistema deve ser robusto, com tempo de inatividade mínimo e monitoramento constante para detectar e corrigir falhas rapidamente.
6. **Compatibilidade**:
    - O sistema deve ser compatível com os navegadores e dispositivos mais populares, permitindo acesso a partir de diversas plataformas (computadores, smartphones e tablets).
7. **Manutenibilidade**:
    - O código deve ser bem estruturado, modularizado e documentado para facilitar futuras manutenções e atualizações.
8. **Privacidade**:
    - O sistema deve respeitar a privacidade dos usuários, garantindo que suas informações pessoais sejam protegidas e usadas apenas para os fins pretendidos.
