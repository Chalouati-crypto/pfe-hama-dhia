"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema } from "@/types/article-schema";
import { FileUser, HouseIcon, SettingsIcon } from "lucide-react";

import GeneralForm from "@/app/articles/general-form";
import OwnerForm from "@/app/articles/owner-form";
import AddressForm from "@/app/articles/adress-form";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { z } from "zod";
import BatiDetailsForm from "@/app/articles/bati-details-form";

export default function ArticleForm() {
  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    reValidateMode: "onChange",
    defaultValues: {
      date_debut_imposition: new Date(),
      type_entree: undefined,
      type_propriete: undefined,
      cin: "",
      district: "",
      mail: "",
      nom: "",
      prenom: "",
      rue: "",
      telephone: "",
      zone: "",
      surface_totale: undefined,
      surface_couverte: undefined,
      services: ["Nettoyage"],
      taux: undefined,
      categorie: undefined,
      tax: undefined,
    },
  });
  const selectedType = useWatch({
    control: form.control,
    name: "type_propriete",
  });

  const onSubmit = (values: z.infer<typeof articleSchema>) => {
    console.log("hiiiiiiiiiiii");
    console.log(values);
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-1/4 min-w-[300px] min-h-[200px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Ajout d&apos;un article</CardTitle>
          <CardDescription>
            Veuillez vous assurer que tous les champs sont remplis avec
            précision et complétude.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Accordion type="single" collapsible>
                <AccordionItem
                  value="item-1"
                  className={`${
                    Object.keys(form.formState.errors).some((key) =>
                      [
                        "type_propriete",
                        "type_entree",
                        "date_debut_imposition",
                      ].includes(key)
                    )
                      ? "border-2 px-6 border-red-500 text-red-500" // If GeneralForm has errors, add a red border
                      : ""
                  }`}
                >
                  <AccordionTrigger className="flex justify-start gap-8">
                    <div
                      className={`${
                        Object.keys(form.formState.errors).some((key) =>
                          [
                            "type_propriete",
                            "type_entree",
                            "date_debut_imposition",
                          ].includes(key)
                        )
                          ? "text-red-500 " // If GeneralForm has errors, add a red border
                          : ""
                      }w-8 h-8 rounded-full border-2 flex items-center justify-center border-black/50`}
                    >
                      <SettingsIcon size={20} />
                    </div>
                    Parametres Generaux
                  </AccordionTrigger>
                  <AccordionContent>
                    <GeneralForm />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  className={`${
                    Object.keys(form.formState.errors).some((key) =>
                      ["district", "zone", "rue"].includes(key)
                    )
                      ? "border-2 px-6 border-red-500 text-red-500" // If GeneralForm has errors, add a red border
                      : ""
                  }`}
                  value="item-2"
                >
                  <AccordionTrigger className="flex justify-start gap-8">
                    <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-black/50">
                      <HouseIcon size={20} />
                    </div>
                    Addresse
                  </AccordionTrigger>
                  <AccordionContent>
                    <AddressForm />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  className={`${
                    Object.keys(form.formState.errors).some((key) =>
                      ["cin", "nom", "prenom", "telephone", "mail"].includes(
                        key
                      )
                    )
                      ? "border-2 px-6 border-red-500 text-red-500" // If GeneralForm has errors, add a red border
                      : ""
                  }`}
                  value="item-3"
                >
                  <AccordionTrigger className="flex justify-start gap-8">
                    <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-black/50">
                      <FileUser size={20} />
                    </div>
                    Proprietaire
                  </AccordionTrigger>
                  <AccordionContent>
                    <OwnerForm />
                  </AccordionContent>
                </AccordionItem>
                {selectedType === "bati" && (
                  <AccordionItem
                    className={`${
                      Object.keys(form.formState.errors).some((key) =>
                        [
                          "surface_totale",
                          "surface_couvert",
                          "services",
                          "taux",
                          "categorie",
                        ].includes(key)
                      )
                        ? "border-2 px-6 border-red-500 text-red-500" // If GeneralForm has errors, add a red border
                        : ""
                    }`}
                    value="item-4"
                  >
                    <AccordionTrigger className="flex justify-start gap-8">
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-black/50">
                        <FileUser size={20} />
                      </div>
                      Details d&apos;un article bati
                    </AccordionTrigger>
                    <AccordionContent>
                      <BatiDetailsForm />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
              <Button
                type="submit"
                className={cn(
                  " cursor-pointerw-full mt-8",
                  status === "executing" ? "animate-pulse" : ""
                )}
              >
                Ajouter un article
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
/*
     

*/
