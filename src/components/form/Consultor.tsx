"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Consultores, garantia } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  orientacoes: z
    .string()
    .min(2, { message: "Escreva as orientações" })
    .max(100, { message: "A orientação não pode exceder 100 caracteres" }),
});

type FormConsultorProps = {
  consultores: Consultores[];
  perguntas: garantia[];
  sendFormDB: (
    formData: FormData
  ) => Promise<{ success: boolean; message: string }>;
};

type Categorias = {
  [key: string]: {
    inconsistencias: string[];
  };
};

export function FormConsultor({
  consultores,
  perguntas,
  sendFormDB,
}: FormConsultorProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      os: 0,
      data: "",
      consultor: "",
      categoria: "",
      inconsistencias: "",
      orientacoes: "",
    },
  });

  const { watch, handleSubmit, control } = form;
  const selectedCategoria = watch("categoria");

  const categoriaObj = perguntas[0]?.perguntas as unknown as {
    categorias?: Categorias;
  };

  const categorias = categoriaObj?.categorias || {};
  const inconsistencias = selectedCategoria
    ? categorias[selectedCategoria]?.inconsistencias || []
    : [];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value.toString());
    }
    const res = await sendFormDB(formData);
    if (res.success) {
      toast({ description: res.message });
      form.reset();
    } else {
      toast({ description: res.message });
    }
  }

  return (
    <div className="w-full px-4 md:px-8 py-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1 */}
            <div className="space-y-6">
              <FormField
                control={control}
                name="os"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="os">Ordem de serviço</FormLabel>
                    <FormControl>
                      <Input
                        id="os"
                        type="number"
                        placeholder="OS"
                        {...field}
                        className="w-full"
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="data">Data</FormLabel>
                    <FormControl>
                      <Input
                        id="data"
                        type="date"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="consultor"
                render={({ field }) => (
                  <FormItem id="consultor">
                    <FormLabel htmlFor="consultor">Consultor</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Consultor" />
                        </SelectTrigger>
                        <SelectContent>
                          {consultores.map((consultor) => (
                            <SelectItem
                              key={consultor.xata_id}
                              value={consultor.name}
                            >
                              {consultor.name.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Coluna 2 */}
            <div className="space-y-6">
              <FormField
                control={control}
                name="categoria"
                render={({ field }) => (
                  <FormItem id="categoria">
                    <FormLabel htmlFor="categoria">Categoria</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(categorias).length > 0 ? (
                            Object.keys(categorias).map((categoria) => (
                              <SelectItem key={categoria} value={categoria}>
                                {categoria.toUpperCase()}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="" disabled>
                              Nenhuma categoria disponível
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedCategoria && inconsistencias.length > 0 && (
                <FormField
                  control={control}
                  name="inconsistencias"
                  render={({ field }) => (
                    <FormItem id="inconsistencias">
                      <FormLabel htmlFor="inconsistencias">
                        Inconsistência
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Inconsistência" />
                          </SelectTrigger>
                          <SelectContent>
                            {inconsistencias.map((inconsistencia, index) => (
                              <SelectItem key={index} value={inconsistencia}>
                                {inconsistencia}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={control}
                name="orientacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="orientacoes">Orientações</FormLabel>
                    <FormControl>
                      <Textarea
                        id="orientacoes"
                        placeholder="Oriente o consultor na resolução do problema"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
