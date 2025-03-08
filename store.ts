import { create } from "zustand";
import {
  articleSchema,
  generalSchema,
  ownerSchema,
  addressSchema,
} from "@/types/article-schema";
import { z } from "zod";

// Infer types from Zod schemas
type General = z.infer<typeof generalSchema>;
type Owner = z.infer<typeof ownerSchema>;
type Address = z.infer<typeof addressSchema>;
type Article = z.infer<typeof articleSchema>;

interface ArticleStore {
  general: General;
  owner: Owner;
  address: Address;
  services: string[];
  setGeneral: (general: Partial<General>) => void;
  setOwner: (owner: Partial<Owner>) => void;
  setAddress: (address: Partial<Address>) => void;
  setServices: (services: string[]) => void;
  validate: () => { success: boolean; errors: Record<string, string> };
}

export const useArticleStore = create<ArticleStore>((set, get) => ({
  // Initial state
  general: {
    type_propriete: "bati", // Default value
    type_entree: "recensement", // Default value
    date_debut_imposition: new Date(), // Default to current date
  },
  owner: {
    cin: "",
    nom: "",
    prenom: "",
    mail: "",
    telephone: "",
  },
  address: {
    district: "",
    zone: "",
    rue: "",
  },
  services: [],

  // Methods to update state
  setGeneral: (general) =>
    set((state) => ({
      general: { ...state.general, ...general },
    })),

  setOwner: (owner) =>
    set((state) => ({
      owner: { ...state.owner, ...owner },
    })),

  setAddress: (address) =>
    set((state) => ({
      address: { ...state.address, ...address },
    })),

  setServices: (services) => set({ services }),

  // Validation method
  validate: () => {
    const state = get();
    const result = articleSchema.safeParse(state);

    if (!result.success) {
      // Format errors into a key-value object
      const errors = result.error.errors.reduce((acc, err) => {
        acc[err.path.join(".")] = err.message;
        return acc;
      }, {} as Record<string, string>);

      return { success: false, errors };
    }

    return { success: true, errors: {} };
  },
}));
