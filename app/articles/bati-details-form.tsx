"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/types/article-schema";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function BatiDetailsForm() {
  const { control, watch, setValue } = useFormContext();
  const selectedServices = watch("services");
  const surfaceTotale = watch("surface_totale");
  const surfaceCouvert = watch("surface_couvert");
  const validateSurfaceCouvert = (value) => {
    return (
      value <= surfaceTotale ||
      "La surface couverte doit être inférieure ou égale à la surface totale."
    );
  };
  useEffect(() => {
    const calculateTax = () => {
      const prestationCount = selectedServices.length;
      let taux_prestation;

      if (prestationCount <= 2) {
        taux_prestation = 0.08;
      } else if (prestationCount <= 4) {
        taux_prestation = 0.1;
      } else if (prestationCount <= 6) {
        taux_prestation = 0.12;
      } else {
        taux_prestation = 0.14; // If "اخر" is selected
      }

      const category = getCategory(surfaceTotale);
      const pris_ref = getPrisRef(category);

      const tax =
        surfaceCouvert * pris_ref * 0.02 * taux_prestation +
        surfaceCouvert * pris_ref * 0.02 * 0.04;

      setValue("taux", taux_prestation);
      setValue("categorie", category);
      setValue("tax", tax);
    };

    calculateTax();
  }, [selectedServices, surfaceTotale, surfaceCouvert, setValue]);

  // Get category based on surface
  const getCategory = (surface) => {
    if (surface <= 100) return "1";
    if (surface <= 200) return "2";
    if (surface <= 400) return "3";
    return "4";
  };

  // Get pris_ref based on category
  const getPrisRef = (category) => {
    switch (category) {
      case "1":
        return 150;
      case "2":
        return 200;
      case "3":
        return 250;
      case "4":
        return 300;
      default:
        return 150;
    }
  };

  return (
    <div>
      {/* Surface totale */}

      <FormField
        control={control}
        name="surface_totale"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Surface totale (m²)</FormLabel>
            <Input
              type="number"
              placeholder="Entrez la surface totale"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Surface couvert */}
      <FormField
        control={control}
        name="surface_couvert"
        rules={{
          validate: validateSurfaceCouvert,
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Surface couvert (m²)</FormLabel>
            <Input
              type="number"
              placeholder="Entrez la surface couvert"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Services */}
      <FormField
        control={control}
        name="services"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Services</FormLabel>
            <div className="space-y-2">
              {services.map((service) => (
                <div key={service} className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value?.includes(service)}
                    onCheckedChange={(checked) => {
                      if (service === "Nettoyage") return; // Netoyyage cannot be unchecked
                      const newServices = checked
                        ? [...(field.value || []), service]
                        : field.value?.filter((s) => s !== service);
                      field.onChange(newServices);
                    }}
                    disabled={service === "Nettoyage"} // Netoyyage is disabled
                  />
                  <FormLabel>{service}</FormLabel>
                </div>
              ))}
            </div>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Taux (calculated based on services) */}
      <FormField
        control={control}
        name="taux"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Taux</FormLabel>
            <Input
              disabled
              type="number"
              placeholder="Taux"
              {...field}
              readOnly
            />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Catégorie (based on surface) */}
      <FormField
        control={control}
        name="categorie"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Catégorie 1 (0-100 m²)</SelectItem>
                <SelectItem value="2">Catégorie 2 (101-200 m²)</SelectItem>
                <SelectItem value="3">Catégorie 3 (201-400 m²)</SelectItem>
                <SelectItem value="4">Catégorie 4 (400+ m²)</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Tax Value (calculated) */}
      <FormField
        control={control}
        name="tax"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Taxe</FormLabel>
            <Input
              disabled
              type="number"
              placeholder="Taxe"
              {...field}
              readOnly
            />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
