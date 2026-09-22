-- Manufacturing notes: attach multilingual PDFs to mapped products.
-- Sets both EN and IT manufacturer-instruction URLs to the same public file.
-- FR/DE/ES fall back to the English URL on the product page.
-- Skip HLC_MN_158.pdf (no matching product). Do not run until the PDFs are in Storage.

BEGIN;

-- HLC_MN_152.pdf -> 152-12, 152-12sgml, 152-12-015l, 152-12-015l-fdt
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_152.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_152.pdf',
  updated_at = now()
WHERE slug IN ('152-12', '152-12sgml', '152-12-015l', '152-12-015l-fdt');

-- HLC_MN_Juta.pdf -> 152-12-juta
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_Juta.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_Juta.pdf',
  updated_at = now()
WHERE slug IN ('152-12-juta');

-- HLC_MN_152-14.pdf -> 152-14ml-3l15, 152-14ml-3l20, 152-14-4lj15
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_152-14.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_152-14.pdf',
  updated_at = now()
WHERE slug IN ('152-14ml-3l15', '152-14ml-3l20', '152-14-4lj15');

-- HLC_MN_225.pdf -> 225, 225-l-bk
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_225.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_225.pdf',
  updated_at = now()
WHERE slug IN ('225', '225-l-bk');

-- HLC_MN_325.pdf -> 325-hr, 325-hr-l-bk
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_325.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_325.pdf',
  updated_at = now()
WHERE slug IN ('325-hr', '325-hr-l-bk');

-- HLC_MN_100.pdf -> 100-a, 100-al
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_100.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_100.pdf',
  updated_at = now()
WHERE slug IN ('100-a', '100-al');

-- HLC_MN_151.pdf -> 151-8
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_151.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_151.pdf',
  updated_at = now()
WHERE slug IN ('151-8');

-- HLC_MN_HL_1000.pdf -> hl-1000
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_HL_1000.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_HL_1000.pdf',
  updated_at = now()
WHERE slug IN ('hl-1000');

-- HLC_MN_06.pdf -> 06-p-212, 06-p-212-l, 06-160
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_06.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_06.pdf',
  updated_at = now()
WHERE slug IN ('06-p-212', '06-p-212-l', '06-160');

-- HLC_MN_06_350C.pdf -> 06-p212-36-350
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_06_350C.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_06_350C.pdf',
  updated_at = now()
WHERE slug IN ('06-p212-36-350');

-- HLC_MN_49K.pdf -> 49k, 49k-c
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_49K.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_49K.pdf',
  updated_at = now()
WHERE slug IN ('49k', '49k-c');

-- HLC_MN_49K_CUT5.pdf -> 49k-cut5
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_49K_CUT5.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_49K_CUT5.pdf',
  updated_at = now()
WHERE slug IN ('49k-cut5');

-- HLC_MN_49K_DA.pdf -> 49k-da
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_49K_DA.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_49K_DA.pdf',
  updated_at = now()
WHERE slug IN ('49k-da');

-- HLC_MN_49K_R.pdf -> 49k-r
UPDATE products
SET
  manufacturers_instruction_url = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_49K_R.pdf',
  manufacturers_instruction_url_it = 'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/technical-sheets/manufacturing-notes/HLC_MN_49K_R.pdf',
  updated_at = now()
WHERE slug IN ('49k-r');

COMMIT;
