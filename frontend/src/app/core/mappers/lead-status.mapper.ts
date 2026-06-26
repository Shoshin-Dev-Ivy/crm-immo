import { LeadStatus } from '../types/lead-status.type';

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  NEW: 'Nouveau',
  CONTACTED: 'Contacté',
  VISIT: 'Visite',
  NEGOTIATION: 'Négociation',
  SIGNED: 'Signé',
  LOST: 'Perdu',
};