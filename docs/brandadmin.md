## Brand Management for Admin Product Forms (plan)

### Executive summary
- Add brand selection and management functionality to admin product create/edit forms in the Basic Information section.
- Allow admins to select from existing brands (with logos) or create new brands with custom logos.
- Extend the current brand system to support dynamic brand management with logo uploads.
- Maintain existing brand display functionality on product detail pages with light/dark mode support.

---

### Current Brand System Analysis

#### Database Structure
- **Field**: `brands text[]` - Array of brand names stored as strings
- **Location**: `public.products.brands` column
- **Current brands**: Hand Line, ProGloves Heat, ProGloves Cut

#### Brand Logo System
- **Location**: `/public/brands/` directory
- **Current logos**:
  - `HL_word_logo.PNG` - Hand Line logo
  - `proheat.png` / `proheatnobg.png` - ProGloves Heat logos
  - `procut.png` / `procutnobg.png` - ProGloves Cut logos
- **Logo mapping**: Hardcoded in `getBrandLogo()` functions in `ProductDetail.tsx` and `product-info-display.tsx`

#### Light/Dark Mode Handling
- **Light mode**: Shows original logo image
- **Dark mode**: Uses CSS `invert` filter with `clipPath` to invert only the left 55% of the logo
- **Implementation**: Two `<Image>` components with conditional rendering based on `dark:` class

#### Current Admin State
- **State variable**: `const [brands, setBrands] = useState<string[]>([]);`
- **Save payload**: `brands` field included in create/update operations
- **UI**: Currently no brand selection UI in admin forms (only state management)

---

### Data Model (DB)

#### Option 1: Extend Current System (Recommended)
Keep existing `brands text[]` field and add a separate brands table for management.

```sql
-- 1) Create brands management table
CREATE TABLE IF NOT EXISTS public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  logo_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2) Insert existing brands with Supabase storage URLs
INSERT INTO public.brands (name, logo_url) VALUES
  ('Hand Line', 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/brands/HL_word_logo.PNG'),
  ('ProGloves Heat', 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/brands/proheatnobg.png'),
  ('ProGloves Cut', 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/brands/procutnobg.png')
ON CONFLICT (name) DO NOTHING;

-- 3) Add index for performance
CREATE INDEX IF NOT EXISTS brands_name_idx ON public.brands (name);
```

#### Option 2: Replace with JSONB (Alternative)
Replace `brands text[]` with structured brand data.

```sql
-- 1) Add new brands JSONB column
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS brands_data jsonb DEFAULT '[]'::jsonb;

-- 2) Migrate existing data
UPDATE public.products 
SET brands_data = jsonb_build_array(
  jsonb_build_object('name', unnest(brands), 'logo_url', null)
);

-- 3) Add GIN index
CREATE INDEX IF NOT EXISTS products_brands_data_gin 
ON public.products USING gin (brands_data);
```

**Recommendation**: Use Option 1 to maintain backward compatibility and avoid data migration complexity.

---

### Types (frontend)

#### Brand Management Types
```ts
// lib/brands-service.ts
export interface Brand {
  id: string;
  name: string;
  logo_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BrandWithLogo extends Brand {
  logo_path?: string; // Computed path for display
}
```

#### Product Interface Extension
```ts
// lib/products-service.ts - no changes needed
// Keep existing: brands: string[];
```

---

### Website – Brand Display Updates

#### 1) Create Brand Service
```ts
// lib/brands-service.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function getAllBrands(): Promise<Brand[]> {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
}

export function getBrandLogoPath(brandName: string, brands: Brand[]): string | null {
  const brand = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
  return brand?.logo_url || null;
}
```

#### 2) Update Brand Logo Functions
```ts
// components/website/products/slug/ProductDetail.tsx
// Replace hardcoded getBrandLogo with dynamic version
const getBrandLogo = (brandName: string) => {
  // Use brands from context or props
  return getBrandLogoPath(brandName, availableBrands);
};
```

#### 3) Brand Context Provider
```ts
// lib/context/brands-context.tsx
export function BrandsProvider({ children }: { children: React.ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  
  useEffect(() => {
    getAllBrands().then(setBrands);
  }, []);
  
  return (
    <BrandsContext.Provider value={{ brands }}>
      {children}
    </BrandsContext.Provider>
  );
}
```

---

### Admin – Brand Management UI

#### 1) Brand Selection Component
```tsx
// components/admins/brand-selector.tsx
interface BrandSelectorProps {
  selectedBrands: string[];
  onBrandsChange: (brands: string[]) => void;
  availableBrands: Brand[];
  onNewBrand: (name: string, logoFile?: File) => void;
}

export function BrandSelector({ selectedBrands, onBrandsChange, availableBrands, onNewBrand }: BrandSelectorProps) {
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState<File | null>(null);
  const [showNewBrandForm, setShowNewBrandForm] = useState(false);

  return (
    <div className="space-y-4">
      {/* Existing Brand Selection */}
      <div>
        <Label>Select Brands</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {availableBrands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onBrandsChange([...selectedBrands, brand.name]);
                  } else {
                    onBrandsChange(selectedBrands.filter(b => b !== brand.name));
                  }
                }}
              />
              <Label htmlFor={`brand-${brand.id}`} className="flex items-center gap-2">
                {brand.logo_url && (
                  <Image
                    src={brand.logo_url}
                    alt={brand.name}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                )}
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* New Brand Creation */}
      <div className="border-t pt-4">
        <Button
          variant="outline"
          onClick={() => setShowNewBrandForm(!showNewBrandForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Brand
        </Button>

        {showNewBrandForm && (
          <div className="mt-4 p-4 border rounded-lg space-y-4">
            <div>
              <Label>Brand Name</Label>
              <Input
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Enter brand name"
              />
            </div>
            <div>
              <Label>Brand Logo (Optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setNewBrandLogo(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  onNewBrand(newBrandName, newBrandLogo || undefined);
                  setNewBrandName('');
                  setNewBrandLogo(null);
                  setShowNewBrandForm(false);
                }}
                disabled={!newBrandName.trim()}
              >
                Create Brand
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setNewBrandName('');
                  setNewBrandLogo(null);
                  setShowNewBrandForm(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

#### 2) Admin Form Integration
**Files**: `components/admins/prodmanagement/CategoryProductCreate.tsx` and `CategoryProductEdit.tsx`

**Location**: Basic Information section, add new row after Category/Sub-Category fields

```tsx
// Add to state
const [availableBrands, setAvailableBrands] = useState<Brand[]>([]);

