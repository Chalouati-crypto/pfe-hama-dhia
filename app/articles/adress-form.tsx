import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

export default function AddressForm() {
  const { control, watch, setValue } = useFormContext();

  // Watch the values of district and zone
  const selectedDistrict = watch("district");
  const selectedZone = watch("zone");

  // Get zones based on the selected district
  const zones = districts.find((d) => d.name === selectedDistrict)?.zones || [];

  // Get streets based on the selected zone
  const streets = zones.find((z) => z.name === selectedZone)?.streets || [];

  return (
    <div className="space-y-4">
      {/* District Select */}
      <Controller
        name="district"
        control={control}
        render={({ field }) => (
          <div>
            <label>District</label>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value); // Update the district field
                setValue("zone", ""); // Reset zone when district changes
                setValue("rue", ""); // Reset rue when district changes
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionner un district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.name} value={district.name}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />

      {/* Zone Select */}
      <Controller
        name="zone"
        control={control}
        render={({ field }) => (
          <div>
            <label>Zone</label>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value); // Update the zone field
                setValue("rue", ""); // Reset rue when zone changes
              }}
              disabled={!selectedDistrict} // Disable if no district is selected
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionner une zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.name} value={zone.name}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />

      {/* Rue Select */}
      <Controller
        name="rue"
        control={control}
        render={({ field }) => (
          <div>
            <label>Rue</label>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedZone} // Disable if no zone is selected
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionner une rue" />
              </SelectTrigger>
              <SelectContent>
                {streets.map((street) => (
                  <SelectItem key={street} value={street}>
                    {street}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />
    </div>
  );
}
