import { CamperDetails } from '@/components/CamperDetails/CamperDetails';

async function getCamper(id: string) {
  const response = await fetch(`https://campers-api.goit.study/campers/${id}`);
  if (!response.ok) throw new Error('Не вдалося завантажити дані');
  return response.json();
}

export default async function Page({
  params,
}: {
  params: { camperId: string };
}) {
  const { camperId } = await params;
  const data = await getCamper(camperId);

  return <CamperDetails data={data} />;
}
