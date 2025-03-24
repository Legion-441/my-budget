import { z } from "zod";

export const NanoidSchema = z.string().min(1).regex(/^[a-zA-Z0-9_-]+$/)

export const StrictCategorySchema = z.object({
  id: NanoidSchema,
  order: z.number().int().catch(999),
  name: z.string().min(1).max(20).transform((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).catch("NIEPRAWIDŁOWA NAZWA"),
  hidden: z.boolean().catch(false),
  color: z.number().int().min(0).max(359).catch((value) => {
    const num = Number(value.input);
    return ((isNaN(num) ? 0 : num % 360) + 360) % 360
  }),
}).strip()

export const CategoriesSchema = z.array(StrictCategorySchema).transform((data) => {
  const validCategories = data
    .map(category => StrictCategorySchema.safeParse(category))
    .filter(result => result.success)
    .map(result => result.data as z.infer<typeof StrictCategorySchema>);

  const uniqueCategories = validCategories.filter((category, index, array) => {
    const isDuplicate = array.findIndex(c => c.id === category.id) !== index;
    if (isDuplicate) console.log("Category ID duplicates", category.id);
    return !isDuplicate;
  });
  
  const hiddenCategories = uniqueCategories
    .filter((category) => category.hidden)
    .map((category) => ({ ...category, order: -1 }));

  const visibleCategories = uniqueCategories
    .filter((category) => !category.hidden)
    .sort((a, b) => a.order - b.order)
    .map((category, index) => ({ ...category, order: index }));

  return [...visibleCategories, ...hiddenCategories];
});