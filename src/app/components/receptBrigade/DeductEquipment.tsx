import DeductEquipmentForm from './DeductEquipmentForm';
import { saveDeduction } from '@/actions/recipeBrigade/saveDeduction';

interface DeductEquipmentProps {
  medicalKitId: string;
  equipment: {
    id: string;
    name: string;
    quantity: number;
    desc: string | null;
  }[];
  userId: string;
}

export default function DeductEquipment(props: DeductEquipmentProps) {
  return <DeductEquipmentForm {...props} saveDeduction={saveDeduction} />;
}
