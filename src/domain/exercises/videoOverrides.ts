/**
 * Video reali generati con AI (Luma AI) al posto dell'omino animato, per un primo gruppo di
 * esercizi. NOTA: questi file hanno ancora la filigrana "Luma AI" impressa nei fotogrammi —
 * sono un test di integrazione, andranno sostituiti con versioni senza filigrana generate da
 * un piano a pagamento (con diritti d'uso commerciale) prima del rilascio pubblico.
 */
export const videoOverrides: Record<string, number> = {
  'db-back-single-row': require('../../../assets/exercise-videos/db-back-single-row.mp4'),
  'mobility-march': require('../../../assets/exercise-videos/mobility-march.mp4'),
  'db-arms-bicep-curl': require('../../../assets/exercise-videos/db-arms-bicep-curl.mp4'),
  'pull-superman': require('../../../assets/exercise-videos/pull-superman.mp4'),
  'legs-glute-bridge': require('../../../assets/exercise-videos/legs-glute-bridge.mp4'),
};
