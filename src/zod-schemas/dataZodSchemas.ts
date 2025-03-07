import { z } from "zod";

export const StrictCategorySchema = z.object({
  id: z.string().min(1).regex(/[a-zA-Z0-9]/),
  order: z.number().int().catch(() => 999),
  name: z.string().min(1).max(20).transform((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).catch(() => "NIEPRAWIDŁOWA NAZWA"),
  hidden: z.boolean().default(false),
  color: z.number().int().min(0).max(359).catch((value) => {
    const num = Number(value.input);
    return ((isNaN(num) ? 0 : num % 360) + 360) % 360
  }),
}).strip()

export const CategoriesSchema = z.array(StrictCategorySchema).transform((data) => {
  const uniqueCategories = data.filter((category, index, self) => {
    const sameIdCategories = self.filter((cat) => cat.id === category.id);
    if (sameIdCategories.length > 1) console.log("Category ID duplicates", sameIdCategories);

    return self.findIndex(c => c.id === category.id) === index;
  });
  const validCategories = uniqueCategories.filter(category => {
    const validationResult = StrictCategorySchema.safeParse(category);
    return validationResult.success;
  });
  const hiddenCategories = validCategories.filter((category) => category.hidden).map((category) => ({ ...category, order: -1 }));
  const visibleCategories = validCategories.filter((category) => !category.hidden).sort((a, b) => a.order - b.order).map((category, index) => ({ ...category, order: index }));
  return [...visibleCategories, ...hiddenCategories];
});