// Add to useEffect (Edit only)
useEffect(() => {
  getAllBrands().then(setAvailableBrands);
}, []);

// Add to Basic Information section
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-2">
    <Label>Category</Label>
    <Input value={categoryLocales[language]} onChange={(e) => setCategoryLocales({...categoryLocales, [language]: e.target.value})} />
  </div>
  <div className="space-y-2">
    <Label>Sub-Category</Label>
    <Input value={subCategoryLocales[language]} onChange={(e) => setSubCategoryLocales({...subCategoryLocales, [language]: e.target.value})} />
  </div>
</div>

{/* NEW: Brand Selection Row */}
<div className="space-y-2">
  <BrandSelector
    selectedBrands={brands}
    onBrandsChange={setBrands}
    availableBrands={availableBrands}
    onNewBrand={async (name, logoFile) => {
      // Handle new brand creation
      const logoUrl = logoFile ? await uploadBrandLogo(logoFile) : null;
      const newBrand = await createBrand(name, logoUrl);
      setAvailableBrands([...availableBrands, newBrand]);
      setBrands([...brands, name]);
    }}
  />
</div>
```

#### 3) Brand Management Functions
```ts
// lib/brands-service.ts
export async function createBrand(name: string, logoUrl?: string): Promise<Brand> {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('brands')
    .insert({ name, logo_url: logoUrl })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function uploadBrandLogo(file: File): Promise<string> {
  // Implement file upload to /public/brands/ directory
  // Return the public URL path
}
```

---

### i18n (EN/IT)

Add brand-related translation keys:

```json
// en.json
"admin": {
  "brands": {
    "title": "Brands",
    "selectBrands": "Select Brands",
    "addNewBrand": "Add New Brand",
    "brandName": "Brand Name",
    "brandLogo": "Brand Logo",
    "createBrand": "Create Brand",
    "noBrandsSelected": "No brands selected"
  }
}

// it.json
"admin": {
  "brands": {
    "title": "Marchi",
    "selectBrands": "Seleziona Marchi",
    "addNewBrand": "Aggiungi Nuovo Marchio",
    "brandName": "Nome Marchio",
    "brandLogo": "Logo Marchio",
    "createBrand": "Crea Marchio",
    "noBrandsSelected": "Nessun marchio selezionato"
  }
}
```

---

### File Upload System

#### Brand Logo Upload
```ts
// lib/brands-service.ts
export async function uploadBrandLogo(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  
  // Upload to /api/upload/brand-logo endpoint
  const response = await fetch('/api/upload/brand-logo', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) throw new Error('Upload failed');
  const { url } = await response.json();
  return url;
}
```

#### API Endpoint
```ts
// app/api/upload/brand-logo/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  // Save to /public/brands/ directory
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'brands', fileName);
  
  // Write file and return public URL
  return Response.json({ url: `/brands/${fileName}` });
}
```

---

### Acceptance Checklist

1. **Database**: Brands table created with existing brands populated
2. **Admin UI**: Brand selector component integrated into Basic Information section
3. **Brand Creation**: Admins can create new brands with custom logos
4. **Brand Selection**: Multiple brand selection with checkboxes and logo previews
5. **File Upload**: Brand logo upload system working correctly
6. **Product Display**: Existing brand display on product pages continues to work
7. **Light/Dark Mode**: Brand logos display correctly in both themes
8. **Backward Compatibility**: Existing products with brands continue to display correctly
9. **Performance**: Brand logos load efficiently with proper caching
10. **Validation**: Brand names are unique and properly validated

---

### Rollout Plan

1. **Phase 1**: Database setup and brand service creation
2. **Phase 2**: Admin UI components and brand selector
3. **Phase 3**: File upload system and API endpoints
4. **Phase 4**: Integration into create/edit forms
5. **Phase 5**: Testing and validation
6. **Phase 6**: Production deployment

---

### Technical Considerations

#### Performance
- **Logo Caching**: Implement proper image caching for brand logos
- **Lazy Loading**: Load brand logos only when needed
- **CDN**: Consider CDN for brand logo delivery

#### Security
- **File Validation**: Validate uploaded logo files (type, size, content)
- **Path Sanitization**: Prevent directory traversal in file uploads
- **Access Control**: Ensure only admins can create/modify brands

#### Scalability
- **Brand Limits**: Consider limiting number of brands per product
- **Logo Optimization**: Automatically optimize uploaded logos
- **Database Indexing**: Ensure proper indexing for brand queries

---

### Future Enhancements

1. **Brand Management Page**: Dedicated admin page for managing all brands
2. **Brand Analytics**: Track which brands are most used
3. **Brand Categories**: Group brands by type or manufacturer
4. **Brand Import/Export**: Bulk brand management capabilities
5. **Brand Templates**: Pre-defined brand configurations for common manufacturers
