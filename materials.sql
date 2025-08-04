UPDATE public.products
SET materials_locales = CASE id

  WHEN 'c495dca9-4296-4d56-be66-aef4d2ebb63d' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '691e1987-709c-412e-b1c0-c9d05ca824d3' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '297912f2-2414-4bca-8112-578d1e176434' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '5604e35d-caca-4328-8716-96259e4b9db7' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '574319b2-d5b3-4808-83be-0df47c19e103' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '47bf886d-4df4-49e2-bf4c-096088262754' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '5a229593-c274-4576-ab54-b8bb114bde83' THEN
    '{"en":["cotton","jute"],"it":["cotone","juta"]}'::jsonb

  WHEN 'd7e3fdb9-8601-4285-a115-fe0cf6b284c2' THEN
    '{"en":["cotton","jute","sponge"],"it":["cotone","juta","spugna"]}'::jsonb

  WHEN 'b4a6d7a0-112d-40bd-b692-d4252b6970b5' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '7c15d277-9493-4b37-b70f-44a15577b629' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '0815677e-3a2c-48fd-b5d8-a1b10e992dcb' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '64ee08af-9438-4029-87f2-99e2a0eae0e7' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '642f4370-35d8-4ac7-83c6-a1bb71463d19' THEN
    '{"en":["cotton","jute"],"it":["cotone","juta"]}'::jsonb

  WHEN '3b34ffb8-00ce-4099-a1d1-6ba834c82401' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '70ce7549-de8c-4854-9d4b-074d9efb58eb' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '110a9c54-9891-449c-b34c-91dc040c5017' THEN
    '{"en":["leather"],"it":["pelle"]}'::jsonb

  WHEN '04e271ed-8b6d-4489-8bbe-875de9193dcd' THEN
    '{"en":["leather"],"it":["pelle"]}'::jsonb

  WHEN 'e62c1287-6a71-48ad-9f5b-f85828a4a40b' THEN
    '{"en":["leather","HPPE","steel"],"it":["pelle","HPPE","acciaio"]}'::jsonb

  WHEN '247af0ef-e855-4cff-909e-09e725e904dd' THEN
    '{"en":["leather","HPPE","steel"],"it":["pelle","HPPE","acciaio"]}'::jsonb

  WHEN '815eb38e-75d1-437d-b266-cf3a21bf6d63' THEN
    '{"en":["leather"],"it":["pelle"]}'::jsonb

  WHEN '4027f97e-fa2a-4eaa-8d8d-ff6a87f3ab84' THEN
    '{"en":["leather","Kevlar"],"it":["pelle","Kevlar"]}'::jsonb

  WHEN '70e457d3-5fac-42c7-970d-7fa034125811' THEN
    '{"en":["leather"],"it":["pelle"]}'::jsonb

  WHEN '5b3b8817-98f7-4da7-8d6c-9000bcfa76a1' THEN
    '{"en":["silica-ceramic","Nomex","silica"],"it":["silice-ceramica","Nomex","silice"]}'::jsonb

  WHEN '2cf03055-046f-4a8c-8e0d-5401dab26422' THEN
    '{"en":["polyester","PU"],"it":["poliestere","PU"]}'::jsonb

  WHEN '82e2aeb7-3602-48fa-9137-03dce3f1c91f' THEN
    '{"en":["aramid fiber","carbon"],"it":["fibra aramidica","carbonio"]}'::jsonb

  WHEN '000066f4-47cc-4417-a062-a5b4e105ff56' THEN
    '{"en":["leather"],"it":["pelle"]}'::jsonb

  WHEN 'fdaaee9d-e9ca-4863-b9b0-f3424f2c84f8' THEN
    '{"en":["nylon","nitrile"],"it":["nylon","nitrile"]}'::jsonb

  WHEN '6431b065-85e8-4369-bc41-f5aa187eadbc' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '4a70b316-5ad1-45f9-abbe-2a123edac332' THEN
    '{"en":["cotton"],"it":["cotone"]}'::jsonb

  WHEN '2195bb6d-f063-47e5-bbe6-b3f46936a80b' THEN
    '{"en":["HPPE","PU"],"it":["HPPE","PU"]}'::jsonb

  WHEN 'c5c04483-1872-4067-bb20-4e6b52bdacaf' THEN
    '{"en":["PU","tungsten","HPPE","nylon","spandex"],"it":["PU","tungsteno","HPPE","nylon","spandex"]}'::jsonb

  WHEN '34107be2-b906-4086-a80f-458a8f861d4b' THEN
    '{"en":["HPPE","stainless-steel","PU","nitrile"],"it":["HPPE","acciaio inox","PU","nitrile"]}'::jsonb

  WHEN '9e1f43c2-9bd6-4074-85a6-e0b802a38ff9' THEN
    '{"en":["fiberglass","HPPE","nylon"],"it":["fibra di vetro","HPPE","nylon"]}'::jsonb

  WHEN '85049ea3-1e41-4d57-bf17-a34e312138db' THEN
    '{"en":["leather"],"it":["pelle"]}'::jsonb

  WHEN '70768028-d532-43ba-901e-7f9ce31284cd' THEN
    '{"en":["nylon","HPPE","tungsten","spandex","nitrile"],"it":["nylon","HPPE","tungsteno","spandex","nitrile"]}'::jsonb

  WHEN '0b6788dd-6d98-44ea-839d-4c63dda9d9f0' THEN
    '{"en":["nylon","HPPE","tungsten"],"it":["nylon","HPPE","tungsteno"]}'::jsonb

  WHEN '1172eaf7-3063-42ae-94ac-ebab908ec9b8' THEN
    '{"en":["cotton","nitrile"],"it":["cotone","nitrile"]}'::jsonb

  WHEN 'b29b342c-ca3f-4c78-903a-7ebe2a3e4d9e' THEN
    '{"en":["HPPE","leather"],"it":["HPPE","pelle"]}'::jsonb

  WHEN '7e0248ba-a127-4b03-ac31-be48d9184195' THEN
    '{"en":["leather"],"it":["pelle"]}'::jsonb

  ELSE materials_locales
