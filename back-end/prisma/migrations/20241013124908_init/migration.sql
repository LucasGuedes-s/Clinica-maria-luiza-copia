-- CreateTable
CREATE TABLE "Profissionais" (
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "foto" VARCHAR(2048),
    "identificador" TEXT,
    "pix" TEXT,
    "permissaoId" INTEGER NOT NULL,
    "especialidade" TEXT NOT NULL,

    CONSTRAINT "Profissionais_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Pacientes" (
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "nome" TEXT NOT NULL,
    "nome_responsavel" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "telefone" TEXT,
    "endereco" TEXT,
    "foto" VARCHAR(2048),
    "tipo_paciente" TEXT,
    "laudos" VARCHAR(2048)[],

    CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Pacientes_dados" (
    "pacientes" SERIAL NOT NULL,
    "pacienteId" TEXT,
    "peso" DOUBLE PRECISION,
    "altura" DOUBLE PRECISION,
    "laudos" VARCHAR(2048)[],
    "comestiveis" VARCHAR(2048),
    "tangiveis" VARCHAR(2048),
    "fisicos" VARCHAR(2048),
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_neuro" DATE,
    "alergicos" TEXT,

    CONSTRAINT "Pacientes_dados_pkey" PRIMARY KEY ("pacientes")
);

-- CreateTable
CREATE TABLE "Agendamentos" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3),
    "data_conclusao" DATE,
    "agendamento" TEXT,
    "notas" TEXT,
    "status" TEXT,
    "profissionalId" TEXT NOT NULL,
    "pacienteId" TEXT,
    "sala" INTEGER,

    CONSTRAINT "Agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salas" (
    "id" SERIAL NOT NULL,
    "notas" TEXT,

    CONSTRAINT "Salas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultas" (
    "id" SERIAL NOT NULL,
    "consulta" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hora_inicio" TIMESTAMP(3),
    "hora_fim" TIMESTAMP(3),
    "descricao" TEXT,
    "laudos" VARCHAR(2048)[],
    "foto" VARCHAR(2048)[],
    "pacienteId" TEXT,
    "profissionalId" TEXT,

    CONSTRAINT "Consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultaAba" (
    "pacientes" SERIAL NOT NULL,
    "pacienteId" TEXT,
    "profissionalId" TEXT,
    "data" TIMESTAMP(3),
    "hora_inicio" TEXT,
    "hora_fim" TEXT,
    "descricao_atividade" VARCHAR(2048),
    "Aplicacao1" TEXT,
    "Aplicacao2" TEXT,
    "Aplicacao3" TEXT,
    "Aplicacao4" TEXT,
    "Aplicacao5" TEXT,
    "teste" TEXT,
    "foto" VARCHAR(2048),
    "observacoes" VARCHAR(2048),

    CONSTRAINT "ConsultaAba_pkey" PRIMARY KEY ("pacientes")
);

-- CreateTable
CREATE TABLE "AvaliacaoAba" (
    "pacientes" SERIAL NOT NULL,
    "pacienteId" TEXT,
    "foto" VARCHAR(2048)[],

    CONSTRAINT "AvaliacaoAba_pkey" PRIMARY KEY ("pacientes")
);

-- CreateTable
CREATE TABLE "Pagamentos" (
    "id" SERIAL NOT NULL,
    "pagamento" DOUBLE PRECISION,
    "paciente" TEXT,
    "tipo_pagamento" TEXT,
    "profissionalId" TEXT,
    "metodo" TEXT,
    "Data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissao" (
    "id" SERIAL NOT NULL,
    "acesso" TEXT,

    CONSTRAINT "Permissao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profissionais_identificador_key" ON "Profissionais"("identificador");

-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_email_key" ON "Pacientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_dados_pacienteId_key" ON "Pacientes_dados"("pacienteId");

-- AddForeignKey
ALTER TABLE "Profissionais" ADD CONSTRAINT "Profissionais_permissaoId_fkey" FOREIGN KEY ("permissaoId") REFERENCES "Permissao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pacientes_dados" ADD CONSTRAINT "Pacientes_dados_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissionais"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_sala_fkey" FOREIGN KEY ("sala") REFERENCES "Salas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultas" ADD CONSTRAINT "Consultas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultas" ADD CONSTRAINT "Consultas_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissionais"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultaAba" ADD CONSTRAINT "ConsultaAba_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultaAba" ADD CONSTRAINT "ConsultaAba_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissionais"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoAba" ADD CONSTRAINT "AvaliacaoAba_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamentos" ADD CONSTRAINT "Pagamentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissionais"("email") ON DELETE SET NULL ON UPDATE CASCADE;
