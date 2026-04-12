-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "public"."SourceCodeEmbedding" (
    "id" TEXT NOT NULL,
    "summaryEmebedding" vector(768),
    "sourceCode" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "SourceCodeEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Commits" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,
    "commitMessage" TEXT NOT NULL,
    "commitHash" TEXT NOT NULL,
    "commitAuthorName" TEXT NOT NULL,
    "commitAuthorAvatar" TEXT NOT NULL,
    "commitDate" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Commits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."UserToProject" ADD CONSTRAINT "UserToProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SourceCodeEmbedding" ADD CONSTRAINT "SourceCodeEmbedding_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Commits" ADD CONSTRAINT "Commits_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