END
WHERE id IN (
  'c495dca9-4296-4d56-be66-aef4d2ebb63d',
  '691e1987-709c-412e-b1c0-c9d05ca824d3',
  '297912f2-2414-4bca-8112-578d1e176434',
  '5604e35d-caca-4328-8716-96259e4b9db7',
  '574319b2-d5b3-4808-83be-0df47c19e103',
  '47bf886d-4df4-49e2-bf4c-096088262754',
  '5a229593-c274-4576-ab54-b8bb114bde83',
  'd7e3fdb9-8601-4285-a115-fe0cf6b284c2',
  'b4a6d7a0-112d-40bd-b692-d4252b6970b5',
  '7c15d277-9493-4b37-b70f-44a15577b629',
  '0815677e-3a2c-48fd-b5d8-a1b10e992dcb',
  '64ee08af-9438-4029-87f2-99e2a0eae0e7',
  '642f4370-35d8-4ac7-83c6-a1bb71463d19',
  '3b34ffb8-00ce-4099-a1d1-6ba834c82401',
  '70ce7549-de8c-4854-9d4b-074d9efb58eb',
  '110a9c54-9891-449c-b34c-91dc040c5017',
  '04e271ed-8b6d-4489-8bbe-875de9193dcd',
  'e62c1287-6a71-48ad-9f5b-f85828a4a40b',
  '247af0ef-e855-4cff-909e-09e725e904dd',
  '815eb38e-75d1-437d-b266-cf3a21bf6d63',
  '4027f97e-fa2a-4eaa-8d8d-ff6a87f3ab84',
  '70e457d3-5fac-42c7-970d-7fa034125811',
  '5b3b8817-98f7-4da7-8d6c-9000bcfa76a1',
  '2cf03055-046f-4a8c-8e0d-5401dab26422',
  '82e2aeb7-3602-48fa-9137-03dce3f1c91f',
  '000066f4-47cc-4417-a062-a5b4e105ff56',
  'fdaaee9d-e9ca-4863-b9b0-f3424f2c84f8',
  '6431b065-85e8-4369-bc41-f5aa187eadbc',
  '4a70b316-5ad1-45f9-abbe-2a123edac332',
  '2195bb6d-f063-47e5-bbe6-b3f46936a80b',
  'c5c04483-1872-4067-bb20-4e6b52bdacaf',
  '34107be2-b906-4086-a80f-458a8f861d4b',
  '9e1f43c2-9bd6-4074-85a6-e0b802a38ff9',
  '85049ea3-1e41-4d57-bf17-a34e312138db',
  '70768028-d532-43ba-901e-7f9ce31284cd',
  '0b6788dd-6d98-44ea-839d-4c63dda9d9f0',
  '1172eaf7-3063-42ae-94ac-ebab908ec9b8',
  'b29b342c-ca3f-4c78-903a-7ebe2a3e4d9e',
  '7e0248ba-a127-4b03-ac31-be48d9184195'
);
