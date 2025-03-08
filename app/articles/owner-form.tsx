import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";

export default function OwnerForm() {
  const { control } = useFormContext();
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="cin"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-start items-start">
            <FormLabel>CIN:</FormLabel>
            <Input {...field} placeholder="000000" type="number" />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="nom"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-start items-start">
            <FormLabel>Nom:</FormLabel>
            <Input {...field} placeholder="John" type="text" />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="prenom"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-start items-start">
            <FormLabel>Prenom:</FormLabel>
            <Input {...field} placeholder="Doe" type="text" />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="mail"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-start items-start">
            <FormLabel>Email:</FormLabel>
            <Input {...field} placeholder="name@domaine.com" type="email" />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="telephone"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-start items-start">
            <FormLabel>telephone:</FormLabel>
            <Input {...field} placeholder="" type="number" />
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
