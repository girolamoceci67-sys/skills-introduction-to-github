import { schemaMigrations, addColumns } from '@nozbe/watermelondb/Schema/migrations';

// v1 -> v2: aggiunta del modulo manubri (dumbbell). Nuove colonne su user_profiles,
// tutte con default espliciti lato repository per i profili già esistenti sul device.
export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'user_profiles',
          columns: [
            { name: 'has_dumbbells', type: 'boolean' },
            { name: 'dumbbell_min_kg', type: 'number', isOptional: true },
            { name: 'dumbbell_max_kg', type: 'number', isOptional: true },
            { name: 'dumbbell_module_unlocked', type: 'boolean' },
            { name: 'dumbbell_reask_dismissed', type: 'boolean' },
          ],
        }),
      ],
    },
  ],
});
