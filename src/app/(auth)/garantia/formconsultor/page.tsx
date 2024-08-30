import { FormConsultor } from "@/components/form/Consultor";
import db from "@/db/db";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

const formSchema = z.object({
  os: z
    .number()
    .min(2, { message: "Número de OS inválido" })
    .max(999999, { message: "Número de OS inválido" }),
  data: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "A data deve ser uma data válida.",
  }),
  consultor: z.string().min(2, { message: "Selecione um consultor" }).max(50, {
    message: "O nome do consultor não pode exceder 50 caracteres.",
  }),
  categoria: z
    .string()
    .min(2, { message: "Selecione uma categoria" })
    .max(50, { message: "A categoria não pode exceder 50 caracteres." }),
  inconsistencias: z
    .string()
    .min(2, { message: "Selecione uma inconsistência" })
    .max(100, {
      message: "A inconsistência não pode exceder 100 caracteres.",
    }),
  orientacao: z
    .string()
    .min(2, { message: "Escreva as orientações" })
    .max(100, { message: "A orientação não pode exceder 100 caracteres" }),

  filial: z.string().min(2),
});

async function FormConsultorPage() {
  const user = await currentUser();

  const filial = user?.publicMetadata.filial as string;

  const consultores = await db.consultores.findMany({
    where: {
      filial: filial,
    },
  });

  const trimedFilial = filial.split(' ')[0]

  console.log(trimedFilial)

  const perguntas = await db.garantia.findMany({
    where: {
      filial: trimedFilial,
    },
  });

  async function sendFormDB(formData: FormData): Promise<{ success: boolean; message: string; }> {

    "use server";

    const data = {
      data: formData.get("data")
        ? new Date(formData.get("data") as string).toISOString()
        : null,
      os: formData.get("os") ? Number(formData.get("os")) : null,
      consultor: formData.get("consultor")?.toString(),
      categoria: formData.get("categoria")?.toString(),
      orientacao: formData.get("orientacoes")?.toString(),
      inconsistencias: formData.get("inconsistencias")?.toString(),
      filial: filial,
    };

    const validationResult = formSchema.safeParse(data);

    if (!validationResult.success) {
      return { success: false, message: "Validation failed: " + validationResult.error.message };
    }

    try {
      const res = await db.erro_consultor.create({
        data: validationResult.data
      });
  
      return { success: true, message: "Formulário enviado com sucesso" };
    } catch (error) {
      console.error("Erro ao criar no banco de dados:", error);
      return { success: false, message: "Algo deu erro tente novamente!"};
    }
  }

  return (
    <section className="flex w-full h-full justify-center">
      <FormConsultor
        sendFormDB={sendFormDB}
        consultores={consultores}
        perguntas={perguntas}
      />
    </section>
  );
}

export default FormConsultorPage;
