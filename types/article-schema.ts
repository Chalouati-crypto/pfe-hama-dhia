import * as z from "zod";

export const services = [
  "Nettoyage",
  "Éclairage public",
  "Voies pavées",
  "Drainage des eaux usées",
  "Drainage des eaux pluviales",
  "Trottoirs pavés",
  "Autre",
] as const;
const servicesSchema = z.array(z.enum(services));
export const districts = [
  {
    name: "Tunis",
    zones: [
      {
        name: "Centre-ville",
        streets: [
          "Avenue Habib Bourguiba",
          "Rue de Marseille",
          "Rue Al Jazira",
        ],
      },
      {
        name: "Lafayette",
        streets: ["Rue de Russie", "Rue d'Algérie", "Rue de Turquie"],
      },
      {
        name: "El Menzah",
        streets: [
          "Rue du Lac Biwa",
          "Rue du Lac Tanganyika",
          "Rue du Lac Ontario",
        ],
      },
      {
        name: "Cité El Khadra",
        streets: ["Rue de Palestine", "Rue de Syrie", "Rue de Liban"],
      },
    ],
  },
] as const;
const districtNames = districts.map((d) => d.name) as [string, ...string[]];
const zoneNames = districts.flatMap((d) => d.zones.map((z) => z.name)) as [
  string,
  ...string[]
];
const rueNames = districts.flatMap((d) =>
  d.zones.flatMap((z) => z.streets)
) as [string, ...string[]];

export const articleSchema = z.object({
  type_propriete: z.enum(["bati", "non_bati"], {
    message: "Le type de propriété doit être sélectionné",
  }),
  type_entree: z.enum(["recensement", "declaration"], {
    message: "Le type d'entrée doit être sélectionné",
  }),
  date_debut_imposition: z.date({
    required_error: "La date de début d'imposition est requise",
  }),

  district: z.enum(districtNames, {
    message: "District invalide",
  }),
  zone: z.enum(zoneNames, {
    message: "Zone invalide",
  }),
  rue: z.enum(rueNames, {
    message: "Rue invalide",
  }),

  cin: z.string().min(8, { message: "CIN is required" }),
  nom: z.string().min(1, { message: "Nom is required" }),
  prenom: z.string().min(1, { message: "Prénom is required" }),
  mail: z.string().email({ message: "Invalid email address" }),
  telephone: z.string().min(1, { message: "Telephone is required" }),

  surface_totale: z.number().min(1).optional(),
  surface_couverte: z.number().min(1).optional(),
  services: servicesSchema.optional(),
  taux: z.number().min(0).max(1).optional(),
  categorie: z.enum(["1", "2", "3"]).optional(),
  tax: z.number().min(0).optional(),
});
