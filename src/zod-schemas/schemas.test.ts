import { StrictCategorySchema, CategoriesSchema, NanoidSchema } from "./dataZodSchemas";

describe('NanoidSchema', () => {
  it('should accept valid Nanoid', () => {
    const result = NanoidSchema.safeParse("Z_3-1G");
    expect(result.success).toBe(true)
  });

  it('should reject non string values', () => {
    const result = NanoidSchema.safeParse(111);
    expect(result.success).toBe(false);
  });

  it('should reject empty string', () => {
    const result = NanoidSchema.safeParse('');
    expect(result.success).toBe(false);
  });

  it('should reject invalid Nanoid', () => {
    const result = NanoidSchema.safeParse('abc123_!');
    expect(result.success).toBe(false);
  });
})

describe('StrictCategorySchema', () => {
  const validCategory = {
    id: 'abc123',
    order: 1,
    name: 'Test category',
    hidden: false,
    color: 45,
  }

  it('should validate a correct category', () => {
    const result = StrictCategorySchema.safeParse(validCategory);
    expect(result.data?.id).toBe(validCategory.id);
    expect(result.data?.order).toBe(validCategory.order);
    expect(result.data?.name).toBe(validCategory.name);
    expect(result.data?.hidden).toBe(validCategory.hidden);
    expect(result.data?.color).toBe(validCategory.color);
  });
  
  it('should set order to 999 if not number', () => {
    const category = {
      ...validCategory,
      order: "abc",
    };
    const result = StrictCategorySchema.safeParse(category);
    expect(result.data?.order).toBe(999);
  });

  it('should round order float values', () => {
    const category = {
      ...validCategory,
      order: 1.1,
    };
    const result = StrictCategorySchema.safeParse(category);
    expect(result.data?.order).toBe(1);
  });

  it('should handle name lenght out of 1-20 rangeTP and set value to "NIEPRAWIDŁOWA NAZWA"', () => {
    const category = {
      ...validCategory,
      name: 'a'.repeat(21),
    };
    const result = StrictCategorySchema.safeParse(category);
    expect(result.data?.name).toBe("NIEPRAWIDŁOWA NAZWA");
  });

  it('should correctly format the name', () => {
    const category = {
      ...validCategory,
      name: 'TEST category',
    };
    const result = StrictCategorySchema.safeParse(category);
    expect(result.data?.name).toBe('Test category');
  });

  it('should handle invalid hidden', () => {
    const category = {
      ...validCategory,
      hidden: null,
    };
    const result = StrictCategorySchema.safeParse(category);
    expect(result.data?.hidden).toBe(false);
  });

  it('should normalize color value', () => {
    const category = {
      ...validCategory,
      color: "499.9",
    };
    const result = StrictCategorySchema.safeParse(category);
    expect(result.data?.color).toBe(140); // 500 % 360 = 140
  });
});


describe('CategoriesSchema', () => {
  it('should filter out invalid categories', () => {
    const categories = [
      { id: 'abc123', order: 1, name: 'Category 1', hidden: false, color: 0 },
      { id: 111, order: 6, name: 'Category 6', hidden: false, color: 360 },
    ];
    const result = CategoriesSchema.safeParse(categories);
    expect(result.data?.length).toBe(1);
  });

  it('should filter out duplicate categories', () => {
    const categories = [
      { id: 'abc123', order: 1, name: 'Category 1', hidden: false, color: 0 },
      { id: 'def456', order: 2, name: 'Category 2', hidden: false, color: 90 },
      { id: 'ghi789', order: 3, name: 'Category 3', hidden: false, color: 180 },
      { id: 'def456', order: 4, name: 'Category 4', hidden: false, color: 270 },
      { id: 'def456', order: 5, name: 'Category 5', hidden: false, color: 360 },
    ];
    const result = CategoriesSchema.safeParse(categories);
    expect(result.success).toBe(true);
    expect(result.data?.length).toBe(3); // duplicate 'abc123' should be removed
    expect(!!result.data && result.data[1].name).toBe("Category 2");
  });

  it('should handle order correctly for hidden and visible categories', () => {
    const categories = [
      { id: 'abc123', order: 3, name: 'Category 3', hidden: false, color: 30 },
      { id: 'def456', order: 1, name: 'Category 1', hidden: true, color: 45 },
      { id: 'ghi789', order: 2, name: 'Category 2', hidden: false, color: 90 },
    ];
    const result = CategoriesSchema.safeParse(categories);
    expect(!!result.data && result.data.find(c => c.id === 'def456')?.order).toBe(-1);
    expect(!!result.data && result.data.find(c => c.id === 'abc123')?.order).toBe(1);
    expect(!!result.data && result.data.find(c => c.id === 'ghi789')?.order).toBe(0);
  });
});