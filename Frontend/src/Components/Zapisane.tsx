import Utworzone from "./Utworzone";

interface ZapisaneProps {
  refreshTrigger?: boolean;
  userId?: number;
  isOwnProfile?: boolean;
}

function Zapisane({ refreshTrigger, userId, isOwnProfile }: ZapisaneProps) {
  if (isOwnProfile) {
    return <Utworzone variant="liked" refreshTrigger={refreshTrigger} />;
  }

  if (userId) {
    return <Utworzone userId={userId} refreshTrigger={refreshTrigger} />;
  }

  return <Utworzone variant="liked" refreshTrigger={refreshTrigger} />;
}

export default Zapisane;
