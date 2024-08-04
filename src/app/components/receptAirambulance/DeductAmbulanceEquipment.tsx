import DeductAmbulanceEquipmentForm from './DeductAmbulanceEquipmentForm';
import { saveAmbulanceDeduction } from '@/actions/recipeAmbulance/saveDeductionAmbulance';

interface DeductEquipmentProps {
  ambulanceId: string;
  equipment: {
    id: string;
    name: string;
    quantity: number;
    desc: string | null;
  }[];
  userId: string;
}

export default function DeductEquipment(props: DeductEquipmentProps) {
  return <DeductAmbulanceEquipmentForm {...props} saveDeduction={saveAmbulanceDeduction} />;
}
